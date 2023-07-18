﻿using BoardGameShopAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.GameTagService
{
    public class GameTagService : IGameTagService
    {
        private readonly DbA9bc42BoardgameshopdbContext _context;
        public GameTagService(DbA9bc42BoardgameshopdbContext context)
        {
            _context = context;
        }


        public async Task<string> AddNewGameTag(GameTag gameTag)
        {
            try
            {
                string createdId = _context.GameTags.OrderBy(x => x.GameTagId).LastOrDefault() == null ?
                    "GT001" :
                    Regex.Replace(_context.GameTags.OrderBy(x => x.GameTagId).LastOrDefault().GameTagId, 
                    "\\d+", n => (int.Parse(n.Value) + 1).ToString(new string('0', n.Value.Length)));

                gameTag.GameTagId = createdId;
                _context.GameTags.Add(gameTag);
                await _context.SaveChangesAsync();
                return "Success";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteGameTag(string gameTagId)
        {
            try
            {
                GameTag gameTag = _context.GameTags.Find(gameTagId);
                if (gameTag != null)
                {
                    _context.GameTags.Remove(gameTag);
                    await _context.SaveChangesAsync();
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

        public async Task<List<GameTag>> GetGameTag()
        {
            try
            {
                return await _context.GameTags.OrderBy(gt => gt.GameTagName).ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<GameTag> GetGameTagById(string gameTagId)
        {
            try
            {
                GameTag gameTag = await _context.GameTags.FindAsync(gameTagId);
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

        public async Task<string> UpdateGameTag(GameTag gameTag)
        {
            try
            {
                GameTag dbGameTag = _context.GameTags.Find(gameTag.GameTagId);
                if(dbGameTag != null)
                {
                    _context.Entry(dbGameTag).CurrentValues.SetValues(gameTag);
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
    }
}