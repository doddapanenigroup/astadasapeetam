import React from 'react';
import { devotionalProducts, upcomingFestivalsList } from '../data/mockData';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function ProductsAndFestivalsRow() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-stretch h-full flex-1">
      {/* 1. Recommended Devotional Products (Col 8) */}
      <div className="xl:col-span-8 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-4 shadow-2xs flex flex-col justify-between h-full">
        <div className="flex-1 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2">
            <h3 className="text-xs sm:text-sm font-bold text-[#4a0d12] font-serif">
              Recommended Devotional Products
            </h3>
            <a href="#store" className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 flex items-center">
              View Products &rsaquo;
            </a>
          </div>

          {/* Products Row with Navigation Arrows */}
          <div className="relative flex items-center gap-1.5 flex-1">
            <button 
              className="w-4 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 shrink-0"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 flex-1 h-full items-stretch">
              {devotionalProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-[#efe6d8] p-2.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between h-full group"
                >
                  <div className="h-28 sm:h-32 w-full flex items-center justify-center overflow-hidden mb-1.5 bg-stone-50/50 rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[10.5px] sm:text-[11px] text-stone-800 truncate leading-tight">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-stone-100">
                      <span className="font-bold text-xs text-stone-900">
                        ₹ {product.price}
                      </span>
                      <span className="flex items-center text-[10px] text-stone-600 font-medium">
                        <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500 mr-0.5" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="w-4 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 shrink-0"
              aria-label="Next products"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Upcoming Festivals (Col 4) */}
      <div className="xl:col-span-4 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-4 shadow-2xs flex flex-col justify-between h-full">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
          <h4 className="text-xs font-bold text-[#4a0d12] font-serif">
            Upcoming Festivals
          </h4>
          <a href="#festivals" className="text-[10px] font-bold text-sky-800 hover:text-sky-950 flex items-center">
            View All &rsaquo;
          </a>
        </div>

        <div className="flex-1 flex flex-col justify-around py-1">
          {upcomingFestivalsList.map((fest) => (
            <div key={fest.id} className="flex items-center gap-3 py-2 border-b border-stone-50 last:border-0">
              <div className="w-9 h-9 shrink-0 overflow-hidden rounded flex items-center justify-center">
                <img src={fest.iconImg} alt={fest.name} className="w-full h-full object-contain" />
              </div>
              <div className="leading-tight">
                <span className="block text-xs font-bold text-stone-800">
                  {fest.name}
                </span>
                <span className="block text-[10.5px] text-stone-500 font-medium mt-0.5">
                  {fest.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
