import React from 'react';
import { devotionalNews, festivalsAndEvents, popularTemples } from '../data/mockData';
import { ChevronRight } from 'lucide-react';

export default function MainDevotionalGrid() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-stretch">
      {/* 1. Devotional News (Col 5) */}
      <div className="xl:col-span-5 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-2xs flex flex-col justify-between h-full">
        <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b-2 border-[#78131e]">
          <h3 className="text-xs sm:text-sm font-bold text-[#78131e] uppercase tracking-wide font-serif">
            Devotional News
          </h3>
          <a href="#all-news" className="text-[10px] font-semibold text-stone-500 hover:text-[#78131e] flex items-center">
            View All <ChevronRight className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
          {devotionalNews.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl border border-[#ebdcc7] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between h-full group"
            >
              <div className="relative h-28 sm:h-30 w-full overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-1.5 left-1.5 ${item.tagColor} text-white text-[8px] font-bold uppercase px-1.5 py-0.5 rounded shadow-2xs`}>
                  {item.tag}
                </span>
                <span className="absolute bottom-1 right-1.5 bg-black/75 backdrop-blur-xs text-white text-[8px] px-1.5 py-0.5 rounded">
                  {item.date}
                </span>
              </div>
              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[11px] text-stone-900 line-clamp-2 group-hover:text-[#78131e] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[9.5px] text-stone-600 line-clamp-2 mt-1 leading-normal">
                    {item.excerpt}
                  </p>
                </div>
                <div className="mt-2 pt-1 border-t border-stone-50">
                  <a href={item.readMoreUrl} className="inline-flex items-center text-[10px] font-bold text-[#78131e] hover:underline">
                    Read More &rsaquo;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Festivals & Events (Col 4) */}
      <div className="xl:col-span-4 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-2xs flex flex-col justify-between h-full">
        <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b-2 border-amber-600">
          <h3 className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wide font-serif">
            Festivals & Events
          </h3>
          <a href="/festivals" className="text-[10px] font-semibold text-stone-500 hover:text-amber-800 flex items-center">
            View All <ChevronRight className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
          {festivalsAndEvents.map((festival) => (
            <div 
              key={festival.id} 
              className="bg-white rounded-xl border border-[#ebdcc7] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between h-full group"
            >
              <div className="relative h-28 sm:h-30 w-full overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={festival.image}
                  alt={festival.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Date Badge */}
                <div className="absolute top-1.5 left-1.5 bg-stone-900/90 text-white rounded text-center px-1.5 py-0.5 shadow-2xs border border-white/20">
                  <span className="block text-[11px] font-black text-amber-300 leading-none">
                    {festival.day}
                  </span>
                  <span className="block text-[7px] font-bold uppercase tracking-wider text-stone-200">
                    {festival.month}
                  </span>
                </div>
              </div>
              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[11px] text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                    {festival.title}
                  </h4>
                  <p className="text-[9.5px] text-stone-600 line-clamp-2 mt-1 leading-normal">
                    {festival.excerpt}
                  </p>
                </div>
                <div className="mt-2 pt-1 border-t border-stone-50">
                  <a href="#details" className="inline-flex items-center text-[10px] font-bold text-amber-800 hover:underline">
                    View Details &rsaquo;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Popular Temples (Col 3) */}
      <div className="xl:col-span-3 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-2xs flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b-2 border-[#8b5a2b]">
            <h3 className="text-xs sm:text-sm font-bold text-[#8b5a2b] uppercase tracking-wide font-serif">
              Popular Temples
            </h3>
            <a href="#all-temples" className="text-[10px] font-semibold text-stone-500 hover:text-[#8b5a2b] flex items-center">
              View All <ChevronRight className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-1.5">
            {popularTemples.map((temple) => (
              <a
                key={temple.id}
                href="#temple"
                className="flex items-center gap-2.5 p-1.5 rounded-xl bg-white border border-[#ebdcc7] hover:border-amber-400 hover:shadow-2xs transition-all group"
              >
                <div className="w-10 h-8 rounded-lg overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                  <img
                    src={temple.image}
                    alt={temple.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[10.5px] text-stone-800 group-hover:text-[#78131e] truncate leading-tight">
                    {temple.name}
                  </h4>
                  <span className="text-[9px] text-stone-500 truncate block mt-0.5">
                    {temple.state}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
