const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        maxLength: 100,
        required: [true, "Post must have a title."]
    },
    content: {
        type: String,
        maxLength: 500,
        required: [true, "Post must have a content."]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Post must have an author."]
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Pre-query mongoose hook to populate post document with user document
postSchema.pre(/^find/, function (next) {
    this.populate({ path: 'user', select: "name photoUrl" });
    next();
});

// Parent referencing: Parent (Post) doesn't know about children (Comments)
// Virtual populate parent (Post) with children (Comments)
// Virtual field "comments" is not stored into Post document, it is populated on Post query
postSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "post",
    localField: "_id"
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;