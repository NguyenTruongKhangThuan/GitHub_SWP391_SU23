using WereWolfPackShopAPI.Models;

namespace WereWolfPackShopAPI.Services.DiscountService
{
    public class DiscountService : IDiscountService
    {
        private readonly WereWolfPackShopDbContext _dbContext;
        public DiscountService(WereWolfPackShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string CreateNewDiscount(Discount discount)
        {
            try
            {
                bool check = true;
                string id = "D";

                Discount dbDicount = _dbContext.Discounts.Where(d => d.DiscountName == discount.DiscountName).FirstOrDefault();
                if (dbDicount == null)
                {
                    do
                    {
                        Random random = new Random();
                        id += random.Next(1, 100).ToString();

                        if (_dbContext.Discounts.Find(id) == null)
                        {
                            check = false;
                        }
                        else
                        {
                            id = "D";
                        }
                    } while (check);

                    discount.DiscountId = id;
                    _dbContext.Discounts.Add(discount);
                    _dbContext.SaveChanges();
                    return "Success";
                }
                else
                {
                    return "Duplicated";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeleteDiscount(string discountId)
        {
            try
            {
                Discount discount = _dbContext.Discounts.Find(discountId);
                if (discount != null)
                {
                    _dbContext.Discounts.Remove(discount);
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

        public List<Discount> GetDiscountList()
        {
            try
            {
                return _dbContext.Discounts.OrderBy(x => x.DiscountId).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public string UpdateDiscount(Discount discount)
        {
            try
            {
                Discount dbDiscount = _dbContext.Discounts.Find(discount.DiscountId);
                if (dbDiscount != null)
                {
                    dbDiscount.DiscountName = discount.DiscountName;
                    dbDiscount.Description  = discount.Description;
                    dbDiscount.StartDate    = discount.StartDate;
                    discount.EndDate        = discount.EndDate;
                    discount.DiscountValue  = discount.DiscountValue;

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
