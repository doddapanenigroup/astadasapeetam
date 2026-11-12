'use client';

import React from 'react';
import Link from 'next/link';
import { devotionalProducts, upcomingFestivalsList } from '../data/mockData';
import { ChevronLeft, ChevronRight, Star, Calendar, ExternalLink } from 'lucide-react';
import AdBanner from './AdBanner';

export default function ProductsAndFestivalsRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch w-full">
      
      {/* 1. Recommended Devotional Products (Col 6 on LG, Col 6 on XL) */}
      <div className="lg:col-span-6 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-amber-100/80">
          <h3 className="text-xs sm:text-sm font-bold text-[#4a0d12] font-serif flex items-center gap-1.5">
            <span>🪔</span>
            <span>Recommended Devotional Products</span>
          </h3>
          <Link 
            href="/marketplace" 
            className="text-[11px] font-semibold text-stone-500 hover:text-stone-900 flex items-center transition-colors"
          >
            <span>View Products</span>
            <span className="ml-1 text-xs">&rsaquo;</span>
          </Link>
        </div>

        {/* Products Row with Navigation Arrows */}
        <div className="relative flex items-center gap-1.5 my-auto py-1">
          <button 
            type="button"
            className="w-4 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 shrink-0 cursor-pointer transition-colors"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* 5 Compact Product Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 flex-1">
            {devotionalProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#efe6d8] p-2 shadow-2xs hover:shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between group"
              >
                {/* Compact Image Container */}
                <div className="h-18 w-full flex items-center justify-center overflow-hidden mb-1.5 bg-stone-50/70 rounded-lg p-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Details */}
                <div className="space-y-0.5">
                  <h4 className="font-serif font-bold text-[10.5px] text-stone-800 truncate leading-tight group-hover:text-[#78131e] transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[10.5px]">
                    <span className="font-bold text-stone-900">
                      ₹{product.price}
                    </span>
                    <span className="flex items-center text-[10px] text-amber-700 font-semibold">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500 mr-0.5" />
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            type="button"
            className="w-4 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 shrink-0 cursor-pointer transition-colors"
            aria-label="Next products"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-[10px] text-stone-400 pt-1 text-right font-serif">
          100% Satvik Purity Guarantee
        </div>
      </div>

      {/* 2. Upcoming Festivals (Col 3 on LG, Col 3 on XL) */}
      <div className="lg:col-span-3 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-100/80">
          <h4 className="text-xs sm:text-sm font-bold text-[#4a0d12] font-serif flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>Upcoming Festivals</span>
          </h4>
          <Link 
            href="/festivals" 
            className="text-[10px] font-bold text-[#78131e] hover:text-[#991b1b] flex items-center transition-colors"
          >
            <span>View All</span>
            <span className="ml-0.5 text-xs">&rsaquo;</span>
          </Link>
        </div>

        {/* Compact Festival Items List */}
        <div className="space-y-1.5 my-auto py-1">
          {upcomingFestivalsList.map((fest) => (
            <div 
              key={fest.id} 
              className="flex items-center justify-between py-1 px-1.5 rounded-xl hover:bg-amber-50/50 transition-colors border border-transparent hover:border-amber-200/40"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 shrink-0 overflow-hidden rounded-lg bg-amber-50 border border-amber-200/50 flex items-center justify-center p-0.5">
                  <img 
                    src={fest.iconImg} 
                    alt={fest.name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="leading-tight">
                  <span className="block text-[11px] font-serif font-bold text-stone-900 truncate max-w-[120px]">
                    {fest.name}
                  </span>
                  <span className="block text-[10px] text-amber-900/80 font-medium">
                    {fest.date}
                  </span>
                </div>
              </div>

              <span className="text-[9.5px] font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded-md shrink-0">
                2026
              </span>
            </div>
          ))}
        </div>

        <div className="text-[10px] text-stone-400 pt-1 text-right font-serif">
          Panchangam Verified Dates
        </div>
      </div>

      {/* 3. The Ad (Google AdSense) (Col 3 on LG, Col 3 on XL) */}
      <div className="lg:col-span-3 bg-[#fcfdfe] rounded-2xl border border-[#dadce0] p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#1a73e8] transition-colors">
        {/* Google Ad Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#eceff1] text-[10px] text-stone-500 font-sans">
          <span className="font-bold flex items-center gap-1.5 text-[#1a73e8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] animate-pulse"></span>
            Ad · Google AdSense
          </span>
          <span className="flex items-center gap-1 text-stone-400">
            <span className="w-3 h-3 rounded-full border border-stone-300 text-[8px] flex items-center justify-center font-bold text-stone-500">i</span>
            <span>Advertisement</span>
          </span>
        </div>

        {/* Ad Center Content */}
        <div className="my-auto py-3 text-center space-y-2.5">
          <div className="w-10 h-10 mx-auto rounded-xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center shadow-2xs">
            <span className="font-sans font-black text-xl bg-gradient-to-r from-blue-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
              G
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-[#1a73e8] uppercase tracking-wider block">
              Sponsored Partner
            </span>
            <h4 className="text-xs font-black text-stone-900 font-sans tracking-tight leading-snug">
              Devotional Sacred Yatras &amp; Sevas
            </h4>
            <p className="text-[10.5px] text-stone-500 font-sans leading-tight">
              Personalized responsive partner advertisement
            </p>
          </div>

          <div>
            <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-[11px] font-sans font-bold shadow-2xs transition-colors cursor-pointer">
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Google Ad Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#eceff1] text-[9.5px] text-stone-400 font-sans uppercase tracking-wider">
          <span>Ads by Google</span>
          <span className="font-mono text-[9px]">300 × 250</span>
        </div>
      </div>

    </div>
  );
}
