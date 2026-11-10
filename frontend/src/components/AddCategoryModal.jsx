'use client';

import React, { useState } from 'react';
import { 
  X, 
  FolderPlus, 
  Globe, 
  Sparkles, 
  Check, 
  Image as ImageIcon, 
  FileText, 
  Info,
  Layers
} from 'lucide-react';
import { saveCustomCategory } from '../data/categoriesData';

const PRESET_ICONS = [
  '📿', '🕉️', '🏛️', '📜', '🔔', '📖', '🔥', '💠', 
  '☀️', '⏳', '✨', '🪕', '🪷', '📰', '🗓️', '📺', 
  '🚩', '📅', '🏹', '🔱', '🥥', '🪔', '🌸', '🌿', '🛕'
];

export default function AddCategoryModal({ isOpen, onClose, onCategoryAdded }) {
  const [formData, setFormData] = useState({
    label: '',
    telugu: '',
    slug: '',
    icon: '📿',
    badge: 'Custom Category',
    needsImage: true,
    desc: ''
  });
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // Auto-generate clean slug from English title if not manually edited
  const handleLabelChange = (val) => {
    const updated = { ...formData, label: val };
    if (!isSlugManuallyEdited) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      updated.slug = generated;
    }
    setFormData(updated);
    if (error) setError('');
  };

  const handleSlugChange = (val) => {
    setIsSlugManuallyEdited(true);
    const cleaned = val
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-');
    setFormData({ ...formData, slug: cleaned });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.label.trim()) {
      setError('Please provide a Category Name in English');
      return;
    }
    if (!formData.slug.trim()) {
      setError('Please provide a valid custom URL slug');
      return;
    }

    const saved = saveCustomCategory(formData);
    if (!saved) {
      setError('Failed to save category. Please check your slug format.');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      if (onCategoryAdded) onCategoryAdded(saved);
      onClose();
      // Reset
      setFormData({
        label: '',
        telugu: '',
        slug: '',
        icon: '📿',
        badge: 'Custom Category',
        needsImage: true,
        desc: ''
      });
      setIsSlugManuallyEdited(false);
      setSuccess(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-amber-200/90 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#240409] via-[#400b14] to-[#240409] text-white px-6 py-5 flex items-center justify-between border-b border-amber-900/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center text-xl shadow-inner">
              <FolderPlus className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-black text-lg text-amber-100 flex items-center space-x-2">
                <span>Add Website Category</span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/20">
                  Custom Slug
                </span>
              </h3>
              <p className="text-xs text-amber-200/70">
                నూతన శీర్షికను కస్టమ్ URL స్లగ్‌తో వెబ్‌సైట్‌కు జోడించండి
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center space-x-2">
              <span>⚠️ {error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Category registered successfully! Updating ecosystem...</span>
            </div>
          )}

          {/* Category Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Category Name (English) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sundarakanda Parayanam"
                value={formData.label}
                onChange={(e) => handleLabelChange(e.target.value)}
                className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Category Name in Telugu (తెలుగు పేరు)
              </label>
              <input
                type="text"
                placeholder="e.g. సుందరకాండ పారాయణం"
                value={formData.telugu}
                onChange={(e) => setFormData({ ...formData, telugu: e.target.value })}
                className="w-full border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 font-serif"
              />
            </div>
          </div>

          {/* Custom Slug with Live URL Preview */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-amber-950 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-700" />
                <span>Custom Category URL Slug *</span>
              </label>
              <span className="text-[10px] text-amber-800/80 font-mono font-semibold">
                Permanent Routing Path
              </span>
            </div>
            <div className="flex items-center bg-white border border-amber-300 rounded-xl px-3 py-1.5 shadow-2xs">
              <span className="text-stone-400 font-mono text-xs select-none">
                astadasapeetam.org/
              </span>
              <input
                type="text"
                required
                placeholder="sundarakanda-parayanam"
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                className="w-full bg-transparent border-none text-xs font-mono font-bold text-amber-950 focus:outline-none pl-1"
              />
            </div>
            <div className="text-[11px] text-stone-500 flex items-center space-x-1.5 pt-0.5">
              <span className="text-stone-400">Preview:</span>
              <span className="font-mono text-emerald-800 font-bold truncate">
                https://astadasapeetam.org/{formData.slug || 'custom-slug'}/[article-name]
              </span>
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-stone-700">
                Category Icon / Emoji
              </label>
              <span className="text-[10px] text-stone-400">Selected: {formData.icon}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-stone-50 rounded-xl border border-stone-200">
              {PRESET_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: emoji })}
                  className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center cursor-pointer transition ${
                    formData.icon === emoji
                      ? 'bg-amber-600 text-white shadow-xs scale-110'
                      : 'hover:bg-stone-200 text-stone-800'
                  }`}
                >
                  {emoji}
                </button>
              ))}
              <div className="flex items-center space-x-1 pl-2 ml-auto border-l border-stone-200">
                <span className="text-[10px] text-stone-400">Custom:</span>
                <input
                  type="text"
                  maxLength={4}
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-8 h-7 text-center border border-stone-300 rounded-md text-xs font-bold bg-white"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Policy */}
          <div>
            <label className="font-bold text-stone-700 block mb-1.5">
              Featured Image Upload Policy
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className={`flex items-start space-x-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                formData.needsImage 
                  ? 'bg-amber-50/70 border-amber-300 text-amber-950 font-bold'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}>
                <input
                  type="radio"
                  name="needsImage"
                  checked={formData.needsImage === true}
                  onChange={() => setFormData({ ...formData, needsImage: true })}
                  className="mt-0.5 accent-amber-600"
                />
                <div>
                  <div className="flex items-center space-x-1 text-xs font-black">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
                    <span>Requires Image Upload</span>
                  </div>
                  <div className="text-[10px] font-normal text-stone-500 mt-0.5">
                    For visual portals (Temples, Deities, Festivals, Yatralu)
                  </div>
                </div>
              </label>

              <label className={`flex items-start space-x-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                !formData.needsImage 
                  ? 'bg-amber-50/70 border-amber-300 text-amber-950 font-bold'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}>
                <input
                  type="radio"
                  name="needsImage"
                  checked={formData.needsImage === false}
                  onChange={() => setFormData({ ...formData, needsImage: false })}
                  className="mt-0.5 accent-amber-600"
                />
                <div>
                  <div className="flex items-center space-x-1 text-xs font-black">
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                    <span>Text &amp; Scripture Only</span>
                  </div>
                  <div className="text-[10px] font-normal text-stone-500 mt-0.5">
                    No image upload shown (Slokas, Mantras, Muhurtham)
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Badge & Description */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Badge / Tag Label
              </label>
              <input
                type="text"
                placeholder="e.g. Parayanam"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full border border-stone-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-600 font-medium"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-stone-700 block mb-1">
                Category Description / Purpose
              </label>
              <input
                type="text"
                placeholder="e.g. Complete sargas, parayana vidhi and commentaries..."
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                className="w-full border border-stone-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-bold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 font-black px-5 py-2 rounded-xl shadow-md border border-amber-300/40 cursor-pointer flex items-center space-x-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>Create Category with Custom Slug</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
