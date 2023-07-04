using BoardGameShopAPI.Services.ComponentService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Components;
using System.Text.RegularExpressions;
using BoardGameShopAPI.Services.FirebaseCloundService;
using System.Numerics;

namespace BoardGameShopAPI.Services.GamePackService
{
    public class GamePackService : IGamePackService
    {
        private readonly string ModelName = "GamePacks";

        private readonly IFirebaseCloundService _firebaseCloundService;
        private readonly BoardGameShopDbContext _context;
        public GamePackService(BoardGameShopDbContext context, IFirebaseCloundService firebaseCloundService)
        {
            _context = context;
            _firebaseCloundService = firebaseCloundService;
        }

        public string CreateGamePack(GamePack gamePack)
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

                    _firebaseCloundService.UploadImage(gamePack.ImageSrc, gamePack.Image, ModelName);

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
                return GetPackList().Where(gp => gp.AvailableAmount >= 0).OrderBy(gp => gp.GamePackId).ToList();
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
                return GetPackList().Where(gp => gp.OwnerId == ownerId)
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
                    _firebaseCloundService.UpdateImage(gamePack.ImageSrc, gamePack.Image, ModelName);

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

        private List<GamePack> GetPackList()
        {
            return _context.GamePacks.Select(gp => new GamePack()
            {
                GamePackId = gp.GamePackId,
                BoardGameId = gp.BoardGameId,
                OwnerId = gp.OwnerId,
                GamePackName = gp.GamePackName,
                Image = gp.Image,
                Description = gp.Description,
                Price = gp.Price,
                Age = gp.Age,
                NumberOfPlayer = gp.NumberOfPlayer,
                GameDuration = gp.GameDuration,
                Origin = gp.Origin,
                Weight = gp.Weight,
                Size = gp.Size,
                Material = gp.Material,
                GameRule = gp.GameRule,
                AvailableAmount = gp.AvailableAmount,
                ImageSrc = _firebaseCloundService.RetrieveImage(gp.Image, ModelName)
            }).ToList();
        }

        public GamePack GetGamePack(string gamePackId)
        {
            return _context.GamePacks.Find(gamePackId);
        }

        public string DecreaseGamePackAmount(string gamePackId, int? amount)
        {
            GamePack gamePack = _context.GamePacks.Find(gamePackId);
            if (gamePack.AvailableAmount > amount)
            {
                gamePack.AvailableAmount -= amount;
                _context.SaveChanges();
                return "Success";
            }
            else
            {
                return "NotEnough";
            }
        }

        public void IncreaseGamePackAmount(string gamePackId, int? amount)
        {
            GamePack gamePack = _context.GamePacks.Find(gamePackId);
            gamePack.AvailableAmount += amount;
            _context.SaveChanges();
        }

        //Statistic Calculation
        public int GetNumberOfAvailablePack()
        {
            try
            {
                return (int)GetPackList().Where(gp => gp.AvailableAmount >= 0).Sum(gp => gp.AvailableAmount);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return int.MinValue;
            }
        }
    }
}
