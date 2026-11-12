'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  Newspaper, Calendar, Download, Share2, ZoomIn, 
  ZoomOut, ChevronLeft, ChevronRight, FileText, Sparkles, X, BookOpen, Clock, Tag, ExternalLink
} from 'lucide-react';

export default function EPaperPage() {
  const [selectedEdition, setSelectedEdition] = useState('all-india');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStoryModal, setSelectedStoryModal] = useState(null);

  const editions = [
    { id: 'all-india', name: 'All-India Grand Sanctuary Edition', telugu: 'అఖిల భారత ప్రధాన సంచిక' },
    { id: 'telangana', name: 'Telangana & Hyderabad Kshetram', telugu: 'తెలంగాణ & భాగ్యనగర సంచిక' },
    { id: 'andhra', name: 'Andhra & Tirupati Srivari Peetham', telugu: 'ఆంధ్రప్రదేశ్ & తిరుపతి సంచిక' },
    { id: 'kashi', name: 'Kashi & North Peethas Special', telugu: 'కాశీ & ఉత్తర పీఠాల విశేష సంచిక' }
  ];

  const defaultEditorialStories = [
    {
      _id: 'default-1',
      title: 'Grand Maha Somavaram Abhishekams at Kashi & Srisailam Sanctuaries',
      titleTelugu: 'కాశీ & శ్రీశైల క్షేత్రాలలో శ్రావణ సోమవార మహా రుద్రాభిషేకం: లక్షలాదిగా భక్తులు',
      excerpt: 'Devotees gather at holy Ganga ghats and Krishna river kshetras for continuous Rudrabhishekam and Akhanda Bilvarchana.',
      content: 'వారణాసి క్షేత్రంలోని శ్రీ కాశీ విశ్వనాథ స్వామి ఆలయం మరియు శ్రీశైల భ్రమరాంబ సమేత మల్లికార్జున స్వామి ఆలయాలలో విశేష ఏకాదశ రుద్రాభిషేకం నేడు అత్యంత భక్తిశ్రద్ధలతో నిర్వహించబడింది. దేశ విదేశాల నుండి వేలాదిగా తరలివచ్చిన భక్తులకు దేవాదాయ శాఖ పర్యవేక్షణలో నిరంతర అన్నప్రసాద వితరణ మరియు శీఘ్ర దర్శన ఏర్పాట్లు కల్పించారు.',
      featuredImage: '/images/temple_kashi.jpg',
      createdAt: new Date().toISOString(),
      authorName: 'Sri Astadasapeetam Chief Editor',
      category: 'news',
      deity: 'Lord Shiva & Parashakti'
    },
    {
      _id: 'default-2',
      title: 'Tirumala Annual Brahmotsavams Schedule & Special Vahana Seva Guidelines',
      titleTelugu: 'తిరుమల శ్రీవారి సాలకట్ల బ్రహ్మోత్సవాల షెడ్యూల్ విడుదల - విశేష వాహన సేవలు',
      excerpt: 'TTD releases comprehensive calendar for upcoming Brahmotsavam processions including Garuda Seva and Rathotsavam timings.',
      content: 'తిరుమల తిరుపతి దేవస్థానం శ్రీవారి వార్షిక బ్రహ్మోత్సవాల తేదీలను మరియు వాహన సేవల వివరాలను అధికారికంగా ప్రకటించింది. గరుడ సేవ రోజున లక్షలాది భక్తులు తరలిరానున్న నేపథ్యంలో విస్తృత భద్రతా ఏర్పాట్లు, తాగునీరు మరియు ప్రసాద వితరణ కేంద్రాలు ఏర్పాటు చేస్తున్నారు.',
      featuredImage: '/images/temple_tirupati.jpg',
      createdAt: new Date().toISOString(),
      authorName: 'Tirumala Devasthanam Bureau',
      category: 'news',
      deity: 'Lord Sri Venkateswara'
    },
    {
      _id: 'default-3',
      title: 'Navaratri Special Kumkumarchana Timings Announced at 18 Maha Shakti Peethas',
      titleTelugu: 'అష్టాదశ మహాశక్తి పీఠాలలో శరన్నవరాత్రి మహోత్సవాల ముందస్తు ఏర్పాట్లు',
      excerpt: 'Temple trusts across all 18 Shakti Peethas coordinate for 9 days of continuous Chandi Homams and Suvasini Pujas.',
      content: 'భారతదేశం మరియు పొరుగు దేశాలలో కొలువైన అష్టాదశ మహాశక్తి పీఠాలలో రానున్న దేవీ నవరాత్రుల ఉత్సవాల ఏర్పాట్లు ముమ్మరంగా ప్రారంభమయ్యాయి. కామాఖ్య, శ్రీశైలం, జోగులాంబ, ఉజ్జయిని, కంచి మరియు శృంగేరి క్షేత్రాలలో భక్తుల కోసం ప్రత్యేక దర్శన క్యూలైన్లు మరియు నిత్య చండీ హోమాలు సిద్ధం చేయబడ్డాయి.',
      featuredImage: '/images/temple_kashi.jpg',
      createdAt: new Date().toISOString(),
      authorName: 'Peethas Advisory Board',
      category: 'news',
      deity: 'Maha Shakti Swaroopini'
    }
  ];

  // Fetch dynamic Devotional News articles from API & Local Storage
  useEffect(() => {
    const fetchNews = () => {
      fetch('http://localhost:5000/api/posts?category=news&status=published&limit=30')
        .then(res => res.json())
        .then(data => {
          let list = [];
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            list = data.data;
          }

          // If no custom news articles from server yet, merge with editorial stories
          if (list.length === 0) {
            list = defaultEditorialStories;
          }

          setNewsArticles(list);
        })
        .catch(() => {
          setNewsArticles(defaultEditorialStories);
        })
        .finally(() => setLoading(false));
    };

    fetchNews();

    if (typeof window !== 'undefined') {
      window.addEventListener('astada_posts_updated', fetchNews);
      return () => window.removeEventListener('astada_posts_updated', fetchNews);
    }
  }, []);

  // Compute pagination and active story slices
  const totalPages = Math.max(1, Math.ceil(newsArticles.length / 4));
  const leadStory = newsArticles[(currentPage - 1) * 4] || newsArticles[0] || defaultEditorialStories[0];
  const sideStories = newsArticles.slice((currentPage - 1) * 4 + 1, (currentPage - 1) * 4 + 4);
  const extraStories = newsArticles.slice((currentPage - 1) * 4 + 4, (currentPage - 1) * 4 + 7);

  const todayDateStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-stone-900 pb-16">
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1C091D] via-[#330D35] to-[#1C091D] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Newspaper className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Bhakti Dinapatrika • Devotional News &amp; E-Paper Edition</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
            Sri Astadasapeetam Daily Devotional E-Paper (ఈ-పేపర్)
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
            All Devotional News published by the editors appears here formatted as authentic digital newspaper pages, featuring breaking temple updates, darshan announcements, utsavam schedules, and sacred commentaries.
          </p>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Newspaper Controls Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#e8d5bc] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Editions:</span>
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
            {/* Page Navigation */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 hover:bg-white rounded-lg disabled:opacity-40 cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3">Page {currentPage} of {Math.max(1, totalPages)}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1.5 hover:bg-white rounded-lg disabled:opacity-40 cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => alert(`Downloading today's Astadasapeetam Digital E-Paper Edition PDF for ${todayDateStr}...`)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Realistic Digital Newspaper Page Sheet */}
        <div className="bg-[#fffefb] rounded-3xl p-6 sm:p-10 border border-[#e8d5bc] shadow-sm space-y-6">
          {/* Newspaper Masthead */}
          <div className="text-center pb-6 border-b-4 border-double border-stone-800 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-900">
              శ్రీ అష్టాదశ పీఠం నిత్య భక్తి పత్రిక • SRI ASTADASAPEETAM DEVOTIONAL HERALD
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-stone-950 tracking-tight">
              అష్టాదశ పీఠం భక్తి ప్రభాతమ్
            </h2>
            <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 font-serif border-t border-b border-stone-300 py-1.5 px-3 font-bold">
              <span>సంపుటి 12 • సంచిక 142 (E-Paper)</span>
              <span>{todayDateStr}</span>
              <span>వర్గం: ఆధ్యాత్మిక వార్తలు (Devotional News)</span>
              <span>ధర: ఉచిత నిత్య ఆధ్యాత్మిక సేవ</span>
            </div>
          </div>

          {/* Newspaper Columns Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Lead News Chronicle */}
            {leadStory && (
              <div className="lg:col-span-8 space-y-4 border-b lg:border-b-0 lg:border-r border-stone-200 lg:pr-8">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-white bg-[#78131e] px-2.5 py-0.5 rounded shadow-2xs">
                    ముఖ్యవార్త • Lead Devotional Chronicle
                  </span>
                  <span className="text-[11px] font-mono text-stone-500 font-semibold">
                    {new Date(leadStory.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <h3 
                  onClick={() => setSelectedStoryModal(leadStory)}
                  className="text-2xl sm:text-3xl font-serif font-black text-stone-950 leading-tight hover:text-[#78131e] cursor-pointer transition-colors"
                >
                  {leadStory.titleTelugu || leadStory.title}
                </h3>

                {leadStory.titleTelugu && leadStory.title && (
                  <p className="text-sm font-serif font-semibold text-stone-700 italic border-l-2 border-amber-600 pl-3">
                    {leadStory.title}
                  </p>
                )}

                {leadStory.featuredImage && (
                  <div 
                    onClick={() => setSelectedStoryModal(leadStory)}
                    className="rounded-2xl overflow-hidden border border-stone-200 shadow-2xs max-h-80 cursor-pointer group relative"
                  >
                    <img
                      src={leadStory.featuredImage}
                      alt={leadStory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white text-xs font-serif flex items-center justify-between">
                      <span>{leadStory.deity ? `క్షేత్ర దైవం: ${leadStory.deity}` : 'దివ్య క్షేత్ర సమాచారం'}</span>
                      <span className="text-[10px] text-amber-300 font-sans font-bold flex items-center gap-1">
                        <span>Click to read full story</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-xs sm:text-sm font-serif text-stone-800 leading-relaxed text-justify line-clamp-6">
                  {leadStory.content || leadStory.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                  <div className="text-xs text-stone-500 font-serif">
                    నివేదిక: <strong className="text-stone-800">{leadStory.authorName || 'శ్రీ అష్టాదశ పీఠం ప్రత్యేక ప్రతినిధి'}</strong>
                  </div>
                  <button
                    onClick={() => setSelectedStoryModal(leadStory)}
                    className="text-xs font-bold text-[#78131e] hover:text-[#5a0d16] flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>సంపూర్ణ వార్త చదవండి (Read Full Story)</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Right Column: Newspaper News Columns */}
            <div className="lg:col-span-4 space-y-5">
              <h4 className="font-serif font-black text-sm uppercase tracking-wider text-[#78131e] pb-1 border-b-2 border-[#78131e] flex items-center justify-between">
                <span>నేటి ప్రధాన ఆధ్యాత్మిక విశేషాలు</span>
                <span className="text-[10px] font-mono text-stone-500">News Feed</span>
              </h4>

              {/* Side News Articles */}
              <div className="space-y-3.5">
                {sideStories.length > 0 ? (
                  sideStories.map((story, sIdx) => (
                    <div 
                      key={story._id || sIdx}
                      onClick={() => setSelectedStoryModal(story)}
                      className="p-4 bg-amber-50/50 hover:bg-amber-100/60 transition rounded-2xl border border-amber-200/70 space-y-1.5 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold text-amber-900 bg-amber-200/60 px-1.5 py-0.5 rounded uppercase">
                          వార్త విశేషం {sIdx + 2}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {new Date(story.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                      <h5 className="font-serif font-bold text-sm text-stone-900 leading-snug group-hover:text-[#78131e] transition-colors">
                        {story.titleTelugu || story.title}
                      </h5>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {story.excerpt || story.content}
                      </p>
                      <div className="pt-1 flex items-center justify-end text-[11px] font-bold text-amber-800">
                        <span className="group-hover:underline">వివరాలు చూడండి &rarr;</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-center text-xs text-stone-500">
                    No secondary stories on this page. Use publisher studio to compose new Devotional News.
                  </div>
                )}
              </div>

              {/* Daily Panchangam Almanac Column Box */}
              <div className="p-4 bg-gradient-to-br from-[#180A24] to-[#3B1268] text-white rounded-2xl space-y-2 border border-amber-400/40 shadow-xs">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                  నేటి పంచాంగ ముఖ్యాంశాలు (Panchangam)
                </span>
                <h5 className="text-xs font-serif font-bold text-amber-100">
                  శుక్ల పంచమి • రోహిణి నక్షత్రం • బ్రహ్మ ముహూర్తం
                </h5>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  అమృత కాలం: ఉదయం 8:45 నుండి 10:15 వరకు. రాహు కాలం: సాయంత్రం 4:30 నుండి 6:00 వరకు.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <Link
                    href="/panchangam"
                    className="inline-block text-[11px] font-bold text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    సంపూర్ణ పంచాంగం చూడండి &rarr;
                  </Link>
                  <Link
                    href="/astrology"
                    className="inline-block text-[11px] font-bold text-stone-300 hover:text-white"
                  >
                    జ్యోతిష్య విశ్లేషణ
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Newspaper Bottom Section: Additional Devotional News Columns */}
          {extraStories.length > 0 && (
            <div className="pt-6 border-t-2 border-stone-200">
              <h4 className="font-serif font-black text-sm uppercase tracking-wider text-stone-800 mb-4 pb-1 border-b border-stone-200">
                మరిన్ని క్షేత్ర వార్తా విశేషాలు (More Devotional Chronicles)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {extraStories.map((story, eIdx) => (
                  <div
                    key={story._id || eIdx}
                    onClick={() => setSelectedStoryModal(story)}
                    className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs hover:border-amber-400 cursor-pointer space-y-2 transition group"
                  >
                    {story.featuredImage && (
                      <div className="h-28 rounded-xl overflow-hidden bg-stone-100">
                        <img 
                          src={story.featuredImage} 
                          alt={story.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                      </div>
                    )}
                    <h5 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#78131e] line-clamp-2">
                      {story.titleTelugu || story.title}
                    </h5>
                    <p className="text-[11px] text-stone-600 line-clamp-2">
                      {story.excerpt || story.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <AdBanner slotId="slot-4" type="in-feed-2" />
      </div>

      {/* Full Newspaper Article Reading Modal */}
      {selectedStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#fffefb] border border-[#d8c2a5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative my-8">
            <button
              onClick={() => setSelectedStoryModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer transition"
              title="Close article reader"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold bg-[#78131e] text-white px-2.5 py-0.5 rounded uppercase">
                ఆధ్యాత్మిక వార్త • E-Paper Edition
              </span>
              <span className="text-xs font-mono text-stone-500">
                {new Date(selectedStoryModal.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-950 leading-tight">
                {selectedStoryModal.titleTelugu || selectedStoryModal.title}
              </h2>
              {selectedStoryModal.titleTelugu && selectedStoryModal.title && (
                <p className="text-sm font-serif text-stone-600 italic mt-1">
                  {selectedStoryModal.title}
                </p>
              )}
            </div>

            {selectedStoryModal.featuredImage && (
              <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-inner max-h-72">
                <img
                  src={selectedStoryModal.featuredImage}
                  alt={selectedStoryModal.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="border-t border-b border-stone-200 py-3 flex flex-wrap items-center justify-between text-xs text-stone-600 font-serif">
              <span>నివేదిక: <strong className="text-stone-900">{selectedStoryModal.authorName || 'శ్రీ అష్టాదశ పీఠం ఎడిటోరియల్'}</strong></span>
              {selectedStoryModal.deity && <span>దైవ రూపం: <strong className="text-amber-800">{selectedStoryModal.deity}</strong></span>}
            </div>

            <div className="font-serif text-stone-800 text-sm sm:text-base leading-relaxed text-justify space-y-3 whitespace-pre-line max-h-96 overflow-y-auto pr-2">
              {selectedStoryModal.content || selectedStoryModal.excerpt}
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-serif italic">
                శ్రీ అష్టాదశ పీఠం డిజిటల్ దినపత్రిక సంచిక
              </span>
              <button
                onClick={() => setSelectedStoryModal(null)}
                className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
              >
                Close Article Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
