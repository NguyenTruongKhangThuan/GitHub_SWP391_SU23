using WereWolfPackShopAPI.Models;

namespace WereWolfPackShopAPI.Services.CommentService
{
    public interface ICommentService
    {
        List<ProductComment> GetAllComments();

        List<ProductComment> GetProductComments(string productId);

        string ApproveComment(string commentId, bool approval);

        string CreateComment(string productId, ProductComment comment);

        string DeleteComment(string commentId);

        string Ranking(string commentId, int rank);
    }
}
