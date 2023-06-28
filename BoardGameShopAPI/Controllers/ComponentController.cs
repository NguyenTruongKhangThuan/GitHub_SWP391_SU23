using BoardGameShopAPI.Services.ComponentService;
using BoardGameShopAPI.TempModels2;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/components")]
    [ApiController]
    public class ComponentController : ControllerBase
    {
        private readonly IComponentService _componentService;
        public ComponentController(IComponentService componentService)
        {
            _componentService = componentService;
        }

        [HttpGet]
        public IActionResult GetGamePackComponents(string gamePackId)
        {
            List<Component> components = _componentService.GetGamePackComponents(gamePackId);
            if(components == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(components);
        }
    }
}
