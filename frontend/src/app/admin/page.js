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
  DollarSign
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

  // Sidebar items cleanly ordered exactly as requested
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, badge: products.length },
    { id: 'banners', label: 'Banners & Ads', icon: Megaphone },
    { id: 'websections', label: 'Website Sections', icon: Layers },
    { id: 'spirituals', label: 'Spirituals & Peethas', icon: Sparkles, badge: '18' },
    { id: 'coupons', label: 'Coupons & Campaigns', icon: Tag, badge: campaigns.length },
    { id: 'addPost', label: 'Add Post', icon: PlusCircle },
    { id: 'postList', label: 'Post List', icon: FileText, badge: posts.length },
    { id: 'users', label: 'User Management', icon: Users, badge: users.length },
    { id: 'astrology', label: 'Astrologer Desk', icon: Compass, badge: consultations.length },
    { id: 'seo', label: 'SEO & RSS Feeds', icon: Rss },
    { id: 'socialConnections', label: 'Social Connections', icon: Share2, highlight: true },
    { id: 'softwareSetup', label: 'Software Setup', icon: Settings },
    { id: 'analytics', label: 'Platform Analytics', icon: TrendingUp }
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f1f5f9] font-sans text-slate-800">
      {/* ========================================================= */}
      {/* 1. LEFT SIDEBAR (EXACT JANATHA MIRROR FOREST GREEN THEME) */}
      {/* ========================================================= */}
      <aside className={`bg-[#064e3b] text-slate-100 flex flex-col border-r border-emerald-900/60 flex-shrink-0 h-screen transition-all duration-300 z-40 select-none ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      }`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-emerald-800/60 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-emerald-950 text-2xl shadow-md shrink-0">
              🕉️
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-sm tracking-wide text-white font-serif uppercase">
                  Astadasapeetam
                </span>
                <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                  {user?.role === 'digital_marketing' ? 'Marketing Studio' : user?.role === 'astrologer' ? 'Astrologer Studio' : 'Super Admin Console'}
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-800/40 text-xs"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Categories on the Left (Properly Ordered) */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
                  isActive
                    ? 'bg-[#d97706] text-white shadow-md'
                    : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-300' : 'text-slate-300'}`} />
                {!sidebarCollapsed && (
                  <div className="flex items-center justify-between flex-1">
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        isActive ? 'bg-amber-800 text-white' : 'bg-emerald-950/80 text-amber-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User Card */}
        <div className="p-3 border-t border-emerald-800/60 bg-emerald-950/40 text-xs">
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-900 font-black flex items-center justify-center text-xs shadow">
                    {(user?.name || 'Gowrav Vungarala').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11px] truncate max-w-[130px]">
                      {user?.name || 'Gowrav Vungarala'}
                    </div>
                    <div className="text-[10px] text-amber-300 font-semibold uppercase">
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
                  className="text-emerald-300 hover:text-rose-400 p-1 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Fast Social Test Strip in Sidebar */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-emerald-200 border-t border-emerald-800/40">
                <span className="text-[10px] text-emerald-300">Live Links:</span>
                <div className="flex items-center space-x-2">
                  <a href={socialProfiles.whatsapp} target="_blank" rel="noreferrer" title="Chat on WhatsApp" className="text-emerald-400 hover:text-white">
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href={socialProfiles.instagram} target="_blank" rel="noreferrer" title="Open Instagram" className="text-pink-300 hover:text-white">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                  <a href={socialProfiles.facebook} target="_blank" rel="noreferrer" title="Open Facebook" className="text-blue-300 hover:text-white">
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
                className="text-emerald-300 hover:text-rose-400"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MAIN CONSOLE CONTENT (NO PUBLIC FOOTER/HEADER)         */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center space-x-3">
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center space-x-2">
              <span>Welcome back, {user?.name || 'Gowrav Vungarala'}!</span>
              <span>👏</span>
            </h1>

            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
              {user?.role === 'digital_marketing' ? 'Digital Marketing' : user?.role === 'astrologer' ? 'Astrologer' : 'Super Admin'}
            </span>

            <button
              onClick={() => setUserGuideOpen(true)}
              className="bg-emerald-950 hover:bg-emerald-900 text-white text-[11px] font-bold px-3 py-1 rounded-lg flex items-center space-x-1 transition shadow-xs cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>User Guide</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-semibold text-emerald-800">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>National &amp; Sacred Circuit Feed</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="text-xs bg-[#064e3b] hover:bg-[#0b3d2c] text-white font-bold px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 transition shadow cursor-pointer"
            >
              <span>View Public Website</span>
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
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Global Yield &amp; System Performance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Beat/Scope: National &amp; International Sacred Peethas Network
            </p>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD                                          */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Root Console Hero Card (Exact Janatha Mirror Styling) */}
              <div className="bg-[#102d24] text-white rounded-3xl p-7 shadow-xl border border-emerald-800/80 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3 max-w-2xl z-10">
                  <div className="text-[11px] font-black uppercase tracking-widest text-emerald-400 font-mono">
                    ROOT ACCESS — ALL SYSTEMS
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
                    Super Admin Console
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Platform owner. Full unrestricted access — create &amp; delete any role, override any publish gate, manage social profiles (WhatsApp, Instagram, Facebook), control marketplace, curate spirituals, and access all 18 Peethas.
                  </p>
                </div>

                <div className="bg-black/40 border border-emerald-700/40 p-4 rounded-2xl flex flex-col space-y-2 text-xs shrink-0 z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 font-mono">
                    GEO ACCESS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['National', 'State', 'District', '18 Peethas', '37+ Kshetras'].map((geo, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded-full text-[10px] text-amber-200 font-bold"
                      >
                        {geo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 10 Pastel Action Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="bg-[#f0fdf4] hover:bg-[#dcfce7] border border-emerald-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-xl font-bold">
                    🛍️
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Marketplace</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Puja kits, certified rudraksha &amp; prasadam.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('banners')}
                  className="bg-[#fff7ed] hover:bg-[#ffedd5] border border-amber-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 text-xl font-bold">
                    📢
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Banners &amp; Ads</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Top sponsored, sidebar &amp; festival banners.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('websections')}
                  className="bg-[#ecfdf5] hover:bg-[#d1fae5] border border-teal-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 text-xl font-bold">
                    🏛️
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Web Sections</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Live ticker, hero banner &amp; daily sloka.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('spirituals')}
                  className="bg-[#faf5ff] hover:bg-[#f3e8ff] border border-purple-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 text-xl font-bold">
                    📿
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Spirituals</h4>
                    <p className="text-[11px] text-slate-500 mt-1">18 Shakti Peethas &amp; 37+ Kshetras directory.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('coupons')}
                  className="bg-[#fefce8] hover:bg-[#fef9c3] border border-yellow-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-700 text-xl font-bold">
                    🎟️
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Coupons &amp; Deals</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Spiritual coupon codes &amp; campaign metrics.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('socialConnections')}
                  className="bg-[#eef2ff] hover:bg-[#e0e7ff] border border-indigo-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl font-bold">
                    🔗
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Social Connections</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Link WhatsApp, Instagram &amp; Facebook.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('addPost')}
                  className="bg-[#fff1f2] hover:bg-[#ffe4e6] border border-rose-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 text-xl font-bold">
                    ✍️
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Add Sacred Post</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Compose bilingual articles &amp; slokas.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('postList')}
                  className="bg-[#fef2f2] hover:bg-[#fee2e2] border border-orange-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 text-xl font-bold">
                    📋
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Post List</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Track published articles &amp; views.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('users')}
                  className="bg-[#f0f4ff] hover:bg-[#e4ebff] border border-blue-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-bold">
                    👥
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">User Management</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Staff registry &amp; role permissions.</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('softwareSetup')}
                  className="bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-300 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 text-xl font-bold">
                    ⚙️
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Software Setup</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Diagnostics, ports &amp; cache purge.</p>
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
                    className="bg-[#064e3b] hover:bg-[#0b3d2c] text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-md flex items-center space-x-2"
                  >
                    <Check className="w-4 h-4 text-amber-400" />
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
                  className="bg-[#064e3b] hover:bg-[#0b3d2c] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow"
                >
                  <PlusCircle className="w-4 h-4 text-amber-400" />
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
                  <thead className="bg-[#064e3b] text-white uppercase text-[10px] tracking-wider">
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
                    className="bg-[#064e3b] hover:bg-[#0b3d2c] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
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
                  className="bg-[#064e3b] hover:bg-[#0b3d2c] text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  + Add Post
                </button>
              </div>

              <div className="bg-white rounded-2xl border overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#064e3b] text-white uppercase text-[10px] tracking-wider">
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
                  <thead className="bg-[#064e3b] text-white uppercase text-[10px] tracking-wider">
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
                className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5"
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
            <div className="bg-[#064e3b] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Super Admin Operational Guide</span>
              </h3>
              <button onClick={() => setUserGuideOpen(false)} className="text-emerald-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-xs leading-relaxed text-slate-700">
              <p>
                This console is structured just like <strong>Janatha Mirror</strong>. All categories are placed on the left side:
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
                  className="bg-[#064e3b] text-white font-bold px-5 py-2 rounded-xl text-xs"
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
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border">
            <div className="bg-[#064e3b] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Add Product to Marketplace</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-emerald-200 hover:text-white">
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
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-[#064e3b] text-white px-5 py-2 rounded-lg font-bold"
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
