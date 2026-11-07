const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide article/post title'],
      trim: true
    },
    titleTelugu: {
      type: String,
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Please provide slug identifier'],
      unique: true,
      trim: true,
      lowercase: true
    },
    category: {
      type: String,
      required: [true, 'Please choose a category'],
      enum: [
        'temples',
        'panchangam',
        'slokas',
        'astrology',
        'festivals',
        'marketplace',
        'general'
      ],
      default: 'temples'
    },
    excerpt: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Please provide article content']
    },
    devotionalVerse: {
      type: String,
      trim: true
    },
    featuredImage: {
      type: String,
      default: '/images/temple_kashi.jpg'
    },
    deity: {
      type: String,
      default: 'Universal Mother Parashakti'
    },
    tags: {
      type: [String],
      default: ['Astadasapeetam', 'Vedic Culture', 'Devotion']
    },
    seoTitle: {
      type: String
    },
    metaDescription: {
      type: String
    },
    keywords: {
      type: [String],
      default: ['Shakti Peethas', 'Hindu Temples', 'Panchangam', 'Vedic Astrology']
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    },
    viewsCount: {
      type: Number,
      default: 850
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    authorName: {
      type: String,
      default: 'Sri Astadasapeetam Peetha Editor'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);
