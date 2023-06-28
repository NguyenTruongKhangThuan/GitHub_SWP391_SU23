using BoardGameShopAPI.TempModels2;

namespace BoardGameShopAPI.Services.OrderDetailService
{
    public interface IOrderDetailService
    {
        List<OrderDetail> GetOrderDetail(string orderId);

        string CreateOrderDetail(OrderDetail orderDetail);

        string UpdateOrderdetail(OrderDetail orderDetail);

        string DeleteOrderDetail(string orderDetailId);
    }
}
