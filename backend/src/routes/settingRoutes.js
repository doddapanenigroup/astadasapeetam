const express = require('express');
const Setting = require('../models/Setting');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

// Get setting (protected)
router.get('/:key', protect, async (req, res, next) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    res.status(200).json({
      success: true,
      data: setting ? setting.value : null
    });
  } catch (err) {
    next(err);
  }
});

// Update or create setting (admin, digital_marketing)
router.post('/:key', protect, authorize('admin', 'digital_marketing'), async (req, res, next) => {
  try {
    const { value, description } = req.body;
    let setting = await Setting.findOne({ key: req.params.key });

    if (setting) {
      setting.value = value;
      if (description) setting.description = description;
      setting.lastUpdatedBy = req.user._id;
      await setting.save();
    } else {
      setting = await Setting.create({
        key: req.params.key,
        value,
        description: description || '',
        lastUpdatedBy: req.user._id
      });
    }

    res.status(200).json({
      success: true,
      message: `Setting '${req.params.key}' updated successfully!`,
      data: setting.value
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
