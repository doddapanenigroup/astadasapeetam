const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide devotee / staff name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  password: {
    type: String,
    required: [true, 'Please enter a secure password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'editor', 'operations_manager', 'digital_marketing', 'astrologer', 'devotee', 'user'],
      message: '{VALUE} is not a valid role. Available roles: admin, editor, operations_manager, digital_marketing, astrologer, devotee'
    },
    default: 'devotee'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Specific role metadata
  astrologerProfile: {
    title: { type: String, default: 'Vedic Jyotish Acharya' },
    experienceYears: { type: Number, default: 5 },
    specialties: [{ type: String }],
    consultationFee: { type: Number, default: 399 },
    bio: { type: String, default: '' },
    isVerified: { type: Boolean, default: true },
    certificationType: { 
      type: String, 
      enum: ['certified', 'non_certified'], 
      default: 'certified' 
    },
    isCertified: { type: Boolean, default: true },
    certificateDetails: { type: String, default: 'Sanskrit University Jyotish Acharya' },
    pricingPackages: [
      {
        durationMinutes: { type: Number, default: 20 },
        priceInr: { type: Number, default: 399 },
        title: { type: String, default: '' }
      }
    ]
  },
  marketingProfile: {
    department: { type: String, default: 'Growth & Social Campaigns' },
    assignedCampaignsCount: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { 
      id: this._id, 
      name: this.name, 
      email: this.email, 
      role: this.role 
    },
    process.env.JWT_SECRET || 'astadasapeetam_sacred_jwt_secret_key_2026',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
