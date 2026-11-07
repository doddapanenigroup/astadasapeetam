const express = require('express');
const { 
  getConsultations, 
  acceptConsultation, 
  completeConsultation, 
  updateAstrologerProfile 
} = require('../controllers/astrologerController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

// Astrologer & Admin have access
router.use(protect);
router.use(authorize('astrologer', 'admin'));

router.get('/consultations', getConsultations);
router.put('/consultations/:id/accept', acceptConsultation);
router.put('/consultations/:id/complete', completeConsultation);
router.put('/profile', updateAstrologerProfile);

module.exports = router;
