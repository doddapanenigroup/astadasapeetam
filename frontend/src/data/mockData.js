export const headerData = {
  panchangamSummary: "Shukla Paksha Panchami | 23 May, 2026, Friday",
  sunrise: "05:48 AM",
  sunset: "06:40 PM",
  topLinks: [
    { label: "About Us", href: "#" },
    { label: "Write for Us", href: "#" },
    { label: "Astrologers", href: "#" },
    { label: "E-Paper", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  navItems: [
    { label: "Home", href: "/", icon: "Home" },
    { label: "Devotional", href: "#", icon: "Flame" },
    { label: "Gods", href: "/gods", icon: "Sparkles" },
    { label: "Festivals", href: "/festivals", icon: "Calendar" },
    { label: "Astrology", href: "/astrology", icon: "Compass" },
    { label: "Temples", href: "/temples", icon: "Landmark" },
    { label: "Stories", href: "/stories", icon: "BookOpen" },
    { label: "Daily", href: "/slokas", icon: "Clock" },
    { label: "Videos", href: "/videos", icon: "Video" },
    { label: "Yatralu", href: "/yatralu", icon: "Bus" },
    { label: "Marketplace", href: "/marketplace", icon: "ShoppingBag" },
  ]
};

export const exploreCategories = [
  { id: "yatralu", name: "Tirtha Yatralu", desc: "Pilgrim Packages", icon: "Bus", href: "/yatralu", bg: "bg-amber-50", border: "border-amber-200" },
  { id: "sloka", name: "Daily Sloka", desc: "Read Slokas", icon: "ScrollText", href: "/slokas", bg: "bg-amber-50", border: "border-amber-200" },
  { id: "vrathalu", name: "Vrathalu", desc: "Pooja & Vrathas", icon: "Flame", href: "/festivals", bg: "bg-orange-50", border: "border-orange-200" },
  { id: "panchangam", name: "Panchangam", desc: "Daily Calendar", icon: "Calendar", href: "/panchangam", bg: "bg-yellow-50", border: "border-yellow-200" },
  { id: "astrology", name: "Astrology", desc: "Horoscope", icon: "Compass", href: "/astrology", bg: "bg-red-50", border: "border-red-200" },
  { id: "remedies", name: "Remedies", desc: "Solutions", icon: "Sparkles", href: "/astrology", bg: "bg-emerald-50", border: "border-emerald-200" },
  { id: "temples", name: "Temples", desc: "Find Temples", icon: "Landmark", href: "/temples", bg: "bg-amber-50", border: "border-amber-200" },
  { id: "videos", name: "Videos", desc: "Watch Now", icon: "Tv", href: "/videos", bg: "bg-blue-50", border: "border-blue-200" },
  { id: "epaper", name: "E-Paper", desc: "Daily News", icon: "Newspaper", href: "#epaper", bg: "bg-stone-50", border: "border-stone-200" },
  { id: "muhurtham", name: "Muhurtham", desc: "Auspicious Timings", icon: "Hourglass", href: "/panchangam", bg: "bg-orange-50", border: "border-orange-200" },
  { id: "spirituality", name: "Spirituality", desc: "Spiritual Articles", icon: "HeartHandshake", href: "/stories", bg: "bg-rose-50", border: "border-rose-200" },
  { id: "bhajans", name: "Bhajans", desc: "Devotional Bhajans", icon: "Music", href: "/videos", bg: "bg-yellow-50", border: "border-yellow-200" },
  { id: "mantras", name: "Mantras", desc: "Sacred Chants", icon: "BellRing", href: "/slokas", bg: "bg-amber-50", border: "border-amber-200" },
  { id: "stotras", name: "Stotras", desc: "Divine Hymns", icon: "BookOpenText", href: "/slokas", bg: "bg-orange-50", border: "border-orange-200" },
  { id: "yantras", name: "Yantras", desc: "Sacred Yantras", icon: "Hexagon", href: "/gods", bg: "bg-red-50", border: "border-red-200" },
  { id: "horoscope", name: "Horoscope", desc: "Daily Predictions", icon: "Sun", href: "/astrology", bg: "bg-yellow-50", border: "border-yellow-200" },
  { id: "more", name: "More", desc: "Categories", icon: "LayoutGrid", href: "/temples", bg: "bg-stone-100", border: "border-stone-300" }
];

export const devotionalNews = [
  {
    id: 1,
    tag: "TOP NEWS",
    tagColor: "bg-red-600",
    date: "23 May 2026",
    title: "Tirupati Temple Announces Special Darshan for Devotees",
    excerpt: "TTD announces special darshan for Vaikunta Ekadasi. Check dates, timings, and booking details.",
    image: "/images/news_tirupati.jpg",
    readMoreUrl: "#"
  },
  {
    id: 2,
    tag: "SPIRITUALITY",
    tagColor: "bg-amber-600",
    date: "23 May 2026",
    title: "Importance of Rudrabhishekam on Somwar",
    excerpt: "Learn about the significance, procedure and benefits of performing Rudrabhishekam on Mondays.",
    image: "/images/news_rudra.jpg",
    readMoreUrl: "#"
  },
  {
    id: 3,
    tag: "DHARMA",
    tagColor: "bg-orange-600",
    date: "23 May 2026",
    title: "Life Lessons from Bhagavad Gita",
    excerpt: "Timeless wisdom from the Gita to bring peace, clarity and purpose in life.",
    image: "/images/news_gita.jpg",
    readMoreUrl: "#"
  }
];

export const festivalsAndEvents = [
  {
    id: 1,
    day: "27",
    month: "MAY",
    title: "Nirjala Ekadashi 2026",
    excerpt: "Fasting and worship dedicated to Lord Vishnu.",
    image: "/images/fest_nirjala.jpg"
  },
  {
    id: 2,
    day: "06",
    month: "JUN",
    title: "Vat Savitri Vrat 2026",
    excerpt: "A sacred vrat for long life and well-being of husbands.",
    image: "/images/fest_vatsavitri.jpg"
  },
  {
    id: 3,
    day: "10",
    month: "JUN",
    title: "Ganga Dussehra 2026",
    excerpt: "Celebrating the descent of Goddess Ganga on Earth.",
    image: "/images/fest_ganga.jpg"
  }
];

export const popularTemples = [
  {
    id: 1,
    name: "Tirumala Tirupati Temple",
    state: "Andhra Pradesh",
    image: "/images/temple_tirupati.jpg"
  },
  {
    id: 2,
    name: "Kashi Vishwanath Temple",
    state: "Uttar Pradesh",
    image: "/images/temple_kashi.jpg"
  },
  {
    id: 3,
    name: "Rameswaram Temple",
    state: "Tamil Nadu",
    image: "/images/temple_rameswaram.jpg"
  },
  {
    id: 4,
    name: "Jagannath Temple",
    state: "Odisha",
    image: "/images/temple_jagannath.jpg"
  },
  {
    id: 5,
    name: "Srisailam Temple",
    state: "Andhra Pradesh",
    image: "/images/temple_srisailam.jpg"
  }
];

export const dailyPanchangam = {
  tithi: "Shukla Paksha Panchami",
  nakshatra: "Rohini",
  rahukalam: "10:30 AM - 12:00 PM",
  yamagandam: "03:00 PM - 04:30 PM",
  sunrise: "05:48 AM",
  sunset: "06:40 PM"
};

export const latestArticles = [
  {
    id: 1,
    category: "Devotional",
    date: "22 May 2026",
    title: "Powerful Mantras to Remove Negativity From Life",
    excerpt: "Chant these powerful mantras daily to bring peace and positivity.",
    image: "/images/art_mantras_real.jpg"
  },
  {
    id: 2,
    category: "Tradition",
    date: "20 May 2026",
    title: "Significance of Visiting Kashi Vishwanath Temple",
    excerpt: "History, rituals and spiritual importance of this holy temple.",
    image: "/images/art_kashi_real.jpg"
  },
  {
    id: 3,
    category: "Festivals",
    date: "09 May 2026",
    title: "Akshaya Tritiya 2026 - Date, Puja and Importance",
    excerpt: "All you need to know about this auspicious day.",
    image: "/images/art_akshaya_real.jpg"
  }
];

export const latestVideos = [
  {
    id: 1,
    title: "Suprabhatam",
    sub: "Lord Venkateswara",
    image: "/images/vid_venkateswara_real.jpg"
  },
  {
    id: 2,
    title: "Shiva Abhishekam",
    sub: "Powerful Mantra",
    image: "/images/vid_shiva_real.jpg"
  },
  {
    id: 3,
    title: "Hanuman Chalisa",
    sub: "With Lyrics",
    image: "/images/vid_hanuman_real.jpg"
  }
];

export const devotionalProducts = [
  {
    id: 1,
    name: "Rudraksha Mala",
    price: "500",
    rating: "4.7",
    image: "/images/rudraksha.png"
  },
  {
    id: 2,
    name: "Ganesha Idol",
    price: "1,299",
    rating: "4.8",
    image: "/images/ganesha.png"
  },
  {
    id: 3,
    name: "Pooja Kit",
    price: "799",
    rating: "4.6",
    image: "/images/poojakit.png"
  },
  {
    id: 4,
    name: "Shree Yantra",
    price: "899",
    rating: "4.7",
    image: "/images/yantra.png"
  },
  {
    id: 5,
    name: "Spiritual Book",
    price: "200",
    rating: "4.5",
    image: "/images/book.png"
  }
];

export const upcomingFestivalsList = [
  { id: 1, name: "Ugadi", date: "19 March 2026", iconImg: "/images/fest_ugadi.png" },
  { id: 2, name: "Sankranti", date: "14 January 2026", iconImg: "/images/fest_sankranti.png" },
  { id: 3, name: "Diwali", date: "09 Nov 2026", iconImg: "/images/fest_diwali.png" },
  { id: 4, name: "Vinayaka Chavithi", date: "15 Sep 2026", iconImg: "/images/fest_ganesha.png" }
];
