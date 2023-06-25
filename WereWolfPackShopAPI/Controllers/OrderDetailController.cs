using Microsoft.AspNetCore.Mvc;
using WereWolfPackShopAPI.Services.OderDetailService;
using WereWolfPackShopAPI.Services.OrderService;
using WereWolfPackShopAPI.TempModels2;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WereWolfPackShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailService _orderDetailService;
        public OrderDetailController(IOrderDetailService orderDetailService)
        {
            _orderDetailService = orderDetailService;
        }

        [HttpGet]
        public IActionResult GetOrderDetails(string orderId)
        {
            List<OrderDetail> orderDetails = _orderDetailService.GetOrderDetails(orderId);
            if(orderDetails.Count > 0)
            {
                return Ok(orderDetails);
            }
            return BadRequest("Error");
        }

        [HttpPost]
        public IActionResult CreateOrderDetail(string orderId, [FromForm] OrderDetail orderDetail)
        {
            string result = _orderDetailService.CreateOrderDetail(orderId, orderDetail);
            if (result.Equals("Success"))
            {
                return Ok("Create Complete");
            }
            return BadRequest(result);
        }

        [HttpPut]
        public IActionResult UpdateOrderDetail(string orderDetailId, [FromForm] OrderDetail orderDetail)
        {
            string result = _orderDetailService.UpdateOrderDetail(orderDetailId, orderDetail);
            if (result.Equals("Success"))
            {
                return Ok("Update Success");
            }
            return BadRequest(result);
        }

        [HttpDelete]
        public IActionResult Delete(string orderDetailId)
        {
            string result = _orderDetailService.DeleteOrderDetail(orderDetailId);
            if (result.Equals("Success"))
            {
                return Ok("Delete Complete");
            }
            return BadRequest(result);
        }
    }
}
