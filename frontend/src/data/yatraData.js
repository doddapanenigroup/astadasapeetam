export const yatraCategories = [
  { id: 'all', name: 'All Yatra Packages', icon: '🚩', count: 6 },
  { id: 'jyotirlinga', name: 'Jyotirlinga Yatralu', icon: '🔱', count: 2 },
  { id: 'shaktipeeth', name: 'Shakti Peetha Yatralu', icon: '🌸', count: 1 },
  { id: 'chardham', name: 'Char Dham & North India', icon: '🏔️', count: 2 },
  { id: 'south', name: 'South India Divya Desams', icon: '🛕', count: 2 },
];

export const yatraPackages = [
  {
    id: "yatra-kashi-ayodhya",
    title: "Kashi - Prayagraj - Ayodhya Divya Kshetra Yatra",
    teluguTitle: "కాశీ - ప్రయాగ్రాజ్ - అయోధ్య దివ్య క్షేత్ర యాత్ర",
    category: "jyotirlinga",
    duration: "5 Days / 4 Nights",
    badge: "Most Auspicious • VIP Darshan Included",
    price: 14999,
    originalPrice: 19999,
    discount: "25% OFF",
    rating: 4.96,
    reviewsCount: 840,
    image: "/images/temple_kashi.jpg",
    transport: "AC Push-Back Coach / AC Sleeper",
    stay: "3-Star Deluxe AC Hotel (Twin Sharing)",
    food: "Pure Satvik Vegetarian Meals (Breakfast, Lunch, Dinner)",
    departureCities: ["Hyderabad", "Vijayawada", "Visakhapatnam", "Bangalore"],
    nextDepartures: ["15 Nov 2026", "24 Nov 2026", "08 Dec 2026", "22 Dec 2026"],
    description: "Experience the eternal sanctity of Kashi Vishwanath, take a holy dip in Triveni Sangam with Vedic Sankalpam, and seek blessings at the grand Sri Ram Lalla Janmabhoomi in Ayodhya.",
    highlights: [
      "Special VIP Sheegra Darshan at Kashi Vishwanath Jyotirlinga",
      "Royal Boat Cruise on Mother Ganga for world-famous Maha Ganga Aarti",
      "Triveni Sangam Holy Snanam with Vedic Purohit for Veni Dhanam & Pitru Tarpanam",
      "Grand Sri Ram Lalla Darshan at the newly consecrated Ayodhya Mandir",
      "Darshan of Mata Annapurna, Visalakshi Devi, and Kshetrapala Kal Bhairav"
    ],
    itinerary: [
      { 
        day: "Day 1", 
        title: "Arrival in Holy Kashi & Dashashwamedh Ganga Aarti", 
        desc: "Meet our pilgrimage manager at Varanasi Airport/Railway Station. Transfer to AC hotel. In the evening, witness the mystical Maha Ganga Aarti from a private royal boat cruise on the sacred Ganges." 
      },
      { 
        day: "Day 2", 
        title: "Kashi Vishwanath VIP Darshan & Shakti Peetha", 
        desc: "Early morning holy dip at Manikarnika/Assi Ghat. VIP special darshan of Kashi Vishwanath Jyotirlinga, Annapurna Devi, Visalakshi (Shakti Peetha), and Kal Bhairava temple with sacred sankalpam." 
      },
      { 
        day: "Day 3", 
        title: "Prayagraj Triveni Sangam Snanam & Madhava Darshan", 
        desc: "Scenic AC drive to sacred Prayagraj. Holy bath at the confluence of Ganga, Yamuna & Saraswati. Special boat ride to Sangam point. Visit Alopi Devi Shakti Peeth, Veni Madhava temple, and Sleeping Hanuman." 
      },
      { 
        day: "Day 4", 
        title: "Ayodhya Ram Janmabhoomi & Sacred Saryu Aarti", 
        desc: "Journey to Ayodhya Dham. Special Darshan of Bhagavan Sri Ram Lalla at the magnificent Janmabhoomi Mandir. Visit Hanuman Garhi, Kanak Bhavan, and participate in holy Saryu river Deepotsav aarti." 
      },
      { 
        day: "Day 5", 
        title: "Sarnath Heritage & Return with Divine Gangajal", 
        desc: "Morning visit to Sarnath Buddhist stupa and deer park. Time for shopping authentic Banarasi weaves and temple prasadam. Transfer to Varanasi station/airport with blessed Gangajal containers." 
      }
    ],
    inclusions: [
      "AC Deluxe hotel accommodation on twin-sharing basis",
      "100% Satvik South Indian / North Indian meals (Breakfast, Lunch, Dinner)",
      "VIP Special Entry / Sheegra Darshan tickets at Kashi Vishwanath",
      "Private boat cruise on the Ganga for Evening Aarti and Sangam Snanam",
      "Dedicated Vedic Purohit for group Sankalpam and ritual guidance",
      "Complimentary 5-Litre Sealed Gangajal Canister per devotee",
      "24x7 Tour Coordinator and Pilgrimage Kit"
    ],
    exclusions: [
      "Personal puja dakshina or special voluntary priest fees",
      "Airfare or Train tickets to reach Varanasi (available as add-on)",
      "Personal room service, laundry, or phone charges"
    ]
  },
  {
    id: "yatra-shaktipeeth-srisailam",
    title: "Ashtadasa Shakti Peetha & Srisailam Jyotirlinga Yatra",
    teluguTitle: "అష్టాదశ శక్తిపీఠం & శ్రీశైలం మల్లికార్జున దివ్య యాత్ర",
    category: "shaktipeeth",
    duration: "4 Days / 3 Nights",
    badge: "Sacred Astadasapeetam Special",
    price: 8499,
    originalPrice: 11999,
    discount: "30% OFF",
    rating: 4.98,
    reviewsCount: 1120,
    image: "/images/temple_srisailam.jpg",
    transport: "Luxury AC Sleeper / Semi-Sleeper Coach",
    stay: "Devasthanam AC Cottages & 3-Star Resort",
    food: "Authentic Andhra Satvik Bhojanam & Nitya Annaprasadam",
    departureCities: ["Hyderabad", "Vijayawada", "Guntur", "Tirupati", "Bangalore"],
    nextDepartures: ["12 Nov 2026", "19 Nov 2026", "03 Dec 2026", "17 Dec 2026"],
    description: "Journey to one of the rarest kshetras on earth where both a Shiva Jyotirlinga and a Devi Shakti Peetha unite: Sri Mallikarjuna Swamy & Mata Bhramaramba Devi.",
    highlights: [
      "Direct VIP Sparsha Darshan of Lord Mallikarjuna Jyotirlinga",
      "Sri Bhramaramba Devi Ammavari Kumkumarchana at the Shakti Peeth",
      "Scenic ropeway ride and boat trip to sacred Pathalaganga",
      "Visit Alampur Jogulamba 5th Shakti Peetha & Navabrahma Temples",
      "Darshan of Mahanandi, Sakshi Ganapathi, and Sikharam"
    ],
    itinerary: [
      { 
        day: "Day 1", 
        title: "Departure to Alampur Jogulamba (5th Shakti Peetha)", 
        desc: "Morning pickup from departure city. Travel to Alampur on the banks of river Tungabhadra. Darshan of Mata Jogulamba (the 5th Maha Shakti Peetha) and the 7th-century Navabrahma temples. Evening drive through Nallamala forest to Srisailam." 
      },
      { 
        day: "Day 2", 
        title: "Srisailam Mallikarjuna Sparsha Darshan & Bhramaramba", 
        desc: "Early morning holy bath at Pathalaganga. VIP ticketed Sparsha Darshan of Lord Mallikarjuna. Special Kumkumarchana Seva at Mata Bhramaramba Ammavaru temple. Evening visit to Sakshi Ganapati and Hatakeswaram." 
      },
      { 
        day: "Day 3", 
        title: "Sikharam Darshan & Scenic Nallamala Pilgrimage", 
        desc: "Sunrise darshan at Srisaila Sikharam. Panoramic view of Krishna river and Srisailam Dam. Afternoon visit to Paladhara Panchadhara where Adi Shankaracharya composed Sivananda Lahari." 
      },
      { 
        day: "Day 4", 
        title: "Mahanandi Kshetram & Auspicious Return", 
        desc: "Visit Mahanandi with its crystal-clear continuous natural thermal spring pushkarini. Perform pradakshina and return to your home city with sanctified temple prasadam." 
      }
    ],
    inclusions: [
      "Luxury AC pushback / sleeper coach travel",
      "AC Devasthanam/resort twin sharing accommodation",
      "Traditional South Indian satvik breakfast, lunch & dinner",
      "VIP Darshan passes and Kumkumarchana Seva arrangements",
      "Ropeway charges at Pathalaganga",
      "Vedic guide and complimentary Rudraksha mala"
    ],
    exclusions: [
      "Personal abhishekam ticket fees booked directly with devasthanam",
      "Any unplanned sightseeing outside itinerary"
    ]
  },
  {
    id: "yatra-south-divyadesam",
    title: "Dakshina Bharata Jyotirlinga & Rameswaram Mahayatra",
    teluguTitle: "దక్షిణ భారత జ్యోతిర్లింగ & రామేశ్వరం మహా యాత్ర",
    category: "south",
    duration: "6 Days / 5 Nights",
    badge: "22 Holy Theerthams Bath Included",
    price: 16999,
    originalPrice: 22499,
    discount: "24% OFF",
    rating: 4.94,
    reviewsCount: 780,
    image: "/images/temple_rameswaram.jpg",
    transport: "Multi-Axle Volvo 9600 AC Coach",
    stay: "3-Star Deluxe AC Hotels",
    food: "Pure Satvik South Indian Cuisine (Traditional Plantain Leaf Seva)",
    departureCities: ["Hyderabad", "Bangalore", "Chennai", "Tirupati", "Vijayawada"],
    nextDepartures: ["18 Nov 2026", "28 Nov 2026", "10 Dec 2026", "25 Dec 2026"],
    description: "Complete the sacred Ramayana circuit: Rameswaram Ramanathaswamy Jyotirlinga with all 22 Theertha baths, Dhanushkodi Ram Setu point, Madurai Meenakshi, and Kanyakumari Triveni Sangam.",
    highlights: [
      "Complete 22 holy water Theerthams bath inside Rameswaram Temple",
      "Special VIP Darshan of Ramanathaswamy Jyotirlinga & Spatika Lingam Darshan",
      "Excursion to Dhanushkodi, Vibhishana Kodandarama Temple, and Ram Setu viewpoint",
      "Grand Darshan of Madurai Meenakshi Amman and Sundareswarar Temple",
      "Kanyakumari Bagavathi Amman Darshan, Vivekananda Rock & Sunrise at 3 Oceans"
    ],
    itinerary: [
      { day: "Day 1", title: "Journey to Madurai & Golden Lotus Tank", desc: "Arrive in Madurai, the temple city of South India. Check into hotel. Evening visit to Thirumalai Nayakar Mahal and Madurai Meenakshi Amman Temple night procession." },
      { day: "Day 2", title: "Madurai Meenakshi VIP Darshan & Drive to Rameswaram", desc: "Special early morning VIP darshan of Goddess Meenakshi. Drive across the magnificent Pamban Sea Bridge to the holy island of Rameswaram. Evening sea bath at Agni Theertham." },
      { day: "Day 3", title: "Rameswaram 22 Theertha Snanam & Spatika Lingam", desc: "Early 5:00 AM sacred bath in all 22 wells inside the temple. Darshan of Spatika Lingam and main Jyotirlinga. Afternoon trip to Dhanushkodi ruins and Ram Setu starting point." },
      { day: "Day 4", title: "Journey to Kanyakumari & Sunset at Ocean Confluence", desc: "Drive to Kanyakumari, the southern tip of Bharat where Arabian Sea, Indian Ocean, and Bay of Bengal converge. Visit Vivekananda Rock Memorial by ferry. Evening stunning sunset view." },
      { day: "Day 5", title: "Kanyakumari Sunrise & Suchindram Thanumalayan", desc: "Witness holy sunrise over the three seas. Darshan of 3000-year-old Kanyakumari Amman Temple. Visit Suchindram temple where Brahma, Vishnu, and Shiva reside in a single lingam." },
      { day: "Day 6", title: "Thiruvananthapuram Padmanabhaswamy & Return", desc: "Drive to Trivandrum. Special Darshan of Lord Anantha Padmanabhaswamy in reclining posture. Drop at airport/station with divine blessings." }
    ],
    inclusions: [
      "AC Volvo Coach transportation throughout the 6-day tour",
      "AC Deluxe twin-sharing accommodation",
      "Satvik South Indian breakfast, lunch, and dinner",
      "Guided assistance for 22 Theerthams bath with assistance staff",
      "Ferry tickets to Vivekananda Rock Memorial",
      "All interstate permits, toll taxes, and driver allowances"
    ],
    exclusions: [
      "Special fast-track passes where not allowed by temple trust",
      "Personal expenses and porterage"
    ]
  },
  {
    id: "yatra-puri-jagannath",
    title: "Puri Sri Jagannath Dham & Konark Sun Temple Mahayatra",
    teluguTitle: "పూరీ జగన్నాథ క్షేత్రం & కోణార్క్ సూర్య మందిర దివ్య యాత్ర",
    category: "chardham",
    duration: "4 Days / 3 Nights",
    badge: "Authentic Mahaprasadam Seva",
    price: 11999,
    originalPrice: 15999,
    discount: "25% OFF",
    rating: 4.92,
    reviewsCount: 520,
    image: "/images/temple_jagannath.jpg",
    transport: "AC Coach / Executive Tempo Traveller",
    stay: "Beachfront 3-Star AC Resort",
    food: "Satvik Odia & South Indian Meals + Holy Jagannath Mahaprasad",
    departureCities: ["Visakhapatnam", "Bhubaneswar", "Hyderabad", "Vijayawada"],
    nextDepartures: ["16 Nov 2026", "26 Nov 2026", "07 Dec 2026", "21 Dec 2026"],
    description: "Visit one of the 4 sacred Chardham Mahakshetras: Lord Jagannath, Balabhadra, and Devi Subhadra at Puri, taste the divine Chappan Bhog Mahaprasad, and marvel at the architectural wonder of Konark.",
    highlights: [
      "VIP Panda assistance for Lord Jagannath, Balabhadra & Subhadra Darshan",
      "Authentic 56-Bhog Mahaprasadam seated lunch inside Anandabazar",
      "Konark Sun Temple UNESCO World Heritage exploration",
      "Holy dip at Golden Sea Beach & Chandrabhaga sacred beach",
      "Darshan of Lingaraj Temple, Dhauli Peace Pagoda & Chilika Lake"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Bhubaneswar & Temples of Ekamra Kshetra", desc: "Pickup at Bhubaneswar. Visit 11th-century Lingaraj Temple, Mukteshwar Temple, and Rajarani Temple. Drive to holy city of Puri and check into beach resort." },
      { day: "Day 2", title: "Puri Jagannath VIP Darshan & Anandabazar Mahaprasad", desc: "Holy morning dip at Swargadwar beach. Special entry into Sri Mandir. Darshan of the divine siblings. Partake in holy Anandabazar Mahaprasadam lunch. Evening beach aarti." },
      { day: "Day 3", title: "Konark Sun Temple & Chandrabhaga Sun Worship", desc: "Scenic Marine Drive to Konark. Marvel at the stone chariot wheels and sun chariot architecture. Visit Chandrabhaga beach where Samba prayed to Sun God. Evening craft shopping." },
      { day: "Day 4", title: "Chilika Lake Kalijai Island & Departure", desc: "Morning boat cruise on Asia's largest brackish lagoon Chilika Lake to Maa Kalijai temple island. Return to Bhubaneswar airport/station for departure." }
    ],
    inclusions: [
      "AC vehicle for all airport transfers and sightseeing",
      "3 nights AC resort stay on twin sharing",
      "All meals including 1 special Jagannath Mahaprasad lunch",
      "Special Sevayat/Panda guidance for temple entrance",
      "Boating charges at Chilika Lake and Konark entry tickets"
    ],
    exclusions: [
      "Temple flag hoisting (Dhwaja Bandhana) voluntary charges",
      "Personal tips and cameras fees"
    ]
  },
  {
    id: "yatra-tirupati-balaji",
    title: "Sapthagiri Tirumala Balaji & Kanipakam Sheegra Yatra",
    teluguTitle: "సప్తగిరి తిరుమల బాలాజీ & కాణిపాకం శీఘ్ర దివ్య యాత్ర",
    category: "south",
    duration: "3 Days / 2 Nights",
    badge: "TTD Confirmed VIP Sheegra Darshan",
    price: 6999,
    originalPrice: 9499,
    discount: "26% OFF",
    rating: 4.99,
    reviewsCount: 2340,
    image: "/images/temple_tirupati.jpg",
    transport: "Premium AC Volvo Sleeper",
    stay: "4-Star Hotel in Tirupati",
    food: "Pure Vegetarian Satvik Feast + Tirumala Srivari Laddu Prasadam",
    departureCities: ["Hyderabad", "Vijayawada", "Guntur", "Visakhapatnam", "Bangalore", "Chennai"],
    nextDepartures: ["Every Friday", "Every Tuesday", "14 Nov 2026", "21 Nov 2026"],
    description: "The most seamless pilgrimage to Kaliyuga Vaikuntha: Lord Sri Venkateswara Swamy atop the 7 sacred hills, accompanied by Kanipakam Varasiddhi Vinayaka and Srikalahasti Rahu-Ketu Kshetram.",
    highlights: [
      "Guaranteed TTD Special Entry VIP ₹300 Sheegra Darshan ticket",
      "2 Authentic Tirumala Srivari Laddus included per devotee",
      "Special Darshan of Sri Padmavathi Ammavaru at Tiruchanur",
      "Kanipakam Swayambhu Varasiddhi Vinayaka Darshan",
      "Srikalahasti Dakshina Kailasam & Rahu Ketu Nivarana Kshetram"
    ],
    itinerary: [
      { day: "Day 1", title: "Overnight Journey & Sacred Srikalahasti Darshan", desc: "Board comfortable AC Volvo sleeper coach from your city. Reach Tirupati in morning, fresh up at 4-star hotel. Visit Srikalahasteeswara Swamy & Gnanaprasunambika Devi." },
      { day: "Day 2", title: "Ascent to Tirumala & Lord Balaji VIP Sheegra Darshan", desc: "Morning drive up the 7 sacred hills. Holy bath at Swami Pushkarini. Seamless VIP line entry for Netra Darshan of Sri Venkateswara Swamy. Receive delicious Laddu prasadam. Evening visit to Tiruchanur Padmavathi Ammavaru." },
      { day: "Day 3", title: "Kanipakam Vinayaka & Srinivasa Mangapuram", desc: "Visit the growing stone idol of Kanipakam Varasiddhi Vinayaka. Visit Kalyana Venkateswara temple at Srinivasa Mangapuram. Evening drop at bus/rail station for return journey." }
    ],
    inclusions: [
      "Round-trip Volvo AC transportation",
      "4-star AC hotel room for fresh-up and overnight stay",
      "TTD Special Entry ₹300 Darshan slot confirmed",
      "2 Original Tirumala Srivari Laddus per person",
      "Satvik vegetarian food (breakfast, lunch, dinner)",
      "TTD approved local guide throughout the trip"
    ],
    exclusions: [
      "Hair offering (Kalyanakatta) voluntary tips",
      "Special Puja / Seva tickets other than ₹300 entry"
    ]
  },
  {
    id: "yatra-himalayan-chardham",
    title: "Maha Himalayan Char Dham Sacred Yatra (10 Days)",
    teluguTitle: "మహా హిమాలయ చార్ ధామ్ దివ్య యాత్ర",
    category: "chardham",
    duration: "10 Days / 9 Nights",
    badge: "Helicopter / Pony Option Available",
    price: 34999,
    originalPrice: 45999,
    discount: "24% OFF",
    rating: 4.97,
    reviewsCount: 410,
    image: "/images/fest_ganga.jpg",
    transport: "Special Mountain AC Coach & 4x4 Jeeps",
    stay: "Comfortable Mountain Cottages & Hotels with Heaters",
    food: "Pure Satvik Satvik Vegetarian Food & Herbal Warm Drinks",
    departureCities: ["Haridwar", "Dehradun", "Delhi", "Hyderabad (Flight Package)"],
    nextDepartures: ["May 2027 Bookings Open", "20 Nov 2026 (Winter Char Dham)", "05 Dec 2026"],
    description: "The ultimate spiritual pilgrimage for every Sanatani: Yamunotri, Gangotri, Kedarnath Jyotirlinga in the lap of snow-capped peaks, and Badrinath Maha Vishnu Dham.",
    highlights: [
      "Complete 4 Dhams covered with experienced mountain guides and medical oxygen kit",
      "Kedarnath Jyotirlinga Abhishek Darshan with helicopter/trekking assistance",
      "Badrinath Badrinarayan Temple VIP Darshan & Tapt Kund bath",
      "Holy dip in Yamuna & Ganga source waters at Yamunotri and Gangotri",
      "Haridwar & Rishikesh Ganga Aarti with Triveni Ghat darshan"
    ],
    itinerary: [
      { day: "Day 1", title: "Haridwar to Barkot / Yamunotri Base", desc: "Pickup from Haridwar/Rishikesh. Drive along scenic Yamuna valley to Barkot. Evening rest and preparation for trek." },
      { day: "Day 2", title: "Yamunotri Dham Darshan & Surya Kund", desc: "Trek to Yamunotri Temple. Holy bath in Surya Kund thermal spring. Cook rice prasad in cloth pouch. Return to Barkot." },
      { day: "Day 3", title: "Barkot to Uttarkashi & Kashi Vishwanath Temple", desc: "Drive to Uttarkashi on the banks of Bhagirathi. Darshan of ancient Kashi Vishwanath Temple and Shakti temple with giant trident." },
      { day: "Day 4", title: "Uttarkashi to Gangotri Dham & Harshil Valley", desc: "Drive through majestic Harshil pine valley to Gangotri. Holy dip in Bhagirathi Ganga. Special pooja at Gangotri temple. Return to Uttarkashi." },
      { day: "Day 5", title: "Uttarkashi to Guptkashi / Sitapur", desc: "Drive through Mandakini river valley to Guptkashi. Darshan of ancient Ardhanareeswara temple. Preparation for Kedarnath climb." },
      { day: "Day 6", title: "Ascent to Kedarnath Jyotirlinga", desc: "Early morning trek/helicopter to sacred Kedarnath. Witness the majestic snow-clad Himalayan shrine. Evening Aarti at 11,755 ft." },
      { day: "Day 7", title: "Kedarnath Morning Puja & Descent to Pipalkoti", desc: "Early morning Maha Abhishek darshan of Lord Shiva. Descent down to Sitapur and drive to Pipalkoti along Alaknanda." },
      { day: "Day 8", title: "Pipalkoti to Badrinath Dham & Mana Village", desc: "Drive through Joshimath to Badrinath. Holy dip in natural hot water Tapt Kund. Darshan of Lord Badri Vishal. Visit Mana (first Indian village), Vyasa Gufa, and Saraswati river origin." },
      { day: "Day 9", title: "Badrinath to Srinagar / Rudraprayag", desc: "Witness the sacred confluence (Prayags) of rivers: Vishnuprayag, Nandaprayag, and Karnaprayag. Overnight stay at Srinagar/Rudraprayag." },
      { day: "Day 10", title: "Devprayag, Rishikesh & Haridwar Departure", desc: "Visit Devprayag (where Bhagirathi and Alaknanda merge into Mother Ganga). Rishikesh Ram Jhula & Laxman Jhula. Drop at Haridwar with lifetime memories." }
    ],
    inclusions: [
      "AC Coach / 4x4 Mountain vehicles throughout the tour",
      "9 nights comfortable hotel/cottage stay with thermal blankets",
      "Pure Satvik hot meals (Morning tea, Breakfast, Lunch, Dinner)",
      "Char Dham Biometric Yatra registration and medical pass support",
      "Vedic guide and portable oxygen cylinder for high altitudes",
      "All toll, parking, driver expenses and temple coordination"
    ],
    exclusions: [
      "Helicopter tickets for Kedarnath (can be arranged at government price)",
      "Pony / Doli / Kandi personal charges for Yamunotri and Kedarnath",
      "VIP fast-track Darshan slips where levied by shrine board"
    ]
  }
];
