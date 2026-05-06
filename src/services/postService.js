const postRepository = require("../repositories/postRepository");
const AppError = require("../utils/AppError");

class PostService {
  async createPost(postData, authorId) {
    return await postRepository.create({
      ...postData,
      authorId,
    });
  }

  async getAllPosts(includeUnpublished = false, userRole = null) {
    // Only authors can see unpublished posts
    const canSeeUnpublished = includeUnpublished && userRole === "AUTHOR";
    return await postRepository.findAll(canSeeUnpublished);
  }

  async getPostById(id, userRole = null) {
    const canSeeUnpublished = userRole === "AUTHOR";
    const post = await postRepository.findById(id, canSeeUnpublished);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    return post;
  }

  async updatePost(id, postData, userId, userRole) {
    const post = await postRepository.findById(id, true);
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    // Check authorization (only author of the post or admin)
    if (post.authorId !== userId && userRole !== "AUTHOR") {
      throw new AppError("Not authorized to update this post", 403);
    }

    return await postRepository.update(id, postData);
  }

  async deletePost(id, userId, userRole) {
    const post = await postRepository.findById(id, true);
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if (post.authorId !== userId && userRole !== "AUTHOR") {
      throw new AppError("Not authorized to delete this post", 403);
    }

    return await postRepository.delete(id);
  }

  async togglePublish(id, userId, userRole) {
    const post = await postRepository.findById(id, true);
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if (post.authorId !== userId && userRole !== "AUTHOR") {
      throw new AppError("Not authorized to modify this post", 403);
    }

    return await postRepository.togglePublish(id);
  }
}

module.exports = new PostService();
