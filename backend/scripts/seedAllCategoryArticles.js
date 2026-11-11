const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Post = require('../src/models/Post');

const articles = [
  // 1. Sacred Temples & Peethas (temples)
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
    title: 'Srisailam Bhramaramba Devi: The Sacred Confluence of Shakti Peetha & Mallikarjuna Jyotirlinga',
    titleTelugu: 'శ్రీశైల భ్రమరాంబికా దేవి - ద్వితీయ శక్తిపీఠం మరియు మల్లికార్జున జ్యోతిర్లింగ క్షేత్రం',
    slug: 'srisailam-bhramaramba-devi-shakti-peetha',
    category: 'temples',
    excerpt: 'Located on the sacred Nallamala hills along river Krishna, Srisailam is the only rare pilgrimage site holding both a Maha Shakti Peetha and a Jyotirlinga.',
    content: 'Srisailam holds an unparalleled spiritual status in Bharatavarsha. Here, Mother Sati’s neck part (Greeva) manifested as Mother Bhramaramba Devi. Simultaneously, Lord Shiva resides as Sri Mallikarjuna Swamy. Adi Sankaracharya composed the sublime Sivananda Lahari and Soundarya Lahari during his meditation at this holy kshetra.\n\nDevotees performing sparsha darshanam of Mallikarjuna Swamy and receiving the vermilion kumkuma prasadam of Mother Bhramaramba receive the spiritual fruit of fulfilling all Dharmic desires and liberation from worldly bondages.',
    devotionalVerse: 'శ్రీశైలే భ్రమరాంబా చ మహాదేవీ మనోన్మణీ | సర్వపాపహరా నిత్యం భక్తాభీష్ట ప్రదాయినీ ||',
    featuredImage: '/images/temple_srisailam.jpg',
    deity: 'Mother Bhramaramba & Sri Mallikarjuna Swamy',
    tags: ['Srisailam', 'Bhramaramba Devi', 'Jyotirlinga', '18 Shakti Peethas'],
    seoTitle: 'Srisailam Bhramaramba Temple Darshan Guide & Sthala Puranam',
    metaDescription: 'Complete pilgrimage guide to Srisailam Bhramaramba Devi Shakti Peetha, online seva booking, darshan timings and history.',
    keywords: ['Srisailam', 'Bhramaramba', 'Mallikarjuna', 'Shakti Peetha Andhra Pradesh'],
    status: 'published',
    viewsCount: 4520
  },

  // 2. Daily Slokas & Chants (slokas)
  {
    title: 'Maha Mrityunjaya Mantra: Sacred Verse, Word-by-Word Meaning & Chanting Vidhi',
    titleTelugu: 'మహా మృత్యుంజయ మంత్రం - సంస్కృత శ్లోకం, ప్రతిపదార్థం మరియు జప విధానం',
    slug: 'maha-mrityunjaya-mantra-verse-meaning-vidhi',
    category: 'slokas',
    excerpt: 'The life-protecting conqueror of death mantra from Rigveda (Mandala 7), bestowing good health, vitality, and peace of mind.',
    content: 'The Maha Mrityunjaya Mantra, revealed to Sage Markandeya, is the most revered healing mantra of Sanatana Dharma.\n\nChanting this sacred verse 11 or 108 times daily facing East cleanses the astral body, purifies the vital prana, and wards off premature afflictions (Apasavya Mrityu). It is especially recommended during Brahma Muhurtham or Pradosha Kaalam.',
    devotionalVerse: 'ఓం త్రయంబకం యజామహే సుగంధిం పుష్టివర్ధనమ్ | ఉర్వారుకమివ బంధనాన్ మృత్యోర్ముక్షీయ మామృతాత్ ||',
    featuredImage: '/images/news_rudra.jpg',
    deity: 'Lord Tryambaka Shiva',
    tags: ['Maha Mrityunjaya', 'Daily Sloka', 'Healing Chants', 'Rigveda'],
    seoTitle: 'Maha Mrityunjaya Mantra Lyrics, Telugu Meaning & Chanting Benefits',
    metaDescription: 'Learn Maha Mrityunjaya Mantra Sanskrit sloka, word-by-word meaning in Telugu and English, and rules for daily chanting.',
    keywords: ['Maha Mrityunjaya Mantra', 'Daily Slokas', 'Lord Shiva Chants', 'Telugu Slokas'],
    status: 'published',
    viewsCount: 6240
  },
  {
    title: 'Sri Adi Sankaracharya 18 Maha Shakti Peetha Dhyana Stotram',
    titleTelugu: 'శ్రీ ఆది శంకరాచార్య విరచిత అష్టాదశ మహాశక్తిపీఠ ధ్యాన శ్లోకాలు',
    slug: 'adi-sankaracharya-ashtadasa-shakti-peetha-stotram',
    category: 'slokas',
    excerpt: 'The sacred 18 verses capturing all eighteen sanctuaries of Universal Mother Parashakti from Lanka to Kashmir.',
    content: 'Composed by Jagadguru Sri Adi Sankaracharya, this holy stotra invokes the divine grace of all 18 Maha Shakti Peethas in one single breath.\n\nReciting these sacred lines every morning during sandhya time bestows the pilgrimage merit of visiting all 18 holy kshetras and surrounds the devotee with a fortress of divine motherly protection.',
    devotionalVerse: 'లంకాయాం శంకరీ దేవి కామాక్షీ కాంచికాపురే | ప్రద్యుమ్నే శృంఖలా దేవి చాముండీ క్రౌంచపట్టణే ||',
    featuredImage: '/images/temple_kashi.jpg',
    deity: '18 Maha Shakti Peetha Devis',
    tags: ['Ashtadasa Peetham', 'Adi Sankaracharya', 'Daily Sloka', 'Devi Stotram'],
    seoTitle: '18 Maha Shakti Peetha Stotram Lyrics in Telugu & Sanskrit',
    metaDescription: 'Full text of Sri Adi Shankaracharya 18 Maha Shakti Peetha Dhyana Sloka with Telugu script and spiritual commentary.',
    keywords: ['Shakti Peetha Stotram', 'Lankayam Shankari Devi', 'Daily Sloka', 'Adi Shankara'],
    status: 'published',
    viewsCount: 5190
  },

  // 3. Sacred Mantras & Bija Japa (mantras)
  {
    title: 'Gayatri Maha Mantra: 24 Aksharas, Meaning, Japa Vidhi & Spiritual Siddhi',
    titleTelugu: 'గాయత్రీ మహామంత్రం - 24 బీజాక్షరాల వైశిష్ట్యం, జప విధానం మరియు ఫలశ్రుతి',
    slug: 'gayatri-maha-mantra-japa-vidhi-siddhi',
    category: 'mantras',
    excerpt: 'The mother of all Vedas revealed by Brahmarshi Vishwamitra, illuminating the spiritual intellect and granting soul awakening.',
    content: 'The Gayatri Mantra contains 24 sacred syllables that correspond to the 24 vertebrae of the human spine and the 24 divine energies of creation. Performing 108 Gayatri Japa using a pure Tulasi or Sandalwood mala during sunrise, noon, and sunset activates the Buddhi (spiritual intellect), dispels ignorance, and burns away past karma.',
    devotionalVerse: 'ఓం భూర్భువః స్వః తత్సవితుర్వరేణ్యం భర్గో దేవస్య ధీమహి ధియో యో నః ప్రచోదయాత్ ||',
    featuredImage: '/images/art_mantras_real.jpg',
    deity: 'Mata Savitri Gayatri Devi',
    tags: ['Gayatri Mantra', '108 Japa', 'Bija Mantra', 'Vedic Chanting'],
    seoTitle: 'Gayatri Maha Mantra 108 Japa Vidhi & Telugu Meaning',
    metaDescription: 'Complete Vedic guide to Gayatri Mantra chanting, 24 syllables meaning, mudras, and benefits for students and seekers.',
    keywords: ['Gayatri Mantra', '108 Japa Mala', 'Vedic Mantras', 'Spiritual Intellect'],
    status: 'published',
    viewsCount: 7890
  },
  {
    title: 'Om Namah Shivaya Panchakshari Mantra: 108 Japa Sadhana & Spiritual Benefits',
    titleTelugu: 'ఓం నమః శివాయ పంచాక్షరీ మంత్ర సాధన - 108 జప విధానం మరియు విశేష ఫలితాలు',
    slug: 'om-namah-shivaya-panchakshari-mantra-sadhana',
    category: 'mantras',
    excerpt: 'The 5 cosmic elements (Na-Ma-Si-Va-Ya) encapsulated in the king of Shaivite mantras, purifying the five sheaths of the human body.',
    content: 'The Panchakshari Mantra represents Earth, Water, Fire, Air, and Space. When chanted with Rudraksha mala, it creates an energetic shield preventing negative thought forms, anxiety, and planetary afflictions. Practiced regularly, it awakens inner Shiva consciousness and stillness.',
    devotionalVerse: 'ఓం నమః శివాయ • పంచాక్షరమిదం పుణ్యం యః పఠేత్ శివసన్నిధౌ | శివలోకమవాప్నోతి శివేన సహ మోదతే ||',
    featuredImage: '/images/vid_shiva_real.jpg',
    deity: 'Lord Shiva Mahadeva',
    tags: ['Panchakshari', 'Om Namah Shivaya', 'Japa Sadhana', 'Rudraksha Mala'],
    seoTitle: 'Om Namah Shivaya Chanting Rules & 108 Beads Benefits',
    metaDescription: 'Vedic rules for chanting Om Namah Shivaya, meaning of the five syllables, and best times for Shiva japa.',
    keywords: ['Om Namah Shivaya', 'Panchakshari Mantra', 'Shiva Japa', 'Mantra Siddhi'],
    status: 'published',
    viewsCount: 4980
  },

  // 4. Divine Stotras & Kavachas (stotras)
  {
    title: 'Sri Lalitha Sahasranama Stotram: Sacred 1000 Names of Supreme Divine Mother',
    titleTelugu: 'శ్రీ లలితా సహస్రనామ స్తోత్రం - బ్రహ్మాండ పురాణ విశిష్టత మరియు సంపూర్ణ ఫలశ్రుతి',
    slug: 'sri-lalitha-sahasranama-stotram-mahatmyam',
    category: 'stotras',
    excerpt: 'Revealed by Lord Hayagriva to Sage Agastya in Brahmanda Purana, this supreme stotra is the crown jewel of Srividya Upasana.',
    content: 'Sri Lalitha Sahasranama contains the one thousand sacred secret names composed by the eight Vagdevatas at the command of Mother Lalitha Tripurasundari. Reciting this stotram on Fridays, Pournami (Full Moon), or during Navaratri removes all financial obstacles, heals illnesses, and blesses families with peace, children, and spiritual liberation.',
    devotionalVerse: 'శ్రీమాతా శ్రీమహారాజ్ఞీ శ్రీమత్సింహాసనేశ్వరీ | చిదగ్నికుండసంభూతా దేవకార్యసముద్యతా ||',
    featuredImage: '/images/temple_tirupati.jpg',
    deity: 'Mother Sri Lalitha Maha Tripurasundari',
    tags: ['Lalitha Sahasranamam', 'Stotra', 'Srividya', 'Kavacham'],
    seoTitle: 'Sri Lalitha Sahasranama Stotram Phala Shruti & Daily Parayana Guide',
    metaDescription: 'Spiritual benefits, Friday parayana vidhi, and auspicious fruits of chanting Sri Lalitha Sahasranamam in Telugu.',
    keywords: ['Lalitha Sahasranamam', 'Devi Stotras', 'Brahmanda Purana', 'Daily Chanting'],
    status: 'published',
    viewsCount: 8430
  },
  {
    title: 'Sri Durga Kavacham from Markandeya Purana: Complete Spiritual Armor',
    titleTelugu: 'శ్రీ దుర్గా కవచం - మార్కండేయ పురాణోక్త అభేద్య రక్షా కవచం',
    slug: 'sri-durga-kavacham-markandeya-purana',
    category: 'stotras',
    excerpt: 'The divine conversation between Lord Brahma and Sage Markandeya detailing the protective shield of Nava Durgas.',
    content: 'Sri Durga Kavacham is the foremost limb of the sacred Devi Mahatmyam (Chandi Patha). It establishes an armor of light over every limb, organ, and direction of the chanter. Reciting it before embarking on travels or important endeavors dispels fear, enemies, and all malevolent planetary energies.',
    devotionalVerse: 'ప్రథమం శైలపుత్రీ చ ద్వితీయం బ్రహ్మచారిణీ | తృతీయం చంద్రఘంటేతి కూష్మాండేతి చతుర్థకమ్ ||',
    featuredImage: '/images/fest_ganga.jpg',
    deity: 'Goddess Durga & Nava Durgas',
    tags: ['Durga Kavacham', 'Markandeya Purana', 'Protective Shield', 'Chandi Saptashati'],
    seoTitle: 'Sri Durga Kavacham Lyrics in Telugu & Daily Recitation Benefits',
    metaDescription: 'Read Sri Durga Kavacham with Telugu script and understand the armor of protection granted by Mother Durga.',
    keywords: ['Durga Kavacham', 'Devi Kavacham', 'Markandeya Purana', 'Spiritual Armor'],
    status: 'published',
    viewsCount: 3820
  },

  // 5. Vrathalu & Pooja Vidhi (vrathalu)
  {
    title: 'Varalakshmi Vratam: Sacred Samagri Checklist, Kalasha Sthapana & Pooja Vidhi',
    titleTelugu: 'వరలక్ష్మీ వ్రతం - పూజా సామగ్రి, కలశ స్థాపన మరియు సంపూర్ణ పూజా విధానం',
    slug: 'varalakshmi-vratam-samagri-kalasha-pooja-vidhi',
    category: 'vrathalu',
    excerpt: 'The auspicious Friday vrata performed before Sravana Purnima to invite Goddess Lakshmi’s eternal prosperity and marital bliss.',
    content: 'Sri Varalakshmi Vratam is celebrated with utmost devotion by sumangalis across Bharat. The holy ritual involves setting up a sacred Kalasha filled with raw rice, betel leaves, dry fruits, and gold/silver coin, adorned with a consecrated face of Mother Lakshmi.\n\nThe 16-step Shodashopachara Pooja is performed, sacred toram tied on the wrist, and nine divine prasadam varieties offered to invoke Ashta Lakshmi blessings.',
    devotionalVerse: 'లక్ష్మీం క్షీరసముద్రరాజతనయాం శ్రీరంగధామేశ్వరీం | దాసీభూత సమస్తదేవవనితాం లోకైకదీపాంకురామ్ ||',
    featuredImage: '/images/fest_vatsavitri.jpg',
    deity: 'Mother Varalakshmi Devi',
    tags: ['Varalakshmi Vratam', 'Sravana Masam', 'Kalasha Sthapana', 'Pooja Vidhi'],
    seoTitle: 'Varalakshmi Vratam Complete Pooja Vidhi & Samagri List in Telugu',
    metaDescription: 'Step-by-step Varalakshmi Vratam guide, kalasha preparation, toram tying mantra, and nine prasadam offerings.',
    keywords: ['Varalakshmi Vratam', 'Sravana Pooja', 'Lakshmi Pooja Vidhi', 'Kalasha Sthapana'],
    status: 'published',
    viewsCount: 9120
  },
  {
    title: 'Sri Satyanarayana Swamy Vratham: Step-by-Step Pooja Vidhi & Sacred Katha',
    titleTelugu: 'శ్రీ సత్యనారాయణ స్వామి వ్రతం - సంపూర్ణ కథ, పూజా విధానం మరియు ప్రసాద తయారీ',
    slug: 'satyanarayana-swamy-vratham-katha-vidhi',
    category: 'vrathalu',
    excerpt: 'The most popular universal vrata from Reva Khanda of Skanda Purana, fulfilling wishes and bringing family harmony.',
    content: 'Lord Vishnu instructed Sage Narada that in Kali Yuga, no ritual is as efficacious and accessible as Sri Satyanarayana Swamy Vratam. Performed on Pournami, Ekadashi, or auspicious family events, listening to the five sacred katha chapters and consuming the divine Sapadabhakshya (Rava prasadam) dispels family discord and attracts abundance.',
    devotionalVerse: 'సత్యనారాయణ దేవం వందే శంఖగదాధరమ్ | పీతాంబరధరం శాంతం వనమాలావిభూషితమ్ ||',
    featuredImage: '/images/art_akshaya_real.jpg',
    deity: 'Lord Sri Satyanarayana Swamy',
    tags: ['Satyanarayana Vratam', 'Skanda Purana', 'Pournami Pooja', 'Vedic Katha'],
    seoTitle: 'Satyanarayana Swamy Vratham Pooja Vidhi & 5 Chapters Katha in Telugu',
    metaDescription: 'Complete procedure for Sri Satyanarayana Swamy Vrata, prasadam recipe, and 5 sacred story chapters explained.',
    keywords: ['Satyanarayana Swamy Vratam', 'Skanda Purana', 'Pournami Vrata', 'Telugu Vrathalu'],
    status: 'published',
    viewsCount: 6730
  },

  // 6. Sacred Yantras & Maha Meru (yantras)
  {
    title: 'Sri Yantra (Maha Meru) Sacred Geometry: 9 Interlocking Triangles & Home Sthapana',
    titleTelugu: 'శ్రీ యంత్రం (మహామేరు) దివ్య జ్యామితి - ఇంట్లో ప్రతిష్ఠించే సరైన దిశ మరియు నియమాలు',
    slug: 'sri-yantra-maha-meru-sacred-geometry-placement',
    category: 'yantras',
    excerpt: 'The pinnacle of cosmic Vedic architecture representing the manifestation of the macrocosm and microcosm.',
    content: 'Sri Yantra is composed of 9 interlocking triangles centered around the Bindu, generating 43 smaller triangles surrounded by two concentric rings of lotus petals. When consecrated in pure copper, brass, or Panchaloha and installed in the Ishanya (North-East) corner, it continuously radiates high-frequency sattvic vibrations that neutralize negative geopathic stress and attract Sri (abundance).',
    devotionalVerse: 'బిందుత్రికోణవసుకోణదశారయుగ్మమన్వశ్రనాగదళసంయుత షోడశారమ్ | వృత్తత్రయం చ ధరణీసదనత్రయం చ శ్రీచక్రమేతదుదితం పరదేవతాయాః ||',
    featuredImage: '/images/yantra_meru.png',
    deity: 'Mata Lalitha Tripurasundari',
    tags: ['Sri Yantra', 'Maha Meru', 'Sacred Geometry', 'Vastu Shastra'],
    seoTitle: 'Sri Yantra Benefits, Placement Rules & Pooja Vidhi in Telugu',
    metaDescription: 'Learn how to install Sri Yantra at home, correct North-East placement, kumkuma archana, and cosmic geometric meaning.',
    keywords: ['Sri Yantra', 'Maha Meru', 'Vastu Yantras', 'Home Temple Sthapana'],
    status: 'published',
    viewsCount: 5410
  },
  {
    title: 'Sri Kuber Yantra for Prosperity: Attracting Wealth, Prosperity & Positive Energy',
    titleTelugu: 'శ్రీ కుబేర యంత్రం - ధనాకర్షణ, వ్యాపార వృద్ధి మరియు గృహ వాస్తు నియమాలు',
    slug: 'sri-kuber-yantra-prosperity-direction-rules',
    category: 'yantras',
    excerpt: 'The sacred numeric grid dedicated to the celestial treasurer of the gods, Lord Kubera.',
    content: 'The Kuber Yantra is characterized by the sacred 3x3 magical numeric square where every row, column, and diagonal adds up to 72. Placed on a cash box, business altar, or the Northern wall facing South, it acts as an energizer for steady monetary influx and eliminates financial blockages.',
    devotionalVerse: 'ఓం యక్షాయ కుబేరాయ వైశ్రవణాయ ధనధాన్యాధిపతయే ధనధాన్యసమృద్ధిం మే దేహి దాపయ స్వాహా ||',
    featuredImage: '/images/rudraksha.png',
    deity: 'Lord Kubera & Goddess Mahalakshmi',
    tags: ['Kuber Yantra', 'Wealth', 'Vastu', 'Business Growth'],
    seoTitle: 'Kuber Yantra Placement Direction & Puja Procedure at Home',
    metaDescription: 'Vedic guidelines for Kubera Yantra installation, correct direction, mantras, and remedies for business growth.',
    keywords: ['Kuber Yantra', 'Wealth Yantras', 'Kuber Mantra', 'Vastu Remedies'],
    status: 'published',
    viewsCount: 4210
  },

  // 7. Daily Horoscope (12 Rasis) (horoscope)
  {
    title: 'Daily Gochara Predictions & Rasi Phalalu for Mesha to Meena: Planetary Influences',
    titleTelugu: 'ద్వాదశ రాశుల దినఫలాలు - మేషం నుండి మీనం వరకు సమగ్ర గోచార ఫలితాలు',
    slug: 'daily-gochara-predictions-rasi-phalalu-all-signs',
    category: 'horoscope',
    excerpt: 'Comprehensive astrological analysis of Sun, Moon, and planetary transits across the 12 zodiac signs with daily pariharams.',
    content: 'The daily astrological forecast tracks the transit of the Moon through constellations, indicating favorable hours for finance, career decisions, health, and family harmony.\n\nFrom dynamic Mesha to intuitive Meena, each rasi receives specific guidance on auspicious colors, lucky numbers, and deities to worship for overcoming malefic planetary aspects.',
    devotionalVerse: 'నమః సూర్యాయ చంద్రాయ మంగళాయ బుధాయ చ | గురు శుక్ర శనిభ్యశ్చ రాహవే కేతవే నమః ||',
    featuredImage: '/images/news_tirupati.jpg',
    deity: 'Navagraha Devatas',
    tags: ['Rasi Phalalu', 'Horoscope', 'Daily Predictions', 'Vedic Astrology'],
    seoTitle: 'Daily Horoscope & Telugu Rasi Phalalu for All 12 Moon Signs',
    metaDescription: 'Today horoscope in Telugu, planetary transits, lucky time, career and financial predictions for 12 rasis.',
    keywords: ['Rasi Phalalu', 'Daily Horoscope', 'Telugu Jyotishyam', 'Gochara Phalalu'],
    status: 'published',
    viewsCount: 11200
  },
  {
    title: 'Brihaspati (Jupiter) Peyarchi & Astrological Impact on All 12 Moon Signs',
    titleTelugu: 'గురు గోచార ఫలితాలు - 12 రాశుల వారిపై బృహస్పతి అనుగ్రహం మరియు పరిహారాలు',
    slug: 'brihaspati-jupiter-transit-impact-remedies',
    category: 'horoscope',
    excerpt: 'Detailed Vedic astrological guide on Jupiter transit through signs, career prospects, marriage yogas, and Yellow Sapphire advice.',
    content: 'Jupiter is the supreme benefic planet (Deva Guru) presiding over wisdom, children, wealth, and spiritual growth. When Guru transits into favorable houses (2nd, 5th, 7th, 9th, 11th from Moon sign), life transforms with honors and prosperity. For afflicted signs, chanting Guru Stotra and feeding yellow cows provides immense relief.',
    devotionalVerse: 'దేవానాం చ ఋషీణాం చ గురుం కాంచనసన్నిభమ్ | బుద్ధిభూతం త్రిలోకేశం తం నమామి బృహస్పతిమ్ ||',
    featuredImage: '/images/art_mantras_real.jpg',
    deity: 'Deva Guru Brihaspati',
    tags: ['Guru Peyarchi', 'Transit Astrology', 'Jupiter Remedies', 'Horoscope'],
    seoTitle: 'Guru Peyarchi Transit Predictions in Telugu & Remedies',
    metaDescription: 'Astrological analysis of Jupiter transit impact on health, wealth, and marriage with sacred remedies.',
    keywords: ['Guru Peyarchi', 'Jupiter Transit', 'Rasi Phalalu', 'Guru Pariharam'],
    status: 'published',
    viewsCount: 6840
  },

  // 8. Shubh Muhurtham & Choghadiya (muhurtham)
  {
    title: 'Griha Pravesham Shubh Muhurtham 2026: Auspicious Tithis, Nakshatras & Vastu Shanti',
    titleTelugu: 'గృహప్రవేశ శుభ ముహూర్తాలు 2026 - తిథులు, నక్షత్రాలు మరియు వాస్తు శాంతి పూజా విధానం',
    slug: 'griha-pravesham-shubh-muhurtham-vastu-shanti',
    category: 'muhurtham',
    excerpt: 'Carefully calculated auspicious dates for entering a new home with Vastu Purusha pooja and boiling milk ritual rules.',
    content: 'A house is sanctified into a home when entered at an auspicious astrological lagna. The ideal Griha Pravesham requires Shuddha Tithi (Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, Trayodashi) and fixed nakshatras like Rohini, Mrigashira, Uttara Phalguni, Chitra, Anuradha, or Revati.\n\nPerforming Ganapati Homa, Navagraha Homa, and Vastu Shanti ensures everlasting peace, longevity, and wealth for the residents.',
    devotionalVerse: 'వాస్తుపురుష నమస్తేస్తు భూశయ్యాభిరత ప్రభో | మద్గృహం ధనధాన్యాది సమృద్ధిం కురు సర్వదా ||',
    featuredImage: '/images/temple_rameswaram.jpg',
    deity: 'Vastu Purusha & Lord Ganapati',
    tags: ['Griha Pravesham', 'Shubh Muhurtham', 'Vastu Shanti', 'Auspicious Timings'],
    seoTitle: 'Griha Pravesham Dates 2026 & Auspicious Muhurtham Timings in Telugu',
    metaDescription: 'Find best Griha Pravesh dates in 2026, nakshatra guidelines, and essential rituals for entering a new house.',
    keywords: ['Griha Pravesham Muhurtham', 'Shubh Muhurtham', 'Vastu Dates', 'House Warming'],
    status: 'published',
    viewsCount: 4790
  },
  {
    title: 'Vivaha Shubh Muhurtham & Lagna Shuddhi Guidelines in Vedic Astrology',
    titleTelugu: 'వివాహ శుభ ముహూర్తాలు మరియు లగ్న శుద్ధి నియమాలు - దశ విధ దోష నివారణ',
    slug: 'vivaha-shubh-muhurtham-lagna-shuddhi-guidelines',
    category: 'muhurtham',
    excerpt: 'The critical Vedic parameters of Lagna Shuddhi, avoiding Jamata and Kanya doshas, ensuring marital longevity.',
    content: 'Marriage is a sacred Vedic samskara uniting two souls across lifetimes. In selecting a Vivaha Muhurtham, astrologers ensure the Lagna has no malefics in the 7th and 8th houses, and Jupiter/Venus are free from combust or retrograde states. Observing these rules bestows unbroken marital bliss and auspicious progeny.',
    devotionalVerse: 'మంగళం భగవాన్ విష్ణుః మంగళం గరుడధ్వజః | మంగళం పుండరీకాక్షో మంగళాయ తనో హరిః ||',
    featuredImage: '/images/fest_vatsavitri.jpg',
    deity: 'Lord Lakshmi Narayana',
    tags: ['Vivaha Muhurtham', 'Lagna Shuddhi', 'Wedding Dates', 'Vedic Astrology'],
    seoTitle: 'Vivaha Shubh Muhurtham 2026 & Lagna Calculation Guide in Telugu',
    metaDescription: 'Vedic principles for choosing marriage dates, planetary strengths, and avoiding doshas.',
    keywords: ['Vivaha Muhurtham', 'Marriage Dates 2026', 'Lagna Shuddhi', 'Panchangam'],
    status: 'published',
    viewsCount: 3950
  },

  // 9. Remedies & Dosha Nivarana (remedies)
  {
    title: 'Authentic 5-Mukhi vs 1-Mukhi Nepal Rudraksha: Astrological Benefits & Testing',
    titleTelugu: 'రుద్రాక్షల వైశిష్ట్యం: ఏకముఖి మరియు పంచముఖి రుద్రాక్షల ధారణా ఫలితాలు',
    slug: 'nepal-rudraksha-astrological-benefits-testing',
    category: 'remedies',
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
    title: 'Kala Sarpa Dosha Nivarana: Symptoms, Pariharams & Sacred Kshetras (Kalahasti & Kukke)',
    titleTelugu: 'కాలసర్ప దోష నివారణ మరియు పరిహార క్షేత్రాలు - శ్రీకాళహస్తి విశిష్టత',
    slug: 'kala-sarpa-dosha-nivarana-symptoms-remedies',
    category: 'remedies',
    excerpt: 'When all seven planets are hemmed between Rahu and Ketu, how devotees can perform Rahu-Ketu Sarpa Shanti to unlock life momentum.',
    content: 'Kala Sarpa Yoga occurs when planetary energies are trapped between the nodal axis. It often causes delays in marriage, career roadblocks, or unexplained obstacles. Performing Rahu-Ketu Sarpa Dosha Nivarana pooja at Sri Kalahasti temple (Andhra Pradesh) or Kukke Subramanya (Karnataka) alongside daily chanting of Maha Mrityunjaya and Subrahmanya Bhujangam completely dissolves these karmic knots.',
    devotionalVerse: 'అనంతం వాసుకిం శేషం పద్మనాభం చ కంబలమ్ | శంఖపాలం ధృతరాష్ట్రం తక్షకం కాళియం తథా ||',
    featuredImage: '/images/temple_kashi.jpg',
    deity: 'Lord Subramanya Swamy & Rahu-Ketu',
    tags: ['Kala Sarpa Dosha', 'Rahu Ketu', 'Kalahasti', 'Astrology Remedies'],
    seoTitle: 'Kala Sarpa Dosha Symptoms, Remedies & Kalahasti Pooja in Telugu',
    metaDescription: 'Comprehensive guide on identifying Kala Sarpa Yoga in horoscope, remedial pujas, and pilgrimage kshetras.',
    keywords: ['Kala Sarpa Dosha', 'Rahu Ketu Pooja', 'Sri Kalahasti', 'Dosha Nivarana'],
    status: 'published',
    viewsCount: 5670
  },

  // 10. Divine Bhajans & Kirtanas (bhajans)
  {
    title: "Annamacharya Sankeertanas: 'Brahmam Okkate' Full Lyrics, Meaning & Spiritual Essence",
    titleTelugu: "అన్నమయ్య సంకీర్తన: 'బ్రహ్మమొక్కటే పరబ్రహ్మమొక్కటే' - సంపూర్ణ సాహిత్యం మరియు భావం",
    slug: 'annamacharya-brahmam-okkate-lyrics-spiritual-essence',
    category: 'bhajans',
    excerpt: 'The revolutionary 15th-century masterpiece of Tallapaka Annamacharya declaring universal spiritual equality of all souls.',
    content: "Composed in Bowli Raga, 'Brahmam Okkate' is one of the pinnacle metaphysical songs of Vaishnava devotion. Annamacharya declares that while external bodies, castes, and states of wealth differ, the supreme soul residing within an emperor and a humble pauper is identical.\n\nSinging this song purifies the heart of pride and leads to non-dual devotion at the holy lotus feet of Sri Venkateswara Swamy.",
    devotionalVerse: 'బ్రహ్మమొక్కటే పరబ్రహ్మమొక్కటే పరబ్రహ్మమొక్కటే బ్రహ్మమొక్కటే | తందనాన భళి తందనాన భళె తందనాన భళి తందనానా ||',
    featuredImage: '/images/temple_tirupati.jpg',
    deity: 'Lord Sri Venkateswara Swamy',
    tags: ['Annamacharya', 'Brahmam Okkate', 'Telugu Keerthanalu', 'Bhakti Sangeetam'],
    seoTitle: 'Brahmam Okkate Song Lyrics in Telugu with Meaning - Annamacharya',
    metaDescription: 'Read the full Telugu lyrics and English philosophical meaning of Annamayya famous sankeertana Brahmam Okkate.',
    keywords: ['Brahmam Okkate', 'Annamacharya Sankeertana', 'Tirumala Keerthanalu', 'Telugu Bhajans'],
    status: 'published',
    viewsCount: 6510
  },
  {
    title: "Tyagaraja Kriti: 'Endaro Mahanubhavulu' in Sri Ragam - Sacred Lyrics & Significance",
    titleTelugu: "త్యాగరాజ పంచరత్న కీర్తన: 'ఎందరో మహానుభావులు' - శ్రీరాగ వైభవం మరియు సాహిత్యం",
    slug: 'tyagaraja-endaro-mahanubhavulu-lyrics-significance',
    category: 'bhajans',
    excerpt: 'The fifth and crowning Pancharatna Kriti of Saint Tyagaraja paying homage to all enlightened sages and devotees of Lord Rama.',
    content: "Saint Tyagaraja poured the elixir of pure Bhakti and Nadopasana in Sri Ragam. In 'Endaro Mahanubhavulu', he bows with supreme humility to all saints, seers, and divine beings across past, present, and future who have experienced the nectar of Lord Rama's divine name. Chanting or listening to this kriti removes ego and opens the heart to cosmic music.",
    devotionalVerse: 'ఎందరో మహానుభావులు అందరికీ వందనములు | చందమామ వదనుని యందచందములను హృదయారవిందమున జూచి బ్రహ్మానందమనుభవించు వారెందరో మహానుభావులు ||',
    featuredImage: '/images/vid_venkateswara_real.jpg',
    deity: 'Lord Sri Rama & Devi Sita',
    tags: ['Tyagaraja', 'Pancharatna', 'Carnatic Music', 'Endaro Mahanubhavulu'],
    seoTitle: 'Endaro Mahanubhavulu Lyrics in Telugu - Tyagaraja Pancharatna Kriti',
    metaDescription: 'Full lyrics, raga details, and devotional meaning of Saint Tyagaraja renowned kriti Endaro Mahanubhavulu.',
    keywords: ['Endaro Mahanubhavulu', 'Tyagaraja Kritis', 'Sri Ragam', 'Carnatic Bhajans'],
    status: 'published',
    viewsCount: 4190
  },

  // 11. Spirituality & Dharma (spirituality)
  {
    title: 'Timeless Life Lessons from the Bhagavad Gita for Peace, Clarity & Mental Balance',
    titleTelugu: 'భగవద్గీత నిత్య జీవిత మార్గదర్శనం - మానసిక ప్రశాంతత మరియు కర్మయోగాచరణ',
    slug: 'bhagavad-gita-life-lessons-peace-clarity-dharma',
    category: 'spirituality',
    excerpt: 'How Lord Krishna’s divine teachings to Arjuna on Kurukshetra provide the ultimate blueprint for modern stress management and purposeful living.',
    content: "The Bhagavad Gita is not just a sacred scripture; it is a profound handbook of psychological resilience and spiritual liberation. By practicing Nishkama Karma (performing one's duty with excellence without attachment to results), the mind transcends anxiety and grief.\n\nKrishna’s assurance: 'Perform your action with a steady mind, abandoning attachment and remaining balanced in success and failure. That equanimity is Yoga.'",
    devotionalVerse: 'కర్మణ్యేవాధికారస్తే మా ఫలేషు కదాచన | మా కర్మఫలహేతుర్భూర్మా తే సంగోస్త్వకర్మణి ||',
    featuredImage: '/images/news_gita.jpg',
    deity: 'Lord Sri Krishna Paramatma',
    tags: ['Bhagavad Gita', 'Karma Yoga', 'Spirituality', 'Sanatana Dharma'],
    seoTitle: 'Bhagavad Gita Key Verses & Practical Lessons for Modern Life in Telugu',
    metaDescription: 'Discover how Bhagavad Gita principles of equanimity, detachment, and duty transform modern living.',
    keywords: ['Bhagavad Gita', 'Karma Yoga', 'Dharma', 'Krishna Teachings'],
    status: 'published',
    viewsCount: 7120
  },
  {
    title: 'The Law of Karma and Reincarnation in Sanatana Dharma: Purusharthas Explained',
    titleTelugu: 'కర్మ సిద్ధాంతం మరియు పునర్జన్మ రహస్యాలు - నాలుగు పురుషార్థాల వైశిష్ట్యం',
    slug: 'law-of-karma-reincarnation-sanatana-dharma',
    category: 'spirituality',
    excerpt: 'Understanding Sanchita, Prarabdha, and Agami Karma, and how righteous action leads to the supreme goal of Moksha.',
    content: 'Sanatana Dharma explains that every thought, word, and deed leaves an imprint (Samskara) in the causal sheath. By balancing the four Purusharthas—Dharma (Righteousness), Artha (Wealth), Kama (Desire), and Moksha (Liberation)—a devotee exhausts karmic debts and attains eternal communion with the Divine.',
    devotionalVerse: 'యథా ధేనుసహస్రేషు వత్సో విందతి మాతరమ్ | తథా పూర్వకృతం కర్మ కర్తారమనుగచ్ఛతి ||',
    featuredImage: '/images/buddha_quote.png',
    deity: 'Universal Supreme Consciousness',
    tags: ['Karma Theory', 'Reincarnation', 'Purusharthas', 'Dharma'],
    seoTitle: 'The Law of Karma Explained According to Hindu Scriptures in Telugu',
    metaDescription: 'Detailed explanation of 3 types of Karma, spiritual evolution, and how to transcend past karmas through devotion.',
    keywords: ['Law of Karma', 'Sanatana Dharma', 'Moksha', 'Hindu Philosophy'],
    status: 'published',
    viewsCount: 3890
  },

  // 12. Devotional E-Paper Edition (epaper)
  {
    title: 'Sri Astadasapeetam Dainika Bhakti Patrika: Brahmotsavam Special E-Paper Edition',
    titleTelugu: 'శ్రీ అష్టాదశపీఠం దైనిక భక్తి పత్రిక - బ్రహ్మోత్సవాల ప్రత్యేక ఈ-పేపర్ సంచిక',
    slug: 'astadasapeetam-dainika-bhakti-patrika-brahmotsavam-edition',
    category: 'epaper',
    excerpt: 'Read today’s digital devotional newspaper with exclusive temple updates, panchangam, festival guides, and swamiji pravachanams.',
    content: 'Welcome to Sri Astadasapeetam’s daily e-paper edition. This special publication covers sacred daily happenings across 18 Maha Shakti Peethas and 12 Jyotirlingas.\n\nIncluded inside: Detailed Tithi and Rahukalam charts, Sthala Puranam chronicles, rare Sanskrit stotra translations, and astrological remedies curated by our revered Vedic board.',
    devotionalVerse: 'సత్యం వద • ధర్మం చర • స్వాధ్యాయాన్మా ప్రమదః ||',
    featuredImage: '/images/epaper_thumb.png',
    deity: 'Lord Jagannath & Sri Balaji',
    tags: ['E-Paper', 'Devotional News', 'Astadasapeetam Edition', 'Daily PDF'],
    seoTitle: 'Astadasapeetam Daily Devotional E-Paper Online Reader',
    metaDescription: 'Read the latest edition of Astadasapeetam devotional newspaper featuring daily panchangam, temple rituals, and sacred news.',
    keywords: ['Devotional E-Paper', 'Bhakti Patrika', 'Astadasapeetam PDF', 'Telugu Devotional News'],
    status: 'published',
    viewsCount: 2940
  },

  // 13. Festivals Calendar (festivals)
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
    title: 'Sri Rama Navami Celebrations & Sita Rama Kalyana Mahotsavam Vidhi',
    titleTelugu: 'శ్రీ రామ నవమి - సీతారాముల కళ్యాణ వైభవం మరియు శ్రీరామ తారక మంత్ర పారాయణ',
    slug: 'sri-rama-navami-sita-rama-kalyana-mahotsavam',
    category: 'festivals',
    excerpt: 'Celebrating the divine birth of Maryada Purushottama Lord Sri Rama on Chaitra Shukla Navami and the cosmic celestial wedding.',
    content: 'Sri Rama Navami marks the incarnation of Lord Vishnu as Sri Rama at midday in Abhijit Muhurtham under Punarvasu nakshatra. Across thousands of temples including Bhadrachalam and Ayodhya, devotees perform the celestial Sita Rama Kalyanam.\n\nChanting the sacred Taraka Mantra "Sri Rama Jaya Rama Jaya Jaya Rama" brings protection, righteousness, and harmony to the home.',
    devotionalVerse: 'రామో రాజమణిః సదా విజయతే రామం రమేశం భజే | రామేణాభిహతా నిశాచరచమూ రామాయ తస్మై నమః ||',
    featuredImage: '/images/fest_nirjala.jpg',
    deity: 'Lord Sri Rama & Devi Sita',
    tags: ['Sri Rama Navami', 'Sita Rama Kalyanam', 'Ayodhya', 'Taraka Mantra'],
    seoTitle: 'Sri Rama Navami 2026 Puja Timings & Sita Rama Kalyana Vidhi in Telugu',
    metaDescription: 'Complete Sri Rama Navami celebration rituals, panakam and vadapappu preparation, and Taraka mantra significance.',
    keywords: ['Sri Rama Navami', 'Sita Rama Kalyanam', 'Bhadrachalam', 'Ayodhya Temple'],
    status: 'published',
    viewsCount: 6380
  },

  // 14. Devotional Videos & Pravachanams (videos)
  {
    title: 'Live Darshan & Maha Mangala Aarti from Srisailam Bhramaramba Mallikarjuna Swamy',
    titleTelugu: 'శ్రీశైల భ్రమరాంబ మల్లికార్జున స్వామి మహామంగళ హారతి ప్రత్యక్ష దర్శనం',
    slug: 'srisailam-live-darshan-maha-mangala-aarti',
    category: 'videos',
    excerpt: 'Watch sanctified evening Suprabhatam, Bilvarchana, and grand Mangala Aarti broadcast from the sanctum sanctorum of Srisailam.',
    content: 'Experience the divine presence of Sri Mallikarjuna Swamy and Mother Bhramaramba Devi directly from Srisailam temple. Watch the sacred priests chanting Rudra Namakam Chamakam followed by the traditional camphor Maha Mangala Aarti illuminating the ancient sanctum.',
    devotionalVerse: 'కర్పూర గౌరం కరుణావతారం సంసారసారం భుజగేంద్రహారమ్ | సదావసంతం హృదయారవిందే భవం భవానీసహితం నమామి ||',
    featuredImage: '/images/vid_shiva_real.jpg',
    deity: 'Lord Mallikarjuna & Mother Bhramaramba',
    tags: ['Live Aarti', 'Srisailam Video', 'Maha Mangala Aarti', 'Temple Darshan'],
    seoTitle: 'Srisailam Temple Live Aarti & Darshan Video Online',
    metaDescription: 'Watch official sanctum darshan and evening aarti from Sri Bhramaramba Mallikarjuna temple Srisailam.',
    keywords: ['Srisailam Live Video', 'Temple Aarti', 'Bhakti Videos', 'Shiva Darshan'],
    status: 'published',
    viewsCount: 5210
  },
  {
    title: 'Pravachanam on Devi Mahatmyam: Significance of Chandi Saptashati by Vedic Scholars',
    titleTelugu: 'దేవీ భాగవతం మరియు చండీ సప్తశతి విశిష్టత - ప్రముఖ వేద పండితుల దివ్య ప్రవచనం',
    slug: 'devi-mahatmyam-chandi-saptashati-pravachanam-video',
    category: 'videos',
    excerpt: 'Deep scholarly discourses unraveling the mystical allegories of Mahishasura Mardini and Mother Chandika victorious over ego.',
    content: 'In this spiritually uplifting video pravachanam, learned scholars explain how the 700 verses of Durga Saptashati systematically cleanse the three psychological knots (Brahma, Vishnu, and Rudra Granthis). Watch and learn how to align mind, speech, and action in devotion.',
    devotionalVerse: 'సర్వమంగళ మాంగల్యే శివే సర్వార్థ సాధికే | శరణ్యే త్ర్యంబకే గౌరి నారాయణి నమోస్తు తే ||',
    featuredImage: '/images/vid_venkateswara_real.jpg',
    deity: 'Mother Durga Mahishasura Mardini',
    tags: ['Pravachanam', 'Chandi Saptashati', 'Devi Mahatmyam', 'Spiritual Discourse'],
    seoTitle: 'Devi Mahatmyam Spiritual Pravachanam Video & Commentary',
    metaDescription: 'Enlightening video pravachanam by Vedic scholars explaining the inner secrets of Chandi Saptashati in Telugu.',
    keywords: ['Devi Pravachanam', 'Chandi Homa Video', 'Bhakti Pravachanam', 'Telugu Discourses'],
    status: 'published',
    viewsCount: 3870
  },

  // 15. Gods & Divine Avatars (gods)
  {
    title: 'Mother Mahalakshmi: 8 Divine Forms (Ashta Lakshmi), Iconography & Blessings',
    titleTelugu: 'శ్రీ అష్టలక్ష్మీ దివ్య స్వరూపాలు - ఐశ్వర్య, ధాన్య, విద్య మరియు విజయ ప్రదాయినీ వైభవం',
    slug: 'ashta-lakshmi-8-forms-iconography-blessings',
    category: 'gods',
    excerpt: 'The eight sublime manifestations of Universal Mother Lakshmi bestowing spiritual wisdom, courage, children, grain, and abundance.',
    content: 'Mother Lakshmi manifests in eight cosmic archetypes: Adi Lakshmi (Primordial Grace), Dhanya Lakshmi (Agricultural Nourishment), Dhairya Lakshmi (Courage and Valour), Gaja Lakshmi (Royal Power and Animal Wealth), Santana Lakshmi (Progeny), Vijaya Lakshmi (Victory in Dharma), Vidya Lakshmi (Knowledge and Wisdom), and Dhana Lakshmi (Material Abundance).\n\nWorshipping all eight forms harmonizes all quarters of human life with dharma and saturation.',
    devotionalVerse: 'సుమనస వందిత సుందరి మాధవి చంద్రసహోదరి హేమమయే | మునిగణమండిత మోక్షప్రదాయినీ మంజులభాషిణి వేదనుతే ||',
    featuredImage: '/images/ganesha.png',
    deity: 'Goddess Ashta Lakshmi',
    tags: ['Ashta Lakshmi', 'Goddess Lakshmi', 'Gods and Avatars', 'Iconography'],
    seoTitle: 'Ashta Lakshmi 8 Forms Explained: Significance & Mantras in Telugu',
    metaDescription: 'Detailed spiritual guide to the eight sacred forms of Goddess Lakshmi, weapons, vahanas, and dhyana mantras.',
    keywords: ['Ashta Lakshmi', 'Gods and Avatars', 'Lakshmi Forms', 'Sanatana Dharma Deities'],
    status: 'published',
    viewsCount: 6890
  },
  {
    title: '12 Sacred Jyotirlinga Manifestations of Lord Shiva & Their Cosmic Significance',
    titleTelugu: 'ద్వాదశ జ్యోతిర్లింగ దివ్య క్షేత్రాలు - స్వయంభువ శివ స్వరూపాల దర్శన మహత్యం',
    slug: '12-jyotirlingas-lord-shiva-manifestations-guide',
    category: 'gods',
    excerpt: 'From Somnath in Gujarat to Kashi Vishwanath and Rameswaram, the twelve infinite pillars of radiant light across Bharat.',
    content: 'The Jyotirlingas are self-manifested (Swayambhu) shrines where Lord Shiva pierced the cosmic boundaries as a column of brilliant, borderless light (Lingodbhava). Visiting or remembering these twelve holy shrines frees a devotee from the cycle of rebirth and bestows ultimate peace.',
    devotionalVerse: 'సౌరాష్ట్రే సోమనాథం చ శ్రీశైలే మల్లికార్జునమ్ | ఉజ్జయిన్యాం మహాకాలమోంకారమమలేశ్వరమ్ ||',
    featuredImage: '/images/fest_shiva.png',
    deity: 'Lord Shiva 12 Jyotirlingas',
    tags: ['Jyotirlinga', 'Lord Shiva', 'Gods and Avatars', 'Pilgrimage'],
    seoTitle: '12 Jyotirlingas Name, State, Story & Travel Guide in Telugu',
    metaDescription: 'Complete list of 12 Jyotirlingas with holy locations, sthala puranams, and pilgrimage routes in Telugu.',
    keywords: ['12 Jyotirlingas', 'Lord Shiva Temples', 'Somnath', 'Kashi Vishwanath'],
    status: 'published',
    viewsCount: 7420
  },

  // 16. Teertha Yatralu (yatralu)
  {
    title: 'Tirtha Yatra Mahatmyam: Why Kashi and Rameswaram Complete the Sacred Cycle',
    titleTelugu: 'కాశీ - రామేశ్వరం తీర్థ యాత్ర పరిపూర్ణ ఫలితాలు మరియు సముద్ర స్నాన విధి',
    slug: 'kashi-rameswaram-sacred-yatra-cycle',
    category: 'yatralu',
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
  },
  {
    title: '18 Maha Shakti Peethas Complete Pilgrimage Circuit: Route Map, Sacred Rivers & Darshan Guide',
    titleTelugu: 'అష్టాదశ మహాశక్తిపీఠాల సంపూర్ణ యాత్రా మార్గం - రూట్ మ్యాప్, దర్శన సమయాలు',
    slug: '18-maha-shakti-peethas-complete-pilgrimage-circuit',
    category: 'yatralu',
    excerpt: 'The ultimate sacred circuit covering all eighteen sanctified relic sites across India, Sri Lanka, and adjoining regions.',
    content: 'Embarking on the Ashtadasa Shakti Peetha Yatra is considered one of the highest spiritual achievements for a devotee of the Divine Mother. Starting with Shankari Devi in Sri Lanka, moving across Kanchi Kamakshi, Srisailam Bhramaramba, Alampur Jogulamba, Kolhapur Mahalakshmi, and culminating at Sharada Peetham in Kashmir, this sacred journey covers over 10,000 kilometers of spiritual geography.\n\nThis guide outlines the optimal train and flight circuits, recommended seasons, and VIP darshan facilities for pilgrims.',
    devotionalVerse: 'అష్టాదశసు పీఠేషు దేవీం ధ్యాత్వా విశేషతః | సర్వపాపవినిర్ముక్తో శివసాయుజ్యమాప్నుయాత్ ||',
    featuredImage: '/images/temple_kashi.jpg',
    deity: '18 Maha Shakti Peethas',
    tags: ['18 Shakti Peethas', 'Teertha Yatralu', 'Pilgrimage Circuit', 'Devi Darshan'],
    seoTitle: '18 Maha Shakti Peethas Yatra Route Map & Tour Package Guide in Telugu',
    metaDescription: 'Detailed route plan, budget, duration, and temple details for visiting all 18 Maha Shakti Peethas.',
    keywords: ['18 Shakti Peethas Yatra', 'Teertha Yatralu', 'Shakti Peetha Circuit', 'Pilgrim Packages'],
    status: 'published',
    viewsCount: 8930
  },

  // 17. Daily Panchangam (panchangam)
  {
    title: 'Understanding the Five Limbs of Panchangam: Tithi, Vara, Nakshatra, Yoga, and Karana',
    titleTelugu: 'పంచాంగం విశిష్టత - తిథి, వార, నక్షత్ర, యోగ, కరణాల సమగ్ర శాస్త్రీయ విశ్లేషణ',
    slug: 'understanding-five-limbs-panchangam-tithi-nakshatra',
    category: 'panchangam',
    excerpt: 'How the five limbs of Vedic time synchronization align human bio-rhythms with planetary currents for daily success.',
    content: 'The word Panchangam literally translates to "five limbs" (Pancha + Anga). In Vedic tradition, reviewing the daily Panchangam at sunrise is said to bring fivefold merits: Tithi yields longevity, Vara grants vitality, Nakshatra destroys sins, Yoga cures ailments, and Karana crowns actions with success.\n\nThis article breaks down how to read daily planetary charts and find the most auspicious hora for daily life.',
    devotionalVerse: 'తిథేశ్చ శ్రియమాప్నోతి వారాదాయుష్యవర్ధనమ్ | నక్షత్రాద్ధరతే పాపం యోగాద్రోగనివారణమ్ | కరణాత్కార్యసిద్ధిశ్చ పంచాంగఫలముత్తమమ్ ||',
    featuredImage: '/images/news_tirupati.jpg',
    deity: 'Lord Surya Narayana & Brahma',
    tags: ['Daily Panchangam', 'Vedic Astrology', 'Tithi Nakshatra', 'Auspicious Timings'],
    seoTitle: 'How to Read Daily Panchangam: 5 Limbs Explained in Telugu',
    metaDescription: 'Learn what Tithi, Vara, Nakshatra, Yoga, and Karana mean, and how to use the daily Panchangam for optimal living.',
    keywords: ['Daily Panchangam', 'Tithi Nakshatra', 'Panchangam Guide', 'Telugu Calendar'],
    status: 'published',
    viewsCount: 5310
  },
  {
    title: 'Rahu Kalam & Yamagandam Rules: Navigating Auspicious vs Inauspicious Timings',
    titleTelugu: 'రాహుకాలం & యమగండం నియమాలు - నిత్య జీవితంలో పాటించవలసిన సమయ సూత్రాలు',
    slug: 'rahu-kalam-yamagandam-rules-daily-life',
    category: 'panchangam',
    excerpt: 'The astronomical calculations behind Rahu Kalam each day of the week, and which activities should be avoided or performed.',
    content: 'In daily Hindu practice, the 90-minute window known as Rahu Kalam occurs every day based on the ruling planet of the weekday. Commencing new business ventures, signing contracts, or starting journeys during Rahu Kalam is traditionally avoided.\n\nConversely, performing special Durga Devi pooja or lemon lamp (Nimbu Deepam) worship specifically during Tuesday or Friday Rahu Kalam brings miraculous victory over obstacles.',
    devotionalVerse: 'రాహుః శతృభయహర్తా కేతుః కులవివర్ధనః | ఉభౌ సదా సమృద్ధ్యై మే దేవావావాహయామ్యహమ్ ||',
    featuredImage: '/images/art_akshaya_real.jpg',
    deity: 'Rahu Bhagavan & Mother Durga',
    tags: ['Rahu Kalam', 'Yamagandam', 'Panchangam Rules', 'Auspicious Hours'],
    seoTitle: 'Rahu Kalam Timings & Sunday to Saturday Calculation in Telugu',
    metaDescription: 'Easy way to calculate Rahu Kalam and Yamagandam for each weekday, and significance of Rahu Kalam Durga Pooja.',
    keywords: ['Rahu Kalam', 'Yamagandam', 'Panchangam', 'Durga Pooja Timings'],
    status: 'published',
    viewsCount: 4620
  }
];

async function seedAll() {
  try {
    console.log('Connecting to MongoDB at:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    console.log(`Upserting ${articles.length} sacred publications across all categories...`);

    let inserted = 0;
    let updated = 0;

    for (const art of articles) {
      const res = await Post.findOneAndUpdate(
        { slug: art.slug },
        { $set: art },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      if (res.createdAt.getTime() === res.updatedAt.getTime()) {
        inserted++;
      } else {
        updated++;
      }
    }

    console.log(`Successfully synced! Inserted: ${inserted}, Updated: ${updated}. Total in DB: ${await Post.countDocuments()}`);

    const counts = await Post.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    console.log('Category breakdown in DB:', counts);

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedAll();
