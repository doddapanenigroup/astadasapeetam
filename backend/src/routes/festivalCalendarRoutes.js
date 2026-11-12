const express = require('express');
const router = express.Router();
const festivalCalendarController = require('../controllers/festivalCalendarController');

// GET /api/festival-calendar
router.get('/', festivalCalendarController.getFestivalEvents);

// GET /api/festival-calendar/:id
router.get('/:id', festivalCalendarController.getFestivalEventById);

// POST /api/festival-calendar
router.post('/', festivalCalendarController.createFestivalEvent);

// PUT /api/festival-calendar/:id
router.put('/:id', festivalCalendarController.updateFestivalEvent);

// DELETE /api/festival-calendar/:id
router.delete('/:id', festivalCalendarController.deleteFestivalEvent);

module.exports = router;
