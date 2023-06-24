using System.Numerics;
using WereWolfPackShopAPI.TempModels2;

namespace WereWolfPackShopAPI.Services.UserService
{
    public interface IUserService
    {
        string CreateInfoToken(User user);

        User ReadInfoToken(string jwtToken);

        List<User> GetAllUsers();

        string CreateNewUserAccount(User user);

        string UpdateUserAccount(User user);

        string DeleteUserAccount(string userId);

        User Login(string userName, string password);
    }
}
