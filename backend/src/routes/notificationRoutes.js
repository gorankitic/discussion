// modules
const express = require("express");
// controllers
const { getNotifications, updateNotifications, deleteNotification } = require("../controllers/notificationController");
// middlewares
const { protect } = require("../middlewares/authMiddlewares");

const router = express.Router({ mergeParams: true });

router.use(protect);

router
    .route("/")
    .get(getNotifications)
    .patch(updateNotifications)

router
    .route("/:notificationId")
    .delete(deleteNotification)

module.exports = router;