// modules
const express = require("express");
// controllers
const { upvoteComment, removeUpvoteComment } = require("../controllers/upvoteControllers");
// middlewares
const { protect } = require("../middlewares/authMiddlewares");

const router = express.Router({ mergeParams: true });

router.use(protect);

// /api/v1/comments/:commentId/upvotes
router
    .route("/")
    .post(upvoteComment)
    .delete(removeUpvoteComment)

module.exports = router;