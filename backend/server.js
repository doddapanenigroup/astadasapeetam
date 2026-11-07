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
const postRoutes = require('./src/routes/postRoutes');
const publicRoutes = require('./src/routes/publicRoutes');
const errorHandler = require('./src/middleware/errorHandler');

// Models for auto-seeding
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const SiteContent = require('./src/models/SiteContent');
const Consultation = require('./src/models/Consultation');
const Post = require('./src/models/Post');

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
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true);
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
app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/astrologer', astrologerRoutes);
app.use('/api/posts', postRoutes);

// Custom Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to DB and seed default data
const startServer = async () => {
  const db = await connectDB();

  if (db) {
    try {
      // 1. Seed default 3 roles
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
              department: 'Spiritual Marketplace & Content Management',
              assignedCampaignsCount: 5
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
        console.log('✅ Initial 3 Roles Seeded Successfully');
      }

      // 2. Seed initial Marketplace Products
      const productCount = await Product.countDocuments();
      if (productCount === 0) {
        console.log('🌱 Seeding initial Marketplace Products...');
        const initialProducts = [
          {
            customId: 'prod-1',
            name: 'Sampoorna Satyanarayana Swamy Vrata Maha Kit',
            category: 'pooja-kits',
            subtitle: 'Complete 32 Sacred Items + Katha Book & Toranam',
            rating: 4.9,
            reviewsCount: 1420,
            price: 1299,
            originalPrice: 1899,
            discount: '32% OFF',
            image: '/images/poojakit.png',
            certified: '100% Satvik & Energized',
            inStock: true,
            fastDelivery: true,
            stockQuantity: 85,
            description: 'Everything you need for an auspicious Sri Satyanarayana Swamy Pooja at home: Pure Pasupu, Kumkum, Chandanam, Akshata, Betel nuts, Navadhanyalu, Vrata Katha book, Sacred Kalash cloth, Janeu, Camphor, Dhoop wicks, and Cotton bati.',
            features: [
              '32 authentic Vedic items packed individually',
              'Includes Sri Satyanarayana Vrata Katha in Telugu/English',
              'Panchamrita vessels and sacred yellow cloth included',
              'Blessed at sacred temple before dispatch'
            ]
          },
          {
            customId: 'prod-2',
            name: 'Pure Brass Kamakshi Deepam with Daily Nitya Pooja Kit',
            category: 'pooja-kits',
            subtitle: 'Solid Brass Diya with Gajalakshmi Carving + Ghee Wicks',
            rating: 4.95,
            reviewsCount: 980,
            price: 899,
            originalPrice: 1350,
            discount: '33% OFF',
            image: '/images/special_offer_thali.png',
            certified: 'Solid Heavy Brass (550g)',
            inStock: true,
            fastDelivery: true,
            stockQuantity: 120,
            description: 'Traditional south-Indian Kamakshi Amman Vilakku handcrafted by master artisans. Auspicious for daily morning and evening Sandhya Vandanam, inviting perpetual wealth and positive vibrations.',
            features: [
              'Crafted in heavy grade 100% brass with antique finish',
              'Includes 50 pre-rolled organic cow ghee diya wicks',
              'Complimentary bottle of holy Gangajal & Kumkum',
              'Tarnish-resistant coating for lifelong shine'
            ]
          },
          {
            customId: 'prod-4',
            name: 'Certified 5-Mukhi Nepal Rudraksha Japa Mala (108+1 Beads)',
            category: 'rudraksha',
            subtitle: 'Lab Certified Natural Beads with Silk Tassel & Gomukhi Bag',
            rating: 4.98,
            reviewsCount: 3120,
            price: 799,
            originalPrice: 1299,
            discount: '38% OFF',
            image: '/images/rudraksha.png',
            certified: 'IGI Lab Certified Authenticity',
            inStock: true,
            fastDelivery: true,
            stockQuantity: 65,
            description: 'Sacred 5-Mukhi Nepal Rudraksha Mala hand-knotted with authentic natural beads representing Lord Shiva Kalagni Rudra.',
            features: [
              '108+1 natural collector grade beads (7mm to 8mm)',
              'Traditional red thread knotting between each bead',
              'Includes velvet Gomukhi Japa pouch and Lab Certificate',
              'Energized with Mahamrityunjaya Mantra'
            ]
          },
          {
            customId: 'prod-5',
            name: 'Rare 1-Mukhi (Ekamukhi) Half-Moon Rudraksha in Silver Capping',
            category: 'rudraksha',
            subtitle: 'Lord Shiva Absolute Form • Pure 925 Sterling Silver Frame',
            rating: 4.96,
            reviewsCount: 840,
            price: 3499,
            originalPrice: 5999,
            discount: '42% OFF',
            image: '/images/rudraksha.png',
            certified: 'Indonesian Lab Tested & Sealed',
            inStock: true,
            fastDelivery: true,
            stockQuantity: 18,
            description: 'The most sacred and rare among all Rudrakshas. Governed by the Sun (Surya), the 1-Mukhi bead bestows supreme concentration and destroys past sins.',
            features: [
              'Natural half-moon Cashew shape 1-Mukhi bead',
              'Encased in hallmarked 92.5% pure sterling silver casing',
              'Official Gemological Laboratory X-Ray & Certificate',
              'Consecrated with Rudrabhishekam at Kashi Vishwanath'
            ]
          },
          {
            customId: 'prod-7',
            name: 'Pure Copper 3D Maha Meru Sri Yantra (Energized)',
            category: 'yantras-idols',
            subtitle: 'Sacred Sri Vidya Pyramid Geometry (450g)',
            rating: 4.97,
            reviewsCount: 1890,
            price: 1899,
            originalPrice: 2899,
            discount: '34% OFF',
            image: '/images/yantra.png',
            certified: 'Prana Pratishtha Consecrated',
            inStock: true,
            fastDelivery: true,
            stockQuantity: 40,
            description: 'The 3D Meru Sri Yantra is the cosmic architectural representation of the universe and Goddess Lalitha Tripura Sundari.',
            features: [
              '100% Virgin Copper with precise Vedic mathematical angles',
              'Consecrated with Lalitha Sahasranama and Kumkumarchana',
              'Dimensions: 3.5 inches x 3.5 inches x 3.5 inches height',
              'Permanent laser-engraved sacred geometric circuits'
            ]
          },
          {
            customId: 'prod-9',
            name: 'Bhimseni Pure Desi Camphor (Kapur) - 500g Value Pack',
            category: 'dhoop-samagri',
            subtitle: '100% Organic, Chemical-Free, Burns Without Any Residue',
            rating: 4.95,
            reviewsCount: 4200,
            price: 549,
            originalPrice: 799,
            discount: '31% OFF',
            image: '/images/poojakit.png',
            certified: 'Food Grade & Pure Herbal',
            inStock: true,
            fastDelivery: true,
            stockQuantity: 250,
            description: 'Original Bhimseni Kapur (Nacha Kapur) extracted from the Cinnamomum Camphora tree.',
            features: [
              'Leaves zero ash and zero toxic black smoke',
              'Pure organic raw uneven crystal chunks',
              'Rich therapeutic aroma relieves congestion and stress'
            ]
          },
          {
            customId: 'prod-11',
            name: 'Srimad Bhagavad Gita Deluxe Gold-Embossed Edition',
            category: 'vedic-books',
            subtitle: 'Original Sanskrit Slokas + Word Meanings in Telugu & English',
            rating: 4.99,
            reviewsCount: 5400,
            price: 699,
            originalPrice: 999,
            discount: '30% OFF',
            image: '/images/book.png',
            certified: 'Authentic Scriptural Commentary',
            inStock: true,
            fastDelivery: true,
            stockQuantity: 150,
            description: 'Hardbound sacred scripture with gold-embossed cover and bookmark ribbon. Contains all 700 verses across 18 chapters.',
            features: [
              'Hardcover binding with archival acid-free golden pages',
              'Full Sanskrit verses with transliteration and translation',
              'Includes Gita Mahatmyam and Gita Dhyana Slokas'
            ]
          },
          {
            customId: 'prod-13',
            name: 'Tirumala Tirupati Srivari Laddu Prasadam Box & Seshavastram',
            category: 'prasadam',
            subtitle: 'Blessed at Tirumala Sanctum • Desi Ghee & Cardamom Delicacy',
            rating: 5.0,
            reviewsCount: 8900,
            price: 499,
            originalPrice: 650,
            discount: '23% OFF',
            image: '/images/temple_tirupati.jpg',
            certified: 'Direct Sanctum Seva Blessing',
            inStock: true,
            fastDelivery: true,
            stockQuantity: 300,
            description: 'Receive the eternal divine grace of Kaliyuga Vaikuntha Lord Sri Venkateswara right at your doorstep.',
            features: [
              'Authentic large Srivari Laddu made with pure cow ghee and dry fruits',
              'Includes sanctified yellow Seshavastram (sacred cloth)',
              'Venkateswara Swamy pocket deity card with sanctified Akshata'
            ]
          }
        ];
        await Product.insertMany(initialProducts);
        console.log(`✅ ${initialProducts.length} Marketplace Products Seeded Successfully`);
      }

      // 3. Seed initial Website Section Content
      const contentCount = await SiteContent.countDocuments();
      if (contentCount === 0) {
        console.log('🌱 Seeding initial Website Section Contents...');
        const initialContents = [
          {
            sectionKey: 'announcement_bar',
            sectionName: 'Top Announcement Header Ticker',
            page: 'all',
            badge: 'MAHA SHIVARATRI & NAVARATRI 2026',
            title: 'Special Sankalpa Pooja Registrations are Live across 18 Maha Shakti Peethas',
            subtitle: 'Direct sanctum prasadam delivered anywhere in India within 48 hours.',
            ctaText: 'Book Special Seva',
            ctaLink: '/sacred-temples',
            priority: 1,
            isActive: true
          },
          {
            sectionKey: 'hero_banner',
            sectionName: 'Homepage Main Hero Spotlight',
            page: 'home',
            badge: 'ASTADASA SHAKTI PEETHAS',
            title: 'Sacred Gateway to 18 Maha Shakti Peethas & Divine Kshetras',
            subtitle: 'Experience authentic Sthala Puranams, live temple navigation, trusted Vedic astrologers, and sanctified pooja essentials.',
            ctaText: 'Explore Sacred Temples',
            ctaLink: '/sacred-temples',
            priority: 2,
            isActive: true
          },
          {
            sectionKey: 'sloka_of_day',
            sectionName: 'Daily Sloka & Vedic Chanting Section',
            page: 'home',
            badge: 'SLOKA OF THE DAY',
            title: 'లంకాయాం శంకరీ దేవి (Lankāyāṃ Śaṅkarī devī)',
            subtitle: 'Adi Sankaracharya Shakti Peetha Stotram',
            content: 'ధ్యాన శ్లోకం: లంకాయాం శంకరీ దేవి కామాక్షీ కాంచికాపురే | ప్రద్యుమ్నే శృంఖలా దేవి చాముండీ క్రౌంచపట్టణే ||',
            ctaText: 'Read Full Stotram',
            ctaLink: '/sacred-temples',
            priority: 3,
            isActive: true
          },
          {
            sectionKey: 'festival_alert',
            sectionName: 'Auspicious Festival Banner',
            page: 'home',
            badge: 'FESTIVAL SPECIAL',
            title: 'Maha Sivaratri Lingodbhava Maha Abhishekam',
            subtitle: 'Special Bilvarchana and Bhasma Aarti at 12 Jyotirlingas. Order energized Rudraksha & Prasadam now.',
            ctaText: 'Order Shivaratri Kit',
            ctaLink: '/marketplace?category=pooja-kits',
            priority: 4,
            isActive: true
          },
          {
            sectionKey: 'marketplace_spotlight',
            sectionName: 'Marketplace Header Promotional Ribbon',
            page: 'marketplace',
            badge: 'VEDIC PURITY GUARANTEE',
            title: '100% Satvik Pooja Kits, Lab-Certified Rudrakshas & Sanctum Prasadam',
            subtitle: 'Flat 30% OFF on all Copper Sri Yantras and Nepal Rudraksha Malas. Free temple Gangajal bottle with every order.',
            ctaText: 'Shop Best Sellers',
            ctaLink: '/marketplace',
            priority: 5,
            isActive: true
          }
        ];
        await SiteContent.insertMany(initialContents);
        console.log(`✅ ${initialContents.length} Website Section Contents Seeded Successfully`);
      }

      // 4. Seed initial Astrologer Consultations
      const consultCount = await Consultation.countDocuments();
      if (consultCount === 0) {
        console.log('🌱 Seeding initial Astrologer Consultations...');
        const astrologerUser = await User.findOne({ role: 'astrologer' });
        const initialConsultations = [
          {
            devoteeName: 'Venkata Raman Rao',
            devoteePhone: '+91 94401 23456',
            devoteeEmail: 'raman.rao@example.com',
            birthDetails: {
              dateOfBirth: '14-Aug-1996',
              timeOfBirth: '06:45 AM',
              placeOfBirth: 'Vijayawada, AP',
              rasi: 'Simha (Leo)',
              nakshatram: 'Makha',
              gotram: 'Kasyapa'
            },
            consultationType: 'kundali_matching',
            problemDescription: 'Vivaha Guna Milan check with prospective bride from Visakhapatnam. Check Kuja dosha and longevity compatibility.',
            status: 'pending',
            fee: 750,
            isPaid: true
          },
          {
            devoteeName: 'Ananya Kulkarni',
            devoteePhone: '+91 98802 87654',
            devoteeEmail: 'ananya.k@example.com',
            birthDetails: {
              dateOfBirth: '22-Nov-1991',
              timeOfBirth: '10:15 PM',
              placeOfBirth: 'Hyderabad, Telangana',
              rasi: 'Vrishabha (Taurus)',
              nakshatram: 'Rohini',
              gotram: 'Bharadwaja'
            },
            consultationType: 'jathakam_analysis',
            problemDescription: 'Frequent obstacles in career promotion and foreign travel. Requesting suitable gemstone and mantra remedies.',
            status: 'confirmed',
            assignedAstrologer: astrologerUser?._id,
            scheduledSlot: new Date(Date.now() + 86400000),
            fee: 750,
            isPaid: true
          },
          {
            devoteeName: 'Rajesh Sharma',
            devoteePhone: '+91 98110 33221',
            devoteeEmail: 'rajesh.sharma@example.com',
            birthDetails: {
              dateOfBirth: '05-Jan-1988',
              timeOfBirth: '04:30 AM',
              placeOfBirth: 'Tirupati, AP',
              rasi: 'Karkataka (Cancer)',
              nakshatram: 'Pushyami',
              gotram: 'Vashishta'
            },
            consultationType: 'dosha_upaya',
            problemDescription: 'Sade Sati Saturn transit remedy and family peace blessings.',
            status: 'completed',
            assignedAstrologer: astrologerUser?._id,
            fee: 750,
            isPaid: true,
            astrologerRemedyNotes: 'Prescribed Shani Shanti Tailabhishekam at Mandapalli Shani temple. Chanting Hanuman Chalisa 11 times every Tuesday & Saturday. Wearing 7-Mukhi certified Nepal Rudraksha recommended.'
          }
        ];
        await Consultation.insertMany(initialConsultations);
        console.log(`✅ ${initialConsultations.length} Consultations Seeded Successfully`);
      }

      // 5. Seed initial Sacred Devotional Posts
      const postCount = await Post.countDocuments();
      if (postCount === 0) {
        console.log('🌱 Seeding initial Sacred Devotional Posts...');
        const initialPosts = [
          {
            title: 'The Mystical Significance of Shankari Devi: First of the 18 Maha Shakti Peethas',
            titleTelugu: 'లంకాయాం శంకరీ దేవి - ప్రథమ మహా శక్తిపీఠం వైశిష్ట్యం',
            slug: 'shankari-devi-trincomalee-first-shakti-peetha',
            category: 'temples',
            excerpt: 'Exploring the eternal sanctity of Mother Shankari atop Swami Rock in Trincomalee, Sri Lanka, where Mata Satis groin relic fell.',
            content: 'The foremost among the Ashta Dasa Shakti Peethas as eulogized by Jagadguru Sri Adi Shankaracharya is Mata Shankari Devi in Sri Lanka. Situated on the picturesque Swami Rock cliff overlooking the deep blue waters of the Indian Ocean, this holy kshetra resonates with cosmic divine mother vibrations.\n\nAccording to the ancient Sthala Puranam, Ravana and his mother were ardent devotees of Lord Koneswarar at this cliff. The temple was consecrated in ancient times and continues to bless seekers with courage, marital prosperity, and spiritual liberation.',
            devotionalVerse: 'ధ్యాన శ్లోకం: లంకాయాం శంకరీ దేవి కామాక్షీ కాంచికాపురే | ప్రద్యుమ్నే శృంఖలా దేవి చాముండీ క్రౌంచపట్టణే ||',
            featuredImage: '/images/temple_kashi.jpg',
            deity: 'Mata Shankari Devi & Lord Trikoneshwara',
            tags: ['Shakti Peetha', 'Sri Lanka', 'Adi Shankara', 'Trincomalee'],
            seoTitle: 'Shankari Devi Temple Trincomalee - 1st Maha Shakti Peetha Guide',
            metaDescription: 'Complete spiritual guide to Shankari Devi Temple, Trincomalee Sri Lanka. History, stotra, darshan timings, and travel route.',
            keywords: ['Shankari Devi', 'Trincomalee Shakti Peetha', 'Swami Rock', 'Sri Lanka Hindu Temple'],
            status: 'published',
            viewsCount: 3420
          },
          {
            title: 'Maha Sivaratri Lingodbhava Kalam & Special Bilva Archana Vidhanam',
            titleTelugu: 'మహా శివరాత్రి లింగోద్భవ కాలం మరియు విశేష బిల్వార్చన విధానం',
            slug: 'maha-sivaratri-lingodbhava-kalam-archana',
            category: 'festivals',
            excerpt: 'The divine midnight hour when Lord Shiva manifested as the infinite Pillar of Fire (Jyotirlinga), and how devotees can observe the sacred vrata.',
            content: 'Maha Sivaratri is the most auspicious night for devotion to Lord Mahadeva. During the auspicious Nishitha Kaalam (midnight Lingodbhava hour), performing Panchamrita Abhishekam with Bilva leaves destroys sins of lifetimes.\n\nBilva leaves represent the three Gunas (Sattva, Rajas, Tamas) and the three eyes of Lord Shiva. Offering even a single trifoliate leaf with devotion during Lingodbhava yields the merit of thousands of yajnas.',
            devotionalVerse: 'త్రిదళం త్రిగుణాకారం త్రినేత్రం చ త్రియాయుధం | త్రిజన్మపాపసంహారం ఏకబిల్వం శివార్పణమ్ ||',
            featuredImage: '/images/fest_shiva.png',
            deity: 'Lord Kashi Vishwanath & Mahadeva',
            tags: ['Maha Sivaratri', 'Jyotirlinga', 'Bilva Archana', 'Vrata Vidhi'],
            seoTitle: 'Maha Sivaratri Lingodbhava Kalam Puja Timings & Bilva Archana',
            metaDescription: 'Step-by-step guide for Maha Sivaratri fasting, Lingodbhava puja timings, and sacred Bilvarchana benefits.',
            keywords: ['Maha Sivaratri 2026', 'Lingodbhava Kalam', 'Bilva Patra', 'Shiva Puja'],
            status: 'published',
            viewsCount: 5120
          },
          {
            title: 'Authentic 5-Mukhi vs 1-Mukhi Nepal Rudraksha: Astrological Benefits & Testing',
            titleTelugu: 'రుద్రాక్షల వైశిష్ట్యం: ఏకముఖి మరియు పంచముఖి రుద్రాక్షల ధారణా ఫలితాలు',
            slug: 'nepal-rudraksha-astrological-benefits-testing',
            category: 'astrology',
            excerpt: 'Detailed Vedic guidelines on how to test authenticity, choose beads according to birth horoscope, and maintain pranic purity.',
            content: 'Rudraksha beads originated from the compassionate tears of Lord Shiva shed for the welfare of mankind. In the Shrimad Devi Bhagavatam and Shiva Purana, each mukhi (facet) of the sacred bead is described with its presiding deity and planetary ruler.\n\nThe 5-Mukhi bead is governed by Jupiter (Guru) and Kalagni Rudra, bestowing peace of mind, intellect, and balanced blood pressure. The rare 1-Mukhi half-moon bead is governed by Surya (the Sun), elevating soul consciousness and destroying malefic planetary doshas.',
            devotionalVerse: 'ఓం నమః శివాయ • రుద్రాక్ష ధారణాత్ పుణ్యం కోటి జన్మార్జితం ఫలమ్ ||',
            featuredImage: '/images/rudraksha.png',
            deity: 'Lord Shiva Kalagni Rudra',
            tags: ['Rudraksha', 'Vedic Astrology', 'Gemology', 'Spiritual Healing'],
            seoTitle: 'Nepal Rudraksha Astrological Guide & Authenticity Tests',
            metaDescription: 'Learn how to wear authentic Nepal Rudraksha beads, choose based on your horoscope, and avoid fake stones.',
            keywords: ['Nepal Rudraksha', '5 Mukhi Mala', '1 Mukhi Ekamukhi', 'Jyotish Remedy'],
            status: 'published',
            viewsCount: 2890
          },
          {
            title: 'Tirtha Yatra Mahatmyam: Why Kashi and Rameswaram Complete the Sacred Cycle',
            titleTelugu: 'కాశీ - రామేశ్వరం తీర్థ యాత్ర పరిపూర్ణ ఫలితాలు',
            slug: 'kashi-rameswaram-sacred-yatra-cycle',
            category: 'temples',
            excerpt: 'The timeless Vedic tradition of taking holy Gangajal from Kashi and offering it at Rameswaram Jyotirlinga, and bringing holy sand back to Triveni Sangam.',
            content: 'In Hindu tradition, a pilgrimage to Kashi remains incomplete without offering prayers to Lord Ramanathaswamy at Rameswaram. This sacred North-South axis connects the two holy extremes of Bharatavarsha into one unified spiritual consciousness.\n\nPilgrims collect the sacred water of Mother Ganga at Dashashwamedh Ghat in Kashi, perform the 22 holy wells (Theerthams) bath at Rameswaram, and perform Abhishekam to the sand Linga sculpted by Mata Sita.',
            devotionalVerse: 'కాశ్యాం తు మరణాన్ముక్తిః స్మరణాదరుణాచలమ్ | దర్శనాదభ్రసదసి జనితా కమలాలయే ||',
            featuredImage: '/images/temple_tirupati.jpg',
            deity: 'Lord Ramanathaswamy & Vishwanath',
            tags: ['Tirtha Yatra', 'Kashi', 'Rameswaram', 'Jyotirlinga Circuit'],
            seoTitle: 'Kashi to Rameswaram Sacred Pilgrimage Circuit Complete Guide',
            metaDescription: 'Vedic rituals, train routes, theertham bathing procedure, and significance of Kashi and Rameswaram yatra.',
            keywords: ['Kashi Yatra', 'Rameswaram Jyotirlinga', 'Tirtha Snanam', 'Char Dham'],
            status: 'published',
            viewsCount: 4180
          }
        ];
        await Post.insertMany(initialPosts);
        console.log(`✅ ${initialPosts.length} Sacred Devotional Posts Seeded Successfully`);
      }

    } catch (seedErr) {
      console.error('Seed error:', seedErr.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 Astadasapeetam Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🛒 Marketplace Public: http://localhost:${PORT}/api/public/products`);
    console.log(`📢 Site Content Public: http://localhost:${PORT}/api/public/content`);
  });
};

startServer();
