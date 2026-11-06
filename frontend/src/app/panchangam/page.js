'use client';

import React, { useState } from 'react';
import AdBanner from '../../components/AdBanner';
import { defaultPanchangamData } from '../../data/panchangamData';
import { 
  Calendar, Sunrise, Sunset, Moon, Sun, Clock, 
  Sparkles, ShieldAlert, CheckCircle2, Compass, 
  Hourglass, Share2, ChevronRight, Check
} from 'lucide-react';

export default function PanchangamPage() {
  const [selectedDayTab, setSelectedDayTab] = useState('today');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const data = defaultPanchangamData;

  const handleShare = () => {
    const text = `Astadasapeetam Daily Panchangam\nDate: ${data.dateFormatted}\nTithi: ${data.panchaAnga.tithi.name}\nNakshatra: ${data.panchaAnga.nakshatra.name}\nAbhijit Muhurtham: 11:48 AM – 12:40 PM\nRahu Kaal: 10:30 AM – 12:05 PM`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="w-full">
      {/* 1. Top Sponsored Banner Ad */}
      <AdBanner type="top-sponsored" />

      <div className="w-[98.5%] max-w-[1920px] mx-auto py-3 space-y-4">
        {/* 2. Hero Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#691c08] via-[#8c2d0f] to-[#b34017] text-white p-6 sm:p-8 shadow-xs border border-amber-900/40">
          <div 
            className="absolute inset-0 opacity-15 mix-blend-screen bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url('/images/art_akshaya_real.jpg')`
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold tracking-wide uppercase mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Surya Siddhanta Vedic Calendar</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white leading-tight mb-2">
              Daily Vedic Panchangam & Shubh Muhurtham
            </h1>

            <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed mb-5 max-w-2xl">
              Authentic daily astrological calculations including the 5 sacred limbs (Tithi, Vara, Nakshatra, Yoga, Karana), planetary transits, Abhijit Muhurtham, and Rahu Kaalam windows.
            </p>

            {/* Date Quick Switcher Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                suppressHydrationWarning
                onClick={() => setSelectedDayTab('today')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDayTab === 'today'
                    ? 'bg-amber-400 text-stone-900 shadow-sm'
                    : 'bg-stone-900/60 hover:bg-stone-900 text-amber-100 border border-amber-300/30'
                }`}
              >
                Today ({data.dateFormatted.split(',')[1] || '23 May 2026'})
              </button>

              <button
                suppressHydrationWarning
                onClick={() => setSelectedDayTab('tomorrow')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDayTab === 'tomorrow'
                    ? 'bg-amber-400 text-stone-900 shadow-sm'
                    : 'bg-stone-900/60 hover:bg-stone-900 text-amber-100 border border-amber-300/30'
                }`}
              >
                Tomorrow (24 May 2026)
              </button>

              <button
                suppressHydrationWarning
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? 'Panchangam Copied!' : 'Share Today\'s Panchangam'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Celestial Ephemeris Bar (Sunrise, Sunset, Moon, Rasi) */}
        <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3 sm:p-4 shadow-2xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/50">
              <span className="text-[10px] font-bold text-amber-900 uppercase flex items-center justify-center gap-1">
                <Sunrise className="w-3.5 h-3.5 text-amber-600" /> Sunrise
              </span>
              <span className="text-sm font-black text-stone-900 block mt-0.5">
                {data.ephemeris.sunrise}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-orange-50/70 border border-orange-200/50">
              <span className="text-[10px] font-bold text-orange-900 uppercase flex items-center justify-center gap-1">
                <Sunset className="w-3.5 h-3.5 text-orange-600" /> Sunset
              </span>
              <span className="text-sm font-black text-stone-900 block mt-0.5">
                {data.ephemeris.sunset}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-sky-50/70 border border-sky-200/50">
              <span className="text-[10px] font-bold text-sky-900 uppercase flex items-center justify-center gap-1">
                <Moon className="w-3.5 h-3.5 text-sky-600" /> Moonrise
              </span>
              <span className="text-sm font-black text-stone-900 block mt-0.5">
                {data.ephemeris.moonrise}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-indigo-50/70 border border-indigo-200/50">
              <span className="text-[10px] font-bold text-indigo-900 uppercase flex items-center justify-center gap-1">
                <Moon className="w-3.5 h-3.5 text-indigo-600" /> Moonset
              </span>
              <span className="text-sm font-black text-stone-900 block mt-0.5">
                {data.ephemeris.moonset}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/50">
              <span className="text-[10px] font-bold text-amber-900 uppercase flex items-center justify-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-600" /> Surya Rasi
              </span>
              <span className="text-xs font-bold text-stone-900 block mt-0.5 truncate">
                {data.ephemeris.suryaRasi.split(' ')[0]}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-rose-50/70 border border-rose-200/50">
              <span className="text-[10px] font-bold text-rose-900 uppercase flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" /> Chandra Rasi
              </span>
              <span className="text-xs font-bold text-stone-900 block mt-0.5 truncate">
                {data.ephemeris.chandraRasi.split(' ')[0]}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2">
            <span><strong>Samvatsaram:</strong> {data.hinduYear}</span>
            <span><strong>Ayana:</strong> {data.ayana}</span>
            <span><strong>Ritu:</strong> {data.ritu}</span>
            <span><strong>Masa & Paksha:</strong> {data.masa} • {data.paksha}</span>
          </div>
        </div>

        {/* 4. The 5 Limbs of Panchangam (Pancha-Anga Cards) */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🪔</span>
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#78131e] font-serif">
              The 5 Sacred Limbs (Pancha-Angas)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Tithi */}
            <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                <span className="text-[10px] font-extrabold uppercase text-[#78131e] tracking-wider">
                  1. Tithi (Lunar Phase)
                </span>
                <span className="text-xs">🌓</span>
              </div>
              <h3 className="font-serif font-black text-sm sm:text-base text-stone-900">
                {data.panchaAnga.tithi.name}
              </h3>
              <span className="text-xs font-bold text-amber-800 font-serif block mt-0.5">
                {data.panchaAnga.tithi.teluguName}
              </span>
              <p className="text-xs text-stone-600 mt-2">
                <strong>Ends:</strong> {data.panchaAnga.tithi.endsAt}
              </p>
              <p className="text-[10.5px] text-stone-500 mt-1 leading-snug">
                {data.panchaAnga.tithi.next}
              </p>
              <div className="mt-3 pt-2 border-t border-stone-100 text-[10px] text-amber-950 font-medium">
                Deity: {data.panchaAnga.tithi.deity}
              </div>
            </div>

            {/* Vara */}
            <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                <span className="text-[10px] font-extrabold uppercase text-[#78131e] tracking-wider">
                  2. Vaara (Solar Day)
                </span>
                <span className="text-xs">☀️</span>
              </div>
              <h3 className="font-serif font-black text-sm sm:text-base text-stone-900">
                {data.panchaAnga.vara.name}
              </h3>
              <span className="text-xs font-bold text-amber-800 font-serif block mt-0.5">
                {data.panchaAnga.vara.teluguName}
              </span>
              <p className="text-xs text-stone-600 mt-2">
                <strong>Lord:</strong> {data.panchaAnga.vara.graha}
              </p>
              <p className="text-[10.5px] text-stone-500 mt-1 leading-snug">
                {data.panchaAnga.vara.nature}
              </p>
              <div className="mt-3 pt-2 border-t border-stone-100 text-[10px] text-amber-950 font-medium">
                Deity: {data.panchaAnga.vara.deity}
              </div>
            </div>

            {/* Nakshatra */}
            <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                <span className="text-[10px] font-extrabold uppercase text-[#78131e] tracking-wider">
                  3. Nakshatra (Star)
                </span>
                <span className="text-xs">✨</span>
              </div>
              <h3 className="font-serif font-black text-sm sm:text-base text-stone-900">
                {data.panchaAnga.nakshatra.name}
              </h3>
              <span className="text-xs font-bold text-amber-800 font-serif block mt-0.5">
                {data.panchaAnga.nakshatra.teluguName}
              </span>
              <p className="text-xs text-stone-600 mt-2">
                <strong>Ends:</strong> {data.panchaAnga.nakshatra.endsAt}
              </p>
              <p className="text-[10.5px] text-stone-500 mt-1 leading-snug">
                {data.panchaAnga.nakshatra.next}
              </p>
              <div className="mt-3 pt-2 border-t border-stone-100 text-[10px] text-amber-950 font-medium">
                Lord: {data.panchaAnga.nakshatra.lord}
              </div>
            </div>

            {/* Yoga */}
            <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                <span className="text-[10px] font-extrabold uppercase text-[#78131e] tracking-wider">
                  4. Yoga (Angular Sum)
                </span>
                <span className="text-xs">🧘</span>
              </div>
              <h3 className="font-serif font-black text-sm sm:text-base text-stone-900">
                {data.panchaAnga.yoga.name}
              </h3>
              <span className="text-xs font-bold text-amber-800 font-serif block mt-0.5">
                {data.panchaAnga.yoga.teluguName}
              </span>
              <p className="text-xs text-stone-600 mt-2">
                <strong>Ends:</strong> {data.panchaAnga.yoga.endsAt}
              </p>
              <p className="text-[10.5px] text-stone-500 mt-1 leading-snug">
                {data.panchaAnga.yoga.nature}
              </p>
              <div className="mt-3 pt-2 border-t border-stone-100 text-[10px] text-amber-950 font-medium">
                Deity: {data.panchaAnga.yoga.lord}
              </div>
            </div>

            {/* Karana */}
            <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-4 shadow-2xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                <span className="text-[10px] font-extrabold uppercase text-[#78131e] tracking-wider">
                  5. Karana (Half-Tithi)
                </span>
                <span className="text-xs">⏳</span>
              </div>
              <h3 className="font-serif font-black text-sm sm:text-base text-stone-900">
                {data.panchaAnga.karana.name}
              </h3>
              <span className="text-xs font-bold text-amber-800 font-serif block mt-0.5">
                {data.panchaAnga.karana.teluguName}
              </span>
              <p className="text-xs text-stone-600 mt-2">
                <strong>Ends:</strong> {data.panchaAnga.karana.endsAt}
              </p>
              <p className="text-[10.5px] text-stone-500 mt-1 leading-snug">
                {data.panchaAnga.karana.nature}
              </p>
              <div className="mt-3 pt-2 border-t border-stone-100 text-[10px] text-amber-950 font-medium">
                Lord: {data.panchaAnga.karana.lord}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Auspicious vs Inauspicious Timings Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Shubh Muhurtham (Auspicious) */}
          <div className="bg-[#fffdfa] rounded-2xl border-2 border-emerald-500/30 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-serif font-black text-sm sm:text-base text-emerald-950">
                    Auspicious Timings (Shubh Kaal)
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Ideal hours for ceremonies, journeys, business, and pooja
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                5 Windows
              </span>
            </div>

            <div className="space-y-2.5">
              {data.shubhTimings.map((slot, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-emerald-950">
                        {slot.name}
                      </span>
                      {slot.isBest && (
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-400 text-stone-950">
                          Supreme Muhurtham
                        </span>
                      )}
                    </div>
                    <p className="text-[10.5px] text-stone-600 mt-0.5">
                      {slot.desc}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-black text-emerald-900 bg-white px-2 py-1 rounded-md border border-emerald-200 shrink-0">
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ashubh Kaal (Inauspicious - To Avoid) */}
          <div className="bg-[#fffdfa] rounded-2xl border-2 border-rose-500/30 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                  ✕
                </div>
                <div>
                  <h3 className="font-serif font-black text-sm sm:text-base text-rose-950">
                    Inauspicious Timings (Ashubh Kaal)
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Time slots to avoid commencing new ventures or solemn vows
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-900">
                To Avoid
              </span>
            </div>

            <div className="space-y-2.5">
              {data.ashubhTimings.map((slot, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-rose-50/50 border border-rose-200/60 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-rose-950">
                      {slot.name}
                    </span>
                    <p className="text-[10.5px] text-stone-600 mt-0.5">
                      {slot.desc}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-black text-rose-900 bg-white px-2 py-1 rounded-md border border-rose-200 shrink-0">
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Day Choghadiya Timings Table */}
        <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-black text-sm sm:text-base text-stone-900">
                Day Choghadiya Timings (Surya Udaya to Astama)
              </h3>
              <p className="text-[11px] text-stone-500">
                Traditional Vedic time divisions for immediate action and journeys
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800">
              8 Choghadiyas
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {data.dayChoghadiya.map((chog, idx) => {
              const bg = chog.type === 'best' 
                ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
                : chog.type === 'good'
                ? 'bg-amber-100 border-amber-300 text-amber-950'
                : chog.type === 'normal'
                ? 'bg-stone-100 border-stone-200 text-stone-800'
                : 'bg-rose-50 border-rose-200 text-rose-900';

              return (
                <div key={idx} className={`p-2.5 rounded-xl border text-center ${bg}`}>
                  <span className="text-xs font-black block leading-tight">
                    {chog.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] font-semibold block mt-0.5 opacity-80">
                    {chog.name.split('(')[1]?.replace(')', '') || ''}
                  </span>
                  <span className="text-[9.5px] font-mono font-medium block mt-1.5 opacity-90">
                    {chog.time.replace(/AM|PM/g, '')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
