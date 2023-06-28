using BoardGameShopAPI.TempModels2;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly BoardGameShopDbContext _context;
        private readonly IConfiguration _configuration;
        public UserService(BoardGameShopDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        //Authentication:
        public string CreateAuthToken(User user)
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
                new Claim("fullName", user.FullName),
                new Claim("birthday", user.Birthday.ToString()),
                new Claim("gender", user.Gender),
                new Claim("address", user.Address),
                new Claim("phoneNumber", user.PhoneNumber),
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

        public User ReadAuthToken(string authToken)
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

        //User Service
        public string CreateUserAccount(User user)
        {
            try
            {
                User dbUser = _context.Users.Where(u => u.Username == user.Username).FirstOrDefault();
                if(dbUser == null)
                {
                    string tempId = _context.Users.Where(u => u.RoleId != "RO01").LastOrDefault()?.UserId;
                    string createdId = tempId == null ?
                        "U00000001" :
                        Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value) + 1)
                        .ToString(new string('0', n.Value.Length)));

                    user.UserId = createdId;
                    user.RoleId = "RO01";
                    _context.Users.Add(user);
                    _context.SaveChanges();
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

        public User Login(string username, string password)
        {
            try
            {
                User user = _context.Users.Where(u =>  u.Username == username
                && u.Password == password).FirstOrDefault();

                return user;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public List<User> ReadUserList()
        {
            try
            {
                return _context.Users.OrderBy(u => u.UserId).ToList();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public string UpdateUserAccount(User user)
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
                    _context.Users.Update(user);
                    _context.SaveChanges();
                    return "Success";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
