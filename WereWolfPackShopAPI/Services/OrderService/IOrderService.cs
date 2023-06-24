using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.OrderService
{
    public interface IOrderService
    {
        Order GetOrderById(string orderId);

        string CreateOrder(Order order);

        string DeleteOrder(string orderId);
    }
}
