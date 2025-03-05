// modules
const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors/safe");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// lib
const AppError = require("./lib/appError");
// middlewares
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const { limiter } = require("./middlewares/limiters");
const userRouter = require("./routes/userRoutes");
// Configure environment variables
require("dotenv").config();

// Initialize express application
const app = express();

// MIDDLEWARES

// Prevent brute-force attacks, limit number of requests from same IP address
app.use("/api", limiter);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.APP_ORIGIN, credentials: true }));

// (Routers)
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
(async () => {
    try {
        // Connect to MongoDb
        await mongoose.connect(process.env.MONGO_URI);
        console.log(colors.bgGreen.bold("Database connected successfully."));
        // Start listening for http requests
        app.listen(port, () => {
            console.log(colors.bgGreen.bold(`Server is up in ${process.env.NODE_ENV} environment on port ${port}.`));
        });
    } catch (error) {
        console.log("❗ERROR: ", colors.bgRed.bold(error.message));
    }
})();