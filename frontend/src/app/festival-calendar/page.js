'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calendar, Search, Sparkles, Clock, ChevronRight, 
  ArrowLeft, Flame, Moon, BookOpen, Share2, Check, Filter, Info
} from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { allFestivalsData } from '../../data/festivalsData';

export default function FestivalCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customEvents, setCustomEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Months List for Vedic Lunar Calendar
  const monthsList = [
    { label: 'All Months', value: 'all', telugu: 'అన్ని నెలలు' },
    { label: 'January (Makara)', value: 'JAN', telugu: 'మకర మాసం' },
    { label: 'February (Magha)', value: 'FEB', telugu: 'మాఘ మాసం' },
    { label: 'March (Chaitra)', value: 'MAR', telugu: 'చైత్ర మాసం' },
    { label: 'April (Vaisakha)', value: 'APR', telugu: 'వైశాఖ మాసం' },
    { label: 'May (Jyeshtha)', value: 'MAY', telugu: 'జ్యేష్ఠ మాసం' },
    { label: 'June (Ashadha)', value: 'JUN', telugu: 'ఆషాఢ మాసం' },
    { label: 'August (Sravana)', value: 'AUG', telugu: 'శ్రావణ మాసం' },
    { label: 'September (Bhadrapada)', value: 'SEP', telugu: 'భాద్రపద మాసం' },
    { label: 'October (Ashwina)', value: 'OCT', telugu: 'ఆశ్వయుజ మాసం' },
    { label: 'November (Kartika)', value: 'NOV', telugu: 'కార్తీక మాసం' },
    { label: 'December (Margashirsha)', value: 'DEC', telugu: 'మార్గశిర మాసం' }
  ];

  // Load festival calendar events from API + localStorage
  useEffect(() => {
    const loadEvents = async () => {
      let localItems = [];
      try {
        const stored = localStorage.getItem('astada_festival_calendar_events');
        if (stored) localItems = JSON.parse(stored);
      } catch (e) {}

      try {
        const res = await fetch('http://localhost:5000/api/festival-calendar');
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data)) {
            const merged = [...json.data];
            localItems.forEach(item => {
              if (!merged.some(m => (m._id && m._id === item._id) || (m.slug && m.slug === item.slug) || (m.name === item.name))) {
                merged.unshift(item);
              }
            });
            setCustomEvents(merged);
            return;
          }
        }
      } catch (err) {}
      setCustomEvents(localItems);
    };

    loadEvents();
    window.addEventListener('astada_festivals_updated', loadEvents);
    return () => window.removeEventListener('astada_festivals_updated', loadEvents);
  }, []);

  const combinedCalendarList = useMemo(() => {
    const list = [...customEvents, ...allFestivalsData];
    return list.filter(fest => {
      const matchesMonth = selectedMonth === 'all' || fest.monthShort === selectedMonth || (fest.date && fest.date.toUpperCase().includes(selectedMonth));
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        (fest.name || '').toLowerCase().includes(q) ||
        (fest.teluguName || '').toLowerCase().includes(q) ||
        (fest.tithi || '').toLowerCase().includes(q) ||
        (fest.hinduMonth || '').toLowerCase().includes(q) ||
        (fest.deity || '').toLowerCase().includes(q);

      return matchesMonth && matchesSearch;
    });
  }, [customEvents, selectedMonth, searchQuery]);

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen pb-16">
      {/* Top Sponsored Ad */}
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#180A24] via-[#2A113E] to-[#140620] text-white py-10 px-4 border-b border-[#32174D] shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-xs text-amber-300 font-mono uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sanctuary Home</span>
            </Link>
            <span>/</span>
            <span className="text-purple-200">Festival Calendar (పండుగల క్యాలెండర్)</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full font-mono tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  Hindu Panchangam Calendar 2026
                </span>
                <span className="text-xs text-purple-200/80">• Tithis, Muhurthams &amp; Vratas</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white">
                Vedic Festival Calendar (పండుగల క్యాలెండర్)
              </h1>
              <p className="text-xs sm:text-sm text-purple-100/90 mt-1 max-w-2xl leading-relaxed">
                Comprehensive Sanatana Dharma annual festival schedule, lunar tithi timings, auspicious fasting days, and deity mahotsavams across Andhra Pradesh &amp; Telangana.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/festivals"
                className="px-3.5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-400/30 text-amber-200 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Festival Articles &amp; Puja Vidhi &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Month Selector Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-stone-200">
          {monthsList.map(m => (
            <button
              key={m.value}
              onClick={() => setSelectedMonth(m.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex flex-col items-center ${
                selectedMonth === m.value
                  ? 'bg-[#78131e] text-white shadow-xs'
                  : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-200'
              }`}
            >
              <span>{m.label}</span>
              <span className={`text-[9px] ${selectedMonth === m.value ? 'text-amber-200' : 'text-stone-400'}`}>
                {m.telugu}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar & Result Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search festival name, tithi, deity..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
            />
          </div>

          <div className="text-xs text-stone-500 font-semibold flex items-center gap-2">
            <span>Showing <strong className="text-stone-900">{combinedCalendarList.length}</strong> Festival Dates</span>
            {(selectedMonth !== 'all' || searchQuery) && (
              <button
                onClick={() => { setSelectedMonth('all'); setSearchQuery(''); }}
                className="text-amber-800 underline font-bold cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {combinedCalendarList.map((fest) => (
            <div
              key={fest.id}
              onClick={() => setSelectedEvent(fest)}
              className="bg-white rounded-2xl border border-[#ebdcc7] p-4.5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-200">
                    {fest.hinduMonth || 'Vedic Month'}
                  </span>
                  <span className="text-xs font-black text-[#78131e] font-serif">
                    {fest.date || fest.dateStr}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="font-serif font-black text-base text-stone-900 group-hover:text-[#78131e] transition-colors leading-snug">
                    {fest.name}
                  </h3>
                  {fest.teluguName && (
                    <p className="text-xs font-serif font-bold text-amber-900 mt-0.5">
                      {fest.teluguName}
                    </p>
                  )}
                  <p className="text-[11px] text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {fest.significance || fest.desc || 'Sacred festival celebrated across Sanatan temples with traditional archanas.'}
                  </p>
                </div>

                {/* Tithi & Fasting Details */}
                <div className="mt-3 pt-2.5 border-t border-stone-100 grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-stone-50 p-2 rounded-xl">
                    <span className="text-stone-400 block font-medium">Tithi:</span>
                    <span className="font-bold text-stone-800 truncate block">{fest.tithi || 'Shukla Paksha'}</span>
                  </div>
                  <div className="bg-stone-50 p-2 rounded-xl">
                    <span className="text-stone-400 block font-medium">Deity:</span>
                    <span className="font-bold text-amber-900 truncate block">{fest.deity || 'Parashakti'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 flex items-center justify-between text-xs">
                <span className="text-[10px] font-bold text-[#78131e] group-hover:underline flex items-center gap-0.5">
                  View Festival Timings &rarr;
                </span>
                <span className="text-[10px] text-stone-400 font-medium">
                  {fest.pujaTime || 'Auspicious Muhurtham'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Festival Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-amber-300 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-[#180A24] via-[#2A113E] to-[#140620] text-white p-5 flex items-center justify-between border-b border-purple-500/30">
              <div>
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block">
                  {selectedEvent.hinduMonth} • {selectedEvent.date}
                </span>
                <h3 className="font-serif font-black text-lg text-white">
                  {selectedEvent.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs text-stone-700">
              {selectedEvent.teluguName && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-serif font-bold text-sm">
                  {selectedEvent.teluguName}
                </div>
              )}

              <div>
                <span className="font-bold text-stone-900 block mb-1">Spiritual Significance:</span>
                <p className="leading-relaxed text-stone-600">
                  {selectedEvent.significance || selectedEvent.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Tithi</span>
                  <span className="font-bold text-stone-900">{selectedEvent.tithi || 'Shukla Paksha'}</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Auspicious Puja Muhurtham</span>
                  <span className="font-bold text-stone-900">{selectedEvent.pujaTime || 'Pradosha Kaalam'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <Link
                  href="/festivals"
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1 shadow-2xs"
                >
                  <span>Read Full Festival Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-3 py-2 text-stone-500 hover:text-stone-800 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
