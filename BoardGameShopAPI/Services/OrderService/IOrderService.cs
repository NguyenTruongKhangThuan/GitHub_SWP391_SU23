using BoardGameShopAPI.TempModels2;

namespace BoardGameShopAPI.Services.OrderService
{
    public interface IOrderService
    {
        Order GetOrders(string orderId);

        string CreateOrder(Order order);

        string DeleteOrder(string orderId);
    }
}
