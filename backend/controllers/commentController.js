
const Comment = require("../models/commentModel");

const catchAsync = require("../utils/catchAsync");

// Create a comment document
// POST method
// Protected route /api/posts/:postId/comments
exports.createComment = catchAsync(async (req, res) => {

    const comment = await Comment.create({ content: req.body.content, user: req.user._id, post: req.params.postId });

    res.status(201).json({
        _id: comment._id,
        content: comment.content,
        user: comment.user,
        post: comment.post,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
    });
});

// Get all post comments
// GET method
// Public route /api/posts/:postId/comments
exports.getComments = catchAsync(async (req, res) => {

    const comments = await Comment.find({ post: { $eq: req.params.postId } }).sort({ createdAt: -1 });

    res.status(200).json({
        status: "success",
        results: comments.length,
        comments
    });
});