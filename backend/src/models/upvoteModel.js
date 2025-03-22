const mongoose = require("mongoose");

const upvoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
        required: true
    }
}, { timestamps: true });

// Index is a special data structure that improves the speed of operations like find, update, and delete
// Allowing MongoDB to efficiently locate the documents based on the indexed fields
// Creating a compound index on two fields: user and comment
// 1 indicates an ASC order for both fields (-1 for DESC order, not essential here)
// { unique: true } option ensures that this combination of user and comment must be unique across the entire collection
upvoteSchema.index({ user: 1, comment: 1 }, { unique: true });

const Upvote = mongoose.model("Upvote", upvoteSchema);

module.exports = Upvote;