using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.TagInPackService
{
    public interface ITagInPackService
    {
        Task<string> AddTagToPack(string gamePackId,  string tag);

        Task<List<GameTag>> GetTagInPack(string gamePackId);
    }
}
