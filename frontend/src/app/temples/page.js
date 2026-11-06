'use client';

import React, { useState, useMemo } from 'react';
import AdBanner from '../../components/AdBanner';
import { circuitsList, allTemplesData } from '../../data/templesData';
import { 
  Search, MapPin, Clock, Sparkles, X, ChevronRight, 
  Compass, ExternalLink, Calendar, Heart, ShieldCheck 
} from 'lucide-react';

export default function TemplesPage() {
  const [activeCircuit, setActiveCircuit] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedTemple, setSelectedTemple] = useState(null);

  // Extract unique states for filter
  const stateList = useMemo(() => {
    const states = new Set(allTemplesData.map(t => t.state));
    return ['all', ...Array.from(states).sort()];
  }, []);

  // Filter temples based on active circuit, search query, and state
  const filteredTemples = useMemo(() => {
    return allTemplesData.filter(temple => {
      // Circuit match
      const circuitMatch = activeCircuit === 'all' 
        ? true 
        : temple.circuits.includes(activeCircuit);

      // State match
      const stateMatch = selectedState === 'all' 
        ? true 
        : temple.state === selectedState;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const searchMatch = !q || (
        temple.name.toLowerCase().includes(q) ||
        temple.city.toLowerCase().includes(q) ||
        temple.state.toLowerCase().includes(q) ||
        temple.deity.toLowerCase().includes(q) ||
        (temple.element && temple.element.toLowerCase().includes(q)) ||
        (temple.relic && temple.relic.toLowerCase().includes(q))
      );

      return circuitMatch && stateMatch && searchMatch;
    });
  }, [activeCircuit, searchQuery, selectedState]);

  const activeCircuitInfo = useMemo(() => {
    return circuitsList.find(c => c.id === activeCircuit) || circuitsList[0];
  }, [activeCircuit]);

  return (
    <div className="w-full">
      {/* 1. Top Sponsored Banner Ad */}
      <AdBanner type="top-sponsored" />

      <div className="w-[98.5%] max-w-[1920px] mx-auto py-3 space-y-4">
        {/* 2. Hero Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3e1408] via-[#752a0a] to-[#9c400c] text-white p-6 sm:p-8 shadow-xs border border-amber-900/30">
          <div 
            className="absolute inset-0 opacity-15 mix-blend-screen bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&auto=format&fit=crop&q=80')`
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-semibold tracking-wide uppercase mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Divine Pilgrimage Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-white leading-tight mb-2">
              Sacred Temples & Pilgrimages of Bharat
            </h1>

            <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed mb-5 max-w-2xl">
              Journey through the 18 Maha Shakti Peethas, 12 Holy Jyotirlingas, Pancha Bhoota Sthalams, and immortal pilgrimage kshetras with authentic darshan timings, rituals, and pilgrim guides.
            </p>

            {/* Integrated Live Search & State Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 max-w-2xl">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder="Search by temple name, deity, or city (e.g. Srisailam, Kashi, Shiva)..."
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
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full sm:w-auto bg-stone-900/90 text-amber-200 border border-amber-400/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium outline-none cursor-pointer hover:bg-stone-800"
              >
                <option value="all">All States & Regions</option>
                {stateList.filter(s => s !== 'all').map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3. The 6 Main Circuit Filter Tabs (Requested Structure) */}
        <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3 shadow-2xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
            {circuitsList.map((circuit) => {
              const isActive = activeCircuit === circuit.id;
              return (
                <button
                  suppressHydrationWarning
                  key={circuit.id}
                  onClick={() => {
                    setActiveCircuit(circuit.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#78131e] text-white shadow-xs'
                      : 'bg-stone-50 hover:bg-amber-50 text-stone-700 border border-stone-200/80 hover:border-amber-300'
                  }`}
                >
                  <span className="text-sm">{circuit.icon}</span>
                  <span>{circuit.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-amber-400 text-stone-900' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {circuit.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Contextual Active Circuit Banner */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base">{activeCircuitInfo.icon}</span>
                <h2 className="text-xs sm:text-sm font-bold text-[#78131e] font-serif uppercase tracking-wide">
                  {activeCircuitInfo.title}
                </h2>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                {activeCircuitInfo.desc}
              </p>
            </div>

            <div className="text-[11px] font-semibold text-stone-500 whitespace-nowrap self-start sm:self-center">
              Showing <span className="font-bold text-[#78131e]">{filteredTemples.length}</span> Temples
            </div>
          </div>
        </div>

        {/* 4. Temples Visual Cards Grid */}
        {filteredTemples.length === 0 ? (
          <div className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-12 text-center shadow-2xs">
            <div className="text-4xl mb-3">🛕</div>
            <h3 className="text-base font-bold text-stone-800 font-serif">
              No Temples Found
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              No shrines matched your search "{searchQuery}" in {selectedState === 'all' ? 'any state' : selectedState}.
            </p>
            <button
              suppressHydrationWarning
              onClick={() => {
                setSearchQuery('');
                setSelectedState('all');
                setActiveCircuit('all');
              }}
              className="mt-4 inline-block bg-[#78131e] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTemples.map((temple) => (
              <div
                key={temple.id}
                className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Shrine Photo */}
                  <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                    <img
                      src={temple.image}
                      alt={temple.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                      {temple.peethaNumber && (
                        <span className="bg-[#78131e] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow-2xs border border-amber-400/40">
                          🔱 Peetha #{temple.peethaNumber}
                        </span>
                      )}
                      {temple.element && (
                        <span className="bg-sky-700 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow-2xs border border-sky-300/40">
                          🌿 {temple.element}
                        </span>
                      )}
                      {temple.graha && (
                        <span className="bg-amber-700 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow-2xs">
                          🪐 {temple.graha}
                        </span>
                      )}
                    </div>

                    <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-amber-400" />
                      {temple.state}
                    </span>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                      <h3 className="font-serif font-black text-sm sm:text-base leading-tight group-hover:text-amber-200 transition-colors drop-shadow-xs truncate">
                        {temple.name}
                      </h3>
                      <span className="text-[10px] text-amber-200/90 font-medium block truncate">
                        {temple.templeComplex}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 space-y-2.5">
                    {/* Deity info */}
                    <div className="flex items-start justify-between text-xs pb-2 border-b border-stone-100">
                      <div>
                        <span className="text-[10px] text-stone-500 font-semibold block uppercase tracking-wider">
                          Presiding Deity
                        </span>
                        <span className="font-bold text-stone-800 text-[11.5px] block leading-tight">
                          {temple.deity}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-stone-500 font-semibold block uppercase tracking-wider">
                          Darshan Hours
                        </span>
                        <span className="font-medium text-stone-700 text-[10.5px] flex items-center justify-end gap-1">
                          <Clock className="w-2.5 h-2.5 text-amber-700" />
                          {temple.timings.split(',')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Sacred Relic or Highlight */}
                    {temple.relic && (
                      <div className="bg-amber-50/80 border border-amber-200/60 rounded-lg p-2 text-[11px] text-amber-950">
                        <span className="font-bold text-amber-900 block text-[10px] uppercase tracking-wide">
                          Sacred Relic of Sati
                        </span>
                        <span>{temple.relic}</span>
                      </div>
                    )}

                    {/* Summary Description */}
                    <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                      {temple.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-3.5 pt-0">
                  <button
                    suppressHydrationWarning
                    onClick={() => setSelectedTemple(temple)}
                    className="w-full bg-white hover:bg-amber-50 border border-[#c5932a] text-[#78131e] text-xs font-bold py-2 px-3 rounded-xl transition-all shadow-2xs hover:shadow-xs flex items-center justify-center gap-1 group-hover:border-[#78131e] cursor-pointer"
                  >
                    <span>View Pilgrim Guide & Timings</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Comprehensive Temple Details Modal Dialog */}
      {selectedTemple && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedTemple(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-[#fffdfa] rounded-2xl shadow-2xl border border-[#ebdcc7] overflow-hidden p-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              suppressHydrationWarning
              onClick={() => setSelectedTemple(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors z-20 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-56 -mx-6 -mt-6 mb-4 overflow-hidden bg-stone-900">
              <img
                src={selectedTemple.image}
                alt={selectedTemple.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#78131e] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    {selectedTemple.state}
                  </span>
                  {selectedTemple.peethaNumber && (
                    <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                      Maha Shakti Peetha #{selectedTemple.peethaNumber}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight leading-tight">
                  {selectedTemple.name}
                </h2>
                <span className="text-xs text-amber-200/90 font-medium">
                  {selectedTemple.city}, {selectedTemple.state}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-700">
              <div>
                <h4 className="font-bold text-[#78131e] font-serif text-sm uppercase tracking-wide mb-1">
                  Sacred Significance & Legend
                </h4>
                <p className="leading-relaxed text-stone-700 text-xs sm:text-[13px]">
                  {selectedTemple.description}
                </p>
              </div>

              {selectedTemple.relic && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <span className="text-[11px] font-bold uppercase text-amber-900 block mb-0.5">
                    🔱 Shakti Peetha Relic
                  </span>
                  <p className="text-xs font-semibold text-stone-800">
                    {selectedTemple.relic}
                  </p>
                </div>
              )}

              {/* Darshan & Prasadam Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                <div className="bg-white rounded-xl border border-stone-200 p-3">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-700" /> Darshan Hours
                  </span>
                  <p className="text-xs font-bold text-stone-800">
                    {selectedTemple.timings}
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-stone-200 p-3">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Sacred Prasadam
                  </span>
                  <p className="text-xs font-bold text-stone-800">
                    {selectedTemple.prasadam}
                  </p>
                </div>
              </div>

              {/* Pilgrim Connectivity & Best Time */}
              <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                <div>
                  <span className="font-bold text-stone-900 block mb-0.5">
                    ✈️ How to Reach:
                  </span>
                  <p className="text-stone-600">{selectedTemple.howToReach}</p>
                </div>

                <div>
                  <span className="font-bold text-stone-900 block mb-0.5">
                    📅 Best Time to Visit:
                  </span>
                  <p className="text-stone-600">{selectedTemple.bestTime}</p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Buttons */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                suppressHydrationWarning
                onClick={() => setSelectedTemple(null)}
                className="w-full sm:w-auto px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-semibold text-xs hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Close Guide
              </button>
              <a
                href="#consult-astrologer"
                onClick={() => setSelectedTemple(null)}
                className="w-full sm:w-auto px-5 py-2 bg-[#78131e] hover:bg-[#600e17] text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Book Temple Seva / Consultation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
