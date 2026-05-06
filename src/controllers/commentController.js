const commentService = require("../services/commentService");

class CommentController {
  async addComment(req, res, next) {
    try {
      const { id: postId } = req.params;
      const { text, authorName } = req.body;

      const comment = await commentService.addComment(parseInt(postId), {
        text,
        authorName,
      });
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByPost(req, res, next) {
    try {
      const { id: postId } = req.params;
      const comments = await commentService.getCommentsByPostId(
        parseInt(postId),
      );
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { id: commentId } = req.params;
      const userRole = req.user.role;

      await commentService.deleteComment(parseInt(commentId), userRole);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
