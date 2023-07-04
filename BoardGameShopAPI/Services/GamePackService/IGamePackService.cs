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

        GamePack GetGamePack(string gamePackId);

        string DecreaseGamePackAmount(string  gamePackId, int? amount);

        void IncreaseGamePackAmount(string gamePackId, int? amount);

        //Statistic Calculation
        int GetNumberOfAvailablePack();
    }
}
