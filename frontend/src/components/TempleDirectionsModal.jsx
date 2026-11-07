'use client';

import React, { useState } from 'react';
import { 
  MapPin, X, Car, Bus, Train, Plane, Footprints, 
  ExternalLink, Navigation, Clock, ShieldAlert, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function TempleDirectionsModal({ temple, onClose }) {
  if (!temple) return null;

  const [startingCity, setStartingCity] = useState('Hyderabad');
  const [selectedMode, setSelectedMode] = useState('car'); // 'car' | 'bus' | 'train' | 'flight' | 'walk'
  const [customOrigin, setCustomOrigin] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const effectiveOrigin = useCustom && customOrigin.trim() ? customOrigin.trim() : startingCity;

  // Approximate distance estimates from major Indian hubs to each temple
  const getEstimatedDistance = (origin, destLat, destLng) => {
    // Rough coordinates for major origins
    const cityCoords = {
      'Hyderabad': { lat: 17.3850, lng: 78.4867 },
      'Vijayawada': { lat: 16.5062, lng: 80.6480 },
      'Visakhapatnam': { lat: 17.6868, lng: 83.2185 },
      'Bangalore': { lat: 12.9716, lng: 77.5946 },
      'Chennai': { lat: 13.0827, lng: 80.2707 },
      'Delhi': { lat: 28.6139, lng: 77.2090 },
      'Mumbai': { lat: 19.0760, lng: 72.8777 },
      'Kolkata': { lat: 22.5726, lng: 88.3639 }
    };

    const c = cityCoords[origin] || cityCoords['Hyderabad'];
    // Haversine formula
    const R = 6371; // km
    const dLat = (destLat - c.lat) * Math.PI / 180;
    const dLng = (destLng - c.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(c.lat * Math.PI / 180) * Math.cos(destLat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const rad = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const straightKm = Math.round(R * rad);
    const roadKm = Math.round(straightKm * 1.25); // ~25% road curvature

    return roadKm;
  };

  const roadKm = getEstimatedDistance(effectiveOrigin, temple.lat, temple.lng);
  const driveHours = Math.floor(roadKm / 55);
  const driveMins = Math.round((roadKm % 55) / 55 * 60);

  // Google Maps URLs
  const gmapsEmbedUrl = `https://maps.google.com/maps?q=${temple.lat},${temple.lng}&hl=en&z=13&output=embed`;
  const gmapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(effectiveOrigin)}&destination=${temple.lat},${temple.lng}&travelmode=${selectedMode === 'bus' ? 'transit' : selectedMode === 'walk' ? 'walking' : 'driving'}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#ebdcc7] animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#78131e] text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-bold flex items-center justify-center text-xs">
              #{temple.peethaNumber}
            </div>
            <div>
              <span className="text-[10px] text-amber-300 uppercase tracking-widest font-extrabold block">
                Google Maps Navigation & Travel Route
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg">
                {temple.name} ({temple.city})
              </h3>
            </div>
          </div>
          <button 
            suppressHydrationWarning
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Origin Selector & Mode Bar */}
        <div className="p-4 bg-amber-50/60 border-b border-amber-200/80 space-y-3 shrink-0 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* Origin City dropdown */}
            <div>
              <label className="block text-stone-700 font-bold text-xs mb-1">
                📍 Your Starting Point:
              </label>
              {!useCustom ? (
                <div className="flex gap-2">
                  <select
                    suppressHydrationWarning
                    value={startingCity}
                    onChange={(e) => setStartingCity(e.target.value)}
                    className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-1.5 font-semibold text-stone-800 focus:outline-hidden focus:border-[#78131e]"
                  >
                    <option value="Hyderabad">Hyderabad (Telangana)</option>
                    <option value="Vijayawada">Vijayawada (AP)</option>
                    <option value="Visakhapatnam">Visakhapatnam (AP)</option>
                    <option value="Bangalore">Bengaluru (Karnataka)</option>
                    <option value="Chennai">Chennai (Tamil Nadu)</option>
                    <option value="Delhi">New Delhi / NCR</option>
                    <option value="Mumbai">Mumbai (Maharashtra)</option>
                    <option value="Kolkata">Kolkata (West Bengal)</option>
                  </select>
                  <button
                    suppressHydrationWarning
                    onClick={() => setUseCustom(true)}
                    className="text-[11px] bg-stone-200 hover:bg-stone-300 text-stone-700 px-2 py-1 rounded font-bold whitespace-nowrap cursor-pointer"
                  >
                    Custom City
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    suppressHydrationWarning
                    type="text"
                    value={customOrigin}
                    onChange={(e) => setCustomOrigin(e.target.value)}
                    placeholder="Enter city or town name..."
                    className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-hidden focus:border-[#78131e]"
                  />
                  <button
                    suppressHydrationWarning
                    onClick={() => setUseCustom(false)}
                    className="text-[11px] bg-stone-200 hover:bg-stone-300 text-stone-700 px-2 py-1 rounded font-bold whitespace-nowrap cursor-pointer"
                  >
                    Preset List
                  </button>
                </div>
              )}
            </div>

            {/* Travel Time Snapshot */}
            <div className="bg-white border border-amber-200 rounded-xl p-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">Estimated Distance:</span>
                <span className="text-base font-black text-[#78131e]">~{roadKm.toLocaleString()} km</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">Driving Time:</span>
                <span className="text-sm font-bold text-stone-800">
                  {driveHours > 0 ? `${driveHours}h ${driveMins}m` : `${driveMins} mins`}
                </span>
              </div>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pt-1">
            <button
              suppressHydrationWarning
              onClick={() => setSelectedMode('car')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedMode === 'car' ? 'bg-[#78131e] text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-100'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Drive (Car/Taxi)</span>
            </button>

            <button
              suppressHydrationWarning
              onClick={() => setSelectedMode('bus')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedMode === 'bus' ? 'bg-[#78131e] text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-100'
              }`}
            >
              <Bus className="w-3.5 h-3.5" />
              <span>Bus / RTC</span>
            </button>

            <button
              suppressHydrationWarning
              onClick={() => setSelectedMode('train')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedMode === 'train' ? 'bg-[#78131e] text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-100'
              }`}
            >
              <Train className="w-3.5 h-3.5" />
              <span>Rail (Train)</span>
            </button>

            <button
              suppressHydrationWarning
              onClick={() => setSelectedMode('flight')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedMode === 'flight' ? 'bg-[#78131e] text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-100'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Flight</span>
            </button>

            <button
              suppressHydrationWarning
              onClick={() => setSelectedMode('walk')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedMode === 'walk' ? 'bg-[#78131e] text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-100'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>Trek / Walk</span>
            </button>
          </div>

        </div>

        {/* Content Body: Transit Details + Live Google Map */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Pilgrim Transit Special Advisory Alert */}
          {temple.transitGuide && temple.transitGuide.specialTransitNote && (
            <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-3 flex gap-2.5 text-xs text-amber-950">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Sacred Pilgrim Transit Note:</span>
                <p className="leading-relaxed mt-0.5">{temple.transitGuide.specialTransitNote}</p>
              </div>
            </div>
          )}

          {/* Mode Details Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs space-y-1.5">
            {selectedMode === 'car' && (
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Car className="w-4 h-4 text-[#78131e]" />
                  <span>Road & Highway Directions:</span>
                </div>
                <p className="text-stone-700">{temple.transitGuide.car}</p>
                <p className="text-stone-500 text-[11px] mt-1">
                  🚗 Destination Roadhead: {temple.transitGuide.roadhead}
                </p>
              </div>
            )}

            {selectedMode === 'bus' && (
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Bus className="w-4 h-4 text-amber-700" />
                  <span>Bus & State RTC Connectivity:</span>
                </div>
                <p className="text-stone-700">{temple.transitGuide.bus}</p>
                <p className="text-stone-500 text-[11px] mt-1">
                  💡 Tip: Regular express buses connect from state transport terminals to the temple base.
                </p>
              </div>
            )}

            {selectedMode === 'train' && (
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Train className="w-4 h-4 text-emerald-700" />
                  <span>Nearest Railway Station:</span>
                </div>
                <p className="text-stone-700">{temple.transitGuide.train}</p>
                <p className="text-stone-500 text-[11px] mt-1">
                  🚆 Station taxis, auto-rickshaws, and devasthanam feeder buses are available outside the railway station.
                </p>
              </div>
            )}

            {selectedMode === 'flight' && (
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Plane className="w-4 h-4 text-blue-700" />
                  <span>Nearest Domestic & International Airport:</span>
                </div>
                <p className="text-stone-700">{temple.transitGuide.flight}</p>
                <p className="text-stone-500 text-[11px] mt-1">
                  ✈️ Prepaid airport taxi counters and car rentals connect directly to the pilgrimage shrine.
                </p>
              </div>
            )}

            {selectedMode === 'walk' && (
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Footprints className="w-4 h-4 text-stone-800" />
                  <span>Local Walking & Pradakshina Path:</span>
                </div>
                <p className="text-stone-700">
                  {temple.transitGuide.roadhead} • Footwear deposit counters located at outer gopuram.
                </p>
                <p className="text-stone-500 text-[11px] mt-1">
                  🚶 Follow the designated Mada streets for temple circumambulation (Giri Pradakshina / Parikrama).
                </p>
              </div>
            )}
          </div>

          {/* Embedded Live Google Map */}
          <div className="rounded-xl overflow-hidden border border-stone-300 shadow-inner h-64 sm:h-72 w-full relative bg-stone-100">
            <iframe
              title={`Google Map - ${temple.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={gmapsEmbedUrl}
            />
            {/* Map corner badge */}
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs text-[10px] font-bold text-stone-800 flex items-center gap-1 border border-stone-200 pointer-events-none">
              <MapPin className="w-3 h-3 text-[#78131e]" />
              <span>{temple.lat.toFixed(4)}, {temple.lng.toFixed(4)}</span>
            </div>
          </div>

        </div>

        {/* Footer with External Google Maps Navigation Button */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-stone-600 text-center sm:text-left">
            <span>Destination: </span>
            <span className="font-bold text-stone-900">{temple.name}, {temple.city}</span>
          </div>

          <a
            suppressHydrationWarning
            href={gmapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#78131e] hover:bg-[#600e17] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-amber-300 fill-current" />
            <span>Open Live GPS in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-300" />
          </a>
        </div>

      </div>
    </div>
  );
}
