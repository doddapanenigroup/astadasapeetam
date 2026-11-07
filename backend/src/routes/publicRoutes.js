const express = require('express');
const Product = require('../models/Product');
const SiteContent = require('../models/SiteContent');
const { getRssFeed, getSitemapXml } = require('../controllers/postController');

const router = express.Router();

// Public RSS 2.0 Feed
router.get('/rss', getRssFeed);

// Public XML Sitemap
router.get('/sitemap', getSitemapXml);

// Public marketplace products
router.get('/products', async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = { inStock: true };

    if (category && category !== 'all') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ rating: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
});

// Public website section contents
router.get('/content', async (req, res, next) => {
  try {
    const { page, sectionKey } = req.query;
    let query = { isActive: true };

    if (page && page !== 'all') query.page = page;
    if (sectionKey) query.sectionKey = sectionKey;

    const contents = await SiteContent.find(query).sort({ priority: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contents.length,
      data: contents
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
