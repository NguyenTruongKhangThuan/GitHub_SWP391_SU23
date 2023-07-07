using BoardGameShopAPI.Models;
using BoardGameShopAPI.Services.GamePackService;
using Microsoft.EntityFrameworkCore;
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

        public async Task<string> CreatePayment(Payment payment)
        {
            try
            {
                string tempId = _context.Payments.OrderBy(x => x.PaymentId).LastOrDefault()?.PaymentId;
                string createdId = tempId == null ?
                    "PM00000001" :
                    Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value)+1)
                                  .ToString(new string('0', n.Value.Length)));

                payment.PaymentId = createdId;
                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeletePayment(string paymentId)
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
                    await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<List<Payment>> GetAllPayment()
        {
            try
            {
                return await _context.Payments.OrderByDescending(pm => pm.PaymentDate).ToListAsync();
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public async  Task<List<Payment>> GetPaymentList(string userId)
        {
            try
            {
                return await _context.Payments.Where(pm => pm.UserId == userId)
                    .OrderByDescending(pm => pm.PaymentDate).ToListAsync();
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public async Task<string> UpdatePayment(Payment payment)
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
                    _context.Entry(dbPayment).CurrentValues.SetValues(payment);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> UpdatePaymentState(string paymentId, string state)
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
                    await _context.SaveChangesAsync();
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

        public async Task<List<GamePack>> GetBestSeller()
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
                gamePacks.Add(await _gamePackService.GetGamePack(pack.GamePackId));
            }

            return gamePacks;
        }
    }
}
