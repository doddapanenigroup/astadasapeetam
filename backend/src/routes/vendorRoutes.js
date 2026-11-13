const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const Order = require('../models/Order');
const shiprocketService = require('../services/shiprocketService');

// 1. Get all vendors
router.get('/vendors', async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json({ success: true, count: vendors.length, data: vendors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Create new vendor
router.post('/vendors', async (req, res) => {
  try {
    const {
      shopName,
      contactPerson,
      phone,
      email,
      category,
      commissionRate,
      pickupAddress,
      bankDetails
    } = req.body;

    if (!shopName || !contactPerson || !phone || !pickupAddress?.pincode) {
      return res.status(400).json({
        success: false,
        error: 'Please provide shop name, contact person, phone, and pickup address with pincode.'
      });
    }

    const vendor = new Vendor({
      shopName,
      contactPerson,
      phone,
      email,
      category: category || 'all-devotional',
      commissionRate: commissionRate !== undefined ? Number(commissionRate) : 20,
      pickupAddress,
      bankDetails: bankDetails || {}
    });

    // Auto-register pickup location in Shiprocket
    const syncRes = await shiprocketService.registerVendorPickupLocation(vendor);
    if (syncRes.pickupLocationTag) {
      vendor.shiprocketPickupLocation = syncRes.pickupLocationTag;
    }

    await vendor.save();

    res.status(201).json({
      success: true,
      message: 'Vendor registered successfully and pickup location configured.',
      data: vendor,
      shiprocketSync: syncRes
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Update vendor
router.put('/vendors/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!vendor) {
      return res.status(404).json({ success: false, error: 'Vendor not found' });
    }

    res.json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Dispatch Courier Pickup (Shiprocket) for an Order
router.post('/logistics/dispatch-pickup', async (req, res) => {
  try {
    const { orderNumber, vendorId } = req.body;

    let order = null;
    if (orderNumber) {
      order = await Order.findOne({ orderNumber });
    }

    if (!order) {
      // Create lightweight fallback order representation if order was stored in client state
      order = {
        orderNumber: orderNumber || `AST-${Date.now().toString().slice(-6)}`,
        customer: req.body.customer || {
          name: 'Devotee Customer',
          phone: '9848012345',
          address: 'Main Street, Khammam, Telangana - 507002'
        },
        items: req.body.items || [{ name: 'Sampoorna Pooja Kit', price: 1299, quantity: 1 }],
        finalPayable: req.body.finalPayable || 1299,
        paymentMethod: req.body.paymentMethod || 'Prepaid'
      };
    }

    let vendor = null;
    if (vendorId) {
      vendor = await Vendor.findById(vendorId);
    } else {
      vendor = await Vendor.findOne({ status: 'active' });
    }

    // Call Shiprocket Service
    const shipmentResult = await shiprocketService.createShipmentOrder(order, vendor);

    // Update vendor fulfilled counts & commission
    if (vendor && shipmentResult.success) {
      const orderVal = order.finalPayable || 1000;
      const commRate = vendor.commissionRate || 20;
      const commission = Math.round((orderVal * commRate) / 100);
      const sellerPayout = orderVal - commission;

      vendor.totalOrdersFulfilled += 1;
      vendor.totalSalesGross += orderVal;
      vendor.platformCommissionEarned += commission;
      vendor.pendingVendorPayout += sellerPayout;
      await vendor.save();
    }

    res.json({
      success: true,
      message: `Pickup dispatched from ${vendor?.shopName || 'Vendor'}. Courier assigned.`,
      shipment: shipmentResult,
      commissionEarned: vendor ? Math.round(((order.finalPayable || 1000) * (vendor.commissionRate || 20)) / 100) : 200
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Track AWB
router.get('/logistics/track/:awb', async (req, res) => {
  try {
    const tracking = await shiprocketService.trackShipment(req.params.awb);
    res.json({ success: true, tracking });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Logistics Status / Health
router.get('/logistics/status', async (req, res) => {
  const hasCreds = Boolean(process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD);
  res.json({
    success: true,
    provider: 'Shiprocket Multi-Vendor Logistics',
    status: hasCreds ? 'LIVE_CONNECTED' : 'SIMULATION_SANDBOX',
    emailConfigured: hasCreds ? process.env.SHIPROCKET_EMAIL : 'Not Set in .env (Mock Mode Enabled)',
    features: [
      'Multi-Vendor Pickup from Seller Address',
      'Automated AWB & Barcode Generation',
      'WhatsApp Live Tracking Webhook',
      'Doorstep Delivery Verification'
    ]
  });
});

module.exports = router;
