// modules
const mongoose = require("mongoose");
// models
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
// lib
const AppError = require("../lib/AppError");
const catchAsync = require("../lib/catchAsync");

// Create post document
// POST method
// Protected route /api/v1/posts
exports.createPost = catchAsync(async (req, res) => {
    const { title, content } = req.body;

    const post = await Post.create({ title, content, user: req.user._id });

    await post.populate("user", "name photoUrl");

    res.status(201).json({
        _id: post._id,
        title: post.title,
        content: post.content,
        user: post.user,
        createdAt: post.createdAt
    });
});

// Find all posts
// GET method
// Protected route /api/v1/posts
exports.getAllPosts = catchAsync(async (req, res, next) => {
    // Pagination
    // ?page=1&limit=10 -> page 1: 1-10, page 2: 11-20...
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;

    const posts = await Post
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalPosts = await Post.countDocuments();
    const hasMorePages = skip + posts.length < totalPosts;

    res.status(200).json({
        status: "success",
        page,
        totalPages: Math.ceil(totalPosts / limit),
        hasMorePages,
        results: posts.length,
        posts,
    });
});

// Find post
// GET method
// Protected route /api/v1/posts/:postId
exports.getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        return next(new AppError("There is no post with that ID.", 404));
    }

    res.status(200).json({
        status: "success",
        post
    });
});

// Update post document
// PATCH method
// Protected route /api/v1/posts/:postId
exports.updatePost = catchAsync(async (req, res, next) => {
    const { content } = req.body;

    const post = await Post.findById(req.params.postId);
    if (!post) {
        return next(new AppError("There is no post with that ID.", 404));
    }

    if (req.user._id.toString() !== post.user._id.toString()) {
        return next(new AppError("You are not authorized to update this post.", 403));
    }

    post.content = content;
    await post.save();

    res.status(200).json({
        status: "success",
        post
    });
});

// Delete post document
// DELETE method
// Protected route /api/v1/posts/:postId
exports.deletePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    if (!post) {
        return next(new AppError("There is no post with that ID.", 404));
    }

    if (req.user._id.toString() !== post.user._id.toString()) {
        return next(new AppError("You are not authorized to delete this post.", 403));
    }

    // MongoDB transactions ensure that a series of operations on the database either all succeed or all fail
    // Start a session for transaction (keeps track of all operations that are part of the transaction)
    const session = await mongoose.startSession();
    try {
        // Start the transaction
        session.startTransaction();

        await Promise.all([
            Comment.deleteMany({ post: req.params.postId }).session(session),
            Post.findByIdAndDelete(req.params.postId).session(session)
        ]);

        // (On succeed) Commit the transaction (making all the changes permanent)
        await session.commitTransaction();

        res.status(204).json({ status: "success" });
    } catch (err) {
        // (On error) abort the transaction, reverting all changes made in that transaction
        await session.abortTransaction();
        return next(new AppError("Deleting post failed.", 500));
    } finally {
        // End the session
        session.endSession();
    }
});