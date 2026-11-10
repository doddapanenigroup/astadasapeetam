'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  Newspaper, Calendar, Download, Share2, ZoomIn, 
  ZoomOut, ChevronLeft, ChevronRight, FileText, Sparkles
} from 'lucide-react';

export default function EPaperPage() {
  const [selectedEdition, setSelectedEdition] = useState('all-india');
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  const editions = [
    { id: 'all-india', name: 'All-India Grand Sanctuary Edition', telugu: 'అఖిల భారత ప్రధాన సంచిక' },
    { id: 'telangana', name: 'Telangana & Hyderabad Kshetram', telugu: 'తెలంగాణ & భాగ్యనగర సంచిక' },
    { id: 'andhra', name: 'Andhra & Tirupati Srivari Peetham', telugu: 'ఆంధ్రప్రదేశ్ & తిరుపతి సంచిక' },
    { id: 'kashi', name: 'Kashi & North Peethas Special', telugu: 'కాశీ & ఉత్తర పీఠాల విశేష సంచిక' }
  ];

  const headlineStories = [
    {
      title: 'Kashi Vishwanath Corridor Celebrates Maha Somavaram with 1 Lakh Devotees',
      telugu: 'కాశీ విశ్వనాథుని ఆలయంలో లక్ష మంది భక్తుల మహా అభిషేకం',
      page: 1,
      snippet: 'Spiritual pilgrims across the nation gathered at the holy Ganga ghats for continuous Rudrabhishekam.'
    },
    {
      title: 'Srisailam Bhramaramba Devi Special Kumkumarchana Timings Announced',
      telugu: 'శ్రీశైలం భ్రమరాంబా సమేత మల్లికార్జున స్వామి ప్రత్యేక పూజా వివరాలు',
      page: 2,
      snippet: 'Devasthanam issues sacred guidelines for devotees undertaking padayatra during the upcoming Navaratri cycle.'
    },
    {
      title: 'Tirumala Srivari Vasanthotsavam Concludes in Divine Splendor',
      telugu: 'తిరుమల శ్రీవారి వసంతోత్సవాలు భక్తిశ్రద్ధలతో ముగింపు',
      page: 3,
      snippet: 'Thousands of pilgrims witnessed the sacred Snapanathirumanjanam at the holy hill shrine.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-stone-900 pb-16">
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1C091D] via-[#330D35] to-[#1C091D] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Newspaper className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Bhakti Dinapatrika • Daily E-Paper</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
            Sri Astadasapeetam Daily E-Paper Edition
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Daily digital devotional newspaper covering 18 Shakti Peethas, temple events, daily panchangam forecasts, and Vedic spiritual discourses.
          </p>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Controls Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#e8d5bc] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Edition:</span>
            {editions.map(ed => (
              <button
                key={ed.id}
                onClick={() => setSelectedEdition(ed.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedEdition === ed.id ? 'bg-[#78131e] text-white shadow-2xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {ed.name.split(' ')[0]} Edition
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 hover:bg-white rounded-lg disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3">Page {currentPage} of 8</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(8, p + 1))}
                disabled={currentPage === 8}
                className="p-1.5 hover:bg-white rounded-lg disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => alert('Downloading today\'s Astadasapeetam Digital E-Paper Edition PDF...')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Realistic Digital Newspaper Page Viewer */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e8d5bc] shadow-sm space-y-6">
          {/* Newspaper Masthead */}
          <div className="text-center pb-6 border-b-4 border-double border-stone-800 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-900">
              శ్రీ అష్టాదశ పీఠం నిత్య భక్తి పత్రిక • SRI ASTADASAPEETAM DEVOTIONAL HERALD
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-stone-950 tracking-tight">
              అష్టాదశ పీఠం భక్తి ప్రభాతమ్
            </h2>
            <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 font-serif border-t border-b border-stone-300 py-1 px-2 font-bold">
              <span>సంపుటి 12 • సంచిక 142</span>
              <span>23 May 2026, Friday • శుక్ల పక్ష పంచమి</span>
              <span>సంపాదకులు: గౌరవ్ వుంగరాల</span>
              <span>ధర: ఉచిత ఆధ్యాత్మిక సేవ</span>
            </div>
          </div>

          {/* Newspaper Articles Columns Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Lead Story */}
            <div className="lg:col-span-8 space-y-4 border-b lg:border-b-0 lg:border-r border-stone-200 lg:pr-8">
              <span className="text-[10px] font-mono font-bold uppercase text-white bg-[#78131e] px-2 py-0.5 rounded">
                ముఖ్యవార్త • Lead Divine Chronicle
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-stone-950 leading-tight">
                కాశీ విశ్వనాథ క్షేత్రంలో శ్రావణ సోమవార మహా రుద్రాభిషేకం: లక్షలాదిగా తరలివచ్చిన భక్తులు
              </h3>
              <p className="text-sm font-serif font-semibold text-stone-600 italic">
                గంగా నదీ తీరంలో వేద మంత్రోచ్ఛారణలతో మార్మోగిన పుణ్య క్షేత్రం — దేవాదాయ ధర్మాదాయ శాఖ ఆధ్వర్యంలో సమగ్ర ఏర్పాట్లు
              </p>

              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-2xs max-h-72">
                <img
                  src="/images/temple_kashi.jpg"
                  alt="Kashi Vishwanath Temple"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm font-serif text-stone-800 leading-relaxed text-justify">
                వారణాసి క్షేత్రంలోని శ్రీ కాశీ విశ్వనాథ స్వామి ఆలయంలో ఈ ఉదయం బ్రాహ్మీ ముహూర్తంలో విశేష ఏకాదశ రుద్రాభిషేకం ప్రారంభమైంది. దేశ నలుమూలల నుండి విచ్చేసిన సాధుసంతులు, వేద పండితులు పరమేశ్వరునికి గంగాజలము, పంచామృతము, భస్మం, బిల్వదళములతో మహామంగళ హారతి సమర్పించారు. అష్టాదశ పీఠాలలో ఒకటైన ఈ క్షేత్రంలో దర్శనార్థం వచ్చిన భక్తులకు నిత్యాన్నదాన వితరణ నిరంతరాయంగా సాగుతోంది.
              </p>
            </div>

            {/* Side Stories Column */}
            <div className="lg:col-span-4 space-y-5">
              <h4 className="font-serif font-black text-base text-[#78131e] pb-1 border-b-2 border-[#78131e]">
                నేటి ప్రధాన ఆధ్యాత్మిక విశేషాలు
              </h4>

              {headlineStories.map((story, sIdx) => (
                <div key={sIdx} className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200/70 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-900 uppercase">Page {story.page}</span>
                  <h5 className="font-serif font-bold text-sm text-stone-900 leading-snug">
                    {story.telugu}
                  </h5>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {story.snippet}
                  </p>
                </div>
              ))}

              <div className="p-4 bg-gradient-to-br from-[#180A24] to-[#3B1268] text-white rounded-2xl space-y-2 border border-amber-400/40 shadow-xs">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Panchangam Glimpse</span>
                <h5 className="text-xs font-serif font-bold text-amber-100">శుక్ల పంచమి • పునర్వసు నక్షత్రం</h5>
                <p className="text-[11px] text-stone-300">
                  అమృత కాలం: మధ్యాహ్నం 2:15 నుండి 3:48 వరకు. రాహు కాలం: ఉదయం 10:30 నుండి 12:00 వరకు.
                </p>
                <Link
                  href="/panchangam"
                  className="inline-block text-[11px] font-bold text-amber-400 hover:underline pt-1"
                >
                  సంపూర్ణ పంచాంగం చూడండి &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        <AdBanner slotId="slot-4" type="in-feed-2" />
      </div>
    </div>
  );
}
