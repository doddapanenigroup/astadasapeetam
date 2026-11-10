'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdBanner from '../../components/AdBanner';
import { 
  BookOpenText, Play, Pause, Sparkles, ChevronRight, 
  Search, BookOpen, Volume2, ShieldCheck, Heart
} from 'lucide-react';

export const stotrasList = [
  {
    id: 'kanakadhara',
    title: 'Kanakadhara Stotram',
    telugu: 'కనకధారా స్తోత్రం',
    author: 'Jagadguru Adi Shankaracharya',
    deity: 'Goddess Mahalakshmi',
    versesCount: '21 Slokas',
    summary: 'Composed by Adi Shankaracharya in early youth, which made golden amla fruits rain from the heavens into a poor woman’s hut, dispelling generational poverty.',
    firstVerse: 'అంగం హరేః పులకభూషణమాశ్రయంతీ భృంగాంగనేవ ముకులాభరణం తమాలమ్। అంగీకృతాఖిల విభూతిరపాంగలీలా మాంగల్యదాస్తు మమ మంగళదేవతాయాః॥',
    phonetics: 'Angam hareh pulaka-bhooshana-maashrayantee, Bhringa-anganeva mukula-abharanam tamaalam, Angee-krita-akhila vibhooti-rapaanga-leelaa, Maangalya-daastu mama mangala-devataayaah.',
    meaning: 'May Goddess Mahalakshmi, whose tender gaze rests upon Lord Hari like a dark bee on a blooming Tamala tree, bestow auspiciousness, prosperity, and joy upon my life.',
    phala: 'Daily recitation destroys poverty, blesses with gold and sovereign wealth, and shields against debt.'
  },
  {
    id: 'shivatandava',
    title: 'Shiva Tandava Stotram',
    telugu: 'శివ తాండవ స్తోత్రం',
    author: 'Lankeshwara Ravana',
    deity: 'Lord Parameshwara (Nataraja)',
    versesCount: '15 Rhythms',
    summary: 'The most thunderous, alliterative Sanskrit hymn sung by Ravana celebrating Lord Shiva’s ecstatic cosmic dance of dissolution and rejuvenation.',
    firstVerse: 'జటాటవీగలజ్జలప్రవాహపావితస్థలే గలేవలంబ్య లంబితాం భుజంగతుంగమాలికామ్। డమడ్డమడ్డమడ్డమన్నినాదవడ్డమర్వయం చకార చండతాండవం తనోతు నః శివః శివమ్॥',
    phonetics: 'Jataatavi-galajjala-pravaha-paavitasthale, Gale-valambya lambitaam bhujanga-tunga-maalikaam, Damaddamad-damaddaman-ninaadavaddamarvayam, Chakaara chanda-taandavam tanotu nah shivah shivam.',
    meaning: 'With his neck consecrated by the flow of water trickling through the forest of his matted hair, wearing a high garland of serpents, playing his damaru with intense rhythmic beats, may that Shiva bless us with auspiciousness.',
    phala: 'Infuses extraordinary mental strength, dispels depression, and bestows Lord Shiva’s ultimate protection.'
  },
  {
    id: 'lalita-sahasra',
    title: 'Sri Lalita Sahasranama Stotram',
    telugu: 'శ్రీ లలితా సహస్రనామ స్తోత్రం',
    author: 'Vagdevatas (Brahmanda Purana)',
    deity: 'Supreme Goddess Lalita Tripurasundari',
    versesCount: '1000 Divine Names',
    summary: 'The jewel of Brahmanda Purana delivered by Lord Hayagriva to Sage Agastya, embodying the complete Sri Chakra Vidya and supreme Kundalini Shakti.',
    firstVerse: 'శ్రీమాతా శ్రీమహారాజ్ఞీ శ్రీమత్సింహాసనేశ్వరీ। చిదగ్నికుండసంభూతా దేవకార్యసముద్యతా॥',
    phonetics: 'Shree-Maataa Shree-Mahaaraajnee Shreemat-Simhaasaneshwaree, Chidagni-Kunda-Sambhootaa Deva-Kaarya-Samudyataa.',
    meaning: 'Salutations to the Supreme Mother, the Great Empress, seated upon the celestial lion throne, born from the sacred fire of pure consciousness to fulfill divine purpose.',
    phala: 'Fulfills all righteous worldly desires, confers supreme health, protects family, and grants Brahma Vidya.'
  },
  {
    id: 'aditya-hrudaya',
    title: 'Aditya Hrudaya Stotram',
    telugu: 'ఆదిత్య హృదయ స్తోత్రం',
    author: 'Sage Agastya (Valmiki Ramayana)',
    deity: 'Lord Surya Bhagavan',
    versesCount: '31 Slokas',
    summary: 'Imparted by Sage Agastya to Lord Sri Rama on the battlefield of Lanka to instill boundless vitality and guarantee victory over all adversaries.',
    firstVerse: 'తతో యుద్ధపరిశ్రాంతం సమరే చింతయా స్థితమ్। రావణం చాగ్రతో దృష్ట్వా యుద్ధాయ సముపస్థితమ్॥ దైవతైశ్చ సమాగమ్య ద్రష్టుమభ్యాగతో రణమ్। ఉపగమ్యాబ్రవీద్రామమగస్త్యో భగవాన్ ఋషిః॥',
    phonetics: 'Tato yuddha-parishraantam samare chintayaa sthitam, Raavanam chaagrato drishtvaa yuddhaaya samupasthitam...',
    meaning: 'Seeing Rama standing weary and contemplative in battle, facing Ravana, Sage Agastya approached Rama and revealed the secret hymn to the Sun God.',
    phala: 'Guarantees victory in struggles, destroys all enemies and obstacles, and cures heart and eye ailments.'
  },
  {
    id: 'kalabhairava',
    title: 'Kalabhairava Ashtakam',
    telugu: 'శ్రీ కాలభైరవ అష్టకం',
    author: 'Jagadguru Adi Shankaracharya',
    deity: 'Lord Kalabhairava (Kashi Kshetrapala)',
    versesCount: '8 Verses',
    summary: 'Sung in reverence to the fierce protector deity of Kashi, who destroys the fear of time (Kala), removes karmic sins, and purges arrogance.',
    firstVerse: 'దేవరాజసేవ్యమానపావనాంఘ్రిపంకజం వ్యాలయజ్ఞసూత్రమిందుశేఖరం కృపాకరమ్। నారదాదియోగివృందవందితం దిగంబరం కాశికాపురాధినాథకాలభైరవం భజే॥',
    phonetics: 'Devaraaja-sevyamaana-paavananghri-pankajam, Vyaala-yajna-sootram-indu-shekharam kripaakaram, Naaradaadi-yogivrinda-vanditam digambaram, Kaashikaapuraadhinaatha-kaalabhairavam bhaje.',
    meaning: 'I worship Kalabhairava, the ruler of Kashi, whose lotus feet are revered by the King of Gods, who wears a serpent as his sacred thread and the crescent moon upon his crest.',
    phala: 'Eliminates fear, ghosts, negative planetary afflictions, and removes fear of death.'
  }
];

export default function StotrasPage() {
  const [selectedStotra, setSelectedStotra] = useState(stotrasList[0]);
  const [scriptView, setScriptView] = useState('telugu');
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
    utt.rate = 0.82;
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
      <div className="bg-gradient-to-r from-[#22071B] via-[#3B0E2E] to-[#22071B] text-white py-10 px-4 sm:px-6 border-b border-amber-500/30">
        <div className="w-[98.5%] max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <BookOpenText className="w-3.5 h-3.5 text-amber-400" />
            <span>Stotra Sahityam &amp; Ashtaka Sangraham</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-amber-100 tracking-tight">
            Divine Stotras &amp; Sacred Kavachas
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Vedic hymns composed by Adi Shankaracharya, Sage Agastya, and ancient Rishis for daily parayanam with word-by-word meaning, phalasruthi, and audio recitation.
          </p>
        </div>
      </div>

      <div className="w-[98.5%] max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Selected Stotra Showcase */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8d5bc] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-serif font-black text-stone-900">
                  {selectedStotra.title}
                </h2>
                <span className="text-sm font-serif font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedStotra.telugu}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 font-medium">
                Composed by: <strong className="text-stone-800">{selectedStotra.author}</strong> • Deity: <strong className="text-amber-800">{selectedStotra.deity}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlayVoice(selectedStotra.phonetics)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-xs ${
                  isPlaying ? 'bg-amber-600 text-white animate-pulse' : 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause Chanting' : 'Listen Stotra'}</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed italic bg-amber-50/40 p-4 rounded-2xl border border-amber-200/60">
            {selectedStotra.summary}
          </p>

          {/* Verses Preview */}
          <div className="p-6 bg-gradient-to-br from-[#fffdfa] to-[#faf3eb] rounded-3xl border border-[#ebdcc7] space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-800 tracking-wider block">
              Prathama Sloka (Opening Verse)
            </span>
            <p className="text-base sm:text-xl font-serif font-black text-[#6e1e0a] leading-relaxed">
              {selectedStotra.firstVerse}
            </p>
            <p className="text-xs font-mono text-stone-600 italic">
              {selectedStotra.phonetics}
            </p>
            <div className="pt-2 border-t border-stone-200/70 text-xs text-stone-800 font-medium">
              <strong className="text-stone-900">Word Meaning:</strong> {selectedStotra.meaning}
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 font-serif">
            <strong>Phala Shruti (Spiritual Fruits):</strong> {selectedStotra.phala}
          </div>
        </section>

        {/* All Stotras Grid */}
        <section className="space-y-4">
          <h3 className="font-serif font-black text-lg text-stone-900">
            Complete Stotras &amp; Kavachas Directory
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stotrasList.map((stotra) => (
              <div
                key={stotra.id}
                onClick={() => setSelectedStotra(stotra)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                  selectedStotra.id === stotra.id
                    ? 'bg-[#fbf5ee] border-amber-400 shadow-xs'
                    : 'bg-white border-[#ebdcc7] hover:border-amber-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-serif font-black text-base text-stone-900">
                    {stotra.title}
                  </h4>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    {stotra.versesCount}
                  </span>
                </div>
                <span className="text-xs font-serif font-bold text-amber-900 block mb-2">
                  {stotra.telugu}
                </span>
                <p className="text-xs text-stone-600 font-serif line-clamp-2 leading-relaxed">
                  {stotra.summary}
                </p>
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#78131e]">
                  <span>Read Full Parayanam</span>
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
