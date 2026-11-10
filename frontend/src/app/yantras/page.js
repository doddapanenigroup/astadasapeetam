'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  Hexagon, Sparkles, Compass, ShieldCheck, ChevronRight, 
  CheckCircle2, AlertCircle, ShoppingBag, ArrowUpRight
} from 'lucide-react';

export const yantrasList = [
  {
    id: 'sri-yantra',
    title: 'Sri Yantra & 3D Maha Meru',
    telugu: 'శ్రీ చక్ర యంత్రం & మహామ初期',
    deity: 'Supreme Goddess Sri Lalita Mahatripurasundari',
    metal: 'Pure Copper / Panchaloha / Ashtadhatu',
    direction: 'East or North-East (Ishanya)',
    significance: 'The mother of all sacred geometries consisting of 9 interlocking triangles (4 upward Shiva, 5 downward Shakti), forming 43 smaller triangles and the cosmic Bindu.',
    benefits: 'Radiates cosmic harmonic resonance, removes Vastu doshas, multiplies Lakshmi Kataksham, and brings deep peace and focus.',
    pratishthaVidhi: 'Bathe with raw cow milk and pure water on Friday morning; offer vermillion (Kumkum) with Lalita Sahasranama Archana and place upon white or red silk cloth.'
  },
  {
    id: 'kubera-yantra',
    title: 'Sri Kubera Yantra',
    telugu: 'శ్రీ కుబేర ధనాకర్షణ యంత్రం',
    deity: 'Lord Kubera & Goddess Mahalakshmi',
    metal: 'Gold Plated Copper',
    direction: 'North Direction (Kubera Sthanam)',
    significance: 'Sacred numerical magic square with mystical matrix numbers (each row, column, and diagonal adding to 72), magnetizing wealth flow and unlocking blocked funds.',
    benefits: 'Attracts new business streams, aids in debt clearance, stops financial leakages, and brings business expansion.',
    pratishthaVidhi: 'Install on Akshaya Tritiya, Dhanteras, or any Shukla Paksha Thursday/Friday. Light cow ghee deepam and offer white sweets or jaggery naivedyam.'
  },
  {
    id: 'sudarshana-yantra',
    title: 'Maha Sudarshana Yantra',
    telugu: 'శ్రీ మహా సుదర్శన యంత్రం',
    deity: 'Lord Sudarshana (The Cosmic Discus of Vishnu)',
    metal: 'Pure Heavy Copper',
    direction: 'Main Entrance / North-East',
    significance: 'Armed with fiery hexagrams and the sacred Sudarshana Chakra geometry, acts as an impenetrable spiritual shield that disintegrates negative energy and evil eye.',
    benefits: 'Neutralizes black magic, evil eye (Drishti dosha), court disputes, nightmares, and psychic afflictions.',
    pratishthaVidhi: 'Offer Tulasi dalams chanting Om Namo Narayanaya or Sudarshana Gayatri on Saturday morning or Swati Nakshatra.'
  },
  {
    id: 'navagraha-yantra',
    title: 'Sampoorna Navagraha Yantra',
    telugu: 'సంపూర్ణ నవగ్రహ యంత్రం',
    deity: 'The 9 Cosmic Planets (Surya to Ketu)',
    metal: 'Ashtadhatu (8 Sacred Metals)',
    direction: 'Center of Pooja Room / East',
    significance: 'Unifies all 9 planetary mandalas into one harmonious matrix, balancing malefic planetary transits, Sade Sati, and doshas in the family kundali.',
    benefits: 'Calms planetary turmoil, prevents unexpected delays, harmonizes family health, and supports professional longevity.',
    pratishthaVidhi: 'Offer 9 colored grains (Navadhanyas) and light sesame oil deepams during sunrise on Sundays.'
  },
  {
    id: 'saraswati-yantra',
    title: 'Sri Vidya Saraswati Yantra',
    telugu: 'శ్రీ విద్యా సరస్వతీ యంత్రం',
    deity: 'Mata Saraswati (Goddess of Learning & Arts)',
    metal: 'Pure Copper',
    direction: 'Study Desk / East',
    significance: 'The geometric embodiment of creative speech, memory, musical acumen, and academic excellence.',
    benefits: 'Greatly enhances student focus, analytical comprehension, exam performance, and removes speech hesitations.',
    pratishthaVidhi: 'Keep near books or study altar; offer white flowers and chant Om Aim Saraswatyai Namaha.'
  }
];

export default function YantrasPage() {
  const [selectedYantra, setSelectedYantra] = useState(yantrasList[0]);

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-stone-900 pb-16">
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#170B24] via-[#2F1047] to-[#170B24] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Hexagon className="w-3.5 h-3.5 text-amber-400" />
            <span>Tantra Sastra &amp; Sacred Geometry</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
            Sacred Energized Yantras &amp; Sri Chakra
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Vedic cosmic antennas: Sri Yantra, 3D Maha Meru, Kubera Yantra, Sudarshana Yantra, and Navagraha Yantras with authentic Prana Pratishtha and home installation vidhi.
          </p>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Selected Yantra Feature */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d5bc] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-serif font-black text-stone-900">
                  {selectedYantra.title}
                </h2>
                <span className="text-sm font-serif font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedYantra.telugu}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 font-medium">
                Deity: <strong className="text-stone-800">{selectedYantra.deity}</strong> • Recommended Placement: <strong className="text-amber-800">{selectedYantra.direction}</strong>
              </p>
            </div>

            <Link
              href="/marketplace"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-stone-950" />
              <span>Get Energized Yantra from Bazaar</span>
            </Link>
          </div>

          <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200/70 text-xs sm:text-sm font-medium text-stone-800 leading-relaxed font-serif">
            {selectedYantra.significance}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <h3 className="font-serif font-black text-sm text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Spiritual &amp; Material Benefits</span>
              </h3>
              <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                {selectedYantra.benefits}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
              <h3 className="font-serif font-black text-sm text-blue-950 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-blue-700" />
                <span>Prana Pratishtha &amp; Directional Vidhi</span>
              </h3>
              <p className="text-xs text-blue-900 font-medium leading-relaxed">
                {selectedYantra.pratishthaVidhi}
              </p>
            </div>
          </div>
        </section>

        {/* All Yantras Grid */}
        <section className="space-y-4">
          <h3 className="font-serif font-black text-lg text-stone-900">
            Sacred Geometric Shields &amp; Yantras
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {yantrasList.map((y) => (
              <div
                key={y.id}
                onClick={() => setSelectedYantra(y)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                  selectedYantra.id === y.id
                    ? 'bg-[#fbf5ee] border-amber-400 shadow-xs'
                    : 'bg-white border-[#ebdcc7] hover:border-amber-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-serif font-black text-base text-stone-900">
                    {y.title}
                  </h4>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    {y.metal.split(' ')[0]}
                  </span>
                </div>
                <span className="text-xs font-serif font-bold text-amber-900 block mb-2">
                  {y.telugu}
                </span>
                <p className="text-xs text-stone-600 font-serif line-clamp-2 leading-relaxed">
                  {y.significance}
                </p>
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#78131e]">
                  <span>View Installation Vidhi</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdBanner slotId="slot-4" type="in-feed-2" />
      </div>
    </div>
  );
}
