using BoardGameShopAPI.Models;
using BoardGameShopAPI.Services.GameTagService;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/gametags")]
    [ApiController]
    public class GameTagController : ControllerBase
    {
        private readonly IGameTagService _gameTagService;
        public GameTagController(IGameTagService gameTagService)
        {
            _gameTagService = gameTagService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTag()
        {
            List<GameTag> gameTags = await _gameTagService.GetGameTag();
            if(gameTags != null)
            {
                return Ok(gameTags);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGameTagById(string id)
        {
            GameTag gameTag = await _gameTagService.GetGameTagById(id);
            if(gameTag!= null)
            {
                if(gameTag.GameTagId == null)
                {
                    return BadRequest("NotFound");
                }
                return Ok(gameTag);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateGameTag([FromForm] GameTag gameTag)
        {
            string res = await _gameTagService.AddNewGameTag(gameTag);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateGameTag([FromForm] GameTag gameTag)
        {
            string res = await _gameTagService.UpdateGameTag(gameTag);
            if (res.Equals("Success"))
            {
                return Ok("Update Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("NotFound");
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteGameTag(string id)
        {
            string res = await _gameTagService.DeleteGameTag(id);
            if (res.Equals("Success"))
            {
                return Ok("Delete Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("NotFound");
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
