
const Comment = require("../models/commentModel");
const Notification = require("../models/notificationModel");
const AppError = require("../utils/AppError");

const catchAsync = require("../utils/catchAsync");

// Create a comment document
// POST method
// Protected route /api/posts/:postId/comments
exports.createComment = catchAsync(async (req, res) => {

    const comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.params.postId,
        parent: req.body.parentId
    });

    await comment.populate("user");
    await comment.populate({ path: "post", select: "user" });

    // Create a notification
    // Based on comment.parentId field 
    // Notification can be created for root comment or nested comment(reply)
    // Do not create notifications for your comments and replies on your own comments and posts
    let notification;
    if (comment.user._id.toString() !== comment.post.user._id.toString() && comment.parent === null) {
        notification = await Notification.create({
            type: "commented on your post.",
            commentContent: comment.content,
            user: comment.post.user._id,
            creator: comment.user._id,
            post: comment.post
        });
    }
    if (comment.parent !== null) {
        const parentComment = await Comment.findById(comment.parent);
        if (comment.user._id.toString() !== parentComment.user._id.toString()) {
            notification = await Notification.create({
                type: "made a reply to your comment.",
                commentContent: comment.content,
                user: parentComment.user._id,
                creator: comment.user._id,
                comment: comment._id,
                post: parentComment.post
            });
        }
    }

    res.status(201).json({
        _id: comment._id,
        content: comment.content,
        user: comment.user,
        post: comment.post,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        parent: comment.parent
    });
});

// Update comment document
// PATCH method
// Protected route /api/posts/:postId/comments/:commentId
exports.updateComment = catchAsync(async (req, res, next) => {
    const { content } = req.body;

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
        return next(new AppError("There is no comment with that ID.", 404));
    }

    if (req.user._id.toString() !== comment.user._id.toString()) {
        return next(new AppError("You are not authorized to update this comment.", 403));
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, { content }, { new: true, runValidators: true });

    res.status(200).json(updatedComment);
});

// Delete comment document
// DELETE method
// Protected route /api/posts/:postId/comments/:commentId
exports.deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
        return next(new AppError("There is no comment with that ID.", 404));
    }

    if (req.user._id.toString() !== comment.user._id.toString()) {
        return next(new AppError("You are not authorized to delete this comment.", 403));
    }

    // Function to recursively delete nested comments
    const deleteNestedComments = async (commentId) => {
        const nestedComments = await Comment.find({ parent: commentId });
        for (const nestedComment of nestedComments) {
            await deleteNestedComments(nestedComment._id); // Recursively delete nested comments
            await Comment.deleteOne({ _id: nestedComment._id }); // Delete the nested comment itself
        }
    }

    // Call the recursive function to delete nested comments under the root comment
    await deleteNestedComments(comment._id);

    // Delete the root comment
    await Comment.findByIdAndDelete(comment._id);

    res.status(204).json({ status: "success" });
});