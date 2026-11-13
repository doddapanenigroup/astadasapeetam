'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  User, Package, MapPin, Compass, ShieldCheck, 
  Truck, Check, Copy, Download, Phone, Mail, 
  Sparkles, Plus, Edit3, ShoppingBag, LogOut, ChevronRight
} from 'lucide-react';
import HeaderNav from '../../components/HeaderNav';
import Footer from '../../components/Footer';

// Default mock order history
const DEFAULT_DEVOTEE_ORDERS = [
  {
    orderNumber: 'AST-894210',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    status: 'in_transit',
    awbNumber: 'SR-DEL-98421048',
    courierName: 'Delhivery Surface (Shiprocket)',
    currentLocation: 'Hyderabad Central Sorting Hub (Hub-04)',
    estimatedDelivery: 'Tomorrow, by 5:00 PM',
    paymentMethod: 'upi',
    totalAmount: 3499,
    discountAmount: 280,
    finalPayable: 3219,
    vendorName: 'Kumbakonam Sacred Bronzes & Pooja Crafts',
    items: [
      {
        id: 'p1',
        title: 'Original Kumbakonam Panchaloha Nataraja Idol (6-Inch)',
        price: 2999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=300&q=80',
        templeOrigin: 'Kumbakonam, Tamil Nadu'
      },
      {
        id: 'p2',
        title: 'Pure Himalayan Bhasma & Vibhuti (100g Jar)',
        price: 500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=300&q=80',
        templeOrigin: 'Haridwar Sanctum'
      }
    ],
    timeline: [
      { step: 'Order Placed', time: 'Yesterday, 10:15 AM', done: true, desc: 'Payment verified via UPI (Ref: 489104)' },
      { step: 'Vedic Sanctification', time: 'Yesterday, 02:30 PM', done: true, desc: 'Sanctified with Gangajal & Vedic Mantras by Kumbakonam priest' },
      { step: 'Picked Up by Courier', time: 'Yesterday, 06:45 PM', done: true, desc: 'Shiprocket courier picked up from Kumbakonam artisan workshop' },
      { step: 'In Transit', time: 'Today, 08:30 AM', done: true, current: true, desc: 'Arrived at Hyderabad Central Sorting Hub. Out for local dispatch soon.' },
      { step: 'Delivered', time: 'Estimated Tomorrow', done: false, desc: 'Safe doorstep contactless sanctum delivery' }
    ],
    customer: {
      name: 'Gowrav Vungarala',
      phone: '+91 86398 61707',
      address: 'Plot 42, Sri Sai Nagar, Near Venkateswara Temple, Khammam, Telangana - 507002'
    }
  },
  {
    orderNumber: 'AST-732049',
    createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    status: 'delivered',
    awbNumber: 'SR-BD-74391204',
    courierName: 'Blue Dart Air Express (Shiprocket)',
    currentLocation: 'Delivered at Sanctum',
    estimatedDelivery: 'Delivered successfully',
    paymentMethod: 'upi',
    totalAmount: 1850,
    discountAmount: 150,
    finalPayable: 1700,
    vendorName: 'Haridwar Pure Rudraksha Kendra',
    items: [
      {
        id: 'p3',
        title: 'Authentic 5-Mukhi Indonesian Rudraksha Mala (108+1 Beads)',
        price: 1850,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=300&q=80',
        templeOrigin: 'Haridwar, Uttarakhand'
      }
    ],
    timeline: [
      { step: 'Order Placed', time: '7 days ago', done: true, desc: 'Payment verified' },
      { step: 'Sanctified at Ganga Ghat', time: '6 days ago', done: true, desc: 'Prana Pratishtha completed at Har Ki Pauri' },
      { step: 'Dispatched via Blue Dart', time: '5 days ago', done: true, desc: 'Dispatched from Haridwar hub' },
      { step: 'In Transit', time: '4 days ago', done: true, desc: 'Transited via Delhi & Hyderabad' },
      { step: 'Delivered', time: '3 days ago', done: true, current: true, desc: 'Handed over to devotee at destination' }
    ],
    customer: {
      name: 'Gowrav Vungarala',
      phone: '+91 86398 61707',
      address: 'Plot 42, Sri Sai Nagar, Near Venkateswara Temple, Khammam, Telangana - 507002'
    }
  }
];

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';
  const [activeTab, setActiveTab] = useState(initialTab); // 'orders' | 'addresses' | 'account'

  const [devotee, setDevotee] = useState({
    name: 'Gowrav Vungarala',
    phone: '+91 86398 61707',
    email: 'gowrav@astadasapeetam.com',
    punyamPoints: 480,
    gotram: 'Kasyapa',
    nakshatram: 'Rohini',
    verified: true
  });

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [copiedAwb, setCopiedAwb] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '', email: '', gotram: '', nakshatram: '' });

  // Sync tab with URL query parameter
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && ['orders', 'addresses', 'account'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  // Load devotee details and orders from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('astada_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setDevotee(prev => ({
          ...prev,
          name: parsed.name || prev.name,
          email: parsed.email || prev.email,
          phone: parsed.phone || prev.phone,
          gotram: parsed.gotram || prev.gotram,
          nakshatram: parsed.nakshatram || prev.nakshatram
        }));
      }

      const storedOrders = localStorage.getItem('astada_devotee_orders');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        if (parsedOrders.length > 0) {
          setOrders([...parsedOrders, ...DEFAULT_DEVOTEE_ORDERS]);
          setSelectedOrder(parsedOrders[0]);
          return;
        }
      }
      setOrders(DEFAULT_DEVOTEE_ORDERS);
      setSelectedOrder(DEFAULT_DEVOTEE_ORDERS[0]);
    } catch {
      setOrders(DEFAULT_DEVOTEE_ORDERS);
      setSelectedOrder(DEFAULT_DEVOTEE_ORDERS[0]);
    }
  }, []);

  const handleCopyAwb = (awb) => {
    if (!awb) return;
    navigator.clipboard.writeText(awb);
    setCopiedAwb(awb);
    setTimeout(() => setCopiedAwb(null), 2500);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...devotee,
      name: editForm.name || devotee.name,
      phone: editForm.phone || devotee.phone,
      email: editForm.email || devotee.email,
      gotram: editForm.gotram || devotee.gotram,
      nakshatram: editForm.nakshatram || devotee.nakshatram
    };
    setDevotee(updated);
    try {
      const stored = JSON.parse(localStorage.getItem('astada_user') || '{}');
      const nextUser = { ...stored, ...updated };
      localStorage.setItem('astada_user', JSON.stringify(nextUser));
      window.dispatchEvent(new Event('devoteeUpdated'));
    } catch {}
    setIsEditingProfile(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('astada_token');
    localStorage.removeItem('astada_role');
    localStorage.removeItem('astada_user');
    window.location.href = '/';
  };

  return (
    <main className="flex-1 w-[96%] max-w-7xl mx-auto py-6 sm:py-8 space-y-6">
      {/* Devotee Profile Header Banner (Clean, No Profile Photos) */}
      <div className="bg-gradient-to-r from-[#78131e] via-[#8c1724] to-[#5a0c15] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative z-10">
          {/* Left: Outline Icon & Personal Info */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* Clean User Outline Icon Container (No Profile Photo) */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-amber-300/60 flex items-center justify-center text-amber-300 shadow-md">
              <User className="w-9 h-9 sm:w-11 sm:h-11 stroke-[1.8]" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
                  {devotee.name}
                </h1>
                {devotee.verified && (
                  <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-200 border border-amber-400/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                    Verified Devotee
                  </span>
                )}
              </div>

              <p className="text-amber-100/80 text-xs sm:text-sm font-medium flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  {devotee.phone}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-amber-300" />
                  {devotee.email}
                </span>
              </p>

              <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 text-xs">
                <span className="bg-white/10 px-2.5 py-1 rounded-lg text-amber-100 font-medium">
                  Gotram: <strong className="text-white font-bold">{devotee.gotram}</strong>
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg text-amber-100 font-medium">
                  Nakshatram: <strong className="text-white font-bold">{devotee.nakshatram}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Spiritual Karma Points Card & Action Buttons */}
          <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-center sm:text-right">
              <span className="text-[11px] uppercase tracking-wider text-amber-200 font-semibold block">
                Temple Punyam Karma
              </span>
              <div className="flex items-center justify-center sm:justify-end gap-1.5 text-2xl font-black text-amber-300 font-serif">
                <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>{devotee.punyamPoints} Points</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditForm({ 
                    name: devotee.name, 
                    phone: devotee.phone, 
                    email: devotee.email, 
                    gotram: devotee.gotram, 
                    nakshatram: devotee.nakshatram 
                  });
                  setIsEditingProfile(true);
                }}
                className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold px-3.5 py-2 rounded-xl transition shadow cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow cursor-pointer border border-white/20"
                title="Logout from Account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details Edit Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-amber-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-serif font-black text-lg text-[#78131e]">Account Details</h3>
              <button 
                onClick={() => setIsEditingProfile(false)}
                className="text-stone-400 hover:text-stone-700 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#78131e]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#78131e]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#78131e]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Gotram</label>
                  <input
                    type="text"
                    value={editForm.gotram}
                    onChange={(e) => setEditForm({ ...editForm, gotram: e.target.value })}
                    placeholder="e.g. Kasyapa"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#78131e]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Nakshatram</label>
                  <input
                    type="text"
                    value={editForm.nakshatram}
                    onChange={(e) => setEditForm({ ...editForm, nakshatram: e.target.value })}
                    placeholder="e.g. Rohini"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 outline-none focus:border-[#78131e]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#78131e] hover:bg-[#600e17] text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3 Core Navigation Tabs: Order History, Shipping Address, Account Details */}
      <div className="flex items-center gap-2 border-b border-[#ebdcc7] overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-3 font-bold text-xs sm:text-sm rounded-t-2xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-white text-[#78131e] border-t-2 border-x border-[#ebdcc7] shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-amber-50/50'
          }`}
        >
          <Package className="w-4 h-4 text-[#78131e]" />
          <span>Order History</span>
          <span className="bg-amber-100 text-[#78131e] text-[10px] font-black px-2 py-0.5 rounded-full">
            {orders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-5 py-3 font-bold text-xs sm:text-sm rounded-t-2xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'addresses'
              ? 'bg-white text-[#78131e] border-t-2 border-x border-[#ebdcc7] shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-amber-50/50'
          }`}
        >
          <MapPin className="w-4 h-4 text-amber-700" />
          <span>Shipping Address</span>
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`flex items-center gap-2 px-5 py-3 font-bold text-xs sm:text-sm rounded-t-2xl transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'account'
              ? 'bg-white text-[#78131e] border-t-2 border-x border-[#ebdcc7] shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-amber-50/50'
          }`}
        >
          <User className="w-4 h-4 text-stone-600" />
          <span>Account Details</span>
        </button>
      </div>

      {/* TAB 1: ORDER HISTORY & LIVE TRACKING */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#ebdcc7] space-y-4 shadow-sm">
              <ShoppingBag className="w-16 h-16 text-amber-400 mx-auto" />
              <h3 className="text-xl font-serif font-black text-stone-800">No Orders in History</h3>
              <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
                Explore authentic pooja kits, Haridwar Rudraksha, and Kumbakonam bronze idols with direct doorstep delivery.
              </p>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 bg-[#78131e] hover:bg-[#600e17] text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md transition"
              >
                <span>Browse Sacred Marketplace</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Orders List (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-extrabold text-stone-800 uppercase tracking-wider">
                    Recent Orders ({orders.length})
                  </h2>
                  <span className="text-[11px] text-stone-500 font-medium">Select order to view live journey</span>
                </div>

                <div className="space-y-3">
                  {orders.map((order, idx) => {
                    const isSelected = selectedOrder?.orderNumber === order.orderNumber;
                    const isDelivered = order.status === 'delivered';

                    return (
                      <div
                        key={order.orderNumber || idx}
                        onClick={() => setSelectedOrder(order)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50/60 border-[#78131e] shadow-md ring-2 ring-[#78131e]/10'
                            : 'bg-white border-stone-200 hover:border-amber-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-sm text-stone-900">
                                {order.orderNumber}
                              </span>
                              <span
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                  isDelivered
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                                }`}
                              >
                                {isDelivered ? '✓ Delivered' : '🚚 In Transit'}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>

                          <span className="text-sm font-black text-[#78131e]">
                            ₹{order.finalPayable ? order.finalPayable.toLocaleString() : order.totalAmount}
                          </span>
                        </div>

                        {/* Items preview */}
                        <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center gap-3">
                          {order.items && order.items.slice(0, 3).map((item, i) => (
                            <img
                              key={i}
                              src={item.image || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=120&q=80'}
                              alt={item.title}
                              className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                            />
                          ))}
                          <div className="text-[11px] text-stone-600 font-medium truncate">
                            {order.items && order.items[0]?.title}
                            {order.items && order.items.length > 1 && ` + ${order.items.length - 1} more`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Selected Order Live Tracking */}
              {selectedOrder && (
                <div className="lg:col-span-7 bg-white rounded-3xl border border-[#ebdcc7] p-5 sm:p-7 shadow-md space-y-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider font-extrabold text-stone-400">Order ID</span>
                        <span className="font-mono text-lg font-black text-[#78131e]">{selectedOrder.orderNumber}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Downloading Tax Invoice for ${selectedOrder.orderNumber}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>

                      <a
                        href={`https://wa.me/918639861707?text=Hello%20Astadasapeetam,%20I%20need%20assistance%20with%20my%20Order%20${selectedOrder.orderNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs"
                      >
                        <span>WhatsApp Help</span>
                      </a>
                    </div>
                  </div>

                  {/* LIVE SHIPROCKET COURIER TRACKING BOX */}
                  <div className="bg-gradient-to-br from-amber-50/80 to-stone-50 rounded-2xl p-5 border border-amber-200/80 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center font-bold shadow-xs">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">
                            Courier Partner
                          </span>
                          <h4 className="font-bold text-sm text-stone-900">
                            {selectedOrder.courierName || 'Delhivery Express via Shiprocket'}
                          </h4>
                        </div>
                      </div>

                      {selectedOrder.awbNumber && (
                        <div className="bg-white border border-amber-300 rounded-xl px-3 py-1.5 flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-mono font-black text-stone-800">
                            {selectedOrder.awbNumber}
                          </span>
                          <button
                            onClick={() => handleCopyAwb(selectedOrder.awbNumber)}
                            className="text-stone-500 hover:text-[#78131e] transition cursor-pointer"
                            title="Copy AWB Code"
                          >
                            {copiedAwb === selectedOrder.awbNumber ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Current Status banner */}
                    <div className="bg-white rounded-xl p-3 border border-stone-200/80 flex items-center justify-between text-xs font-medium">
                      <div className="flex items-center gap-2 text-stone-700">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>Status: <strong>{selectedOrder.currentLocation || 'In Transit'}</strong></span>
                      </div>
                      <span className="text-amber-900 font-bold">
                        ETA: {selectedOrder.estimatedDelivery || '3-5 business days'}
                      </span>
                    </div>

                    {/* Step-by-step progress tracking */}
                    <div className="pt-2">
                      <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 mb-3">
                        Journey &amp; Dispatch Timeline
                      </h5>

                      <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-200">
                        {(selectedOrder.timeline || [
                          { step: 'Order Placed & Verified', time: 'Confirmed', done: true, desc: 'Sacred order received in platform' },
                          { step: 'Vedic Sanctification', time: 'Sanctified', done: true, desc: 'Blessed with Gangajal at artisan workshop' },
                          { step: 'Picked Up by Shiprocket', time: 'Dispatched', done: true, current: true, desc: 'Courier picked up from temple vendor address' },
                          { step: 'Out for Delivery', time: 'Pending', done: false, desc: 'Local delivery partner arrival' },
                          { step: 'Delivered', time: 'Pending', done: false, desc: 'Delivered at devotee home altar' }
                        ]).map((t, idx) => (
                          <div key={idx} className="relative flex items-start gap-4 pl-8">
                            <div
                              className={`absolute left-1.5 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center -translate-x-1/2 ${
                                t.done
                                  ? 'bg-[#78131e] border-[#78131e] text-white'
                                  : t.current
                                  ? 'bg-amber-400 border-amber-500 text-stone-900 ring-4 ring-amber-200'
                                  : 'bg-white border-stone-300'
                              }`}
                            >
                              {t.done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>

                            <div className="flex-1 -mt-0.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className={`font-bold ${t.done || t.current ? 'text-stone-900' : 'text-stone-400'}`}>
                                  {t.step}
                                </span>
                                <span className="text-[10px] text-stone-400 font-mono">{t.time}</span>
                              </div>
                              <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{t.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Items Ordered */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-600">
                      Ordered Items ({selectedOrder.items?.length || 0})
                    </h4>

                    <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden">
                      {(selectedOrder.items || []).map((item, idx) => (
                        <div key={idx} className="p-3.5 flex items-center justify-between gap-3 bg-white hover:bg-stone-50/50 transition">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=120&q=80'}
                              alt={item.title}
                              className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                            />
                            <div>
                              <h5 className="font-bold text-xs sm:text-sm text-stone-900 line-clamp-1">
                                {item.title}
                              </h5>
                              <p className="text-[11px] text-amber-800 font-medium">
                                Source: {item.templeOrigin || selectedOrder.vendorName || 'Kumbakonam Temple Craftsman'}
                              </p>
                              <span className="text-[10px] text-stone-400">Qty: {item.quantity || 1}</span>
                            </div>
                          </div>

                          <span className="font-extrabold text-xs sm:text-sm text-stone-900 shrink-0">
                            ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination & Payment Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                        Shipping Address
                      </span>
                      <p className="font-bold text-stone-900">{selectedOrder.customer?.name || devotee.name}</p>
                      <p className="text-stone-600 text-[11px] leading-relaxed">
                        {selectedOrder.customer?.address || 'Plot 42, Sri Sai Nagar, Khammam, Telangana - 507002'}
                      </p>
                      <p className="text-[11px] text-stone-500 font-mono mt-1">
                        Phone: {selectedOrder.customer?.phone || devotee.phone}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
                        Payment Summary
                      </span>
                      <div className="flex justify-between text-stone-600 text-[11px]">
                        <span>Items Total:</span>
                        <span>₹{selectedOrder.totalAmount?.toLocaleString()}</span>
                      </div>
                      {selectedOrder.discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold text-[11px]">
                          <span>Discounts Applied:</span>
                          <span>-₹{selectedOrder.discountAmount?.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-stone-600 text-[11px]">
                        <span>Delivery:</span>
                        <span className="text-emerald-700 font-bold">FREE</span>
                      </div>
                      <div className="pt-1.5 border-t border-stone-200 flex justify-between font-black text-stone-900 text-xs">
                        <span>Total Paid:</span>
                        <span className="text-[#78131e]">
                          ₹{(selectedOrder.finalPayable || selectedOrder.totalAmount)?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SHIPPING ADDRESS */}
      {activeTab === 'addresses' && (
        <div className="bg-white rounded-3xl border border-[#ebdcc7] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-serif font-black text-stone-900">Shipping Address</h3>
              <p className="text-xs text-stone-500">Manage where your sacred pooja items and orders are delivered</p>
            </div>

            <button
              onClick={() => alert('Add Address: You can add and manage addresses directly in checkout or here.')}
              className="inline-flex items-center gap-1.5 bg-[#78131e] hover:bg-[#600e17] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border-2 border-[#78131e] bg-amber-50/40 relative space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-black text-stone-900 text-sm">Gowrav Vungarala</span>
                  <span className="bg-[#78131e] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">Default</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-200 text-stone-700 px-2 py-0.5 rounded">Home</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                Plot 42, Sri Sai Nagar, Near Venkateswara Swamy Temple, Khammam, Telangana - 507002
              </p>
              <p className="text-xs text-stone-500 font-mono">Mobile: +91 86398 61707</p>
            </div>

            <div className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-amber-300 transition space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-stone-900 text-sm">Gowrav Office Altar</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-200 text-stone-700 px-2 py-0.5 rounded">Office</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                Tech Park Hub, Hitec City, Madhapur, Hyderabad, Telangana - 500081
              </p>
              <p className="text-xs text-stone-500 font-mono">Mobile: +91 86398 61707</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ACCOUNT DETAILS */}
      {activeTab === 'account' && (
        <div className="bg-white rounded-3xl border border-[#ebdcc7] p-6 sm:p-8 space-y-6 shadow-sm max-w-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-serif font-black text-stone-900">Account Details</h3>
              <p className="text-xs text-stone-500">Your devotee profile and spiritual sankalpa details</p>
            </div>

            <button
              onClick={() => {
                setEditForm({ 
                  name: devotee.name, 
                  phone: devotee.phone, 
                  email: devotee.email, 
                  gotram: devotee.gotram, 
                  nakshatram: devotee.nakshatram 
                });
                setIsEditingProfile(true);
              }}
              className="inline-flex items-center gap-1.5 bg-[#78131e] hover:bg-[#600e17] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          </div>

          <div className="divide-y divide-stone-100 text-xs sm:text-sm">
            <div className="py-3 flex justify-between items-center">
              <span className="text-stone-500 font-medium">Full Name</span>
              <span className="font-bold text-stone-900">{devotee.name}</span>
            </div>

            <div className="py-3 flex justify-between items-center">
              <span className="text-stone-500 font-medium">Mobile Number</span>
              <span className="font-bold text-stone-900 font-mono">{devotee.phone}</span>
            </div>

            <div className="py-3 flex justify-between items-center">
              <span className="text-stone-500 font-medium">Email Address</span>
              <span className="font-bold text-stone-900">{devotee.email}</span>
            </div>

            <div className="py-3 flex justify-between items-center">
              <span className="text-stone-500 font-medium">Gotram</span>
              <span className="font-bold text-stone-900">{devotee.gotram}</span>
            </div>

            <div className="py-3 flex justify-between items-center">
              <span className="text-stone-500 font-medium">Janma Nakshatram</span>
              <span className="font-bold text-stone-900">{devotee.nakshatram}</span>
            </div>

            <div className="py-3 flex justify-between items-center">
              <span className="text-stone-500 font-medium">Punyam Points</span>
              <span className="font-bold text-amber-700">{devotee.punyamPoints} Points</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function MyAccountPage() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col font-sans">
      <HeaderNav />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center py-20 text-stone-500">Loading Account...</div>}>
        <AccountContent />
      </Suspense>
      <Footer />
    </div>
  );
}
