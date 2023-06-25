using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WereWolfPackShopAPI.Models;

namespace WereWolfPackShopAPI.Services.UserService
{
    public class UserService : IUserService
    {   
        private readonly WereWolfPackShopDbContext _dbContext;
        private readonly IConfiguration _configuration;
        public UserService(WereWolfPackShopDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public List<User> GetAllUsers()
        {
            try
            {
                return _dbContext.Users.OrderBy(u => u.UserId).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public string CreateNewUserAccount(User user)
        {
            bool check = true;
            string id = "U";
            try
            {
                User dbUser = _dbContext.Users.Where(u => u.UserName == user.UserName).FirstOrDefault();
                if (dbUser == null)
                {
                    //Create User ID
                    do
                    {
                        Random random = new Random();
                        id += random.Next(0, 100000).ToString();

                        if(_dbContext.Users.Find(id) == null)
                        {
                            check = false;
                        }
                        else
                        {
                            id = "U";
                        }
                    }while(check);

                    user.UserId = id;
                    user.Role = "Customer";
                    _dbContext.Users.Add(user);
                    _dbContext.SaveChanges();
                    return "Success";
                }

                return $"User Name: {user.UserName} has already existed!";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            
        }

        public string UpdateUserAccount(User user)
        {
            try
            {
                User dbUser = _dbContext.Users.Find(user.UserId);
                if(dbUser == null)
                {
                    return $"User {user.UserId}, Name:{user.UserName} does not exist.";
                }
                else
                {
                    dbUser.UserName     = user.UserName;
                    dbUser.Password     = user.Password;
                    dbUser.Email        = user.Email;
                    dbUser.FullName     = user.FullName;
                    dbUser.Gender       = user.Gender;
                    dbUser.DateOfBirth  = user.DateOfBirth;
                    dbUser.Address      = user.Address;
                    dbUser.PhoneNumber  = user.PhoneNumber;
                    _dbContext.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeleteUserAccount(string userId)
        {
            try
            {
                User user = _dbContext.Users.Find(userId);
                if(user == null)
                {
                    return $"User {userId} does not exist.";
                }
                else
                {
                    _dbContext.Users.Remove(user);
                    _dbContext.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public User Login(string userName, string password)
        {
            try
            {
                User user = _dbContext.Users.Where(u => u.UserName == userName
                && u.Password == password).FirstOrDefault();

                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        //Authentication Purpose Method
        public string CreateInfoToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("userId", user.UserId),
                new Claim("userName", user.UserName),
                new Claim("password", user.Password),
                new Claim("email", user.Email),
                new Claim("fullName", user.FullName),
                new Claim("gender", user.Gender),
                new Claim("dateOfBirth", user.DateOfBirth.ToString()),
                new Claim("address", user.Address),
                new Claim("phoneNumber", user.PhoneNumber),
                new Claim("signUpDate", user.SignUpDate.ToString()),
                new Claim("role", user.Role),
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

        public User ReadInfoToken(string jwtToken)
        {
            var token = new JwtSecurityToken(jwtEncodedString: jwtToken);

            User user = new User()
            {
                UserId = token.Claims.First(c => c.Type == "userId").Value,
                UserName = token.Claims.First(c => c.Type == "userName").Value,
                Password = token.Claims.First(c => c.Type == "password").Value,
                Email = token.Claims.First(c => c.Type == "email").Value,
                FullName = token.Claims.First(c => c.Type == "fullName").Value,
                Gender = token.Claims.First(c => c.Type == "gender").Value,
                DateOfBirth = DateTime.Parse(token.Claims.First(c => c.Type == "dateOfBirth").Value),
                Address = token.Claims.First(c => c.Type == "address").Value,
                PhoneNumber = token.Claims.First(c => c.Type == "phoneNumber").Value,
                SignUpDate = DateTime.Parse(token.Claims.First(c => c.Type == "signUpDate").Value),
                Role = token.Claims.First(c => c.Type == "role").Value,
            };

            return user;
        }
    }
}
