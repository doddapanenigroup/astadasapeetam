'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ShoppingBag, Flame } from 'lucide-react';

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroContent, setHeroContent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/content?sectionKey=hero_banner')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setHeroContent(data.data[0]);
        }
      })
      .catch(() => {});
  }, []);

  const isDynamicActive = heroContent && heroContent.isActive;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3e1408] via-[#752a0a] to-[#9c400c] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] shadow-2xs border border-amber-900/30">
      {/* Background temple silhouette */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-screen bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('${(heroContent && heroContent.imageUrl) || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80'}')`
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold tracking-wide uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isDynamicActive ? (heroContent.badge || 'ASTADASA SHAKTI PEETHAS') : 'Your Daily Source of'}</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white leading-tight mb-2.5">
          {isDynamicActive ? (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100">
              {heroContent.title}
            </span>
          ) : (
            <>
              Faith, Devotion & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-100">
                Divine Guidance
              </span>
            </>
          )}
        </h1>

        <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed mb-5 max-w-lg">
          {isDynamicActive
            ? heroContent.subtitle
            : 'Devotional News, Spiritual Wisdom, Astrology, Temples and More – All in One Sacred Place.'}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={isDynamicActive ? (heroContent.ctaLink || '/sacred-temples') : '#devotional'}
            className="bg-[#78131e] hover:bg-[#8f1926] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs flex items-center gap-1.5 border border-amber-500/30 transition-transform active:scale-95"
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            {isDynamicActive ? (heroContent.ctaText || 'Explore Sacred Temples') : 'Explore Devotional'}
          </Link>

          <Link
            href="/marketplace"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-900 text-xs font-bold px-4 py-2 rounded-lg shadow-xs flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-stone-900" />
            Visit Store
          </Link>
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
