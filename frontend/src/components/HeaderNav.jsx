'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { headerData } from '../data/mockData';
import LoginModal from './LoginModal';
import { 
  Home, Flame, Sparkles, Calendar, Compass, Landmark, 
  BookOpen, Clock, Video, ShoppingBag, ChevronDown, Search, 
  ShoppingCart, Menu, X, Bus 
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

  React.useEffect(() => {
    try {
      const role = localStorage.getItem('astada_role');
      if (role) setUserRole(role);
    } catch {}
  }, []);

  return (
    <header className="bg-white border-b border-[#ebdcc7] sticky top-0 z-40 shadow-xs">
      <div className="w-[98.5%] max-w-[1920px] mx-auto py-2.5 px-2 sm:px-3 flex items-center justify-between gap-2 xl:gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#78131e] to-[#9e1c2a] flex items-center justify-center text-amber-300 font-serif font-black text-xl sm:text-2xl shadow-sm border border-amber-300/40">
            🕉️
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg xl:text-xl tracking-tight text-[#78131e] group-hover:text-[#9e1c2a] transition-colors uppercase font-serif whitespace-nowrap">
              Astadasapeetam.com
            </span>
            <span className="text-[9.5px] sm:text-[10px] tracking-widest text-amber-800 font-medium uppercase -mt-0.5 whitespace-nowrap">
              Devotion • Faith • Dharma
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3.5 text-xs 2xl:text-sm font-medium text-stone-700 whitespace-nowrap min-w-0">
          {headerData.navItems.map((item, idx) => {
            const Icon = iconMap[item.icon] || Flame;
            const isActive = item.href === '/' 
              ? pathname === '/' 
              : item.href !== '#' && pathname.startsWith(item.href);

            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center gap-1.5 transition-colors py-1 px-1 2xl:px-1.5 ${
                  isActive 
                    ? 'text-[#78131e] font-bold border-b-2 border-[#78131e]' 
                    : 'hover:text-[#78131e]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#78131e]' : 'text-amber-700/80'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          {/* More dropdown */}
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#78131e] px-1 py-1">
            <span>More</span>
            <ChevronDown className="w-3.5 h-3.5" />

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full pt-1 hidden group-hover:block z-50">
              <div className="bg-white rounded-xl shadow-xl border border-[#ebdcc7] py-2 w-52 text-stone-800 text-xs">
                {/* Sacred Temples (18 Shakti Peethas) */}
                <Link href="/sacred-temples" className="flex items-center justify-between px-3 py-2.5 hover:bg-amber-50 text-[#78131e] font-bold group/item">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#78131e]" />
                    <span>Sacred Temples</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-extrabold uppercase">
                    18 Peethas
                  </span>
                </Link>

                <div className="h-px bg-[#ebdcc7] my-1.5" />

                <Link href="/panchangam" className="flex items-center gap-2 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>Live Panchangam</span>
                </Link>

                <Link href="/slokas" className="flex items-center gap-2 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <Flame className="w-3.5 h-3.5 text-amber-700" />
                  <span>Daily Slokas</span>
                </Link>

                <a href="#epaper" className="flex items-center gap-2 px-3 py-2 hover:bg-amber-50 hover:text-[#78131e] font-medium text-stone-700">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>Devotional E-Paper</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Action Controls: Search, Cart, Login */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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

          {userRole === 'digital_marketing' ? (
            <Link
              href="/marketing"
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm transition flex items-center space-x-1"
            >
              <span>📢 Marketing Studio</span>
            </Link>
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
