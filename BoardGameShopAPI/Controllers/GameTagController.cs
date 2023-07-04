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
        public IActionResult GetAllTag()
        {
            List<GameTag> gameTags = _gameTagService.GetGameTag();
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
        public IActionResult GetGameTagById(string id)
        {
            GameTag gameTag = _gameTagService.GetGameTagById(id);
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
        public IActionResult CreateGameTag(GameTag gameTag)
        {
            string res = _gameTagService.AddNewGameTag(gameTag);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPut]
        public IActionResult UpdateGameTag(GameTag gameTag)
        {
            string res = _gameTagService.UpdateGameTag(gameTag);
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
        public IActionResult DeleteGameTag(string id)
        {
            string res = _gameTagService.DeleteGameTag(id);
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
