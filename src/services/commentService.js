const commentRepository = require("../repositories/commentRepository");
const postRepository = require("../repositories/postRepository");
const AppError = require("../utils/AppError");

class CommentService {
  async addComment(postId, commentData) {
    // Check if post exists and is published
    const post = await postRepository.findById(postId, false);
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    return await commentRepository.create({
      text: commentData.text,
      authorName: commentData.authorName || "Anonymous",
      postId,
    });
  }

  async getCommentsByPostId(postId) {
    const post = await postRepository.findById(postId, false);
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    return await commentRepository.findByPostId(postId);
  }

  async deleteComment(commentId, userRole) {
    // Only authors can delete comments
    if (userRole !== "AUTHOR") {
      throw new AppError("Not authorized to delete comments", 403);
    }

    const comment = await commentRepository.findById(commentId);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    return await commentRepository.delete(commentId);
  }
}

module.exports = new CommentService();
