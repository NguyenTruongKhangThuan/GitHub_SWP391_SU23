using WereWolfPackShopAPI.Models;

namespace WereWolfPackShopAPI.Services.DiscountService
{
    public interface IDiscountService
    {
        List<Discount> GetDiscountList();

        string CreateNewDiscount(Discount discount);

        string UpdateDiscount(Discount discount);

        string DeleteDiscount(string discountId);
    }
}
