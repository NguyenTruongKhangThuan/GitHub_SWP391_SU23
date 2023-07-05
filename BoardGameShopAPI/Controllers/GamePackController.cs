using BoardGameShopAPI.Services.GamePackService;
using BoardGameShopAPI.Models;
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
        public async Task<IActionResult> GetGamePacks()
        {
            List<GamePack> gamePacks = await _gamePackService.GetAvailableGamePack();
            if(gamePacks == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(gamePacks);
        }

        [HttpGet("searchmethods")]
        public async Task<IActionResult> SearchGamePackByName(string searchValue, string boardGameName)
        {
            List<GamePack> gamePacks = await _gamePackService.SearchGamePack(searchValue, boardGameName);
            return Ok(gamePacks);
        }
    }
}
