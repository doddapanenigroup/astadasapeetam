const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: [true, 'Please provide vendor shop name'],
      trim: true
    },
    contactPerson: {
      type: String,
      required: [true, 'Please provide contact person name'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Please provide vendor phone number'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    category: {
      type: String,
      enum: ['pooja-kits', 'rudraksha', 'yantras-idols', 'dhoop-samagri', 'vedic-books', 'prasadam', 'all-devotional'],
      default: 'all-devotional'
    },
    commissionRate: {
      type: Number,
      default: 20, // Platform commission %
      min: 0,
      max: 100
    },
    pickupAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true }
    },
    shiprocketPickupLocation: {
      type: String,
      default: '' // Name registered in Shiprocket pickup locations
    },
    bankDetails: {
      accountHolderName: { type: String, default: '' },
      accountNumber: { type: String, default: '' },
      ifscCode: { type: String, default: '' },
      bankName: { type: String, default: '' },
      upiId: { type: String, default: '' }
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'suspended'],
      default: 'active'
    },
    totalOrdersFulfilled: {
      type: Number,
      default: 0
    },
    totalSalesGross: {
      type: Number,
      default: 0
    },
    platformCommissionEarned: {
      type: Number,
      default: 0
    },
    pendingVendorPayout: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Vendor', vendorSchema);
