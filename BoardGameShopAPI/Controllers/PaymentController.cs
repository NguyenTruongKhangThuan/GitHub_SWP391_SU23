using BoardGameShopAPI.Services.PaymentService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using BoardGameShopAPI.Services.MomoService;
using ProGCoder_MomoAPI.Models.Order;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IMomoService _momoService;
        public PaymentController(IPaymentService paymentService, IMomoService momoService)
        {
            _paymentService = paymentService;
            _momoService = momoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string userId)
        {
            List<Payment> payments = await _paymentService.GetPaymentList(userId);
            if (payments == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(payments);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Payment payment)
        {
            string res = await _paymentService.CreatePayment(payment);
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
        public async Task<IActionResult> Update(Payment payment)
        {
            string res = await _paymentService.UpdatePayment(payment);
            if (res.Equals("Success"))
            {
                return Ok("Update Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Payment Is Not Found");
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
            string res = await _paymentService.DeletePayment(id);
            if (res.Equals("Success"))
            {
                return Ok("Delete Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Payment Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        //Momo API Management:
        [HttpPost("momo")]
        public async Task<IActionResult> CreatePaymentUrl(string userId, OrderInfoModel orderInfo)
        {
            var response = await _momoService.CreatePaymentAsync(userId, orderInfo);
            //return Redirect(response.PayUrl);
            return Ok(response.PayUrl);

        }

        [HttpGet("momo")]
        public IActionResult PaymentCallBack()
        {
            var response = _momoService.PaymentExecuteAsync(HttpContext.Request.Query);
            return Ok(HttpContext.Request.Query);
        }
    }
}
