const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["comment", "reply"],
        required: [true, "Notification must have a type (comment, reply)."]
    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Notification must belong to a user."]
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Notification must have a sender."]
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: [true, "Notification must be linked to a post."]
    },
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
        required: [true, "Notification must be linked to a comment."]
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

notificationSchema.index({ recipient: 1, isRead: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;