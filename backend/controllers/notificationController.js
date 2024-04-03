const Notification = require("../models/notificationModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");


// Get all user notifications
// GET method
// Protected route /api/users/notifications
exports.getNotifications = catchAsync(async (req, res) => {

    let query = Notification
        .find({ $and: [{ user: { $eq: req.user._id } }, { creator: { $ne: req.user._id } }] })
        .sort({ createdAt: -1 });

    // Pagination
    // ?page=1&limit=10 -> page 1: 1-10, page 2: 11-20...
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 50;
    const skip = (page - 1) * limit;
    let hasMorePages = true;
    query = query.skip(skip).limit(limit);

    const notifications = await query;

    if (notifications.length < limit) hasMorePages = false;

    const unreadNotifications = await Notification.find({ $and: [{ user: { $eq: req.user._id } }, { read: { $eq: false } }] });

    res.status(200).json({
        status: "success",
        results: notifications.length,
        unreadNotifications: unreadNotifications.length,
        hasMorePages,
        notifications,
    });
});

// Update notification read field to true
// PATCH method
// Protected route /api/users/notifications
exports.updateNotifications = catchAsync(async (req, res) => {
    await Notification.updateMany({ $and: [{ user: { $eq: req.user._id } }, { read: { $eq: false } }] }, { read: true });

    res.status(200).json({
        status: "success"
    });
});

// Delete notification document
// DELETE method
// Protected route /api/users/notification/:notificationId
exports.deleteNotification = catchAsync(async (req, res, next) => {

    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) {
        return next(new AppError("There is no notification with that id.", 404));
    }
    if (req.user._id.toString() !== notification.user.toString()) {
        return next(new AppError("You are not authorized to perform this action.", 403));
    }

    await Notification.findByIdAndDelete(req.params.notificationId);

    res.status(204).json({
        status: "success"
    });
});