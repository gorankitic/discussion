const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        maxLength: 500,
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

commentSchema.index({ post: 1, parent: 1 });
commentSchema.index({ createdAt: -1 });

// Pre-query mongoose hook to populate comment document with user document
commentSchema.pre(/^find/, function (next) {
    this.populate({ path: "user", select: "name photoUrl" });
    next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;