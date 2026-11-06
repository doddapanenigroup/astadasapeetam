import React from 'react';
import { headerData } from '../data/mockData';
import { Sunrise, Sunset } from 'lucide-react';
import { FacebookIcon, TwitterXIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';

export default function TopUtilityBar() {
  return (
    <div className="bg-[#5a0c14] text-amber-100 text-xs py-1.5 px-4 border-b border-[#73131e]">
      <div className="w-[98.5%] max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Left: Panchangam Quick Ticker */}
        <a href="/panchangam" className="flex items-center gap-4 flex-wrap justify-center md:justify-start hover:opacity-90 transition-opacity cursor-pointer group">
          <span className="bg-[#78131e] group-hover:bg-[#8f1925] px-2 py-0.5 rounded text-[11px] font-semibold text-amber-200 transition-colors">
            Panchangam ›
          </span>
          <span className="font-medium text-amber-100">
            {headerData.panchangamSummary}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-amber-200/80">
            <Sunrise className="w-3.5 h-3.5 text-amber-300" />
            Sunrise: {headerData.sunrise}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-amber-200/80">
            <Sunset className="w-3.5 h-3.5 text-amber-300" />
            Sunset: {headerData.sunset}
          </span>
        </a>

        {/* Right: Quick Links & Social */}
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-3">
            {headerData.topLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-amber-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5 pl-3 border-l border-amber-300/30">
            <a href="#" className="hover:text-amber-300 transition-colors" aria-label="Facebook">
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-amber-300 transition-colors" aria-label="X">
              <TwitterXIcon className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-amber-300 transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-amber-300 transition-colors" aria-label="YouTube">
              <YoutubeIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
