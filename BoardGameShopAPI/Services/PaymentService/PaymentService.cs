using BoardGameShopAPI.Models;
using BoardGameShopAPI.Services.GamePackService;
using Microsoft.OpenApi.Any;
using System.Linq;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.PaymentService
{
    public class PaymentService : IPaymentService
    {
        private readonly BoardGameShopDbContext _context;
        private readonly IGamePackService _gamePackService;
        public PaymentService(BoardGameShopDbContext context, IGamePackService gamePackService)
        {
            _context = context;
            _gamePackService = gamePackService;
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

        public List<GamePack> GetBestSeller()
        {
            var soldGamePackList = _context.Payments.Join(_context.OrderDetails, p => p.OrderId, odt => odt.OrderId,
                (p, odt) => new
                {
                    PaymentId = p.PaymentId,
                    GamePackId = odt.GamePackId,
                    Amount = odt.Amount,
                })
                .GroupBy(l => l.GamePackId)
                .Select(l => new
                {
                    GamePackId = l.Key,
                    SoldNumber = l.Sum(i => i.Amount),
                })
                .OrderByDescending(l => l.SoldNumber)
                .Take(3);

            List<GamePack> gamePacks = new List<GamePack>();
            foreach (var pack in gamePacks)
            {
                gamePacks.Add(_gamePackService.GetGamePack(pack.GamePackId));
            }

            return gamePacks;
        }
    }
}
