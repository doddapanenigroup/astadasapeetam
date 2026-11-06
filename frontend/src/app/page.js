import React from 'react';
import AdBanner from '../components/AdBanner';
import HeroCarousel from '../components/HeroCarousel';
import CategoryGrid from '../components/CategoryGrid';
import MainDevotionalGrid from '../components/MainDevotionalGrid';
import AstrologerConsultBanner from '../components/AstrologerConsultBanner';
import ArticlesAndVideos from '../components/ArticlesAndVideos';
import ProductsAndFestivalsRow from '../components/ProductsAndFestivalsRow';
import RightSidebarFull from '../components/RightSidebarFull';
import FooterNewsletterApp from '../components/FooterNewsletterApp';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Top Sponsored Leaderboard Banner Ad (728x90) */}
      <AdBanner type="top-sponsored" />

      {/* 2. Main 2-Column Layout */}
      <div className="w-[98.5%] max-w-[1920px] mx-auto py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Main Left Content Area (Col 8.5 / 9 on XL) */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col space-y-4">
            {/* Hero Carousel */}
            <HeroCarousel />

            {/* Explore Categories (16 Quick-Access Cards) */}
            <CategoryGrid />

            {/* In-Feed Native Ad (728x90) */}
            <AdBanner type="leaderboard" label="IN-FEED NATIVE AD" />

            {/* 3-Column Content: Devotional News, Festivals & Events, Popular Temples */}
            <MainDevotionalGrid />

            {/* Verified Astrologers Lead Gen Banner */}
            <AstrologerConsultBanner />

            {/* Mid-Page Banner Ad (728x90) */}
            <AdBanner type="leaderboard" label="MID-PAGE BANNER AD" />

            {/* Latest Articles + Latest Videos */}
            <ArticlesAndVideos />

            {/* Recommended Devotional Products + Upcoming Festivals */}
            <div className="flex-1 flex flex-col min-h-0">
              <ProductsAndFestivalsRow />
            </div>
          </div>

          {/* Continuous Right Sidebar (Col 3.5 / 3 on XL) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <RightSidebarFull />
          </div>
        </div>

        {/* 3. Newsletter Subscription & App Download Bar */}
        <FooterNewsletterApp />
      </div>
    </div>
  );
}
