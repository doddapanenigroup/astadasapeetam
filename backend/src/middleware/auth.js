const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes: Verifies JWT token in Bearer authorization header
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Devotee / Staff must be logged in with a valid token.'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'astadasapeetam_sacred_jwt_secret_key_2026'
    );

    // Attach user to req object
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'No active user found for this token.'
      });
    }

    if (!req.user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This account has been deactivated. Please contact Astadasapeetam Admin.'
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed or token has expired.'
    });
  }
};

module.exports = { protect };
