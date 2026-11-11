const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Consultation = require('../models/Consultation');

// @desc    Get all users across all roles (Admin only)
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { role, search } = req.query;
    let query = {};

    if (role && role !== 'all') {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a user's role (Admin only)
// @route   PUT /api/admin/users/:id/role
// @access  Private (Admin)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const validRoles = ['admin', 'editor', 'operations_manager', 'digital_marketing', 'astrologer', 'devotee', 'user'];

    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role specified. Must be one of: [${validRoles.join(', ')}]`
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with specified ID'
      });
    }

    res.status(200).json({
      success: true,
      message: `User '${user.name}' role successfully updated to '${user.role}'`,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle user active/inactive status (Admin only)
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin)
exports.toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent admin from deactivating themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Super Admin cannot deactivate their own active account.'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User '${user.name}' is now ${user.isActive ? 'ACTIVE' : 'DEACTIVATED'}`,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create/Invite new staff member (Admin only)
// @route   POST /api/admin/users
// @access  Private (Admin)
exports.createStaffUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A user with this email address already exists' });
    }
    const user = await User.create({
      name,
      email,
      password,
      phone: phone || '',
      role: role || 'editor',
      isActive: true
    });
    res.status(201).json({
      success: true,
      message: `Staff account created for ${user.name} (${user.role})`,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get overall admin platform statistics & overview
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getAdminDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: 'admin' });
    const marketingCount = await User.countDocuments({ role: 'digital_marketing' });
    const astrologerCount = await User.countDocuments({ role: 'astrologer' });
    const devoteeCount = await User.countDocuments({ role: 'devotee' });

    const totalCampaigns = await Campaign.countDocuments();
    const activeCampaigns = await Campaign.countDocuments({ status: 'active' });
    const totalConsultations = await Consultation.countDocuments();
    const pendingConsultations = await Consultation.countDocuments({ status: 'pending' });

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          admins: adminCount,
          digitalMarketing: marketingCount,
          astrologers: astrologerCount,
          devotees: devoteeCount
        },
        marketing: {
          totalCampaigns,
          activeCampaigns
        },
        astrology: {
          totalConsultations,
          pendingConsultations
        }
      }
    });
  } catch (err) {
    next(err);
  }
};
