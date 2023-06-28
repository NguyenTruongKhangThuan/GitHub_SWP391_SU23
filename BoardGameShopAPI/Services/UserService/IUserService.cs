using BoardGameShopAPI.TempModels2;

namespace BoardGameShopAPI.Services.UserService
{
    public interface IUserService
    {
        //Authentication Method For Login
        string CreateAuthToken(User user);

        User ReadAuthToken(string authToken);

        //Basic CRUD Method for User
        List<User> ReadUserList();

        string CreateUserAccount(User user);

        User Login(string username, string password);

        string UpdateUserAccount(User user);
    }
}
