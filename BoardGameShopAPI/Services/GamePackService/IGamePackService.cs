using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.GamePackService
{
    public interface IGamePackService
    {
        Task<List<GamePack>> GetAllGamePack();

        Task<List<GamePack>> GetAvailableGamePack();

        Task<List<GamePack>> GetGamePacksByOwner(string ownerId);

        Task<string> DeleteGamePack(string gamePackId);

        Task<string> DeleteMultipleGamePack(List<GamePack> gamePacks);

        Task<string> CreateGamePack(GamePack gamePack);

        Task<string> UpdateGamePack(GamePack gamePack);

        Task<GamePack> GetGamePack(string gamePackId);

        Task<string> DecreaseGamePackAmount(string  gamePackId, int? amount);

        void IncreaseGamePackAmount(string gamePackId, int? amount);

        Task<List<GamePack>> SearchGamePack(string searchValue, string boardGameName);

        //Statistic Calculation
        int GetNumberOfAvailablePack();
    }
}
