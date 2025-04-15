const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

// 🔐 Register Admin
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please provide username, email, and password'
      });
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).send({
        success: false,
        message: 'User already exists with this email'
      });
    }

    const user = new UserModel({
      username,
      email,
      password,
      role: 'user'
    });

    await user.save();

    return res.status(201).send({
      success: true,
      message: 'Admin registered successfully'
    });

  } catch (err) {
    return res.status(500).send({
      success: false,
      error: err.message
    });
  }
};

// 🔑 Login Admin
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }

    if (user.password !== password) {
      return res.status(401).send({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).send({
        success: false,
        message: 'Access denied. Only admin can login.'
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'blog',
      { expiresIn: '1d' }
    );

    return res.status(200).send({
      success: true,
      message: 'Login successful',
      token,
      user
    });

  } catch (err) {
    return res.status(500).send({
      success: false,
      error: err.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};
