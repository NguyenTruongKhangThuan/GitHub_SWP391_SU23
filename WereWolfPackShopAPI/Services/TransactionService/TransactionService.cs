using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.TransactionService
{
    public class TransactionService : ITransactionService
    {
        private readonly WereWolfPackShopDbContext _dbContext;
        public TransactionService(WereWolfPackShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string CreateTransaction(string orderId, Transaction transaction)
        {
            throw new NotImplementedException();
        }

        public string DeleteTransaction(string transactionId)
        {
            throw new NotImplementedException();
        }

        public List<Transaction> GetAllTransactions()
        {
            try
            {
                return _dbContext.Transactions.OrderByDescending(t => t.TransactionDate).ToList();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
