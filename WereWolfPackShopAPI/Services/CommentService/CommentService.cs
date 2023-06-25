using WereWolfPackShopAPI.Models;

namespace WereWolfPackShopAPI.Services.CommentService
{
    public class CommentService : ICommentService
    {
        private readonly WereWolfPackShopDbContext _dbContext;
        public CommentService(WereWolfPackShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string ApproveComment(string commentId, bool approval)
        {
            try
            {
                ProductComment productComment = _dbContext.ProductComments.Find(commentId);
                if(productComment == null)
                {
                    return "Not Found";
                }
                else
                {
                    productComment.Approval = approval;
                    _dbContext.SaveChanges();
                    return "Success";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public string CreateComment(string productId, ProductComment comment)
        {
            try
            {
                bool check = true;
                string id = "Com";

                do
                {
                    Random random = new Random();
                    id += random.Next(1, 100000).ToString();

                    if (_dbContext.ProductComments.Find(id) == null)
                    {
                        check = false;
                    }
                    else
                    {
                        id = "Com";
                    }
                } while (check);

                comment.ProductCommentId = id;
                comment.ProductId = productId;
                _dbContext.ProductComments.Add(comment);
                _dbContext.SaveChanges();

                return "Success";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public string DeleteComment(string commentId)
        {
            try
            {
                ProductComment productComment = _dbContext.ProductComments.Find(commentId);
                if (productComment == null)
                {
                    return "Not Found";
                }
                else
                {
                    _dbContext.ProductComments.Remove(productComment);
                    _dbContext.SaveChanges();
                    return "Success";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public List<ProductComment> GetAllComments()
        {
            try
            {
                return _dbContext.ProductComments.OrderBy(pc => pc.ProductId).ThenBy(pc => pc.ProductCommentId).ToList();
            }
            catch(Exception)
            {
                return null;
            }
        }

        public List<ProductComment> GetProductComments(string productId)
        {
            try
            {
                return _dbContext.ProductComments.Where(pc => pc.ProductId == productId)
                    .OrderByDescending(pc => pc.CreatedDate).ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string Ranking(string commentId, int rank)
        {
            try
            {
                ProductComment productComment = _dbContext.ProductComments.Find(commentId);
                if (productComment == null)
                {
                    return "Not Found";
                }
                else
                {
                    productComment.Ranking = rank;
                    _dbContext.SaveChanges();
                    return "Success";
                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
