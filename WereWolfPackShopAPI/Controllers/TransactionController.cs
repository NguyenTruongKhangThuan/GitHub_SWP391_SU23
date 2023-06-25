using Microsoft.AspNetCore.Mvc;
using WereWolfPackShopAPI.Services.TransactionService;
using WereWolfPackShopAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WereWolfPackShopAPI.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public IActionResult Get(string userId)
        {
            List<Transaction> transactions = _transactionService.GetTransactions(userId);
            if(transactions == null)
            {
                return BadRequest("Error");
            }
            return Ok(transactions);
        }

        [HttpPost]
        public IActionResult Post(string userId, string orderId, [FromForm] Transaction transaction)
        {
            string result = _transactionService.CreateTransaction(userId, orderId, transaction);
            if (result.Equals("Success"))
            {
                return Ok("Create Complete");
            }
            return Ok(result);
        }

        [HttpDelete]
        public IActionResult Delete(string transactionIsd)
        {
            string result = _transactionService.DeleteTransaction(transactionIsd);
            if(result.Equals("Success"))
            {
                return Ok("Delete Complete");
            }
            return BadRequest(result);
        }
    }
}
