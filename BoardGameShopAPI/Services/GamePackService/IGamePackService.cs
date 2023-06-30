using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.GamePackService
{
    public interface IGamePackService
    {
        List<GamePack> GetAllGamePack();

        List<GamePack> GetGamePacksByOwner(string ownerId);

        string DeleteGamePack(string gamePackId);

        string CreateGamePack(GamePack gamePack);

        string UpdateGamePack(GamePack gamePack);

        //Statistic Calculation
        int GetNumberOfAvailablePack();
    }
}
