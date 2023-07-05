using BoardGameShopAPI.Services.OrderDetailService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/orderdetails")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailService _orderDetailService;
        public OrderDetailController(IOrderDetailService orderDetailService)
        {
            _orderDetailService = orderDetailService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string orderId)
        {
            List<OrderDetail> orderDetails = await _orderDetailService.GetOrderDetail(orderId);
            if (orderDetails == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(orderDetails);
        }

        [HttpPost]
        public async Task<IActionResult> Create(OrderDetail orderDetail)
        {
            string res = await _orderDetailService.CreateOrderDetail(orderDetail);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                if (res.Equals("NotEnough"))
                {
                    return BadRequest("Amount requested is higher than available amount");
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(OrderDetail orderDetail)
        {
            string res = await _orderDetailService.UpdateOrderdetail(orderDetail);
            if (res.Equals("Success"))
            {
                return Ok("Update Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Order Detail Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            string res = await _orderDetailService.DeleteOrderDetail(id);
            if (res.Equals("Success"))
            {
                return Ok("Delete Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Order Detail Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }
    }
}
