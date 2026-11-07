const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema(
  {
    sectionKey: {
      type: String,
      required: [true, 'Please provide section key identifier'],
      trim: true,
      index: true
    },
    sectionName: {
      type: String,
      required: [true, 'Please provide human-readable section name'],
      trim: true
    },
    page: {
      type: String,
      default: 'home',
      enum: ['home', 'marketplace', 'temples', 'sacred-temples', 'yatralu', 'astrology', 'all']
    },
    badge: {
      type: String,
      trim: true,
      default: 'FEATURED'
    },
    title: {
      type: String,
      required: [true, 'Please provide headline or title'],
      trim: true
    },
    subtitle: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      trim: true
    },
    ctaText: {
      type: String,
      trim: true,
      default: 'Explore Now'
    },
    ctaLink: {
      type: String,
      trim: true,
      default: '/'
    },
    imageUrl: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: 'from-amber-700 to-amber-900'
    },
    priority: {
      type: Number,
      default: 1
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('SiteContent', siteContentSchema);
