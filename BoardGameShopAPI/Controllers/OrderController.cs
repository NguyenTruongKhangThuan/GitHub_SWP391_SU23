using BoardGameShopAPI.Services.OrderService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
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

        [HttpGet]
        public async Task<IActionResult> Get(string orderId)
        {
            Order order = await _orderService.GetOrders(orderId);
            if(order == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            else
            {
                if(order.OrderId == null)
                {
                    return BadRequest("Not Found");
                }
                else
                {
                    return Ok(order);
                }
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromForm] Order order)
        {
            string res = await _orderService.CreateOrder(order);
            if (res.Contains("Success"))
            {
                string[] str = res.Split('/');
                return Ok(str[1]);
            }
            else
            {
                if (res.Equals("Fail"))
                {
                    return BadRequest("Fail To Create");
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteOrder(string orderId)
        {
            string res = await _orderService.DeleteOrder(orderId);
            if (res.Equals("Success"))
            {
                return Ok("Delete Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Order Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, res);
                }
            }
        }
    }
}
