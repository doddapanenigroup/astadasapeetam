'use client';

import React, { useState, useEffect, useMemo } from 'react';
import AdBanner from '../../components/AdBanner';
import { godCategories, allGodsData } from '../../data/godsData';
import { 
  Sparkles, Search, X, ChevronRight, Share2, 
  Check, Volume2, Shield, Heart, Eye, ArrowRight, Flame,
  Award, BookOpen, Star
} from 'lucide-react';

const cosmicWallpapers = [
  { id: 'emerald', src: '/wallpapers/cosmic_emerald.jpg', name: 'Emerald Cosmic Nebula' },
  { id: 'nebula', src: '/wallpapers/cosmic_nebula.jpg', name: 'Mystical Green Cosmos' },
  { id: 'sapphire', src: '/wallpapers/cosmic_sapphire.jpg', name: 'Deep Sapphire Star Cluster' },
  { id: 'crimson', src: '/wallpapers/cosmic_crimson.jpg', name: 'Crimson Galaxy Nebula' },
  { id: 'supernova', src: '/wallpapers/cosmic_supernova.jpg', name: 'Golden Cosmic Supernova' }
];

export default function GodsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGod, setSelectedGod] = useState(null);
  const [copiedMantra, setCopiedMantra] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(cosmicWallpapers[0]);
  const [flowerCounts, setFlowerCounts] = useState(() => {
    const initial = {};
    allGodsData.forEach(g => { initial[g.id] = g.flowerCount; });
    return initial;
  });
  const [fallingPetals, setFallingPetals] = useState([]);

  // Every refresh / visit: Randomly select one of the 5 cosmic wallpapers
  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * cosmicWallpapers.length);
    setSelectedWallpaper(cosmicWallpapers[randomIdx]);
  }, []);

  // Pushpanjali Flower Shower
  const handleOfferFlowers = (godId) => {
    setFlowerCounts(prev => ({
      ...prev,
      [godId]: (prev[godId] || 0) + 1
    }));

    const newPetals = Array.from({ length: 18 }).map((_, i) => ({
      id: `${godId}-${Date.now()}-${i}`,
      left: Math.random() * 85 + 5,
      delay: Math.random() * 0.4,
      duration: Math.random() * 1.2 + 1.2,
      size: Math.random() * 14 + 12,
      emoji: ['🌸', '🌺', '🌼', '🏵️', '✨'][Math.floor(Math.random() * 5)],
      godId
    }));

    setFallingPetals(prev => [...prev, ...newPetals]);

    setTimeout(() => {
      setFallingPetals(prev => prev.filter(p => !newPetals.some(np => np.id === p.id)));
    }, 2500);
  };

  const handleCopyMantra = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 2000);
  };

  // Filter Deities
  const filteredGods = useMemo(() => {
    return allGodsData.filter(god => {
      const matchesCategory = activeCategory === 'all' || god.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        god.name.toLowerCase().includes(q) ||
        god.sanskritName.includes(q) ||
        god.title.toLowerCase().includes(q) ||
        god.vahana.toLowerCase().includes(q) ||
        god.ayudha.toLowerCase().includes(q) ||
        god.temples.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="relative min-h-screen text-stone-100 bg-[#030712] overflow-x-hidden">
      
      {/* ================= FIXED DYNAMIC UNIVERSE WALLPAPER (CHANGES ON REFRESH) ================= */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-in-out pointer-events-none scale-102"
        style={{ 
          backgroundImage: `url('${selectedWallpaper.src}')`,
          backgroundAttachment: 'fixed',
          backgroundColor: '#030712'
        }}
      >
        {/* Dark Vignette Overlay for perfect card contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* Global Petal Animation CSS */}
      <style jsx global>{`
        @keyframes fallDown {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(180px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* Main Content Above Wallpaper */}
      <div className="relative z-10 w-[98.5%] max-w-[1920px] mx-auto py-6 px-3 sm:px-6 space-y-6">
        
        {/* ================= CELESTIAL HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-200 text-xs font-serif font-black uppercase tracking-widest shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Brahmanda Darshan • The Living Vortex of Creation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Divine Deities of Sanatana Dharma
          </h1>

          <p className="text-xs sm:text-sm text-amber-100/90 font-serif leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Worship the supreme cosmic manifestations, avataras, and celestial guardians. 
            Explore their sacred iconography, Puranic kathas, vahanas, and offer virtual pushpanjali.
          </p>
        </div>

        {/* ================= SEARCH & CATEGORY FILTER BAR ================= */}
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-amber-400/30 p-4 shadow-2xl space-y-4">
          
          {/* Top Row: Search Input + Deity Counter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full max-w-xl">
              <Search className="w-4 h-4 text-amber-300/80 absolute left-3.5 top-3" />
              <input
                suppressHydrationWarning
                type="text"
                placeholder="Search any God, Avatara, Vahana, Ayudha, or Kshetra (e.g. Shiva, Rama, Ganesha, Indra)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 text-white placeholder:text-stone-400 pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm outline-none border border-amber-300/40 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-inner"
              />
              {searchQuery && (
                <button
                  suppressHydrationWarning
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs text-amber-200/90 font-serif font-medium whitespace-nowrap self-end sm:self-center">
              Exploring <strong className="text-amber-300 text-sm">{filteredGods.length}</strong> Sacred Deities
            </div>
          </div>

          {/* Bottom Row: Category Tabs (Wrapped cleanly, no horizontal scrolling needed) */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            {godCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  suppressHydrationWarning
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-102 ring-1 ring-amber-300'
                      : 'bg-white/5 hover:bg-white/15 text-stone-300 border border-white/10 hover:border-amber-400/50'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-stone-950 text-amber-300' : 'bg-white/10 text-stone-300'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= LIVING DEITY CARDS GRID (COSMIC GLASS CARDS) ================= */}
        {filteredGods.length === 0 ? (
          <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 p-12 text-center">
            <div className="text-4xl mb-3">🪔</div>
            <h3 className="text-base font-bold text-amber-200 font-serif">
              No Deities Found
            </h3>
            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
              No divine forms matched "{searchQuery}".
            </p>
            <button
              suppressHydrationWarning
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredGods.map((god) => {
              const currentFlowers = flowerCounts[god.id] || god.flowerCount;

              return (
                <div
                  key={god.id}
                  className="relative bg-black/60 backdrop-blur-md rounded-2xl border border-amber-400/30 hover:border-amber-400 shadow-xl hover:shadow-[0_0_25px_rgba(251,191,36,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Floating Flower Petals Animation for this Card */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
                    {fallingPetals.filter(p => p.godId === god.id).map(petal => (
                      <span
                        key={petal.id}
                        className="absolute text-base animate-in fade-in"
                        style={{
                          left: `${petal.left}%`,
                          top: '-10%',
                          fontSize: `${petal.size}px`,
                          animation: `fallDown ${petal.duration}s linear forwards`,
                          animationDelay: `${petal.delay}s`
                        }}
                      >
                        {petal.emoji}
                      </span>
                    ))}
                  </div>

                  <div>
                    {/* Visual Photo Header with Fixed Uniform Height */}
                    <div className="relative h-48 w-full overflow-hidden bg-stone-900 cursor-pointer" onClick={() => setSelectedGod(god)}>
                      <img
                        src={god.image}
                        alt={god.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                        <span className="bg-[#78131e]/90 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs border border-amber-400/40">
                          {god.auspiciousDay.split(' ')[0]}
                        </span>
                      </div>

                      {/* Pushpanjali Live Counter Badge */}
                      <span className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-400/30 flex items-center gap-1">
                        🌸 {currentFlowers}
                      </span>

                      {/* Bottom Title on Image */}
                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <h3 className="font-serif font-black text-base leading-tight group-hover:text-amber-200 transition-colors drop-shadow-md truncate">
                          {god.name}
                        </h3>
                        <span className="text-[11px] text-amber-200/90 font-medium block truncate">
                          {god.sanskritName}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3">
                      <p className="text-xs font-bold text-amber-300 line-clamp-1 font-serif">
                        {god.title}
                      </p>

                      {/* Vahana & Abode Info */}
                      <div className="space-y-1.5 text-xs pb-2 border-b border-white/10">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-400 font-semibold">Vahana:</span>
                          <span className="font-bold text-stone-200 truncate max-w-[170px] text-right">
                            {god.vahana.split('&')[0]}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-400 font-semibold">Abode:</span>
                          <span className="font-bold text-stone-200 truncate max-w-[170px] text-right">
                            {god.abode.split('(')[0]}
                          </span>
                        </div>
                      </div>

                      {/* Sanskrit Mantra Snippet */}
                      <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-300/30 text-center font-serif text-[11px] text-amber-200 font-bold truncate">
                        {god.mantra.split('॥')[0]}॥
                      </div>

                      {/* Summary */}
                      <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed font-serif">
                        {god.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-3.5 border-t border-white/10 bg-white/5 flex items-center justify-between gap-2">
                    <button
                      suppressHydrationWarning
                      onClick={() => handleOfferFlowers(god.id)}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <span>🌸</span>
                      <span>Pushpanjali</span>
                    </button>

                    <button
                      suppressHydrationWarning
                      onClick={() => setSelectedGod(god)}
                      className="px-3 py-1.5 rounded-lg border border-amber-400/50 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Darshan</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ================= COMPREHENSIVE DEITY DARSHAN MODAL ================= */}
      {selectedGod && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0b101e] text-stone-100 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-amber-400 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              suppressHydrationWarning
              onClick={() => setSelectedGod(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-amber-400 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header with Fixed Height */}
            <div className="relative h-64 sm:h-72 w-full bg-stone-950 overflow-hidden">
              <img
                src={selectedGod.image}
                alt={selectedGod.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b101e] via-black/40 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider">
                  {selectedGod.category.replace('-', ' ').toUpperCase()}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                  {selectedGod.name}
                </h2>
                <p className="text-xs text-amber-200 font-serif">
                  {selectedGod.sanskritName} • {selectedGod.title}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              {/* Divine Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">Vahana (Mount)</span>
                  <strong className="text-amber-200">{selectedGod.vahana}</strong>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">Ayudha (Weapons)</span>
                  <strong className="text-amber-200">{selectedGod.ayudha}</strong>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">Divine Abode</span>
                  <strong className="text-amber-200">{selectedGod.abode}</strong>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">Consort / Shakti</span>
                  <strong className="text-amber-200">{selectedGod.consort}</strong>
                </div>
              </div>

              {/* Sanskrit Mantra & Chanting */}
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-300/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-amber-300 uppercase tracking-wider">
                    🕉️ Sacred Moola Mantra
                  </span>
                  <button
                    suppressHydrationWarning
                    onClick={() => handleCopyMantra(selectedGod.mantra)}
                    className="text-xs text-amber-300 hover:text-white cursor-pointer"
                  >
                    {copiedMantra ? 'Copied!' : 'Copy Mantra'}
                  </button>
                </div>
                <p className="text-sm font-serif font-bold text-white text-center py-1">
                  {selectedGod.mantra}
                </p>
                <div className="pt-2 border-t border-amber-300/20 text-xs text-stone-300">
                  <span className="text-amber-300 block font-bold mb-0.5">Gayatri Mantra:</span>
                  <p className="font-serif italic text-[11px]">{selectedGod.gayatriMantra}</p>
                </div>
              </div>

              {/* Katha & Puranic Significance */}
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-sm text-amber-200">
                  📜 Puranic Leela & Sacred Significance
                </h4>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  {selectedGod.katha}
                </p>
              </div>

              {/* Major Kshetras & Temples */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px]">Major Pilgrimage Temples</span>
                  <strong className="text-white font-serif">{selectedGod.temples}</strong>
                </div>
                <span className="text-amber-300 text-xs">Auspicious: {selectedGod.auspiciousDay}</span>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  suppressHydrationWarning
                  onClick={() => handleOfferFlowers(selectedGod.id)}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>🌸</span>
                  <span>Offer Archana ({flowerCounts[selectedGod.id] || selectedGod.flowerCount})</span>
                </button>

                <button
                  suppressHydrationWarning
                  onClick={() => setSelectedGod(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                >
                  Close Darshan
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
