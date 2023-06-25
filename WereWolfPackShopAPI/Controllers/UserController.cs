using Microsoft.AspNetCore.Mvc;
using WereWolfPackShopAPI.Services.UserService;
using WereWolfPackShopAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WereWolfPackShopAPI.Controllers
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
        public IActionResult Login(string userName, string password)
        {
            User user = _userService.Login(userName, password);
            if (user == null)
            {
                return BadRequest("Fail to Login");
            }
            else
            {
                string authToken = _userService.CreateInfoToken(user);
                return Ok(authToken);
            }
        }

        [HttpPost]
        public IActionResult CreateNewUser(User user)
        {
            string result = _userService.CreateNewUserAccount(user);
            if (result.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            return BadRequest(result);
        }

        [HttpPut("{id}")]
        public IActionResult EditUserInfo(int id, User user)
        {
            string result = _userService.UpdateUserAccount(user);
            if (result.Equals("Success")){
                return Ok("Update Complete Successfully");
            }
            return BadRequest(result);
        }

    }
}
