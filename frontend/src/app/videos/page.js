'use client';

import React, { useState, useMemo } from 'react';
import AdBanner from '../../components/AdBanner';
import { videoCategories, allVideos } from '../../data/videosData';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, Share2, 
  Search, Eye, Clock, Radio, Sparkles, X, ChevronRight,
  Tv, Heart, Check, Bookmark
} from 'lucide-react';

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likedVideos, setLikedVideos] = useState({});

  const filteredVideos = useMemo(() => {
    return allVideos.filter(video => {
      const matchesCat = activeCategory === 'all' || video.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        video.title.toLowerCase().includes(q) ||
        video.temple.toLowerCase().includes(q) ||
        video.speakerOrArtist.toLowerCase().includes(q) ||
        video.tags.some(t => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const liveVideos = useMemo(() => {
    return allVideos.filter(v => v.isLive);
  }, []);

  const handleShare = (video) => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleLike = (id) => {
    setLikedVideos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-900">
      
      {/* Top Banner */}
      <div 
        style={{ 
          backgroundColor: '#6b111b', 
          backgroundImage: 'linear-gradient(135deg, #480a11 0%, #78131e 50%, #991b1b 100%)',
          color: '#ffffff'
        }}
        className="py-10 px-4 sm:px-6 border-b border-amber-600/40 relative overflow-hidden shadow-inner"
      >
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="w-[98.5%] max-w-[1920px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div 
              style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)', borderColor: 'rgba(251, 191, 36, 0.4)' }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-amber-200 text-xs font-serif font-black uppercase tracking-widest shadow-xs"
            >
              <Tv className="w-3.5 h-3.5 text-amber-300" />
              <span style={{ color: '#fef08a' }}>Sanatana Darshan • Live Streams & Discourses</span>
            </div>
            <h1 
              style={{ color: '#ffffff' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight drop-shadow-md"
            >
              Devotional Videos & Live Darshan
            </h1>
            <p 
              style={{ color: 'rgba(254, 243, 199, 0.95)' }}
              className="text-sm sm:text-base font-serif max-w-2xl leading-relaxed"
            >
              Watch 24x7 live temple broadcasts from Tirumala, Kashi, and Somnath, 
              profound Pravachanams by renowned scholars, and sublime Bhajans.
            </p>
          </div>

          {/* Live Indicator Pill */}
          <div 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', borderColor: 'rgba(239, 68, 68, 0.4)' }}
            className="backdrop-blur-md rounded-2xl p-4 border text-stone-200 text-xs font-serif space-y-2 shadow-xl shrink-0 text-center sm:text-left"
          >
            <div className="flex items-center gap-2 font-bold text-sm text-red-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
              <span>4 Sacred Kshetras Streaming Live</span>
            </div>
            <p className="text-[11px] text-stone-300">
              Tirumala Suprabhatam • Kashi Mangala Aarti • Somnath Abhishekam
            </p>
            <button
              suppressHydrationWarning
              onClick={() => {
                setActiveCategory('live-darshan');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="w-full py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] transition-colors cursor-pointer"
            >
              Watch Temple Live Streams ➔
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-[98.5%] max-w-[1920px] mx-auto py-8 px-2 sm:px-4 space-y-8">
        
        {/* Search & Category Filter Bar - No Scrolling Needed */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ebdcc7] pb-4">
          {/* Category Tabs (Fully Wrapped, No Horizontal Scroll) */}
          <div className="flex flex-wrap items-center gap-2">
            {videoCategories.map((cat) => (
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
              placeholder="Search temple, chant, guru, stotram..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-[#e2d4be] rounded-full text-xs text-stone-800 outline-none focus:border-[#78131e] shadow-2xs"
            />
          </div>
        </div>

        {/* Featured Live Streams Carousel / Banner (If on All or Live Darshan) */}
        {(activeCategory === 'all' || activeCategory === 'live-darshan') && !searchQuery && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#78131e] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                <span>24x7 Live Sanctum Darshans</span>
              </h2>
              <span className="text-xs text-red-700 font-bold bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                Broadcast direct from Temples
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {liveVideos.map((video) => (
                <div 
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="bg-white rounded-2xl overflow-hidden border-2 border-red-200/80 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden bg-stone-900">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Live Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600 text-white font-black text-[10px] uppercase tracking-wider shadow-md">
                      <Radio className="w-3 h-3 animate-pulse" />
                      <span>LIVE</span>
                    </div>

                    {/* View Count */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium flex items-center gap-1">
                      <Eye className="w-3 h-3 text-red-400" />
                      <span>{video.views}</span>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-1.5">
                    <h3 className="font-serif font-black text-xs sm:text-sm text-stone-900 line-clamp-2 group-hover:text-[#78131e] transition-colors leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-serif line-clamp-1">
                      📍 {video.temple}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Grid (All / Filtered) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-serif font-black text-[#78131e]">
              {activeCategory === 'all' ? 'Devotional Video Vault' : videoCategories.find(c => c.id === activeCategory)?.name}
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              Showing {filteredVideos.length} sacred videos
            </span>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="py-16 text-center text-stone-500 space-y-2 bg-amber-50/50 rounded-2xl border border-dashed border-amber-300">
              <Tv className="w-8 h-8 text-amber-700/50 mx-auto" />
              <p className="font-serif text-sm">No devotional videos matched your search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredVideos.map((video) => {
                const isLiked = likedVideos[video.id];
                return (
                  <div 
                    key={video.id}
                    className="bg-white rounded-2xl overflow-hidden border border-amber-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Video Thumbnail */}
                      <div 
                        onClick={() => setSelectedVideo(video)}
                        className="relative aspect-video overflow-hidden bg-stone-900 cursor-pointer"
                      >
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Duration or Live badge */}
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                          {video.duration}
                        </div>

                        {video.isLive && (
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span>LIVE</span>
                          </div>
                        )}

                        {/* Center Hover Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-[#78131e]/90 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <h3 
                          onClick={() => setSelectedVideo(video)}
                          className="font-serif font-black text-sm text-stone-900 group-hover:text-[#78131e] transition-colors line-clamp-2 cursor-pointer leading-snug"
                        >
                          {video.title}
                        </h3>

                        <p className="text-xs text-stone-600 font-serif line-clamp-2 leading-relaxed">
                          {video.description}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                          <span>{video.speakerOrArtist}</span>
                          <span>{video.views}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-3 border-t border-stone-100 bg-stone-50/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {video.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          suppressHydrationWarning
                          onClick={() => toggleLike(video.id)}
                          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                            isLiked ? 'text-red-600 bg-red-50' : 'text-stone-400 hover:text-red-500 hover:bg-stone-100'
                          }`}
                          aria-label="Like Video"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-600' : ''}`} />
                        </button>

                        <button
                          suppressHydrationWarning
                          onClick={() => setSelectedVideo(video)}
                          className="px-2.5 py-1 rounded-md bg-[#78131e] text-white font-bold text-[10px] hover:bg-[#600e17] cursor-pointer"
                        >
                          Watch
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

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="bg-stone-950 text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-800 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              suppressHydrationWarning
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-amber-400 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Simulated High-Res Video Screen */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={selectedVideo.thumbnail} 
                alt={selectedVideo.title}
                className="w-full h-full object-cover opacity-60 filter blur-xs scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

              {/* Center Divine Video Card Graphic */}
              <div className="relative z-10 text-center space-y-3 px-4 max-w-lg">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono tracking-widest text-amber-300 uppercase font-black">
                    {selectedVideo.isLive ? '🔴 DIRECT SANCTUM BROADCAST (1080p HD)' : 'DIVINE SOUND ARCHIVE'}
                  </span>
                  <h3 className="font-serif font-black text-lg sm:text-xl text-white">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-serif">
                    {selectedVideo.temple}
                  </p>
                </div>
              </div>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-4 flex items-center justify-between text-xs text-stone-300">
                <div className="flex items-center gap-3">
                  <button 
                    suppressHydrationWarning
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-amber-400 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button 
                    suppressHydrationWarning
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-amber-400 cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-[11px] font-mono text-stone-400">
                    {selectedVideo.duration === 'LIVE' ? '00:00:00 / LIVE' : '12:45 / ' + selectedVideo.duration}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    suppressHydrationWarning
                    onClick={() => handleShare(selectedVideo)}
                    className="hover:text-amber-400 cursor-pointer flex items-center gap-1 text-[11px]"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Video Details Section */}
            <div className="p-6 bg-stone-900 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                <div>
                  <h2 className="text-lg font-serif font-black text-amber-200">
                    {selectedVideo.title}
                  </h2>
                  <p className="text-xs text-stone-400 font-serif mt-0.5">
                    Artist / Archaka: <strong className="text-stone-200">{selectedVideo.speakerOrArtist}</strong> • Language: {selectedVideo.language}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    suppressHydrationWarning
                    onClick={() => toggleLike(selectedVideo.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      likedVideos[selectedVideo.id]
                        ? 'bg-red-600/30 border-red-500 text-red-300'
                        : 'border-stone-700 hover:border-stone-500 text-stone-300'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${likedVideos[selectedVideo.id] ? 'fill-red-400 text-red-400' : ''}`} />
                    <span>{likedVideos[selectedVideo.id] ? 'Blessed' : 'Bhakti Anjali'}</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-stone-300 font-serif leading-relaxed">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Devotional Footer Banner */}
      <div className="mt-12 bg-amber-50/70 border-t border-[#ebdcc7] py-6 text-center text-xs text-stone-600 font-serif">
        <p className="max-w-2xl mx-auto px-4">
          All temple live broadcasts are relayed with due reverence to the respective Devasthanams. 
          Darshan through sincere Bhava brings the same spiritual fruits as physical presence.
        </p>
      </div>

    </div>
  );
}
