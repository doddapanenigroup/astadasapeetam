'use client';

import React, { useState, useMemo, useEffect } from 'react';
import AdBanner from '../../components/AdBanner';
import { slokaCategories, allSlokasData } from '../../data/slokasData';
import { 
  Search, Sparkles, X, ChevronRight, Play, Pause, 
  Copy, Check, BookOpen, Volume2, Sun, Moon, Clock, Heart, Share2, Info,
  VolumeX, CheckCheck
} from 'lucide-react';

export default function SlokasPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSloka, setSelectedSloka] = useState(null);
  
  // Script State: 'telugu' | 'telEng' | 'english'
  const [globalScript, setGlobalScript] = useState('telugu');
  const [cardScripts, setCardScripts] = useState({}); // individual card script overrides
  
  // Voice State: 'female' | 'male'
  const [voiceGender, setVoiceGender] = useState('female');
  
  // Audio playback state
  const [playingId, setPlayingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Available voices cache
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Filter slokas based on active category and search query
  const filteredSlokas = useMemo(() => {
    return allSlokasData.filter(sloka => {
      const categoryMatch = activeCategory === 'all' 
        ? true 
        : sloka.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const searchMatch = !q || (
        sloka.title?.toLowerCase().includes(q) ||
        sloka.sanskritTitle?.includes(q) ||
        sloka.teluguTitle?.includes(q) ||
        sloka.deity?.toLowerCase().includes(q) ||
        sloka.occasion?.toLowerCase().includes(q) ||
        sloka.meaning?.toLowerCase().includes(q) ||
        sloka.telugu?.includes(q) ||
        sloka.telEng?.toLowerCase().includes(q) ||
        sloka.sanskrit?.includes(q)
      );

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  const activeCategoryInfo = useMemo(() => {
    return slokaCategories.find(c => c.id === activeCategory) || slokaCategories[0];
  }, [activeCategory]);

  const getActiveScriptForSloka = (slokaId) => {
    return cardScripts[slokaId] || globalScript;
  };

  const handleScriptChangeForCard = (slokaId, script) => {
    setCardScripts(prev => ({ ...prev, [slokaId]: script }));
  };

  const handleCopySloka = (id, sloka) => {
    const currentScript = getActiveScriptForSloka(id);
    let copyText = `${sloka.title}\n\n`;
    if (currentScript === 'telugu') {
      copyText += `${sloka.telugu}\n\nభావం: ${sloka.meaning}`;
    } else if (currentScript === 'telEng') {
      copyText += `${sloka.telEng}\n\nMeaning: ${sloka.meaning}`;
    } else {
      copyText += `${sloka.sanskrit}\n\nMeaning: ${sloka.meaning}`;
    }
    copyText += `\n\n— Astadasapeetam.com Daily Sloka`;

    navigator.clipboard.writeText(copyText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Play / Pause Speech Synthesis with selected Female/Male voice
  const togglePlay = (sloka) => {
    if (typeof window === 'undefined') return;

    // If currently playing this sloka, pause/cancel cleanly
    if (playingId === sloka.id) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis audio is not supported in this browser.');
      return;
    }

    // Cancel any ongoing recitation
    window.speechSynthesis.cancel();

    const currentScript = getActiveScriptForSloka(sloka.id);
    let textToSpeak = '';
    let speechLang = 'te-IN';

    if (currentScript === 'telugu') {
      textToSpeak = `${sloka.teluguTitle || sloka.title}. ${sloka.telugu}`;
      speechLang = 'te-IN';
    } else if (currentScript === 'telEng') {
      textToSpeak = `${sloka.title}. ${sloka.telEng}`;
      speechLang = 'en-IN';
    } else {
      textToSpeak = `${sloka.title}. ${sloka.meaning}`;
      speechLang = 'en-IN';
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = speechLang;

    // Voice Selection (Female vs Male)
    const available = voices.length > 0 ? voices : window.speechSynthesis.getVoices();

    if (voiceGender === 'female') {
      const femaleMatch = available.find(v => 
        (v.lang.includes('te') || v.lang.includes('IN') || v.lang.includes('hi')) && 
        (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('veena') || v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('priya') || v.name.toLowerCase().includes('google'))
      ) || available.find(v => v.lang.includes('IN')) || available.find(v => v.name.toLowerCase().includes('female')) || available[0];

      if (femaleMatch) utterance.voice = femaleMatch;
      utterance.pitch = 1.15; // Gentle, serene, feminine devotional cadence
      utterance.rate = 0.85;  // Meditative sloka chanting pace
    } else {
      const maleMatch = available.find(v => 
        (v.lang.includes('te') || v.lang.includes('IN') || v.lang.includes('hi')) && 
        (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('ravi') || v.name.toLowerCase().includes('madhav') || v.name.toLowerCase().includes('pandit') || v.name.toLowerCase().includes('george'))
      ) || available.find(v => v.lang.includes('IN') && !v.name.toLowerCase().includes('female')) || available[1] || available[0];

      if (maleMatch) utterance.voice = maleMatch;
      utterance.pitch = 0.82; // Deep, resonant Vedic pandita tone
      utterance.rate = 0.82;  // Steady Vedic chanting rhythm
    }

    utterance.onend = () => {
      setPlayingId(null);
    };

    utterance.onerror = () => {
      setPlayingId(null);
    };

    setPlayingId(sloka.id);
    window.speechSynthesis.speak(utterance);
  };

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
              Daily Slokas &amp; Sacred Chants
            </h1>

            <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed mb-5 max-w-2xl">
              Sanctify every moment with daily Vedic verses in 3 distinct formats (Telugu Script, Tel-Eng Phonetics, and English Meaning) with voice chanting.
            </p>

            {/* Integrated Live Search */}
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                suppressHydrationWarning
                type="text"
                placeholder="Search sloka by title, deity, timing, or sacred words..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/95 text-stone-900 text-xs sm:text-sm rounded-xl border border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white shadow-inner placeholder-stone-500 font-medium"
              />
              {searchQuery && (
                <button
                  suppressHydrationWarning
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3. Global Control Bar: 3-Way Script Switcher & Female/Male Voice Selector */}
        <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* 3-Way Script Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-stone-700 whitespace-nowrap">
              Sloka Script:
            </span>
            <div className="flex items-center p-1 bg-stone-100 rounded-xl gap-1 text-xs font-bold border border-stone-200">
              <button
                suppressHydrationWarning
                onClick={() => setGlobalScript('telugu')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  globalScript === 'telugu'
                    ? 'bg-[#78131e] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                🕉️ తెలుగు (Telugu)
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setGlobalScript('telEng')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  globalScript === 'telEng'
                    ? 'bg-[#78131e] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                🔤 Tel-Eng (Phonetic)
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setGlobalScript('english')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  globalScript === 'english'
                    ? 'bg-[#78131e] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                📖 English (Meaning)
              </button>
            </div>
          </div>

          {/* Voice Selector: Female vs Male */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-stone-700 whitespace-nowrap">
              Chanting Voice:
            </span>
            <div className="flex items-center p-1 bg-stone-100 rounded-xl gap-1 text-xs font-bold border border-stone-200">
              <button
                suppressHydrationWarning
                onClick={() => {
                  setVoiceGender('female');
                  if (playingId && typeof window !== 'undefined') window.speechSynthesis.cancel();
                  setPlayingId(null);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
                  voiceGender === 'female'
                    ? 'bg-gradient-to-r from-rose-700 to-[#78131e] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <span>👩</span>
                <span>Female Voice (దేవి శారదా)</span>
              </button>
              <button
                suppressHydrationWarning
                onClick={() => {
                  setVoiceGender('male');
                  if (playingId && typeof window !== 'undefined') window.speechSynthesis.cancel();
                  setPlayingId(null);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 ${
                  voiceGender === 'male'
                    ? 'bg-gradient-to-r from-amber-700 to-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <span>👨</span>
                <span>Male Voice (వేద పండిత)</span>
              </button>
            </div>
          </div>
        </div>

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
              const currentScript = getActiveScriptForSloka(sloka.id);

              return (
                <div
                  key={sloka.id}
                  className={`bg-[#fffdfa] rounded-2xl border p-4.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group ${
                    isPlaying ? 'border-[#78131e] ring-2 ring-rose-300/40' : 'border-[#ebdcc7]'
                  }`}
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
                        {currentScript === 'telugu' ? (sloka.teluguTitle || sloka.title) : sloka.title}
                      </h3>
                      <span className="text-xs text-[#a83d16] font-serif font-bold block mt-0.5">
                        {currentScript === 'telugu' ? sloka.sanskritTitle : sloka.sanskritTitle}
                      </span>
                    </div>

                    {/* Card-Level 3-Way Script Switcher */}
                    <div className="flex items-center justify-center p-0.5 bg-stone-100 rounded-lg gap-1 text-[10px] font-bold border border-stone-200/80">
                      <button
                        suppressHydrationWarning
                        onClick={() => handleScriptChangeForCard(sloka.id, 'telugu')}
                        className={`flex-1 py-0.5 rounded transition cursor-pointer ${
                          currentScript === 'telugu'
                            ? 'bg-[#78131e] text-white shadow-2xs font-extrabold'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        తెలుగు
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => handleScriptChangeForCard(sloka.id, 'telEng')}
                        className={`flex-1 py-0.5 rounded transition cursor-pointer ${
                          currentScript === 'telEng'
                            ? 'bg-[#78131e] text-white shadow-2xs font-extrabold'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        Tel-Eng
                      </button>
                      <button
                        suppressHydrationWarning
                        onClick={() => handleScriptChangeForCard(sloka.id, 'english')}
                        className={`flex-1 py-0.5 rounded transition cursor-pointer ${
                          currentScript === 'english'
                            ? 'bg-[#78131e] text-white shadow-2xs font-extrabold'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        English
                      </button>
                    </div>

                    {/* Active Sloka Verse Box */}
                    <div className="p-3.5 rounded-xl bg-[#fcf8f2] border border-[#ebdcc7] text-stone-900 font-serif text-xs sm:text-[13px] leading-relaxed font-semibold whitespace-pre-line text-center shadow-inner min-h-[70px] flex items-center justify-center">
                      {currentScript === 'telugu' && (
                        <div className="text-[#3b0b12] font-extrabold leading-loose text-sm">
                          {sloka.telugu}
                        </div>
                      )}
                      {currentScript === 'telEng' && (
                        <div className="text-stone-800 font-serif italic text-xs sm:text-sm">
                          {sloka.telEng}
                        </div>
                      )}
                      {currentScript === 'english' && (
                        <div className="text-stone-700 text-xs text-left leading-relaxed">
                          <span className="font-bold text-[#78131e] block mb-1">Divine Meaning:</span>
                          {sloka.meaning}
                        </div>
                      )}
                    </div>

                    {/* Meaning / Context preview when not in english mode */}
                    {currentScript !== 'english' && (
                      <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                        <span className="font-bold text-stone-700">భావం: </span>
                        {sloka.meaning}
                      </p>
                    )}
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* Play / Pause Voice Audio Button */}
                      <button
                        suppressHydrationWarning
                        onClick={() => togglePlay(sloka)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                          isPlaying 
                            ? 'bg-[#78131e] text-white border-[#78131e] ring-2 ring-rose-400/40 animate-pulse' 
                            : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200 hover:border-amber-400'
                        }`}
                        title={isPlaying ? "Pause / Stop Recitation" : `Play Recitation (${voiceGender === 'female' ? 'Female Voice' : 'Male Voice'})`}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 text-amber-300" />
                            <span className="text-[11px] font-black tracking-wide text-amber-200">Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 text-stone-700" />
                            <span className="text-[10px] font-semibold">Play</span>
                          </>
                        )}
                      </button>

                      {/* Copy Sloka Button */}
                      <button
                        suppressHydrationWarning
                        onClick={() => handleCopySloka(sloka.id, sloka)}
                        className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-amber-50 text-stone-700 hover:text-[#78131e] transition-colors cursor-pointer"
                        title="Copy Current Sloka Verse"
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
                      <span>Vidhi &amp; Phala</span>
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
          onClick={() => {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            setPlayingId(null);
            setSelectedSloka(null);
          }}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#fffdfa] rounded-2xl shadow-2xl border border-[#ebdcc7] overflow-hidden p-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              suppressHydrationWarning
              onClick={() => {
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                setPlayingId(null);
                setSelectedSloka(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors z-20 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-stone-200 pb-3 mb-4 pr-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#78131e] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedSloka.occasion}
                </span>
                <span className="text-xs text-stone-500 font-semibold">
                  🕉️ {selectedSloka.deity}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900">
                {selectedSloka.title}
              </h2>
              <div className="text-sm font-serif font-bold text-[#a83d16]">
                {selectedSloka.teluguTitle || selectedSloka.sanskritTitle}
              </div>
            </div>

            {/* Modal Controls: 3-Way Switcher & Voice Play/Pause */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200 mb-4">
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-bold text-stone-700">Script:</span>
                <div className="flex items-center p-0.5 bg-white rounded-lg border text-xs font-bold">
                  {['telugu', 'telEng', 'english'].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleScriptChangeForCard(selectedSloka.id, s)}
                      className={`px-2.5 py-1 rounded transition cursor-pointer capitalize ${
                        getActiveScriptForSloka(selectedSloka.id) === s
                          ? 'bg-[#78131e] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {s === 'telEng' ? 'Tel-Eng' : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Play / Pause Voice Recitation */}
              <button
                onClick={() => togglePlay(selectedSloka)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-xs transition cursor-pointer ${
                  playingId === selectedSloka.id
                    ? 'bg-[#78131e] text-white ring-2 ring-rose-400/40 animate-pulse'
                    : 'bg-stone-900 hover:bg-stone-800 text-amber-200'
                }`}
              >
                {playingId === selectedSloka.id ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-300" />
                    <span>Pause Chanting</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Chant ({voiceGender === 'female' ? 'Female' : 'Male'})</span>
                  </>
                )}
              </button>
            </div>

            {/* Verses Display */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-stone-900">
                <div className="text-[10px] font-bold text-[#78131e] uppercase tracking-wider mb-1">
                  {getActiveScriptForSloka(selectedSloka.id) === 'telugu' ? 'తెలుగు లిపి శ్లోకం' : getActiveScriptForSloka(selectedSloka.id) === 'telEng' ? 'Tel-Eng Transliteration' : 'English Translation'}
                </div>
                <div className="font-serif font-black text-sm sm:text-base leading-relaxed whitespace-pre-line text-[#3b0811]">
                  {getActiveScriptForSloka(selectedSloka.id) === 'telugu' ? selectedSloka.telugu : getActiveScriptForSloka(selectedSloka.id) === 'telEng' ? selectedSloka.telEng : selectedSloka.meaning}
                </div>
              </div>

              {/* Full Details: Timing, Vidhi, Significance, Phala */}
              <div className="space-y-3 bg-[#fcf9f2] p-4 rounded-xl border border-stone-200">
                <div>
                  <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#78131e]" />
                    <span>When &amp; How to Recite (విధి విధానం):</span>
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {selectedSloka.timing}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#78131e]" />
                    <span>Spiritual Significance (తాత్పర్యం &amp; విశిష్టత):</span>
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {selectedSloka.significance}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Divine Fruits &amp; Benefits (శ్లోక ఫలశ్రుతి):</span>
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {selectedSloka.phala}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
