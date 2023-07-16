using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.TagInPackService
{
    public class TagInPackService : ITagInPackService
    {
        private readonly BoardGameShopDbContext _context;
        public TagInPackService(BoardGameShopDbContext context)
        {
            _context = context;
        }

        public async Task<string> AddTagToPack(string gamePackId, string tag)
        {
            try
            {
                TagInPack tagInPack = new TagInPack();
                tagInPack.GamePackId = gamePackId;
                tagInPack.GameTagId = _context.GameTags.Where(gt => gt.GameTagName == tag).FirstOrDefault() == null ? "" : 
                                        _context.GameTags.Where(gt => gt.GameTagName == tag).FirstOrDefault().GameTagId;

                _context.TagInPacks.Add(tagInPack);
                await _context.SaveChangesAsync();

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
                List<TagInPack> tagInPack = _context.TagInPacks.Where(tig => tig.GamePackId ==  gamePackId).ToList();
                List<GameTag> tags = new List<GameTag>();

                foreach (var item in tagInPack)
                {
                    GameTag gameTag = await _context.GameTags.FindAsync(item.GameTagId);
                    tags.Add(gameTag);
                }

                return tags;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
