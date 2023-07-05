using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.OrderService
{
    public interface IOrderService
    {
        Task<Order> GetOrders(string orderId);

        Task<string> CreateOrder(Order order);

        Task<string> DeleteOrder(string orderId);

        Task<float> CalcTotalPrice(string orderId);
    }
}
