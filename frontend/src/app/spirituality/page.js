'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  HeartHandshake, BookOpen, Sparkles, Compass, Sun, 
  ChevronRight, CheckCircle2, Quote, Flower2
} from 'lucide-react';

export const dharmaPillars = [
  {
    title: 'Chaturvidha Purusharthas',
    telugu: 'చతుర్విధ పురుషార్థములు',
    icon: '🔱',
    concept: 'The 4 fundamental goals of human existence: Dharma (Righteous Duty), Artha (Ethical Wealth), Kama (Noble Desires), and Moksha (Spiritual Liberation). Life thrives when Artha and Kama are anchored upon Dharma.',
    subpoints: [
      'Dharma: Acting in alignment with cosmic truth, integrity, and universal harmony.',
      'Artha: Acquiring wealth ethically to serve family, cows, temples, and society.',
      'Kama: Experiencing pure joys within the boundaries of dharma.',
      'Moksha: The ultimate liberation from the cycle of birth and death (Samsara).'
    ]
  },
  {
    title: 'Karma Siddhanta (Law of Action)',
    telugu: 'కర్మ సిద్ధాంతం',
    icon: '⚖️',
    concept: 'Every thought, word, and deed creates an indelible cosmic impression. Nothing in the universe is accidental; we are the conscious authors of our destiny.',
    subpoints: [
      'Sanchita Karma: The accumulated cosmic reserve of all past lives’ actions.',
      'Prarabdha Karma: The specific slice of past karma ripening in this present lifetime.',
      'Kriyamana Karma: The fresh actions we create today with conscious free will (Purushartha).'
    ]
  },
  {
    title: 'Bhagavad Gita Yoga Margas',
    telugu: 'భగవద్గీతా యోగ మార్గములు',
    icon: '🪷',
    concept: 'Delivered by Lord Sri Krishna upon the Kurukshetra battlefield, outlining three divine paths suitable for every human temperament.',
    subpoints: [
      'Karma Yoga: Selfless action dedicated to the Divine without obsessive clinging to fruits.',
      'Bhakti Yoga: Unconditional love, surrender (Prapatti), and remembrance of the Lord.',
      'Jnana Yoga: Discrimination between the eternal Self (Atman) and transient matter (Prakriti).'
    ]
  },
  {
    title: 'Sanatana Satvik Daily Lifestyle',
    telugu: 'సాత్విక జీవన విధానం',
    icon: '🪔',
    concept: 'Living in rhythm with nature (Rta), honoring the five sacred daily debts (Pancha Maha Yajnas), and nurturing peace across mind, body, and speech.',
    subpoints: [
      'Brahma Yajna: Daily study and contemplation of sacred scriptures.',
      'Deva Yajna: Offering light, incense, and devotion to the Divine.',
      'Pitru Yajna: Honoring parents, ancestors, and elders with gratitude.',
      'Manushya Yajna: Hospitality and generosity toward guests and the needy.',
      'Bhuta Yajna: Feeding birds, cows (Gomata), and honoring Mother Nature.'
    ]
  }
];

export default function SpiritualityPage() {
  const [selectedPillar, setSelectedPillar] = useState(dharmaPillars[0]);

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-stone-900 pb-16">
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E0921] via-[#350F3C] to-[#1E0921] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            <span>Sanatana Dharma • Vedic Philosophy &amp; Jnana</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
            Vedic Spirituality &amp; Eternal Dharma
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Timeless wisdom from the Upanishads, Bhagavad Gita, Karma Siddhanta, and the four Purusharthas for living a purpose-driven, peaceful, and liberated life.
          </p>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Core Teachings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dharmaPillars.map((p, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e8d5bc] shadow-xs space-y-4 hover:border-amber-400/60 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{p.icon}</span>
                <div>
                  <h3 className="font-serif font-black text-lg text-stone-900">
                    {p.title}
                  </h3>
                  <span className="text-xs font-serif font-bold text-amber-900">
                    {p.telugu}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed font-serif bg-amber-50/40 p-3.5 rounded-2xl border border-amber-200/50">
                {p.concept}
              </p>

              <ul className="space-y-2 text-xs text-stone-700 font-medium">
                {p.subpoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sacred Quote Callout */}
        <div className="p-8 bg-gradient-to-br from-[#2E0B12] via-[#5C1322] to-[#2E0B12] text-amber-100 rounded-3xl border border-amber-500/40 text-center space-y-3 relative overflow-hidden shadow-sm">
          <Quote className="w-8 h-8 text-amber-400/40 mx-auto" />
          <blockquote className="font-serif italic text-base sm:text-xl font-bold max-w-3xl mx-auto leading-relaxed text-amber-100">
            "ధర్మో రక్షతి రక్షితః — Dharmo Rakshati Rakshitaha. Dharma protects those who uphold and protect Dharma."
          </blockquote>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-300 block">
            — Mahabharata (Vana Parva)
          </span>
        </div>

        <AdBanner slotId="slot-4" type="in-feed-2" />
      </div>
    </div>
  );
}
