const User = require('../models/User');

// @desc    Register a new user (Devotee or Staff)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user is already registered with this email address.'
      });
    }

    // Default role is devotee unless explicitly created
    const userRole = role && ['admin', 'digital_marketing', 'astrologer', 'devotee'].includes(role) 
      ? role 
      : 'devotee';

    const user = await User.create({
      name,
      email,
      password,
      phone: phone || '',
      role: userRole
    });

    sendTokenResponse(user, 201, res, 'Registration successful. Welcome to Astadasapeetam!');
  } catch (err) {
    next(err);
  }
};

// @desc    Login user & get JWT token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password presence
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    // Check for user (explicitly selecting password because select: false in schema)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.'
      });
    }

    // Check password match
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This account has been deactivated. Please contact Astadasapeetam Admin.'
      });
    }

    sendTokenResponse(user, 200, res, `Login successful. Welcome back, ${user.name}!`);
  } catch (err) {
    next(err);
  }
};

// @desc    Get currently logged in user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// Helper function to sign JWT token and send response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isActive: user.isActive,
      astrologerProfile: user.astrologerProfile,
      marketingProfile: user.marketingProfile
    }
  });
};
