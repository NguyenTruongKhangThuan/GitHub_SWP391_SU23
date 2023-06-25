using Microsoft.AspNetCore.Mvc;
using WereWolfPackShopAPI.Services.OrderService;
using WereWolfPackShopAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WereWolfPackShopAPI.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        
        [HttpPost]
        public IActionResult Post(string userId, Order order)
        {
            string result = _orderService.CreateOrder(userId, order);
            if (result.Equals("Success"))
            {
                return Ok("Create Complete");
            }
            return BadRequest(result);
        }

        [HttpDelete]
        public IActionResult Delete(string orderId)
        {
            string result = _orderService.DeleteOrder(orderId);
            if (result.Equals("Success"))
            {
                return Ok("Delete Complete");
            }
            return BadRequest(result);
        }
    }
}
