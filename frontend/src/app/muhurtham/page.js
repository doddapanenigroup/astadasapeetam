'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  Hourglass, Clock, Sparkles, Calendar, Compass, 
  Sun, Moon, ShieldCheck, ChevronRight, CheckCircle2, AlertTriangle, MapPin
} from 'lucide-react';

export default function MuhurthamPage() {
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const todayMuhurthams = [
    {
      name: 'Brahma Muhurtham',
      telugu: 'బ్రాహ్మీ ముహూర్తం',
      time: '04:32 AM – 05:20 AM',
      quality: 'Most Auspicious',
      type: 'shubh',
      purpose: 'Meditation, Yoga, Veda Parayanam & Mantra Japa',
      benefit: 'Highest spiritual purity and mental concentration.'
    },
    {
      name: 'Abhijit Muhurtham',
      telugu: 'అభిజిత్ ముహూర్తం',
      time: '11:48 AM – 12:38 PM',
      quality: 'Supreme Victory',
      type: 'shubh',
      purpose: 'Commencing any sacred venture, journey, or new deed',
      benefit: 'Lord Vishnu blessed window that neutralizes minor planetary doshas.'
    },
    {
      name: 'Amrita Kalam',
      telugu: 'అమృత కాలం',
      time: '02:15 PM – 03:48 PM',
      quality: 'Nectar Window',
      type: 'shubh',
      purpose: 'Pooja, Dana, Satyanarayana Vratam, financial commitments',
      benefit: 'Yields long-lasting prosperity and peace.'
    },
    {
      name: 'Godhuli Muhurtham',
      telugu: 'గోధూళి ముహూర్తం',
      time: '06:18 PM – 06:42 PM',
      quality: 'Twilight Grace',
      type: 'shubh',
      purpose: 'Sandhya Deeparadhana, temple darshan & marriage blessings',
      benefit: 'Clears domestic obstacles and invites Lakshmi Devi.'
    },
    {
      name: 'Rahu Kalam',
      telugu: 'రాహు కాలం',
      time: '10:30 AM – 12:00 PM',
      quality: 'Inauspicious (Avoid)',
      type: 'ashubh',
      purpose: 'Avoid commencing travels, new projects or signing agreements',
      benefit: 'Only Rahu Stotra Japa or Durga Deepam recommended.'
    },
    {
      name: 'Yamagandam',
      telugu: 'యమగండం',
      time: '03:00 PM – 04:30 PM',
      quality: 'Obstacle Prone',
      type: 'ashubh',
      purpose: 'Strictly avoid financial investments & new contracts',
      benefit: 'Preserve ongoing quiet tasks; avoid auspicious ventures.'
    },
    {
      name: 'Durmuhurtham',
      telugu: 'దుర్ముహూర్తం',
      time: '08:14 AM – 09:05 AM',
      quality: 'Restricted',
      type: 'ashubh',
      purpose: 'Avoid major negotiations and important purchases',
      benefit: 'Reserved for routine daily duties only.'
    }
  ];

  const upcomingMajorMuhurthams = [
    {
      category: 'marriage',
      title: 'Vivaha (Marriage) Shubh Muhurthams',
      telugu: 'వివాహ శుభ ముహూర్తములు',
      icon: '💍',
      dates: [
        { date: '14 June 2026', tithi: 'Shukla Navami', nakshatra: 'Hasta', time: '08:45 AM (Vrishabha Lagna)' },
        { date: '21 June 2026', tithi: 'Shukla Trayodashi', nakshatra: 'Swati', time: '10:15 AM (Mithuna Lagna)' },
        { date: '08 July 2026', tithi: 'Shukla Dashami', nakshatra: 'Anuradha', time: '07:20 AM (Karkataka Lagna)' }
      ]
    },
    {
      category: 'griha',
      title: 'Griha Pravesham (Housewarming) Muhurthams',
      telugu: 'గృహప్రవేశ శుభ ముహూర్తములు',
      icon: '🏡',
      dates: [
        { date: '18 June 2026', tithi: 'Shukla Ekadashi', nakshatra: 'Chitra', time: '06:10 AM – 07:35 AM' },
        { date: '27 June 2026', tithi: 'Shukla Purnima', nakshatra: 'Moola', time: '08:20 AM – 09:50 AM' },
        { date: '12 July 2026', tithi: 'Shukla Dwitiya', nakshatra: 'Rohini', time: '05:45 AM – 07:15 AM' }
      ]
    },
    {
      category: 'vehicle',
      title: 'Vahana Kharidi (Vehicle Purchase) Timings',
      telugu: 'వాహన కొనుగోలు శుభ ముహూర్తములు',
      icon: '🚗',
      dates: [
        { date: '15 June 2026', tithi: 'Shukla Dashami', nakshatra: 'Chitra', time: '10:30 AM – 12:00 PM' },
        { date: '24 June 2026', tithi: 'Shukla Trayodashi', nakshatra: 'Anuradha', time: '02:15 PM – 04:00 PM' }
      ]
    },
    {
      category: 'business',
      title: 'Vyapara Arambham (New Business / Shop Launch)',
      telugu: 'వ్యాపార ప్రారంభ ముహూర్తములు',
      icon: '🏬',
      dates: [
        { date: '19 June 2026', tithi: 'Shukla Dwadashi', nakshatra: 'Swati', time: '09:00 AM – 10:30 AM' },
        { date: '05 July 2026', tithi: 'Shukla Saptami', nakshatra: 'Uttara Phalguni', time: '11:15 AM – 01:00 PM' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-stone-900 pb-16">
      {/* Top Sponsored Ad Slot */}
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#180A24] via-[#2D1245] to-[#180A24] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
                <Hourglass className="w-3.5 h-3.5 text-amber-400" />
                <span>Sanatana Dharma Kaala Vidhana</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
                Shubh Muhurtham &amp; Kaala Chakra
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                Auspicious timings, daily Choghadiya, Brahma &amp; Abhijit Muhurthams, and sacred event windows calculated per authentic Surya Siddhanta.
              </p>
            </div>

            {/* City Selector */}
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-amber-400/30 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-amber-200/80 uppercase font-mono block">Selected Location</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
                >
                  <option value="Hyderabad" className="text-stone-900">Hyderabad (Telangana)</option>
                  <option value="Tirupati" className="text-stone-900">Tirupati (Andhra Pradesh)</option>
                  <option value="Vijayawada" className="text-stone-900">Vijayawada (Andhra Pradesh)</option>
                  <option value="Varanasi" className="text-stone-900">Varanasi / Kashi (UP)</option>
                  <option value="Bengaluru" className="text-stone-900">Bengaluru (Karnataka)</option>
                  <option value="Chennai" className="text-stone-900">Chennai (Tamil Nadu)</option>
                  <option value="Mumbai" className="text-stone-900">Mumbai (Maharashtra)</option>
                  <option value="Delhi" className="text-stone-900">New Delhi (NCR)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Today's Auspicious & Inauspicious Timeline */}
        <section className="bg-white rounded-3xl p-6 border border-[#e8d5bc] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-amber-800">Live Daily Muhurtham Flow</span>
              <h2 className="text-xl font-serif font-black text-stone-900">
                Today's Sacred &amp; Restricted Hours ({selectedCity})
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ● Shubh (Auspicious)
              </span>
              <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                ● Varjyam (Avoid)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayMuhurthams.map((m, idx) => (
              <div 
                key={idx}
                className={`rounded-2xl p-4 border transition-all ${
                  m.type === 'shubh'
                    ? 'bg-gradient-to-br from-emerald-50/60 to-amber-50/30 border-emerald-200/80 hover:border-emerald-400'
                    : 'bg-gradient-to-br from-rose-50/60 to-stone-50 border-rose-200/80 hover:border-rose-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-base">
                      {m.name}
                    </h3>
                    <span className="text-xs font-semibold text-amber-900 font-serif">
                      {m.telugu}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    m.type === 'shubh' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {m.quality}
                  </span>
                </div>

                <div className="my-3 py-2 px-3 rounded-xl bg-white/80 border border-stone-200/70 font-mono text-sm font-black text-stone-900 flex items-center justify-between">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{m.time}</span>
                </div>

                <p className="text-xs text-stone-700 font-medium leading-relaxed">
                  <strong className="text-stone-900">Recommended:</strong> {m.purpose}
                </p>
                <p className="text-[11px] text-stone-500 mt-1 italic">
                  {m.benefit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* In-Feed Native Ad Slot */}
        <AdBanner slotId="slot-2" type="in-feed-1" />

        {/* Upcoming Major Life Event Muhurthams (Vivaha, Grihapravesham, etc.) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-amber-800">Vedic Life Milestones</span>
              <h2 className="text-2xl font-serif font-black text-stone-900">
                Auspicious Muhurthams for Major Ceremonies
              </h2>
            </div>

            <div className="inline-flex p-1 bg-stone-100 rounded-2xl border border-stone-200 gap-1 text-xs font-bold">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition ${selectedCategory === 'all' ? 'bg-[#78131e] text-white shadow-xs' : 'text-stone-700'}`}
              >
                All Ceremonies
              </button>
              <button 
                onClick={() => setSelectedCategory('marriage')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition ${selectedCategory === 'marriage' ? 'bg-[#78131e] text-white shadow-xs' : 'text-stone-700'}`}
              >
                💍 Vivaha
              </button>
              <button 
                onClick={() => setSelectedCategory('griha')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition ${selectedCategory === 'griha' ? 'bg-[#78131e] text-white shadow-xs' : 'text-stone-700'}`}
              >
                🏡 Griha Pravesha
              </button>
              <button 
                onClick={() => setSelectedCategory('business')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition ${selectedCategory === 'business' ? 'bg-[#78131e] text-white shadow-xs' : 'text-stone-700'}`}
              >
                🏬 Business
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingMajorMuhurthams
              .filter(card => selectedCategory === 'all' || card.category === selectedCategory)
              .map((card, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-[#e8d5bc] shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{card.icon}</span>
                    <div>
                      <h3 className="font-serif font-black text-lg text-stone-900">
                        {card.title}
                      </h3>
                      <span className="text-xs font-serif font-bold text-amber-800">
                        {card.telugu}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {card.dates.map((d, dIdx) => (
                      <div key={dIdx} className="p-3 bg-amber-50/50 rounded-2xl border border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="font-serif font-bold text-stone-900 text-sm">
                            {d.date}
                          </div>
                          <div className="text-xs text-stone-600 font-medium">
                            {d.tithi} • Nakshatra: {d.nakshatra}
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-white font-mono text-xs font-black text-amber-900 rounded-xl border border-amber-200 self-start sm:self-auto shrink-0">
                          {d.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/astrology"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#78131e] hover:text-[#520912] pt-2"
                  >
                    <span>Request Personalized Kundali Muhurtham with Vedic Pandita</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <AdBanner slotId="slot-4" type="in-feed-2" />
      </div>
    </div>
  );
}
