using BoardGameShopAPI.Models;
using BoardGameShopAPI.Services.GamePackService;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Writers;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.OrderDetailService
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly BoardGameShopDbContext _context;
        private readonly IGamePackService _gamePackService;
        public OrderDetailService(BoardGameShopDbContext context, IGamePackService gamePackService)
        {
            _context = context;
            _gamePackService = gamePackService;
        }

        public async Task<string> CreateOrderDetail(OrderDetail orderDetail)
        {
            try
            {
                string res = _gamePackService.DecreaseGamePackAmount(orderDetail.GamePackId, orderDetail.Amount).Result;
                if (res.Equals("NotEnough"))
                {
                    return res;
                }

                string tempId = _context.OrderDetails.OrderBy(x => x.OrderDetailId).LastOrDefault().OrderId;
                string createId = tempId == null ?
                    "OD00000001" : 
                    Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value)+1)
                                    .ToString(new string('0', n.Value.Length)));

                orderDetail.OrderId = createId;
                _context.OrderDetails.Add(orderDetail);
                await _context.SaveChangesAsync();
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteOrderDetail(string orderDetailId)
        {
            try
            {
                OrderDetail orderDetail = _context.OrderDetails.Find(orderDetailId);
                if(orderDetail == null)
                {
                    return "NotFound";
                }
                else
                {
                    _gamePackService.IncreaseGamePackAmount(orderDetailId, orderDetail.Amount);
                    _context.OrderDetails.Remove(orderDetail);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<List<OrderDetail>> GetOrderDetail(string orderId)
        {
            try
            {
                return await _context.OrderDetails.Where(odt => odt.OrderId == orderId)
                    .OrderByDescending(odt => odt.OrderId).ToListAsync();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<string> UpdateOrderdetail(OrderDetail orderDetail)
        {
            try
            {
                OrderDetail dbOrderDetail = _context.OrderDetails.Find(orderDetail.OrderId);
                if(dbOrderDetail == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.OrderDetails.Remove(orderDetail);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public float CalcPrice(string orderDetailId)
        {
            OrderDetail orderDetail = _context.OrderDetails.Find(orderDetailId);
            return (float)(orderDetail.Amount * orderDetail.Price);
        }
    }
}
