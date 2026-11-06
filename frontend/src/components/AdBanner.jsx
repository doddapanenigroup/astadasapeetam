import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AdBanner({ type = 'leaderboard', label = 'Ad Space', className = '' }) {
  if (type === 'sidebar') {
    return (
      <div className={`w-full bg-[#fceddf] border border-dashed border-[#e6bca2] rounded-lg p-3 text-center flex flex-col items-center justify-center min-h-[250px] ${className}`}>
        <span className="text-[11px] font-semibold text-amber-900/60 uppercase tracking-wider mb-2">
          {label} (Private Ads)
        </span>
        <div className="text-xs text-amber-950 font-bold">300 × 250</div>
        <p className="text-[11px] text-amber-800/70 mt-1 max-w-[200px]">
          Advertise your spiritual store, temple trust, or astrologer services here.
        </p>
      </div>
    );
  }

  if (type === 'top-sponsored') {
    return (
      <div className="w-[98.5%] max-w-[1920px] mx-auto py-2.5">
        <div className="bg-gradient-to-r from-[#2c1306] via-[#632909] to-[#2c1306] rounded-lg p-2.5 px-6 flex flex-col sm:flex-row items-center justify-between shadow-sm border border-amber-500/30 text-white gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="text-[10px] bg-amber-400/20 text-amber-300 uppercase px-1.5 py-0.5 rounded font-mono">
              Ad Space 1 (Top Banner - 728x90)
            </span>
            <div>
              <div className="text-sm sm:text-base font-bold text-amber-200 tracking-wide flex items-center gap-2 justify-center sm:justify-start">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Experience Divine Energy
              </div>
              <div className="text-xs text-amber-100/80">
                Premium Rudraksha & Spiritual Products
              </div>
            </div>
          </div>
          <a
            href="#"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-900 font-bold text-xs px-4 py-1.5 rounded shadow transition-all whitespace-nowrap"
          >
            Shop Now &rarr;
          </a>
        </div>
      </div>
    );
  }

  // Standard in-feed / mid-page banner
  return (
    <div className={`w-full mx-auto my-6 p-4 rounded-lg border border-dashed border-[#d8aa8d] bg-[#fbf2e9] text-center ${className}`}>
      <span className="text-[10px] font-semibold tracking-wider text-amber-900/60 uppercase block mb-1">
        Ad Space
      </span>
      <div className="text-xs font-bold text-amber-900 uppercase">
        {label} (728 × 90)
      </div>
    </div>
  );
}
