
const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const { getComments, createComment } = require("../controllers/commentController");

const router = express.Router({ mergeParams: true });

// /api/posts/:postId/comments
router
    .route("/")
    .get(getComments)
    .post(protect, createComment)

module.exports = router;