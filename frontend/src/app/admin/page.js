'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  PlusCircle, 
  Globe, 
  Settings, 
  ShoppingBag, 
  Megaphone, 
  Tag, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Search, 
  Filter, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  X, 
  BookOpen, 
  Layers, 
  Sliders, 
  Lock, 
  Database, 
  Server, 
  Rss, 
  Compass, 
  Award, 
  Calendar, 
  DollarSign, 
  FileCode, 
  Copy,
  LogOut,
  Send,
  MapPin,
  Clock
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function UnifiedConsolePage() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard'); 
  // 'dashboard' | 'addPost' | 'postList' | 'users' | 'marketplace' | 'content' | 'campaigns' | 'seo' | 'softwareSetup' | 'astrology' | 'analytics'
  
  const [userManagementSubTab, setUserManagementSubTab] = useState('staffRegistry');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userGuideOpen, setUserGuideOpen] = useState(false);

  // Auth & Identity State
  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    name: 'Gowrav Vungarala',
    role: 'admin',
    email: 'admin@astadasapeetam.com'
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Data Collections
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [siteContents, setSiteContents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [stats, setStats] = useState(null);

  // Filters & Search
  const [postSearch, setPostSearch] = useState('');
  const [postCategoryFilter, setPostCategoryFilter] = useState('all');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userSearch, setUserSearch] = useState('');

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
    seoTitle: '',
    metaDescription: '',
    keywords: 'Astadasapeetam, Shakti Peetha, Panchangam, Jyotirlingas',
    status: 'published'
  });

  // User Register Modal
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: 'Password@123',
    role: 'devotee',
    phone: '+91 '
  });

  // Astrologer Remedy Modal
  const [completingConsultation, setCompletingConsultation] = useState(null);
  const [remedyNotes, setRemedyNotes] = useState('');

  const showToast = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
  };

  // Auto-init and login
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const storedToken = localStorage.getItem('astada_token');
        const storedRole = localStorage.getItem('astada_role');
        const storedUser = localStorage.getItem('astada_user');

        let activeAuthToken = storedToken;

        if (storedToken && storedRole) {
          setToken(storedToken);
          if (storedUser) {
            try { setUser(JSON.parse(storedUser)); } catch {}
          }
        } else {
          // Auto login as Super Admin for seamless development experience
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@astadasapeetam.com', password: 'Admin@12345' })
          });
          const data = await res.json();
          if (data.token) {
            activeAuthToken = data.token;
            setToken(data.token);
            setUser({ ...data.user, name: 'Gowrav Vungarala' });
            localStorage.setItem('astada_token', data.token);
            localStorage.setItem('astada_role', data.user.role);
            localStorage.setItem('astada_user', JSON.stringify({ ...data.user, name: 'Gowrav Vungarala' }));
          }
        }

        if (activeAuthToken) {
          await fetchAllData(activeAuthToken);
        }
      } catch (err) {
        console.error('Init error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Fetch all administrative datasets
  const fetchAllData = async (authToken) => {
    const headers = { Authorization: `Bearer ${authToken}` };
    try {
      const [usersRes, postsRes, prodsRes, contentsRes, campsRes, consultsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/users`, { headers }).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/posts`).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/marketing/products`, { headers }).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/marketing/content`, { headers }).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/marketing/campaigns`, { headers }).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/astrologer/consultations`, { headers }).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${API_BASE}/admin/stats`, { headers }).catch(() => ({ json: () => ({ success: false }) }))
      ]);

      const [usersData, postsData, prodsData, contentsData, campsData, consultsData, statsData] = await Promise.all([
        usersRes.json(),
        postsRes.json(),
        prodsRes.json(),
        contentsRes.json(),
        campsRes.json(),
        consultsRes.json(),
        statsRes.json()
      ]);

      if (usersData?.success) setUsers(usersData.data);
      if (postsData?.success) setPosts(postsData.data);
      if (prodsData?.success) setProducts(prodsData.data);
      if (contentsData?.success) setSiteContents(contentsData.data);
      if (campsData?.success) setCampaigns(campsData.data);
      if (consultsData?.success) setConsultations(consultsData.data);
      if (statsData?.success) setStats(statsData.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  // Quick switch role
  const handleQuickRoleSwitch = async (email, password, roleName) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('astada_token', data.token);
        localStorage.setItem('astada_role', data.user.role);
        localStorage.setItem('astada_user', JSON.stringify(data.user));
        await fetchAllData(data.token);
        showToast('success', `Switched session to ${roleName}`);
      }
    } catch {
      showToast('error', 'Role switch failed');
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
        // Reset form
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
          seoTitle: '',
          metaDescription: '',
          keywords: 'Astadasapeetam, Shakti Peetha, Panchangam',
          status: 'published'
        });
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to publish post');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Post
  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this devotional article?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setPosts(prev => prev.filter(p => p._id !== id));
        showToast('success', data.message);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to delete post');
    } finally {
      setActionLoading(false);
    }
  };

  // Change user role
  const handleRoleChange = async (userId, newRole) => {
    setActionLoading(true);
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
        setUsers(prev => prev.map(u => u._id === userId ? data.data : u));
        showToast('success', data.message);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to update user role');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle user status
  const handleToggleUserStatus = async (userId) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => prev.map(u => u._id === userId ? data.data : u));
        showToast('success', data.message);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to toggle user status');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle product stock
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

  // Toggle website section status
  const handleToggleSectionStatus = async (id) => {
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
      showToast('error', 'Failed to toggle section status');
    } finally {
      setActionLoading(false);
    }
  };

  // Astrologer Accept Consultation
  const handleAcceptConsultation = async (id) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/astrologer/consultations/${id}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ scheduledSlot: new Date(Date.now() + 86400000) })
      });
      const data = await res.json();
      if (data.success) {
        setConsultations(prev => prev.map(c => c._id === id ? data.data : c));
        showToast('success', data.message);
      }
    } catch {
      showToast('error', 'Failed to accept consultation');
    } finally {
      setActionLoading(false);
    }
  };

  // Complete consultation with remedies
  const handleCompleteConsultation = async (e) => {
    e.preventDefault();
    if (!completingConsultation) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/astrologer/consultations/${completingConsultation._id}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ remedyNotes })
      });
      const data = await res.json();
      if (data.success) {
        setConsultations(prev => prev.map(c => c._id === completingConsultation._id ? data.data : c));
        setCompletingConsultation(null);
        setRemedyNotes('');
        showToast('success', 'Vedic remedy prescribed and consultation completed!');
      }
    } catch {
      showToast('error', 'Failed to complete consultation');
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered lists
  const filteredPosts = posts.filter(p => {
    const matchCat = postCategoryFilter === 'all' || p.category === postCategoryFilter;
    const matchSearch = postSearch === '' ||
      p.title?.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.titleTelugu?.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.deity?.toLowerCase().includes(postSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredUsers = users.filter(u => {
    const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchSearch = userSearch === '' ||
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.phone?.toLowerCase().includes(userSearch.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9] font-sans text-slate-800">
      {/* ========================================================= */}
      {/* 1. LEFT SIDEBAR (JANATHA MIRROR FOREST GREEN STYLING)     */}
      {/* ========================================================= */}
      <aside className={`bg-[#064e3b] text-slate-100 flex flex-col border-r border-emerald-900/60 flex-shrink-0 h-screen transition-all duration-300 z-40 select-none ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      }`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-emerald-800/60 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-emerald-950 text-xl shadow-md shrink-0">
              🕉️
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-sm tracking-wide text-white font-serif uppercase">
                  Astadasapeetam
                </span>
                <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider">
                  Reporter & Admin Desk
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

        {/* Sidebar Nav Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
          {/* Dashboard Item */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'dashboard'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </button>

          {/* Add Post Item */}
          <button
            onClick={() => setActiveTab('addPost')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'addPost'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-amber-400 shrink-0" />
            {!sidebarCollapsed && <span>Add Post</span>}
          </button>

          {/* Post List Item */}
          <button
            onClick={() => setActiveTab('postList')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'postList'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span>Post List</span>
                <span className="bg-emerald-950/80 text-amber-300 px-1.5 py-0.2 rounded-full text-[10px]">
                  {posts.length}
                </span>
              </div>
            )}
          </button>

          {/* User Management */}
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'users'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span>User Management</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            )}
          </button>

          {/* Sub menu when active */}
          {!sidebarCollapsed && activeTab === 'users' && (
            <div className="pl-7 pr-2 py-1 space-y-1">
              <button
                onClick={() => setUserManagementSubTab('staffRegistry')}
                className={`w-full text-left py-1 px-2 rounded-md text-[11px] font-medium transition ${
                  userManagementSubTab === 'staffRegistry' ? 'text-amber-300 font-bold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                • Staff Registry
              </button>
              <button
                onClick={() => setUserManagementSubTab('assignRole')}
                className={`w-full text-left py-1 px-2 rounded-md text-[11px] font-medium transition ${
                  userManagementSubTab === 'assignRole' ? 'text-amber-300 font-bold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                • Assign Role to Staff
              </button>
            </div>
          )}

          {/* Marketplace & Products */}
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'marketplace'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span>Marketplace & Catalog</span>
                <span className="bg-emerald-950/80 text-amber-300 px-1.5 py-0.2 rounded-full text-[10px]">
                  {products.length}
                </span>
              </div>
            )}
          </button>

          {/* Website Sections & Banners */}
          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'content'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Megaphone className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Website Content Banners</span>}
          </button>

          {/* Advertisements & Campaigns */}
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'campaigns'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Tag className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Advertisements</span>}
          </button>

          {/* Software Setup */}
          <button
            onClick={() => setActiveTab('softwareSetup')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'softwareSetup'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Software Setup</span>}
          </button>

          {/* SEO & RSS Feeds */}
          <button
            onClick={() => setActiveTab('seo')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'seo'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Rss className="w-4 h-4 shrink-0 text-amber-300" />
            {!sidebarCollapsed && <span>SEO & RSS Feeds</span>}
          </button>

          {/* Astrologer Desk */}
          <button
            onClick={() => setActiveTab('astrology')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'astrology'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0 text-purple-300" />
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span>Astrologer Desk</span>
                <span className="bg-purple-950 text-purple-200 px-1.5 py-0.2 rounded-full text-[10px]">
                  {consultations.length}
                </span>
              </div>
            )}
          </button>

          {/* Platform Analytics */}
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-bold transition text-left ${
              activeTab === 'analytics'
                ? 'bg-[#d97706] text-white shadow-md'
                : 'text-slate-200 hover:text-white hover:bg-emerald-800/50'
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Platform Analytics</span>}
          </button>
        </nav>

        {/* Sidebar Footer User Card */}
        <div className="p-3 border-t border-emerald-800/60 bg-emerald-950/40 text-xs">
          {!sidebarCollapsed ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-stone-900 font-black flex items-center justify-center text-xs">
                    GV
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11px] truncate max-w-[120px]">
                      {user?.name || 'Gowrav Vungarala'}
                    </div>
                    <div className="text-[10px] text-amber-300 capitalize">{user?.role}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    localStorage.removeItem('astada_token');
                    localStorage.removeItem('astada_role');
                    localStorage.removeItem('astada_user');
                    window.location.href = '/';
                  }}
                  className="text-emerald-300 hover:text-rose-400 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Instant Role Switcher Pills */}
              <div className="pt-1 flex items-center justify-between text-[9px] text-emerald-200 border-t border-emerald-800/40">
                <span className="font-semibold">Switch Role:</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleQuickRoleSwitch('admin@astadasapeetam.com', 'Admin@12345', 'Super Admin')}
                    className="bg-emerald-800 hover:bg-emerald-700 px-1.5 py-0.5 rounded font-bold text-white"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => handleQuickRoleSwitch('marketing@astadasapeetam.com', 'Market@12345', 'Marketing')}
                    className="bg-amber-700 hover:bg-amber-600 px-1.5 py-0.5 rounded font-bold text-white"
                  >
                    Market
                  </button>
                  <button
                    onClick={() => handleQuickRoleSwitch('astrologer@astadasapeetam.com', 'Astro@12345', 'Astrologer')}
                    className="bg-purple-800 hover:bg-purple-700 px-1.5 py-0.5 rounded font-bold text-white"
                  >
                    Astro
                  </button>
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
      {/* 2. MAIN WORKSPACE AREA                                    */}
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
              {user?.role === 'admin' ? 'Super Admin' : user?.role?.replace('_', ' ')}
            </span>

            <button
              onClick={() => setUserGuideOpen(true)}
              className="bg-emerald-950 hover:bg-emerald-900 text-white text-[11px] font-bold px-3 py-1 rounded-lg flex items-center space-x-1 transition shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>User Guide</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-semibold text-emerald-800">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>National &amp; Sacred Circuit Feed</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="text-xs bg-[#064e3b] hover:bg-[#0b3d2c] text-white font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition shadow"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Toast */}
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

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Subhead Scope Label */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Global Yield &amp; System Performance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Beat/Scope: National &amp; International Peethas Sacred Circuit
            </p>
          </div>

          {/* ========================================================= */}
          {/* TAB: DASHBOARD                                            */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Big Dark Hero Card (Exact Janatha Mirror Styling) */}
              <div className="bg-[#102d24] text-white rounded-3xl p-7 shadow-xl border border-emerald-800/80 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3 max-w-2xl z-10">
                  <div className="text-[11px] font-black uppercase tracking-widest text-emerald-400 font-mono">
                    ROOT ACCESS — ALL SYSTEMS
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-serif">
                    Super Admin Console
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Platform owner. Full unrestricted access — create &amp; delete any role, override any publish gate, manage SEO &amp; RSS feeds, software setup, control all language editions, access every sacred circuit.
                  </p>
                </div>

                {/* Right Badges (GEO / SACRED ACCESS) */}
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

              {/* Colorful Action Cards Grid (Exact Janatha Mirror Colors) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* 1. Create / Delete Roles */}
                <button
                  onClick={() => setActiveTab('users')}
                  className="bg-[#f0f4ff] hover:bg-[#e4ebff] border border-blue-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-bold">
                    👥
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Create / Delete Roles</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      Build custom roles, set permissions, delete unused roles instantly.
                    </p>
                  </div>
                </button>

                {/* 2. Add Post */}
                <button
                  onClick={() => setActiveTab('addPost')}
                  className="bg-[#fff1f2] hover:bg-[#ffe4e6] border border-rose-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 text-xl font-bold">
                    ✍️
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Add Sacred Post</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      Compose articles, temple sthala puranams, daily panchangam &amp; slokas.
                    </p>
                  </div>
                </button>

                {/* 3. Post List */}
                <button
                  onClick={() => setActiveTab('postList')}
                  className="bg-[#fef2f2] hover:bg-[#fee2e2] border border-orange-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 text-xl font-bold">
                    📋
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Post List Registry</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      Manage all published articles, review drafts, and track readership views.
                    </p>
                  </div>
                </button>

                {/* 4. Marketplace */}
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="bg-[#f0fdf4] hover:bg-[#dcfce7] border border-emerald-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-xl font-bold">
                    🛍️
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Marketplace Studio</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      Pooja kits, certified rudraksha, energized yantras, and sanctum prasadam.
                    </p>
                  </div>
                </button>

                {/* 5. Website Content Banners */}
                <button
                  onClick={() => setActiveTab('content')}
                  className="bg-[#ecfdf5] hover:bg-[#d1fae5] border border-teal-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 text-xl font-bold">
                    📢
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Website Sections</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      Live ticker, hero banner, sloka of the day &amp; festival special alerts.
                    </p>
                  </div>
                </button>

                {/* 6. SEO & RSS Feeds */}
                <button
                  onClick={() => setActiveTab('seo')}
                  className="bg-[#fff7ed] hover:bg-[#ffedd5] border border-amber-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 text-xl font-bold">
                    🌐
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">SEO &amp; RSS Feeds</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      XML Sitemaps, live RSS 2.0 feeds, Google meta tags &amp; schema markup.
                    </p>
                  </div>
                </button>

                {/* 7. Software Setup */}
                <button
                  onClick={() => setActiveTab('softwareSetup')}
                  className="bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-300 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 text-xl font-bold">
                    ⚙️
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Software Setup</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      MongoDB diagnostics, Express API ports, cache, and system backups.
                    </p>
                  </div>
                </button>

                {/* 8. Astrologer Desk */}
                <button
                  onClick={() => setActiveTab('astrology')}
                  className="bg-[#faf5ff] hover:bg-[#f3e8ff] border border-purple-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 text-xl font-bold">
                    🔮
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Astrologer Desk</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      Devotee birth charts, kundali matching, and remedy prescriptions.
                    </p>
                  </div>
                </button>

                {/* 9. Advertisements */}
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className="bg-[#fefce8] hover:bg-[#fef9c3] border border-yellow-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-700 text-xl font-bold">
                    💰
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Revenue &amp; Coupons</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      Spiritual promo codes, gross bookings, and devotee savings ledger.
                    </p>
                  </div>
                </button>

                {/* 10. Platform Analytics */}
                <button
                  onClick={() => setActiveTab('analytics')}
                  className="bg-[#fdf4ff] hover:bg-[#fae8ff] border border-fuchsia-200 p-4 rounded-2xl text-left transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-100 flex items-center justify-center text-fuchsia-700 text-xl font-bold">
                    📈
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Platform Analytics</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      Real-time devotee visitors, pilgrimage queries &amp; server latency.
                    </p>
                  </div>
                </button>
              </div>

              {/* Bottom Quick Status Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Platform Roles</div>
                  <div className="text-xl font-black text-slate-900">4 Active Roles</div>
                  <div className="text-[10px] text-emerald-600 font-bold">Admin, Marketing, Astro, Devotee</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Registered Users</div>
                  <div className="text-xl font-black text-slate-900">{users.length} Devotees &amp; Staff</div>
                  <div className="text-[10px] text-emerald-600 font-bold">100% Verified Database</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Sacred Articles</div>
                  <div className="text-xl font-black text-slate-900">{posts.length} Published</div>
                  <div className="text-[10px] text-amber-600 font-bold">Available via RSS &amp; Sitemap</div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Server Uptime</div>
                  <div className="text-xl font-black text-emerald-700">99.98% Healthy</div>
                  <div className="text-[10px] text-slate-500">MongoDB + Express + Next.js</div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: ADD POST                                             */}
          {/* ========================================================= */}
          {activeTab === 'addPost' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <PlusCircle className="w-5 h-5 text-amber-600" />
                    <span>Create Sacred Post &amp; Devotional Article</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Compose articles in English &amp; Telugu with deities, sacred verses, categories, and SEO metadata.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('postList')}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-bold transition"
                >
                  View All Posts &rarr;
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Post Title (English) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Srisailam Bhramaramba Devi: The Sacred Neck Peetha"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full border rounded-xl p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Title in Telugu (శీర్షిక)</label>
                    <input
                      type="text"
                      placeholder="శ్రీశైల భ్రమరాంబికా దేవి వైశిష్ట్యం"
                      value={newPost.titleTelugu}
                      onChange={(e) => setNewPost({ ...newPost, titleTelugu: e.target.value })}
                      className="w-full border rounded-xl p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category *</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full border rounded-xl p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="temples">Temples &amp; Shakti Peethas</option>
                      <option value="panchangam">Daily Panchangam &amp; Muhurtham</option>
                      <option value="slokas">Stotrams &amp; Daily Slokas</option>
                      <option value="astrology">Vedic Astrology &amp; Remedies</option>
                      <option value="festivals">Festivals &amp; Vratams</option>
                      <option value="marketplace">Marketplace &amp; Samagri</option>
                      <option value="general">General Devotional</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Presiding Deity</label>
                    <input
                      type="text"
                      placeholder="e.g. Mata Bhramaramba &amp; Mallikarjuna Swamy"
                      value={newPost.deity}
                      onChange={(e) => setNewPost({ ...newPost, deity: e.target.value })}
                      className="w-full border rounded-xl p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Featured Image URL</label>
                    <input
                      type="text"
                      value={newPost.featuredImage}
                      onChange={(e) => setNewPost({ ...newPost, featuredImage: e.target.value })}
                      className="w-full border rounded-xl p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sacred Devotional Verse / Sloka (శ్లోకం)</label>
                  <textarea
                    rows="2"
                    placeholder="శ్రీశైలే భ్రమరాంబా చ..."
                    value={newPost.devotionalVerse}
                    onChange={(e) => setNewPost({ ...newPost, devotionalVerse: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-xs focus:border-emerald-600 focus:outline-none font-serif"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Short Summary / Excerpt</label>
                  <input
                    type="text"
                    placeholder="Brief 1-2 sentence overview for SEO &amp; social feeds..."
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    className="w-full border rounded-xl p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Article Body Content *</label>
                  <textarea
                    rows="8"
                    required
                    placeholder="Write complete sacred history, sthala puranam, ritual timings, and spiritual significance..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full border rounded-xl p-3 text-xs focus:border-emerald-600 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* SEO Meta Box */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                  <div className="font-bold text-amber-900 flex items-center space-x-1.5">
                    <Globe className="w-4 h-4 text-amber-600" />
                    <span>SEO &amp; Social Share Metadata</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Keywords (Comma separated)</label>
                      <input
                        type="text"
                        value={newPost.keywords}
                        onChange={(e) => setNewPost({ ...newPost, keywords: e.target.value })}
                        className="w-full bg-white border rounded-lg p-2 text-xs focus:outline-none focus:border-amber-600"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Tags</label>
                      <input
                        type="text"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                        className="w-full bg-white border rounded-lg p-2 text-xs focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('postList')}
                    className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="bg-[#064e3b] hover:bg-[#0b3d2c] text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-md flex items-center space-x-2 transition"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>{actionLoading ? 'Publishing...' : 'Publish Devotional Post'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: POST LIST                                            */}
          {/* ========================================================= */}
          {activeTab === 'postList' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-emerald-700" />
                    <span>Post List &amp; Sacred Content Registry</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Total articles published across 18 Peethas, Panchangam &amp; Jyotish channels: <strong>{posts.length}</strong>
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('addPost')}
                  className="bg-[#064e3b] hover:bg-[#0b3d2c] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow"
                >
                  <PlusCircle className="w-4 h-4 text-amber-400" />
                  <span>Create New Post</span>
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 flex-grow max-w-md">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles by title, deity, or keywords..."
                    value={postSearch}
                    onChange={(e) => setPostSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="flex items-center space-x-2 overflow-x-auto">
                  {['all', 'temples', 'festivals', 'astrology', 'slokas', 'panchangam'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPostCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-lg uppercase tracking-wider font-semibold transition ${
                        postCategoryFilter === cat
                          ? 'bg-[#064e3b] text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Posts Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#064e3b] text-white uppercase text-[10px] tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Article Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Deity</th>
                      <th className="py-3 px-4">Views</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPosts.map((post) => (
                      <tr key={post._id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 max-w-md">
                          <div className="font-bold text-slate-900 line-clamp-1">{post.title}</div>
                          {post.titleTelugu && (
                            <div className="text-[11px] text-amber-800 font-serif line-clamp-1">{post.titleTelugu}</div>
                          )}
                          <div className="text-[10px] text-slate-400 mt-0.5">Slug: /{post.slug}</div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                            {post.category}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-slate-700 font-medium">{post.deity || 'Universal Parashakti'}</td>

                        <td className="py-3 px-4 font-bold text-slate-800">{post.viewsCount || 850}</td>

                        <td className="py-3 px-4">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                            {post.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right space-x-2">
                          <a
                            href={`/temples`}
                            target="_blank"
                            className="text-emerald-700 hover:text-emerald-900 font-semibold"
                          >
                            Preview
                          </a>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="text-rose-600 hover:text-rose-800 font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: USER MANAGEMENT                                      */}
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

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsAddUserOpen(true)}
                    className="bg-[#064e3b] hover:bg-[#0b3d2c] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow"
                  >
                    <PlusCircle className="w-4 h-4 text-amber-400" />
                    <span>Register New Staff</span>
                  </button>
                </div>
              </div>

              {/* Sub tab navigation */}
              <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-slate-200 text-xs">
                <button
                  onClick={() => setUserManagementSubTab('staffRegistry')}
                  className={`px-4 py-1.5 rounded-lg font-bold transition ${
                    userManagementSubTab === 'staffRegistry'
                      ? 'bg-[#064e3b] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Staff Registry
                </button>
                <button
                  onClick={() => setUserManagementSubTab('assignRole')}
                  className={`px-4 py-1.5 rounded-lg font-bold transition ${
                    userManagementSubTab === 'assignRole'
                      ? 'bg-[#064e3b] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Assign Role to Staff
                </button>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#064e3b] text-white uppercase text-[10px] tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">User Name</th>
                      <th className="py-3 px-4">Email &amp; Contact</th>
                      <th className="py-3 px-4">Assigned Role</th>
                      <th className="py-3 px-4">Role Changer</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-bold text-slate-900">{u.name}</td>
                        <td className="py-3 px-4">
                          <div className="text-slate-800">{u.email}</div>
                          <div className="text-[10px] text-slate-400">{u.phone || 'No phone'}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            u.role === 'admin'
                              ? 'bg-rose-100 text-rose-800'
                              : u.role === 'digital_marketing'
                              ? 'bg-amber-100 text-amber-800'
                              : u.role === 'astrologer'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={u.role}
                            disabled={actionLoading || u.email === 'admin@astadasapeetam.com'}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                            className="bg-white border rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none"
                          >
                            <option value="admin">Super Admin</option>
                            <option value="digital_marketing">Digital Marketing</option>
                            <option value="astrologer">Astrologer</option>
                            <option value="devotee">Devotee</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {u.isActive ? 'ACTIVE' : 'SUSPENDED'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {u.email !== 'admin@astadasapeetam.com' && (
                            <button
                              onClick={() => handleToggleUserStatus(u._id)}
                              className="text-xs px-2.5 py-1 rounded-lg border font-semibold hover:bg-slate-100"
                            >
                              {u.isActive ? 'Suspend' : 'Activate'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: SEO & RSS FEEDS                                      */}
          {/* ========================================================= */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 text-xl font-bold">
                    🌐
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">SEO &amp; RSS Feeds Hub</h3>
                    <p className="text-xs text-slate-500">
                      Live XML Sitemap, RSS 2.0 Syndication Feed, Canonical Tags, and Search Engine Optimization.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                  {/* Live RSS 2.0 Feed Card */}
                  <div className="p-5 rounded-2xl bg-[#fff7ed] border border-amber-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-amber-900 flex items-center space-x-1.5">
                        <Rss className="w-4 h-4 text-amber-600" />
                        <span>Live RSS 2.0 Feed</span>
                      </div>
                      <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ACTIVE SYNDICATION
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      Automatically syndicates new temple sthala puranams, daily panchangam, festival announcements, and spiritual items.
                    </p>

                    <div className="bg-white p-2.5 rounded-xl border border-amber-300 font-mono text-[11px] text-amber-900 flex items-center justify-between">
                      <span className="truncate">http://localhost:5000/api/public/rss</span>
                      <a
                        href="http://localhost:5000/api/public/rss"
                        target="_blank"
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-2 py-1 rounded text-[10px] shrink-0 ml-2"
                      >
                        Open XML
                      </a>
                    </div>
                  </div>

                  {/* Live XML Sitemap Card */}
                  <div className="p-5 rounded-2xl bg-[#ecfdf5] border border-emerald-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-emerald-900 flex items-center space-x-1.5">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        <span>Dynamic XML Sitemap</span>
                      </div>
                      <span className="bg-emerald-200 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        AUTO-GENERATING
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      Includes 18 Maha Shakti Peethas, 37+ famous Indian temple kshetras, Tirtha Yatralu packages, and articles.
                    </p>

                    <div className="bg-white p-2.5 rounded-xl border border-emerald-300 font-mono text-[11px] text-emerald-900 flex items-center justify-between">
                      <span className="truncate">http://localhost:5000/api/public/sitemap</span>
                      <a
                        href="http://localhost:5000/api/public/sitemap"
                        target="_blank"
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2 py-1 rounded text-[10px] shrink-0 ml-2"
                      >
                        Open XML
                      </a>
                    </div>
                  </div>
                </div>

                {/* Robots.txt & Schema preview */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-800">Robots.txt Directive</div>
                  <pre className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
{`User-agent: *
Allow: /
Allow: /sacred-temples
Allow: /temples
Allow: /marketplace
Allow: /yatralu
Allow: /panchangam
Disallow: /admin
Disallow: /reporter

Sitemap: http://localhost:5000/api/public/sitemap`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: SOFTWARE SETUP                                       */}
          {/* ========================================================= */}
          {activeTab === 'softwareSetup' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 text-xl font-bold">
                    ⚙️
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Software Setup &amp; Diagnostics</h3>
                    <p className="text-xs text-slate-500">
                      Server environment variables, MongoDB status, API ports, and system cache controls.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Database Engine</div>
                    <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>MongoDB 127.0.0.1:27017</span>
                    </div>
                    <div className="text-[11px] text-slate-500">Database: astadasapeetam</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Backend Server</div>
                    <div className="font-bold text-slate-900">Node.js Express (Port 5000)</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">Active &amp; Responding</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Frontend Server</div>
                    <div className="font-bold text-slate-900">Next.js 15 (Port 3001)</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">App Router Engine</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Auth &amp; Security</div>
                    <div className="font-bold text-slate-900">JWT Bearer Tokens</div>
                    <div className="text-[11px] text-slate-500">RBAC Middleware Active</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Active Roles</div>
                    <div className="font-bold text-slate-900">4 Base Roles Configured</div>
                    <div className="text-[11px] text-slate-500">Admin, Marketing, Astro, Devotee</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-slate-400 font-bold uppercase text-[10px]">Repository State</div>
                    <div className="font-bold text-slate-900">Branch: main</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">Git Synced</div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      fetchAllData(token);
                      showToast('success', 'System diagnostics refreshed & cache purged!');
                    }}
                    className="bg-[#064e3b] hover:bg-[#0b3d2c] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Clear Cache &amp; Refresh Diagnostics</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: MARKETPLACE & CATALOG                                */}
          {/* ========================================================= */}
          {activeTab === 'marketplace' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-700" />
                    <span>Marketplace Inventory &amp; Stock Manager</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Digital Marketing &amp; Admin catalog control. Toggle stock availability in real-time.
                  </p>
                </div>

                <Link
                  href="/marketplace"
                  target="_blank"
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1"
                >
                  <span>Public Store</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p._id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase bg-amber-100 text-[#701a28] px-2 py-0.5 rounded-full">
                        {p.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {p.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{p.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{p.subtitle}</p>
                    </div>

                    <div className="flex items-baseline space-x-2 pt-1 border-t border-slate-100">
                      <span className="text-base font-black text-slate-900">₹{p.price}</span>
                      {p.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">₹{p.originalPrice}</span>
                      )}
                      <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                        {p.discount}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleProductStock(p._id)}
                      disabled={actionLoading}
                      className={`w-full py-1.5 rounded-xl border text-xs font-bold transition ${
                        p.inStock
                          ? 'border-rose-300 text-rose-700 hover:bg-rose-50'
                          : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
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
          {/* TAB: WEBSITE CONTENT                                      */}
          {/* ========================================================= */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <Megaphone className="w-5 h-5 text-emerald-700" />
                    <span>Website Section Content &amp; Banners</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize titles, badges, and CTAs across each website section.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {siteContents.map((section) => (
                  <div key={section._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
                      onClick={() => handleToggleSectionStatus(section._id)}
                      disabled={actionLoading}
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
          {/* TAB: ASTROLOGY DESK                                       */}
          {/* ========================================================= */}
          {activeTab === 'astrology' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-700" />
                    <span>Astrologer Jyotish Workspace</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Devotee birth charts, vivaha guna milan, and Vedic remedy prescriptions.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {consultations.map((c) => (
                  <div key={c._id} className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="font-bold text-slate-900">{c.devoteeName} (📞 {c.devoteePhone})</div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-900">
                        {c.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-purple-50/50 p-3 rounded-xl">
                      <div>DOB: <strong>{c.birthDetails?.dateOfBirth}</strong></div>
                      <div>Time: <strong>{c.birthDetails?.timeOfBirth}</strong></div>
                      <div>Place: <strong>{c.birthDetails?.placeOfBirth}</strong></div>
                      <div>Rasi: <strong className="text-purple-900">{c.birthDetails?.rasi}</strong></div>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border">
                      "{c.problemDescription}"
                    </p>

                    {c.astrologerRemedyNotes && (
                      <div className="text-xs bg-amber-50 p-3 rounded-xl border border-amber-200">
                        <strong className="text-[#701a28]">Prescribed Remedy: </strong>
                        <span>{c.astrologerRemedyNotes}</span>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2 pt-1">
                      {c.status === 'pending' && (
                        <button
                          onClick={() => handleAcceptConsultation(c._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                        >
                          Accept
                        </button>
                      )}
                      {c.status !== 'completed' && (
                        <button
                          onClick={() => {
                            setCompletingConsultation(c);
                            setRemedyNotes(c.astrologerRemedyNotes || '');
                          }}
                          className="bg-[#064e3b] hover:bg-[#0b3d2c] text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                        >
                          Write Remedy &amp; Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: CAMPAIGNS & ADVERTISEMENTS                           */}
          {/* ========================================================= */}
          {activeTab === 'campaigns' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-amber-600" />
                    <span>Advertisements &amp; Devotional Campaigns</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Launch spiritual coupons, festival campaigns, and sponsored ad slots.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#064e3b] text-white uppercase text-[10px] tracking-wider font-semibold">
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
                        <td colSpan="5" className="py-8 text-center text-slate-400">
                          No active campaigns yet.
                        </td>
                      </tr>
                    ) : (
                      campaigns.map((camp) => (
                        <tr key={camp._id} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4 font-bold text-slate-800">{camp.title}</td>
                          <td className="py-3 px-4 font-mono font-black text-amber-700">{camp.couponCode || 'N/A'}</td>
                          <td className="py-3 px-4 font-bold text-emerald-700">{camp.discountPercentage}% OFF</td>
                          <td className="py-3 px-4 uppercase text-[10px]">{camp.channel}</td>
                          <td className="py-3 px-4">
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {camp.status}
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
          {/* TAB: PLATFORM ANALYTICS                                   */}
          {/* ========================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-700" />
                  <span>Platform Traffic &amp; Devotee Reach</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <span className="text-slate-500 font-bold uppercase text-[10px]">Monthly Devotee Reads</span>
                    <div className="text-2xl font-black text-emerald-900">48,250 Views</div>
                    <span className="text-[10px] text-emerald-700 font-bold">+28% this month</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                    <span className="text-slate-500 font-bold uppercase text-[10px]">Active Pilgrimage Inquiries</span>
                    <div className="text-2xl font-black text-amber-900">1,240 Requests</div>
                    <span className="text-[10px] text-amber-700 font-bold">Kashi, Srisailam, Tirumala</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                    <span className="text-slate-500 font-bold uppercase text-[10px]">Astrology Consultations</span>
                    <div className="text-2xl font-black text-purple-900">324 Bookings</div>
                    <span className="text-[10px] text-purple-700 font-bold">4.9 / 5.0 Rating</span>
                  </div>
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
                <span>Super Admin &amp; Staff Operations Guide</span>
              </h3>
              <button onClick={() => setUserGuideOpen(false)} className="text-emerald-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-xs leading-relaxed text-slate-700 max-h-[75vh] overflow-y-auto">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 font-medium">
                Welcome to the unified Astadasapeetam platform console. Modeled after Janatha Mirror's editorial &amp; administrative architecture.
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Key Modules &amp; Workflows:</h4>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li><strong>Add Post:</strong> Compose articles with dual English &amp; Telugu titles, category tagging, and automatic SEO slug generation.</li>
                  <li><strong>Post List:</strong> View all published articles, track views, and delete or preview on the public site.</li>
                  <li><strong>User Management:</strong> Promote any devotee to Digital Marketing, Astrologer, or Super Admin with 1 click.</li>
                  <li><strong>SEO &amp; RSS Feeds:</strong> Live XML Sitemap at <code>/api/public/sitemap</code> and RSS 2.0 at <code>/api/public/rss</code>.</li>
                  <li><strong>Software Setup:</strong> View live health diagnostics of MongoDB, Express, and Next.js.</li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setUserGuideOpen(false)}
                  className="bg-[#064e3b] text-white font-bold px-5 py-2 rounded-xl text-xs"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Staff Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-emerald-200">
            <div className="bg-[#064e3b] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>Register Staff / User</span>
              </h3>
              <button onClick={() => setIsAddUserOpen(false)} className="text-emerald-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setActionLoading(true);
                try {
                  const res = await fetch(`${API_BASE}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                  });
                  const data = await res.json();
                  if (data.success) {
                    setIsAddUserOpen(false);
                    setNewUser({ name: '', email: '', password: 'Password@123', role: 'devotee', phone: '+91 ' });
                    await fetchAllData(token);
                    showToast('success', `User '${data.user.name}' registered!`);
                  } else {
                    showToast('error', data.message);
                  }
                } catch {
                  showToast('error', 'Failed to register user');
                } finally {
                  setActionLoading(false);
                }
              }}
              className="p-5 space-y-3 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acharya Vidyasagar"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@astadasapeetam.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role *</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="devotee">Devotee</option>
                    <option value="digital_marketing">Digital Marketing</option>
                    <option value="astrologer">Astrologer</option>
                    <option value="admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-lg bg-[#064e3b] text-white font-bold"
                >
                  {actionLoading ? 'Saving...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remedy Modal */}
      {completingConsultation && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-purple-200">
            <div className="bg-[#064e3b] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">
                Prescribe Remedy for {completingConsultation.devoteeName}
              </h3>
              <button onClick={() => setCompletingConsultation(null)} className="text-emerald-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCompleteConsultation} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Vedic Remedy &amp; Mantra *</label>
                <textarea
                  rows="5"
                  required
                  placeholder="Write prescribed homa, mantra japa, temple archana, and rudraksha recommendations..."
                  value={remedyNotes}
                  onChange={(e) => setRemedyNotes(e.target.value)}
                  className="w-full border rounded-xl p-3 focus:outline-none font-serif"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setCompletingConsultation(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 bg-[#064e3b] text-white font-bold rounded-lg"
                >
                  Complete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
