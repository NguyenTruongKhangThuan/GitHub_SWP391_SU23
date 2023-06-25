using Microsoft.AspNetCore.Mvc;
using WereWolfPackShopAPI.Services.CommentService;
using WereWolfPackShopAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WereWolfPackShopAPI.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public IActionResult GetProductComments(string productId)
        {
            List<ProductComment> productComments = _commentService.GetProductComments(productId);
            if(productComments == null)
            {
                return BadRequest("Not Found");
            }
            return Ok(productComments);
        }

        [HttpPost]
        public IActionResult CreateComment(string productId, [FromForm] ProductComment productComment)
        {
            string result = _commentService.CreateComment(productId, productComment);
            if (result.Equals("Success"))
            {
                return Ok("Create Complete");
            }
            return Ok(result);
        }

        [HttpDelete]
        public IActionResult Delete(string commnentId)
        {
            string result = _commentService.DeleteComment(commnentId);
            if (result.Equals("Success"))
            {
                return Ok("Delete Complete");
            }
            return BadRequest(result);
        }

        [HttpPut]
        public IActionResult Ranking(string commentId,int id)
        {
            string result = _commentService.Ranking(commentId, id);
            if (result.Equals("Success"))
            {
                return Ok("Ranked");
            }
            return Ok(result);
        }
    }
}
