'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Sparkles, ArrowRight } from 'lucide-react';

export default function DynamicFestivalAlert() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/content?sectionKey=festival_alert')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setAlert(data.data[0]);
        }
      })
      .catch(() => {});
  }, []);

  if (!alert || !alert.isActive) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6e141a] via-[#8d1d25] to-[#aa3a18] text-white p-4 sm:p-5 shadow-sm border border-amber-500/30">
      {/* Decorative background aura */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-44 h-44 bg-red-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-300">
            <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-amber-400 text-stone-950 text-[10px] uppercase font-black px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5" />
                {alert.badge || 'FESTIVAL SPECIAL'}
              </span>
              <span className="text-[11px] text-amber-200/90 font-medium">
                Auspicious Observance
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-serif font-black text-amber-100 tracking-tight leading-snug">
              {alert.title}
            </h3>

            {alert.subtitle && (
              <p className="text-xs text-amber-100/85 mt-1 leading-relaxed max-w-2xl">
                {alert.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="shrink-0 self-start md:self-center">
          <Link
            href={alert.ctaLink || '/marketplace'}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition-transform active:scale-95"
          >
            <span>{alert.ctaText || 'View Festival Seva'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
