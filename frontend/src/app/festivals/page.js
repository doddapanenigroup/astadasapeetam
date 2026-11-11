'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { festivalCategories, allFestivalsData } from '../../data/festivalsData';
import { 
  Search, Calendar, Clock, Sparkles, X, ChevronRight, 
  ExternalLink, Share2, Check, Flame, Moon, BookOpen, Heart
} from 'lucide-react';

export default function FestivalsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [copiedMantra, setCopiedMantra] = useState(false);

  // Month options for filter
  const monthsList = [
    { label: 'All Months', value: 'all' },
    { label: 'January (Makara)', value: 'JAN' },
    { label: 'February (Magha)', value: 'FEB' },
    { label: 'March (Chaitra)', value: 'MAR' },
    { label: 'April (Vaisakha)', value: 'APR' },
    { label: 'May (Jyeshtha)', value: 'MAY' },
    { label: 'June (Ashadha)', value: 'JUN' },
    { label: 'August (Sravana)', value: 'AUG' },
    { label: 'September (Bhadrapada)', value: 'SEP' },
    { label: 'October (Ashwina)', value: 'OCT' },
    { label: 'November (Kartika)', value: 'NOV' },
    { label: 'December (Margashirsha)', value: 'DEC' },
  ];

  // Filter festivals based on category, month, and search query
  const filteredFestivals = useMemo(() => {
    return allFestivalsData.filter(fest => {
      // Category match
      const categoryMatch = activeCategory === 'all' 
        ? true 
        : fest.categories.includes(activeCategory);

      // Month match
      const monthMatch = selectedMonth === 'all' 
        ? true 
        : fest.month === selectedMonth;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const searchMatch = !q || (
        fest.name.toLowerCase().includes(q) ||
        fest.deity.toLowerCase().includes(q) ||
        fest.tithi.toLowerCase().includes(q) ||
        fest.fastingType.toLowerCase().includes(q) ||
        (fest.sanskritName && fest.sanskritName.includes(q))
      );

      return categoryMatch && monthMatch && searchMatch;
    });
  }, [activeCategory, searchQuery, selectedMonth]);

  const activeCategoryInfo = useMemo(() => {
    return festivalCategories.find(c => c.id === activeCategory) || festivalCategories[0];
  }, [activeCategory]);

  const handleCopyMantra = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 2000);
  };

  return (
    <div className="w-full">
      {/* 1. Top Sponsored Banner Ad */}
      <AdBanner type="top-sponsored" />

      <div className="w-[98.5%] max-w-[1920px] mx-auto py-3 space-y-4">
        {/* 2. Hero Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4a0e17] via-[#78131e] to-[#a32525] text-white p-6 sm:p-8 shadow-xs border border-amber-900/40">
          <div 
            className="absolute inset-0 opacity-15 mix-blend-screen bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url('/images/fest_diwali.png')`
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold tracking-wide uppercase mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sanatana Dharma Panchangam 2026</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white leading-tight mb-2">
              Hindu Festivals & Sacred Vratams Calendar 2026
            </h1>

            <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed mb-5 max-w-2xl">
              Discover authentic festival dates, Shubh Muhurtham, tithi schedules, sacred upavasam (fasting) rules, and step-by-step puja vidhi for spiritual blessings across the year.
            </p>

            {/* Integrated Live Search & Month Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 max-w-2xl">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder="Search festival, deity, or fasting (e.g. Shivaratri, Ekadashi, Lakshmi)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-stone-900 placeholder:text-stone-400 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm outline-none border border-amber-300/40 shadow-xs focus:ring-2 focus:ring-amber-400"
                />
                {searchQuery && (
                  <button
                    suppressHydrationWarning
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <select
                suppressHydrationWarning
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full sm:w-auto bg-stone-900/90 text-amber-200 border border-amber-400/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium outline-none cursor-pointer hover:bg-stone-800"
              >
                {monthsList.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3. The 5 Main Festival Category Filter Tabs */}
        <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3 shadow-2xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
            {festivalCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  suppressHydrationWarning
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#78131e] text-white shadow-xs'
                      : 'bg-stone-50 hover:bg-amber-50 text-stone-700 border border-stone-200/80 hover:border-amber-300'
                  }`}
                >
                  <span className="text-sm">{category.icon}</span>
                  <span>{category.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-amber-400 text-stone-900' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Contextual Active Category Banner */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base">{activeCategoryInfo.icon}</span>
                <h2 className="text-xs sm:text-sm font-bold text-[#78131e] font-serif uppercase tracking-wide">
                  {activeCategoryInfo.title}
                </h2>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                {activeCategoryInfo.desc}
              </p>
            </div>

            <div className="text-[11px] font-semibold text-stone-500 whitespace-nowrap self-start sm:self-center">
              Showing <span className="font-bold text-[#78131e]">{filteredFestivals.length}</span> Auspicious Occasions
            </div>
          </div>
        </div>

        {/* 4. Festivals Visual Cards Grid */}
        {filteredFestivals.length === 0 ? (
          <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-12 text-center shadow-2xs">
            <div className="text-4xl mb-3">🪔</div>
            <h3 className="text-base font-bold text-stone-800 font-serif">
              No Festivals Found
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              No celebrations matched "{searchQuery}" in {selectedMonth === 'all' ? 'the selected lunar calendar' : selectedMonth}.
            </p>
            <button
              suppressHydrationWarning
              onClick={() => {
                setSearchQuery('');
                setSelectedMonth('all');
                setActiveCategory('all');
              }}
              className="mt-4 inline-block bg-[#78131e] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFestivals.map((fest) => (
              <div
                key={fest.id}
                className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Festival Visual Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                    <img
                      src={fest.image}
                      alt={fest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                    {/* Prominent Calendar Date Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-stone-900 rounded-lg p-1.5 shadow-md border border-amber-300 flex flex-col items-center min-w-[42px] leading-none">
                      <span className="text-[9px] font-extrabold uppercase text-[#78131e] tracking-wider">
                        {fest.month}
                      </span>
                      <span className="text-base font-black text-stone-900 mt-0.5">
                        {fest.day}
                      </span>
                    </div>

                    {/* Top Right Fasting Badge */}
                    <span className="absolute top-2.5 right-2.5 bg-amber-500/90 text-stone-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 backdrop-blur-xs">
                      <Flame className="w-2.5 h-2.5" />
                      {fest.fastingType.split(' ')[0]} Fast
                    </span>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                      <h3 className="font-serif font-black text-sm sm:text-base leading-tight group-hover:text-amber-200 transition-colors drop-shadow-xs truncate">
                        {fest.name}
                      </h3>
                      <span className="text-[10px] text-amber-200/90 font-medium block truncate">
                        {fest.sanskritName} • {fest.date}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 space-y-2.5">
                    {/* Tithi & Deity */}
                    <div className="flex items-start justify-between text-xs pb-2 border-b border-stone-100">
                      <div>
                        <span className="text-[10px] text-stone-500 font-semibold block uppercase tracking-wider">
                          Presiding Deity
                        </span>
                        <span className="font-bold text-stone-800 text-[11.5px] block leading-tight">
                          {fest.deity}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-stone-500 font-semibold block uppercase tracking-wider">
                          Lunar Tithi
                        </span>
                        <span className="font-medium text-stone-700 text-[10.5px] flex items-center justify-end gap-1">
                          <Moon className="w-2.5 h-2.5 text-amber-700" />
                          {fest.tithi.split(' ')[0]} {fest.tithi.split(' ')[1] || ''}
                        </span>
                      </div>
                    </div>

                    {/* Shubh Puja Muhurtham Box */}
                    <div className="bg-amber-50/70 border border-amber-200/60 rounded-lg p-2 text-[11px] text-amber-950 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-amber-900 block text-[9.5px] uppercase tracking-wide">
                          Auspicious Puja Timing
                        </span>
                        <span className="font-semibold text-stone-800 truncate block text-[11px]">
                          {fest.pujaTime}
                        </span>
                      </div>
                    </div>

                    {/* Summary Description */}
                    <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                      {fest.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-3.5 pt-0">
                  <Link
                    href={`/festivals/${fest.id}`}
                    className="w-full bg-white hover:bg-amber-50 border border-[#c5932a] text-[#78131e] text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-2xs hover:shadow-xs flex items-center justify-center gap-1 group-hover:border-[#78131e] cursor-pointer"
                  >
                    <span>View Puja Vidhi & Timings</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Comprehensive Festival Details Modal Dialog */}
      {selectedFestival && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedFestival(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#fffdfa] rounded-2xl shadow-2xl border border-[#ebdcc7] overflow-hidden p-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              suppressHydrationWarning
              onClick={() => setSelectedFestival(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors z-20 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-56 -mx-6 -mt-6 mb-4 overflow-hidden bg-stone-900">
              <img
                src={selectedFestival.image}
                alt={selectedFestival.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="bg-[#78131e] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    📅 {selectedFestival.date}
                  </span>
                  <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    🕉️ {selectedFestival.deity}
                  </span>
                  <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    🌿 {selectedFestival.fastingType}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight leading-tight">
                  {selectedFestival.name}
                </h2>
                <span className="text-xs text-amber-200/90 font-medium">
                  {selectedFestival.sanskritName} • Tithi: {selectedFestival.tithi}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              {/* Significance & Katha */}
              <div>
                <h4 className="font-bold text-[#78131e] font-serif text-sm uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#c5932a]" />
                  Sacred Significance & Purana Katha
                </h4>
                <p className="leading-relaxed text-stone-700 text-xs sm:text-[13px]">
                  {selectedFestival.summary}
                </p>
                <div className="mt-2 p-2.5 bg-amber-50/80 rounded-xl border border-amber-200/70 text-xs text-amber-950 font-medium">
                  <span className="font-bold text-amber-900 mr-1">Spiritual Merit (Phala):</span>
                  {selectedFestival.significance}
                </div>
              </div>

              {/* Shubh Muhurtham & Fasting Guidelines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                <div className="bg-white rounded-xl border border-stone-200 p-3">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-700" /> Shubh Puja Timings
                  </span>
                  <p className="text-xs font-bold text-[#78131e]">
                    {selectedFestival.pujaTime}
                  </p>
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    Calculated per Vedic Surya Siddhanta
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 p-3">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <Flame className="w-3.5 h-3.5 text-amber-700" /> Upavasam (Fasting) Protocol
                  </span>
                  <p className="text-xs font-bold text-stone-800">
                    {selectedFestival.fastingType}
                  </p>
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    Break fast only after auspicious Parana timing
                  </span>
                </div>
              </div>

              {/* Step-by-Step Puja Vidhi */}
              <div className="pt-2 border-t border-stone-200">
                <h4 className="font-bold text-[#78131e] font-serif text-sm uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#c5932a]" />
                  Home Puja Vidhi (Step-by-Step)
                </h4>
                <div className="bg-[#fcfaf7] border border-[#ebdcc7] rounded-xl p-3.5 space-y-2">
                  {selectedFestival.pujaVidhi.split('\n').map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-800 leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-[#78131e] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step.replace(/^\d+\.\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sacred Dhyana Mantra */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-[#78131e] font-serif text-sm uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#c5932a]" />
                    Sacred Dhyana & Puja Mantra
                  </h4>
                  <button
                    suppressHydrationWarning
                    onClick={() => handleCopyMantra(selectedFestival.mantra)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:text-amber-950 cursor-pointer"
                  >
                    {copiedMantra ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedMantra ? 'Mantra Copied!' : 'Copy Mantra'}</span>
                  </button>
                </div>
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-stone-900 font-serif text-center text-xs sm:text-sm tracking-wide leading-relaxed font-semibold">
                  {selectedFestival.mantra}
                </div>
              </div>
            </div>

            {/* Modal Bottom Buttons */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                suppressHydrationWarning
                onClick={() => setSelectedFestival(null)}
                className="w-full sm:w-auto px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-semibold text-xs hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Close Guide
              </button>
              <a
                href="#book-puja"
                onClick={() => setSelectedFestival(null)}
                className="w-full sm:w-auto px-5 py-2 bg-[#78131e] hover:bg-[#600e17] text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Book Temple Festival Puja / Archana</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
