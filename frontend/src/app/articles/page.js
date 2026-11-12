'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Search, Sparkles, Clock, Calendar, 
  ChevronRight, Filter, Eye, ArrowLeft, Heart, Share2, Check 
} from 'lucide-react';
import AdBanner from '../../components/AdBanner';
import { getAllCategories } from '../../data/categoriesData';

export default function AllArticlesPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSlug, setCopiedSlug] = useState(null);

  const categories = getAllCategories();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/posts?status=published&limit=200')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setPosts(data.data);
        }
      })
      .catch((err) => {
        console.warn('Failed to load posts from API, checking local storage:', err);
        try {
          const stored = localStorage.getItem('astada_custom_posts');
          if (stored) {
            setPosts(JSON.parse(stored));
          }
        } catch (e) {}
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const pCat = (post.category || '').toLowerCase();
      const matchesCat = activeCategory === 'all' || pCat === activeCategory.toLowerCase();
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        (post.title || '').toLowerCase().includes(q) ||
        (post.titleTelugu || '').toLowerCase().includes(q) ||
        (post.deity || '').toLowerCase().includes(q) ||
        (post.excerpt || '').toLowerCase().includes(q) ||
        (Array.isArray(post.tags) && post.tags.some(t => t.toLowerCase().includes(q)));

      return matchesCat && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const handleShare = (slug, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/${slug}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedSlug(slug);
        setTimeout(() => setCopiedSlug(null), 2000);
      });
    }
  };

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen pb-16">
      {/* Top Sponsored Ad */}
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-[#180A24] via-[#2A113E] to-[#140620] text-white py-10 px-4 border-b border-[#32174D] relative overflow-hidden shadow-md">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center space-x-2 text-xs text-amber-300 font-mono uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sanctuary Home</span>
            </Link>
            <span>/</span>
            <span className="text-purple-200">Sacred Publications</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full font-mono tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  All Publications ({posts.length})
                </span>
                <span className="text-xs text-purple-200/80">• 17 Categories Synchronized</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white">
                Devotional Articles &amp; Sacred Writings
              </h1>
              <p className="text-xs sm:text-sm text-purple-100/90 mt-1 max-w-2xl leading-relaxed">
                Explore in-depth articles on 18 Maha Shakti Peethas, sacred puja vidhis, temple sthalapurana, Vedic mantras, and astrological remedies.
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <Search className="w-4 h-4 text-purple-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, deities, mantras..."
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-stone-900 placeholder-purple-300 focus:placeholder-stone-400 border border-purple-400/30 focus:border-amber-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium transition-all shadow-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Category Pills Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-stone-200">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center space-x-1.5 shadow-2xs ${
              activeCategory === 'all'
                ? 'bg-[#78131e] text-white'
                : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-200'
            }`}
          >
            <span>✨</span>
            <span>All Articles ({posts.length})</span>
          </button>

          {categories.map(cat => {
            const count = posts.filter(p => (p.category || '').toLowerCase() === cat.id.toLowerCase()).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center space-x-1.5 shadow-2xs ${
                  activeCategory === cat.id
                    ? 'bg-[#78131e] text-white'
                    : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200/60 text-xs text-stone-500">
          <span className="font-semibold">
            Showing <strong className="text-stone-900">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'article' : 'articles'}
            {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.label || activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs font-bold text-stone-600 font-serif">Loading sacred publications...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 shadow-2xs p-8 max-w-xl mx-auto">
            <div className="text-4xl mb-3">📜</div>
            <h3 className="font-serif font-black text-lg text-stone-900">No Articles Found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              We couldn't find any articles matching your search query or category filter. Try selecting another category or clearing the search.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-2xs cursor-pointer"
            >
              View All Articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredPosts.map((post) => {
              const catSlug = post.category || 'temples';
              const articleHref = `/${catSlug}/${post.slug}`;
              const formattedDate = post.createdAt 
                ? new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                : 'Sacred Archive';

              return (
                <div
                  key={post._id || post.id || post.slug}
                  className="bg-white rounded-2xl border border-[#EBDCC7] overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <Link href={articleHref} className="block relative h-44 w-full overflow-hidden bg-stone-100">
                      <img
                        src={post.featuredImage || '/images/temple_kashi.jpg'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/images/temple_tirupati.jpg';
                        }}
                      />
                      <span className="absolute top-2.5 left-2.5 bg-[#78131e] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                        {post.category || 'Temples'}
                      </span>
                      <span className="absolute bottom-2 right-2.5 text-[9px] font-medium text-white/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {formattedDate}
                      </span>
                    </Link>

                    {/* Card Body */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span className="font-semibold text-amber-800 truncate max-w-[160px]">
                          {post.deity || 'Parashakti'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          3 mins read
                        </span>
                      </div>

                      <Link href={articleHref} className="block">
                        <h3 className="font-serif font-black text-sm text-stone-900 group-hover:text-[#78131e] line-clamp-2 leading-snug transition-colors">
                          {post.title}
                        </h3>
                      </Link>

                      {post.titleTelugu && (
                        <p className="text-[11px] font-medium text-amber-950 font-serif line-clamp-1">
                          {post.titleTelugu}
                        </p>
                      )}

                      <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                        {post.excerpt || (post.content ? post.content.slice(0, 100) : '')}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <Link
                      href={articleHref}
                      className="text-xs font-black text-[#78131e] group-hover:underline flex items-center gap-1 font-serif"
                    >
                      <span>Read Article</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    <button
                      onClick={(e) => handleShare(articleHref.replace(/^\//, ''), e)}
                      title="Share Article Link"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-amber-800 hover:bg-amber-50 transition cursor-pointer"
                    >
                      {copiedSlug === articleHref.replace(/^\//, '') ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* In-Feed Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <AdBanner slotId="slot-5" type="bottom-banner" />
      </div>
    </div>
  );
}
