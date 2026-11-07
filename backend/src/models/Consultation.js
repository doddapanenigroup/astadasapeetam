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
    trim: true
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
  problemDescription: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedAstrologer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  scheduledSlot: {
    type: Date
  },
  fee: {
    type: Number,
    default: 499
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  astrologerRemedyNotes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Consultation', ConsultationSchema);
