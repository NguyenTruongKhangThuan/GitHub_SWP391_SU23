using Microsoft.AspNetCore.Mvc;
using WereWolfPackShopAPI.Services.CharacterTypeService;
using WereWolfPackShopAPI.Services.CommentService;
using WereWolfPackShopAPI.Services.DiscountService;
using WereWolfPackShopAPI.Services.OderDetailService;
using WereWolfPackShopAPI.Services.OrderService;
using WereWolfPackShopAPI.Services.ProductService;
using WereWolfPackShopAPI.Services.TransactionService;
using WereWolfPackShopAPI.Services.UserService;
using WereWolfPackShopAPI.TempModels2;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WereWolfPackShopAPI.Controllers
{
    [Route("admin/api")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IDiscountService _discountService;
        private readonly IProductService _productService;
        private readonly ICharacterTypeService _characterTypeService;
        private readonly IOrderService _orderService;
        private readonly IOrderDetailService _orderDetailService;
        private readonly ITransactionService _transactionService;
        private readonly ICommentService _commentService;
        public AdminController(IUserService userService, IDiscountService discountService,
            IProductService productService, IOrderDetailService orderDetailService, IOrderService orderService,
            ITransactionService transactionService, ICommentService commentService, ICharacterTypeService characterTypeService)
        {
            _userService = userService;
            _discountService = discountService;
            _productService = productService;
            _orderService = orderService;
            _orderDetailService = orderDetailService;
            _transactionService = transactionService;
            _commentService = commentService;
            _characterTypeService = characterTypeService;
        }

        //Users Management API
        [HttpGet]
        [Route("users")]
        public IActionResult GetAllUsers()
        {
            List<User> users = _userService.GetAllUsers();
            if (users == null)
            {
                return BadRequest("Error. Cannot Take User List!");
            }
            else
                return Ok(users);
        }

        //Discount Management API
        [HttpGet]
        [Route("discounts")]
        public IActionResult GetAllDiscounts()
        {
            List<Discount> discounts = _discountService.GetDiscountList();
            if(discounts == null)
            {
                return BadRequest("Error");
            }
            return Ok(discounts);
        }

        [HttpPost]
        [Route("discounts")]
        public IActionResult CreateNewDiscount([FromForm] Discount discount)
        {
            string result = _discountService.CreateNewDiscount(discount);
            if (result.Equals("Success"))
            {
                return Ok("Create Complete");
            }
            return BadRequest(result);
        }

        [HttpPut]
        [Route("discounts")]
        public IActionResult UpdateDiscount([FromForm] Discount discount)
        {
            string result = _discountService.UpdateDiscount(discount);
            if (result.Equals("Success"))
            {
                return Ok("Update Complete");
            }
            return BadRequest(result);
        }

        [HttpDelete("discounts")]
        public IActionResult DeleteDiscount(string id)
        {
            string result = _discountService.DeleteDiscount(id);
            if (result.Equals("Success"))
            {
                return Ok("Delete Complete");
            }
            return BadRequest(result);
        }

        //Product (CARD PACK) Management API
        [HttpGet]
        [Route("products")]
        public IActionResult GetAllProducts()
        {
            List<Product> products = _productService.GetAllProducts();
            if (products == null)
            {
                return BadRequest("Error");
            }
            return Ok(products);
        }

        [HttpPost]
        [Route("products")]
        public IActionResult CreateProduct([FromForm] Product product)
        {
            string result = _productService.CreateProduct(product);
            if (result.Equals("Success"))
            {
                return Ok("Create Complete");
            }
            return BadRequest(result);
        }

        [HttpPut]
        [Route("products")]
        public IActionResult UpdateProduct([FromForm] Product product)
        {
            string result = _productService.UpdateProduct(product);
            if (result.Equals("Success"))
            {
                return Ok("Update Complete");
            }
            return BadRequest(result);
        }

        [HttpDelete("products")]
        public IActionResult DeleteProduct(string id)
        {
            string result = _productService.DeleteProduct(id);
            if (result.Equals("Success"))
            {
                return Ok("Delete Complete");
            }
            return BadRequest(result);
        }

        //CharacterType (CARDS) Management API
        [HttpGet]
        [Route("charactertypes")]
        public IActionResult GetCharacterTypes(string id)
        {
            List<CharacterType> characterTypes = _characterTypeService.GetAllCharacterTypes(id);
            if (characterTypes == null)
            {
                return BadRequest("Not Found");
            }
            return Ok(characterTypes);
        }

        [HttpPost]
        [Route("charactertypes")]
        public IActionResult CreateCharacterType(string id, CharacterType characterType)
        {
            string result = _characterTypeService.CreateCharacterType(id, characterType);
            if (result.Equals("Success"))
            {
                return Ok("Create Complete");
            }
            return BadRequest(result);
        }

        [HttpPut("charactertypes")]
        public IActionResult UpdateCharacterType(CharacterType characterType)
        {
            string result = _characterTypeService.UpdateCharacterType(characterType);
            if (result.Equals("Success"))
            {
                return Ok("Update Complete");
            }
            return BadRequest(result);
        }

        [HttpDelete("charactertypes")]
        public IActionResult DeleteCharacterType(string id)
        {
            string result = _characterTypeService.DeleteCharacterType(id);
            if (result.Equals("Success"))
            {
                return Ok("Delete Complete");
            }
            return BadRequest(result);
        }

        //Order + OrderDetail Management API
        [HttpGet]
        [Route("orders")]
        public IActionResult GetOrder(string orderId)
        {
            Order order = _orderService.GetOrderById(orderId);
            if(order == null)
            {
                return BadRequest("Not Found");
            }
            return Ok(order);
        }

        [HttpGet]
        [Route("orderdetails")]
        public IActionResult GetOrderDetail(string orderId)
        {
            List<OrderDetail> orderDetails = _orderDetailService.GetOrderDetails(orderId);
            if(orderDetails == null)
            {
                return BadRequest("Not Found");
            }
            return Ok(orderDetails);
        }
        //Transaction Management API
        [HttpGet]
        [Route("transactions")]
        public IActionResult GetAllTransactions()
        {
            List<Transaction> transactions = _transactionService.GetAllTransactions();
            if(transactions == null)
            {
                return BadRequest("Not Found");
            }
            return Ok(transactions);
        }

        //Comment Management API
        [HttpGet]
        [Route("comments")]
        public IActionResult GetAllComments()
        {
            List<ProductComment> productComments = _commentService.GetAllComments();
            if(productComments == null)
            {
                return BadRequest("Not Found");
            }
            return Ok(productComments);
        }

        [HttpPut("comments")]
        public IActionResult CheckApproval(string id, bool isApprove)
        {
            string resutl = _commentService.ApproveComment(id, isApprove);
            if(resutl.Equals("Success"))
            {
                return Ok("Complete");
            }
            return Ok(resutl);
        }

        [HttpDelete("comments")]
        public IActionResult DeleteComment(string id)
        {
            string result = _commentService.DeleteComment(id);
            if (result.Equals("Success"))
            {
                return Ok("Delete Complete");
            }
            return Ok(result);
        }
    }
}
