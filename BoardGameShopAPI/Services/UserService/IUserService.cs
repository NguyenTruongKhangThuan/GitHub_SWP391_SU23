using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.UserService
{
    public interface IUserService
    {
        //Authentication Method For Login
        Task<string> CreateAuthToken(User user);

        Task<User> ReadAuthToken(string authToken);

        Task<string> SignInInputValidation(User user, string confirmPassword);

        //Basic CRUD Method for User
        Task<List<User>> ReadUserList();

        Task<string> CreateUserAccount(User user);

        Task<User> Login(string username, string password);

        Task<string> UpdateUserAccount(User user);

        //Statistic Calculation
        Task<int> GetNumberOfUserAccount();
    }
}
