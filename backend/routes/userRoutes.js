const express = require('express');

const { signup, login, logout } = require('../controllers/authController');
const { updateProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const notificationRouter = require("./notificationRoutes");

const router = express.Router();

router.use("/notifications", notificationRouter);

router.get('/logout', logout);

router
    .post('/signup', signup)
    .post('/login', login)

router.route("/:userId")
    .patch(protect, updateProfile)

module.exports = router;