'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

export default function DynamicMarketplaceSpotlight() {
  const [spotlight, setSpotlight] = useState({
    title: '100% Satvik Pooja Kits, Lab-Certified Rudrakshas & Sanctum Prasadam',
    subtitle: 'Flat 30% OFF on all Copper Sri Yantras and Nepal Rudraksha Malas. Free temple Gangajal bottle with every order.',
    badge: 'VEDIC PURITY GUARANTEE',
    ctaText: 'Shop Best Sellers',
    ctaLink: '/marketplace',
    isActive: true
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/public/content?sectionKey=marketplace_spotlight')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setSpotlight(data.data[0]);
        }
      })
      .catch(() => {});
  }, []);

  if (!spotlight || !spotlight.isActive) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2c1810] via-[#4a2618] to-[#6b2f15] text-white p-4 sm:p-5 shadow-2xs border border-amber-600/30 w-full h-full flex flex-col justify-between">
      {/* Golden glow */}
      <div className="absolute right-0 top-0 w-60 h-full bg-radial from-amber-500/15 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 h-full">
        <div className="flex items-start gap-3.5 flex-1">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300 shadow-2xs">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-amber-500 text-stone-950 text-[10px] uppercase font-black px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-2.5 h-2.5" />
                {spotlight.badge || 'VEDIC PURITY GUARANTEE'}
              </span>
              <span className="text-[11px] text-amber-200/90 font-medium">
                Temple Certified
              </span>
            </div>

            <h3 className="text-sm sm:text-base lg:text-[17px] font-serif font-black text-amber-100 tracking-tight leading-snug">
              {spotlight.title}
            </h3>

            {spotlight.subtitle && (
              <p className="text-xs text-amber-100/85 mt-1 leading-relaxed max-w-xl">
                {spotlight.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="shrink-0 self-start md:self-center">
          <Link
            href={spotlight.ctaLink || '/marketplace'}
            className="inline-flex items-center gap-2 bg-[#78131e] hover:bg-[#921825] border border-amber-400/40 text-amber-100 text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 whitespace-nowrap"
          >
            <span>{spotlight.ctaText || 'Shop Best Sellers'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
