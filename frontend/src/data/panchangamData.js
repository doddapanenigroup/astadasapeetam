export const defaultPanchangamData = {
  dateFormatted: "Friday, 23 May 2026",
  hinduYear: "Krodhi Nama Samvatsaram",
  ayana: "Uttarayana (Northward Sun Journey)",
  ritu: "Greeshma Ritu (Summer Season)",
  masa: "Jyeshtha Masam (Amanta: Vaisakha)",
  paksha: "Shukla Paksha (Bright Fortnight)",
  
  // ================= THE 5 LIMBS (PANCHA-ANGA) =================
  panchaAnga: {
    tithi: {
      name: "Shukla Paksha Panchami",
      teluguName: "శుక్ల పంచమి",
      endsAt: "04:12 PM",
      next: "Shukla Paksha Shashti commences at 04:12 PM",
      deity: "Lord Subrahmanya & Snake Gods (Nagas)",
      nature: "Auspicious (Nanda Tithi - Bestows Happiness)"
    },
    vara: {
      name: "Sukravara (Friday)",
      teluguName: "శుక్రవారం",
      graha: "Lord Shukra (Venus)",
      deity: "Goddess Mahalakshmi",
      nature: "Most auspicious for wealth, beauty, gold purchase, and feminine prayers."
    },
    nakshatra: {
      name: "Rohini Nakshatram",
      teluguName: "రోహిణి నక్షత్రం",
      endsAt: "08:35 PM",
      next: "Mrigashirsha Nakshatram commences at 08:35 PM",
      lord: "Chandra Deva (Moon)",
      deity: "Lord Brahma (Prajapati)",
      nature: "Sthira (Fixed & Firm) — Auspicious for construction, housewarming, sowing seeds."
    },
    yoga: {
      name: "Siddha Yoga",
      teluguName: "సిద్ధ యోగం",
      endsAt: "02:18 PM",
      next: "Sadhya Yoga follows",
      lord: "Lord Kartikeya",
      nature: "Bestows accomplishment (Siddhi) of all undertakings and spiritual mantras."
    },
    karana: {
      name: "Bava Karana",
      teluguName: "బవ కరణం",
      endsAt: "04:12 PM",
      next: "Balava Karana until next sunrise",
      lord: "Lord Indra",
      nature: "Excellent for auspicious work, charity, and commercial enterprises."
    }
  },

  // ================= CELESTIAL EPHEMERIS =================
  ephemeris: {
    sunrise: "05:48 AM",
    sunset: "06:40 PM",
    moonrise: "09:42 AM",
    moonset: "11:15 PM",
    suryaRasi: "Vrishabha (Taurus - Sun in Krittika)",
    chandraRasi: "Vrishabha (Taurus - Moon Exalted in Rohini)"
  },

  // ================= AUSPICIOUS TIMINGS (SHUBH KAAL) =================
  shubhTimings: [
    {
      name: "Brahma Muhurtham",
      time: "04:15 AM – 05:01 AM",
      desc: "Prime hour for meditation, mantra japa, and spiritual awakening.",
      isBest: true
    },
    {
      name: "Abhijit Muhurtham",
      time: "11:48 AM – 12:40 PM",
      desc: "Supreme victorious muhurtham of the day. Destroys a hundred doshas.",
      isBest: true
    },
    {
      name: "Amrit Kaalam",
      time: "05:15 PM – 06:45 PM",
      desc: "Highly auspicious for beginning journeys, medical treatments, and agreements.",
      isBest: false
    },
    {
      name: "Godhuli Muhurtham",
      time: "06:28 PM – 06:52 PM",
      desc: "Sacred twilight hour when cows return; ideal for Lakshmi Deepa puja.",
      isBest: false
    },
    {
      name: "Vijaya Muhurtham",
      time: "02:22 PM – 03:14 PM",
      desc: "Auspicious for legal matters, career inaugurations, and success.",
      isBest: false
    }
  ],

  // ================= INAUSPICIOUS TIMINGS (ASHUBH KAAL - TO AVOID) =================
  ashubhTimings: [
    {
      name: "Rahu Kaalam",
      time: "10:30 AM – 12:05 PM",
      desc: "Inauspicious. Avoid starting new journeys, buying property, or signing contracts."
    },
    {
      name: "Yamagandam",
      time: "03:15 PM – 04:50 PM",
      desc: "Unfavorable. Avoid inaugurations and vital financial disbursements."
    },
    {
      name: "Gulika Kaalam",
      time: "07:22 AM – 08:56 AM",
      desc: "Saturn's son Gulika. Deeds done in this hour tend to repeat repeatedly."
    },
    {
      name: "Durmuhurtham",
      time: "08:24 AM – 09:16 AM & 12:40 PM – 01:32 PM",
      desc: "Astrologically unfavorable time slots for commencing new works."
    },
    {
      name: "Varjyam",
      time: "09:15 PM – 10:48 PM",
      desc: "Toxic planetary ray window. Avoid solemn vows and celebrations."
    }
  ],

  // ================= CHOGHADIYA TIMINGS (DAY & NIGHT) =================
  dayChoghadiya: [
    { time: "05:48 AM - 07:22 AM", name: "Char (Neutral)", type: "normal" },
    { time: "07:22 AM - 08:56 AM", name: "Labh (Gain)", type: "good" },
    { time: "08:56 AM - 10:30 AM", name: "Amrit (Best)", type: "best" },
    { time: "10:30 AM - 12:05 PM", name: "Kaal (Loss / Rahu)", type: "bad" },
    { time: "12:05 PM - 01:39 PM", name: "Shubh (Auspicious)", type: "good" },
    { time: "01:39 PM - 03:13 PM", name: "Rog (Evil / Disease)", type: "bad" },
    { time: "03:13 PM - 04:47 PM", name: "Udveg (Agitation)", type: "bad" },
    { time: "04:47 PM - 06:40 PM", name: "Char (Neutral)", type: "normal" }
  ]
};
