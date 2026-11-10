'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  Music, Play, Pause, Volume2, Sparkles, Heart, 
  ChevronRight, Radio, Search, Headphones
} from 'lucide-react';

export const bhajansList = [
  {
    id: 'brahmamokkate',
    title: 'Brahmam Okkate Para Brahmam Okkate',
    telugu: 'బ్రహ్మమొక్కటే పరబ్రహ్మమొక్కటే',
    composer: 'Tallapaka Annamacharya',
    deity: 'Lord Sri Venkateswara (Balaji)',
    raga: 'Bowli / Nadanamakriya',
    tala: 'Adi Tala',
    theme: 'Supreme Universal Oneness & Equality before God',
    lyricsTelugu: 'బ్రహ్మమొక్కటే పరబ్రహ్మమొక్కటే పరబ్రహ్మమొక్కటే పరబ్రహ్మమొక్కటే॥ నిండార రాజు నిద్రించు నిద్రయు నొకటే, అండనే బంటు నిద్ర అదియు నొకటే। మెండైన బ్రాహ్మణుడు మెట్టు భూమి యొకటే, చండాలుడుండేటి సరిభూమి యొకటే॥',
    lyricsEnglish: 'Brahmam okkate para brahmam okkate, Nindaara raaju nidrinchu nidrayu nokate, Andane bantu nidra adiyu nokate, Mendaina braahmanudu mettu bhoomi yokate, Chandaaludundeti sari bhoomi yokate...',
    meaning: 'The Supreme Spirit is One and Absolute. The slumber of a mighty emperor and that of a humble servant are identical; the sacred soil trodden by a high scholar is the very same earth upon which the simplest soul walks.'
  },
  {
    id: 'nagumomu',
    title: 'Nagumomu Ganaleni Naa Manasu',
    telugu: 'నగుమోము గనలేని నా మనసు',
    composer: 'Saint Tyagaraja',
    deity: 'Lord Sri Rama',
    raga: 'Abheri',
    tala: 'Adi Tala',
    theme: 'Pure Heartfelt Longing (Viraha Bhakti) for Rama’s Darshan',
    lyricsTelugu: 'నగుమోము గనలేని నా జాలి దెలిసి నన్ను బ్రోవగ రాదా శ్రీ రఘువర॥ నగరాజధర నీదు పరివారమెల్ల ఒగి బోధన జేసే వారలౌరో॥',
    lyricsEnglish: 'Nagumomu ganaleni naa jaali delisi nannu brovaga raadaa Shree Raghuvara, Nagaraajadhara needu parivaaramella ogi bodhana jese vaaralauro...',
    meaning: 'Knowing the anguish of my heart that cannot bear to live without beholding your smiling countenance, will you not come and protect me, O Jewel of Raghu dynasty?'
  },
  {
    id: 'paluke-bangaramaayena',
    title: 'Paluke Bangaaramaayena',
    telugu: 'పలుకే బంగారమాయెనా కోదండపాణి',
    composer: 'Bhakta Ramadasu (Kancharla Gopanna)',
    deity: 'Lord Sri Rama (Bhadrachalam)',
    raga: 'Anandabhairavi',
    tala: 'Adi Tala',
    theme: 'Total Surrender (Sharanagati) from Prison Solitude',
    lyricsTelugu: 'పలుకే బంగారమాయెనా కోదండపాణి, పలుకే బంగారమాయె పిలిచిన బలుకవేమి। కలలోన నీ నామస్మరణ మరువను చక్రధర॥',
    lyricsEnglish: 'Paluke bangaaramaayena Kodandapaani, Paluke bangaaramaaye pilichina balukavemi, Kalalona nee naamasmarana maruvanu Chakradhara...',
    meaning: 'Has your speech turned into precious gold, O Rama, wielder of the Kodanda bow? Even in dreams I never forget your holy name, yet why do you stay silent?'
  },
  {
    id: 'bho-shambo',
    title: 'Bho Shambo Shiva Shambo Swayam Bho',
    telugu: 'భో శంభో శివ శంభో స్వయంభో',
    composer: 'Swami Dayananda Saraswati',
    deity: 'Lord Parameshwara (Shiva)',
    raga: 'Revati',
    tala: 'Adi Tala',
    theme: 'Ecstatic Divine Praise of Lord Shiva as Consciousness',
    lyricsTelugu: 'భో శంభో శివ శంభో స్వయంభో, గంగాధర శంకర కరుణాకర భువనైక వంద్య పరిపాలయ మామ్। నీలకంఠ ధరణీధర హర కైలాసపతి కరుణామృత పూర॥',
    lyricsEnglish: 'Bho Shambo Shiva Shambo Swayambho, Gangaadhara Shankara Karunaakara Bhuvanaika Vandya Paripaalaya Maam, Neelakantha Dharaneedhara Hara Kailaaspati Karunaamrita Poora...',
    meaning: 'O Self-born Lord Shambho, bearer of the celestial Ganga, ocean of divine compassion, sole worshipful lord of the universe, protect and enlighten me!'
  }
];

export default function BhajansPage() {
  const [selectedBhajan, setSelectedBhajan] = useState(bhajansList[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVoice = (text) => {
    if (typeof window === 'undefined') return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.8;
    utt.pitch = 1.05;
    utt.onend = () => setIsPlaying(false);
    utt.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(utt);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-stone-900 pb-16">
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E081F] via-[#350F38] to-[#1E081F] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>Naada Brahma • Bhakti Sangeetam</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
            Divine Bhajans &amp; Annamayya Kirtanas
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Timeless Carnatic kirtanas, Tyagaraja and Ramadasu kritis, and divine stutis with lyrical meanings, ragas, and authentic audio recitation.
          </p>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Selected Bhajan Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d5bc] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-serif font-black text-stone-900">
                  {selectedBhajan.title}
                </h2>
                <span className="text-sm font-serif font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedBhajan.telugu}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 font-medium">
                Vaggeyakara: <strong className="text-stone-800">{selectedBhajan.composer}</strong> • Raga: <strong className="text-amber-800">{selectedBhajan.raga}</strong> ({selectedBhajan.tala})
              </p>
            </div>

            <button
              onClick={() => handlePlayVoice(selectedBhajan.lyricsEnglish)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-xs ${
                isPlaying ? 'bg-amber-600 text-white animate-pulse' : 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Listen Bhajan Audio'}</span>
            </button>
          </div>

          {/* Telugu Lyrics Card */}
          <div className="p-6 bg-gradient-to-br from-[#fffdfa] to-[#faf3eb] rounded-3xl border border-[#ebdcc7] space-y-3 text-center">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-800 tracking-wider block">
              Telugu Sahityam (సాహిత్యం)
            </span>
            <p className="text-base sm:text-xl font-serif font-black text-[#5a0c14] leading-relaxed">
              {selectedBhajan.lyricsTelugu}
            </p>
            <p className="text-xs font-mono text-stone-600 italic pt-2">
              {selectedBhajan.lyricsEnglish}
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs sm:text-sm text-stone-800 font-serif leading-relaxed">
            <strong className="text-stone-900 font-sans block mb-1">Divine Meaning &amp; Bhava (భావం):</strong>
            {selectedBhajan.meaning}
          </div>
        </section>

        {/* Bhajan Library Grid */}
        <section className="space-y-4">
          <h3 className="font-serif font-black text-lg text-stone-900">
            Sacred Kirtanas &amp; Stutis Library
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bhajansList.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBhajan(b)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                  selectedBhajan.id === b.id
                    ? 'bg-[#fbf5ee] border-amber-400 shadow-xs'
                    : 'bg-white border-[#ebdcc7] hover:border-amber-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-serif font-black text-base text-stone-900">
                    {b.title}
                  </h4>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                    {b.raga.split(' ')[0]}
                  </span>
                </div>
                <span className="text-xs font-serif font-bold text-amber-900 block mb-2">
                  {b.telugu}
                </span>
                <p className="text-xs text-stone-600 font-serif line-clamp-2 leading-relaxed">
                  {b.meaning}
                </p>
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#78131e]">
                  <span>Listen &amp; View Lyrics</span>
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
