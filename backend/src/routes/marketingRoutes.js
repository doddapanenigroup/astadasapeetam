const express = require('express');
const { 
  getCampaigns, 
  createCampaign, 
  updateCampaign, 
  getMarketingAnalytics 
} = require('../controllers/marketingController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

// Digital Marketing & Admin have access
router.use(protect);
router.use(authorize('digital_marketing', 'admin'));

router.get('/campaigns', getCampaigns);
router.post('/campaigns', createCampaign);
router.put('/campaigns/:id', updateCampaign);
router.get('/analytics', getMarketingAnalytics);

module.exports = router;
