'use client';

import React, { useState } from 'react';
import ImageOptimizationStudio from './ImageOptimizationStudio';
import {
  Sparkles,
  Eye,
  EyeOff,
  Send,
  PlusCircle,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Music,
  Video,
  FileText,
  Flame,
  Sun,
  Compass,
  Heart,
  Globe,
  Search,
  Copy,
  Check,
  Share2,
  Lock
} from 'lucide-react';

export const DEVOTIONAL_CATEGORIES = [
  { id: 'temples', label: 'Sacred Temples & Peethas', icon: '🏛️', telugu: 'క్షేత్రాలు & పీఠాలు', badge: '18 Peethas', needsImage: true, desc: 'Temple history, darshan timings, sthala puranam, architecture & special sevas' },
  { id: 'slokas', label: 'Daily Slokas & Chants', icon: '📜', telugu: 'నిత్య శ్లోకాలు', badge: '3-Way Chants', needsImage: false, desc: 'Sanskrit, Telugu & English phonetic verses with word-by-word meaning & chanting time (No image needed)' },
  { id: 'mantras', label: 'Sacred Mantras & Bija Japa', icon: '🔔', telugu: 'బీజాక్షర మంత్రాలు', badge: '108 Japa', needsImage: false, desc: 'Moola mantras, bija aksharas, 108 japa sankhya & siddhi benefits (No image needed)' },
  { id: 'stotras', label: 'Divine Stotras & Kavachas', icon: '📖', telugu: 'స్తోత్రాలు & కవచాలు', badge: 'Kavachas', needsImage: false, desc: 'Sage/Rishi author, total verses count, full sacred stotra & phala shruti (No image needed)' },
  { id: 'vrathalu', label: 'Vrathalu & Pooja Vidhi', icon: '🔥', telugu: 'వ్రతాలు & పూజా విధానం', badge: 'Upavasam', needsImage: true, desc: 'Fasting rules, sacred samagri checklist, step-by-step vidhi & prasadam recipe' },
  { id: 'yantras', label: 'Sacred Yantras & Maha Meru', icon: '💠', telugu: 'యంత్రాలు & మహామేరు', badge: 'Tantra & Meru', needsImage: true, desc: 'Sacred geometry, metal composition, Ishanya placement & prana pratishtha' },
  { id: 'horoscope', label: 'Daily Horoscope (12 Rasis)', icon: '☀️', telugu: 'రాశి ఫలాలు', badge: '12 Rasis', needsImage: false, desc: 'Moon sign, ruling planet, lucky colors/numbers, predictions & pariharam (No image needed)' },
  { id: 'muhurtham', label: 'Shubh Muhurtham & Choghadiya', icon: '⏳', telugu: 'శుభ ముహూర్తాలు', badge: 'Tithi & Lagna', needsImage: false, desc: 'Ceremony occasion, auspicious time window, lagna shuddhi, tithi & rahu kalam (No image needed)' },
  { id: 'remedies', label: 'Remedies & Dosha Nivarana', icon: '✨', telugu: 'దోష నివారణ & ఉపాయాలు', badge: 'Pariharam', needsImage: false, desc: 'Dosha type, symptoms, step-by-step pariharam, fasting days & sacred temples (No image needed)' },
  { id: 'bhajans', label: 'Divine Bhajans & Kirtanas', icon: '🪕', telugu: 'భజనలు & కీర్తనలు', badge: 'Sangeetam', needsImage: false, desc: 'Composer/Vaggeyakara, raga & tala, full Telugu lyrics, meaning & audio link (No image needed)' },
  { id: 'spirituality', label: 'Spirituality & Dharma', icon: '🪷', telugu: 'ఆధ్యాత్మికత & ధర్మం', badge: 'Vedanta', needsImage: false, desc: 'Philosophical theme, Sanskrit sutra, commentary & daily devotee sadhana (No image needed)' },
  { id: 'epaper', label: 'Devotional E-Paper Edition', icon: '📰', telugu: 'ఈ-పేపర్ ఎడిషన్', badge: 'Daily PDF', needsImage: true, desc: 'Issue date, edition region, headline, full editorial & PDF download link' },
  { id: 'festivals', label: 'Festivals Calendar', icon: '🗓️', telugu: 'పండుగల క్యాలెండర్', badge: 'Vedic Dates', needsImage: true, desc: 'Festival dates, hindu month, fasting rules, significance & celebrations' },
  { id: 'videos', label: 'Devotional Videos & Pravachanams', icon: '📺', telugu: 'భక్తి వీడియోలు', badge: 'Darshan Live', needsImage: false, desc: 'YouTube stream embed, duration, speaker/swamiji & spiritual highlights (Uses video player)' },
  { id: 'gods', label: 'Gods & Divine Avatars', icon: '🕉️', telugu: 'దేవతలు & అవతారాలు', badge: 'Iconography', needsImage: true, desc: 'Avatar form, consort, vahana, sacred weapons, iconography & temples' },
  { id: 'yatralu', label: 'Teertha Yatralu (తీర్థయాత్రలు)', icon: '🚩', telugu: 'పుణ్య తీర్థయాత్రలు', badge: 'Teertha Yatralu', needsImage: true, desc: 'Sacred pilgrimage circuits, confirmed VIP darshans, day-by-day itinerary & travel guidelines' },
  { id: 'panchangam', label: 'Daily Panchangam', icon: '📅', telugu: 'నిత్య పంచాంగం', badge: 'Panchangam', needsImage: false, desc: 'Tithi, vara, nakshatra, yoga, karana, sunrise/sunset & auspicious timings (No image needed)' }
];

export const CATEGORY_SAMPLE_TEMPLATES = {
  temples: {
    title: 'Srisailam Bhramaramba Devi & Mallikarjuna Swamy Temple Puranam',
    titleTelugu: 'శ్రీశైల భ్రమరాంబికా మల్లికార్జున స్వామి క్షేత్ర మహాత్మ్యం',
    deity: 'Goddess Bhramaramba & Lord Mallikarjuna Swamy',
    featuredImage: '/images/temple_kashi.jpg',
    tags: '18 Shakti Peethas, 12 Jyotirlingas, Srisailam, Andhra Pradesh',
    keywords: 'Srisailam, Bhramaramba, Mallikarjuna, Jyotirlinga, Shakti Peetha',
    excerpt: 'One of the rare sacred kshetras where a Maha Shakti Peetha and a Jyotirlinga coexist on the divine Nallamala hills along Krishna river.',
    content: 'Srisailam is revered as the Kailasa of South India. Here, the neck of Sati Devi fell, sanctifying the holy hill as the Bhramaramba Shakti Peetha. Devotees also worship Lord Mallikarjuna, one of the 12 sacred Jyotirlingas. Pilgrims believe that visiting Srisailam releases souls from cycles of rebirth (Sri Saila Sikharam Drustva Punarjanma Na Vidyate). The temple features magnificent Kakatiya and Vijayanagara architectural gopurams with intricate sculptures depicting the Shiva Purana.',
    templeLocation: 'Srisailam, Nandyal District, Andhra Pradesh, India',
    darshanTimings: 'Sarva Darshanam: 6:00 AM - 1:00 PM & 6:00 PM - 9:30 PM | Sparsha Darshanam: Morning sessions',
    nearestTransport: 'Markapur Road Railway Station (85 km) / Rajiv Gandhi International Airport Hyderabad (200 km)',
    specialSevas: 'Garba Gruha Sparsha Darshanam, Rudrabhishekam, Chandi Homam, Kumkumarchana, Kalyanotsavam'
  },
  slokas: {
    title: 'Maha Gayatri Mantra & Pratah Sandhya Vandanam Sloka',
    titleTelugu: 'మహా గాయత్రీ మంత్రం & ప్రాతఃకాల సంధ్యావందన శ్లోకం',
    deity: 'Mother Gayatri Devi & Surya Bhagavan',
    featuredImage: '/images/panchangam_hero.jpg',
    tags: 'Gayatri Mantra, Daily Slokas, Morning Chants, Rigveda',
    keywords: 'Gayatri Mantra, Devanagari, Telugu Sloka, English Meaning, Chanting Benefits',
    excerpt: 'The supreme Vedic chant illuminated with Devanagari, Telugu script, and English phonetics for daily morning sadhana.',
    devanagariVerse: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    slokaTelugu: 'ఓం భూర్భువస్సువః | తత్సవితుర్వరేణ్యం | భర్గో దేవస్య ధీమహి | ధియో యో నః ప్రచోదయాత్ ||',
    slokaPhonetics: 'Om Bhur Bhuvah Svah | Tat-Savitur Varenyam | Bhargo Devasya Dheemahi | Dhiyo Yo Nah Prachodayaat ||',
    slokaMeaning: 'We meditate upon the supreme, divine effulgence of that Sun God (Savitr), who created all realms. May that illumined light stimulate, purify, and awaken our intellect and consciousness.',
    chantingTime: 'Brahma Muhurtham (4:30 AM - 6:00 AM) or Sunrise & Sunset Sandhyas',
    content: 'The Gayatri Mantra is hailed as the Mother of the Vedas. Chanting this 24-syllable mantra awakens the chakras, enhances intellectual clarity, removes karmic impurities, and instills peaceful cosmic vibration in the mind. Sage Vishvamitra attained supreme Brahmarsi status through its realization.'
  },
  mantras: {
    title: 'Maha Mrityunjaya Mantra for Longevity & Spiritual Radiance',
    titleTelugu: 'మహా మృత్యుంజయ మంత్రం - ఆయురారోగ్య సిద్ధి',
    deity: 'Lord Tryambaka (Maha Mrityunjaya Shiva)',
    featuredImage: '/images/temple_kashi.jpg',
    tags: 'Maha Mrityunjaya, Bija Mantras, 108 Japa, Rudra Mantra',
    keywords: 'Mrityunjaya Mantra, Bija Akshara, 108 Japa, Shiva, Healing Mantra',
    excerpt: 'Vedic healing mantra bestowed by Sage Markandeya to overcome illnesses, fear, and untimely difficulties.',
    moolaMantra: 'ॐ త్ర్యంబకం యజామహే సుగంధిం పుష్టివర్ధనమ్ | ఉర్వారుకమివ బంధనాన్ మృత్యోర్ముక్షీయ మామృతాత్ ||',
    bijaAkshara: 'ॐ హౌం జూం సః | ॐ భూర్భువః స్వః | ॐ త్ర్యంబకం యజామహే...',
    japaCount: '108 Recitations daily with Rudraksha Mala',
    siddhiBenefits: 'Overcomes severe illnesses, nullifies malefic planetary transits, and confers longevity and inner stillness.',
    content: 'Chant facing East or North-East sitting upon a clean woollen or kusha grass asana. Offer sacred bilva leaves or holy water during the japa for maximum spiritual resonance.'
  },
  stotras: {
    title: 'Sri Mahishasura Mardini Stotram (Aigiri Nandini)',
    titleTelugu: 'శ్రీ మహిషాసుర మర్దినీ స్తోత్రం (అయిగిరి నందిని)',
    deity: 'Durga Parashakti Mahishasura Mardini',
    featuredImage: '/images/temple_kashi.jpg',
    tags: 'Adi Shankaracharya, Durga Stotram, Kavacha, Chandi',
    keywords: 'Mahishasura Mardini, Aigiri Nandini, Adi Shankara, 21 Verses',
    excerpt: 'The thunderous, rhythmic 21-verse hymn celebrating the triumphant victory of the Divine Mother over dark forces.',
    authorRishi: 'Jagadguru Sri Adi Shankaracharya',
    versesCount: '21 Verses with Refrain (జయ జయ హే మహిషాసుర మర్దిని)',
    phalaShruti: 'Reciting this stotra dispels fear, eliminates psychic depression, dissolves enemy hindrances, and invokes Motherly grace.',
    content: 'Composed by Adi Shankaracharya in the classical Sanskrit Sardulavikridita meter, this hymn vibrates with immense cosmic energy. Chanted widely during Navaratri and Friday twilight archana.'
  },
  vrathalu: {
    title: 'Sri Varalakshmi Vrata Pooja Vidhi & Samagri Checklist',
    titleTelugu: 'శ్రీ వరలక్ష్మీ వ్రత విధానం & విశేష పూజా ద్రవ్యాలు',
    deity: 'Goddess Mahalakshmi (Varalakshmi)',
    featuredImage: '/images/panchangam_hero.jpg',
    tags: 'Varalakshmi Vratham, Sravana Masam, Fasting Vidhi, Pooja Checklist',
    keywords: 'Varalakshmi Vratham, Pooja Steps, Samagri, Naivedyam Recipe, Vrata Katha',
    excerpt: 'Complete authentic step-by-step guidance for observing the sacred Varalakshmi Vratham on Sravana Shukravaram.',
    fastingType: 'Phalahara Upavasam (Consuming only fruits, milk & satvik offerings until evening harathi)',
    samagriList: 'Kalasham pot, Coconut, Mango leaves, Turmeric, Kumkum, Sandalwood, 9-knot sacred thread (Toram), Nine types of fresh flowers, Panchamritam, Betel leaves & nuts, Camphor.',
    poojaSteps: '1. Ganapathi Pooja\n2. Kalasa Pratishtha with rice base\n3. Toram Pooja (Worship of 9 sacred knots)\n4. Varalakshmi Ashtottara Sata Namavali\n5. Vrata Katha Recitation\n6. Naivedyam & Thambulam offering\n7. Mangala Harathi & Devotee Blessings',
    prasadamRecipe: 'Paramannam (Rice cooked in thick milk with organic jaggery, cardamom, and ghee roasted cashews) & Gaarelu (Medu Vada).',
    content: 'Sri Varalakshmi Vratham is the crown jewel of Sravana month celebrations. When Lord Shiva narrated this vrata katha to Devi Parvati, He revealed that any devotee performing this with unwavering devotion is blessed with Ashta Lakshmis (Health, Wealth, Knowledge, Lineage, Food, Valour, Victory, and Spiritual Splendor).'
  },
  yantras: {
    title: 'Sacred 3D Sri Maha Meru Yantra (Prana Pratishtha & Placement)',
    titleTelugu: 'పవిత్ర త్రిమితీయ శ్రీ మహామేరు యంత్రం - ప్రాణప్రతిష్ఠ & గృహ వాస్తు నియమాలు',
    deity: 'Sri Lalita Tripura Sundari Parashakti',
    featuredImage: '/images/temple_kashi.jpg',
    tags: 'Maha Meru, Sri Chakra, Sacred Geometry, Vastu, Tantra',
    keywords: 'Sri Meru Yantra, 3D Geometry, Copper Gold, Ishanya, Prana Pratishtha',
    excerpt: 'The divine three-dimensional pinnacle of Sri Chakra representing the cosmos and supreme divine abundance.',
    geometryType: '3D Nine Interlocking Triangles forming 43 Triangles atop Multi-Tiered Meru Peak',
    sacredMetal: 'Pure Copper (Tamba) Base with 24K Micro Gold Plating',
    placementDirection: 'Ishanya (North-East corner of the Mandir) with central peak aligned towards East',
    pranaPratishthaVidhi: 'Energized through 1008 repetitions of Sri Suktam and Lalita Trishati Archana with pure Bilva leaves and saffron water.',
    content: 'The Sri Maha Meru represents the entire universe within cosmic micro-geometry. Placing an energized Meru at home or workplace radiates high-frequency sattvic vibrations, dispelling financial blocks, negative vastu doshas, and welcoming sustained harmony.'
  },
  horoscope: {
    title: 'Mesha Rasi (Aries) Daily Vedic Horoscope & Planetary Predictions',
    titleTelugu: 'మేష రాశి నేటి దిన ఫలాలు & గ్రహ సంచార విశేషాలు',
    deity: 'Lord Subrahmanya Swamy & Hanuman',
    featuredImage: '/images/panchangam_hero.jpg',
    tags: 'Horoscope, Mesha Rasi, Aries, Rasi Phalalu, Vedic Astrology',
    keywords: 'Daily Horoscope, Mesha Rasi, Lucky Color, Career Forecast, Astrological Remedy',
    excerpt: 'Detailed Vedic forecast covering career, finance, health, and personalized astrological remedy for Mesha Rasi natives.',
    moonSign: 'Mesha (Aries) - Aswini, Bharani, Krittika 1st Pada',
    rulingPlanet: 'Kuja / Mangala (Mars)',
    luckyColor: 'Bright Crimson Red & Golden Yellow',
    luckyNumber: '9 & 1',
    predictionsCareer: 'Planetary alignments indicate favorable breakthroughs in new business contracts, managerial promotions, and government tenders.',
    predictionsHealth: 'High physical stamina; balance heat in the body with proper hydration and coconut water.',
    predictionsWealth: 'Splendid gains through real estate, ancestral property settlements, and short-term market trading.',
    pariharam: 'Recite Hanuman Chalisa in the morning and offer red flowers to Lord Subrahmanya Swamy on Tuesdays.',
    content: 'With Mars positioned strongly, natives of Mesha Rasi will experience decisive courage and executive authority. Guard against impetuous speech in familial dialogues.'
  },
  muhurtham: {
    title: 'Shubh Grihapravesham (Housewarming) Auspicious Muhurtham Timings',
    titleTelugu: 'శుభ గృహప్రవేశ ఉత్తమ ముహూర్తం & లగ్న శుద్ధి వివరాలు',
    deity: 'Lord Vastu Purusha & Goddess Mahalakshmi',
    featuredImage: '/images/panchangam_hero.jpg',
    tags: 'Muhurtham, Grihapravesham, Auspicious Timings, Vastu',
    keywords: 'Shubh Muhurtham, Grihapravesh, Vrishabha Lagna, Tithi, Rahu Kalam',
    excerpt: 'Vedic astrological chart for entering a new home with positive cosmic alignment, stable Lagna, and prosperity.',
    muhurthamType: 'Apoorva Grihapravesham (Entering newly built home)',
    muhurthamDate: 'Auspicious Date: 2026-11-28 (Saturday)',
    timeWindow: '06:20 AM to 07:45 AM (Vedic Amrit Kalam)',
    auspiciousLagna: 'Vrishabha Lagna (Fixed Ascendant ensuring permanence of wealth & peace)',
    tithiNakshatra: 'Shukla Paksha Panchami, Rohini Nakshatram, Dhruva Mandala',
    inauspiciousAvoid: 'Rahu Kalam: 09:00 AM - 10:30 AM | Yamagandam: 01:30 PM - 03:00 PM | Durmuhurtham avoided',
    content: 'Before stepping into the abode, milk must be boiled until it overflows eastward. First entry should be made by carrying the sacred Kalasham and photo of the family deity with the right foot.'
  },
  remedies: {
    title: 'Kala Sarpa Dosha Nivarana: Authentic Pariharams & Vedic Remedies',
    titleTelugu: 'కాలసర్ప దోష నివారణ - ఉపాయాలు, పూజలు & పరిహార క్షేత్రాలు',
    deity: 'Lord Shiva (Kalahasteeswara) & Nagadevata',
    featuredImage: '/images/temple_kashi.jpg',
    tags: 'Kala Sarpa Dosha, Remedies, Rahu Ketu, Pariharam, Srikalahasti',
    keywords: 'Kala Sarpa, Dosha Nivarana, Pariharam, Naga Pooja, Srikalahasti',
    excerpt: 'Step-by-step remedial guide to alleviate the astrological obstruction caused by all planets trapped between Rahu and Ketu.',
    doshaType: 'Kala Sarpa Dosha (Ananta, Kulika, Vasuki, Shankhapala, Padma)',
    doshaSymptoms: 'Obstacles in career progression, recurring nightmares of serpents, delays in progeny and marital alliances, fluctuating finances.',
    stepByStepRemedy: '1. Perform Rahu-Ketu Sarpa Dosha Nivarana Pooja at Srikalahasti Temple.\n2. Chant Maha Mrityunjaya Mantra 108 times daily.\n3. Feed black cows and offer sesame oil lamp to Lord Shiva on Saturdays.\n4. Avoid harming serpents or breaking ant-hills.',
    fastingDay: 'Nagula Chavithi & Amavasya Saturdays',
    recommendedTemple: 'Sri Kalahasteeswara Temple (Andhra Pradesh) or Tirunageswaram Naganathar Temple (Tamil Nadu)',
    content: 'Astrologically, when planets are hemmed within Rahu and Ketu, their full auspicious radiation is dimmed. By offering sincere pariharam to Lord Shiva, who holds the serpent king Vasuki as his ornament, all malefic planetary effects dissolve into divine blessings.'
  },
  bhajans: {
    title: 'Paluke Bangaramayena - Saint Bhadrachala Ramadasu Kirtana',
    titleTelugu: 'పలుకే బంగారమాయెనా - భద్రాచల రామదాసు దివ్య కీర్తన',
    deity: 'Lord Sri Rama (Bhadrachala Ramachandra Murthy)',
    featuredImage: '/images/temple_kashi.jpg',
    tags: 'Bhadrachala Ramadasu, Carnatic Kirtana, Bhakti Sangeetam, Sri Rama',
    keywords: 'Paluke Bangaramayena, Ananda Bhairavi, Ramadasu, Telugu Lyrics, Meaning',
    excerpt: 'Impassioned devotional plea composed by Kancherla Gopanna (Ramadasu) yearning for the nectarine words of Sri Rama.',
    composer: 'Bhakta Ramadasu (Kancherla Gopanna)',
    ragaTala: 'Ragam: Ananda Bhairavi | Talam: Adi Talam',
    bhajanLyricsTelugu: 'పల్లవి:\nపలుకే బంగారమాయెనా కోదండపాణి || పలుకే ||\n\nఅనుపల్లవి:\nపలుకే బంగారమాయె పిలిచిన పలుకవేమి?\nకలలోన నీ నామస్మరణ మరువను చరణము ||\n\nచరణం:\nఎంత వేడినను నీకు దయరాదు\nసుంతైన భావము తెలియదు నాథుడవని నమ్మిన నను బ్రోవరావదేమి శ్రీరామ ||',
    audioUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: 'Imprisoned inside the Golconda fortress for constructing the Bhadrachalam temple, Ramadasu sang this heart-wrenching composition. Deep emotional surrender (Prapatti) flows through each syllable.'
  },
  spirituality: {
    title: 'Aham Brahmasmi: The Vedantic Realization of Non-Dual Consciousness',
    titleTelugu: 'అహం బ్రహ్మాస్మి - అద్వైత వేదాంత ఆత్మజ్ఞాన దర్శనం',
    deity: 'Universal Supreme Self (Nirguna Brahman)',
    featuredImage: '/images/panchangam_hero.jpg',
    tags: 'Advaita, Vedanta, Upanishads, Adi Shankara, Self Realization',
    keywords: 'Aham Brahmasmi, Brihadaranyaka Upanishad, Non-Duality, Sadhana',
    excerpt: 'The profound Mahavakya from Brihadaranyaka Upanishad unveiling the eternal unity of the individual soul with the Absolute.',
    philosophicalTheme: 'Advaita Vedanta (Non-Duality & Pure Awareness)',
    sanskritSutra: 'अहं ब्रह्मास्मि (Aham Brahmasmi - Brihadaranyaka Upanishad 1.4.10)',
    dailySadhanaGuidance: 'Begin each morning by sitting in quiet stillness for 15 minutes. Inwardly observe the breath and the fleeting thoughts without judgment, anchoring consciousness in the silent observer behind every thought.',
    content: 'Aham Brahmasmi does not express egoic vanity; rather, it represents the complete dissolution of the finite ego into the infinite universal intelligence. When the illusion of separateness is dismantled through self-inquiry (Vichara), unbounded peace and compassion naturally emerge.'
  },
  epaper: {
    title: 'Astadasapeetam Maha Shivaratri Vishesha Devotional E-Paper Edition',
    titleTelugu: 'అష్టాదశపీఠం మహా శివరాత్రి విశేష ఆధ్యాత్మిక ఈ-పేపర్ సంచిక',
    deity: 'Lord Shiva & Maha Shakti',
    featuredImage: '/images/temple_kashi.jpg',
    tags: 'E-Paper, Devotional News, Maha Shivaratri, Temple Epistles',
    keywords: 'Devotional E-Paper, PDF Edition, Jyotirlinga, Special Issue',
    excerpt: 'Full daily digital newspaper edition featuring sacred temple updates, rare historical slokas, festival tithi schedules, and astrological panchangam.',
    editionDate: 'Today Daily Edition (Morning Release)',
    editionRegion: 'All-India & Global Devotee Circuit (Bilingual Telugu & English)',
    leadHeadline: 'Grand Celebrations of Maha Shivaratri at 12 Jyotirlinga Sanctuaries with 24-Hour Live Akhanda Darshan',
    pdfDownloadUrl: 'https://astadasapeetam.org/epaper/latest-edition.pdf',
    content: 'Welcome to today\'s edition of Astadasapeetam Divine E-Paper. Highlights include comprehensive Darshan timings for Kashi Vishwanath, Srisailam, Mahakaleshwar, and detailed Panchangam for devotees across all timezones.'
  },
  festivals: {
    title: 'Maha Shivaratri Celebrations: Fasting Rules, 4 Yama Pujas & Temple Timings',
    titleTelugu: 'మహా శివరాత్రి పర్వదిన విశేషాలు - జాగరణ నియమాలు & 4 యామ పూజలు',
    deity: 'Parama Shiva (Lingodbhava Murthy)',
    featuredImage: '/images/temple_kashi.jpg',
    tags: 'Maha Shivaratri, Lingodbhavam, Fasting, Bilva Archana',
    keywords: 'Maha Shivaratri, Fasting Rules, 4 Yama Pooja, Lingodbhava, Rudrabhishekam',
    excerpt: 'Auspicious guide to the holiest night dedicated to Lord Shiva, detailing strict fasting guidelines, hourly pujas, and spiritual merit.',
    festivalDate: 'March 8, 2026 (Phalguna Krishna Chaturdashi)',
    hinduMonthTithi: 'Phalguna Krishna Chaturdashi (Lingodbhava Kalam at Midnight)',
    fastingRules: 'Devotees observe complete fasting (Nirjala) or satvik fruit diet throughout the day and observe unbroken night vigil (Akhanda Jagaran) chanting Om Namah Shivaya.',
    celebrationVidhi: 'The four yamas of the night are celebrated with distinct abhishekam: 1st Yama with Milk, 2nd Yama with Curd, 3rd Yama with Ghee, and 4th Yama with Honey & Sugarcane juice.',
    content: 'Maha Shivaratri celebrates the cosmic dance (Tandava) of Shiva and the sacred midnight moment when Lord Shiva appeared as an endless pillar of light (Lingodbhavam). Even unintentional worship on this night bestows the ultimate fruit of liberation.'
  },
  videos: {
    title: 'Divine Pravachanam: Secrets of 18 Maha Shakti Peethas Explained',
    titleTelugu: 'దివ్య ప్రవచనం: అష్టాదశ మహాశక్తి పీఠాల పరమ రహస్యాలు',
    deity: 'Universal Divine Mother Parashakti',
    featuredImage: '/images/temple_kashi.jpg',
    tags: 'Pravachanam, Devotional Video, Shakti Peethas, Pravachana Kartha',
    keywords: 'Pravachanam Video, 18 Shakti Peethas, Swamiji Speech, Temple Darshan',
    excerpt: 'Enlightening video discourses by revered Vedic scholars exploring the geographical, tantric, and philosophical secrets of the 18 Shakti Peethas.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoDuration: '48 Minutes (High Definition)',
    speakerName: 'Brahmasri Dr. Vamshi Krishna Ghanapathi & Pujya Swamiji',
    content: 'Watch this sacred discourse elucidating Adi Shankaracharya\'s composition of the Ashta Dasha Shakti Peetha Stotram and how each bodily relic of Sati Devi channels cosmic feminine energy to protect the universe.'
  },
  gods: {
    title: 'Sri Maha Vishnu & The Cosmic Dashavatara Philosophy',
    titleTelugu: 'శ్రీ మహా విష్ణువు & జగద్రక్షణ దశావతార తత్వ దర్శనం',
    deity: 'Lord Sri Maha Vishnu (Ksheerabdhi Shayana)',
    featuredImage: '/images/panchangam_hero.jpg',
    tags: 'Maha Vishnu, Dashavatara, Gods and Avatars, Vaishnavism',
    keywords: 'Sri Maha Vishnu, Dashavatara, Garuda, Sudarshana Chakra, Sheshanaga',
    excerpt: 'Exploring the supreme preserving deity of the Hindu trinity and the evolutionary symbolism behind each divine descent (Avatar).',
    avatarForm: 'Dashavatara (Matsya, Kurma, Varaha, Narasimha, Vamana, Parashurama, Rama, Krishna, Buddha, Kalki)',
    consortParivara: 'Goddess Mahalakshmi, Sheshanaga (Adishesha), Garuda, Sage Narada',
    vahana: 'Sri Garuda Bhagavan (Lord of the Skies)',
    sacredWeaponsSymbols: 'Panchajanya Shankha (Conch), Sudarshana Chakra (Discus), Kaumodaki Gada (Mace), Padma (Lotus)',
    content: 'Lord Vishnu preserves cosmic order (Dharma). Whenever righteousness declines and chaos threatens cosmic balance, He manifests in tailored forms across space and time to protect the devout and re-establish truth.'
  },
  yatralu: {
    title: 'All-India 18 Maha Shakti Peetha Parikrama & Pilgrimage Circuit',
    titleTelugu: 'అఖిల భారత అష్టాదశ మహాశక్తి పీఠ దివ్య పరిక్రమ తీర్థయాత్ర మార్గం',
    deity: 'All 18 Shakti Manifestations',
    featuredImage: '/images/temple_kashi.jpg',
    tags: 'Pilgrimage, Yatra, 18 Shakti Peethas, Tour Itinerary',
    keywords: '18 Shakti Peethas Yatra, Darshan Circuit, Travel Itinerary, Pilgrimage Guide',
    excerpt: 'Detailed 14-day sacred travel circuit spanning Sri Lanka, Kashmir, Varanasi, Kamakhya, and Srisailam for devoted pilgrims.',
    circuitName: 'All-India 18 Maha Shakti Peetha Darshan Circuit',
    yatraDuration: '14 Days & 13 Nights',
    itineraryDays: 'Day 1-2: Varanasi (Vishalakshi) & Gaya (Mangala Gauri)\nDay 3-4: Kamakhya (Assam) & Kalighat (Kolkata)\nDay 5-6: Jajpur (Biraja) & Pithapuram (Puruhutika)\nDay 7-8: Srisailam (Bhramaramba) & Alampur (Jogulamba)\nDay 9-10: Draksharamam (Manikyamba) & Kolhapur (Mahalakshmi)\nDay 11-12: Ujjain (Mahakali) & Gujarat (Ambaji)\nDay 13-14: Shringeri (Sharada) & Kanchipuram (Kamakshi)',
    bestTimeToVisit: 'October through March (Favorable climate for temple circumambulation and high spiritual vibrancy during Navaratri)',
    content: 'Undertaking the 18 Shakti Peetha pilgrimage confers boundless spiritual merit. Devotees are encouraged to maintain pure satvik diet, chant the sacred Kavacham daily throughout the tour, and participate in the morning Mangala Aartis.'
  },
  panchangam: {
    title: 'Daily Vedic Panchangam: Tithi, Nakshatra, Yoga, Karana & Shubh Horas',
    titleTelugu: 'నేటి దివ్య పంచాంగం - తిథి, నక్షత్రం, యోగం, కరణం & శుభ ముహూర్త కాలాలు',
    deity: 'Surya Bhagavan & Navagrahas',
    featuredImage: '/images/panchangam_hero.jpg',
    tags: 'Daily Panchangam, Tithi, Nakshatra, Rahu Kalam, Vedic Calendar',
    keywords: 'Panchangam, Tithi, Nakshatram, Shubh Muhurtham, Rahu Kalam, Yamagandam',
    excerpt: 'Complete Vedic almanac calculated according to Sri Surya Siddhanta for spiritual rituals and auspicious start of daily endeavors.',
    panchangamTithi: 'Shukla Paksha Ekadashi (Until 04:15 PM)',
    panchangamNakshatra: 'Rohini Nakshatram (Until 08:30 PM)',
    panchangamYogaKarana: 'Sadhya Yogam | Bava Karanam',
    panchangamTimings: 'Sunrise: 06:12 AM | Sunset: 06:18 PM | Moonrise: 03:45 PM',
    panchangamKalam: 'Rahu Kalam: 04:30 PM - 06:00 PM | Yamagandam: 12:00 PM - 01:30 PM | Amrita Kalam: 08:45 AM - 10:15 AM',
    content: 'Ekadashi fasting observed today cleanses the nervous system and deepens spiritual awareness. Avoid undertaking major monetary contracts during Rahu Kalam hours.'
  }
};

export const DEFAULT_POST_DATA = {
  title: '',
  titleTelugu: '',
  slug: '',
  category: 'temples',
  deity: 'Universal Mother Parashakti',
  featuredImage: '/images/temple_kashi.jpg',
  excerpt: '',
  content: '',
  tags: 'Shakti Peethas, Vedic Culture, Temples',
  keywords: 'Astadasapeetam, Shakti Peetha, Panchangam',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: 'Astadasapeetam, Shakti Peethas, Vedic Culture, Daily Panchangam, Devotional Guide',
  imageMeta: null,
  status: 'published',
  templeLocation: 'Srisailam, Andhra Pradesh',
  darshanTimings: '5:00 AM - 9:30 PM',
  nearestTransport: 'Markapur Road (85 km) / Hyderabad Airport (200 km)',
  specialSevas: 'Garba Gruha Sparsha Darshanam, Rudrabhishekam',
  devanagariVerse: '',
  slokaTelugu: '',
  slokaPhonetics: '',
  slokaMeaning: '',
  chantingTime: 'Brahma Muhurtham (4:30 AM - 6:00 AM)',
  moolaMantra: '',
  bijaAkshara: '',
  japaCount: '108',
  siddhiBenefits: 'Removes obstacles, brings cosmic peace',
  authorRishi: 'Adi Shankaracharya',
  versesCount: '8',
  phalaShruti: 'Grants supreme protection and spiritual peace',
  fastingType: 'Phalahara Upavasam (Fruits & Milk)',
  samagriList: 'Kalasham pot, Mango leaves, Turmeric, Kumkum, Coconut, Flowers',
  poojaSteps: '1. Ganapathi Pooja\n2. Kalasa Sthapana\n3. Sankalpam\n4. Ashtottara Archana',
  prasadamRecipe: 'Paramannam (Sweet Ksheerannam) & Pulihora',
  geometryType: '3D Sri Maha Meru Pyramid',
  sacredMetal: 'Pure Copper (Tamba) with 24K Gold polish',
  placementDirection: 'Ishanya (North-East direction) facing East',
  pranaPratishthaVidhi: 'Energized with 1008 Lalita Sahasranama & Sri Suktam',
  moonSign: 'Mesha (Aries)',
  rulingPlanet: 'Kuja (Mars)',
  luckyColor: 'Coral Red & Golden Yellow',
  luckyNumber: '9 & 1',
  predictionsCareer: 'Breakthroughs in leadership initiatives and professional respect.',
  pariharam: 'Recite Hanuman Chalisa and donate on Tuesday.',
  muhurthamType: 'Grihapravesham (Housewarming)',
  muhurthamDate: '2026-11-28',
  timeWindow: '06:15 AM - 07:45 AM',
  auspiciousLagna: 'Vrishabha Lagna (Fixed Ascendant)',
  tithiNakshatra: 'Shukla Paksha Panchami, Rohini Nakshatram',
  inauspiciousAvoid: 'Rahu Kalam: 04:30 PM - 06:00 PM',
  doshaType: 'Kala Sarpa Dosha / Kuja Dosha',
  doshaSymptoms: 'Delayed endeavors, restlessness, marital disputes',
  stepByStepRemedy: 'Perform Rahu-Ketu Parihara Pooja at Srikalahasti Temple',
  recommendedTemple: 'Srikalahasti Temple / Tirunageswaram',
  composer: 'Sri Tyagaraja Swami / Annamacharya',
  ragaTala: 'Ananda Bhairavi / Adi Talam',
  bhajanLyricsTelugu: '',
  audioUrl: '',
  philosophicalTheme: 'Advaita Vedanta & Non-Duality',
  sanskritSutra: 'Aham Brahmasmi (అహం బ్రహ్మాస్మి)',
  dailySadhanaGuidance: 'Dedicate 15 minutes to conscious breathing & silent witnessing.',
  editionDate: 'Today Daily Edition',
  editionRegion: 'All-India & Global Devotee Circuit',
  leadHeadline: 'Grand Celebrations of Maha Shivaratri at 12 Jyotirlinga Sanctuaries',
  pdfDownloadUrl: 'https://astadasapeetam.org/epaper/latest-edition.pdf',
  festivalDate: 'March 8, 2026',
  hinduMonthTithi: 'Phalguna Krishna Chaturdashi',
  fastingRules: 'Strict Jagaran fasting through four Yamas of the night',
  celebrationVidhi: 'Maha Rudrabhishekam with Bilva leaves, milk & honey',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  videoDuration: '45 mins',
  speakerName: 'Pujya Sri Swamiji / Vedic Scholar',
  avatarForm: 'Mahalaxmi / Sri Maha Vishnu / Parama Shiva',
  consortParivara: 'Lord Vishnu / Goddess Parvati',
  vahana: 'Garuda / Nandi / Simha',
  sacredWeaponsSymbols: 'Shankha, Chakra, Trishula, Lotus',
  circuitName: '18 Maha Shakti Peetha Darshan Circuit',
  yatraDuration: '14 Days / 13 Nights',
  itineraryDays: 'Day 1: Kashi & Sarnath\nDay 2: Kamakhya\nDay 3: Kalighat\nDay 4: Srisailam',
  bestTimeToVisit: 'October through March',
  panchangamTithi: 'Shukla Paksha Ekadashi',
  panchangamNakshatra: 'Rohini Nakshatram',
  panchangamYogaKarana: 'Sadhya Yogam | Bava Karanam',
  panchangamTimings: 'Sunrise: 06:12 AM | Sunset: 06:18 PM',
  panchangamKalam: 'Rahu Kalam: 04:30 PM - 06:00 PM'
};

export default function DynamicPostStudio({
  newPost,
  setNewPost,
  onPublish,
  loading = false,
  showToast
}) {
  const [previewMode, setPreviewMode] = useState(true);

  const fillCategorySample = (catId) => {
    const targetCat = catId || newPost.category;
    const targetCatObj = DEVOTIONAL_CATEGORIES.find(c => c.id === targetCat);
    const template = CATEGORY_SAMPLE_TEMPLATES[targetCat];
    if (template) {
      setNewPost(prev => ({
        ...prev,
        ...template,
        category: targetCat,
        featuredImage: targetCatObj?.needsImage ? (template.featuredImage || '') : '',
        imageMeta: null,
        slug: template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }));
      if (showToast) {
        showToast('success', `✨ Loaded authentic sample for ${targetCat.toUpperCase()}!`);
      }
    }
  };

  const handleCategoryChange = (newCat) => {
    const catObj = DEVOTIONAL_CATEGORIES.find(c => c.id === newCat);
    setNewPost(prev => ({
      ...prev,
      category: newCat,
      featuredImage: catObj?.needsImage ? prev.featuredImage : '',
      imageMeta: catObj?.needsImage ? prev.imageMeta : null
    }));
  };

  const activeCategoryObj = DEVOTIONAL_CATEGORIES.find(c => c.id === newPost.category) || DEVOTIONAL_CATEGORIES[0];

  return (
    <div className="space-y-6">
      {/* Studio Header & 17-Category Visual Ribbon */}
      <div className="bg-gradient-to-r from-[#180A24] via-[#240A34] to-[#180A24] rounded-3xl p-6 sm:p-8 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-3">
              <span>✨ Super Admin Devotional Studio</span>
              <span>•</span>
              <span className="font-mono">{activeCategoryObj.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-100 flex items-center space-x-2.5">
              <span>{activeCategoryObj.icon}</span>
              <span>Compose Sacred Post: {activeCategoryObj.label}</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Form adapts dynamically per category. Select any sacred category below to switch inputs, add Sanskrit/Telugu scriptures, and inspect the real-time live preview.
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => fillCategorySample(newPost.category)}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-xs"
              title="Auto-fill with authentic sacred template"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>✨ Quick Fill Sample</span>
            </button>

            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 border border-stone-600/50 text-stone-200 text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer"
            >
              {previewMode ? <EyeOff className="w-3.5 h-3.5 text-stone-400" /> : <Eye className="w-3.5 h-3.5 text-amber-400" />}
              <span>{previewMode ? 'Hide Live Preview' : 'Show Live Preview'}</span>
            </button>

            <button
              type="button"
              onClick={() => setNewPost(DEFAULT_POST_DATA)}
              className="px-3.5 py-2 rounded-xl bg-stone-900/60 hover:bg-rose-950/60 border border-stone-700 hover:border-rose-600/40 text-stone-300 hover:text-rose-200 text-xs font-semibold transition cursor-pointer"
              title="Reset all fields"
            >
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* 17-Category Visual Ribbon Selector */}
        <div className="mt-6 pt-5 border-t border-amber-500/20">
          <div className="text-[11px] font-bold text-amber-300/80 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>Select Devotional Category (Form Changes Dynamically):</span>
            <span className="text-[10px] text-stone-400">17 Categories Available</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 max-h-52 overflow-y-auto pr-1">
            {DEVOTIONAL_CATEGORIES.map((cat) => {
              const isSelected = newPost.category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`p-2.5 rounded-2xl text-left transition flex flex-col justify-between border cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-400/25 to-amber-600/30 border-amber-400 text-amber-100 shadow-md ring-2 ring-amber-400/40'
                      : 'bg-stone-900/60 hover:bg-stone-800/80 border-stone-800 text-stone-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{cat.icon}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-800 text-stone-400 group-hover:text-stone-300'
                    }`}>
                      {cat.badge}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="font-bold text-[11px] leading-tight line-clamp-1">{cat.label}</div>
                    <div className="text-[10px] text-amber-300/70 font-serif leading-none mt-0.5">{cat.telugu}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Studio Desk: Form & Real-time Live Sanctuary Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Form */}
        <div className={previewMode ? "lg:col-span-7 space-y-6" : "lg:col-span-12 space-y-6"}>
          <form onSubmit={onPublish} className="space-y-6">
            {/* SECTION 1: CORE SACRED METADATA */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                    1. Core Devotional Metadata
                  </h3>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">Bilingual Title &amp; Deity</span>
              </div>

              {/* Bilingual Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-stone-700 text-xs">Title (English) *</label>
                    <span className="text-[10px] text-stone-400">Primary Headline</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srisailam Bhramaramba Devi Temple Puranam"
                    value={newPost.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setNewPost(prev => ({
                        ...prev,
                        title: val,
                        slug: (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) ? autoSlug : prev.slug,
                        metaTitle: (!prev.metaTitle || prev.metaTitle === prev.title) ? val : prev.metaTitle
                      }));
                    }}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1 text-xs">Title in Telugu (శీర్షిక)</label>
                  <input
                    type="text"
                    placeholder="శ్రీశైల భ్రమరాంబికా దేవి క్షేత్ర వైశిష్ట్యం"
                    value={newPost.titleTelugu}
                    onChange={(e) => setNewPost({ ...newPost, titleTelugu: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-600 font-serif"
                  />
                </div>
              </div>

              {/* Permanent Devotional URL Slug & Category Continuation */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-stone-800 text-xs flex items-center space-x-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-600" />
                    <span>Permanent Devotional URL Slug (వర్గం శాశ్వత లంకె) *</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const gen = newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'sacred-article';
                      setNewPost(prev => ({ ...prev, slug: gen }));
                    }}
                    className="text-[10px] text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer"
                  >
                    Regenerate from Title
                  </button>
                </div>

                <div className="flex items-center rounded-xl border border-stone-300 bg-white overflow-hidden shadow-2xs focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-500">
                  <span className="px-3 py-2 text-xs font-mono text-stone-600 bg-stone-100 border-r border-stone-200 shrink-0 font-bold flex items-center space-x-1">
                    <span>https://astadasapeetam.org/</span>
                    <span className="text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded text-[11px]">{newPost.category}</span>
                    <span>/</span>
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. sri-krishna-avataram or srisailam-bhramaramba"
                    value={newPost.slug || ''}
                    onChange={(e) => setNewPost({ ...newPost, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '') })}
                    className="w-full p-2.5 text-xs font-mono font-bold text-stone-800 bg-transparent focus:outline-none"
                  />
                </div>

                <div className="text-[11px] text-stone-500 flex items-center space-x-1 font-mono">
                  <span>Canonical URL:</span>
                  <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                    https://astadasapeetam.org/{newPost.category}/{newPost.slug || '(avatar-or-post-slug)'}
                  </span>
                </div>
              </div>

              {/* Category & Presiding Deity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 block mb-1 text-xs">Selected Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-600 bg-stone-50 font-semibold"
                  >
                    {DEVOTIONAL_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.label} ({c.telugu})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1 text-xs">Presiding Deity / Divine Form</label>
                  <input
                    type="text"
                    placeholder="e.g. Universal Mother Parashakti / Sri Shiva"
                    value={newPost.deity}
                    onChange={(e) => setNewPost({ ...newPost, deity: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>



              {/* Excerpt / Summary */}
              <div>
                <label className="font-bold text-stone-700 block mb-1 text-xs">Short Excerpt / Devotional Summary</label>
                <input
                  type="text"
                  placeholder="Brief 1-2 line summary that appears on cards and search results..."
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            {/* IMAGE ATTACHMENT STUDIO (CONDITIONAL PER CATEGORY) */}
            {activeCategoryObj.needsImage ? (
              <ImageOptimizationStudio
                featuredImage={newPost.featuredImage}
                onImageChange={(optimizedDataUrl, meta) => {
                  setNewPost(prev => ({
                    ...prev,
                    featuredImage: optimizedDataUrl,
                    imageMeta: meta
                  }));
                }}
                showToast={showToast}
              />
            ) : (
              /* No Image Opportunity for Text / Data Categories */
              <div className="bg-amber-50/70 border border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-xs flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shrink-0 border border-amber-300 shadow-inner">
                  {activeCategoryObj.icon}
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-xs text-stone-900 uppercase tracking-wider">
                      Text &amp; Scriptural Artifact: No Image Attachment Required
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-amber-200/90 text-amber-950 px-2 py-0.5 rounded-full border border-amber-300">
                      🔒 No Image Needed for {activeCategoryObj.badge}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Posts under <strong>{activeCategoryObj.label} ({activeCategoryObj.telugu})</strong> are rendered using authentic sacred typography, Devanagari Sanskrit verses, Telugu scriptures, and structured Vedic almanac tables. Image attachment is intentionally disabled for this category to ensure 100% lightweight performance and flawless readability.
                  </p>
                </div>
              </div>
            )}

            {/* SECTION 2: DYNAMIC CATEGORY-SPECIFIC FORM FIELDS */}
            <div className="bg-amber-50/50 rounded-3xl border border-amber-300/80 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{activeCategoryObj.icon}</span>
                  <div>
                    <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                      2. Dynamic Fields: {activeCategoryObj.label}
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      {activeCategoryObj.desc}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fillCategorySample(newPost.category)}
                  className="text-[11px] text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
                >
                  Fill Sample Template
                </button>
              </div>

              {/* 1. Temples */}
              {newPost.category === 'temples' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Temple Location &amp; Kshetra (క్షేత్ర ప్రాంతం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Srisailam, Nandyal District, Andhra Pradesh"
                        value={newPost.templeLocation || ''}
                        onChange={(e) => setNewPost({ ...newPost, templeLocation: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Darshan &amp; Seva Timings (దర్శన వేళలు)</label>
                      <input
                        type="text"
                        placeholder="e.g. 5:00 AM - 1:00 PM & 6:00 PM - 9:30 PM"
                        value={newPost.darshanTimings || ''}
                        onChange={(e) => setNewPost({ ...newPost, darshanTimings: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Nearest Transport (రైల్వే / విమానాశ్రయం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Markapur Road (85 km) / Hyderabad Airport (200 km)"
                        value={newPost.nearestTransport || ''}
                        onChange={(e) => setNewPost({ ...newPost, nearestTransport: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Special Sevas &amp; Pooja Offerings</label>
                      <input
                        type="text"
                        placeholder="e.g. Sparsha Darshanam, Rudrabhishekam, Chandi Homam"
                        value={newPost.specialSevas || ''}
                        onChange={(e) => setNewPost({ ...newPost, specialSevas: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Slokas */}
              {newPost.category === 'slokas' && (
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Sanskrit Sloka (దేవనాగరి సంస్కృత శ్లోకం)</label>
                    <textarea
                      rows={2}
                      placeholder="ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि..."
                      value={newPost.devanagariVerse || ''}
                      onChange={(e) => setNewPost({ ...newPost, devanagariVerse: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-serif"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Telugu Script (తెలుగు శ్లోకం)</label>
                      <textarea
                        rows={2}
                        placeholder="ఓం భూర్భువస్సువః | తత్సవితుర్వరేణ్యం..."
                        value={newPost.slokaTelugu || ''}
                        onChange={(e) => setNewPost({ ...newPost, slokaTelugu: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-serif"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">English Phonetics / Transliteration</label>
                      <textarea
                        rows={2}
                        placeholder="Om Bhur Bhuvah Svah | Tat-Savitur Varenyam..."
                        value={newPost.slokaPhonetics || ''}
                        onChange={(e) => setNewPost({ ...newPost, slokaPhonetics: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Detailed Meaning / Bhava (శ్లోక భావం)</label>
                      <input
                        type="text"
                        placeholder="Deep spiritual purport and word-by-word meaning..."
                        value={newPost.slokaMeaning || ''}
                        onChange={(e) => setNewPost({ ...newPost, slokaMeaning: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Auspicious Chanting Time (పఠన వేళ)</label>
                      <input
                        type="text"
                        placeholder="e.g. Brahma Muhurtham (4:30 AM - 6:00 AM)"
                        value={newPost.chantingTime || ''}
                        onChange={(e) => setNewPost({ ...newPost, chantingTime: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Mantras */}
              {newPost.category === 'mantras' && (
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Moola Mantra (మూల మంత్రం)</label>
                    <input
                      type="text"
                      placeholder="e.g. ॐ త్ర్యంబకం యజామహే సుగంధిం పుష్టివర్ధనమ్..."
                      value={newPost.moolaMantra || ''}
                      onChange={(e) => setNewPost({ ...newPost, moolaMantra: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-serif"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Bija Akshara (బీజాక్షరాలు)</label>
                      <input
                        type="text"
                        placeholder="e.g. ॐ హౌం జూం సః"
                        value={newPost.bijaAkshara || ''}
                        onChange={(e) => setNewPost({ ...newPost, bijaAkshara: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-serif"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Japa Sankhya (జప సంఖ్య)</label>
                      <input
                        type="text"
                        placeholder="e.g. 108 or 1008 Recitations with Rudraksha"
                        value={newPost.japaCount || ''}
                        onChange={(e) => setNewPost({ ...newPost, japaCount: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Siddhi Benefits (మంత్ర సిద్ధి ఫలం)</label>
                      <input
                        type="text"
                        placeholder="Longevity, peace, obstacle removal..."
                        value={newPost.siddhiBenefits || ''}
                        onChange={(e) => setNewPost({ ...newPost, siddhiBenefits: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Stotras */}
              {newPost.category === 'stotras' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Sage / Rishi / Author (రచయిత / ఋషి)</label>
                      <input
                        type="text"
                        placeholder="e.g. Jagadguru Sri Adi Shankaracharya / Agastya Maharshi"
                        value={newPost.authorRishi || ''}
                        onChange={(e) => setNewPost({ ...newPost, authorRishi: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Total Verses Count (శ్లోకాల సంఖ్య)</label>
                      <input
                        type="text"
                        placeholder="e.g. 8 Verses (Ashtakam) / 108 Slokas"
                        value={newPost.versesCount || ''}
                        onChange={(e) => setNewPost({ ...newPost, versesCount: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Phala Shruti (ఫల శ్రుతి - Fruits of Recital)</label>
                    <input
                      type="text"
                      placeholder="Reciting this confers fearlessness, health, and liberation..."
                      value={newPost.phalaShruti || ''}
                      onChange={(e) => setNewPost({ ...newPost, phalaShruti: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* 5. Vrathalu */}
              {newPost.category === 'vrathalu' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Fasting Niyama (ఉపవాస నియమాలు)</label>
                      <input
                        type="text"
                        placeholder="e.g. Phalahara Upavasam (Fruits & Satvik milk)"
                        value={newPost.fastingType || ''}
                        onChange={(e) => setNewPost({ ...newPost, fastingType: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Naivedyam / Prasadam Recipe (నైవేద్యం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Paramannam (Sweet Ksheerannam) & Pulihora"
                        value={newPost.prasadamRecipe || ''}
                        onChange={(e) => setNewPost({ ...newPost, prasadamRecipe: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Pooja Samagri Checklist (పవిత్ర పూజా సామాగ్రి)</label>
                    <textarea
                      rows={2}
                      placeholder="Kalasham, Mango leaves, Turmeric, Kumkum, 9-knot thread, Coconut, Flowers..."
                      value={newPost.samagriList || ''}
                      onChange={(e) => setNewPost({ ...newPost, samagriList: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Step-by-Step Pooja Vidhi (పూజా విధానం)</label>
                    <textarea
                      rows={2}
                      placeholder="1. Ganapathi Pooja -> 2. Kalasa Sthapana -> 3. Vrata Katha..."
                      value={newPost.poojaSteps || ''}
                      onChange={(e) => setNewPost({ ...newPost, poojaSteps: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* 6. Yantras */}
              {newPost.category === 'yantras' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Sacred Geometry (యంత్ర ఆకారం)</label>
                      <input
                        type="text"
                        placeholder="e.g. 3D Sri Maha Meru Pyramid / Kubera Yantra"
                        value={newPost.geometryType || ''}
                        onChange={(e) => setNewPost({ ...newPost, geometryType: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Sacred Metal (లోహం)</label>
                      <input
                        type="text"
                        placeholder="Pure Copper (Tamba) with 24K Gold polish"
                        value={newPost.sacredMetal || ''}
                        onChange={(e) => setNewPost({ ...newPost, sacredMetal: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Placement Direction (స్థాపన దిశ)</label>
                      <input
                        type="text"
                        placeholder="e.g. Ishanya (North-East) facing East"
                        value={newPost.placementDirection || ''}
                        onChange={(e) => setNewPost({ ...newPost, placementDirection: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Prana Pratishtha Vidhi (ప్రాణప్రతిష్ఠ &amp; సాధన)</label>
                    <input
                      type="text"
                      placeholder="Energized with 1008 Lalita Sahasranama & Sri Suktam homam..."
                      value={newPost.pranaPratishthaVidhi || ''}
                      onChange={(e) => setNewPost({ ...newPost, pranaPratishthaVidhi: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* 7. Horoscope */}
              {newPost.category === 'horoscope' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Moon Sign / Rasi (రాశి)</label>
                      <input
                        type="text"
                        placeholder="e.g. Mesha (Aries)"
                        value={newPost.moonSign || ''}
                        onChange={(e) => setNewPost({ ...newPost, moonSign: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Ruling Planet (అధిపతి)</label>
                      <input
                        type="text"
                        placeholder="e.g. Kuja / Mars"
                        value={newPost.rulingPlanet || ''}
                        onChange={(e) => setNewPost({ ...newPost, rulingPlanet: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Lucky Color (అదృష్ట రంగు)</label>
                      <input
                        type="text"
                        placeholder="e.g. Coral Red & Golden Yellow"
                        value={newPost.luckyColor || ''}
                        onChange={(e) => setNewPost({ ...newPost, luckyColor: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Lucky Number (అదృష్ట సంఖ్య)</label>
                      <input
                        type="text"
                        placeholder="e.g. 9 & 1"
                        value={newPost.luckyNumber || ''}
                        onChange={(e) => setNewPost({ ...newPost, luckyNumber: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Career &amp; Wealth Forecast (ఉద్యోగం &amp; ఆర్థికం)</label>
                      <input
                        type="text"
                        placeholder="Breakthroughs in business, financial growth..."
                        value={newPost.predictionsCareer || ''}
                        onChange={(e) => setNewPost({ ...newPost, predictionsCareer: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Astrological Remedy (శాంతి పరిహారం)</label>
                      <input
                        type="text"
                        placeholder="Chant Hanuman Chalisa, donate on Tuesday..."
                        value={newPost.pariharam || ''}
                        onChange={(e) => setNewPost({ ...newPost, pariharam: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 8. Muhurtham */}
              {newPost.category === 'muhurtham' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Ceremony / Occasion (కార్యక్రమం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Grihapravesham / Vivaha / Vahana Pooja"
                        value={newPost.muhurthamType || ''}
                        onChange={(e) => setNewPost({ ...newPost, muhurthamType: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Auspicious Date (తేదీ)</label>
                      <input
                        type="text"
                        placeholder="e.g. 2026-11-28 (Saturday)"
                        value={newPost.muhurthamDate || ''}
                        onChange={(e) => setNewPost({ ...newPost, muhurthamDate: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Auspicious Time Window (శుభ ముహూర్త వేళ)</label>
                      <input
                        type="text"
                        placeholder="e.g. 06:15 AM - 07:45 AM (Amrita Kalam)"
                        value={newPost.timeWindow || ''}
                        onChange={(e) => setNewPost({ ...newPost, timeWindow: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Auspicious Lagna (లగ్న శుద్ధి)</label>
                      <input
                        type="text"
                        placeholder="e.g. Vrishabha Lagna (Fixed Ascendant)"
                        value={newPost.auspiciousLagna || ''}
                        onChange={(e) => setNewPost({ ...newPost, auspiciousLagna: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Tithi &amp; Nakshatra (తిథి &amp; నక్షత్రం)</label>
                      <input
                        type="text"
                        placeholder="Shukla Paksha Panchami, Rohini Nakshatram"
                        value={newPost.tithiNakshatra || ''}
                        onChange={(e) => setNewPost({ ...newPost, tithiNakshatra: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Inauspicious Period to Avoid (రాహుకాలం)</label>
                      <input
                        type="text"
                        placeholder="Rahu Kalam: 09:00 AM - 10:30 AM"
                        value={newPost.inauspiciousAvoid || ''}
                        onChange={(e) => setNewPost({ ...newPost, inauspiciousAvoid: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 9. Remedies */}
              {newPost.category === 'remedies' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Dosha Type (దోష రకం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Kala Sarpa Dosha / Kuja Dosha / Shani Sade Sati"
                        value={newPost.doshaType || ''}
                        onChange={(e) => setNewPost({ ...newPost, doshaType: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Recommended Kshetra / Temple (పరిహార క్షేత్రం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Srikalahasti Temple / Tirunageswaram"
                        value={newPost.recommendedTemple || ''}
                        onChange={(e) => setNewPost({ ...newPost, recommendedTemple: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Symptoms &amp; Adverse Influences (దోష లక్షణాలు)</label>
                    <input
                      type="text"
                      placeholder="Career hurdles, health disturbances, delays in marriage..."
                      value={newPost.doshaSymptoms || ''}
                      onChange={(e) => setNewPost({ ...newPost, doshaSymptoms: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Step-by-Step Upayam / Pariharam (పరిహార విధానం)</label>
                    <textarea
                      rows={2}
                      placeholder="1. Perform Rahu-Ketu Shanti Pooja -> 2. Chant Mrityunjaya Mantra 108 times..."
                      value={newPost.stepByStepRemedy || ''}
                      onChange={(e) => setNewPost({ ...newPost, stepByStepRemedy: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* 10. Bhajans */}
              {newPost.category === 'bhajans' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Vaggeyakara / Composer (వాగ్గేయకారుడు)</label>
                      <input
                        type="text"
                        placeholder="e.g. Sri Tyagaraja / Annamacharya / Ramadasu"
                        value={newPost.composer || ''}
                        onChange={(e) => setNewPost({ ...newPost, composer: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Raga &amp; Tala (రాగం &amp; తాళం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Ragam: Ananda Bhairavi | Talam: Adi"
                        value={newPost.ragaTala || ''}
                        onChange={(e) => setNewPost({ ...newPost, ragaTala: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Audio / YouTube Link (ఆడియో లింక్)</label>
                      <input
                        type="text"
                        placeholder="https://youtube.com/watch?v=..."
                        value={newPost.audioUrl || ''}
                        onChange={(e) => setNewPost({ ...newPost, audioUrl: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Telugu Lyrics (కీర్తన సాహిత్యం)</label>
                    <textarea
                      rows={3}
                      placeholder="పల్లవి: పలుకే బంగారమాయెనా...\nఅనుపల్లవి: పలుకే బంగారమాయె పిలిచిన పలుకవేమి?..."
                      value={newPost.bhajanLyricsTelugu || ''}
                      onChange={(e) => setNewPost({ ...newPost, bhajanLyricsTelugu: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-serif"
                    />
                  </div>
                </div>
              )}

              {/* 11. Spirituality */}
              {newPost.category === 'spirituality' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Philosophical Theme (వేదాంత తత్వం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Advaita Vedanta / Karma Yoga / Bhakti Marga"
                        value={newPost.philosophicalTheme || ''}
                        onChange={(e) => setNewPost({ ...newPost, philosophicalTheme: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Sanskrit Sutra / Mahavakya (మహావాక్యం)</label>
                      <input
                        type="text"
                        placeholder="e.g. अहं ब्रह्मास्मि (Aham Brahmasmi)"
                        value={newPost.sanskritSutra || ''}
                        onChange={(e) => setNewPost({ ...newPost, sanskritSutra: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-serif"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Daily Devotee Sadhana Guidance (నిత్య సాధన సూచన)</label>
                    <input
                      type="text"
                      placeholder="Practice 15 minutes of conscious breath observation and Gayatri Japa..."
                      value={newPost.dailySadhanaGuidance || ''}
                      onChange={(e) => setNewPost({ ...newPost, dailySadhanaGuidance: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* 12. E-Paper */}
              {newPost.category === 'epaper' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Edition Date (సంచిక తేదీ)</label>
                      <input
                        type="text"
                        placeholder="Today Morning Edition"
                        value={newPost.editionDate || ''}
                        onChange={(e) => setNewPost({ ...newPost, editionDate: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Edition Region / Zone (ప్రాంతం)</label>
                      <input
                        type="text"
                        placeholder="e.g. All-India & Telugu States Special"
                        value={newPost.editionRegion || ''}
                        onChange={(e) => setNewPost({ ...newPost, editionRegion: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">PDF Download URL (పీడీఎఫ్ డౌన్‌లోడ్)</label>
                      <input
                        type="text"
                        placeholder="https://astadasapeetam.org/epaper/edition.pdf"
                        value={newPost.pdfDownloadUrl || ''}
                        onChange={(e) => setNewPost({ ...newPost, pdfDownloadUrl: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Lead Headline (ప్రధాన ముఖ్యాంశం)</label>
                    <input
                      type="text"
                      placeholder="Grand Celebrations of Maha Shivaratri at 12 Jyotirlinga Sanctuaries..."
                      value={newPost.leadHeadline || ''}
                      onChange={(e) => setNewPost({ ...newPost, leadHeadline: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-semibold"
                    />
                  </div>
                </div>
              )}

              {/* 13. Festivals */}
              {newPost.category === 'festivals' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Festival Date &amp; Day (పండుగ తేదీ)</label>
                      <input
                        type="text"
                        placeholder="e.g. March 8, 2026 (Sunday)"
                        value={newPost.festivalDate || ''}
                        onChange={(e) => setNewPost({ ...newPost, festivalDate: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Hindu Month &amp; Tithi (మాసం &amp; తిథి)</label>
                      <input
                        type="text"
                        placeholder="e.g. Phalguna Krishna Chaturdashi"
                        value={newPost.hinduMonthTithi || ''}
                        onChange={(e) => setNewPost({ ...newPost, hinduMonthTithi: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Fasting Rules &amp; Vigil (ఉపవాస &amp; జాగరణ నియమాలు)</label>
                    <input
                      type="text"
                      placeholder="Nirjala fasting through 4 yamas of the night with Bilva archana..."
                      value={newPost.fastingRules || ''}
                      onChange={(e) => setNewPost({ ...newPost, fastingRules: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* 14. Videos */}
              {newPost.category === 'videos' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">YouTube / Stream Embed URL *</label>
                      <input
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={newPost.videoUrl || ''}
                        onChange={(e) => setNewPost({ ...newPost, videoUrl: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Speaker / Pravachanakartha (ప్రవచనకర్త)</label>
                      <input
                        type="text"
                        placeholder="e.g. Brahmasri Dr. Vamshi Krishna Ghanapathi"
                        value={newPost.speakerName || ''}
                        onChange={(e) => setNewPost({ ...newPost, speakerName: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Video Duration (వ్యవధి)</label>
                      <input
                        type="text"
                        placeholder="e.g. 45 Minutes"
                        value={newPost.videoDuration || ''}
                        onChange={(e) => setNewPost({ ...newPost, videoDuration: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 15. Gods & Avatars */}
              {newPost.category === 'gods' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Avatar Form / Descent (అవతార స్వరూపం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Dashavatara / Sri Narasimha / Tripura Sundari"
                        value={newPost.avatarForm || ''}
                        onChange={(e) => setNewPost({ ...newPost, avatarForm: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Divine Vahana (వాహనం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Garuda / Nandi / Simha / Mayura"
                        value={newPost.vahana || ''}
                        onChange={(e) => setNewPost({ ...newPost, vahana: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Sacred Weapons &amp; Symbols (ఆయుధాలు)</label>
                      <input
                        type="text"
                        placeholder="Shankha, Chakra, Gada, Trishula, Lotus"
                        value={newPost.sacredWeaponsSymbols || ''}
                        onChange={(e) => setNewPost({ ...newPost, sacredWeaponsSymbols: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 16. Pilgrimage Yatralu */}
              {newPost.category === 'yatralu' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Teertha Yatra Circuit (పుణ్య తీర్థయాత్ర సర్క్యూట్)</label>
                      <input
                        type="text"
                        placeholder="e.g. 18 Maha Shakti Peetha Darshan Circuit"
                        value={newPost.circuitName || ''}
                        onChange={(e) => setNewPost({ ...newPost, circuitName: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Total Duration (వ్యవధి)</label>
                      <input
                        type="text"
                        placeholder="e.g. 14 Days & 13 Nights"
                        value={newPost.yatraDuration || ''}
                        onChange={(e) => setNewPost({ ...newPost, yatraDuration: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Best Time to Visit (సందర్శన అనుకూల కాలం)</label>
                      <input
                        type="text"
                        placeholder="e.g. October through March"
                        value={newPost.bestTimeToVisit || ''}
                        onChange={(e) => setNewPost({ ...newPost, bestTimeToVisit: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1 text-xs">Day-by-Day Itinerary Schedule (రోజువారీ ప్రయాణ ప్రణాళిక)</label>
                    <textarea
                      rows={3}
                      placeholder="Day 1: Kashi & Sarnath -> Day 2: Kamakhya..."
                      value={newPost.itineraryDays || ''}
                      onChange={(e) => setNewPost({ ...newPost, itineraryDays: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* 17. Panchangam */}
              {newPost.category === 'panchangam' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Tithi &amp; Paksha (తిథి &amp; పక్షం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Shukla Paksha Ekadashi"
                        value={newPost.panchangamTithi || ''}
                        onChange={(e) => setNewPost({ ...newPost, panchangamTithi: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Nakshatram (నక్షత్రం)</label>
                      <input
                        type="text"
                        placeholder="e.g. Rohini Nakshatram"
                        value={newPost.panchangamNakshatra || ''}
                        onChange={(e) => setNewPost({ ...newPost, panchangamNakshatra: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Yoga &amp; Karana (యోగం &amp; కరణం)</label>
                      <input
                        type="text"
                        placeholder="Sadhya Yogam | Bava Karanam"
                        value={newPost.panchangamYogaKarana || ''}
                        onChange={(e) => setNewPost({ ...newPost, panchangamYogaKarana: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Sun &amp; Moon Timings</label>
                      <input
                        type="text"
                        placeholder="Sunrise: 06:12 AM | Sunset: 06:18 PM"
                        value={newPost.panchangamTimings || ''}
                        onChange={(e) => setNewPost({ ...newPost, panchangamTimings: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1 text-xs">Rahu Kalam &amp; Auspicious Periods</label>
                      <input
                        type="text"
                        placeholder="Rahu Kalam: 04:30 PM - 06:00 PM | Amrita: 08:45 AM"
                        value={newPost.panchangamKalam || ''}
                        onChange={(e) => setNewPost({ ...newPost, panchangamKalam: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 3: FULL ARTICLE / KATHA / ESSAY BODY */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                    3. Sacred Article Body &amp; Sthala Puranam *
                  </h3>
                </div>
                <span className="text-[10px] text-stone-400">Supports full markdown &amp; Telugu text</span>
              </div>

              <div>
                <textarea
                  rows={8}
                  required
                  placeholder="Compose the full devotional history, sthala purana katha, spiritual insights, and teachings..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full border border-stone-300 rounded-2xl p-4 text-xs leading-relaxed focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 font-sans"
                />
              </div>

              {/* Basic Tags */}
              <div className="pt-2">
                <label className="font-bold text-stone-700 block mb-1 text-xs">Devotional Taxonomy Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Shakti Peethas, Daily Slokas, Panchangam"
                  value={newPost.tags || ''}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-600 font-medium"
                />
              </div>
            </div>

            {/* SECTION 4: ADVANCED SEO & META SEARCH INDEXING STUDIO */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider flex items-center space-x-2">
                    <Search className="w-4 h-4 text-blue-600" />
                    <span>4. Search Engine Optimization (Meta Description &amp; Meta Keywords)</span>
                  </h3>
                </div>
                <span className="text-[10px] text-blue-700 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  Google &amp; AI Indexing
                </span>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-stone-700 text-xs">
                    SEO Meta Title (శోధన శీర్షిక)
                  </label>
                  <span className={`text-[10px] font-mono font-bold ${
                    (newPost.metaTitle || newPost.title || '').length > 60 ? 'text-amber-600' : 'text-stone-400'
                  }`}>
                    {(newPost.metaTitle || newPost.title || '').length}/60 characters (Optimal)
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Srisailam Temple History, Timings & Sacred Shakti Peetha Darshan"
                  value={newPost.metaTitle || newPost.title || ''}
                  onChange={(e) => setNewPost({ ...newPost, metaTitle: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-stone-700 text-xs">
                    SEO Meta Description (శోధన సారాంశ వివరణ) *
                  </label>
                  <span className={`text-[10px] font-mono font-bold ${
                    (newPost.metaDescription || newPost.excerpt || '').length > 160 ? 'text-rose-600' : 'text-stone-400'
                  }`}>
                    {(newPost.metaDescription || newPost.excerpt || '').length}/160 characters (Optimal: 140-160)
                  </span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Provide a compelling 140-160 character description of this sacred post for Google snippets and WhatsApp / Facebook sharing previews..."
                  value={newPost.metaDescription || newPost.excerpt || ''}
                  onChange={(e) => setNewPost({ ...newPost, metaDescription: e.target.value, excerpt: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-blue-600 leading-relaxed"
                />
              </div>

              {/* Meta Keywords */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-stone-700 text-xs">
                    SEO Meta Keywords &amp; Focus Keyphrases (శోధన కీలకపదాలు) *
                  </label>
                  <span className="text-[10px] text-stone-400">Comma-separated</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Srisailam Temple, Bhramaramba Devi, 18 Shakti Peethas, Daily Panchangam, Andhra Pradesh Temples"
                  value={newPost.metaKeywords || newPost.keywords || ''}
                  onChange={(e) => setNewPost({ ...newPost, metaKeywords: e.target.value, keywords: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-blue-600 font-medium"
                />
                {/* Quick Keyword Suggestion Chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-stone-400">Quick Devotional Tags:</span>
                  {[activeCategoryObj.label, newPost.deity, 'Astadasapeetam', 'Vedic Culture', 'Panchangam'].filter(Boolean).map((kw, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        const existing = newPost.metaKeywords || '';
                        if (!existing.includes(kw)) {
                          const updated = existing ? `${existing}, ${kw}` : kw;
                          setNewPost({ ...newPost, metaKeywords: updated, keywords: updated });
                        }
                      }}
                      className="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-amber-50 text-[10px] text-stone-600 hover:text-amber-800 border border-stone-200 cursor-pointer transition"
                    >
                      + {kw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Google SERP Snippet Preview */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
                <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center space-x-1">
                  <span>Google Search Live SERP Snippet Preview</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
                  <div className="flex items-center space-x-1.5 text-[11px] text-emerald-800 font-sans">
                    <span className="w-4 h-4 rounded-full bg-amber-500/20 text-[9px] font-bold text-amber-900 flex items-center justify-center">🕉️</span>
                    <span className="truncate">https://astadasapeetam.org &rsaquo; {newPost.category} &rsaquo; {newPost.slug || 'sacred-article'}</span>
                  </div>
                  <div className="text-sm font-semibold text-blue-700 hover:underline cursor-pointer leading-tight">
                    {newPost.metaTitle || newPost.title || 'Untitled Sacred Post'} | Astadasapeetam Divine Sanctuary
                  </div>
                  <div className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {newPost.metaDescription || newPost.excerpt || 'Sacred devotional guide, history, significance, and daily rituals from Astadasapeetam.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Submittal Bar */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-stone-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ready to publish instantly to {activeCategoryObj.label} and indexed in Devotee Registry.</span>
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => fillCategorySample(newPost.category)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-bold cursor-pointer"
                >
                  Auto-Fill Sample
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 px-7 py-2.5 rounded-xl font-black text-xs shadow-md flex items-center justify-center space-x-2 border border-amber-300/40 cursor-pointer transition transform active:scale-95"
                >
                  <Send className="w-4 h-4 text-stone-950" />
                  <span>{loading ? 'Publishing...' : 'Publish Sacred Post'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Side: Real-Time Live Sanctuary Preview Panel */}
        {previewMode && (
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-6">
              <div className="bg-gradient-to-b from-[#180A24] via-[#200B30] to-[#12061B] rounded-3xl border-2 border-amber-500/40 p-6 text-white shadow-2xl space-y-4 relative overflow-hidden">
                {/* Live Banner Ribbon */}
                <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                      Live Devotee Viewport
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 font-bold">
                    {activeCategoryObj.badge}
                  </span>
                </div>

                {/* Devotional Featured Media Preview (Only rendered for image-supported categories) */}
                {activeCategoryObj.needsImage && newPost.featuredImage && (
                  <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-stone-950 max-h-48 group">
                    <img
                      src={newPost.featuredImage}
                      alt={newPost.title || 'Sacred Devotional'}
                      className="w-full h-44 object-cover"
                    />
                    {newPost.imageMeta && (
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-stone-950/85 backdrop-blur-md text-[10px] font-mono font-bold text-amber-300 border border-amber-400/40 shadow-sm flex items-center space-x-1">
                        <span>⚡ {newPost.imageMeta.format}</span>
                        <span>•</span>
                        <span>{newPost.imageMeta.convertedSizeFormatted}</span>
                        <span className="text-emerald-400">(-{newPost.imageMeta.savingsPercent}%)</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Deity Avatar & Category Badge */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-black text-xl flex items-center justify-center shadow-lg shrink-0">
                    {activeCategoryObj.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-amber-300 uppercase tracking-widest font-bold">
                      {newPost.deity || 'Universal Parashakti'}
                    </div>
                    <h4 className="text-base font-black text-white leading-snug line-clamp-2">
                      {newPost.title || 'Untitled Sacred Post'}
                    </h4>
                  </div>
                </div>

                {/* Telugu Title */}
                {newPost.titleTelugu && (
                  <div className="bg-amber-500/10 border border-amber-400/20 rounded-xl p-2.5 text-amber-200 font-serif text-xs">
                    {newPost.titleTelugu}
                  </div>
                )}

                {/* Category-Specific Preview Highlights */}
                {/* Temples */}
                {newPost.category === 'temples' && (newPost.templeLocation || newPost.darshanTimings) && (
                  <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800 text-[11px] space-y-1.5 font-sans">
                    {newPost.templeLocation && (
                      <div className="flex items-center space-x-1.5 text-stone-300">
                        <span>📍</span>
                        <span className="font-semibold text-amber-200">{newPost.templeLocation}</span>
                      </div>
                    )}
                    {newPost.darshanTimings && (
                      <div className="flex items-center space-x-1.5 text-stone-400">
                        <span>⏰</span>
                        <span>{newPost.darshanTimings}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Slokas / Mantras */}
                {(newPost.category === 'slokas' || newPost.category === 'mantras') && (newPost.devanagariVerse || newPost.slokaTelugu || newPost.moolaMantra) && (
                  <div className="bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 rounded-xl p-3.5 border border-amber-500/30 text-center space-y-2">
                    {newPost.devanagariVerse && (
                      <div className="text-amber-100 font-serif text-xs leading-relaxed">
                        {newPost.devanagariVerse}
                      </div>
                    )}
                    {newPost.slokaTelugu && (
                      <div className="text-amber-300 font-serif text-xs leading-relaxed">
                        {newPost.slokaTelugu}
                      </div>
                    )}
                    {newPost.moolaMantra && (
                      <div className="text-amber-200 font-serif text-xs leading-relaxed font-bold">
                        {newPost.moolaMantra}
                      </div>
                    )}
                  </div>
                )}

                {/* Horoscope */}
                {newPost.category === 'horoscope' && (newPost.moonSign || newPost.pariharam) && (
                  <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800 text-[11px] space-y-1.5">
                    <div className="flex items-center justify-between text-amber-200 font-bold">
                      <span>♈ {newPost.moonSign}</span>
                      <span className="text-[10px] text-stone-400">Lord: {newPost.rulingPlanet}</span>
                    </div>
                    {newPost.pariharam && (
                      <div className="text-stone-300 text-[10px]">
                        <span className="text-amber-400 font-semibold">Pariharam: </span>
                        {newPost.pariharam}
                      </div>
                    )}
                  </div>
                )}

                {/* Muhurtham */}
                {newPost.category === 'muhurtham' && (newPost.timeWindow || newPost.muhurthamType) && (
                  <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800 text-[11px] space-y-1.5">
                    <div className="text-amber-300 font-bold">⏳ {newPost.muhurthamType}</div>
                    <div className="text-emerald-400 font-mono text-[10px]">{newPost.timeWindow}</div>
                  </div>
                )}

                {/* Excerpt / Summary */}
                <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                  {newPost.excerpt || newPost.content?.substring(0, 150) || 'Sacred article details will appear here as you type...'}
                </p>

                {/* Devotee Metadata Footer */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span className="flex items-center space-x-1">
                    <span>👁️ 0 Devotee Reads</span>
                  </span>
                  <span className="text-amber-400 font-bold truncate max-w-[200px]" title={`/${newPost.category}/${newPost.slug || 'sacred-article'}`}>
                    /{newPost.category}/{newPost.slug || 'sacred-article'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
