'use client';

import React, { useState, useMemo } from 'react';
import AdBanner from '../../components/AdBanner';
import { storyCategories, allStories } from '../../data/storiesData';
import { 
  BookOpen, Sparkles, Clock, Bookmark, Share2, 
  Search, X, ChevronRight, Heart, Volume2, VolumeX,
  Type, Award, Feather, ArrowLeft
} from 'lucide-react';

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);
  const [bookmarkedStories, setBookmarkedStories] = useState({});
  const [fontSize, setFontSize] = useState('base'); // 'sm', 'base', 'lg'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredStories = useMemo(() => {
    return allStories.filter(story => {
      const matchesCat = activeCategory === 'all' || story.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        story.title.toLowerCase().includes(q) ||
        story.purana.toLowerCase().includes(q) ||
        story.moral.toLowerCase().includes(q) ||
        story.tags.some(t => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleBookmark = (id) => {
    setBookmarkedStories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-900">
      
      {/* Top Banner */}
      <div 
        style={{ 
          backgroundColor: '#6b111b', 
          backgroundImage: 'linear-gradient(135deg, #480a11 0%, #78131e 50%, #8d1d2b 100%)',
          color: '#ffffff'
        }}
        className="py-10 px-4 sm:px-6 border-b border-amber-600/40 relative overflow-hidden shadow-inner"
      >
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none" />

        <div className="w-[98.5%] max-w-[1920px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div 
              style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)', borderColor: 'rgba(251, 191, 36, 0.4)' }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-amber-200 text-xs font-serif font-black uppercase tracking-widest shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span style={{ color: '#fef08a' }}>Puranic Wisdom • Kathamrita & Dharma</span>
            </div>
            <h1 
              style={{ color: '#ffffff' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight drop-shadow-md"
            >
              Sacred Puranic Stories & Dharma Kathas
            </h1>
            <p 
              style={{ color: 'rgba(254, 243, 199, 0.95)' }}
              className="text-sm sm:text-base font-serif max-w-2xl leading-relaxed"
            >
              Timeless moral narratives from the 18 Mahapuranas, Ramayana, and Mahabharata. 
              Inspiring virtues of surrender, courage, righteous duty, and divine love.
            </p>
          </div>

          {/* Quick Reader Stat */}
          <div 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', borderColor: 'rgba(251, 191, 36, 0.3)' }}
            className="backdrop-blur-md rounded-2xl p-4 border text-amber-200 text-xs font-serif space-y-1.5 shadow-xl shrink-0 text-center sm:text-left"
          >
            <div className="flex items-center gap-2 font-bold text-sm text-amber-300 border-b border-amber-400/20 pb-1">
              <Feather className="w-4 h-4 text-amber-400" />
              <span style={{ color: '#fde047' }}>Ancient Vedic Scriptures</span>
            </div>
            <p style={{ color: '#e5e7eb' }} className="text-[11px]">
              Shiva Purana • Bhagavata Purana • Devi Mahatmyam • Bala Dharma
            </p>
            <span style={{ color: '#fde047' }} className="text-[10px] font-bold block pt-1">
              ✓ Verified by Sanskrit Scholars
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-[98.5%] max-w-[1920px] mx-auto py-8 px-2 sm:px-4 space-y-8">
        
        {/* Category & Search Navigation Bar - No Scrolling Needed */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ebdcc7] pb-4">
          {/* Category Tabs (Fully Wrapped, No Horizontal Scroll) */}
          <div className="flex flex-wrap items-center gap-2">
            {storyCategories.map((cat) => (
              <button
                key={cat.id}
                suppressHydrationWarning
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#78131e] text-white shadow-xs ring-1 ring-amber-400'
                    : 'bg-amber-50/80 text-stone-700 hover:bg-amber-100 hover:text-[#78131e] border border-amber-200/80'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 lg:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input 
              suppressHydrationWarning
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories, puranas, rishis..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-[#e2d4be] rounded-full text-xs text-stone-800 outline-none focus:border-[#78131e] shadow-2xs"
            />
          </div>
        </div>

        {/* Stories Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-serif font-black text-[#78131e]">
              {activeCategory === 'all' ? 'All Sacred Stories' : storyCategories.find(c => c.id === activeCategory)?.name}
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              Showing {filteredStories.length} sacred tales
            </span>
          </div>

          {filteredStories.length === 0 ? (
            <div className="py-16 text-center text-stone-500 space-y-2 bg-amber-50/50 rounded-2xl border border-dashed border-amber-300">
              <BookOpen className="w-8 h-8 text-amber-700/50 mx-auto" />
              <p className="font-serif text-sm">No stories found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => {
                const isBookmarked = bookmarkedStories[story.id];
                return (
                  <div 
                    key={story.id}
                    className="bg-white rounded-2xl overflow-hidden border border-amber-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Story Card Image Header - Fixed Uniform Height */}
                      <div 
                        onClick={() => setSelectedStory(story)}
                        className="relative h-48 w-full overflow-hidden bg-stone-900 cursor-pointer"
                      >
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Reading Time Badge */}
                        <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-amber-200 text-[10px] font-bold flex items-center gap-1 border border-amber-400/30">
                          <Clock className="w-3 h-3 text-amber-300" />
                          <span>{story.readTime}</span>
                        </div>

                        {/* Purana Source */}
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-[#78131e]/90 text-amber-100 text-[10px] font-serif font-black uppercase tracking-wider">
                          {story.purana.split('(')[0]}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <h3 
                          onClick={() => setSelectedStory(story)}
                          className="font-serif font-black text-base text-stone-900 group-hover:text-[#78131e] transition-colors line-clamp-2 cursor-pointer leading-snug"
                        >
                          {story.title}
                        </h3>

                        <p className="text-xs text-stone-600 font-serif line-clamp-3 leading-relaxed">
                          {story.summary}
                        </p>

                        {/* Moral Callout Box */}
                        <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/70 text-xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-0.5">
                            🌟 Spiritual Moral:
                          </span>
                          <p className="text-[11px] font-serif italic text-amber-950 leading-relaxed">
                            "{story.moral}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-4 border-t border-stone-100 bg-stone-50/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {story.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          suppressHydrationWarning
                          onClick={() => toggleBookmark(story.id)}
                          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                            isBookmarked ? 'text-amber-600 bg-amber-50' : 'text-stone-400 hover:text-amber-500 hover:bg-stone-100'
                          }`}
                          aria-label="Bookmark Story"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-600' : ''}`} />
                        </button>

                        <button
                          suppressHydrationWarning
                          onClick={() => setSelectedStory(story)}
                          className="px-3 py-1.5 rounded-lg bg-[#78131e] text-white font-bold text-xs hover:bg-[#600e17] transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>Read</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>

      {/* Full Story Reader Modal Dialog */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#fffdfa] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-amber-300 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header Sticky Bar */}
            <div className="sticky top-0 z-30 bg-[#fffdfa]/95 backdrop-blur-md px-6 py-4 border-b border-[#ebdcc7] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                  {selectedStory.purana}
                </span>
                <span className="text-xs text-stone-500 font-serif">
                  {selectedStory.readTime}
                </span>
              </div>

              {/* Reader Options: Font Size, Audio, Share, Close */}
              <div className="flex items-center gap-2">
                {/* Font Size Toggle */}
                <button
                  suppressHydrationWarning
                  onClick={() => setFontSize(fontSize === 'base' ? 'lg' : fontSize === 'lg' ? 'sm' : 'base')}
                  className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-amber-50 text-xs font-bold cursor-pointer"
                  title="Toggle Font Size"
                >
                  <Type className="w-3.5 h-3.5" />
                </button>

                {/* Audio Listen Simulation */}
                <button
                  suppressHydrationWarning
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`p-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                    isPlayingAudio ? 'bg-amber-500 text-white border-amber-500' : 'border-stone-200 text-stone-600 hover:bg-amber-50'
                  }`}
                  title="Audio Recitation"
                >
                  {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                <button
                  suppressHydrationWarning
                  onClick={handleShare}
                  className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-amber-50 cursor-pointer"
                  title="Share Story"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

                <button
                  suppressHydrationWarning
                  onClick={() => {
                    setSelectedStory(null);
                    setIsPlayingAudio(false);
                  }}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Audio Simulation Banner */}
            {isPlayingAudio && (
              <div className="bg-amber-100/80 px-6 py-2 border-b border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                  <span className="font-serif">Now playing: Sanskrit Katha Narration & Ambient Flute...</span>
                </div>
                <span className="text-[10px] font-mono">01:45 / 06:20</span>
              </div>
            )}

            {/* Story Banner Image */}
            <div className="relative h-60 sm:h-72 w-full bg-stone-900 overflow-hidden">
              <img 
                src={selectedStory.image} 
                alt={selectedStory.title} 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fffdfa] via-transparent to-black/30" />
            </div>

            {/* Story Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#78131e] leading-snug">
                  {selectedStory.title}
                </h1>
                <p className="text-xs text-stone-500 font-serif">
                  Scriptural Source: <strong>{selectedStory.purana}</strong>
                </p>
              </div>

              {/* Moral Callout */}
              <div className="bg-amber-50 border-l-4 border-[#78131e] p-4 rounded-r-xl">
                <span className="text-xs font-bold text-[#78131e] uppercase tracking-wider block mb-0.5">
                  🌟 The Divine Moral & Spiritual Lesson:
                </span>
                <p className="text-xs sm:text-sm font-serif italic text-amber-950 leading-relaxed">
                  "{selectedStory.moral}"
                </p>
              </div>

              {/* Full Text Narrative */}
              <div className={`font-serif text-stone-800 leading-relaxed space-y-4 ${
                fontSize === 'sm' ? 'text-xs' : fontSize === 'lg' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
              }`}>
                {selectedStory.fullStory.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="first-letter:text-3xl first-letter:font-black first-letter:text-[#78131e] first-letter:mr-1 first-letter:float-left">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Reader Footer with Share and Close */}
              <div className="pt-6 border-t border-[#ebdcc7] flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedStory.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  suppressHydrationWarning
                  onClick={() => setSelectedStory(null)}
                  className="px-5 py-2 rounded-xl bg-[#78131e] text-white text-xs font-bold hover:bg-[#600e17] transition-colors cursor-pointer"
                >
                  Done Reading
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Devotional Footer Banner */}
      <div className="mt-12 bg-amber-50/70 border-t border-[#ebdcc7] py-6 text-center text-xs text-stone-600 font-serif">
        <p className="max-w-2xl mx-auto px-4">
          All Puranic kathas are presented to inspire Dharma, Bhakti, and inner peace. 
          Sharing these sacred stories with children preserves our eternal heritage.
        </p>
      </div>

    </div>
  );
}
