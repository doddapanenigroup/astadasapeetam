'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, MapPin, Clock, Sparkles, Navigation, 
  ExternalLink, ArrowRight, ShieldCheck, BookOpen, 
  Landmark, Filter, Compass 
} from 'lucide-react';
import { shaktiPeethasData } from '../../data/shaktiPeethasData';
import TempleDirectionsModal from '../../components/TempleDirectionsModal';

export default function TemplesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [directionsTemple, setDirectionsTemple] = useState(null);

  // Extract unique states for filter
  const stateList = useMemo(() => {
    const states = new Set(shaktiPeethasData.map(t => t.state));
    return ['all', ...Array.from(states).sort()];
  }, []);

  // Filter temples
  const filteredTemples = useMemo(() => {
    return shaktiPeethasData.filter(temple => {
      const stateMatch = selectedState === 'all' || temple.state === selectedState;
      const q = searchQuery.toLowerCase().trim();
      const searchMatch = !q || (
        temple.name.toLowerCase().includes(q) ||
        temple.teluguName.includes(q) ||
        temple.city.toLowerCase().includes(q) ||
        temple.state.toLowerCase().includes(q) ||
        temple.relicFallen.toLowerCase().includes(q) ||
        temple.relicTelugu.includes(q) ||
        temple.deity.toLowerCase().includes(q)
      );
      return stateMatch && searchMatch;
    });
  }, [searchQuery, selectedState]);

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-800 pb-20">
      
      {/* 1. Divine Sacred Temples Top Banner */}
      <section 
        className="w-full text-white py-10 px-4 border-b border-amber-900/40 relative overflow-hidden"
        style={{
          backgroundColor: '#6b111b',
          backgroundImage: 'linear-gradient(135deg, #78131e 0%, #540b13 100%)'
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-amber-300/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-[98.5%] max-w-[1920px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Adi Shankaracharya Ashtadasa Shakti Peethas • అష్టాదశ శక్తి పీఠాలు</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-white mb-2">
              The 18 Sacred Maha Shakti Peethas
            </h1>
            <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
              Explore the 18 supreme divine seats of Mother Goddess consecrated by Adi Shankaracharya. Discover authentic Sthala Puranams, sacred relics fallen, daily pooja timings, and integrated Google Maps directions.
            </p>
          </div>

          {/* Quick Count Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center text-white shrink-0">
            <span className="text-3xl font-black font-serif text-amber-300 block">18</span>
            <span className="text-xs uppercase tracking-wider font-extrabold text-amber-100">Maha Shakti Peethas</span>
            <span className="text-[10px] text-amber-200/80 block mt-0.5">Across Akhanda Bharat</span>
          </div>
        </div>
      </section>

      {/* 2. Stotram Quick Bar */}
      <section className="bg-amber-50 border-b border-amber-200/80 py-3 px-4">
        <div className="w-[98.5%] max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-amber-950 font-serif font-bold">
            <span>🕉️</span>
            <span>లంకాయాం శంకరీ దేవి కామాక్షీ కాంచికాపురే | ప్రద్యుమ్నే శృంఖలా దేవి చాముండీ క్రౌంచపట్టణే...</span>
          </div>
          <span className="text-[11px] text-stone-500">
            Showing all 18 Holy Shrines with Live Navigation
          </span>
        </div>
      </section>

      {/* 3. Controls & Filter Bar */}
      <main className="w-[98.5%] max-w-[1920px] mx-auto px-2 sm:px-4 py-8">
        
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#ebdcc7] mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                suppressHydrationWarning
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Srisailam, Jogulamba, Kanchi, Kamakhya..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#78131e] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button 
                  suppressHydrationWarning
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* State Filter */}
            <div className="flex items-center gap-2 self-end md:self-auto text-xs sm:text-sm w-full md:w-auto">
              <Filter className="w-4 h-4 text-[#78131e] shrink-0" />
              <span className="text-stone-600 font-semibold whitespace-nowrap">Filter by State / Region:</span>
              <select
                suppressHydrationWarning
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-stone-700 focus:outline-hidden focus:border-[#78131e]"
              >
                <option value="all">All States & Regions (18 Peethas)</option>
                {stateList.filter(s => s !== 'all').map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* 4. Shakti Peethas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemples.map((temple) => (
            <div
              key={temple.id}
              className="bg-white rounded-2xl border border-[#ebdcc7] shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-56 w-full bg-stone-900 overflow-hidden">
                  <Image
                    src={temple.image}
                    alt={temple.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Peetha Number Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center shadow-xs">
                      #{temple.peethaNumber}
                    </span>
                    <span className="bg-[#78131e] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                      Maha Shakti Peetha
                    </span>
                  </div>

                  {/* Relic Tag */}
                  <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs text-amber-200 border border-amber-300/40 text-[10px] font-bold px-2 py-0.5 rounded">
                    {temple.relicFallen}
                  </div>

                  {/* Bottom Image Details */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-amber-300 font-serif font-bold text-xs block drop-shadow-xs">
                      {temple.teluguName}
                    </span>
                    <h3 className="text-white font-serif font-black text-base sm:text-lg drop-shadow-sm leading-snug">
                      {temple.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Location & Deities */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-[#78131e] shrink-0" />
                    <span className="font-semibold text-stone-800">{temple.location}</span>
                  </div>

                  {/* Relic in Telugu */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-2 text-xs">
                    <span className="text-stone-500 block text-[10px] font-bold uppercase tracking-wider">సతీదేవి పవిత్ర అంగ భాగం:</span>
                    <span className="text-[#78131e] font-serif font-bold">{temple.relicTelugu}</span>
                  </div>

                  {/* Stotram snippet */}
                  <div className="text-[11px] text-amber-900 bg-stone-50 border-l-2 border-amber-500 pl-2.5 py-1 italic font-serif">
                    &quot;{temple.stotramVerse}&quot;
                  </div>

                  {/* Summary */}
                  <p className="text-stone-600 text-xs leading-relaxed line-clamp-2">
                    {temple.summary}
                  </p>

                  {/* Timings */}
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 border-t border-stone-100 pt-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Darshan: {temple.timings}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2 border-t border-stone-100 mt-2">
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    suppressHydrationWarning
                    onClick={() => setDirectionsTemple(temple)}
                    className="flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-[#78131e] border border-amber-300 font-bold text-xs py-2 px-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 fill-current" />
                    <span>Directions</span>
                  </button>

                  <Link
                    href={`/temples/${temple.slug}`}
                    className="flex items-center justify-center gap-1 bg-[#78131e] hover:bg-[#600e17] text-white font-bold text-xs py-2 px-2.5 rounded-xl transition-colors shadow-xs"
                  >
                    <span>Read History</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredTemples.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <Landmark className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-700">No Shakti Peethas matched your search</h3>
            <p className="text-stone-500 text-sm mt-1">Try resetting the state filter or searching for &quot;Kanchi&quot;, &quot;Srisailam&quot;, or &quot;Jogulamba&quot;.</p>
            <button
              suppressHydrationWarning
              onClick={() => { setSelectedState('all'); setSearchQuery(''); }}
              className="mt-4 bg-[#78131e] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* 5. Google Maps Directions Modal */}
      {directionsTemple && (
        <TempleDirectionsModal
          temple={directionsTemple}
          onClose={() => setDirectionsTemple(null)}
        />
      )}

    </div>
  );
}
