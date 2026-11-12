const express = require('express');
const { 
  getConsultations, 
  getConsultationById,
  bookConsultation,
  sendMessage,
  updateTimer,
  completeConsultation, 
  getAstrologers,
  updateCertification
} = require('../controllers/astrologerController');

const router = express.Router();

// Public / Devotee endpoints
router.post('/book', bookConsultation);
router.get('/astrologers', getAstrologers);
router.get('/consultations/:id', getConsultationById);
router.post('/consultations/:id/message', sendMessage);
router.put('/consultations/:id/timer', updateTimer);

// Astrologer Desk & Admin endpoints
router.get('/consultations', getConsultations);
router.put('/consultations/:id/complete', completeConsultation);
router.put('/astrologers/:id/certification', updateCertification);

module.exports = router;
