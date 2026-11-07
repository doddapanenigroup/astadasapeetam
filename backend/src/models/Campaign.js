const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide campaign title'],
    trim: true
  },
  couponCode: {
    type: String,
    uppercase: true,
    trim: true,
    sparse: true
  },
  channel: {
    type: String,
    enum: ['discount_coupon', 'banner_popup', 'whatsapp_broadcast', 'email_newsletter', 'social_ad'],
    default: 'discount_coupon'
  },
  targetAudience: {
    type: String,
    default: 'All Devotees'
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 10
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'scheduled', 'completed'],
    default: 'active'
  },
  metrics: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    redemptions: { type: Number, default: 0 },
    revenueGenerated: { type: Number, default: 0 }
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
