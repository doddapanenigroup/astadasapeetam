'use client';

import React, { useState } from 'react';
import { 
  Video, Sparkles, Check, Eye, Play, 
  Clock, Landmark, Tag, AlertCircle, CheckCircle2,
  Upload, Link as LinkIcon, Image as ImageIcon, ArrowLeft,
  X, RefreshCw, Trash2, Film
} from 'lucide-react';
import { YoutubeIcon } from './SocialIcons';

export const VIDEO_CATEGORIES = [
  { id: 'devotional-videos', label: 'Devotional Videos', icon: '🪔', telugu: 'భక్తి వీడియోలు' },
  { id: 'puja-videos', label: 'Puja & Rituals Videos', icon: '🌺', telugu: 'పూజా విధానం & అభిషేకాలు' },
  { id: 'divine-bhajans', label: 'Divine Bhajana Videos', icon: '🎵', telugu: 'దివ్య భజనలు & కీర్తనలు' },
  { id: 'live-darshan', label: 'Live Temple Darshan', icon: '🛕', telugu: 'ప్రత్యక్ష ఆలయ దర్శనం' },
  { id: 'pravachanams', label: 'Pravachanams & Kathas', icon: '🕉️', telugu: 'ప్రవచనాలు & పురాణ గాథలు' },
  { id: 'mantras-chants', label: 'Guided Chants & Mantras', icon: '🧘', telugu: 'మంత్రోచ్ఛారణ & ధ్యానం' }
];

export default function VideoPublishStudio({ onVideoPublished, onBackToDesk, showToast }) {
  const [title, setTitle] = useState('');
  const [titleTelugu, setTitleTelugu] = useState('');
  const [category, setCategory] = useState('devotional-videos');
  
  // Video Source mode: 'url' (YouTube/Web) vs 'upload' (Device)
  const [videoSourceMode, setVideoSourceMode] = useState('url');
  const [videoUrl, setVideoUrl] = useState('');
  const [localVideoFile, setLocalVideoFile] = useState(null);
  const [localVideoPreview, setLocalVideoPreview] = useState('');

  // Thumbnail Mode: 'upload' (Device) vs 'url' (Outside / Web URL)
  const [thumbMode, setThumbMode] = useState('upload');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [localThumbFile, setLocalThumbFile] = useState(null);
  const [localThumbPreview, setLocalThumbPreview] = useState('');

  const [subtitle, setSubtitle] = useState('');
  const [temple, setTemple] = useState('');
  const [speakerOrArtist, setSpeakerOrArtist] = useState('');
  const [duration, setDuration] = useState('10:00');
  const [description, setDescription] = useState('');
  const [isLatestVideo, setIsLatestVideo] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-extract thumbnail & embed URL when YouTube URL is entered
  const handleVideoUrlChange = (val) => {
    setVideoUrl(val);
    if (!val) return;

    const ytMatch = val.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      const extractedThumb = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
      // If user hasn't selected a local upload thumbnail, auto-fill YouTube thumbnail
      if (!localThumbPreview && !thumbnailUrl) {
        setThumbnailUrl(extractedThumb);
      }
    }
  };

  // Handle local thumbnail image upload from device
  const handleDeviceImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setLocalThumbFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setLocalThumbPreview(event.target.result);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  // Handle local video file upload from device
  const handleDeviceVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setErrorMsg('Please select a valid video file (MP4, WebM, MOV).');
      return;
    }

    setLocalVideoFile(file);
    const objectUrl = URL.createObjectURL(file);
    setLocalVideoPreview(objectUrl);
    setVideoUrl(`local:${file.name}`);
    setErrorMsg('');
  };

  // Compute final effective thumbnail
  const effectiveThumbnail = thumbMode === 'upload' && localThumbPreview 
    ? localThumbPreview 
    : (thumbnailUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600');

  // Compute final effective video url
  const effectiveVideoUrl = videoSourceMode === 'upload' && localVideoPreview
    ? localVideoPreview
    : (videoUrl || 'https://www.youtube.com/watch?v=F0f1C6j3eO4');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Video Title is required.');
      return;
    }

    if (videoSourceMode === 'url' && !videoUrl.trim()) {
      setErrorMsg('Please provide a YouTube / Web Video URL.');
      return;
    }

    if (videoSourceMode === 'upload' && !localVideoFile && !videoUrl.trim()) {
      setErrorMsg('Please select a video file from your device.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');

      const finalThumb = thumbMode === 'upload' && localThumbPreview
        ? localThumbPreview
        : (thumbnailUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600');

      const payload = {
        title: title.trim(),
        titleTelugu: titleTelugu.trim(),
        category,
        videoUrl: effectiveVideoUrl,
        thumbnail: finalThumb,
        subtitle: subtitle.trim() || 'Devotional Video',
        temple: temple.trim(),
        speakerOrArtist: speakerOrArtist.trim(),
        duration: isLive ? 'LIVE' : (duration.trim() || '10:00'),
        description: description.trim(),
        isLatestVideo: Boolean(isLatestVideo),
        isLive: Boolean(isLive),
        status: 'published'
      };

      let createdVideo = null;

      // 1. Post to API
      try {
        const res = await fetch('http://localhost:5000/api/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success && data.data) {
          createdVideo = data.data;
        }
      } catch (apiErr) {
        console.warn('API call failed, falling back to local storage:', apiErr);
      }

      // 2. Dual-save to LocalStorage
      if (!createdVideo) {
        createdVideo = {
          ...payload,
          _id: `vid_${Date.now()}`,
          createdAt: new Date().toISOString(),
          viewsCount: 1
        };
      }

      try {
        let existing = [];
        const stored = localStorage.getItem('astada_custom_videos');
        if (stored) existing = JSON.parse(stored);
        existing.unshift(createdVideo);
        localStorage.setItem('astada_custom_videos', JSON.stringify(existing));
        window.dispatchEvent(new Event('astada_videos_updated'));
      } catch (storageErr) {
        console.warn('LocalStorage error:', storageErr);
      }

      if (showToast) {
        showToast('success', `✨ Sacred Video "${payload.title}" published successfully!`);
      }
      setSuccessMsg(`Video "${payload.title}" published! Redirecting to Video Desk...`);

      if (onVideoPublished) {
        onVideoPublished(createdVideo);
      }

      setTimeout(() => {
        if (onBackToDesk) onBackToDesk();
      }, 700);

    } catch (err) {
      setErrorMsg(err.message || 'Failed to publish video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onBackToDesk}
            className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-amber-800 bg-stone-100 hover:bg-amber-100/70 px-3 py-1.5 rounded-xl transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Video Desk</span>
          </button>
          <span className="text-stone-300">•</span>
          <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
            Video Studio (వీడియో ప్రచురణ వేదిక)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Independent Video Desk</span>
          </span>
        </div>
      </div>

      {/* Main Studio Banner */}
      <div className="bg-gradient-to-r from-[#1b0a24] via-[#2d1144] to-[#1a0a27] text-white p-6 rounded-3xl border border-[#3e1b5b] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-rose-500/20 text-rose-300 border border-rose-400/30 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1.5">
                <Video className="w-3 h-3 text-rose-400" />
                Vedic Media Publishing
              </span>
              <span className="text-xs text-purple-200/70">• Upload from Device or Paste URL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Add Sacred Devotional Video (వీడియో ప్రచురణ)
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/90 mt-1 max-w-2xl leading-relaxed">
              Publish Puja Videos, Divine Bhajans, Suprabhatam &amp; Temple Darshans. Directly feature in the homepage <span className="text-amber-300 font-bold">&quot;LATEST VIDEOS&quot;</span> row.
            </p>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Studio Two-Column Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-2xs">
          
          {/* Row 1: Titles */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                Video Title (English) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sri Venkateswara Suprabhatam Full Recitation"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  Telugu Title (తెలుగు శీర్షిక)
                </label>
                <input
                  type="text"
                  value={titleTelugu}
                  onChange={(e) => setTitleTelugu(e.target.value)}
                  placeholder="ఉదా: శ్రీ వేంకటేశ్వర సుప్రభాతం"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-amber-950 focus:outline-none focus:border-amber-500 font-serif font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  Subtitle / Card Caption
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Lord Venkateswara / Powerful Mantra"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Category Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-2">
              Devotional Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {VIDEO_CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-xs ring-1 ring-amber-400'
                        : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-base mb-1">
                      <span>{cat.icon}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 font-bold" />}
                    </div>
                    <div className="text-xs font-bold leading-tight">{cat.label}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5 font-serif">{cat.telugu}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Video Source Selection (YouTube Link OR Upload from Device) */}
          <div className="bg-stone-50/80 p-4.5 rounded-2xl border border-stone-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Film className="w-4 h-4 text-rose-600" />
                <span>Video Source *</span>
              </label>

              {/* Mode Switcher: URL vs Device Upload */}
              <div className="flex items-center p-0.5 bg-stone-200/80 rounded-xl gap-1 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setVideoSourceMode('url')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                    videoSourceMode === 'url'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <LinkIcon className="w-3 h-3 text-red-600" />
                  <span>YouTube / URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVideoSourceMode('upload')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                    videoSourceMode === 'upload'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Upload className="w-3 h-3 text-amber-700" />
                  <span>Upload from Device</span>
                </button>
              </div>
            </div>

            {videoSourceMode === 'url' ? (
              <div className="space-y-1.5">
                <div className="relative">
                  <YoutubeIcon className="w-4 h-4 text-red-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => handleVideoUrlChange(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <p className="text-[10px] text-stone-500">
                  Supports YouTube Watch URLs, Shorts, youtu.be links, and Live Streams. Thumbnail is auto-extracted!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-2xl p-4 text-center bg-white transition cursor-pointer relative">
                  <input
                    type="file"
                    accept="video/mp4, video/webm, video/ogg, video/quicktime"
                    onChange={handleDeviceVideoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center space-y-1">
                    <Upload className="w-6 h-6 text-amber-600 mb-1" />
                    <span className="text-xs font-bold text-stone-800">
                      Click to Browse or Drag &amp; Drop Video from Device
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Supported: MP4, WebM, MOV (Max 500MB)
                    </span>
                  </div>
                </div>

                {localVideoFile && (
                  <div className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs">
                    <div className="flex items-center space-x-2 truncate">
                      <Film className="w-4 h-4 text-amber-700 shrink-0" />
                      <span className="font-bold text-stone-800 truncate">{localVideoFile.name}</span>
                      <span className="text-[10px] text-stone-400 font-mono shrink-0">
                        ({(localVideoFile.size / (1024 * 1024)).toFixed(1)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLocalVideoFile(null);
                        setLocalVideoPreview('');
                        setVideoUrl('');
                      }}
                      className="p-1 text-stone-400 hover:text-red-600 rounded cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Row 4: Thumbnail Selection (Upload from Device OR Outside URL) */}
          <div className="bg-amber-50/40 p-4.5 rounded-2xl border border-amber-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-700" />
                <span>Thumbnail Image (ముఖచిత్రం) *</span>
              </label>

              {/* Thumb Switcher: Upload from Device vs Outside URL */}
              <div className="flex items-center p-0.5 bg-stone-200/80 rounded-xl gap-1 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setThumbMode('upload')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                    thumbMode === 'upload'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Upload className="w-3 h-3 text-amber-700" />
                  <span>Upload from Device</span>
                </button>
                <button
                  type="button"
                  onClick={() => setThumbMode('url')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                    thumbMode === 'url'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <LinkIcon className="w-3 h-3 text-blue-600" />
                  <span>Outside URL</span>
                </button>
              </div>
            </div>

            {thumbMode === 'upload' ? (
              <div className="space-y-2">
                <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-4 text-center bg-white transition cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDeviceImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center space-y-1">
                    <ImageIcon className="w-6 h-6 text-amber-600 mb-1" />
                    <span className="text-xs font-bold text-stone-800">
                      Click to Upload Thumbnail Image from Your Device
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Supports JPG, PNG, WebP (16:9 ratio recommended)
                    </span>
                  </div>
                </div>

                {localThumbPreview && (
                  <div className="flex items-center justify-between p-2 bg-white border border-amber-300 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <img
                        src={localThumbPreview}
                        alt="Preview"
                        className="w-16 h-10 object-cover rounded-lg border"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-800">
                          {localThumbFile ? localThumbFile.name : 'Device Image'}
                        </div>
                        <div className="text-[10px] text-emerald-700 font-bold">
                          ✓ Image loaded from device
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLocalThumbFile(null);
                        setLocalThumbPreview('');
                      }}
                      className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or https://img.youtube.com/vi/..."
                    className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <p className="text-[10px] text-stone-500">
                  Paste any public web image URL or leave blank to use the YouTube auto-extracted thumbnail.
                </p>
              </div>
            )}
          </div>

          {/* Row 5: Temple, Speaker & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Temple / Kshetra (Optional)
              </label>
              <input
                type="text"
                value={temple}
                onChange={(e) => setTemple(e.target.value)}
                placeholder="e.g. Tirumala / Kashi"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Speaker / Artist / Pundits
              </label>
              <input
                type="text"
                value={speakerOrArtist}
                onChange={(e) => setSpeakerOrArtist(e.target.value)}
                placeholder="e.g. MS Subbulakshmi / TTD"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Duration (mm:ss)
              </label>
              <input
                type="text"
                disabled={isLive}
                value={isLive ? 'LIVE' : duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="10:00"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500 font-mono disabled:opacity-50"
              />
            </div>
          </div>

          {/* Row 6: Description */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Description / Spiritual Significance
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Significance of this divine chanting, blessings, and pooja details..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-500 leading-relaxed"
            ></textarea>
          </div>
        </div>

        {/* Right Column: Interactive Live Preview & Placement (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Placement Checkboxes Card */}
          <div className="bg-amber-50/70 p-5 rounded-3xl border border-amber-300/80 shadow-xs space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Homepage Placement Rules</span>
            </h4>

            {/* KEEP IN LATEST VIDEOS CHECKBOX */}
            <div className="bg-white p-3.5 rounded-2xl border border-amber-200 space-y-1">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isLatestVideo}
                  onChange={(e) => setIsLatestVideo(e.target.checked)}
                  className="rounded border-amber-400 text-amber-600 focus:ring-amber-500 w-4 h-4 mt-0.5 cursor-pointer"
                />
                <div>
                  <span className="font-bold text-xs text-stone-900">
                    Keep in Latest Videos (Feature in Homepage &quot;LATEST VIDEOS&quot; Row)
                  </span>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                    When checked, this video will prominently appear in the homepage <span className="font-bold text-amber-800">LATEST VIDEOS</span> section beside Latest Articles.
                  </p>
                </div>
              </label>
            </div>

            {/* LIVE STREAM CHECKBOX */}
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-1">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isLive}
                  onChange={(e) => setIsLive(e.target.checked)}
                  className="rounded border-stone-300 text-red-600 focus:ring-red-500 w-4 h-4 mt-0.5 cursor-pointer"
                />
                <div>
                  <span className="font-bold text-xs text-stone-900">
                    Mark as 24x7 Live Darshan Stream
                  </span>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                    Displays a pulsing red <span className="text-red-600 font-bold">● LIVE</span> badge over the video player card.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Interactive Real-Time Card Preview */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-500">
              <span className="flex items-center gap-1.5 uppercase font-mono tracking-wider">
                <Eye className="w-3.5 h-3.5 text-stone-400" />
                Live Card Preview
              </span>
              <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-mono">
                Homepage Grid Look
              </span>
            </div>

            {/* The Video Card */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="relative aspect-video bg-stone-900 group">
                <img
                  src={effectiveThumbnail}
                  alt={title || 'Preview'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-black/60 backdrop-blur-xs text-amber-300 border border-amber-400/30 text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono">
                    {category.replace('-', ' ')}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5">
                  {isLive ? (
                    <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      LIVE
                    </span>
                  ) : (
                    <span className="bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">
                      {duration || '10:00'}
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 fill-stone-950 ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-3.5 space-y-1">
                <h5 className="font-bold text-stone-900 text-xs line-clamp-2">
                  {title || 'Sri Venkateswara Suprabhatam (Preview Title)'}
                </h5>
                {titleTelugu && (
                  <p className="text-[11px] text-amber-900 font-serif line-clamp-1">
                    {titleTelugu}
                  </p>
                )}
                <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1">
                  <span>{temple || 'Temple Sanctuary'}</span>
                  <span>{subtitle || 'Devotional'}</span>
                </div>

                {isLatestVideo && (
                  <div className="mt-2 pt-2 border-t border-stone-200/80 flex items-center justify-between">
                    <span className="text-[10px] text-amber-800 font-bold bg-amber-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                      ★ Featured in Latest Videos
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">Watch Now &gt;</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:brightness-110 text-stone-950 font-black text-xs py-3 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                  <span>Publishing Video to Sanctuary...</span>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 text-stone-950" />
                  <span>Publish Devotional Video</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBackToDesk}
              className="w-full bg-stone-50 hover:bg-stone-100 text-stone-600 font-bold text-xs py-2.5 rounded-2xl border border-stone-200 transition cursor-pointer"
            >
              Cancel &amp; Return to Video Desk
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
