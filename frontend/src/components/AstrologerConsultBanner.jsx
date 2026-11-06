import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function AstrologerConsultBanner() {
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#171b30] via-[#241a3e] to-[#341829] text-white p-4 sm:p-6 shadow-2xs border border-amber-500/30 relative">
      {/* Decorative zodiac wheel silhouette */}
      <div className="absolute right-0 top-0 bottom-0 w-44 opacity-20 pointer-events-none flex items-center justify-center">
        <div className="w-52 h-52 rounded-full border-4 border-dashed border-amber-300" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Astrologer Portrait & Heading */}
        <div className="flex items-center gap-4 text-left">
          <div className="w-16 h-18 sm:w-20 sm:h-22 rounded-xl overflow-hidden shrink-0 border border-amber-400/30 shadow-xs bg-amber-950/40">
            <img
              src="/images/astrologer_banner.png"
              alt="Verified Astrologer"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-base sm:text-lg lg:text-xl font-serif font-black text-amber-200 tracking-tight leading-snug">
              Get Personal Guidance from Verified Astrologers
            </h3>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-[11px] text-amber-100/80">
              <span className="flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified Experts
              </span>
              <span className="flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100% Confidential
              </span>
              <span className="flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Easy & Secure
              </span>
            </div>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="shrink-0 w-full sm:w-auto">
          <a
            href="#consult-now"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-900" />
            Consult Now &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
