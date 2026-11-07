const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database connection
const connectDB = require('./src/config/db');

// Route files
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const marketingRoutes = require('./src/routes/marketingRoutes');
const astrologerRoutes = require('./src/routes/astrologerRoutes');
const errorHandler = require('./src/middleware/errorHandler');

// Model for auto-seeding
const User = require('./src/models/User');

const app = express();

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Enable CORS
const allowedOrigins = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',') 
  : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in dev
  },
  credentials: true
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🕉️ Astadasapeetam Sacred Backend Server is Active',
    timestamp: new Date().toISOString(),
    rolesSupported: ['admin', 'digital_marketing', 'astrologer', 'devotee']
  });
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/astrologer', astrologerRoutes);

// Custom Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to DB and seed default 3 roles
const startServer = async () => {
  const db = await connectDB();

  // Auto-seed default accounts for the 3 basic roles if DB is connected
  if (db) {
    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('🌱 No users found. Seeding initial accounts for the 3 roles...');

        await User.create([
          {
            name: 'Sri Astadasapeetam Admin',
            email: 'admin@astadasapeetam.com',
            password: 'Admin@12345',
            role: 'admin',
            phone: '+91 98765 00001'
          },
          {
            name: 'Priya Sharma (Digital Marketing)',
            email: 'marketing@astadasapeetam.com',
            password: 'Market@12345',
            role: 'digital_marketing',
            phone: '+91 98765 00002',
            marketingProfile: {
              department: 'Spiritual Campaigns & Social Growth',
              assignedCampaignsCount: 3
            }
          },
          {
            name: 'Pandit Suryanarayana Shastri',
            email: 'astrologer@astadasapeetam.com',
            password: 'Astro@12345',
            role: 'astrologer',
            phone: '+91 98765 00003',
            astrologerProfile: {
              title: 'Pradhana Jyotish Acharya',
              experienceYears: 24,
              specialties: ['Kundali Matching', 'Dosha Nivarana', 'Vedic Muhurtham', 'Gemstones'],
              consultationFee: 750,
              bio: 'Senior Vedic astrologer specializing in Parashara Hora Shastra and Vivaha Guna Milan.',
              isVerified: true
            }
          }
        ]);

        console.log('✅ Initial 3 Roles Seeded Successfully:');
        console.log('   👑 Admin: admin@astadasapeetam.com / Admin@12345');
        console.log('   📢 Digital Marketing: marketing@astadasapeetam.com / Market@12345');
        console.log('   🔮 Astrologer: astrologer@astadasapeetam.com / Astro@12345');
      }
    } catch (seedErr) {
      console.error('Seed error:', seedErr.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 Astadasapeetam Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
