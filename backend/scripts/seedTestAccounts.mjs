import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';

dotenv.config();

const testAccounts = [
  {
    name: 'Sri Astadasapeetam Admin',
    email: 'admin@astadasapeetam.com',
    password: 'Password@123',
    role: 'admin',
    phone: '+91 98765 00001',
    isActive: true
  },
  {
    name: 'Ramesh Sharma',
    email: 'editor@astadasapeetam.com',
    password: 'Password@123',
    role: 'editor',
    phone: '+91 98765 00002',
    isActive: true
  },
  {
    name: 'Anil Kumar',
    email: 'operations@astadasapeetam.com',
    password: 'Password@123',
    role: 'operations_manager',
    phone: '+91 98765 00003',
    isActive: true
  },
  {
    name: 'Priya Sharma',
    email: 'marketing@astadasapeetam.com',
    password: 'Password@123',
    role: 'digital_marketing',
    phone: '+91 98765 00004',
    isActive: true
  },
  {
    name: 'Pandit Suryanarayana Shastri',
    email: 'astrologer@astadasapeetam.com',
    password: 'Password@123',
    role: 'astrologer',
    phone: '+91 98765 00005',
    isActive: true
  },
  {
    name: 'Kavitha Reddy',
    email: 'devotee@astadasapeetam.com',
    password: 'Password@123',
    role: 'devotee',
    phone: '+91 98765 00006',
    isActive: true
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/astadasapeetam');
  console.log('Connected to MongoDB');

  for (const acc of testAccounts) {
    const existing = await User.findOne({ email: acc.email });
    if (existing) {
      existing.name = acc.name;
      existing.role = acc.role;
      existing.phone = acc.phone;
      existing.isActive = true;
      existing.password = acc.password;
      await existing.save();
      console.log('Updated account:', acc.role, acc.email);
    } else {
      await User.create(acc);
      console.log('Created new account:', acc.role, acc.email);
    }
  }

  const all = await User.find({});
  console.log('Total accounts now:', all.length);
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
