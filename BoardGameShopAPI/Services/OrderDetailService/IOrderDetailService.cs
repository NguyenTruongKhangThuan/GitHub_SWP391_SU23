using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.OrderDetailService
{
    public interface IOrderDetailService
    {
        Task<List<OrderDetail>> GetOrderDetail(string orderId);

        Task<string> CreateOrderDetail(OrderDetail orderDetail);

        Task<string> UpdateOrderdetail(OrderDetail orderDetail);

        Task<string> DeleteOrderDetail(string orderDetailId);

        float CalcPrice(string orderDetailId);
    }
}
