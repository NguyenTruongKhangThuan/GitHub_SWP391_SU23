using BoardGameShopAPI.Services.GamePackService;
using BoardGameShopAPI.TempModels2;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/gamepacks")]
    [ApiController]
    public class GamePackController : ControllerBase
    {
        private readonly IGamePackService _gamePackService;
        public GamePackController(IGamePackService gamePackService)
        {
            _gamePackService = gamePackService;
        }

        [HttpGet]
        public IActionResult GetGamePacks()
        {
            List<GamePack> gamePacks = _gamePackService.GetAllGamePack();
            if(gamePacks == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(gamePacks);
        }
    }
}
