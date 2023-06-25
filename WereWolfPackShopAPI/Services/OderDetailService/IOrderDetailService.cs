    using WereWolfPackShopAPI.Models;

namespace WereWolfPackShopAPI.Services.OderDetailService
{
    public interface IOrderDetailService
    {
        List<OrderDetail> GetOrderDetails(string orderId);

        string CreateOrderDetail(string orderId, OrderDetail orderDetail);

        string UpdateOrderDetail(string orderDetailId, OrderDetail orderDetail);

        string DeleteOrderDetail(string orderDetailId);

        string DeleteByOrderId(string orderId);
    }
}
