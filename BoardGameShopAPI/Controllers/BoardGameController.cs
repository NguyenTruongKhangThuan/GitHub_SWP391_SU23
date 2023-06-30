using BoardGameShopAPI.Services.BoardGameService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/boardgames")]
    [ApiController]
    public class BoardGameController : ControllerBase
    {
        private readonly IBoardGameService _boardGameService;
        public BoardGameController(IBoardGameService boardGameService)
        {
            _boardGameService = boardGameService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<BoardGame> boardGames = _boardGameService.GetBoardGames();
            if(boardGames == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(boardGames);
        }
    }
}
