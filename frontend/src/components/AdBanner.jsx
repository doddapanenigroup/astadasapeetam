'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export const DEFAULT_ADS_CONFIG = {
  'slot-1': {
    id: 'slot-1',
    name: 'Top Leaderboard Sponsored Banner',
    location: 'Above Main Homepage Feed & Carousel',
    dimensions: '728 × 90',
    status: 'active', // 'active' | 'hidden_reserve_space' | 'disabled'
    provider: 'private', // 'private' | 'google'
    title: 'Experience Divine Energy • Premium Rudraksha',
    subtitle: 'Lab-certified 1-14 Mukhi authentic Himalayan beads & energized yantras.',
    badge: 'FESTIVAL SPECIAL',
    ctaText: 'Shop Now',
    targetUrl: '/marketplace',
    theme: 'velvet-ruby',
    googleClientId: 'ca-pub-9876543210987654',
    googleSlotId: '1092837465',
    googleFormat: 'auto'
  },
  'slot-2': {
    id: 'slot-2',
    name: 'In-Feed Native Ad 1',
    location: 'Between Explore Categories & Devotional Grid',
    dimensions: '728 × 90',
    status: 'active',
    provider: 'private',
    title: 'Tirumala Srivari Nitya Laddu & Maha Prasadam Seva',
    subtitle: 'Direct sanctum blessed prasadam delivered with utmost Satvik purity.',
    badge: 'DIRECT SANCTUM',
    ctaText: 'Book Prasadam',
    targetUrl: '/marketplace',
    theme: 'saffron-gold',
    googleClientId: 'ca-pub-9876543210987654',
    googleSlotId: '2983746510',
    googleFormat: 'horizontal'
  },
  'slot-3': {
    id: 'slot-3',
    name: 'Right Sidebar Sticky Ad',
    location: 'Right Column Continuous Devotional Widget Dock',
    dimensions: '300 × 250',
    status: 'active',
    provider: 'private',
    title: 'Consult Vedic Panditas & Astrologers',
    subtitle: 'Instant kundali analysis, dosha nivarana & auspicious muhurtham.',
    badge: 'VEDIC JYOTISHA',
    ctaText: 'Consult Now',
    targetUrl: '/astrology',
    theme: 'midnight-amethyst',
    googleClientId: 'ca-pub-9876543210987654',
    googleSlotId: '3847561920',
    googleFormat: 'rectangle'
  },
  'slot-4': {
    id: 'slot-4',
    name: 'In-Feed Native Ad 2',
    location: 'Between Astrologers Banner & Sacred Articles Row',
    dimensions: '728 × 90',
    status: 'active',
    provider: 'private',
    title: 'Pure Copper 3D Maha Meru Sri Yantra (Prana Pratishtha)',
    subtitle: 'Sacred geometry pyramid energized with Lalita Sahasranama archana.',
    badge: 'SRI VIDYA ENERGIZED',
    ctaText: 'View Yantra',
    targetUrl: '/marketplace',
    theme: 'velvet-ruby',
    googleClientId: 'ca-pub-9876543210987654',
    googleSlotId: '4758691023',
    googleFormat: 'horizontal'
  },
  'slot-5': {
    id: 'slot-5',
    name: 'Bottom Anchor Leaderboard Banner',
    location: 'Above Footer Newsletter & App Download Section',
    dimensions: '970 × 250',
    status: 'active',
    provider: 'private', // ALL default to private so user has full control
    title: 'Kashi Vishwanath & Rameswaram Sacred Yatra Pass',
    subtitle: 'All-inclusive guided pilgrimage package with priority sanctum darshan.',
    badge: 'YATRA SPECIAL',
    ctaText: 'Explore Yatras',
    targetUrl: '/yatralu',
    theme: 'cosmic-dark',
    googleClientId: 'ca-pub-9876543210987654',
    googleSlotId: '5869702134',
    googleFormat: 'leaderboard'
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
                ...parsed[key]
              };
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

  const [adConfig, setAdConfig] = useState(() => {
    const all = getInitialAdsConfig();
    return all[resolvedSlotId] || DEFAULT_ADS_CONFIG[resolvedSlotId] || DEFAULT_ADS_CONFIG['slot-1'];
  });

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

  // 2. IF HIDDEN LEAVING RESERVED SPACE (Exact feature requested: "hide each add leaving that space there")
  if (adConfig.status === 'hidden_reserve_space') {
    const minHeightStyle = type === 'sidebar' ? '250px' : (resolvedSlotId === 'slot-5' ? '120px' : '88px');
    return (
      <div 
        className={`w-full border-2 border-dashed border-[#c59a72]/60 bg-[#faf6f0]/70 rounded-2xl p-4 flex flex-col items-center justify-center text-center select-none transition-all my-2 shadow-2xs ${className}`}
        style={{ minHeight: minHeightStyle }}
      >
        <div className="flex items-center space-x-2 text-stone-500">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-xs font-mono tracking-wider uppercase text-amber-950 font-bold">
            Reserved Devotional Space ({adConfig.dimensions}) • Advertisement Hidden
          </span>
        </div>
        <p className="text-[10px] text-stone-400 mt-1 font-sans">
          Slot ID: {resolvedSlotId.toUpperCase()} • Layout boundary preserved (Zero CLS)
        </p>
      </div>
    );
  }

  // 3. IF ACTIVE WITH GOOGLE ADS
  if (adConfig.provider === 'google') {
    if (type === 'sidebar') {
      return (
        <div className={`w-full bg-[#f8fafc] border border-blue-200 rounded-2xl p-4 text-center flex flex-col items-center justify-between min-h-[250px] shadow-xs relative overflow-hidden ${className}`}>
          <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200 text-[10px] text-slate-500 font-mono">
            <span className="font-bold flex items-center gap-1.5 text-blue-700">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Google AdSense
            </span>
            <span className="bg-blue-50 text-blue-800 font-bold px-1.5 py-0.5 rounded border border-blue-200">{resolvedSlotId.toUpperCase()}</span>
          </div>

          <div className="my-auto py-4 space-y-1.5">
            <div className="text-xs font-bold text-slate-800 tracking-wide">
              Google Network Advertisement
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Client: {adConfig.googleClientId || 'ca-pub-9876543210987654'}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Slot: {adConfig.googleSlotId || '3847561920'}
            </div>
            <div className="text-[10px] text-slate-400">
              Format: {adConfig.googleFormat || 'Medium Rectangle'} ({adConfig.dimensions})
            </div>
          </div>

          <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 uppercase tracking-widest font-mono">
            <span>Ads by Google</span>
            <span>Responsive 300×250</span>
          </div>
        </div>
      );
    }

    return (
      <div className={`w-full mx-auto py-2.5 ${className}`}>
        <div className="bg-[#f8fafc] border border-blue-200 rounded-2xl p-3.5 px-6 flex flex-col sm:flex-row items-center justify-between shadow-xs gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="text-[10px] bg-blue-600 text-white uppercase px-2.5 py-1 rounded font-black font-mono tracking-wider shadow-2xs shrink-0">
              Google Ads
            </span>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide flex items-center gap-2">
                <span>Google AdSense • Responsive Unit ({adConfig.dimensions})</span>
                <span className="text-[10px] bg-blue-100 text-blue-900 font-mono font-bold px-1.5 py-0.5 rounded border border-blue-200">
                  {resolvedSlotId.toUpperCase()}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Publisher: {adConfig.googleClientId || 'ca-pub-9876543210987654'} | Unit ID: {adConfig.googleSlotId || '1092837465'}
              </div>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tracking-widest shrink-0">
            Ads by Google
          </span>
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

  // Sidebar Private Ad (300x250)
  if (type === 'sidebar') {
    return (
      <div className={`w-full bg-gradient-to-b ${themeStyles} border rounded-2xl p-4.5 text-center flex flex-col items-center justify-between min-h-[250px] shadow-sm relative overflow-hidden ${className}`}>
        <div className="w-full flex items-center justify-between text-[10px] text-amber-300 font-mono">
          <span className="bg-white/10 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
            {adConfig.badge || 'SPONSORED'}
          </span>
          <span className="text-amber-200/70 font-semibold">{resolvedSlotId.toUpperCase()} • 300 × 250</span>
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
      <div className={`bg-gradient-to-r ${themeStyles} rounded-2xl p-3 px-6 flex flex-col sm:flex-row items-center justify-between shadow-sm border text-white gap-3.5 relative overflow-hidden`}>
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
