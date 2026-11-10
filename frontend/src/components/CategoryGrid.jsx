'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ScrollText, Calendar, Hourglass, Sun, 
  Flame, BellRing, BookOpenText, Hexagon, 
  Landmark, HeartHandshake, Sparkles, Compass, 
  Tv, Music, Newspaper, ChevronRight 
} from 'lucide-react';

export default function CategoryGrid() {
  const pillars = [
    {
      id: 'daily-sadhana',
      title: 'Daily Sadhana',
      subtitle: 'Rituals & Auspicious Timings',
      icon: '🪔',
      headerGradient: 'from-[#6e1e0a] via-[#872d11] to-[#a83d16]',
      accentBorder: 'border-amber-200/80',
      badgeBg: 'bg-amber-100 text-amber-900',
      items: [
        {
          name: 'Daily Sloka',
          desc: 'Morning & Evening Chants',
          href: '/slokas',
          icon: ScrollText,
          isInternal: true,
          highlight: 'New',
        },
        {
          name: 'Live Panchangam',
          desc: 'Tithi, Nakshatram & Vaara',
          href: '/panchangam',
          icon: Calendar,
          isInternal: true,
          highlight: 'Live',
        },
        {
          name: 'Shubh Muhurtham',
          desc: 'Auspicious Timings & Choghadiya',
          href: '/muhurtham',
          icon: Hourglass,
          isInternal: true,
        },
        {
          name: 'Daily Horoscope',
          desc: '12 Rasi Phalalu Predictions',
          href: '/horoscope',
          icon: Sun,
          isInternal: true,
          highlight: 'Today',
        },
      ],
    },
    {
      id: 'pooja-vidhi',
      title: 'Pooja & Chants',
      subtitle: 'Vratams, Stotras & Yantras',
      icon: '🔱',
      headerGradient: 'from-[#5e0f18] via-[#7d1723] to-[#9c1f2f]',
      accentBorder: 'border-rose-200/80',
      badgeBg: 'bg-rose-100 text-rose-900',
      items: [
        {
          name: 'Vrathalu & Poojas',
          desc: 'Holy Upavasam & Fasting Vidhi',
          href: '/vrathalu-poojas',
          icon: Flame,
          isInternal: true,
        },
        {
          name: 'Sacred Mantras',
          desc: '108 Bija & Gayatri Chants',
          href: '/mantras',
          icon: BellRing,
          isInternal: true,
        },
        {
          name: 'Divine Stotras',
          desc: 'Ashtakams & Sacred Kavachas',
          href: '/stotras',
          icon: BookOpenText,
          isInternal: true,
        },
        {
          name: 'Sacred Yantras',
          desc: 'Energized Geometric Shields',
          href: '/yantras',
          icon: Hexagon,
          isInternal: true,
        },
      ],
    },
    {
      id: 'darshan-dharma',
      title: 'Darshan & Dharma',
      subtitle: 'Sacred Kshetras & Wisdom',
      icon: '🛕',
      headerGradient: 'from-[#4e1b0c] via-[#6d2712] to-[#8d351a]',
      accentBorder: 'border-orange-200/80',
      badgeBg: 'bg-orange-100 text-orange-900',
      items: [
        {
          name: 'Sacred Temples',
          desc: '18 Peethas & 12 Jyotirlingas',
          href: '/temples',
          icon: Landmark,
          isInternal: true,
          highlight: 'Featured',
        },
        {
          name: 'Spirituality',
          desc: 'Vedic Philosophy & Dharma',
          href: '/spirituality',
          icon: HeartHandshake,
          isInternal: true,
        },
        {
          name: 'Remedies (Upayas)',
          desc: 'Dosha Nivarana & Solutions',
          href: '/remedies',
          icon: Sparkles,
          isInternal: true,
        },
        {
          name: 'Vedic Astrology',
          desc: 'Kundali & Planetary Guidance',
          href: '/astrology',
          icon: Compass,
          isInternal: true,
        },
      ],
    },
    {
      id: 'devotional-media',
      title: 'Devotional Media',
      subtitle: 'Videos, Audio & Daily News',
      icon: '🎵',
      headerGradient: 'from-[#440d14] via-[#61141e] to-[#7f1b29]',
      accentBorder: 'border-amber-200/80',
      badgeBg: 'bg-red-100 text-red-900',
      items: [
        {
          name: 'Devotional Videos',
          desc: 'Temple Darshan & Pravachanams',
          href: '/videos',
          icon: Tv,
          isInternal: true,
          highlight: 'Live',
        },
        {
          name: 'Divine Bhajans',
          desc: 'Kirtans, Stutis & Sangeet',
          href: '/bhajans',
          icon: Music,
          isInternal: true,
        },
        {
          name: 'E-Paper Edition',
          desc: 'Daily Digital Devotional News',
          href: '/epaper',
          icon: Newspaper,
          isInternal: true,
        },
        {
          name: 'Festivals Calendar',
          desc: '2026 Auspicious Dates & Tithis',
          href: '/festivals',
          icon: Calendar,
          isInternal: true,
          highlight: 'Updated',
        },
      ],
    },
  ];

  return (
    <section className="w-full my-6">
      {/* Section Header with Devotional Divider */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="h-px bg-gradient-to-r from-transparent to-[#c5932a] flex-1 max-w-xs" />
        <div className="flex items-center gap-2 text-[#78131e] px-2 font-serif text-center">
          <span className="text-sm">🪔</span>
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#78131e]">
            Explore Categories
          </h2>
          <span className="text-sm">🪔</span>
        </div>
        <div className="h-px bg-gradient-to-l from-transparent to-[#c5932a] flex-1 max-w-xs" />
      </div>

      {/* The 4 Sacred Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="bg-[#fffdfa] rounded-2xl border border-[#ebdcc7] shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            {/* Pillar Header Banner */}
            <div>
              <div className={`bg-gradient-to-r ${pillar.headerGradient} text-white px-3 py-2.5 flex items-center justify-between border-b border-amber-900/30 gap-2`}>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-xs flex items-center justify-center text-base shadow-inner shrink-0">
                    {pillar.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif font-black text-xs tracking-wide leading-tight truncate">
                      {pillar.title}
                    </h3>
                    <p className="text-[9.5px] text-amber-100/80 font-medium truncate">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-white/15 text-amber-200 border border-white/20 shrink-0 whitespace-nowrap">
                  4 Topics
                </span>
              </div>

              {/* Items List Inside Pillar */}
              <div className="p-2 space-y-1">
                {pillar.items.map((item, idx) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#fcf5e8] transition-colors group/item cursor-pointer">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-stone-100/90 group-hover/item:bg-white text-[#78131e] group-hover/item:text-[#a83d16] border border-stone-200/80 group-hover/item:border-amber-300 flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-stone-800 group-hover/item:text-[#78131e] transition-colors leading-tight truncate">
                              {item.name}
                            </span>
                            {item.highlight && (
                              <span className="text-[8.5px] font-extrabold uppercase px-1 py-0.2 rounded bg-amber-200/80 text-amber-900 shrink-0">
                                {item.highlight}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-stone-500 group-hover/item:text-stone-700 transition-colors truncate">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover/item:text-[#78131e] group-hover/item:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </div>
                  );

                  return item.isInternal ? (
                    <Link key={idx} href={item.href} className="block">
                      {content}
                    </Link>
                  ) : (
                    <a key={idx} href={item.href} className="block">
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Bottom Pillar Accent Line */}
            <div className={`h-1 w-full bg-gradient-to-r ${pillar.headerGradient} opacity-60`} />
          </div>
        ))}
      </div>
    </section>
  );
}
