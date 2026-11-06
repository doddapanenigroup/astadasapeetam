'use client';

import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Flame } from 'lucide-react';

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3e1408] via-[#752a0a] to-[#9c400c] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] shadow-2xs border border-amber-900/30">
      {/* Background temple silhouette */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-screen bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80')`
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold tracking-wide uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Your Daily Source of</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white leading-tight mb-2.5">
          Faith, Devotion & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-100">
            Divine Guidance
          </span>
        </h1>

        <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed mb-5 max-w-sm">
          Devotional News, Spiritual Wisdom, Astrology, Temples and More – All in One Sacred Place.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#devotional"
            className="bg-[#78131e] hover:bg-[#8f1926] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs flex items-center gap-1.5 border border-amber-500/30 transition-transform active:scale-95"
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            Explore Devotional
          </a>

          <a
            href="#store"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-900 text-xs font-bold px-4 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-stone-900" />
            Visit Store
          </a>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="relative z-10 flex items-center gap-1.5 mt-4">
        {[0, 1, 2, 3, 4].map((dot) => (
          <button
            key={dot}
            onClick={() => setActiveSlide(dot)}
            className={`h-1.5 rounded-full transition-all ${
              activeSlide === dot ? 'w-5 bg-amber-400' : 'w-1.5 bg-amber-400/40'
            }`}
            aria-label={`Slide ${dot + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
