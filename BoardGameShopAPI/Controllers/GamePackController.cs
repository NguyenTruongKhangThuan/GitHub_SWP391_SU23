using BoardGameShopAPI.Services.GamePackService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using BoardGameShopAPI.Services.TagInPackService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/gamepacks")]
    [ApiController]
    public class GamePackController : ControllerBase
    {
        private readonly IGamePackService _gamePackService;
        private readonly ITagInPackService _tagInPackService;
        public GamePackController(IGamePackService gamePackService, ITagInPackService tagInPackService)
        {
            _gamePackService = gamePackService;
            _tagInPackService = tagInPackService;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGamePackById(string id)
        {
            return Ok(await _gamePackService.GetGamePack(id));
        }

        [HttpGet("searchmethods")]
        public async Task<IActionResult> SearchGamePackByName(string? searchValue, string? boardGameName)
        {
            List<GamePack> gamePacks = await _gamePackService.SearchGamePack(searchValue, boardGameName);
            return Ok(gamePacks);
        }

        [HttpGet("tags")]
        public async Task<IActionResult> GetTagList(string gamePackId)
        {
            List<GameTag> gameTags = await _tagInPackService.GetTagInPack(gamePackId);
            return Ok(gameTags);
        }

        [HttpPost("tags")]
        public async Task<IActionResult> AddTag(string gamePackId, string tag)
        {
            string res = await _tagInPackService.AddTagToPack(gamePackId, tag);
            if (res.Equals("Success"))
            {
                return Ok("Success");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, res);
            }
        }
    }
}
