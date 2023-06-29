using BoardGameShopAPI.Services.UserService;
using BoardGameShopAPI.TempModels2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Runtime.InteropServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult Login(string username, string password)
        {
            User user = _userService.Login(username, password);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                string authToken = _userService.CreateAuthToken(user);
                return Ok(authToken);
            }
        }

        [HttpPut]
        public IActionResult EditProfile(User user)
        {
            string res = _userService.UpdateUserAccount(user);
            if (res.Equals("Success"))
            {
                return Ok("Update Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("User Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpPost]
        public IActionResult CreateAccount(User user)
        {
            string res = _userService.CreateUserAccount(user);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                if (res.Equals("Duplicated"))
                {
                    return BadRequest("Duplicated User's Name!");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpGet("{token}")]
        public IActionResult GetUserData(string token)
        {
            return Ok(_userService.ReadAuthToken(token));
        }
    }
}
