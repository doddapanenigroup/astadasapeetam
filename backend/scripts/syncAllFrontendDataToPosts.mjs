import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

// Import frontend data
import { allFestivalsData } from '../../frontend/src/data/festivalsData.js';
import { yatraPackages } from '../../frontend/src/data/yatraData.js';
import { marketplaceProducts } from '../../frontend/src/data/marketplaceData.js';
import { allStories } from '../../frontend/src/data/storiesData.js';
import { allTemplesData } from '../../frontend/src/data/templesData.js';
import { shaktiPeethasData } from '../../frontend/src/data/shaktiPeethasData.js';

// Post Mongoose Schema
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    titleTelugu: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true, lowercase: true },
    excerpt: { type: String, trim: true },
    content: { type: String, required: true },
    devotionalVerse: { type: String, trim: true },
    featuredImage: { type: String, default: '/images/temple_kashi.jpg' },
    deity: { type: String, default: 'Universal Mother Parashakti' },
    tags: { type: [String], default: [] },
    seoTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: [String], default: [] },
    status: { type: String, default: 'published' },
    viewsCount: { type: Number, default: 1250 },
    authorName: { type: String, default: 'Sri Astadasapeetam Peetha Editor' }
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

async function runSync() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/astadasapeetam';
  console.log('Connecting to MongoDB at:', mongoUri);
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB.');

  const allPostsToSync = [];

  // 1. All 16 Festivals from festivalsData.js
  for (const fest of allFestivalsData) {
    const slug = fest.id.toLowerCase();
    const content = `
${fest.summary || `${fest.name} is one of the most auspicious festivals in Sanatana Dharma celebrated on ${fest.date}.`}

### Auspicious Tithi & Timings
- **Hindu Calendar Tithi:** ${fest.tithi}
- **Observance Date:** ${fest.date}
- **Presiding Deity:** ${fest.deity}
- **Auspicious Puja Timings:** ${fest.pujaTime}
- **Fasting Type:** ${fest.fastingType}

### Sacred Puja Vidhi (పూజా విధానం)
${fest.pujaVidhi || 'Perform morning bath during Brahma Muhurtham, chant sacred mantras, offer pure flowers and naivedyam, and seek divine blessings.'}

### Spiritual Significance (ఆధ్యాత్మిక విశిష్టత)
${fest.significance || 'Observing this sacred festival purifies the mind, invites divine grace, and destroys obstacles.'}
    `.trim();

    allPostsToSync.push({
      title: fest.name,
      titleTelugu: fest.sanskritName || fest.name,
      slug: slug,
      category: 'festivals',
      excerpt: fest.summary || `${fest.name} - ${fest.tithi} (${fest.date}). Puja Muhurtham: ${fest.pujaTime}`,
      content: content,
      devotionalVerse: fest.mantra || '',
      featuredImage: fest.image || '/images/fest_shiva.png',
      deity: fest.deity || 'Supreme Divine',
      tags: ['Festivals Calendar', 'Sanatana Dharma', fest.name, fest.deity || 'Devotion'],
      seoTitle: `${fest.name} 2026 Date, Puja Vidhi, Timings & Significance`,
      metaDescription: `Complete spiritual guide for ${fest.name} on ${fest.date}. Fasting rules, auspicious muhurtham, and sacred mantras.`,
      keywords: [fest.name, 'Festivals 2026', fest.tithi, 'Hindu Vratams'],
      status: 'published',
      viewsCount: Math.floor(Math.random() * 4000) + 3000
    });
  }

  // 2. All 18 Shakti Peethas from shaktiPeethasData.js
  for (const peetha of shaktiPeethasData) {
    const slug = (peetha.slug || peetha.id || peetha.englishName || peetha.templeName)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const content = `
${peetha.sthalaPuranam || peetha.description || `${peetha.templeName} is one of the sacred 18 Maha Shakti Peethas established by Adi Shankaracharya.`}

### Sacred Kshetra Details
- **Peetha Number:** #${peetha.number || peetha.id} of 18 Maha Shakti Peethas
- **Sacred Body Part / Relic:** ${peetha.bodyPart || peetha.relic || 'Sacred Relic of Devi Sati'}
- **Presiding Goddess (Shakti):** ${peetha.goddess || peetha.name}
- **Presiding Bhairava:** ${peetha.bhairava || 'Lord Bhairava'}
- **Holy Location:** ${peetha.location || peetha.city}, ${peetha.state || peetha.country}
- **Sacred River / Theertham:** ${peetha.river || peetha.theertham || 'Sacred Temple Pushkarini'}

### Temple Architecture & Pilgrimage Route
${peetha.architecture || peetha.travelGuide || 'The sanctum sanctorum resonates with divine mother frequencies. Pilgrims can reach via nearest railway station and airport.'}
    `.trim();

    allPostsToSync.push({
      title: `${peetha.templeName || peetha.name}: #${peetha.number || ''} of 18 Maha Shakti Peethas`,
      titleTelugu: peetha.teluguName || peetha.teluguTitle || peetha.name,
      slug: slug,
      category: 'temples',
      excerpt: peetha.excerpt || `${peetha.templeName} in ${peetha.location || peetha.state}. Sacred relic: ${peetha.bodyPart || 'Shakti Peetha'}.`,
      content: content,
      devotionalVerse: peetha.sloka || peetha.dhyanaSloka || 'లంకాయాం శంకరీ దేవి కామాక్షీ కాంచికాపురే...',
      featuredImage: peetha.image || peetha.featuredImage || '/images/temple_kashi.jpg',
      deity: `${peetha.goddess || peetha.name} & ${peetha.bhairava || 'Bhairava'}`,
      tags: ['18 Shakti Peethas', 'Sacred Temples', peetha.name, peetha.location || 'India'],
      seoTitle: `${peetha.templeName} Darshan Timings, History & Sthala Puranam Guide`,
      metaDescription: `Complete pilgrimage guide to ${peetha.templeName}. Relic significance, timings, how to reach, and nearby kshetras.`,
      keywords: [peetha.templeName, '18 Shakti Peethas', peetha.name, 'Temple Guide'],
      status: 'published',
      viewsCount: Math.floor(Math.random() * 5000) + 2500
    });
  }

  // 3. Yatra Packages from yatraData.js
  for (const yatra of yatraPackages) {
    const slug = (yatra.id || yatra.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const itineraryText = (yatra.itinerary || [])
      .map(it => `**${it.day}: ${it.title}**\n${it.desc}`)
      .join('\n\n');

    const content = `
${yatra.description}

### Sacred Circuit Package Highlights
${(yatra.highlights || []).map(h => `- ${h}`).join('\n')}

### Pilgrimage Logistics & Amenities
- **Duration:** ${yatra.duration}
- **Pilgrimage Transport:** ${yatra.transport}
- **Hotel Stay:** ${yatra.stay}
- **Sacred Meals:** ${yatra.food}
- **Departure Hubs:** ${(yatra.departureCities || []).join(', ')}
- **Upcoming Departure Dates:** ${(yatra.nextDepartures || []).join(', ')}
- **Sanctum Seva Fee:** ₹${yatra.price} (Original: ₹${yatra.originalPrice} • ${yatra.discount})

### Day-by-Day Sacred Itinerary
${itineraryText || 'Detailed darshan schedule curated with VIP entry.'}
    `.trim();

    allPostsToSync.push({
      title: yatra.title,
      titleTelugu: yatra.teluguTitle || yatra.title,
      slug: slug,
      category: 'yatralu',
      excerpt: yatra.description,
      content: content,
      devotionalVerse: 'కాశ్యాం తు మరణాన్ముక్తిః స్మరణాదరుణాచలమ్ | దర్శనాదభ్రసదసి జనితా కమలాలయే ||',
      featuredImage: yatra.image || '/images/temple_tirupati.jpg',
      deity: 'Teertha Yatra Sangam',
      tags: ['Teertha Yatralu', 'Pilgrimage Circuit', yatra.duration, 'VIP Darshan'],
      seoTitle: `${yatra.title} - Pilgrimage Tour Package & Itinerary`,
      metaDescription: `Book ${yatra.title} with VIP darshan, satvik meals, AC stay, and Vedic purohit guidance.`,
      keywords: ['Teertha Yatralu', yatra.title, 'Pilgrimage Packages', 'Yatra 2026'],
      status: 'published',
      viewsCount: Math.floor(Math.random() * 3000) + 3500
    });
  }

  // 4. Marketplace Products from marketplaceData.js
  for (const prod of marketplaceProducts) {
    const slug = (prod.id || prod.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const featuresText = (prod.features || []).map(f => `- ${f}`).join('\n');

    const content = `
${prod.description}

### Sacred Features & Authentication
${featuresText}

### Temple Consecration & Pricing
- **Price:** ₹${prod.price} (MRP: ₹${prod.originalPrice} • ${prod.discount})
- **Purity Certification:** ${prod.certified || '100% Satvik & Energized'}
- **Rating:** ⭐ ${prod.rating} / 5 (${prod.reviewsCount} devotee reviews)
- **Fast Delivery:** Certified 48-hour sanctum dispatch across India with holy Gangajal bottle.
    `.trim();

    allPostsToSync.push({
      title: prod.name,
      titleTelugu: prod.name,
      slug: slug,
      category: 'marketplace',
      excerpt: `${prod.subtitle}. ₹${prod.price} (${prod.discount}). ${prod.certified}`,
      content: content,
      devotionalVerse: 'ధ్యాన మూలం గురోర్మూర్తిః పూజా మూలం గురోః పదమ్ | మంత్ర మూలం గురోర్వాక్యం మోక్ష మూలం గురోః కృపా ||',
      featuredImage: prod.image || '/images/poojakit.png',
      deity: 'Temple Satvik Store',
      tags: ['Marketplace', 'Pooja Samagri', 'Satvik Products', prod.category],
      seoTitle: `Buy ${prod.name} Online - Certified 100% Satvik Pooja Store`,
      metaDescription: `Order authentic ${prod.name} energized at sacred temples. Fast delivery with genuine purity certification.`,
      keywords: [prod.name, 'Pooja Store', 'Satvik Essentials', 'Rudraksha Online'],
      status: 'published',
      viewsCount: Math.floor(Math.random() * 2000) + 2000
    });
  }

  // 5. Puranic Stories from storiesData.js
  for (const story of allStories) {
    const slug = (story.id || story.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const content = `
${story.summary}

### Scriptural Source
**${story.purana}** (${story.readTime})

### The Divine Moral & Spiritual Lesson (ఆధ్యాత్మిక సందేశం)
> "${story.moral}"

---

### Complete Sacred Narrative (సంపూర్ణ కథ)
${story.fullStory}
    `.trim();

    allPostsToSync.push({
      title: story.title,
      titleTelugu: story.title,
      slug: slug,
      category: 'spirituality',
      excerpt: `${story.summary} — Moral: "${story.moral}"`,
      content: content,
      devotionalVerse: story.moral,
      featuredImage: story.image || '/images/art_akshaya_real.jpg',
      deity: story.purana,
      tags: ['Stories', 'Spirituality & Dharma', ...(story.tags || [])],
      seoTitle: `${story.title} - Scriptural Story & Moral from ${story.purana}`,
      metaDescription: `Read the inspiring story of ${story.title} with moral lessons for spiritual seekers.`,
      keywords: [story.title, 'Hindu Stories', story.purana, 'Bhakti Stories'],
      status: 'published',
      viewsCount: Math.floor(Math.random() * 4000) + 3000
    });
  }

  // 6. Astrology Articles & Horoscopes
  allPostsToSync.push(
    {
      title: 'Vedic Astrology Fundamentals: Janma Kundali, Bhavas & Planetary Yogas Explained',
      titleTelugu: 'వేద జ్యోతిష్యం ప్రాథమిక సూత్రాలు - జన్మ కుండలి, 12 భావాలు మరియు గ్రహ యోగాలు',
      slug: 'vedic-astrology-fundamentals-janma-kundali-yogas',
      category: 'astrology',
      excerpt: 'How the 12 astrological houses (Bhavas) and 9 planets shape life trajectory, karma, health, and Dharmic destiny.',
      content: `Vedic Astrology (Jyotishya - the Science of Light) reveals the blueprint of our past life karma through the planetary positions at birth.

The 12 Bhavas represent Tanu (Body), Dhana (Wealth), Sahaja (Siblings), Sukha (Mother & Home), Putra (Children & Intellect), Ari (Enemies & Health), Yuvati (Spouse & Partnerships), Randhra (Longevity), Dharma (Fortune), Karma (Career), Labha (Gains), and Vyaya (Liberation/Expenses).

By analyzing the strength of the Lagna lord and planetary aspects, astrologers guide seekers to overcome challenges through timely pariharams and gems.`,
      devotionalVerse: 'గ్రహాణామాదిరాదిత్యో లోకరక్షణకారకః | విషమస్థానసంభూతాం పీడాం హరతు మే రవిః ||',
      featuredImage: '/images/art_mantras_real.jpg',
      deity: 'Lord Surya Narayana & Navagrahas',
      tags: ['Vedic Astrology', 'Horoscope', 'Kundali', 'Navagraha'],
      seoTitle: 'Vedic Astrology Kundali Analysis & 12 Bhavas Guide in Telugu',
      metaDescription: 'Learn how to read birth horoscope, planetary strengths, and astrological yogas.',
      keywords: ['Vedic Astrology', 'Janma Kundali', 'Jyotishyam', 'Horoscope Guide'],
      status: 'published',
      viewsCount: 6100
    },
    {
      title: 'Navagraha Dosha Pariharams: Simple Home Remedies, Mantras & Feeding Cows',
      titleTelugu: 'నవగ్రహ దోష నివారణ పరిహారాలు - నిత్య జీవితంలో సులువైన ఉపాయాలు',
      slug: 'navagraha-dosha-pariharams-home-remedies-mantras',
      category: 'astrology',
      excerpt: 'Effective sattvic remedies for pacifying Rahu, Ketu, Saturn, and Mars without expensive rituals.',
      content: `Planetary afflictions (Graha Peeda) can be effectively alleviated through pure, devotional lifestyle remedies prescribed by Sage Parashara:

1. **Surya (Sun):** Offer water to the rising Sun with Gayatri Mantra. Respect father.
2. **Chandra (Moon):** Drink water from silver vessels, respect mother, and offer milk on Mondays.
3. **Kuja (Mars):** Chant Hanuman Chalisa, donate red lentils, and practice patience.
4. **Budha (Mercury):** Feed green grass to cows, donate books to needy students.
5. **Guru (Jupiter):** Wear yellow, respect teachers and elders, donate turmeric and chana dal.
6. **Shukra (Venus):** Respect women, offer white sweet naivedyam, maintain cleanliness.
7. **Shani (Saturn):** Light sesame oil lamp on Saturdays, feed crows, help poor labourers.
8. **Rahu & Ketu:** Feed stray dogs and birds, chant Maha Mrityunjaya Mantra.`,
      devotionalVerse: 'బ్రహ్మా మురారిస్త్రిపురాంతకారీ భానుః శశీ భూమిసుతో బుధశ్చ | గురుశ్చ శుక్రః శని రాహు కేతవః కుర్వంతు సర్వే మమ సుప్రభాతమ్ ||',
      featuredImage: '/images/news_tirupati.jpg',
      deity: 'Navagraha Devatas',
      tags: ['Astrology Remedies', 'Navagraha', 'Pariharam', 'Jyotish'],
      seoTitle: 'Navagraha Dosha Remedies & Daily Pariharams in Telugu',
      metaDescription: 'Simple and effective remedies for all 9 planets to remove obstacles and invite peace.',
      keywords: ['Navagraha Remedies', 'Astrology Pariharam', 'Shani Remedies', 'Rahu Ketu'],
      status: 'published',
      viewsCount: 7800
    }
  );

  console.log(`Prepared ${allPostsToSync.length} comprehensive publications to upsert...`);

  let countSynced = 0;
  for (const postData of allPostsToSync) {
    await Post.findOneAndUpdate(
      { slug: postData.slug },
      { $set: postData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    countSynced++;
  }

  console.log(`Successfully synced ${countSynced} publications into MongoDB!`);

  const categoryBreakdown = await Post.aggregate([
    { $group: { _id: '$category', total: { $sum: 1 } } },
    { $sort: { total: -1 } }
  ]);

  console.log('Live Post Count by Category in DB:');
  console.table(categoryBreakdown);
  console.log('Total publications in DB:', await Post.countDocuments());

  process.exit(0);
}

runSync().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
