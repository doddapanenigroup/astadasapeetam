'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Package,
  Truck,
  CreditCard,
  Tag,
  PlusCircle,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Printer,
  Share2,
  ExternalLink,
  ChevronDown,
  Layers,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Percent,
  Copy,
  TrendingUp,
  RefreshCw,
  Box,
  Check
} from 'lucide-react';

export default function MarketplaceCommerceStudio({
  products = [],
  setProducts,
  campaigns = [],
  setCampaigns,
  showToast
}) {
  // Sub-tabs: 'inventory' | 'orders' | 'payments' | 'coupons'
  const [activeSubTab, setActiveSubTab] = useState('inventory');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [selectedOrderModal, setSelectedOrderModal] = useState(null);

  // Initial Mock Orders demonstrating real ecommerce delivery workflow
  const [orders, setOrders] = useState([
    {
      id: 'AST-ORD-1082',
      customerName: 'Kameshwar Sharma',
      phone: '+91 98480 22334',
      email: 'kameshwar.s@gmail.com',
      address: 'Plot 42, Sri Rama Colony, Near Venkateswara Swamy Temple, Tirupati, Andhra Pradesh - 517501',
      items: [
        { name: 'Pure Copper 3D Maha Meru Sri Yantra (450g)', qty: 1, price: 1899, sku: 'AST-MERU-01' },
        { name: 'Bhimseni Pure Desi Camphor (500g)', qty: 2, price: 549, sku: 'AST-KAPR-02' }
      ],
      totalAmount: 2997,
      couponApplied: 'SHIVA20 (-₹599)',
      finalPaid: 2398,
      paymentMethod: 'Prepaid UPI (PhonePe)',
      paymentStatus: 'PAID',
      paymentTxnId: 'pay_N8s9xK120938',
      deliveryStatus: 'SHIPPED', // 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED'
      courierPartner: 'BlueDart Express',
      awbNumber: 'BD-78921441IN',
      orderDate: '12 Nov 2026, 09:30 AM',
      dispatchDate: '12 Nov 2026, 04:15 PM',
      estimatedDelivery: '14 Nov 2026'
    },
    {
      id: 'AST-ORD-1081',
      customerName: 'Ananya Varma',
      phone: '+91 94401 88721',
      email: 'ananya.varma@yahoo.com',
      address: 'Flat 302, Sai Nilayam, Road No. 12, Banjara Hills, Hyderabad, Telangana - 500034',
      items: [
        { name: 'Certified 5-Mukhi Nepal Rudraksha Japa Mala (108 Beads)', qty: 1, price: 799, sku: 'AST-RUDR-05' },
        { name: 'Pure Brass Kamakshi Deepam with Daily Nityarchana Diya', qty: 2, price: 899, sku: 'AST-KAM-01' }
      ],
      totalAmount: 2597,
      couponApplied: 'FIRST100 (-₹100)',
      finalPaid: 2497,
      paymentMethod: 'Razorpay (Credit Card)',
      paymentStatus: 'PAID',
      paymentTxnId: 'pay_R7u8vM441299',
      deliveryStatus: 'PACKED',
      courierPartner: 'Delhivery Surface',
      awbNumber: 'DEL-9921884021',
      orderDate: '12 Nov 2026, 02:45 PM',
      dispatchDate: 'Ready for Courier Pickup',
      estimatedDelivery: '15 Nov 2026'
    },
    {
      id: 'AST-ORD-1080',
      customerName: 'Ramakrishna Murthy',
      phone: '+91 98852 11099',
      email: 'rkmurthy.vizag@gmail.com',
      address: 'Door No. 14-8-2, MVP Colony Sector 4, Visakhapatnam, Andhra Pradesh - 530017',
      items: [
        { name: 'Tirumala Tirupati Srivari Laddu Prasadam Box (Direct Sanctum)', qty: 3, price: 499, sku: 'AST-LAD-01' }
      ],
      totalAmount: 1497,
      couponApplied: 'None',
      finalPaid: 1497,
      paymentMethod: 'Cash on Delivery (COD)',
      paymentStatus: 'COLLECT_ON_DELIVERY',
      paymentTxnId: 'COD-PENDING',
      deliveryStatus: 'CONFIRMED',
      courierPartner: 'India Post (Speed Post)',
      awbNumber: 'SP-AP440192831',
      orderDate: '13 Nov 2026, 01:10 AM',
      dispatchDate: 'Pending Packing',
      estimatedDelivery: '16 Nov 2026'
    },
    {
      id: 'AST-ORD-1079',
      customerName: 'Sujatha Sundaram',
      phone: '+91 97014 55662',
      email: 'sujatha.sundaram@gmail.com',
      address: 'House 8-3-221, Sri Nagar Colony, Near Ganesh Temple, Warangal, Telangana - 506002',
      items: [
        { name: 'Srimad Bhagavad Gita Deluxe Gold-Embossed Vedic Sanskrit Edition', qty: 1, price: 699, sku: 'AST-GITA-01' }
      ],
      totalAmount: 699,
      couponApplied: 'None',
      finalPaid: 699,
      paymentMethod: 'Prepaid UPI (Google Pay)',
      paymentStatus: 'PAID',
      paymentTxnId: 'pay_K991aB332211',
      deliveryStatus: 'DELIVERED',
      courierPartner: 'BlueDart Express',
      awbNumber: 'BD-66109923IN',
      orderDate: '10 Nov 2026, 11:20 AM',
      dispatchDate: '10 Nov 2026, 05:00 PM',
      estimatedDelivery: '12 Nov 2026'
    }
  ]);

  // Initial Mock Coupons
  const [couponList, setCouponList] = useState([
    {
      id: 'c-1',
      code: 'SHIVA20',
      title: 'Maha Shivaratri Blessings 20% OFF',
      discountType: 'percentage',
      discountValue: 20,
      minOrder: 999,
      maxDiscount: 600,
      status: 'active',
      usedCount: 84,
      totalSaved: 38400,
      expiryDate: '2026-12-31'
    },
    {
      id: 'c-2',
      code: 'FIRST100',
      title: 'First Devotee Welcome ₹100 Flat OFF',
      discountType: 'flat',
      discountValue: 100,
      minOrder: 499,
      maxDiscount: 100,
      status: 'active',
      usedCount: 215,
      totalSaved: 21500,
      expiryDate: '2026-12-31'
    },
    {
      id: 'c-3',
      code: 'PRASADAM50',
      title: 'Free Delivery on Sanctum Prasadam',
      discountType: 'flat',
      discountValue: 50,
      minOrder: 399,
      maxDiscount: 50,
      status: 'active',
      usedCount: 142,
      totalSaved: 7100,
      expiryDate: '2026-11-30'
    }
  ]);

  // New Product Form State with Stock Quantities & Logistics
  const [newProdData, setNewProdData] = useState({
    name: '',
    category: 'pooja-kits',
    subtitle: '',
    price: 499,
    originalPrice: 699,
    discount: '28% OFF',
    stockQuantity: 50,
    sku: '',
    unitWeight: '250g',
    dispatchTime: 'Ships within 24 Hours',
    source: 'Vedic Sanctum Certified',
    image: '/images/temple_kashi.jpg',
    inStock: true
  });

  // New Coupon Form State
  const [newCouponData, setNewCouponData] = useState({
    code: '',
    title: '',
    discountType: 'percentage',
    discountValue: 15,
    minOrder: 500,
    maxDiscount: 500,
    expiryDate: '2026-12-31'
  });

  // Helper to adjust live stock quantity (+ or -)
  const handleUpdateStockQty = (prodId, change) => {
    if (setProducts) {
      setProducts(prev => prev.map(p => {
        if (p._id === prodId) {
          const currentQty = typeof p.stockQuantity === 'number' ? p.stockQuantity : 25;
          const newQty = Math.max(0, currentQty + change);
          return {
            ...p,
            stockQuantity: newQty,
            inStock: newQty > 0
          };
        }
        return p;
      }));
      if (showToast) {
        showToast('success', `Stock quantity updated successfully!`);
      }
    }
  };

  // Helper to update delivery status
  const handleUpdateDeliveryStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, deliveryStatus: newStatus };
      }
      return o;
    }));
    if (showToast) {
      showToast('success', `Order ${orderId} moved to ${newStatus.replace(/_/g, ' ')}!`);
    }
  };

  // Helper to add new product
  const handleAddNewProductSubmit = (e) => {
    e.preventDefault();
    const productSlug = newProdData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created = {
      _id: `prod-${Date.now()}`,
      customId: productSlug,
      name: newProdData.name,
      category: newProdData.category,
      subtitle: newProdData.subtitle || 'Sacred temple certified pooja merchandise',
      price: Number(newProdData.price),
      originalPrice: Number(newProdData.originalPrice || newProdData.price),
      discount: newProdData.discount || 'Special Offer',
      stockQuantity: Number(newProdData.stockQuantity || 50),
      sku: newProdData.sku || `AST-${Date.now().toString().slice(-4)}`,
      unitWeight: newProdData.unitWeight || '250g',
      dispatchTime: newProdData.dispatchTime || 'Ships in 24 Hours',
      source: newProdData.source || 'Vedic Certified',
      inStock: Number(newProdData.stockQuantity) > 0,
      image: newProdData.image || '/images/temple_kashi.jpg'
    };

    if (setProducts) {
      setProducts(prev => [created, ...prev]);
    }
    setIsAddProductOpen(false);
    if (showToast) {
      showToast('success', `Product "${created.name}" added with ${created.stockQuantity} stock units!`);
    }
  };

  // Helper to create new coupon
  const handleAddNewCouponSubmit = (e) => {
    e.preventDefault();
    const cleanCode = newCouponData.code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const newCoupon = {
      id: `c-${Date.now()}`,
      code: cleanCode,
      title: newCouponData.title,
      discountType: newCouponData.discountType,
      discountValue: Number(newCouponData.discountValue),
      minOrder: Number(newCouponData.minOrder),
      maxDiscount: Number(newCouponData.maxDiscount),
      status: 'active',
      usedCount: 0,
      totalSaved: 0,
      expiryDate: newCouponData.expiryDate
    };

    setCouponList(prev => [newCoupon, ...prev]);
    setIsAddCouponOpen(false);
    if (showToast) {
      showToast('success', `Devotional coupon code "${cleanCode}" created & active!`);
    }
  };

  // Filter products by category, stock status, and search query
  const filteredProducts = products.filter(p => {
    const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    const qty = typeof p.stockQuantity === 'number' ? p.stockQuantity : (p.inStock ? 25 : 0);
    let matchesStock = true;
    if (stockStatusFilter === 'in_stock') matchesStock = qty > 10;
    if (stockStatusFilter === 'low_stock') matchesStock = qty > 0 && qty <= 10;
    if (stockStatusFilter === 'out_of_stock') matchesStock = qty === 0 || !p.inStock;
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesStock && matchesSearch;
  });

  // Calculate live inventory stats
  const totalStockUnits = products.reduce((acc, p) => acc + (typeof p.stockQuantity === 'number' ? p.stockQuantity : (p.inStock ? 25 : 0)), 0);
  const lowStockCount = products.filter(p => {
    const q = typeof p.stockQuantity === 'number' ? p.stockQuantity : (p.inStock ? 25 : 0);
    return q > 0 && q <= 10;
  }).length;
  const outOfStockCount = products.filter(p => {
    const q = typeof p.stockQuantity === 'number' ? p.stockQuantity : (p.inStock ? 25 : 0);
    return q === 0 || !p.inStock;
  }).length;

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. TOP EXECUTIVE E-COMMERCE OVERVIEW BAR                                  */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#1E0F36] via-[#2F1254] to-[#160B28] rounded-3xl p-6 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Devotional E-Commerce &amp; Sacred Fulfillment Operations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-100">
              Satvik Bazaar &amp; Sacred Commerce Suite
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Professional e-commerce hub for inventory stock control, order delivery tracking (Delhivery/BlueDart/India Post), payment gateways reconciliation, and devotional promo coupons.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs shadow-md transition flex items-center space-x-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add New Product</span>
            </button>
            <button
              onClick={() => setIsAddCouponOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-purple-400/40 text-purple-200 font-bold text-xs shadow transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Tag className="w-4 h-4 text-amber-300" />
              <span>+ Create Coupon</span>
            </button>
          </div>
        </div>

        {/* 4 Core KPI Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6 pt-5 border-t border-purple-400/20">
          <div className="bg-stone-900/60 p-3.5 rounded-2xl border border-purple-400/20">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>Catalog &amp; Stock</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {products.length} Items <span className="text-xs text-amber-400 font-normal">({totalStockUnits} units)</span>
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">Live warehouse count</div>
          </div>

          <div className="bg-stone-900/60 p-3.5 rounded-2xl border border-purple-400/20">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Low / Out of Stock</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
              {lowStockCount} Low • {outOfStockCount} Out
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">Alerts below 10 units</div>
          </div>

          <div className="bg-stone-900/60 p-3.5 rounded-2xl border border-purple-400/20">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active Shipments</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-1">
              {orders.filter(o => o.deliveryStatus !== 'DELIVERED').length} In Transit
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">Via BlueDart &amp; Speed Post</div>
          </div>

          <div className="bg-stone-900/60 p-3.5 rounded-2xl border border-purple-400/20">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-purple-300" />
              <span>Payments Captured</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-200 mt-1">
              ₹{orders.filter(o => o.paymentStatus === 'PAID').reduce((sum, o) => sum + o.finalPaid, 0).toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-stone-400 mt-0.5">Razorpay &amp; PhonePe UPI</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. OPERATIONAL NAVIGATION TABS (INVENTORY, ORDERS, PAYMENTS, COUPONS)      */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200">
        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center space-x-2 cursor-pointer ${
            activeSubTab === 'inventory'
              ? 'bg-[#78131e] text-white shadow-xs'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white/80'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>📦 Inventory &amp; Stock Control ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('orders')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center space-x-2 cursor-pointer ${
            activeSubTab === 'orders'
              ? 'bg-[#78131e] text-white shadow-xs'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white/80'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>🚚 Orders &amp; Delivery Logistics ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('payments')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center space-x-2 cursor-pointer ${
            activeSubTab === 'payments'
              ? 'bg-[#78131e] text-white shadow-xs'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white/80'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>💳 Payments &amp; Gateway Reconciliation</span>
        </button>

        <button
          onClick={() => setActiveSubTab('coupons')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center space-x-2 cursor-pointer ${
            activeSubTab === 'coupons'
              ? 'bg-[#78131e] text-white shadow-xs'
              : 'text-stone-700 hover:text-stone-950 hover:bg-white/80'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>🎟️ Devotional Coupons &amp; Offers ({couponList.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: INVENTORY & STOCK MANAGEMENT WITH QUANTITY CONTROLS                */}
      {/* ========================================================================= */}
      {activeSubTab === 'inventory' && (
        <div className="space-y-4">
          
          {/* Search & Stock Filter Ribbon */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by product name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 rounded-xl border border-stone-300 text-xs w-64 focus:outline-none focus:border-amber-600 font-medium"
                />
              </div>

              {/* Stock Status Pills */}
              <div className="flex items-center gap-1.5 bg-stone-50 p-1 rounded-xl border border-stone-200 text-xs">
                <button
                  onClick={() => setStockStatusFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    stockStatusFilter === 'all' ? 'bg-[#78131e] text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  All ({products.length})
                </button>
                <button
                  onClick={() => setStockStatusFilter('in_stock')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    stockStatusFilter === 'in_stock' ? 'bg-emerald-700 text-white' : 'text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  Healthy Stock
                </button>
                <button
                  onClick={() => setStockStatusFilter('low_stock')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    stockStatusFilter === 'low_stock' ? 'bg-amber-600 text-white' : 'text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  Low Stock (&le;10)
                </button>
                <button
                  onClick={() => setStockStatusFilter('out_of_stock')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    stockStatusFilter === 'out_of_stock' ? 'bg-rose-700 text-white' : 'text-rose-700 hover:bg-rose-50'
                  }`}
                >
                  Out of Stock
                </button>
              </div>
            </div>

            <div className="text-xs font-bold text-stone-500">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>

          {/* Product Cards Grid with Real Stock Quantity Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((p) => {
              const qty = typeof p.stockQuantity === 'number' ? p.stockQuantity : (p.inStock ? 25 : 0);
              const isLowStock = qty > 0 && qty <= 10;
              const isOutOfStock = qty === 0 || !p.inStock;

              return (
                <div 
                  key={p._id || p.customId} 
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full border border-stone-200">
                        {p.category || 'Pooja Samagri'}
                      </span>
                      
                      {/* Dynamic Stock Health Badge */}
                      {isOutOfStock ? (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>OUT OF STOCK</span>
                        </span>
                      ) : isLowStock ? (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-amber-700" />
                          <span>LOW STOCK: {qty} LEFT</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>IN STOCK: {qty} UNITS</span>
                        </span>
                      )}
                    </div>

                    {/* Product Name & Subtitle */}
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 line-clamp-1">{p.name}</h4>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">{p.subtitle}</p>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg font-black text-stone-900">₹{p.price}</span>
                      {p.originalPrice && (
                        <span className="text-xs text-stone-400 line-through">₹{p.originalPrice}</span>
                      )}
                      <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">
                        {p.discount || 'Special Price'}
                      </span>
                    </div>

                    {/* Logistics & SKU Details */}
                    <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-200 text-[11px] text-stone-600 space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-stone-500">SKU Code:</span>
                        <span className="font-mono font-bold text-stone-800">{p.sku || `AST-${p._id ? p._id.slice(-5) : '001'}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-stone-500">Dispatch Window:</span>
                        <span className="font-bold text-emerald-800">{p.dispatchTime || 'Ships in 24 Hours'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-stone-500">Weight:</span>
                        <span className="font-bold text-stone-700">{p.unitWeight || '250g (Standard)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stock Quantity Stepper Controls */}
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-700">Warehouse Stock:</span>
                      
                      {/* Quantity Stepper */}
                      <div className="flex items-center space-x-1.5 bg-stone-100 p-1 rounded-xl border border-stone-300">
                        <button
                          type="button"
                          onClick={() => handleUpdateStockQty(p._id, -5)}
                          title="Reduce 5 units"
                          className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 font-black text-stone-700 flex items-center justify-center cursor-pointer transition shadow-2xs"
                        >
                          -5
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStockQty(p._id, -1)}
                          title="Reduce 1 unit"
                          className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 font-black text-stone-700 flex items-center justify-center cursor-pointer transition shadow-2xs"
                        >
                          -1
                        </button>
                        <span className="font-mono font-black text-stone-900 w-12 text-center text-sm">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateStockQty(p._id, 1)}
                          title="Add 1 unit"
                          className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 font-black text-stone-700 flex items-center justify-center cursor-pointer transition shadow-2xs"
                        >
                          +1
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStockQty(p._id, 10)}
                          title="Restock 10 units"
                          className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 font-black text-stone-700 flex items-center justify-center cursor-pointer transition shadow-2xs"
                        >
                          +10
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUpdateStockQty(p._id, qty > 0 ? -qty : 50)}
                      className={`w-full py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        qty > 0 
                          ? 'border-rose-300 text-rose-700 hover:bg-rose-50' 
                          : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      {qty > 0 ? '⚠️ Zero Out Stock' : '✓ Restock 50 Units'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ORDERS & DELIVERY FULFILLMENT DESK (HOW WE MANAGE DELIVERY)        */}
      {/* ========================================================================= */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center space-x-2">
                <Truck className="w-5 h-5 text-emerald-700" />
                <span>Devotee Orders &amp; Delivery Logistics Desk</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Manage delivery lifecycle: Order verification ➔ Satvik box packaging ➔ Courier AWB generation ➔ Doorstep delivery.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
              <span>Integrated Couriers:</span>
              <span className="text-stone-900">BlueDart • Delhivery • India Post (Speed Post)</span>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-3.5">
            {orders.map((ord) => (
              <div 
                key={ord.id} 
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-amber-400 transition space-y-4"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-black text-sm text-[#78131e] bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      {ord.id}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">{ord.orderDate}</span>
                  </div>

                  {/* Delivery Status Badge */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase">Status:</span>
                    <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                      ord.deliveryStatus === 'DELIVERED' 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : ord.deliveryStatus === 'SHIPPED'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300 animate-pulse'
                        : ord.deliveryStatus === 'PACKED'
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {ord.deliveryStatus.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* 5-Stage Delivery Pipeline Visual Stepper */}
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                    Delivery Fulfillment Progress:
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                    <div className={`p-1.5 rounded-lg border ${
                      ['CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(ord.deliveryStatus)
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-stone-200 text-stone-500 border-stone-300'
                    }`}>
                      1. Confirmed
                    </div>
                    <div className={`p-1.5 rounded-lg border ${
                      ['PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(ord.deliveryStatus)
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-stone-200 text-stone-500 border-stone-300'
                    }`}>
                      2. Packed
                    </div>
                    <div className={`p-1.5 rounded-lg border ${
                      ['SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(ord.deliveryStatus)
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-stone-200 text-stone-500 border-stone-300'
                    }`}>
                      3. Shipped
                    </div>
                    <div className={`p-1.5 rounded-lg border ${
                      ['OUT_FOR_DELIVERY', 'DELIVERED'].includes(ord.deliveryStatus)
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-stone-200 text-stone-500 border-stone-300'
                    }`}>
                      4. Out for Delivery
                    </div>
                    <div className={`p-1.5 rounded-lg border ${
                      ord.deliveryStatus === 'DELIVERED'
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-stone-200 text-stone-500 border-stone-300'
                    }`}>
                      5. Delivered ✓
                    </div>
                  </div>
                </div>

                {/* Customer & Items Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Left: Customer & Shipping Address */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-1.5">
                    <div className="font-bold text-stone-900 flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-stone-500" />
                      <span>{ord.customerName}</span>
                    </div>
                    <div className="text-stone-600 flex items-center space-x-1.5">
                      <Phone className="w-3.5 h-3.5 text-stone-500" />
                      <span>{ord.phone}</span>
                    </div>
                    <div className="text-stone-600 flex items-start space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{ord.address}</span>
                    </div>
                  </div>

                  {/* Right: Items Ordered & Financials */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-2">
                    <div className="font-bold text-stone-700 border-b pb-1">Items Ordered:</div>
                    <div className="space-y-1">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-stone-700">
                          <span>{it.name} <strong className="text-stone-900 font-mono">x{it.qty}</strong></span>
                          <span className="font-bold text-stone-900">₹{it.price * it.qty}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t flex justify-between font-bold text-stone-900">
                      <span>Total Paid ({ord.paymentMethod}):</span>
                      <span className="text-[#78131e] font-black text-sm">₹{ord.finalPaid}</span>
                    </div>
                  </div>
                </div>

                {/* Courier Logistics Bar & Delivery Control Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="font-medium text-stone-500">Courier: <strong className="text-stone-900">{ord.courierPartner}</strong></span>
                    <span className="text-stone-300">•</span>
                    <span className="font-medium text-stone-500">AWB Tracking: <strong className="font-mono text-blue-700">{ord.awbNumber}</strong></span>
                    <span className="text-stone-300">•</span>
                    <span className="font-medium text-stone-500">Est. Arrival: <strong className="text-emerald-700">{ord.estimatedDelivery}</strong></span>
                  </div>

                  {/* Fulfillment Action Buttons */}
                  <div className="flex items-center gap-2">
                    {ord.deliveryStatus === 'CONFIRMED' && (
                      <button
                        onClick={() => handleUpdateDeliveryStatus(ord.id, 'PACKED')}
                        className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        Mark as Packed in Satvik Box
                      </button>
                    )}
                    {ord.deliveryStatus === 'PACKED' && (
                      <button
                        onClick={() => handleUpdateDeliveryStatus(ord.id, 'SHIPPED')}
                        className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        Dispatch &amp; Generate AWB
                      </button>
                    )}
                    {ord.deliveryStatus === 'SHIPPED' && (
                      <button
                        onClick={() => handleUpdateDeliveryStatus(ord.id, 'DELIVERED')}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        Mark as Delivered ✓
                      </button>
                    )}
                    <button
                      onClick={() => alert(`Printing Shipping Waybill & Sacred Packing Slip for Order ${ord.id}...`)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold border border-stone-300 transition flex items-center space-x-1 cursor-pointer"
                      title="Print Shipping Label"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Label</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PAYMENTS & GATEWAY RECONCILIATION                                   */}
      {/* ========================================================================= */}
      {activeSubTab === 'payments' && (
        <div className="space-y-4">
          
          {/* Payment Gateways Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">Razorpay Gateway</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">ACTIVE</span>
              </div>
              <div className="text-lg font-black text-stone-900">UPI, NetBanking, Cards</div>
              <p className="text-[11px] text-stone-500">Auto-captured via webhook with instant SMS &amp; WhatsApp confirmation.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">PhonePe Direct UPI</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">ACTIVE</span>
              </div>
              <div className="text-lg font-black text-stone-900">0% MDR QR &amp; Intent</div>
              <p className="text-[11px] text-stone-500">Direct temple trust settlement with zero payment processing fees.</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">Cash on Delivery (COD)</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">WITH OTP</span>
              </div>
              <div className="text-lg font-black text-stone-900">Doorstep Collection</div>
              <p className="text-[11px] text-stone-500">Courier partner collects cash at delivery and remits weekly.</p>
            </div>
          </div>

          {/* Transactions Ledger Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <h4 className="font-bold text-sm text-stone-900">Live Payments Ledger &amp; Settlements</h4>
              <span className="text-xs text-stone-500">Automated Webhook Reconciliation</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 uppercase text-[10px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Txn Reference</th>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date &amp; Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-50">
                      <td className="py-3 px-4 font-mono font-bold text-stone-800">{ord.paymentTxnId}</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#78131e]">{ord.id}</td>
                      <td className="py-3 px-4 font-medium text-stone-900">{ord.customerName}</td>
                      <td className="py-3 px-4 font-black text-stone-900">₹{ord.finalPaid}</td>
                      <td className="py-3 px-4 font-medium text-stone-600">{ord.paymentMethod}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          ord.paymentStatus === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-stone-500 text-[11px]">{ord.orderDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: DEVOTIONAL COUPONS & CAMPAIGNS (HOW WE GIVE COUPONS)               */}
      {/* ========================================================================= */}
      {activeSubTab === 'coupons' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center space-x-2">
                <Tag className="w-5 h-5 text-amber-600" />
                <span>Devotional Promo Codes &amp; Festival Discount Campaigns</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Generate promo coupons for pujas, sanctum prasadam, and festival sales with automated cart validation.
              </p>
            </div>
            <button
              onClick={() => setIsAddCouponOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs rounded-xl shadow transition cursor-pointer flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Promo Code</span>
            </button>
          </div>

          {/* Coupons Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {couponList.map((cpn) => (
              <div 
                key={cpn.id} 
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 relative overflow-hidden group hover:border-amber-400 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-300 px-3 py-1 rounded-xl">
                    <Tag className="w-3.5 h-3.5 text-amber-700" />
                    <span className="font-mono font-black text-amber-900 text-sm tracking-wider">{cpn.code}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    cpn.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {cpn.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-stone-900">{cpn.title}</h4>
                  <div className="text-base font-black text-[#78131e] mt-1">
                    {cpn.discountType === 'percentage' ? `${cpn.discountValue}% OFF` : `₹${cpn.discountValue} FLAT OFF`}
                  </div>
                </div>

                <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-200 text-[11px] text-stone-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Min Cart Value:</span>
                    <strong className="text-stone-800">₹{cpn.minOrder}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Discount Cap:</span>
                    <strong className="text-stone-800">₹{cpn.maxDiscount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Times Redeemed:</span>
                    <strong className="text-emerald-700 font-mono">{cpn.usedCount} times</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Devotees Saved:</span>
                    <strong className="text-stone-900">₹{cpn.totalSaved.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCouponList(prev => prev.map(c => c.id === cpn.id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c));
                    if (showToast) showToast('success', `Coupon ${cpn.code} toggled!`);
                  }}
                  className={`w-full py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    cpn.status === 'active'
                      ? 'border-rose-300 text-rose-700 hover:bg-rose-50'
                      : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  {cpn.status === 'active' ? 'Pause Coupon' : 'Activate Coupon'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW PRODUCT WITH QUANTITY & SKU                                */}
      {/* ========================================================================= */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-lg text-stone-900 flex items-center space-x-2">
                <Package className="w-5 h-5 text-amber-600" />
                <span>Add Sacred Devotional Product</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewProductSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Copper 3D Maha Meru Sri Yantra"
                  value={newProdData.name}
                  onChange={(e) => setNewProdData({ ...newProdData, name: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Category</label>
                  <select
                    value={newProdData.category}
                    onChange={(e) => setNewProdData({ ...newProdData, category: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs bg-stone-50 font-semibold"
                  >
                    <option value="pooja-kits">🪔 Pooja Kits &amp; Homa Samagri</option>
                    <option value="rudraksha">📿 Sacred Rudraksha</option>
                    <option value="yantras-idols">✨ Energized Yantras &amp; Idols</option>
                    <option value="dhoop-samagri">🌿 Pure Camphor &amp; Dhoop</option>
                    <option value="prasadam">🍯 Sanctum Prasadam</option>
                    <option value="vedic-books">📖 Vedic Scriptures &amp; Books</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">SKU Identifier</label>
                  <input
                    type="text"
                    placeholder="e.g. AST-MERU-01"
                    value={newProdData.sku}
                    onChange={(e) => setNewProdData({ ...newProdData, sku: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Pricing & Stock Quantity (CRITICAL) */}
              <div className="grid grid-cols-3 gap-3 bg-amber-50/60 p-3 rounded-2xl border border-amber-200">
                <div>
                  <label className="font-bold text-stone-900 block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newProdData.price}
                    onChange={(e) => setNewProdData({ ...newProdData, price: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2 text-xs font-bold bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={newProdData.originalPrice}
                    onChange={(e) => setNewProdData({ ...newProdData, originalPrice: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2 text-xs bg-white"
                  />
                </div>

                <div>
                  <label className="font-black text-emerald-900 block mb-1">Initial Stock (Units) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newProdData.stockQuantity}
                    onChange={(e) => setNewProdData({ ...newProdData, stockQuantity: e.target.value })}
                    className="w-full border-2 border-emerald-500 rounded-xl p-2 text-xs font-black bg-white"
                  />
                </div>
              </div>

              {/* Delivery Logistics */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Unit Weight</label>
                  <input
                    type="text"
                    placeholder="e.g. 450g or 1 kg"
                    value={newProdData.unitWeight}
                    onChange={(e) => setNewProdData({ ...newProdData, unitWeight: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Dispatch Window</label>
                  <input
                    type="text"
                    placeholder="e.g. Ships in 24 Hours"
                    value={newProdData.dispatchTime}
                    onChange={(e) => setNewProdData({ ...newProdData, dispatchTime: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Subtitle / Short Specification</label>
                <input
                  type="text"
                  placeholder="e.g. Solid Pure Copper Sri Vidya Geometry (100% Energized)"
                  value={newProdData.subtitle}
                  onChange={(e) => setNewProdData({ ...newProdData, subtitle: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs"
                />
              </div>

              <div className="pt-3 border-t flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#78131e] hover:bg-[#5a0d16] text-white font-bold shadow-xs cursor-pointer"
                >
                  Publish to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE NEW PROMO COUPON                                            */}
      {/* ========================================================================= */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-lg text-stone-900 flex items-center space-x-2">
                <Tag className="w-5 h-5 text-amber-600" />
                <span>Create Promo Discount Coupon</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddCouponOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewCouponSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Coupon Code (Uppercase) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DIWALI50 or SHAKTHI20"
                  value={newCouponData.code}
                  onChange={(e) => setNewCouponData({ ...newCouponData, code: e.target.value.toUpperCase() })}
                  className="w-full border-2 border-amber-400 rounded-xl p-2.5 text-xs font-mono font-black text-stone-900 bg-amber-50/30"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Festival Blessings 20% Off on Yantras"
                  value={newCouponData.title}
                  onChange={(e) => setNewCouponData({ ...newCouponData, title: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Discount Type</label>
                  <select
                    value={newCouponData.discountType}
                    onChange={(e) => setNewCouponData({ ...newCouponData, discountType: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs bg-stone-50 font-bold"
                  >
                    <option value="percentage">Percentage (%) OFF</option>
                    <option value="flat">Flat Amount (₹) OFF</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newCouponData.discountValue}
                    onChange={(e) => setNewCouponData({ ...newCouponData, discountValue: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs font-black text-[#78131e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={newCouponData.minOrder}
                    onChange={(e) => setNewCouponData({ ...newCouponData, minOrder: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={newCouponData.expiryDate}
                    onChange={(e) => setNewCouponData({ ...newCouponData, expiryDate: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddCouponOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black shadow-xs cursor-pointer"
                >
                  Create &amp; Activate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
