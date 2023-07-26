using BoardGameShopAPI.Services.ComponentService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Components;
using System.Text.RegularExpressions;
using System.Numerics;
using Microsoft.EntityFrameworkCore;

namespace BoardGameShopAPI.Services.GamePackService
{
    public class GamePackService : IGamePackService
    {
        private readonly string ModelName = "GamePacks";

        private readonly DbA9bc42BoardgameshopdbContext _context;
        public GamePackService(DbA9bc42BoardgameshopdbContext context)
        {
            _context = context;
        }

        public async Task<string> CreateGamePack(GamePack gamePack)
        {
            try
            {
                GamePack dbGamePack = _context.GamePacks.Where(gp => gp.GamePackName == gamePack.GamePackName).FirstOrDefault();
                if (dbGamePack == null)
                {
                    string createdId = _context.GamePacks.OrderBy(x => x.GamePackId).LastOrDefault() == null ?
                        "GP000001" :
                        Regex.Replace(_context.GamePacks.OrderBy(x => x.GamePackId).LastOrDefault().GamePackId,
                        "\\d+", n => (int.Parse(n.Value) + 1).ToString(new string('0', n.Value.Length)));

                    gamePack.GamePackId = createdId;
                    gamePack.Owner = _context.Owners.Find(gamePack.OwnerId);
                    gamePack.BoardGame = _context.BoardGames.Find(gamePack.BoardGameId);

                    _context.GamePacks.Add(gamePack);
                    await _context.SaveChangesAsync();
                    return $"Success/{gamePack.GamePackId}";
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

        public async Task<string> DeleteGamePack(string gamePackId)
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
                    await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteMultipleGamePack(List<GamePack> gamePacks)
        {
            try
            {
                foreach (var pack in gamePacks)
                {
                    GamePack gamePack = _context.GamePacks.Find(pack.GamePackId);
                    gamePack.AvailableAmount = -1;
                    _context.Update(gamePack);
                    await _context.SaveChangesAsync();
                }
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<List<GamePack>> GetAllGamePack()
        {
            try
            {
                return await _context.GamePacks.OrderBy(gp => gp.GamePackId).ToListAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<GamePack>> GetAvailableGamePack()
        {
            try
            {
                return await _context.GamePacks.Where(gp => gp.AvailableAmount >= 0).OrderBy(gp => gp.BoardGameId).ToListAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<GamePack>> GetGamePacksByOwner(string ownerId)
        {
            try
            { 
                return await _context.GamePacks.Where(gp => gp.OwnerId == ownerId && gp.AvailableAmount != -1).OrderBy(gp => gp.GamePackId).ToListAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<string> UpdateGamePack(GamePack gamePack)
        {
            try
            {
                GamePack dbGamePack = _context.GamePacks.Find(gamePack.GamePackId);
                if (dbGamePack != null)
                {
                    _context.Entry(dbGamePack).CurrentValues.SetValues(gamePack);
                    await _context.SaveChangesAsync();
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

        public async Task<GamePack> GetGamePack(string gamePackId)
        {
            return await  _context.GamePacks.FindAsync(gamePackId);
        }

        public async Task<GamePack> GetGamePackByPubId(string pubId, string gamePackId)
        {
            return await _context.GamePacks.Where(gp => gp.GamePackId == gamePackId && gp.OwnerId == pubId).FirstOrDefaultAsync();
        }

        public async Task<string> DecreaseGamePackAmount(string gamePackId, int? amount)
        {
            GamePack gamePack = _context.GamePacks.Find(gamePackId);
            if (gamePack.AvailableAmount >= amount)
            {
                gamePack.AvailableAmount -= amount;
                await _context.SaveChangesAsync();
                return "Success";
            }
            else
            {
                return "NotEnough";
            }
        }

        public async void IncreaseGamePackAmount(string gamePackId, int? amount)
        {
            GamePack gamePack = _context.GamePacks.Find(gamePackId);
            gamePack.AvailableAmount += amount;
            await _context.SaveChangesAsync();
        }

        public async Task<List<GamePack>> SearchGamePack(string? searchValue, string? boardGameName)
        {
            IQueryable<GamePack> gamePacks = _context.GamePacks.Where(gp => gp.GamePackName.Contains(searchValue == null?"":searchValue));

            if (boardGameName == null || boardGameName == "All")
            {
                return await  gamePacks.ToListAsync();
            }
            else
            {
                return await gamePacks.Where(gp => gp.BoardGame.Name ==  boardGameName).ToListAsync();
            }
        }

        //Statistic Calculation
        public async Task<int> GetNumberOfAvailablePack()
        {
            try
            {
                return (int)await _context.GamePacks.Where(gp => gp.AvailableAmount >= 0).SumAsync(gp => gp.AvailableAmount);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return int.MinValue;
            }
        }
    }
}
