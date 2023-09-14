using BoardGameShopAPI.Services.BoardGameService;
using BoardGameShopAPI.Services.ComponentService;
using BoardGameShopAPI.Services.GamePackService;
using BoardGameShopAPI.Services.OrderDetailService;
using BoardGameShopAPI.Services.OrderService;
using BoardGameShopAPI.Services.OwnerService;
using BoardGameShopAPI.Services.PaymentService;
using BoardGameShopAPI.Services.UserService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using BoardGameShopAPI.Services.GameTagService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
//Test kajhfkdsjhflakdsjhflkansldkfjhalskfdjaslfdkjhalksfdj

namespace BoardGameShopAPI.Controllers
{
    [Route("admin/api")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
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
        private readonly IGameTagService _gameTagService;
        public AdminController(IUserService userService, IComponentService componentService,
            IGamePackService gamePackService, IOwnerService ownerService, IBoardGameService boardGameService,
            IPaymentService paymentService, IOrderService orderService, IOrderDetailService orderDetailService,
            IGameTagService gameTagService)
        {
            _userService = userService;
            _componentService = componentService;
            _gamePackService = gamePackService;
            _ownerService = ownerService;
            _boardGameService = boardGameService;
            _paymentService = paymentService;
            _orderService = orderService;
            _orderDetailService = orderDetailService;
            _gameTagService = gameTagService;
        }


        //--------------------------------------User Management--------------------------------------
        [HttpGet("users")]
        public async Task<IActionResult> GetUserList()
        {
            List<User> users = await _userService.ReadUserList();
            if (users == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(users);
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetSingleUser(string id)
        {
            User user = await _userService.GetAUser(id);
            if(user == null)
            {
                return BadRequest("Cannot Find");
            }
            else
            {
                if(user == new User())
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                else
                {
                    return Ok(user);
                }
            }
        }

        //--------------------------------------Component Management--------------------------------------
        [HttpGet("components")]
        public async Task<IActionResult> GetComponents(string gamePackId)
        {
            List<Component> components = await _componentService.GetGamePackComponents(gamePackId);
            if (components == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(components);
        }

        //--------------------------------------GamePack Management--------------------------------------
        [HttpGet("gamepacks")]
        public async Task<IActionResult> GetAllGamePack()
        {
            List<GamePack> gamePacks = await _gamePackService.GetAvailableGamePack();
            if(gamePacks == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(gamePacks);
        }

        //--------------------------------------BoardGame Management--------------------------------------
        [HttpGet("boardgames")]
        public async Task<IActionResult> GetAllBoardGame()
        {
            List<BoardGame> boardGames = await _boardGameService.GetBoardGames();
            if(boardGames == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(boardGames);
        }

        [HttpPost("boardgames")]
        public async Task<IActionResult> CreateBoardGame([FromForm] BoardGame boardGame)
        {
            string res = await _boardGameService.CreateBoardGame(boardGame);
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
        public async Task<IActionResult> UpdateBoardGame([FromForm] BoardGame boardGame)
        {
            string res = await _boardGameService.UpdateBoardGame(boardGame);
            if (res.Equals("Success"))
            {
                return Ok("Update Successfully");
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
        public async Task<IActionResult> DeleteBoardGame(string id)
        {
            string res = await _boardGameService.DeleteBoardGame(id);
            if (res.Equals("Success"))
            {
                return Ok("Delete Successfully");
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

        //--------------------------------------Owner Management--------------------------------------
        [HttpGet("owners")]
        public async Task<IActionResult> GetAllOwner()
        {
            List<Owner> owners = await _ownerService.GetOwners();
            if(owners == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(owners);
        }

        [HttpPost("owners")]
        public async Task<IActionResult> CreateOwnerAccount([FromForm] Owner owner)
        {
            string validation = await _ownerService.CreateValidation(owner);
            if(!validation.Equals("Accept"))
            {
                return BadRequest(validation);
            }

            string res = await _ownerService.CreateOwner(owner);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            else
            {
                if (res.Equals("Duplicated"))
                {
                    return BadRequest("Duplicated Owner's Name!");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpPut("owners")]
        public async Task<IActionResult> UpdateOwnerState([FromForm] Owner owner)
        {
            string res = await _ownerService.UpdateOwner(owner);
            if (res.Equals("Success"))
            {
                return Ok("Update Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Owner Is Not Found");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
        }

        [HttpDelete("owners")]
        public async Task<IActionResult> DeleteOwner(string ownerId)
        {
            string res = await _ownerService.DeleteOwner(ownerId);
            if (res.Equals("Success"))
            {
                return Ok("Delete Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("Cannot find the publisher");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, res);
                }
            }
        }

        //--------------------------------------Payment Management--------------------------------------
        [HttpGet("payments")]
        public async Task<IActionResult> GetAllPayment()
        {
            List<Payment> payments = await _paymentService.GetAllPayment();
            if(payments == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(payments);
        }

        //--------------------------------------Order Management--------------------------------------
        [HttpGet("orders")]
        public async Task<IActionResult> GetOrder(string orderId)
        {
            Order order = await _orderService.GetOrders(orderId);
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

        //--------------------------------------OrderDetail Management--------------------------------------
        [HttpGet("orderdetails")]
        public async Task<IActionResult> GetAllOrderDetail(string orderId)
        {
            List<OrderDetail> orderDetails = await _orderDetailService.GetOrderDetail(orderId);
            if( orderDetails == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(orderDetails);
        }

        //--------------------------------------GameTag Management--------------------------------------
        [HttpGet("gametags")]
        public async Task<IActionResult> GetAllTag()
        {
            List<GameTag> gameTags = await _gameTagService.GetGameTag();
            if (gameTags != null)
            {
                return Ok(gameTags);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("gametags/{id}")]
        public async Task<IActionResult> GetGameTagById(string id)
        {
            GameTag gameTag = await _gameTagService.GetGameTagById(id);
            if (gameTag != null)
            {
                if (gameTag.GameTagId == null)
                {
                    return BadRequest("NotFound");
                }
                return Ok(gameTag);
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("gametags")]
        public async Task<IActionResult> CreateGameTag([FromForm] GameTag gameTag)
        {
            string res = await _gameTagService.AddNewGameTag(gameTag);
            if (res.Equals("Success"))
            {
                return Ok("Create Successfully");
            }
            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpPut("gametags")]
        public async Task<IActionResult> UpdateGameTag([FromForm] GameTag gameTag)
        {
            string res = await _gameTagService.UpdateGameTag(gameTag);
            if (res.Equals("Success"))
            {
                return Ok("Update Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("NotFound");
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("gametags")]
        public async Task<IActionResult> DeleteGameTag(string id)
        {
            string res = await _gameTagService.DeleteGameTag(id);
            if (res.Equals("Success"))
            {
                return Ok("Delete Successfully");
            }
            else
            {
                if (res.Equals("NotFound"))
                {
                    return BadRequest("NotFound");
                }
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        //--------------------------------------Statistic Calculation--------------------------------------
        [HttpGet("statistics/users")]
        public async Task<IActionResult> GetCreatedAccount()
        {
            int num = await _userService.GetNumberOfUserAccount();
            if (num == int.MinValue)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(num);
        }

        [HttpGet("statistics/gamepacks")]
        public async Task<IActionResult> GetAvailableNumberOfGamePacks()
        {
            int num = await _gamePackService.GetNumberOfAvailablePack();
            if (num == int.MinValue)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(num);
        }

        [HttpGet("statistics/income")]
        public async Task<IActionResult> GetTotalIncome()
        {
            List<IncomeStatistc> totalIncome = await _paymentService.TotalIncome();
            if (totalIncome == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok(totalIncome);
        }

        [HttpGet("statistics/bestseller")]
        public async Task<IActionResult> GetBestSeller()
        {
            List<GamePack> bestSeller = await _paymentService.GetBestSeller();
            return Ok(bestSeller);
        }
    }
}


