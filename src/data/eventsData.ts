export interface ReviewItem {
  id: string;
  targetId: string; // event id or vendor id
  targetType: 'event' | 'vendor';
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  verifiedAttendee?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Shirarka' | 'Aroosyada' | 'Fanka & Dhaqanka' | 'Ciyaaraha' | 'Carwooyinka';
  date: string;
  time: string;
  city: 'Muqdisho' | 'Hargeysa' | 'Garoowe' | 'Kismaayo';
  venue: string;
  image: string;
  description: string;
  organizer: string;
  seatsTotal: number;
  seatsLeft: number;
  daysLeft: number;
  rating: number;
  reviewsCount: number;
  tiers: {
    name: 'Caadi' | 'VIP' | 'VVIP / Miis Gaar ah';
    price: number;
    perks: string[];
  }[];
}

export interface VendorItem {
  id: string;
  name: string;
  category: 'Hoolalka' | 'Sawir-qaadista' | 'Cuntada & Keega' | 'Qurxinta Masraxa';
  city: 'Muqdisho' | 'Hargeysa' | 'Garoowe';
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  priceUnit: string;
  image: string;
  gallery: string[];
  tagline: string;
  description: string;
  capacity?: number;
  features: string[];
  phone: string;
}

export const FEATURED_EVENT: EventItem = {
  id: 'evt-somali-tech-2026',
  title: 'Shirweynaha Tiknoolajiyada & Hal-abuurka 2026',
  category: 'Shirarka',
  date: 'Sabti, 14 Noofembar 2026',
  time: '08:30 Subaxnimo - 05:00 Galabnimo',
  city: 'Muqdisho',
  venue: 'Mogadishu International Convention Center',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
  description: 'Munaasabadda ugu weyn ee tignoolajiyada iyo ganacsiga casriga ah ee Geeska Afrika. Waxaa ka soo qeybgalaya in ka badan 1,500 oo aqoonyahanno, aasaasayaasha shirkadaha bilowga ah, iyo madaxda shirkadaha isgaarsiinta iyo bangiyada.',
  organizer: 'Somali Tech Association & Somali Innovation Hub',
  seatsTotal: 1500,
  seatsLeft: 42,
  daysLeft: 18,
  rating: 4.9,
  reviewsCount: 38,
  tiers: [
    {
      name: 'Caadi',
      price: 25,
      perks: ['Galitaanka hoolka guud', 'Qadada & Qaxwada shirkadaha', 'Buugga shirka & agabka']
    },
    {
      name: 'VIP',
      price: 75,
      perks: ['Fadhiga hore ee masraxa', 'Kulan gaar ah oo lala yeesho khudbad-jeediyeyaasha', 'Shahaado sharaf & Hadiyado gaar ah', 'Qado gaar ah oo VIP ah']
    },
    {
      name: 'VVIP / Miis Gaar ah',
      price: 200,
      perks: ['Miis gaar ah oo 4 qof ah', 'Soo dhoweyn heer sare ah', 'Xayeysiin u gaar ah shirkaddaada', 'Qolka nasashada ee VIP Lounge']
    }
  ]
};

export const EVENTS_LIST: EventItem[] = [
  FEATURED_EVENT,
  {
    id: 'evt-cultural-gala',
    title: 'Habeenka Fanka & Dhaqanka Soomaaliyeed',
    category: 'Fanka & Dhaqanka',
    date: 'Jimce, 20 Noofembar 2026',
    time: '07:30 Fiidnimo - 11:30 Habeennimo',
    city: 'Hargeysa',
    venue: 'Hargeisa Cultural Center Pavilion',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    description: 'Habeen xusuus mudan oo loogu dabbaaldegayo heesaha qaraamiga ah, suugaanta gabayada, iyo bandhigga suugaanta casriga ah iyadoo ay goobjoog yihiin fannaaniinta ugu caansan.',
    organizer: 'Guddoonka Dhaqanka & Hiddaha',
    seatsTotal: 800,
    seatsLeft: 86,
    daysLeft: 24,
    rating: 4.8,
    reviewsCount: 24,
    tiers: [
      {
        name: 'Caadi',
        price: 20,
        perks: ['Kursiga hoolka dhexdiisa', 'Cabitaannada furitaanka']
      },
      {
        name: 'VIP',
        price: 60,
        perks: ['Safka hore ee masraxa', 'Sawirro xusuus ah oo lala galo fannaaniinta', 'Qado-sharaf dhaqameed']
      },
      {
        name: 'VVIP / Miis Gaar ah',
        price: 150,
        perks: ['Miiska qoyska (5 qof)', 'Adeeg gaar ah oo miiska laguugu keenayo', 'Hadiyad xusuus qor ah']
      }
    ]
  },
  {
    id: 'evt-expo-trade',
    title: 'Carwada Ganacsiga & Maalgashiga Caalamiga ah',
    category: 'Carwooyinka',
    date: 'Arbaco, 02 Diseembar 2026',
    time: '09:00 Subaxnimo - 06:00 Galabnimo',
    city: 'Muqdisho',
    venue: 'Jazeera Palace Exhibition Grounds',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    description: 'Bandhigga ganacsiga ee sanadlaha ah oo ay ka qeybgalayaan in ka badan 200 oo shirkadood oo ka kala socda dalka iyo caalamka, laga bilaabo dhismaha, beeraha, illaa bangiyada.',
    organizer: 'Rugta Ganacsiga & Warshadaha',
    seatsTotal: 3000,
    seatsLeft: 310,
    daysLeft: 36,
    rating: 4.7,
    reviewsCount: 45,
    tiers: [
      {
        name: 'Caadi',
        price: 15,
        perks: ['Gelitaanka bandhigga 3 maalmood', 'Buugga hagaha shirkadaha']
      },
      {
        name: 'VIP',
        price: 50,
        perks: ['Galitaanka Shirarka B2B', 'Kulamo toos ah oo lala yeesho maalgashadayaasha', 'Qado ganacsi']
      },
      {
        name: 'VVIP / Miis Gaar ah',
        price: 180,
        perks: ['VIP Booth Access', 'Furitaanka rasmiga ah oo madaxda la fariisanayo', 'Shahaado maalgashi']
      }
    ]
  },
  {
    id: 'evt-women-business',
    title: 'Shirka Ganacsatada Haweenka ee Geeska Afrika',
    category: 'Shirarka',
    date: 'Axad, 06 Diseembar 2026',
    time: '09:00 Subaxnimo - 04:00 Galabnimo',
    city: 'Garoowe',
    venue: 'Garowe Grand International Hall',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    description: 'Shir heer sare ah oo lagu xoojinayo maalgashiga iyo doorka haweenka ganacsatada ah, oo ay weheliyaan aqoon-isweydaarsiyo iyo fursado maalgelin toos ah.',
    organizer: 'Ururka Haweenka Ganacsatada',
    seatsTotal: 600,
    seatsLeft: 54,
    daysLeft: 40,
    rating: 4.95,
    reviewsCount: 19,
    tiers: [
      {
        name: 'Caadi',
        price: 20,
        perks: ['Agabka tababarka', 'Qado & nasasho']
      },
      {
        name: 'VIP',
        price: 55,
        perks: ['Fadhiga hore', 'Kulan gaar ah oo mentors lala yeelanayo', 'Xayeysiinta ganacsigaaga']
      },
      {
        name: 'VVIP / Miis Gaar ah',
        price: 130,
        perks: ['Miis 4 kursi ah', 'Muuqaal xayeysiis ah oo shaashadda shirka ka baxa']
      }
    ]
  },
  {
    id: 'evt-stadium-final',
    title: 'Tartanka Final-ka Koobka Caasimadda',
    category: 'Ciyaaraha',
    date: 'Jimce, 18 Diseembar 2026',
    time: '03:30 Galabnimo - 06:30 Makhribnimo',
    city: 'Muqdisho',
    venue: 'Mogadishu Stadium VIP Arena',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    description: 'Kulanka ugu xamaasadda badan ee finalka kubadda cagta oo ay isku wajahayaan labada naadi ee ugu awoodda badan caasimadda.',
    organizer: 'Xiriirka Kubadda Cagta',
    seatsTotal: 12000,
    seatsLeft: 840,
    daysLeft: 52,
    rating: 4.85,
    reviewsCount: 52,
    tiers: [
      {
        name: 'Caadi',
        price: 10,
        perks: ['Kuraasta dhexda ee garoonka']
      },
      {
        name: 'VIP',
        price: 35,
        perks: ['Kuraasta hadhka leh ee VIP-da', 'Ilaalo gaar ah & albaab gooni ah']
      },
      {
        name: 'VVIP / Miis Gaar ah',
        price: 90,
        perks: ['Qolka qaboojiyaha leh ee VVIP Lounge', 'Cunto & cabitaan fudud', 'Aragtida ugu sarreysa']
      }
    ]
  },
  {
    id: 'evt-wedding-showcase',
    title: 'Bandhigga Aroosyada & Naqshadaynta Casriga ah',
    category: 'Aroosyada',
    date: 'Sabti, 26 Diseembar 2026',
    time: '04:00 Galabnimo - 10:00 Habeennimo',
    city: 'Kismaayo',
    venue: 'Jubba Luxury Ballroom',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'Bandhig loogu talagalay lamaanayaasha is guursanaya, oo lagu soo bandhigayo dharka ugu quruxda badan, hoolalka, qurxinta, iyo keegyada aroosyada.',
    organizer: 'Somali Bridal & Wedding Federation',
    seatsTotal: 700,
    seatsLeft: 120,
    daysLeft: 60,
    rating: 4.9,
    reviewsCount: 28,
    tiers: [
      {
        name: 'Caadi',
        price: 15,
        perks: ['Tigidhka gelitaanka bandhigga', 'Dhimis 20% ah oo laga helo shirkadaha aroosyada']
      },
      {
        name: 'VIP',
        price: 45,
        perks: ['Fadhiga hore ee fashion runway-ga', 'Hadiyad weyn oo ah alaabta qurxinta arooska']
      },
      {
        name: 'VVIP / Miis Gaar ah',
        price: 110,
        perks: ['Miis gaar ah oo lala fariisanayo qabanqaabiyeyaasha caanka ah']
      }
    ]
  }
];

export const VENDORS_LIST: VendorItem[] = [
  {
    id: 'vnd-jazeera-ballroom',
    name: 'Hoolka Boqortooyada ee Jazeera (Royal Ballroom)',
    category: 'Hoolalka',
    city: 'Muqdisho',
    rating: 4.95,
    reviewsCount: 88,
    startingPrice: 1200,
    priceUnit: 'habeenkiiba',
    capacity: 850,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Hoolka ugu sharafta badan ee aroosyada iyo xafladaha waaweyn.',
    description: 'Hool casri ah oo leh qaboojiyeyaal awood badan, masrax boqortooyo, nalka crystal chandeliers, iyo goob baarkin oo qaada in ka badan 200 oo baabuur.',
    features: ['Qaboojiye buuxa (Central AC)', 'Masrax weyn & Nalalka LED', 'Qolalka nasashada ee caruuska & caruusadda', 'Baarkin weyn oo amni leh', 'Koronto generator backup ah'],
    phone: '+252 61 500 0111'
  },
  {
    id: 'vnd-maansoor-pavilion',
    name: 'Hoolka Maansoor Grand Pavilion',
    category: 'Hoolalka',
    city: 'Hargeysa',
    rating: 4.9,
    reviewsCount: 74,
    startingPrice: 950,
    priceUnit: 'habeenkiiba',
    capacity: 650,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Muuqaal qurux badan iyo adeeg heer caalami ah oo Hargeysa ku yaal.',
    description: 'Goob ballaaran oo loogu talagalay aroosyada, shirarka heerka sare ah, iyo xafladaha qalin-jabinta.',
    features: ['Fadhiga Round Table ee Casriga ah', 'Sound system tayo sare leh', 'Adeeg degdeg ah & shaqaale tababaran'],
    phone: '+252 63 440 2233'
  },
  {
    id: 'vnd-bilan-photography',
    name: 'Bilan Cinematic Wedding Studios',
    category: 'Sawir-qaadista',
    city: 'Muqdisho',
    rating: 4.98,
    reviewsCount: 112,
    startingPrice: 350,
    priceUnit: 'xafladdiiba',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Duubista filimada arooska ee 4K Cinema iyo sawirro xusuus qaan-gaar ah.',
    description: 'Koox khubaro ah oo wata qalabka ugu dambeeyay ee Sony Cinema, Kaamirada Drone-ka cirka, iyo naqshadaynta album-ka maqaarka ah ee xusuusta arooska.',
    features: ['Sawirro aan xad lahayn oo la safeeyey', 'Filim gaaban oo Highlights ah (Teaser)', 'Drone 4K aerial shots', 'Album maqaar ah oo Talyaani ah'],
    phone: '+252 61 720 4455'
  },
  {
    id: 'vnd-bariishe-catering',
    name: 'Barwaaqo Royal Catering & Bakery',
    category: 'Cuntada & Keega',
    city: 'Muqdisho',
    rating: 4.88,
    reviewsCount: 95,
    startingPrice: 12,
    priceUnit: 'qofkiiba',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Cuntada aroosyada ee ugu dhadhanka macaan iyo keegyada 5-dabaq ah.',
    description: 'Waxaan bixinaa cuntada hiddaha iyo kuwa casriga ah, salad-yo kala duwan, hilib ari iyo digaag la dubay, mocktails qabow, iyo adeegayaal lebisan oo martida si xushmad leh u soora.',
    features: ['Buffet kala duwan oo 10 nooc ah', 'Keega Arooska oo 4 ilaa 5 dabaq ah', 'Mocktails & Qaxwada hiddaha', 'Adeegayaal rasmi ah'],
    phone: '+252 61 880 9900'
  },
  {
    id: 'vnd-aroos-bile-decor',
    name: 'Aroos Bile Floral & Luxury Stage Decor',
    category: 'Qurxinta Masraxa',
    city: 'Muqdisho',
    rating: 4.92,
    reviewsCount: 67,
    startingPrice: 500,
    priceUnit: 'qurxintiiba',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Masraxyo qurux badan, ubaxyo dabiici ah, iyo naqshado boqornimo.',
    description: 'Qurxinta masraxa arooska oo leh ubaxyo dabiici ah oo cusub, fadhiyada boqortooyada, nalal sixir ah oo masraxa ifinaya, iyo gogosha rooga cas ee martida.',
    features: ['Ubaxyo dabiici ah & kuwo macmal ah oo tayo leh', 'Nalalka Crystal & LED Fairy Lights', 'Kursiga caruuska & caruusadda ee Boqornimada', 'Rooga cas ee socodka martida'],
    phone: '+252 61 611 7788'
  },
  {
    id: 'vnd-garowe-peace-hall',
    name: 'Hoolka Nabadda & Dabaaldegyada Garoowe',
    category: 'Hoolalka',
    city: 'Garoowe',
    rating: 4.85,
    reviewsCount: 42,
    startingPrice: 750,
    priceUnit: 'habeenkiiba',
    capacity: 500,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80'
    ],
    tagline: 'Goob xasilloon oo ku habboon munaasabadaha qoyska iyo xafladaha rasmiga ah.',
    description: 'Hool cusub oo ku yaal aag deggan oo Garoowe ah, oo leh dhammaan qalabka casriga ah ee looga baahan yahay aroos heersare ah.',
    features: ['Qurxin diyaar ah', 'Sound system & Screens', 'Goob sawir-qaadis oo bannaanka ah'],
    phone: '+252 90 770 1234'
  }
];

export interface PurchasedTicket {
  ticketNumber: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  city: string;
  tierName: string;
  quantity: number;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  purchaseDate: string;
  status: 'Sax ah (Active)' | 'Hore Loo Isticmaalay (Used)';
  qrCodeSeed: string;
}

export const INITIAL_PURCHASED_TICKETS: PurchasedTicket[] = [
  {
    ticketNumber: 'MQ-2026-8814',
    eventId: 'evt-somali-tech-2026',
    eventTitle: 'Shirweynaha Tiknoolajiyada & Hal-abuurka 2026',
    eventDate: 'Sabti, 14 Noofembar 2026',
    eventTime: '08:30 Subaxnimo',
    eventVenue: 'Mogadishu International Convention Center',
    city: 'Muqdisho',
    tierName: 'VIP',
    quantity: 1,
    totalPrice: 75,
    customerName: 'Xaliimo Maandeeq',
    customerPhone: '+252 61 555 1234',
    purchaseDate: '12 Oktobar 2026',
    status: 'Sax ah (Active)',
    qrCodeSeed: 'MARTIQAAD-TICKET-8814-VIP'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    targetId: 'evt-somali-tech-2026',
    targetType: 'event',
    userName: 'Cabdullaahi Cilmi',
    rating: 5,
    comment: 'Shirka ugu tayada sarreeya ee aan abid ka qeyb galay. Qabanqaabada, marti-sharafta iyo speakers-ku heer caalami bay ahaayeen!',
    date: '10 Oktobar 2026',
    verifiedAttendee: true
  },
  {
    id: 'rev-2',
    targetId: 'evt-somali-tech-2026',
    targetType: 'event',
    userName: 'Deeqa Axmed',
    rating: 5,
    comment: 'Aad bay u sahlanayd inaan tigidhka ku goosto EVC Plus, QR Code-kana albaabka toos baa la iiga sawiray anigoo aan saf gelin.',
    date: '08 Oktobar 2026',
    verifiedAttendee: true
  },
  {
    id: 'rev-3',
    targetId: 'evt-cultural-gala',
    targetType: 'event',
    userName: 'Maxamed Cabdi',
    rating: 5,
    comment: 'Habeen xusuus mudan oo fanka iyo suugaanta Soomaaliyeed lagu maamuusay. Codka iyo masraxa aad bay u heer sarreeyeen.',
    date: '05 Oktobar 2026',
    verifiedAttendee: true
  },
  {
    id: 'rev-4',
    targetId: 'evt-expo-trade',
    targetType: 'event',
    userName: 'Farxaan Nuur',
    rating: 4,
    comment: 'Carwo aad u ballaaran oo shirkado badan isugu yimaadeen. Kulamada B2B-ga wax badan baan ka faa\'iiday.',
    date: '02 Oktobar 2026',
    verifiedAttendee: false
  },
  {
    id: 'rev-5',
    targetId: 'vnd-jazeera-ballroom',
    targetType: 'vendor',
    userName: 'Khadiija Cumar',
    rating: 5,
    comment: 'Arooskeyga halkan buu ka dhacay bishii hore. Qaboojiyaha, nalka crystal-ka iyo baarkinka aad baa looga helay. Martidu aad bay u bogaadiyeen.',
    date: '28 Sebtembar 2026',
    verifiedAttendee: true
  },
  {
    id: 'rev-6',
    targetId: 'vnd-jazeera-ballroom',
    targetType: 'vendor',
    userName: 'Axmed Warsame',
    rating: 5,
    comment: 'Hool aad u ballaaran oo sharaf leh, shaqaaluhuna aad bay u edeb badnaayeen una caawiyeen martida.',
    date: '20 Sebtembar 2026',
    verifiedAttendee: true
  },
  {
    id: 'rev-7',
    targetId: 'vnd-bilan-photography',
    targetType: 'vendor',
    userName: 'Sumaya & Xasan',
    rating: 5,
    comment: 'Sawirrada iyo muuqaalka 4K ee arooskeena waxay noqdeen wax lagu faano. Album-ka maqaarka ah ee Talyaaniga aad buu u qurxoon yahay!',
    date: '15 Sebtembar 2026',
    verifiedAttendee: true
  },
  {
    id: 'rev-8',
    targetId: 'vnd-bariishe-catering',
    targetType: 'vendor',
    userName: 'Aamina Jaamac',
    rating: 5,
    comment: 'Cuntada aad bay u macaaneed, gaar ahaan ariga la dubay iyo salad-yada. Keega 4-dabaq ahna wuxuu ahaa mid indhaha soo jiitay.',
    date: '12 Sebtembar 2026',
    verifiedAttendee: true
  },
  {
    id: 'rev-9',
    targetId: 'vnd-aroos-bile-decor',
    targetType: 'vendor',
    userName: 'Najma Cali',
    rating: 5,
    comment: 'Masraxa arooska waxay ka dhigeen sidii qasri boqortooyo oo kale. Ubaxyada dabiiciga ah iyo fairy lights-ka aad bay u iftiimeen.',
    date: '05 Sebtembar 2026',
    verifiedAttendee: true
  }
];

