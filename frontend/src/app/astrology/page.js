'use client';

import React, { useState, useEffect, useRef } from 'react';
import AdBanner from '../../components/AdBanner';
import { rasiList, navagrahas, certifiedAstrologers } from '../../data/astrologyData';
import { 
  Compass, Sparkles, Sun, Moon, Shield, Award, 
  Calendar, Check, ChevronRight, Phone, Video, 
  MessageSquare, Star, ArrowRight, Heart, AlertCircle, X,
  Search, SlidersHorizontal, BookOpen, Clock, Lock, Send
} from 'lucide-react';

const DURATION_PACKAGES = [
  { duration: 10, price: 199, label: '10 Mins • ₹199', title: 'Quick Query / Prashna', desc: '1 specific question & instant remedy' },
  { duration: 20, price: 399, label: '20 Mins • ₹399', title: 'Planetary Dasha & Kundali', desc: 'Graha gochara & dasha analysis' },
  { duration: 30, price: 599, label: '30 Mins • ₹599', title: 'Deep Horoscope & Dosha', desc: 'Full birth chart & dosha parihara' },
  { duration: 45, price: 899, label: '45 Mins • ₹899', title: 'Comprehensive Life Guidance', desc: 'Complete Janma Kundali & family reading' }
];

export default function AstrologyPage() {
  const [activeTab, setActiveTab] = useState('rasi'); // 'rasi', 'kundali', 'navagraha', 'astrologers'
  const [selectedRasiId, setSelectedRasiId] = useState('mesha');
  const [bookingAstrologer, setBookingAstrologer] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(20);
  const [liveChatSession, setLiveChatSession] = useState(null);
  const [chatTimeRemaining, setChatTimeRemaining] = useState(1200);
  const [devoteeMsg, setDevoteeMsg] = useState('');
  const chatEndRef = useRef(null);

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    dob: '1995-05-15',
    time: '10:30 AM',
    place: 'Hyderabad',
    rasi: 'Mesha (Aries)',
    gotram: 'Kashyapa',
    mode: 'chat',
    query: ''
  });

  // Live Timer Countdown for Devotee Room
  useEffect(() => {
    if (!liveChatSession || liveChatSession.sessionStatus !== 'live') return;

    const interval = setInterval(() => {
      setChatTimeRemaining(prev => {
        if (prev <= 1) {
          setLiveChatSession(curr => curr ? {
            ...curr,
            sessionStatus: 'time_expired',
            messages: [
              ...(curr.messages || []),
              {
                sender: 'system',
                senderName: 'Vedic System Clock',
                text: '⏳ Allotted consultation time has expired (00:00). Chat input locked. Please review your astrologer remedies below.',
                timestamp: new Date().toISOString()
              }
            ]
          } : null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [liveChatSession?.sessionStatus]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [liveChatSession?.messages?.length]);

  // Kundali Matching state
  const [boyRasi, setBoyRasi] = useState('mesha');
  const [girlRasi, setGirlRasi] = useState('simha');
  const [matchResult, setMatchResult] = useState(null);

  const selectedRasi = rasiList.find(r => r.id === selectedRasiId) || rasiList[0];

  const handleMatchCalculate = (e) => {
    e.preventDefault();
    // Deterministic Vedic Guna calculation simulation
    const boyIndex = rasiList.findIndex(r => r.id === boyRasi);
    const girlIndex = rasiList.findIndex(r => r.id === girlRasi);
    const baseScore = 24 + ((boyIndex * 3 + girlIndex * 5) % 13);
    const score = Math.min(36, Math.max(18, baseScore));
    
    setMatchResult({
      score: score,
      maxScore: 36,
      verdict: score >= 28 ? 'Uttama (Excellent Alignment)' : score >= 21 ? 'Madhyama (Auspicious with Remedies)' : 'Sadharana (Parihara Recommended)',
      manglikStatus: (boyIndex + girlIndex) % 4 === 0 ? 'Kuja Dosha Neutralized' : 'No Major Kuja Dosha',
      breakdown: [
        { name: 'Varna (Spiritual Affinity)', score: score >= 25 ? '1 / 1' : '0.5 / 1', status: 'Good' },
        { name: 'Vashya (Mutual Attraction)', score: score >= 24 ? '2 / 2' : '1 / 2', status: 'Good' },
        { name: 'Tara (Destiny & Longevity)', score: score >= 26 ? '3 / 3' : '1.5 / 3', status: 'Moderate' },
        { name: 'Yoni (Physical Compatibility)', score: score >= 28 ? '4 / 4' : '2 / 4', status: 'Good' },
        { name: 'Graha Maitri (Psychological)', score: score >= 22 ? '5 / 5' : '3 / 5', status: 'Favorable' },
        { name: 'Gana (Temperament Harmony)', score: score >= 27 ? '6 / 6' : '3 / 6', status: 'Balanced' },
        { name: 'Bhakoot (Emotional Bond & Wealth)', score: score >= 23 ? '7 / 7' : '4 / 7', status: 'Good' },
        { name: 'Nadi (Genetic & Health Life)', score: score >= 25 ? '8 / 8' : '0 / 8', status: score >= 25 ? 'Exalted' : 'Parihara Needed' },
      ]
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const pkg = DURATION_PACKAGES.find(p => p.duration === selectedDuration) || DURATION_PACKAGES[1];
    
    const initialSession = {
      _id: 'c-live-' + Date.now(),
      devoteeName: bookingForm.name || 'Devotee',
      devoteePhone: bookingForm.phone,
      birthDetails: {
        dateOfBirth: bookingForm.dob,
        timeOfBirth: bookingForm.time,
        placeOfBirth: bookingForm.place,
        rasi: bookingForm.rasi,
        gotram: bookingForm.gotram
      },
      durationMinutes: pkg.duration,
      fee: pkg.price,
      astrologerName: bookingAstrologer?.name || 'Pandit Vidyanath Shastri',
      astrologerAvatar: bookingAstrologer?.avatar,
      astrologerTitle: bookingAstrologer?.title || 'Vedic Jyotish Acharya',
      problemDescription: bookingForm.query,
      sessionStatus: 'live',
      messages: [
        {
          sender: 'system',
          senderName: 'Vedic System Clock',
          text: `Namaste ${bookingForm.name}! Your ${pkg.duration}-Minute consultation with ${bookingAstrologer?.name || 'Vidyanath Shastri'} has commenced. Please ask your questions.`,
          timestamp: new Date().toISOString()
        },
        {
          sender: 'astrologer',
          senderName: bookingAstrologer?.name || 'Astrologer Acharya',
          text: `Hari Om ${bookingForm.name} ji! I am examining your Janma Kundali for ${bookingForm.place}. What guidance do you seek today?`,
          timestamp: new Date().toISOString()
        }
      ],
      astrologerRemedies: {
        gemstone: 'Yellow Sapphire / Coral as advised',
        mantra: 'Maha Mrityunjaya & Gayatri Mantra 108x daily',
        templePariharam: 'Perform archana at sacred Shakti Peetham or Navagraha Sannidhi',
        notes: 'Maintain positive sankalpa. Auspicious transit results will manifest soon.'
      }
    };

    setChatTimeRemaining(pkg.duration * 60);
    setLiveChatSession(initialSession);
    setBookingAstrologer(null);

    // Call backend
    try {
      const res = await fetch('http://localhost:5000/api/astrologer/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devoteeName: bookingForm.name,
          devoteePhone: bookingForm.phone,
          dateOfBirth: bookingForm.dob,
          timeOfBirth: bookingForm.time,
          placeOfBirth: bookingForm.place,
          rasi: bookingForm.rasi,
          gotram: bookingForm.gotram,
          problemDescription: bookingForm.query,
          durationMinutes: pkg.duration,
          astrologerName: bookingAstrologer?.name
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setLiveChatSession(prev => ({ ...prev, _id: data.data._id }));
      }
    } catch (err) {
      console.warn('Booking recorded locally:', err);
    }
  };

  const handleDevoteeSendMessage = async (e) => {
    e?.preventDefault();
    if (!devoteeMsg.trim() || !liveChatSession) return;
    if (chatTimeRemaining <= 0 || liveChatSession.sessionStatus === 'time_expired') {
      alert('Consultation duration has expired. Chat is locked.');
      return;
    }

    const newMsg = {
      sender: 'customer',
      senderName: liveChatSession.devoteeName,
      text: devoteeMsg.trim(),
      timestamp: new Date().toISOString()
    };

    setLiveChatSession(prev => ({
      ...prev,
      messages: [...(prev.messages || []), newMsg]
    }));
    setDevoteeMsg('');

    try {
      await fetch(`http://localhost:5000/api/astrologer/consultations/${liveChatSession._id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'customer',
          senderName: liveChatSession.devoteeName,
          text: newMsg.text
        })
      });
    } catch (err) {
      console.warn('Message sent locally:', err);
    }
  };

  const formatTime = (secs) => {
    if (typeof secs !== 'number' || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-900">
      
      {/* Top Auspicious Astrology Banner */}
      <div 
        style={{ 
          backgroundColor: '#6b111b', 
          backgroundImage: 'linear-gradient(135deg, #480a11 0%, #78131e 50%, #991b1b 100%)',
          color: '#ffffff'
        }}
        className="py-10 px-4 sm:px-6 border-b border-amber-600/40 relative overflow-hidden shadow-inner"
      >
        {/* Subtle Constellation Glow Background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="w-[98.5%] max-w-[1920px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div 
              style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)', borderColor: 'rgba(251, 191, 36, 0.4)' }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-amber-200 text-xs font-serif font-black uppercase tracking-widest shadow-xs"
            >
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span style={{ color: '#fef08a' }}>Vedic Jyotish & Divine Planetary Guidance</span>
            </div>
            <h1 
              style={{ color: '#ffffff' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight drop-shadow-md"
            >
              Vedic Astrology & 12 Rasi Phalalu
            </h1>
            <p 
              style={{ color: 'rgba(254, 243, 199, 0.95)' }}
              className="text-sm sm:text-base font-serif max-w-2xl leading-relaxed"
            >
              Explore authentic daily horoscope predictions, 36-Guna Kundali matching, 
              Navagraha dosha remedies, and connect with certified Vedic astrologers.
            </p>
          </div>

          {/* Quick Date & Astrological Ephemeris Pill */}
          <div 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', borderColor: 'rgba(251, 191, 36, 0.3)' }}
            className="backdrop-blur-md rounded-2xl p-4 border text-amber-200 text-xs font-serif space-y-1.5 shadow-xl shrink-0"
          >
            <div className="flex items-center gap-2 font-bold text-sm text-amber-300 border-b border-amber-400/20 pb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Today’s Graha Sancharam</span>
            </div>
            <div className="flex items-center justify-between gap-6 text-[11px]">
              <span className="text-stone-300">Surya (Sun):</span>
              <span className="font-bold text-white">Vrishabha (Rohini)</span>
            </div>
            <div className="flex items-center justify-between gap-6 text-[11px]">
              <span className="text-stone-300">Chandra (Moon):</span>
              <span className="font-bold text-white">Karkataka (Pushyami)</span>
            </div>
            <div className="flex items-center justify-between gap-6 text-[11px]">
              <span className="text-stone-300">Guru (Jupiter):</span>
              <span className="font-bold text-amber-300">Vrishabha Rasi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="w-[98.5%] max-w-[1920px] mx-auto py-8 px-2 sm:px-4">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 border-b border-[#ebdcc7] pb-4">
          <button
            suppressHydrationWarning
            onClick={() => setActiveTab('rasi')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'rasi'
                ? 'bg-[#78131e] text-white shadow-md scale-102 ring-2 ring-amber-400'
                : 'bg-amber-50 text-stone-700 hover:bg-amber-100 hover:text-[#78131e] border border-amber-200'
            }`}
          >
            <span>♈</span>
            <span>12 Rasi Phalalu (Daily)</span>
          </button>

          <button
            suppressHydrationWarning
            onClick={() => setActiveTab('kundali')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'kundali'
                ? 'bg-[#78131e] text-white shadow-md scale-102 ring-2 ring-amber-400'
                : 'bg-amber-50 text-stone-700 hover:bg-amber-100 hover:text-[#78131e] border border-amber-200'
            }`}
          >
            <span>🔮</span>
            <span>Kundali & 36 Guna Milan</span>
          </button>

          <button
            suppressHydrationWarning
            onClick={() => setActiveTab('navagraha')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'navagraha'
                ? 'bg-[#78131e] text-white shadow-md scale-102 ring-2 ring-amber-400'
                : 'bg-amber-50 text-stone-700 hover:bg-amber-100 hover:text-[#78131e] border border-amber-200'
            }`}
          >
            <span>🪐</span>
            <span>Navagraha Dosha Upayas</span>
          </button>

          <button
            suppressHydrationWarning
            onClick={() => setActiveTab('astrologers')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'astrologers'
                ? 'bg-[#78131e] text-white shadow-md scale-102 ring-2 ring-amber-400'
                : 'bg-amber-50 text-stone-700 hover:bg-amber-100 hover:text-[#78131e] border border-amber-200'
            }`}
          >
            <span>👳</span>
            <span>Consult Vedic Astrologers</span>
          </button>
        </div>

        {/* ================= TAB 1: 12 RASI PHALALU ================= */}
        {activeTab === 'rasi' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* 12 Rasi Selector Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-serif font-black text-[#78131e] flex items-center gap-2">
                  <span>♈</span>
                  <span>Select Your Moon Sign (Rasi)</span>
                </h2>
                <span className="text-xs text-amber-800 font-bold bg-amber-100 px-3 py-1 rounded-full">
                  Updated for Today
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {rasiList.map((rasi) => {
                  const isSelected = rasi.id === selectedRasiId;
                  return (
                    <button
                      key={rasi.id}
                      suppressHydrationWarning
                      onClick={() => setSelectedRasiId(rasi.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#78131e] to-[#991b1b] text-white border-amber-400 shadow-lg scale-102 ring-2 ring-amber-300'
                          : 'bg-white hover:bg-amber-50/70 border-amber-200/80 text-stone-800 hover:border-amber-400 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="text-2xl">{rasi.symbol}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-amber-300 text-stone-950 font-black' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {rasi.element.split(' ')[0]}
                        </span>
                      </div>
                      <div>
                        <div className={`font-serif font-bold text-sm ${isSelected ? 'text-amber-200' : 'text-[#78131e]'}`}>
                          {rasi.name}
                        </div>
                        <div className={`text-[11px] ${isSelected ? 'text-amber-100/80' : 'text-stone-500'}`}>
                          {rasi.englishName}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Rasi Detailed Prediction Card */}
            <div className="bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 rounded-2xl border-2 border-[#ebdcc7] shadow-xl p-6 sm:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#ebdcc7] pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#78131e] to-[#991b1b] flex items-center justify-center text-3xl text-amber-200 shadow-md border border-amber-400/40">
                    {selectedRasi.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#78131e]">
                        {selectedRasi.name} ({selectedRasi.englishName})
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                        {selectedRasi.element}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 font-serif mt-0.5">
                      Lord: <strong>{selectedRasi.lord}</strong> • Nakshatras: {selectedRasi.nakshatras.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Auspicious Attributes Pills */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-2xs">
                    <span className="text-stone-500 block text-[10px]">Lucky Color</span>
                    <strong className="text-[#78131e]">{selectedRasi.luckyColor}</strong>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-2xs">
                    <span className="text-stone-500 block text-[10px]">Lucky Number</span>
                    <strong className="text-[#78131e]">{selectedRasi.luckyNumber}</strong>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-2xs">
                    <span className="text-stone-500 block text-[10px]">Benefic Gemstone</span>
                    <strong className="text-[#78131e]">{selectedRasi.stone}</strong>
                  </div>
                </div>
              </div>

              {/* Today's Overview Statement */}
              <div className="my-6 bg-gradient-to-r from-amber-100/60 to-orange-100/40 border-l-4 border-[#78131e] p-4 rounded-r-xl">
                <span className="text-xs font-bold text-[#78131e] uppercase tracking-wider block mb-1">
                  ✨ Cosmic Darshan & Daily Guidance
                </span>
                <p className="text-sm sm:text-base font-serif text-stone-800 leading-relaxed italic">
                  "{selectedRasi.dailyPrediction.overview}"
                </p>
              </div>

              {/* 4 Pillars of Life Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2 text-[#78131e] font-bold text-xs uppercase tracking-wider">
                    <span>💼</span>
                    <span>Career & Vocation</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-serif">
                    {selectedRasi.dailyPrediction.career}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <span>🌿</span>
                    <span>Health & Vitality</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-serif">
                    {selectedRasi.dailyPrediction.health}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                    <span>🪙</span>
                    <span>Finance & Prosperity</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-serif">
                    {selectedRasi.dailyPrediction.finance}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                    <span>❤️</span>
                    <span>Family & Relationships</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-serif">
                    {selectedRasi.dailyPrediction.family}
                  </p>
                </div>
              </div>

              {/* Sacred Remedy / Pariharam Banner */}
              <div className="bg-[#78131e] text-white p-4 sm:p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Recommended Daily Shanti & Upayam</span>
                  </div>
                  <p className="text-sm font-serif text-amber-100">
                    {selectedRasi.dailyPrediction.remedy}
                  </p>
                </div>

                <button
                  suppressHydrationWarning
                  onClick={() => setActiveTab('astrologers')}
                  className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-black shrink-0 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Talk to Jyotishi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: KUNDALI & MATCHMAKING ================= */}
        {activeTab === 'kundali' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#78131e]">
                Ashtakoota 36 Guna Milan & Jathakam Matching
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-serif">
                According to ancient Vedic astrology, compatibility is assessed across 8 celestial dimensions totaling 36 Gunas.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleMatchCalculate} className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#ebdcc7] shadow-xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Boy's Chart */}
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-4">
                  <div className="flex items-center gap-2 font-serif font-bold text-blue-900 border-b border-blue-200 pb-2">
                    <span className="text-lg">🤵</span>
                    <span>Groom's Rasi & Nakshatra</span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Rasi (Moon Sign)</label>
                    <select
                      suppressHydrationWarning
                      value={boyRasi}
                      onChange={(e) => setBoyRasi(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:border-[#78131e]"
                    >
                      {rasiList.map(r => (
                        <option key={r.id} value={r.id}>{r.name} ({r.englishName}) - {r.lord}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Birth Nakshatra (Simulated)</label>
                    <input 
                      suppressHydrationWarning
                      type="text" 
                      defaultValue="Aswini Pada 2" 
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800 outline-none" 
                    />
                  </div>
                </div>

                {/* Girl's Chart */}
                <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-4">
                  <div className="flex items-center gap-2 font-serif font-bold text-rose-900 border-b border-rose-200 pb-2">
                    <span className="text-lg">👰</span>
                    <span>Bride's Rasi & Nakshatra</span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Rasi (Moon Sign)</label>
                    <select
                      suppressHydrationWarning
                      value={girlRasi}
                      onChange={(e) => setGirlRasi(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800 outline-none focus:border-[#78131e]"
                    >
                      {rasiList.map(r => (
                        <option key={r.id} value={r.id}>{r.name} ({r.englishName}) - {r.lord}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Birth Nakshatra (Simulated)</label>
                    <input 
                      suppressHydrationWarning
                      type="text" 
                      defaultValue="Rohini Pada 3" 
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800 outline-none" 
                    />
                  </div>
                </div>

              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  suppressHydrationWarning
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#78131e] to-[#991b1b] hover:from-[#600e17] hover:to-[#7f1313] text-white font-serif font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Calculate 36 Guna Milan & Doshas</span>
                </button>
              </div>
            </form>

            {/* Results Display */}
            {matchResult && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-amber-300 shadow-xl space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-stone-500 font-bold block mb-1">
                      Kundali Match Score
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-serif font-black text-[#78131e]">
                        {matchResult.score}
                      </span>
                      <span className="text-lg text-stone-500 font-bold">/ 36 Gunas</span>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 mb-1">
                      {matchResult.verdict}
                    </span>
                    <p className="text-xs text-stone-600 font-serif">
                      Kuja Dosha Status: <strong>{matchResult.manglikStatus}</strong>
                    </p>
                  </div>
                </div>

                {/* 8 Koota Breakdown Table */}
                <div>
                  <h4 className="text-sm font-bold text-stone-800 mb-3 font-serif">
                    Ashtakoota Detailed Compatibility Breakdown:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {matchResult.breakdown.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                        <span className="text-stone-700 font-medium">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <strong className="text-[#78131e]">{item.score}</strong>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>For customized remedies, Nadi dosha parihara, and wedding muhurtham selection, consult our Vedic astrologers.</span>
                  </div>
                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveTab('astrologers')}
                    className="px-3 py-1.5 rounded-md bg-[#78131e] text-white font-bold text-[11px] shrink-0 hover:bg-[#600e17] cursor-pointer"
                  >
                    Consult Now
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: NAVAGRAHA DOSHA UPAYAS ================= */}
        {activeTab === 'navagraha' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#78131e]">
                Navagraha Shanti & Vedic Dosha Remedies
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-serif">
                Specific pariharas, sacred mantras, and temple pilgrimage destinations 
                to mitigate planetary afflictions (Kuja Dosha, Sade Sati, Kala Sarpa, etc.).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {navagrahas.map((graha) => (
                <div 
                  key={graha.id}
                  className="bg-white rounded-2xl border border-amber-200/90 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-2 rounded-xl bg-stone-100 border border-stone-200">{graha.icon}</span>
                        <div>
                          <h3 className="font-serif font-black text-base text-[#78131e] group-hover:text-amber-700 transition-colors">
                            {graha.name}
                          </h3>
                          <span className="text-[11px] text-stone-500 font-medium">Deity: {graha.deity}</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-900 font-bold border border-red-200">
                        {graha.gem}
                      </span>
                    </div>

                    {/* Afflicted Doshas */}
                    <div className="bg-red-50/70 p-2.5 rounded-xl border border-red-200/60 text-xs">
                      <span className="text-[10px] uppercase font-bold text-red-800 block">Mitigates Dosha:</span>
                      <strong className="text-red-950 font-serif">{graha.dosha}</strong>
                    </div>

                    {/* Sacred Bija Mantra */}
                    <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200/60 text-xs">
                      <span className="text-[10px] uppercase font-bold text-amber-800 block mb-0.5">Bija Mantra:</span>
                      <p className="font-serif italic text-amber-950 font-medium text-[11px]">
                        "{graha.mantra}"
                      </p>
                    </div>

                    {/* Remedy */}
                    <div className="text-xs text-stone-700 space-y-1">
                      <span className="font-bold text-stone-800 block">Sacred Upaya (Remedy):</span>
                      <p className="text-[11px] leading-relaxed text-stone-600 font-serif">
                        {graha.remedy}
                      </p>
                    </div>
                  </div>

                  {/* Sacred Kshetra */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500">Parihara Temple:</span>
                    <strong className="text-[#78131e] font-serif">{graha.temple}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: VEDIC ASTROLOGERS (NO CERTIFIED LABEL) ================= */}
        {activeTab === 'astrologers' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#78131e]">
                Consult Renowned Vedic Astrologers
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-serif">
                1-on-1 private live consultation sessions for career, marriage matching, health, and personalized pariharas. Timing-based packages with dedicated astrologer desk.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certifiedAstrologers.map((ast) => (
                <div 
                  key={ast.id}
                  className="bg-white rounded-2xl border-2 border-amber-200/90 shadow-md p-6 flex flex-col justify-between hover:border-[#78131e] transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={ast.avatar} 
                        alt={ast.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-xs" 
                      />
                      <div>
                        {/* NO CERTIFIED OR NON-CERTIFIED BADGE SHOWN */}
                        <h3 className="font-serif font-black text-lg text-stone-900 leading-snug">
                          {ast.name}
                        </h3>
                        <p className="text-xs text-[#78131e] font-bold font-serif">{ast.title}</p>
                        <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold">{ast.rating}</span>
                          <span className="text-stone-400">({ast.reviewsCount} consultations)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200">
                      <div>
                        <span className="text-stone-400 block text-[10px] font-bold uppercase">Specialization</span>
                        <p className="font-medium text-stone-800">{ast.specialization}</p>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-200/60">
                        <span>Experience: <strong>{ast.experience}</strong></span>
                        <span>Languages: <strong>{ast.languages}</strong></span>
                      </div>
                    </div>

                    {/* Timing-based pricing preview */}
                    <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 text-[11px] font-serif space-y-1">
                      <div className="font-bold text-amber-900 flex items-center justify-between">
                        <span>⏱️ Chat Duration Packages:</span>
                        <span className="text-emerald-700 font-mono font-bold">From ₹199</span>
                      </div>
                      <div className="text-[10px] text-stone-600 flex justify-between">
                        <span>10m: ₹199</span>
                        <span>20m: ₹399</span>
                        <span>30m: ₹599</span>
                        <span>45m: ₹899</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 block">Dakshina</span>
                      <strong className="text-lg font-serif text-[#78131e]">From ₹199</strong>
                    </div>

                    <button
                      suppressHydrationWarning
                      onClick={() => setBookingAstrologer(ast)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#78131e] to-[#991b1b] hover:from-[#600e17] hover:to-[#7f1313] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Start Consultation</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Booking Consultation Modal Dialog with Duration Selection */}
      {bookingAstrologer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-amber-300 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              suppressHydrationWarning
              onClick={() => setBookingAstrologer(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-3 border-b border-stone-200 pb-3 mb-4">
                <img 
                  src={bookingAstrologer.avatar} 
                  alt={bookingAstrologer.name} 
                  className="w-12 h-12 rounded-full object-cover border border-amber-400" 
                />
                <div>
                  <h3 className="font-serif font-black text-base text-stone-900">
                    Book Consultation with {bookingAstrologer.name}
                  </h3>
                  <p className="text-xs text-stone-500">{bookingAstrologer.title}</p>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs font-serif">
                {/* Duration Packages Selection */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1.5">
                    1. Choose Consultation Duration (Time Limit)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {DURATION_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.duration}
                        type="button"
                        onClick={() => setSelectedDuration(pkg.duration)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedDuration === pkg.duration
                            ? 'bg-[#78131e] text-white border-[#78131e] shadow-xs'
                            : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-xs">
                          <span>{pkg.duration} Mins</span>
                          <span className={selectedDuration === pkg.duration ? 'text-amber-300 font-mono' : 'text-[#78131e] font-mono'}>
                            ₹{pkg.price}
                          </span>
                        </div>
                        <p className={`text-[10px] truncate ${selectedDuration === pkg.duration ? 'text-amber-100' : 'text-stone-500'}`}>
                          {pkg.title}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Devotee Birth Details */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Your Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    placeholder="e.g. Srikanth Sharma"
                    className="w-full border border-stone-300 rounded-lg p-2.5 outline-none focus:border-[#78131e]" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">WhatsApp Mobile</label>
                    <input 
                      required
                      type="tel" 
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="w-full border border-stone-300 rounded-lg p-2.5 outline-none focus:border-[#78131e]" 
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Date of Birth</label>
                    <input 
                      required
                      type="date" 
                      value={bookingForm.dob}
                      onChange={(e) => setBookingForm({...bookingForm, dob: e.target.value})}
                      className="w-full border border-stone-300 rounded-lg p-2.5 outline-none focus:border-[#78131e]" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Time of Birth</label>
                    <input 
                      type="text" 
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                      placeholder="10:30 AM"
                      className="w-full border border-stone-300 rounded-lg p-2 outline-none focus:border-[#78131e]" 
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Place of Birth</label>
                    <input 
                      type="text" 
                      value={bookingForm.place}
                      onChange={(e) => setBookingForm({...bookingForm, place: e.target.value})}
                      placeholder="e.g. Vijayawada"
                      className="w-full border border-stone-300 rounded-lg p-2 outline-none focus:border-[#78131e]" 
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Moon Rasi</label>
                    <input 
                      type="text" 
                      value={bookingForm.rasi}
                      onChange={(e) => setBookingForm({...bookingForm, rasi: e.target.value})}
                      placeholder="e.g. Mesha"
                      className="w-full border border-stone-300 rounded-lg p-2 outline-none focus:border-[#78131e]" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Primary Question / Prashna</label>
                  <textarea 
                    rows={2}
                    value={bookingForm.query}
                    onChange={(e) => setBookingForm({...bookingForm, query: e.target.value})}
                    placeholder="e.g. Career change timing, marriage matching, or Kuja dosha parihara..."
                    className="w-full border border-stone-300 rounded-lg p-2.5 outline-none focus:border-[#78131e]" 
                  />
                </div>

                <button
                  type="submit"
                  suppressHydrationWarning
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#78131e] to-[#991b1b] text-white font-serif font-black text-sm shadow-md hover:from-[#600e17] hover:to-[#7f1313] transition-all cursor-pointer mt-2"
                >
                  Enter Live Chat Room ({selectedDuration} Mins • ₹{DURATION_PACKAGES.find(p => p.duration === selectedDuration)?.price})
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Devotee Live Chat Room Modal with Real-Time Countdown Timer */}
      {liveChatSession && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full h-[85vh] max-h-[720px] shadow-2xl border-2 border-amber-300 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Live Room Header with Synchronized Countdown Clock */}
            <div className="bg-gradient-to-r from-[#5a0c16] via-[#78131e] to-[#991b1b] text-white p-4 px-5 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <img 
                  src={liveChatSession.astrologerAvatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80'} 
                  alt={liveChatSession.astrologerName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-300" 
                />
                <div>
                  <h3 className="font-serif font-black text-sm sm:text-base text-white">
                    {liveChatSession.astrologerName}
                  </h3>
                  <p className="text-[11px] text-amber-200 font-serif">
                    {liveChatSession.astrologerTitle} • {liveChatSession.durationMinutes} Mins Session
                  </p>
                </div>
              </div>

              {/* Synchronized Countdown Clock */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-amber-200">Session Clock</div>
                  <div className={`font-mono text-xl sm:text-2xl font-black flex items-center justify-end gap-1 ${
                    chatTimeRemaining <= 0 
                      ? 'text-rose-300' 
                      : chatTimeRemaining <= 120 
                      ? 'text-amber-300 animate-pulse' 
                      : 'text-emerald-300'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(chatTimeRemaining)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setLiveChatSession(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fdfbf7]">
              {liveChatSession.messages?.map((msg, idx) => {
                const isDevotee = msg.sender === 'customer' || msg.sender === 'devotee';
                const isAstrologer = msg.sender === 'astrologer';
                const isSystem = msg.sender === 'system';

                if (isSystem) {
                  return (
                    <div key={idx} className="text-center my-2">
                      <span className="inline-block bg-amber-50 border border-amber-300/80 text-amber-950 px-3 py-1.5 rounded-full text-[11px] font-serif shadow-2xs">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={idx} className={`flex flex-col ${isDevotee ? 'items-end' : 'items-start'}`}>
                    <div className="text-[10px] text-stone-500 font-serif mb-0.5 px-1">
                      {isDevotee ? '🙏 You' : '🕉️ ' + msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-serif leading-relaxed shadow-xs ${
                      isDevotee 
                        ? 'bg-[#78131e] text-white rounded-tr-none' 
                        : 'bg-white border border-stone-200 text-stone-900 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Consecrated Remedies if submitted */}
            {liveChatSession.astrologerRemedies && (
              <div className="p-3 bg-amber-50/90 border-t border-amber-200 text-xs font-serif text-amber-950 shrink-0">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 text-[11px] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Consecrated Astrologer Remedies:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>Ratna: <strong>{liveChatSession.astrologerRemedies.gemstone}</strong></div>
                  <div>Mantra: <strong>{liveChatSession.astrologerRemedies.mantra}</strong></div>
                </div>
              </div>
            )}

            {/* Input Bar or Auto-Lock Notice */}
            <div className="p-3.5 border-t border-stone-200 bg-white shrink-0">
              {chatTimeRemaining <= 0 || liveChatSession.sessionStatus === 'time_expired' ? (
                <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-xl flex items-center gap-2.5 text-rose-950 text-xs font-serif">
                  <Lock className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Consultation time limit ended (00:00). Chat input is locked. Your remedies are recorded above.</span>
                </div>
              ) : (
                <form onSubmit={handleDevoteeSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={devoteeMsg}
                    onChange={(e) => setDevoteeMsg(e.target.value)}
                    placeholder="Type your question or reply to the astrologer..."
                    className="flex-1 bg-stone-50 border border-stone-300 focus:border-[#78131e] rounded-xl px-3.5 py-2 text-xs text-stone-800 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#78131e] hover:bg-[#600e17] text-white text-xs font-bold font-serif shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Devotional Footer Banner */}
      <div className="mt-12 bg-amber-50/70 border-t border-[#ebdcc7] py-6 text-center text-xs text-stone-600 font-serif">
        <p className="max-w-2xl mx-auto px-4">
          Astadasapeetam Vedic Jyotish is grounded in Parashara and Jaimini Siddhantas. 
          Planetary remedies serve as spiritual aids alongside sincere prayer and moral conduct.
        </p>
      </div>

    </div>
  );
}
