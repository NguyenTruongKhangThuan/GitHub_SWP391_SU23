using BoardGameShopAPI.Services.OwnerService;
using BoardGameShopAPI.TempModels2;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/owner")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly IOwnerService _ownerService;
        public OwnerController(IOwnerService ownerService)
        {
            _ownerService = ownerService;
        }

        [HttpGet]
        public IActionResult OwnerLogin(string ownerName, string password)
        {
            Owner owner = _ownerService.OwnerLogin(ownerName, password);
            if(owner == null)
            {
                return NotFound();
            }
            else
            {
                string ownerInfoToken = _ownerService.CreateOwnerToken(owner);
                return Ok(ownerInfoToken);
            }
        }

        [HttpPut]
        public IActionResult Update(Owner owner)
        {
            string res = _ownerService.UpdateOwner(owner);
            if (res.Equals("Success"))
            {
                return Ok("Update Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Owner Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpGet("{token}")]
        public IActionResult GetOwnerInfo(string token)
        {
            return Ok(_ownerService.ReadOwnerToken(token));
        }
    }
}
