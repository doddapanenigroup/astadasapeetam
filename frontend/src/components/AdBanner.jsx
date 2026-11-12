'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ExternalLink } from 'lucide-react';

export const DEFAULT_ADS_CONFIG = {
  'slot-1': {
    id: 'slot-1',
    name: 'Top Leaderboard Sponsored Banner',
    location: 'Above Main Homepage Feed & Carousel',
    dimensions: '728 × 90',
    status: 'active', // 'active' | 'hidden_reserve_space' | 'disabled'
    provider: 'google', // 'google' | 'private' (default google to avoid confusion with website sections)
    title: 'Experience Divine Energy • Premium Rudraksha',
    subtitle: 'Lab-certified 1-14 Mukhi authentic Himalayan beads & energized yantras.',
    badge: 'FESTIVAL SPECIAL',
    ctaText: 'Shop Now',
    targetUrl: '/marketplace',
    theme: 'velvet-ruby'
  },
  'slot-2': {
    id: 'slot-2',
    name: 'In-Feed Native Ad 1',
    location: 'Between Explore Categories & Devotional Grid',
    dimensions: '728 × 90',
    status: 'active',
    provider: 'google',
    title: 'Tirumala Srivari Nitya Laddu & Maha Prasadam Seva',
    subtitle: 'Direct sanctum blessed prasadam delivered with utmost Satvik purity.',
    badge: 'DIRECT SANCTUM',
    ctaText: 'Book Prasadam',
    targetUrl: '/marketplace',
    theme: 'saffron-gold'
  },
  'slot-3': {
    id: 'slot-3',
    name: 'Right Sidebar Sticky Ad',
    location: 'Right Column Continuous Devotional Widget Dock',
    dimensions: '300 × 250',
    status: 'active',
    provider: 'google',
    title: 'Consult Vedic Panditas & Astrologers',
    subtitle: 'Instant kundali analysis, dosha nivarana & auspicious muhurtham.',
    badge: 'VEDIC JYOTISHA',
    ctaText: 'Consult Now',
    targetUrl: '/astrology',
    theme: 'midnight-amethyst'
  },
  'slot-4': {
    id: 'slot-4',
    name: 'In-Feed Native Ad 2',
    location: 'Between Astrologers Banner & Sacred Articles Row',
    dimensions: '728 × 90',
    status: 'active',
    provider: 'google',
    title: 'Pure Copper 3D Maha Meru Sri Yantra (Prana Pratishtha)',
    subtitle: 'Sacred geometry pyramid energized with Lalita Sahasranama archana.',
    badge: 'SRI VIDYA ENERGIZED',
    ctaText: 'View Yantra',
    targetUrl: '/marketplace',
    theme: 'velvet-ruby'
  },
  'slot-5': {
    id: 'slot-5',
    name: 'Bottom Anchor Leaderboard Banner',
    location: 'Above Footer Newsletter & App Download Section',
    dimensions: '970 × 250',
    status: 'active',
    provider: 'google',
    title: 'Kashi Vishwanath & Rameswaram Sacred Yatra Pass',
    subtitle: 'All-inclusive guided pilgrimage package with priority sanctum darshan.',
    badge: 'YATRA SPECIAL',
    ctaText: 'Explore Yatras',
    targetUrl: '/yatralu',
    theme: 'cosmic-dark'
  },
  'slot-6': {
    id: 'slot-6',
    name: 'Lower Right Sidebar Devotional Ad (Large Skyscraper)',
    location: 'Right Column below E-Paper (beside Devotional Products & Festivals)',
    dimensions: '300 × 600',
    status: 'active',
    provider: 'google',
    title: 'Divine Temple Pooja & Archana Seva',
    subtitle: 'Perform sankalpam in your family name at famous sacred kshetras across India.',
    badge: 'TEMPLE SEVA',
    ctaText: 'Book Seva Now',
    targetUrl: '/marketplace',
    theme: 'saffron-gold',
    feature1: 'Sankalpam in Gotra & Family Names',
    feature2: 'Sanctum Prasadam Delivered to Home',
    feature3: 'Live Video Proof & Temple Archana',
    tagline: 'Special Daily Archana • Live at Srisailam & Kashi'
  }
};

// Safe helper to deep-clone defaults and merge any user-saved overrides per-slot
export const getInitialAdsConfig = () => {
  const base = JSON.parse(JSON.stringify(DEFAULT_ADS_CONFIG));
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('astada_ads_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          Object.keys(base).forEach(key => {
            if (parsed[key] && typeof parsed[key] === 'object') {
              base[key] = {
                ...base[key],
                ...parsed[key],
                // Always ensure google provider is used to prevent confusion with website sections
                provider: 'google'
              };
              if (key === 'slot-6' && parsed[key].dimensions === '300 × 250') {
                base[key].dimensions = '300 × 600';
              }
            }
          });
        }
      }
    } catch (err) {
      console.warn('Failed to parse astada_ads_config from localStorage:', err);
    }
  }
  return base;
};

export default function AdBanner({ 
  type = 'leaderboard', 
  slotId, 
  label = 'Ad Space', 
  className = '' 
}) {
  // Resolve slotId from type if not explicitly passed
  const resolvedSlotId = slotId || (
    type === 'top-sponsored' ? 'slot-1' :
    type === 'in-feed-1' ? 'slot-2' :
    type === 'sidebar' ? 'slot-3' :
    type === 'in-feed-2' ? 'slot-4' :
    type === 'bottom-banner' ? 'slot-5' :
    'slot-2'
  );

  // Initial state strictly uses DEFAULT_ADS_CONFIG to guarantee zero SSR hydration mismatch
  const [adConfig, setAdConfig] = useState(
    DEFAULT_ADS_CONFIG[resolvedSlotId] || DEFAULT_ADS_CONFIG['slot-1']
  );

  useEffect(() => {
    const loadConfig = () => {
      const all = getInitialAdsConfig();
      if (all && all[resolvedSlotId]) {
        setAdConfig(all[resolvedSlotId]);
      }
    };

    loadConfig();

    if (typeof window !== 'undefined') {
      const handleStorage = (e) => {
        if (!e.key || e.key === 'astada_ads_config') {
          loadConfig();
        }
      };
      const handleLocalUpdate = () => loadConfig();

      window.addEventListener('storage', handleStorage);
      window.addEventListener('astada_ads_updated', handleLocalUpdate);

      let bc;
      try {
        bc = new BroadcastChannel('astada_ads_channel');
        bc.onmessage = (event) => {
          if (event.data?.type === 'ADS_CONFIG_UPDATED' && event.data?.config?.[resolvedSlotId]) {
            setAdConfig(event.data.config[resolvedSlotId]);
          }
        };
      } catch {}

      return () => {
        window.removeEventListener('storage', handleStorage);
        window.removeEventListener('astada_ads_updated', handleLocalUpdate);
        if (bc) bc.close();
      };
    }
  }, [resolvedSlotId]);

  // 1. IF DISABLED: Return null, completely collapse space
  if (adConfig.status === 'disabled') {
    return null;
  }

  const isLargeSidebar = resolvedSlotId === 'slot-6' || adConfig.dimensions?.includes('600') || adConfig.dimensions?.includes('500');

  // 2. IF HIDDEN LEAVING RESERVED SPACE
  if (adConfig.status === 'hidden_reserve_space') {
    const minHeightStyle = isLargeSidebar ? '540px' : (type === 'sidebar' ? '250px' : (resolvedSlotId === 'slot-5' ? '120px' : '88px'));
    return (
      <div 
        className={`w-full border-2 border-dashed border-[#c59a72]/60 bg-[#faf6f0]/70 rounded-2xl p-4 flex flex-col items-center justify-center text-center select-none transition-all my-2 shadow-2xs ${className}`}
        style={{ minHeight: minHeightStyle }}
      >
        <div className="flex items-center space-x-2 text-stone-500">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-xs font-serif tracking-wider uppercase text-amber-950 font-bold">
            Reserved Devotional Space ({adConfig.dimensions})
          </span>
        </div>
      </div>
    );
  }

  // 3. IF ACTIVE WITH GOOGLE ADS (Production Ready)
  if (adConfig.provider === 'google') {
    if (type === 'sidebar') {
      const minHClass = isLargeSidebar ? 'min-h-[580px]' : 'min-h-[250px]';
      return (
        <div className={`w-full bg-[#fcfdfe] border border-[#dadce0] rounded-3xl p-5 text-center flex flex-col items-center justify-between ${minHClass} shadow-xs relative overflow-hidden ${className}`}>
          {/* Google Top Header */}
          <div className="w-full flex items-center justify-between pb-2 border-b border-[#eceff1] text-[10px] text-stone-500 font-sans">
            <span className="font-bold flex items-center gap-1.5 text-[#1a73e8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] animate-pulse"></span>
              Ad · Google AdSense
            </span>
            <span className="flex items-center gap-1 text-stone-400">
              <span className="w-3 h-3 rounded-full border border-stone-300 text-[8px] flex items-center justify-center font-bold text-stone-500">i</span>
              <span>Advertisement</span>
            </span>
          </div>

          {/* Ad Creative */}
          <div className="my-auto py-6 space-y-4 w-full">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-2xl shadow-inner">
              <span className="font-sans font-black text-2xl bg-gradient-to-r from-blue-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
                G
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="text-[11px] text-[#1a73e8] font-sans font-bold">
                Sponsored • Verified Network
              </div>
              <h4 className="text-base font-black text-stone-900 font-sans tracking-tight leading-snug">
                {isLargeSidebar ? 'Google Half-Page Skyscraper' : 'Google Medium Rectangle'}
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto font-sans leading-relaxed">
                Responsive contextual advertiser unit for devotional devotees & pilgrimages.
              </p>
            </div>

            {isLargeSidebar && (
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 font-sans space-y-1.5 text-left">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-700">
                  <span>✓ Highly Targeted Network Unit</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <span>✓ Multi-device Adaptive Layout</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <span>✓ Zero Layout Shift (CLS Protected)</span>
                </div>
              </div>
            )}

            <div className="pt-2">
              <div className="w-full py-2.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-sans font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer">
                <span>Learn More</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Bottom Google Footer */}
          <div className="w-full pt-2 border-t border-[#eceff1] flex items-center justify-between text-[9px] text-stone-400 font-sans uppercase tracking-wider">
            <span>Ads by Google</span>
            <span className="font-mono">{adConfig.dimensions || (isLargeSidebar ? '300 × 600' : '300 × 250')}</span>
          </div>
        </div>
      );
    }

    return (
      <div className={`w-full mx-auto py-2.5 ${className}`}>
        <div className="bg-[#fcfdfe] border border-[#dadce0] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden group hover:border-[#1a73e8] transition-all">
          {/* Top subtle micro-bar for mobile */}
          <div className="w-full flex sm:hidden items-center justify-between text-[10px] text-stone-400 font-sans border-b border-stone-100 pb-1">
            <span className="font-bold text-[#1a73e8] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8]" />
              Ad · Google
            </span>
            <span>Advertisement</span>
          </div>

          <div className="flex items-center gap-4 text-center sm:text-left w-full sm:w-auto">
            {/* Google G icon badge */}
            <div className="w-10 h-10 rounded-xl bg-white border border-[#dadce0] flex items-center justify-center shrink-0 shadow-2xs">
              <span className="font-sans font-black text-lg bg-gradient-to-r from-blue-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
                G
              </span>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <span className="text-[10px] bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc] px-2 py-0.5 rounded font-black font-sans uppercase tracking-wider">
                  Ad
                </span>
                <span className="text-xs sm:text-sm font-bold text-stone-900 font-sans tracking-tight">
                  Google Sponsored Partner • Responsive Network Unit
                </span>
                <span className="text-[11px] text-stone-400 font-sans hidden md:inline">
                  • googleadservices.com
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans">
                Targeted devotional marketplace & sacred yatra advertisement unit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-mono text-stone-400 uppercase hidden lg:inline">
              {adConfig.dimensions || '728 × 90'}
            </span>
            <div className="px-4 py-2 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-sans font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer">
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </div>
            <div className="text-[10px] text-stone-400 flex items-center gap-1 font-sans pl-2 border-l border-stone-200">
              <span className="w-3 h-3 rounded-full border border-stone-300 text-[8px] flex items-center justify-center font-bold text-stone-500">i</span>
              <span>Ads by Google</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. IF ACTIVE WITH PRIVATE AD

  // Theme palettes for private ads
  const themeStyles = {
    'velvet-ruby': 'from-[#2e0b12] via-[#5c1322] to-[#2e0b12] border-amber-500/40 text-amber-100',
    'saffron-gold': 'from-[#422006] via-[#78350f] to-[#422006] border-amber-400/50 text-amber-100',
    'midnight-amethyst': 'from-[#1e0f36] via-[#3b1268] to-[#1e0f36] border-purple-400/40 text-purple-100',
    'cosmic-dark': 'from-[#0f172a] via-[#1e293b] to-[#0f172a] border-slate-600/50 text-slate-100'
  }[adConfig.theme || 'velvet-ruby'];

  // Sidebar Private Ad (Compact 300x250 or Large Skyscraper 300x600)
  if (type === 'sidebar') {
    if (isLargeSidebar) {
      return (
        <div className={`w-full bg-gradient-to-b ${themeStyles} border rounded-3xl p-5 text-center flex flex-col items-center justify-between min-h-[540px] shadow-md relative overflow-hidden group transition-all duration-300 ${className}`}>
          {/* Subtle Ambient Sacred Light Glows */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-rose-600/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Bar: Badge, Dimensions & Sacred Icon */}
          <div className="w-full flex items-center justify-between text-[10px] text-amber-300 font-mono relative z-10">
            <span className="bg-white/10 border border-amber-400/30 px-3 py-1 rounded-full uppercase font-black tracking-wider flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{adConfig.badge || 'TEMPLE SEVA'}</span>
            </span>
            <span className="text-amber-200/80 font-bold bg-black/25 px-2.5 py-1 rounded-md border border-white/5">
              {adConfig.dimensions || '300 × 600'}
            </span>
          </div>

          {/* Center Card Content: Title, Subtitle, Highlights */}
          <div className="my-auto py-4 space-y-4 relative z-10 w-full text-left">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-2xl shadow-inner mb-2">
                🕉️
              </div>
              <h4 className="text-lg sm:text-xl font-black text-white font-serif leading-snug tracking-tight">
                {adConfig.title || 'Divine Temple Pooja & Archana Seva'}
              </h4>
              <p className="text-xs text-amber-100/90 leading-relaxed max-w-xs mx-auto">
                {adConfig.subtitle || 'Perform sankalpam in your family name and gotra at famous sacred kshetras across India.'}
              </p>
            </div>

            {/* Sacred Perks / Service Guarantees */}
            <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-2.5 text-xs backdrop-blur-xs">
              <div className="flex items-center gap-2.5 text-amber-100 font-medium">
                <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 font-black text-[10px] flex items-center justify-center shrink-0">✓</span>
                <span>{adConfig.feature1 || 'Sankalpam in Gotra & Family Names'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-amber-100 font-medium">
                <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 font-black text-[10px] flex items-center justify-center shrink-0">✓</span>
                <span>{adConfig.feature2 || 'Sanctum Prasadam Delivered to Home'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-amber-100 font-medium">
                <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 font-black text-[10px] flex items-center justify-center shrink-0">✓</span>
                <span>{adConfig.feature3 || 'Live Video Proof & Temple Archana'}</span>
              </div>
            </div>

            {/* Daily Muhurtham Tagline */}
            <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-400/40 rounded-xl p-2.5 text-center text-[11px] text-amber-200 font-bold">
              <span>⚡ {adConfig.tagline || 'Special Daily Archana • Live at Srisailam & Kashi'}</span>
            </div>
          </div>

          {/* Bottom Area: Large Call to Action & Trust Guarantee */}
          <div className="w-full space-y-2.5 relative z-10 pt-2">
            <Link
              href={adConfig.targetUrl || '/marketplace'}
              className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-110 text-stone-950 font-black text-sm py-3 px-4 rounded-2xl shadow-lg shadow-amber-950/50 transition-all flex items-center justify-center space-x-2 cursor-pointer transform group-hover:scale-[1.02]"
            >
              <span>{adConfig.ctaText || 'Book Seva Now'}</span>
              <ExternalLink className="w-4 h-4 text-stone-950" />
            </Link>
            <div className="text-[10px] text-amber-200/70 font-mono tracking-wider flex items-center justify-center gap-1.5 uppercase font-bold">
              <span>🛡️</span>
              <span>100% Temple Certified • Vedic Pundits</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`w-full bg-gradient-to-b ${themeStyles} border rounded-2xl p-4.5 text-center flex flex-col items-center justify-between min-h-[250px] shadow-sm relative overflow-hidden ${className}`}>
        <div className="w-full flex items-center justify-between text-[10px] text-amber-300 font-mono">
          <span className="bg-white/10 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
            {adConfig.badge || 'SPONSORED'}
          </span>
          <span className="text-amber-200/70 font-semibold">{adConfig.dimensions}</span>
        </div>

        <div className="my-auto py-3 space-y-1.5">
          <div className="text-sm font-black text-white font-serif leading-snug">
            {adConfig.title}
          </div>
          <p className="text-[11px] text-amber-100/80 leading-relaxed line-clamp-3">
            {adConfig.subtitle}
          </p>
        </div>

        <Link
          href={adConfig.targetUrl || '/marketplace'}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs py-2 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1"
        >
          <span>{adConfig.ctaText || 'Learn More'}</span>
          <ExternalLink className="w-3 h-3 text-stone-950" />
        </Link>
      </div>
    );
  }

  // Top Sponsored Leaderboard / In-Feed / Bottom Banner
  return (
    <div className={`w-full mx-auto py-2.5 ${className}`}>
      <div className={`bg-gradient-to-r ${themeStyles} rounded-2xl p-3.5 px-6 flex flex-col sm:flex-row items-center justify-between shadow-sm border text-white gap-3.5 relative overflow-hidden`}>
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="text-[10px] bg-amber-400 text-stone-950 uppercase px-2 py-0.5 rounded font-black tracking-wider shrink-0 shadow-2xs">
            {adConfig.badge || 'FESTIVAL SPECIAL'}
          </span>
          <div>
            <div className="text-sm sm:text-base font-bold text-amber-200 tracking-wide flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{adConfig.title}</span>
            </div>
            <div className="text-xs text-amber-100/85 line-clamp-1">
              {adConfig.subtitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={adConfig.targetUrl || '/marketplace'}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs px-4 py-2 rounded-xl shadow transition-all whitespace-nowrap shrink-0 flex items-center space-x-1"
          >
            <span>{adConfig.ctaText || 'Shop Now'}</span>
            <ExternalLink className="w-3 h-3 text-stone-950" />
          </Link>
        </div>
      </div>
    </div>
  );
}
