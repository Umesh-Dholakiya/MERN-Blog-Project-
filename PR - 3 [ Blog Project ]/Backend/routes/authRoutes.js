const express = require('express');
const { registerUser, loginUser } = require('../controller/AuthController');
const routes = express.Router();

// 🧑‍💻 Admin Auth Routes
routes.post('/register', registerUser);
routes.post('/login', loginUser);

module.exports = routes;
