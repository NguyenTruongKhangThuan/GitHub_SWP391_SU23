using BoardGameShopAPI.TempModels2;

namespace BoardGameShopAPI.Services.GamePackService
{
    public interface IGamePackService
    {
        List<GamePack> GetAllGamePack();

        List<GamePack> GetGamePacksByOwner(string ownerId);

        string DeleteGamePack(string gamePackId);

        string CreateGanePack(GamePack gamePack);

        string UpdateGamePack(GamePack gamePack);
    }
}
