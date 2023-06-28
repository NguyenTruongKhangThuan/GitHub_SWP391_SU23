using BoardGameShopAPI.TempModels2;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.OrderDetailService
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly BoardGameShopDbContext _context;
        public OrderDetailService(BoardGameShopDbContext context)
        {
            _context = context;
        }

        public string CreateOrderDetail(OrderDetail orderDetail)
        {
            try
            {
                string tempId = _context.OrderDetails.LastOrDefault().OrderId;
                string createId = tempId == null ?
                    "OD00000001" : 
                    Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value)+1)
                                    .ToString(new string('0', n.Value.Length)));

                orderDetail.OrderId = createId;
                _context.OrderDetails.Add(orderDetail);
                _context.SaveChanges();
                return "Success";
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
                OrderDetail orderDetail = _context.OrderDetails.Find(orderDetailId);
                if(orderDetail == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.OrderDetails.Remove(orderDetail);
                    _context.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public List<OrderDetail> GetOrderDetail(string orderId)
        {
            try
            {
                return _context.OrderDetails.Where(odt => odt.OrderId == orderId)
                    .OrderByDescending(odt => odt.OrderId).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public string UpdateOrderdetail(OrderDetail orderDetail)
        {
            try
            {
                OrderDetail dbOrderDetail = _context.OrderDetails.Find(orderDetail.OrderId);
                if(dbOrderDetail == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.OrderDetails.Remove(orderDetail);
                    _context.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
