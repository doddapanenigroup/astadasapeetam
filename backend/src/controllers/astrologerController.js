const Consultation = require('../models/Consultation');
const User = require('../models/User');

// Standard Time-Based Pricing Rules
const DURATION_PRICING = {
  10: { fee: 199, label: '10 Mins • Quick Vedic Query' },
  20: { fee: 399, label: '20 Mins • Planetary Dasha & Kundali' },
  30: { fee: 599, label: '30 Mins • Deep Horoscope & Dosha' },
  45: { fee: 899, label: '45 Mins • Comprehensive Life Guidance' }
};

// @desc    Get all consultation bookings (Astrologer & Admin)
// @route   GET /api/astrologer/consultations
// @access  Public / Private
exports.getConsultations = async (req, res, next) => {
  try {
    const { status, type, sessionStatus } = req.query;
    let query = {};

    if (status) query.status = status;
    if (sessionStatus) query.sessionStatus = sessionStatus;
    if (type) query.consultationType = type;

    // If logged in as astrologer, show their assigned ones + unassigned ones
    if (req.user && req.user.role === 'astrologer') {
      query.$or = [
        { assignedAstrologer: req.user._id },
        { assignedAstrologer: null }
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

// @desc    Get single consultation session with live messages
// @route   GET /api/astrologer/consultations/:id
// @access  Public / Private
exports.getConsultationById = async (req, res, next) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate('assignedAstrologer', 'name email phone astrologerProfile');

    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation session not found' });
    }

    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Book a new consultation (Customer / Public)
// @route   POST /api/astrologer/book
// @access  Public
exports.bookConsultation = async (req, res, next) => {
  try {
    const {
      devoteeName,
      devoteePhone,
      devoteeEmail,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      rasi,
      nakshatram,
      gotram,
      consultationType,
      durationMinutes,
      problemDescription,
      astrologerId,
      astrologerName
    } = req.body;

    if (!devoteeName || !devoteePhone || !dateOfBirth || !timeOfBirth || !placeOfBirth) {
      return res.status(400).json({
        success: false,
        message: 'Devotee Name, Phone, and Birth Details (Date, Time, Place) are required'
      });
    }

    const duration = [10, 20, 30, 45].includes(Number(durationMinutes)) ? Number(durationMinutes) : 20;
    const fee = DURATION_PRICING[duration] ? DURATION_PRICING[duration].fee : 399;

    const newConsultation = new Consultation({
      devoteeName,
      devoteePhone,
      devoteeEmail: devoteeEmail || '',
      birthDetails: {
        dateOfBirth,
        timeOfBirth,
        placeOfBirth,
        rasi: rasi || 'Not Known',
        nakshatram: nakshatram || 'Not Known',
        gotram: gotram || 'Not Known'
      },
      consultationType: consultationType || 'jathakam_analysis',
      durationMinutes: duration,
      timeRemainingSeconds: duration * 60,
      fee,
      isPaid: true,
      problemDescription: problemDescription || 'General Kundali & Life Guidance',
      status: 'confirmed',
      sessionStatus: 'waiting',
      assignedAstrologer: astrologerId || null,
      astrologerName: astrologerName || 'Sri Vidyanath Shastri',
      messages: [
        {
          sender: 'system',
          senderName: 'Vedic Sanctuary System',
          text: `Namaste ${devoteeName}! Your ${duration}-Minute consultation session has been scheduled. Astrologer ${astrologerName || 'Vidyanath Shastri'} will review your Janma Kundali.`,
          timestamp: new Date()
        }
      ]
    });

    const saved = await newConsultation.save();

    res.status(201).json({
      success: true,
      message: 'Consultation session booked successfully!',
      data: saved
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Send a message in the live consultation chat room
// @route   POST /api/astrologer/consultations/:id/message
// @access  Public / Private
exports.sendMessage = async (req, res, next) => {
  try {
    const { sender, senderName, text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Message text cannot be empty' });
    }

    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation session not found' });
    }

    // Check if session has expired
    if (consultation.sessionStatus === 'time_expired' || consultation.sessionStatus === 'completed') {
      return res.status(403).json({
        success: false,
        message: 'This consultation session has ended. Chat is closed.'
      });
    }

    // Auto-advance session from waiting to live if not yet live
    if (consultation.sessionStatus === 'waiting') {
      consultation.sessionStatus = 'live';
      consultation.status = 'in_progress';
    }

    const newMsg = {
      sender: sender || 'customer',
      senderName: senderName || (sender === 'astrologer' ? 'Astrologer' : consultation.devoteeName),
      text: text.trim(),
      timestamp: new Date()
    };

    consultation.messages.push(newMsg);
    await consultation.save();

    res.status(200).json({
      success: true,
      message: 'Message sent',
      data: consultation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update consultation session timer
// @route   PUT /api/astrologer/consultations/:id/timer
// @access  Public / Private
exports.updateTimer = async (req, res, next) => {
  try {
    const { timeRemainingSeconds } = req.body;
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation session not found' });
    }

    if (typeof timeRemainingSeconds === 'number') {
      consultation.timeRemainingSeconds = Math.max(0, timeRemainingSeconds);
      if (consultation.timeRemainingSeconds === 0) {
        consultation.sessionStatus = 'time_expired';
        // Add a system notice message if not already added
        if (!consultation.messages.some(m => m.text.includes('time has expired'))) {
          consultation.messages.push({
            sender: 'system',
            senderName: 'Vedic System Clock',
            text: '⏳ The allotted consultation time has expired for this session. The chat has been locked. You may review the astrologer pariharas and remedies below.',
            timestamp: new Date()
          });
        }
      } else if (consultation.sessionStatus === 'waiting') {
        consultation.sessionStatus = 'live';
      }
      await consultation.save();
    }

    res.status(200).json({
      success: true,
      timeRemainingSeconds: consultation.timeRemainingSeconds,
      sessionStatus: consultation.sessionStatus
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Complete consultation & record remedies
// @route   PUT /api/astrologer/consultations/:id/complete
// @access  Private / Desk
exports.completeConsultation = async (req, res, next) => {
  try {
    const { remedyNotes, gemstone, mantra, templePariharam } = req.body;

    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation request not found' });
    }

    consultation.status = 'completed';
    consultation.sessionStatus = 'completed';
    consultation.astrologerRemedyNotes = remedyNotes || 'Consultation concluded with divine blessings.';
    consultation.astrologerRemedies = {
      gemstone: gemstone || '',
      mantra: mantra || '',
      templePariharam: templePariharam || '',
      notes: remedyNotes || ''
    };

    consultation.messages.push({
      sender: 'system',
      senderName: 'Vedic Astrologer Desk',
      text: `🕉️ Astrologer has submitted your official Vedic remedies and consecrated pariharam report. Session successfully completed.`,
      timestamp: new Date()
    });

    await consultation.save();

    res.status(200).json({
      success: true,
      message: 'Consultation completed and remedies recorded auspiciously.',
      data: consultation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get Astrologers List (Public hides certification; Internal shows it)
// @route   GET /api/astrologer/astrologers
// @access  Public / Internal
exports.getAstrologers = async (req, res, next) => {
  try {
    const isInternal = req.query.scope === 'internal' || (req.user && ['admin', 'astrologer'].includes(req.user.role));

    const users = await User.find({ role: 'astrologer' })
      .select('name email phone astrologerProfile');

    // Default fallback astrologers if db is empty
    let list = users.map(u => ({
      id: u._id,
      name: u.name,
      title: u.astrologerProfile?.title || 'Vedic Jyotish Acharya',
      experience: `${u.astrologerProfile?.experienceYears || 15}+ Years Experience`,
      specialization: (u.astrologerProfile?.specialties && u.astrologerProfile.specialties.join(', ')) || 'Kundali, Vastu, Parashari Jyotish',
      languages: 'Telugu, Sanskrit, English, Hindi',
      rating: 4.9,
      reviewsCount: 3840,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      pricingPackages: u.astrologerProfile?.pricingPackages || [
        { durationMinutes: 10, priceInr: 199, title: 'Quick Query' },
        { durationMinutes: 20, priceInr: 399, title: 'Planetary Dasha' },
        { durationMinutes: 30, priceInr: 599, title: 'Deep Horoscope' },
        { durationMinutes: 45, priceInr: 899, title: 'Complete Life Guidance' }
      ],
      // INTERNAL ONLY: included only if internal query, STRICTLY EXCLUDED for public frontend
      ...(isInternal && {
        certificationType: u.astrologerProfile?.certificationType || 'certified',
        isCertified: u.astrologerProfile?.isCertified !== false,
        certificateDetails: u.astrologerProfile?.certificateDetails || 'Sanskrit University Jyotish Acharya'
      })
    }));

    res.status(200).json({
      success: true,
      count: list.length,
      isInternalScope: isInternal,
      data: list
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Admin updates Astrologer Certification Status (Internal Only)
// @route   PUT /api/astrologer/astrologers/:id/certification
// @access  Private (Admin)
exports.updateCertification = async (req, res, next) => {
  try {
    const { certificationType, isCertified, certificateDetails } = req.body;

    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'astrologer') {
      return res.status(404).json({ success: false, message: 'Astrologer profile not found' });
    }

    user.astrologerProfile.certificationType = certificationType || (isCertified ? 'certified' : 'non_certified');
    user.astrologerProfile.isCertified = Boolean(isCertified);
    if (certificateDetails) {
      user.astrologerProfile.certificateDetails = certificateDetails;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: `Astrologer ${user.name} certification updated to ${user.astrologerProfile.certificationType}`,
      data: user.astrologerProfile
    });
  } catch (err) {
    next(err);
  }
};
