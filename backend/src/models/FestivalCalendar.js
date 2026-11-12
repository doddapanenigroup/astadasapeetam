const mongoose = require('mongoose');

const festivalCalendarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sanskritName: {
    type: String,
    trim: true,
    default: ''
  },
  teluguName: {
    type: String,
    trim: true,
    default: ''
  },
  slug: {
    type: String,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  day: {
    type: String,
    default: ''
  },
  month: {
    type: String,
    required: true,
    default: 'JAN'
  },
  monthShort: {
    type: String,
    default: 'JAN'
  },
  year: {
    type: Number,
    default: 2026
  },
  tithi: {
    type: String,
    default: ''
  },
  hinduMonth: {
    type: String,
    default: ''
  },
  deity: {
    type: String,
    default: ''
  },
  pujaTime: {
    type: String,
    default: ''
  },
  fastingType: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: '/images/fest_ugadi.png'
  },
  summary: {
    type: String,
    default: ''
  },
  pujaVidhi: {
    type: String,
    default: ''
  },
  mantra: {
    type: String,
    default: ''
  },
  significance: {
    type: String,
    default: ''
  },
  categories: [{
    type: String
  }],
  isMajor: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FestivalCalendar', festivalCalendarSchema);
