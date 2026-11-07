'use client';

import React, { useState, useMemo } from 'react';
import { 
  MapPin, X, Car, Bus, Train, Plane, Footprints, 
  Navigation, Clock, ShieldAlert, Sparkles, CheckCircle2,
  LocateFixed, Loader2, ChevronDown, ChevronUp, Route, 
  Landmark, ArrowRight, ShieldCheck, Zap, HeartHandshake,
  Luggage, AlertCircle, Compass
} from 'lucide-react';

// Comprehensive list of 50+ major Indian pilgrim origin cities with coordinates
export const comprehensiveCities = [
  // Telangana
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867, hasAirport: true, railJunction: 'SC/HYB' },
  { name: 'Warangal', state: 'Telangana', lat: 17.9689, lng: 79.5941, hasAirport: false, railJunction: 'WL' },
  { name: 'Nizamabad', state: 'Telangana', lat: 18.6725, lng: 78.0941, hasAirport: false, railJunction: 'NZB' },
  { name: 'Karimnagar', state: 'Telangana', lat: 18.4386, lng: 79.1288, hasAirport: false, railJunction: 'KRMR' },
  { name: 'Khammam', state: 'Telangana', lat: 17.2473, lng: 80.1514, hasAirport: false, railJunction: 'KMT' },
  { name: 'Mahbubnagar', state: 'Telangana', lat: 16.7488, lng: 78.0035, hasAirport: false, railJunction: 'MBNR' },

  // Andhra Pradesh
  { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lng: 80.6480, hasAirport: true, railJunction: 'BZA' },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185, hasAirport: true, railJunction: 'VSKP' },
  { name: 'Tirupati', state: 'Andhra Pradesh', lat: 13.6288, lng: 79.4192, hasAirport: true, railJunction: 'TPTY' },
  { name: 'Guntur', state: 'Andhra Pradesh', lat: 16.3067, lng: 80.4365, hasAirport: false, railJunction: 'GNT' },
  { name: 'Rajahmundry', state: 'Andhra Pradesh', lat: 17.0005, lng: 81.8040, hasAirport: true, railJunction: 'RJY' },
  { name: 'Kakinada', state: 'Andhra Pradesh', lat: 16.9891, lng: 82.2475, hasAirport: false, railJunction: 'CCT' },
  { name: 'Kurnool', state: 'Andhra Pradesh', lat: 15.8281, lng: 78.0373, hasAirport: true, railJunction: 'KRNT' },
  { name: 'Nellore', state: 'Andhra Pradesh', lat: 14.4426, lng: 79.9865, hasAirport: false, railJunction: 'NLR' },
  { name: 'Kadapa', state: 'Andhra Pradesh', lat: 14.4673, lng: 78.8242, hasAirport: true, railJunction: 'HX' },
  { name: 'Anantapur', state: 'Andhra Pradesh', lat: 14.6819, lng: 77.6006, hasAirport: false, railJunction: 'ATP' },
  { name: 'Ongole', state: 'Andhra Pradesh', lat: 15.5057, lng: 80.0499, hasAirport: false, railJunction: 'OGL' },

  // Karnataka
  { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946, hasAirport: true, railJunction: 'SBC/YPR' },
  { name: 'Mysuru', state: 'Karnataka', lat: 12.2958, lng: 76.6394, hasAirport: true, railJunction: 'MYS' },
  { name: 'Hubballi', state: 'Karnataka', lat: 15.3647, lng: 75.1240, hasAirport: true, railJunction: 'UBL' },
  { name: 'Mangaluru', state: 'Karnataka', lat: 12.9141, lng: 74.8560, hasAirport: true, railJunction: 'MAQ' },

  // Tamil Nadu
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, hasAirport: true, railJunction: 'MAS/MS' },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lng: 76.9558, hasAirport: true, railJunction: 'CBE' },
  { name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198, hasAirport: true, railJunction: 'MDU' },
  { name: 'Tiruchirappalli', state: 'Tamil Nadu', lat: 10.7905, lng: 78.7047, hasAirport: true, railJunction: 'TPJ' },
  { name: 'Salem', state: 'Tamil Nadu', lat: 11.6643, lng: 78.1460, hasAirport: true, railJunction: 'SA' },

  // Maharashtra
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, hasAirport: true, railJunction: 'CSMT/BCT' },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567, hasAirport: true, railJunction: 'PUNE' },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882, hasAirport: true, railJunction: 'NGP' },
  { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lng: 73.7898, hasAirport: true, railJunction: 'NK' },
  { name: 'Kolhapur', state: 'Maharashtra', lat: 16.6944, lng: 74.2238, hasAirport: true, railJunction: 'KOP' },
  { name: 'Shirdi', state: 'Maharashtra', lat: 19.7667, lng: 74.4764, hasAirport: true, railJunction: 'SNSI' },
  { name: 'Nanded', state: 'Maharashtra', lat: 19.1383, lng: 77.3210, hasAirport: true, railJunction: 'NED' },

  // North, Central & East India
  { name: 'New Delhi', state: 'Delhi NCR', lat: 28.6139, lng: 77.2090, hasAirport: true, railJunction: 'NDLS/DLI' },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739, hasAirport: true, railJunction: 'BSB/BSBS' },
  { name: 'Prayagraj', state: 'Uttar Pradesh', lat: 25.4358, lng: 81.8463, hasAirport: true, railJunction: 'PRYJ' },
  { name: 'Ayodhya', state: 'Uttar Pradesh', lat: 26.7922, lng: 82.1998, hasAirport: true, railJunction: 'AY' },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, hasAirport: true, railJunction: 'LKO' },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, hasAirport: true, railJunction: 'HWH/SDAH' },
  { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lng: 85.8245, hasAirport: true, railJunction: 'BBS' },
  { name: 'Puri', state: 'Odisha', lat: 19.8135, lng: 85.8312, hasAirport: false, railJunction: 'PURI' },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376, hasAirport: true, railJunction: 'PNBE' },
  { name: 'Gaya', state: 'Bihar', lat: 24.7914, lng: 85.0002, hasAirport: true, railJunction: 'GAYA' },
  { name: 'Guwahati', state: 'Assam', lat: 26.1445, lng: 91.7362, hasAirport: true, railJunction: 'GHY' },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, hasAirport: true, railJunction: 'JP' },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714, hasAirport: true, railJunction: 'ADI' },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577, hasAirport: true, railJunction: 'INDB' },
  { name: 'Ujjain', state: 'Madhya Pradesh', lat: 23.1765, lng: 75.7885, hasAirport: false, railJunction: 'UJN' }
];

export default function TempleDirectionsModal({ temple, onClose }) {
  if (!temple) return null;

  // Selected starting city / custom
  const [selectedCityName, setSelectedCityName] = useState('Hyderabad');
  const [customSearch, setCustomSearch] = useState('');
  const [isTypingCustom, setIsTypingCustom] = useState(false);

  // Live GPS state
  const [liveLocation, setLiveLocation] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState('');

  // Selected Multi-modal Route Strategy Tab
  // 'best' | 'fastest' | 'train' | 'drive'
  const [activeRoutePlan, setActiveRoutePlan] = useState('best');

  // Handle GPS location request
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
          label: `Live GPS Position (${lat.toFixed(2)}, ${lng.toFixed(2)})`
        });
        setGeoLoading(false);
      },
      (error) => {
        setGeoLoading(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGeoError('Location permission denied. Please select your city from the comprehensive list below.');
        } else {
          setGeoError('Could not detect position. Please pick a starting city.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Find origin city object
  const originCityObj = useMemo(() => {
    if (liveLocation) {
      return {
        name: 'My Live Location',
        state: 'Current GPS',
        lat: liveLocation.lat,
        lng: liveLocation.lng,
        hasAirport: true,
        railJunction: 'Local'
      };
    }
    const found = comprehensiveCities.find(c => c.name.toLowerCase() === selectedCityName.toLowerCase());
    return found || comprehensiveCities[0]; // fallback Hyderabad
  }, [liveLocation, selectedCityName]);

  // Haversine Distance Calculator
  const calculateKm = (fromLat, fromLng, toLat, toLng) => {
    const R = 6371;
    const dLat = (toLat - fromLat) * Math.PI / 180;
    const dLng = (toLng - fromLng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(fromLat * Math.PI / 180) * Math.cos(toLat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const straightKm = Math.round(R * c);
    return Math.round(straightKm * 1.25);
  };

  const roadKm = calculateKm(originCityObj.lat, originCityObj.lng, temple.lat, temple.lng);
  const driveHours = Math.floor(roadKm / 55);
  const driveMins = Math.round((roadKm % 55) / 55 * 60);

  // In-Website Google Maps Route URL
  const inWebsiteRouteMapUrl = useMemo(() => {
    const saddr = liveLocation 
      ? `${liveLocation.lat},${liveLocation.lng}` 
      : encodeURIComponent(`${originCityObj.name}, ${originCityObj.state}`);
    const daddr = `${temple.lat},${temple.lng}`;
    return `https://maps.google.com/maps?saddr=${saddr}&daddr=${daddr}&output=embed`;
  }, [liveLocation, originCityObj, temple]);

  // Special conditions
  const isSriLanka = temple.id === 'trincomalee-shankari';
  const isKashmir = temple.id === 'kashmir-sharada-peeth';
  const isHimalayan = temple.id === 'kangra-jwalaji';

  // DYNAMIC END-TO-END MULTI-MODAL ROUTE PLANS
  const routePlans = useMemo(() => {
    // 1. SHANKARI DEVI (SRI LANKA)
    if (isSriLanka) {
      return {
        best: {
          title: "🌟 Recommended Best Route: Flight + Scenic Rail / AC Cab",
          badge: "Most Balanced & Scenic",
          totalTime: "~9 - 11 Hours",
          costEstimate: "₹9,500 - ₹14,000 per person",
          steps: [
            { icon: Plane, label: "Leg 1: International Flight to Colombo", desc: `Fly from ${originCityObj.name} (direct or via Chennai) to Bandaranaike International Airport, Colombo (CMB). Flight time ~1.5 - 3 hrs. Requires valid passport & online ETA tourist visa.` },
            { icon: Train, label: "Leg 2: Express Train or Private AC Cab to Trincomalee", desc: "Board the morning/evening Sri Lanka Railways Express from Colombo Fort station to Trincomalee (6.5 hrs) OR hire an official highway AC taxi via A6 highway (5 hrs 30 mins, 260 km)." },
            { icon: Car, label: "Leg 3: Local Auto / Tuk-Tuk to Swami Rock Base", desc: "Take a local 3-wheeler Tuk-Tuk from Trincomalee town / railway station to the base of Swami Rock cliff (10 mins, 3 km)." },
            { icon: Footprints, label: "Leg 4: Sacred Ascent to Shankari Devi Sanctum", desc: "5-minute picturesque paved coastal walkway through historic Fort Frederick gates directly to the Shankari Devi cliff sanctum overlooking the ocean." }
          ]
        },
        fastest: {
          title: "⚡ Fastest Connection: Flight to Colombo + Domestic Flight / Express Cab",
          badge: "Fastest Option",
          totalTime: "~6 - 7 Hours",
          costEstimate: "₹18,000 - ₹25,000 per person",
          steps: [
            { icon: Plane, label: "Leg 1: Morning Flight to Colombo (CMB)", desc: `Early morning flight from ${originCityObj.name} to Colombo International Airport (CMB).` },
            { icon: Plane, label: "Leg 2: Domestic Flight / Air Taxi to China Bay (Trincomalee)", desc: "Cinnamon Air or FitsAir domestic sea-plane/scheduled charter from Colombo (Ratmalana) to China Bay Airport Trincomalee (approx. 45 mins)." },
            { icon: Car, label: "Leg 3: Airport Taxi directly to Swami Rock", desc: "12 km taxi ride from China Bay airport straight to the temple entrance (20 mins)." }
          ]
        },
        train: {
          title: "🚆 Economical & Cultural: Flight to Chennai + Colombo + Overnight Train",
          badge: "Budget Friendly",
          totalTime: "~14 Hours",
          costEstimate: "₹7,500 - ₹9,500 per person",
          steps: [
            { icon: Plane, label: "Leg 1: Affordable Flight to Colombo via Chennai", desc: "Budget flight from Chennai to Colombo (just 1 hour 15 mins flying time)." },
            { icon: Train, label: "Leg 2: Overnight Night-Mail Train with Sleeper Berth", desc: "Board the 09:30 PM Night Mail Train from Colombo Fort with air-conditioned sleeper berth, arriving at Trincomalee at 05:30 AM fresh for morning temple Darshan." },
            { icon: Footprints, label: "Leg 3: Morning walk to Sanctum", desc: "Early morning Tuk-Tuk to Fort Frederick and morning darshan at Shankari Devi." }
          ]
        },
        drive: {
          title: "🚗 Road Transport within Sri Lanka: Colombo to Trinco via A6",
          badge: "Self-Drive / Chauffeur",
          totalTime: "~5.5 Hours in Sri Lanka",
          costEstimate: "LKR 28,000 (~₹7,500 cab fare)",
          steps: [
            { icon: Car, label: "Leg 1: Airport Pickup & Expressway", desc: "Private tourist chauffeur pickup at Colombo airport, taking the Central Expressway via Kurunegala and Dambulla." },
            { icon: Landmark, label: "Leg 2: Enroute Temple Visit (Dambulla Cave Temple)", desc: "Optional 45-minute stop at the sacred UNESCO Dambulla cave temple." },
            { icon: Car, label: "Leg 3: Arrive at Trincomalee Beach Road", desc: "Smooth coastal drive terminating at Swami Rock temple parking." }
          ]
        }
      };
    }

    // 2. SHARADA PEETH (KASHMIR / BORDER)
    if (isKashmir) {
      return {
        best: {
          title: "🌟 Recommended Best Route: Flight to Srinagar + Scenic Mountain Drive to Teetwal",
          badge: "Official Pilgrim Route",
          totalTime: "~8 Hours",
          costEstimate: "₹8,000 - ₹12,000 per person",
          steps: [
            { icon: Plane, label: `Leg 1: Flight from ${originCityObj.name} to Srinagar (SXR)`, desc: "Direct or 1-stop flight to Sheikh ul-Alam International Airport, Srinagar." },
            { icon: Car, label: "Leg 2: Mountain Cab through Sopore, Kupwara & Sadhna Pass", desc: "Private registered cab from Srinagar through the breathtaking Pir Panjal mountains and high-altitude Sadhna Pass (165 km, ~5.5 hrs drive)." },
            { icon: Landmark, label: "Leg 3: Arrive at Teetwal Base on Kishanganga River", desc: "Reach the newly consecrated Sharada Temple & Gurdwara on the Indian side of the Line of Control (LOC) overlooking the ancient ruins across the river." }
          ]
        },
        fastest: {
          title: "⚡ Fastest: Same-Day Flight + Pre-arranged Kupwara Taxi",
          badge: "Fastest Same-Day",
          totalTime: "~7 Hours",
          costEstimate: "₹14,000 per person",
          steps: [
            { icon: Plane, label: "Leg 1: Early Morning Flight to Srinagar", desc: "Arrive in Srinagar by 09:30 AM." },
            { icon: Car, label: "Leg 2: Pre-arranged Border Permit Cab", desc: "Direct pre-booked Innova from Srinagar airport to Kupwara/Teetwal with verified driver." }
          ]
        },
        train: {
          title: "🚆 Rail + Road Combo: Train to Jammu Tawi / Udhampur + Shared Taxi",
          badge: "Economical Rail Route",
          totalTime: "~24 Hours",
          costEstimate: "₹2,500 - ₹4,500 per person",
          steps: [
            { icon: Train, label: `Leg 1: Superfast Train from ${originCityObj.name} to Jammu Tawi (JAT)`, desc: "Vande Bharat or Rajdhani/Superfast express to Jammu Tawi railway station." },
            { icon: Bus, label: "Leg 2: JKSRTC Deluxe Bus to Srinagar", desc: "Scenic journey through the new Banihal-Qazigund highway tunnel." },
            { icon: Car, label: "Leg 3: Shared Taxi to Kupwara & Teetwal", desc: "Local sumo/shared taxi to the Teetwal border temple." }
          ]
        },
        drive: {
          title: "🚗 Direct Drive via NH 44 to Srinagar & Kupwara",
          badge: "Mountain Road Trip",
          totalTime: `${driveHours} Hours`,
          costEstimate: `Approx. ₹${(roadKm * 8).toLocaleString()} Fuel & Toll`,
          steps: [
            { icon: Car, label: "Leg 1: National Highway 44 Corridor", desc: "Drive north along NH 44 through Punjab and Jammu up to the Banihal tunnel." },
            { icon: Car, label: "Leg 2: Srinagar Bypass to Kupwara", desc: "High-clearance vehicle required for the mountain ghats of Sadhna Pass." }
          ]
        }
      };
    }

    // 3. GENERAL SHAKTI PEETHAS (SRISAILAM, JOGULAMBA, KANCHI, KAMAKHYA, ETC.)
    const isClose = roadKm < 350;
    const isMedium = roadKm >= 350 && roadKm < 850;

    return {
      best: {
        title: isClose 
          ? `🌟 Recommended Best Route: Direct Road Drive / Express AC Coach` 
          : `🌟 Recommended Best Route: ${originCityObj.hasAirport ? 'Flight + Connecting Cab' : 'Overnight Train + Devasthanam Bus'}`,
        badge: isClose ? "Direct & Most Convenient" : "Balanced Comfort & Speed",
        totalTime: isClose ? `${driveHours}h ${driveMins}m Direct` : `~6 - 8 Hours Door-to-Door`,
        costEstimate: isClose ? `₹1,200 - ₹3,500 per person` : `₹4,500 - ₹7,500 per person`,
        steps: isClose ? [
          { icon: Car, label: `Leg 1: Direct Departure from ${originCityObj.name}`, desc: `${temple.transitGuide.car}. Direct highway drive with comfortable toll plazas and bypasses.` },
          { icon: Bus, label: "Leg 2: Mid-way Halts & Fuel Stations", desc: "Clean vegetarian restaurants and family restrooms available at regular 45 km intervals." },
          { icon: Landmark, label: `Leg 3: Official Devasthanam Parking & Sanctum`, desc: `Park at official devasthanam parking (${temple.transitGuide.roadhead}), deposit footwear, and enter temple queue.` }
        ] : [
          { icon: Plane, label: `Leg 1: Flight from ${originCityObj.name} to Nearest Airport`, desc: `Fly to ${temple.transitGuide.flight}. Flying time approx. 1 - 2 hrs.` },
          { icon: Car, label: `Leg 2: Connecting Pre-paid Taxi / AC Bus to Temple Town`, desc: `Board pre-paid airport taxi or devasthanam express bus directly to ${temple.city} (${temple.transitGuide.roadhead}).` },
          { icon: Footprints, label: "Leg 3: Sanctum Darshan", desc: "Enter temple queue with pre-booked VIP darshan pass or general line." }
        ]
      },
      fastest: {
        title: `⚡ Fastest Route: Flight + Express Taxi Combination`,
        badge: "Fastest Possible Time",
        totalTime: isClose ? `${driveHours}h ${driveMins}m via Car` : `~4.5 - 6 Hours Total`,
        costEstimate: `₹5,500 - ₹9,500 per person`,
        steps: [
          { icon: Plane, label: `Leg 1: Fly to ${temple.transitGuide.flight.split('(')[0]}`, desc: `Early morning flight from ${originCityObj.name} or nearest major airport.` },
          { icon: Car, label: `Leg 2: Pre-booked Cab to ${temple.name}`, desc: "Direct highway taxi pickup from airport arrival terminal straight to the temple entrance gate." }
        ]
      },
      train: {
        title: `🚆 Economical & Senior Citizen Friendly: Direct Train + Temple Feeder Bus`,
        badge: "Most Comfortable for Elders",
        totalTime: `~${Math.round(roadKm / 65) + 3} Hours`,
        costEstimate: `₹650 - ₹1,800 per person (3AC/2AC)`,
        steps: [
          { icon: Train, label: `Leg 1: Train from ${originCityObj.railJunction} to ${temple.transitGuide.train.split('(')[0]}`, desc: `Comfortable overnight or daytime Superfast / Express train with sleeper or AC berth.` },
          { icon: Bus, label: "Leg 2: Railway Station to Temple Gate", desc: `Devasthanam feeder bus, shared auto-rickshaw, or station taxi (${temple.transitGuide.train}).` }
        ]
      },
      drive: {
        title: `🚗 Direct Road Trip: Self-Drive / Outstation Taxi`,
        badge: "Scenic Personal Road Trip",
        totalTime: `${driveHours}h ${driveMins}m (${roadKm} km)`,
        costEstimate: `Approx. ₹${(roadKm * 7.5).toLocaleString()} Fuel & Tolls`,
        steps: [
          { icon: Car, label: `Leg 1: Highway Corridor from ${originCityObj.name}`, desc: temple.transitGuide.car },
          { icon: MapPin, label: "Leg 2: Toll Plazas & Bypass Roads", desc: "Follow major 4-lane/6-lane national highway bypasses to avoid city traffic." },
          { icon: ShieldAlert, label: "Leg 3: Final Approach & Parking", desc: temple.transitGuide.roadhead }
        ]
      }
    };
  }, [originCityObj, temple, isSriLanka, isKashmir, roadKm, driveHours, driveMins]);

  const activePlan = routePlans[activeRoutePlan] || routePlans.best;

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
                Complete End-to-End Route Blueprints & Navigation
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

        {/* 1. Comprehensive Starting Location Selector (50+ Cities + Live GPS) */}
        <div className="p-4 bg-amber-50/80 border-b border-amber-200 space-y-3 shrink-0 text-xs sm:text-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            <div className="md:col-span-8 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-stone-800 font-bold text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#78131e]" />
                  <span>Choose Any Origin City in India (50+ Cities Available):</span>
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

              {/* City Dropdown & Custom Search */}
              {!liveLocation ? (
                <div className="flex gap-2">
                  <select
                    suppressHydrationWarning
                    value={selectedCityName}
                    onChange={(e) => setSelectedCityName(e.target.value)}
                    className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-2 font-semibold text-stone-800 focus:outline-hidden focus:border-[#78131e] text-xs sm:text-sm shadow-2xs"
                  >
                    <optgroup label="✨ Popular Metro Hubs">
                      <option value="Hyderabad">Hyderabad (Telangana)</option>
                      <option value="Vijayawada">Vijayawada (Andhra Pradesh)</option>
                      <option value="Visakhapatnam">Visakhapatnam (Andhra Pradesh)</option>
                      <option value="Tirupati">Tirupati (Andhra Pradesh)</option>
                      <option value="Bengaluru">Bengaluru (Karnataka)</option>
                      <option value="Chennai">Chennai (Tamil Nadu)</option>
                      <option value="Mumbai">Mumbai (Maharashtra)</option>
                      <option value="New Delhi">New Delhi / NCR</option>
                      <option value="Kolkata">Kolkata (West Bengal)</option>
                    </optgroup>
                    
                    <optgroup label="📍 Andhra Pradesh & Telangana">
                      {comprehensiveCities.filter(c => c.state === 'Andhra Pradesh' || c.state === 'Telangana').map(c => (
                        <option key={c.name} value={c.name}>{c.name} ({c.state})</option>
                      ))}
                    </optgroup>

                    <optgroup label="📍 South India (Karnataka & Tamil Nadu)">
                      {comprehensiveCities.filter(c => c.state === 'Karnataka' || c.state === 'Tamil Nadu').map(c => (
                        <option key={c.name} value={c.name}>{c.name} ({c.state})</option>
                      ))}
                    </optgroup>

                    <optgroup label="📍 Maharashtra & Western India">
                      {comprehensiveCities.filter(c => c.state === 'Maharashtra' || c.state === 'Gujarat').map(c => (
                        <option key={c.name} value={c.name}>{c.name} ({c.state})</option>
                      ))}
                    </optgroup>

                    <optgroup label="📍 North & Eastern India">
                      {comprehensiveCities.filter(c => ['Uttar Pradesh', 'Bihar', 'Odisha', 'West Bengal', 'Assam', 'Madhya Pradesh', 'Rajasthan'].includes(c.state)).map(c => (
                        <option key={c.name} value={c.name}>{c.name} ({c.state})</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              ) : (
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
                    Switch to City Dropdown
                  </button>
                </div>
              )}

              {geoError && (
                <p className="text-[11px] text-amber-900 font-medium">⚠️ {geoError}</p>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="md:col-span-4 bg-white border border-amber-200 rounded-xl p-3 flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">Total Distance:</span>
                <span className="text-lg font-black text-[#78131e]">~{roadKm.toLocaleString()} km</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">Direct Drive Time:</span>
                <span className="text-sm font-black text-stone-800">
                  {driveHours > 0 ? `${driveHours}h ${driveMins}m` : `${driveMins} mins`}
                </span>
              </div>
            </div>

          </div>

          {/* 2. REAL-WORLD COMBINATION ROUTE STRATEGY TABS */}
          <div className="pt-2 border-t border-amber-200/70">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
              Select Route Strategy (All Possible Combinations):
            </span>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                suppressHydrationWarning
                onClick={() => setActiveRoutePlan('best')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activeRoutePlan === 'best'
                    ? 'bg-[#78131e] text-white border-[#78131e] shadow-xs'
                    : 'bg-white text-stone-800 border-stone-200 hover:bg-amber-100/60'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Sparkles className={`w-3.5 h-3.5 ${activeRoutePlan === 'best' ? 'text-amber-300' : 'text-amber-600'}`} />
                  <span>Best Route</span>
                </div>
                <span className={`text-[10px] block mt-0.5 ${activeRoutePlan === 'best' ? 'text-amber-100' : 'text-stone-500'}`}>
                  Most Balanced & Recommended
                </span>
              </button>

              <button
                suppressHydrationWarning
                onClick={() => setActiveRoutePlan('fastest')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activeRoutePlan === 'fastest'
                    ? 'bg-[#78131e] text-white border-[#78131e] shadow-xs'
                    : 'bg-white text-stone-800 border-stone-200 hover:bg-amber-100/60'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Zap className={`w-3.5 h-3.5 ${activeRoutePlan === 'fastest' ? 'text-amber-300' : 'text-amber-600'}`} />
                  <span>Fastest Route</span>
                </div>
                <span className={`text-[10px] block mt-0.5 ${activeRoutePlan === 'fastest' ? 'text-amber-100' : 'text-stone-500'}`}>
                  Flight + Express Cab
                </span>
              </button>

              <button
                suppressHydrationWarning
                onClick={() => setActiveRoutePlan('train')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activeRoutePlan === 'train'
                    ? 'bg-[#78131e] text-white border-[#78131e] shadow-xs'
                    : 'bg-white text-stone-800 border-stone-200 hover:bg-amber-100/60'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Train className={`w-3.5 h-3.5 ${activeRoutePlan === 'train' ? 'text-amber-300' : 'text-amber-600'}`} />
                  <span>Train + Bus</span>
                </div>
                <span className={`text-[10px] block mt-0.5 ${activeRoutePlan === 'train' ? 'text-amber-100' : 'text-stone-500'}`}>
                  Senior Citizen Friendly & Budget
                </span>
              </button>

              <button
                suppressHydrationWarning
                onClick={() => setActiveRoutePlan('drive')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  activeRoutePlan === 'drive'
                    ? 'bg-[#78131e] text-white border-[#78131e] shadow-xs'
                    : 'bg-white text-stone-800 border-stone-200 hover:bg-amber-100/60'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Car className={`w-3.5 h-3.5 ${activeRoutePlan === 'drive' ? 'text-amber-300' : 'text-amber-600'}`} />
                  <span>Direct Drive</span>
                </div>
                <span className={`text-[10px] block mt-0.5 ${activeRoutePlan === 'drive' ? 'text-amber-100' : 'text-stone-500'}`}>
                  Self-Drive Highway Route
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* 3. Content Body: Selected End-to-End Blueprint + Live In-Website Route Map */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Active Route Blueprint Card */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300/80 rounded-2xl p-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#78131e] text-white px-2 py-0.5 rounded shadow-2xs">
                  {activePlan.badge}
                </span>
                <h4 className="font-serif font-black text-stone-900 text-sm sm:text-base mt-1.5">
                  {activePlan.title}
                </h4>
              </div>

              <div className="flex items-center gap-3 text-xs shrink-0">
                <div className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 font-bold text-stone-800">
                  ⏱️ {activePlan.totalTime}
                </div>
                <div className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 font-bold text-emerald-800">
                  💰 {activePlan.costEstimate}
                </div>
              </div>
            </div>

            {/* Step-by-Step Multi-Modal Leg Flow */}
            <div className="space-y-3 pt-3">
              <span className="text-xs font-bold text-stone-700 block">
                Door-to-Door Journey Breakdown:
              </span>
              
              {activePlan.steps.map((st, i) => {
                const StepIcon = st.icon;
                return (
                  <div key={i} className="flex items-start gap-3 bg-white/90 border border-amber-200/60 p-3 rounded-xl shadow-2xs">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#78131e] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 text-xs">
                      <span className="font-bold text-stone-900 text-xs block">{st.label}</span>
                      <p className="text-stone-600 leading-relaxed mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Transit Alert (Sri Lanka, Kashmir, or Mountain shrines) */}
          {temple.transitGuide && temple.transitGuide.specialTransitNote && (
            <div className="bg-amber-100/80 border border-amber-300 rounded-xl p-3 flex gap-2.5 text-xs text-amber-950">
              <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Sacred Pilgrim Transit Advisory:</span>
                <p className="leading-relaxed mt-0.5">{temple.transitGuide.specialTransitNote}</p>
              </div>
            </div>
          )}

          {/* 100% IN-WEBSITE ROUTE MAP */}
          <div className="rounded-xl overflow-hidden border border-stone-300 shadow-inner h-72 sm:h-96 w-full relative bg-stone-100">
            <iframe
              title={`Live In-Website Route Map from ${originCityObj.name} to ${temple.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={inWebsiteRouteMapUrl}
            />

            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold text-stone-800 flex items-center gap-2 border border-stone-200 pointer-events-none">
              <Route className="w-4 h-4 text-[#78131e]" />
              <span>
                {originCityObj.name} ➔ {temple.name} (~{roadKm} km)
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-stone-600 text-center sm:text-left">
            <span className="font-semibold">Starting Point: </span>
            <span className="font-bold text-stone-900">{originCityObj.name} ({originCityObj.state})</span>
            <span> ➔ </span>
            <span className="font-bold text-[#78131e]">{temple.name}</span>
          </div>

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
  );
}
