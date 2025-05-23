const AppError = require("../lib/AppError");

// 🔥 HANDLING MONGOOSE ERRORS
// Handling invalid database IDs
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

// Handling duplicate database field
const handleDuplicateFieldDB = err => {
    const value = Object.values(err.keyValue)[0];
    const message = `${value} already exists.`;
    return new AppError(message, 400);
}

// Handling mongoose validation errors
const handleValidationErrorDB = error => {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `${errors.join(" ")}`;
    return new AppError(message, 400);
}

// Handling invalid JWT error
const handleJWTError = () => new AppError("Please log in again.", 401);

// Handling expired JWT error
const handleJWTExpiredError = () => new AppError("Your session has expired, please log in again.", 401);

// Send more error details in development mode
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
}

// Send error to client when in production mode
const sendErrorProd = (err, res) => {
    // Operational, trusted error (exception)
    // Send nice, human readable message to client side
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Programming or other unknown error, don't leak too much details
        // 1. Log error
        console.log("❗ERROR: ", err);
        // 2. Send generic message
        res.status(500).json({
            status: "error",
            message: "Something went wrong."
        });
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = Object.assign(err);

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldDB(error);
        if (error.name === "ValidationError") error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProd(error, res);
    }
}