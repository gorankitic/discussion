// modules
const express = require("express");
// controllers
const { createComment, getAllComments, updateComment, deleteComment } = require("../controllers/commentControllers");
// middlewares
const { protect } = require("../middlewares/authMiddlewares");

const router = express.Router({ mergeParams: true });

router.use(protect);

// /api/v1/posts/:postId/comments
router
    .route("/")
    .get(getAllComments)
    .post(createComment)

// /api/v1/posts/:postId/comments/:commentId
router
    .route("/:commentId")
    .patch(updateComment)
    .delete(deleteComment)

module.exports = router;