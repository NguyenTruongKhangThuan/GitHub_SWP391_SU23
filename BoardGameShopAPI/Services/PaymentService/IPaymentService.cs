using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.PaymentService
{
    public interface IPaymentService
    {
        //Basic CRUD
        Task<List<Payment>> GetAllPayment();

        Task<List<Payment>> GetPaymentList(string userId); //Get the User {id}'s  Payment

        Task<string> DeletePayment(string paymentId);

        Task<string> UpdatePayment(Payment payment);

        Task<string> UpdatePaymentState(string paymentId, string state);

        Task<string> CreatePayment(Payment payment);

        //Statistic Calculation:
        Task<List<IncomeStatistc>> TotalIncome();

        Task<List<GamePack>> GetBestSeller();

        Task<List<GamePack>> GetBestSellerOfPub(string pubId);

        Task<List<IncomeStatistc>> GetSoldNumOfPubProduct(string pubId);
    }
}
