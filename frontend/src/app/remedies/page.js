'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  Sparkles, ShieldCheck, ChevronRight, AlertTriangle, 
  CheckCircle2, Compass, PhoneCall, ShoppingBag
} from 'lucide-react';

export const remediesList = [
  {
    id: 'sade-sati',
    title: 'Shani Sade Sati & Ashtama Shani Remedies',
    telugu: 'శని దోష & ఏలినాటి శని పరిహారములు',
    dosha: 'Saturn Transit afflictions causing delays, mental stress & friction',
    remedySteps: [
      'Light a sesame oil (Nuvvula nune) deepam on Saturday during sunset under a Peepal tree or for Lord Shani.',
      'Recite Dasaratha Kruta Shani Stotram every Saturday morning.',
      'Wear a lab-certified 7-Mukhi or 14-Mukhi authentic Himalayan Rudraksha.',
      'Donate black sesame seeds, iron vessels, black blankets, or mustard oil to the needy.',
      'Visit Sri Shani Shingnapur or Mandapalli Shani temple for Tailabhishekam.'
    ],
    fastingDay: 'Saturday (Shanivaram)',
    stone: 'Blue Sapphire / Amethyst (upon astrological recommendation)'
  },
  {
    id: 'kuja-dosha',
    title: 'Kuja (Manglik) Dosha & Marriage Delays',
    telugu: 'కుజ దోష నివారణ & శీఘ్ర వివాహ ప్రాప్తి',
    dosha: 'Mars placement in 1st, 2nd, 4th, 7th, 8th or 12th house',
    remedySteps: [
      'Perform Subrahmanya Swamy Shasti Pooja or Kuja Kalyanam.',
      'Recite Subrahmanya Bhujanga Stotram or Mangala Chandika Stotram on Tuesdays.',
      'Wear 3-Mukhi Rudraksha to appease the fiery energy of Mars (Agni Swaroopa).',
      'Offer red lentils (Kandi Pappu) and jaggery naivedyam at temple.',
      'Visit Vaitheeswaran Koil (Chevva Kshetram) or Kukke Subrahmanya.'
    ],
    fastingDay: 'Tuesday (Mangalavaram)',
    stone: 'Natural Red Coral (Pagadam)'
  },
  {
    id: 'sarpa-dosha',
    title: 'Rahu-Ketu & Sarpa Dosha Nivarana',
    telugu: 'సర్ప దోష & కాలసర్ప దోష నివారణ',
    dosha: 'All 7 classical planets hemmed between Rahu and Ketu axis',
    remedySteps: [
      'Perform Rahu-Ketu Sarpa Dosha Nivarana Pooja at Sri Kalahasti Temple.',
      'Recite Sri Maha Mrityunjaya Mantra 108 times daily.',
      'Wear an authentic 8-Mukhi (Ganesha/Rahu) and 9-Mukhi (Durga/Ketu) Rudraksha combination.',
      'Offer silver serpent pair (Naga Prathishta) in sacred river waters.',
      'Feed stray dogs with sweet rotis on Wednesday and Saturday.'
    ],
    fastingDay: 'Nagula Chavithi / Swati Nakshatram',
    stone: 'Gomedha (Hessonite) & Cat’s Eye (Chrysoberyl)'
  },
  {
    id: 'pitru-dosha',
    title: 'Pitru Dosha & Ancestral Blessing Remedies',
    telugu: 'పితృ దోష నివారణ & అమావాస్య తర్పణము',
    dosha: 'Ancestral discontent causing progeny delays, health ailments & stagnation',
    remedySteps: [
      'Perform Tila Tarpana on Amavasya (New Moon) days with pure water, sesame seeds, and kusha grass.',
      'Perform Gaya Shraddha, Kashi Pinda Dana, or Rameswaram Tirtha Snanam.',
      'Feed black cows (Gomata Seva) with bananas, soaked grass, and water.',
      'Donate food (Anna Danam) to orphanages or Vedic Pathashalas on Pitru Paksha.'
    ],
    fastingDay: 'Mahalaya Amavasya / Monthly Amavasya',
    stone: 'Spiritual Seva & Anna Dana is the supreme remedy'
  },
  {
    id: 'drishti-dosha',
    title: 'Nara Drishti (Evil Eye) & Vastu Cleansing',
    telugu: 'నరదృష్టి & వాస్తు దోష నివారణోపాయములు',
    dosha: 'Heavy negative envies, sudden stagnation, frequent domestic friction',
    remedySteps: [
      'Install a 3D Maha Meru or heavy copper Sudarshana Yantra at home entrance.',
      'Perform salt and mustard (Avalu) Drishti removal on Tuesdays and Sundays.',
      'Burn pure Sambrani with Guggul and Bhimseni Camphor at twilight.',
      'Hang white pumpkin (Boodida Gummadikaya) or Mahakali yantra at main threshold.'
    ],
    fastingDay: 'Amavasya & Purnima nights',
    stone: 'Black Tourmaline / Energized Gomati Chakras'
  }
];

export default function RemediesPage() {
  const [selectedRemedy, setSelectedRemedy] = useState(remediesList[0]);

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-stone-900 pb-16">
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#21090C] via-[#3B0E14] to-[#21090C] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Jyotisha Parihara Sastra</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
            Vedic Remedies (Upayas) &amp; Dosha Nivarana
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Authentic scriptural solutions for Shani Sade Sati, Kuja (Manglik) dosha, Sarpa dosha, and evil eye through holy parayanam, gemstone science, and temple danams.
          </p>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Selected Remedy Details */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d5bc] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-serif font-black text-stone-900">
                  {selectedRemedy.title}
                </h2>
                <span className="text-sm font-serif font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedRemedy.telugu}
                </span>
              </div>
              <p className="text-xs text-rose-800 font-medium mt-1">
                Root Cause: {selectedRemedy.dosha}
              </p>
            </div>

            <Link
              href="/astrology"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-stone-950" />
              <span>Talk to Verified Astrologer</span>
            </Link>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-black text-base text-stone-900 flex items-center gap-2">
              <span>🌿</span> Scripturally Sanctioned Parihara Steps
            </h3>
            <ul className="space-y-2.5">
              {selectedRemedy.remedySteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800 font-medium leading-relaxed bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs">
              <span className="font-bold text-amber-950 block mb-0.5">Recommended Fasting &amp; Japa Day:</span>
              <p className="text-amber-900 font-medium">{selectedRemedy.fastingDay}</p>
            </div>

            <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 text-xs">
              <span className="font-bold text-purple-950 block mb-0.5">Compatible Gemstone &amp; Kavacham:</span>
              <p className="text-purple-900 font-medium">{selectedRemedy.stone}</p>
            </div>
          </div>
        </section>

        {/* All Remedies Directory */}
        <section className="space-y-4">
          <h3 className="font-serif font-black text-lg text-stone-900">
            Common Astrological Doshas &amp; Vedic Cures
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {remediesList.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedRemedy(r)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                  selectedRemedy.id === r.id
                    ? 'bg-[#fbf5ee] border-amber-400 shadow-xs'
                    : 'bg-white border-[#ebdcc7] hover:border-amber-400'
                }`}
              >
                <h4 className="font-serif font-black text-base text-stone-900 mb-1">
                  {r.title}
                </h4>
                <span className="text-xs font-serif font-bold text-amber-900 block mb-2">
                  {r.telugu}
                </span>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {r.dosha}
                </p>
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#78131e]">
                  <span>View Full Pariharam</span>
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
