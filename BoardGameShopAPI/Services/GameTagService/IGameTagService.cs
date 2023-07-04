using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.GameTagService
{
    public interface IGameTagService
    {
        List<GameTag> GetGameTag();

        string AddNewGameTag(GameTag gameTag);

        string UpdateGameTag(GameTag gameTag);

        string DeleteGameTag(string gameTagId);

        GameTag GetGameTagById(string gameTagId);
    }
}
