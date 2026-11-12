'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { latestArticles as defaultArticles, latestVideos as defaultVideos } from '../data/mockData';
import { ChevronRight, Play, BookOpen, Video, X, Sparkles, Clock, Calendar } from 'lucide-react';

export default function ArticlesAndVideos() {
  const [articles, setArticles] = useState(defaultArticles);
  const [videos, setVideos] = useState(defaultVideos);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // 1. Fetch Dynamic Articles from Backend
  useEffect(() => {
    fetch('http://localhost:5000/api/posts?status=published&limit=3')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((item, idx) => ({
            id: item._id || item.id || `art-${idx}`,
            slug: item.slug || `article-${idx}`,
            title: item.title,
            titleTelugu: item.titleTelugu,
            category: item.category || 'temples',
            excerpt: item.excerpt || (item.content ? item.content.slice(0, 85) + '...' : ''),
            image: item.featuredImage || defaultArticles[idx % defaultArticles.length]?.image || '/images/temple_kashi.jpg',
            date: item.createdAt 
              ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
              : 'Recent'
          }));
          setArticles(mapped.slice(0, 3));
        }
      })
      .catch(() => {});
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
                href="/articles" 
                className="text-[10px] font-bold text-stone-500 hover:text-[#78131e] flex items-center transition-colors"
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
      {/* Video Playback Modal                                      */}
      {/* ========================================================= */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-stone-950 rounded-3xl border border-amber-500/40 shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
            <div className="p-4 bg-gradient-to-r from-[#180A24] via-[#2A113E] to-[#140620] flex items-center justify-between border-b border-purple-500/30">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <h3 className="font-serif font-black text-sm text-white truncate max-w-md">
                  {activeVideoModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {activeVideoModal.embedUrl ? (
                <iframe
                  src={activeVideoModal.embedUrl.includes('?') ? `${activeVideoModal.embedUrl}&autoplay=1` : `${activeVideoModal.embedUrl}?autoplay=1`}
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
            </div>

            <div className="p-4 bg-stone-900/90 flex items-center justify-between text-xs text-stone-400 border-t border-stone-800">
              <span>{activeVideoModal.sub}</span>
              <Link
                href="/videos"
                onClick={() => setActiveVideoModal(null)}
                className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1"
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
