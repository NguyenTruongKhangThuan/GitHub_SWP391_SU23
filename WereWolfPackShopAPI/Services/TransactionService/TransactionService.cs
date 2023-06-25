using WereWolfPackShopAPI.Models;

namespace WereWolfPackShopAPI.Services.TransactionService
{
    public class TransactionService : ITransactionService
    {
        private readonly WereWolfPackShopDbContext _dbContext;
        public TransactionService(WereWolfPackShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string CreateTransaction(string userId, string orderId, Transaction transaction)
        {
            try
            {
                string id = "T";
                bool check = true;

                do
                {
                    Random random = new Random();
                    id += random.Next(1, 1000000);

                    if(_dbContext.Transactions.Find(id) == null)
                    {
                        id = "T";
                    }
                    else
                    {
                        check = false;
                    }
                } while (check);

                transaction.UserId = userId;
                transaction.OrderId = orderId;
                _dbContext.Transactions.Add(transaction);  
                _dbContext.SaveChanges();
                return "Success";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeleteTransaction(string transactionId)
        {
            try
            {
                Transaction transaction = _dbContext.Transactions.Find(transactionId);
                if (transaction != null)
                {
                    _dbContext.Transactions.Remove(transaction);
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

        public List<Transaction> GetTransactions(string userId)
        {
            try
            {
                return _dbContext.Transactions.Where(t => t.UserId == userId).ToList();    
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
