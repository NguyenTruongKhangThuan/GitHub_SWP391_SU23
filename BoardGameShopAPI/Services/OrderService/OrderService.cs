using BoardGameShopAPI.Services.OrderDetailService;
using BoardGameShopAPI.Models;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace BoardGameShopAPI.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly DbA9bc42BoardgameshopdbContext _context;
        private readonly IOrderDetailService _orderDetailService;
        public OrderService(DbA9bc42BoardgameshopdbContext context, IOrderDetailService orderDetail)
        {
            _context = context;
            _orderDetailService = orderDetail;
        }

        public async Task<string> CreateOrder(Order order)
        {
            try
            {
                string createdId = DateTime.Now.GetHashCode().ToString();
                if(_context.Orders.Find(createdId) == null)
                {
                    order.OrderId = createdId;
                    _context.Orders.Add(order);
                    await _context.SaveChangesAsync();
                    return $"Success/{createdId}";
                }
                return "Fail";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteOrder(string orderId)
        {
            try
            {
                Order order = _context.Orders.Find(orderId);
                if(order != null)
                {
                    List<OrderDetail> orderDetails = await _orderDetailService.GetOrderDetail(orderId);
                    foreach (var orderDetail in orderDetails)
                    {
                        _orderDetailService.DeleteOrderDetail(orderDetail.OrderDetailId);
                    }

                    _context.Orders.Remove(order);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
                else
                {
                    return "NotFound";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<Order> GetOrders(string orderId)
        {
            try
            {
                Order order = await _context.Orders.Where(o => o.OrderId == orderId).FirstOrDefaultAsync();
                if(order != null)
                {
                    return order;
                }
                return new Order();
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public async Task<float> CalcTotalPrice(string orderId)
        {
            try
            {
                float totalCost = 0;
                List<OrderDetail> orderDetails = await _orderDetailService.GetOrderDetail(orderId);

                foreach (var orderDetail in orderDetails)
                {
                    totalCost += _orderDetailService.CalcPrice(orderDetail.OrderDetailId);
                }
                return totalCost;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return float.MinValue;
            }
        }
    }
}
