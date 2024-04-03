const express = require("express");
const { getNotifications, deleteNotification, updateNotifications, getUnreadNotifications } = require("../controllers/notificationController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router({ mergeParams: true });

router.route("/")
    .get(protect, getNotifications)
    .patch(protect, updateNotifications)

router.route("/:notificationId")
    .delete(protect, deleteNotification)

module.exports = router;
