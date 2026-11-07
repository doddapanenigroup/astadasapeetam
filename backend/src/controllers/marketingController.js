const Campaign = require('../models/Campaign');
const Product = require('../models/Product');
const SiteContent = require('../models/SiteContent');

// ==========================================
// 1. CAMPAIGNS & COUPONS
// ==========================================

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

// ==========================================
// 2. MARKETPLACE PRODUCTS MANAGEMENT
// ==========================================

// @desc    Get all marketplace products with management filters
// @route   GET /api/marketing/products
// @access  Private (digital_marketing, admin)
exports.getProducts = async (req, res, next) => {
  try {
    const { category, inStock, search } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }
    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new product in Marketplace
// @route   POST /api/marketing/products
// @access  Private (digital_marketing, admin)
exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      subtitle,
      price,
      originalPrice,
      discount,
      image,
      certified,
      inStock,
      fastDelivery,
      featured,
      stockQuantity,
      description,
      features
    } = req.body;

    const customId = req.body.customId || `prod-${Date.now().toString().slice(-6)}`;

    const product = await Product.create({
      customId,
      name,
      category: category || 'pooja-kits',
      subtitle,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price) * 1.3,
      discount: discount || '25% OFF',
      image: image || '/images/poojakit.png',
      certified: certified || '100% Satvik & Energized',
      inStock: inStock !== undefined ? inStock : true,
      fastDelivery: fastDelivery !== undefined ? fastDelivery : true,
      featured: featured || false,
      stockQuantity: stockQuantity ? Number(stockQuantity) : 100,
      description,
      features: Array.isArray(features) ? features : (features ? [features] : []),
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: `Product '${product.name}' added to Marketplace!`,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update an existing product
// @route   PUT /api/marketing/products/:id
// @access  Private (digital_marketing, admin)
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Product '${product.name}' updated successfully`,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Quick toggle product inStock status
// @route   PATCH /api/marketing/products/:id/toggle-stock
// @access  Private (digital_marketing, admin)
exports.toggleProductStock = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.inStock = !product.inStock;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product stock status changed to ${product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}`,
      data: product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete product from Marketplace
// @route   DELETE /api/marketing/products/:id
// @access  Private (digital_marketing, admin)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Product '${product.name}' deleted from Marketplace`
    });
  } catch (err) {
    next(err);
  }
};

// ==========================================
// 3. WEBSITE SECTIONS CONTENT MANAGEMENT
// ==========================================

// @desc    Get all website section contents
// @route   GET /api/marketing/content
// @access  Private (digital_marketing, admin)
exports.getSectionContents = async (req, res, next) => {
  try {
    const { page, sectionKey, isActive } = req.query;
    let query = {};

    if (page && page !== 'all') query.page = page;
    if (sectionKey) query.sectionKey = sectionKey;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const contents = await SiteContent.find(query).sort({ priority: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contents.length,
      data: contents
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new website section content block
// @route   POST /api/marketing/content
// @access  Private (digital_marketing, admin)
exports.createSectionContent = async (req, res, next) => {
  try {
    const {
      sectionKey,
      sectionName,
      page,
      badge,
      title,
      subtitle,
      content,
      ctaText,
      ctaLink,
      imageUrl,
      bgColor,
      priority,
      isActive
    } = req.body;

    const newContent = await SiteContent.create({
      sectionKey,
      sectionName: sectionName || sectionKey,
      page: page || 'home',
      badge: badge || 'SPECIAL ANNOUNCEMENT',
      title,
      subtitle,
      content,
      ctaText: ctaText || 'Explore Now',
      ctaLink: ctaLink || '/',
      imageUrl: imageUrl || '',
      bgColor: bgColor || 'from-amber-700 to-amber-900',
      priority: priority || 1,
      isActive: isActive !== undefined ? isActive : true,
      lastUpdatedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: `Website section content for '${newContent.sectionName}' created!`,
      data: newContent
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update website section content
// @route   PUT /api/marketing/content/:id
// @access  Private (digital_marketing, admin)
exports.updateSectionContent = async (req, res, next) => {
  try {
    req.body.lastUpdatedBy = req.user._id;

    const content = await SiteContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Section content not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Content for '${content.sectionName}' updated successfully`,
      data: content
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Quick toggle active status of website section
// @route   PATCH /api/marketing/content/:id/toggle
// @access  Private (digital_marketing, admin)
exports.toggleSectionStatus = async (req, res, next) => {
  try {
    const content = await SiteContent.findById(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Section content not found'
      });
    }

    content.isActive = !content.isActive;
    content.lastUpdatedBy = req.user._id;
    await content.save();

    res.status(200).json({
      success: true,
      message: `Section '${content.sectionName}' is now ${content.isActive ? 'ACTIVE on website' : 'HIDDEN from website'}`,
      data: content
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete section content
// @route   DELETE /api/marketing/content/:id
// @access  Private (digital_marketing, admin)
exports.deleteSectionContent = async (req, res, next) => {
  try {
    const content = await SiteContent.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Section content not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Section content '${content.sectionName}' removed`
    });
  } catch (err) {
    next(err);
  }
};

// ==========================================
// 4. OVERALL MARKETING ANALYTICS
// ==========================================

// @desc    Get comprehensive marketing analytics (Marketplace + Content + Campaigns)
// @route   GET /api/marketing/analytics
// @access  Private (digital_marketing, admin)
exports.getMarketingAnalytics = async (req, res, next) => {
  try {
    const [campaigns, totalProducts, inStockProducts, activeSections] = await Promise.all([
      Campaign.find(),
      Product.countDocuments(),
      Product.countDocuments({ inStock: true }),
      SiteContent.countDocuments({ isActive: true })
    ]);

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
        marketplace: {
          totalProducts,
          inStockProducts,
          outOfStockProducts: totalProducts - inStockProducts
        },
        websiteContent: {
          activeSectionsCount: activeSections
        },
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
