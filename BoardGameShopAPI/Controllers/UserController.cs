using BoardGameShopAPI.Services.UserService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Runtime.InteropServices;
using BoardGameShopAPI.Services.OwnerService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOwnerService _ownerService;
        public UserController(IUserService userService, IOwnerService ownerService)
        {
            _userService = userService;
            _ownerService = ownerService;
        }

        [HttpGet]
        public async Task<IActionResult> Login(string username, string password)
        {
            User user = await _userService.Login(username, password);
            if (user == null)
            {
                Owner owner = await _ownerService.OwnerLogin(username, password);
                if(owner == null)
                {
                    return BadRequest("Invalid Username or Password!");
                }
                else
                {
                    string authenToken = await _ownerService.CreateOwnerToken(owner);
                    return Ok(authenToken);
                }
            }
            else
            {
                string authToken = await _userService.CreateAuthToken(user);
                return Ok(authToken);
            }
        }

        [HttpGet("authentication")]
        public async Task<IActionResult> Authentication(string token)
        {
            User user = await _userService.ReadAuthToken(token);
            if(user == null)
            {
                Owner owner = await _ownerService.ReadOwnerToken(token);
                if (owner == null)
                {
                    return BadRequest("Cannot Read Autheticated Token");
                }
                else
                {
                    return Ok("OWNER");
                }
            }
            else
            {
                if (user.RoleId.Equals("RO01"))
                {
                    return Ok("ADMIN");
                }
                else
                {
                    return Ok("CUSTOMER");
                }
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditProfile([FromForm] User user)
        {
            string res = await _userService.UpdateUserAccount(user);
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
        public async Task<IActionResult> CreateAccount([FromForm] User user, string confirmPassword)
        {
            string validation = await _userService.SignInInputValidation(user, confirmPassword);
            if (!validation.Equals("Accept"))
            {
                return BadRequest(validation);
            }

            string res = await _userService.CreateUserAccount(user);
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
