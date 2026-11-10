'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  Flame, BookOpen, Sparkles, CheckCircle2, ChevronRight, 
  Calendar, Heart, Clock, Search, HelpCircle, Utensils
} from 'lucide-react';

export const vrathaluList = [
  {
    id: 'satyanarayana',
    title: 'Sri Satyanarayana Swamy Vratam',
    telugu: 'శ్రీ సత్యనారాయణ స్వామి వ్రతం',
    deity: 'Lord Sri Satyanarayana (Maha Vishnu)',
    category: 'vishnu',
    timing: 'Pournami (Full Moon) / Any Auspicious Evening',
    fastingType: 'Fasting until evening Katha & Prasadam distribution',
    summary: 'The most sacred and universally celebrated Vaishnava vratam for family prosperity, freedom from troubles, and fulfillment of heartfelt vows.',
    samagri: ['Turmeric & Kumkum', 'Betel leaves & Supari', 'Coconuts (5)', 'Panchaamritam (Milk, Curd, Ghee, Honey, Sugar)', 'Rawa / Wheat flour Prasadam', 'Navadhanyas', 'Tulasi leaves'],
    vidhi: [
      'Cleanse the altar and draw a sacred Swastika or Ashtadala Padma.',
      'Establish the Kalasham adorned with mango leaves and coconut.',
      'Perform Ganapati Pooja first to clear obstacles.',
      'Recite the 5 sacred Adhyayas (Chapters) of Satyanarayana Katha.',
      'Offer Sapada Prasadam (wheat flour, ghee, sugar, banana, milk) and distribute to devotees.'
    ],
    phala: 'Bestows peace of mind, removes financial distress, promotes children’s education, and blesses with Moksha.'
  },
  {
    id: 'varalakshmi',
    title: 'Sri Varalakshmi Vratam',
    telugu: 'శ్రీ వరలక్ష్మీ వ్రతం',
    deity: 'Goddess Varalakshmi (Ashta Lakshmi)',
    category: 'devi',
    timing: 'Second Friday of Sravana Masam (Shukla Paksha)',
    fastingType: 'Strict Upavasam until Thoram tying & Mahanaivedyam',
    summary: 'The supreme festival for married women and households invoking the 8 Divine forms of Lakshmi for Soubhagyam, health, and endless wealth.',
    samagri: ['Lakshmi Kalasham & Silver/Gold Face', 'Yellow Holy Threads (Thorams with 9 knots)', 'Panchamritam', 'Fresh lotus flowers', '9 varieties of offerings (Pulihora, Garelu, Payasam)', 'Haldi-Kumkum packets'],
    vidhi: [
      'Install the Goddess upon a silver/brass pot filled with sacred rice, turmeric, and dry fruits.',
      'Tie the sacred 9-knot Thoram around the right wrist while chanting Lakshmi Ashtotharam.',
      'Recite Sri Suktam and Lakshmi Sahasranama Stotram.',
      'Perform Suvasini Pooja by inviting married women and offering tamboolam.'
    ],
    phala: 'Blesses with deergha sumangali prapti, domestic harmony, bountiful wealth, and removes all daridra doshas.'
  },
  {
    id: 'ekadashi',
    title: 'Nitya & Maha Ekadashi Upavasam',
    telugu: 'ఏకాదశీ ఉపవాస వ్రత దీక్ష',
    deity: 'Lord Sri Maha Vishnu',
    category: 'fasting',
    timing: 'Shukla & Krishna Ekadashi (Twice a month)',
    fastingType: 'Nirjala (Waterless) or Phalahara (Fruit diet); No rice or grains',
    summary: 'The king of all spiritual fasts (Vrata Raja) described in Brahma Vaivarta Purana that cleanses inner sins and attunes the soul with Vishnu Loka.',
    samagri: ['Tulasi dalams', 'Pure cow ghee deepam', 'Fresh fruits', 'Ganga / Sacred water'],
    vidhi: [
      'Begin fasting from sunrise on Ekadashi after a pure bath.',
      'Strictly avoid rice, grains, onions, and non-satvik foods.',
      'Spend the night in Jagaran (devotional wakefulness) chanting Vishnu Sahasranamam.',
      'Break fast (Parana) on Dwadashi during the specified Harivasara window.'
    ],
    phala: 'Equal to performing hundreds of Ashwamedha Yagas; bestows liberation from the cycle of rebirth.'
  },
  {
    id: 'sankashti',
    title: 'Sankashti Ganesha Chaturthi Vratam',
    telugu: 'సంకష్టహర చతుర్థి వ్రతం',
    deity: 'Lord Maha Ganapati',
    category: 'ganesha',
    timing: 'Krishna Paksha Chaturthi (Monthly 4th day after Full Moon)',
    fastingType: 'Fasting from morning until Moonrise; break after Chandra Darshan',
    summary: 'A powerful penance dedicated to Lord Ganesha that dispels insurmountable hurdles, debt, physical sickness, and court litigations.',
    samagri: ['Garika (Bermuda grass) bundles', 'Modakas / Kudumulu (21)', 'Red hibiscus flowers', 'Sandalwood paste', 'Raw milk for Arghya'],
    vidhi: [
      'Maintain day-long silence or japa of Om Gam Ganapataye Namaha.',
      'In the evening after sighting the Moon, offer Arghya to Lord Chandra and Lord Ganesha.',
      'Recite Sankatanashana Ganesha Stotram 3 times.',
      'Partake in modaka prasadam with family.'
    ],
    phala: 'Dissolves all crisis (sankatas), cures long-standing chronic diseases, and brings success in career.'
  },
  {
    id: 'pradosham',
    title: 'Soma & Shani Pradosha Vratam',
    telugu: 'సోమ & శని ప్రదోష వ్రతం',
    deity: 'Lord Parameshwara & Mata Parvati',
    category: 'shiva',
    timing: 'Trayodashi Tithi during Sandhya Kalam (Twilight)',
    fastingType: 'Strict water fasting until sunset Shiva Abhishekam',
    summary: 'The holy twilight window when Lord Shiva dances the divine Ananda Tandava upon Mount Kailasha, granting forgiveness for karmic debts.',
    samagri: ['Bilva leaves', 'Bhasmam (Vibhuti)', 'Panchamritam', 'Sugandham', 'Ghee lamps'],
    vidhi: [
      'Fast through the daytime meditating on Panchakshari Mantra.',
      'Visit a Shiva temple during Pradosha Kalam (1.5 hours before and after sunset).',
      'Witness Nandi and Shiva Linga abhishekam; offer 108 bilva leaves.'
    ],
    phala: 'Removes severe Shani doshas, pitru doshas, and brings boundless peace and rejuvenation.'
  },
  {
    id: 'mangalagowri',
    title: 'Sravana Mangalagowri Vratam',
    telugu: 'శ్రావణ మంగళగౌరీ వ్రతం',
    deity: 'Mata Gowri Devi',
    category: 'devi',
    timing: 'Every Tuesday of Sravana Masam for 5 consecutive years',
    fastingType: 'Salt-less or Ekabhukta (single meal) fasting',
    summary: 'Performed by newly married women for eternal marital bliss, prosperity, and the healthy longevity of their husband.',
    samagri: ['Clay Gowri idol', 'Pappuchekka lamps', 'Wheat flour deepams (16)', '16 types of flowers & fruits', 'Tamboolams (16)'],
    vidhi: [
      'Prepare 16 lamps made of sweetened wheat flour and ghee.',
      'Chant Mangalagowri Ashtotharam and perform pradakshinas.',
      'Offer Tamboolam and blouse pieces to 16 married women.'
    ],
    phala: 'Ensures lifelong protection of marriage, radiant health, and auspicious progeny.'
  }
];

export default function VrathaluPoojasPage() {
  const [selectedVratam, setSelectedVratam] = useState(vrathaluList[0]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = vrathaluList.filter(item => {
    const tabMatch = activeTab === 'all' || item.category === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const searchMatch = !q || item.title.toLowerCase().includes(q) || item.telugu.includes(q) || item.deity.toLowerCase().includes(q);
    return tabMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-stone-900 pb-16">
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#200A18] via-[#380E23] to-[#200A18] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Sanatana Upavasam &amp; Vrata Vidhanam</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
            Sacred Vrathalu &amp; Pooja Vidhi
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Complete step-by-step guidance for Satyanarayana Vratam, Varalakshmi Pooja, Ekadashi Fasting, Pradosham, and sacred domestic rituals with authentic samagri lists and kathas.
          </p>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex p-1 bg-white rounded-2xl border border-stone-200 text-xs font-bold gap-1 shadow-2xs overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Vrathams' },
              { id: 'devi', label: '🌺 Lakshmi & Devi' },
              { id: 'vishnu', label: '🪷 Vishnu & Satyanarayana' },
              { id: 'shiva', label: '🔱 Shiva & Pradosham' },
              { id: 'ganesha', label: '🐘 Ganesha' },
              { id: 'fasting', label: '🌿 Ekadashi Fasting' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-[#78131e] text-white shadow-2xs' : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vratam, deity, vidhi..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Selected Vratam Detailed Guide */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d5bc] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-serif font-black text-stone-900">
                  {selectedVratam.title}
                </h2>
                <span className="text-sm font-serif font-bold text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedVratam.telugu}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Presiding Deity: <strong className="text-stone-800">{selectedVratam.deity}</strong> • Auspicious Timing: <strong className="text-amber-800">{selectedVratam.timing}</strong>
              </p>
            </div>

            <Link
              href="/marketplace"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs px-4 py-2 rounded-xl shadow-xs transition-all whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5"
            >
              <span>Order Complete Pooja Kit</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-950" />
            </Link>
          </div>

          {/* Vratam Fasting Rule Banner */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-2xl border border-amber-200 flex items-start gap-3">
            <Utensils className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-amber-900 block">Upavasa Niyama (Fasting Guidelines)</span>
              <p className="text-xs font-semibold text-stone-800 mt-0.5">
                {selectedVratam.fastingType}
              </p>
            </div>
          </div>

          {/* Samagri & Step-by-Step Vidhi */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
              <h3 className="font-serif font-black text-sm text-stone-900 flex items-center gap-2">
                <span>🪔</span> Sacred Samagri List
              </h3>
              <ul className="space-y-1.5 text-xs text-stone-700 font-medium">
                {selectedVratam.samagri.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-8 bg-white p-5 rounded-2xl border border-[#ebdcc7] space-y-3">
              <h3 className="font-serif font-black text-sm text-stone-900 flex items-center gap-2">
                <span>📜</span> Step-by-Step Pooja Vidhanam
              </h3>
              <div className="space-y-2.5">
                {selectedVratam.vidhi.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-stone-800 font-medium leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#78131e] text-amber-100 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 mt-4 font-serif">
                <strong>Vrata Phala Shruti (Divine Fruits):</strong> {selectedVratam.phala}
              </div>
            </div>
          </div>
        </section>

        {/* All Vrathams Grid */}
        <section className="space-y-4">
          <h3 className="font-serif font-black text-lg text-stone-900">
            Explore All Sanatana Vrathams
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((vratam) => (
              <div
                key={vratam.id}
                onClick={() => setSelectedVratam(vratam)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                  selectedVratam.id === vratam.id
                    ? 'bg-[#fbf5ee] border-amber-400 shadow-sm'
                    : 'bg-white border-[#ebdcc7] hover:border-amber-400 hover:bg-stone-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-serif font-black text-base text-stone-900">
                    {vratam.title}
                  </h4>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    {vratam.category}
                  </span>
                </div>
                <span className="text-xs font-serif font-bold text-amber-900 block mb-2">
                  {vratam.telugu}
                </span>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {vratam.summary}
                </p>
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#78131e]">
                  <span>View Vidhi &amp; Samagri</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdBanner slotId="slot-4" type="in-feed-2" />
      </div>
    </div>
  );
}
