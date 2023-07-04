﻿using BoardGameShopAPI.Models;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.GameTagService
{
    public class GameTagService : IGameTagService
    {
        private readonly BoardGameShopDbContext _context;
        public GameTagService(BoardGameShopDbContext context)
        {
            _context = context;
        }


        public string AddNewGameTag(GameTag gameTag)
        {
            try
            {
                string tempId = _context.GameTags.LastOrDefault().GameTagName;
                string createdId = tempId == null ?
                    "GT001" :
                    Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value) + 1)
                                  .ToString(new string('0', n.Value.Length)));

                gameTag.GameTagId = createdId;
                _context.GameTags.Add(gameTag);
                _context.SaveChanges();
                return "Success";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeleteGameTag(string gameTagId)
        {
            try
            {
                GameTag gameTag = _context.GameTags.Find(gameTagId);
                if (gameTag != null)
                {
                    _context.GameTags.Remove(gameTag);
                    _context.SaveChanges();
                    return "Success";
                }
                else
                {
                    return "NotFound";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public List<GameTag> GetGameTag()
        {
            try
            {
                return _context.GameTags.OrderBy(gt => gt.GameTagName).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public GameTag GetGameTagById(string gameTagId)
        {
            try
            {
                GameTag gameTag = _context.GameTags.Find(gameTagId);
                if (gameTag != null)
                {
                    return gameTag;
                }
                else
                {
                    return new GameTag();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public string UpdateGameTag(GameTag gameTag)
        {
            try
            {
                GameTag dbGameTag = _context.GameTags.Find(gameTag.GameTagId);
                if(dbGameTag != null)
                {
                    _context.GameTags.Update(gameTag);
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