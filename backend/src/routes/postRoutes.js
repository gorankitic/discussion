// modules
const express = require("express");
// controllers
const { createPost, getAllPosts, getPost, updatePost, deletePost } = require("../controllers/postControllers");
// middlewares
const { protect } = require("../middlewares/authMiddlewares");
// routes
const commentRouter = require("../routes/commentRoutes");

const router = express.Router();

router.use("/:postId/comments", commentRouter);
router.use(protect);

router
    .route("/")
    .get(getAllPosts)
    .post(createPost)

router
    .route("/:postId")
    .get(getPost)
    .patch(updatePost)
    .delete(deletePost)

module.exports = router;