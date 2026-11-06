'use client';

import React from 'react';
import { Mail, Smartphone, BellRing } from 'lucide-react';

export default function FooterNewsletterApp() {
  return (
    <section className="my-8 space-y-4">
      {/* 1. Newsletter Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#4a0d12] via-[#6e151e] to-[#4a0d12] text-white p-5 sm:p-6 shadow-md border border-amber-600/30 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-2xl shrink-0">
            🪔
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-serif font-black text-amber-200">
              Get Daily Devotional Updates
            </h3>
            <p className="text-xs text-amber-100/80 mt-0.5">
              Spiritual News, Festivals, Panchangam, Temple Updates & More
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto flex-1 max-w-md">
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                suppressHydrationWarning
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white text-stone-900 placeholder-stone-400 text-xs py-2.5 pl-9 pr-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
              />
            </div>
            <button
              suppressHydrationWarning
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow transition-colors shrink-0 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* 2. Download App Banner */}
      <div className="rounded-2xl bg-white border border-[#ebdcc7] p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
              Download Astadasapeetam App
            </h4>
            <p className="text-xs text-stone-500">
              Spiritual content, Live TV, Panchangam & More directly on your phone
            </p>
          </div>
        </div>

        {/* App Store Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#playstore"
            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-1.5 rounded-lg text-left shadow-xs transition-colors"
          >
            <span className="text-xl">▶</span>
            <div className="leading-tight">
              <span className="text-[9px] uppercase tracking-wider block text-stone-400">GET IT ON</span>
              <span className="text-xs font-bold font-sans">Google Play</span>
            </div>
          </a>

          <a
            href="#appstore"
            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-1.5 rounded-lg text-left shadow-xs transition-colors"
          >
            <span className="text-xl">🍏</span>
            <div className="leading-tight">
              <span className="text-[9px] uppercase tracking-wider block text-stone-400">Download on the</span>
              <span className="text-xs font-bold font-sans">App Store</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
