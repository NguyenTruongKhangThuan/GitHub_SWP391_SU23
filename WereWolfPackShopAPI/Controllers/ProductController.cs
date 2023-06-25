using Microsoft.AspNetCore.Mvc;
using WereWolfPackShopAPI.Services.ProductService;
using WereWolfPackShopAPI.TempModels2;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WereWolfPackShopAPI.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            List<Product> products = _productService.GetAllProducts();
            if(products == null)
            {
                return BadRequest("Error");
            }
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(string id)
        {
            Product product = _productService.GetProductById(id);
            if(product == null)
            {
                return BadRequest("Error");
            }
            if (product.ProductId == null)
            {
                return BadRequest("Not Found/Unavailable");
            }
                return Ok(product);
        }
    }
}
