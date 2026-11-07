const express = require('express');
const { 
  // Campaigns
  getCampaigns, 
  createCampaign, 
  updateCampaign, 
  // Marketplace Products
  getProducts,
  createProduct,
  updateProduct,
  toggleProductStock,
  deleteProduct,
  // Website Content in Each Section
  getSectionContents,
  createSectionContent,
  updateSectionContent,
  toggleSectionStatus,
  deleteSectionContent,
  // Analytics
  getMarketingAnalytics 
} = require('../controllers/marketingController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

// Digital Marketing & Admin have access
router.use(protect);
router.use(authorize('digital_marketing', 'admin'));

// 1. Campaign & Coupon Routes
router.get('/campaigns', getCampaigns);
router.post('/campaigns', createCampaign);
router.put('/campaigns/:id', updateCampaign);

// 2. Marketplace Management Routes
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.patch('/products/:id/toggle-stock', toggleProductStock);
router.delete('/products/:id', deleteProduct);

// 3. Website Sections Content Routes
router.get('/content', getSectionContents);
router.post('/content', createSectionContent);
router.put('/content/:id', updateSectionContent);
router.patch('/content/:id/toggle', toggleSectionStatus);
router.delete('/content/:id', deleteSectionContent);

// 4. Marketing Analytics
router.get('/analytics', getMarketingAnalytics);

module.exports = router;
