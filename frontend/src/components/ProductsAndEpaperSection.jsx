import React from 'react';
import { devotionalProducts, upcomingFestivalsList } from '../data/mockData';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function ProductsAndEpaperSection() {
  return (
    <section className="my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* 1. Left Box: Recommended Devotional Products (Col 7) */}
        <div className="lg:col-span-7 bg-[#fdfbf7] rounded-2xl border border-[#ebdcc7] p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-3">
              <h3 className="text-sm font-bold text-[#4a0d12] font-serif">
                Recommended Devotional Products
              </h3>
              <a href="#store" className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 flex items-center">
                View Products &rsaquo;
              </a>
            </div>

            {/* Products Row with Navigation Arrows */}
            <div className="relative flex items-center gap-1.5">
              <button 
                className="w-5 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 shrink-0"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 flex-1">
                {devotionalProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-[#efe6d8] p-2 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <div className="h-20 sm:h-22 w-full flex items-center justify-center overflow-hidden mb-1.5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-[11px] text-stone-800 truncate leading-tight">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-stone-100">
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
                className="w-5 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 shrink-0"
                aria-label="Next products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Middle Box: Upcoming Festivals (Col 2.5) */}
        <div className="lg:col-span-2 xl:col-span-2.5 bg-[#fdfbf7] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-1.5 mb-2">
              <h4 className="text-xs font-bold text-[#4a0d12] font-serif">
                Upcoming Festivals
              </h4>
              <a href="/festivals" className="text-[10px] font-bold text-sky-800 hover:text-sky-950 flex items-center">
                View All &rsaquo;
              </a>
            </div>

            <div className="space-y-2 mt-1">
              {upcomingFestivalsList.map((fest) => (
                <div key={fest.id} className="flex items-center gap-2.5 py-0.5">
                  <div className="w-7 h-7 shrink-0 overflow-hidden rounded flex items-center justify-center">
                    <img src={fest.iconImg} alt={fest.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="leading-tight">
                    <span className="block text-xs font-bold text-stone-800">
                      {fest.name}
                    </span>
                    <span className="block text-[10px] text-stone-500 font-medium">
                      {fest.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Right Box: Special Offers & E-Paper (Col 2.5) */}
        <div className="lg:col-span-3 xl:col-span-2.5 flex flex-col justify-between gap-2.5">
          {/* Top: Special Offers */}
          <div className="bg-[#fdfbf7] rounded-2xl border border-[#ebdcc7] p-3 shadow-2xs flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1 mb-1">
              <h4 className="text-xs font-bold text-[#78131e] font-serif">
                Special Offers
              </h4>
              <a href="#offers" className="text-[10px] font-bold text-sky-800 hover:text-sky-950 flex items-center">
                View All &rsaquo;
              </a>
            </div>

            <div className="flex items-center gap-2.5 mt-0.5">
              <img
                src="/images/special_offer_thali.png"
                alt="Pooja Kits Special Offer"
                className="w-18 h-14 object-contain shrink-0"
              />
              <div>
                <h5 className="text-xs font-bold text-stone-900 leading-tight">
                  Pooja Kits
                </h5>
                <span className="text-[10px] font-semibold text-stone-600 block mt-0.5">
                  Upto 20% OFF
                </span>
                <a
                  href="#shop-kits"
                  className="mt-1.5 inline-block bg-white hover:bg-amber-50 border border-[#c5932a] text-[#78131e] text-[9px] font-bold px-2.5 py-0.5 rounded shadow-2xs transition-colors"
                >
                  Shop Now &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Bottom: E-Paper */}
          <div className="bg-[#fdfbf7] rounded-2xl border border-[#ebdcc7] p-3 shadow-2xs flex-1 flex flex-col justify-between">
            <h4 className="text-xs font-bold text-[#78131e] font-serif mb-1">
              E-Paper
            </h4>

            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] text-stone-700 leading-snug max-w-[130px] mb-1.5">
                  Read Today's Devotional News Paper Online
                </p>
                <a
                  href="#epaper"
                  className="inline-block bg-[#78131e] hover:bg-[#600e17] text-white text-[9px] font-bold px-3 py-1 rounded shadow-2xs transition-colors"
                >
                  Read Now &rarr;
                </a>
              </div>
              <img
                src="/images/epaper_thumb.png"
                alt="E-Paper Today"
                className="w-12 h-14 object-contain rounded border border-stone-200 shadow-2xs shrink-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
