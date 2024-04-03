const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    type: {
        type: String,
        required: [true, "Notification must have a type (comment, reply)."]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Notification must belong to a user."]
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Notification must have user who created it."]
    },
    commentContent: {
        type: String,
        required: [true, "Notification must be linked to comment or reply."]
    },
    read: {
        type: Boolean,
        default: false
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post"
    },
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    }
}, { timestamps: true });

// Pre-query mongoose hook to populate comment field in notifications documents
notificationSchema.pre(/^find/, function (next) {
    this.populate({ path: "creator", select: "name photoUrl" });
    next();
});


const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;