using BoardGameShopAPI.Services.OrderDetailService;
using BoardGameShopAPI.Models;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly BoardGameShopDbContext _context;
        private readonly IOrderDetailService _orderDetailService;
        public OrderService(BoardGameShopDbContext context, IOrderDetailService orderDetail)
        {
            _context = context;
            _orderDetailService = orderDetail;
        }

        public string CreateOrder(Order order)
        {
            try
            {
                string tempId = _context.Orders.LastOrDefault().OrderId;
                string createdId = tempId == null ?
                    "O00000001" :
                    Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value) + 1)
                                  .ToString(new string('0', n.Value.Length)));

                order.OrderId = createdId;
                _context.Orders.Add(order);
                _context.SaveChanges();
                return "Success";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeleteOrder(string orderId)
        {
            try
            {
                Order order = _context.Orders.Find(orderId);
                if(order != null)
                {
                    List<OrderDetail> orderDetails = _orderDetailService.GetOrderDetail(orderId);
                    foreach (var orderDetail in orderDetails)
                    {
                        _orderDetailService.DeleteOrderDetail(orderDetail.OrderDetailId);
                    }

                    _context.Orders.Remove(order);
                    _context.SaveChanges();
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

        public Order GetOrders(string orderId)
        {
            try
            {
                Order order = _context.Orders.Where(o => o.OrderId == orderId).FirstOrDefault();
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

        public float CalcTotalPrice(string orderId)
        {
            try
            {
                float totalCost = 0;
                List<OrderDetail> orderDetails = _orderDetailService.GetOrderDetail(orderId);

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
