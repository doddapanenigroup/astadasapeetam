import React from 'react';
import { dailyPanchangam } from '../data/mockData';
import AdBanner from './AdBanner';
import { Calendar, Radio, Sparkles, ChevronRight, Sun, Sunset, Sunrise } from 'lucide-react';

export default function SidebarWidgets() {
  return (
    <aside className="space-y-5">
      {/* 1. Top Sidebar Ad Slot */}
      <AdBanner type="sidebar" label="Ad Space 1" />

      {/* 2. Daily Panchangam Card */}
      <div className="bg-white rounded-2xl p-4 border border-[#ebdcc7] shadow-xs">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-200">
          <h3 className="text-sm font-bold text-[#78131e] font-serif uppercase tracking-wide flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-600" />
            Daily Panchangam
          </h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-stone-100">
            <span className="text-stone-500 font-medium">Tithi</span>
            <span className="font-bold text-stone-900">{dailyPanchangam.tithi}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-stone-100">
            <span className="text-stone-500 font-medium">Nakshatra</span>
            <span className="font-bold text-stone-900">{dailyPanchangam.nakshatra}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-stone-100 text-rose-700">
            <span className="font-medium">Rahukalam</span>
            <span className="font-bold">{dailyPanchangam.rahukalam}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-stone-100 text-amber-700">
            <span className="font-medium">Yamagandam</span>
            <span className="font-bold">{dailyPanchangam.yamagandam}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-stone-100">
            <span className="text-stone-500 font-medium flex items-center gap-1">
              <Sunrise className="w-3 h-3 text-amber-500" /> Sunrise
            </span>
            <span className="font-bold text-stone-800">{dailyPanchangam.sunrise}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-stone-500 font-medium flex items-center gap-1">
              <Sunset className="w-3 h-3 text-amber-600" /> Sunset
            </span>
            <span className="font-bold text-stone-800">{dailyPanchangam.sunset}</span>
          </div>
        </div>

        <a
          href="#full-panchangam"
          className="mt-4 block w-full text-center bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold py-2 rounded-lg transition-colors"
        >
          View Full Panchangam &rarr;
        </a>
      </div>

      {/* 3. Upcoming Festival Card (Hanuman Jayanti) */}
      <div className="bg-gradient-to-br from-[#fff7ed] to-[#fed7aa]/30 rounded-2xl p-4 border border-orange-200 shadow-xs relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="max-w-[65%]">
            <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block">
              Upcoming Festival
            </span>
            <h4 className="text-base font-serif font-black text-amber-950 mt-0.5">
              Hanuman Jayanti
            </h4>
            <div className="text-xs text-orange-900 font-medium mt-1">
              23 May 2026
            </div>
            <a
              href="#hanuman-jayanti"
              className="mt-3 inline-block bg-[#b45309] hover:bg-[#92400e] text-white text-[11px] font-bold px-3 py-1.5 rounded shadow-xs"
            >
              View Details
            </a>
          </div>

          <div className="text-5xl drop-shadow-md select-none">
            🚩
          </div>
        </div>
      </div>

      {/* 4. Live TV Broadcast Banner */}
      <div className="bg-[#78131e] text-white rounded-2xl p-4 border border-[#941b27] shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-xs uppercase tracking-widest text-amber-300 flex items-center gap-1.5 font-serif">
            <Radio className="w-4 h-4 text-red-300 animate-pulse" />
            LIVE TV
          </span>
          <span className="bg-red-600 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full animate-pulse">
            LIVE
          </span>
        </div>

        <p className="text-xs text-amber-100/90 leading-snug mb-3">
          Watch Devotional Programs Live 24x7 Spiritual Bhajans & Pravachans
        </p>

        <a
          href="#livetv"
          className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-900 text-xs font-bold px-3 py-1.5 rounded-md transition-colors"
        >
          Watch Now &rarr;
        </a>
      </div>

      {/* 5. Daily Inspiration (Buddha Quote) */}
      <div className="bg-gradient-to-br from-[#faf8f5] to-[#f4ece1] rounded-2xl p-4 border border-[#e2d5c3] shadow-xs">
        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
          Daily Inspiration
        </span>
        <blockquote className="text-xs font-serif italic text-stone-800 leading-relaxed">
          "The mind is everything. What you think, you become."
        </blockquote>
        <div className="text-[11px] font-bold text-amber-800 mt-2">
          — Lord Buddha
        </div>
        <div className="mt-3 flex justify-end text-3xl">
          🧘
        </div>
      </div>

      {/* 6. Lower Sidebar Ad Slot */}
      <AdBanner type="sidebar" label="Ad Space 2" />
    </aside>
  );
}
