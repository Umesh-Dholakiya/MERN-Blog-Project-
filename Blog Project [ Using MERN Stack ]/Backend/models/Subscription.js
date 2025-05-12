const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
  }, { timestamps: true });
  

const subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = subscription;