// modules
const express = require("express");
// controllers
const { signup, verifyEmail, signin, signout, forgotPassword, resetPassword, updatePassword, createNewVerificationToken } = require("../controllers/authControllers");
const { updateMe, deleteMe, getUser } = require("../controllers/userControllers");
// middlewares
const { protect } = require("../middlewares/authMiddlewares");
// routes
const notificationRouter = require("../routes/notificationRoutes");

const router = express.Router();
router.use("/notifications", notificationRouter);

// Public routes
router.post("/signup", signup);
router.post("/signin", signin);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// Protected routes
router.get("/", protect, getUser);

router.get("/signout", protect, signout);

router.get("/newVerification", protect, createNewVerificationToken);

router.post("/verifyEmail", protect, verifyEmail);

router.patch("/updatePassword", protect, updatePassword);

router.patch("/updateMe", protect, updateMe);

router.delete("/deleteMe", protect, deleteMe);

module.exports = router;