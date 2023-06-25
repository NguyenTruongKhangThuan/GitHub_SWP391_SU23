using Microsoft.Identity.Client.Extensibility;
using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.OderDetailService
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly WereWolfPackShopDbContext _dbContext;
        public OrderDetailService(WereWolfPackShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string CreateOrderDetail(string orderId, OrderDetail orderDetail)
        {
            try
            {
                string id = "OD";
                bool check = true;

                do
                {
                    Random random = new Random();
                    id += random.Next(1, 10000000);

                    if (_dbContext.OrderDetails.Find(id) != null)
                    {
                        id = "OD";
                    }
                    else
                    {
                        check = false;
                    }
                } while (check);

                orderDetail.OrderId = id;
                orderDetail.OrderId = orderId;
                _dbContext.OrderDetails.Add(orderDetail);
                _dbContext.SaveChanges();
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeleteByOrderId(string orderId)
        {
            try
            {
                List<OrderDetail> orderDetails = GetOrderDetails(orderId);
                if (orderDetails.Count > 0)
                {
                    foreach (OrderDetail orderDetail in orderDetails)
                    {
                        _dbContext.OrderDetails.Remove(orderDetail);
                    }
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

        public string DeleteOrderDetail(string orderDetailId)
        {
            try
            {
                OrderDetail orderDetail = _dbContext.OrderDetails.Find(orderDetailId);
                if(orderDetail != null)
                {
                    _dbContext.OrderDetails.Remove(orderDetail);
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

        public List<OrderDetail> GetOrderDetails(string orderId)
        {
            try
            {
                return _dbContext.OrderDetails.Where(od => od.OrderId == orderId)
                    .OrderBy(od => od.OrderDetailId).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public string UpdateOrderDetail(string orderDetailId, OrderDetail orderDetail)
        {
            try
            {
                OrderDetail updatedOrderDetail = _dbContext.OrderDetails.Find(orderDetailId);
                if(updatedOrderDetail != null)
                {
                    updatedOrderDetail.Amount = orderDetail.Amount;
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
    }
}
