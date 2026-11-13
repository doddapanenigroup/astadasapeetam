'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBag, ShoppingCart, Search, Star, CheckCircle2, 
  ShieldCheck, Truck, Sparkles, Plus, Minus, Trash2, X, 
  ArrowRight, Lock, Gift, Eye, Heart, Check, Phone, MapPin
} from 'lucide-react';
import { marketplaceCategories, marketplaceProducts } from '../../data/marketplaceData';
import SacredOrderCheckoutModal from '../../components/SacredOrderCheckoutModal';

export default function MarketplacePage() {
  // Live dynamic products synced with Digital Marketing backend
  const [allProducts, setAllProducts] = useState(marketplaceProducts);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/products')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          // Merge dynamic products with fallback attributes if needed
          setAllProducts(data.data.map(p => ({
            id: p.customId || p._id,
            name: p.name,
            category: p.category,
            subtitle: p.subtitle,
            rating: p.rating || 4.9,
            reviewsCount: p.reviewsCount || 100,
            price: p.price,
            originalPrice: p.originalPrice || Math.round(p.price * 1.3),
            discount: p.discount || 'Special Offer',
            image: p.image || '/images/poojakit.png',
            certified: p.certified || '100% Satvik & Energized',
            inStock: p.inStock,
            fastDelivery: p.fastDelivery,
            description: p.description,
            features: p.features || []
          })));
        }
      })
      .catch(() => {
        // Graceful fallback to local marketplace data
      });
  }, []);

  // State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Read URL query params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        const q = params.get('search');
        if (q) setSearchQuery(q);
        const cat = params.get('category');
        if (cat) setSelectedCategory(cat);
      } catch {}
    }
  }, []);
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  
  // Cart state - loaded from localStorage, defaulting to empty
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('astada_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setCartItems(parsed);
      }
    } catch {}
  }, []);

  // Sync cart to localStorage whenever it changes & notify header
  useEffect(() => {
    try {
      localStorage.setItem('astada_cart', JSON.stringify(cartItems));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch {}
  }, [cartItems]);

  const [cartOpen, setCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    paymentMethod: 'upi',
    blessingNotes: true
  });

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured order
    });
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  // Cart actions
  const addToCart = (product, openDrawer = true) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    if (openDrawer) setCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Pricing calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const discountAmount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 50;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'DIVINE10' || couponCode.trim().toUpperCase() === 'ASTADASA') {
      setCouponApplied(true);
    } else {
      alert('Invalid code. Try "DIVINE10" for 10% instant spiritual discount!');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill out your delivery details to ensure sacred delivery.');
      return;
    }
    setOrderConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-800 pb-20">
      
      {/* 1. Divine Marketplace Top Banner */}
      <section 
        className="w-full text-white py-9 px-4 border-b border-amber-900/40 relative overflow-hidden"
        style={{
          backgroundColor: '#6b111b',
          backgroundImage: 'linear-gradient(135deg, #78131e 0%, #540b13 100%)'
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-amber-300/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-[98.5%] max-w-[1920px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>100% Vedic Lab Tested & Temple Energized</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-white mb-2">
              Astadasapeetam Divine Marketplace
            </h1>
            <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
              Order authentic, energized Pooja kits, certified genuine Rudrakshas, sacred brass idols, pure dhoop & holy temple prasadams delivered with holy Gangajal right to your doorstep.
            </p>
          </div>

          {/* Quick Cart Status Button */}
          <button
            suppressHydrationWarning
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-5 py-3 rounded-xl shadow-lg border border-amber-300/60 transition-all transform hover:scale-105 shrink-0 cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-stone-950" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#78131e] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </div>
            <div className="text-left">
              <div className="text-xs uppercase tracking-wider font-extrabold text-stone-800">My Sacred Cart</div>
              <div className="text-sm font-black">₹{finalTotal.toLocaleString()} ({totalItemsCount} items)</div>
            </div>
          </button>
        </div>
      </section>

      {/* 2. Trust Assurance Badges Bar */}
      <section className="bg-amber-50 border-b border-amber-200/80 py-3 px-4">
        <div className="w-[98.5%] max-w-[1920px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-stone-800">
            <Truck className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold block">Free Express Shipping</span>
              <span className="text-[11px] text-stone-500">On all orders above ₹499</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-stone-800">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <span className="font-bold block">100% Lab Certified</span>
              <span className="text-[11px] text-stone-500">Genuine Rudrakshas with Card</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-stone-800">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold block">Temple Energized</span>
              <span className="text-[11px] text-stone-500">Consecrated with Vedic Mantras</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-stone-800">
            <Gift className="w-5 h-5 text-[#78131e] shrink-0" />
            <div>
              <span className="font-bold block">Sacred Gift Inside</span>
              <span className="text-[11px] text-stone-500">Holy Gangajal & Kumkum Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Catalog Section */}
      <main className="w-[98.5%] max-w-[1920px] mx-auto px-2 sm:px-4 py-8">
        
        {/* Controls: Search, Categories & Sorting */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#ebdcc7] mb-8 space-y-4">
          
          {/* Top row: Search and Sort */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                suppressHydrationWarning
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pooja kit, rudraksha, brass diya, dhoop..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#78131e] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button 
                  suppressHydrationWarning
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2 self-end md:self-auto text-xs sm:text-sm">
              <span className="text-stone-500 font-medium">Sort By:</span>
              <select
                suppressHydrationWarning
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-stone-700 focus:outline-hidden focus:border-[#78131e]"
              >
                <option value="featured">Most Auspicious (Featured)</option>
                <option value="rating">Highest Rated (★ 4.8+)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Bottom row: Clean Category Pills without scrolling */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
            {marketplaceCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? marketplaceProducts.length 
                : marketplaceProducts.filter(p => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  suppressHydrationWarning
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#78131e] text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-900 border border-stone-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-[#ebdcc7] shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Product Image Container */}
                <div className="relative h-48 w-full bg-amber-50/40 flex items-center justify-center p-3 overflow-hidden border-b border-stone-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={320}
                    height={220}
                    className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Top Tags */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-[#78131e] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                      {product.discount}
                    </span>
                    {product.fastDelivery && (
                      <span className="bg-amber-500 text-stone-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
                        ⚡ Fast Delivery
                      </span>
                    )}
                  </div>

                  {/* Quick view button */}
                  <button
                    suppressHydrationWarning
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-xs text-stone-700 hover:text-[#78131e] transition-colors cursor-pointer"
                    title="Quick View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Certification Ribbon at bottom of image */}
                  <div className="absolute bottom-1.5 left-2 right-2 bg-stone-900/80 backdrop-blur-xs text-amber-200 text-[10px] font-medium py-0.5 px-2 rounded flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{product.certified}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-stone-800 ml-1">{product.rating}</span>
                    </div>
                    <span>•</span>
                    <span className="text-[11px]">({product.reviewsCount} verified)</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-stone-900 text-sm line-clamp-2 font-serif group-hover:text-[#78131e] transition-colors">
                    {product.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="p-4 pt-0 space-y-3">
                <div className="flex items-baseline gap-2 pt-2 border-t border-stone-100">
                  <span className="text-lg font-black text-stone-900">₹{product.price.toLocaleString()}</span>
                  <span className="text-xs text-stone-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-xs font-bold text-emerald-700 ml-auto">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    suppressHydrationWarning
                    onClick={() => addToCart(product, true)}
                    className="flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-[#78131e] border border-amber-300 font-bold text-xs py-2 px-3 rounded-xl transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    suppressHydrationWarning
                    onClick={() => {
                      addToCart(product, false);
                      setCheckoutModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-1 bg-[#78131e] hover:bg-[#600e17] text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-700">No divine items matched your search</h3>
            <p className="text-stone-500 text-sm mt-1">Try searching for &quot;pooja kit&quot;, &quot;rudraksha&quot;, or select &quot;All Products&quot;.</p>
            <button
              suppressHydrationWarning
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 bg-[#78131e] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* 4. Slide-Over Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
          <div 
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
          >
            {/* Header */}
            <div className="p-4 bg-[#78131e] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-300" />
                <h2 className="font-bold font-serif text-base">Your Sacred Basket</h2>
                <span className="text-xs bg-amber-400 text-stone-950 font-black px-2 py-0.5 rounded-full">
                  {totalItemsCount}
                </span>
              </div>
              <button
                suppressHydrationWarning
                onClick={() => setCartOpen(false)}
                className="text-stone-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                  <p className="font-medium">Your basket is empty</p>
                  <p className="text-xs text-stone-400 mt-1">Add blessed pooja kits, rudrakshas, or idols to begin.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex gap-3 bg-stone-50 border border-stone-200 p-3 rounded-xl items-center"
                  >
                    <div className="w-16 h-16 bg-white rounded-lg p-1 border border-stone-200 shrink-0 flex items-center justify-center">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={60} 
                        height={60} 
                        className="max-h-14 w-auto object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate font-serif">{item.name}</h4>
                      <p className="text-[11px] text-stone-500">₹{item.price.toLocaleString()} each</p>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-stone-300 rounded-md bg-white">
                          <button
                            suppressHydrationWarning
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            suppressHydrationWarning
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-stone-100 text-stone-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          suppressHydrationWarning
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-700 ml-auto p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Promo code bar */}
              {cartItems.length > 0 && (
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      suppressHydrationWarning
                      type="text"
                      placeholder="Coupon: DIVINE10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs uppercase font-mono font-bold focus:outline-hidden focus:border-[#78131e]"
                    />
                    <button
                      suppressHydrationWarning
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      {couponApplied ? 'Applied ✓' : 'Apply'}
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                      🎉 DIVINE10 applied! 10% divine discount credited.
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-2.5">
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-stone-800">₹{subtotal.toLocaleString()}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                    <span>Spiritual Discount (10%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Express Vedic Delivery</span>
                  <span>{shipping === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-xs text-amber-800 font-medium">
                  <span>Temple Sanctification & Gangajal</span>
                  <span className="font-bold">Complimentary</span>
                </div>
                <div className="border-t border-stone-300 pt-2 flex justify-between text-base font-black text-stone-900">
                  <span>Total Amount</span>
                  <span className="text-[#78131e]">₹{finalTotal.toLocaleString()}</span>
                </div>

                <button
                  suppressHydrationWarning
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutModalOpen(true);
                  }}
                  className="w-full bg-[#78131e] hover:bg-[#600e17] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer mt-2"
                >
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>Proceed to Sacred Checkout (₹{finalTotal.toLocaleString()})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Sacred Order Checkout Modal (E-commerce Order Summary & Delivery Flow) */}
      <SacredOrderCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={(orderData) => {
          setCartItems([]);
        }}
      />

      {/* 6. Product Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#ebdcc7] animate-in fade-in zoom-in-95 duration-200 relative">
            
            <button
              suppressHydrationWarning
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white text-stone-700 p-1.5 rounded-full z-10 shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Image */}
              <div className="bg-amber-50/50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-stone-200">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  width={300}
                  height={240}
                  className="max-h-56 w-auto object-contain"
                />
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-amber-300 text-[11px] font-bold text-amber-900 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{quickViewProduct.certified}</span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-3.5 text-xs sm:text-sm">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-stone-800">{quickViewProduct.rating}</span>
                    <span className="text-stone-400">({quickViewProduct.reviewsCount} reviews)</span>
                  </div>
                  <h3 className="font-serif font-black text-lg text-stone-900 leading-snug">
                    {quickViewProduct.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">{quickViewProduct.subtitle}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#78131e]">₹{quickViewProduct.price.toLocaleString()}</span>
                  <span className="text-sm text-stone-400 line-through">₹{quickViewProduct.originalPrice.toLocaleString()}</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {quickViewProduct.discount}
                  </span>
                </div>

                <p className="text-stone-600 text-xs leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Features */}
                {quickViewProduct.features && (
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="font-bold text-stone-800 text-xs block">Key Sacred Features:</span>
                    {quickViewProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Buttons */}
                <div className="pt-3 flex gap-2">
                  <button
                    suppressHydrationWarning
                    onClick={() => {
                      addToCart(quickViewProduct, true);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 bg-amber-50 hover:bg-amber-100 text-[#78131e] border border-amber-300 font-bold text-xs py-2.5 rounded-xl cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    suppressHydrationWarning
                    onClick={() => {
                      addToCart(quickViewProduct, false);
                      setQuickViewProduct(null);
                      setCheckoutModalOpen(true);
                    }}
                    className="flex-1 bg-[#78131e] hover:bg-[#600e17] text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
