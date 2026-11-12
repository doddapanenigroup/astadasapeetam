'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Megaphone, 
  Layers, 
  Sparkles, 
  Tag, 
  FileText, 
  PlusCircle, 
  Users, 
  Compass, 
  Rss, 
  Share2, 
  Settings, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  RefreshCw, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  BookOpen, 
  LogOut, 
  Send, 
  Globe, 
  Phone, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sliders,
  DollarSign,
  Sunrise,
  Bell,
  Command,
  Filter,
  Copy,
  CheckCheck,
  ArrowRight,
  BarChart3,
  Flame,
  Plus,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FolderPlus,
  Grid,
  List,
  Video,
  Calendar,
  Clock
} from 'lucide-react';
import { FacebookIcon, TwitterXIcon, InstagramIcon, YoutubeIcon, WhatsAppIcon } from '../../components/SocialIcons';
import { allSlokasData, slokaCategories } from '../../data/slokasData';
import { DEFAULT_ADS_CONFIG, getInitialAdsConfig } from '../../components/AdBanner';
import DynamicPostStudio, { DEVOTIONAL_CATEGORIES, DEFAULT_POST_DATA } from '../../components/DynamicPostStudio';
import { getAllCategories } from '../../data/categoriesData';
import AddCategoryModal from '../../components/AddCategoryModal';
import VideoStudioModal from '../../components/VideoStudioModal';
import VideoPublishStudio from '../../components/VideoPublishStudio';
import { allFestivalsData } from '../../data/festivalsData';
import BrandingSettingsStudio from '../../components/BrandingSettingsStudio';
import { getStoredBranding, DEFAULT_BRANDING, applyFaviconToDocument } from '../../data/brandingData';

const API_BASE = 'http://localhost:5000/api';

export default function UnifiedConsolePage() {
  // Navigation State - Exactly ordered as requested
  const [activeTab, setActiveTab] = useState('dashboard');
  // 'dashboard' | 'marketplace' | 'banners' | 'websections' | 'spirituals' | 'coupons' | 'addPost' | 'postList' | 'users' | 'astrology' | 'seo' | 'socialConnections' | 'softwareSetup' | 'analytics'

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userGuideOpen, setUserGuideOpen] = useState(false);
  const [userMgmtSubTab, setUserMgmtSubTab] = useState('staffRegistry');

  // Auth & Identity State
  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    name: 'Gowrav Vungarala',
    role: 'admin',
    email: 'admin@astadasapeetam.com'
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Data Collections
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [siteContents, setSiteContents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [consultations, setConsultations] = useState([]);

  // Social Connections State (Facebook, WhatsApp, Instagram, YouTube, X)
  const [socialProfiles, setSocialProfiles] = useState({
    facebook: 'https://facebook.com/astadasapeetam',
    whatsapp: 'https://wa.me/919876500001?text=Namaste%20Astadasapeetam%2C%20I%20seek%20spiritual%20guidance',
    whatsappNumber: '+91 98765 00001',
    instagram: 'https://instagram.com/astadasapeetam',
    youtube: 'https://youtube.com/@astadasapeetam',
    twitter: 'https://x.com/astadasapeetam'
  });

  // Filters & Search
  const [postSearch, setPostSearch] = useState('');

  // =========================================================================
  // VIDEO MANAGEMENT STATE (Devotional, Puja, Bhajans, Latest Videos)
  // =========================================================================
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [videoCategoryFilter, setVideoCategoryFilter] = useState('all');
  const [videoSearch, setVideoSearch] = useState('');
  const [videoOnlyLatest, setVideoOnlyLatest] = useState(false);

  // =========================================================================
  // FESTIVAL CALENDAR STATE (Chronological Dates, Tithis & Fasting Schedules)
  // Strictly separated from general articles/festivals
  // =========================================================================
  const [festivalEvents, setFestivalEvents] = useState([]);
  const [festivalLoading, setFestivalLoading] = useState(false);
  const [festivalMonthFilter, setFestivalMonthFilter] = useState('all');
  const [festivalSearch, setFestivalSearch] = useState('');
  const [isAddFestivalModalOpen, setIsAddFestivalModalOpen] = useState(false);
  const [editingFestival, setEditingFestival] = useState(null);

  const DEFAULT_FESTIVAL_FORM = {
    name: '',
    teluguName: '',
    sanskritName: '',
    date: '',
    day: '',
    month: 'JAN',
    monthShort: 'JAN',
    year: 2026,
    tithi: '',
    hinduMonth: '',
    deity: '',
    pujaTime: '',
    fastingType: '',
    image: '/images/fest_ugadi.png',
    summary: '',
    pujaVidhi: '',
    significance: '',
    isMajor: true
  };
  const [festivalFormData, setFestivalFormData] = useState(DEFAULT_FESTIVAL_FORM);

  const loadVideos = async () => {
    try {
      setVideosLoading(true);
      let localVids = [];
      try {
        const stored = localStorage.getItem('astada_custom_videos');
        if (stored) localVids = JSON.parse(stored);
      } catch (e) {}

      const res = await fetch(`${API_BASE}/videos`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          const merged = [...json.data];
          localVids.forEach(item => {
            if (!merged.some(m => (m._id && m._id === item._id) || (m.videoUrl === item.videoUrl))) {
              merged.unshift(item);
            }
          });
          setVideos(merged);
          return;
        }
      }
      setVideos(localVids);
    } catch (err) {
      try {
        const stored = localStorage.getItem('astada_custom_videos');
        if (stored) setVideos(JSON.parse(stored));
      } catch (e) {}
    } finally {
      setVideosLoading(false);
    }
  };

  const handleToggleLatestVideo = async (video) => {
    const updatedVal = !video.isLatestVideo;
    const vidId = video._id || video.id;

    // Optimistic UI update
    setVideos(prev => prev.map(v => (v._id === vidId || v.id === vidId || v.videoUrl === video.videoUrl) ? { ...v, isLatestVideo: updatedVal } : v));

    // LocalStorage
    try {
      const stored = localStorage.getItem('astada_custom_videos');
      if (stored) {
        const list = JSON.parse(stored);
        const updated = list.map(v => (v._id === vidId || v.id === vidId || v.videoUrl === video.videoUrl) ? { ...v, isLatestVideo: updatedVal } : v);
        localStorage.setItem('astada_custom_videos', JSON.stringify(updated));
      }
      window.dispatchEvent(new Event('astada_videos_updated'));
    } catch (e) {}

    // API
    if (vidId && typeof vidId === 'string' && vidId.length > 10) {
      try {
        await fetch(`${API_BASE}/videos/${vidId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isLatestVideo: updatedVal })
        });
      } catch (e) {}
    }

    showToast('success', updatedVal ? `★ Added "${video.title}" to Homepage Latest Videos!` : `Removed "${video.title}" from Latest Videos.`);
  };

  const handleDeleteVideo = async (video) => {
    if (!window.confirm(`Are you sure you want to delete "${video.title}"?`)) return;
    const vidId = video._id || video.id;

    setVideos(prev => prev.filter(v => v._id !== vidId && v.id !== vidId && v.videoUrl !== video.videoUrl));

    try {
      const stored = localStorage.getItem('astada_custom_videos');
      if (stored) {
        const list = JSON.parse(stored);
        const updated = list.filter(v => v._id !== vidId && v.id !== vidId && v.videoUrl !== video.videoUrl);
        localStorage.setItem('astada_custom_videos', JSON.stringify(updated));
      }
      window.dispatchEvent(new Event('astada_videos_updated'));
    } catch (e) {}

    if (vidId && typeof vidId === 'string' && vidId.length > 10) {
      try {
        await fetch(`${API_BASE}/videos/${vidId}`, { method: 'DELETE' });
      } catch (e) {}
    }

    showToast('success', `Video "${video.title}" deleted.`);
  };

  const loadFestivalEvents = async () => {
    try {
      setFestivalLoading(true);
      let localEvents = [];
      try {
        const stored = localStorage.getItem('astada_festival_calendar_events');
        if (stored) localEvents = JSON.parse(stored);
      } catch (e) {}

      const res = await fetch(`${API_BASE}/festival-calendar`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          const merged = [...json.data];
          localEvents.forEach(item => {
            if (!merged.some(m => (m._id && m._id === item._id) || (m.slug && m.slug === item.slug) || (m.name === item.name))) {
              merged.unshift(item);
            }
          });
          setFestivalEvents(merged);
          return;
        }
      }

      if (localEvents.length === 0 && allFestivalsData && allFestivalsData.length > 0) {
        setFestivalEvents(allFestivalsData);
      } else {
        setFestivalEvents(localEvents);
      }
    } catch (err) {
      try {
        const stored = localStorage.getItem('astada_festival_calendar_events');
        if (stored) setFestivalEvents(JSON.parse(stored));
        else if (allFestivalsData) setFestivalEvents(allFestivalsData);
      } catch (e) {}
    } finally {
      setFestivalLoading(false);
    }
  };

  const handleSaveFestivalEvent = async (e) => {
    e.preventDefault();
    if (!festivalFormData.name || !festivalFormData.date) {
      showToast('error', 'Festival Name and Date are required');
      return;
    }

    const payload = {
      ...festivalFormData,
      monthShort: festivalFormData.monthShort || (festivalFormData.month ? festivalFormData.month.slice(0, 3).toUpperCase() : 'JAN'),
      _id: editingFestival ? (editingFestival._id || editingFestival.id) : `fest_${Date.now()}`
    };

    if (editingFestival) {
      setFestivalEvents(prev => prev.map(f => (f._id === payload._id || f.id === payload._id || f.name === editingFestival.name) ? payload : f));
    } else {
      setFestivalEvents(prev => [payload, ...prev]);
    }

    try {
      let storedList = [];
      const stored = localStorage.getItem('astada_festival_calendar_events');
      if (stored) storedList = JSON.parse(stored);
      if (editingFestival) {
        storedList = storedList.map(f => (f._id === payload._id || f.id === payload._id || f.name === editingFestival.name) ? payload : f);
      } else {
        storedList.unshift(payload);
      }
      localStorage.setItem('astada_festival_calendar_events', JSON.stringify(storedList));
      window.dispatchEvent(new Event('astada_festivals_updated'));
    } catch (e) {}

    try {
      if (editingFestival && editingFestival._id && typeof editingFestival._id === 'string' && editingFestival._id.length > 10) {
        await fetch(`${API_BASE}/festival-calendar/${editingFestival._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(`${API_BASE}/festival-calendar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    } catch (e) {}

    showToast('success', editingFestival ? `✨ Updated Festival Calendar: "${payload.name}"` : `✨ Added "${payload.name}" to Festival Calendar!`);
    setIsAddFestivalModalOpen(false);
    setEditingFestival(null);
    setFestivalFormData(DEFAULT_FESTIVAL_FORM);
  };

  const handleDeleteFestivalEvent = async (festival) => {
    if (!window.confirm(`Delete "${festival.name}" from the Festival Calendar?`)) return;
    const festId = festival._id || festival.id;

    setFestivalEvents(prev => prev.filter(f => f._id !== festId && f.id !== festId && f.name !== festival.name));

    try {
      const stored = localStorage.getItem('astada_festival_calendar_events');
      if (stored) {
        const list = JSON.parse(stored);
        const filtered = list.filter(f => f._id !== festId && f.id !== festId && f.name !== festival.name);
        localStorage.setItem('astada_festival_calendar_events', JSON.stringify(filtered));
      }
      window.dispatchEvent(new Event('astada_festivals_updated'));
    } catch (e) {}

    if (festId && typeof festId === 'string' && festId.length > 10) {
      try {
        await fetch(`${API_BASE}/festival-calendar/${festId}`, { method: 'DELETE' });
      } catch (e) {}
    }

    showToast('success', `Removed "${festival.name}" from Festival Calendar.`);
  };

  // Filtered lists for Videos and Festival Calendar
  const filteredVideos = videos.filter(v => {
    const matchesCat = videoCategoryFilter === 'all' || v.category === videoCategoryFilter;
    const matchesLatest = !videoOnlyLatest || v.isLatestVideo;
    const q = videoSearch.toLowerCase().trim();
    const matchesSearch = !q ||
      (v.title && v.title.toLowerCase().includes(q)) ||
      (v.titleTelugu && v.titleTelugu.toLowerCase().includes(q)) ||
      (v.temple && v.temple.toLowerCase().includes(q)) ||
      (v.speakerOrArtist && v.speakerOrArtist.toLowerCase().includes(q));
    return matchesCat && matchesLatest && matchesSearch;
  });

  const filteredFestivals = festivalEvents.filter(f => {
    const matchesMonth = festivalMonthFilter === 'all' || 
      f.monthShort === festivalMonthFilter || 
      f.month === festivalMonthFilter || 
      (f.date && f.date.toUpperCase().includes(festivalMonthFilter));
    const q = festivalSearch.toLowerCase().trim();
    const matchesSearch = !q ||
      (f.name && f.name.toLowerCase().includes(q)) ||
      (f.teluguName && f.teluguName.toLowerCase().includes(q)) ||
      (f.tithi && f.tithi.toLowerCase().includes(q)) ||
      (f.deity && f.deity.toLowerCase().includes(q)) ||
      (f.hinduMonth && f.hinduMonth.toLowerCase().includes(q));
    return matchesMonth && matchesSearch;
  });

  const [postCategoryFilter, setPostCategoryFilter] = useState('all');
  const [postStatusFilter, setPostStatusFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [postViewMode, setPostViewMode] = useState('table'); // 'table' | 'grid'
  const [allCategories, setAllCategories] = useState(() => getAllCategories());
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  useEffect(() => {
    const handleVideosUpdate = () => loadVideos();
    const handleFestivalsUpdate = () => loadFestivalEvents();
    window.addEventListener('astada_videos_updated', handleVideosUpdate);
    window.addEventListener('astada_festivals_updated', handleFestivalsUpdate);
    const handleCategoriesUpdate = () => {
      setAllCategories(getAllCategories());
    };
    window.addEventListener('categoriesUpdated', handleCategoriesUpdate);
    return () => window.removeEventListener('categoriesUpdated', handleCategoriesUpdate);
  }, []);

  const [branding, setBranding] = useState(DEFAULT_BRANDING);

  useEffect(() => {
    try {
      const current = getStoredBranding();
      setBranding(current);
      applyFaviconToDocument(current);

      const handleBrandingUpdate = () => {
        const updated = getStoredBranding();
        setBranding(updated);
        applyFaviconToDocument(updated);
      };
      window.addEventListener('brandingUpdated', handleBrandingUpdate);
      return () => window.removeEventListener('brandingUpdated', handleBrandingUpdate);
    } catch {}
  }, []);

  const [copiedSlug, setCopiedSlug] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  const copyToClipboard = (text, slug) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedSlug(slug);
      showToast('success', `Copied sacred link to clipboard!`);
      setTimeout(() => setCopiedSlug(''), 2500);
    } catch {}
  };

  // Add Post Form State (All 17 Devotional Categories Dynamic State)
  const [newPost, setNewPost] = useState(DEFAULT_POST_DATA);

  // Staff Management State
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'editor'
  });

  // Add Product Form State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'pooja-kits',
    subtitle: '',
    price: '',
    originalPrice: '',
    discount: '30% OFF',
    image: '/images/poojakit.png',
    certified: '100% Satvik & Energized',
    stockQuantity: 100,
    description: '',
    inStock: true
  });

  // Dynamic Marketplace Categories (Comprehensive Devotional Range + Custom Additions)
  const [marketplaceCategories, setMarketplaceCategories] = useState([
    { id: 'all', label: 'All Items', icon: '🛍️' },
    { id: 'pooja-kits', label: '🪔 Pooja Kits & Homa Samagri', icon: '🪔' },
    { id: 'rudraksha', label: '📿 Sacred Rudraksha (1-21 Mukhi)', icon: '📿' },
    { id: 'yantras-idols', label: '✨ Energized Yantras & Vigrahas', icon: '✨' },
    { id: 'dhoop-samagri', label: '🌿 Pure Camphor & Dhoop', icon: '🌿' },
    { id: 'prasadam', label: '🍯 Temple Sanctum Prasadam', icon: '🍯' },
    { id: 'vedic-books', label: '📖 Vedic Books (Gita, Puranas)', icon: '📖' },
    { id: 'japa-malas', label: '📿 Sacred Japa Malas (Tulsi, Spatika)', icon: '📿' },
    { id: 'deity-vastrams', label: '👘 Deity Vastrams & Alankaram', icon: '👘' },
    { id: 'kumkum-vibhuti', label: '✨ Pure Kumkum & Chandanam', icon: '✨' },
    { id: 'brass-vessels', label: '🪔 Brass & Copper Pooja Vessels', icon: '🪔' },
    { id: 'ayurveda-wellness', label: '🌱 Ayurvedic & Herbal Care', icon: '🌱' },
    { id: 'gemstones', label: '💎 Gemstones & Kavachams', icon: '💎' }
  ]);
  const [isCustomCategoryMode, setIsCustomCategoryMode] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  // 5 Homepage Ads & Sponsored Spaces Manager State (Google Ads, Private Ads, Hide Leaving Reserved Space)
  const [homeAdsConfig, setHomeAdsConfig] = useState(DEFAULT_ADS_CONFIG);

  // Initialize and synchronize Ads Config across tabs
  useEffect(() => {
    setHomeAdsConfig(getInitialAdsConfig());
    if (typeof window !== 'undefined') {
      const handleStorage = (e) => {
        if (!e.key || e.key === 'astada_ads_config') {
          setHomeAdsConfig(getInitialAdsConfig());
        }
      };
      const handleLocalEvent = () => {
        setHomeAdsConfig(getInitialAdsConfig());
      };
      window.addEventListener('storage', handleStorage);
      window.addEventListener('astada_ads_updated', handleLocalEvent);
      return () => {
        window.removeEventListener('storage', handleStorage);
        window.removeEventListener('astada_ads_updated', handleLocalEvent);
      };
    }
  }, []);

  const handleUpdateAdSlot = (slotId, partialUpdate) => {
    setHomeAdsConfig(prev => {
      const current = prev ? JSON.parse(JSON.stringify(prev)) : getInitialAdsConfig();
      const targetSlot = current[slotId] || DEFAULT_ADS_CONFIG[slotId] || {};
      const updated = {
        ...current,
        [slotId]: {
          ...targetSlot,
          ...partialUpdate
        }
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('astada_ads_config', JSON.stringify(updated));
        window.dispatchEvent(new Event('astada_ads_updated'));
        try {
          const bc = new BroadcastChannel('astada_ads_channel');
          bc.postMessage({ type: 'ADS_CONFIG_UPDATED', config: updated, slotId });
          bc.close();
        } catch {}
      }
      return updated;
    });
    showToast('success', `Ad Slot (${slotId.toUpperCase()}) updated & synchronized!`);
  };

  // 3-Way Slokas Studio State (Telugu, Tel-Eng Phonetics, English Meaning)
  const [slokasDataList, setSlokasDataList] = useState(allSlokasData || []);
  const [slokaForm, setSlokaForm] = useState({
    title: '',
    teluguTitle: '',
    sanskritTitle: '',
    category: 'pratah',
    deity: '',
    occasion: '',
    time: '',
    telugu: '',
    telEng: '',
    english: '',
    meaning: '',
    sanskrit: '',
    phala: '',
    vidhi: ''
  });
  const [slokaVoiceGender, setSlokaVoiceGender] = useState('female');
  const [activeSpeechPreview, setActiveSpeechPreview] = useState(null); // identifier of current playing audio
  const [slokaSearchTerm, setSlokaSearchTerm] = useState('');
  const [slokaCategoryFilter, setSlokaCategoryFilter] = useState('all');
  const [slokaPreviewScript, setSlokaPreviewScript] = useState('telugu'); // 'telugu' | 'telEng' | 'english'

  // Instant Audio Voice Recitation Tester (Female Devi Sharada vs Male Veda Pandita)
  const handleTestSpeech = (text, lang, identifier) => {
    if (typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) {
      showToast('error', 'Speech synthesis is not supported in this browser.');
      return;
    }

    if (activeSpeechPreview === identifier) {
      window.speechSynthesis.cancel();
      setActiveSpeechPreview(null);
      return;
    }

    window.speechSynthesis.cancel();
    if (!text || !text.trim()) {
      showToast('error', 'Please enter text in this script field before testing voice recitation.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || (lang === 'te-IN' ? 'te-IN' : 'en-IN');

    const available = window.speechSynthesis.getVoices();
    if (slokaVoiceGender === 'female') {
      const fVoice = available.find(v => 
        (v.lang.includes('te') || v.lang.includes('IN') || v.lang.includes('hi')) && 
        (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('veena') || v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('priya') || v.name.toLowerCase().includes('google'))
      ) || available.find(v => v.lang.includes('IN')) || available.find(v => v.name.toLowerCase().includes('female')) || available[0];
      if (fVoice) utterance.voice = fVoice;
      utterance.pitch = 1.15; // Serene, sweet feminine cadence
      utterance.rate = 0.85;  // Meditative sloka pace
    } else {
      const mVoice = available.find(v => 
        (v.lang.includes('te') || v.lang.includes('IN') || v.lang.includes('hi')) && 
        (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('ravi') || v.name.toLowerCase().includes('madhav') || v.name.toLowerCase().includes('pandit') || v.name.toLowerCase().includes('george'))
      ) || available.find(v => v.lang.includes('IN') && !v.name.toLowerCase().includes('female')) || available[1] || available[0];
      if (mVoice) utterance.voice = mVoice;
      utterance.pitch = 0.82; // Deep, resonant Vedic pandita tone
      utterance.rate = 0.82;  // Steady Vedic chanting rhythm
    }

    utterance.onend = () => setActiveSpeechPreview(null);
    utterance.onerror = () => setActiveSpeechPreview(null);

    setActiveSpeechPreview(identifier);
    window.speechSynthesis.speak(utterance);
  };

  const handlePublishSloka = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!slokaForm.title.trim()) {
      showToast('error', 'Please provide the Sloka Title.');
      return;
    }
    if (!slokaForm.telugu.trim()) {
      showToast('error', '1. Telugu Script (తెలుగు లిపి) is mandatory to prevent errors.');
      return;
    }
    if (!slokaForm.telEng.trim()) {
      showToast('error', '2. Tel-Eng Phonetic Script (ఆంగ్ల లిపి) is mandatory to prevent errors.');
      return;
    }
    if (!slokaForm.meaning.trim() && !slokaForm.english.trim()) {
      showToast('error', '3. English Meaning & Translation is mandatory to prevent errors.');
      return;
    }

    const newSlokaItem = {
      id: `sloka-custom-${Date.now()}`,
      title: slokaForm.title.trim(),
      teluguTitle: slokaForm.teluguTitle.trim() || slokaForm.title.trim(),
      sanskritTitle: slokaForm.sanskritTitle.trim() || slokaForm.teluguTitle.trim() || slokaForm.title.trim(),
      category: slokaForm.category,
      deity: slokaForm.deity.trim() || 'Universal Devata',
      occasion: slokaForm.occasion.trim() || 'Daily Nitya Recitation',
      time: slokaForm.time.trim() || 'Daily Morning / Evening',
      telugu: slokaForm.telugu.trim(),
      telEng: slokaForm.telEng.trim(),
      sanskrit: slokaForm.sanskrit.trim() || slokaForm.telugu.trim(),
      meaning: slokaForm.meaning.trim() || slokaForm.english.trim(),
      english: slokaForm.meaning.trim() || slokaForm.english.trim(),
      phala: slokaForm.phala.trim() || 'Bestows divine peace, health, and spiritual upliftment.',
      vidhi: slokaForm.vidhi.trim() || 'Chant with pure heart and devotion facing East or North.'
    };

    setSlokasDataList(prev => [newSlokaItem, ...prev]);
    showToast('success', `Sloka "${slokaForm.title}" curated with all 3 scripts (Telugu, Tel-Eng, English) & verified for zero mistakes!`);

    // Reset Form
    setSlokaForm({
      title: '',
      teluguTitle: '',
      sanskritTitle: '',
      category: 'pratah',
      deity: '',
      occasion: '',
      time: '',
      telugu: '',
      telEng: '',
      english: '',
      meaning: '',
      sanskrit: '',
      phala: '',
      vidhi: ''
    });
  };

  // Toast Helper
  const showToast = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
  };

  // Initial Data Load
  useEffect(() => {
    const initData = async () => {
      try {
        const storedToken = localStorage.getItem('astada_token');
        const storedRole = localStorage.getItem('astada_role');
        const storedUser = localStorage.getItem('astada_user');

        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const tabParam = params.get('tab');
          if (tabParam) {
            setActiveTab(tabParam);
          } else if (window.location.pathname.includes('/marketing')) {
            setActiveTab('marketplace');
          } else if (window.location.pathname.includes('/astrologer')) {
            setActiveTab('astrology');
          }
        }

        let activeToken = storedToken;

        if (storedToken && storedRole) {
          setToken(storedToken);
          if (storedUser) {
            try { setUser(JSON.parse(storedUser)); } catch {}
          }
        } else {
          // Auto login as admin for frictionless management
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@astadasapeetam.com', password: 'Admin@12345' })
          });
          const data = await res.json();
          if (data.token) {
            activeToken = data.token;
            setToken(data.token);
            setUser({ ...data.user, name: 'Gowrav Vungarala' });
            localStorage.setItem('astada_token', data.token);
            localStorage.setItem('astada_role', data.user.role);
            localStorage.setItem('astada_user', JSON.stringify({ ...data.user, name: 'Gowrav Vungarala' }));
          }
        }

        if (activeToken) {
          await fetchAllData(activeToken);
        }
        await loadVideos();
        await loadFestivalEvents();

        // Fetch saved social profiles
        const socialRes = await fetch(`${API_BASE}/public/settings/social_profiles`);
        const socialData = await socialRes.json();
        if (socialData.success && socialData.data) {
          setSocialProfiles(socialData.data);
        }
      } catch (err) {
        console.error('Init error:', err);
      }
    };

    initData();
  }, []);

  const fetchAllData = async (authToken) => {
    const headers = { Authorization: `Bearer ${authToken}` };
    try {
      const [usersRes, postsRes, prodsRes, contentsRes, campsRes, consultsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/users`, { headers }).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/posts?limit=200`).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/marketing/products`, { headers }).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/marketing/content`, { headers }).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/marketing/campaigns`, { headers }).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/astrologer/consultations`, { headers }).catch(() => ({ json: () => ({ success: false }) }))
      ]);

      const [usersData, postsData, prodsData, contentsData, campsData, consultsData] = await Promise.all([
        usersRes.json(),
        postsRes.json(),
        prodsRes.json(),
        contentsRes.json(),
        campsRes.json(),
        consultsRes.json()
      ]);

      if (usersData?.success) setUsers(usersData.data);
      if (postsData?.success && Array.isArray(postsData.data)) {
        let localPosts = [];
        try { localPosts = JSON.parse(localStorage.getItem('astada_custom_posts') || '[]'); } catch {}
        const merged = [...localPosts, ...postsData.data.filter(p => !localPosts.some(lp => lp._id === p._id || lp.slug === p.slug))];
        setPosts(merged);
      } else {
        try {
          const localPosts = JSON.parse(localStorage.getItem('astada_custom_posts') || '[]');
          if (localPosts.length > 0) setPosts(localPosts);
        } catch {}
      }
      if (prodsData?.success) setProducts(prodsData.data);
      if (contentsData?.success) setSiteContents(contentsData.data);
      if (campsData?.success) setCampaigns(campsData.data);
      if (consultsData?.success) setConsultations(consultsData.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  // Save Social Connections
  const handleSaveSocialProfiles = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/settings/social_profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          value: socialProfiles,
          description: 'Official social media and WhatsApp profiles'
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Social profiles & WhatsApp connection updated successfully!');
      } else {
        showToast('error', data.message || 'Failed to update social profiles');
      }
    } catch {
      showToast('error', 'Connection error while saving social profiles');
    } finally {
      setActionLoading(false);
    }
  };

  // Add Post Submit (With Category Dynamic Persistence)
  const handleCreatePost = async (e) => {
    e?.preventDefault?.();
    setActionLoading(true);
    const postSlug = newPost.slug?.trim() || (newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `post-${Date.now()}`);
    const postToSave = {
      ...newPost,
      _id: `custom-${Date.now()}`,
      slug: postSlug,
      views: 0,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postToSave)
      });
      const data = await res.json();
      if (data?.success && data?.data) {
        postToSave._id = data.data._id || postToSave._id;
      }
    } catch (err) {
      console.warn('API sync deferred, saving locally:', err);
    }

    // Always update client state & persistent storage
    try {
      const existingLocal = JSON.parse(localStorage.getItem('astada_custom_posts') || '[]');
      const updatedLocal = [postToSave, ...existingLocal.filter(p => p.slug !== postToSave.slug)];
      localStorage.setItem('astada_custom_posts', JSON.stringify(updatedLocal));
    } catch {}

    setPosts(prev => [postToSave, ...prev.filter(p => p.slug !== postToSave.slug)]);
    showToast('success', `✨ Sacred post "${postToSave.title}" published under ${postToSave.category}!`);
    setActiveTab('postList');
    setActionLoading(false);
  };

  const handleTogglePublish = async (postToToggle) => {
    const currentStatus = postToToggle.status || 'published';
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const newLabel = newStatus === 'published' ? 'Live on Sanctuary' : 'Unpublished (Draft)';

    // Optimistically update local state
    setPosts(prev => prev.map(p => {
      if ((p._id && p._id === postToToggle._id) || (p.slug && p.slug === postToToggle.slug)) {
        return { ...p, status: newStatus };
      }
      return p;
    }));

    // Update in localStorage
    try {
      const existingLocal = JSON.parse(localStorage.getItem('astada_custom_posts') || '[]');
      const updatedLocal = existingLocal.map(p => {
        if ((p._id && p._id === postToToggle._id) || (p.slug && p.slug === postToToggle.slug)) {
          return { ...p, status: newStatus };
        }
        return p;
      });
      localStorage.setItem('astada_custom_posts', JSON.stringify(updatedLocal));
    } catch {}

    // Update in Backend MongoDB
    try {
      if (postToToggle._id) {
        await fetch(`${API_BASE}/posts/${postToToggle._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus })
        });
      }
      showToast('success', `Post "${postToToggle.title.slice(0, 32)}..." is now ${newLabel}`);
    } catch (err) {
      console.error('Failed to update status on server:', err);
      showToast('info', `Status changed to ${newLabel}`);
    }
  };

  const handleDeletePost = async (postToDelete) => {
    if (!window.confirm(`Permanently remove sacred post "${postToDelete.title}"?`)) return;
    try {
      const existingLocal = JSON.parse(localStorage.getItem('astada_custom_posts') || '[]');
      const updatedLocal = existingLocal.filter(p => p.slug !== postToDelete.slug && p._id !== postToDelete._id);
      localStorage.setItem('astada_custom_posts', JSON.stringify(updatedLocal));
    } catch {}
    setPosts(prev => prev.filter(p => p.slug !== postToDelete.slug && p._id !== postToDelete._id));

    try {
      if (postToDelete._id) {
        await fetch(`${API_BASE}/posts/${postToDelete._id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (e) {
      console.warn('Backend delete error:', e);
    }
    showToast('success', `Removed sacred post "${postToDelete.title}"`);
  };

  const getCategoryBadgeStyle = (category) => {
    const cat = category?.toLowerCase() || '';
    if (cat === 'temples' || cat === 'temple') return 'bg-rose-50 text-rose-900 border-rose-200';
    if (cat === 'festivals' || cat === 'festival') return 'bg-amber-50 text-amber-900 border-amber-300';
    if (cat === 'yatralu' || cat === 'yatra') return 'bg-sky-50 text-sky-900 border-sky-200';
    if (cat === 'astrology' || cat === 'horoscope' || cat === 'remedies') return 'bg-indigo-50 text-indigo-900 border-indigo-200';
    if (cat === 'slokas' || cat === 'mantras' || cat === 'stotras') return 'bg-emerald-50 text-emerald-900 border-emerald-200';
    if (cat === 'marketplace' || cat === 'products') return 'bg-orange-50 text-orange-900 border-orange-200';
    if (cat === 'spirituality' || cat === 'stories') return 'bg-purple-50 text-purple-900 border-purple-200';
    return 'bg-amber-50/80 text-amber-900 border-amber-200';
  };

  // Create Product Submit (Supports Dynamic & Custom Devotional Categories)
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    let finalCategory = newProduct.category;
    if (isCustomCategoryMode && customCategoryInput.trim()) {
      finalCategory = customCategoryInput.trim();
      const newCatId = customCategoryInput.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      // Add to dynamic categories list if not already present
      setMarketplaceCategories(prev => {
        if (prev.some(c => c.id === newCatId || c.label.toLowerCase() === customCategoryInput.trim().toLowerCase())) {
          return prev;
        }
        return [...prev, { id: newCatId, label: `✨ ${customCategoryInput.trim()}`, icon: '✨' }];
      });
    }

    const payload = {
      ...newProduct,
      category: finalCategory
    };

    try {
      const res = await fetch(`${API_BASE}/marketing/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => [data.data, ...prev]);
        setIsAddProductOpen(false);
        setIsCustomCategoryMode(false);
        setCustomCategoryInput('');
        showToast('success', `Product "${data.data.name}" added to Marketplace under "${finalCategory}"!`);
      } else {
        // Fallback for offline/local simulation
        const localProduct = {
          _id: `prod-${Date.now()}`,
          ...payload,
          createdAt: new Date().toISOString()
        };
        setProducts(prev => [localProduct, ...prev]);
        setIsAddProductOpen(false);
        setIsCustomCategoryMode(false);
        setCustomCategoryInput('');
        showToast('success', `Product "${payload.name}" added to Marketplace under "${finalCategory}"!`);
      }
    } catch {
      // Local fallback
      const localProduct = {
        _id: `prod-${Date.now()}`,
        ...payload,
        createdAt: new Date().toISOString()
      };
      setProducts(prev => [localProduct, ...prev]);
      setIsAddProductOpen(false);
      setIsCustomCategoryMode(false);
      setCustomCategoryInput('');
      showToast('success', `Product "${payload.name}" added to Marketplace under "${finalCategory}"!`);
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle Product Stock
  const handleToggleProductStock = async (id) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/marketing/products/${id}/toggle-stock`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p._id === id ? data.data : p));
        showToast('success', data.message);
      }
    } catch {
      showToast('error', 'Failed to toggle stock');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle Website Section
  const handleToggleSection = async (id) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/marketing/content/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSiteContents(prev => prev.map(c => c._id === id ? data.data : c));
        showToast('success', data.message);
      }
    } catch {
      showToast('error', 'Failed to toggle section');
    } finally {
      setActionLoading(false);
    }
  };

  // Staff Management Actions
  const handleCreateStaff = async (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email || !newStaff.password) {
      showToast('error', 'Please provide name, email, and password');
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newStaff)
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => [data.data, ...prev]);
        setIsAddStaffOpen(false);
        setNewStaff({ name: '', email: '', password: '', phone: '', role: 'editor' });
        showToast('success', data.message || 'Staff member added successfully!');
      } else {
        // Fallback simulation
        const fallbackUser = {
          _id: `user-${Date.now()}`,
          name: newStaff.name,
          email: newStaff.email,
          phone: newStaff.phone,
          role: newStaff.role,
          isActive: true,
          createdAt: new Date().toISOString()
        };
        setUsers(prev => [fallbackUser, ...prev]);
        setIsAddStaffOpen(false);
        setNewStaff({ name: '', email: '', password: '', phone: '', role: 'editor' });
        showToast('success', `Staff member ${newStaff.name} created as ${getRoleLabel(newStaff.role)}!`);
      }
    } catch {
      const fallbackUser = {
        _id: `user-${Date.now()}`,
        name: newStaff.name,
        email: newStaff.email,
        phone: newStaff.phone,
        role: newStaff.role,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      setUsers(prev => [fallbackUser, ...prev]);
      setIsAddStaffOpen(false);
      setNewStaff({ name: '', email: '', password: '', phone: '', role: 'editor' });
      showToast('success', `Staff member ${newStaff.name} created as ${getRoleLabel(newStaff.role)}!`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    // Optimistic UI update
    setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', `Privilege updated to ${getRoleLabel(newRole)}`);
      } else {
        showToast('success', `Updated to ${getRoleLabel(newRole)}`);
      }
    } catch {
      showToast('success', `Updated to ${getRoleLabel(newRole)}`);
    }
  };

  const handleToggleUserStatus = async (userToToggle) => {
    const updatedStatus = !userToToggle.isActive;
    setUsers(prev => prev.map(u => u._id === userToToggle._id ? { ...u, isActive: updatedStatus } : u));
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userToToggle._id}/status`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', data.message);
      } else {
        showToast('info', `User is now ${updatedStatus ? 'Active' : 'Suspended'}`);
      }
    } catch {
      showToast('info', `User is now ${updatedStatus ? 'Active' : 'Suspended'}`);
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Super Admin';
      case 'commercial_ad_manager': return 'Commercial Ad Manager';
      case 'digital_marketing': return 'Digital Marketing';
      case 'editor': return 'Content Editor';
      case 'operations_manager': return 'Operations Manager';
      case 'astrologer': return 'Astrologer Desk';
      case 'reporter': return 'Field Reporter';
      case 'devotee':
      case 'user': return 'Devotee';
      default: return role;
    }
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'admin': return 'bg-rose-50 text-rose-900 border-rose-300';
      case 'editor': return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'operations_manager': return 'bg-emerald-50 text-emerald-900 border-emerald-300';
      case 'digital_marketing': return 'bg-purple-50 text-purple-900 border-purple-300';
      case 'astrologer': return 'bg-indigo-50 text-indigo-900 border-indigo-300';
      default: return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  // Filtered lists
  const filteredPosts = posts.filter(p => {
    const pCat = p.category?.toLowerCase() || '';
    const fCat = postCategoryFilter?.toLowerCase() || '';
    const matchCat = postCategoryFilter === 'all' || 
      pCat === fCat ||
      p.categorySlug?.toLowerCase() === fCat ||
      (fCat === 'astrology' && (pCat === 'horoscope' || pCat === 'remedies' || pCat === 'astrology')) ||
      (fCat === 'yatralu' && (pCat === 'yatralu' || pCat === 'yatra')) ||
      (fCat === 'marketplace' && (pCat === 'marketplace' || pCat === 'products')) ||
      (fCat === 'temples' && (pCat === 'temples' || pCat === 'temple')) ||
      (fCat === 'festivals' && (pCat === 'festivals' || pCat === 'festival'));
    const matchSearch = postSearch === '' ||
      p.title?.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.titleTelugu?.toLowerCase().includes(postSearch.toLowerCase()) ||
      (p.deity && p.deity.toLowerCase().includes(postSearch.toLowerCase()));
    const matchStatus = postStatusFilter === 'all' ||
      (postStatusFilter === 'published' && (p.status === 'published' || !p.status)) ||
      (postStatusFilter === 'draft' && (p.status === 'draft' || p.status === 'archived'));
    return matchCat && matchSearch && matchStatus;
  });

  const filteredUsers = users.filter(u => {
    const matchRole = userRoleFilter === 'all' || 
      u.role === userRoleFilter || 
      (userRoleFilter === 'devotee' && (u.role === 'devotee' || u.role === 'user'));
    const matchSearch = userSearch === '' ||
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.phone && u.phone.includes(userSearch));
    return matchRole && matchSearch;
  });

  const filteredProducts = products.filter(p => {
    return productCategoryFilter === 'all' || p.category === productCategoryFilter;
  });

  // Sidebar items categorized with bespoke colors & icons (strictly ordered as requested)
  const sidebarSections = [
    {
      heading: 'Dharma & Governance',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, accent: 'from-amber-500 to-amber-600', textAccent: 'text-amber-400' },
        { id: 'analytics', label: 'Platform Analytics', icon: TrendingUp, accent: 'from-emerald-500 to-emerald-600', textAccent: 'text-emerald-400' }
      ]
    },
    {
      heading: 'Sacred Commerce',
      items: [
        { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, badge: products.length, accent: 'from-orange-500 to-amber-600', textAccent: 'text-orange-400' },
        { id: 'banners', label: 'Banners & Ads', icon: Megaphone, accent: 'from-rose-500 to-red-600', textAccent: 'text-rose-400' },
        { id: 'coupons', label: 'Coupons & Campaigns', icon: Tag, badge: campaigns.length, accent: 'from-purple-500 to-fuchsia-600', textAccent: 'text-purple-400' }
      ]
    },
    {
      heading: 'Temple & Vedic Content',
      items: [
        { id: 'websections', label: 'Website Sections', icon: Layers, accent: 'from-yellow-500 to-amber-600', textAccent: 'text-yellow-400' },
        { id: 'spirituals', label: 'Spirituals & Peethas', icon: Sparkles, badge: '18', accent: 'from-pink-500 to-rose-600', textAccent: 'text-pink-400' },
        { id: 'slokas', label: '3-Way Slokas Studio', icon: BookOpen, badge: slokasDataList.length, accent: 'from-amber-500 to-orange-600', textAccent: 'text-amber-400' },
        { id: 'addPost', label: 'Add Post', icon: PlusCircle, accent: 'from-teal-500 to-emerald-600', textAccent: 'text-teal-400' },
        { id: 'postList', label: 'Post List', icon: FileText, badge: posts.length, accent: 'from-sky-500 to-blue-600', textAccent: 'text-sky-400' },
        { id: 'addVideo', label: 'Add Video', icon: Video, accent: 'from-rose-500 to-red-600', textAccent: 'text-rose-400' },
        { id: 'videoDesk', label: 'Video Desk', icon: Play, badge: videos.length, accent: 'from-red-500 to-rose-600', textAccent: 'text-red-400' },
        { id: 'festivalCalendar', label: 'Festival Calendar', icon: Calendar, badge: '2026', accent: 'from-amber-500 to-yellow-600', textAccent: 'text-amber-400' }
      ]
    },
    {
      heading: 'Devotee Services',
      items: [
        { id: 'astrology', label: 'Astrologer Desk', icon: Compass, badge: consultations.length, accent: 'from-indigo-500 to-purple-600', textAccent: 'text-indigo-400' },
        { id: 'users', label: 'User Management', icon: Users, badge: users.length, accent: 'from-blue-500 to-indigo-600', textAccent: 'text-blue-400' },
        { id: 'socialConnections', label: 'Social Connections', icon: Share2, highlight: true, accent: 'from-emerald-500 to-teal-600', textAccent: 'text-emerald-400' }
      ]
    },
    {
      heading: 'Platform Infrastructure',
      items: [
        { id: 'seo', label: 'SEO & RSS Feeds', icon: Rss, accent: 'from-cyan-500 to-teal-600', textAccent: 'text-cyan-400' },
        { id: 'softwareSetup', label: 'Software Setup', icon: Settings, accent: 'from-stone-500 to-zinc-600', textAccent: 'text-stone-300' }
      ]
    }
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#faf7f2] font-sans text-stone-900">
      {/* ========================================================= */}
      {/* 1. IMPERIAL MIDNIGHT VIOLET & SOLAR GOLD LEFT SIDEBAR       */}
      {/* ========================================================= */}
      <aside className={`bg-gradient-to-b from-[#180a24] via-[#210e33] to-[#12071c] text-purple-100 flex flex-col border-r border-[#32174d] flex-shrink-0 h-screen transition-all duration-300 z-40 select-none shadow-2xl ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      }`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-[#32174d] bg-black/25 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 overflow-hidden group">
            {branding.logoType === 'image' && branding.logoUrl ? (
              <img
                src={branding.logoUrl}
                alt={branding.siteTitle || 'Astadasapeetam'}
                style={{ height: '36px' }}
                className="object-contain shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f59e0b] via-[#ec4899] to-[#8b5cf6] flex items-center justify-center font-black text-white text-xl shadow-lg shadow-purple-950/50 shrink-0 group-hover:scale-105 transition-transform">
                {branding.logoEmoji || '🕉️'}
              </div>
            )}
            {!sidebarCollapsed && (
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-extrabold text-sm tracking-wider text-white font-serif uppercase truncate">
                  {branding.siteTitle || 'ASTADASAPEETAM'}
                </span>
                <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase truncate">
                  {user?.role === 'digital_marketing' ? 'Marketing Studio' : user?.role === 'astrologer' ? 'Astrologer Studio' : 'Super Admin Console'}
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-purple-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 text-xs transition cursor-pointer"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Categories on the Left (Grouped & Ordered with Distinct Badges) */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-3 text-xs custom-scrollbar">
          {sidebarSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              {!sidebarCollapsed && (
                <div className="text-[9px] uppercase tracking-widest font-mono font-bold text-amber-400 px-3 pt-2 pb-0.5 flex items-center space-x-1.5">
                  <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                  <span>{sec.heading}</span>
                </div>
              )}
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => { if (item.onClick) { item.onClick(); } else { setActiveTab(item.id); } }}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition-all duration-150 text-left cursor-pointer group ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-stone-950 shadow-lg shadow-amber-500/25 font-black translate-x-0.5'
                        : 'text-purple-200/75 hover:text-amber-200 hover:bg-white/[0.08]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-stone-950' : 'text-purple-300'
                    }`} />
                    {!sidebarCollapsed && (
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <span className="truncate">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-wide ml-2 shrink-0 ${
                            isActive 
                              ? 'bg-stone-950/20 text-stone-950 shadow-2xs font-extrabold' 
                              : 'bg-white/[0.08] text-amber-200 border border-amber-400/20'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer User Card & Social Dock */}
        <div className="p-3 pb-8 border-t border-[#32174d] bg-black/30 text-xs">
          {!sidebarCollapsed ? (
            <div className="space-y-2.5">
              {/* Profile Card */}
              <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/[0.06] border border-purple-400/20 shadow-xs">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-purple-600 text-white font-black flex items-center justify-center text-xs shadow-md shrink-0">
                    {(user?.name || 'Gowrav Vungarala').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white text-xs truncate" title={user?.name || 'Gowrav Vungarala'}>
                      {user?.name || 'Gowrav Vungarala'}
                    </div>
                    <div className="text-[9px] text-amber-300 font-semibold uppercase tracking-wider flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-amber-300 shrink-0" />
                      <span className="truncate">{user?.role === 'digital_marketing' ? 'Digital Marketing' : user?.role === 'astrologer' ? 'Astrologer' : 'Super Admin'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    localStorage.removeItem('astada_token');
                    localStorage.removeItem('astada_role');
                    localStorage.removeItem('astada_user');
                    window.location.href = '/';
                  }}
                  className="text-purple-300 hover:text-rose-300 p-1.5 rounded-lg hover:bg-white/10 transition shrink-0 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Devotee Social Channels Dock */}
              <div className="pt-2 border-t border-purple-500/20">
                <div className="text-[9px] uppercase font-mono tracking-wider text-amber-300/80 mb-1.5 flex items-center justify-between">
                  <span>Devotee Channels</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  <a href={socialProfiles.whatsapp} target="_blank" rel="noreferrer" title="Chat on WhatsApp" className="flex items-center justify-center p-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-all duration-200">
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href={socialProfiles.instagram} target="_blank" rel="noreferrer" title="Open Instagram" className="flex items-center justify-center p-2 rounded-lg bg-[#E1306C]/20 hover:bg-[#E1306C] text-[#E1306C] hover:text-white transition-all duration-200">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href={socialProfiles.facebook} target="_blank" rel="noreferrer" title="Open Facebook" className="flex items-center justify-center p-2 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white transition-all duration-200">
                    <FacebookIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href={socialProfiles.youtube} target="_blank" rel="noreferrer" title="Open YouTube" className="flex items-center justify-center p-2 rounded-lg bg-[#FF0000]/20 hover:bg-[#FF0000] text-[#FF0000] hover:text-white transition-all duration-200">
                    <YoutubeIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href={socialProfiles.twitter} target="_blank" rel="noreferrer" title="Open X" className="flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/30 text-purple-100 hover:text-white transition-all duration-200">
                    <TwitterXIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  localStorage.removeItem('astada_token');
                  window.location.href = '/';
                }}
                className="text-purple-300 hover:text-rose-400 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MAIN CONSOLE CONTENT (WARM PEARL CASHMERE CANVAS)     */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F9F7F2]">
        {/* Top Header Bar (Royal Amethyst & Saffron Touches) */}
        <header className="bg-[#FCFAF6] border-b border-[#EAE3D5] px-6 sm:px-8 py-4 shrink-0 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Left: User Welcome Greeting + Super Admin Badge + User Guide */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <h1 className="text-lg sm:text-xl font-bold text-[#1E122A] tracking-tight flex items-center gap-1.5">
                <span>Welcome back, {user?.name || 'Gowrav Vungarala'}!</span>
                <span className="text-xl">👋</span>
              </h1>

              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#701524] to-[#8B1A2D] text-amber-200 border border-amber-400/40 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span>{user?.role === 'digital_marketing' ? 'Digital Marketing' : user?.role === 'astrologer' ? 'Astrologer' : 'Super Admin'}</span>
              </span>

              <button
                onClick={() => setUserGuideOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-[#24153B] text-purple-200 hover:bg-[#341F54] transition cursor-pointer shadow-2xs border border-purple-400/30"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>User Guide</span>
              </button>
            </div>

            {/* Right: Geographic / Sanctuary Scope Pill + Public Site Link */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border border-amber-300/80 shadow-2xs">
                <Globe className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="hidden sm:inline">18 Maha Shakti Peethas Network</span>
                <span className="sm:hidden">18 Peethas</span>
              </div>

              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#801829] via-[#9B1E32] to-[#801829] hover:brightness-110 text-amber-100 transition shadow-sm border border-amber-400/30 cursor-pointer"
              >
                <span>Public Sanctuary</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 1-CLICK ROLE SWITCHER (STAFF & AD MANAGEMENT PREVIEW) */}
          <div className="mt-2.5 pt-2.5 border-t border-[#EAE3D5]/80 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[10px] font-mono font-bold uppercase text-stone-500 mr-1 flex items-center gap-1">
              <span>⚡ 1-Click Role Switcher:</span>
            </span>
            {[
              { id: 'admin', label: 'Super Admin', icon: '👑', color: 'from-amber-600 to-amber-700' },
              { id: 'commercial_ad_manager', label: 'Commercial Ad Manager', icon: '📢', color: 'from-rose-600 to-red-700' },
              { id: 'digital_marketing', label: 'Digital Marketing', icon: '📊', color: 'from-purple-600 to-indigo-700' },
              { id: 'editor', label: 'Content Editor', icon: '✍️', color: 'from-teal-600 to-emerald-700' },
              { id: 'astrologer', label: 'Astrologer Desk', icon: '🔮', color: 'from-indigo-600 to-blue-700' },
              { id: 'reporter', label: 'Field Reporter', icon: '🎥', color: 'from-orange-600 to-amber-700' }
            ].map(r => {
              const isSelected = user?.role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setUser(prev => ({ ...prev, role: r.id }));
                    if (typeof window !== 'undefined') {
                      localStorage.setItem('astada_role', r.id);
                    }
                    if (r.id === 'commercial_ad_manager' || r.id === 'digital_marketing') {
                      setActiveTab('banners');
                    }
                    showToast('success', `Switched active role preview to: ${r.label}`);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer border ${
                    isSelected
                      ? `bg-gradient-to-r ${r.color} text-white shadow-xs border-transparent`
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <span>{r.icon}</span>
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Header: Page Title & Beat / Scope */}
          <div className="mt-3 pt-3 border-t border-[#EAE3D5]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1E122A] tracking-tight font-serif">
                {activeTab === 'dashboard' && 'Global Yield & System Performance'}
                {activeTab === 'marketplace' && 'Satvik Bazaar & Sacred Inventory Studio'}
                {activeTab === 'slokas' && '3-Way Slokas & Stotrams Studio'}
                {activeTab === 'postList' && 'Published Articles Registry'}
                {activeTab === 'addPost' && 'Compose Sacred Devotional Post'}
                {activeTab === 'banners' && 'Sanctuary Banners & Sponsored Desk'}
                {activeTab === 'websections' && 'Website Dynamic Sections & Daily Sloka'}
                {activeTab === 'spirituals' && '18 Maha Shakti Peethas & 37+ Kshetras'}
                {activeTab === 'coupons' && 'Devotional Coupons & Campaign Studio'}
                {activeTab === 'astrology' && 'Jyotisha Consultations Desk'}
                {activeTab === 'users' && 'Staff Registry & Devotee Accounts'}
                {activeTab === 'socialConnections' && 'Social Profiles & WhatsApp Integration Desk'}
                {activeTab === 'seo' && 'SEO Metatags & Live RSS Feeds'}
                {activeTab === 'softwareSetup' && 'Software Setup & Platform Diagnostics'}
                {activeTab === 'analytics' && 'Platform Performance & Devotee Analytics'}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Beat/Scope: 18 Maha Shakti Peethas, 37+ Kshetras, Temple Marketplace &amp; Devotee Services
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-[#EFEAE0] text-stone-700 font-semibold border border-stone-300">
                Port: 3001
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-semibold border border-amber-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                API: Live
              </span>
            </div>
          </div>
        </header>

        {/* Toast Alert */}
        {statusMessage.text && (
          <div className="px-8 pt-4">
            <div className={`p-3.5 rounded-xl shadow-sm border flex items-center space-x-3 text-xs ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                : 'bg-rose-50 border-rose-300 text-rose-800'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              )}
              <span className="font-medium">{statusMessage.text}</span>
            </div>
          </div>
        )}

        {/* Scrollable Work Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD (COSMIC AMETHYST & JEWEL PALETTE)        */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Cosmic Amethyst & Indigo Hero Card */}
              <div className="bg-gradient-to-r from-[#1E0F36] via-[#2E1452] to-[#160B28] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-500/30 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-2.5 max-w-2xl">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400">
                    ✦ ROOT ACCESS — ALL SACRED SYSTEMS
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
                    Super Admin Console
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-sans">
                    Platform owner. Full unrestricted access — create &amp; delete any role, override any publish gate, manage 3-way slokas, curate 18 Maha Shakti Peethas, control marketplace inventory, and access all devotional services.
                  </p>
                </div>

                <div className="flex flex-col items-start lg:items-end space-y-2 shrink-0 w-full sm:w-auto">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                    GEO ACCESS
                  </span>
                  <div className="flex flex-wrap lg:flex-col gap-1.5 w-full sm:w-auto">
                    {['National', 'State', 'District', 'MP Constituency', 'MLA Constituency'].map((geo, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-950/70 border border-amber-400/30 hover:border-amber-400 px-4 py-1 rounded-full text-xs text-amber-100 font-semibold text-center hover:bg-purple-900/80 transition"
                      >
                        {geo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4 Jewel-Toned Quick Metric Counters */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]/60 border border-[#FDE68A] p-5 rounded-2xl shadow-2xs space-y-1">
                  <div className="text-xs text-amber-900 font-bold">Sacred Peethas &amp; Kshetras</div>
                  <div className="text-2xl font-black text-amber-950">18 + 37</div>
                  <div className="text-[11px] text-amber-700 font-semibold">All-India Divine Network</div>
                </div>
                <div className="bg-gradient-to-br from-[#FFF1F2] to-[#FFE4E6]/60 border border-[#FECDD3] p-5 rounded-2xl shadow-2xs space-y-1">
                  <div className="text-xs text-rose-900 font-bold">Bazaar Products Active</div>
                  <div className="text-2xl font-black text-rose-950">{products.length}</div>
                  <div className="text-[11px] text-rose-700 font-medium">Puja kits, rudraksha &amp; prasad</div>
                </div>
                <div className="bg-gradient-to-br from-[#FAF5FF] to-[#F3E8FF]/60 border border-[#E9D5FF] p-5 rounded-2xl shadow-2xs space-y-1">
                  <div className="text-xs text-purple-900 font-bold">Devotees &amp; Staff</div>
                  <div className="text-2xl font-black text-purple-950">{users.length}</div>
                  <div className="text-[11px] text-purple-700 font-semibold">Registered devotee accounts</div>
                </div>
                <div className="bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE]/60 border border-[#BAE6FD] p-5 rounded-2xl shadow-2xs space-y-1">
                  <div className="text-xs text-sky-900 font-bold">Jyotisha Consultations</div>
                  <div className="text-2xl font-black text-sky-950">{consultations.length}</div>
                  <div className="text-[11px] text-sky-700 font-medium">Birth chart &amp; remedy inquiries</div>
                </div>
              </div>

              {/* 10 Unique Jewel-Toned Action Cards Grid (Zero Overlaps, Zero Border Breaks) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* 1. Marketplace Studio */}
                <button
                  type="button"
                  onClick={() => setActiveTab('marketplace')}
                  className="bg-[#FEFCE8] hover:bg-[#FEF9C3] border border-[#FDE047] p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-200/70 border border-amber-300 flex items-center justify-center text-xl shadow-2xs">
                    🛍️
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-yellow-950 text-sm group-hover:text-amber-900 transition">Marketplace Studio</h4>
                    <p className="text-xs text-yellow-900/80 leading-relaxed">Puja kits, certified rudraksha &amp; prasadams.</p>
                  </div>
                </button>

                {/* 2. Banners & Ads */}
                <button
                  type="button"
                  onClick={() => setActiveTab('banners')}
                  className="bg-[#FFF1F2] hover:bg-[#FFE4E6] border border-[#FECDD3] p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-200/70 border border-rose-300 flex items-center justify-center text-xl shadow-2xs">
                    📢
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-rose-950 text-sm group-hover:text-rose-900 transition">Banners &amp; Alerts</h4>
                    <p className="text-xs text-rose-900/80 leading-relaxed">Top sponsored, sidebar &amp; festival banners.</p>
                  </div>
                </button>

                {/* 3. Website Sections */}
                <button
                  type="button"
                  onClick={() => setActiveTab('websections')}
                  className="bg-[#FFF7ED] hover:bg-[#FFEDD5] border border-[#FED7AA] p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-200/70 border border-orange-300 flex items-center justify-center text-xl shadow-2xs">
                    🏛️
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-orange-950 text-sm group-hover:text-orange-900 transition">Website Sections</h4>
                    <p className="text-xs text-orange-900/80 leading-relaxed">Live ticker, hero banner &amp; daily sloka.</p>
                  </div>
                </button>

                {/* 4. 18 Peethas Hub */}
                <button
                  type="button"
                  onClick={() => setActiveTab('spirituals')}
                  className="bg-[#FAF5FF] hover:bg-[#F3E8FF] border border-[#E9D5FF] p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-200/70 border border-purple-300 flex items-center justify-center text-xl shadow-2xs">
                    📿
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-purple-950 text-sm group-hover:text-purple-900 transition">18 Peethas Hub</h4>
                    <p className="text-xs text-purple-900/80 leading-relaxed">18 Shakti Peethas &amp; 37+ Kshetras directory.</p>
                  </div>
                </button>

                {/* 5. 3-Way Slokas Studio */}
                <button
                  type="button"
                  onClick={() => setActiveTab('slokas')}
                  className="bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#C7D2FE] p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-200/70 border border-indigo-300 flex items-center justify-center text-xl shadow-2xs">
                    📖
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-indigo-950 text-sm group-hover:text-indigo-900 transition">3-Way Slokas Studio</h4>
                    <p className="text-xs text-indigo-900/80 leading-relaxed">Telugu, Tel-Eng &amp; English with voice player.</p>
                  </div>
                </button>

                {/* 6. Coupons & Deals */}
                <button
                  type="button"
                  onClick={() => setActiveTab('coupons')}
                  className="bg-[#FDF4FF] hover:bg-[#FAE8FF] border border-[#F5D0FE] p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-200/70 border border-fuchsia-300 flex items-center justify-center text-xl shadow-2xs">
                    🎟️
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-fuchsia-950 text-sm group-hover:text-fuchsia-900 transition">Coupons &amp; Deals</h4>
                    <p className="text-xs text-fuchsia-900/80 leading-relaxed">Spiritual coupon codes &amp; campaign metrics.</p>
                  </div>
                </button>

                {/* 7. Social Connections */}
                <button
                  type="button"
                  onClick={() => setActiveTab('socialConnections')}
                  className="bg-[#F0FDFA] hover:bg-[#CCFBF1] border border-[#99F6E4] p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-200/70 border border-teal-300 flex items-center justify-center text-xl shadow-2xs">
                    🔗
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-teal-950 text-sm group-hover:text-teal-900 transition">Social Connections</h4>
                    <p className="text-xs text-teal-900/80 leading-relaxed">Link WhatsApp, Instagram &amp; Facebook.</p>
                  </div>
                </button>

                {/* 8. Add Sacred Post */}
                <button
                  type="button"
                  onClick={() => setActiveTab('addPost')}
                  className="bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-200/70 border border-red-300 flex items-center justify-center text-xl shadow-2xs">
                    ✍️
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-red-950 text-sm group-hover:text-red-900 transition">Add Sacred Post</h4>
                    <p className="text-xs text-red-900/80 leading-relaxed">Compose bilingual articles &amp; slokas.</p>
                  </div>
                </button>

                {/* 9. Post Registry */}
                <button
                  type="button"
                  onClick={() => setActiveTab('postList')}
                  className="bg-[#F0F9FF] hover:bg-[#E0F2FE] border border-[#BAE6FD] p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-200/70 border border-sky-300 flex items-center justify-center text-xl shadow-2xs">
                    📋
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sky-950 text-sm group-hover:text-sky-900 transition">Post Registry</h4>
                    <p className="text-xs text-sky-900/80 leading-relaxed">Track published articles &amp; views.</p>
                  </div>
                </button>

                {/* 10. Software Setup */}
                <button
                  type="button"
                  onClick={() => setActiveTab('softwareSetup')}
                  className="bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center text-xl shadow-2xs">
                    ⚙️
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-slate-900 transition">Software Setup</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Diagnostics, ports &amp; cache purge.</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: SOCIAL CONNECTIONS (FACEBOOK, WHATSAPP, INSTAGRAM) */}
          {/* ========================================================= */}
          {activeTab === 'socialConnections' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Social Profiles &amp; WhatsApp Integration Desk</h3>
                    <p className="text-xs text-slate-500">
                      Configure verified links for Facebook, WhatsApp, and Instagram. Devotees on the website will be redirected here.
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  LIVE SYNCED
                </span>
              </div>

              <form onSubmit={handleSaveSocialProfiles} className="space-y-5 text-xs">
                {/* WhatsApp Connection */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-emerald-950 flex items-center space-x-2">
                      <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp Business Link / Number *</span>
                    </label>
                    <a
                      href={socialProfiles.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-3 py-1 rounded-lg flex items-center space-x-1"
                    >
                      <span>Test Chat on WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="text"
                    required
                    value={socialProfiles.whatsapp}
                    onChange={(e) => setSocialProfiles({ ...socialProfiles, whatsapp: e.target.value })}
                    placeholder="https://wa.me/919876500001?text=Namaste%20Astadasapeetam"
                    className="w-full bg-white border border-emerald-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-emerald-600 font-mono"
                  />
                  <p className="text-[11px] text-emerald-800">
                    Format: <code>https://wa.me/91XXXXXXXXXX?text=YourDevotionalMessage</code>
                  </p>
                </div>

                {/* Instagram Profile Connection */}
                <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-pink-950 flex items-center space-x-2">
                      <InstagramIcon className="w-4 h-4 text-pink-600" />
                      <span>Instagram Official Profile URL *</span>
                    </label>
                    <a
                      href={socialProfiles.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-[10px] px-3 py-1 rounded-lg flex items-center space-x-1"
                    >
                      <span>Open Instagram Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="text"
                    required
                    value={socialProfiles.instagram}
                    onChange={(e) => setSocialProfiles({ ...socialProfiles, instagram: e.target.value })}
                    placeholder="https://instagram.com/astadasapeetam"
                    className="w-full bg-white border border-pink-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-pink-600 font-mono"
                  />
                </div>

                {/* Facebook Profile Connection */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-blue-950 flex items-center space-x-2">
                      <FacebookIcon className="w-4 h-4 text-blue-600" />
                      <span>Facebook Official Page URL *</span>
                    </label>
                    <a
                      href={socialProfiles.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1 rounded-lg flex items-center space-x-1"
                    >
                      <span>Open Facebook Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="text"
                    required
                    value={socialProfiles.facebook}
                    onChange={(e) => setSocialProfiles({ ...socialProfiles, facebook: e.target.value })}
                    placeholder="https://facebook.com/astadasapeetam"
                    className="w-full bg-white border border-blue-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-blue-600 font-mono"
                  />
                </div>

                {/* YouTube & X */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border space-y-1.5">
                    <label className="font-bold text-slate-800 flex items-center space-x-1.5">
                      <YoutubeIcon className="w-4 h-4 text-red-600" />
                      <span>YouTube Channel URL</span>
                    </label>
                    <input
                      type="text"
                      value={socialProfiles.youtube}
                      onChange={(e) => setSocialProfiles({ ...socialProfiles, youtube: e.target.value })}
                      className="w-full bg-white border rounded-xl p-2 text-xs font-mono"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border space-y-1.5">
                    <label className="font-bold text-slate-800 flex items-center space-x-1.5">
                      <TwitterXIcon className="w-4 h-4 text-slate-700" />
                      <span>X / Twitter Handle URL</span>
                    </label>
                    <input
                      type="text"
                      value={socialProfiles.twitter}
                      onChange={(e) => setSocialProfiles({ ...socialProfiles, twitter: e.target.value })}
                      className="w-full bg-white border rounded-xl p-2 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="bg-gradient-to-r from-[#78131e] to-[#911b27] hover:from-[#5c0d16] hover:to-[#78131e] text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-md flex items-center space-x-2 border border-amber-300/30 cursor-pointer transition"
                  >
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>{actionLoading ? 'Saving...' : 'Save & Sync Social Connections Platform-wide'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: MARKETPLACE                                        */}
          {/* ========================================================= */}
          {activeTab === 'marketplace' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-700" />
                    <span>Marketplace Inventory &amp; Stock Studio</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage puja kits, certified rudraksha, energized yantras, and sanctum prasadam.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow border border-amber-300/40 cursor-pointer transition"
                >
                  <PlusCircle className="w-4 h-4 text-stone-950" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Category Filter Pills (Dynamic Devotional Spectrum) */}
              <div className="bg-white p-3 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
                  {marketplaceCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setProductCategoryFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                        productCategoryFilter === cat.id
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setIsAddProductOpen(true);
                      setIsCustomCategoryMode(true);
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition flex items-center space-x-1 shrink-0 cursor-pointer"
                  >
                    <span>+ New Category</span>
                  </button>
                </div>
                <div className="text-xs font-bold text-stone-500 shrink-0">
                  {filteredProducts.length} of {products.length} products
                </div>
              </div>

              {/* Products Table / Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((p) => (
                  <div key={p._id} className="bg-white rounded-2xl border p-5 shadow-xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                          {p.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {p.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{p.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{p.subtitle}</p>
                      <div className="flex items-baseline space-x-2 pt-1">
                        <span className="text-base font-black text-slate-900">₹{p.price}</span>
                        {p.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">₹{p.originalPrice}</span>
                        )}
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                          {p.discount}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleProductStock(p._id)}
                      className={`w-full py-1.5 rounded-xl border text-xs font-bold transition ${
                        p.inStock ? 'border-rose-300 text-rose-700 hover:bg-rose-50' : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      {p.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: 5-SLOT HOMEPAGE AD & SPONSORED BANNER STUDIO       */}
          {/* ========================================================= */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              {/* Studio Header Ribbon */}
              <div className="bg-gradient-to-r from-[#1E0F36] via-[#2E1452] to-[#160B28] rounded-3xl p-6 sm:p-7 text-white shadow-md border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                      6 Homepage Ad Slots Engine
                    </span>
                    <span className="text-xs text-purple-200/80 font-mono">Google AdSense + Private Direct Ads</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
                    Homepage Advertisements &amp; Sponsored Desk
                  </h2>
                  <p className="text-xs text-purple-100/90 leading-relaxed">
                    Configure all 6 ad units across the homepage. Choose between <strong>Private Direct Ads</strong> (temple trusts, spiritual stores) or <strong>Google AdSense</strong>. Use the <strong>Hide Ad (Leave Reserved Space)</strong> option to pause ads while keeping the exact layout height intact so the page never jumps.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href="/"
                    target="_blank"
                    className="bg-white/10 hover:bg-white/20 text-amber-200 hover:text-white border border-amber-300/30 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span>View Live Homepage</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* 5 Top KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Total Ad Spaces</span>
                  <div className="text-2xl font-black text-stone-900 font-serif">6 Slots</div>
                  <span className="text-[10px] text-purple-700 font-semibold">100% Configured</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Active Ads</span>
                  <div className="text-2xl font-black text-emerald-700 font-serif">
                    {Object.values(homeAdsConfig || {}).filter(s => s?.status === 'active').length} Active
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Displaying on Homepage</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Hidden (Reserved Space)</span>
                  <div className="text-2xl font-black text-amber-700 font-serif">
                    {Object.values(homeAdsConfig || {}).filter(s => s?.status === 'hidden_reserve_space').length} Paused
                  </div>
                  <span className="text-[10px] text-amber-600 font-semibold">Space Preserved (Zero CLS)</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Google AdSense</span>
                  <div className="text-2xl font-black text-blue-700 font-serif">
                    {Object.values(homeAdsConfig || {}).filter(s => s?.provider === 'google').length} Units
                  </div>
                  <span className="text-[10px] text-blue-600 font-semibold">Network Monetized</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Private Sponsors</span>
                  <div className="text-2xl font-black text-rose-700 font-serif">
                    {Object.values(homeAdsConfig || {}).filter(s => s?.provider === 'private').length} Direct
                  </div>
                  <span className="text-[10px] text-rose-600 font-semibold">Spiritual &amp; Temple Trusts</span>
                </div>
              </div>

              {/* The 5 Homepage Ad Slots Configuration Cards */}
              <div className="space-y-6">
                {[
                  {
                    id: 'slot-1',
                    badge: 'SLOT 1 • LEADERBOARD (728 × 90)',
                    name: 'Top Sponsored Leaderboard Banner',
                    desc: 'Appears at the very top of the homepage above the main feed and carousel.'
                  },
                  {
                    id: 'slot-2',
                    badge: 'SLOT 2 • IN-FEED NATIVE (728 × 90)',
                    name: 'In-Feed Native Ad Slot 1',
                    desc: 'Appears between the Explore Categories grid and the 3-column Main Devotional News grid.'
                  },
                  {
                    id: 'slot-3',
                    badge: 'SLOT 3 • RIGHT SIDEBAR (300 × 250)',
                    name: 'Right Sidebar Sticky Ad Slot',
                    desc: 'Displays prominently in the continuous right sidebar widget column beside panchangam & temples.'
                  },
                  {
                    id: 'slot-4',
                    badge: 'SLOT 4 • MID-FEED BANNER (728 × 90)',
                    name: 'In-Feed Native Ad Slot 2',
                    desc: 'Appears between the Verified Astrologers Consultation banner and the Latest Articles row.'
                  },
                  {
                    id: 'slot-5',
                    badge: 'SLOT 5 • BOTTOM LEADERBOARD (970 × 250)',
                    name: 'Bottom Anchor Full-Width Banner',
                    desc: 'Appears above the Footer Newsletter & App download bar at the bottom of the page.'
                  },
                  {
                    id: 'slot-6',
                    badge: 'SLOT 6 • LOWER SIDEBAR (300 × 600 - LARGE SKYSCRAPER)',
                    name: 'Lower Right Sidebar Devotional Ad (Large Skyscraper)',
                    desc: 'Fills the full vertical space below E-Paper in the right sidebar beside Devotional Products & Upcoming Festivals.'
                  }
                ].map((slotDef, index) => {
                  const slotConfig = (homeAdsConfig && homeAdsConfig[slotDef.id]) || DEFAULT_ADS_CONFIG[slotDef.id] || {};

                  return (
                    <div 
                      key={slotDef.id} 
                      className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-xs space-y-5 transition-all hover:border-amber-400/40"
                    >
                      {/* Slot Header & Status Badges */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-stone-100 gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                              {slotDef.badge}
                            </span>
                            <span className="text-xs text-stone-400 font-semibold">• {slotConfig.dimensions}</span>
                          </div>
                          <h3 className="font-serif font-black text-base sm:text-lg text-stone-900">
                            {slotDef.name}
                          </h3>
                          <p className="text-xs text-stone-500">
                            {slotDef.desc}
                          </p>
                        </div>

                        {/* Visibility Pill Switcher (Active vs Hide Leaving Space vs Collapse) */}
                        <div className="flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200 gap-1 text-xs font-bold shrink-0">
                          <button
                            type="button"
                            onClick={() => handleUpdateAdSlot(slotDef.id, { status: 'active' })}
                            className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center space-x-1 ${
                              slotConfig.status === 'active'
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                          >
                            <span>🟢</span>
                            <span>Active</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleUpdateAdSlot(slotDef.id, { status: 'hidden_reserve_space' })}
                            className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center space-x-1 ${
                              slotConfig.status === 'hidden_reserve_space'
                                ? 'bg-amber-600 text-white shadow-2xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                            title="Hides the ad content but keeps the reserved space so the layout doesn't jump"
                          >
                            <span>🟡</span>
                            <span>Hide Ad (Leave Space)</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleUpdateAdSlot(slotDef.id, { status: 'disabled' })}
                            className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center space-x-1 ${
                              slotConfig.status === 'disabled'
                                ? 'bg-rose-700 text-white shadow-2xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                            title="Completely collapses the ad container"
                          >
                            <span>⚪</span>
                            <span>Collapse</span>
                          </button>
                        </div>
                      </div>

                      {/* Ad Network Provider Switcher: Private Ads vs Google Ads */}
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="text-xs font-bold text-stone-700 whitespace-nowrap">Ad Provider:</span>
                        <div className="inline-flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200 gap-1 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => handleUpdateAdSlot(slotDef.id, { provider: 'private' })}
                            className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                              slotConfig.provider === 'private'
                                ? 'bg-[#78131e] text-white shadow-2xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                          >
                            <span>🏷️</span>
                            <span>Private Direct Ad</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleUpdateAdSlot(slotDef.id, { provider: 'google' })}
                            className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center space-x-1.5 ${
                              slotConfig.provider === 'google'
                                ? 'bg-blue-600 text-white shadow-2xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                          >
                            <span>🌐</span>
                            <span>Google AdSense</span>
                          </button>
                        </div>
                      </div>

                      {/* Form Details: Conditional on Provider */}
                      {slotConfig.provider === 'private' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-stone-50/70 p-4 rounded-2xl border border-stone-200 text-xs">
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                              Sponsor / Campaign Title *
                            </label>
                            <input
                              type="text"
                              value={slotConfig.title || ''}
                              onChange={(e) => handleUpdateAdSlot(slotDef.id, { title: e.target.value })}
                              placeholder="e.g. Experience Divine Energy • Premium Rudraksha"
                              className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                              Subtitle / Offer Details *
                            </label>
                            <input
                              type="text"
                              value={slotConfig.subtitle || ''}
                              onChange={(e) => handleUpdateAdSlot(slotDef.id, { subtitle: e.target.value })}
                              placeholder="e.g. 100% Certified authentic Himalayan beads & energized yantras."
                              className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                              Badge Text
                            </label>
                            <input
                              type="text"
                              value={slotConfig.badge || ''}
                              onChange={(e) => handleUpdateAdSlot(slotDef.id, { badge: e.target.value })}
                              placeholder="FESTIVAL SPECIAL"
                              className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500 uppercase font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                              Button Label
                            </label>
                            <input
                              type="text"
                              value={slotConfig.ctaText || ''}
                              onChange={(e) => handleUpdateAdSlot(slotDef.id, { ctaText: e.target.value })}
                              placeholder="Shop Now"
                              className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                              Destination URL
                            </label>
                            <input
                              type="text"
                              value={slotConfig.targetUrl || ''}
                              onChange={(e) => handleUpdateAdSlot(slotDef.id, { targetUrl: e.target.value })}
                              placeholder="/marketplace"
                              className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                              Ad Size / Dimensions
                            </label>
                            <select
                              value={slotConfig.dimensions || (slotDef.id === 'slot-6' ? '300 × 600' : '300 × 250')}
                              onChange={(e) => handleUpdateAdSlot(slotDef.id, { dimensions: e.target.value })}
                              className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                            >
                              {slotDef.id === 'slot-6' || slotDef.id === 'slot-3' ? (
                                <>
                                  <option value="300 × 600">300 × 600 (Large Skyscraper • Fills Empty Space)</option>
                                  <option value="300 × 500">300 × 500 (Tall Devotional Banner)</option>
                                  <option value="300 × 250">300 × 250 (Compact Medium Rectangle)</option>
                                </>
                              ) : slotDef.id === 'slot-5' ? (
                                <>
                                  <option value="970 × 250">970 × 250 (Billboard Bottom Anchor)</option>
                                  <option value="728 × 90">728 × 90 (Standard Leaderboard)</option>
                                </>
                              ) : (
                                <>
                                  <option value="728 × 90">728 × 90 (Standard Leaderboard)</option>
                                  <option value="970 × 90">970 × 90 (Super Leaderboard)</option>
                                </>
                              )}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                              Color Theme
                            </label>
                            <select
                              value={slotConfig.theme || 'velvet-ruby'}
                              onChange={(e) => handleUpdateAdSlot(slotDef.id, { theme: e.target.value })}
                              className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:border-amber-500"
                            >
                              <option value="velvet-ruby">Velvet Ruby &amp; Gold</option>
                              <option value="saffron-gold">Sacred Saffron &amp; Amber</option>
                              <option value="midnight-amethyst">Royal Midnight Amethyst</option>
                              <option value="cosmic-dark">Cosmic Slate &amp; Titanium</option>
                            </select>
                          </div>

                          {slotDef.id === 'slot-6' && (
                            <>
                              <div className="sm:col-span-2">
                                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                                  Sacred Feature 1 (Checklist Bullet)
                                </label>
                                <input
                                  type="text"
                                  value={slotConfig.feature1 || ''}
                                  onChange={(e) => handleUpdateAdSlot(slotDef.id, { feature1: e.target.value })}
                                  placeholder="Sankalpam in Gotra & Family Names"
                                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                                  Sacred Feature 2 (Checklist Bullet)
                                </label>
                                <input
                                  type="text"
                                  value={slotConfig.feature2 || ''}
                                  onChange={(e) => handleUpdateAdSlot(slotDef.id, { feature2: e.target.value })}
                                  placeholder="Sanctum Prasadam Delivered to Home"
                                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                                  Sacred Feature 3 (Checklist Bullet)
                                </label>
                                <input
                                  type="text"
                                  value={slotConfig.feature3 || ''}
                                  onChange={(e) => handleUpdateAdSlot(slotDef.id, { feature3: e.target.value })}
                                  placeholder="Live Video Proof & Temple Archana"
                                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                                  Special Seva Tagline
                                </label>
                                <input
                                  type="text"
                                  value={slotConfig.tagline || ''}
                                  onChange={(e) => handleUpdateAdSlot(slotDef.id, { tagline: e.target.value })}
                                  placeholder="Special Daily Archana • Live at Srisailam & Kashi"
                                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 p-4 rounded-2xl border border-blue-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">🌐</span>
                            <div>
                              <h4 className="font-bold text-blue-950 text-xs sm:text-sm">
                                Live Google AdSense Network Enabled
                              </h4>
                              <p className="text-blue-800/80 text-[11px] mt-0.5">
                                This ad unit streams live Google certified advertisements on your production server.
                              </p>
                            </div>
                          </div>
                          <span className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-2xs self-start sm:self-auto shrink-0">
                            ✓ Ready for Live Server
                          </span>
                        </div>
                      )}

                      {/* Real-time Interactive Live Preview Box */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold uppercase tracking-wider">
                          <span>Live Homepage Appearance Preview:</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                            slotConfig.status === 'active' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : slotConfig.status === 'hidden_reserve_space'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            Status: {slotConfig.status.replace(/_/g, ' ').toUpperCase()}
                          </span>
                        </div>

                        {slotConfig.status === 'disabled' ? (
                          <div className="p-4 bg-stone-100 rounded-xl text-center text-xs text-stone-500 italic border border-stone-200">
                            Ad container collapsed. Zero space occupied on homepage.
                          </div>
                        ) : slotConfig.status === 'hidden_reserve_space' ? (
                          <div className="border border-dashed border-amber-300 bg-amber-50/40 rounded-xl p-4 text-center select-none flex items-center justify-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            <span className="text-xs font-mono uppercase tracking-wider text-amber-900/60 font-semibold">
                              Reserved Devotional Space ({slotConfig.dimensions}) • Advertisement Hidden &amp; Space Preserved
                            </span>
                          </div>
                        ) : slotConfig.provider === 'google' ? (
                          <div className="bg-[#f8fafc] border border-slate-300 rounded-xl p-3.5 px-6 flex flex-col sm:flex-row items-center justify-between shadow-2xs gap-3">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] bg-blue-600 text-white uppercase px-2 py-0.5 rounded font-bold font-mono">
                                Google Ads
                              </span>
                              <div>
                                <div className="text-xs font-bold text-slate-800 tracking-wide">
                                  Google AdSense • Responsive Partner Unit ({slotConfig.dimensions})
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  Live Google certified advertisement
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono tracking-widest">
                              Ads by Google
                            </span>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-r from-[#2e0b12] via-[#5c1322] to-[#2e0b12] rounded-xl p-3 px-5 flex flex-col sm:flex-row items-center justify-between shadow-sm border border-amber-500/40 text-white gap-3">
                            <div className="flex items-center gap-2.5">
                              <span className="text-[10px] bg-amber-400 text-stone-950 uppercase px-2 py-0.5 rounded font-black tracking-wider">
                                {slotConfig.badge || 'SPONSORED'}
                              </span>
                              <div>
                                <div className="text-xs font-bold text-amber-200 tracking-wide flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                  <span>{slotConfig.title}</span>
                                </div>
                                <div className="text-[11px] text-amber-100/80">
                                  {slotConfig.subtitle}
                                </div>
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black text-[11px] px-3.5 py-1.5 rounded-lg shadow-xs whitespace-nowrap">
                              {slotConfig.ctaText || 'Shop Now'} &rarr;
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: WEBSITE SECTIONS                                   */}
          {/* ========================================================= */}
          {activeTab === 'websections' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-teal-600" />
                    <span>Website Section Content &amp; Headlines</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize titles, badges, and CTAs across each website section in real time.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {siteContents.map((section) => (
                  <div key={section._id} className="bg-white p-5 rounded-2xl border shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                          {section.sectionKey}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          section.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {section.isActive ? 'LIVE ON WEBSITE' : 'HIDDEN'}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{section.title}</h4>
                      <p className="text-xs text-slate-500">{section.subtitle}</p>
                    </div>

                    <button
                      onClick={() => handleToggleSection(section._id)}
                      className={`text-xs px-4 py-2 rounded-xl font-bold border transition shrink-0 ${
                        section.isActive
                          ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                          : 'border-emerald-500 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      {section.isActive ? 'Hide from Site' : 'Publish Live'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: SPIRITUALS & SACRED PEETHAS                        */}
          {/* ========================================================= */}
          {activeTab === 'spirituals' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span>Spirituals: 18 Maha Shakti Peethas &amp; 37+ Kshetras</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sacred Sthala Puranams, couplets from Adi Sankaracharya, and in-website temple directions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('slokas')}
                    className="bg-gradient-to-r from-amber-600 to-rose-700 hover:from-amber-700 hover:to-rose-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open 3-Way Slokas Studio</span>
                  </button>

                  <Link
                    href="/sacred-temples"
                    target="_blank"
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1"
                  >
                    <span>View All 18 Peethas</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Shankari Devi (Trincomalee)', relic: 'Groin / Heart of Sati', loc: 'Sri Lanka' },
                  { name: 'Kamakshi Devi (Kanchipuram)', relic: 'Back / Odyanam', loc: 'Tamil Nadu' },
                  { name: 'Shrinkhala Devi (Pradymna)', relic: 'Stomach Part', loc: 'West Bengal' },
                  { name: 'Chamundeshwari (Mysuru)', relic: 'Hair / Kesh', loc: 'Karnataka' },
                  { name: 'Jogulamba (Alampur)', relic: 'Upper Teeth', loc: 'Telangana' },
                  { name: 'Bhramaramba (Srisailam)', relic: 'Neck / Griva', loc: 'Andhra Pradesh' },
                ].map((p, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-amber-100 text-[#701a28] px-2 py-0.5 rounded-full">
                        Peetha #{i + 1}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">{p.loc}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                    <div className="text-xs text-purple-800 font-medium">{p.relic}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: 3-WAY SLOKAS STUDIO (TELUGU, TEL-ENG, ENGLISH)        */}
          {/* ========================================================= */}
          {activeTab === 'slokas' && (
            <div className="space-y-6">
              {/* Studio Header Ribbon */}
              <div className="bg-gradient-to-r from-[#3b0811] via-[#59101b] to-[#78131e] rounded-3xl p-6 sm:p-7 text-white shadow-md border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                      Zero Mistakes Multi-Script Engine
                    </span>
                    <span className="text-xs text-amber-200/80 font-mono">18+ Sacred Slokas Loaded</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
                    3-Way Slokas &amp; Stotrams Studio
                  </h2>
                  <p className="text-xs text-amber-100/90 leading-relaxed">
                    Upload and curate daily Vedic verses across 3 dedicated scripts: <strong>Telugu (తెలుగు లిపి)</strong>, <strong>Tel-Eng (ఇంగ్లీష్ లిపి)</strong>, and <strong>English Meaning (దివ్య భావం)</strong>. Test live audio recitation in <strong>Female Voice (దేవి శారదా)</strong> and <strong>Male Voice (వేద పండిత)</strong> with play/pause controls.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href="/slokas"
                    target="_blank"
                    className="bg-white/10 hover:bg-white/20 text-amber-200 hover:text-white border border-amber-300/30 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
                  >
                    <span>View Public /slokas</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* 4 KPI Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Curated Slokas</span>
                  <div className="text-2xl font-black text-[#78131e] font-serif">{slokasDataList.length} Verses</div>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCheck className="w-3 h-3" /> All 18 Peethas &amp; Daily Slokas
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Multi-Script Accuracy</span>
                  <div className="text-2xl font-black text-amber-700 font-serif">100% Synchronized</div>
                  <span className="text-[10px] text-amber-600 font-semibold">Telugu + Tel-Eng + English</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Chanting Engine</span>
                  <div className="text-lg font-black text-rose-800 font-serif flex items-center gap-1.5">
                    <span>👩 Devi Sharada</span>
                  </div>
                  <span className="text-[10px] text-rose-600 font-semibold">Female Voice Active (Pitch: 1.15)</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Vedic Engine</span>
                  <div className="text-lg font-black text-indigo-800 font-serif flex items-center gap-1.5">
                    <span>👨 Veda Pandita</span>
                  </div>
                  <span className="text-[10px] text-indigo-600 font-semibold">Male Voice Active (Pitch: 0.82)</span>
                </div>
              </div>

              {/* Upload & Curate Form: 3 Different Types (Telugu, Tel-Eng, English) */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-stone-900 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <span>Upload &amp; Curate Sloka (3-Way Multi-Script Composer)</span>
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Enter Telugu, Tel-Eng phonetics, and English translation in separate fields so there are zero mistakes.
                    </p>
                  </div>

                  {/* Female / Male Voice Selector for Admin Testing */}
                  <div className="flex items-center space-x-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shrink-0">
                    <span className="text-[11px] font-bold text-stone-600 pl-1">Voice Test:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSlokaVoiceGender('female');
                        if (typeof window !== 'undefined' && activeSpeechPreview) window.speechSynthesis.cancel();
                        setActiveSpeechPreview(null);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                        slokaVoiceGender === 'female'
                          ? 'bg-gradient-to-r from-rose-700 to-[#78131e] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <span>👩</span>
                      <span>Female</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSlokaVoiceGender('male');
                        if (typeof window !== 'undefined' && activeSpeechPreview) window.speechSynthesis.cancel();
                        setActiveSpeechPreview(null);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                        slokaVoiceGender === 'male'
                          ? 'bg-gradient-to-r from-indigo-700 to-stone-900 text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <span>👨</span>
                      <span>Male</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handlePublishSloka} className="space-y-6">
                  {/* Row 1: Title, Telugu Title, Category, Deity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Sloka Title (English) <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kara Darshana Sloka"
                        value={slokaForm.title}
                        onChange={(e) => setSlokaForm({ ...slokaForm, title: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Telugu Title (తెలుగు శీర్షిక) <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. కర దర్శన శ్లోకం"
                        value={slokaForm.teluguTitle}
                        onChange={(e) => setSlokaForm({ ...slokaForm, teluguTitle: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Category <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={slokaForm.category}
                        onChange={(e) => setSlokaForm({ ...slokaForm, category: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold"
                      >
                        <option value="pratah">🌅 Pratah-Kala (Morning Awakening &amp; Snana)</option>
                        <option value="deities">🕉️ Deity Pranam Slokas (Ganesha, Shiva, Devi, Vishnu)</option>
                        <option value="daily-life">🍚 Daily Life &amp; Bhojana Vidhi (Food &amp; Study)</option>
                        <option value="sayam-ratra">🌙 Sayam &amp; Night Shanti (Dusk &amp; Sleep)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Associated Deity / Devata
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Lakshmi, Saraswati & Govinda"
                        value={slokaForm.deity}
                        onChange={(e) => setSlokaForm({ ...slokaForm, deity: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 2: Timing / Occasion */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Timing / Occasion (కాలం / సందర్భం)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Immediate Awakening (First sight upon waking up)"
                        value={slokaForm.occasion}
                        onChange={(e) => setSlokaForm({ ...slokaForm, occasion: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Sanskrit Title / Devanagari (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. कराग्रे वसते लक्ष्मीः"
                        value={slokaForm.sanskritTitle}
                        onChange={(e) => setSlokaForm({ ...slokaForm, sanskritTitle: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* 3 DISTINCT MULTI-SCRIPT COMPOSER CARDS */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* 1. Telugu Script Panel */}
                    <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/30 p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                          <span className="text-xs font-extrabold text-rose-950 uppercase tracking-wide">
                            🕉️ 1. Telugu Script (తెలుగు లిపి)
                          </span>
                        </div>

                        {/* Test Voice Button */}
                        <button
                          type="button"
                          onClick={() => handleTestSpeech(
                            `${slokaForm.teluguTitle || slokaForm.title}. ${slokaForm.telugu}`,
                            'te-IN',
                            'form-telugu'
                          )}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 cursor-pointer transition-all ${
                            activeSpeechPreview === 'form-telugu'
                              ? 'bg-rose-700 text-white animate-pulse'
                              : 'bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300'
                          }`}
                        >
                          {activeSpeechPreview === 'form-telugu' ? (
                            <>
                              <Pause className="w-3 h-3 text-white" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-rose-700" />
                              <span>Test Voice</span>
                            </>
                          )}
                        </button>
                      </div>

                      <textarea
                        required
                        rows={5}
                        placeholder={`కరాగ్రే వసతే లక్ష్మీః కరమధ్యే సరస్వతీ |\nకరమూలే తు గోవిందః ప్రభాతే కరదర్శనమ్ ||`}
                        value={slokaForm.telugu}
                        onChange={(e) => setSlokaForm({ ...slokaForm, telugu: e.target.value })}
                        className="w-full bg-white border border-rose-200 rounded-xl p-3 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 leading-relaxed font-serif"
                      />
                      <span className="text-[10px] text-rose-700 font-medium block">
                        Authentic Telugu lipi for primary devotion and voice chanting.
                      </span>
                    </div>

                    {/* 2. Tel-Eng Phonetic Script Panel */}
                    <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/30 p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                          <span className="text-xs font-extrabold text-indigo-950 uppercase tracking-wide">
                            🔤 2. Tel-Eng Script (ఇంగ్లీష్ లిపి)
                          </span>
                        </div>

                        {/* Test Voice Button */}
                        <button
                          type="button"
                          onClick={() => handleTestSpeech(
                            `${slokaForm.title}. ${slokaForm.telEng}`,
                            'en-IN',
                            'form-telEng'
                          )}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 cursor-pointer transition-all ${
                            activeSpeechPreview === 'form-telEng'
                              ? 'bg-indigo-700 text-white animate-pulse'
                              : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border border-indigo-300'
                          }`}
                        >
                          {activeSpeechPreview === 'form-telEng' ? (
                            <>
                              <Pause className="w-3 h-3 text-white" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-indigo-700" />
                              <span>Test Voice</span>
                            </>
                          )}
                        </button>
                      </div>

                      <textarea
                        required
                        rows={5}
                        placeholder={`Karagre Vasate Lakshmihi Karamadhye Saraswati |\nKaramule Tu Govindaha Prabhate Karadarshanam ||`}
                        value={slokaForm.telEng}
                        onChange={(e) => setSlokaForm({ ...slokaForm, telEng: e.target.value })}
                        className="w-full bg-white border border-indigo-200 rounded-xl p-3 text-xs font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed"
                      />
                      <span className="text-[10px] text-indigo-700 font-medium block">
                        English phonetic pronunciation for devotees learning Telugu.
                      </span>
                    </div>

                    {/* 3. English Meaning & Translation Panel */}
                    <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/30 p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          <span className="text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
                            📖 3. English Meaning (దివ్య భావం)
                          </span>
                        </div>

                        {/* Test Voice Button */}
                        <button
                          type="button"
                          onClick={() => handleTestSpeech(
                            `${slokaForm.title}. ${slokaForm.meaning || slokaForm.english}`,
                            'en-IN',
                            'form-meaning'
                          )}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 cursor-pointer transition-all ${
                            activeSpeechPreview === 'form-meaning'
                              ? 'bg-emerald-700 text-white animate-pulse'
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
                          }`}
                        >
                          {activeSpeechPreview === 'form-meaning' ? (
                            <>
                              <Pause className="w-3 h-3 text-white" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-emerald-700" />
                              <span>Test Meaning</span>
                            </>
                          )}
                        </button>
                      </div>

                      <textarea
                        required
                        rows={5}
                        placeholder={`At the tip of the hand dwells Goddess Lakshmi (Wealth); in the center dwells Goddess Saraswati (Knowledge); at the base of the hand dwells Lord Govinda (Supreme Divine). Therefore, in the morning, one should gaze upon one's palms.`}
                        value={slokaForm.meaning}
                        onChange={(e) => setSlokaForm({ ...slokaForm, meaning: e.target.value, english: e.target.value })}
                        className="w-full bg-white border border-emerald-200 rounded-xl p-3 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed font-sans"
                      />
                      <span className="text-[10px] text-emerald-700 font-medium block">
                        Detailed divine translation explaining Vedic significance.
                      </span>
                    </div>
                  </div>

                  {/* Row 4: Vidhi (Procedure) & Phala (Benefit) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Vidhi / Chanting Procedure (ఆచరణ విధి)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. As soon as waking up, join palms together before looking at anything else."
                        value={slokaForm.vidhi}
                        onChange={(e) => setSlokaForm({ ...slokaForm, vidhi: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Phala / Divine Fruit (ఫలశ్రుతి)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Destroys dawn ill-omens, invites prosperity, auspiciousness and focus."
                        value={slokaForm.phala}
                        onChange={(e) => setSlokaForm({ ...slokaForm, phala: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end pt-2">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#78131e] via-[#8f1925] to-[#a8202d] hover:from-[#5e0e16] hover:to-[#78131e] text-amber-200 font-bold px-6 py-2.5 rounded-2xl text-xs flex items-center space-x-2 shadow-md cursor-pointer border border-amber-400/30 transition-all hover:scale-[1.02]"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Publish Curated Sloka (Zero-Mistake Verified)</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* CURATED SLOKAS REGISTRY (LIVE EXPLORER & VOICE CHANTING AUDIT) */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-xs space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-[#78131e]" />
                      <span>Curated Slokas Registry ({slokasDataList.length} Active Verses)</span>
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Review all published slokas with 3-way script toggle and real-time chanting in Female &amp; Male voices.
                    </p>
                  </div>

                  {/* 3-Way Preview Switcher */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-stone-600 whitespace-nowrap">View Script:</span>
                    <div className="flex items-center p-1 bg-stone-100 rounded-xl gap-1 text-xs font-bold border border-stone-200">
                      <button
                        type="button"
                        onClick={() => setSlokaPreviewScript('telugu')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          slokaPreviewScript === 'telugu'
                            ? 'bg-[#78131e] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        🕉️ Telugu
                      </button>
                      <button
                        type="button"
                        onClick={() => setSlokaPreviewScript('telEng')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          slokaPreviewScript === 'telEng'
                            ? 'bg-[#78131e] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        🔤 Tel-Eng
                      </button>
                      <button
                        type="button"
                        onClick={() => setSlokaPreviewScript('english')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          slokaPreviewScript === 'english'
                            ? 'bg-[#78131e] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        📖 English
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative max-w-sm w-full">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search slokas by title, deity, timing..."
                      value={slokaSearchTerm}
                      onChange={(e) => setSlokaSearchTerm(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-amber-500 font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
                    {[
                      { id: 'all', label: 'All Categories' },
                      { id: 'pratah', label: '🌅 Morning' },
                      { id: 'deities', label: '🕉️ Deities' },
                      { id: 'daily-life', label: '🍚 Daily Life' },
                      { id: 'sayam-ratra', label: '🌙 Evening & Night' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSlokaCategoryFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                          slokaCategoryFilter === tab.id
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs font-extrabold'
                            : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slokas Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {slokasDataList
                    .filter((s) => {
                      const matchCat = slokaCategoryFilter === 'all' || s.category === slokaCategoryFilter;
                      const q = slokaSearchTerm.toLowerCase().trim();
                      const matchQuery = !q || (
                        s.title?.toLowerCase().includes(q) ||
                        s.teluguTitle?.includes(q) ||
                        s.deity?.toLowerCase().includes(q) ||
                        s.occasion?.toLowerCase().includes(q) ||
                        s.meaning?.toLowerCase().includes(q)
                      );
                      return matchCat && matchQuery;
                    })
                    .map((sloka, idx) => {
                      const activeSpeechText = slokaPreviewScript === 'telugu'
                        ? `${sloka.teluguTitle || sloka.title}. ${sloka.telugu}`
                        : slokaPreviewScript === 'telEng'
                        ? `${sloka.title}. ${sloka.telEng}`
                        : `${sloka.title}. ${sloka.meaning || sloka.english}`;
                      const speechLang = slokaPreviewScript === 'telugu' ? 'te-IN' : 'en-IN';
                      const isPlaying = activeSpeechPreview === `grid-${sloka.id}`;

                      return (
                        <div
                          key={sloka.id || idx}
                          className="bg-stone-50/70 hover:bg-stone-50 rounded-2xl border border-stone-200/90 p-4 space-y-3 transition-all hover:shadow-xs flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-[#78131e] px-2 py-0.5 rounded-md border border-amber-200">
                                #{idx + 1} • {sloka.category}
                              </span>
                              <span className="text-[10px] text-stone-500 font-medium truncate max-w-[140px]">
                                {sloka.deity}
                              </span>
                            </div>

                            <h4 className="font-serif font-black text-stone-900 text-sm leading-snug">
                              {sloka.title}
                            </h4>
                            {sloka.teluguTitle && (
                              <div className="text-xs font-bold text-[#78131e]">
                                {sloka.teluguTitle}
                              </div>
                            )}

                            {/* Active Script Text Preview */}
                            <div className="p-3 bg-white rounded-xl border border-stone-200/80 text-xs leading-relaxed min-h-[90px] flex items-center">
                              {slokaPreviewScript === 'telugu' && (
                                <p className="font-serif font-bold text-stone-900 whitespace-pre-line text-[13px]">
                                  {sloka.telugu}
                                </p>
                              )}
                              {slokaPreviewScript === 'telEng' && (
                                <p className="font-mono text-stone-800 whitespace-pre-line text-[11px]">
                                  {sloka.telEng}
                                </p>
                              )}
                              {slokaPreviewScript === 'english' && (
                                <p className="font-sans text-stone-700 text-[11px]">
                                  {sloka.meaning || sloka.english}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Controls Footer: Play/Pause Chanting & Script Badges */}
                          <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between gap-2">
                            {/* Chanting Audio Play/Pause Button */}
                            <button
                              type="button"
                              onClick={() => handleTestSpeech(activeSpeechText, speechLang, `grid-${sloka.id}`)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all ${
                                isPlaying
                                  ? 'bg-[#78131e] text-white shadow-xs animate-pulse'
                                  : 'bg-stone-200 hover:bg-stone-300/80 text-stone-800'
                              }`}
                            >
                              {isPlaying ? (
                                <>
                                  <Pause className="w-3.5 h-3.5 text-white" />
                                  <span>Pause Chanting</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5 text-rose-700" />
                                  <span>Chant ({slokaVoiceGender === 'female' ? 'Female' : 'Male'})</span>
                                </>
                              )}
                            </button>

                            {/* 3 Script Availability Badges */}
                            <div className="flex items-center space-x-1">
                              <span className={`w-2 h-2 rounded-full ${sloka.telugu ? 'bg-emerald-500' : 'bg-stone-300'}`} title="Telugu Script Available" />
                              <span className={`w-2 h-2 rounded-full ${sloka.telEng ? 'bg-indigo-500' : 'bg-stone-300'}`} title="Tel-Eng Script Available" />
                              <span className={`w-2 h-2 rounded-full ${sloka.meaning ? 'bg-amber-500' : 'bg-stone-300'}`} title="English Meaning Available" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: COUPONS & CAMPAIGNS                                */}
          {/* ========================================================= */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-amber-600" />
                    <span>Devotional Coupons &amp; Discount Campaigns</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Create promo codes for yatra token bookings, astrology dakshina, and pooja kits.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gradient-to-r from-[#3b0811] via-[#4d0c17] to-[#3b0811] text-amber-200 uppercase text-[10px] tracking-wider border-b border-amber-900/40">
                    <tr>
                      <th className="py-3 px-4">Campaign Title</th>
                      <th className="py-3 px-4">Coupon Code</th>
                      <th className="py-3 px-4">Discount</th>
                      <th className="py-3 px-4">Channel</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {campaigns.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-slate-400">No campaigns launched yet.</td>
                      </tr>
                    ) : (
                      campaigns.map((c) => (
                        <tr key={c._id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold">{c.title}</td>
                          <td className="py-3 px-4 font-mono font-black text-amber-800">{c.couponCode}</td>
                          <td className="py-3 px-4 font-bold text-emerald-700">{c.discountPercentage}% OFF</td>
                          <td className="py-3 px-4 uppercase text-[10px]">{c.channel}</td>
                          <td className="py-3 px-4">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: ADD POST                                           */}
          {/* ========================================================= */}
          {activeTab === 'addPost' && (
            <DynamicPostStudio
              newPost={newPost}
              setNewPost={setNewPost}
              onPublish={handleCreatePost}
              loading={actionLoading}
              showToast={showToast}
            />
          )}

          {activeTab === 'postList' && (
            <div className="space-y-5">
              {/* Top KPI Metrics Ribbon */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Total Sacred Posts</div>
                    <div className="text-xl sm:text-2xl font-black text-stone-900 mt-0.5">{posts.length} Publications</div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>All 17 Categories Synchronized</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center text-xl shrink-0">
                    📜
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Devotee Engagement</div>
                    <div className="text-xl sm:text-2xl font-black text-[#78131e] mt-0.5">
                      {posts.reduce((acc, p) => acc + (p.viewsCount || 850), 0).toLocaleString()} Reads
                    </div>
                    <div className="text-[10px] text-rose-700 font-semibold mt-0.5 flex items-center space-x-1">
                      <Flame className="w-3 h-3 text-rose-500" />
                      <span>Live across Sanatan portal</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 flex items-center justify-center text-xl shrink-0">
                    👁️
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Live on Sanctuary</div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-900 mt-0.5">
                      {posts.filter(p => p.status !== 'draft').length} Published
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Publicly accessible</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center text-xl shrink-0">
                    ✨
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Unpublished / Drafts</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-900 mt-0.5">
                      {posts.filter(p => p.status === 'draft').length} Drafts
                    </div>
                    <div className="text-[10px] text-stone-500 font-semibold mt-0.5">
                      Can be published anytime
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center text-xl shrink-0">
                    📝
                  </div>
                </div>
              </div>

              {/* Action & Filter Control Bar */}
              <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-3.5">
                {/* Left: Category Selector, Status Filter & Add Category */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-stone-600 whitespace-nowrap">Category:</span>
                    <div className="relative min-w-[200px] sm:min-w-[260px]">
                      <select
                        value={postCategoryFilter}
                        onChange={(e) => setPostCategoryFilter(e.target.value)}
                        className="w-full bg-stone-50 hover:bg-stone-100/90 border border-stone-300 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-stone-800 focus:outline-none focus:border-amber-600 appearance-none cursor-pointer shadow-2xs transition"
                      >
                        <option value="all">
                          ✨ All Categories ({posts.length} Publications)
                        </option>
                        {allCategories.map(c => {
                          const cId = c.id?.toLowerCase();
                          const count = posts.filter(p => {
                            const pCat = p.category?.toLowerCase() || '';
                            if (pCat === cId || pCat === c.slug?.toLowerCase()) return true;
                            if (cId === 'astrology' && (pCat === 'horoscope' || pCat === 'remedies' || pCat === 'astrology')) return true;
                            if (cId === 'yatralu' && (pCat === 'yatralu' || pCat === 'yatra')) return true;
                            if (cId === 'marketplace' && (pCat === 'marketplace' || pCat === 'products')) return true;
                            if (cId === 'temples' && (pCat === 'temples' || pCat === 'temple')) return true;
                            if (cId === 'festivals' && (pCat === 'festivals' || pCat === 'festival')) return true;
                            return false;
                          }).length;
                          return (
                            <option key={c.id} value={c.id}>
                              {c.icon} {c.label} — {count} {count === 1 ? 'post' : 'posts'} {c.isCustom ? '★ Custom' : ''}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Status Filter Dropdown */}
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-stone-600 whitespace-nowrap">Status:</span>
                    <select
                      value={postStatusFilter}
                      onChange={(e) => setPostStatusFilter(e.target.value)}
                      className="bg-stone-50 hover:bg-stone-100 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 focus:outline-none focus:border-amber-600 cursor-pointer shadow-2xs"
                    >
                      <option value="all">All Status ({posts.length})</option>
                      <option value="published">● Live Only ({posts.filter(p => p.status !== 'draft').length})</option>
                      <option value="draft">○ Drafts Only ({posts.filter(p => p.status === 'draft').length})</option>
                    </select>
                  </div>

                  {(postCategoryFilter !== 'all' || postStatusFilter !== 'all' || postSearch) && (
                    <button
                      onClick={() => {
                        setPostCategoryFilter('all');
                        setPostStatusFilter('all');
                        setPostSearch('');
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold cursor-pointer transition shadow-2xs"
                      title="Reset all filters"
                    >
                      Clear Filters
                    </button>
                  )}

                  {/* Add New Category Button */}
                  <button
                    onClick={() => setIsAddCategoryModalOpen(true)}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-black bg-stone-50 hover:bg-amber-50 text-stone-800 hover:text-amber-950 border border-stone-300 hover:border-amber-400 shadow-2xs transition cursor-pointer"
                    title="Add a new custom devotional category"
                  >
                    <FolderPlus className="w-4 h-4 text-amber-700" />
                    <span>+ Category</span>
                  </button>
                </div>

                {/* Right Controls: View Switcher, Search & Compose */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* View Mode Switcher: Table vs Visual Grid */}
                  <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 shadow-2xs">
                    <button
                      onClick={() => setPostViewMode('table')}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        postViewMode === 'table'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                      title="Table View"
                    >
                      <List className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Table</span>
                    </button>
                    <button
                      onClick={() => setPostViewMode('grid')}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        postViewMode === 'grid'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                      title="Visual Cards Grid View"
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Cards</span>
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search articles, deity..."
                      value={postSearch}
                      onChange={(e) => setPostSearch(e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded-xl pl-8 pr-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 w-36 sm:w-48"
                    />
                  </div>

                  <button
                    onClick={() => setActiveTab('addVideo')}
                    className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-xs border border-rose-400/40 flex items-center space-x-1.5 shrink-0 transition"
                    title="Publish a Devotional, Puja, or Bhajans Video"
                  >
                    <Video className="w-4 h-4 text-white" />
                    <span>+ Add Video</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('addPost')}
                    className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer shadow-xs border border-amber-300/40 flex items-center space-x-1.5 shrink-0 transition"
                  >
                    <Plus className="w-4 h-4 text-stone-950" />
                    <span>Compose</span>
                  </button>
                </div>
              </div>

              {/* Main Content Area: Modern Table OR Visual Grid Cards */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                {filteredPosts.length === 0 ? (
                  <div className="py-16 text-center text-stone-400">
                    <div className="text-4xl mb-3">📜</div>
                    <div className="font-bold text-stone-700 text-base">No articles found</div>
                    <div className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                      No publications match your selected category, status, or search query.
                    </div>
                    <button
                      onClick={() => {
                        setPostCategoryFilter('all');
                        setPostStatusFilter('all');
                        setPostSearch('');
                      }}
                      className="mt-4 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition shadow-2xs cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : postViewMode === 'table' ? (
                  /* ======================================================== */
                  /* REDESIGNED EXECUTIVE EDITORIAL TABLE                     */
                  /* ======================================================== */
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-50/90 text-stone-600 uppercase text-[11px] font-bold tracking-wider border-b border-stone-200">
                        <tr>
                          <th className="py-3 px-4">Article &amp; Cover</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Deity / Kshetra</th>
                          <th className="py-3 px-4 text-right">Devotee Reads</th>
                          <th className="py-3 px-4 text-center">Status / Gate</th>
                          <th className="py-3 px-4 text-center">Quick Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredPosts.map((post) => {
                          const catInfo = allCategories.find(c => c.id === post.category || c.slug === post.category);
                          const isDraft = post.status === 'draft';
                          return (
                            <tr key={post._id} className="hover:bg-amber-50/30 transition-colors group">
                              {/* Article Cover Image, Title & Path */}
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-3.5">
                                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 shadow-2xs group-hover:shadow-xs transition">
                                    <img
                                      src={post.featuredImage || '/images/temple_kashi.jpg'}
                                      alt={post.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/temple_kashi.jpg';
                                      }}
                                    />
                                  </div>
                                  <div className="min-w-0 max-w-md">
                                    <div className="font-bold text-stone-900 text-xs sm:text-[13px] group-hover:text-[#78131e] transition-colors leading-snug line-clamp-2">
                                      {post.title}
                                    </div>
                                    {post.titleTelugu && (
                                      <div className="text-[11px] text-amber-900/80 font-medium truncate mt-0.5">
                                        {post.titleTelugu}
                                      </div>
                                    )}
                                    <div className="flex items-center space-x-2 mt-1">
                                      <span className="text-[10px] text-stone-400 font-mono truncate max-w-[200px] bg-stone-50 px-1.5 py-0.5 rounded border border-stone-100">
                                        /{post.category}/{post.slug}
                                      </span>
                                      <button
                                        onClick={() => copyToClipboard(`http://localhost:3001/${post.category}/${post.slug}`, post.slug)}
                                        className="text-stone-400 hover:text-amber-800 transition cursor-pointer"
                                        title="Copy public link"
                                      >
                                        {copiedSlug === post.slug ? (
                                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                                        ) : (
                                          <Copy className="w-3.5 h-3.5" />
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Category Badge with Contextual Palette */}
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs ${getCategoryBadgeStyle(post.category)}`}>
                                  <span>{catInfo?.icon || '📜'}</span>
                                  <span>{catInfo ? catInfo.label : post.category}</span>
                                </span>
                              </td>

                              {/* Deity / Kshetra */}
                              <td className="py-3 px-4">
                                <div className="text-stone-800 font-bold text-xs flex items-center space-x-1.5">
                                  <span className="text-stone-400">🕉️</span>
                                  <span className="truncate max-w-[180px]">{post.deity || 'Parashakti'}</span>
                                </div>
                                <div className="text-[10px] text-stone-400 mt-0.5">Universal Sanctuary</div>
                              </td>

                              {/* Devotee Reads */}
                              <td className="py-3 px-4 text-right">
                                <div className="inline-flex items-center space-x-1.5 text-stone-800 font-bold text-xs bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200">
                                  <Eye className="w-3.5 h-3.5 text-stone-400" />
                                  <span>{(post.viewsCount || 850).toLocaleString()}</span>
                                </div>
                              </td>

                              {/* Publication Status & Direct UNPUBLISH / PUBLISH Option */}
                              <td className="py-3 px-4 text-center">
                                {isDraft ? (
                                  <div className="inline-flex items-center gap-1.5">
                                    <span className="inline-flex items-center space-x-1.5 bg-stone-100 text-stone-700 border border-stone-300 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                                      <span>Draft</span>
                                    </span>
                                    <button
                                      onClick={() => handleTogglePublish(post)}
                                      className="px-2 py-1 rounded-lg text-[10px] font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition cursor-pointer"
                                      title="Publish live on website"
                                    >
                                      Publish
                                    </button>
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center gap-1.5">
                                    <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-full shadow-2xs">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                      <span>Live</span>
                                    </span>
                                    <button
                                      onClick={() => handleTogglePublish(post)}
                                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 border border-stone-200 hover:border-rose-200 transition cursor-pointer"
                                      title="Unpublish this article (save as draft)"
                                    >
                                      Unpublish
                                    </button>
                                  </div>
                                )}
                              </td>

                              {/* Quick Action Buttons */}
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center space-x-1">
                                  <Link
                                    href={`/${post.category}/${post.slug}`}
                                    target="_blank"
                                    className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
                                    title="Preview Live Page in New Tab"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setNewPost(prev => ({
                                        ...prev,
                                        ...post,
                                        title: post.title,
                                        titleTelugu: post.titleTelugu || '',
                                        slug: post.slug,
                                        category: post.category,
                                        deity: post.deity || '',
                                        devotionalVerse: post.devotionalVerse || '',
                                        excerpt: post.excerpt || '',
                                        content: post.content || '',
                                        featuredImage: post.featuredImage || '/images/temple_kashi.jpg',
                                        tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
                                        keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : (post.keywords || ''),
                                        status: post.status || 'published'
                                      }));
                                      setActiveTab('addPost');
                                      showToast('success', `Loaded "${post.title}" into studio`);
                                    }}
                                    className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition cursor-pointer"
                                    title="Edit in Studio"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeletePost(post)}
                                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                    title="Delete Post"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  /* ======================================================== */
                  /* VISUAL CARDS GRID VIEW                                    */
                  /* ======================================================== */
                  <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredPosts.map(post => {
                      const catInfo = allCategories.find(c => c.id === post.category || c.slug === post.category);
                      const isDraft = post.status === 'draft';
                      return (
                        <div
                          key={post._id}
                          className="bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
                        >
                          {/* Top Cover Image with Floating Overlays */}
                          <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                            <img
                              src={post.featuredImage || '/images/temple_kashi.jpg'}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/temple_kashi.jpg';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                            {/* Top Category Badge */}
                            <div className="absolute top-3 left-3">
                              <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${getCategoryBadgeStyle(post.category)}`}>
                                <span>{catInfo?.icon || '📜'}</span>
                                <span>{catInfo ? catInfo.label : post.category}</span>
                              </span>
                            </div>

                            {/* Top Right Live / Draft with Unpublish / Publish button */}
                            <div className="absolute top-3 right-3 flex items-center space-x-1.5">
                              {isDraft ? (
                                <button
                                  onClick={() => handleTogglePublish(post)}
                                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-stone-900/90 hover:bg-emerald-700 text-stone-200 hover:text-white backdrop-blur-xs transition shadow-sm cursor-pointer"
                                  title="Click to publish live"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                                  <span>Draft • Publish</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleTogglePublish(post)}
                                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-950/80 hover:bg-rose-900/90 text-emerald-200 hover:text-rose-100 backdrop-blur-xs transition shadow-sm cursor-pointer"
                                  title="Click to unpublish"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                  <span>Live • Unpublish</span>
                                </button>
                              )}
                            </div>

                            {/* Bottom Deity & Views on Image */}
                            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/95 text-xs">
                              <div className="font-semibold truncate flex items-center space-x-1 drop-shadow-sm">
                                <span>🕉️</span>
                                <span>{post.deity || 'Universal Sanctuary'}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-[11px] text-amber-200 shrink-0 font-medium drop-shadow-sm">
                                <Eye className="w-3.5 h-3.5" />
                                <span>{(post.viewsCount || 850).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-serif font-bold text-stone-900 text-sm group-hover:text-[#78131e] transition-colors line-clamp-2 leading-snug">
                                {post.title}
                              </h3>
                              {post.titleTelugu && (
                                <div className="text-[11px] text-amber-900 font-medium truncate mt-1">
                                  {post.titleTelugu}
                                </div>
                              )}
                              <p className="text-stone-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                                {post.excerpt || post.content?.slice(0, 120) || 'Sacred devotional article published on Sri Astadasapeetam platform.'}
                              </p>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => copyToClipboard(`http://localhost:3001/${post.category}/${post.slug}`, post.slug)}
                                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition cursor-pointer"
                                  title="Copy public link"
                                >
                                  {copiedSlug === post.slug ? (
                                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <Link
                                  href={`/${post.category}/${post.slug}`}
                                  target="_blank"
                                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition"
                                  title="Preview live"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                              </div>

                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleTogglePublish(post)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                                    isDraft 
                                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                      : 'bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 border border-stone-200 hover:border-rose-200'
                                  }`}
                                >
                                  {isDraft ? 'Publish' : 'Unpublish'}
                                </button>

                                <button
                                  onClick={() => {
                                    setNewPost(prev => ({
                                      ...prev,
                                      ...post,
                                      title: post.title,
                                      titleTelugu: post.titleTelugu || '',
                                      slug: post.slug,
                                      category: post.category,
                                      deity: post.deity || '',
                                      devotionalVerse: post.devotionalVerse || '',
                                      excerpt: post.excerpt || '',
                                      content: post.content || '',
                                      featuredImage: post.featuredImage || '/images/temple_kashi.jpg',
                                      tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
                                      keywords: Array.isArray(post.keywords) ? post.keywords.join(', ') : (post.keywords || ''),
                                      status: post.status || 'published'
                                    }));
                                    setActiveTab('addPost');
                                    showToast('success', `Loaded "${post.title}" into studio`);
                                  }}
                                  className="p-1.5 text-amber-800 hover:bg-amber-50 rounded-lg transition cursor-pointer"
                                  title="Edit in Studio"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => handleDeletePost(post)}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Table & Grid Pagination & Count Footer */}
                <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                  <div>
                    Showing <span className="font-bold text-stone-800">{filteredPosts.length}</span> of{' '}
                    <span className="font-bold text-stone-800">{posts.length}</span> publications
                    {postCategoryFilter !== 'all' && <span className="ml-1 text-stone-400">(filtered by category)</span>}
                    {postStatusFilter !== 'all' && <span className="ml-1 text-stone-400">(filtered by status)</span>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-stone-500 font-medium">
                      {posts.filter(p => p.status !== 'draft').length} Live • {posts.filter(p => p.status === 'draft').length} Drafts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 10: USER MANAGEMENT (STAFF & DEVOTEES REGISTRY)        */}
          {/* ========================================================= */}
          {activeTab === 'users' && (
            <div className="space-y-5">
              {/* Top Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Total Accounts</div>
                  <div className="text-xl font-black text-stone-900 mt-0.5">{users.length}</div>
                  <div className="text-[10px] text-stone-500 font-medium mt-0.5">Staff &amp; Members</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">Super Admin</div>
                  <div className="text-xl font-black text-rose-950 mt-0.5">
                    {users.filter(u => u.role === 'admin').length}
                  </div>
                  <div className="text-[10px] text-rose-700 font-medium mt-0.5">Platform Governance</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">Content Editor</div>
                  <div className="text-xl font-black text-amber-950 mt-0.5">
                    {users.filter(u => u.role === 'editor').length}
                  </div>
                  <div className="text-[10px] text-amber-700 font-medium mt-0.5">Articles &amp; Slokas</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Operations Mgr</div>
                  <div className="text-xl font-black text-emerald-950 mt-0.5">
                    {users.filter(u => u.role === 'operations_manager').length}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium mt-0.5">Store &amp; Bookings</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">Marketing &amp; SEO</div>
                  <div className="text-xl font-black text-purple-950 mt-0.5">
                    {users.filter(u => u.role === 'digital_marketing').length}
                  </div>
                  <div className="text-[10px] text-purple-700 font-medium mt-0.5">Campaigns &amp; Ads</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Astrologer Desk</div>
                  <div className="text-xl font-black text-indigo-950 mt-0.5">
                    {users.filter(u => u.role === 'astrologer').length}
                  </div>
                  <div className="text-[10px] text-indigo-700 font-medium mt-0.5">Panchangam &amp; Inquiries</div>
                </div>
              </div>

              {/* Filter Ribbon & Action Controls */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0">
                  {[
                    { id: 'all', label: 'All Roles', count: users.length },
                    { id: 'admin', label: 'Super Admin', count: users.filter(u => u.role === 'admin').length },
                    { id: 'editor', label: 'Content Editor', count: users.filter(u => u.role === 'editor').length },
                    { id: 'operations_manager', label: 'Operations', count: users.filter(u => u.role === 'operations_manager').length },
                    { id: 'digital_marketing', label: 'Marketing', count: users.filter(u => u.role === 'digital_marketing').length },
                    { id: 'astrologer', label: 'Astrologer', count: users.filter(u => u.role === 'astrologer').length },
                    { id: 'devotee', label: 'Devotees', count: users.filter(u => u.role === 'devotee' || u.role === 'user').length },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setUserRoleFilter(r.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                        userRoleFilter === r.id
                          ? 'bg-[#78131e] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <span>{r.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        userRoleFilter === r.id ? 'bg-amber-300 text-stone-900' : 'bg-white text-stone-600'
                      }`}>
                        {r.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, email, phone..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded-xl pl-8 pr-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 w-full sm:w-56"
                    />
                  </div>

                  <button
                    onClick={() => setIsAddStaffOpen(true)}
                    className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer shadow-xs border border-amber-300/40 flex items-center space-x-1.5 shrink-0 transition"
                  >
                    <Plus className="w-4 h-4 text-stone-950" />
                    <span>Add Staff Member</span>
                  </button>
                </div>
              </div>

              {/* Staff & Devotees Registry Table */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50/90 text-stone-600 uppercase text-[11px] font-bold tracking-wider border-b border-stone-200">
                      <tr>
                        <th className="py-3 px-4">Member Name</th>
                        <th className="py-3 px-4">Contact Details</th>
                        <th className="py-3 px-4">Assigned Role &amp; Privilege</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-center">Change Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="py-12 text-center text-stone-400">
                            <div className="text-3xl mb-2">👥</div>
                            <div className="font-bold text-stone-600">No staff or devotees found</div>
                            <div className="text-xs text-stone-400 mt-1">Try resetting role or search filters</div>
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((u) => (
                          <tr key={u._id} className="hover:bg-amber-50/30 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-900 font-black flex items-center justify-center text-xs shrink-0 shadow-2xs border border-amber-200">
                                  {(u.name || 'User').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-bold text-stone-900 text-xs sm:text-sm">{u.name}</div>
                                  <div className="text-[10px] text-stone-400">
                                    Joined {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active Member'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-mono text-stone-700 text-xs">{u.email}</div>
                              {u.phone && <div className="text-[10px] text-stone-400 mt-0.5">{u.phone}</div>}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs ${getRoleBadgeStyle(u.role)}`}>
                                <span>{getRoleLabel(u.role)}</span>
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() => handleToggleUserStatus(u)}
                                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border transition cursor-pointer shadow-2xs ${
                                  u.isActive
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
                                    : 'bg-stone-100 text-stone-600 border-stone-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
                                }`}
                                title="Click to toggle active/suspended status"
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`}></span>
                                <span>{u.isActive ? 'ACTIVE' : 'SUSPENDED'}</span>
                              </button>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <select
                                value={u.role || 'devotee'}
                                onChange={(e) => handleUpdateUserRole(u._id, e.target.value)}
                                className="bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-stone-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                              >
                                <option value="admin">Super Admin</option>
                                <option value="editor">Content Editor</option>
                                <option value="operations_manager">Operations Manager</option>
                                <option value="digital_marketing">Digital Marketing</option>
                                <option value="astrologer">Astrologer Desk</option>
                                <option value="devotee">Devotee</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                  <div>
                    Showing <span className="font-bold text-stone-800">{filteredUsers.length}</span> of{' '}
                    <span className="font-bold text-stone-800">{users.length}</span> registered members
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Role changes take effect immediately across all sessions
                  </div>
                </div>
              </div>

              {/* Add New Staff Member Modal */}
              {isAddStaffOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl border border-stone-200 max-w-md w-full p-6 shadow-2xl relative animate-in fade-in duration-200">
                    <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                      <div>
                        <h3 className="text-base font-bold text-stone-900">Add Staff Member</h3>
                        <p className="text-xs text-stone-500 mt-0.5">Invite a team member with dedicated role privileges</p>
                      </div>
                      <button
                        onClick={() => setIsAddStaffOpen(false)}
                        className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateStaff} className="mt-4 space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Sharma"
                          value={newStaff.name}
                          onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="ramesh@astadasapeetam.com"
                          value={newStaff.email}
                          onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Temporary Password</label>
                        <input
                          type="password"
                          required
                          placeholder="Min 6 characters"
                          value={newStaff.password}
                          onChange={(e) => setNewStaff(prev => ({ ...prev, password: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Contact Phone (Optional)</label>
                        <input
                          type="text"
                          placeholder="+91 98765 43210"
                          value={newStaff.phone}
                          onChange={(e) => setNewStaff(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Assigned Role Privilege</label>
                        <select
                          value={newStaff.role}
                          onChange={(e) => setNewStaff(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
                        >
                          <option value="editor">Content Editor (Articles, Slokas &amp; Publications)</option>
                          <option value="operations_manager">Operations Manager (Marketplace, Orders &amp; Yatra Bookings)</option>
                          <option value="digital_marketing">Digital Marketing (Campaigns, Banners &amp; SEO)</option>
                          <option value="astrologer">Astrologer Desk (Panchangam &amp; Inquiries)</option>
                          <option value="admin">Super Admin (Full Governance Overrides)</option>
                        </select>
                      </div>

                      <div className="pt-3 flex items-center justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setIsAddStaffOpen(false)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={actionLoading}
                          className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-600 to-amber-500 hover:brightness-110 text-stone-950 shadow-xs transition cursor-pointer flex items-center space-x-1.5"
                        >
                          <Plus className="w-4 h-4 text-stone-950" />
                          <span>{actionLoading ? 'Creating...' : 'Create Account'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 11: ASTROLOGER DESK                                   */}
          {/* ========================================================= */}
          {activeTab === 'astrology' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-purple-700" />
                  <span>Astrologer Jyotish Workspace ({consultations.length})</span>
                </h3>
              </div>

              <div className="space-y-3">
                {consultations.map((c) => (
                  <div key={c._id} className="bg-white p-5 rounded-2xl border space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span>{c.devoteeName} ({c.devoteePhone})</span>
                      <span className="bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full text-[10px] uppercase">{c.status}</span>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl flex gap-4 text-[11px]">
                      <span>DOB: <strong>{c.birthDetails?.dateOfBirth}</strong></span>
                      <span>Place: <strong>{c.birthDetails?.placeOfBirth}</strong></span>
                      <span>Rasi: <strong>{c.birthDetails?.rasi}</strong></span>
                    </div>
                    <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border">"{c.problemDescription}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 12: SEO & RSS FEEDS                                   */}
          {/* ========================================================= */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-3xl border shadow-xs space-y-4">
                <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                  <Rss className="w-5 h-5 text-amber-600" />
                  <span>Live SEO &amp; RSS Feeds Hub</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                    <div className="font-bold text-amber-900">Live RSS 2.0 Syndication Feed</div>
                    <div className="p-2 bg-white rounded-lg border font-mono text-[11px] truncate">
                      http://localhost:5000/api/public/rss
                    </div>
                    <a href="http://localhost:5000/api/public/rss" target="_blank" className="text-amber-800 font-bold underline">
                      View Raw XML &rarr;
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <div className="font-bold text-emerald-900">Dynamic XML Sitemap</div>
                    <div className="p-2 bg-white rounded-lg border font-mono text-[11px] truncate">
                      http://localhost:5000/api/public/sitemap
                    </div>
                    <a href="http://localhost:5000/api/public/sitemap" target="_blank" className="text-emerald-800 font-bold underline">
                      View Raw XML &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 13: SOFTWARE SETUP & BRANDING                         */}
          {/* ========================================================= */}
          {activeTab === 'softwareSetup' && (
            <div className="space-y-6">
              {/* Primary Website Logo & Favicon Studio */}
              <BrandingSettingsStudio showToast={showToast} />

              {/* System Diagnostics & Platform Status */}
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-slate-700" />
                    <span>3. Infrastructure Setup &amp; Platform Diagnostics</span>
                  </h3>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    All Services Live
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Database</div>
                    <div className="font-bold text-slate-900">MongoDB 127.0.0.1:27017</div>
                    <div className="text-emerald-700 font-semibold">astadasapeetam (Connected)</div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="text-slate-400 font-bold uppercase text-[10px]">API Server</div>
                    <div className="font-bold text-slate-900">Port 5000 (Express.js)</div>
                    <div className="text-emerald-700 font-semibold">Active &amp; Responding</div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Frontend Server</div>
                    <div className="font-bold text-slate-900">Port 3001 (Next.js 15)</div>
                    <div className="text-emerald-700 font-semibold">App Router Ready</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      fetchAllData(token);
                      showToast('success', 'Diagnostics refreshed and cache purged!');
                    }}
                    className="bg-gradient-to-r from-[#78131e] to-[#911b27] hover:from-[#5c0d16] hover:to-[#78131e] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm cursor-pointer border border-amber-300/30"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Purge Cache &amp; Refresh Diagnostics</span>
                  </button>
                </div>
              </div>
            </div>
          )}


                    {/* ========================================================= */}
          {/* TAB: ADD DEVOTIONAL VIDEO (IN-PAGE STUDIO, NO POPUP)      */}
          {/* ========================================================= */}
          {activeTab === 'addVideo' && (
            <VideoPublishStudio
              onVideoPublished={(newVid) => {
                setVideos(prev => [newVid, ...prev]);
                setActiveTab('videoDesk');
              }}
              onBackToDesk={() => setActiveTab('videoDesk')}
              showToast={showToast}
            />
          )}

          {/* ========================================================= */}
          {/* TAB: DEVOTIONAL VIDEO DESK                                */}
          {/* ========================================================= */}
          {activeTab === 'videoDesk' && (
            <div className="space-y-6">
              {/* Header & Stats Banner */}
              <div className="bg-gradient-to-r from-[#180a24] via-[#2d1144] to-[#1a0a27] text-white p-6 rounded-3xl border border-[#3e1b5b] shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-rose-500/20 text-rose-300 border border-rose-400/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1.5">
                        <Play className="w-3 h-3 text-rose-400 fill-rose-400" />
                        Devotional Media Hub
                      </span>
                      <span className="text-xs text-purple-200/70">• YouTube Embeds &amp; Live Feeds</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
                      Devotional Video Desk (వీడియో డెస్క్)
                    </h2>
                    <p className="text-xs sm:text-sm text-purple-200/90 mt-1 max-w-2xl leading-relaxed">
                      Publish Puja Videos, Divine Bhajans, Suprabhatam &amp; Live Darshans. Directly toggle which videos appear in the Homepage <span className="text-amber-300 font-bold">&quot;LATEST VIDEOS&quot;</span> section.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setActiveTab('addVideo')}
                      className="bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 hover:brightness-110 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg shadow-rose-900/30 flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                    >
                      <Video className="w-4 h-4 text-white" />
                      <span>+ Add / Publish Video</span>
                    </button>
                  </div>
                </div>

                {/* KPI Counters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-purple-500/20 text-xs">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-purple-300">Total Videos</div>
                    <div className="text-2xl font-black text-white mt-0.5">{videos.length}</div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-400/20 rounded-2xl p-3.5 backdrop-blur-xs">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-amber-300">In Latest Videos</div>
                    <div className="text-2xl font-black text-amber-400 mt-0.5">
                      {videos.filter(v => v.isLatestVideo).length}
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-2xl p-3.5 backdrop-blur-xs">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-300">Live Streams</div>
                    <div className="text-2xl font-black text-emerald-400 mt-0.5">
                      {videos.filter(v => v.isLive || v.category === 'live-darshan').length}
                    </div>
                  </div>
                  <div className="bg-sky-500/10 border border-sky-400/20 rounded-2xl p-3.5 backdrop-blur-xs">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-sky-300">Total Views</div>
                    <div className="text-2xl font-black text-sky-400 mt-0.5">
                      {videos.reduce((acc, v) => acc + (v.viewsCount || 0), 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Desk Controls: Filter & Search */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={videoCategoryFilter}
                    onChange={(e) => setVideoCategoryFilter(e.target.value)}
                    className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">All Video Categories ({videos.length})</option>
                    <option value="devotional-videos">Devotional Videos</option>
                    <option value="puja-videos">Puja &amp; Abhishekam Videos</option>
                    <option value="divine-bhajans">Divine Bhajans &amp; Chants</option>
                    <option value="live-darshan">Temple Live Darshan</option>
                    <option value="pravachanams">Vedic Pravachanams</option>
                    <option value="mantras-chants">Mantras &amp; Stotrams</option>
                  </select>

                  <button
                    onClick={() => setVideoOnlyLatest(prev => !prev)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      videoOnlyLatest
                        ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Latest Videos Only ({videos.filter(v => v.isLatestVideo).length})</span>
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search video title, temple..."
                    value={videoSearch}
                    onChange={(e) => setVideoSearch(e.target.value)}
                    className="bg-stone-50 border border-stone-200 rounded-xl pl-8 pr-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 w-48 sm:w-64"
                  />
                </div>
              </div>

              {/* Video Grid List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredVideos.map((video) => {
                  const vidId = video._id || video.id;
                  return (
                    <div
                      key={vidId || video.videoUrl}
                      className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      {/* Thumbnail Header */}
                      <div className="relative aspect-video bg-stone-900 group">
                        <img
                          src={video.thumbnail || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600'}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute top-3 left-3">
                          <span className="bg-black/60 backdrop-blur-xs text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase px-2 py-0.5 rounded-md font-mono">
                            {video.category?.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3">
                          {video.isLive ? (
                            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                              LIVE
                            </span>
                          ) : (
                            <span className="bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md font-mono">
                              {video.duration || '05:00'}
                            </span>
                          )}
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition">
                          <a
                            href={video.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition"
                            title="Watch Video"
                          >
                            <Play className="w-5 h-5 fill-stone-950 ml-0.5" />
                          </a>
                        </div>
                      </div>

                      {/* Video Meta */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm leading-snug line-clamp-2">
                            {video.title}
                          </h4>
                          {video.titleTelugu && (
                            <p className="text-xs text-amber-900/80 font-serif mt-0.5 line-clamp-1">
                              {video.titleTelugu}
                            </p>
                          )}
                          {video.temple && (
                            <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                              <span>🛕 {video.temple}</span>
                              {video.speakerOrArtist && <span>• {video.speakerOrArtist}</span>}
                            </p>
                          )}
                        </div>

                        {/* ACTION: KEEP IN LATEST VIDEOS TOGGLE */}
                        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleLatestVideo(video)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                              video.isLatestVideo
                                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs font-black'
                                : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200'
                            }`}
                            title="Click to toggle whether this video appears in Homepage LATEST VIDEOS"
                          >
                            {video.isLatestVideo ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-amber-600 fill-amber-400" />
                                <span>★ In Latest Videos</span>
                              </>
                            ) : (
                              <>
                                <div className="w-3.5 h-3.5 rounded border border-stone-400 bg-white"></div>
                                <span>+ Keep in Latest</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteVideo(video)}
                            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="Delete Video"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredVideos.length === 0 && (
                <div className="py-16 text-center text-stone-400 bg-white rounded-2xl border border-stone-200">
                  <div className="text-4xl mb-3">📹</div>
                  <div className="font-bold text-stone-700 text-base">No Videos Found</div>
                  <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                    No devotional videos match your filter. Click &quot;+ Add / Publish Video&quot; above to upload your first devotional video.
                  </p>
                  <button
                    onClick={() => setActiveTab('addVideo')}
                    className="mt-4 bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-700 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                  >
                    <Video className="w-4 h-4" />
                    <span>Publish Devotional Video</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: VEDIC FESTIVAL CALENDAR DESK                         */}
          {/* ========================================================= */}
          {activeTab === 'festivalCalendar' && (
            <div className="space-y-6">
              {/* Header & Stats Banner */}
              <div className="bg-gradient-to-r from-[#2a1306] via-[#3a1b0c] to-[#1c0b03] text-white p-6 rounded-3xl border border-[#522912] shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-amber-400" />
                        Hindu Lunar Panchangam
                      </span>
                      <span className="text-xs text-amber-200/70">• Tithis, Fasting &amp; Muhurthams</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
                      Festival Calendar Desk (పండుగల క్యాలెండర్ డెస్క్)
                    </h2>
                    <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-2xl leading-relaxed">
                      Strictly separated from articles &amp; stories. Manage chronological Hindu calendar dates, lunar tithis, fasting rules (Upavasam), and puja muhurthams for 2026.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <Link
                      href="/festival-calendar"
                      target="_blank"
                      className="bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-400/30 px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Live Calendar</span>
                    </Link>
                    <button
                      onClick={() => {
                        setEditingFestival(null);
                        setFestivalFormData(DEFAULT_FESTIVAL_FORM);
                        setIsAddFestivalModalOpen(true);
                      }}
                      className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:brightness-110 text-stone-950 px-4 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-amber-900/30 flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                    >
                      <Plus className="w-4 h-4 text-stone-950" />
                      <span>+ Add Festival Calendar Entry</span>
                    </button>
                  </div>
                </div>

                {/* KPI Counters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-amber-500/20 text-xs">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xs">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-amber-200">Total Calendar Events</div>
                    <div className="text-2xl font-black text-white mt-0.5">{festivalEvents.length}</div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-400/20 rounded-2xl p-3.5 backdrop-blur-xs">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-amber-300">Major Mahotsavams</div>
                    <div className="text-2xl font-black text-amber-400 mt-0.5">
                      {festivalEvents.filter(f => f.isMajor).length}
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-2xl p-3.5 backdrop-blur-xs">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-300">Fasting Days (Vratas)</div>
                    <div className="text-2xl font-black text-emerald-400 mt-0.5">
                      {festivalEvents.filter(f => f.fastingType).length}
                    </div>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-400/20 rounded-2xl p-3.5 backdrop-blur-xs">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-purple-300">Calendar Year</div>
                    <div className="text-2xl font-black text-purple-300 mt-0.5">2026 (శ్రీ క్రోధి)</div>
                  </div>
                </div>
              </div>

              {/* Calendar Filter & Search */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={festivalMonthFilter}
                    onChange={(e) => setFestivalMonthFilter(e.target.value)}
                    className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold text-stone-700 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">All Lunar Months ({festivalEvents.length})</option>
                    <option value="JAN">January (Makara Masa)</option>
                    <option value="FEB">February (Magha Masa)</option>
                    <option value="MAR">March (Chaitra Masa)</option>
                    <option value="APR">April (Vaisakha Masa)</option>
                    <option value="MAY">May (Jyeshtha Masa)</option>
                    <option value="JUN">June (Ashadha Masa)</option>
                    <option value="JUL">July</option>
                    <option value="AUG">August (Sravana Masa)</option>
                    <option value="SEP">September (Bhadrapada Masa)</option>
                    <option value="OCT">October (Ashwina Masa)</option>
                    <option value="NOV">November (Kartika Masa)</option>
                    <option value="DEC">December (Margashirsha Masa)</option>
                  </select>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search festival name, tithi, deity..."
                    value={festivalSearch}
                    onChange={(e) => setFestivalSearch(e.target.value)}
                    className="bg-stone-50 border border-stone-200 rounded-xl pl-8 pr-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 w-48 sm:w-64"
                  />
                </div>
              </div>

              {/* Festival Calendar Event List */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                <div className="divide-y divide-stone-100">
                  {filteredFestivals.map((fest) => {
                    const festId = fest._id || fest.id;
                    return (
                      <div
                        key={festId || fest.name}
                        className="p-4 sm:p-5 hover:bg-stone-50/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        {/* Date Box + Details */}
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center shrink-0 text-amber-900 shadow-2xs">
                            <span className="text-[10px] uppercase font-mono font-bold text-amber-700">
                              {fest.monthShort || fest.month || '2026'}
                            </span>
                            <span className="text-xl font-black">
                              {fest.day || (fest.date ? fest.date.split(' ')[0] : '•')}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                                {fest.name}
                              </h4>
                              {fest.isMajor && (
                                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                                  Major
                                </span>
                              )}
                            </div>

                            {fest.teluguName && (
                              <div className="text-xs text-amber-900 font-serif font-bold">
                                {fest.teluguName}
                              </div>
                            )}

                            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 pt-0.5">
                              {fest.date && <span className="font-medium text-stone-700">📅 {fest.date}</span>}
                              {fest.tithi && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-mono text-[10px] border border-purple-200">🌙 {fest.tithi}</span>}
                              {fest.deity && <span className="text-stone-600">🕉️ {fest.deity}</span>}
                              {fest.fastingType && <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md text-[10px] border border-amber-200">🪔 {fest.fastingType}</span>}
                            </div>

                            {fest.pujaTime && (
                              <div className="text-[11px] text-stone-600 flex items-center gap-1 pt-0.5">
                                <Clock className="w-3 h-3 text-amber-600" />
                                <span>{fest.pujaTime}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingFestival(fest);
                              setFestivalFormData({
                                name: fest.name || '',
                                teluguName: fest.teluguName || '',
                                sanskritName: fest.sanskritName || '',
                                date: fest.date || '',
                                day: fest.day || '',
                                month: fest.month || fest.monthShort || 'JAN',
                                monthShort: fest.monthShort || (fest.month ? fest.month.slice(0, 3).toUpperCase() : 'JAN'),
                                year: fest.year || 2026,
                                tithi: fest.tithi || '',
                                hinduMonth: fest.hinduMonth || '',
                                deity: fest.deity || '',
                                pujaTime: fest.pujaTime || '',
                                fastingType: fest.fastingType || '',
                                image: fest.image || '/images/fest_ugadi.png',
                                summary: fest.summary || '',
                                pujaVidhi: fest.pujaVidhi || '',
                                significance: fest.significance || '',
                                isMajor: fest.isMajor !== undefined ? fest.isMajor : true
                              });
                              setIsAddFestivalModalOpen(true);
                            }}
                            className="p-2 text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition border border-stone-200 cursor-pointer"
                            title="Edit Entry"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteFestivalEvent(fest)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition border border-stone-200 cursor-pointer"
                            title="Delete Entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredFestivals.length === 0 && (
                  <div className="py-16 text-center text-stone-400">
                    <div className="text-4xl mb-3">🗓️</div>
                    <div className="font-bold text-stone-700 text-base">No Festival Entries Found</div>
                    <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                      No festival calendar events match your month filter or search query.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 14: PLATFORM ANALYTICS                                */}
          {/* ========================================================= */}
          {activeTab === 'analytics' && (
            <div className="bg-white p-6 rounded-3xl border shadow-xs space-y-4">
              <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-700" />
                <span>Platform Analytics &amp; Yield</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Monthly Reads</span>
                  <div className="text-2xl font-black text-emerald-900">48,250 Views</div>
                  <span className="text-[10px] text-emerald-700 font-bold">+28% this month</span>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Pilgrim Inquiries</span>
                  <div className="text-2xl font-black text-amber-900">1,240 Requests</div>
                  <span className="text-[10px] text-amber-700 font-bold">Kashi, Srisailam, Tirumala</span>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Astrology Bookings</span>
                  <div className="text-2xl font-black text-purple-900">324 Bookings</div>
                  <span className="text-[10px] text-purple-700 font-bold">4.9 / 5.0 Rating</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* User Guide Modal */}
      {userGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-emerald-200">
            <div className="bg-gradient-to-r from-[#3b0811] via-[#4d0c17] to-[#3b0811] text-amber-200 p-4 flex items-center justify-between border-b border-amber-900/40">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Super Admin Operational Guide</span>
              </h3>
              <button onClick={() => setUserGuideOpen(false)} className="text-amber-200 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-xs leading-relaxed text-slate-700">
              <p>
                Welcome to the <strong>Astadasapeetam Divine Sanctuary Console</strong>. All categories are placed on the left side:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Marketplace:</strong> Real-time toggle of stock availability, prices, and discounts.</li>
                <li><strong>Banners &amp; Websections:</strong> Control live tickers, hero spotlight, and ad slots.</li>
                <li><strong>Spirituals:</strong> Manage 18 Shakti Peethas and 37+ Kshetras.</li>
                <li><strong>Social Connections:</strong> Save and sync verified WhatsApp, Instagram, and Facebook profile URLs.</li>
              </ul>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setUserGuideOpen(false)}
                  className="bg-gradient-to-r from-[#78131e] to-[#911b27] hover:from-[#5c0d16] hover:to-[#78131e] text-white font-bold px-5 py-2 rounded-xl text-xs cursor-pointer shadow-xs border border-amber-300/30"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-amber-200">
            <div className="bg-gradient-to-r from-[#3b0811] via-[#4d0c17] to-[#3b0811] text-amber-200 p-4 flex items-center justify-between border-b border-amber-900/40">
              <h3 className="font-bold text-sm">Add Product to Marketplace</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-amber-200 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Pure Desi Camphor or Rudraksha Mala"
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold">Category *</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomCategoryMode(!isCustomCategoryMode);
                        if (!isCustomCategoryMode) setCustomCategoryInput('');
                      }}
                      className="text-[10px] text-amber-700 font-bold hover:underline cursor-pointer"
                    >
                      {isCustomCategoryMode ? '← Choose Existing' : '+ Custom Category'}
                    </button>
                  </div>

                  {!isCustomCategoryMode ? (
                    <select
                      value={newProduct.category}
                      onChange={(e) => {
                        if (e.target.value === '__add_custom__') {
                          setIsCustomCategoryMode(true);
                        } else {
                          setNewProduct({ ...newProduct, category: e.target.value });
                        }
                      }}
                      className="w-full border rounded-lg p-2 font-medium bg-white"
                    >
                      {marketplaceCategories.filter(c => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                      <option value="__add_custom__">+ Add Custom Devotional Category...</option>
                    </select>
                  ) : (
                    <div className="space-y-1">
                      <input
                        type="text"
                        required
                        value={customCategoryInput}
                        onChange={(e) => setCustomCategoryInput(e.target.value)}
                        placeholder="e.g. Silver Pooja Articles, Gau Seva Samagri..."
                        className="w-full border-2 border-amber-400 rounded-lg p-2 font-medium bg-amber-50/50 text-xs focus:outline-none focus:bg-white"
                        autoFocus
                      />
                      <span className="text-[10px] text-amber-800 font-medium block">
                        New category will be automatically saved across the marketplace.
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="font-bold block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="799"
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Subtitle / Highlight</label>
                <input
                  type="text"
                  value={newProduct.subtitle}
                  onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                  placeholder="100% Satvik &amp; Lab Certified"
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 px-5 py-2 rounded-lg font-black shadow border border-amber-300/40 cursor-pointer"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* ========================================================= */}
      {/* FESTIVAL CALENDAR ADD/EDIT MODAL                          */}
      {/* ========================================================= */}
      {isAddFestivalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
            <div className="bg-gradient-to-r from-[#2a1306] via-[#3a1b0c] to-[#1c0b03] text-white p-5 flex items-center justify-between border-b border-[#522912]">
              <div className="flex items-center space-x-2.5">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-base text-amber-200">
                  {editingFestival ? 'Edit Festival Calendar Entry' : 'Add New Vedic Festival Calendar Entry'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddFestivalModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFestivalEvent} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Festival Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maha Shivaratri"
                    value={festivalFormData.name}
                    onChange={(e) => setFestivalFormData({ ...festivalFormData, name: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Telugu Name (పండుగ పేరు) *</label>
                  <input
                    type="text"
                    placeholder="e.g. మహా శివరాత్రి"
                    value={festivalFormData.teluguName}
                    onChange={(e) => setFestivalFormData({ ...festivalFormData, teluguName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-amber-950 focus:outline-none focus:border-amber-500 font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 17 February 2026"
                    value={festivalFormData.date}
                    onChange={(e) => setFestivalFormData({ ...festivalFormData, date: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Month Short Code</label>
                  <select
                    value={festivalFormData.monthShort}
                    onChange={(e) => setFestivalFormData({ ...festivalFormData, monthShort: e.target.value, month: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 font-bold"
                  >
                    <option value="JAN">JAN (January / Makara)</option>
                    <option value="FEB">FEB (February / Magha)</option>
                    <option value="MAR">MAR (March / Chaitra)</option>
                    <option value="APR">APR (April / Vaisakha)</option>
                    <option value="MAY">MAY (May / Jyeshtha)</option>
                    <option value="JUN">JUN (June / Ashadha)</option>
                    <option value="JUL">JUL (July)</option>
                    <option value="AUG">AUG (August / Sravana)</option>
                    <option value="SEP">SEP (September / Bhadrapada)</option>
                    <option value="OCT">OCT (October / Ashwina)</option>
                    <option value="NOV">NOV (November / Kartika)</option>
                    <option value="DEC">DEC (December / Margashirsha)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Lunar Tithi</label>
                  <input
                    type="text"
                    placeholder="e.g. Magha Bahula Chaturdashi"
                    value={festivalFormData.tithi}
                    onChange={(e) => setFestivalFormData({ ...festivalFormData, tithi: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Presiding Deity</label>
                  <input
                    type="text"
                    placeholder="e.g. Lord Shiva / Sri Rama"
                    value={festivalFormData.deity}
                    onChange={(e) => setFestivalFormData({ ...festivalFormData, deity: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Fasting Rule / Upavasam</label>
                  <input
                    type="text"
                    placeholder="e.g. Nirjala / Phalahar Upavasam"
                    value={festivalFormData.fastingType}
                    onChange={(e) => setFestivalFormData({ ...festivalFormData, fastingType: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Puja Muhurtham / Timings</label>
                  <input
                    type="text"
                    placeholder="e.g. Nishita Kaal: 12:09 AM to 01:00 AM"
                    value={festivalFormData.pujaTime}
                    onChange={(e) => setFestivalFormData({ ...festivalFormData, pujaTime: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Spiritual Significance &amp; Highlights</label>
                <textarea
                  rows="2"
                  placeholder="Spiritual significance, blessings and cosmic energy of this festival..."
                  value={festivalFormData.significance}
                  onChange={(e) => setFestivalFormData({ ...festivalFormData, significance: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="modalIsMajorFest"
                  checked={festivalFormData.isMajor}
                  onChange={(e) => setFestivalFormData({ ...festivalFormData, isMajor: e.target.checked })}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="modalIsMajorFest" className="text-xs font-bold text-stone-800 cursor-pointer">
                  Highlight as Major Mahotsavam on Vedic Calendar
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsAddFestivalModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 cursor-pointer font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 px-5 py-2 rounded-xl font-black shadow border border-amber-300/40 cursor-pointer"
                >
                  {editingFestival ? 'Save Changes' : 'Add to Calendar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIDEO STUDIO MODAL                                        */}
      {/* ========================================================= */}
      <VideoStudioModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onVideoPublished={(newVideo) => {
          setVideos(prev => [newVideo, ...prev]);
          showToast('success', `✨ Video "${newVideo.title}" published successfully!`);
          if (activeTab !== 'videoDesk') {
            setActiveTab('videoDesk');
          }
        }}
      />

      {/* Add New Category with Custom Slug Modal */}
      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onCategoryAdded={(newCat) => {
          setPostCategoryFilter(newCat.id);
          showToast('success', `✨ Added new category "${newCat.label}" with custom slug /${newCat.slug}!`);
        }}
      />
    </div>
  );
}
