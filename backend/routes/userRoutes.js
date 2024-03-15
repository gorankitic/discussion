const express = require('express');

const { signup, login, logout } = require('../controllers/authController');

const router = express.Router();

router.get('/logout', logout);

router
    .post('/signup', signup)
    .post('/login', login)

module.exports = router;