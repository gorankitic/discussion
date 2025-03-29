// models
const Notification = require("../../models/notificationsModel");

exports.createNotification = async (comment) => {
    // Do not create a notification if the user comments on their own post (root comment case)
    if (!comment.parent && comment.user._id.toString() === comment.post.user._id.toString()) return;

    let notificationData = null;

    // If the comment is a root comment (not a reply), notify the post owner
    if (!comment.parent) {
        notificationData = {
            type: "comment",
            recipient: comment.post.user._id
        };
    }

    // Do not create a notification if the user is replying to their own comment
    if (comment.parent && comment.user._id.toString() !== comment.parent.user.toString()) {
        notificationData = {
            type: "reply",
            recipient: comment.parent.user,
        };
    }

    if (notificationData) {
        await Notification.create({
            ...notificationData,
            sender: comment.user,
            comment: comment._id,
            post: comment.post
        });
    }
}