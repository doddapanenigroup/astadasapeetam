const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide video title'],
      trim: true
    },
    titleTelugu: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      enum: ['devotional-videos', 'puja-videos', 'divine-bhajans', 'live-darshan', 'pravachanams', 'mantras-chants', 'all'],
      default: 'devotional-videos'
    },
    videoUrl: {
      type: String,
      required: [true, 'Please provide video or YouTube URL'],
      trim: true
    },
    embedUrl: {
      type: String,
      trim: true
    },
    thumbnail: {
      type: String,
      default: '/images/temple_tirupati.jpg'
    },
    subtitle: {
      type: String,
      trim: true,
      default: 'Devotional Video'
    },
    temple: {
      type: String,
      trim: true
    },
    speakerOrArtist: {
      type: String,
      trim: true
    },
    duration: {
      type: String,
      default: '10:00'
    },
    description: {
      type: String,
      trim: true
    },
    isLatestVideo: {
      type: Boolean,
      default: true
    },
    isLive: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    },
    viewsCount: {
      type: Number,
      default: 1200
    },
    tags: {
      type: [String],
      default: ['Devotional', 'Vedic Chanting']
    },
    authorName: {
      type: String,
      default: 'Sri Astadasapeetam Editor'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Video', videoSchema);
