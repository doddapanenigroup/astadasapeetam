const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  devoteeName: {
    type: String,
    required: [true, 'Please provide devotee name'],
    trim: true
  },
  devoteePhone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true
  },
  devoteeEmail: {
    type: String,
    trim: true,
    default: ''
  },
  birthDetails: {
    dateOfBirth: { type: String, required: true },
    timeOfBirth: { type: String, required: true },
    placeOfBirth: { type: String, required: true },
    rasi: { type: String, default: 'Not Known' },
    nakshatram: { type: String, default: 'Not Known' },
    gotram: { type: String, default: 'Not Known' }
  },
  consultationType: {
    type: String,
    enum: ['kundali_matching', 'jathakam_analysis', 'dosha_upaya', 'gemstone_remedy', 'career_marriage'],
    default: 'jathakam_analysis'
  },
  durationMinutes: {
    type: Number,
    enum: [10, 20, 30, 45],
    default: 20
  },
  timeRemainingSeconds: {
    type: Number,
    default: 1200
  },
  problemDescription: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  sessionStatus: {
    type: String,
    enum: ['waiting', 'live', 'time_expired', 'completed'],
    default: 'waiting'
  },
  assignedAstrologer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  astrologerName: {
    type: String,
    default: 'Vedic Jyotish Acharya'
  },
  scheduledSlot: {
    type: Date
  },
  fee: {
    type: Number,
    default: 399
  },
  isPaid: {
    type: Boolean,
    default: true
  },
  messages: [{
    sender: {
      type: String,
      enum: ['customer', 'astrologer', 'system'],
      default: 'customer'
    },
    senderName: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  astrologerRemedies: {
    gemstone: { type: String, default: '' },
    mantra: { type: String, default: '' },
    templePariharam: { type: String, default: '' },
    notes: { type: String, default: '' }
  },
  astrologerRemedyNotes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Consultation', ConsultationSchema);
