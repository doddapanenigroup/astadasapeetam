// Astadasapeetam Devotional Categories Registry
// Centralized categories store supporting both built-in categories and user-created custom categories with custom slugs

export const BUILTIN_DEVOTIONAL_CATEGORIES = [
  { id: 'temples', slug: 'temples', label: 'Sacred Temples & Peethas', icon: '🏛️', telugu: 'క్షేత్రాలు & పీఠాలు', badge: '18 Peethas', needsImage: true, desc: 'Temple history, darshan timings, sthala puranam, architecture & special sevas' },
  { id: 'yatralu', slug: 'yatralu', label: 'Teertha Yatralu (Pilgrimages)', icon: '🚩', telugu: 'తీర్థయాత్రలు', badge: 'Teertha Yatralu', needsImage: true, desc: 'Sacred pilgrimage circuits, confirmed VIP darshans, day-by-day itinerary & travel guidelines' },
  { id: 'astrology', slug: 'astrology', label: 'Vedic Astrology & Horoscopes', icon: '🔮', telugu: 'జ్యోతిష్యం & జాతక విశ్లేషణ', badge: 'Astrology', needsImage: false, desc: 'Birth charts, planetary gochara, transit predictions and astrological counseling' },
  { id: 'marketplace', slug: 'marketplace', label: 'Temple Marketplace & Pooja Store', icon: '🛍️', telugu: 'భక్తి విక్రయశాల', badge: 'Pooja Store', needsImage: true, desc: '100% Satvik Pooja kits, lab-certified rudrakshas, sacred idols & sanctum prasadam' },
  { id: 'festivals', slug: 'festivals', label: 'Festivals & Vratams', icon: '🪔', telugu: 'పండుగలు & వ్రతాలు', badge: 'Puja Vidhi', needsImage: true, desc: 'Festival articles, history, significance, puja rituals, fasting rules & celebrations' },
  { id: 'festival-calendar', slug: 'festival-calendar', label: 'Festival Calendar (క్యాలెండర్)', icon: '🗓️', telugu: 'పండుగల క్యాలెండర్', badge: 'Tithi & Dates', needsImage: true, desc: 'Hindu Panchangam month-by-month festival calendar, lunar dates, tithis, fasting schedule & muhurtham' },
  { id: 'slokas', slug: 'slokas', label: 'Daily Slokas & Chants', icon: '📜', telugu: 'నిత్య శ్లోకాలు', badge: '3-Way Chants', needsImage: false, desc: 'Sanskrit, Telugu & English phonetic verses with word-by-word meaning & chanting time (No image needed)' },
  { id: 'mantras', slug: 'mantras', label: 'Sacred Mantras & Bija Japa', icon: '🔔', telugu: 'బీజాక్షర మంత్రాలు', badge: '108 Japa', needsImage: false, desc: 'Moola mantras, bija aksharas, 108 japa sankhya & siddhi benefits (No image needed)' },
  { id: 'stotras', slug: 'stotras', label: 'Divine Stotras & Kavachas', icon: '📖', telugu: 'స్తోత్రాలు & కవచాలు', badge: 'Kavachas', needsImage: false, desc: 'Sage/Rishi author, total verses count, full sacred stotra & phala shruti (No image needed)' },
  { id: 'vrathalu', slug: 'vrathalu', label: 'Vrathalu & Pooja Vidhi', icon: '🔥', telugu: 'వ్రతాలు & పూజా విధానం', badge: 'Upavasam', needsImage: true, desc: 'Fasting rules, sacred samagri checklist, step-by-step vidhi & prasadam recipe' },
  { id: 'yantras', slug: 'yantras', label: 'Sacred Yantras & Maha Meru', icon: '💠', telugu: 'యంత్రాలు & మహామేరు', badge: 'Tantra & Meru', needsImage: true, desc: 'Sacred geometry, metal composition, Ishanya placement & prana pratishtha' },
  { id: 'horoscope', slug: 'horoscope', label: 'Daily Horoscope (12 Rasis)', icon: '☀️', telugu: 'రాశి ఫలాలు', badge: '12 Rasis', needsImage: false, desc: 'Moon sign, ruling planet, lucky colors/numbers, predictions & pariharam (No image needed)' },
  { id: 'muhurtham', slug: 'muhurtham', label: 'Shubh Muhurtham & Choghadiya', icon: '⏳', telugu: 'శుభ ముహూర్తాలు', badge: 'Tithi & Lagna', needsImage: false, desc: 'Ceremony occasion, auspicious time window, lagna shuddhi, tithi & rahu kalam (No image needed)' },
  { id: 'remedies', slug: 'remedies', label: 'Remedies & Dosha Nivarana', icon: '✨', telugu: 'దోష నివారణ & ఉపాయాలు', badge: 'Pariharam', needsImage: false, desc: 'Dosha type, symptoms, step-by-step pariharam, fasting days & sacred temples (No image needed)' },
  { id: 'bhajans', slug: 'bhajans', label: 'Divine Bhajans & Kirtanas', icon: '🪕', telugu: 'భజనలు & కీర్తనలు', badge: 'Sangeetam', needsImage: false, desc: 'Composer/Vaggeyakara, raga & tala, full Telugu lyrics, meaning & audio link (No image needed)' },
  { id: 'spirituality', slug: 'spirituality', label: 'Spirituality & Dharma', icon: '🪷', telugu: 'ఆధ్యాత్మికత & ధర్మం', badge: 'Vedanta', needsImage: false, desc: 'Philosophical theme, Sanskrit sutra, commentary & daily devotee sadhana (No image needed)' },
  { id: 'epaper', slug: 'epaper', label: 'Devotional E-Paper Edition', icon: '📰', telugu: 'ఈ-పేపర్ ఎడిషన్', badge: 'Daily PDF', needsImage: true, desc: 'Issue date, edition region, headline, full editorial & PDF download link' },
  { id: 'videos', slug: 'videos', label: 'Devotional Videos & Pravachanams', icon: '📺', telugu: 'భక్తి వీడియోలు', badge: 'Darshan Live', needsImage: false, desc: 'YouTube stream embed, duration, speaker/swamiji & spiritual highlights (Uses video player)' },
  { id: 'gods', slug: 'gods', label: 'Gods & Divine Avatars', icon: '🕉️', telugu: 'దేవతలు & అవతారాలు', badge: 'Iconography', needsImage: true, desc: 'Avatar form, consort, vahana, sacred weapons, iconography & temples' },
  { id: 'panchangam', slug: 'panchangam', label: 'Daily Panchangam', icon: '📅', telugu: 'నిత్య పంచాంగం', badge: 'Panchangam', needsImage: false, desc: 'Tithi, vara, nakshatra, yoga, karana, sunrise/sunset & auspicious timings (No image needed)' }
];

export const DEVOTIONAL_CATEGORIES = BUILTIN_DEVOTIONAL_CATEGORIES;

const STORAGE_KEY = 'astadasapeetam_custom_categories';

/**
 * Loads custom categories from localStorage
 */
export function getCustomCategories() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load custom categories:', e);
    return [];
  }
}

/**
 * Gets all active categories: Builtin + Custom
 */
export function getAllCategories() {
  const custom = getCustomCategories();
  // Merge, avoiding duplicates by id or slug
  const builtinIds = new Set(BUILTIN_DEVOTIONAL_CATEGORIES.map(c => c.id));
  const uniqueCustom = custom.filter(c => !builtinIds.has(c.id));
  return [...BUILTIN_DEVOTIONAL_CATEGORIES, ...uniqueCustom];
}

/**
 * Saves a new custom category with custom slug
 */
export function saveCustomCategory(newCategory) {
  if (typeof window === 'undefined') return false;
  try {
    const existing = getCustomCategories();
    // Validate slug
    const cleanSlug = (newCategory.slug || newCategory.label || 'category')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const categoryItem = {
      id: cleanSlug,
      slug: cleanSlug,
      label: newCategory.label?.trim() || cleanSlug,
      telugu: newCategory.telugu?.trim() || '',
      icon: newCategory.icon?.trim() || '📿',
      badge: newCategory.badge?.trim() || 'Custom Category',
      needsImage: !!newCategory.needsImage,
      desc: newCategory.desc?.trim() || `Devotional publications under ${newCategory.label}`,
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    // Filter out if duplicate slug exists
    const updated = [
      ...existing.filter(c => c.id !== cleanSlug && c.slug !== cleanSlug),
      categoryItem
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch global event so all components react immediately
    window.dispatchEvent(new CustomEvent('categoriesUpdated', { detail: categoryItem }));
    return categoryItem;
  } catch (e) {
    console.error('Failed to save custom category:', e);
    return false;
  }
}

/**
 * Deletes a custom category
 */
export function deleteCustomCategory(categoryId) {
  if (typeof window === 'undefined') return false;
  try {
    const existing = getCustomCategories();
    const updated = existing.filter(c => c.id !== categoryId && c.slug !== categoryId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('categoriesUpdated', { detail: { deletedId: categoryId } }));
    return true;
  } catch (e) {
    console.error('Failed to delete custom category:', e);
    return false;
  }
}
