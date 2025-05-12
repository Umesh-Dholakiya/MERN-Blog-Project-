const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]

});



module.exports = mongoose.model("Blog", blogSchema);
