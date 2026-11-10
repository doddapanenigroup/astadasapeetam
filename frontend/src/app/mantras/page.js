'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  BellRing, Play, Pause, RotateCcw, Volume2, Sparkles, 
  BookOpen, Copy, Check, ChevronRight, VolumeX
} from 'lucide-react';

export const sacredMantras = [
  {
    id: 'gayatri',
    name: 'Gayatri Maha Mantra',
    telugu: 'గాయత్రీ మహామంత్రం',
    deity: 'Savitr / Universal Divine Light',
    bija: 'Om Bhur Bhuvah Svah',
    sanskrit: 'ॐ భూర్భువః స్వః తత్సవితుర్వరేణ్యం భర్గో దేవస్య ధీమహి ధియో యో నః ప్రచోదయాత్॥',
    phonetics: 'Om Bhur Bhuvah Svah, Tat-Savitur-Varenyam, Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayaat.',
    meaning: 'We meditate on the transcendental glory of the Divine Sun, the supreme illuminator of the three worlds. May that supreme Light inspire and illuminate our intellect toward righteousness.',
    benefit: 'Enhances cognitive memory, purifies the karmic intellect (Buddhi), and bestows spiritual enlightenment.'
  },
  {
    id: 'mrityunjaya',
    name: 'Maha Mrityunjaya Mantra',
    telugu: 'మహా మృత్యుంజయ మంత్రం',
    deity: 'Lord Tryambaka (Maha Rudra Shiva)',
    bija: 'Om Haum Joom Saha',
    sanskrit: 'ॐ త్ర్యంబకం యజామహే సుగంధిం పుష్టివర్ధనం। ఉర్వారుకమివ బంధనాన్ మృత్యోర్ముక్షీయ మామృతాత్॥',
    phonetics: 'Om Tryambakam Yajaamahe Sugandhim Pushti-Vardhanam, Urvaarukam-Iva Bandhanaan Mrityor-Muksheeya Ma-Amritaat.',
    meaning: 'We worship the Three-Eyed Lord Shiva, who is fragrant and nourishes all beings. Just as a ripe melon is effortlessly liberated from its vine, may He liberate us from death and fear into immortality.',
    benefit: 'Ultimate shield against premature death (Apadmrityu), cures severe sickness, and confers divine longevity.'
  },
  {
    id: 'panchakshari',
    name: 'Shiva Panchakshari Mantra',
    telugu: 'శివ పంచాక్షరీ మంత్రం',
    deity: 'Lord Parameshwara',
    bija: 'Namah Shivaya (నమః శివాయ)',
    sanskrit: 'ॐ నమః శివాయ॥',
    phonetics: 'Om Namah Shivaaya.',
    meaning: 'I bow in complete surrender to Lord Shiva, the embodiment of eternal consciousness, pure auspiciousness, and supreme peace.',
    benefit: 'Calms the tempest of inner desires, clears negative thoughts, and awakens inner stillness.'
  },
  {
    id: 'ashtakshari',
    name: 'Maha Vishnu Ashtakshari Mantra',
    telugu: 'మహావిష్ణు అష్టాక్షరీ మంత్రం',
    deity: 'Lord Sri Maha Vishnu / Narayana',
    bija: 'Om Namo Narayanaya',
    sanskrit: 'ॐ నమో నారాయణాయ॥',
    phonetics: 'Om Namo Naaraayanaaya.',
    meaning: 'Salutations unto Lord Narayana, the supreme resting place of all living beings and the all-pervading protector of the cosmos.',
    benefit: 'Destroys fear, restores peace, and bestows Vaikuntha Prapti (eternal salvation).'
  },
  {
    id: 'lakshmi-bija',
    name: 'Mahalakshmi Shreem Bija Mantra',
    telugu: 'శ్రీ మహాలక్ష్మీ బీజాక్షర మంత్రం',
    deity: 'Goddess Mahalakshmi',
    bija: 'Shreem (శ్రీం)',
    sanskrit: 'ॐ శ్రీం హ్రీం క్లీం కమలే కమలాలయే ప్రసీద ప్రసీద శ్రీం హ్రీం శ్రీం ॐ మహాలక్ష్మ్యై నమః॥',
    phonetics: 'Om Shreem Hreem Kleem Kamale Kamalaalaye Praseeda Praseeda Shreem Hreem Shreem Om Mahalakshmyai Namah.',
    meaning: 'O Goddess residing in the lotus, showers of supreme abundance and grace upon us. We offer our devout prostrations to Maha Lakshmi.',
    benefit: 'Attracts financial prosperity, dissolves debts, and fills the household with sacred joy.'
  },
  {
    id: 'ganesha-moola',
    name: 'Ganapati Moola Mantra',
    telugu: 'గణపతి మూల మంత్రం',
    deity: 'Lord Vighneshwara',
    bija: 'Gam (గం)',
    sanskrit: 'ॐ శ్రీం హ్రీం క్లీం గ్లౌం గం గణపతయే వరవరద సర్వజనం మే వశమానయ స్వాహా॥',
    phonetics: 'Om Shreem Hreem Kleem Glaum Gam Ganapataye Vara-Varada Sarva-Janam Me Vashamaanaya Swaahaa.',
    meaning: 'I surrender to Lord Ganapati, the supreme bestower of boons, who removes all obstacles and graces every path with success.',
    benefit: 'Eliminates impediments in ventures, academic pursuits, and examinations.'
  }
];

export default function MantrasPage() {
  const [selectedMantra, setSelectedMantra] = useState(sacredMantras[0]);
  const [japaCount, setJapaCount] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [voiceGender, setVoiceGender] = useState('female');
  const [copiedId, setCopiedId] = useState('');

  const handlePlayVoice = (text) => {
    if (typeof window === 'undefined') return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = voiceGender === 'female' ? 1.15 : 0.9;

    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => 
      voiceGender === 'female' 
        ? (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Heera')) 
        : (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Ravi'))
    );
    if (targetVoice) utterance.voice = targetVoice;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const incrementJapa = () => {
    setJapaCount(prev => prev >= 108 ? 1 : prev + 1);
  };

  const copyText = (text, id) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-stone-900 pb-16">
      <AdBanner slotId="slot-1" type="top-sponsored" />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#170624] via-[#2D0B42] to-[#170624] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <BellRing className="w-3.5 h-3.5 text-amber-400" />
            <span>Mantra Sastra &amp; Bija Akshara Sound Vibration</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
            Sacred Vedic Mantras &amp; Japa Sadhana
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Vedic Bija sound vibrations, Gayatri, Maha Mrityunjaya, and deity moola mantras with 108 digital Japa Mala beads counter and automatic voice chanting.
          </p>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Selected Mantra Display & Interactive Chanting */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d5bc] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedMantra.bija}
                </span>
                <h2 className="text-2xl font-serif font-black text-stone-900 mt-1">
                  {selectedMantra.name}
                </h2>
                <span className="text-sm font-serif font-bold text-amber-900">
                  {selectedMantra.telugu}
                </span>
              </div>

              {/* Voice Player Controls */}
              <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
                <div className="flex items-center bg-white rounded-xl p-0.5 text-xs font-bold border border-stone-200">
                  <button
                    onClick={() => setVoiceGender('female')}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${voiceGender === 'female' ? 'bg-[#78131e] text-white shadow-2xs' : 'text-stone-600'}`}
                  >
                    👩 Female
                  </button>
                  <button
                    onClick={() => setVoiceGender('male')}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${voiceGender === 'male' ? 'bg-[#78131e] text-white shadow-2xs' : 'text-stone-600'}`}
                  >
                    👨 Male
                  </button>
                </div>

                <button
                  onClick={() => handlePlayVoice(selectedMantra.phonetics)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                    isPlayingAudio ? 'bg-amber-600 text-white animate-pulse' : 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black'
                  }`}
                >
                  {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlayingAudio ? 'Pause' : 'Play Voice'}</span>
                </button>
              </div>
            </div>

            {/* Sacred Telugu & Sanskrit Script */}
            <div className="p-6 bg-gradient-to-br from-[#fffdfa] to-[#faf3eb] rounded-3xl border border-[#ebdcc7] text-center space-y-3 relative overflow-hidden">
              <span className="text-[10px] font-mono font-bold uppercase text-stone-400 tracking-widest block">
                Sacred Sanskrit &amp; Telugu Script
              </span>
              <p className="text-lg sm:text-2xl font-serif font-black text-[#5a0c14] leading-relaxed">
                {selectedMantra.sanskrit}
              </p>
              <div className="pt-2 text-xs font-mono text-stone-600 italic">
                {selectedMantra.phonetics}
              </div>
            </div>

            {/* Meaning & Benefit */}
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="font-bold text-stone-900 block mb-0.5">Spiritual Meaning (తాత్పర్యం):</span>
                <p className="text-stone-700 font-serif text-sm">
                  {selectedMantra.meaning}
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-950 block">Mantra Siddhi &amp; Benefits:</span>
                  <p className="text-emerald-900 text-xs mt-0.5 font-medium">
                    {selectedMantra.benefit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive 108 Digital Japa Counter */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#e8d5bc] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-black text-sm text-stone-900 flex items-center gap-1.5">
                <span>📿</span> 108 Japa Mala Counter
              </h3>
              <button
                onClick={() => setJapaCount(0)}
                className="text-[11px] font-bold text-stone-400 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="text-center py-4 space-y-3">
              <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-[#78131e] to-[#450a11] text-amber-300 flex flex-col items-center justify-center border-4 border-amber-400/50 shadow-md">
                <span className="text-4xl font-serif font-black text-white">{japaCount}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-200">/ 108 Japa</span>
              </div>

              <button
                onClick={incrementJapa}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black py-3 px-4 rounded-2xl shadow-xs transition-all active:scale-95 cursor-pointer text-sm"
              >
                Touch to Count 1 Japa Bead
              </button>

              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                <div 
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{ width: `${(japaCount / 108) * 100}%` }}
                />
              </div>

              <p className="text-[11px] text-stone-500 font-medium">
                {japaCount === 108 ? '🎉 Complete 108 Japa Mala finished! Divine blessings received.' : `Completed ${japaCount} beads out of 108`}
              </p>
            </div>
          </div>
        </div>

        {/* All Mantras List Grid */}
        <section className="space-y-4">
          <h3 className="font-serif font-black text-lg text-stone-900">
            Sacred Bija Mantras Library
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sacredMantras.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMantra(m)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                  selectedMantra.id === m.id
                    ? 'bg-[#fbf5ee] border-amber-400 shadow-xs'
                    : 'bg-white border-[#ebdcc7] hover:border-amber-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-serif font-black text-base text-stone-900">
                    {m.name}
                  </h4>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                    {m.deity.split(' ')[0]}
                  </span>
                </div>
                <span className="text-xs font-serif font-bold text-amber-900 block mb-2">
                  {m.telugu}
                </span>
                <p className="text-xs text-stone-600 font-serif italic line-clamp-2">
                  {m.phonetics}
                </p>
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#78131e]">
                  <span>Chant &amp; Practice</span>
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
