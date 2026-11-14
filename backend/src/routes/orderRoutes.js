const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Vendor = require('../models/Vendor');

// 1. Create a new Sacred Order
router.post('/', async (req, res) => {
  try {
    const {
      orderNumber,
      items,
      totalAmount,
      discountAmount,
      couponCode,
      finalPayable,
      paymentMethod,
      customer
    } = req.body;

    // Generate unique order number if not present
    const finalOrderNumber = orderNumber || `AST-${Math.floor(100000 + Math.random() * 900000)}`;

    // Normalize customer address structure
    let formattedAddress = {
      street: 'Sacred Sanctum Street',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500001'
    };

    if (customer?.address) {
      if (typeof customer.address === 'string') {
        const parts = customer.address.split(',');
        formattedAddress = {
          street: parts[0]?.trim() || customer.address,
          city: parts[parts.length - 2]?.trim() || 'Hyderabad',
          state: 'Telangana',
          pincode: customer.address.match(/\b\d{6}\b/)?.[0] || '500001'
        };
      } else if (typeof customer.address === 'object') {
        formattedAddress = {
          street: customer.address.street || customer.address.flat || 'Main Street',
          city: customer.address.city || 'Hyderabad',
          state: customer.address.state || 'Telangana',
          pincode: customer.address.pincode || '500001'
        };
      }
    }

    // Normalize items
    const formattedItems = (items || []).map((item, idx) => ({
      name: item.title || item.name || `Sacred Item ${idx + 1}`,
      price: Number(item.price) || 500,
      quantity: Number(item.quantity) || 1,
      image: item.image || '/images/poojakit.png',
      sku: item.id || `SKU-${Date.now()}-${idx}`
    }));

    // Normalize payment method
    let validPaymentMethod = 'upi';
    if (paymentMethod === 'cod') validPaymentMethod = 'cod';
    else if (paymentMethod === 'card') validPaymentMethod = 'razorpay';
    else if (paymentMethod === 'netbanking') validPaymentMethod = 'phonepe';

    const newOrder = await Order.create({
      orderNumber: finalOrderNumber,
      customer: {
        name: customer?.name || 'Devotee Customer',
        phone: customer?.phone || '+91 86398 61707',
        email: customer?.email || 'devotee@astadasapeetam.com',
        address: formattedAddress
      },
      items: formattedItems,
      totalAmount: Number(totalAmount) || Number(finalPayable) || 1000,
      discountAmount: Number(discountAmount) || 0,
      couponCode: couponCode || '',
      finalPayable: Number(finalPayable) || 1000,
      payment: {
        method: validPaymentMethod,
        status: validPaymentMethod === 'cod' ? 'COLLECT_ON_DELIVERY' : 'PAID',
        transactionId: `TXN-${Date.now()}`,
        paidAt: new Date()
      },
      delivery: {
        status: 'CONFIRMED',
        courierPartner: 'Delhivery Surface',
        awbTrackingNumber: `SR-DEL-${Math.floor(10000000 + Math.random() * 90000000)}`,
        estimatedDelivery: '3 to 5 business days'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Sacred order placed and stored in MongoDB successfully',
      data: newOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Could not place order'
    });
  }
});

// 2. Get all orders (for Admin Console)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Get orders by devotee phone number (for /my-account sync)
router.get('/user/:phone', async (req, res) => {
  try {
    const cleanPhone = req.params.phone.replace(/\D/g, '').slice(-10);
    // Flexible regex that matches phone number regardless of spaces or dashes
    const flexibleRegex = cleanPhone.split('').join('\\D*');
    const orders = await Order.find({
      'customer.phone': { $regex: flexibleRegex, $options: 'i' }
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Get order details by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Update order delivery status (Admin / Logistics dispatch)
router.put('/:orderNumber/status', async (req, res) => {
  try {
    const { status, courierPartner, awbTrackingNumber, estimatedDelivery } = req.body;
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (status) order.delivery.status = status;
    if (courierPartner) order.delivery.courierPartner = courierPartner;
    if (awbTrackingNumber) order.delivery.awbTrackingNumber = awbTrackingNumber;
    if (estimatedDelivery) order.delivery.estimatedDelivery = estimatedDelivery;

    await order.save();
    res.json({ success: true, message: 'Order status updated', data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
