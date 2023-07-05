using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.GameTagService
{
    public interface IGameTagService
    {
        Task<List<GameTag>> GetGameTag();

        Task<string> AddNewGameTag(GameTag gameTag);

        Task<string> UpdateGameTag(GameTag gameTag);

        Task<string> DeleteGameTag(string gameTagId);

        Task<GameTag> GetGameTagById(string gameTagId);
    }
}
