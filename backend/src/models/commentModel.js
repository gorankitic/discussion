const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        maxLength: 1000,
        required: [true, "Comment can't be empty."]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Comment must belong to user."]
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: [true, "Comment must belong to post."]
    },
    parent: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
        default: null
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Index is a special data structure that improves the speed of operations like find, update, and delete
// Allowing MongoDB to efficiently locate the documents based on the indexed fields
// Creating a compound index on two fields: post and parent
// Helps efficiently query comments for a specific post and organize them by their parent-child relationship (nested comments)
commentSchema.index({ post: 1, parent: 1 });
// Optimizes sorting of comments based on creation time in descending order
commentSchema.index({ createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;