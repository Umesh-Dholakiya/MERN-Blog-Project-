const express = require('express');
const routes = express.Router();

routes.use('/auth', require('./authRoutes'));
routes.use('/blog', require('./blogRoutes'));
routes.use('/subscription', require('./subscriptionRoutes'));

module.exports = routes;
