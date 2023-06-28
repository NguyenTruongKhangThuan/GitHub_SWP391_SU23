using BoardGameShopAPI.Services.OrderDetailService;
using BoardGameShopAPI.TempModels2;
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
        public IActionResult Get(string orderId)
        {
            List<OrderDetail> orderDetails = _orderDetailService.GetOrderDetail(orderId);
            if (orderDetails == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(orderDetails);
        }

        [HttpPost]
        public IActionResult Create(OrderDetail orderDetail)
        {
            string res = _orderDetailService.CreateOrderDetail(orderDetail);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut]
        public IActionResult Update(OrderDetail orderDetail)
        {
            string res = _orderDetailService.UpdateOrderdetail(orderDetail);
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
        public IActionResult Delete(string id)
        {
            string res = _orderDetailService.DeleteOrderDetail(id);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
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
