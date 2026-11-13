'use client';

import React from 'react';
import Link from 'next/link';
import { Newspaper, ArrowRight, Calendar } from 'lucide-react';

export default function EpaperSpotlightCard() {
  const todayDateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#fffdfa] border border-[#ebdcc7] hover:border-amber-400/80 p-4 sm:p-4.5 shadow-2xs hover:shadow-xs transition-all w-full h-full flex flex-col justify-between group">
      {/* Warm ambient aura */}
      <div className="absolute right-0 top-0 w-28 h-28 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between gap-2 pb-2 border-b border-amber-100/90">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#78131e] flex items-center justify-center text-xs shadow-2xs">
            <Newspaper className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-950 block leading-tight">
              Devotional E-Paper
            </span>
            <span className="text-[9px] text-stone-500 font-medium">
              Daily News Edition
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-[9px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Today's Issue</span>
        </span>
      </div>

      {/* Center Body: Title & Newspaper Thumbnail */}
      <div className="relative z-10 flex items-center justify-between gap-3 my-2.5">
        <div className="flex-1 min-w-0">
          <h4 className="font-serif font-black text-xs sm:text-[13px] text-stone-900 group-hover:text-[#78131e] transition-colors leading-snug">
            Sri Astadasapeetam Bhakti Dinapatrika
          </h4>
          <p className="text-[10.5px] text-stone-600 mt-1 leading-snug line-clamp-2">
            Read daily temple epistles, sacred panchangam, festival news &amp; puranic discourse online.
          </p>
          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-amber-900/80 font-semibold">
            <Calendar className="w-3 h-3 text-amber-700" />
            <span>{todayDateStr} • All 18 Peethas</span>
          </div>
        </div>

        {/* Thumbnail Preview */}
        <Link 
          href="/epaper" 
          className="shrink-0 relative group-hover:scale-105 transition-transform duration-300 shadow-sm rounded-lg overflow-hidden border border-amber-200"
          title="Open Today's E-Paper"
        >
          <img
            src="/images/epaper_thumb.png"
            alt="Devotional E-Paper"
            className="w-14 h-18 sm:w-16 sm:h-20 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/art_kashi.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-0.5">
            <span className="text-[8px] font-black text-amber-200 uppercase tracking-wider">
              READ PDF
            </span>
          </div>
        </Link>
      </div>

      {/* Bottom Action Footer */}
      <div className="relative z-10 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
        <span className="text-[10px] text-stone-500 font-medium truncate">
          Free Digital Newspaper
        </span>
        <Link
          href="/epaper"
          className="inline-flex items-center gap-1 bg-[#78131e] hover:bg-[#600e17] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-2xs transition-colors shrink-0"
        >
          <span>Read Now</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
