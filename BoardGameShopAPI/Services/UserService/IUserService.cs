using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.UserService
{
    public interface IUserService
    {
        //Authentication Method For Login
        string CreateAuthToken(User user);

        User ReadAuthToken(string authToken);

        //Basic CRUD Method for User
        Task<List<User>> ReadUserList();

        Task<string> CreateUserAccount(User user);

        Task<User> Login(string username, string password);

        Task<string> UpdateUserAccount(User user);

        //Statistic Calculation
        int GetNumberOfUserAccount();
    }
}
