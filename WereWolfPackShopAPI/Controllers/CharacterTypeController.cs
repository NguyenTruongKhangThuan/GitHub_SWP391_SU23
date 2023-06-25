using Microsoft.AspNetCore.Mvc;
using WereWolfPackShopAPI.Services.CharacterTypeService;
using WereWolfPackShopAPI.TempModels2;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WereWolfPackShopAPI.Controllers
{
    [Route("api/charactertypes")]
    [ApiController]
    public class CharacterTypeController : ControllerBase
    {
        private readonly ICharacterTypeService _characterTypeService;
        public CharacterTypeController(ICharacterTypeService characterTypeService)
        {
            _characterTypeService = characterTypeService;
        }

        [HttpGet]
        public IActionResult GetAll(string productId)
        {
            List<CharacterType> characterTypes = _characterTypeService.GetAllCharacterTypes(productId);
            if(characterTypes == null)
            {
                return BadRequest("Error");
            }
            return Ok(characterTypes);
        }
    }
}
