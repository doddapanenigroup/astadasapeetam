import React from 'react';
import { latestArticles, latestVideos } from '../data/mockData';
import { ChevronRight, Play, BookOpen, Video } from 'lucide-react';

export default function ArticlesAndVideos() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Left: Latest Articles (Col 7) */}
        <div className="lg:col-span-7 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-2xs flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b-2 border-[#78131e]">
              <h3 className="text-xs sm:text-sm font-bold text-[#78131e] uppercase tracking-wide font-serif flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                Latest Articles
              </h3>
              <a href="#all-articles" className="text-[10px] font-semibold text-stone-500 hover:text-[#78131e] flex items-center">
                View All <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {latestArticles.map((article) => (
                <a
                  key={article.id}
                  href="#article"
                  className="bg-white rounded-xl border border-[#ebdcc7] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col justify-between h-full"
                >
                  <div className="relative h-28 w-full overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-[#78131e] text-white text-[8px] font-bold uppercase px-1.5 py-0.5 rounded shadow-2xs">
                      {article.category}
                    </span>
                    <span className="absolute bottom-1 right-1.5 text-[8px] text-white/90 bg-black/60 px-1.5 py-0.5 rounded">
                      {article.date}
                    </span>
                  </div>
                  <div className="p-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-[11px] text-stone-900 group-hover:text-[#78131e] line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-[9.5px] text-stone-600 line-clamp-2 mt-1 leading-normal">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-2 pt-1 border-t border-stone-50">
                      <span className="text-[10px] font-bold text-[#78131e] group-hover:underline inline-flex items-center">
                        Read Article &rsaquo;
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Latest Videos (Col 5) */}
        <div className="lg:col-span-5 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-2xs flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b-2 border-amber-600">
              <h3 className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wide font-serif flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-700" />
                Latest Videos
              </h3>
              <a href="#all-videos" className="text-[10px] font-semibold text-stone-500 hover:text-amber-800 flex items-center">
                View All <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {latestVideos.map((video) => (
                <a
                  key={video.id}
                  href="#watch"
                  className="bg-white rounded-xl border border-[#ebdcc7] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col justify-between h-full"
                >
                  <div className="relative h-28 w-full overflow-hidden bg-stone-900 shrink-0">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-black/60 group-hover:bg-[#78131e] text-white flex items-center justify-center transition-colors shadow-xs">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-amber-300" />
                      </div>
                    </div>
                  </div>
                  <div className="p-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-[10.5px] text-stone-900 truncate leading-tight group-hover:text-[#78131e]">
                        {video.title}
                      </h4>
                      <span className="text-[9px] text-stone-500 truncate block mt-0.5">
                        {video.sub}
                      </span>
                    </div>
                    <div className="mt-2 pt-1 border-t border-stone-50">
                      <span className="text-[9.5px] font-bold text-amber-800 group-hover:underline inline-flex items-center">
                        Watch Now &rsaquo;
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
