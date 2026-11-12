import React from 'react';
import Link from 'next/link';
import { devotionalProducts, upcomingFestivalsList } from '../data/mockData';
import { ChevronLeft, ChevronRight, Star, Calendar } from 'lucide-react';

export default function ProductsAndFestivalsRow() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
      
      {/* 1. Recommended Devotional Products (Col 8) */}
      <div className="xl:col-span-8 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 sm:p-4 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-100">
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
        <div className="relative flex items-center gap-1.5">
          <button 
            type="button"
            className="w-5 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 shrink-0 cursor-pointer transition-colors"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 5 Compact Product Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 flex-1">
            {devotionalProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#efe6d8] p-2 sm:p-2.5 shadow-2xs hover:shadow-xs hover:border-amber-300 transition-all flex flex-col group"
              >
                {/* Compact Image Container */}
                <div className="h-20 sm:h-22 w-full flex items-center justify-center overflow-hidden mb-2 bg-stone-50/70 rounded-lg p-1.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-200"
                  />
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-[11px] text-stone-800 truncate leading-tight group-hover:text-[#78131e] transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[11px]">
                    <span className="font-bold text-stone-900">
                      ₹ {product.price}
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
            className="w-5 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 shrink-0 cursor-pointer transition-colors"
            aria-label="Next products"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Upcoming Festivals (Col 4) */}
      <div className="xl:col-span-4 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 sm:p-4 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-100">
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
        <div className="space-y-1.5">
          {upcomingFestivalsList.map((fest) => (
            <div 
              key={fest.id} 
              className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-amber-50/50 transition-colors border border-transparent hover:border-amber-200/40"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 shrink-0 overflow-hidden rounded-lg bg-amber-50 border border-amber-200/50 flex items-center justify-center p-0.5">
                  <img 
                    src={fest.iconImg} 
                    alt={fest.name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="leading-tight">
                  <span className="block text-xs font-serif font-bold text-stone-900">
                    {fest.name}
                  </span>
                  <span className="block text-[10.5px] text-amber-900/80 font-medium mt-0.5">
                    {fest.date}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md shrink-0">
                2026
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
