const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please specify category'],
      enum: [
        'pooja-kits',
        'rudraksha',
        'yantras-idols',
        'dhoop-samagri',
        'vedic-books',
        'prasadam',
        'gemstones',
        'general'
      ],
      default: 'pooja-kits'
    },
    subtitle: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Please specify product selling price in INR'],
      min: [0, 'Price must be positive']
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price must be positive']
    },
    discount: {
      type: String,
      default: '0% OFF'
    },
    rating: {
      type: Number,
      default: 4.9,
      min: 1,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 120
    },
    image: {
      type: String,
      default: '/images/poojakit.png'
    },
    certified: {
      type: String,
      default: '100% Satvik & Energized'
    },
    inStock: {
      type: Boolean,
      default: true
    },
    fastDelivery: {
      type: Boolean,
      default: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    stockQuantity: {
      type: Number,
      default: 100
    },
    description: {
      type: String,
      default: 'Blessed authentic Vedic spiritual product.'
    },
    features: {
      type: [String],
      default: []
    },
    salesCount: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
