import React from 'react';
import AdBanner from '../components/AdBanner';
import HeroCarousel from '../components/HeroCarousel';
import CategoryGrid from '../components/CategoryGrid';
import MainDevotionalGrid from '../components/MainDevotionalGrid';
import DynamicFestivalAlert from '../components/DynamicFestivalAlert';
import AstrologerConsultBanner from '../components/AstrologerConsultBanner';
import ArticlesAndVideos from '../components/ArticlesAndVideos';
import DynamicMarketplaceSpotlight from '../components/DynamicMarketplaceSpotlight';
import ProductsAndFestivalsRow from '../components/ProductsAndFestivalsRow';
import RightSidebarFull from '../components/RightSidebarFull';
import FooterNewsletterApp from '../components/FooterNewsletterApp';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Top Sponsored Leaderboard Banner Ad (Slot 1: 728x90) */}
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* 2. Main 2-Column Layout */}
      <div className="w-[98.5%] max-w-[1920px] mx-auto py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Left Content Area (Col 8.5 / 9 on XL) */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col space-y-4">
            {/* Hero Carousel (Dynamic Hero Banner) */}
            <HeroCarousel />

            {/* Explore Categories (16 Quick-Access Cards) */}
            <CategoryGrid />

            {/* In-Feed Native Ad Slot 1 (Slot 2: 728x90) */}
            <AdBanner slotId="slot-2" type="in-feed-1" label="IN-FEED NATIVE AD 1" />

            {/* 3-Column Content: Devotional News, Festivals & Events, Popular Temples */}
            <MainDevotionalGrid />

            {/* Auspicious Festival Alert (Dynamic from Admin Console) */}
            <DynamicFestivalAlert />

            {/* Verified Astrologers Lead Gen Banner */}
            <AstrologerConsultBanner />

            {/* In-Feed Native Ad Slot 2 (Slot 4: 728x90) */}
            <AdBanner slotId="slot-4" type="in-feed-2" label="IN-FEED NATIVE AD 2" />

            {/* Latest Articles + Latest Videos */}
            <ArticlesAndVideos />

            {/* Marketplace Promotional Ribbon (Dynamic from Admin Console) */}
            <DynamicMarketplaceSpotlight />

            {/* Recommended Devotional Products + Upcoming Festivals */}
            <div className="w-full">
              <ProductsAndFestivalsRow />
            </div>
          </div>

          {/* Continuous Right Sidebar (Col 3.5 / 3 on XL with Slot 3 Ad & Dynamic Sloka of the Day) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <RightSidebarFull />
          </div>
        </div>

        {/* 5. Bottom Anchor Leaderboard Banner Ad (Slot 5: 970x250) */}
        <AdBanner slotId="slot-5" type="bottom-banner" label="BOTTOM LEADERBOARD BANNER" className="my-4" />

        {/* 3. Newsletter Subscription & App Download Bar */}
        <FooterNewsletterApp />
      </div>
    </div>
  );
}
