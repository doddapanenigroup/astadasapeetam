'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, Calendar, Clock, Bus, Utensils, Hotel, 
  ShieldCheck, CheckCircle2, Sparkles, Star, X, 
  ChevronRight, Phone, Users, Check, Search, 
  ArrowRight, Landmark, FileText, Heart, Info
} from 'lucide-react';
import { yatraCategories, yatraPackages } from '../../data/yatraData';

export default function TirthaYatraluPage() {
  // State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Modals
  const [itineraryModalPackage, setItineraryModalPackage] = useState(null);
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'inclusions'
  const [bookingModalPackage, setBookingModalPackage] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Booking Form State
  const [bookingData, setBookingData] = useState({
    city: 'Hyderabad',
    departureDate: '',
    pilgrimsCount: 2,
    leadName: '',
    phone: '',
    gotram: '',
    nakshatram: '',
    paymentType: 'advance' // 'advance' (₹2,000/seat) or 'full'
  });

  // Unique departure cities from data
  const allCities = useMemo(() => {
    const citiesSet = new Set();
    yatraPackages.forEach(p => p.departureCities.forEach(c => citiesSet.add(c)));
    return Array.from(citiesSet);
  }, []);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return yatraPackages.filter(pkg => {
      const matchCat = selectedCategory === 'all' || pkg.category === selectedCategory;
      const matchCity = selectedCity === 'all' || pkg.departureCities.includes(selectedCity);
      const matchSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.teluguTitle.includes(searchQuery) ||
                          pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchCity && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [selectedCategory, selectedCity, searchQuery, sortBy]);

  // Open booking modal
  const handleOpenBooking = (pkg) => {
    setBookingModalPackage(pkg);
    setBookingData(prev => ({
      ...prev,
      departureDate: pkg.nextDepartures[0] || '15 Nov 2026',
      city: pkg.departureCities[0] || 'Hyderabad'
    }));
    setBookingConfirmed(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.leadName || !bookingData.phone) {
      alert('Please fill out lead pilgrim name and mobile number.');
      return;
    }
    setBookingConfirmed(true);
  };

  // Pricing calculations
  const calculateTotal = (pkg, count, type) => {
    if (!pkg) return 0;
    const full = pkg.price * count;
    return type === 'advance' ? 2000 * count : full;
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] text-stone-800 pb-20">
      
      {/* 1. Divine Tirtha Yatralu Hero Banner */}
      <section 
        className="w-full text-white py-10 px-4 border-b border-amber-900/40 relative overflow-hidden"
        style={{
          backgroundColor: '#6b111b',
          backgroundImage: 'linear-gradient(135deg, #78131e 0%, #540b13 100%)'
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-amber-300/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-[98.5%] max-w-[1920px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sanatana Dharma Sacred Pilgrimages • తీర్థ యాత్రలు</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-white mb-2">
              Astadasapeetam Tirtha Yatralu & Temple Packages
            </h1>
            <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
              Curated spiritual tours with confirmed VIP Sheegra Darshans, 100% Satvik meals, AC pushback luxury coaches, twin-sharing deluxe stays & experienced Vedic Priests for group Sankalpams.
            </p>
          </div>

          {/* Quick Help Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-xs text-white max-w-xs shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center font-bold shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold uppercase text-[10px] tracking-wider text-amber-300 block">Yatra Sahaya Kendra</span>
              <span className="font-bold text-sm block">+91 1800-ASTADASA</span>
              <span className="text-[11px] text-amber-100/80">Daily 6:00 AM - 10:00 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Assurances Bar */}
      <section className="bg-amber-50 border-b border-amber-200/80 py-3.5 px-4">
        <div className="w-[98.5%] max-w-[1920px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-stone-800">
            <Landmark className="w-5 h-5 text-[#78131e] shrink-0" />
            <div>
              <span className="font-bold block">VIP Darshan Passes</span>
              <span className="text-[11px] text-stone-500">Confirmed temple special entry</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-stone-800">
            <Utensils className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold block">100% Satvik Food</span>
              <span className="text-[11px] text-stone-500">Pure South & North Indian meals</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-stone-800">
            <Bus className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <span className="font-bold block">AC Luxury Travel</span>
              <span className="text-[11px] text-stone-500">Volvo AC Coach / AC Sleeper</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-stone-800">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold block">Vedic Priest Guide</span>
              <span className="text-[11px] text-stone-500">Sankalpam, Tarpanam & Rituals</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Catalog Section */}
      <main className="w-[98.5%] max-w-[1920px] mx-auto px-2 sm:px-4 py-8">
        
        {/* Controls: Search, Boarding City & Categories */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#ebdcc7] mb-8 space-y-4">
          
          {/* Top row: Search, City Filter, Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="relative md:col-span-5">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                suppressHydrationWarning
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Kashi, Srisailam, Rameswaram, Char Dham..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-[#78131e] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button 
                  suppressHydrationWarning
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Boarding City Filter */}
            <div className="flex items-center gap-2 md:col-span-4 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#78131e] shrink-0" />
              <span className="text-stone-600 font-semibold whitespace-nowrap">Boarding City:</span>
              <select
                suppressHydrationWarning
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-stone-700 focus:outline-hidden focus:border-[#78131e]"
              >
                <option value="all">All Cities (Hyderabad, Vijayawada, etc.)</option>
                {allCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2 md:col-span-3 justify-end text-xs sm:text-sm">
              <span className="text-stone-500 font-medium">Sort:</span>
              <select
                suppressHydrationWarning
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-stone-700 focus:outline-hidden focus:border-[#78131e]"
              >
                <option value="recommended">Recommended (Popular)</option>
                <option value="rating">Highest Rated (★ 4.9+)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Bottom row: Category Pills without scrolling */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
            {yatraCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? yatraPackages.length 
                : yatraPackages.filter(p => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  suppressHydrationWarning
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#78131e] text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-900 border border-stone-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Yatra Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-2xl border border-[#ebdcc7] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Top Section: Photo & Badges */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-900">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="bg-[#78131e] text-white text-[10px] font-black px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                      {pkg.discount}
                    </span>
                    <span className="bg-amber-500 text-stone-950 text-[10px] font-extrabold px-2 py-1 rounded shadow-xs">
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{pkg.duration}</span>
                  </div>

                  {/* Bottom of Image: Telugu Title & Rating */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-amber-300 font-serif font-bold text-sm block drop-shadow-xs">
                        {pkg.teluguTitle}
                      </span>
                      <h3 className="text-white font-serif font-black text-lg md:text-xl drop-shadow-sm leading-snug">
                        {pkg.title}
                      </h3>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xs px-2 py-1 rounded-md text-xs font-bold text-stone-900 flex items-center gap-1 shrink-0 shadow-xs">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                      <span>{pkg.rating}</span>
                      <span className="text-[10px] text-stone-500">({pkg.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Package Info & Highlights */}
                <div className="p-4 space-y-3.5">
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 bg-amber-50/60 border border-amber-200/70 p-3 rounded-xl text-xs text-stone-700">
                    <span className="font-bold text-stone-900 text-xs block mb-1">
                      🛕 Auspicious Yatra Highlights:
                    </span>
                    {pkg.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Trip Features Strip */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-stone-600 border-t border-stone-100 pt-3">
                    <div className="flex items-center gap-1.5">
                      <Bus className="w-4 h-4 text-amber-700 shrink-0" />
                      <span className="truncate">{pkg.transport}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Hotel className="w-4 h-4 text-amber-700 shrink-0" />
                      <span className="truncate">{pkg.stay}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Utensils className="w-4 h-4 text-amber-700 shrink-0" />
                      <span className="truncate">100% Satvik Bhojan</span>
                    </div>
                  </div>

                  {/* Boarding Points & Upcoming Departures */}
                  <div className="text-xs space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <MapPin className="w-3.5 h-3.5 text-[#78131e] shrink-0" />
                      <span className="font-semibold text-stone-800">Pick-up Cities:</span>
                      <span className="text-stone-600 truncate">{pkg.departureCities.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-semibold text-stone-800">Next Departures:</span>
                      <div className="flex gap-1.5 overflow-hidden">
                        {pkg.nextDepartures.slice(0, 3).map((d, i) => (
                          <span key={i} className="bg-amber-100 text-amber-950 font-bold px-1.5 py-0.2 rounded text-[10px]">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="p-4 pt-0 space-y-3">
                <div className="flex items-baseline justify-between border-t border-stone-100 pt-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl md:text-2xl font-black text-stone-900">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        ₹{pkg.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-emerald-700">
                        Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 block">Per Person • All-Inclusive (Stay, Food, Travel, VIP Darshan)</span>
                  </div>

                  {/* Token booking note */}
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Book with ₹2,000 Token
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    suppressHydrationWarning
                    onClick={() => {
                      setItineraryModalPackage(pkg);
                      setActiveTab('itinerary');
                    }}
                    className="flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-[#78131e] border border-amber-300 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Itinerary</span>
                  </button>

                  <button
                    suppressHydrationWarning
                    onClick={() => handleOpenBooking(pkg)}
                    className="flex items-center justify-center gap-1.5 bg-[#78131e] hover:bg-[#600e17] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Book Sacred Yatra</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <Landmark className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-700">No yatra packages matched your criteria</h3>
            <p className="text-stone-500 text-sm mt-1">Try resetting the boarding city or searching for &quot;Kashi&quot;, &quot;Srisailam&quot;, or &quot;Tirupati&quot;.</p>
            <button
              suppressHydrationWarning
              onClick={() => { setSelectedCategory('all'); setSelectedCity('all'); setSearchQuery(''); }}
              className="mt-4 bg-[#78131e] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      {/* 4. Full Day-by-Day Itinerary Modal */}
      {itineraryModalPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#ebdcc7] animate-in fade-in zoom-in-95 duration-200 flex flex-col justify-between">
            
            {/* Header */}
            <div className="bg-[#78131e] text-white p-4 flex items-center justify-between shrink-0">
              <div>
                <span className="text-xs text-amber-300 font-bold block">{itineraryModalPackage.teluguTitle}</span>
                <h3 className="font-serif font-bold text-lg sm:text-xl">{itineraryModalPackage.title}</h3>
                <span className="text-xs text-amber-100">{itineraryModalPackage.duration} • VIP Darshan Included</span>
              </div>
              <button 
                suppressHydrationWarning
                onClick={() => setItineraryModalPackage(null)}
                className="text-stone-300 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-stone-200 bg-stone-50 shrink-0 text-xs sm:text-sm font-bold">
              <button
                suppressHydrationWarning
                onClick={() => setActiveTab('itinerary')}
                className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'itinerary' 
                    ? 'border-[#78131e] text-[#78131e] bg-white' 
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Day-by-Day Sacred Itinerary
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setActiveTab('inclusions')}
                className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'inclusions' 
                    ? 'border-[#78131e] text-[#78131e] bg-white' 
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Inclusions & Exclusions
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
              {activeTab === 'itinerary' && (
                <div className="space-y-4">
                  {itineraryModalPackage.itinerary.map((dayItem, idx) => (
                    <div key={idx} className="flex gap-4">
                      {/* Day Badge & Line */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 text-[#78131e] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs font-serif">
                          {dayItem.day}
                        </div>
                        {idx < itineraryModalPackage.itinerary.length - 1 && (
                          <div className="w-0.5 flex-1 bg-amber-200 my-1" />
                        )}
                      </div>

                      {/* Day Details */}
                      <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 flex-1">
                        <h4 className="font-bold text-stone-900 text-sm font-serif mb-1">
                          {dayItem.title}
                        </h4>
                        <p className="text-stone-600 leading-relaxed text-xs">
                          {dayItem.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div className="space-y-4">
                  {/* Inclusions */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                    <h4 className="font-bold text-emerald-900 text-sm mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>What Is Included in this Sacred Yatra:</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-700">
                      {itineraryModalPackage.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                    <h4 className="font-bold text-stone-800 text-sm mb-2 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-amber-700" />
                      <span>Exclusions (Not Included):</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-600">
                      {itineraryModalPackage.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-stone-400 font-bold shrink-0">•</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
              <div>
                <span className="text-xs text-stone-500">All-Inclusive Price:</span>
                <div className="text-lg font-black text-stone-900">
                  ₹{itineraryModalPackage.price.toLocaleString()} <span className="text-xs font-normal text-stone-500">/ person</span>
                </div>
              </div>
              <button
                suppressHydrationWarning
                onClick={() => {
                  const pkg = itineraryModalPackage;
                  setItineraryModalPackage(null);
                  handleOpenBooking(pkg);
                }}
                className="bg-[#78131e] hover:bg-[#600e17] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl cursor-pointer shadow-md"
              >
                Proceed to Book Seats
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. Interactive Yatra Booking & Seat Reservation Modal */}
      {bookingModalPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#ebdcc7] animate-in fade-in zoom-in-95 duration-200">
            
            {!bookingConfirmed ? (
              <div>
                {/* Header */}
                <div className="bg-[#78131e] text-white p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-300 uppercase tracking-widest font-extrabold block">Sacred Yatra Seat Reservation</span>
                    <h3 className="font-serif font-bold text-base sm:text-lg">{bookingModalPackage.title}</h3>
                  </div>
                  <button 
                    suppressHydrationWarning
                    onClick={() => setBookingModalPackage(null)}
                    className="text-stone-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleBookingSubmit} className="p-5 space-y-4 text-xs sm:text-sm">
                  
                  {/* Select City & Date */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Boarding City *</label>
                      <select
                        suppressHydrationWarning
                        value={bookingData.city}
                        onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-2 text-xs focus:outline-hidden focus:border-[#78131e] font-semibold"
                      >
                        {bookingModalPackage.departureCities.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Departure Date *</label>
                      <select
                        suppressHydrationWarning
                        value={bookingData.departureDate}
                        onChange={(e) => setBookingData({ ...bookingData, departureDate: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-2 text-xs focus:outline-hidden focus:border-[#78131e] font-semibold"
                      >
                        {bookingModalPackage.nextDepartures.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Number of Pilgrims */}
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">Number of Pilgrims (Seats) *</label>
                    <div className="flex items-center gap-3 bg-stone-50 border border-stone-300 rounded-lg p-2">
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setBookingData(prev => ({ ...prev, pilgrimsCount: Math.max(1, prev.pilgrimsCount - 1) }))}
                        className="w-7 h-7 bg-white border border-stone-300 rounded-md font-bold text-stone-700 hover:bg-stone-100 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-extrabold text-sm">{bookingData.pilgrimsCount} Pilgrims</span>
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setBookingData(prev => ({ ...prev, pilgrimsCount: prev.pilgrimsCount + 1 }))}
                        className="w-7 h-7 bg-white border border-stone-300 rounded-md font-bold text-stone-700 hover:bg-stone-100 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                      <span className="text-[11px] text-stone-500 ml-auto font-medium">Twin-sharing AC Stay included</span>
                    </div>
                  </div>

                  {/* Pilgrim Details */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-stone-700 font-bold mb-1">Lead Devotee Full Name *</label>
                      <input
                        suppressHydrationWarning
                        type="text"
                        required
                        placeholder="e.g. D. Sitarama Raju"
                        value={bookingData.leadName}
                        onChange={(e) => setBookingData({ ...bookingData, leadName: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-[#78131e]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-700 font-bold mb-1">WhatsApp / Phone *</label>
                        <input
                          suppressHydrationWarning
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-[#78131e]"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-700 font-bold mb-1">Gotram (For Sankalpam)</label>
                        <input
                          suppressHydrationWarning
                          type="text"
                          placeholder="e.g. Koundinya, Harita"
                          value={bookingData.gotram}
                          onChange={(e) => setBookingData({ ...bookingData, gotram: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-[#78131e]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Option: Token or Full */}
                  <div>
                    <label className="block text-stone-700 font-bold mb-1.5">Payment Option</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className={`flex flex-col p-2.5 rounded-lg border cursor-pointer ${
                        bookingData.paymentType === 'advance' ? 'border-[#78131e] bg-amber-50/50' : 'border-stone-200'
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold text-stone-900">
                          <input
                            suppressHydrationWarning
                            type="radio"
                            name="payOption"
                            checked={bookingData.paymentType === 'advance'}
                            onChange={() => setBookingData({ ...bookingData, paymentType: 'advance' })}
                            className="text-[#78131e]"
                          />
                          <span>Pay Token (₹2,000/seat)</span>
                        </div>
                        <span className="text-[10px] text-stone-500 mt-1">Balance payable on boarding day</span>
                      </label>

                      <label className={`flex flex-col p-2.5 rounded-lg border cursor-pointer ${
                        bookingData.paymentType === 'full' ? 'border-[#78131e] bg-amber-50/50' : 'border-stone-200'
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold text-stone-900">
                          <input
                            suppressHydrationWarning
                            type="radio"
                            name="payOption"
                            checked={bookingData.paymentType === 'full'}
                            onChange={() => setBookingData({ ...bookingData, paymentType: 'full' })}
                            className="text-[#78131e]"
                          />
                          <span>Pay Full Amount</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-bold mt-1">Instant 5% Divine Bonus</span>
                      </label>
                    </div>
                  </div>

                  {/* Total calculation strip */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-stone-800">
                        Amount Payable Now ({bookingData.pilgrimsCount} pilgrims):
                      </span>
                      <p className="text-[11px] text-stone-500">
                        Total package value: ₹{(bookingModalPackage.price * bookingData.pilgrimsCount).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-lg font-black text-[#78131e]">
                      ₹{calculateTotal(bookingModalPackage, bookingData.pilgrimsCount, bookingData.paymentType).toLocaleString()}
                    </span>
                  </div>

                  {/* Submit */}
                  <button
                    suppressHydrationWarning
                    type="submit"
                    className="w-full bg-[#78131e] hover:bg-[#600e17] text-white font-bold py-3 rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>Confirm Seats & Pay ₹{calculateTotal(bookingModalPackage, bookingData.pilgrimsCount, bookingData.paymentType).toLocaleString()}</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Booking Confirmed Screen */
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-serif font-black text-stone-900">
                  Subhamastu! Yatra Seats Reserved
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Your pilgrimage booking <span className="font-mono font-bold text-stone-900">#AST-YATRA-{Math.floor(1000 + Math.random() * 9000)}</span> has been registered. Our pilgrimage coordinator will call you to confirm boarding point details.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Pilgrim Package:</span>
                    <span className="font-bold text-stone-900 truncate max-w-[200px]">{bookingModalPackage.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Departure:</span>
                    <span className="font-bold text-stone-800">{bookingData.departureDate} from {bookingData.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Pilgrims:</span>
                    <span className="font-bold text-stone-800">{bookingData.pilgrimsCount} Seats (Lead: {bookingData.leadName})</span>
                  </div>
                  {bookingData.gotram && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Sankalpam Gotram:</span>
                      <span className="font-bold text-amber-900">{bookingData.gotram} Gotram</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-amber-200 pt-1.5 font-bold">
                    <span className="text-stone-700">Token Paid:</span>
                    <span className="text-emerald-700">₹{calculateTotal(bookingModalPackage, bookingData.pilgrimsCount, bookingData.paymentType).toLocaleString()} (Confirmed)</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    suppressHydrationWarning
                    onClick={() => setBookingModalPackage(null)}
                    className="flex-1 bg-[#78131e] text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer"
                  >
                    Done & Back to Yatralu
                  </button>
                  <Link
                    href="/"
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold py-2.5 rounded-xl text-center"
                  >
                    Go to Homepage
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
