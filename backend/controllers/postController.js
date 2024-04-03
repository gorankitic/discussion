const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// Create post document
// POST method
// Protected route /api/posts
exports.createPost = catchAsync(async (req, res) => {
    const { title, content } = req.body;

    const post = await Post.create({ title, content, user: req.user._id });

    await post.populate("user");

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
// Public route /api/posts
exports.getAllPosts = catchAsync(async (req, res, next) => {

    let query = Post.find().sort({ createdAt: -1 });

    // Pagination
    // ?page=1&limit=10 -> page 1: 1-10, page 2: 11-20...
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;
    let hasMorePages = true;
    query = query.skip(skip).limit(limit);

    const posts = await query;

    if (posts.length < limit) hasMorePages = false;

    res.status(200).json({
        status: "success",
        results: posts.length,
        page,
        hasMorePages,
        posts
    });
});

// Find post
// GET method
// Public route /api/posts/:postId
exports.getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId)
        .populate({ path: "comments", options: { sort: { 'createdAt': -1 } } });

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
// Protected route /api/posts/:postId
exports.updatePost = catchAsync(async (req, res, next) => {
    const { content } = req.body;

    const post = await Post.findById(req.params.postId);
    if (!post) {
        return next(new AppError("There is no post with that ID.", 404));
    }

    if (req.user._id.toString() !== post.user._id.toString()) {
        return next(new AppError("You are not authorized to update this post.", 403));
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, { content }, { new: true, runValidators: true });

    res.status(200).json(updatedPost);
});

// Delete post document
// DELETE method
// Protected route /api/posts/:postId
exports.deletePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    if (!post) {
        return next(new AppError("There is no post with that ID.", 404));
    }

    if (req.user._id.toString() !== post.user._id.toString()) {
        return next(new AppError("You are not authorized to delete this post.", 403));
    }

    // Delete all post comments
    await Comment.deleteMany({ post: req.params.postId });

    // Delete the post
    await Post.findByIdAndDelete(req.params.postId);

    res.status(204).json({ status: "success" });
});