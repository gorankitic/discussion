
const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const { createComment, updateComment, deleteComment } = require("../controllers/commentController");

const router = express.Router({ mergeParams: true });

// /api/posts/:postId/comments
router
    .route("/")
    .post(protect, createComment)

// /api/posts/:postId/comments/:commentId
router
    .route("/:commentId")
    .patch(protect, updateComment)
    .delete(protect, deleteComment)

module.exports = router;