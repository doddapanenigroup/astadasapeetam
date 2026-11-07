'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, X, Car, Bus, Train, Plane, Footprints, 
  Navigation, Clock, ShieldAlert, Sparkles, CheckCircle2,
  LocateFixed, Loader2, ChevronDown, ChevronUp, Route, Landmark
} from 'lucide-react';

export default function TempleDirectionsModal({ temple, onClose }) {
  if (!temple) return null;

  // Origin selection states
  const [startingCity, setStartingCity] = useState('Hyderabad');
  const [selectedMode, setSelectedMode] = useState('car'); // 'car' | 'bus' | 'train' | 'flight' | 'walk'
  const [customOrigin, setCustomOrigin] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  // Live Geolocation state
  const [liveLocation, setLiveLocation] = useState(null); // { lat, lng, label }
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');
  const [showMilestones, setShowMilestones] = useState(true);

  // Preset city coordinates for distance calculation
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

  // Request browser location permission
  const handleRequestLiveLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setGeoLoading(true);
    setGeoError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLiveLocation({
          lat,
          lng,
          label: `My Current Live Location (${lat.toFixed(3)}, ${lng.toFixed(3)})`
        });
        setGeoLoading(false);
      },
      (error) => {
        setGeoLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGeoError('Location access was denied. You can still select your starting city from the dropdown below.');
        } else {
          setGeoError('Unable to retrieve your location. Please choose a starting city.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Determine effective origin coordinates & label
  const effectiveOrigin = liveLocation 
    ? liveLocation.label 
    : (useCustom && customOrigin.trim() ? customOrigin.trim() : startingCity);

  const effectiveOriginCoords = liveLocation 
    ? { lat: liveLocation.lat, lng: liveLocation.lng }
    : (cityCoords[startingCity] || cityCoords['Hyderabad']);

  // Distance calculator using Haversine
  const calculateDistance = (fromLat, fromLng, toLat, toLng) => {
    const R = 6371; // Earth radius in km
    const dLat = (toLat - fromLat) * Math.PI / 180;
    const dLng = (toLng - fromLng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(fromLat * Math.PI / 180) * Math.cos(toLat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const straightKm = Math.round(R * c);
    return Math.round(straightKm * 1.25); // ~25% road curvature
  };

  const roadKm = calculateDistance(
    effectiveOriginCoords.lat,
    effectiveOriginCoords.lng,
    temple.lat,
    temple.lng
  );

  const driveHours = Math.floor(roadKm / 55);
  const driveMins = Math.round((roadKm % 55) / 55 * 60);

  // In-Website Google Maps Embed URL showing the FULL ROUTE LINE from start to finish
  const saddrParam = liveLocation 
    ? `${liveLocation.lat},${liveLocation.lng}` 
    : encodeURIComponent(effectiveOrigin);
  const daddrParam = `${temple.lat},${temple.lng}`;
  const inWebsiteRouteMapUrl = `https://maps.google.com/maps?saddr=${saddrParam}&daddr=${daddrParam}&output=embed`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#ebdcc7] animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="bg-[#78131e] text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-black flex items-center justify-center text-xs">
              #{temple.peethaNumber}
            </div>
            <div>
              <span className="text-[10px] text-amber-300 uppercase tracking-widest font-extrabold block">
                In-Website Route & Live GPS Navigation
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

        {/* Origin Selector Bar with Live GPS Button */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-200/80 space-y-3 shrink-0 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Origin Controls: GPS button + Dropdown */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-stone-700 font-bold text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#78131e]" />
                  <span>Choose Starting Location:</span>
                </label>

                {/* Live GPS Button */}
                <button
                  suppressHydrationWarning
                  onClick={handleRequestLiveLocation}
                  disabled={geoLoading}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-xs ${
                    liveLocation 
                      ? 'bg-emerald-700 text-white border border-emerald-600'
                      : 'bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-400'
                  }`}
                >
                  {geoLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <LocateFixed className="w-3.5 h-3.5" />
                  )}
                  <span>{liveLocation ? 'GPS Connected ✓' : 'Use My Current Live Location'}</span>
                </button>
              </div>

              {/* Input / Dropdown selection */}
              {!liveLocation ? (
                !useCustom ? (
                  <div className="flex gap-2">
                    <select
                      suppressHydrationWarning
                      value={startingCity}
                      onChange={(e) => setStartingCity(e.target.value)}
                      className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-1.5 font-semibold text-stone-800 focus:outline-hidden focus:border-[#78131e] text-xs sm:text-sm"
                    >
                      <option value="Hyderabad">Hyderabad (Telangana)</option>
                      <option value="Vijayawada">Vijayawada (Andhra Pradesh)</option>
                      <option value="Visakhapatnam">Visakhapatnam (Andhra Pradesh)</option>
                      <option value="Bangalore">Bengaluru (Karnataka)</option>
                      <option value="Chennai">Chennai (Tamil Nadu)</option>
                      <option value="Delhi">New Delhi / NCR</option>
                      <option value="Mumbai">Mumbai (Maharashtra)</option>
                      <option value="Kolkata">Kolkata (West Bengal)</option>
                    </select>
                    <button
                      suppressHydrationWarning
                      onClick={() => setUseCustom(true)}
                      className="text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 px-3 py-1.5 rounded-lg font-bold whitespace-nowrap cursor-pointer"
                    >
                      Type City
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      suppressHydrationWarning
                      type="text"
                      value={customOrigin}
                      onChange={(e) => setCustomOrigin(e.target.value)}
                      placeholder="Type your city or town name..."
                      className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-hidden focus:border-[#78131e]"
                    />
                    <button
                      suppressHydrationWarning
                      onClick={() => setUseCustom(false)}
                      className="text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 px-3 py-1.5 rounded-lg font-bold whitespace-nowrap cursor-pointer"
                    >
                      Preset Cities
                    </button>
                  </div>
                )
              ) : (
                /* Live Location Connected Banner */
                <div className="bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-emerald-900 font-semibold">
                  <div className="flex items-center gap-1.5 truncate">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{liveLocation.label}</span>
                  </div>
                  <button
                    suppressHydrationWarning
                    onClick={() => setLiveLocation(null)}
                    className="text-[11px] text-stone-500 hover:text-red-700 underline font-bold shrink-0 ml-2"
                  >
                    Change
                  </button>
                </div>
              )}

              {/* Geolocation Error feedback */}
              {geoError && (
                <p className="text-[11px] text-amber-800 font-medium">
                  ⚠️ {geoError}
                </p>
              )}
            </div>

            {/* Travel Time & Distance Snapshot */}
            <div className="md:col-span-4 bg-white border border-amber-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">Route Distance:</span>
                <span className="text-lg font-black text-[#78131e]">~{roadKm.toLocaleString()} km</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">Est. Driving Time:</span>
                <span className="text-sm font-black text-stone-800">
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

        {/* Content Body: Full Embedded Route Map & In-Website Milestones */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Sacred Pilgrim Transit Advisory (e.g. ropeway, boat, ghat closures) */}
          {temple.transitGuide && temple.transitGuide.specialTransitNote && (
            <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-3 flex gap-2.5 text-xs text-amber-950">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Sacred Pilgrim Transit Note:</span>
                <p className="leading-relaxed mt-0.5">{temple.transitGuide.specialTransitNote}</p>
              </div>
            </div>
          )}

          {/* 100% IN-WEBSITE ROUTE MAP CANVAS */}
          <div className="rounded-xl overflow-hidden border border-stone-300 shadow-inner h-72 sm:h-96 w-full relative bg-stone-100">
            <iframe
              title={`Live In-Website Route Map from ${effectiveOrigin} to ${temple.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={inWebsiteRouteMapUrl}
            />

            {/* In-Map Route Overlay Badge */}
            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold text-stone-800 flex items-center gap-2 border border-stone-200 pointer-events-none">
              <Route className="w-4 h-4 text-[#78131e]" />
              <span>
                {liveLocation ? 'GPS Live Route' : effectiveOrigin} → {temple.name} (~{roadKm} km)
              </span>
            </div>
          </div>

          {/* Mode Instructions Summary */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-xs space-y-2">
            {selectedMode === 'car' && (
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Car className="w-4 h-4 text-[#78131e]" />
                  <span>Road & Highway Route Instructions:</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{temple.transitGuide.car}</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-stone-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Official Temple Parking / Roadhead: <strong>{temple.transitGuide.roadhead}</strong></span>
                </div>
              </div>
            )}

            {selectedMode === 'bus' && (
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Bus className="w-4 h-4 text-amber-700" />
                  <span>Bus & State RTC Connectivity:</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{temple.transitGuide.bus}</p>
                <p className="text-stone-500 text-[11px] mt-1">
                  💡 Express & AC sleeper buses operate from major state RTC bus depots directly to the temple town.
                </p>
              </div>
            )}

            {selectedMode === 'train' && (
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Train className="w-4 h-4 text-emerald-700" />
                  <span>Rail Connectivity (Nearest Railway Station):</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{temple.transitGuide.train}</p>
                <p className="text-stone-500 text-[11px] mt-1">
                  🚆 Devasthanam feeder buses, pre-paid taxis, and shared autos are stationed outside the railway station.
                </p>
              </div>
            )}

            {selectedMode === 'flight' && (
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Plane className="w-4 h-4 text-blue-700" />
                  <span>Nearest Domestic & International Airport:</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{temple.transitGuide.flight}</p>
              </div>
            )}

            {selectedMode === 'walk' && (
              <div>
                <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                  <Footprints className="w-4 h-4 text-stone-800" />
                  <span>Local Walking & Pradakshina Route:</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Footwear deposit stands and cloakrooms are arranged at the outer Rajagopuram entrance. Follow the marked Mada streets for clockwise sacred circumambulation (Giri Pradakshina).
                </p>
              </div>
            )}
          </div>

          {/* In-Website Step-by-Step Pilgrim Milestones Roadmap */}
          <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <button
              suppressHydrationWarning
              onClick={() => setShowMilestones(!showMilestones)}
              className="w-full p-3 bg-stone-100/70 hover:bg-stone-100 flex items-center justify-between font-serif font-bold text-xs sm:text-sm text-stone-900 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-[#78131e]" />
                <span>In-Website Step-by-Step Pilgrim Milestones</span>
              </div>
              {showMilestones ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showMilestones && (
              <div className="p-4 space-y-3 text-xs border-t border-stone-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Starting Departure:</span>
                    <p className="text-stone-600">{effectiveOrigin} (Begin journey in early morning for auspicious timings)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Highway & Toll Corridor:</span>
                    <p className="text-stone-600">{temple.transitGuide.car}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Midway Satvik Halts & Fuel Stations:</span>
                    <p className="text-stone-600">Clean pure-vegetarian restaurants and 24x7 fuel stations available at regular 50 km intervals along the national highway.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    4
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Ghat Road / Pilgrim Checkpost:</span>
                    <p className="text-stone-600">{temple.transitGuide.roadhead}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#78131e] text-white font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    5
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Arrival at Sanctum Sanctorum:</span>
                    <p className="text-stone-600">Park at designated devasthanam lots, deposit shoes at official counters, and enter queue for {temple.name} darshan.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer - 100% In-Website with NO external redirects */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-stone-600 text-center sm:text-left">
            <span className="font-semibold">Route: </span>
            <span className="font-bold text-stone-900">{effectiveOrigin}</span>
            <span> ➔ </span>
            <span className="font-bold text-[#78131e]">{temple.name} ({temple.city})</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              suppressHydrationWarning
              onClick={onClose}
              className="w-full sm:w-auto bg-[#78131e] hover:bg-[#600e17] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer text-center"
            >
              Close & Continue Exploring
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
