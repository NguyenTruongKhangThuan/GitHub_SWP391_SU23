using BoardGameShopAPI.Models;
using Microsoft.OpenApi.Any;
using System.Linq;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.PaymentService
{
    public class PaymentService : IPaymentService
    {
        private readonly BoardGameShopDbContext _context;
        public PaymentService(BoardGameShopDbContext context)
        {
            _context = context;
        }

        public string CreatePayment(Payment payment)
        {
            try
            {
                string tempId = _context.Payments.LastOrDefault()?.PaymentId;
                string createdId = tempId == null ?
                    "PM00000001" :
                    Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value)+1)
                                  .ToString(new string('0', n.Value.Length)));

                payment.PaymentId = createdId;
                _context.Payments.Add(payment);
                _context.SaveChanges();
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeletePayment(string paymentId)
        {
            try
            {
                Payment payment = _context.Payments.Find(paymentId);
                if(payment == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.Payments.Remove(payment);
                    _context.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public List<Payment> GetAllPayment()
        {
            try
            {
                return _context.Payments.OrderByDescending(pm => pm.PaymentDate).ToList();
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public List<Payment> GetPaymentList(string userId)
        {
            try
            {
                return _context.Payments.Where(pm => pm.UserId == userId)
                    .OrderByDescending(pm => pm.PaymentDate).ToList();
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public string UpdatePayment(Payment payment)
        {
            try
            {
                Payment dbPayment = _context.Payments.Find(payment.PaymentId);
                if(dbPayment == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.Payments.Update(payment);
                    _context.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string UpdatePaymentState(string paymentId, string state)
        {
            try
            {
                Payment dbPayment = _context.Payments.Find(paymentId);
                if (dbPayment == null)
                {
                    return "NotFound";
                }
                else
                {
                    dbPayment.State = state;
                    _context.Payments.Update(dbPayment);
                    _context.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //Statistic Calculation
        public float TotalIncome()
        {
            try
            {
                return (float)_context.Payments.Where(p => p.PaymentDate.Value.Year == DateTime.Now.Year
                && p.PaymentDate.Value.Month == DateTime.Now.Month).Sum(p => p.AmountOfMoney);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return float.MinValue;
            }
        }
    }
}
