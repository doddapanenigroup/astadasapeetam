'use client';

import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Globe, 
  Sparkles, 
  Check, 
  Upload, 
  RefreshCw, 
  Sliders, 
  Eye, 
  Type, 
  X
} from 'lucide-react';
import { 
  DEFAULT_BRANDING, 
  getStoredBranding, 
  saveBranding, 
  getEmojiFaviconUri,
  applyFaviconToDocument
} from '../data/brandingData';

const PRESET_FAVICONS = ['🕉️', '🛕', '🔱', '📿', '☀️', '🌸', '🪔', '🚩', '🥥', '📜'];

export default function BrandingSettingsStudio({ showToast }) {
  const [branding, setBranding] = useState(DEFAULT_BRANDING);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  useEffect(() => {
    const current = getStoredBranding();
    setBranding(current);
    applyFaviconToDocument(current);

    const handleUpdate = () => {
      setBranding(getStoredBranding());
    };
    window.addEventListener('brandingUpdated', handleUpdate);
    return () => window.removeEventListener('brandingUpdated', handleUpdate);
  }, []);

  // Handle local image file upload for Logo
  const handleLogoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      if (showToast) showToast('error', 'Please select a valid image file (PNG, SVG, WebP, JPG)');
      return;
    }

    setIsUploadingLogo(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setBranding(prev => ({
        ...prev,
        logoType: 'image',
        logoUrl: dataUrl
      }));
      setIsUploadingLogo(false);
      if (showToast) showToast('success', `Uploaded logo (${Math.round(file.size / 1024)} KB)`);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    const saved = saveBranding(branding);
    if (saved) {
      applyFaviconToDocument(saved);
      setSavedSuccess(true);
      if (showToast) {
        showToast('success', '✨ Brand Logo updated successfully across the entire website!');
      }
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleReset = () => {
    if (confirm('Reset logo back to official Astadasapeetam branding?')) {
      setBranding(DEFAULT_BRANDING);
      saveBranding(DEFAULT_BRANDING);
      if (showToast) showToast('success', 'Reset branding to defaults');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#240409] via-[#3a0812] to-[#240409] text-white p-6 sm:p-7 border-b border-amber-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center text-2xl shadow-inner">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg sm:text-xl font-serif font-black text-amber-100">
                  Primary Website Brand Logo &amp; Identity
                </h3>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Brand Identity
                </span>
              </div>
              <p className="text-xs text-amber-200/70 mt-0.5">
                వెబ్‌సైట్ ప్రధాన లోగోను సులభంగా మార్చండి లేదా నూతన లోగోను అప్‌లోడ్ చేయండి
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition cursor-pointer"
            >
              Reset Defaults
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 px-4 py-2 rounded-xl text-xs font-black shadow-md border border-amber-300/40 flex items-center space-x-1.5 cursor-pointer transition"
            >
              <Check className="w-4 h-4 text-stone-950" />
              <span>Save Logo</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7 space-y-6">
        {savedSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-2xl text-xs font-bold flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Brand Logo saved! Real-time changes applied to Header &amp; Navigation.</span>
          </div>
        )}

        {/* WEBSITE LOGO */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              <h4 className="font-black text-stone-900 text-sm uppercase tracking-wider flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-amber-600" />
                <span>Website Brand Logo (వెబ్‌సైట్ లోగో)</span>
              </h4>
            </div>
            <span className="text-[11px] text-stone-400">Header, Footer &amp; Navigation</span>
          </div>

          {/* Logo Type Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start space-x-3 ${
              branding.logoType === 'image'
                ? 'bg-amber-50/80 border-amber-400 text-amber-950 shadow-xs'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}>
              <input
                type="radio"
                name="logoType"
                checked={branding.logoType === 'image'}
                onChange={() => setBranding({ ...branding, logoType: 'image' })}
                className="mt-0.5 accent-amber-600"
              />
              <div>
                <div className="font-bold text-xs flex items-center space-x-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
                  <span>Custom Graphic Image Logo</span>
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  Upload custom PNG / SVG / WebP transparent logo image
                </div>
              </div>
            </label>

            <label className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start space-x-3 ${
              branding.logoType === 'text_icon'
                ? 'bg-amber-50/80 border-amber-400 text-amber-950 shadow-xs'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}>
              <input
                type="radio"
                name="logoType"
                checked={branding.logoType === 'text_icon'}
                onChange={() => setBranding({ ...branding, logoType: 'text_icon' })}
                className="mt-0.5 accent-amber-600"
              />
              <div>
                <div className="font-bold text-xs flex items-center space-x-1.5">
                  <Type className="w-3.5 h-3.5 text-amber-700" />
                  <span>Sacred Emblem + Typography Logo</span>
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  Emblem badge (🕉️) with bold brand name &amp; tagline
                </div>
              </div>
            </label>
          </div>

          {/* Image Logo Controls */}
          {branding.logoType === 'image' && (
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 text-xs block mb-1">
                    Upload Logo File from Computer
                  </label>
                  <label className="flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-dashed border-stone-300 rounded-xl hover:border-amber-500 cursor-pointer transition text-xs font-semibold text-stone-700 shadow-2xs">
                    <Upload className="w-4 h-4 text-amber-600" />
                    <span>{isUploadingLogo ? 'Processing Image...' : 'Click to Upload Logo File (PNG / SVG / WebP)'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    Recommended: Transparent PNG or SVG (max height 60px)
                  </span>
                </div>

                <div>
                  <label className="font-bold text-stone-700 text-xs block mb-1">
                    Or Enter Image URL / Public Path
                  </label>
                  <input
                    type="text"
                    placeholder="/images/custom_logo.png or https://..."
                    value={branding.logoUrl}
                    onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-amber-600 font-mono shadow-2xs"
                  />
                  <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1">
                    <span>Direct web link or static folder path</span>
                    {branding.logoUrl && (
                      <button
                        type="button"
                        onClick={() => setBranding({ ...branding, logoUrl: '' })}
                        className="text-rose-600 hover:underline cursor-pointer"
                      >
                        Clear Image
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Logo Height Adjuster */}
              <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs font-bold text-stone-700">
                  <Sliders className="w-3.5 h-3.5 text-stone-500" />
                  <span>Logo Display Height:</span>
                  <span className="font-mono text-amber-800">{branding.logoHeight || 44}px</span>
                </div>
                <input
                  type="range"
                  min="28"
                  max="72"
                  value={branding.logoHeight || 44}
                  onChange={(e) => setBranding({ ...branding, logoHeight: parseInt(e.target.value) })}
                  className="w-48 accent-amber-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Text & Typography Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="font-bold text-stone-700 text-xs block mb-1">
                Website Brand Name / Title *
              </label>
              <input
                type="text"
                value={branding.siteTitle}
                onChange={(e) => setBranding({ ...branding, siteTitle: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 focus:outline-none focus:border-amber-600"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 text-xs block mb-1">
                Website Tagline / Subtitle
              </label>
              <input
                type="text"
                value={branding.siteTagline}
                onChange={(e) => setBranding({ ...branding, siteTagline: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          {/* Live Logo Viewport Previews */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
              Live Header Appearance Preview (Light &amp; Dark Viewports)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Light Viewport (Public Website Header) */}
              <div className="bg-white border border-[#ebdcc7] rounded-2xl p-4 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {branding.logoType === 'image' && branding.logoUrl ? (
                    <img
                      src={branding.logoUrl}
                      alt={branding.siteTitle}
                      style={{ height: `${branding.logoHeight || 44}px` }}
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#78131e] to-[#9e1c2a] flex items-center justify-center text-amber-300 font-serif font-black text-xl shadow-sm border border-amber-300/40">
                        {branding.logoEmoji || '🕉️'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-base tracking-tight text-[#78131e] uppercase font-serif whitespace-nowrap">
                          {branding.siteTitle || 'Astadasapeetam.com'}
                        </span>
                        <span className="text-[9.5px] tracking-widest text-amber-800 font-medium uppercase -mt-0.5 whitespace-nowrap">
                          {branding.siteTagline || 'Devotion • Faith • Dharma'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                  Public Header
                </span>
              </div>

              {/* Dark Viewport (Admin Console Header) */}
              <div className="bg-[#180A24] border border-amber-500/30 rounded-2xl p-4 shadow-xs flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  {branding.logoType === 'image' && branding.logoUrl ? (
                    <img
                      src={branding.logoUrl}
                      alt={branding.siteTitle}
                      style={{ height: `${Math.min(38, branding.logoHeight || 44)}px` }}
                      className="object-contain brightness-110"
                    />
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f59e0b] via-[#ec4899] to-[#8b5cf6] flex items-center justify-center font-black text-white text-lg shadow-md">
                        {branding.logoEmoji || '🕉️'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-xs tracking-wider text-white font-serif uppercase">
                          {branding.siteTitle || 'ASTADASAPEETAM'}
                        </span>
                        <span className="text-[9px] text-amber-300 font-semibold tracking-wider uppercase">
                          Super Admin Console
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-mono font-bold bg-white/10 text-amber-300 px-2 py-0.5 rounded border border-white/20">
                  Admin Sidebar
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Logo changes are saved instantly across Public Sanctuary and Admin Console.</span>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 font-black px-6 py-2.5 rounded-xl shadow border border-amber-300/40 text-xs flex items-center justify-center space-x-2 cursor-pointer transition"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Apply &amp; Save Brand Logo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
