'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, X, Landmark, BookOpen, Calendar, ShoppingBag, 
  ChevronRight, TrendingUp, Sparkles, MapPin, Tag, ArrowRight, CornerDownLeft
} from 'lucide-react';

import { allTemplesData } from '../data/templesData';
import { shaktiPeethasData } from '../data/shaktiPeethasData';
import { allFestivalsData } from '../data/festivalsData';
import { allSlokasData } from '../data/slokasData';
import { marketplaceProducts } from '../data/marketplaceData';

const TRENDING_SEARCHES = [
  { label: 'Srisailam Bhramaramba', category: 'temple' },
  { label: 'Maha Shivaratri', category: 'festival' },
  { label: 'Rudraksha Mala', category: 'product' },
  { label: 'Kara Darshana Sloka', category: 'sloka' },
  { label: 'Kashi Vishwanath', category: 'temple' },
  { label: 'Satyanarayana Pooja Kit', category: 'product' },
  { label: 'Gayatri Mantra', category: 'sloka' },
  { label: 'Kamakshi Amman', category: 'temple' },
  { label: 'Kedarnath Jyotirlinga', category: 'temple' },
];

export default function GlobalSmartSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Unified searchable dataset
  const searchableIndex = useMemo(() => {
    const list = [];

    // 1. Temples & Peethas (merge without duplicates by id/slug)
    const seenTempleIds = new Set();

    // First, Shakti Peethas
    shaktiPeethasData.forEach(p => {
      const id = p.id || p.slug;
      seenTempleIds.add(id);
      list.push({
        id,
        category: 'temple',
        categoryLabel: 'Temples & Peethas',
        title: p.name,
        teluguTitle: p.teluguName,
        subtitle: `${p.city || p.location || ''}${p.state ? ', ' + p.state : ''} • ${p.deity || ''}`,
        href: `/temples/${id}`,
        badge: p.peethaNumber ? `Peetha #${p.peethaNumber}` : 'Shakti Peetha',
        badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
        icon: Landmark,
        thumbnail: p.image || '/images/temple_srisailam.jpg',
        searchTerms: [
          p.name, p.teluguName, p.deity, p.location, p.city, p.state, 
          p.relicFallen, p.relicTelugu, p.stotramVerse, p.summary
        ].filter(Boolean).join(' ')
      });
    });

    // Then, Other Mahakshetras / Jyotirlingas
    allTemplesData.forEach(t => {
      if (!seenTempleIds.has(t.id)) {
        seenTempleIds.add(t.id);
        const isJyotirlinga = t.circuits?.includes('jyotirlingas');
        list.push({
          id: t.id,
          category: 'temple',
          categoryLabel: 'Temples & Peethas',
          title: t.name,
          teluguTitle: t.templeComplex,
          subtitle: `${t.city || ''}${t.state ? ', ' + t.state : ''} • ${t.deity || ''}`,
          href: `/temples/${t.id}`,
          badge: isJyotirlinga ? '12 Jyotirlinga' : (t.circuits?.[0] || 'Sacred Kshetra'),
          badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: Landmark,
          thumbnail: t.image || '/images/temple_srisailam.jpg',
          searchTerms: [
            t.name, t.templeComplex, t.deity, t.city, t.state, 
            t.relic, t.description, t.prasadam
          ].filter(Boolean).join(' ')
        });
      }
    });

    // 2. Slokas & Chants
    allSlokasData.forEach(s => {
      list.push({
        id: s.id,
        category: 'sloka',
        categoryLabel: 'Slokas & Chants',
        title: s.title,
        teluguTitle: s.teluguTitle,
        subtitle: `${s.sanskritTitle || ''} • Deity: ${s.deity || 'Universal'} (${s.occasion || 'Daily'})`,
        href: `/slokas?search=${encodeURIComponent(s.title)}`,
        badge: 'Daily Sloka',
        badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
        icon: BookOpen,
        thumbnail: null,
        searchTerms: [
          s.title, s.sanskritTitle, s.teluguTitle, s.deity, 
          s.occasion, s.meaning, s.telEng, s.sanskrit, s.telugu
        ].filter(Boolean).join(' ')
      });
    });

    // 3. Festivals Calendar
    allFestivalsData.forEach(f => {
      list.push({
        id: f.id,
        category: 'festival',
        categoryLabel: 'Festivals & Vratams',
        title: f.name,
        teluguTitle: f.teluguName,
        subtitle: `${f.sanskritName || ''} • ${f.tithi || ''} • ${f.month || ''} (${f.deity || ''})`,
        href: `/festivals/${f.id}`,
        badge: 'Festival Calendar',
        badgeColor: 'bg-yellow-50 text-yellow-900 border-yellow-200',
        icon: Calendar,
        thumbnail: null,
        searchTerms: [
          f.name, f.sanskritName, f.teluguName, f.tithi, f.month, 
          f.deity, f.significance, f.summary
        ].filter(Boolean).join(' ')
      });
    });

    // 4. Marketplace Products
    marketplaceProducts.forEach(p => {
      list.push({
        id: p.id,
        category: 'product',
        categoryLabel: 'Sacred Products',
        title: p.name,
        teluguTitle: null,
        subtitle: `₹${p.price?.toLocaleString('en-IN')} ${p.originalPrice ? '(Was ₹' + p.originalPrice + ')' : ''} • ${p.certified || p.subtitle || ''}`,
        href: `/marketplace?search=${encodeURIComponent(p.name)}`,
        badge: p.discount || '100% Satvik',
        badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        icon: ShoppingBag,
        thumbnail: p.image || '/images/poojakit.png',
        searchTerms: [
          p.name, p.subtitle, p.description, p.category, p.certified, 
          ...(p.features || [])
        ].filter(Boolean).join(' ')
      });
    });

    return list;
  }, []);

  // Filtered and Scored Results
  const { filteredResults, countsByCategory, groupedResults } = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    // Counts for category badges
    const counts = { all: 0, temple: 0, sloka: 0, festival: 0, product: 0 };

    if (!q) {
      return { 
        filteredResults: [], 
        countsByCategory: counts, 
        groupedResults: { temple: [], sloka: [], festival: [], product: [] } 
      };
    }

    const tokens = q.split(/\s+/).filter(Boolean);

    const scored = [];
    searchableIndex.forEach(item => {
      const fullText = (item.title + ' ' + (item.teluguTitle || '') + ' ' + item.searchTerms).toLowerCase();
      
      // Check if all tokens match
      const allTokensMatch = tokens.every(token => fullText.includes(token));
      if (!allTokensMatch) return;

      // Calculate score for relevance sorting
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const teluguLower = (item.teluguTitle || '').toLowerCase();

      if (titleLower === q || teluguLower === q) {
        score += 120;
      } else if (titleLower.startsWith(q)) {
        score += 80;
      } else if (titleLower.includes(q)) {
        score += 50;
      }

      if (tokens.some(t => titleLower.includes(t))) score += 30;
      if (item.subtitle.toLowerCase().includes(q)) score += 20;

      counts[item.category] = (counts[item.category] || 0) + 1;
      counts.all += 1;

      scored.push({ ...item, score });
    });

    scored.sort((a, b) => b.score - a.score);

    // Grouping by category
    const grouped = {
      temple: scored.filter(i => i.category === 'temple'),
      sloka: scored.filter(i => i.category === 'sloka'),
      festival: scored.filter(i => i.category === 'festival'),
      product: scored.filter(i => i.category === 'product'),
    };

    // Category filter for the main flat list
    const filtered = activeCategory === 'all' 
      ? scored 
      : scored.filter(i => i.category === activeCategory);

    return { 
      filteredResults: filtered, 
      countsByCategory: counts, 
      groupedResults: grouped 
    };
  }, [query, activeCategory, searchableIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults.length > 0 && filteredResults[selectedIndex]) {
          const target = filteredResults[selectedIndex];
          onClose();
          router.push(target.href);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose, router]);

  // Click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 animate-in fade-in duration-200">
      <div 
        ref={containerRef}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#ebdcc7] overflow-hidden flex flex-col max-h-[85vh] transition-all"
      >
        {/* Search Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[#ebdcc7] bg-[#fcf8f2] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#78131e]/10 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5 text-[#78131e]" />
          </div>

          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search temples (Srisailam, Kashi), slokas, festivals (Shivaratri), pooja kits..."
              className="w-full bg-white border border-[#decab1] focus:border-[#78131e] focus:ring-2 focus:ring-[#78131e]/20 text-stone-900 text-sm sm:text-base font-medium rounded-xl px-4 py-2.5 outline-none placeholder:text-stone-400 pr-10 shadow-inner"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-lg border border-stone-200 transition"
          >
            <span>ESC</span>
          </button>
          <button
            onClick={onClose}
            className="sm:hidden p-1.5 text-stone-500 hover:text-stone-900"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Tabs (visible when user types or has search query) */}
        {query.trim().length > 0 && (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-stone-50/90 border-b border-stone-200 overflow-x-auto scrollbar-none text-xs">
            <span className="text-stone-500 font-medium text-[11px] uppercase tracking-wider mr-1 shrink-0">
              Filter:
            </span>
            {[
              { id: 'all', label: 'All Results', count: countsByCategory.all, icon: Sparkles },
              { id: 'temple', label: 'Temples & Peethas', count: countsByCategory.temple, icon: Landmark },
              { id: 'sloka', label: 'Slokas & Chants', count: countsByCategory.sloka, icon: BookOpen },
              { id: 'festival', label: 'Festivals', count: countsByCategory.festival, icon: Calendar },
              { id: 'product', label: 'Products', count: countsByCategory.product, icon: ShoppingBag },
            ].map(tab => {
              const TabIcon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setSelectedIndex(0);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-semibold ${
                    isActive
                      ? 'bg-[#78131e] text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Content Body: Trending/Empty or Grouped Results */}
        <div className="overflow-y-auto p-4 flex-1 divide-y divide-stone-100">
          {/* STATE 1: Empty Query - Show Trending & Fast Links */}
          {query.trim().length === 0 && (
            <div className="space-y-6 py-2">
              {/* Trending Devotional Searches */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#78131e]" />
                  <h3 className="text-xs font-bold text-stone-900 tracking-wider uppercase font-serif">
                    Popular Devotional Searches
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(item.label);
                        setActiveCategory('all');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-950 text-xs font-medium transition cursor-pointer group"
                    >
                      <Search className="w-3 h-3 text-amber-700 group-hover:text-[#78131e]" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Jump Sanctuary Sections */}
              <div>
                <h3 className="text-xs font-bold text-stone-500 tracking-wider uppercase mb-3">
                  Quick Sanctuary Navigations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Link
                    href="/sacred-temples"
                    onClick={onClose}
                    className="p-3 rounded-xl border border-stone-200 hover:border-amber-300 hover:bg-amber-50/50 transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-100 text-[#78131e] flex items-center justify-center font-bold">
                        🛕
                      </div>
                      <div>
                        <div className="text-sm font-bold text-stone-900 group-hover:text-[#78131e]">
                          18 Maha Shakti Peethas
                        </div>
                        <div className="text-xs text-stone-500">
                          Complete Darshan & Route Guides
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#78131e] group-hover:translate-x-0.5 transition" />
                  </Link>

                  <Link
                    href="/slokas"
                    onClick={onClose}
                    className="p-3 rounded-xl border border-stone-200 hover:border-amber-300 hover:bg-amber-50/50 transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
                        📜
                      </div>
                      <div>
                        <div className="text-sm font-bold text-stone-900 group-hover:text-[#78131e]">
                          Daily Slokas & Stotrams
                        </div>
                        <div className="text-xs text-stone-500">
                          Audio chanting, Telugu & English scripts
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#78131e] group-hover:translate-x-0.5 transition" />
                  </Link>

                  <Link
                    href="/festival-calendar"
                    onClick={onClose}
                    className="p-3 rounded-xl border border-stone-200 hover:border-amber-300 hover:bg-amber-50/50 transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-yellow-100 text-yellow-900 flex items-center justify-center font-bold">
                        🗓️
                      </div>
                      <div>
                        <div className="text-sm font-bold text-stone-900 group-hover:text-[#78131e]">
                          Sanatana Festival Calendar
                        </div>
                        <div className="text-xs text-stone-500">
                          Upcoming holy tithis & vratams 2026
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#78131e] group-hover:translate-x-0.5 transition" />
                  </Link>

                  <Link
                    href="/marketplace"
                    onClick={onClose}
                    className="p-3 rounded-xl border border-stone-200 hover:border-amber-300 hover:bg-amber-50/50 transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        🛍️
                      </div>
                      <div>
                        <div className="text-sm font-bold text-stone-900 group-hover:text-[#78131e]">
                          100% Satvik Pooja Store
                        </div>
                        <div className="text-xs text-stone-500">
                          Lab-certified Rudrakshas & Pooja Kits
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#78131e] group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* STATE 2: Query entered but no results */}
          {query.trim().length > 0 && filteredResults.length === 0 && (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-800">
                No matching results found for &ldquo;{query}&rdquo;
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try searching for temples (e.g. Srisailam, Kashi, Kanchi), slokas (Gayatri, Karagre), festivals (Shivaratri), or pooja kits.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={() => setQuery('Srisailam')}
                  className="px-3 py-1 bg-amber-50 text-[#78131e] text-xs font-semibold rounded-full border border-amber-200 hover:bg-amber-100"
                >
                  Search &ldquo;Srisailam&rdquo;
                </button>
                <button
                  onClick={() => setQuery('Rudraksha')}
                  className="px-3 py-1 bg-amber-50 text-[#78131e] text-xs font-semibold rounded-full border border-amber-200 hover:bg-amber-100"
                >
                  Search &ldquo;Rudraksha&rdquo;
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: Grouped or Categorized Results */}
          {query.trim().length > 0 && filteredResults.length > 0 && (
            <div className="space-y-4 py-2">
              {/* If "all" category is selected: show organized groups */}
              {activeCategory === 'all' ? (
                <>
                  {/* GROUP 1: TEMPLES & PEETHAS */}
                  {groupedResults.temple.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between pb-1 px-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 tracking-wider uppercase font-serif">
                          <span>🛕</span>
                          <span>Temples &amp; Peethas</span>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded-full">
                            {groupedResults.temple.length}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveCategory('temple')}
                          className="text-[11px] font-semibold text-[#78131e] hover:underline"
                        >
                          View all temples &rarr;
                        </button>
                      </div>

                      <div className="space-y-1">
                        {groupedResults.temple.slice(0, 4).map((item) => (
                          <ResultRowItem 
                            key={item.id} 
                            item={item} 
                            query={query} 
                            onSelect={() => {
                              onClose();
                              router.push(item.href);
                            }} 
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GROUP 2: SLOKAS & CHANTS */}
                  {groupedResults.sloka.length > 0 && (
                    <div className="space-y-1.5 pt-3">
                      <div className="flex items-center justify-between pb-1 px-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 tracking-wider uppercase font-serif">
                          <span>📜</span>
                          <span>Daily Slokas &amp; Chants</span>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded-full">
                            {groupedResults.sloka.length}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveCategory('sloka')}
                          className="text-[11px] font-semibold text-[#78131e] hover:underline"
                        >
                          View all slokas &rarr;
                        </button>
                      </div>

                      <div className="space-y-1">
                        {groupedResults.sloka.slice(0, 3).map((item) => (
                          <ResultRowItem 
                            key={item.id} 
                            item={item} 
                            query={query} 
                            onSelect={() => {
                              onClose();
                              router.push(item.href);
                            }} 
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GROUP 3: FESTIVALS */}
                  {groupedResults.festival.length > 0 && (
                    <div className="space-y-1.5 pt-3">
                      <div className="flex items-center justify-between pb-1 px-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 tracking-wider uppercase font-serif">
                          <span>🗓️</span>
                          <span>Festivals &amp; Vratams</span>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded-full">
                            {groupedResults.festival.length}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveCategory('festival')}
                          className="text-[11px] font-semibold text-[#78131e] hover:underline"
                        >
                          View all festivals &rarr;
                        </button>
                      </div>

                      <div className="space-y-1">
                        {groupedResults.festival.slice(0, 3).map((item) => (
                          <ResultRowItem 
                            key={item.id} 
                            item={item} 
                            query={query} 
                            onSelect={() => {
                              onClose();
                              router.push(item.href);
                            }} 
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GROUP 4: PRODUCTS */}
                  {groupedResults.product.length > 0 && (
                    <div className="space-y-1.5 pt-3">
                      <div className="flex items-center justify-between pb-1 px-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 tracking-wider uppercase font-serif">
                          <span>🛍️</span>
                          <span>Sacred Marketplace</span>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded-full">
                            {groupedResults.product.length}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveCategory('product')}
                          className="text-[11px] font-semibold text-[#78131e] hover:underline"
                        >
                          View all products &rarr;
                        </button>
                      </div>

                      <div className="space-y-1">
                        {groupedResults.product.slice(0, 3).map((item) => (
                          <ResultRowItem 
                            key={item.id} 
                            item={item} 
                            query={query} 
                            onSelect={() => {
                              onClose();
                              router.push(item.href);
                            }} 
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Specific Category View (List All in this category) */
                <div className="space-y-1">
                  {filteredResults.map((item, idx) => (
                    <ResultRowItem 
                      key={item.id} 
                      item={item} 
                      query={query} 
                      isSelected={idx === selectedIndex}
                      onSelect={() => {
                        onClose();
                        router.push(item.href);
                      }} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Modal Footer Bar */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3 text-stone-400" />
              <span>Select</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <span>↑↓ Navigate</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">ESC to Close</span>
          </div>

          <div className="font-serif text-[#78131e] font-semibold flex items-center gap-1">
            <span>✨ Ashtadasa Peetham Global Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for individual search result row
function ResultRowItem({ item, query, isSelected, onSelect }) {
  const Icon = item.icon;

  return (
    <div
      onClick={onSelect}
      className={`group px-3 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
        isSelected
          ? 'bg-amber-50/90 border-amber-300 shadow-xs'
          : 'bg-white hover:bg-stone-50/80 border-stone-150 hover:border-stone-300'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Thumbnail or Category Icon */}
        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-stone-100 flex items-center justify-center">
          {item.thumbnail ? (
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
          ) : (
            <Icon className="w-5 h-5 text-[#78131e]" />
          )}
        </div>

        {/* Text and Details */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#78131e] transition-colors truncate">
              {item.title}
            </span>
            {item.teluguTitle && (
              <span className="text-[11px] text-stone-500 font-serif hidden sm:inline">
                ({item.teluguTitle})
              </span>
            )}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor} shrink-0`}>
              {item.badge}
            </span>
          </div>

          <p className="text-[11px] text-stone-500 truncate mt-0.5">
            {item.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-stone-400 group-hover:text-[#78131e] shrink-0 transition-transform group-hover:translate-x-1">
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
