using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.OrderService
{
    public interface IOrderService
    {
        Order GetOrderById(string orderId);

        string CreateOrder(string userId, Order order);

        string DeleteOrder(string orderId);
    }
}
