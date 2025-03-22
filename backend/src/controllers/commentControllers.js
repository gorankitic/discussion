// modules
const mongoose = require("mongoose");
// models
const Comment = require("../models/commentModel");
// lib
const AppError = require("../lib/AppError");
const catchAsync = require("../lib/catchAsync");
const { getNestedCommentsRecursively, getCommentsWithUpvotes } = require("../lib/utils");

// Create a comment document
// POST method
// Protected route /api/v1/posts/:postId/comments
exports.createComment = catchAsync(async (req, res) => {
    const comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.params.postId,
        parent: req.body.parentId
    });

    await comment.populate("user", "name photoUrl");

    res.status(201).json({
        status: "success",
        comment: {
            _id: comment._id,
            content: comment.content,
            user: comment.user,
            post: comment.post,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            parent: comment.parent
        }
    });
});

// Find all post comments
// GET method
// Protected route /api/v1/posts/:postId/comments
exports.getAllComments = catchAsync(async (req, res, next) => {
    // Pagination
    // ?page=1&limit=10 -> page 1: 1-10, page 2: 11-20...
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const comments = await getCommentsWithUpvotes({ postId: req.params.postId, skip, limit });

    // Find nested comments for all root comments concurrently
    const commentsTree = await Promise.all(
        comments.map(async (comment) => ({
            ...comment,
            nestedComments: await getNestedCommentsRecursively(comment._id, req.params.postId),
        }))
    );

    const totalComments = await Comment.countDocuments({ post: req.params.postId, parent: null });
    const hasMorePages = skip + comments.length < totalComments;

    res.status(200).json({
        status: 'success',
        page,
        totalComments,
        totalPages: Math.ceil(totalComments / limit),
        hasMorePages,
        results: comments.length,
        comments: commentsTree,
    });
});

// Update comment document
// PATCH method
// Protected route /api/v1/posts/:postId/comments/:commentId
exports.updateComment = catchAsync(async (req, res, next) => {
    const { content } = req.body;

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
        return next(new AppError("There is no comment with that ID.", 404));
    }

    if (req.user._id.toString() !== comment.user._id.toString()) {
        return next(new AppError("You are not authorized to update this comment.", 403));
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({
        status: "success",
        comment
    });
});

// Delete comment document
// DELETE method
// Protected route /api/v1/posts/:postId/comments/:commentId
exports.deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
        return next(new AppError("There is no comment with that ID.", 404));
    }

    if (req.user._id.toString() !== comment.user._id.toString()) {
        return next(new AppError("You are not authorized to delete this comment.", 403));
    }

    // MongoDB transactions ensure that a series of operations on the database either all succeed or all fail
    // Start a session for transaction (keeps track of all operations that are part of the transaction)
    const session = await mongoose.startSession();
    try {
        // Start the transaction
        session.startTransaction();

        // Function to recursively delete nested comments
        const deleteNestedComments = async (commentId) => {
            const nestedComments = await Comment.find({ parent: commentId }).session(session);
            if (nestedComments.length === 0) return;
            // Delete all nested comments concurrently
            await Promise.all(nestedComments.flatMap((nestedComment) => [
                deleteNestedComments(nestedComment._id),
                Comment.deleteOne({ _id: nestedComment._id }).session(session)
            ]));
        }

        // Delete nested comments and root comment concurrently
        await Promise.all([
            deleteNestedComments(comment._id),
            Comment.findByIdAndDelete(comment._id).session(session)
        ]);

        // (On succeed) Commit the transaction (making all the changes permanent)
        await session.commitTransaction();

        res.status(204).json({ status: "success" });
    } catch (error) {
        // (On error) Abort the transaction, reverting all changes made in that transaction
        await session.abortTransaction();
        return next(new AppError("Deleting comment failed.", 500));
    } finally {
        // End the session
        session.endSession();
    }
});