using BoardGameShopAPI.TempModels2;

namespace BoardGameShopAPI.Services.BoardGameService
{
    public interface IBoardGameService
    {
        List<BoardGame> GetBoardGames();

        string CreateBoardGame(BoardGame boardGame);

        string UpdateBoardGame(BoardGame boardGame);

        string DeleteBoardGame(string boardGameId);
    }
}
