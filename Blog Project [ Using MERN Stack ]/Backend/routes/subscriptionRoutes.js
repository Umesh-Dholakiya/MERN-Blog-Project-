const express = require('express');
const router = express.Router();
const {
  addSubscription,
  getSubscriptions,
  deleteSubscription
} = require('../controller/subscriptionController');

router.post('/subscribe', addSubscription);

router.get('/admin/subscriptions', getSubscriptions);

router.delete('/admin/subscriptions/:email', deleteSubscription);

module.exports = router;
