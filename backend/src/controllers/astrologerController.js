const Consultation = require('../models/Consultation');
const User = require('../models/User');

// @desc    Get all consultation bookings (Astrologer & Admin)
// @route   GET /api/astrologer/consultations
// @access  Private (astrologer, admin)
exports.getConsultations = async (req, res, next) => {
  try {
    const { status, type } = req.query;
    let query = {};

    if (status) query.status = status;
    if (type) query.consultationType = type;

    // If logged in as astrologer, show their assigned ones + unassigned pending ones
    if (req.user.role === 'astrologer') {
      query.$or = [
        { assignedAstrologer: req.user._id },
        { assignedAstrologer: null, status: 'pending' }
      ];
    }

    const consultations = await Consultation.find(query)
      .populate('assignedAstrologer', 'name email phone astrologerProfile')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Accept consultation booking & assign scheduled slot
// @route   PUT /api/astrologer/consultations/:id/accept
// @access  Private (astrologer, admin)
exports.acceptConsultation = async (req, res, next) => {
  try {
    const { scheduledSlot } = req.body;

    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found'
      });
    }

    consultation.assignedAstrologer = req.user._id;
    consultation.status = 'confirmed';
    if (scheduledSlot) consultation.scheduledSlot = scheduledSlot;

    await consultation.save();

    res.status(200).json({
      success: true,
      message: `Consultation with devotee '${consultation.devoteeName}' confirmed!`,
      data: consultation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Complete reading & submit astrological remedy notes
// @route   PUT /api/astrologer/consultations/:id/complete
// @access  Private (astrologer, admin)
exports.completeConsultation = async (req, res, next) => {
  try {
    const { remedyNotes } = req.body;

    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found'
      });
    }

    consultation.status = 'completed';
    consultation.astrologerRemedyNotes = remedyNotes || 'Consultation completed auspiciously.';
    await consultation.save();

    res.status(200).json({
      success: true,
      message: 'Consultation completed and remedies dispatched to devotee.',
      data: consultation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Astrologer Profile & Consultation Details
// @route   PUT /api/astrologer/profile
// @access  Private (astrologer, admin)
exports.updateAstrologerProfile = async (req, res, next) => {
  try {
    const { title, experienceYears, specialties, consultationFee, bio } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    user.astrologerProfile = {
      ...user.astrologerProfile,
      ...(title && { title }),
      ...(experienceYears && { experienceYears }),
      ...(specialties && { specialties }),
      ...(consultationFee && { consultationFee }),
      ...(bio && { bio })
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Astrologer profile updated successfully',
      data: user.astrologerProfile
    });
  } catch (err) {
    next(err);
  }
};
