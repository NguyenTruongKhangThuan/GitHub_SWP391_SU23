using BoardGameShopAPI.Services.ComponentService;
using BoardGameShopAPI.TempModels2;
using Microsoft.AspNetCore.Components;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.GamePackService
{
    public class GamePackService : IGamePackService
    {
        private readonly BoardGameShopDbContext _context;
        public GamePackService(BoardGameShopDbContext context)
        {
            _context = context;
        }

        public string CreateGanePack(GamePack gamePack)
        {
            try
            {
                GamePack dbGamePack = _context.GamePacks.Where(gp => gp.GamePackName == gamePack.GamePackName).FirstOrDefault();
                if (dbGamePack == null)
                {
                    string tempId = _context.GamePacks.LastOrDefault().GamePackId;
                    string createdId = tempId == null ?
                        "GP000001" :
                        Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value) + 1)
                                      .ToString(new string('0', n.Value.Length)));

                    gamePack.GamePackId = createdId;
                    _context.GamePacks.Add(gamePack);
                    _context.SaveChanges();
                    return "Success";
                }
                else
                {
                    return "Duplicated";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeleteGamePack(string gamePackId)
        {
            try
            {
                GamePack gamePack = _context.GamePacks.Find(gamePackId);
                if (gamePack == null)
                {
                    return "NotFound";
                }
                else
                {
                    gamePack.AvailableAmount = -1;
                    _context.GamePacks.Update(gamePack);
                    _context.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public List<GamePack> GetAllGamePack()
        {
            try
            {
                return _context.GamePacks.Where(gp => gp.AvailableAmount >= 0).OrderBy(gp => gp.GamePackId).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<GamePack> GetGamePacksByOwner(string ownerId)
        {
            try
            {
                return _context.GamePacks.Where(gp => gp.OwnerId == ownerId)
                    .OrderBy(gp => gp.GamePackId).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string UpdateGamePack(GamePack gamePack)
        {
            try
            {
                if (_context.GamePacks.Find(gamePack.GamePackId) != null)
                {
                    _context.GamePacks.Update(gamePack);
                    _context.SaveChanges();
                    return "Success";
                }
                else
                {
                    return "NotFound";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
