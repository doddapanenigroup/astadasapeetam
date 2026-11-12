'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, Clock, Shield, Award, MessageSquare, Send, CheckCircle, 
  AlertTriangle, User, Calendar, MapPin, Sparkles, Phone, RefreshCw, 
  ChevronRight, Lock, Eye, EyeOff, FileText, Check, Star, Filter
} from 'lucide-react';

const DURATION_PACKAGES = [
  { duration: 10, price: 199, label: '10 Mins', title: 'Quick Query / Prashna', desc: 'Single specific question & immediate remedy' },
  { duration: 20, price: 399, label: '20 Mins', title: 'Planetary Dasha & Kundali', desc: 'Graha gochara, dasha analysis & basic remedies' },
  { duration: 30, price: 599, label: '30 Mins', title: 'Deep Horoscope & Dosha', desc: 'In-depth birth chart, Kuja/Kala Sarpa dosha analysis' },
  { duration: 45, price: 899, label: '45 Mins', title: 'Comprehensive Life & Family', desc: 'Complete Janma Kundali, career, marriage & family pariharas' }
];

const INITIAL_FALLBACK_CONSULTATIONS = [
  {
    _id: 'sample-c-1',
    devoteeName: 'Kameshwar Rao',
    devoteePhone: '+91 98490 23145',
    devoteeEmail: 'kameshwar.rao@example.com',
    birthDetails: {
      dateOfBirth: '1989-08-14',
      timeOfBirth: '06:45 AM',
      placeOfBirth: 'Rajahmundry, AP',
      rasi: 'Dhanusu (Sagittarius)',
      nakshatram: 'Moola Pada 3',
      gotram: 'Kashyapa'
    },
    durationMinutes: 20,
    timeRemainingSeconds: 1140, // 19 mins
    fee: 399,
    isPaid: true,
    consultationType: 'jathakam_analysis',
    problemDescription: 'Seeking guidance regarding career promotion timing and mitigating Sade Sati Saturn transit effects.',
    status: 'in_progress',
    sessionStatus: 'live',
    astrologerName: 'Sri Vidyanath Shastri',
    messages: [
      {
        sender: 'system',
        senderName: 'Vedic System Clock',
        text: 'Namaste Kameshwar Rao! Your 20-minute consultation has commenced with Pandit Vidyanath Shastri.',
        timestamp: new Date(Date.now() - 60000).toISOString()
      },
      {
        sender: 'customer',
        senderName: 'Kameshwar Rao',
        text: 'Pranam Guruji, please review my Saturn transit for Dhanusu Rasi. I am feeling stagnation in work.',
        timestamp: new Date(Date.now() - 40000).toISOString()
      },
      {
        sender: 'astrologer',
        senderName: 'Sri Vidyanath Shastri',
        text: 'Hari Om Kameshwar ji. Looking at your Janma Kundali, Shani is transiting your 3rd house. Growth is imminent after Makara Sankranti.',
        timestamp: new Date(Date.now() - 20000).toISOString()
      }
    ],
    astrologerRemedies: {
      gemstone: 'Blue Sapphire / Amethyst (Kattela)',
      mantra: 'Om Sham Shanaishcharaya Namaha (108 times on Saturdays)',
      templePariharam: 'Thirunallar Saniswaran or Mandapalli Mandeswara Swamy Temple Thailabhishekam',
      notes: 'Light sesame oil lamp before Peepal tree on Saturdays. Donate black til to the needy.'
    }
  },
  {
    _id: 'sample-c-2',
    devoteeName: 'Anuradha Devi',
    devoteePhone: '+91 97034 56789',
    devoteeEmail: 'anuradha.d@example.com',
    birthDetails: {
      dateOfBirth: '1996-03-22',
      timeOfBirth: '02:15 PM',
      placeOfBirth: 'Vijayawada, AP',
      rasi: 'Mesha (Aries)',
      nakshatram: 'Bharani Pada 2',
      gotram: 'Bharadwaja'
    },
    durationMinutes: 30,
    timeRemainingSeconds: 1800,
    fee: 599,
    isPaid: true,
    consultationType: 'vivaha_matching',
    problemDescription: 'Checking marriage compatibility and checking for any severe Kuja Dosha.',
    status: 'confirmed',
    sessionStatus: 'waiting',
    astrologerName: 'Sri Vidyanath Shastri',
    messages: [
      {
        sender: 'system',
        senderName: 'Vedic Sanctuary System',
        text: 'Devotee has booked a 30-minute deep horoscope session. Awaiting astrologer entrance.',
        timestamp: new Date().toISOString()
      }
    ]
  }
];

export default function AstrologerDeskStudio({ initialConsultations = [], onConsultationUpdated }) {
  const [deskTab, setDeskTab] = useState('active'); // 'active', 'room', 'registry'
  const [consultations, setConsultations] = useState(
    initialConsultations && initialConsultations.length > 0 ? initialConsultations : INITIAL_FALLBACK_CONSULTATIONS
  );
  const [selectedSessionId, setSelectedSessionId] = useState(
    initialConsultations?.[0]?._id || INITIAL_FALLBACK_CONSULTATIONS[0]._id
  );
  const [chatMessage, setChatMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [astrologers, setAstrologers] = useState([
    {
      id: 'ast-1',
      name: 'Pandit Vidyanath Shastri',
      title: 'Senior Vedic Jyotish Acharya',
      experience: '28+ Years',
      specialization: 'Janma Kundali, Dasha Phala, Vivaha Porutham',
      certificationType: 'certified', // INTERNAL ONLY
      isCertified: true,
      pricingPackages: DURATION_PACKAGES,
      activeToday: true,
      completedToday: 8
    },
    {
      id: 'ast-2',
      name: 'Dr. Gayatri Devi Sharma',
      title: 'Vedic Astrology Scholar',
      experience: '21+ Years',
      specialization: 'Nadi Astrology, Parihara Shastra',
      certificationType: 'certified', // INTERNAL ONLY
      isCertified: true,
      pricingPackages: DURATION_PACKAGES,
      activeToday: true,
      completedToday: 5
    },
    {
      id: 'ast-3',
      name: 'Acharya Ramanathan Gurukkal',
      title: 'Prashna Shastra Specialist',
      experience: '16+ Years',
      specialization: 'Prashna Marga, Muhurtha Nirvana',
      certificationType: 'non_certified', // INTERNAL ONLY
      isCertified: false,
      pricingPackages: DURATION_PACKAGES,
      activeToday: false,
      completedToday: 3
    }
  ]);

  // Remedies form state for the active room
  const [remedyForm, setRemedyForm] = useState({
    gemstone: '',
    mantra: '',
    templePariharam: '',
    notes: ''
  });

  const chatEndRef = useRef(null);

  // Sync initial consultations if prop updates
  useEffect(() => {
    if (initialConsultations && initialConsultations.length > 0) {
      setConsultations(initialConsultations);
    }
  }, [initialConsultations]);

  // Active selected session
  const activeSession = consultations.find(c => c._id === selectedSessionId) || consultations[0];

  // Populate remedy form when switching sessions
  useEffect(() => {
    if (activeSession && activeSession.astrologerRemedies) {
      setRemedyForm({
        gemstone: activeSession.astrologerRemedies.gemstone || '',
        mantra: activeSession.astrologerRemedies.mantra || '',
        templePariharam: activeSession.astrologerRemedies.templePariharam || '',
        notes: activeSession.astrologerRemedies.notes || activeSession.astrologerRemedyNotes || ''
      });
    } else {
      setRemedyForm({ gemstone: '', mantra: '', templePariharam: '', notes: '' });
    }
  }, [selectedSessionId]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages?.length, deskTab]);

  // Live Timer Countdown for active live sessions (Ticks down every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setConsultations(prevList =>
        prevList.map(item => {
          if (item.sessionStatus === 'live' && item.timeRemainingSeconds > 0) {
            const nextRemaining = item.timeRemainingSeconds - 1;
            if (nextRemaining === 0) {
              return {
                ...item,
                timeRemainingSeconds: 0,
                sessionStatus: 'time_expired',
                messages: [
                  ...(item.messages || []),
                  {
                    sender: 'system',
                    senderName: 'Vedic System Clock',
                    text: '⏳ Consultation time limit reached (00:00). Chat input locked. Please provide official Vedic pariharam recommendations below.',
                    timestamp: new Date().toISOString()
                  }
                ]
              };
            }
            return {
              ...item,
              timeRemainingSeconds: nextRemaining
            };
          }
          return item;
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    if (typeof secs !== 'number' || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Astrologer sends a message
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!chatMessage.trim() || !activeSession) return;

    if (activeSession.sessionStatus === 'time_expired' || activeSession.sessionStatus === 'completed') {
      alert('This consultation duration has ended. The chat is locked.');
      return;
    }

    const newMsg = {
      sender: 'astrologer',
      senderName: activeSession.astrologerName || 'Jyotish Acharya',
      text: chatMessage.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedSession = {
      ...activeSession,
      sessionStatus: activeSession.sessionStatus === 'waiting' ? 'live' : activeSession.sessionStatus,
      status: activeSession.status === 'confirmed' ? 'in_progress' : activeSession.status,
      messages: [...(activeSession.messages || []), newMsg]
    };

    setConsultations(prev => prev.map(c => c._id === activeSession._id ? updatedSession : c));
    setChatMessage('');

    // Try posting to backend
    try {
      await fetch(`http://localhost:5000/api/astrologer/consultations/${activeSession._id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'astrologer',
          senderName: activeSession.astrologerName || 'Astrologer Acharya',
          text: newMsg.text
        })
      });
    } catch (err) {
      console.warn('Backend sync failed, updated locally:', err);
    }
  };

  // Astrologer submits remedies & completes consultation
  const handleSaveRemedies = async () => {
    if (!activeSession) return;

    const updatedSession = {
      ...activeSession,
      status: 'completed',
      sessionStatus: 'completed',
      astrologerRemedies: { ...remedyForm },
      astrologerRemedyNotes: remedyForm.notes,
      messages: [
        ...(activeSession.messages || []),
        {
          sender: 'system',
          senderName: 'Vedic Astrologer Desk',
          text: `🕉️ Acharya ${activeSession.astrologerName || 'Vidyanath Shastri'} has recorded and submitted your consecrated Vedic Pariharas and Gemstone recommendations. Session completed.`,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setConsultations(prev => prev.map(c => c._id === activeSession._id ? updatedSession : c));
    alert('Vedic Remedies successfully registered and consultation marked as Concluded!');

    // Persist to backend
    try {
      await fetch(`http://localhost:5000/api/astrologer/consultations/${activeSession._id}/complete`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gemstone: remedyForm.gemstone,
          mantra: remedyForm.mantra,
          templePariharam: remedyForm.templePariharam,
          remedyNotes: remedyForm.notes
        })
      });
    } catch (err) {
      console.warn('Backend sync failed, saved locally:', err);
    }
  };

  // Toggle Astrologer Internal Certification
  const handleToggleCertification = (astId) => {
    setAstrologers(prev => prev.map(ast => {
      if (ast.id === astId) {
        const nextCert = ast.certificationType === 'certified' ? 'non_certified' : 'certified';
        return {
          ...ast,
          certificationType: nextCert,
          isCertified: nextCert === 'certified'
        };
      }
      return ast;
    }));
  };

  // Filter consultations
  const filteredConsultations = consultations.filter(c => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'live') return c.sessionStatus === 'live';
    if (filterStatus === 'waiting') return c.sessionStatus === 'waiting';
    if (filterStatus === 'completed') return c.sessionStatus === 'completed' || c.sessionStatus === 'time_expired';
    return true;
  });

  const liveCount = consultations.filter(c => c.sessionStatus === 'live').length;
  const waitingCount = consultations.filter(c => c.sessionStatus === 'waiting').length;
  const completedCount = consultations.filter(c => c.sessionStatus === 'completed' || c.sessionStatus === 'time_expired').length;

  return (
    <div className="space-y-6">

      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl border border-purple-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(circle_at_top_right,rgba(216,180,254,0.15),transparent_70%)] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-serif font-black uppercase tracking-widest mb-2 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>Devotee Jyotish Sanctuary Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Astrologer Jyotish Workspace & Live Consultations
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl font-serif mt-1">
              Connect devotees directly with Astrologers. Pure duration-based time limits (10m, 20m, 30m, 45m) with automatic chat-lock and pariharam prescription recording.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Live Sessions</span>
              <span className="text-2xl font-black text-white flex items-center justify-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                {liveCount}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Waiting Queue</span>
              <span className="text-2xl font-black text-white">{waitingCount}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-purple-300 block">Concluded</span>
              <span className="text-2xl font-black text-white">{completedCount}</span>
            </div>
          </div>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-purple-800/60 text-xs font-serif">
          <button
            onClick={() => setDeskTab('active')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              deskTab === 'active' 
                ? 'bg-amber-400 text-stone-950 shadow-md' 
                : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/80'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Consultation Queue ({consultations.length})</span>
          </button>

          <button
            onClick={() => setDeskTab('room')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              deskTab === 'room' 
                ? 'bg-amber-400 text-stone-950 shadow-md' 
                : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/80'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Live Consultation Room {activeSession?.sessionStatus === 'live' && '🔴'}</span>
          </button>

          <button
            onClick={() => setDeskTab('registry')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
              deskTab === 'registry' 
                ? 'bg-amber-400 text-stone-950 shadow-md' 
                : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/80'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Astrologer Registry & Internal Certification ({astrologers.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: CONSULTATION QUEUE & SESSIONS LIST                              */}
      {/* ========================================================================= */}
      {deskTab === 'active' && (
        <div className="space-y-4">
          
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-serif">
              <span className="font-bold text-stone-600">Filter By Status:</span>
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterStatus === 'all' ? 'bg-[#78131e] text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All ({consultations.length})
              </button>
              <button
                onClick={() => setFilterStatus('live')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterStatus === 'live' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                Live Now ({liveCount})
              </button>
              <button
                onClick={() => setFilterStatus('waiting')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterStatus === 'waiting' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                Waiting Queue ({waitingCount})
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterStatus === 'completed' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                }`}
              >
                Concluded ({completedCount})
              </button>
            </div>

            <div className="text-xs text-stone-500 font-serif">
              <span>Timing-Based Packages: </span>
              <strong className="text-stone-800">10m (₹199) • 20m (₹399) • 30m (₹599) • 45m (₹899)</strong>
            </div>
          </div>

          {/* Consultation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredConsultations.map((c) => {
              const isLive = c.sessionStatus === 'live';
              const isExpired = c.sessionStatus === 'time_expired';
              const isCompleted = c.sessionStatus === 'completed';
              const isWaiting = c.sessionStatus === 'waiting';

              return (
                <div 
                  key={c._id}
                  className={`bg-white rounded-2xl p-5 border-2 transition-all shadow-xs flex flex-col justify-between ${
                    c._id === selectedSessionId ? 'border-purple-600 ring-2 ring-purple-100' : 'border-stone-200 hover:border-amber-400'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-black text-base text-stone-900">{c.devoteeName}</h4>
                          <span className="text-xs text-stone-500 font-mono">{c.devoteePhone}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 font-serif">
                          Astrologer: <strong className="text-purple-900">{c.astrologerName || 'Sri Vidyanath Shastri'}</strong>
                        </p>
                      </div>

                      {/* Status & Timer Badge */}
                      <div className="text-right">
                        {isLive && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                            <span>LIVE • {formatTime(c.timeRemainingSeconds)}</span>
                          </div>
                        )}
                        {isWaiting && (
                          <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                            ⏳ Waiting Devotee
                          </span>
                        )}
                        {isExpired && (
                          <span className="inline-block px-2.5 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold">
                            ⚠️ Time Concluded (00:00)
                          </span>
                        )}
                        {isCompleted && (
                          <span className="inline-block px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold">
                            ✓ Pariharam Submitted
                          </span>
                        )}

                        <div className="text-[11px] font-bold text-stone-700 mt-1">
                          {c.durationMinutes || 20} Mins • <span className="text-[#78131e]">₹{c.fee || 399}</span>
                        </div>
                      </div>
                    </div>

                    {/* Janma Kundali Quick Strip */}
                    <div className="bg-purple-50/70 border border-purple-200/80 rounded-xl p-3 text-xs space-y-1 text-purple-950 font-serif">
                      <div className="flex items-center gap-2 font-bold text-purple-900">
                        <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                        <span>Janma Kundali Details:</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-[11px]">
                        <div>DOB: <strong>{c.birthDetails?.dateOfBirth || '1990-01-01'}</strong></div>
                        <div>Time: <strong>{c.birthDetails?.timeOfBirth || '10:00 AM'}</strong></div>
                        <div>Place: <strong>{c.birthDetails?.placeOfBirth || 'Andhra Pradesh'}</strong></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-purple-200/60">
                        <div>Rasi: <strong>{c.birthDetails?.rasi || 'Mesha'}</strong></div>
                        <div>Gotram: <strong>{c.birthDetails?.gotram || 'Kashyapa'}</strong></div>
                      </div>
                    </div>

                    {/* Problem Description */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-700 font-serif">
                      <span className="text-[10px] font-bold uppercase text-stone-400 block mb-0.5">Devotee's Prashna / Query</span>
                      <p className="italic">"{c.problemDescription || 'General Kundali guidance and remedies.'}"</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 font-mono">
                      {c.messages?.length || 0} messages exchanged
                    </span>

                    <button
                      onClick={() => {
                        setSelectedSessionId(c._id);
                        setDeskTab('room');
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-900 hover:to-indigo-950 text-white text-xs font-bold font-serif shadow-xs flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isLive ? 'Join Live Room' : 'Open Astrologer Room'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: LIVE CONSULTATION ROOM (CHAT + TIMER + REMEDIES)               */}
      {/* ========================================================================= */}
      {deskTab === 'room' && activeSession && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column (8 Cols): Live Chat Box with Timer */}
          <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-stone-200 shadow-md flex flex-col h-[740px] overflow-hidden">
            
            {/* Room Header with Synchronized Countdown Clock */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-4 px-6 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-700/60 border border-purple-400/40 flex items-center justify-center font-serif font-black text-amber-300">
                  ॐ
                </div>
                <div>
                  <h3 className="font-serif font-black text-base text-white flex items-center gap-2">
                    <span>{activeSession.devoteeName}</span>
                    <span className="text-xs font-normal text-purple-300">({activeSession.devoteePhone})</span>
                  </h3>
                  <p className="text-xs text-purple-200/80 font-serif">
                    Package: {activeSession.durationMinutes || 20} Mins (₹{activeSession.fee || 399}) • Astrologer: {activeSession.astrologerName || 'Sri Vidyanath Shastri'}
                  </p>
                </div>
              </div>

              {/* Big Ticking Timer */}
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Session Clock</div>
                <div className={`font-mono text-2xl font-black flex items-center gap-1.5 ${
                  activeSession.sessionStatus === 'time_expired' 
                    ? 'text-rose-400' 
                    : activeSession.timeRemainingSeconds <= 120 
                    ? 'text-amber-400 animate-pulse' 
                    : 'text-emerald-400'
                }`}>
                  <Clock className="w-5 h-5" />
                  <span>{formatTime(activeSession.timeRemainingSeconds)}</span>
                </div>
                <span className="text-[10px] text-purple-200 font-serif">
                  {activeSession.sessionStatus === 'time_expired' ? '⚠️ Time Over' : 'Auto-lock at 00:00'}
                </span>
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-[#fdfbf7]">
              {activeSession.messages && activeSession.messages.length > 0 ? (
                activeSession.messages.map((m, idx) => {
                  const isAstrologer = m.sender === 'astrologer';
                  const isDevotee = m.sender === 'customer' || m.sender === 'devotee';
                  const isSystem = m.sender === 'system';

                  if (isSystem) {
                    return (
                      <div key={idx} className="text-center my-3">
                        <div className="inline-block bg-amber-50 border border-amber-300/80 text-amber-950 px-4 py-2 rounded-2xl text-xs font-serif shadow-2xs max-w-lg">
                          <span className="font-bold block text-[10px] text-amber-800 uppercase tracking-widest">{m.senderName || 'System Notice'}</span>
                          <span>{m.text}</span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div 
                      key={idx}
                      className={`flex flex-col ${isAstrologer ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-stone-500 font-serif mb-1 px-1 flex items-center gap-1.5">
                        <span className="font-bold">{isAstrologer ? '🕉️ ' + (m.senderName || 'Astrologer Acharya') : '🙏 ' + (m.senderName || activeSession.devoteeName)}</span>
                        <span>•</span>
                        <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div 
                        className={`max-w-[78%] p-3.5 rounded-2xl text-xs font-serif leading-relaxed shadow-xs ${
                          isAstrologer 
                            ? 'bg-gradient-to-br from-purple-800 to-indigo-900 text-white rounded-tr-none' 
                            : 'bg-white border-2 border-stone-200 text-stone-900 rounded-tl-none'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16 text-stone-400 font-serif">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No messages yet. Send an auspicious greeting to begin.</p>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar or Auto-Lock Notice */}
            <div className="p-4 border-t border-stone-200 bg-white shrink-0">
              {activeSession.sessionStatus === 'time_expired' || activeSession.sessionStatus === 'completed' ? (
                <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center gap-3 text-rose-950 text-xs font-serif">
                  <Lock className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <strong className="block font-bold">Consultation Time Limit Reached (00:00)</strong>
                    <span>The chat input has been automatically locked. Please complete the Vedic remedies form on the right to conclude.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type divine astrological guidance or ask devotee for clarification..."
                    className="flex-1 bg-stone-50 border border-stone-300 focus:border-purple-700 rounded-xl px-4 py-2.5 text-xs text-stone-800 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-900 hover:to-indigo-950 text-white text-xs font-bold font-serif shadow-xs flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Right Column (4 Cols): Devotee Kundali Drawer & Vedic Remedy Prescription */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Janma Kundali Card */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-3 font-serif">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-2.5 text-purple-900 font-black text-sm">
                <Sparkles className="w-4 h-4 text-purple-700" />
                <span>Devotee Janma Kundali & Chart</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Date of Birth:</span>
                  <strong className="text-stone-900">{activeSession.birthDetails?.dateOfBirth}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Time of Birth:</span>
                  <strong className="text-stone-900">{activeSession.birthDetails?.timeOfBirth}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Place of Birth:</span>
                  <strong className="text-stone-900">{activeSession.birthDetails?.placeOfBirth}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Moon Rasi:</span>
                  <strong className="text-purple-900 font-bold">{activeSession.birthDetails?.rasi}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Gotram:</span>
                  <strong className="text-stone-900">{activeSession.birthDetails?.gotram}</strong>
                </div>
                <div className="py-1">
                  <span className="text-stone-500 block mb-1">Prashna (Query):</span>
                  <p className="bg-stone-50 p-2 rounded-lg text-stone-800 text-[11px] border border-stone-200 italic">
                    "{activeSession.problemDescription}"
                  </p>
                </div>
              </div>
            </div>

            {/* Prescribe Vedic Remedies Form */}
            <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4 font-serif">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-2.5 text-[#78131e] font-black text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Vedic Remedies & Pariharam Prescription</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Recommended Gemstone / Ratna</label>
                  <input
                    type="text"
                    value={remedyForm.gemstone}
                    onChange={(e) => setRemedyForm({ ...remedyForm, gemstone: e.target.value })}
                    placeholder="e.g. Yellow Sapphire (Pushparagam) in Gold"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs outline-none focus:border-purple-700"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Prescribed Chanting Mantra</label>
                  <input
                    type="text"
                    value={remedyForm.mantra}
                    onChange={(e) => setRemedyForm({ ...remedyForm, mantra: e.target.value })}
                    placeholder="e.g. Om Brihaspataye Namaha 108 times on Thursdays"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs outline-none focus:border-purple-700"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Sacred Temple Pariharam</label>
                  <input
                    type="text"
                    value={remedyForm.templePariharam}
                    onChange={(e) => setRemedyForm({ ...remedyForm, templePariharam: e.target.value })}
                    placeholder="e.g. Alangudi Guru Temple Pooja or Tirupati Darshan"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs outline-none focus:border-purple-700"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Detailed Astrological Notes & Advice</label>
                  <textarea
                    rows={3}
                    value={remedyForm.notes}
                    onChange={(e) => setRemedyForm({ ...remedyForm, notes: e.target.value })}
                    placeholder="Observations regarding dasha period, auspicious dates, and dosha mitigation advice..."
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs outline-none focus:border-purple-700"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveRemedies}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit Remedies & Complete Session</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: ASTROLOGER REGISTRY & INTERNAL CERTIFICATION DESK             */}
      {/* ========================================================================= */}
      {deskTab === 'registry' && (
        <div className="space-y-6">

          {/* Crucial Internal Certification Policy Banner */}
          <div className="bg-amber-50 border-2 border-amber-300 p-5 rounded-3xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 font-bold text-lg">
              🔒
            </div>
            <div className="text-xs text-amber-950 font-serif space-y-1">
              <h4 className="font-black text-sm text-[#78131e] flex items-center gap-2">
                <span>Internal Astrologer Vetting & Certification Registry</span>
                <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">Strictly Internal</span>
              </h4>
              <p className="leading-relaxed">
                Astrologers registered on the platform are categorized internally as <strong>Certified</strong> vs <strong>Non-Certified</strong> for internal vetting, quality assurance, and commission calculations.
              </p>
              <p className="font-bold text-rose-900">
                ⚠️ Platform Business Policy: The public frontend (/astrology) NEVER shows whether an astrologer is certified or non-certified. Public users see all approved astrologers under a uniform, auspicious Vedic Acharya presentation.
              </p>
            </div>
          </div>

          {/* Astrologers Table */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-lg text-stone-900">
                  Astrologer Profiles & Internal Vetting Registry
                </h3>
                <p className="text-xs text-stone-500 font-serif">
                  Manage astrologer verification status and standard duration-based pricing tiers.
                </p>
              </div>
              <span className="text-xs font-serif font-bold text-purple-900 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
                Total Registry: {astrologers.length} Acharyas
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-serif">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Astrologer</th>
                    <th className="p-4">Experience & Specialties</th>
                    <th className="p-4">Duration Pricing Packages</th>
                    <th className="p-4">Internal Classification</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {astrologers.map((ast) => (
                    <tr key={ast.id} className="hover:bg-purple-50/30 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-stone-900 text-sm">{ast.name}</div>
                        <div className="text-[11px] text-purple-800">{ast.title}</div>
                        <div className="text-[10px] text-stone-400 mt-0.5">
                          {ast.activeToday ? '🟢 Online in Studio' : '⚪ Offline / In Puja'}
                        </div>
                      </td>

                      <td className="p-4 max-w-xs">
                        <div className="font-bold text-stone-700">{ast.experience}</div>
                        <div className="text-stone-500 text-[11px] truncate">{ast.specialization}</div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1.5 text-[10px]">
                          <span className="bg-stone-100 px-2 py-0.5 rounded border font-mono">10m: ₹199</span>
                          <span className="bg-stone-100 px-2 py-0.5 rounded border font-mono">20m: ₹399</span>
                          <span className="bg-stone-100 px-2 py-0.5 rounded border font-mono">30m: ₹599</span>
                          <span className="bg-stone-100 px-2 py-0.5 rounded border font-mono">45m: ₹899</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-1">
                          {ast.certificationType === 'certified' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[11px]">
                              <Award className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Certified (Internal)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-300 font-bold text-[11px]">
                              <Shield className="w-3.5 h-3.5 text-stone-500" />
                              <span>Non-Certified (Internal)</span>
                            </span>
                          )}
                          <span className="block text-[9px] text-stone-400 italic">
                            (Hidden from public frontend)
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleCertification(ast.id)}
                          className="px-3 py-1.5 rounded-lg border border-stone-300 hover:border-purple-600 bg-white hover:bg-purple-50 text-xs font-bold text-stone-700 hover:text-purple-900 transition-colors cursor-pointer"
                        >
                          Toggle Cert
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Rules Overview */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs font-serif space-y-4">
            <h4 className="font-black text-base text-stone-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#78131e]" />
              <span>Standard Time-Based Consultation Pricing Rule</span>
            </h4>
            <p className="text-xs text-stone-600 max-w-3xl leading-relaxed">
              Consultation Dakshina fees are strictly configured based on chat duration alone, ensuring transparent pricing for devotees and uniform booking flows across all astrologers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {DURATION_PACKAGES.map((pkg) => (
                <div key={pkg.duration} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-sm">{pkg.label}</span>
                    <strong className="text-lg font-black text-[#78131e]">₹{pkg.price}</strong>
                  </div>
                  <div className="text-xs font-bold text-purple-900">{pkg.title}</div>
                  <div className="text-[11px] text-stone-500 leading-snug">{pkg.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
