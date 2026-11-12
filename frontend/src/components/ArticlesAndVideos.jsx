'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { latestArticles as defaultArticles, latestVideos as defaultVideos } from '../data/mockData';
import { ChevronRight, Play, Pause, BookOpen, Video, X, Sparkles, Clock, Calendar, RotateCcw, RotateCw, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

export default function ArticlesAndVideos() {
  const [articles, setArticles] = useState(defaultArticles);
  const [videos, setVideos] = useState(defaultVideos);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [seekFeedback, setSeekFeedback] = useState(null);

  const iframeRef = useRef(null);
  const currentTimeRef = useRef(0);
  const feedbackTimerRef = useRef(null);

  // Send control commands to YouTube embed via postMessage API
  const sendYouTubeCommand = (func, args = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: func,
            args: args
          }),
          '*'
        );
      } catch (err) {}
    }
  };

  const formatSeconds = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Skip relative seconds (e.g. +10s forward, -10s backward)
  const handleSeekRelative = (seconds) => {
    const current = currentTimeRef.current || 0;
    const target = Math.max(0, current + seconds);
    currentTimeRef.current = target;
    sendYouTubeCommand('seekTo', [target, true]);

    setSeekFeedback({
      type: seconds > 0 ? 'forward' : 'backward',
      text: seconds > 0 ? `+${seconds}s` : `${seconds}s`,
      time: formatSeconds(target)
    });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setSeekFeedback(null), 1000);
  };

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      sendYouTubeCommand('pauseVideo');
      setIsPlaying(false);
      setSeekFeedback({ type: 'pause', text: 'Paused' });
    } else {
      sendYouTubeCommand('playVideo');
      setIsPlaying(true);
      setSeekFeedback({ type: 'play', text: 'Playing' });
    }
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setSeekFeedback(null), 900);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      sendYouTubeCommand('unMute');
      setIsMuted(false);
      setSeekFeedback({ type: 'unmute', text: 'Sound On' });
    } else {
      sendYouTubeCommand('mute');
      setIsMuted(true);
      setSeekFeedback({ type: 'mute', text: 'Muted' });
    }
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setSeekFeedback(null), 900);
  };

  const currentIndex = videos.findIndex(v => v.id === activeVideoModal?.id);

  const handlePrevVideo = () => {
    if (videos.length === 0) return;
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    currentTimeRef.current = 0;
    setIsPlaying(true);
    setActiveVideoModal(videos[prevIdx]);
    setSeekFeedback({ type: 'prev', text: '⏮ Previous Video' });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setSeekFeedback(null), 1000);
  };

  const handleNextVideo = () => {
    if (videos.length === 0) return;
    const nextIdx = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    currentTimeRef.current = 0;
    setIsPlaying(true);
    setActiveVideoModal(videos[nextIdx]);
    setSeekFeedback({ type: 'next', text: 'Next Video ⏭' });
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = setTimeout(() => setSeekFeedback(null), 1000);
  };

  // Listen to postMessage from YouTube player to synchronize current playback time
  useEffect(() => {
    const handleMessage = (e) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data && data.event === 'infoDelivery' && data.info) {
          if (typeof data.info.currentTime === 'number') {
            currentTimeRef.current = data.info.currentTime;
          }
          if (typeof data.info.playerState === 'number') {
            setIsPlaying(data.info.playerState === 1);
          }
        }
      } catch (err) {}
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Listen to Keyboard keys: ArrowLeft/Right for -10s/+10s, Space/K for Play/Pause, Shift+Arrows for Next/Prev
  useEffect(() => {
    if (!activeVideoModal) return;

    currentTimeRef.current = 0;
    setIsPlaying(true);

    const handleKeyDown = (e) => {
      // Do not capture if user is in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      // Close modal on Escape
      if (e.key === 'Escape') {
        setActiveVideoModal(null);
        return;
      }

      // Next Video: Shift + Right Arrow, ']', 'n', 'N'
      if ((e.shiftKey && e.key === 'ArrowRight') || e.key === ']' || e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        handleNextVideo();
        return;
      }

      // Previous Video: Shift + Left Arrow, '[', 'p', 'P'
      if ((e.shiftKey && e.key === 'ArrowLeft') || e.key === '[' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        handlePrevVideo();
        return;
      }

      // Forward (+10 seconds): Right Arrow (→), 'l', 'L'
      if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        handleSeekRelative(10);
        return;
      }

      // Backward (-10 seconds): Left Arrow (←), 'j', 'J'
      if (e.key === 'ArrowLeft' || e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        handleSeekRelative(-10);
        return;
      }

      // Play / Pause: Space, 'k', 'K'
      if (e.code === 'Space' || e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        handleTogglePlayPause();
        return;
      }

      // Mute / Unmute: 'm', 'M'
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleMute();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoModal, videos, currentIndex, isPlaying, isMuted]);

  // Build YouTube embed url with enablejsapi=1 so it accepts keyboard controls & commands
  const getControlledEmbedUrl = (url) => {
    if (!url) return '';
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}enablejsapi=1&autoplay=1`;
  };

  // 1. Fetch Dynamic Exclusive News Articles for Homepage Latest Articles Row
  useEffect(() => {
    const loadNewsArticles = () => {
      fetch('http://localhost:5000/api/posts?category=news&status=published&limit=3')
        .then(res => res.json())
        .then(data => {
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            const mapped = data.data.map((item, idx) => ({
              id: item._id || item.id || `news-${idx}`,
              slug: item.slug || `news-${idx}`,
              title: item.title,
              titleTelugu: item.titleTelugu,
              category: 'news',
              excerpt: item.excerpt || (item.content ? item.content.slice(0, 85) + '...' : ''),
              image: item.featuredImage || '/images/temple_kashi.jpg',
              date: item.createdAt 
                ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                : 'Recent News'
            }));
            setArticles(mapped.slice(0, 3));
          }
        })
        .catch(() => {});
    };

    loadNewsArticles();
    if (typeof window !== 'undefined') {
      window.addEventListener('astada_posts_updated', loadNewsArticles);
      return () => window.removeEventListener('astada_posts_updated', loadNewsArticles);
    }
  }, []);

  // 2. Fetch Dynamic Videos from Backend & Local Cache
  useEffect(() => {
    const loadVideos = () => {
      fetch('http://localhost:5000/api/videos?isLatest=true&limit=6')
        .then(res => res.json())
        .then(data => {
          let list = [];
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            list = data.data;
          }

          // Merge with custom videos from localStorage if available
          if (typeof window !== 'undefined') {
            try {
              const stored = localStorage.getItem('astada_custom_videos');
              if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                  const customLatest = parsed.filter(v => v.isLatestVideo);
                  // Deduplicate by title or id
                  const seen = new Set(list.map(v => v.title));
                  customLatest.forEach(v => {
                    if (!seen.has(v.title)) {
                      list.unshift(v);
                      seen.add(v.title);
                    }
                  });
                }
              }
            } catch (e) {}
          }

          if (list.length > 0) {
            const mapped = list.slice(0, 3).map((v, idx) => ({
              id: v._id || v.id || `vid-${idx}`,
              title: v.title,
              sub: v.subtitle || v.speakerOrArtist || 'Devotional Video',
              image: v.thumbnail || defaultVideos[idx % defaultVideos.length]?.image || '/images/temple_tirupati.jpg',
              embedUrl: v.embedUrl || v.videoUrl,
              videoUrl: v.videoUrl
            }));
            setVideos(mapped);
          }
        })
        .catch(() => {});
    };

    loadVideos();

    if (typeof window !== 'undefined') {
      window.addEventListener('astada_videos_updated', loadVideos);
      return () => window.removeEventListener('astada_videos_updated', loadVideos);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* ========================================================= */}
        {/* Left: Latest Articles (Col 7)                             */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-2xs flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b-2 border-[#78131e]">
              <h3 className="text-xs sm:text-sm font-bold text-[#78131e] uppercase tracking-wide font-serif flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                Latest Articles
              </h3>
              <Link 
                href="/epaper" 
                className="text-[10px] font-bold text-stone-500 hover:text-[#78131e] flex items-center transition-colors"
                title="View All Devotional News in Digital E-Paper"
              >
                <span>View All</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {articles.map((article) => {
                const articleUrl = `/${article.category || 'temples'}/${article.slug || article.id}`;
                return (
                  <Link
                    key={article.id || article.slug}
                    href={articleUrl}
                    className="bg-white rounded-xl border border-[#ebdcc7] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col justify-between h-full cursor-pointer"
                  >
                    <div className="relative h-28 w-full overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/images/temple_kashi.jpg';
                        }}
                      />
                      <span className="absolute top-1.5 left-1.5 bg-[#78131e] text-white text-[8px] font-bold uppercase px-1.5 py-0.5 rounded shadow-2xs">
                        {article.category}
                      </span>
                      <span className="absolute bottom-1 right-1.5 text-[8px] text-white/90 bg-black/60 px-1.5 py-0.5 rounded">
                        {article.date}
                      </span>
                    </div>

                    <div className="p-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-[11px] text-stone-900 group-hover:text-[#78131e] line-clamp-2 leading-snug">
                          {article.title}
                        </h4>
                        <p className="text-[9.5px] text-stone-600 line-clamp-2 mt-1 leading-normal">
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="mt-2 pt-1 border-t border-stone-50 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#78131e] group-hover:underline inline-flex items-center">
                          Read Article &rsaquo;
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Right: Latest Videos (Col 5) - Connected to Video System  */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] p-3.5 shadow-2xs flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-1.5 mb-2.5 border-b-2 border-amber-600">
              <h3 className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wide font-serif flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-700" />
                Latest Videos
              </h3>
              <Link 
                href="/videos" 
                className="text-[10px] font-bold text-stone-500 hover:text-amber-800 flex items-center transition-colors"
              >
                <span>View All</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideoModal(video)}
                  className="bg-white rounded-xl border border-[#ebdcc7] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col justify-between h-full cursor-pointer"
                >
                  <div className="relative h-28 w-full overflow-hidden bg-stone-900 shrink-0">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      onError={(e) => {
                        e.target.src = '/images/temple_tirupati.jpg';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-black/60 group-hover:bg-[#78131e] text-white flex items-center justify-center transition-colors shadow-xs">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-amber-300" />
                      </div>
                    </div>
                  </div>

                  <div className="p-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-[10.5px] text-stone-900 truncate leading-tight group-hover:text-[#78131e]">
                        {video.title}
                      </h4>
                      <span className="text-[9px] text-stone-500 truncate block mt-0.5">
                        {video.sub}
                      </span>
                    </div>
                    <div className="mt-2 pt-1 border-t border-stone-50">
                      <span className="text-[9.5px] font-bold text-amber-800 group-hover:underline inline-flex items-center">
                        Watch Now &rsaquo;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Video Playback Modal with Full Keyboard Controls (←/→)    */}
      {/* ========================================================= */}
      {activeVideoModal && (
        <div 
          tabIndex={0}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 outline-none select-none"
        >
          <div className="bg-stone-950 rounded-3xl border border-amber-500/40 shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white flex flex-col">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#180A24] via-[#2A113E] to-[#140620] flex items-center justify-between border-b border-purple-500/30">
              <div className="flex items-center space-x-2 truncate pr-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
                <h3 className="font-serif font-black text-xs sm:text-sm text-white truncate">
                  {activeVideoModal.title}
                </h3>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center transition cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Viewport Area with HUD Feedback */}
            <div className="relative aspect-video w-full bg-black overflow-hidden group">
              {activeVideoModal.embedUrl ? (
                <iframe
                  ref={iframeRef}
                  src={getControlledEmbedUrl(activeVideoModal.embedUrl)}
                  title={activeVideoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <Play className="w-12 h-12 text-amber-400" />
                  <p className="text-xs text-stone-300">Video source is direct link:</p>
                  <a
                    href={activeVideoModal.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold text-xs rounded-xl"
                  >
                    Open on YouTube &rarr;
                  </a>
                </div>
              )}

              {/* Animated HUD Feedback Overlay (Triggered by Keyboard Keys or On-Screen Clicks) */}
              {seekFeedback && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30 animate-in fade-in zoom-in-90 duration-150">
                  <div className="bg-black/85 backdrop-blur-md text-amber-300 border border-amber-400/50 px-5 py-3 rounded-2xl flex items-center gap-2.5 shadow-2xl">
                    {seekFeedback.type === 'forward' && <RotateCw className="w-6 h-6 animate-spin text-amber-400" />}
                    {seekFeedback.type === 'backward' && <RotateCcw className="w-6 h-6 animate-spin text-amber-400" />}
                    {seekFeedback.type === 'play' && <Play className="w-6 h-6 fill-amber-400" />}
                    {seekFeedback.type === 'pause' && <Pause className="w-6 h-6 fill-amber-400" />}
                    {seekFeedback.type === 'prev' && <SkipBack className="w-6 h-6 text-amber-400" />}
                    {seekFeedback.type === 'next' && <SkipForward className="w-6 h-6 text-amber-400" />}
                    <span className="text-base font-black font-mono tracking-wide">
                      {seekFeedback.text}
                    </span>
                    {seekFeedback.time && (
                      <span className="text-xs font-mono text-purple-200">
                        ({seekFeedback.time})
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Playback Control Bar with Keyboard Shortcuts */}
            <div className="bg-[#12061c] px-4 py-2.5 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Previous Video */}
                <button
                  type="button"
                  onClick={handlePrevVideo}
                  className="bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-white/5"
                  title="Previous Video (Shift + ←)"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Backward -10s */}
                <button
                  type="button"
                  onClick={() => handleSeekRelative(-10)}
                  className="bg-white/10 hover:bg-amber-500 hover:text-stone-950 text-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-amber-400/20"
                  title="Rewind 10 Seconds (Press Left Arrow key ← or J)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>-10s</span>
                  <kbd className="hidden sm:inline bg-black/40 text-[9px] font-mono px-1 py-0.2 rounded border border-white/10">←</kbd>
                </button>

                {/* Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={handleTogglePlayPause}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-stone-950 px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Play / Pause (Space or K)"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play</span>
                    </>
                  )}
                  <kbd className="hidden sm:inline bg-black/20 text-[9px] font-mono px-1 py-0.2 rounded">Space</kbd>
                </button>

                {/* Forward +10s */}
                <button
                  type="button"
                  onClick={() => handleSeekRelative(10)}
                  className="bg-white/10 hover:bg-amber-500 hover:text-stone-950 text-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-amber-400/20"
                  title="Forward 10 Seconds (Press Right Arrow key → or L)"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>+10s</span>
                  <kbd className="hidden sm:inline bg-black/40 text-[9px] font-mono px-1 py-0.2 rounded border border-white/10">→</kbd>
                </button>

                {/* Next Video */}
                <button
                  type="button"
                  onClick={handleNextVideo}
                  className="bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-white/5"
                  title="Next Video (Shift + →)"
                >
                  <span className="hidden sm:inline">Next</span>
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Keyboard keys pill */}
              <div className="text-[10px] font-mono text-purple-300/80 hidden md:flex items-center gap-1.5">
                <span>Keyboard:</span>
                <span className="bg-white/5 px-1 py-0.5 rounded border border-white/10">← / J: -10s</span>
                <span className="bg-white/5 px-1 py-0.5 rounded border border-white/10">→ / L: +10s</span>
                <span className="bg-white/5 px-1 py-0.5 rounded border border-white/10">Space: ⏯</span>
              </div>
            </div>

            {/* Footer with Video Meta & Direct Route */}
            <div className="p-3 sm:p-4 bg-stone-900/90 flex items-center justify-between text-xs text-stone-400 border-t border-stone-800">
              <span className="truncate max-w-xs">{activeVideoModal.sub}</span>
              <Link
                href="/videos"
                onClick={() => setActiveVideoModal(null)}
                className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 shrink-0"
              >
                <span>Browse All Videos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
