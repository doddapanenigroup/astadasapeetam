'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  Sparkles,
  Zap,
  Sliders,
  Crop,
  Layers,
  ArrowRight,
  Loader2,
  Download,
  FileCheck,
  TrendingDown
} from 'lucide-react';

export const DIMENSION_PRESETS = [
  {
    id: 'hero',
    name: 'Main Hero Portal',
    ratio: '16:9',
    aspectRatio: 16 / 9,
    width: 1920,
    height: 1080,
    icon: '🌟',
    badge: '1920 × 1080 (16:9)',
    desc: 'For top homepage hero banners, main feature sliders, and full-width devotional portals without blur.'
  },
  {
    id: 'content',
    name: 'Normal Content Card',
    ratio: '4:3',
    aspectRatio: 4 / 3,
    width: 800,
    height: 600,
    icon: '📰',
    badge: '800 × 600 (4:3)',
    desc: 'For regular devotional feeds, temple guides, daily slokas, stotras, and fast mobile reading.'
  },
  {
    id: 'avatar',
    name: 'Sacred Deity / Icon',
    ratio: '1:1',
    aspectRatio: 1,
    width: 600,
    height: 600,
    icon: '🛕',
    badge: '600 × 600 (1:1)',
    desc: 'For deities, divine avatars, sacred yantras, astrology rasi icons, and circular devotee badges.'
  }
];

export default function ImageOptimizationStudio({
  featuredImage,
  onImageChange,
  showToast
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [originalMeta, setOriginalMeta] = useState(null);
  const [activePreset, setActivePreset] = useState('hero');
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  // Conversion States
  const [targetFormat, setTargetFormat] = useState('webp'); // 'webp' | 'avif'
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('');
  const [isConverted, setIsConverted] = useState(false);
  const [convertedMeta, setConvertedMeta] = useState(null);

  // URL fallback input mode
  const [inputMode, setInputMode] = useState('upload'); // 'upload' | 'url'
  const fileInputRef = useRef(null);

  // Handle file drop/upload
  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      if (showToast) showToast('error', 'Please select a valid image file (JPEG, PNG, WebP, AVIF, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        setOriginalUrl(dataUrl);
        setSelectedFile(file);
        setOriginalMeta({
          name: file.name,
          type: file.type || 'image/jpeg',
          sizeBytes: file.size,
          sizeFormatted: formatBytes(file.size),
          width: img.width,
          height: img.height,
          aspectRatio: (img.width / img.height).toFixed(2)
        });
        // Reset conversion state
        setIsConverted(false);
        setConvertedMeta(null);
        setProgress(0);
        setProgressStage('');
        setZoom(1);
        setPanX(0);
        setPanY(0);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isConverted) return; // Locked once converted
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Convert image to WebP or AVIF via HTML5 Canvas with verified compression
  const handleConvert = async () => {
    if (!originalUrl || isConverted || isConverting) return;

    setIsConverting(true);
    setProgress(15);
    setProgressStage(`Analyzing source image (${originalMeta?.width}×${originalMeta?.height}px, ${originalMeta?.sizeFormatted})...`);

    const preset = DIMENSION_PRESETS.find(p => p.id === activePreset) || DIMENSION_PRESETS[0];

    // Stage 2: Framing & crop calculation
    setTimeout(() => {
      setProgress(45);
      setProgressStage(`Applying ${preset.ratio} crop & ${zoom}x zoom transform...`);
    }, 300);

    // Stage 3: Encoding & Quantization
    setTimeout(() => {
      setProgress(75);
      setProgressStage(`Compressing into next-gen ${targetFormat.toUpperCase()} with 85% high-fidelity quality...`);
    }, 700);

    // Stage 4: Canvas rendering & binary size calculation
    setTimeout(() => {
      try {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = preset.width;
          canvas.height = preset.height;
          const ctx = canvas.getContext('2d');

          // High quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Clear background (neutral dark/warm tone for transparency)
          ctx.fillStyle = '#180A24';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Calculate aspect ratio crop
          const targetAspect = preset.aspectRatio;
          const imgAspect = img.width / img.height;

          let renderW, renderH;
          if (imgAspect > targetAspect) {
            renderH = preset.height;
            renderW = renderH * imgAspect;
          } else {
            renderW = preset.width;
            renderH = renderW / imgAspect;
          }

          // Apply zoom
          renderW *= zoom;
          renderH *= zoom;

          // Apply centering + user pan offsets
          const offsetX = (preset.width - renderW) / 2 + (panX * preset.width) / 100;
          const offsetY = (preset.height - renderH) / 2 + (panY * preset.height) / 100;

          ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

          // Export as WebP or AVIF
          const mimeType = targetFormat === 'avif' ? 'image/avif' : 'image/webp';
          const quality = 0.85;

          let convertedDataUrl = canvas.toDataURL(mimeType, quality);

          // Verification & Fallback check:
          // If browser canvas encoder does not support AVIF natively, it returns image/png.
          // In that case, seamlessly fall back to high-compression WebP.
          let finalMime = mimeType;
          let isFallback = false;
          if (targetFormat === 'avif' && !convertedDataUrl.startsWith('data:image/avif')) {
            convertedDataUrl = canvas.toDataURL('image/webp', quality);
            finalMime = 'image/webp';
            isFallback = true;
          }

          // Calculate compressed size from Base64 binary payload
          const base64Length = convertedDataUrl.length - (convertedDataUrl.indexOf(',') + 1);
          const convertedSizeBytes = Math.round((base64Length * 3) / 4);
          const diffBytes = Math.max(0, originalMeta.sizeBytes - convertedSizeBytes);
          const reductionPercent = Math.max(0, (((originalMeta.sizeBytes - convertedSizeBytes) / originalMeta.sizeBytes) * 100)).toFixed(1);

          setProgress(100);
          setProgressStage(`Optimization complete! Saved ${reductionPercent}% bytes (${formatBytes(diffBytes)}).`);

          setTimeout(() => {
            setIsConverting(false);
            setIsConverted(true); // LOCK THE STATE
            const meta = {
              format: isFallback ? 'WEBP (Universal Fallback)' : targetFormat.toUpperCase(),
              targetFormat: targetFormat.toUpperCase(),
              mime: finalMime,
              isFallback,
              dataUrl: convertedDataUrl,
              preset: preset.name,
              dimensions: `${preset.width} × ${preset.height}`,
              aspectRatio: preset.ratio,
              originalSizeFormatted: originalMeta.sizeFormatted,
              originalSizeBytes: originalMeta.sizeBytes,
              convertedSizeFormatted: formatBytes(convertedSizeBytes),
              convertedSizeBytes,
              savedBytesFormatted: formatBytes(diffBytes),
              savingsPercent: reductionPercent,
              timestamp: new Date().toLocaleTimeString()
            };
            setConvertedMeta(meta);

            // Pass to parent
            if (onImageChange) {
              onImageChange(convertedDataUrl, meta);
            }

            if (showToast) {
              showToast(
                'success',
                `✨ Image successfully converted to ${meta.format}! Saved ${reductionPercent}% (${formatBytes(diffBytes)}).`
              );
            }
          }, 350);
        };
        img.src = originalUrl;
      } catch (err) {
        setIsConverting(false);
        if (showToast) showToast('error', 'Image conversion failed: ' + (err.message || 'Unknown error'));
      }
    }, 1100);
  };

  // Reset / Deselect handler
  const handleDeselect = () => {
    setSelectedFile(null);
    setOriginalUrl(null);
    setOriginalMeta(null);
    setIsConverted(false);
    setConvertedMeta(null);
    setProgress(0);
    setProgressStage('');
    setZoom(1);
    setPanX(0);
    setPanY(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (showToast) showToast('info', 'Image deselected. You can now choose a new photo and conversion format.');
  };

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  const activePresetObj = DIMENSION_PRESETS.find(p => p.id === activePreset) || DIMENSION_PRESETS[0];

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header with Recommended Dimensions Guide Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>Devotional Image Attachment &amp; WebP / AVIF Converter</span>
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Upload high-resolution photography, crop &amp; zoom with recommended dimensions, and convert to ultra-fast next-gen WebP or AVIF.
          </p>
        </div>

        {/* Upload vs URL Mode Switcher */}
        <div className="flex items-center space-x-1.5 p-1 bg-stone-100 rounded-xl text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              inputMode === 'upload' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            📸 Upload &amp; Convert
          </button>
          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              inputMode === 'url' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            🔗 External URL
          </button>
        </div>
      </div>

      {/* RECOMMENDED DIMENSION GUIDE BOX */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Recommended Dimensions for Astadasapeetam</span>
          </span>
          <span className="text-[10px] text-amber-700 font-mono font-bold">Core Web Vitals Optimized</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DIMENSION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              disabled={isConverted}
              onClick={() => setActivePreset(preset.id)}
              className={`p-3 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between ${
                activePreset === preset.id
                  ? 'bg-white border-amber-500 ring-2 ring-amber-400/40 shadow-xs'
                  : 'bg-white/60 hover:bg-white border-stone-200 text-stone-600'
              } ${isConverted ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-lg">{preset.icon}</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {preset.ratio}
                  </span>
                </div>
                <div className="font-bold text-xs text-stone-900 mt-1">{preset.name}</div>
                <div className="text-[10px] text-amber-700 font-mono font-bold">{preset.badge}</div>
              </div>
              <p className="text-[10px] text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                {preset.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* UPLOAD & CONVERSION WORKBENCH */}
      {inputMode === 'upload' && (
        <div className="space-y-5">
          {!originalUrl ? (
            /* Dropzone when no file is selected */
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-3xl p-8 sm:p-12 text-center bg-stone-50 hover:bg-amber-50/40 transition cursor-pointer group space-y-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center text-2xl group-hover:scale-110 transition shadow-inner">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <div className="font-black text-stone-800 text-sm">
                  Click to Browse or Drag &amp; Drop Devotional Image
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Supports JPEG, PNG, TIFF, WebP, BMP up to 25 MB
                </p>
              </div>
              <div className="inline-flex items-center space-x-2 text-[11px] text-amber-800 font-bold bg-amber-100/80 px-3 py-1 rounded-full">
                <span>⚡ Auto-crops to {activePresetObj.name} ({activePresetObj.badge})</span>
              </div>
            </div>
          ) : (
            /* Image Loaded: Adjust, Crop, Zoom & Convert */
            <div className="space-y-4">
              {/* Top Details & Reset Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg font-bold shrink-0">
                    🖼️
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 truncate max-w-xs">{originalMeta?.name}</div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      Original: <span className="font-bold text-stone-700">{originalMeta?.sizeFormatted}</span> ({originalMeta?.width}×{originalMeta?.height}px)
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {isConverted && (
                    <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-xs">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Converted to {convertedMeta?.format} (Locked)</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleDeselect}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs flex items-center space-x-1 cursor-pointer transition"
                    title="Deselect photo to pick a new one or change conversion format"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Deselect Photo</span>
                  </button>
                </div>
              </div>

              {/* Interactive Canvas / Visual Preview with Crop Aspect Mask & Loading Overlay */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left: Interactive Preview Frame */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400 bg-stone-950 shadow-inner flex items-center justify-center">
                    {/* Visual Aspect Ratio Box */}
                    <div
                      className="w-full relative overflow-hidden flex items-center justify-center"
                      style={{
                        aspectRatio: `${activePresetObj.width} / ${activePresetObj.height}`,
                        maxHeight: '360px'
                      }}
                    >
                      <img
                        src={isConverted && convertedMeta?.dataUrl ? convertedMeta.dataUrl : originalUrl}
                        alt="Crop & Zoom Viewport"
                        className="transition-transform duration-75 select-none pointer-events-none"
                        style={{
                          transform: isConverted ? 'none' : `scale(${zoom}) translate(${panX}%, ${panY}%)`,
                          transformOrigin: 'center center',
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: isConverted ? 'cover' : 'contain'
                        }}
                      />

                      {/* Golden Rule of Thirds Guide Mask (Only during edit) */}
                      {!isConverted && !isConverting && (
                        <div className="absolute inset-0 pointer-events-none border border-amber-400/40 grid grid-cols-3 grid-rows-3">
                          <div className="border-r border-b border-amber-300/20"></div>
                          <div className="border-r border-b border-amber-300/20"></div>
                          <div className="border-b border-amber-300/20"></div>
                          <div className="border-r border-b border-amber-300/20"></div>
                          <div className="border-r border-b border-amber-300/20"></div>
                          <div className="border-b border-amber-300/20"></div>
                          <div className="border-r border-b border-amber-300/20"></div>
                          <div className="border-r border-b border-amber-300/20"></div>
                          <div></div>
                        </div>
                      )}

                      {/* Viewport Badge */}
                      <div className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400/40 text-[10px] text-amber-200 font-mono font-bold flex items-center space-x-1 z-10">
                        <span>{activePresetObj.icon}</span>
                        <span>{activePresetObj.badge}</span>
                      </div>

                      {/* VISUAL LOADING OVERLAY WITH PROMINENT SPINNER SYMBOL */}
                      {isConverting && (
                        <div className="absolute inset-0 z-30 bg-stone-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in fade-in duration-200">
                          {/* Animated Glowing Spinner with Sacred Centerpiece */}
                          <div className="relative flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
                            <div className="absolute w-10 h-10 rounded-full border-4 border-rose-500/30 border-b-rose-400 animate-spin animate-reverse" />
                            <Sparkles className="w-5 h-5 text-amber-300 absolute animate-pulse" />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-mono text-lg font-black text-amber-300">{progress}%</span>
                              <span className="text-white text-xs font-bold uppercase tracking-wider">
                                Converting to {targetFormat.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-[11px] text-amber-200/90 font-mono max-w-xs truncate">
                              {progressStage}
                            </p>
                          </div>

                          {/* Smooth Viewport Progress Track */}
                          <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interactive Zoom & Pan Controls (Disabled when locked) */}
                  {!isConverted ? (
                    <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-700 flex items-center space-x-1">
                          <Sliders className="w-3.5 h-3.5 text-amber-600" />
                          <span>Zoom &amp; Framing Adjustment</span>
                        </span>
                        <span className="font-mono text-stone-500 font-bold">{(zoom * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ZoomOut className="w-4 h-4 text-stone-400" />
                        <input
                          type="range"
                          min="1"
                          max="3"
                          step="0.05"
                          value={zoom}
                          onChange={(e) => setZoom(parseFloat(e.target.value))}
                          className="w-full accent-amber-600 cursor-pointer"
                        />
                        <ZoomIn className="w-4 h-4 text-stone-400" />
                        <button
                          type="button"
                          onClick={() => { setZoom(1); setPanX(0); setPanY(0); }}
                          className="px-2 py-1 rounded bg-stone-200 hover:bg-stone-300 text-[10px] font-bold text-stone-700 cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Crop and zoom locked after conversion. To modify, click &ldquo;Deselect Photo&rdquo;.</span>
                    </div>
                  )}
                </div>

                {/* Right: Format Selector & Conversion Actions */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  {/* Format Choice: WebP vs AVIF */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-800 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span>Select Output Format</span>
                      </span>
                      {isConverted && (
                        <span className="text-[10px] font-bold text-stone-400 flex items-center space-x-1">
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Option 1: WebP */}
                      <button
                        type="button"
                        disabled={isConverted}
                        onClick={() => setTargetFormat('webp')}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          targetFormat === 'webp'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40'
                            : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                        } ${isConverted && targetFormat !== 'webp' ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-sm">⚡ WebP</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                            targetFormat === 'webp' ? 'bg-amber-800 text-amber-200' : 'bg-stone-100 text-stone-600'
                          }`}>
                            Universal
                          </span>
                        </div>
                        <p className={`text-[10px] mt-1 leading-tight ${targetFormat === 'webp' ? 'text-amber-100' : 'text-stone-400'}`}>
                          100% browser compatibility, ~80% reduction.
                        </p>
                      </button>

                      {/* Option 2: AVIF */}
                      <button
                        type="button"
                        disabled={isConverted}
                        onClick={() => setTargetFormat('avif')}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                          targetFormat === 'avif'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40'
                            : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                        } ${isConverted && targetFormat !== 'avif' ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-sm">🚀 AVIF</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                            targetFormat === 'avif' ? 'bg-amber-800 text-amber-200' : 'bg-stone-100 text-stone-600'
                          }`}>
                            Next-Gen
                          </span>
                        </div>
                        <p className={`text-[10px] mt-1 leading-tight ${targetFormat === 'avif' ? 'text-amber-100' : 'text-stone-400'}`}>
                          Ultra compression, ~90% reduction, HDR support.
                        </p>
                      </button>
                    </div>

                    <p className="text-[10px] text-stone-500 leading-relaxed italic">
                      * Once converted, format cannot be toggled directly. You must deselect the photo to pick another format.
                    </p>
                  </div>

                  {/* Converting Progress Bar (Sidebar duplicate for full awareness) */}
                  {isConverting && (
                    <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                        <span className="flex items-center space-x-1.5">
                          <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                          <span>Converting to {targetFormat.toUpperCase()}...</span>
                        </span>
                        <span className="font-mono">{progress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-amber-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-700 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-amber-800 font-mono truncate">{progressStage}</div>
                    </div>
                  )}

                  {/* PROMINENT BEFORE VS AFTER SIZE CONVERSION CARD */}
                  {isConverted && convertedMeta && (
                    <div className="bg-gradient-to-br from-emerald-50 via-white to-amber-50/40 border-2 border-emerald-400 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-sm">
                      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-emerald-200/80">
                        <div className="flex items-center space-x-2 text-emerald-800 font-black text-xs uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Ready for Production ({convertedMeta.format})</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                          ⚡ -{convertedMeta.savingsPercent}% Byte Reduction
                        </span>
                      </div>

                      {/* Visual Side-by-Side Size Metrics */}
                      <div className="grid grid-cols-11 gap-2 items-center text-center">
                        {/* Original Size */}
                        <div className="col-span-5 bg-white p-3 rounded-xl border border-stone-200/90 text-left shadow-2xs">
                          <div className="text-[9px] uppercase font-bold text-stone-400 tracking-wider">Original Size</div>
                          <div className="text-base font-black text-stone-800 mt-0.5 truncate">{convertedMeta.originalSizeFormatted}</div>
                          <div className="text-[10px] text-stone-400 font-mono truncate mt-0.5">
                            {originalMeta?.width}×{originalMeta?.height}px
                          </div>
                        </div>

                        {/* Arrow with reduction badge */}
                        <div className="col-span-1 flex items-center justify-center text-stone-400">
                          <ArrowRight className="w-4 h-4 text-amber-600 stroke-[2.5]" />
                        </div>

                        {/* Converted Size */}
                        <div className="col-span-5 bg-emerald-100/50 p-3 rounded-xl border-2 border-emerald-400 text-left shadow-xs">
                          <div className="text-[9px] uppercase font-bold text-emerald-800 tracking-wider">
                            Optimized {convertedMeta.format}
                          </div>
                          <div className="text-base font-black text-emerald-800 mt-0.5 truncate">{convertedMeta.convertedSizeFormatted}</div>
                          <div className="text-[10px] text-emerald-700 font-mono truncate mt-0.5">
                            {convertedMeta.dimensions}px
                          </div>
                        </div>
                      </div>

                      {/* Bandwidth Savings Summary Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-stone-600">
                          <span>Bandwidth saved per visit:</span>
                          <span className="text-emerald-700 font-mono font-bold">
                            Saved {convertedMeta.savedBytesFormatted} ({convertedMeta.savingsPercent}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                            style={{ width: `${convertedMeta.savingsPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Direct Download Action */}
                      <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
                        <a
                          href={convertedMeta.dataUrl}
                          download={`astadasapeetam-${activePreset}-${Date.now()}.${convertedMeta.isFallback ? 'webp' : targetFormat}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold transition shadow-2xs cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download .{convertedMeta.isFallback ? 'webp' : targetFormat} File</span>
                        </a>

                        <span className="text-[10px] text-stone-500 italic">
                          🔒 Locked for production
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Conversion Button with Loading Symbol State */}
                  {!isConverted ? (
                    <button
                      type="button"
                      disabled={isConverting}
                      onClick={handleConvert}
                      className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed text-stone-950 p-3.5 rounded-2xl font-black text-xs shadow-md flex items-center justify-center space-x-2 border border-amber-300/40 cursor-pointer transition transform active:scale-95"
                    >
                      {isConverting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                          <span>Converting {originalMeta?.sizeFormatted} to {targetFormat.toUpperCase()} ({progress}%)...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 text-stone-950" />
                          <span>Convert &amp; Lock into {targetFormat.toUpperCase()}</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleDeselect}
                        className="text-xs text-rose-600 hover:text-rose-800 font-bold underline cursor-pointer"
                      >
                        Want to change format or re-crop? Deselect &amp; Start Over
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* URL INPUT MODE (FALLBACK) */}
      {inputMode === 'url' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-bold text-stone-700 text-xs">Direct Image Web URL</label>
            <div className="flex items-center space-x-1.5 text-[10px]">
              <span className="text-stone-400">Presets:</span>
              <button
                type="button"
                onClick={() => onImageChange && onImageChange('/images/temple_kashi.jpg')}
                className="text-amber-700 hover:underline font-semibold cursor-pointer"
              >
                Temple
              </button>
              <span className="text-stone-300">•</span>
              <button
                type="button"
                onClick={() => onImageChange && onImageChange('/images/panchangam_hero.jpg')}
                className="text-amber-700 hover:underline font-semibold cursor-pointer"
              >
                Vedic
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="https://images.unsplash.com/photo-... or /images/temple.webp"
            value={featuredImage || ''}
            onChange={(e) => onImageChange && onImageChange(e.target.value)}
            className="w-full border border-stone-300 rounded-xl p-2.5 text-xs font-mono focus:outline-none focus:border-amber-600"
          />
          <p className="text-[11px] text-stone-500">
            For maximum performance, prefer uploading via the &ldquo;Upload &amp; Convert&rdquo; tab above to ensure automatic WebP / AVIF compression.
          </p>
        </div>
      )}
    </div>
  );
}
