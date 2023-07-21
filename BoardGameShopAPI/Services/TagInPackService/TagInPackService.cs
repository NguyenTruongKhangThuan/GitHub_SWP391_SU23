using BoardGameShopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BoardGameShopAPI.Services.TagInPackService
{
    public class TagInPackService : ITagInPackService
    {
        private readonly DbA9bc42BoardgameshopdbContext _context;
        public TagInPackService(DbA9bc42BoardgameshopdbContext context)
        {
            _context = context;
        }

        public async Task<string> AddTagToPack(string gamePackId, string[] tagIds)
        {
            try
            {
                if(_context.GamePacks.Find(gamePackId) == null)
                {
                    return "GamePack NotFound";
                }
                foreach (string tagId in tagIds)
                {
                    TagInPack tagInPack = new TagInPack();
                    tagInPack.GamePackId = gamePackId;
                    tagInPack.GameTagId = tagId;

                    _context.TagInPacks.Add(tagInPack);
                    await _context.SaveChangesAsync();
                }

                return "Success";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<List<GameTag>> GetTagInPack(string gamePackId)
        {
            try
            {
                var joinList = await _context.TagInPacks.Join(_context.GameTags, tip => tip.GameTagId, gt => gt.GameTagId,
                    (tid, gt) => new
                    {
                        GamePackId = tid.GamePackId,
                        GameTagId = gt.GameTagId
                    }).Where(l => l.GamePackId == gamePackId).ToListAsync();

                List<GameTag> result = new List<GameTag>();
                foreach (var tag in joinList)
                {
                    GameTag tagInPack = _context.GameTags.Find(tag.GameTagId);
                    result.Add(tagInPack);
                }

                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
