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
        private readonly DbA9bc42BoardgameshopdbContext _context;
        private readonly IGamePackService _gamePackService;
        public PaymentService(DbA9bc42BoardgameshopdbContext context, IGamePackService gamePackService)
        {
            _context = context;
            _gamePackService = gamePackService;
        }

        public async Task<string> CreatePayment(Payment payment)
        {
            try
            {
                string createdId = _context.Payments.OrderBy(x => x.PaymentId).LastOrDefault() == null ?
                    "PM00000001" :
                    Regex.Replace(_context.Payments.OrderBy(x => x.PaymentId).LastOrDefault()?.PaymentId,
                    "\\d+", n => (int.Parse(n.Value) + 1).ToString(new string('0', n.Value.Length)));

                payment.PaymentId = createdId;
                payment.User = _context.Users.Find(payment.UserId);
                payment.Order = _context.Orders.Find(payment.OrderId);

                if (!_context.Payments.Where(p => p.OrderId == payment.OrderId).Any())
                {
                    _context.Payments.Add(payment);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
                return "Fail";
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
                if (payment == null)
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
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<List<Payment>> GetPaymentList(string userId)
        {
            try
            {
                return await _context.Payments.Where(pm => pm.UserId == userId)
                    .OrderByDescending(pm => pm.PaymentDate).ToListAsync();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<string> UpdatePayment(Payment payment)
        {
            try
            {
                Payment dbPayment = _context.Payments.Find(payment.PaymentId);
                if (dbPayment == null)
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
        public async Task<List<IncomeStatistc>> TotalIncome()
        {
            try
            {
                List<IncomeStatistc> IncomeStatistcs = new List<IncomeStatistc>();
                int currentMonth = DateTime.Now.Month;
                int currentYear = DateTime.Now.Year;

                for (int i = 0; i < 5; i++)
                {
                    if (currentMonth == 0)
                    {
                        currentMonth = 12;
                        currentYear--;
                    }

                    var orderDetails = await _context.Payments.Join(_context.OrderDetails, p => p.OrderId, odt => odt.OrderId,
                    (p, odt) => new
                    {
                        OrderId = p.OrderId,
                        PaymentDate = p.PaymentDate,
                        GamePackId = odt.GamePackId,
                        Amount = odt.Amount,
                        TotalPrice = odt.Price * odt.Amount,
                    }).Where(l => l.PaymentDate.Value.Month == currentMonth
                    && l.PaymentDate.Value.Year == currentYear)
                    .ToListAsync();


                    IncomeStatistc incomeStatistc = new IncomeStatistc()
                    {
                        TotalNumberOfSoldProduct = (int)orderDetails.Sum(o => o.Amount),
                        Income = (double)orderDetails.Sum(o => o.TotalPrice),
                        Month = currentMonth,
                        Year = currentYear,
                    };

                    IncomeStatistcs.Add(incomeStatistc);
                    currentMonth--;

                }
                return IncomeStatistcs;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
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
                .Take(3).ToList();

            List<GamePack> gamePacks = new List<GamePack>();
            foreach (var pack in soldGamePackList)
            {
                gamePacks.Add(await _gamePackService.GetGamePack(pack.GamePackId));
            }

            return gamePacks;
        }

        public async Task<List<GamePack>> GetBestSellerOfPub(string pubId)
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
                .Take(3).ToList();

            List<GamePack> gamePacks = new List<GamePack>();
            foreach (var pack in soldGamePackList)
            {
                gamePacks.Add(await _gamePackService.GetGamePackByPubId(pubId, pack.GamePackId));
            }

            return gamePacks;
        }

        public async Task<List<IncomeStatistc>> GetSoldNumOfPubProduct(string pubId)
        {
            List<IncomeStatistc> incomeStatistcs = new List<IncomeStatistc>();
            List<GamePack> pubGamePacks = _context.GamePacks.Where(gp => gp.OwnerId == pubId).ToList();

            int currentMonth = DateTime.Now.Month;
            int currentYear = DateTime.Now.Year;

            for (int i = 0; i < 5; i++)
            {
                if (currentMonth == 0)
                {
                    currentMonth = 12;
                    currentYear--;
                }

                var orderDetails = await _context.Payments.Join(_context.OrderDetails, p => p.OrderId, odt => odt.OrderId,
                (p, odt) => new
                {
                    OrderId = p.OrderId,
                    PaymentDate = p.PaymentDate,
                    GamePackId = odt.GamePackId,
                    Amount = odt.Amount,
                    TotalPrice = odt.Price * odt.Amount,
                }).Where(l => l.PaymentDate.Value.Month == currentMonth
                && l.PaymentDate.Value.Year == currentYear)
                .ToListAsync();

                var temp = orderDetails.Where(o => pubGamePacks.Where(p => p.GamePackId == o.GamePackId).Any());

                IncomeStatistc incomeStatistc = new IncomeStatistc()
                {
                    TotalNumberOfSoldProduct = (int)temp.Sum(o => o.Amount),
                    Income = (double)temp.Sum(o => o.TotalPrice),
                    Month = currentMonth,
                    Year = currentYear,
                };

                incomeStatistcs.Add(incomeStatistc);
                currentMonth--;
            }

            return incomeStatistcs;
        }

        public async Task<List<GamePack>> GetBestSellerForShopPage()
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
                .Take(4).ToList();

            List<GamePack> gamePacks = new List<GamePack>();
            foreach (var pack in soldGamePackList)
            {
                gamePacks.Add(await _gamePackService.GetGamePack(pack.GamePackId));
            }

            return gamePacks;
        }
    }
}
