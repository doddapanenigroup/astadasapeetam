const Campaign = require('../models/Campaign');

// @desc    Get all campaigns & coupons (Digital Marketing & Admin)
// @route   GET /api/marketing/campaigns
// @access  Private (digital_marketing, admin)
exports.getCampaigns = async (req, res, next) => {
  try {
    const { status, channel } = req.query;
    let query = {};

    if (status) query.status = status;
    if (channel) query.channel = channel;

    const campaigns = await Campaign.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new marketing campaign or spiritual coupon code
// @route   POST /api/marketing/campaigns
// @access  Private (digital_marketing, admin)
exports.createCampaign = async (req, res, next) => {
  try {
    const { title, couponCode, channel, targetAudience, discountPercentage, status, endDate } = req.body;

    const campaign = await Campaign.create({
      title,
      couponCode: couponCode ? couponCode.toUpperCase() : undefined,
      channel: channel || 'discount_coupon',
      targetAudience: targetAudience || 'All Devotees',
      discountPercentage: discountPercentage || 10,
      status: status || 'active',
      endDate: endDate || null,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: `Marketing campaign '${campaign.title}' successfully launched!`,
      data: campaign
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update campaign status or details
// @route   PUT /api/marketing/campaigns/:id
// @access  Private (digital_marketing, admin)
exports.updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Campaign '${campaign.title}' updated successfully`,
      data: campaign
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get marketing analytics and performance metrics
// @route   GET /api/marketing/analytics
// @access  Private (digital_marketing, admin)
exports.getMarketingAnalytics = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find();

    const totalRedemptions = campaigns.reduce((acc, c) => acc + (c.metrics.redemptions || 0), 0);
    const totalImpressions = campaigns.reduce((acc, c) => acc + (c.metrics.impressions || 0), 0);
    const totalRevenue = campaigns.reduce((acc, c) => acc + (c.metrics.revenueGenerated || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalCampaigns: campaigns.length,
        totalRedemptions,
        totalImpressions,
        totalRevenueGenerated: totalRevenue,
        topCoupons: campaigns.map(c => ({
          title: c.title,
          code: c.couponCode,
          redemptions: c.metrics.redemptions,
          revenue: c.metrics.revenueGenerated,
          status: c.status
        }))
      }
    });
  } catch (err) {
    next(err);
  }
};
