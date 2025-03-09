// modules
const express = require('express');
// controllers
const { createPost, getAllPosts, getPost, updatePost, deletePost } = require('../controllers/postControllers');
// middlewares
const { protect } = require('../middlewares/authMiddlewares');

const router = express.Router();

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