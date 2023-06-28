using BoardGameShopAPI.Services.BoardGameService;
using BoardGameShopAPI.Services.ComponentService;
using BoardGameShopAPI.Services.GamePackService;
using BoardGameShopAPI.Services.OrderDetailService;
using BoardGameShopAPI.Services.OrderService;
using BoardGameShopAPI.Services.OwnerService;
using BoardGameShopAPI.Services.PaymentService;
using BoardGameShopAPI.Services.UserService;
using BoardGameShopAPI.TempModels2;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardGameShopAPI.Controllers
{
    [Route("admin/api")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IComponentService _componentService;
        private readonly IGamePackService _gamePackService;
        private readonly IOwnerService _ownerService;
        private readonly IBoardGameService _boardGameService;
        private readonly IPaymentService _paymentService;
        private readonly IOrderService _orderService;
        private readonly IOrderDetailService _orderDetailService;
        public AdminController(IUserService userService, IComponentService componentService,
            IGamePackService gamePackService, IOwnerService ownerService, IBoardGameService boardGameService,
            IPaymentService paymentService, IOrderService orderService, IOrderDetailService orderDetailService)
        {
            _userService = userService;
            _componentService = componentService;
            _gamePackService = gamePackService;
            _ownerService = ownerService;
            _boardGameService = boardGameService;
            _paymentService = paymentService;
            _orderService = orderService;
            _orderDetailService = orderDetailService;
        }


        //User Management
        [HttpGet("users")]
        public IActionResult GetUserList()
        {
            List<User> users = _userService.ReadUserList();
            if (users == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(users);
        }

        //Component Management
        [HttpGet("components")]
        public IActionResult GetComponents(string gamePackId)
        {
            List<Component> components = _componentService.GetGamePackComponents(gamePackId);
            if (components == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(components);
        }

        //GamePack Management
        [HttpGet("gamepacks")]
        public IActionResult GetAllGamePack()
        {
            List<GamePack> gamePacks = _gamePackService.GetAllGamePack();
            if(gamePacks == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(gamePacks);
        }

        //BoardGame Management
        [HttpGet("boardgames")]
        public IActionResult GetAllBoardGame()
        {
            List<BoardGame> boardGames =_boardGameService.GetBoardGames();
            if(boardGames == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(boardGames);
        }

        [HttpPost("boardgames")]
        public IActionResult CreateBoardGame(BoardGame boardGame)
        {
            string res = _boardGameService.CreateBoardGame(boardGame);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                if (res.Equals("Duplicated"))
                {
                    return BadRequest("Duplicated BoardGame's Name!");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpPut("boardgames")]
        public IActionResult UpdateBoardGame(BoardGame boardGame)
        {
            string res = _boardGameService.UpdateBoardGame(boardGame);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Board Game Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpDelete("boardgames/{id}")]
        public IActionResult DeleteBoardGame(string id)
        {
            string res = _boardGameService.DeleteBoardGame(id);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Board Game Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        //Owner Management
        [HttpGet("owners")]
        public IActionResult GetAllOwner()
        {
            List<Owner> owners = _ownerService.GetOwners();
            if(owners == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(owners);
        }

        [HttpPost("owners")]
        public IActionResult CreateOwnerAccount(Owner owner)
        {
            string res = _ownerService.CreateOwner(owner);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                if (res.Equals("Duplicated"))
                {
                    return BadRequest("Duplicated BoardGame's Name!");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpPut("owners")]
        public IActionResult UpdateOwnerState(Owner owner)
        {
            string res = _ownerService.UpdateOwner(owner);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Board Game Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        //Payment Management
        [HttpGet("payments")]
        public IActionResult GetAllPayment()
        {
            List<Payment> payments = _paymentService.GetAllPayment();
            if(payments == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(payments);
        }

        //Order Management
        [HttpGet("orders")]
        public IActionResult GetOrder(string orderId)
        {
            Order order = _orderService.GetOrders(orderId);
            if(order == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            else if(order.OrderId == null)
            {
                return BadRequest("NotFound");
            }
            else
                return Ok(order);
        }

        //OrderDetail Management
        [HttpGet("orderdetails")]
        public IActionResult GetAllOrderDetail(string orderId)
        {
            List<OrderDetail> orderDetails = _orderDetailService.GetOrderDetail(orderId);
            if( orderDetails == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(orderDetails);
        }
    }
}


