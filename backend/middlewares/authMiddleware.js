const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/AppError');
const User = require('../models/userModel');

// Authentication middleware to protect routes from unauthenticated access
exports.protect = catchAsync(async (req, res, next) => {
    // 1. Get token and check is it exist
    const token = req.cookies.jwt;
    if (!token) {
        return next(new AppError('Please log in to get access!', 401));
    }
    // 2. Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3. Find user based on _id decoded from JWT and check if user still exist
    const user = await User.findById(decoded._id);
    if (!user) {
        return next(new AppError('User owner of this token does no longer exist.', 401));
    }

    // 5. Grant access to protected route and attach user to request object 
    req.user = user;

    next();
});