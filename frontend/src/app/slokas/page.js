'use client';

import React, { useState, useMemo } from 'react';
import AdBanner from '../../components/AdBanner';
import { slokaCategories, allSlokasData } from '../../data/slokasData';
import { 
  Search, Sparkles, X, ChevronRight, Play, Pause, 
  Copy, Check, BookOpen, Volume2, Sun, Moon, Clock, Heart, Share2, Info
} from 'lucide-react';

export default function SlokasPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSloka, setSelectedSloka] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Filter slokas based on active category and search query
  const filteredSlokas = useMemo(() => {
    return allSlokasData.filter(sloka => {
      const categoryMatch = activeCategory === 'all' 
        ? true 
        : sloka.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const searchMatch = !q || (
        sloka.title.toLowerCase().includes(q) ||
        sloka.sanskritTitle.includes(q) ||
        sloka.deity.toLowerCase().includes(q) ||
        sloka.occasion.toLowerCase().includes(q) ||
        sloka.meaning.toLowerCase().includes(q) ||
        sloka.sanskrit.includes(q)
      );

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  const activeCategoryInfo = useMemo(() => {
    return slokaCategories.find(c => c.id === activeCategory) || slokaCategories[0];
  }, [activeCategory]);

  const handleCopySloka = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const featuredSloka = allSlokasData[0]; // Karagre Vasate Lakshmi

  return (
    <div className="w-full">
      {/* 1. Top Sponsored Banner Ad */}
      <AdBanner type="top-sponsored" />

      <div className="w-[98.5%] max-w-[1920px] mx-auto py-3 space-y-4">
        {/* 2. Hero Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4d1607] via-[#7c280d] to-[#aa3a12] text-white p-6 sm:p-8 shadow-xs border border-amber-900/40">
          <div 
            className="absolute inset-0 opacity-15 mix-blend-screen bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url('/images/art_mantras_real.jpg')`
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold tracking-wide uppercase mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sanatana Dharma Nitya Sloka Sangraham</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white leading-tight mb-2">
              Daily Slokas & Sacred Chants
            </h1>

            <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed mb-5 max-w-2xl">
              Sanctify every moment of your daily routine with ancient Vedic verses for morning awakening, meals, study, family protection, and peaceful slumber with authentic Sanskrit text, meanings, and audio recitation.
            </p>

            {/* Integrated Live Search */}
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                suppressHydrationWarning
                type="text"
                placeholder="Search slokas by name, deity, or occasion (e.g. Karagre, Gayatri, Bhojana, Ganesha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-stone-900 placeholder:text-stone-400 pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm outline-none border border-amber-300/40 shadow-xs focus:ring-2 focus:ring-amber-400"
              />
              {searchQuery && (
                <button
                  suppressHydrationWarning
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3. Featured Daily Sloka Banner (Pratah Smaranam) */}
        {!searchQuery && activeCategory === 'all' && (
          <div className="bg-[#fffdfa] rounded-2xl border-2 border-amber-400/40 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#78131e] text-white shadow-2xs">
                  🌅 Morning Awakening Sloka
                </span>
                <span className="text-xs font-semibold text-amber-900">
                  {featuredSloka.title} • {featuredSloka.deity}
                </span>
              </div>
              <p className="font-serif font-bold text-sm sm:text-base text-[#78131e] whitespace-pre-line leading-relaxed">
                {featuredSloka.sanskrit}
              </p>
              <p className="text-xs text-stone-600 italic">
                "{featuredSloka.meaning}"
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                suppressHydrationWarning
                onClick={() => togglePlay(featuredSloka.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                {playingId === featuredSloka.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{playingId === featuredSloka.id ? 'Pause Chanting' : 'Listen Chanting'}</span>
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setSelectedSloka(featuredSloka)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 border border-stone-300 text-stone-700 font-bold text-xs transition-colors cursor-pointer"
              >
                View Full Vidhi
              </button>
            </div>
          </div>
        )}

        {/* 4. Sloka Category Tabs */}
        <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3 shadow-2xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
            {slokaCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  suppressHydrationWarning
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#78131e] text-white shadow-xs'
                      : 'bg-stone-50 hover:bg-amber-50 text-stone-700 border border-stone-200/80 hover:border-amber-300'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-amber-400 text-stone-900' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Contextual Active Banner */}
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
              Showing <span className="font-bold text-[#78131e]">{filteredSlokas.length}</span> Sacred Verses
            </div>
          </div>
        </div>

        {/* 5. Slokas Grid */}
        {filteredSlokas.length === 0 ? (
          <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-12 text-center shadow-2xs">
            <div className="text-4xl mb-3">📜</div>
            <h3 className="text-base font-bold text-stone-800 font-serif">
              No Slokas Found
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              No verses matched "{searchQuery}" in this category.
            </p>
            <button
              suppressHydrationWarning
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 inline-block bg-[#78131e] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSlokas.map((sloka) => {
              const isPlaying = playingId === sloka.id;
              const isCopied = copiedId === sloka.id;

              return (
                <div
                  key={sloka.id}
                  className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-4 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Card Top: Occasion & Deity Pill */}
                    <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#78131e] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 truncate">
                        {sloka.occasion}
                      </span>
                      <span className="text-[10px] font-semibold text-stone-500 shrink-0">
                        🕉️ {sloka.deity.split(' ')[0]}
                      </span>
                    </div>

                    {/* Sloka Title */}
                    <div>
                      <h3 className="font-serif font-black text-sm sm:text-base text-stone-900 group-hover:text-[#78131e] transition-colors leading-tight">
                        {sloka.title}
                      </h3>
                      <span className="text-xs text-[#a83d16] font-serif font-bold block mt-0.5">
                        {sloka.sanskritTitle}
                      </span>
                    </div>

                    {/* Sanskrit Verse Box */}
                    <div className="p-3 rounded-xl bg-[#fcf8f2] border border-[#ebdcc7] text-stone-900 font-serif text-xs sm:text-[13px] leading-relaxed font-semibold whitespace-pre-line text-center shadow-inner">
                      {sloka.sanskrit}
                    </div>

                    {/* English Meaning Preview */}
                    <p className="text-[11px] text-stone-600 line-clamp-3 leading-relaxed">
                      <span className="font-bold text-stone-700">Meaning: </span>
                      {sloka.meaning}
                    </p>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* Play Audio Button */}
                      <button
                        suppressHydrationWarning
                        onClick={() => togglePlay(sloka.id)}
                        className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                          isPlaying 
                            ? 'bg-[#78131e] text-white border-[#78131e]' 
                            : 'bg-stone-50 hover:bg-amber-50 text-stone-700 border-stone-200'
                        }`}
                        title="Chant Audio"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span className="text-[10px] font-bold">{sloka.audioLength}</span>
                      </button>

                      {/* Copy Sloka Button */}
                      <button
                        suppressHydrationWarning
                        onClick={() => handleCopySloka(sloka.id, `${sloka.title}\n\n${sloka.sanskrit}\n\nMeaning: ${sloka.meaning}`)}
                        className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-[#78131e] transition-colors cursor-pointer"
                        title="Copy Sanskrit Verse"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* View Details CTA */}
                    <button
                      suppressHydrationWarning
                      onClick={() => setSelectedSloka(sloka)}
                      className="text-xs font-bold text-[#78131e] hover:text-[#911d2b] flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Vidhi & Phala</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Comprehensive Sloka Details Modal Dialog */}
      {selectedSloka && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedSloka(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#fffdfa] rounded-2xl shadow-2xl border border-[#ebdcc7] overflow-hidden p-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              suppressHydrationWarning
              onClick={() => setSelectedSloka(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors z-20 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-stone-200 pb-3 mb-4">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#78131e] text-white shadow-2xs">
                  {selectedSloka.occasion}
                </span>
                <span className="text-xs font-bold text-amber-800">
                  Presiding Deity: {selectedSloka.deity}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-stone-900">
                {selectedSloka.title} ({selectedSloka.sanskritTitle})
              </h2>
            </div>

            {/* Sanskrit Big Text Block */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50/90 to-orange-50/80 border border-amber-200 text-center space-y-2 mb-4">
              <p className="font-serif font-black text-base sm:text-lg text-stone-900 leading-relaxed whitespace-pre-line">
                {selectedSloka.sanskrit}
              </p>
              <p className="font-mono text-xs sm:text-[13px] text-stone-700 leading-relaxed whitespace-pre-line pt-2 border-t border-amber-200/60">
                {selectedSloka.transliteration}
              </p>
            </div>

            {/* Audio Recitation Bar in Modal */}
            <div className="bg-white rounded-xl border border-stone-200 p-3 flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <button
                  suppressHydrationWarning
                  onClick={() => togglePlay(selectedSloka.id)}
                  className="w-9 h-9 rounded-full bg-[#78131e] text-white flex items-center justify-center hover:bg-[#911d2b] transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  {playingId === selectedSloka.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <div>
                  <span className="text-xs font-bold text-stone-800 block">
                    {playingId === selectedSloka.id ? 'Now Chanting...' : 'Listen to Chanting Recitation'}
                  </span>
                  <span className="text-[10px] text-stone-500">
                    Vedic Pronunciation • {selectedSloka.audioLength} mins
                  </span>
                </div>
              </div>

              <button
                suppressHydrationWarning
                onClick={() => handleCopySloka(selectedSloka.id, `${selectedSloka.title}\n\n${selectedSloka.sanskrit}\n\nMeaning: ${selectedSloka.meaning}`)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer"
              >
                {copiedId === selectedSloka.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === selectedSloka.id ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Meaning & Significance */}
            <div className="space-y-3 text-xs sm:text-sm text-stone-700">
              <div>
                <h4 className="font-bold text-[#78131e] font-serif text-xs sm:text-sm uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#c5932a]" />
                  English Meaning & Translation
                </h4>
                <p className="leading-relaxed text-stone-700 text-xs sm:text-[13px] bg-[#fcfaf7] border border-[#ebdcc7] p-3 rounded-xl">
                  {selectedSloka.meaning}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#78131e] font-serif text-xs sm:text-sm uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#c5932a]" />
                  Spiritual Significance & Philosophy
                </h4>
                <p className="leading-relaxed text-stone-700 text-xs sm:text-[13px]">
                  {selectedSloka.significance}
                </p>
              </div>

              {/* Chanting Timing & Spiritual Phala */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-700" /> When & How to Chant
                  </span>
                  <p className="text-xs text-stone-800">
                    {selectedSloka.timing}
                  </p>
                </div>

                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <Heart className="w-3.5 h-3.5 text-amber-700" /> Spiritual Phala (Benefit)
                  </span>
                  <p className="text-xs text-stone-800">
                    {selectedSloka.phala}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-end">
              <button
                suppressHydrationWarning
                onClick={() => setSelectedSloka(null)}
                className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-semibold text-xs hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Close Sloka Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
