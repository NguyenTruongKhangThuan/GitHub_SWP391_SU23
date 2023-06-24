using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly WereWolfPackShopDbContext _dbContext;
        public OrderService(WereWolfPackShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string CreateOrder(Order order)
        {
            throw new NotImplementedException();
        }

        public string DeleteOrder(string orderId)
        {
            throw new NotImplementedException();
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
