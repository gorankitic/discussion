const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post must have a title."]
    },
    content: {
        type: String,
        required: [true, "Post must have a content."]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Post must have an author."]
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;