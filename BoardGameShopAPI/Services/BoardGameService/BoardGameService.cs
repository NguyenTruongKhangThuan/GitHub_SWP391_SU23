using BoardGameShopAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.BoardGameService
{
    public class BoardGameService : IBoardGameService
    {
        private readonly string ModelName = "BoardGames";

        private readonly DbA9bc42BoardgameshopdbContext _context;
        public BoardGameService(DbA9bc42BoardgameshopdbContext context)
        {
            _context = context;
        }

        public async Task<string> CreateBoardGame(BoardGame boardGame)
        {
            try
            {
                if (_context.BoardGames.Where(bg => bg.Name == boardGame.Name).FirstOrDefault() == null)
                {
                    string createdId = _context.BoardGames.OrderBy(x => x.BoardGameId).LastOrDefault() == null ?
                        "BG00000001" :
                        Regex.Replace(_context.BoardGames.OrderBy(x => x.BoardGameId).LastOrDefault().BoardGameId,
                        "\\d+", n => (int.Parse(n.Value) + 1).ToString(new string('0', n.Value.Length)));

                    boardGame.BoardGameId = createdId;
                    _context.BoardGames.Add(boardGame);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
                else
                {
                    return "Duplicated";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteBoardGame(string boardGameId)
        {
            try
            {
                BoardGame boardGame = _context.BoardGames.Find(boardGameId);
                if (boardGame == null)
                {
                    return "NotFound";
                }
                else
                {
                    _context.BoardGames.Remove(boardGame);
                    await _context.SaveChangesAsync();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<List<BoardGame>> GetBoardGames()
        {
            try
            {
                return await _context.BoardGames.OrderBy(bg => bg.BoardGameId).ToListAsync();
            }
            catch(Exception)
            {
                return null;
            }
        }

        public async Task<string> UpdateBoardGame(BoardGame boardGame)
        {
            try
            {
                BoardGame dbBoardGame = _context.BoardGames.Find(boardGame.BoardGameId);
                if (dbBoardGame != null)
                {
                    _context.Entry(dbBoardGame).CurrentValues.SetValues(boardGame);
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
