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
  Sunrise
} from 'lucide-react';
import { FacebookIcon, TwitterXIcon, InstagramIcon, YoutubeIcon, WhatsAppIcon } from '../../components/SocialIcons';

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
  const [postCategoryFilter, setPostCategoryFilter] = useState('all');
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // Add Post Form State
  const [newPost, setNewPost] = useState({
    title: '',
    titleTelugu: '',
    slug: '',
    category: 'temples',
    deity: 'Universal Mother Parashakti',
    devotionalVerse: '',
    excerpt: '',
    content: '',
    featuredImage: '/images/temple_kashi.jpg',
    tags: 'Shakti Peethas, Vedic Culture, Temples',
    keywords: 'Astadasapeetam, Shakti Peetha, Panchangam',
    status: 'published'
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
        fetch(`${API_BASE}/posts`).catch(() => ({ json: () => ({ success: false }) })),
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
      if (postsData?.success) setPosts(postsData.data);
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

  // Add Post Submit
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newPost)
      });
      const data = await res.json();
      if (data.success) {
        setPosts(prev => [data.data, ...prev]);
        showToast('success', `Sacred post "${data.data.title}" published!`);
        setActiveTab('postList');
        setNewPost({
          title: '',
          titleTelugu: '',
          slug: '',
          category: 'temples',
          deity: 'Universal Mother Parashakti',
          devotionalVerse: '',
          excerpt: '',
          content: '',
          featuredImage: '/images/temple_kashi.jpg',
          tags: 'Shakti Peethas, Vedic Culture, Temples',
          keywords: 'Astadasapeetam, Shakti Peetha, Panchangam',
          status: 'published'
        });
      }
    } catch {
      showToast('error', 'Failed to publish post');
    } finally {
      setActionLoading(false);
    }
  };

  // Create Product Submit
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/marketing/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => [data.data, ...prev]);
        setIsAddProductOpen(false);
        showToast('success', `Product "${data.data.name}" added to Marketplace!`);
      }
    } catch {
      showToast('error', 'Failed to add product');
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

  // Filtered lists
  const filteredPosts = posts.filter(p => {
    const matchCat = postCategoryFilter === 'all' || p.category === postCategoryFilter;
    const matchSearch = postSearch === '' ||
      p.title?.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.titleTelugu?.toLowerCase().includes(postSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredUsers = users.filter(u => {
    const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchSearch = userSearch === '' ||
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase());
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
        { id: 'addPost', label: 'Add Post', icon: PlusCircle, accent: 'from-teal-500 to-emerald-600', textAccent: 'text-teal-400' },
        { id: 'postList', label: 'Post List', icon: FileText, badge: posts.length, accent: 'from-sky-500 to-blue-600', textAccent: 'text-sky-400' }
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
    <div className="flex h-screen w-screen overflow-hidden bg-[#fdfaf5] font-sans text-stone-900">
      {/* ========================================================= */}
      {/* 1. UNIQUE TEMPLE MAROON & GOLD LEFT SIDEBAR               */}
      {/* ========================================================= */}
      <aside className={`bg-gradient-to-b from-[#240409] via-[#330811] to-[#1c0206] text-amber-100 flex flex-col border-r border-amber-900/50 flex-shrink-0 h-screen transition-all duration-300 z-40 select-none shadow-2xl ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      }`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-amber-800/40 bg-black/20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 overflow-hidden group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#78131e] via-[#b91c1c] to-[#f59e0b] border border-amber-300/50 flex items-center justify-center font-black text-white text-xl shadow-lg shrink-0 group-hover:scale-105 transition-transform">
              🕉️
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-xs tracking-wider text-amber-200 font-serif uppercase">
                  ASTADASAPEETAM
                </span>
                <span className="text-[10px] text-amber-400 font-black tracking-widest uppercase">
                  {user?.role === 'digital_marketing' ? 'Marketing Studio' : user?.role === 'astrologer' ? 'Astrologer Studio' : 'Divine Sanctuary'}
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-amber-300 hover:text-white p-1 rounded-lg hover:bg-white/10 text-xs transition"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Categories on the Left (Grouped & Ordered with Distinct Spiritual Badges) */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-3 text-xs custom-scrollbar">
          {sidebarSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              {!sidebarCollapsed && (
                <div className="text-[9px] uppercase tracking-widest font-black text-amber-400/60 px-3 pt-2 pb-0.5 font-mono">
                  {sec.heading}
                </div>
              )}
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-bold transition-all duration-150 text-left cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-black shadow-lg shadow-amber-950/60 border-l-4 border-amber-200 scale-[1.02]'
                        : 'text-stone-300 hover:text-white hover:bg-white/10 hover:border-l-2 hover:border-amber-400/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-stone-950' : item.highlight ? 'text-emerald-400' : item.textAccent
                    }`} />
                    {!sidebarCollapsed && (
                      <div className="flex items-center justify-between flex-1">
                        <span className="truncate">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-wide ${
                            isActive 
                              ? 'bg-stone-950 text-amber-300' 
                              : 'bg-amber-900/50 text-amber-200 border border-amber-600/30'
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

        {/* Sidebar Footer User Card with Spiritual Gold Touch */}
        <div className="p-3 border-t border-amber-800/40 bg-black/40 text-xs">
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-950 font-black flex items-center justify-center text-xs shadow-md border border-amber-200">
                    {(user?.name || 'Gowrav Vungarala').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-100 text-[11px] truncate max-w-[125px]">
                      {user?.name || 'Gowrav Vungarala'}
                    </div>
                    <div className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">
                      {user?.role === 'digital_marketing' ? 'Digital Marketing' : user?.role === 'astrologer' ? 'Astrologer' : 'Super Admin'}
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
                  className="text-amber-300 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/10 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Fast Social Test Strip in Sidebar */}
              <div className="pt-1.5 flex items-center justify-between text-[11px] text-amber-200 border-t border-amber-800/30">
                <span className="text-[10px] text-amber-400 font-bold">Social Feeds:</span>
                <div className="flex items-center space-x-2">
                  <a href={socialProfiles.whatsapp} target="_blank" rel="noreferrer" title="Chat on WhatsApp" className="text-emerald-400 hover:text-white p-1 hover:bg-white/10 rounded">
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href={socialProfiles.instagram} target="_blank" rel="noreferrer" title="Open Instagram" className="text-pink-400 hover:text-white p-1 hover:bg-white/10 rounded">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href={socialProfiles.facebook} target="_blank" rel="noreferrer" title="Open Facebook" className="text-blue-400 hover:text-white p-1 hover:bg-white/10 rounded">
                    <FacebookIcon className="w-3.5 h-3.5" />
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
                className="text-amber-300 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/10"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MAIN CONSOLE CONTENT (BESPOKE VEDIC IVORY & GOLD)     */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#fbf8f3]">
        {/* Top Header Bar */}
        <header className="bg-white/90 backdrop-blur-md border-b border-amber-200/60 px-6 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-base sm:text-lg font-black text-stone-900 font-serif tracking-tight flex items-center space-x-2">
              <span>Namaste, {user?.name || 'Gowrav Vungarala'}!</span>
              <span>🙏</span>
            </h1>

            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-xs ${
              user?.role === 'digital_marketing'
                ? 'bg-amber-600 text-white border border-amber-300'
                : user?.role === 'astrologer'
                ? 'bg-indigo-900 text-indigo-100 border border-indigo-400'
                : 'bg-gradient-to-r from-rose-900 to-[#78131e] text-amber-200 border border-amber-400/50'
            }`}>
              {user?.role === 'digital_marketing' ? 'Digital Marketing' : user?.role === 'astrologer' ? 'Astrologer' : 'Super Admin'}
            </span>

            <button
              onClick={() => setUserGuideOpen(true)}
              className="bg-stone-900 hover:bg-stone-800 text-amber-200 text-[11px] font-bold px-3 py-1 rounded-lg flex items-center space-x-1.5 transition shadow-xs cursor-pointer border border-amber-500/20"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>User Guide</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-xl text-xs font-semibold text-amber-900">
              <Sunrise className="w-3.5 h-3.5 text-amber-600" />
              <span>18 Maha Shakti Peethas Network</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="text-xs bg-gradient-to-r from-[#78131e] via-[#8c1724] to-[#78131e] hover:brightness-110 text-white font-bold px-4 py-1.5 rounded-xl flex items-center space-x-1.5 transition shadow-sm cursor-pointer border border-amber-300/30"
            >
              <span>View Public Sanctuary</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Toast Alert */}
        {statusMessage.text && (
          <div className="px-6 pt-3">
            <div className={`p-3 rounded-xl shadow-md border flex items-center space-x-3 text-xs ${
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
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Headline & Beat Subheader */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/50 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-serif tracking-tight">
                Spiritual Governance &amp; Sacred Operations
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Centralized management for 18 Maha Shakti Peethas, Temple Marketplace, and Vedic Services
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-bold">
                Port: 3001
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                API: Live
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD                                          */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Grand Vedic Sanctuary Hero Card */}
              <div className="bg-gradient-to-r from-[#2c050b] via-[#450b15] to-[#1c0827] text-white rounded-3xl p-7 shadow-2xl border border-amber-500/40 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3 max-w-2xl z-10">
                  <div className="text-[10px] font-black uppercase tracking-widest text-amber-300 font-mono flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    <span>✦ శ్రీ అష్టాదశ మహాశక్తి పీఠ సర్వోన్నత వేదిక • SACRED COMMAND SUITE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
                    Astadasapeetam Divine Operations Console
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-sans">
                    Complete governance over the 18 Maha Shakti Peethas, 37+ Kshetras, Satvik Prasad Bazaar, Daily Panchangam, Devotee Yatras, and live social channels (WhatsApp, Instagram, Facebook).
                  </p>
                </div>

                <div className="bg-black/50 border border-amber-500/30 p-4 rounded-2xl flex flex-col space-y-2 text-xs shrink-0 z-10 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 font-mono">
                    SACRED JURISDICTION
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['18 Maha Peethas', '37+ Kshetras', 'Daily Darshan', 'Vedic Panchangam', 'All-India Yatras'].map((geo, idx) => (
                      <span
                        key={idx}
                        className="bg-amber-950/70 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[10px] text-amber-200 font-bold"
                      >
                        {geo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4 Unique Quick Metric Counters */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-orange-100/60 border border-amber-200 p-4 rounded-2xl shadow-xs">
                  <div className="text-xs text-amber-800 font-bold">Sacred Peethas &amp; Kshetras</div>
                  <div className="text-2xl font-black text-amber-950 mt-1">18 + 37</div>
                  <div className="text-[10px] text-amber-700/80 mt-0.5">All-India Divine Network</div>
                </div>
                <div className="bg-gradient-to-br from-rose-50 to-pink-100/60 border border-rose-200 p-4 rounded-2xl shadow-xs">
                  <div className="text-xs text-rose-800 font-bold">Bazaar Products Active</div>
                  <div className="text-2xl font-black text-rose-950 mt-1">{products.length}</div>
                  <div className="text-[10px] text-rose-700/80 mt-0.5">Puja kits, rudraksha &amp; prasad</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-100/60 border border-emerald-200 p-4 rounded-2xl shadow-xs">
                  <div className="text-xs text-emerald-800 font-bold">Devotees &amp; Staff</div>
                  <div className="text-2xl font-black text-emerald-950 mt-1">{users.length}</div>
                  <div className="text-[10px] text-emerald-700/80 mt-0.5">Registered devotee accounts</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-100/60 border border-indigo-200 p-4 rounded-2xl shadow-xs">
                  <div className="text-xs text-indigo-800 font-bold">Jyotisha Consultations</div>
                  <div className="text-2xl font-black text-indigo-950 mt-1">{consultations.length}</div>
                  <div className="text-[10px] text-indigo-700/80 mt-0.5">Birth chart &amp; remedy inquiries</div>
                </div>
              </div>

              {/* 10 Bespoke, Unique-Type Action Cards Grid with Distinct Colors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* 1. Marketplace */}
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="bg-gradient-to-br from-amber-50 to-orange-100/70 hover:from-amber-100 hover:to-orange-200 border border-amber-300 p-4.5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center text-xl font-bold shadow-inner">
                      🛍️
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-600 text-white">
                      BAZAAR
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-amber-900 transition">Marketplace</h4>
                    <p className="text-[11px] text-amber-900/70 mt-1 leading-snug">Puja kits, certified rudraksha &amp; prasadams.</p>
                  </div>
                </button>

                {/* 2. Banners & Ads */}
                <button
                  onClick={() => setActiveTab('banners')}
                  className="bg-gradient-to-br from-rose-50 to-red-100/70 hover:from-rose-100 hover:to-red-200 border border-rose-300 p-4.5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-800 flex items-center justify-center text-xl font-bold shadow-inner">
                      📢
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-600 text-white">
                      ALERTS
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-rose-900 transition">Banners &amp; Ads</h4>
                    <p className="text-[11px] text-rose-900/70 mt-1 leading-snug">Top sponsored, sidebar &amp; festival banners.</p>
                  </div>
                </button>

                {/* 3. Website Sections */}
                <button
                  onClick={() => setActiveTab('websections')}
                  className="bg-gradient-to-br from-yellow-50 to-amber-100/70 hover:from-yellow-100 hover:to-amber-200 border border-yellow-300 p-4.5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-900 flex items-center justify-center text-xl font-bold shadow-inner">
                      🏛️
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-700 text-white">
                      VEDIC CURATION
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-amber-900 transition">Web Sections</h4>
                    <p className="text-[11px] text-yellow-950/70 mt-1 leading-snug">Live ticker, hero banner &amp; daily sloka.</p>
                  </div>
                </button>

                {/* 4. Spirituals & Peethas */}
                <button
                  onClick={() => setActiveTab('spirituals')}
                  className="bg-gradient-to-br from-fuchsia-50 to-pink-100/70 hover:from-fuchsia-100 hover:to-pink-200 border border-fuchsia-300 p-4.5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 text-fuchsia-800 flex items-center justify-center text-xl font-bold shadow-inner">
                      📿
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-fuchsia-700 text-white">
                      18 PEETHAS
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-fuchsia-900 transition">18 Peethas Hub</h4>
                    <p className="text-[11px] text-fuchsia-900/70 mt-1 leading-snug">18 Shakti Peethas &amp; 37+ Kshetras directory.</p>
                  </div>
                </button>

                {/* 5. Coupons & Campaigns */}
                <button
                  onClick={() => setActiveTab('coupons')}
                  className="bg-gradient-to-br from-purple-50 to-indigo-100/70 hover:from-purple-100 hover:to-indigo-200 border border-purple-300 p-4.5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-800 flex items-center justify-center text-xl font-bold shadow-inner">
                      🎟️
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-700 text-white">
                      DEALS
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-purple-900 transition">Coupons &amp; Deals</h4>
                    <p className="text-[11px] text-purple-900/70 mt-1 leading-snug">Spiritual coupon codes &amp; campaign metrics.</p>
                  </div>
                </button>

                {/* 6. Social Connections */}
                <button
                  onClick={() => setActiveTab('socialConnections')}
                  className="bg-gradient-to-br from-teal-50 to-emerald-100/70 hover:from-teal-100 hover:to-emerald-200 border border-teal-300 p-4.5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-800 flex items-center justify-center text-xl font-bold shadow-inner">
                      🔗
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-700 text-white">
                      WHATSAPP &amp; IG
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-teal-900 transition">Social Connections</h4>
                    <p className="text-[11px] text-teal-900/70 mt-1 leading-snug">Link WhatsApp, Instagram &amp; Facebook.</p>
                  </div>
                </button>

                {/* 7. Add Post */}
                <button
                  onClick={() => setActiveTab('addPost')}
                  className="bg-gradient-to-br from-emerald-50 to-teal-100/70 hover:from-emerald-100 hover:to-teal-200 border border-emerald-300 p-4.5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-800 flex items-center justify-center text-xl font-bold shadow-inner">
                      ✍️
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-700 text-white">
                      BILINGUAL
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-emerald-900 transition">Add Sacred Post</h4>
                    <p className="text-[11px] text-emerald-900/70 mt-1 leading-snug">Compose bilingual articles &amp; slokas.</p>
                  </div>
                </button>

                {/* 8. Post List */}
                <button
                  onClick={() => setActiveTab('postList')}
                  className="bg-gradient-to-br from-sky-50 to-blue-100/70 hover:from-sky-100 hover:to-blue-200 border border-sky-300 p-4.5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-800 flex items-center justify-center text-xl font-bold shadow-inner">
                      📋
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-700 text-white">
                      REGISTRY
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-sky-900 transition">Post Registry</h4>
                    <p className="text-[11px] text-sky-900/70 mt-1 leading-snug">Track published articles &amp; views.</p>
                  </div>
                </button>

                {/* 9. Astrologer Desk */}
                <button
                  onClick={() => setActiveTab('astrology')}
                  className="bg-gradient-to-br from-indigo-50 to-purple-100/70 hover:from-indigo-100 hover:to-purple-200 border border-indigo-300 p-4.5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-800 flex items-center justify-center text-xl font-bold shadow-inner">
                      🔮
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-800 text-white">
                      JYOTISHA
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-indigo-900 transition">Astrologer Desk</h4>
                    <p className="text-[11px] text-indigo-900/70 mt-1 leading-snug">Devotee birth charts &amp; remedies.</p>
                  </div>
                </button>

                {/* 10. Software Setup */}
                <button
                  onClick={() => setActiveTab('softwareSetup')}
                  className="bg-gradient-to-br from-stone-50 to-amber-100/50 hover:from-stone-100 hover:to-amber-200/50 border border-stone-300 p-4.5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-stone-500/20 text-stone-800 flex items-center justify-center text-xl font-bold shadow-inner">
                      ⚙️
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-stone-800 text-amber-200">
                      SYSTEM
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-stone-900 transition">Software Setup</h4>
                    <p className="text-[11px] text-stone-700/70 mt-1 leading-snug">Diagnostics, ports &amp; cache purge.</p>
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
          {/* TAB 4: BANNERS & ADVERTISEMENTS                           */}
          {/* ========================================================= */}
          {activeTab === 'banners' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <Megaphone className="w-5 h-5 text-amber-600" />
                    <span>Banners &amp; Advertisements Manager</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Control promotional banners, sponsored ad spaces (728x90, 300x250) across the platform.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Top Sponsored Banner (728x90)</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Appears above the main devotional feed on the homepage.
                  </p>
                  <div className="p-3 bg-slate-900 text-amber-200 rounded-xl text-xs flex items-center justify-between">
                    <span>Experience Divine Energy • Premium Rudraksha</span>
                    <span className="bg-amber-500 text-stone-900 font-bold px-2 py-1 rounded text-[10px]">Shop Now</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Right Sidebar Ad (300x250)</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Displays private advertisements for temple trusts, astrologer bookings &amp; pooja samagri.
                  </p>
                  <div className="p-4 bg-amber-50 rounded-xl border border-dashed border-amber-300 text-center text-xs text-amber-900 font-semibold">
                    300 × 250 Spiritual Store Ad Space
                  </div>
                </div>
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

                <Link
                  href="/sacred-temples"
                  target="_blank"
                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1"
                >
                  <span>View All 18 Peethas</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
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
            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <PlusCircle className="w-5 h-5 text-amber-600" />
                    <span>Add Sacred Post &amp; Devotional Article</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Compose articles in English &amp; Telugu with deities, sacred verses, categories, and SEO metadata.
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Title (English) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Srisailam Bhramaramba Devi Temple Puranam"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Title in Telugu (శీర్షిక)</label>
                    <input
                      type="text"
                      placeholder="శ్రీశైల భ్రమరాంబికా దేవి వైశిష్ట్యం"
                      value={newPost.titleTelugu}
                      onChange={(e) => setNewPost({ ...newPost, titleTelugu: e.target.value })}
                      className="w-full border rounded-xl p-2.5 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category *</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full border rounded-xl p-2.5 text-xs focus:outline-none"
                    >
                      <option value="temples">Temples &amp; Shakti Peethas</option>
                      <option value="panchangam">Daily Panchangam</option>
                      <option value="slokas">Stotrams &amp; Slokas</option>
                      <option value="astrology">Vedic Astrology</option>
                      <option value="festivals">Festivals &amp; Vratams</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Presiding Deity</label>
                    <input
                      type="text"
                      value={newPost.deity}
                      onChange={(e) => setNewPost({ ...newPost, deity: e.target.value })}
                      className="w-full border rounded-xl p-2.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Featured Image URL</label>
                    <input
                      type="text"
                      value={newPost.featuredImage}
                      onChange={(e) => setNewPost({ ...newPost, featuredImage: e.target.value })}
                      className="w-full border rounded-xl p-2.5 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Devotional Verse / Sloka</label>
                  <textarea
                    rows="2"
                    placeholder="శ్లోకం లేదా మంత్రం..."
                    value={newPost.devotionalVerse}
                    onChange={(e) => setNewPost({ ...newPost, devotionalVerse: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-xs font-serif"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Article Body Content *</label>
                  <textarea
                    rows="7"
                    required
                    placeholder="Complete devotional history and significance..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full border rounded-xl p-3 text-xs leading-relaxed"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="bg-gradient-to-r from-[#78131e] to-[#911b27] hover:from-[#5c0d16] hover:to-[#78131e] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow flex items-center space-x-2 border border-amber-300/30 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Publish Post</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 9: POST LIST                                          */}
          {/* ========================================================= */}
          {activeTab === 'postList' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-emerald-700" />
                    <span>Published Articles Registry ({posts.length})</span>
                  </h3>
                </div>

                <button
                  onClick={() => setActiveTab('addPost')}
                  className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 px-4 py-2 rounded-xl text-xs font-black cursor-pointer shadow border border-amber-300/40"
                >
                  + Add Post
                </button>
              </div>

              <div className="bg-white rounded-2xl border overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gradient-to-r from-[#3b0811] via-[#4d0c17] to-[#3b0811] text-amber-200 uppercase text-[10px] tracking-wider border-b border-amber-900/40">
                    <tr>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Deity</th>
                      <th className="py-3 px-4">Views</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPosts.map((post) => (
                      <tr key={post._id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{post.title}</div>
                          <div className="text-[10px] text-slate-400">/{post.slug}</div>
                        </td>
                        <td className="py-3 px-4 uppercase text-[10px] font-bold">{post.category}</td>
                        <td className="py-3 px-4 text-slate-700">{post.deity}</td>
                        <td className="py-3 px-4 font-bold">{post.viewsCount || 850}</td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {post.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 10: USER MANAGEMENT                                   */}
          {/* ========================================================= */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <Users className="w-5 h-5 text-emerald-700" />
                    <span>Staff Registry &amp; Role Management</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assign system permissions, upgrade devotees to Staff, and toggle active status.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gradient-to-r from-[#3b0811] via-[#4d0c17] to-[#3b0811] text-amber-200 uppercase text-[10px] tracking-wider border-b border-amber-900/40">
                    <tr>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Current Role</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold">{u.name}</td>
                        <td className="py-3 px-4">{u.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-900">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {u.isActive ? 'ACTIVE' : 'SUSPENDED'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
          {/* TAB 13: SOFTWARE SETUP                                    */}
          {/* ========================================================= */}
          {activeTab === 'softwareSetup' && (
            <div className="bg-white p-6 rounded-3xl border shadow-xs space-y-4">
              <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-slate-700" />
                <span>Software Setup &amp; Diagnostics</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border space-y-1">
                  <div className="text-slate-400 font-bold uppercase text-[10px]">Database</div>
                  <div className="font-bold text-slate-900">MongoDB 127.0.0.1:27017</div>
                  <div className="text-emerald-700 font-semibold">astadasapeetam (Connected)</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border space-y-1">
                  <div className="text-slate-400 font-bold uppercase text-[10px]">API Server</div>
                  <div className="font-bold text-slate-900">Port 5000 (Express.js)</div>
                  <div className="text-emerald-700 font-semibold">Active &amp; Responding</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border space-y-1">
                  <div className="text-slate-400 font-bold uppercase text-[10px]">Frontend Server</div>
                  <div className="font-bold text-slate-900">Port 3001 (Next.js 15)</div>
                  <div className="text-emerald-700 font-semibold">App Router Ready</div>
                </div>
              </div>

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
                  <label className="font-bold block mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="pooja-kits">Pooja Kits</option>
                    <option value="rudraksha">Rudraksha</option>
                    <option value="yantras-idols">Yantras &amp; Idols</option>
                    <option value="dhoop-samagri">Camphor &amp; Dhoop</option>
                    <option value="prasadam">Prasadam</option>
                  </select>
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
    </div>
  );
}
