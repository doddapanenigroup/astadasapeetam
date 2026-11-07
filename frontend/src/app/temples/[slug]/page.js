'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  MapPin, Clock, Calendar, Compass, Navigation, Car, Bus, 
  Train, Plane, Footprints, ShieldAlert, Sparkles, Star, 
  CheckCircle2, ArrowLeft, ExternalLink, Share2, Heart, 
  Phone, Landmark, BookOpen
} from 'lucide-react';
import { shaktiPeethasData } from '../../../data/shaktiPeethasData';
import { allTemplesData } from '../../../data/templesData';
import TempleDirectionsModal from '../../../components/TempleDirectionsModal';

// Coordinates mapping for famous all-India temples
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
  'mysore-chamundeshwari': { lat: 12.2727, lng: 76.6710 }
};

export default function TempleDetailPage() {
  const params = useParams();
  const slug = params?.slug;
  const [directionsModalOpen, setDirectionsModalOpen] = useState(false);
  const [selectedTransitTab, setSelectedTransitTab] = useState('car'); // 'car' | 'bus' | 'train' | 'flight'

  // Look up temple in shaktiPeethasData first, then allTemplesData
  const foundShakti = shaktiPeethasData.find(t => t.slug === slug || t.id === slug);
  const foundAll = allTemplesData.find(t => t.id === slug);

  const temple = useMemo(() => {
    if (foundShakti) return foundShakti;
    if (foundAll) {
      const coords = templeCoordinatesMap[foundAll.id] || { lat: 13.6833, lng: 79.3472 };
      return {
        ...foundAll,
        peethaNumber: foundAll.peethaNumber || 1,
        slug: foundAll.id,
        teluguName: foundAll.name,
        location: `${foundAll.city}, ${foundAll.state}`,
        relicFallen: foundAll.element || foundAll.relic || foundAll.graha || 'Sacred Mahakshetra Relic',
        relicTelugu: foundAll.element ? `${foundAll.element} తత్వ లింగం` : 'పుణ్య క్షేత్రం',
        stotramFull: foundAll.description,
        summary: foundAll.description,
        sthalaPuranam: `${foundAll.description}\n\nThis consecrated shrine has drawn saints, kings, and millions of devotees for centuries. Regular pujas, daily archana, and divine abhishekams continue in strict accordance with the ancient Vedic Agamas.`,
        architecture: `Classic temple architecture featuring intricate stone carvings, mandapams, and sacred Pushkarini (holy water tank). Located in ${foundAll.city}, ${foundAll.state}.`,
        festivals: [foundAll.bestTime || 'Annual Brahmotsavams', 'Maha Shivaratri / Navaratri', 'Karthika Deepotsavam'],
        lat: coords.lat,
        lng: coords.lng,
        transitGuide: {
          roadhead: foundAll.howToReach || 'Direct road access to temple parking',
          car: foundAll.howToReach || 'Well connected via state and national highways',
          train: foundAll.howToReach || 'Nearest major railway junction',
          flight: foundAll.howToReach || 'Nearest operational airport',
          bus: 'Frequent state RTC buses and pilgrimage tours operate to the temple',
          specialTransitNote: ''
        }
      };
    }
    return shaktiPeethasData[0];
  }, [foundShakti, foundAll]);

  const gmapsEmbedUrl = `https://maps.google.com/maps?q=${temple.lat},${temple.lng}&hl=en&z=14&output=embed`;
  const gmapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${temple.lat},${temple.lng}&travelmode=driving`;

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-800 pb-20">
      
      {/* 1. Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-[#ebdcc7] py-2.5 px-4 text-xs">
        <div className="w-[98.5%] max-w-[1920px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-500 truncate">
            <Link href="/" className="hover:text-[#78131e] font-medium">Home</Link>
            <span>/</span>
            <Link href="/temples" className="hover:text-[#78131e] font-medium">Temples (Shakti Peethas)</Link>
            <span>/</span>
            <span className="text-stone-900 font-bold truncate">{temple.name}</span>
          </div>

          <Link 
            href="/temples"
            className="inline-flex items-center gap-1 text-[#78131e] hover:text-[#540b13] font-bold shrink-0 ml-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All 18 Shakti Peethas</span>
          </Link>
        </div>
      </div>

      {/* 2. Temple Hero Banner */}
      <section 
        className="w-full text-white py-10 px-4 border-b border-amber-900/40 relative overflow-hidden"
        style={{
          backgroundColor: '#6b111b',
          backgroundImage: 'linear-gradient(135deg, #78131e 0%, #540b13 100%)'
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="w-[98.5%] max-w-[1920px] mx-auto relative z-10">
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="space-y-3 max-w-4xl">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-400 text-stone-950 font-black text-xs px-3 py-1 rounded-full shadow-xs">
                  Maha Shakti Peetha #{temple.peethaNumber} of 18
                </span>
                <span className="bg-white/15 text-amber-200 border border-amber-300/30 text-xs px-3 py-1 rounded-full font-semibold">
                  Relic: {temple.relicFallen}
                </span>
                <span className="bg-emerald-800/60 text-emerald-200 border border-emerald-400/30 text-xs px-3 py-1 rounded-full font-semibold">
                  {temple.relicTelugu}
                </span>
              </div>

              {/* Titles */}
              <div>
                <span className="text-amber-300 font-serif font-bold text-lg sm:text-xl block drop-shadow-xs">
                  {temple.teluguName}
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white mt-1">
                  {temple.name}
                </h1>
              </div>

              {/* Location & Deities */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-amber-100/90 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{temple.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold">{temple.deity}</span>
                </div>
              </div>
            </div>

            {/* Quick Directions Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                suppressHydrationWarning
                onClick={() => setDirectionsModalOpen(true)}
                className="bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold px-6 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Navigation className="w-4 h-4 fill-current text-stone-950" />
                <span>Get Directions & Google Map</span>
              </button>

              <Link
                href="/yatralu"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm text-center"
              >
                <Landmark className="w-4 h-4 text-amber-300" />
                <span>Book Yatra Package</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Sacred Adi Shankaracharya Stotram Verse Banner */}
      <section className="bg-amber-50 border-b border-amber-200/80 py-4 px-4">
        <div className="w-[98.5%] max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#78131e] text-amber-300 flex items-center justify-center font-bold text-lg shrink-0">
              🕉️
            </div>
            <div>
              <span className="text-[10px] text-amber-900 font-extrabold uppercase tracking-widest block">
                Adi Shankaracharya Ashtadasa Shakti Peetha Stotram
              </span>
              <p className="font-serif font-black text-stone-900 text-sm sm:text-base mt-0.5">
                {temple.stotramFull}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0 hidden md:block">
            <span className="text-xs bg-amber-200 text-amber-950 font-bold px-2.5 py-1 rounded-full">
              Verse Reference #{temple.peethaNumber}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Main Details Grid */}
      <main className="w-[98.5%] max-w-[1920px] mx-auto px-2 sm:px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 7/12: Sthala Puranam, Architecture & History */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Cover */}
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-[#ebdcc7] shadow-sm">
              <Image
                src={temple.image}
                alt={temple.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-amber-300 font-serif font-bold text-sm block">
                  {temple.teluguName}
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-serif">
                  {temple.name}
                </h2>
                <p className="text-xs text-amber-100/90 mt-1 line-clamp-2">
                  {temple.summary}
                </p>
              </div>
            </div>

            {/* Sthala Puranam (Puranic History) */}
            <div className="bg-white rounded-2xl p-6 border border-[#ebdcc7] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#78131e] font-serif font-bold text-lg border-b border-stone-100 pb-2">
                <BookOpen className="w-5 h-5 text-[#78131e]" />
                <h3>Sthala Puranam & Ancient Legend (క్షేత్ర పురాణ గాథ)</h3>
              </div>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {temple.sthalaPuranam}
              </p>
            </div>

            {/* Temple Architecture & History */}
            <div className="bg-white rounded-2xl p-6 border border-[#ebdcc7] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg border-b border-stone-100 pb-2">
                <Landmark className="w-5 h-5 text-amber-700" />
                <h3>Architecture & Historic Inscriptions (ఆలయ శిల్పకళ & చరిత్ర)</h3>
              </div>
              <p className="text-stone-700 text-sm leading-relaxed">
                {temple.architecture}
              </p>
            </div>

            {/* Major Festivals */}
            <div className="bg-white rounded-2xl p-6 border border-[#ebdcc7] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg border-b border-stone-100 pb-2">
                <Calendar className="w-5 h-5 text-amber-700" />
                <h3>Sacred Festivals & Brahmotsavams (ముఖ్య ఉత్సవాలు)</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {temple.festivals.map((fest, idx) => (
                  <span 
                    key={idx}
                    className="bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{fest}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Timings & Prasadam */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Clock className="w-4 h-4 text-[#78131e]" />
                  <span>Daily Darshan Timings</span>
                </div>
                <p className="text-xs text-stone-700 font-medium">{temple.timings}</p>
                <span className="text-[11px] text-stone-500 block">Morning Suprabhatam to Ekantha Seva</span>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Sacred Prasadam & Teertham</span>
                </div>
                <p className="text-xs text-stone-700 font-medium">{temple.prasadam}</p>
                <span className="text-[11px] text-stone-500 block">Blessed by Mata in Sanctum</span>
              </div>
            </div>

          </div>

          {/* RIGHT 5/12: Interactive Google Maps, Directions & Travel Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Embedded Live Google Maps Card */}
            <div className="bg-white rounded-2xl border border-[#ebdcc7] shadow-xs overflow-hidden">
              <div className="p-4 bg-[#78131e] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <h3 className="font-serif font-bold text-sm">Live Google Map & GPS</h3>
                </div>
                <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-2 py-0.5 rounded-full">
                  Coordinates: {temple.lat.toFixed(3)}, {temple.lng.toFixed(3)}
                </span>
              </div>

              {/* Map Iframe */}
              <div className="h-64 w-full bg-stone-100 relative">
                <iframe
                  title={`Google Map - ${temple.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={gmapsEmbedUrl}
                />
              </div>

              {/* Action Buttons underneath map */}
              <div className="p-4 bg-stone-50 space-y-2">
                <button
                  suppressHydrationWarning
                  onClick={() => setDirectionsModalOpen(true)}
                  className="w-full bg-[#78131e] hover:bg-[#600e17] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-amber-300 fill-current" />
                  <span>View Full In-Website Route & GPS Navigation</span>
                </button>

                <button
                  suppressHydrationWarning
                  onClick={() => setDirectionsModalOpen(true)}
                  className="w-full bg-white hover:bg-amber-50 text-stone-800 border border-stone-300 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-amber-700" />
                  <span>Change Starting City & Transport Modes</span>
                </button>
              </div>
            </div>

            {/* Pilgrim Transit Advisory (Remote Access / Ghat / River) */}
            {temple.transitGuide && temple.transitGuide.specialTransitNote && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-xs sm:text-sm">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Sacred Pilgrim Transit Advisory:</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {temple.transitGuide.specialTransitNote}
                </p>
                <div className="pt-1 text-[11px] text-stone-500 font-medium">
                  📍 Vehicle Roadhead: {temple.transitGuide.roadhead}
                </div>
              </div>
            )}

            {/* How to Reach Breakdown Tabs */}
            <div className="bg-white rounded-2xl border border-[#ebdcc7] shadow-xs p-5 space-y-3">
              <h3 className="font-serif font-bold text-stone-900 text-sm">
                How to Reach {temple.name}
              </h3>

              {/* Mode Tabs */}
              <div className="flex gap-1 border-b border-stone-200 pb-2 text-xs">
                <button
                  suppressHydrationWarning
                  onClick={() => setSelectedTransitTab('car')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    selectedTransitTab === 'car' ? 'bg-[#78131e] text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>By Road</span>
                </button>

                <button
                  suppressHydrationWarning
                  onClick={() => setSelectedTransitTab('train')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    selectedTransitTab === 'train' ? 'bg-[#78131e] text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Train className="w-3.5 h-3.5" />
                  <span>By Train</span>
                </button>

                <button
                  suppressHydrationWarning
                  onClick={() => setSelectedTransitTab('flight')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    selectedTransitTab === 'flight' ? 'bg-[#78131e] text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>By Air</span>
                </button>

                <button
                  suppressHydrationWarning
                  onClick={() => setSelectedTransitTab('bus')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    selectedTransitTab === 'bus' ? 'bg-[#78131e] text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Bus className="w-3.5 h-3.5" />
                  <span>By Bus</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs text-stone-700 pt-1 leading-relaxed">
                {selectedTransitTab === 'car' && (
                  <p>{temple.transitGuide.car}</p>
                )}
                {selectedTransitTab === 'train' && (
                  <p>{temple.transitGuide.train}</p>
                )}
                {selectedTransitTab === 'flight' && (
                  <p>{temple.transitGuide.flight}</p>
                )}
                {selectedTransitTab === 'bus' && (
                  <p>{temple.transitGuide.bus}</p>
                )}
              </div>
            </div>

            {/* Book Tour Banner */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-5 text-stone-950 space-y-2 shadow-md">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-stone-950 text-amber-300 px-2 py-0.5 rounded">
                Astadasapeetam Pilgrim Special
              </span>
              <h4 className="font-serif font-black text-base">
                Want a hassle-free VIP Yatra to this Shakti Peetha?
              </h4>
              <p className="text-xs text-stone-900 leading-relaxed">
                Join our curated AC luxury coach yatras with confirmed VIP Sheegra Darshan, pure satvik meals, and Vedic priest sankalpam.
              </p>
              <Link
                href="/yatralu"
                className="inline-flex items-center gap-1.5 bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs px-4 py-2 rounded-xl mt-1 shadow-sm transition-colors"
              >
                <span>View Yatra Packages</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </Link>
            </div>

          </div>

        </div>
      </main>

      {/* 5. Google Maps Directions Modal */}
      {directionsModalOpen && (
        <TempleDirectionsModal
          temple={temple}
          onClose={() => setDirectionsModalOpen(false)}
        />
      )}

    </div>
  );
}
