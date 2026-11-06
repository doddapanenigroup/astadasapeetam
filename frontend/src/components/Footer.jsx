import React from 'react';
import { Heart } from 'lucide-react';
import { FacebookIcon, TwitterXIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';

export default function Footer() {
  return (
    <div className="w-[98.5%] max-w-[1920px] mx-auto mb-6 px-1">
      <footer className="bg-[#480a11] text-amber-100/90 pt-10 pb-6 rounded-2xl border border-[#5c0e18] shadow-md relative overflow-hidden">
        {/* Decorative Golden Temple Silhouette in Background */}
        <div className="absolute right-4 bottom-8 opacity-10 pointer-events-none text-9xl text-amber-300 font-serif hidden lg:block select-none">
          🛕
        </div>

        <div className="w-[95%] max-w-[1800px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-8 border-b border-amber-900/60">
          {/* Brand Info (Col 2 span) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-stone-900 flex items-center justify-center font-bold text-lg font-serif">
                🕉️
              </div>
              <div>
                <span className="font-extrabold text-base tracking-wide text-amber-200 block font-serif">
                  ASTADASAPEETAM.COM
                </span>
                <span className="text-[10px] tracking-widest text-amber-300/80 uppercase font-medium">
                  DEVOTIONAL NEWS CHANNEL
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-200/70 leading-relaxed max-w-sm">
              Your trusted daily source for devotional news, temples, festivals, astrology, daily slokas and spiritual content from across India.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-amber-950/80 hover:bg-amber-600 text-amber-200 hover:text-white flex items-center justify-center transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-amber-950/80 hover:bg-amber-600 text-amber-200 hover:text-white flex items-center justify-center transition-colors">
                <TwitterXIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-amber-950/80 hover:bg-amber-600 text-amber-200 hover:text-white flex items-center justify-center transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-amber-950/80 hover:bg-amber-600 text-amber-200 hover:text-white flex items-center justify-center transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 1: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3 font-serif">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/70">
              <li><a href="#" className="hover:text-amber-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Write for Us</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3 font-serif">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/70">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Devotional News</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Temple News</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Festival News</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Spirituality</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Astrology News</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3 font-serif">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/70">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Panchangam</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">E-Paper</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Live TV</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Astrologers</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Mobile App</a></li>
            </ul>
          </div>

          {/* Col 4: Popular Temples */}
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-3 font-serif">
              Popular Temples
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/70">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Tirupati Temple</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Shirdi Sai Baba Temple</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Vaishno Devi Temple</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Siddhivinayak Temple</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Meenakshi Temple</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-amber-300/60 gap-2">
          <p>© 2026 Astadasapeetam Devotional News Channel. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Sanatana Dharma
          </p>
        </div>
      </div>
    </footer>
  </div>
);
}
