using BoardGameShopAPI.Models;
using BoardGameShopAPI.Services.FirebaseCloundService;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.BoardGameService
{
    public class BoardGameService : IBoardGameService
    {
        private readonly string ModelName = "BoardGames";

        private readonly BoardGameShopDbContext _context;
        private readonly IFirebaseCloundService _firebaseCloundService;
        public BoardGameService(BoardGameShopDbContext context, IFirebaseCloundService firebaseCloundService)
        {
            _context = context;
            _firebaseCloundService = firebaseCloundService;
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

                    _firebaseCloundService.UploadImage(boardGame.ImageSrc, boardGame.Image, ModelName);
                    //Create BoardGame
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
                    _firebaseCloundService.DeleteImage(boardGame.Image, ModelName);

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
                return await _context.BoardGames.Select(bg => new BoardGame()
                {
                    BoardGameId = bg.BoardGameId,
                    Name = bg.Name,
                    Description = bg.Description,
                    Image = bg.Image,
                    ImageSrc = _firebaseCloundService.RetrieveImage(bg.Image, ModelName),
                }).OrderBy(bg => bg.BoardGameId).ToListAsync();
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
                    _firebaseCloundService.UpdateImage(boardGame.ImageSrc, boardGame.Image, ModelName);

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
