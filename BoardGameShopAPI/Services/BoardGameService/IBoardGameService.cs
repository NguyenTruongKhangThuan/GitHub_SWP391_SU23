using BoardGameShopAPI.Models;

namespace BoardGameShopAPI.Services.BoardGameService
{
    public interface IBoardGameService
    {
        Task<List<BoardGame>> GetBoardGames();

        Task<string> CreateBoardGame(BoardGame boardGame);

        Task<string> UpdateBoardGame(BoardGame boardGame);

        Task<string> DeleteBoardGame(string boardGameId);
    }
}
