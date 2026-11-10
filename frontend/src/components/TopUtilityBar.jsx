'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { headerData } from '../data/mockData';
import { Sunrise, Sunset } from 'lucide-react';
import { FacebookIcon, TwitterXIcon, InstagramIcon, YoutubeIcon, WhatsAppIcon } from './SocialIcons';

export default function TopUtilityBar() {
  const [announcement, setAnnouncement] = useState(null);
  const [socials, setSocials] = useState({
    facebook: 'https://facebook.com/astadasapeetam',
    whatsapp: 'https://wa.me/919876500001?text=Namaste%20Astadasapeetam%2C%20I%20seek%20spiritual%20guidance',
    instagram: 'https://instagram.com/astadasapeetam',
    youtube: 'https://youtube.com/@astadasapeetam',
    twitter: 'https://x.com/astadasapeetam'
  });

  useEffect(() => {
    // Fetch announcement
    fetch('http://localhost:5000/api/public/content?sectionKey=announcement_bar')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setAnnouncement(data.data[0]);
        }
      })
      .catch(() => {});

    // Fetch dynamic social connections
    fetch('http://localhost:5000/api/public/settings/social_profiles')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSocials(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-[#5a0c14] text-amber-100 text-xs border-b border-[#73131e]">
      {/* Dynamic Digital Marketing Top Announcement Bar (if active) */}
      {announcement && announcement.isActive && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600 text-stone-900 py-1 px-4 text-center text-[11px] font-bold border-b border-amber-500/40 shadow-xs flex items-center justify-center gap-2">
          <span className="bg-stone-900 text-amber-300 text-[9px] uppercase px-2 py-0.2 rounded-full font-black tracking-wider">
            {announcement.badge || 'SPECIAL'}
          </span>
          <span className="text-white font-medium truncate max-w-xl">
            {announcement.title}
          </span>
          <Link
            href={announcement.ctaLink || '/sacred-temples'}
            className="underline text-amber-200 hover:text-white font-bold ml-1 shrink-0"
          >
            {announcement.ctaText || 'Learn More'} &rarr;
          </Link>
        </div>
      )}

      {/* Standard Panchangam & Links Utility Bar */}
      <div className="py-1.5 px-4">
        <div className="w-[98.5%] max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left: Panchangam Quick Ticker */}
          <Link href="/panchangam" className="flex items-center gap-4 flex-wrap justify-center md:justify-start hover:opacity-90 transition-opacity cursor-pointer group">
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
          </Link>

          {/* Right: Quick Links & Dynamic Social Connections */}
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
              <a
                href={socials.whatsapp || 'https://wa.me/919876500001'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 text-emerald-300 transition-colors"
                aria-label="WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={socials.instagram || 'https://instagram.com/astadasapeetam'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-300 transition-colors"
                aria-label="Instagram"
                title="Follow on Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={socials.facebook || 'https://facebook.com/astadasapeetam'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-300 transition-colors"
                aria-label="Facebook"
                title="Visit Facebook Profile"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={socials.youtube || 'https://youtube.com/@astadasapeetam'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-400 transition-colors"
                aria-label="YouTube"
                title="Watch on YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={socials.twitter || 'https://x.com/astadasapeetam'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors"
                aria-label="X"
                title="Follow on X / Twitter"
              >
                <TwitterXIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
