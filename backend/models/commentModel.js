const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "Comment can't be empty."]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Comment must belong to user."]
    },
    post: {
        type: mongoose.Schema.ObjectId,
        red: "Post",
        required: [true, "Comment must belong to post."]
    }
}, { timestamps: true });

// Pre-query mongoose hook to populate comment document with user document
commentSchema.pre(/^find/, function (next) {
    this.populate({ path: 'user', select: "name" });
    next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;