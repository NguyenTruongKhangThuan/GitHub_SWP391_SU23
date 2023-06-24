using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.OderDetailService
{
    public interface IOrderDetailService
    {
        List<OrderDetail> GetOrderDetails(string orderId);

        string CreateOrderDetail(string orderId, OrderDetail orderDetail);

        string UpdateOrderDetail(string orderId, OrderDetail orderDetail);

        string DeleteOrderDetail(string orderDetailId);

        string DeleteByOrderId(string orderId);
    }
}
