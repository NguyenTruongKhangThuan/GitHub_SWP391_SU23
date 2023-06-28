using BoardGameShopAPI.TempModels2;

namespace BoardGameShopAPI.Services.PaymentService
{
    public interface IPaymentService
    {
        //Basic CRUD
        List<Payment> GetAllPayment();

        List<Payment> GetPaymentList(string userId); //Get the User {id}'s  Payment

        string DeletePayment(string paymentId);

        string UpdatePayment(Payment payment);

        string UpdatePaymentState(string paymentId, string state);

        string CreatePayment(Payment payment);

        //Statistic Calculation:
    }
}
