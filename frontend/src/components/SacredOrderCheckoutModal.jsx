'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, X, ChevronRight, ChevronDown, Check, Tag, 
  MapPin, Phone, Mail, ShieldCheck, Truck, Lock, CreditCard, 
  QrCode, Building, Wallet, Banknote, Sparkles, Plus, MoreVertical,
  CheckCircle2, AlertCircle
} from 'lucide-react';

// Default seeded addresses matching the user's screenshots exactly
const DEFAULT_SAVED_ADDRESSES = {
  '8639861707': [
    {
      id: 'addr-1',
      firstName: 'Gowrav',
      lastName: 'Chandra',
      addressType: 'Home',
      flat: '14-3127/1, 12th street',
      area: 'Jayanagar Colony, Ballepalli, Ballepalli',
      landmark: '',
      city: 'KHAMMAM',
      district: 'Khammam',
      state: 'Telangana',
      pincode: '507002',
      phone: '8639861707',
      alternatePhone: '',
      email: 'vungowrav19@gmail.com'
    },
    {
      id: 'addr-2',
      firstName: 'Gowrav',
      lastName: 'Chandra',
      addressType: 'Office',
      flat: 'Abhishek boys hostel, 2nd floor',
      area: 'Unites estates block, Vittalwadi Vittalwadi.',
      landmark: '',
      city: 'Hyderabad',
      district: 'Hyderabad',
      state: 'Telangana',
      pincode: '500029',
      phone: '8639861707',
      alternatePhone: '',
      email: 'vungowrav19@gmail.com'
    },
    {
      id: 'addr-3',
      firstName: 'Gowrav',
      lastName: '-',
      addressType: 'Others',
      flat: 'Abhishrey boys hostel near Shanti Theatre',
      area: 'narayanaguda, Beside Shanti Theatre',
      landmark: '',
      city: 'Hyderabad',
      district: 'Hyderabad',
      state: 'Telangana',
      pincode: '500029',
      phone: '8639861707',
      alternatePhone: '',
      email: 'vungowrav19@gmail.com'
    },
    {
      id: 'addr-4',
      firstName: 'Gowrav',
      lastName: 'Chandra',
      addressType: 'Home',
      flat: '14-3-127/1, 12th Street',
      area: 'Jayanagar Colony, Ballepalli',
      landmark: 'Near Bangariaha Function Hall',
      city: 'Khammam',
      district: 'Khammam',
      state: 'Telangana',
      pincode: '507002',
      phone: '8639861707',
      alternatePhone: '',
      email: 'vungowrav19@gmail.com'
    }
  ]
};

// Helper for Indian Pincodes
function lookupPincode(pin) {
  const clean = pin.trim();
  if (clean.startsWith('507')) return { city: 'Khammam', state: 'Telangana' };
  if (clean.startsWith('500') || clean.startsWith('501')) return { city: 'Hyderabad', state: 'Telangana' };
  if (clean.startsWith('518')) return { city: 'Kurnool', state: 'Andhra Pradesh' };
  if (clean.startsWith('520')) return { city: 'Vijayawada', state: 'Andhra Pradesh' };
  if (clean.startsWith('522')) return { city: 'Guntur', state: 'Andhra Pradesh' };
  if (clean.startsWith('530')) return { city: 'Visakhapatnam', state: 'Andhra Pradesh' };
  if (clean.startsWith('517')) return { city: 'Tirupati', state: 'Andhra Pradesh' };
  if (clean.startsWith('560')) return { city: 'Bengaluru', state: 'Karnataka' };
  if (clean.startsWith('600')) return { city: 'Chennai', state: 'Tamil Nadu' };
  if (clean.startsWith('400')) return { city: 'Mumbai', state: 'Maharashtra' };
  if (clean.startsWith('110')) return { city: 'New Delhi', state: 'Delhi' };
  if (clean.startsWith('221')) return { city: 'Varanasi', state: 'Uttar Pradesh' };
  return null;
}

export default function SacredOrderCheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  onOrderSuccess
}) {
  // Navigation / Modal views: 'summary' | 'saved_addresses' | 'add_address'
  const [currentView, setCurrentView] = useState('summary');
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(null);

  // Devotee Phone & Login state
  const [userPhone, setUserPhone] = useState('8639861707'); // Pre-set to user phone from screenshot
  const [userEmail, setUserEmail] = useState('vungowrav19@gmail.com');
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  // Addresses for this phone number
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // New Address Form State
  const [addressForm, setAddressForm] = useState({
    pincode: '',
    firstName: '',
    lastName: '',
    phone: '8639861707',
    alternatePhone: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    email: '',
    addressType: 'Home'
  });

  // Order Summary State
  const [itemsExpanded, setItemsExpanded] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod' | 'pay_after'
  const [upiExpanded, setUpiExpanded] = useState(true);

  // Load saved addresses on phone change or open
  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('astada_role');
      const storedUser = localStorage.getItem('astada_user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed.phone) setUserPhone(parsed.phone);
          if (parsed.email) setUserEmail(parsed.email);
        } catch {}
      }

      // Check localStorage for addresses linked to phone
      const phoneKey = 'astada_addresses_' + userPhone;
      const stored = localStorage.getItem(phoneKey);
      let list = null;
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) list = parsed;
        } catch {}
      }
      if (!list) {
        list = DEFAULT_SAVED_ADDRESSES[userPhone] || DEFAULT_SAVED_ADDRESSES['8639861707'];
        localStorage.setItem(phoneKey, JSON.stringify(list));
      }
      setSavedAddresses(list);

      const savedActiveId = localStorage.getItem('astada_active_address_id');
      if (savedActiveId && list.some(a => a.id === savedActiveId)) {
        setSelectedAddressId(savedActiveId);
      } else if (list.length > 0) {
        setSelectedAddressId(list[0].id);
      }
    } catch {}
  }, [userPhone, isOpen]);

  // Selected address object
  const activeAddress = useMemo(() => {
    return savedAddresses.find(a => a.id === selectedAddressId) || savedAddresses[0] || null;
  }, [savedAddresses, selectedAddressId]);

  // Price calculations
  const originalSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.originalPrice || Math.round(item.price * 1.3)) * (item.quantity || 1), 0);
  }, [cartItems]);

  const itemsSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  }, [cartItems]);

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [cartItems]);

  // Discount from coupon
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') {
      return Math.round((itemsSubtotal * appliedCoupon.val) / 100);
    }
    return Math.min(appliedCoupon.val, itemsSubtotal);
  }, [appliedCoupon, itemsSubtotal]);

  // Online payment instant 8% savings (matching Image 1: ₹1699 -> ₹1563.08)
  const isOnlinePayment = paymentMethod === 'upi' || paymentMethod === 'card' || paymentMethod === 'netbanking';
  const onlinePaymentSavings = useMemo(() => {
    if (!isOnlinePayment) return 0;
    const base = itemsSubtotal - couponDiscount;
    return Number((base * 0.08).toFixed(2));
  }, [isOnlinePayment, itemsSubtotal, couponDiscount]);

  const finalPayable = useMemo(() => {
    const base = itemsSubtotal - couponDiscount;
    if (isOnlinePayment) {
      return Number((base - onlinePaymentSavings).toFixed(2));
    }
    return base;
  }, [itemsSubtotal, couponDiscount, isOnlinePayment, onlinePaymentSavings]);

  // Coupon apply handler
  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError('');
    if (!code) return;

    if (code === 'VEDIC10') {
      setAppliedCoupon({ code: 'VEDIC10', val: 10, type: 'percent', label: '10% Vedic Blessing' });
      setCouponInput('');
    } else if (code === 'SANKALPA20') {
      if (itemsSubtotal < 1000) {
        setCouponError('Minimum cart value of ₹1,000 required for SANKALPA20');
        return;
      }
      setAppliedCoupon({ code: 'SANKALPA20', val: 20, type: 'percent', label: '20% Sankalpa Discount' });
      setCouponInput('');
    } else if (code === 'DIVINE50') {
      setAppliedCoupon({ code: 'DIVINE50', val: 50, type: 'flat', label: 'Flat ₹50 Temple Credit' });
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try VEDIC10 or SANKALPA20');
    }
  };

  // Pincode auto-lookup
  const handlePincodeChange = (e) => {
    const pin = e.target.value.replace(/\D/g, '').slice(0, 6);
    setAddressForm(prev => {
      const next = { ...prev, pincode: pin };
      if (pin.length === 6) {
        const found = lookupPincode(pin);
        if (found) {
          next.city = found.city;
          next.state = found.state;
        }
      }
      return next;
    });
  };

  // Add address handler
  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!addressForm.pincode || !addressForm.firstName || !addressForm.flat || !addressForm.city || !addressForm.state) {
      alert('Please fill all required address fields (*)');
      return;
    }

    const newId = 'addr-' + Date.now();
    const newAddr = {
      id: newId,
      firstName: addressForm.firstName.trim(),
      lastName: addressForm.lastName.trim(),
      addressType: addressForm.addressType,
      flat: addressForm.flat.trim(),
      area: addressForm.area.trim(),
      landmark: addressForm.landmark.trim(),
      city: addressForm.city.trim(),
      district: addressForm.city.trim(),
      state: addressForm.state.trim(),
      pincode: addressForm.pincode.trim(),
      phone: addressForm.phone.trim() || userPhone,
      alternatePhone: addressForm.alternatePhone.trim(),
      email: addressForm.email.trim() || userEmail
    };

    const updatedList = [newAddr, ...savedAddresses];
    setSavedAddresses(updatedList);
    setSelectedAddressId(newId);

    // Save under phone key in localStorage
    try {
      localStorage.setItem('astada_addresses_' + userPhone, JSON.stringify(updatedList));
    } catch {}

    // Reset and return to summary
    setCurrentView('summary');
  };

  // Place order handler
  const handleConfirmOrder = () => {
    if (!activeAddress) {
      alert('Please select or add a delivery address first.');
      setCurrentView('saved_addresses');
      return;
    }

    const orderData = {
      orderNumber: 'AST-' + Math.floor(100000 + Math.random() * 900000),
      items: cartItems,
      totalAmount: itemsSubtotal,
      discountAmount: couponDiscount + onlinePaymentSavings,
      finalPayable: finalPayable,
      paymentMethod,
      customer: {
        name: `${activeAddress.firstName} ${activeAddress.lastName}`.trim(),
        phone: activeAddress.phone,
        alternatePhone: activeAddress.alternatePhone,
        email: activeAddress.email,
        address: `${activeAddress.flat}, ${activeAddress.area}${activeAddress.landmark ? ', Landmark: ' + activeAddress.landmark : ''}, ${activeAddress.city}, ${activeAddress.state} - ${activeAddress.pincode}`
      },
      createdAt: new Date().toISOString()
    };

    // Save to localStorage recent orders for /my-account
    try {
      const existing = JSON.parse(localStorage.getItem('astada_devotee_orders') || '[]');
      localStorage.setItem('astada_devotee_orders', JSON.stringify([orderData, ...existing]));
    } catch {}

    // Post to backend order API if server is up
    try {
      fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      }).catch(() => {});
    } catch {}

    setOrderPlacedSuccess(orderData);
    if (onOrderSuccess) onOrderSuccess(orderData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-stone-100 w-full max-w-lg min-h-screen sm:min-h-0 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col sm:max-h-[92vh] border border-[#ebdcc7] text-stone-800">
        
        {/* ================= HEADER BAR ================= */}
        <div className="bg-white px-4 py-3 border-b border-stone-200 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (currentView === 'add_address') {
                  setCurrentView('saved_addresses');
                } else if (currentView === 'saved_addresses') {
                  setCurrentView('summary');
                } else {
                  // Clicked back arrow on order summary -> Trigger Exit Confirmation!
                  setShowExitConfirm(true);
                }
              }}
              className="p-1.5 -ml-1 text-stone-700 hover:text-[#78131e] rounded-full hover:bg-stone-100 transition cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-lg">🕉️</span>
              <span className="font-serif font-black text-sm tracking-wider uppercase text-[#78131e]">
                ASTADASAPEETAM
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="bg-stone-900 text-amber-200 text-[11px] font-semibold py-1.5 px-4 text-center tracking-wide">
          ₹2000+ orders require partial advance • 100% Satvik Vedic Guarantee
        </div>

        {/* ================= CONTENT CONTAINER ================= */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">

          {/* VIEW 1: ORDER SUMMARY & CHECKOUT */}
          {currentView === 'summary' && !orderPlacedSuccess && (
            <>
              {/* Card 1: Order Summary */}
              <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setItemsExpanded(!itemsExpanded)}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-stone-50/60 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                    <span>Order summary</span>
                    <span className="text-stone-500 font-normal">({totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-400 line-through text-xs font-semibold">
                      ₹{originalSubtotal.toLocaleString()}
                    </span>
                    <span className="text-stone-900 font-black text-sm sm:text-base">
                      ₹{itemsSubtotal.toLocaleString()}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${itemsExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Expanded items list */}
                {itemsExpanded && (
                  <div className="px-4 pb-3.5 pt-1 border-t border-stone-100 space-y-2.5 bg-stone-50/40">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.image || '/images/poojakit.png'}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0 bg-white"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-stone-800 truncate">{item.name}</p>
                            <p className="text-stone-500 text-[11px]">Qty: {item.quantity || 1}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-stone-900">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                          {item.originalPrice && (
                            <p className="text-[10px] text-stone-400 line-through">
                              ₹{(item.originalPrice * (item.quantity || 1)).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card 2: Coupon Code (No rewards points per instructions, only coupons) */}
              <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs p-3.5 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative flex items-center">
                    <div className="absolute left-3 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[11px]">
                      %
                    </div>
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="w-full bg-[#fbfbfb] border border-stone-200 focus:border-[#78131e] rounded-xl pl-10 pr-3 py-2 text-xs font-semibold uppercase tracking-wider outline-none"
                    />
                  </div>

                  <button
                    onClick={() => handleApplyCoupon()}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-2xs shrink-0"
                  >
                    Apply
                  </button>
                </div>

                {/* Available Coupon Chips */}
                {!appliedCoupon && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span className="text-[10px] text-stone-400 font-semibold uppercase">Popular:</span>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon('VEDIC10')}
                      className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-md transition"
                    >
                      VEDIC10 (10% OFF)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyCoupon('SANKALPA20')}
                      className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-md transition"
                    >
                      SANKALPA20 (20% OFF)
                    </button>
                  </div>
                )}

                {/* Active Coupon Banner */}
                {appliedCoupon && (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{appliedCoupon.code} Applied: Saved ₹{couponDiscount.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-stone-500 hover:text-stone-900 text-[11px] underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                )}
              </div>

              {/* Card 3: Delivery Details */}
              <div 
                onClick={() => setCurrentView('saved_addresses')}
                className="bg-white rounded-2xl border border-stone-200/90 hover:border-amber-400 shadow-2xs p-4 space-y-2 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#78131e]" />
                    <span>Delivery details</span>
                  </h4>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentView('saved_addresses');
                    }}
                    className="text-xs font-bold text-[#78131e] group-hover:text-[#9e1c2a] flex items-center gap-0.5 cursor-pointer bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-200"
                  >
                    <span>Change</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {activeAddress ? (
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">
                        {activeAddress.firstName} {activeAddress.lastName}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.2 bg-stone-100 text-stone-600 rounded-md border border-stone-200 uppercase">
                        {activeAddress.addressType || 'Home'}
                      </span>
                    </div>

                    <p className="text-stone-600 leading-relaxed">
                      {activeAddress.flat}, {activeAddress.area}
                      {activeAddress.landmark ? `, ${activeAddress.landmark}` : ''}, {activeAddress.city}, {activeAddress.state}, {activeAddress.pincode}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-stone-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        <span>{activeAddress.phone}</span>
                      </span>

                      {activeAddress.alternatePhone && (
                        <span className="flex items-center gap-1 text-stone-500">
                          <span className="text-[10px] bg-stone-100 px-1 rounded">Alt</span>
                          <span>{activeAddress.alternatePhone}</span>
                        </span>
                      )}

                      {activeAddress.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <span>{activeAddress.email}</span>
                        </span>
                      )}
                    </div>

                    <div className="pt-2 flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
                      <Truck className="w-4 h-4" />
                      <span>Free shipping for you</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 text-center">
                    <p className="text-xs text-stone-500 mb-2">No delivery address selected</p>
                    <button
                      onClick={() => setCurrentView('add_address')}
                      className="px-4 py-2 bg-[#78131e] text-white text-xs font-bold rounded-xl"
                    >
                      + Add Delivery Address
                    </button>
                  </div>
                )}
              </div>

              {/* Card 4: Pay Via Options */}
              <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs p-4 space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">Pay via</h4>

                {/* Option 1: UPI payment */}
                <div className={`rounded-xl border transition-all ${
                  paymentMethod === 'upi' ? 'border-stone-900 bg-stone-50/50' : 'border-stone-200'
                }`}>
                  <div
                    onClick={() => {
                      setPaymentMethod('upi');
                      setUpiExpanded(!upiExpanded);
                    }}
                    className="p-3.5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center font-bold text-xs text-stone-800">
                        ⚡
                      </div>
                      <div>
                        <span className="font-bold text-stone-900 text-xs sm:text-sm">UPI payment</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-stone-400 line-through text-xs">₹{itemsSubtotal.toFixed(2)}</span>
                      <span className="font-black text-stone-900 text-xs sm:text-sm">
                        ₹{(itemsSubtotal - onlinePaymentSavings).toFixed(2)}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${upiExpanded && paymentMethod === 'upi' ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Savings pill */}
                  <div className="px-3.5 pb-2">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200">
                      <span>%</span>
                      <span>Save ₹{onlinePaymentSavings.toFixed(2)} by paying online</span>
                    </span>
                  </div>

                  {/* UPI QR Code & App Options */}
                  {paymentMethod === 'upi' && upiExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-stone-200 space-y-3 bg-white rounded-b-xl">
                      <p className="text-center text-xs text-stone-600 font-medium">
                        Scan the QR code &amp; pay via any UPI app
                      </p>

                      {/* Mock QR Code View */}
                      <div className="w-36 h-36 mx-auto bg-stone-900 p-2 rounded-2xl flex items-center justify-center shadow-inner relative group">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=astadasapeetam@icici&pn=SriAstadasapeetam&am=${finalPayable}&cu=INR`}
                          alt="Vedic UPI QR Code"
                          className="w-full h-full object-contain rounded-xl bg-white p-1"
                        />
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-1">
                        <span className="text-[10px] font-bold text-stone-500 uppercase">Supported:</span>
                        <span className="text-xs font-bold text-stone-700">GPay</span>
                        <span className="text-stone-300">•</span>
                        <span className="text-xs font-bold text-stone-700">PhonePe</span>
                        <span className="text-stone-300">•</span>
                        <span className="text-xs font-bold text-stone-700">Paytm</span>
                        <span className="text-stone-300">•</span>
                        <span className="text-xs font-bold text-stone-700">BHIM</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 2: Credit / Debit Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'card' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-stone-600" />
                    <div>
                      <p className="font-bold text-stone-900 text-xs sm:text-sm">Credit/Debit Card</p>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
                        Save ₹{onlinePaymentSavings.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-400 line-through text-xs">₹{itemsSubtotal.toFixed(2)}</span>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm">
                      ₹{(itemsSubtotal - onlinePaymentSavings).toFixed(2)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>

                {/* Option 3: Net Banking */}
                <div
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'netbanking' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building className="w-5 h-5 text-stone-600" />
                    <div>
                      <p className="font-bold text-stone-900 text-xs sm:text-sm">Net Banking</p>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px]">
                        Save ₹{onlinePaymentSavings.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-400 line-through text-xs">₹{itemsSubtotal.toFixed(2)}</span>
                    <span className="font-bold text-stone-900 text-xs sm:text-sm">
                      ₹{(itemsSubtotal - onlinePaymentSavings).toFixed(2)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>

                {/* Option 4: Wallets */}
                <div
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'wallet' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Wallet className="w-5 h-5 text-stone-600" />
                    <span className="font-bold text-stone-900 text-xs sm:text-sm">Wallets (Paytm / Amazon)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-stone-900 text-xs sm:text-sm">₹{itemsSubtotal.toFixed(2)}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>

                {/* Option 5: Partial COD */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'cod' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Banknote className="w-5 h-5 text-stone-600" />
                    <div>
                      <p className="font-bold text-stone-900 text-xs sm:text-sm">Partial COD</p>
                      <p className="text-[10px] text-stone-500">Pay Balance ₹{(itemsSubtotal - 169.90).toFixed(2)} at Delivery</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-stone-900 text-xs sm:text-sm">₹169.90</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Button */}
              <div className="pt-2 sticky bottom-0 bg-stone-100/90 backdrop-blur-xs pb-2">
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="w-full bg-stone-950 hover:bg-stone-900 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-between shadow-lg transition-transform active:scale-98 cursor-pointer"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-amber-200 tracking-wider uppercase font-semibold">
                      Total Payable
                    </span>
                    <span className="text-base font-black text-white">
                      ₹{finalPayable.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#78131e] px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs">
                    <Lock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Confirm Order</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </>
          )}

          {/* VIEW 2: SAVED ADDRESSES MODAL (Image 5) */}
          {currentView === 'saved_addresses' && (
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Saved Addresses</h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Including addresses related to <span className="font-bold text-stone-800">+91 {userPhone}</span> where delivery has previously delivered orders.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setAddressForm({
                      pincode: '',
                      firstName: '',
                      lastName: '',
                      phone: userPhone,
                      alternatePhone: '',
                      flat: '',
                      area: '',
                      landmark: '',
                      city: '',
                      state: '',
                      email: userEmail,
                      addressType: 'Home'
                    });
                    setCurrentView('add_address');
                  }}
                  className="text-xs font-bold text-[#78131e] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  + Add new address
                </button>
              </div>

              {/* Addresses List */}
              <div className="space-y-3 pt-2">
                {savedAddresses.map((addr) => {
                  const isSelected = addr.id === selectedAddressId;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddressId(addr.id);
                        try { localStorage.setItem('astada_active_address_id', addr.id); } catch {}
                        setCurrentView('summary');
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-stone-900 bg-amber-50/40 shadow-xs ring-1 ring-stone-900' 
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="saved_addr"
                            checked={isSelected}
                            onChange={() => {
                              setSelectedAddressId(addr.id);
                              try { localStorage.setItem('astada_active_address_id', addr.id); } catch {}
                              setCurrentView('summary');
                            }}
                            className="mt-1 accent-stone-900 w-4 h-4 cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-900 text-sm">
                                {addr.firstName} {addr.lastName}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.2 bg-stone-100 text-stone-600 rounded-md border border-stone-200 uppercase">
                                {addr.addressType || 'Home'}
                              </span>
                            </div>

                            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                              {addr.flat}, {addr.area}
                              {addr.landmark ? `, Landmark: ${addr.landmark}` : ''}, {addr.city}, {addr.district || addr.city}, {addr.state}, {addr.pincode}
                            </p>

                            <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-500 flex-wrap">
                              <span>📞 {addr.phone}</span>
                              {addr.alternatePhone && (
                                <span className="text-stone-500">
                                  <span className="text-[10px] bg-stone-100 px-1 rounded mr-1">Alt</span>
                                  {addr.alternatePhone}
                                </span>
                              )}
                              {addr.email && <span>✉️ {addr.email}</span>}
                            </div>
                          </div>
                        </div>

                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this saved address?')) {
                              const filtered = savedAddresses.filter(a => a.id !== addr.id);
                              setSavedAddresses(filtered);
                              if (selectedAddressId === addr.id) {
                                setSelectedAddressId(filtered[0]?.id || null);
                              }
                              localStorage.setItem('astada_addresses_' + userPhone, JSON.stringify(filtered));
                            }
                          }}
                          className="text-stone-400 hover:text-rose-600 p-1"
                          title="Delete address"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentView('summary')}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl text-xs transition cursor-pointer"
                >
                  Deliver to Selected Address
                </button>
              </div>
            </div>
          )}

          {/* VIEW 3: ADD NEW ADDRESS MODAL (Image 4) */}
          {currentView === 'add_address' && (
            <form onSubmit={handleSaveNewAddress} className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                <h3 className="font-bold text-stone-900 text-base">Add New Address</h3>
                <span className="text-xs text-stone-400">* Required</span>
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  value={addressForm.pincode}
                  onChange={handlePincodeChange}
                  placeholder="e.g. 507002"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                />
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">First name *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.firstName}
                    onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                    placeholder="e.g. Gowrav"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Last name *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.lastName}
                    onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                    placeholder="e.g. Chandra"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                  />
                </div>
              </div>

              {/* Phone & Alternate Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    placeholder="10-digit mobile"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Alternate Phone no <span className="font-normal text-stone-400">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={addressForm.alternatePhone}
                    onChange={(e) => setAddressForm({ ...addressForm, alternatePhone: e.target.value })}
                    placeholder="e.g. 9848012345"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                  />
                </div>
              </div>

              {/* Flat, house number */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Flat, house number, floor, building *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.flat}
                  onChange={(e) => setAddressForm({ ...addressForm, flat: e.target.value })}
                  placeholder="e.g. 14-3127/1, 12th street"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                />
              </div>

              {/* Area, street */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Area, street, sector, village *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.area}
                  onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                  placeholder="e.g. Jayanagar Colony, Ballepalli"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  + Landmark area <span className="font-normal text-stone-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={addressForm.landmark}
                  onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                  placeholder="e.g. Near Bangariaha Function Hall"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    placeholder="e.g. Khammam"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    placeholder="e.g. Telangana"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                  />
                </div>
              </div>

              {/* E-mail (optional) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  E-mail <span className="font-normal text-stone-400">(optional)</span>
                </label>
                <input
                  type="email"
                  value={addressForm.email}
                  onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                  placeholder="e.g. vungowrav19@gmail.com"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#78131e] outline-none"
                />
                <p className="text-[11px] text-stone-400 mt-1">Order delivery details will be sent here</p>
              </div>

              {/* Address Type */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">Address type</label>
                <div className="flex items-center gap-4 text-xs font-bold text-stone-800">
                  {['Home', 'Office', 'Others'].map((type) => (
                    <label key={type} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="addr_type"
                        checked={addressForm.addressType === type}
                        onChange={() => setAddressForm({ ...addressForm, addressType: type })}
                        className="accent-stone-900"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentView('saved_addresses')}
                  className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-stone-950 hover:bg-stone-900 text-white font-bold py-3 px-4 rounded-xl text-xs transition cursor-pointer shadow-md"
                >
                  Add address
                </button>
              </div>
            </form>
          )}

          {/* VIEW 4: ORDER CONFIRMED SUCCESS */}
          {orderPlacedSuccess && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 text-center space-y-4 shadow-sm animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-serif font-black text-xl text-stone-900">
                  Dhanya Vadamulu! Order Confirmed
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Your sacred order <span className="font-mono font-bold text-stone-900">{orderPlacedSuccess.orderNumber}</span> has been received with great reverence.
                </p>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Devotee:</span>
                  <span className="font-bold text-stone-900">{orderPlacedSuccess.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Phone:</span>
                  <span className="font-bold text-stone-900">+91 {orderPlacedSuccess.customer.phone}</span>
                </div>
                {orderPlacedSuccess.customer.alternatePhone && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Alternate Phone:</span>
                    <span className="font-bold text-stone-900">+91 {orderPlacedSuccess.customer.alternatePhone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500">Delivery Address:</span>
                  <span className="font-medium text-stone-800 truncate max-w-[220px]">{orderPlacedSuccess.customer.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Payment:</span>
                  <span className="font-bold text-emerald-700 uppercase">
                    {orderPlacedSuccess.paymentMethod} • ₹{orderPlacedSuccess.finalPayable}
                  </span>
                </div>
                <div className="flex justify-between border-t border-amber-200/80 pt-1.5">
                  <span className="text-stone-500">Sanctification:</span>
                  <span className="font-bold text-stone-800">Complimentary Holy Gangajal &amp; Kumkum</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOrderPlacedSuccess(null);
                  onClose();
                }}
                className="w-full bg-[#78131e] text-white font-bold py-3 rounded-xl text-xs hover:bg-[#600e17] transition cursor-pointer"
              >
                Continue Exploring Marketplace
              </button>
            </div>
          )}

        </div>

        {/* ================= BOTTOM BAR WITH SECURITY BADGE ================= */}
        <div className="bg-white p-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Satvik Vedic Sanctification Guarantee</span>
          </div>
          <div className="text-[10px] text-stone-400 font-mono">
            Powered By Shiprocket &amp; Vedic Logistics
          </div>
        </div>

      </div>

      {/* ================= EXIT CONFIRMATION BOTTOM SHEET / MODAL ================= */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center animate-in zoom-in-95 border border-stone-200 relative">
            <button
              onClick={() => setShowExitConfirm(false)}
              className="absolute right-4 top-4 p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base sm:text-lg font-black text-stone-900 tracking-tight">
              Are You Sure You Want To Exit?
            </h3>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirm(false);
                  onClose();
                }}
                className="w-full bg-white hover:bg-stone-50 text-stone-900 font-bold py-3 px-4 rounded-xl border border-stone-300 text-xs transition cursor-pointer shadow-2xs"
              >
                Yes, exit checkout
              </button>

              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="w-full bg-stone-950 hover:bg-stone-900 text-white font-bold py-3 px-4 rounded-xl text-xs transition cursor-pointer shadow-md"
              >
                No, continue checkout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
