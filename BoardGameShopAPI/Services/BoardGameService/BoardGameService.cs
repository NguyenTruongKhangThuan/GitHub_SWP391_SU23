using BoardGameShopAPI.TempModels2;
using System.Text.RegularExpressions;

namespace BoardGameShopAPI.Services.BoardGameService
{
    public class BoardGameService : IBoardGameService
    {
        private readonly BoardGameShopDbContext _context;
        public BoardGameService(BoardGameShopDbContext context)
        {
            _context = context;
        }

        public string CreateBoardGame(BoardGame boardGame)
        {
            try
            {
                if (_context.BoardGames.Where(bg => bg.Name == boardGame.Name).FirstOrDefault() == null)
                {
                    string tempId = _context.BoardGames.LastOrDefault().BoardGameId;
                    string createdId = tempId == null ?
                        "O00000001" :
                        Regex.Replace(tempId, "\\d+", n => (int.Parse(n.Value) + 1)
                                      .ToString(new string('0', n.Value.Length)));

                    boardGame.BoardGameId = createdId;
                    _context.BoardGames.Add(boardGame);
                    _context.SaveChanges();
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

        public string DeleteBoardGame(string boardGameId)
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
                    _context.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public List<BoardGame> GetBoardGames()
        {
            try
            {
                return _context.BoardGames.OrderBy(bg => bg.BoardGameId).ToList();
            }
            catch(Exception)
            {
                return null;
            }
        }

        public string UpdateBoardGame(BoardGame boardGame)
        {
            try
            {
                if(_context.BoardGames.Find(boardGame.BoardGameId) != null)
                {
                    _context.BoardGames.Update(boardGame);
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
