using BoardGameShopAPI.Services.ComponentService;
using BoardGameShopAPI.Services.GamePackService;
using BoardGameShopAPI.Services.OwnerService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/owner")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Owner")]
    public class OwnerController : ControllerBase
    {
        private readonly IOwnerService _ownerService;
        private readonly IGamePackService _gamePackService;
        public readonly IComponentService _componentService;
        public OwnerController(IOwnerService ownerService, IGamePackService gamePackService,
            IComponentService componentService)
        {
            _ownerService = ownerService;
            _gamePackService = gamePackService;
            _componentService = componentService;
        }

        //Owner Function
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> OwnerLogin(string ownerName, string password)
        {
            Owner owner = await _ownerService.OwnerLogin(ownerName, password);
            if (owner == null)
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
        public async Task<IActionResult> Update([FromForm] Owner owner)
        {
            string res = await _ownerService.UpdateOwner(owner);
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

        //GamePack Function
        [HttpGet("gamepacks")]
        public async Task<IActionResult> GetPacks(string ownerId)
        {
            List<GamePack> gamePacks = await _gamePackService.GetGamePacksByOwner(ownerId);
            if (gamePacks == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(gamePacks);
        }

        [HttpPost("gamepacks")]
        public async Task<IActionResult> CreatePack([FromForm] GamePack gamePack)
        {
            string res = await _gamePackService.CreateGamePack(gamePack);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                if (res.Equals("Duplicated"))
                {
                    return BadRequest("Duplicated Game Pack's Name!");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpPut("gamepacks")]
        public async Task<IActionResult> UpdatePack([FromForm] GamePack gamePack)
        {
            string res = await _gamePackService.UpdateGamePack(gamePack);
            if (res.Equals("Success"))
            {
                return Ok("Update Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Game Pack Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpDelete("gamepacks/{id}")]
        public async Task<IActionResult> DeletePack(string id)
        {
            string res = await _gamePackService.DeleteGamePack(id);
            if (res.Equals("Success"))
            {
                return Ok("Delete Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Game Pack Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        //Component Function
        [HttpGet("components")]
        public async Task<IActionResult> GetPacksComponent(string gamePackId)
        {
            List<Component> components = await _componentService.GetGamePackComponents(gamePackId);
            if (components == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(components);
        }

        [HttpPost("components")]
        public async Task<IActionResult> CreateComponent([FromForm] Component component)
        {
            string res = await _componentService.CreateComponent(component);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                if (res.Equals("Duplicated"))
                {
                    return BadRequest("Duplicated Component's Name!");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpPut("components")]
        public async Task<IActionResult> UpdateComponent([FromForm] Component component)
        {
            string res = await _componentService.UpdateComponent(component);
            if (res.Equals("Success"))
            {
                return Ok("Update Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Component Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpDelete("components/{id}")]
        public async Task<IActionResult> DeleteComponent(string id)
        {
            string res = await _componentService.DeleteComponent(id);
            if (res.Equals("Success"))
            {
                return Ok("Delete Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Component Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }  
    }
}
