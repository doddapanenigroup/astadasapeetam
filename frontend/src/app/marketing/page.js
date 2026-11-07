'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  LayoutTemplate, 
  TrendingUp, 
  Tag, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  Sparkles, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  Globe, 
  Calendar, 
  DollarSign, 
  Megaphone,
  ArrowRight,
  Package,
  Sliders,
  Check,
  X
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function MarketingStudioPage() {
  const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace' | 'content' | 'campaigns' | 'analytics'
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Data states
  const [products, setProducts] = useState([]);
  const [siteContents, setSiteContents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  // Filter states
  const [productCategory, setProductCategory] = useState('all');
  const [productSearch, setProductSearch] = useState('');
  const [contentPageFilter, setContentPageFilter] = useState('all');

  // Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingContent, setEditingContent] = useState(null);
  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false);

  // Form states for new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'pooja-kits',
    subtitle: '',
    price: '',
    originalPrice: '',
    discount: '25% OFF',
    image: '/images/poojakit.png',
    certified: '100% Satvik & Energized',
    stockQuantity: 100,
    description: '',
    features: ''
  });

  // Form state for new campaign
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    couponCode: '',
    channel: 'discount_coupon',
    targetAudience: 'All Devotees',
    discountPercentage: 15,
    status: 'active'
  });

  // Helper notification
  const showToast = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
  };

  // Perform auto-login as Digital Marketing on load for frictionless dev testing
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const storedToken = localStorage.getItem('astada_token');
        const storedRole = localStorage.getItem('astada_role');

        if (storedToken && storedRole === 'digital_marketing') {
          setToken(storedToken);
          setUser({ name: 'Priya Sharma', role: 'digital_marketing', email: 'marketing@astadasapeetam.com' });
          await fetchAllData(storedToken);
        } else {
          // Auto login with default digital marketing credentials
          const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'marketing@astadasapeetam.com', password: 'Market@12345' })
          });
          const data = await res.json();
          if (data.token) {
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('astada_token', data.token);
            localStorage.setItem('astada_role', data.user.role);
            await fetchAllData(data.token);
          }
        }
      } catch (err) {
        console.error('Error during init:', err);
        showToast('error', 'Could not connect to backend server on port 5000');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Fetch all marketing data
  const fetchAllData = async (authToken) => {
    const headers = { Authorization: `Bearer ${authToken}` };
    try {
      const [prodRes, contentRes, campRes, analyticsRes] = await Promise.all([
        fetch(`${API_BASE}/marketing/products`, { headers }),
        fetch(`${API_BASE}/marketing/content`, { headers }),
        fetch(`${API_BASE}/marketing/campaigns`, { headers }),
        fetch(`${API_BASE}/marketing/analytics`, { headers })
      ]);

      const [prodData, contentData, campData, analyticsData] = await Promise.all([
        prodRes.json(),
        contentRes.json(),
        campRes.json(),
        analyticsRes.json()
      ]);

      if (prodData.success) setProducts(prodData.data);
      if (contentData.success) setSiteContents(contentData.data);
      if (campData.success) setCampaigns(campData.data);
      if (analyticsData.success) setAnalytics(analyticsData.data);
    } catch (err) {
      console.error('Fetch error:', err);
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
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to toggle product stock');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle Website Section Status
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
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to toggle section status');
    } finally {
      setActionLoading(false);
    }
  };

  // Create Product Submit
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        ...newProduct,
        features: newProduct.features ? newProduct.features.split('\n').filter(Boolean) : []
      };

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
        setNewProduct({
          name: '',
          category: 'pooja-kits',
          subtitle: '',
          price: '',
          originalPrice: '',
          discount: '25% OFF',
          image: '/images/poojakit.png',
          certified: '100% Satvik & Energized',
          stockQuantity: 100,
          description: '',
          features: ''
        });
        showToast('success', data.message);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to create product');
    } finally {
      setActionLoading(false);
    }
  };

  // Update Product Submit
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/marketing/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingProduct)
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p._id === editingProduct._id ? data.data : p));
        setEditingProduct(null);
        showToast('success', data.message);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to update product');
    } finally {
      setActionLoading(false);
    }
  };

  // Update Website Section Content
  const handleUpdateContent = async (e) => {
    e.preventDefault();
    if (!editingContent) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/marketing/content/${editingContent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingContent)
      });
      const data = await res.json();
      if (data.success) {
        setSiteContents(prev => prev.map(c => c._id === editingContent._id ? data.data : c));
        setEditingContent(null);
        showToast('success', data.message);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to update section content');
    } finally {
      setActionLoading(false);
    }
  };

  // Create Campaign
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/marketing/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newCampaign)
      });
      const data = await res.json();
      if (data.success) {
        setCampaigns(prev => [data.data, ...prev]);
        setIsAddCampaignOpen(false);
        setNewCampaign({
          title: '',
          couponCode: '',
          channel: 'discount_coupon',
          targetAudience: 'All Devotees',
          discountPercentage: 15,
          status: 'active'
        });
        showToast('success', data.message);
      } else {
        showToast('error', data.message);
      }
    } catch {
      showToast('error', 'Failed to launch campaign');
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesCategory = productCategory === 'all' || p.category === productCategory;
    const matchesSearch = productSearch === '' || 
      p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtered Content
  const filteredContents = siteContents.filter(c => {
    return contentPageFilter === 'all' || c.page === contentPageFilter;
  });

  return (
    <div className="min-h-screen bg-[#faf8f4] text-slate-800 font-sans pb-20">
      {/* Top Banner & Identity */}
      <div className="bg-[#4a0e17] text-white border-b border-amber-900/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🕉️</span>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-wide">Digital Marketing & Content Studio</h1>
                <span className="text-[10px] bg-amber-500 text-stone-900 font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                  Role: Digital Marketing
                </span>
              </div>
              <p className="text-xs text-amber-200/80">
                Manage Marketplace Inventory, Prices & Live Website Section Contents
              </p>
            </div>
          </div>

          {/* User Status & Fast Links */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-stone-900/50 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold">{user?.name || 'Priya Sharma'}</span>
              <span className="text-amber-300">({user?.email || 'marketing@astadasapeetam.com'})</span>
            </div>
            <Link 
              href="/marketplace" 
              target="_blank"
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-3 py-1.5 rounded-lg flex items-center space-x-1 transition"
            >
              <span>View Public Marketplace</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex space-x-2 border-t border-amber-900/30 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex items-center space-x-2 px-4 py-2 font-semibold text-sm rounded-t-lg transition border-b-2 ${
              activeTab === 'marketplace'
                ? 'bg-[#faf8f4] text-[#701a28] border-amber-600 shadow'
                : 'text-amber-100 hover:text-white border-transparent hover:bg-stone-800/40'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Marketplace Catalog & Stock</span>
            <span className="bg-amber-100 text-[#701a28] text-xs px-2 py-0.2 rounded-full font-bold ml-1">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center space-x-2 px-4 py-2 font-semibold text-sm rounded-t-lg transition border-b-2 ${
              activeTab === 'content'
                ? 'bg-[#faf8f4] text-[#701a28] border-amber-600 shadow'
                : 'text-amber-100 hover:text-white border-transparent hover:bg-stone-800/40'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Website Sections & Banners</span>
            <span className="bg-amber-100 text-[#701a28] text-xs px-2 py-0.2 rounded-full font-bold ml-1">
              {siteContents.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex items-center space-x-2 px-4 py-2 font-semibold text-sm rounded-t-lg transition border-b-2 ${
              activeTab === 'campaigns'
                ? 'bg-[#faf8f4] text-[#701a28] border-amber-600 shadow'
                : 'text-amber-100 hover:text-white border-transparent hover:bg-stone-800/40'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Spiritual Coupons & Campaigns</span>
            <span className="bg-amber-100 text-[#701a28] text-xs px-2 py-0.2 rounded-full font-bold ml-1">
              {campaigns.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-2 px-4 py-2 font-semibold text-sm rounded-t-lg transition border-b-2 ${
              activeTab === 'analytics'
                ? 'bg-[#faf8f4] text-[#701a28] border-amber-600 shadow'
                : 'text-amber-100 hover:text-white border-transparent hover:bg-stone-800/40'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Marketing Reach & Metrics</span>
          </button>
        </div>
      </div>

      {/* Toast Notification Alert */}
      {statusMessage.text && (
        <div className="max-w-md mx-auto mt-4 px-4">
          <div className={`p-3 rounded-xl shadow-lg border flex items-center space-x-3 text-sm animate-fade-in ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Studio Body */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* ========================================================= */}
        {/* TAB 1: MARKETPLACE CATALOG & STOCK MANAGEMENT             */}
        {/* ========================================================= */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            {/* Header Actions & KPI */}
            <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#701a28] flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-amber-600" />
                  <span>Marketplace Inventory & Pricing Studio</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Digital Marketing controls puja kits, certified rudraksha, energized yantras, and sanctified prasadam available to devotees.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => fetchAllData(token)}
                  className="bg-amber-50 hover:bg-amber-100 text-[#701a28] border border-amber-200 px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
                  title="Refresh Inventory"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="bg-[#701a28] hover:bg-[#58131e] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow hover:shadow-md transition"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 flex-grow max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products by name, title, or keyword..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto text-xs">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'pooja-kits', label: '🪔 Pooja Kits' },
                  { id: 'rudraksha', label: '📿 Rudraksha' },
                  { id: 'yantras-idols', label: '🔱 Yantras' },
                  { id: 'dhoop-samagri', label: '🕯️ Camphor & Dhoop' },
                  { id: 'vedic-books', label: '📜 Books' },
                  { id: 'prasadam', label: '🥥 Prasadam' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setProductCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition ${
                      productCategory === cat.id
                        ? 'bg-[#701a28] text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((p) => (
                <div
                  key={p._id}
                  className={`bg-white rounded-2xl border transition shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden ${
                    p.inStock ? 'border-amber-200/80' : 'border-rose-200 bg-rose-50/20 opacity-80'
                  }`}
                >
                  <div className="p-5 space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-[#701a28] px-2.5 py-0.5 rounded-full">
                        {p.category}
                      </span>
                      {p.inStock ? (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>In Stock ({p.stockQuantity || 50})</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <X className="w-3 h-3" />
                          <span>Out of Stock</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{p.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.subtitle || p.description}</p>
                    </div>

                    {/* Pricing Block */}
                    <div className="flex items-baseline space-x-2 pt-2 border-t border-slate-100">
                      <span className="text-lg font-black text-[#701a28]">₹{p.price}</span>
                      {p.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">₹{p.originalPrice}</span>
                      )}
                      <span className="text-[11px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded">
                        {p.discount || 'Special Offer'}
                      </span>
                    </div>

                    {/* Certification note */}
                    <div className="text-[11px] text-amber-800/80 flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>{p.certified || 'Certified Satvik Item'}</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="bg-slate-50 p-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleProductStock(p._id)}
                      disabled={actionLoading}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center space-x-1 transition ${
                        p.inStock
                          ? 'border-rose-300 text-rose-700 hover:bg-rose-50'
                          : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      {p.inStock ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Mark Out of Stock</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Mark In Stock</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setEditingProduct(p)}
                      className="bg-[#701a28] hover:bg-[#58131e] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition shadow-sm"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Price & Info</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: WEBSITE SECTIONS CONTENT MANAGEMENT                */}
        {/* ========================================================= */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Explanatory Banner */}
            <div className="bg-gradient-to-r from-[#4a0e17] to-[#701a28] text-white p-6 rounded-2xl shadow-md space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <LayoutTemplate className="w-4 h-4" />
                <span>Multi-Section Website Content Control</span>
              </div>
              <h2 className="text-xl font-bold">Manage Live Website Sections, Banners & Devotional Slokas</h2>
              <p className="text-xs text-amber-100 max-w-3xl leading-relaxed">
                As the Digital Marketing team, customize the text, headlines, devotional badges, and promotional CTAs across each section of Astadasapeetam. Devotees see these updates live immediately upon toggling.
              </p>
            </div>

            {/* Filter by target page */}
            <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-semibold text-slate-600">Filter Section by Target Page:</span>
                {['all', 'home', 'marketplace', 'sacred-temples', 'yatralu'].map((page) => (
                  <button
                    key={page}
                    onClick={() => setContentPageFilter(page)}
                    className={`px-3 py-1 rounded-lg uppercase tracking-wide font-medium transition ${
                      contentPageFilter === page
                        ? 'bg-[#701a28] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Active Sections Displayed: <strong className="text-emerald-700">{filteredContents.filter(c => c.isActive).length}</strong> / {filteredContents.length}
              </div>
            </div>

            {/* Sections List */}
            <div className="space-y-4">
              {filteredContents.map((section) => (
                <div
                  key={section._id}
                  className={`bg-white rounded-2xl border p-5 transition shadow-sm hover:shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                    section.isActive ? 'border-amber-200' : 'border-slate-200 bg-slate-50/50 opacity-75'
                  }`}
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center space-x-2 flex-wrap gap-1">
                      <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-[#701a28]">
                        Section: {section.sectionKey}
                      </span>
                      <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                        Page: {section.page}
                      </span>
                      {section.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                          {section.badge}
                        </span>
                      )}
                      {section.isActive ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>LIVE ON WEBSITE</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <EyeOff className="w-3 h-3" />
                          <span>HIDDEN (DRAFT)</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-base text-slate-900">{section.title}</h3>
                    {section.subtitle && (
                      <p className="text-xs text-slate-600 leading-relaxed">{section.subtitle}</p>
                    )}
                    {section.content && (
                      <div className="bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60 text-xs font-serif text-[#701a28]">
                        {section.content}
                      </div>
                    )}

                    <div className="flex items-center space-x-4 text-xs text-slate-500 pt-1">
                      <span>CTA Button: <strong className="text-slate-700">{section.ctaText || 'None'}</strong></span>
                      <span>Target Link: <strong className="text-amber-800 underline">{section.ctaLink || '/'}</strong></span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 flex-shrink-0 self-end md:self-center">
                    <button
                      onClick={() => handleToggleSectionStatus(section._id)}
                      disabled={actionLoading}
                      className={`text-xs font-semibold px-3 py-2 rounded-xl border flex items-center space-x-1.5 transition ${
                        section.isActive
                          ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                          : 'border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      {section.isActive ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hide Section</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Publish Live</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setEditingContent(section)}
                      className="bg-[#701a28] hover:bg-[#58131e] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 transition shadow"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Content</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CAMPAIGNS & SPIRITUAL COUPONS                      */}
        {/* ========================================================= */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#701a28] flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-amber-600" />
                  <span>Devotional Coupons & Seasonal Campaigns</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Launch discount codes for festival yatralu, astrology sessions, and spiritual kits.
                </p>
              </div>

              <button
                onClick={() => setIsAddCampaignOpen(true)}
                className="bg-[#701a28] hover:bg-[#58131e] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Create New Coupon</span>
              </button>
            </div>

            {/* Campaigns Table */}
            <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#4a0e17] text-white uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Campaign Title</th>
                    <th className="py-3 px-4">Coupon Code</th>
                    <th className="py-3 px-4">Discount</th>
                    <th className="py-3 px-4">Channel</th>
                    <th className="py-3 px-4">Target Audience</th>
                    <th className="py-3 px-4">Redemptions</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {campaigns.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-slate-400">
                        No campaigns created yet. Click "Create New Coupon" to launch your first spiritual discount code!
                      </td>
                    </tr>
                  ) : (
                    campaigns.map((camp) => (
                      <tr key={camp._id} className="hover:bg-amber-50/40 transition">
                        <td className="py-3 px-4 font-bold text-slate-800">{camp.title}</td>
                        <td className="py-3 px-4">
                          <span className="font-mono bg-amber-100 text-[#701a28] px-2 py-0.5 rounded font-black border border-amber-300">
                            {camp.couponCode || 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-emerald-700">{camp.discountPercentage}% OFF</td>
                        <td className="py-3 px-4 uppercase text-[10px] text-slate-600">{camp.channel}</td>
                        <td className="py-3 px-4 text-slate-600">{camp.targetAudience}</td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{camp.metrics?.redemptions || 0}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            camp.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
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
        {/* TAB 4: MARKETING ANALYTICS                                */}
        {/* ========================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-medium">Marketplace Products</span>
                <div className="text-2xl font-black text-[#701a28]">{analytics?.marketplace?.totalProducts || products.length}</div>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  {analytics?.marketplace?.inStockProducts || 0} In Stock
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-medium">Active Website Sections</span>
                <div className="text-2xl font-black text-amber-700">{analytics?.websiteContent?.activeSectionsCount || siteContents.filter(c => c.isActive).length}</div>
                <span className="text-[11px] text-slate-500">Live across Home & Pages</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-medium">Spiritual Coupons Launched</span>
                <div className="text-2xl font-black text-slate-800">{analytics?.totalCampaigns || campaigns.length}</div>
                <span className="text-[11px] text-amber-600 font-semibold">Promotional campaigns</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-medium">Devotee Redemptions</span>
                <div className="text-2xl font-black text-emerald-700">{analytics?.totalRedemptions || 0}</div>
                <span className="text-[11px] text-slate-500">Gross Devotee Savings</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL: ADD PRODUCT                                        */}
      {/* ========================================================= */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-amber-200">
            <div className="bg-[#4a0e17] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add Product to Marketplace</span>
              </h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-amber-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-5 space-y-3 text-xs max-h-[80vh] overflow-y-auto">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Pure Desi Camphor or Rudraksha Mala"
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  >
                    <option value="pooja-kits">Pooja Kits</option>
                    <option value="rudraksha">Rudraksha</option>
                    <option value="yantras-idols">Yantras & Idols</option>
                    <option value="dhoop-samagri">Camphor & Dhoop</option>
                    <option value="vedic-books">Vedic Books</option>
                    <option value="prasadam">Temple Prasadam</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newProduct.stockQuantity}
                    onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="799"
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    placeholder="1299"
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Highlight</label>
                <input
                  type="text"
                  value={newProduct.subtitle}
                  onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                  placeholder="e.g. Lab Certified Natural Beads • 100% Satvik"
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows="2"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Authentic description of spiritual virtues..."
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Key Features (One per line)</label>
                <textarea
                  rows="2"
                  value={newProduct.features}
                  onChange={(e) => setNewProduct({ ...newProduct, features: e.target.value })}
                  placeholder="Blessed at Jyotirlinga Sanctum&#10;Includes velvet Gomukhi bag"
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-lg bg-[#701a28] hover:bg-[#58131e] text-white font-bold"
                >
                  {actionLoading ? 'Saving...' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT PRODUCT                                       */}
      {/* ========================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-amber-200">
            <div className="bg-[#4a0e17] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>Edit Product: {editingProduct.name}</span>
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-amber-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discount Tag</label>
                  <input
                    type="text"
                    value={editingProduct.discount || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, discount: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.stockQuantity || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockQuantity: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Highlight</label>
                <input
                  type="text"
                  value={editingProduct.subtitle || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-lg bg-[#701a28] hover:bg-[#58131e] text-white font-bold"
                >
                  {actionLoading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: EDIT SECTION CONTENT                               */}
      {/* ========================================================= */}
      {editingContent && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-amber-200">
            <div className="bg-[#4a0e17] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>Edit Section: {editingContent.sectionName}</span>
              </h3>
              <button onClick={() => setEditingContent(null)} className="text-amber-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateContent} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge / Tag</label>
                  <input
                    type="text"
                    value={editingContent.badge || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, badge: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Page</label>
                  <select
                    value={editingContent.page}
                    onChange={(e) => setEditingContent({ ...editingContent, page: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  >
                    <option value="all">All Pages</option>
                    <option value="home">Home</option>
                    <option value="marketplace">Marketplace</option>
                    <option value="sacred-temples">Sacred Temples</option>
                    <option value="yatralu">Yatralu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={editingContent.title}
                  onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Body</label>
                <textarea
                  rows="2"
                  value={editingContent.subtitle || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, subtitle: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              {editingContent.content !== undefined && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Devotional Verse / Sloka (Optional)</label>
                  <textarea
                    rows="2"
                    value={editingContent.content || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, content: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none font-serif"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={editingContent.ctaText || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, ctaText: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">CTA Destination URL</label>
                  <input
                    type="text"
                    value={editingContent.ctaLink || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, ctaLink: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingContent(null)}
                  className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-lg bg-[#701a28] hover:bg-[#58131e] text-white font-bold"
                >
                  {actionLoading ? 'Saving...' : 'Update Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE CAMPAIGN                                    */}
      {/* ========================================================= */}
      {isAddCampaignOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-amber-200">
            <div className="bg-[#4a0e17] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Launch Devotional Coupon Campaign</span>
              </h3>
              <button onClick={() => setIsAddCampaignOpen(false)} className="text-amber-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maha Shivaratri Special Discount"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="SHIVARATRI2026"
                    value={newCampaign.couponCode}
                    onChange={(e) => setNewCampaign({ ...newCampaign, couponCode: e.target.value.toUpperCase() })}
                    className="w-full border rounded-lg p-2 font-mono uppercase focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discount % *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="90"
                    value={newCampaign.discountPercentage}
                    onChange={(e) => setNewCampaign({ ...newCampaign, discountPercentage: Number(e.target.value) })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Channel</label>
                  <select
                    value={newCampaign.channel}
                    onChange={(e) => setNewCampaign({ ...newCampaign, channel: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  >
                    <option value="discount_coupon">Website Coupon</option>
                    <option value="social_media">Social Media</option>
                    <option value="newsletter">Email Newsletter</option>
                    <option value="festival_banner">Festival Banner</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={newCampaign.targetAudience}
                    onChange={(e) => setNewCampaign({ ...newCampaign, targetAudience: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddCampaignOpen(false)}
                  className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-lg bg-[#701a28] hover:bg-[#58131e] text-white font-bold"
                >
                  {actionLoading ? 'Launching...' : 'Launch Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
