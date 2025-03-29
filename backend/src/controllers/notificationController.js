// models
const Notification = require("../models/notificationsModel");
// lib
const catchAsync = require("../lib/catchAsync");
// utils
const { getNotifications } = require("../lib/utils/getNotifications");

// Get all user notifications
// GET method
// Protected route /api/v1/users/notifications
exports.getNotifications = catchAsync(async (req, res) => {
    // Pagination: ?page=1&limit=10 -> page 1: 1-10, page 2: 11-20...
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const notifications = await getNotifications({ userId: req.user._id, skip, limit });
    const [totalNotifications, unreadNotificationsCount] = await Promise.all([
        Notification.countDocuments({ recipient: req.user._id }),
        Notification.countDocuments({ recipient: req.user._id, isRead: false })
    ]);
    const hasMorePages = skip + notifications.length < totalNotifications;

    res.status(200).json({
        status: "success",
        page,
        totalPages: Math.ceil(totalNotifications / limit),
        pageResults: notifications.length,
        hasMorePages,
        totalNotifications,
        unreadNotifications: unreadNotificationsCount,
        notifications
    });
});

// Update all notifications (isRead field to true)
// PATCH method
// Protected route /api/v1/users/notifications
exports.updateNotifications = catchAsync(async (req, res) => {
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { $set: { isRead: true } });

    res.status(200).json({
        status: "success"
    });
});

// Delete notification document
// DELETE method
// Protected route /api/v1/users/notifications/:notificationId
exports.deleteNotification = catchAsync(async (req, res, next) => {
    const notification = await Notification.findOneAndDelete({ _id: req.params.notificationId, recipient: req.user._id }).lean();

    if (!notification) {
        return next(new AppError("Notification not found.", 404));
    }

    res.status(204).json({
        status: "success"
    });
});