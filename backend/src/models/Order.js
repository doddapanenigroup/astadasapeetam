const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true }
      }
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        sku: { type: String },
        image: { type: String }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    couponCode: {
      type: String
    },
    finalPayable: {
      type: Number,
      required: true
    },
    payment: {
      method: {
        type: String,
        enum: ['razorpay', 'phonepe', 'upi', 'cod'],
        default: 'upi'
      },
      status: {
        type: String,
        enum: ['PAID', 'PENDING', 'COLLECT_ON_DELIVERY', 'REFUNDED', 'FAILED'],
        default: 'PENDING'
      },
      transactionId: { type: String },
      paidAt: { type: Date }
    },
    delivery: {
      status: {
        type: String,
        enum: ['CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED'],
        default: 'CONFIRMED'
      },
      courierPartner: {
        type: String,
        enum: ['BlueDart Express', 'Delhivery Surface', 'India Post (Speed Post)', 'DTDC Priority', 'Local Temple Seva Courier'],
        default: 'BlueDart Express'
      },
      awbTrackingNumber: { type: String },
      shippedAt: { type: Date },
      deliveredAt: { type: Date },
      estimatedDelivery: { type: String }
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
