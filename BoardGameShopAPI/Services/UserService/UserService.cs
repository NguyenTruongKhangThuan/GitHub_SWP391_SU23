    using BoardGameShopAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text.RegularExpressions;
using static System.Net.Mime.MediaTypeNames;

namespace BoardGameShopAPI.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly DbA9bc42BoardgameshopdbContext _context;
        private readonly IConfiguration _configuration;
        public UserService(DbA9bc42BoardgameshopdbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        //Authentication:
        public async Task<string> CreateAuthToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.RoleId == "RO01" ? "Admin" : "Customer"),
                new Claim("userId", user.UserId),
                new Claim("roleId", user.RoleId),
                new Claim("username", user.Username),
                new Claim("password", user.Password),
                new Claim("email", user.Email),
                new Claim("fullName", user.FullName == null ? "empty" : user.FullName),
                new Claim("birthday", user.Birthday.ToString()),
                new Claim("gender", user.Gender == null ? "empty" : user.Gender),
                new Claim("address", user.Address == null ? "empty" : user.Address),
                new Claim("phoneNumber", user.PhoneNumber == null ? "empty" : user.PhoneNumber),
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

        public async Task<User> ReadAuthToken(string authToken)
        {
            try
            {
                var token = new JwtSecurityToken(jwtEncodedString: authToken);

                User user = new User()
                {
                    UserId = token.Claims.First(c => c.Type == "userId").Value,
                    RoleId = token.Claims.First(c => c.Type == "roleId").Value,
                    Username = token.Claims.First(c => c.Type == "username").Value,
                    Password = token.Claims.First(c => c.Type == "password").Value,
                    Email = token.Claims.First(c => c.Type == "email").Value,
                    FullName = token.Claims.First(c => c.Type == "fullName").Value,
                    Birthday = DateTime.Parse(token.Claims.First(c => c.Type == "birthday").Value),
                    Gender = token.Claims.First(c => c.Type == "gender").Value,
                    Address = token.Claims.First(c => c.Type == "address").Value,
                    PhoneNumber = token.Claims.First(c => c.Type == "phoneNumber").Value,
                };

                return user;
            }
            catch(Exception)
            {
                return null;
            }
        }

        //User Service
        public async Task<string> CreateUserAccount(User user)
        {
            try
            {
                User dbUser = _context.Users.Where(u => u.Username == user.Username).FirstOrDefault();
                if(dbUser == null)
                {
                    string createdId = _context.Users.Where(u => u.RoleId != "RO01").OrderBy(x => x.UserId).LastOrDefault() == null ?
                        "U00000001" :
                        Regex.Replace(_context.Users.Where(u => u.RoleId != "RO01").OrderBy(x => x.UserId).LastOrDefault()?.UserId,
                        "\\d+", n => (int.Parse(n.Value) + 1).ToString(new string('0', n.Value.Length)));

                    user.UserId = createdId;
                    user.RoleId = "RO02";
                    user.Role = _context.Roles.Find("RO02");
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
                else
                {
                    return "Duplicated";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<User> Login(string username, string password)
        {
            try
            {
                User user = await _context.Users.Where(u =>  u.Username == username
                && u.Password == password).FirstOrDefaultAsync();

                return user;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<List<User>> ReadUserList()
        {
            try
            {
                return await _context.Users.OrderBy(u => u.UserId).ToListAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<User> GetAUser(string userId)
        {
            try
            {
                return await _context.Users.FindAsync(userId);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new User();
            }
        }

        public async Task<string> UpdateUserAccount(User user)
        {
            try
            {
                User dbUser = _context.Users.Find(user.UserId);
                if (dbUser == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.Entry(dbUser).CurrentValues.SetValues(user);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        //Statistic Calculation
        public async Task<int> GetNumberOfUserAccount()
        {
            try
            {
                return await _context.Users.CountAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine (ex.Message);
                return int.MinValue;
            }
        }

        //Validation 
        public async Task<string> SignUpInputValidation(User user, string confirmPassword)
        {
            //Delete redundance space char
            user.Username = user.Username == null ? "" : user.Username.Trim();
            user.Email = user.Email == null ? "" : user.Email.Trim();

            //Check inputs
            if (user.Username == null || user.Username.Length == 0)
            {
                return "Invalid Input For Username";
            }
            else
            {
                if (!EmailValidation(user.Email)){
                    return "Invalid Input For Email";
                }
                else
                {
                    if (!PasswordValidation(user.Password))
                    {
                        return "Invalid Input For Password";
                    }
                    else
                    {
                        if(user.Password.Equals(confirmPassword))
                        {
                            return "Accept";
                        }
                        else
                        {
                            return "Confirm Password Is Not Matched";
                        }
                    }
                }
            }
        }

        private bool EmailValidation(string email)
        {
            var mail = new MailAddress(email);

            if(mail.Host.Contains('.') && !mail.Host.EndsWith('.'))
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

            if (password == null)
            {
                return false;
            }

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
