using WereWolfPackShopAPI.Services.OderDetailService;
using WereWolfPackShopAPI.Models;

namespace WereWolfPackShopAPI.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly IOrderDetailService _orderDetailService;
        private readonly WereWolfPackShopDbContext _dbContext;
        public OrderService(WereWolfPackShopDbContext dbContext, IOrderDetailService orderDetail)
        {
            _dbContext = dbContext;
            _orderDetailService = orderDetail;
        }

        public string CreateOrder(string userId, Order order)
        {
            try
            {
                string id = "O";
                bool check = true;

                do
                {
                    Random random = new Random();
                    id += random.Next(1, 1000000);

                    if (_dbContext.Orders.Find(id) == null)
                    {
                        check = false;
                    }
                    else
                    {
                        id = "O";
                    }
                }while (check);

                order.OrderId = id;
                order.UserId = userId;
                _dbContext.Orders.Add(order);
                _dbContext.SaveChanges();
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
                Order order = _dbContext.Orders.Find(orderId);
                if (order != null)
                {
                    _orderDetailService.DeleteByOrderId(order.OrderId);
                    _dbContext.Orders.Remove(order);
                    _dbContext.SaveChanges();
                    return "Success";
                }
                else
                {
                    return "Not Found";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public Order GetOrderById(string orderId)
        {
            try
            {
                return _dbContext.Orders.Find(orderId);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
