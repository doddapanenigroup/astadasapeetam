import React from 'react';
import { dailyPanchangam } from '../data/mockData';
import AdBanner from './AdBanner';
import { Calendar, Radio, Quote, PhoneCall, Sunrise, Sunset } from 'lucide-react';

export default function RightSidebarFull() {
  return (
    <aside className="space-y-4">
      {/* 1. Today's Divine Message */}
      <div className="bg-[#fffdfa] rounded-2xl p-4 border border-[#ebdcc7] shadow-2xs relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <span className="text-[11px] font-bold text-[#78131e] uppercase tracking-wider block mb-1">
              Today's Divine Message
            </span>
            <div className="text-amber-600/40 font-serif text-3xl leading-none -mt-1 select-none">
              “
            </div>
            <blockquote className="text-xs text-stone-800 font-serif italic leading-relaxed -mt-1 mb-1.5">
              When you surrender to the Divine, life flows with grace.
            </blockquote>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block">
              — Bhagavad Gita
            </span>
          </div>

          <div className="w-16 h-16 shrink-0 flex items-center justify-center">
            <img
              src="/images/diya_message.png"
              alt="Sacred Diya"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* 2. Talk to Astrologer Promo Card */}
      <div className="bg-gradient-to-br from-[#122238] via-[#1a3152] to-[#0d1a2d] text-white rounded-2xl p-4 border border-sky-900/40 shadow-2xs relative overflow-hidden">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-amber-400 text-sm">✨</span>
          <h4 className="text-xs sm:text-sm font-bold text-amber-200">
            Talk to Astrologer
          </h4>
        </div>
        <p className="text-[11px] text-sky-100/80 mb-2.5 leading-snug">
          Get guidance from verified astrologers.
        </p>
        <a
          href="#consult"
          className="inline-flex items-center justify-center gap-1.5 w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-900 text-xs font-bold py-2 px-3 rounded-lg shadow-xs transition-colors"
        >
          <PhoneCall className="w-3 h-3" />
          Start Consultation
        </a>
      </div>

      {/* 3. Top Sidebar Ad Slot (300x250) */}
      <AdBanner slotId="slot-3" type="sidebar" label="Right Sidebar Ad (300x250)" />

      {/* 4. Daily Panchangam */}
      <div className="bg-[#fffdfa] rounded-2xl p-4 border border-[#ebdcc7] shadow-2xs">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-amber-200/80">
          <h4 className="text-xs font-bold text-[#78131e] font-serif uppercase tracking-wide flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            Daily Panchangam
          </h4>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between py-0.5 border-b border-stone-100">
            <span className="text-stone-500 font-medium">Tithi</span>
            <span className="font-bold text-stone-900">{dailyPanchangam.tithi}</span>
          </div>
          <div className="flex justify-between py-0.5 border-b border-stone-100">
            <span className="text-stone-500 font-medium">Nakshatra</span>
            <span className="font-bold text-stone-900">{dailyPanchangam.nakshatra}</span>
          </div>
          <div className="flex justify-between py-0.5 border-b border-stone-100 text-rose-700">
            <span className="font-medium">Rahukalam</span>
            <span className="font-bold">{dailyPanchangam.rahukalam}</span>
          </div>
          <div className="flex justify-between py-0.5 border-b border-stone-100 text-amber-700">
            <span className="font-medium">Yamagandam</span>
            <span className="font-bold">{dailyPanchangam.yamagandam}</span>
          </div>
          <div className="flex justify-between py-0.5 border-b border-stone-100">
            <span className="text-stone-500 font-medium flex items-center gap-1">
              <Sunrise className="w-3 h-3 text-amber-500" /> Sunrise
            </span>
            <span className="font-bold text-stone-800">{dailyPanchangam.sunrise}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-stone-500 font-medium flex items-center gap-1">
              <Sunset className="w-3 h-3 text-amber-600" /> Sunset
            </span>
            <span className="font-bold text-stone-800">{dailyPanchangam.sunset}</span>
          </div>
        </div>

        <a
          href="#panchangam"
          className="mt-3 block w-full text-center bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold py-1.5 rounded-lg transition-colors"
        >
          View Full Panchangam &rarr;
        </a>
      </div>

      {/* 5. Upcoming Festival Spotlight (Hanuman Jayanti) */}
      <div className="bg-gradient-to-br from-[#fff7ed] to-[#fed7aa]/30 rounded-2xl p-4 border border-orange-200 shadow-2xs relative overflow-hidden">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block">
              Upcoming Festival
            </span>
            <h4 className="text-sm font-serif font-black text-amber-950 mt-0.5">
              Hanuman Jayanti
            </h4>
            <div className="text-[11px] text-orange-900 font-medium mt-0.5">
              23 May 2026
            </div>
            <a
              href="#hanuman-jayanti"
              className="mt-2.5 inline-block bg-[#b45309] hover:bg-[#92400e] text-white text-[10px] font-bold px-3 py-1 rounded shadow-2xs"
            >
              View Details
            </a>
          </div>

          <div className="w-16 h-20 shrink-0 flex items-center justify-center">
            <img
              src="/images/hanuman_jayanti.png"
              alt="Lord Hanuman"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* 6. Live TV Broadcast Banner */}
      <div className="bg-[#78131e] text-white rounded-2xl p-3.5 border border-[#941b27] shadow-2xs relative overflow-hidden">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-xs uppercase tracking-widest text-amber-300 flex items-center gap-1.5 font-serif">
            <Radio className="w-3.5 h-3.5 text-red-300 animate-pulse" />
            LIVE TV
          </span>
          <span className="bg-red-600 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full animate-pulse">
            LIVE
          </span>
        </div>

        <p className="text-[11px] text-amber-100/90 leading-snug mb-2.5">
          Watch Devotional Programs Live 24x7 Spiritual Bhajans & Pravachans
        </p>

        <a
          href="#livetv"
          className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-stone-900 text-[10px] font-bold px-3 py-1 rounded transition-colors"
        >
          Watch Now &rarr;
        </a>
      </div>

      {/* 7. Daily Inspiration (Lord Buddha) */}
      <div className="bg-[#fffdfa] rounded-2xl p-4 border border-[#e2d5c3] shadow-2xs">
        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
          Daily Inspiration
        </span>
        <blockquote className="text-[11px] font-serif italic text-stone-800 leading-relaxed">
          "The mind is everything. What you think, you become."
        </blockquote>
        <div className="flex items-end justify-between mt-2">
          <span className="text-[10px] font-bold text-amber-800">
            — Lord Buddha
          </span>
          <div className="w-12 h-14 shrink-0 flex items-center justify-center">
            <img
              src="/images/buddha_quote.png"
              alt="Lord Buddha"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* 8. Lower Sidebar Ad Slot (300x250) */}
      <AdBanner type="sidebar" label="Ad Space" />

      {/* 9. Special Offers Card */}
      <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-2xs">
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-100">
          <h4 className="text-xs font-bold text-[#78131e] font-serif">
            Special Offers
          </h4>
          <a href="#offers" className="text-[10px] font-bold text-sky-800 hover:text-sky-950 flex items-center">
            View All &rsaquo;
          </a>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="/images/special_offer_thali.png"
            alt="Pooja Kits Offer"
            className="w-20 h-16 object-contain shrink-0"
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

      {/* 10. E-Paper Card */}
      <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-2xs">
        <h4 className="text-xs font-bold text-[#78131e] font-serif mb-1.5">
          E-Paper
        </h4>

        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] text-stone-700 leading-snug max-w-[130px] mb-2">
              Read Today's Devotional News Paper Online
            </p>
            <a
              href="#epaper"
              className="inline-block bg-[#78131e] hover:bg-[#5e0d16] text-white text-[9px] font-bold px-3 py-1 rounded shadow-2xs transition-colors"
            >
              Read Now &rarr;
            </a>
          </div>
          <img
            src="/images/epaper_thumb.png"
            alt="E-Paper"
            className="w-12 h-14 object-contain rounded border border-stone-200 shadow-2xs shrink-0"
          />
        </div>
      </div>
    </aside>
  );
}
