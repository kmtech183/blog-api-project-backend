const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const { authenticate, authorizeAuthor } = require("../middleware/auth");
const {
  validate,
  postValidation,
  commentValidation,
  userValidation,
} = require("../middleware/validation");

// Public routes
router.post(
  "/auth/register",
  validate(userValidation),
  authController.register,
);
router.post("/auth/login", authController.login);

// Public post routes
router.get("/posts", postController.getAllPosts);
router.get("/posts/:id", postController.getPostById);
router.post(
  "/posts/:id/comments",
  validate(commentValidation),
  commentController.addComment,
);
router.get("/posts/:id/comments", commentController.getCommentsByPost);

// Protected author routes
router.use("/dashboard", authenticate);
router.use("/dashboard", authorizeAuthor);

router.get("/dashboard/posts", postController.getAllPosts);
router.post(
  "/dashboard/posts",
  validate(postValidation),
  postController.createPost,
);
router.put(
  "/dashboard/posts/:id",
  validate(postValidation),
  postController.updatePost,
);
router.delete("/dashboard/posts/:id", postController.deletePost);
router.patch("/dashboard/posts/:id/publish", postController.togglePublish);
router.delete("/dashboard/comments/:id", commentController.deleteComment);

module.exports = router;
