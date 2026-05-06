const postService = require("../services/postService");

class PostController {
  async getAllPosts(req, res, next) {
    try {
      const includeUnpublished = req.query.includeUnpublished === "true";
      const userRole = req.user?.role;

      const posts = await postService.getAllPosts(includeUnpublished, userRole);
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req, res, next) {
    try {
      const { id } = req.params;
      const userRole = req.user?.role;

      const post = await postService.getPostById(parseInt(id), userRole);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async createPost(req, res, next) {
    try {
      const { title, content, published } = req.body;
      const authorId = req.user.id;

      const post = await postService.createPost(
        { title, content, published },
        authorId,
      );
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, published } = req.body;
      const userId = req.user.id;
      const userRole = req.user.role;

      const post = await postService.updatePost(
        parseInt(id),
        { title, content, published },
        userId,
        userRole,
      );
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      await postService.deletePost(parseInt(id), userId, userRole);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async togglePublish(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      const post = await postService.togglePublish(
        parseInt(id),
        userId,
        userRole,
      );
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
