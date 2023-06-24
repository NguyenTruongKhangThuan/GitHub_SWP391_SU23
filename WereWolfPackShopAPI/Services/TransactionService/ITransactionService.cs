using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.TransactionService
{
    public interface ITransactionService
    {
        List<Transaction> GetAllTransactions();

        string CreateTransaction(string orderId, Transaction transaction);

        string DeleteTransaction(string transactionId);

        //Statistic Function

    }
}
