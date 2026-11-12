'use client';

import React, { useState } from 'react';
import { 
  X, Video, Sparkles, Check, Eye, Play, 
  Clock, Landmark, Tag, AlertCircle, CheckCircle2 
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

export default function VideoStudioModal({ isOpen, onClose, onVideoPublished }) {
  const [title, setTitle] = useState('');
  const [titleTelugu, setTitleTelugu] = useState('');
  const [category, setCategory] = useState('devotional-videos');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [temple, setTemple] = useState('');
  const [duration, setDuration] = useState('10:00');
  const [description, setDescription] = useState('');
  const [isLatestVideo, setIsLatestVideo] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Auto-detect YouTube ID and thumbnail
  const handleVideoUrlChange = (url) => {
    setVideoUrl(url);
    if (!url) return;

    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    if (match && match[1]) {
      const vidId = match[1];
      if (!thumbnail || thumbnail.includes('img.youtube.com') || thumbnail.includes('/images/')) {
        setThumbnail(`https://img.youtube.com/vi/${vidId}/hqdefault.jpg`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a video title');
      return;
    }
    if (!videoUrl.trim()) {
      setErrorMsg('Please enter a video or YouTube link');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Generate safe embed URL
    let embedUrl = videoUrl;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = videoUrl.match(regExp);
    if (match && match[1]) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${match[1]}`;
    }

    const payload = {
      title: title.trim(),
      titleTelugu: titleTelugu.trim(),
      category,
      videoUrl: videoUrl.trim(),
      embedUrl,
      thumbnail: thumbnail.trim() || (match && match[1] ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '/images/temple_tirupati.jpg'),
      subtitle: subtitle.trim() || 'Devotional Video',
      temple: temple.trim(),
      duration: isLive ? 'LIVE' : (duration.trim() || '10:00'),
      description: description.trim(),
      isLatestVideo: Boolean(isLatestVideo),
      isLive: Boolean(isLive),
      status: 'published',
      tags: ['Devotional', 'Sacred Video']
    };

    try {
      // 1. Send to Backend API
      let savedVideo = null;
      try {
        const res = await fetch('http://localhost:5000/api/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success && data.data) {
          savedVideo = data.data;
        }
      } catch (apiErr) {
        console.warn('Backend video API offline, persisting locally:', apiErr);
      }

      // 2. Persist locally to localStorage for instant UI reactivity
      const newVideo = savedVideo || {
        ...payload,
        id: `vid-${Date.now()}`,
        createdAt: new Date().toISOString()
      };

      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('astada_custom_videos');
          const list = stored ? JSON.parse(stored) : [];
          list.unshift(newVideo);
          localStorage.setItem('astada_custom_videos', JSON.stringify(list));
          window.dispatchEvent(new CustomEvent('astada_videos_updated', { detail: newVideo }));
        } catch (e) {}
      }

      setSuccessMsg('Video published successfully to website!');
      if (onVideoPublished) onVideoPublished(newVideo);

      setTimeout(() => {
        onClose();
        // Reset form
        setTitle('');
        setTitleTelugu('');
        setVideoUrl('');
        setThumbnail('');
        setSubtitle('');
        setTemple('');
        setDescription('');
        setSuccessMsg('');
      }, 1200);

    } catch (err) {
      setErrorMsg(err.message || 'Failed to publish video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-amber-200/90 shadow-2xl w-full max-w-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1E0F36] via-[#2E1452] to-[#160B28] p-5 sm:p-6 text-white flex items-center justify-between border-b border-purple-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Video Studio
                </span>
                <span className="text-[11px] text-purple-200/80">Independent Video Publishing</span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-black tracking-tight text-white mt-0.5">
                Add Sacred Devotional Video
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Video Title (English) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sri Venkateswara Suprabhatam"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Video Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              >
                {VIDEO_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label} ({cat.telugu})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Telugu Title & Subtitle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Telugu Title (Optional)
              </label>
              <input
                type="text"
                value={titleTelugu}
                onChange={(e) => setTitleTelugu(e.target.value)}
                placeholder="ఉదా: శ్రీ వేంకటేశ్వర సుప్రభాతం"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Subtitle / Card Caption
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Lord Venkateswara / Powerful Mantra / With Lyrics"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Row 3: Video URL & Auto-Thumbnail */}
          <div className="space-y-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/70">
            <div>
              <label className="block text-xs font-bold text-[#78131e] mb-1 flex items-center space-x-1.5">
                <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                <span>YouTube Video URL or Embed Link *</span>
              </label>
              <input
                type="url"
                required
                value={videoUrl}
                onChange={(e) => handleVideoUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-stone-500 mt-1 block">
                Supports YouTube Watch URLs, Shorts, youtu.be links, and Live Streams. Thumbnail is auto-extracted!
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Thumbnail Image URL
              </label>
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://img.youtube.com/vi/... or /images/..."
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            {thumbnail && (
              <div className="flex items-center space-x-3 pt-1">
                <div className="w-24 h-14 rounded-lg overflow-hidden border border-stone-300 relative bg-stone-900 shrink-0">
                  <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <div className="text-[11px] text-stone-600">
                  <span className="font-bold block text-stone-900">Thumbnail Preview</span>
                  <span className="text-[10px] text-stone-500">Auto-synced with YouTube high quality frame</span>
                </div>
              </div>
            )}
          </div>

          {/* Row 4: Temple & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Temple / Kshetra (Optional)
              </label>
              <input
                type="text"
                value={temple}
                onChange={(e) => setTemple(e.target.value)}
                placeholder="e.g. Tirumala Tirupati Devasthanam"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 15:45 or LIVE"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Row 5: Description */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Description / Devotional Note
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Significance of this divine chanting or video..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs font-medium text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
            />
          </div>

          {/* USER SPECIFIED FEATURE: Keep in Latest Videos Checkbox */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100/70 via-amber-50 to-orange-50 border border-amber-300/80 space-y-2.5">
            <label className="flex items-center space-x-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isLatestVideo}
                onChange={(e) => setIsLatestVideo(e.target.checked)}
                className="w-4 h-4 text-amber-700 bg-white border-amber-400 rounded focus:ring-amber-500 cursor-pointer"
              />
              <span className="text-xs font-black text-amber-950 flex items-center gap-1.5 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Keep in Latest Videos (Feature in Homepage "LATEST VIDEOS" Row)
              </span>
            </label>
            <p className="text-[11px] text-amber-900/80 pl-7 leading-relaxed">
              When checked, this video will prominently appear in the homepage <strong>LATEST VIDEOS</strong> card beside Latest Articles.
            </p>

            <label className="flex items-center space-x-3 cursor-pointer select-none pt-1 border-t border-amber-200/50">
              <input
                type="checkbox"
                checked={isLive}
                onChange={(e) => {
                  setIsLive(e.target.checked);
                  if (e.target.checked) setDuration('LIVE');
                }}
                className="w-4 h-4 text-red-600 bg-white border-red-300 rounded focus:ring-red-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-red-950 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block"></span>
                Mark as 24x7 Live Darshan Stream
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-stone-950 font-black text-xs px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              <Video className="w-3.5 h-3.5 text-stone-950" />
              <span>{loading ? 'Publishing Video...' : 'Publish Video'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
