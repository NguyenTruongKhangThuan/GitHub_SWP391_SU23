using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.TransactionService
{
    public interface ITransactionService
    {
        List<Transaction> GetAllTransactions();

        List<Transaction> GetTransactions(string userId);

        string CreateTransaction(string userId, string orderId, Transaction transaction);

        string DeleteTransaction(string transactionId);

        //Statistic Function

    }
}
