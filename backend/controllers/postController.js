const Post = require("../models/postModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");


exports.createPost = catchAsync(async (req, res) => {
    const { title, content } = req.body;

    const post = await Post.create({ title, content, user: req.user._id });

    res.status(201).json({
        _id: post._id,
        title: post.title,
        content: post.content,
        user: post.user
    });
});

exports.getAllPosts = catchAsync(async (req, res) => {

    const posts = await Post.find().select("-__v").sort({ createdAt: -1 });

    res.status(200).json({
        status: "success",
        results: posts.length,
        posts
    });
});

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