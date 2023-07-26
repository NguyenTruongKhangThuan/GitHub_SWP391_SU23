using BoardGameShopAPI.Services.GamePackService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using BoardGameShopAPI.Services.TagInPackService;
using BoardGameShopAPI.Services.PaymentService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/gamepacks")]
    [ApiController]
    public class GamePackController : ControllerBase
    {
        private readonly IGamePackService _gamePackService;
        private readonly ITagInPackService _tagInPackService;
        private readonly IPaymentService _paymentService;
        public GamePackController(IGamePackService gamePackService, ITagInPackService tagInPackService,
            IPaymentService paymentService)
        {
            _gamePackService = gamePackService;
            _tagInPackService = tagInPackService;
            _paymentService = paymentService;
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

        [HttpGet("bestsellers")]
        public async Task<IActionResult> GetBestSeller()
        {
            List<GamePack> bestSellers = await _paymentService.GetBestSellerForShopPage();
            return Ok(bestSellers);
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
        public async Task<IActionResult> AddTag(string gamePackId, string[] tagIds)
        {
            string res = await _tagInPackService.AddTagToPack(gamePackId, tagIds);
            if (res.Equals("Success"))
            {
                return Ok("Success");
            }
            else
            {
                if(res.Equals("GamePack NotFound"))
                {
                    return BadRequest("Game Pack Not Found");
                }
                return StatusCode(StatusCodes.Status500InternalServerError, res);
            }
        }
    }
}
