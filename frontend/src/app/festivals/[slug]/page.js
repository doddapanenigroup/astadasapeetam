'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { allFestivalsData } from '../../../data/festivalsData';
import { 
  Calendar, Clock, Sparkles, Flame, ArrowLeft, 
  Share2, Check, Bookmark, ChevronRight, BookOpen,
  MapPin, ShieldCheck, Heart
} from 'lucide-react';
import AdBanner from '../../../components/AdBanner';

export default function SingleFestivalPage() {
  const params = useParams();
  const rawSlug = params?.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : '';
  const slug = decodeURIComponent(rawSlug).toLowerCase();

  const [dbPost, setDbPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 1. Check local festivals dataset
  const localFest = useMemo(() => {
    if (!slug) return null;
    return allFestivalsData.find(f => {
      const fId = f.id?.toLowerCase();
      const fNameSlug = f.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return fId === slug || fNameSlug === slug;
    });
  }, [slug]);

  // 2. Fallback to API if not in static list
  useEffect(() => {
    if (localFest) {
      setLoading(false);
      return;
    }

    if (slug) {
      setLoading(true);
      fetch(`http://localhost:5000/api/posts/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setDbPost(data.data);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [slug, localFest]);

  const festival = localFest ? {
    name: localFest.name,
    sanskritName: localFest.sanskritName || '',
    date: localFest.date,
    tithi: localFest.tithi,
    deity: localFest.deity,
    pujaTime: localFest.pujaTime,
    fastingType: localFest.fastingType,
    image: localFest.image || '/images/fest_shiva.png',
    summary: localFest.summary,
    pujaVidhi: localFest.pujaVidhi,
    mantra: localFest.mantra,
    significance: localFest.significance
  } : (dbPost ? {
    name: dbPost.title,
    sanskritName: dbPost.titleTelugu || '',
    date: 'Auspicious Lunar Tithi',
    tithi: dbPost.deity || 'Vedic Panchangam',
    deity: dbPost.deity || 'Universal Divine',
    pujaTime: 'Brahma Muhurtham to Nishita Kaal',
    fastingType: 'Sattvic Upavasam',
    image: dbPost.featuredImage || '/images/fest_shiva.png',
    summary: dbPost.excerpt,
    pujaVidhi: dbPost.content,
    mantra: dbPost.devotionalVerse,
    significance: dbPost.metaDescription || dbPost.excerpt
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
          <p className="font-serif text-sm">Opening auspicious festival guide...</p>
        </div>
      </div>
    );
  }

  if (!festival) {
    return (
      <div className="min-h-screen bg-[#fffdfa] flex flex-col items-center justify-center p-6 text-center">
        <Calendar className="w-16 h-16 text-stone-300 mb-3" />
        <h2 className="text-2xl font-serif font-black text-[#78131e] mb-2">Festival Guide Not Found</h2>
        <p className="text-stone-600 text-sm max-w-md mb-6">
          The requested sacred festival details could not be located.
        </p>
        <Link
          href="/festivals"
          className="inline-flex items-center gap-2 bg-[#78131e] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md hover:bg-[#600e17] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All 16 Festivals</span>
        </Link>
      </div>
    );
  }

  const otherFestivals = allFestivalsData
    .filter(f => f.name !== festival.name)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-900 pb-20">
      
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-[#5a0c14] text-amber-100 text-xs py-3 px-4 sm:px-8 border-b border-[#73131e]">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-[11px] text-amber-200/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/festivals" className="hover:text-white transition-colors">Festivals</Link>
            <span>/</span>
            <span className="text-amber-300 font-bold truncate max-w-xs sm:max-w-md">{festival.name}</span>
          </div>

          <Link
            href="/festivals"
            className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white font-bold bg-[#78131e] px-3 py-1 rounded-lg border border-amber-500/30 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Festivals</span>
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Festival Article Card */}
        <article className="bg-white rounded-3xl border border-[#ebdcc7] shadow-sm overflow-hidden">
          
          {/* Header Banner */}
          <div className="relative h-64 sm:h-96 w-full bg-stone-900 overflow-hidden">
            <img 
              src={festival.image} 
              alt={festival.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-amber-400 text-stone-950 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                  <Flame className="w-2.5 h-2.5" />
                  Auspicious Vrata & Mahotsavam
                </span>
                {festival.sanskritName && (
                  <span className="text-amber-200 font-serif text-xs font-bold bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    {festival.sanskritName}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white mb-2">
                {festival.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-amber-200/90 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {festival.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {festival.tithi}
                </span>
              </div>
            </div>
          </div>

          {/* Key Facts Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 bg-amber-50/60 border-b border-stone-200 text-xs p-4">
            <div className="p-2 sm:px-4">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                Presiding Deity
              </span>
              <span className="font-serif font-bold text-amber-950 text-sm">
                {festival.deity}
              </span>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                Auspicious Puja Timings
              </span>
              <span className="font-serif font-bold text-amber-950 text-sm">
                {festival.pujaTime}
              </span>
            </div>
            <div className="p-2 sm:px-4">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-0.5">
                Fasting & Upavasam
              </span>
              <span className="font-serif font-bold text-amber-950 text-sm">
                {festival.fastingType}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Sacred Mantra Box */}
            {festival.mantra && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-6 rounded-2xl shadow-xs text-center">
                <span className="text-[10px] font-black text-[#78131e] uppercase tracking-widest block mb-2 font-serif">
                  🔱 Sacred Dhyana Mantra (ధ్యాన మంత్రం):
                </span>
                <p className="font-serif font-bold text-base sm:text-lg text-amber-950 leading-relaxed tracking-wide">
                  {festival.mantra}
                </p>
              </div>
            )}

            {/* Overview & Summary */}
            {festival.summary && (
              <div className="space-y-2">
                <h3 className="text-base font-serif font-black text-[#78131e] uppercase tracking-wide">
                  Overview & Puranic Origins
                </h3>
                <p className="text-stone-700 font-serif leading-relaxed text-sm sm:text-base">
                  {festival.summary}
                </p>
              </div>
            )}

            {/* Step-by-Step Puja Vidhi */}
            {festival.pujaVidhi && (
              <div className="space-y-3 bg-[#fffdf8] p-6 rounded-2xl border border-amber-200">
                <h3 className="text-base font-serif font-black text-[#78131e] flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Step-by-Step Puja Vidhi (సంపూర్ణ పూజా విధానం)</span>
                </h3>
                <div className="text-stone-800 font-serif text-sm leading-relaxed whitespace-pre-line space-y-2">
                  {festival.pujaVidhi}
                </div>
              </div>
            )}

            {/* Spiritual Significance */}
            {festival.significance && (
              <div className="space-y-2">
                <h3 className="text-base font-serif font-black text-[#78131e]">
                  Spiritual Benefits & Phala Shruti (ఫలశ్రుతి)
                </h3>
                <p className="text-stone-700 font-serif leading-relaxed text-sm sm:text-base">
                  {festival.significance}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#78131e] hover:underline cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Festival Guide'}</span>
              </button>

              <Link
                href="/marketplace?category=pooja-kits"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95"
              >
                <span>Order Sacred Festival Pooja Kit</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </article>

        {/* In-Feed Banner Ad */}
        <div className="my-8">
          <AdBanner slotId="slot-infeed-fest" type="in-feed-1" label="FESTIVAL SPONSOR" />
        </div>

        {/* Other Festivals Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg sm:text-xl font-serif font-black text-[#6b111b] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>More Auspicious Festivals</span>
            </h3>
            <Link
              href="/festivals"
              className="text-xs font-bold text-[#78131e] hover:underline flex items-center gap-1"
            >
              <span>View All 16 Festivals</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {otherFestivals.map((f) => (
              <Link
                key={f.id}
                href={`/festivals/${f.id}`}
                className="bg-white rounded-2xl border border-[#ebdcc7] overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 w-full overflow-hidden bg-stone-100">
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3.5">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-0.5">
                      {f.date}
                    </span>
                    <h4 className="font-serif font-black text-xs text-stone-900 group-hover:text-[#78131e] transition-colors line-clamp-1">
                      {f.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate mt-1">
                      {f.deity}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 pt-0 text-[10.5px] text-[#78131e] font-bold flex items-center justify-between">
                  <span>View Vidhi & Timings</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
}
