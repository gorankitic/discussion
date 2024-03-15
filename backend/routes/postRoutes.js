const express = require('express');

const { createPost, getAllPosts, getPost } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');
const commentRouter = require("../routes/commentRoutes");

const router = express.Router();

router.use("/:postId/comments", commentRouter);

router
    .route("/")
    .get(getAllPosts)
    .post(protect, createPost)

router
    .route("/:postId")
    .get(getPost)

module.exports = router;