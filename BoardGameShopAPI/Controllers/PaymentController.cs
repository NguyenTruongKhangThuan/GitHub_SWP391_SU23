using BoardGameShopAPI.Services.PaymentService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public IActionResult Get(string userId)
        {
            List<Payment> payments = _paymentService.GetPaymentList(userId);
            if (payments == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(payments);
        }

        [HttpPost]
        public IActionResult Create(Payment payment)
        {
            string res = _paymentService.CreatePayment(payment);
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
        public IActionResult Update(Payment payment)
        {
            string res = _paymentService.UpdatePayment(payment);
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
        public IActionResult Delete(string id)
        {
            string res = _paymentService.DeletePayment(id);
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
    }
}
