// models
const Upvote = require("../models/upvoteModel");
// lib
const catchAsync = require("../lib/catchAsync");
const AppError = require("../lib/AppError");

// Create a upvote document
// POST method
// Protected route /api/v1/comments/:commentId/upvotes
exports.upvoteComment = catchAsync(async (req, res, next) => {
    const existingUpvote = await Upvote.findOne({ comment: req.params.commentId, user: req.user._id });

    if (existingUpvote) {
        return next(new AppError("You have already upvoted this comment.", 400));
    }

    const upvote = await Upvote.create({ user: req.user._id, comment: req.params.commentId });

    res.status(200).json({
        status: "success",
        upvote
    });
});

// Delete upvote document
// DELETE method
// Protected route /api/v1/comments/:commentId/upvotes
exports.removeUpvoteComment = catchAsync(async (req, res, next) => {
    const removedUpvote = await Upvote.findOneAndDelete({ comment: req.params.commentId, user: req.user._id });
    if (!removedUpvote) {
        return next(new AppError("You have not upvoted this comment yet.", 400));
    }

    res.status(204).json({
        status: "success"
    });
});