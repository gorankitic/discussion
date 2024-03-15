const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const colors = require("colors/safe");

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');


require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// (Routers)
app.use("/api/users", userRouter);
app.use('/api/posts', postRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
(async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log(colors.bgGreen.bold("Database connected successfully."))
        // Start listening for http requests
        app.listen(port, () => {
            console.log(colors.bgGreen.bold(`Server is up in ${process.env.NODE_ENV} mode on port ${process.env.PORT}.`));
        });
    } catch (error) {
        console.log(colors.bgRed.bold(error.message));
    }
})();