'use client';

import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Flame, Quote, PhoneCall } from 'lucide-react';

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="w-[96%] max-w-[1880px] mx-auto py-3">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Hero Banner (Col 8) */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3e1408] via-[#752a0a] to-[#9c400c] text-white p-6 sm:p-10 flex flex-col justify-between min-h-[380px] shadow-md border border-amber-900/30">
          {/* Background decorative artwork and temple overlay */}
          <div 
            className="absolute inset-0 opacity-25 mix-blend-screen bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80')`
            }}
          />

          {/* Deity Illustration / Golden Temple visual on right */}
          <div className="absolute right-4 bottom-2 sm:right-8 sm:bottom-4 pointer-events-none opacity-90 hidden sm:flex flex-col items-center">
            <div className="relative w-48 h-64 flex flex-col items-center justify-end">
              {/* Golden Krishna silhouette & Diya glow */}
              <div className="w-36 h-36 rounded-full bg-radial from-amber-400/40 via-amber-600/10 to-transparent blur-md absolute top-6" />
              <div className="text-8xl select-none filter drop-shadow-[0_8px_16px_rgba(245,158,11,0.6)]">
                🪈
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl filter drop-shadow-[0_0_12px_#f59e0b]">🪔</span>
                <span className="text-xs font-serif font-bold text-amber-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                  Jai Shri Krishna
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Your Daily Source of</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight mb-3">
              Faith, Devotion & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-100">
                Divine Guidance
              </span>
            </h1>

            <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed mb-6 max-w-md">
              Devotional News, Spiritual Wisdom, Astrology, Temples and More – All in One Sacred Place.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#devotional"
                className="bg-[#78131e] hover:bg-[#8f1926] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg shadow flex items-center gap-2 border border-amber-500/30 transition-transform active:scale-95"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                Explore Devotional
              </a>

              <a
                href="#store"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-900 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg shadow flex items-center gap-2 transition-transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-stone-900" />
                Visit Store
              </a>
            </div>
          </div>

          {/* Slider Dots */}
          <div className="relative z-10 flex items-center gap-2 mt-6">
            {[0, 1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                onClick={() => setActiveSlide(dot)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === dot ? 'w-6 bg-amber-400' : 'w-2 bg-amber-400/40'
                }`}
                aria-label={`Slide ${dot + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column Cards (Col 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          {/* Card 1: Today's Divine Message */}
          <div className="bg-gradient-to-br from-[#fffbf5] to-[#fbf2e3] rounded-2xl p-5 border border-[#e8d5be] shadow-xs relative overflow-hidden flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#78131e] uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  Today's Divine Message
                </span>
                <Quote className="w-5 h-5 text-amber-600/30" />
              </div>

              <blockquote className="text-xs sm:text-sm text-stone-800 font-serif italic leading-relaxed my-2">
                "When you surrender to the Divine, life flows with grace."
              </blockquote>
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                — Bhagavad Gita
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-amber-200/60">
              <span className="text-[10px] text-stone-500">Sacred Word of the Day</span>
              <span className="text-xl">🪔</span>
            </div>
          </div>

          {/* Card 2: Talk to Astrologer */}
          <div className="bg-gradient-to-br from-[#122238] via-[#1a3152] to-[#0d1a2d] text-white rounded-2xl p-5 border border-sky-900/40 shadow-xs relative overflow-hidden flex-1 flex flex-col justify-between">
            {/* Zodiac Wheel Silhouette */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border-4 border-dashed border-amber-400/10 pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-amber-400 text-base">✨</span>
                <h3 className="text-sm sm:text-base font-bold text-amber-200">
                  Talk to Astrologer
                </h3>
              </div>
              <p className="text-xs text-sky-100/80 mb-3 leading-normal">
                Get guidance from verified astrologers on career, marriage, health & dosha remedies.
              </p>
            </div>

            <div>
              <a
                href="#astrologer-consult"
                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-900 text-xs font-bold py-2.5 px-4 rounded-lg shadow transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Start Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
