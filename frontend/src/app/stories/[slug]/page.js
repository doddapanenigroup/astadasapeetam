'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { allStories } from '../../../data/storiesData';
import { 
  BookOpen, Sparkles, Clock, Bookmark, Share2, 
  ArrowLeft, Volume2, VolumeX, Type, Heart, Check,
  ChevronRight, Calendar, User
} from 'lucide-react';
import AdBanner from '../../../components/AdBanner';

export default function SingleStoryPage() {
  const params = useParams();
  const rawSlug = params?.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : '';
  const slug = decodeURIComponent(rawSlug).toLowerCase();

  const [dbStory, setDbStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState('base'); // 'sm', 'base', 'lg'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 1. Try finding in local mock data
  const localStory = useMemo(() => {
    if (!slug) return null;
    return allStories.find(s => {
      const sId = s.id?.toLowerCase();
      const sSlug = (s.slug || s.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
      return sId === slug || sSlug === slug || sId.replace('story-', '') === slug;
    });
  }, [slug]);

  // 2. Fallback to API if not in static list
  useEffect(() => {
    if (localStory) {
      setLoading(false);
      return;
    }

    if (slug) {
      setLoading(true);
      fetch(`http://localhost:5000/api/posts/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setDbStory(data.data);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [slug, localStory]);

  const story = localStory ? {
    title: localStory.title,
    purana: localStory.purana,
    readTime: localStory.readTime,
    moral: localStory.moral,
    image: localStory.image,
    tags: localStory.tags || [],
    summary: localStory.summary,
    fullStory: localStory.fullStory,
    category: localStory.category || 'spirituality'
  } : (dbStory ? {
    title: dbStory.title,
    purana: dbStory.deity || 'Sacred Scripture',
    readTime: '6 min read',
    moral: dbStory.devotionalVerse || dbStory.excerpt,
    image: dbStory.featuredImage || '/images/art_akshaya_real.jpg',
    tags: dbStory.tags || [],
    summary: dbStory.excerpt,
    fullStory: dbStory.content,
    category: dbStory.category || 'spirituality'
  } : null);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffdfa] flex items-center justify-center py-20 text-stone-600">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#78131e] border-t-transparent rounded-full animate-spin" />
          <p className="font-serif text-sm">Opening sacred narrative...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-[#fffdfa] flex flex-col items-center justify-center p-6 text-center">
        <BookOpen className="w-16 h-16 text-stone-300 mb-3" />
        <h2 className="text-2xl font-serif font-black text-[#78131e] mb-2">Sacred Story Not Found</h2>
        <p className="text-stone-600 text-sm max-w-md mb-6">
          The requested devotional article or puranic narrative could not be located.
        </p>
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 bg-[#78131e] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md hover:bg-[#600e17] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Puranic Stories</span>
        </Link>
      </div>
    );
  }

  // Related stories from mock list
  const relatedStories = allStories
    .filter(s => s.title !== story.title)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-900 pb-20">
      
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-[#5a0c14] text-amber-100 text-xs py-3 px-4 sm:px-8 border-b border-[#73131e]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-[11px] text-amber-200/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/stories" className="hover:text-white transition-colors">Puranic Stories</Link>
            <span>/</span>
            <span className="text-amber-300 font-bold truncate max-w-xs sm:max-w-md">{story.title}</span>
          </div>

          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white font-bold bg-[#78131e] px-3 py-1 rounded-lg border border-amber-500/30 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Stories</span>
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Story Article Card */}
        <article className="bg-white rounded-3xl border border-[#ebdcc7] shadow-sm overflow-hidden">
          
          {/* Header Metadata */}
          <div className="p-6 sm:p-8 pb-4 border-b border-stone-100 bg-gradient-to-b from-[#fbf8f2] to-white">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-[#78131e] text-amber-100 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {story.purana}
                </span>
                <span className="text-stone-500 text-xs font-serif flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {story.readTime}
                </span>
              </div>

              {/* Reader Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFontSize(f => f === 'sm' ? 'base' : f === 'base' ? 'lg' : 'sm')}
                  className="p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-amber-50 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                  title="Toggle Text Size"
                >
                  <Type className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-mono">{fontSize}</span>
                </button>

                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`p-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                    isPlayingAudio ? 'bg-amber-500 text-white border-amber-500 shadow-xs' : 'border-stone-200 text-stone-700 hover:bg-amber-50'
                  }`}
                  title="Listen to Narration"
                >
                  {isPlayingAudio ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
                  <span className="hidden sm:inline text-[11px]">Audio</span>
                </button>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isBookmarked ? 'bg-amber-100 text-amber-800 border-amber-300' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-700' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-amber-50 cursor-pointer transition-colors"
                  title="Share Article"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[#6b111b] tracking-tight leading-tight mb-3">
              {story.title}
            </h1>

            {story.summary && (
              <p className="text-sm sm:text-base text-stone-600 font-serif leading-relaxed italic">
                {story.summary}
              </p>
            )}
          </div>

          {/* Audio Recitation Banner (Active) */}
          {isPlayingAudio && (
            <div className="bg-amber-100 px-6 py-2.5 border-b border-amber-200 text-xs text-amber-950 flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping" />
                <span className="font-serif font-bold">Now playing: Sacred Katha Narration & Ambient Flute</span>
              </div>
              <span className="text-[11px] font-mono text-amber-800">02:15 / 06:20</span>
            </div>
          )}

          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 w-full bg-stone-900 overflow-hidden">
            <img 
              src={story.image} 
              alt={story.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Moral Callout Card */}
            {story.moral && (
              <div className="bg-amber-50/90 border-l-4 border-[#78131e] p-5 rounded-r-2xl shadow-xs">
                <span className="text-xs font-black text-[#78131e] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  The Divine Moral & Spiritual Lesson (ఆధ్యాత్మిక సందేశం):
                </span>
                <p className="text-sm sm:text-base font-serif italic text-amber-950 leading-relaxed">
                  "{story.moral}"
                </p>
              </div>
            )}

            {/* Narrative Content */}
            <div 
              className={`font-serif text-stone-800 leading-relaxed space-y-5 transition-all ${
                fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
              }`}
            >
              {story.fullStory.split('\n\n').map((para, idx) => (
                <p key={idx} className="first-letter:text-4xl first-letter:font-black first-letter:text-[#78131e] first-letter:mr-1 first-letter:float-left">
                  {para}
                </p>
              ))}
            </div>

            {/* Tags and Metadata Footer */}
            <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-stone-500 font-bold">Devotional Tags:</span>
                {story.tags.map((t, idx) => (
                  <span key={idx} className="bg-amber-100/70 text-amber-900 text-xs px-2.5 py-1 rounded-full font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#78131e] hover:underline cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share This Story'}</span>
                </button>
              </div>
            </div>

          </div>
        </article>

        {/* In-Feed Devotional Ad Slot */}
        <div className="my-8">
          <AdBanner slotId="slot-infeed-story" type="in-feed-1" label="DEVOTIONAL SPONSOR" />
        </div>

        {/* Related Puranic Stories Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg sm:text-xl font-serif font-black text-[#6b111b] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>More Sacred Stories from Puranas</span>
            </h3>
            <Link
              href="/stories"
              className="text-xs font-bold text-[#78131e] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedStories.map((relStory) => (
              <Link
                key={relStory.id}
                href={`/stories/${relStory.id}`}
                className="bg-white rounded-2xl border border-[#ebdcc7] overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 w-full overflow-hidden bg-stone-100">
                    <img
                      src={relStory.image}
                      alt={relStory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                      {relStory.purana}
                    </span>
                    <h4 className="font-serif font-black text-sm text-stone-900 group-hover:text-[#78131e] transition-colors line-clamp-2 leading-snug">
                      {relStory.title}
                    </h4>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-[11px] text-stone-500 font-serif">
                  <span>{relStory.readTime}</span>
                  <span className="text-[#78131e] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Read Story &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
}
