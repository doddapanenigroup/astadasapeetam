'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { headerData } from '../data/mockData';
import LoginModal from './LoginModal';
import GlobalSmartSearch from './GlobalSmartSearch';
import { 
  DEFAULT_BRANDING, 
  getStoredBranding, 
  applyFaviconToDocument 
} from '../data/brandingData';
import { 
  Home, Flame, Sparkles, Calendar, Compass, Landmark, 
  BookOpen, Clock, Video, ShoppingBag, ChevronDown, Search, 
  ShoppingCart, Menu, X, Bus, Play, User, Package, MapPin, LogOut, FileText 
} from 'lucide-react';

const iconMap = {
  Home, Flame, Sparkles, Calendar, Compass, Landmark,
  BookOpen, Clock, Video, ShoppingBag, Bus
};

export default function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  const [branding, setBranding] = useState(DEFAULT_BRANDING);

  React.useEffect(() => {
    try {
      const role = localStorage.getItem('astada_role');
      if (role) setUserRole(role);

      const syncUserData = () => {
        try {
          const storedUser = localStorage.getItem('astada_user');
          if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
          } else if (role) {
            setCurrentUser({ name: 'Devotee', role });
          }
        } catch {}
      };
      syncUserData();
      window.addEventListener('devoteeUpdated', syncUserData);

      const current = getStoredBranding();
      setBranding(current);
      applyFaviconToDocument(current);

      const handleUpdate = () => {
        const updated = getStoredBranding();
        setBranding(updated);
        applyFaviconToDocument(updated);
      };
      window.addEventListener('brandingUpdated', handleUpdate);

      // Cart count sync
      const updateCartCount = () => {
        try {
          const raw = localStorage.getItem('astada_cart');
          if (raw) {
            const items = JSON.parse(raw);
            const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
            setCartCount(count);
          } else {
            setCartCount(0);
          }
        } catch {
          setCartCount(0);
        }
      };
      updateCartCount();
      window.addEventListener('cartUpdated', updateCartCount);
      window.addEventListener('storage', updateCartCount);

      const handleKeyDown = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          setSearchOpen(prev => !prev);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('brandingUpdated', handleUpdate);
        window.removeEventListener('devoteeUpdated', syncUserData);
        window.removeEventListener('cartUpdated', updateCartCount);
        window.removeEventListener('storage', updateCartCount);
        window.removeEventListener('keydown', handleKeyDown);
      };
    } catch {}
  }, []);

  const handleProfileClick = () => {
    if (!userRole) {
      setLoginModalOpen(true);
      return;
    }

    // Role redirection: when staff/admin/astrologer clicks profile, redirect directly to their frontend page
    if (userRole === 'admin' || userRole === 'editor' || userRole === 'operations_manager') {
      window.location.href = '/admin';
      return;
    }
    if (userRole === 'astrologer') {
      window.location.href = '/astrologer';
      return;
    }
    if (userRole === 'digital_marketing') {
      window.location.href = '/marketing';
      return;
    }

    // Devotees toggle dropdown menu (order history, shipping address, account details, logout)
    setUserMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-white border-b border-[#ebdcc7] sticky top-0 z-40 shadow-xs">
      <div className="w-[98.5%] max-w-[1920px] mx-auto py-2.5 px-2 sm:px-3 flex items-center justify-between gap-2 xl:gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          {branding.logoType === 'image' && branding.logoUrl ? (
            <img
              src={branding.logoUrl}
              alt={branding.siteTitle || 'Astadasapeetam.com'}
              style={{ height: `${branding.logoHeight || 44}px` }}
              className="object-contain max-w-[240px] drop-shadow-xs"
            />
          ) : (
            <>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#78131e] to-[#9e1c2a] flex items-center justify-center text-amber-300 font-serif font-black text-xl sm:text-2xl shadow-sm border border-amber-300/40">
                {branding.logoEmoji || '🕉️'}
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg xl:text-xl tracking-tight text-[#78131e] group-hover:text-[#9e1c2a] transition-colors uppercase font-serif whitespace-nowrap">
                  {branding.siteTitle || 'Astadasapeetam.com'}
                </span>
                <span className="text-[9.5px] sm:text-[10px] tracking-widest text-amber-800 font-medium uppercase -mt-0.5 whitespace-nowrap">
                  {branding.siteTagline || 'Devotion • Faith • Dharma'}
                </span>
              </div>
            </>
          )}
        </Link>

        {/* Desktop Navigation Links (Cleanly structured & balanced) */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-xs 2xl:text-sm font-medium text-stone-700 whitespace-nowrap min-w-0">
          {[
            { label: 'Home', href: '/', icon: 'Home' },
            { label: 'Sacred Peethas', href: '/sacred-temples', icon: 'Sparkles', badge: '18' },
            { label: 'Temples', href: '/temples', icon: 'Landmark' },
            { label: 'Panchangam', href: '/panchangam', icon: 'Calendar' },
            { label: 'Festivals', href: '/festivals', icon: 'Flame' },
            { label: 'Astrology', href: '/astrology', icon: 'Compass' },
            { label: 'Teertha Yatralu', href: '/yatralu', icon: 'Bus' },
            { label: 'Marketplace', href: '/marketplace', icon: 'ShoppingBag' },
          ].map((item, idx) => {
            const Icon = iconMap[item.icon] || Flame;
            const isActive = item.href === '/' 
              ? pathname === '/' 
              : item.href !== '#' && pathname.startsWith(item.href);

            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center gap-1 transition-colors py-1 px-1.5 rounded-lg ${
                  isActive 
                    ? 'text-[#78131e] font-bold bg-amber-50/80 border-b-2 border-[#78131e]' 
                    : 'hover:text-[#78131e] hover:bg-stone-50'
                }`}
              >
                <Icon className={`hidden 2xl:inline-block w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#78131e]' : 'text-amber-700/80'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-black bg-amber-100 text-[#78131e] px-1 py-0.2 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
          
          {/* More dropdown with secondary links */}
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#78131e] px-2 py-1 rounded-lg hover:bg-stone-50 shrink-0">
            <span>More</span>
            <ChevronDown className="w-3.5 h-3.5 shrink-0" />

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full pt-1.5 hidden group-hover:block z-50">
              <div className="bg-white rounded-2xl shadow-xl border border-[#ebdcc7] py-2 w-64 text-stone-800 text-xs space-y-0.5 max-h-[80vh] overflow-y-auto">
                <Link href="/festival-calendar" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-bold text-amber-950 bg-amber-50/40">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>Festival Calendar (క్యాలెండర్)</span>
                </Link>

                <Link href="/articles" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>All Articles (వ్యాసాలు)</span>
                </Link>

                <Link href="/videos" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Play className="w-3.5 h-3.5 text-amber-700" />
                  <span>Devotional Videos (వీడియోలు)</span>
                </Link>

                <div className="my-1 border-t border-stone-100"></div>

                <Link href="/gods" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Gods &amp; Avatars</span>
                </Link>

                <Link href="/muhurtham" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Shubh Muhurtham</span>
                </Link>

                <Link href="/horoscope" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  <span>Daily Horoscope (12 Rasis)</span>
                </Link>

                <Link href="/vrathalu-poojas" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Flame className="w-3.5 h-3.5 text-amber-700" />
                  <span>Vrathalu &amp; Pooja Vidhi</span>
                </Link>

                <Link href="/mantras" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Sacred Mantras &amp; 108 Japa</span>
                </Link>

                <Link href="/stotras" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Divine Stotras &amp; Kavachas</span>
                </Link>

                <Link href="/yantras" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Sacred Yantras &amp; Meru</span>
                </Link>

                <Link href="/spirituality" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Landmark className="w-3.5 h-3.5 text-amber-700" />
                  <span>Spirituality &amp; Dharma</span>
                </Link>

                <Link href="/remedies" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  <span>Remedies &amp; Dosha Nivarana</span>
                </Link>

                <Link href="/bhajans" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Video className="w-3.5 h-3.5 text-amber-700" />
                  <span>Divine Bhajans &amp; Kirtanas</span>
                </Link>

                <Link href="/slokas" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Flame className="w-3.5 h-3.5 text-amber-700" />
                  <span>Daily Slokas &amp; Stotrams</span>
                </Link>

                <Link href="/videos" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Video className="w-3.5 h-3.5 text-amber-700" />
                  <span>Devotional Videos</span>
                </Link>

                <Link href="/stories" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Devotional Stories</span>
                </Link>

                <div className="h-px bg-[#ebdcc7] my-1.5" />

                <Link href="/epaper" className="flex items-center gap-2.5 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Daily Devotional E-Paper</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Action Controls: Search, Cart, Login */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto pl-2 bg-white z-10">
          {/* Desktop Global Smart Search Trigger Bar */}
          <button 
            suppressHydrationWarning
            onClick={() => setSearchOpen(true)} 
            className="hidden lg:flex items-center gap-2 bg-[#fcf9f4] hover:bg-[#f6efe4] border border-[#e4d4be] hover:border-amber-400 text-stone-500 hover:text-stone-800 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer shadow-2xs group"
            aria-label="Global Smart Search"
          >
            <Search className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#78131e] transition-colors" />
            <span className="text-stone-500 group-hover:text-stone-700 font-medium whitespace-nowrap">
              Search temples, slokas, festivals, pooja kits...
            </span>
            <kbd className="inline-flex items-center bg-white border border-stone-200 text-[10px] text-stone-400 px-1.5 py-0.5 rounded font-mono shadow-2xs ml-1 font-semibold">
              ⌘K
            </kbd>
          </button>

          {/* Mobile/Tablet Search Button */}
          <button 
            suppressHydrationWarning
            onClick={() => setSearchOpen(true)} 
            className="lg:hidden p-1.5 sm:p-2 text-stone-600 hover:text-[#78131e] transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <Link 
            suppressHydrationWarning
            href="/marketplace" 
            className="p-1.5 sm:p-2 relative text-stone-600 hover:text-[#78131e] transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
            aria-label="Cart & Marketplace"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-amber-500 text-stone-900 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in-75">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Clean Minimalist User Profile Icon (Image 3) */}
          <div className="relative">
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleProfileClick}
              className="p-1.5 sm:p-2 text-stone-700 hover:text-[#78131e] hover:bg-stone-100 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              title={
                !userRole 
                  ? "Login / Register" 
                  : ['admin', 'editor', 'operations_manager'].includes(userRole)
                  ? "Admin Console"
                  : userRole === 'astrologer'
                  ? "Astrologer Workspace"
                  : userRole === 'digital_marketing'
                  ? "Marketing Studio"
                  : "Devotee Profile & Orders"
              }
              aria-label="User Account"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Devotee Dropdown Menu (Only for devotees) */}
            {userMenuOpen && (userRole === 'devotee' || userRole === 'user' || (!['admin', 'astrologer', 'digital_marketing', 'editor', 'operations_manager'].includes(userRole))) && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setUserMenuOpen(false)} 
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#ebdcc7] py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2.5 border-b border-stone-100">
                    <p className="text-xs font-black text-stone-900 truncate">
                      {currentUser?.name || 'Devotee Account'}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">
                      {currentUser?.phone || currentUser?.email || 'devotee@astadasapeetam.com'}
                    </p>
                  </div>

                  <div className="py-1 text-xs text-stone-700">
                    <Link
                      href="/my-account?tab=orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-amber-50 hover:text-[#78131e] font-semibold transition"
                    >
                      <Package className="w-4 h-4 text-[#78131e]" />
                      <span>Order History</span>
                    </Link>

                    <Link
                      href="/my-account?tab=addresses"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-amber-50 hover:text-[#78131e] font-semibold transition"
                    >
                      <MapPin className="w-4 h-4 text-amber-700" />
                      <span>Shipping Address</span>
                    </Link>

                    <Link
                      href="/my-account?tab=account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-amber-50 hover:text-[#78131e] font-semibold transition"
                    >
                      <User className="w-4 h-4 text-stone-600" />
                      <span>Account Details</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('astada_token');
                        localStorage.removeItem('astada_role');
                        localStorage.removeItem('astada_user');
                        setUserRole(null);
                        setCurrentUser(null);
                        setUserMenuOpen(false);
                        window.location.href = '/';
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-semibold text-left cursor-pointer transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button 
            suppressHydrationWarning
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 text-stone-700 hover:text-[#78131e] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Global Smart Search Modal */}
      <GlobalSmartSearch 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#ebdcc7] px-4 py-4 space-y-2.5 shadow-lg">
          {/* Mobile Global Search Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setSearchOpen(true);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200/90 rounded-xl text-stone-700 text-xs font-semibold transition"
          >
            <Search className="w-4 h-4 text-[#78131e]" />
            <span>Search temples, slokas, festivals, pooja kits...</span>
          </button>
          {headerData.navItems.map((item, idx) => {
            const isActive = item.href === '/' 
              ? pathname === '/' 
              : item.href !== '#' && pathname.startsWith(item.href);

            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-amber-100 text-[#78131e] font-bold' 
                    : 'text-stone-700 hover:bg-amber-50 hover:text-[#78131e]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-stone-100 space-y-2">
            {userRole ? (
              <>
                {['admin', 'editor', 'operations_manager'].includes(userRole) && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-[#78131e] hover:bg-[#600e17] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition"
                  >
                    <span>👑 Open Admin Console</span>
                  </Link>
                )}

                {userRole === 'astrologer' && (
                  <Link
                    href="/astrologer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition"
                  >
                    <span>🔮 Open Astrologer Workspace</span>
                  </Link>
                )}

                {userRole === 'digital_marketing' && (
                  <Link
                    href="/marketing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition"
                  >
                    <span>📢 Open Marketing Studio</span>
                  </Link>
                )}

                {(userRole === 'devotee' || userRole === 'user' || !['admin', 'astrologer', 'digital_marketing', 'editor', 'operations_manager'].includes(userRole)) && (
                  <div className="space-y-1.5 pt-1">
                    <Link
                      href="/my-account?tab=orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center gap-2 bg-amber-50/80 hover:bg-amber-100 text-[#78131e] text-xs font-bold px-4 py-2.5 rounded-xl transition"
                    >
                      <Package className="w-4 h-4" />
                      <span>Order History &amp; Tracking</span>
                    </Link>

                    <Link
                      href="/my-account?tab=addresses"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center gap-2 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-bold px-4 py-2.5 rounded-xl transition"
                    >
                      <MapPin className="w-4 h-4 text-amber-700" />
                      <span>Shipping Address</span>
                    </Link>

                    <Link
                      href="/my-account?tab=account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center gap-2 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-bold px-4 py-2.5 rounded-xl transition"
                    >
                      <User className="w-4 h-4 text-stone-600" />
                      <span>Account Details</span>
                    </Link>
                  </div>
                )}

                <button
                  onClick={() => {
                    localStorage.removeItem('astada_token');
                    localStorage.removeItem('astada_role');
                    localStorage.removeItem('astada_user');
                    setUserRole(null);
                    setCurrentUser(null);
                    setMobileMenuOpen(false);
                    window.location.href = '/';
                  }}
                  className="w-full text-center text-stone-500 hover:text-stone-800 text-xs underline py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen(true);
                }}
                className="w-full bg-[#78131e] hover:bg-[#600e17] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors text-center"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}

      {/* Login & Register Modal Dialog */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />
    </header>
  );
}
