'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, MapPin, Clock, Sparkles, Navigation, 
  ArrowRight, Landmark, Filter, Flame, Compass
} from 'lucide-react';
import { circuitsList, allTemplesData } from '../../data/templesData';
import TempleDirectionsModal from '../../components/TempleDirectionsModal';

// Coordinates mapping for all temples to ensure full Google Maps route functionality
const templeCoordinatesMap = {
  'somnath-jyotirlinga': { lat: 20.8880, lng: 70.4012 },
  'kashi-vishwanath': { lat: 25.3109, lng: 83.0107 },
  'kedarnath-jyotirlinga': { lat: 30.7352, lng: 79.0669 },
  'mahakaleshwar-ujjain': { lat: 23.1827, lng: 75.7682 },
  'rameshwaram-jyotirlinga': { lat: 9.2881, lng: 79.3174 },
  'omkareshwar-jyotirlinga': { lat: 22.2464, lng: 76.1506 },
  'bhimashankar-jyotirlinga': { lat: 19.0720, lng: 73.5354 },
  'trimbakeshwar-jyotirlinga': { lat: 19.9324, lng: 73.5308 },
  'vaidyanath-jyotirlinga': { lat: 24.4925, lng: 86.7001 },
  'nageshwar-jyotirlinga': { lat: 22.3347, lng: 69.0911 },
  'grishneshwar-jyotirlinga': { lat: 20.0232, lng: 75.1793 },
  'badrinath-dham': { lat: 30.7433, lng: 79.4938 },
  'puri-jagannath': { lat: 19.8049, lng: 85.8179 },
  'dwarkadhish-temple': { lat: 22.2376, lng: 68.9677 },
  'tirumala-tirupati': { lat: 13.6833, lng: 79.3472 },
  'ayodhya-ram-mandir': { lat: 26.7956, lng: 82.1943 },
  'vaishno-devi': { lat: 33.0308, lng: 74.9490 },
  'shirdi-sai-temple': { lat: 19.7667, lng: 74.4764 },
  'madurai-meenakshi': { lat: 9.9195, lng: 78.1193 },
  'ekambareswarar-earth': { lat: 12.8475, lng: 79.6997 },
  'jambukeswarar-water': { lat: 10.8534, lng: 78.7054 },
  'arunachaleswarar-fire': { lat: 12.2319, lng: 79.0677 },
  'srikalahasti-air': { lat: 13.7498, lng: 79.6984 },
  'chidambaram-space': { lat: 11.3992, lng: 79.6934 },
  'srisailam-bhramaramba': { lat: 16.0741, lng: 78.8682 },
  'kanchi-kamakshi': { lat: 12.8407, lng: 79.7037 },
  'kolhapur-mahalakshmi': { lat: 16.6944, lng: 74.2238 },
  'kashi-vishalakshi': { lat: 25.3076, lng: 83.0108 },
  'kamakhya-temple': { lat: 26.1663, lng: 91.7058 },
  'alampur-jogulamba': { lat: 15.8778, lng: 78.1368 },
  'pithapuram-puruhutika': { lat: 17.1166, lng: 82.2575 },
  'draksharamam-manikyamba': { lat: 16.7937, lng: 82.0628 },
  'mysore-chamundeshwari': { lat: 12.2727, lng: 76.6710 },
  'suryanar-sun': { lat: 11.0267, lng: 79.4975 },
  'thirunallar-saturn': { lat: 10.9272, lng: 79.7894 },
  'thirunageswaram-rahu': { lat: 10.9634, lng: 79.4326 }
};

export default function TemplesPage() {
  const router = useRouter();
  const [activeCircuit, setActiveCircuit] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [directionsTemple, setDirectionsTemple] = useState(null);

  // States list
  const stateList = useMemo(() => {
    const states = new Set(allTemplesData.map(t => t.state));
    return ['all', ...Array.from(states).sort()];
  }, []);

  // Filter temples
  const filteredTemples = useMemo(() => {
    return allTemplesData.filter(temple => {
      const circuitMatch = activeCircuit === 'all' 
        ? true 
        : temple.circuits && temple.circuits.includes(activeCircuit);

      const stateMatch = selectedState === 'all' 
        ? true 
        : temple.state === selectedState;

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

  // Open directions modal with coordinates fallback
  const handleOpenDirections = (temple, e) => {
    e.stopPropagation();
    const coords = templeCoordinatesMap[temple.id] || { lat: 13.6833, lng: 79.3472 };
    const enrichedTemple = {
      ...temple,
      lat: temple.lat || coords.lat,
      lng: temple.lng || coords.lng,
      peethaNumber: temple.peethaNumber || 1,
      transitGuide: temple.transitGuide || {
        roadhead: temple.howToReach || 'Direct road access to temple parking',
        car: temple.howToReach || 'Well connected via state and national highways',
        train: temple.howToReach || 'Nearest major railway station',
        flight: temple.howToReach || 'Nearest domestic airport',
        bus: 'State RTC and pilgrimage bus services available',
        specialTransitNote: ''
      }
    };
    setDirectionsTemple(enrichedTemple);
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-800 pb-20">
      
      {/* 1. Famous Temples of India Top Banner */}
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
              <span>Sacred Mahakshetras of Bharat • పుణ్య క్షేత్రాలు</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-white mb-2">
              Famous Temples of India & Sacred Circuits
            </h1>
            <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
              Explore India&apos;s most revered kshetras: The 12 Jyotirlingas, Char Dham, Pancha Bhoota Sthalams, Tirumala Balaji, Ayodhya Ram Mandir & Divya Desams. Click anywhere on any card to read its full history and Sthala Puranam.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/sacred-temples"
              className="bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>18 Maha Shakti Peethas (Sacred Temples) →</span>
            </Link>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-center text-white shrink-0 min-w-[95px]">
              <span className="text-2xl font-black font-serif text-amber-300 block">{allTemplesData.length}+</span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-100">Kshetras</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Catalog & Circuits */}
      <main className="w-[98.5%] max-w-[1920px] mx-auto px-2 sm:px-4 py-8">
        
        {/* Controls: Circuit Pills, Search & State Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#ebdcc7] mb-8 space-y-4">
          
          {/* Top row: Circuit Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-stone-100">
            {circuitsList.map((circuit) => {
              const isSelected = activeCircuit === circuit.id;
              const count = circuit.id === 'all' 
                ? allTemplesData.length 
                : allTemplesData.filter(t => t.circuits && t.circuits.includes(circuit.id)).length;

              return (
                <button
                  key={circuit.id}
                  suppressHydrationWarning
                  onClick={() => setActiveCircuit(circuit.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#78131e] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-900 border border-stone-200'
                  }`}
                >
                  <span>{circuit.icon}</span>
                  <span>{circuit.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom row: Search & State Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                suppressHydrationWarning
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Tirumala, Kashi, Somnath, Kedarnath, Ayodhya..."
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

            <div className="flex items-center gap-2 self-end md:self-auto text-xs sm:text-sm w-full md:w-auto">
              <Filter className="w-4 h-4 text-[#78131e] shrink-0" />
              <span className="text-stone-600 font-semibold whitespace-nowrap">Filter by State:</span>
              <select
                suppressHydrationWarning
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-stone-700 focus:outline-hidden focus:border-[#78131e]"
              >
                <option value="all">All States of India ({allTemplesData.length} Temples)</option>
                {stateList.filter(s => s !== 'all').map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Temple Cards Grid - Click Anywhere on Card to Navigate */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemples.map((temple) => (
            <div
              key={temple.id}
              onClick={() => router.push(`/temples/${temple.id}`)}
              className="bg-white rounded-2xl border border-[#ebdcc7] shadow-xs hover:shadow-xl hover:border-[#78131e]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer transform hover:-translate-y-1"
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

                  {/* Circuit Tag */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {temple.element && (
                      <span className="bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                        {temple.element}
                      </span>
                    )}
                    {temple.graha && (
                      <span className="bg-purple-800 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                        {temple.graha}
                      </span>
                    )}
                    {temple.circuits && temple.circuits.includes('jyotirlingas') && (
                      <span className="bg-[#78131e] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                        🔱 Jyotirlinga
                      </span>
                    )}
                    {temple.circuits && temple.circuits.includes('char-dham') && (
                      <span className="bg-amber-500 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                        🛕 Char Dham
                      </span>
                    )}
                  </div>

                  {/* Temple Complex Badge */}
                  <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs text-amber-200 border border-amber-300/40 text-[10px] font-bold px-2 py-0.5 rounded">
                    {temple.templeComplex || temple.city}
                  </div>

                  {/* Bottom Image Details */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-amber-300 font-serif font-bold text-xs block drop-shadow-xs">
                      {temple.deity}
                    </span>
                    <h3 className="text-white font-serif font-black text-base sm:text-lg drop-shadow-sm leading-snug group-hover:text-amber-200 transition-colors">
                      {temple.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-[#78131e] shrink-0" />
                    <span className="font-semibold text-stone-800">{temple.city}, {temple.state}</span>
                  </div>

                  <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                    {temple.description}
                  </p>

                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-stone-600">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-medium text-[11px] truncate">{temple.timings}</span>
                    </div>
                    {temple.prasadam && (
                      <div className="flex items-center gap-1.5 text-stone-600">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="text-[11px] text-amber-900 font-medium truncate">{temple.prasadam}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2 border-t border-stone-100 mt-2">
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    suppressHydrationWarning
                    onClick={(e) => handleOpenDirections(temple, e)}
                    className="flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-[#78131e] border border-amber-300 font-bold text-xs py-2 px-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 fill-current" />
                    <span>Directions</span>
                  </button>

                  <div className="flex items-center justify-center gap-1 bg-[#78131e] group-hover:bg-[#600e17] text-white font-bold text-xs py-2 px-2.5 rounded-xl transition-colors shadow-xs">
                    <span>Read History</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredTemples.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <Landmark className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-700">No temples matched your search</h3>
            <p className="text-stone-500 text-sm mt-1">Try resetting the state filter or selecting &quot;All Temples&quot;.</p>
            <button
              suppressHydrationWarning
              onClick={() => { setActiveCircuit('all'); setSelectedState('all'); setSearchQuery(''); }}
              className="mt-4 bg-[#78131e] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      {/* Directions Modal */}
      {directionsTemple && (
        <TempleDirectionsModal
          temple={directionsTemple}
          onClose={() => setDirectionsTemple(null)}
        />
      )}

    </div>
  );
}
