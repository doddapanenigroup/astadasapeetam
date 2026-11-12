'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { headerData } from '../data/mockData';
import LoginModal from './LoginModal';
import { 
  DEFAULT_BRANDING, 
  getStoredBranding, 
  applyFaviconToDocument 
} from '../data/brandingData';
import { 
  Home, Flame, Sparkles, Calendar, Compass, Landmark, 
  BookOpen, Clock, Video, ShoppingBag, ChevronDown, Search, 
  ShoppingCart, Menu, X, Bus, Play 
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
  const pathname = usePathname();

  const [branding, setBranding] = useState(DEFAULT_BRANDING);

  React.useEffect(() => {
    try {
      const role = localStorage.getItem('astada_role');
      if (role) setUserRole(role);

      const current = getStoredBranding();
      setBranding(current);
      applyFaviconToDocument(current);

      const handleUpdate = () => {
        const updated = getStoredBranding();
        setBranding(updated);
        applyFaviconToDocument(updated);
      };
      window.addEventListener('brandingUpdated', handleUpdate);
      return () => window.removeEventListener('brandingUpdated', handleUpdate);
    } catch {}
  }, []);

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
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto pl-3 bg-white z-10">
          <button 
            suppressHydrationWarning
            onClick={() => setSearchOpen(!searchOpen)} 
            className="p-1.5 sm:p-2 text-stone-600 hover:text-[#78131e] transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
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
            <span className="absolute top-0.5 right-0.5 bg-amber-500 text-stone-900 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </Link>

          {userRole ? (
            <div className="flex items-center space-x-2 pl-1 border-l border-stone-200">
              <Link
                href={
                  userRole === 'admin' 
                    ? '/admin' 
                    : userRole === 'astrologer' 
                    ? '/astrologer' 
                    : userRole === 'digital_marketing' 
                    ? '/marketing' 
                    : '/'
                }
                className={`text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition flex items-center space-x-1 ${
                  userRole === 'admin'
                    ? 'bg-rose-800 hover:bg-rose-900'
                    : userRole === 'astrologer'
                    ? 'bg-purple-800 hover:bg-purple-900'
                    : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                <span>
                  {userRole === 'admin' && '👑 Admin Console'}
                  {userRole === 'astrologer' && '🔮 Astrologer Workspace'}
                  {userRole === 'digital_marketing' && '📢 Marketing Studio'}
                  {userRole === 'devotee' && '🙏 My Profile'}
                </span>
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('astada_token');
                  localStorage.removeItem('astada_role');
                  localStorage.removeItem('astada_user');
                  setUserRole(null);
                  window.location.href = '/';
                }}
                className="text-[11px] text-stone-500 hover:text-stone-800 underline cursor-pointer"
                title="Log out"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              suppressHydrationWarning
              onClick={() => setLoginModalOpen(true)}
              className="bg-[#78131e] hover:bg-[#600e17] text-white text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-md shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Login
            </button>
          )}

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

      {/* Expandable Search Input */}
      {searchOpen && (
        <div className="bg-[#fcf8f2] px-4 py-2.5 border-t border-[#ebdcc7]">
          <div className="max-w-2xl mx-auto flex items-center gap-2">
            <Search className="w-4 h-4 text-stone-400" />
            <input 
              suppressHydrationWarning
              type="text" 
              placeholder="Search slokas, temples, panchangam, deities, or pooja kits..."
              className="w-full bg-white border border-[#e2d4be] px-3 py-1.5 rounded-md text-sm outline-none focus:border-[#78131e]"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#ebdcc7] px-4 py-4 space-y-2 shadow-lg">
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
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setLoginModalOpen(true);
              }}
              className="w-full bg-[#78131e] hover:bg-[#600e17] text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition-colors text-center"
            >
              Login / Register
            </button>
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
