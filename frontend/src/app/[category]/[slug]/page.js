'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  BookOpen, Sparkles, Clock, Share2, ArrowLeft, 
  Check, Bookmark, ChevronRight, User, Eye, ShieldCheck,
  Calendar, Flame, Heart
} from 'lucide-react';
import AdBanner from '../../../components/AdBanner';
import { getAllCategories } from '../../../data/categoriesData';

export default function UniversalArticlePage() {
  const params = useParams();
  const rawCategory = params?.category ? (Array.isArray(params.category) ? params.category[0] : params.category) : '';
  const rawSlug = params?.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : '';

  const category = decodeURIComponent(rawCategory).toLowerCase();
  const slug = decodeURIComponent(rawSlug).toLowerCase();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Fetch article from backend API
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/posts/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setPost(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const allCategories = getAllCategories();
  const categoryObj = allCategories.find(c => c.id === category || c.slug === category) || {
    label: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: '📿'
  };

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
          <p className="font-serif text-sm">Opening sacred article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fffdfa] flex flex-col items-center justify-center p-6 text-center">
        <BookOpen className="w-16 h-16 text-stone-300 mb-3" />
        <h2 className="text-2xl font-serif font-black text-[#78131e] mb-2">Sacred Article Not Found</h2>
        <p className="text-stone-600 text-sm max-w-md mb-6">
          The requested devotional article under /{category}/{slug} could not be located.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#78131e] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md hover:bg-[#600e17] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-900 pb-20">
      
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-[#5a0c14] text-amber-100 text-xs py-3 px-4 sm:px-8 border-b border-[#73131e]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-[11px] text-amber-200/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${category}`} className="hover:text-white transition-colors capitalize">
              {categoryObj.icon} {categoryObj.label}
            </Link>
            <span>/</span>
            <span className="text-amber-300 font-bold truncate max-w-xs sm:max-w-md">{post.title}</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white font-bold bg-[#78131e] px-3 py-1 rounded-lg border border-amber-500/30 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sacred Hub</span>
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Article Container Card */}
        <article className="bg-white rounded-3xl border border-[#ebdcc7] shadow-sm overflow-hidden">
          
          {/* Header Metadata */}
          <div className="p-6 sm:p-8 pb-5 border-b border-stone-100 bg-gradient-to-b from-[#fbf8f2] to-white">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#78131e] text-amber-100 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span>{categoryObj.icon}</span>
                  <span>{categoryObj.label}</span>
                </span>
                {post.deity && (
                  <span className="text-amber-900 text-xs font-serif bg-amber-100/70 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                    🕉️ {post.deity}
                  </span>
                )}
                <span className="text-stone-500 text-xs font-serif flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  {(post.viewsCount || 1200).toLocaleString()} Devotee Reads
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
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

            {/* Title English */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[#6b111b] tracking-tight leading-tight mb-2">
              {post.title}
            </h1>

            {/* Title Telugu / Sanskrit */}
            {post.titleTelugu && post.titleTelugu !== post.title && (
              <h2 className="text-lg sm:text-xl font-serif font-bold text-amber-900 leading-snug mb-3">
                {post.titleTelugu}
              </h2>
            )}

            {/* Canonical Path Bar */}
            <div className="text-[11px] font-mono text-stone-500 flex items-center gap-2 pt-2">
              <span className="bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded">
                /{category}/{post.slug}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Vedic Shastra Gate
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-64 sm:h-96 w-full bg-stone-900 overflow-hidden">
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Devotional Verse Callout */}
            {post.devotionalVerse && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-6 rounded-2xl shadow-xs text-center">
                <span className="text-[10px] font-black text-[#78131e] uppercase tracking-widest block mb-2 font-serif">
                  🔱 Sacred Verse / Dhyana Sloka (ధ్యాన శ్లోకం):
                </span>
                <p className="font-serif font-bold text-base sm:text-lg text-amber-950 leading-relaxed tracking-wide">
                  {post.devotionalVerse}
                </p>
              </div>
            )}

            {/* Excerpt */}
            {post.excerpt && post.excerpt !== post.title && (
              <div className="border-l-4 border-amber-500 pl-4 py-1 italic text-stone-700 font-serif text-sm sm:text-base leading-relaxed bg-amber-50/40 rounded-r-xl">
                {post.excerpt}
              </div>
            )}

            {/* Full Content */}
            <div className="font-serif text-stone-800 text-base sm:text-lg leading-relaxed space-y-5">
              {post.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="font-serif font-black text-xl text-[#78131e] pt-4 pb-1 border-b border-amber-200/60">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={idx} className="first-letter:text-3xl first-letter:font-black first-letter:text-[#78131e] first-letter:mr-1 first-letter:float-left">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags and Metadata Footer */}
            <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-stone-500 font-bold">Devotional Tags:</span>
                {(post.tags || []).map((t, idx) => (
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
                  <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
                </button>
              </div>
            </div>

          </div>
        </article>

        {/* Sponsor Ad Banner */}
        <div className="my-8">
          <AdBanner slotId="slot-infeed-art" type="in-feed-1" label="SANCTUARY SPONSOR" />
        </div>

      </main>

    </div>
  );
}
