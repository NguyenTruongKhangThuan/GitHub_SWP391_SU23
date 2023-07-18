using BoardGameShopAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.OwnerService
{
    public class OwnerService : IOwnerService
    {
        private readonly DbA9bc42BoardgameshopdbContext _context;
        private readonly IConfiguration _configuration;
        public OwnerService(DbA9bc42BoardgameshopdbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> CreateOwner(Owner owner)
        {
            try
            {
                if(_context.Owners.Where(ow => ow.OwnerName == owner.OwnerName).FirstOrDefault() == null)
                {
                    string createdId = _context.Owners.OrderBy(x => x.OwnerId).LastOrDefault() == null ?
                        "OW00000001" :
                        Regex.Replace(_context.Owners.OrderBy(x => x.OwnerId).LastOrDefault()?.OwnerId,
                        "\\d+", n => (int.Parse(n.Value) + 1).ToString(new string('0', n.Value.Length)));

                    owner.OwnerId = createdId;
                    owner.Status = true;
                    _context.Owners.Add(owner);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
                else
                {
                    return "Duplicated";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<List<Owner>> GetOwners()
        {
            try
            {
                return await _context.Owners.Where(o => o.Status == true).OrderBy(ow => ow.OwnerId).ToListAsync();
            }
            catch(Exception)
            {
                return null;
            }
        }

        public async Task<Owner> OwnerLogin(string ownername, string password)
        {
            try
            {
                Owner owner = await _context.Owners.Where(ow => ow.OwnerName == ow.OwnerName
                                && ow.Password == password).FirstOrDefaultAsync();
                return owner;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public async Task<string> UpdateOwner(Owner owner)
        {
            try
            {
                Owner dbOwner = _context.Owners.Find(owner.OwnerId);
                if (dbOwner == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.Entry(dbOwner).CurrentValues.SetValues(owner);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteOwner(string ownerId)
        {
            try
            {
                Owner owner = _context.Owners.Find(ownerId);
                if(owner == null)
                {
                    return "NotFound";
                }
                else
                {
                    owner.Status = false; await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //Token Generator
        public async Task<string> CreateOwnerToken(Owner owner)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, owner.OwnerName),
                new Claim(ClaimTypes.Role, "Owner"),
                new Claim("ownerId", owner.OwnerId),
                new Claim("ownerName", owner.OwnerName),
                new Claim("password", owner.Password),
                new Claim("fullName", owner.FullName),
                new Claim("email", owner.Email),
                new Claim("phoneNumber", owner.PhoneNumber),
                new Claim("status", owner.Status.ToString()),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSetting:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(12),
                signingCredentials: cred
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public async Task<Owner> ReadOwnerToken(string ownerToken)
        {
            var token = new JwtSecurityToken(jwtEncodedString: ownerToken);

            Owner owner = new Owner()
            {
                OwnerId = token.Claims.First(o => o.Type == "ownerId").Value,
                OwnerName = token.Claims.First(o => o.Type == "ownerName").Value,
                Password = token.Claims.First(o => o.Type == "password").Value,
                FullName = token.Claims.First(o => o.Type == "fullName").Value,
                Email = token.Claims.First(o => o.Type == "email").Value,
                PhoneNumber = token.Claims.First(o => o.Type == "phoneNumber").Value,
                Status = bool.Parse(token.Claims.First(o => o.Type == "status").Value),
            };

            return owner;
        }

        //Authentication
        public async Task<string> CreateValidation(Owner owner)
        {
            //Delete redundance white space
            owner.OwnerName = owner.OwnerName.Trim();
            owner.Email = owner.Email.Trim();

            if(owner.OwnerName.Length == 0 || owner.OwnerName == null)
            {
                return "Invalid Input For Ownername";
            }
            else
            {
                if (!EmailValidation(owner.Email))
                {
                    return "Invalid Input For Email";
                }
                else
                {
                    if(!PasswordValidation(owner.Password))
                    {
                        return "Invalid Input For Password";
                    }
                    else
                    {
                        return "Accept";
                    }
                }
            }
        }

        private bool EmailValidation(string email)
        {
            var mail = new MailAddress(email);

            if (mail.Host.Contains('.') && !mail.Host.EndsWith('.'))
            {
                return true;
            }
            return false;
        }

        private bool PasswordValidation(string password)
        {
            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasLowerChar = new Regex(@"[a-z]+");
            var hasSymbols = new Regex(@"[!@#$%^&*()_+=\[{\]};:<>|./?,-]");
            var minLenght = 6;

            if (password.Length >= minLenght)
            {
                if (!hasUpperChar.IsMatch(password))
                {
                    return false;
                }
                if (!hasLowerChar.IsMatch(password))
                {
                    return false;
                }
                if (!hasSymbols.IsMatch(password))
                {
                    return false;
                }
                if (!hasNumber.IsMatch(password))
                {
                    return false;
                }
            }
            else
            {
                return false;
            }

            return true;
        }
    }
}
