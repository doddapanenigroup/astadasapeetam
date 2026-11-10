'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  Sun, Moon, Compass, Sparkles, Star, ChevronRight, 
  Calendar, ShieldCheck, Heart, Briefcase, IndianRupee, AlertCircle
} from 'lucide-react';

export const rasiList = [
  {
    id: 'mesha',
    name: 'Mesha (Aries)',
    telugu: 'మేష రాశి',
    symbol: '♈',
    lord: 'Kuja (Mars)',
    element: 'Agni (Fire)',
    luckyColor: 'Coral Red / Crimson',
    luckyNumber: '9 & 1',
    luckyGem: 'Red Coral (Pagadam)',
    prediction: 'Financial gains through disciplined action. Auspicious period for ancestral property matters. Avoid hasty arguments with partners during afternoon hours.',
    career: 'High vitality, executive decisions bring rapid success.',
    finance: 'New investment opportunities in metals or land.',
    health: 'Take light Satvik meals; guard against mild eye strain.',
    remedy: 'Chant Hanuman Chalisa once and offer red flowers to Lord Subramanya.'
  },
  {
    id: 'vrishabha',
    name: 'Vrishabha (Taurus)',
    telugu: 'వృషభ రాశి',
    symbol: '♉',
    lord: 'Shukra (Venus)',
    element: 'Prithvi (Earth)',
    luckyColor: 'White / Silken Cream',
    luckyNumber: '6 & 2',
    luckyGem: 'Diamond / White Sapphire',
    prediction: 'Peaceful domestic atmosphere and divine grace in artistic and family pursuits. Auspicious travel opportunities arise with close elders.',
    career: 'Steady momentum and appreciation from superiors in creative projects.',
    finance: 'Expenses towards sacred ceremonies and home beautification.',
    health: 'Sound health with elevated mental calmness and positivity.',
    remedy: 'Offer raw cow milk or kheer to Goddess Mahalakshmi on Friday.'
  },
  {
    id: 'mithuna',
    name: 'Mithuna (Gemini)',
    telugu: 'మిథున రాశి',
    symbol: '♊',
    lord: 'Budha (Mercury)',
    element: 'Vayu (Air)',
    luckyColor: 'Emerald Green',
    luckyNumber: '5 & 3',
    luckyGem: 'Emerald (Marakatham)',
    prediction: 'Intellectual brilliance and persuasive speech help conclude pending negotiations. Auspicious day for communications, writing, and students.',
    career: 'Breakthrough ideas receive favorable nod from leadership.',
    finance: 'Unexpected recovery of old pending amounts.',
    health: 'Practice Pranayama to calm active thoughts and restlessness.',
    remedy: 'Feed fresh green grass or spinach to sacred cows (Gomata Seva).'
  },
  {
    id: 'karkataka',
    name: 'Karkataka (Cancer)',
    telugu: 'కర్కాటక రాశి',
    symbol: '♋',
    lord: 'Chandra (Moon)',
    element: 'Jala (Water)',
    luckyColor: 'Pearl White / Silver',
    luckyNumber: '2 & 7',
    luckyGem: 'Natural Pearl (Muthyam)',
    prediction: 'Emotional fulfillment and motherly blessings illuminate your day. Spiritual instincts are sharp; visiting a Shiva or Devi temple brings profound peace.',
    career: 'Supportive team members and favorable environment at workplace.',
    finance: 'Stable liquidity; avoid speculative day trading.',
    health: 'Stay well-hydrated; peaceful night sleep anticipated.',
    remedy: 'Perform Shiva Linga Abhishekam with pure water or milk.'
  },
  {
    id: 'simha',
    name: 'Simha (Leo)',
    telugu: 'సింహ రాశి',
    symbol: '♌',
    lord: 'Surya (Sun)',
    element: 'Agni (Fire)',
    luckyColor: 'Golden Yellow / Royal Orange',
    luckyNumber: '1 & 4',
    luckyGem: 'Ruby (Manikyam)',
    prediction: 'Leadership qualities shine brightly. Social respect, government approvals, and family dignity expand today. Step forward with confidence.',
    career: 'High recognition and potential promotion or major assignment.',
    finance: 'Generous earnings; auspicious investments in gold.',
    health: 'High energy and stamina throughout the day.',
    remedy: 'Offer Arghya to Lord Surya in early morning chanting Gayatri Mantra.'
  },
  {
    id: 'kanya',
    name: 'Kanya (Virgo)',
    telugu: 'కన్యా రాశి',
    symbol: '♍',
    lord: 'Budha (Mercury)',
    element: 'Prithvi (Earth)',
    luckyColor: 'Parrot Green & Light Amber',
    luckyNumber: '5 & 8',
    luckyGem: 'Emerald (Panna)',
    prediction: 'Analytical precision resolves complex challenges. Excellent time for budgeting, health checkups, and spiritual book reading.',
    career: 'Meticulous attention to detail earns heartfelt praise.',
    finance: 'Prudent savings and planned expenses keep finances strong.',
    health: 'Digestive vitality improves; stay with warm Satvik food.',
    remedy: 'Light a sesame oil deepam for Lord Vighnaharta Ganesha.'
  },
  {
    id: 'tula',
    name: 'Tula (Libra)',
    telugu: 'తులా రాశి',
    symbol: '♎',
    lord: 'Shukra (Venus)',
    element: 'Vayu (Air)',
    luckyColor: 'Pastel Blue & Rose Gold',
    luckyNumber: '6 & 9',
    luckyGem: 'Diamond / Opal',
    prediction: 'Harmonious partnerships and delightful social gatherings. Legal or partnership matters swing in your favor with graceful negotiations.',
    career: 'Diplomacy and collaborative spirit win over tough clients.',
    finance: 'Steady inflow from multiple legitimate sources.',
    health: 'Balance physical exercise with gentle mindful relaxation.',
    remedy: 'Recite Sri Suktam or offer fragrant white flowers to Mata Parvati.'
  },
  {
    id: 'vrischika',
    name: 'Vrischika (Scorpio)',
    telugu: 'వృశ్చిక రాశి',
    symbol: '♏',
    lord: 'Kuja (Mars)',
    element: 'Jala (Water)',
    luckyColor: 'Deep Crimson & Maroon',
    luckyNumber: '9 & 4',
    luckyGem: 'Red Coral (Moonga)',
    prediction: 'Unstoppable willpower overcomes all hurdles. Hidden talents come to light. Victory in competitive exams, court matters, and technical tasks.',
    career: 'Courageous decisions lead to significant milestone completion.',
    finance: 'Sudden gains from past investments or ancestral channels.',
    health: 'Avoid irregular meal hours; practice soothing deep breathing.',
    remedy: 'Chant Sri Subrahmanya Ashtakam and visit Lord Kartikeya temple.'
  },
  {
    id: 'dhanu',
    name: 'Dhanu (Sagittarius)',
    telugu: 'ధనుస్సు రాశి',
    symbol: '♐',
    lord: 'Guru (Jupiter)',
    element: 'Agni (Fire)',
    luckyColor: 'Bright Saffron & Turmeric Yellow',
    luckyNumber: '3 & 7',
    luckyGem: 'Yellow Sapphire (Pushyaragam)',
    prediction: 'Spiritual upliftment, pilgrimage inclinations, and divine guidance from a revered Guru or elder. Auspicious horizon for higher learning.',
    career: 'Teaching, advisory, and strategic roles flourish immensely.',
    finance: 'Prosperity increases; suitable time for charity and noble giving.',
    health: 'Robust well-being; vibrant mental clarity and optimism.',
    remedy: 'Apply pure sandalwood tilak and chant Om Gurave Namaha 108 times.'
  },
  {
    id: 'makara',
    name: 'Makara (Capricorn)',
    telugu: 'మకర రాశి',
    symbol: '♑',
    lord: 'Shani (Saturn)',
    element: 'Prithvi (Earth)',
    luckyColor: 'Midnight Blue & Charcoal',
    luckyNumber: '8 & 4',
    luckyGem: 'Blue Sapphire (Neelam)',
    prediction: 'Perseverance and ethical dedication bear sweet fruit. Long-pending administrative duties reach fruitful closure. Humility is your supreme strength.',
    career: 'Solid reputation as a dependable anchor in organizational challenges.',
    finance: 'Slow but rock-solid financial accumulation.',
    health: 'Take care of knees and joint mobility with gentle stretches.',
    remedy: 'Light a mustard oil lamp under a Peepal tree or for Lord Shani on Saturday.'
  },
  {
    id: 'kumbha',
    name: 'Kumbha (Aquarius)',
    telugu: 'కుంభ రాశి',
    symbol: '♒',
    lord: 'Shani (Saturn)',
    element: 'Vayu (Air)',
    luckyColor: 'Cyan / Electric Blue',
    luckyNumber: '8 & 11',
    luckyGem: 'Blue Sapphire / Amethyst',
    prediction: 'Visionary thinking and humanitarian initiatives attract wonderful like-minded souls. New community or temple seva brings profound fulfillment.',
    career: 'Innovative methods solve bottleneck issues effortlessly.',
    finance: 'Gains through collective ventures, tech, and spiritual networks.',
    health: 'Ensure adequate rest; hydrate well with herbal teas.',
    remedy: 'Donate black sesame seeds, umbrella, or footwear to the needy.'
  },
  {
    id: 'meena',
    name: 'Meena (Pisces)',
    telugu: 'మీన రాశి',
    symbol: '♓',
    lord: 'Guru (Jupiter)',
    element: 'Jala (Water)',
    luckyColor: 'Golden Yellow & Ocean Aqua',
    luckyNumber: '3 & 12',
    luckyGem: 'Yellow Topaz / Pearl',
    prediction: 'Sublime intuition and compassionate aura create magic. Divine visions, dreams, and devotion deepen your bond with the Supreme Almighty.',
    career: 'Empathy, counseling, creative design, and healing professions excel.',
    finance: 'Satisfactory wealth balance; expenditures for noble religious causes.',
    health: 'Calm and serene mind promotes deep spiritual peace.',
    remedy: 'Recite Vishnu Sahasranama Stotram or offer yellow bananas at temple.'
  }
];

export default function HoroscopePage() {
  const [selectedRasi, setSelectedRasi] = useState(rasiList[0]);
  const [timeframe, setTimeframe] = useState('today');

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-stone-900 pb-16">
      {/* Top Sponsored Ad */}
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#180A24] via-[#2A0E3C] to-[#180A24] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>12 Rasi Phalalu • Vedic Astrology</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
                Daily Horoscope &amp; Rasi Predictions
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                Daily astrological guidance for all 12 signs based on Chandra Rasi transit, planetary aspects, and sacred Vedic remedies.
              </p>
            </div>

            <div className="inline-flex p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-amber-400/30 text-xs font-bold">
              {['today', 'tomorrow', 'weekly', 'monthly'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3.5 py-1.5 rounded-xl capitalize cursor-pointer transition ${
                    timeframe === tf ? 'bg-amber-500 text-stone-950 font-black shadow-xs' : 'text-amber-200'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* 12 Rasi Quick Selector Grid */}
        <section>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
            <h2 className="text-lg font-serif font-black text-stone-900">
              Select Your Moon Sign (చంద్ర రాశి)
            </h2>
            <span className="text-xs text-amber-800 font-bold">12 Sacred Signs</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-2.5">
            {rasiList.map((rasi) => {
              const isSelected = selectedRasi.id === rasi.id;
              return (
                <button
                  key={rasi.id}
                  onClick={() => setSelectedRasi(rasi)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-[#78131e] text-white border-amber-400 shadow-md scale-105'
                      : 'bg-white text-stone-800 border-[#e8d5bc] hover:border-amber-400 hover:bg-amber-50/50'
                  }`}
                >
                  <span className="text-2xl">{rasi.symbol}</span>
                  <span className="text-xs font-serif font-bold leading-tight block">
                    {rasi.name.split(' ')[0]}
                  </span>
                  <span className={`text-[10px] block font-serif ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                    {rasi.telugu.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Rasi Detailed Insights Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d5bc] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#180A24] to-[#3B1268] text-amber-300 text-3xl font-serif flex items-center justify-center border border-amber-400/40 shadow-xs">
                {selectedRasi.symbol}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-serif font-black text-stone-900">
                    {selectedRasi.name}
                  </h3>
                  <span className="text-sm font-serif font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {selectedRasi.telugu}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 font-medium mt-1">
                  <span>Lord: <strong className="text-stone-800">{selectedRasi.lord}</strong></span>
                  <span>•</span>
                  <span>Element: <strong className="text-stone-800">{selectedRasi.element}</strong></span>
                  <span>•</span>
                  <span>Color: <strong className="text-stone-800">{selectedRasi.luckyColor}</strong></span>
                  <span>•</span>
                  <span>Numbers: <strong className="text-stone-800">{selectedRasi.luckyNumber}</strong></span>
                </div>
              </div>
            </div>

            <Link
              href="/astrology"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>Consult Astrologer for Detailed Kundali</span>
            </Link>
          </div>

          {/* General Prediction */}
          <div className="p-4.5 bg-amber-50/50 rounded-2xl border border-amber-200/70">
            <span className="text-[11px] font-mono font-bold uppercase text-amber-900 tracking-wider block mb-1">
              General Forecast for {timeframe.toUpperCase()}
            </span>
            <p className="text-sm font-medium text-stone-800 leading-relaxed font-serif">
              {selectedRasi.prediction}
            </p>
          </div>

          {/* Core Life Aspects (Career, Finance, Health) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                <Briefcase className="w-4 h-4 text-sky-700" />
                <span>Career &amp; Profession</span>
              </div>
              <p className="text-xs text-stone-700 font-medium leading-relaxed">
                {selectedRasi.career}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                <IndianRupee className="w-4 h-4 text-emerald-700" />
                <span>Finance &amp; Wealth</span>
              </div>
              <p className="text-xs text-stone-700 font-medium leading-relaxed">
                {selectedRasi.finance}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                <Heart className="w-4 h-4 text-rose-700" />
                <span>Health &amp; Energy</span>
              </div>
              <p className="text-xs text-stone-700 font-medium leading-relaxed">
                {selectedRasi.health}
              </p>
            </div>
          </div>

          {/* Vedic Remedy (Pariharam) */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border border-emerald-200/80 flex items-start gap-3">
            <span className="text-2xl shrink-0">🌿</span>
            <div>
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                Today's Sacred Vedic Remedy (శాస్త్ర పరిహారం)
              </h4>
              <p className="text-xs text-emerald-900 font-medium mt-0.5 leading-relaxed">
                {selectedRasi.remedy}
              </p>
            </div>
          </div>
        </section>

        {/* In-feed Ad Banner */}
        <AdBanner slotId="slot-2" type="in-feed-1" />
      </div>
    </div>
  );
}
