import { Room, Tour, DiningExperience, SpaTreatment, FacilityItem, GalleryPhoto, AwardPlatform, MenuSection } from '../types';

export const ROOMS_DATA: Room[] = [
  {
    id: 1190,
    slug: 'le-vert-suite',
    title: 'Le Vert Suite With Balcony City View',
    subtitle: 'Our Most Exclusive Signature Accommodation',
    pricePerNight: 58,
    currency: 'USD',
    capacityGuests: 2,
    bedType: '1 Ultra-Comfort King Bed',
    sizeSqm: 48,
    hasBalcony: true,
    viewType: 'Panoramic City & Garden View',
    shortDescription: 'Our flagship suite offering an expansive layout, private balcony with scenic Siem Reap skyline views, artisan hardwood furnishings, and a freestanding soaking bathtub.',
    longDescription: 'Step into a world of refined elegance in the Le Vert Suite — our most exclusive accommodation, thoughtfully crafted for guests who expect nothing less than exceptional comfort. Featuring a private furnished terrace overlooking the peaceful tree-lined streets of Siem Reap, an intimate lounge area, high-thread-count Egyptian cotton linens, and a luxurious en-suite bathroom with walk-in rain shower and deep soaking tub.',
    featuredImage: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/03/photo_2024-08-21_11-26-27-2.jpg',
    galleryImages: [
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/03/photo_2024-08-21_11-26-27-2.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6369-scaled.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6367-scaled.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6368-scaled.jpg',
    ],
    amenities: [
      'Private Furnished Balcony',
      'Deep Soaking Bathtub & Rain Shower',
      '50" Smart 4K Ultra HD TV with Streaming',
      'Complimentary High-Speed Fiber Wi-Fi',
      'Individual Whisper-Quiet Climate Control',
      'Fully Stocked Refreshment Bar',
      'Artisanal Tea & Espresso Station',
      'Plush Terry Bathrobes & Slippers',
      'Electronic Digital Safety Deposit Box',
      'Ergonomic Hardwood Writing Desk',
      'Daily Housekeeping & Evening Turndown',
      'Complimentary Bottled Mineral Water Daily',
    ],
    featured: true,
  },
  {
    id: 1189,
    slug: 'junior-suite',
    title: 'Junior Suite with Balcony City View',
    subtitle: 'Refined Comfort with Open-Air Veranda',
    pricePerNight: 48,
    currency: 'USD',
    capacityGuests: 2,
    bedType: '1 King Size Bed',
    sizeSqm: 40,
    hasBalcony: true,
    viewType: 'City View',
    shortDescription: 'A sanctuary of understated sophistication featuring polished parquet flooring, warm mood lighting, a dedicated seating nook, and a private open-air balcony.',
    longDescription: 'Experience refined comfort in our beautifully appointed Junior Suite with King Size Bed, designed for guests who appreciate space, serenity, and contemporary elegance after a day exploring the ancient temples of Angkor. The private balcony invites you to enjoy your morning Cambodian coffee or evening glass of wine with gentle breezes.',
    featuredImage: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/0D9A3440-scaled.jpg',
    galleryImages: [
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/0D9A3440-scaled.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6365-scaled.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6364-scaled.jpg',
    ],
    amenities: [
      'Private Balcony with Outdoor Seating',
      'Large King Bed with Premium Mattress',
      'Spacious Marble Bathroom with Rain Shower',
      '43" Smart TV with International Channels',
      'High-Speed Wi-Fi Access',
      'Mini Bar with Local Cambodian Delicacies',
      'In-Room Coffee & Tea Facilities',
      'In-Room Laptop Safe',
      'Hairdryer & Organic Botanical Toiletries',
      'Daily Bottle Water & Housekeeping',
    ],
    featured: true,
  },
  {
    id: 2333,
    slug: 'family-suite-with-balcony-city-view',
    title: 'Family Suite with Balcony City View',
    subtitle: 'Spacious Haven for Families and Groups',
    pricePerNight: 73.5,
    currency: 'USD',
    capacityGuests: 4,
    bedType: '1 King Bed + 2 Twin Beds (or 2 Kings)',
    sizeSqm: 56,
    hasBalcony: true,
    viewType: 'City & Rooftop Pool View',
    shortDescription: 'Generously proportioned suite designed specifically for families traveling together, offering connecting space, dual vanity bath, and private balcony.',
    longDescription: 'Indulge in comfort and style in our beautifully designed Family Suite with Balcony. Space, comfort, and togetherness are at the heart of this suite, ensuring that adults and children alike have ample room to unwind in privacy. Enjoy leisurely mornings watching Siem Reap awaken from your private balcony.',
    featuredImage: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6366-scaled.jpg',
    galleryImages: [
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6366-scaled.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6363-scaled.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6365-scaled.jpg',
    ],
    amenities: [
      'Expansive Layout with Seating Lounge',
      'Private Balcony Overlooking City',
      'Double Vanities and Large En-Suite Bath',
      'Dual Smart TVs with Kids & Movie Channels',
      'High-Speed Wi-Fi for Multiple Devices',
      'Mini Bar & Refrigerator',
      'Complimentary Tea, Coffee & Bottled Water',
      'Family Toiletries & Luxury Bathrobes',
      'Air Conditioning with Dual Zone Control',
      'Electronic Safe & Work Station',
    ],
    featured: true,
  },
  {
    id: 1541,
    slug: 'family-room-with-balcony',
    title: 'Family Room with Balcony',
    subtitle: 'Harmonious Comfort for Family Getaways',
    pricePerNight: 65,
    currency: 'USD',
    capacityGuests: 3,
    bedType: '1 Queen Bed + 1 Single Bed',
    sizeSqm: 46,
    hasBalcony: true,
    viewType: 'Courtyard & City View',
    shortDescription: 'Thoughtfully appointed family bedroom with balcony, offering cozy bedding configurations, quiet courtyard orientation, and modern amenities.',
    longDescription: 'Experience comfort, space, and togetherness in our beautifully designed Family Room with Balcony. Complete with custom wooden touches, calming earth tones, and modern conveniences to make family holidays in Siem Reap smooth, restful, and memorable.',
    featuredImage: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/06/photo_2024-08-21_11-24-05.jpg',
    galleryImages: [
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/06/photo_2024-08-21_11-24-05.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6370-scaled.jpg',
    ],
    amenities: [
      'Private Balcony',
      'Air Conditioning with Remote Control',
      'Flat-Screen Smart Television',
      'Fiber Optic Wi-Fi',
      'Shower with Hot & Cold Water',
      'Tea & Coffee Making Facilities',
      'In-Room Safe & Refrigerator',
      'Work Desk and Chair',
      'Daily Housekeeping Service',
    ],
    featured: false,
  },
  {
    id: 878,
    slug: 'deluxe-double-room',
    title: 'Deluxe Double Room With Balcony',
    subtitle: 'Intimate Sanctuary for Couples & Solo Voyagers',
    pricePerNight: 35,
    currency: 'USD',
    capacityGuests: 2,
    bedType: '1 Double Bed',
    sizeSqm: 32,
    hasBalcony: true,
    viewType: 'City View',
    shortDescription: 'An intimate, peaceful haven featuring a private balcony, plush bedding, contemporary decor, and attentive amenities at remarkable boutique value.',
    longDescription: 'A sanctuary of quiet comfort after a long day of discovering the temples. Enjoy a restful night on comfortable bedding, step out onto your balcony for fresh evening air, and stay connected with our fast optical Wi-Fi.',
    featuredImage: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/photo_2024-08-21_11-20-45.jpg',
    galleryImages: [
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/photo_2024-08-21_11-20-45.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6368-scaled.jpg',
    ],
    amenities: [
      'Private Balcony',
      'Comfortable Double Bed',
      'En-Suite Bathroom with Hot Rain Shower',
      'Flat Screen Television',
      'High-Speed Wi-Fi',
      'Individually Controlled Air Conditioning',
      'Mini Fridge & Drinking Water',
      'Electric Kettle with Coffee & Tea',
      'Safety Box & Wardrobe',
    ],
    featured: true,
  },
  {
    id: 417,
    slug: 'deluxe-double-or-twin-room',
    title: 'Deluxe Twin With Balcony City View',
    subtitle: 'Flexible & Airy Accommodation with Twin Beds',
    pricePerNight: 38,
    currency: 'USD',
    capacityGuests: 2,
    bedType: '2 Single Twin Beds',
    sizeSqm: 35,
    hasBalcony: true,
    viewType: 'City View',
    shortDescription: 'Ideal for friends or colleagues traveling together, offering two comfortable single beds, city-view balcony, and full modern amenities.',
    longDescription: 'The Deluxe Twin Room with Balcony City View combines functionality, modern aesthetics, and privacy. Featuring two individual beds with supportive mattresses and crisp linens, a private balcony, and sleek modern bathroom facilities.',
    featuredImage: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/photo_2024-08-21_11-22-50.jpg',
    galleryImages: [
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/photo_2024-08-21_11-22-50.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6366-1-scaled.jpg',
    ],
    amenities: [
      'Private City View Balcony',
      'Two Twin Single Beds',
      'Modern Bathroom with Rain Shower',
      'High-Speed Wi-Fi',
      'Smart TV with Cable Channels',
      'Air Conditioning',
      'Coffee & Tea Maker',
      'Safety Box & Luggage Rack',
      'Daily Housekeeping',
    ],
    featured: false,
  },
];

export const TOURS_DATA: Tour[] = [
  {
    id: 1,
    slug: 'sunrise-angkor-small-temple-tour',
    title: 'Sunrise Angkor Small Temple Tour',
    durationLabel: 'Half-Day Tour',
    highlights: [
      'Watch the sunrise behind the world-famous towers of Angkor Wat Temple.',
      'Explore Bayon Temple, famous for its hundreds of smiling stone faces carved into the towers.',
      'Visit Ta Prohm Temple (the "Tomb Raider" temple), overgrown with gigantic silk-cotton tree roots wrapping around ancient stone walls.'
    ],
    options: [
      {
        title: 'Private Options: Tuk-Tuk $22 (2–3 pax)',
        details: [
          'Pickup-dropoff by tuk-tuk',
          'Cold Bottled Water & Towels',
          'Pickup Time: 4:30 AM'
        ]
      },
      {
        title: 'Shared Options: AC Car ($15 per person)',
        details: [
          'Pickup-Dropoff by AC Car',
          'English Speaking Guide',
          'Cold Bottled Water & Towels',
          'Insurance',
          'Pickup Time: between 4:20 AM – 4:50 AM'
        ]
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1596765792518-e37ea3df7409?auto=format&fit=crop&w=1600&q=80',
    longDescription: 'Experience the magic of dawn over the ancient Khmer Empire. This half-day tour takes you to the iconic centerpieces of the Angkor Archaeological Park, starting early to catch the breathtaking sunrise over the central towers of Angkor Wat.'
  },
  {
    id: 2,
    slug: 'sunset-angkor-small-temple-tour',
    title: 'Sunset Angkor Small Temple Tour',
    durationLabel: 'Full-Day Tour',
    highlights: [
      'Walk through the vast corridors and intricate bas-reliefs of Angkor Wat Temple.',
      'Discover the enigmatic stone face towers of Bayon Temple at the heart of Angkor Thom.',
      'Wander through the atmospheric, root-entwined ruins of Ta Prohm Temple.',
      'Climb up to Phnom Bakheng Hill for a panoramic sunset view over the Angkor region.'
    ],
    options: [
      {
        title: 'Private Options: Tuk-Tuk $22 (2–3 pax)',
        details: [
          'Pickup-dropoff by tuk-tuk',
          'Cold Bottled Water & Towels',
          'Pickup Time: 10:00 AM'
        ]
      },
      {
        title: 'Shared Options: AC Car ($20 per person)',
        details: [
          'Pickup-Dropoff by AC Car',
          'English Speaking Guide',
          'Cold Bottled Water & Towels',
          'Insurance',
          'Pickup Time: between 7:40 AM – 8:10 AM'
        ]
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    longDescription: 'If you prefer a relaxed morning before exploring the temples, this full-day tour covers the top architectural masterpieces of Angkor and concludes with an unforgettable sunset view over the Cambodian countryside.'
  },
  {
    id: 3,
    slug: 'banteay-srei-grand-temple-tour',
    title: 'Banteay Srei & Grand Temple Tour',
    durationLabel: 'Full-Day Tour',
    highlights: [
      'Banteay Srei Temple: A 10th-century pink sandstone temple renowned for having the most detailed and delicate carvings in all of Angkor.',
      'Pre Rup & East Mebon: Impressive mountain-temples offering sweeping surrounding views.',
      'Ta Som & Neak Pean: Explore the tree-strangled eastern gate of Ta Som and the peaceful island shrine of Neak Pean.',
      'Preah Khan Temple: A huge, labyrinthine monastery complex nestled in the jungle.'
    ],
    options: [
      {
        title: 'Private Options: Tuk-Tuk $30 (2–3 pax)',
        details: [
          'Pickup-dropoff by tuk-tuk',
          'Cold Bottled Water & Towels',
          'Pickup Time: 8:00 AM'
        ]
      },
      {
        title: 'Shared Options: AC Car ($20 per person)',
        details: [
          'Pickup-Dropoff by AC Car',
          'English Speaking Guide',
          'Cold Bottled Water & Towels',
          'Insurance',
          'Pickup Time: between 7:40 AM – 8:10 AM'
        ]
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85',
    longDescription: 'Go beyond the main circuit to discover the exquisite artistry and hidden gems of the Grand Circuit, including the famed "Jewel of Khmer Art".'
  },
  {
    id: 4,
    slug: 'kampong-phluk-floating-village-tour',
    title: 'Kampong Phluk Floating Village Tour',
    durationLabel: 'Half-Day Tour (Morning or Afternoon)',
    highlights: [
      'Stroll through a bustling Local Market to see daily Cambodian life.',
      'View towering Long-Stilts Houses designed to adapt to the seasonal water level changes of Tonle Sap Lake.',
      'Take a wooden boat cruise through the lush, submerged Mangrove Forest.',
      'Watch the golden sunset on Tonle Sap Lake directly from your boat.'
    ],
    options: [
      {
        title: 'Private Options: Tuk-Tuk $30 (2–3 pax)',
        details: [
          'Pickup-dropoff by tuk-tuk',
          'Cold Bottled Water & Towels',
          'Pickup Time: 2:00 PM'
        ]
      },
      {
        title: 'Shared Options: AC Car ($24 per person)',
        details: [
          'Pickup-Dropoff by AC Car',
          'English Speaking Guide',
          'Cold Bottled Water & Towels',
          'Insurance',
          'Afternoon departures available (Pickup between 1:40 PM – 2:10 PM)'
        ]
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1629815049533-3118ee18cc00?auto=format&fit=crop&w=1600&q=80',
    longDescription: 'Immerse yourself in authentic rural life along the shores of Tonle Sap, Southeast Asia\'s largest freshwater lake.'
  },
  {
    id: 5,
    slug: 'kulen-waterfall-1000-lingas-tour',
    title: 'Kulen Waterfall & 1000 Lingas Tour',
    durationLabel: 'Full-Day Tour',
    highlights: [
      'Visit the Giant Reclining Buddha carved directly into a massive sandstone boulder at Preah Ang Thom.',
      'See the sacred River of 1000 Lingas, where ancient carvings cover the sandstone riverbed under crystal-clear water.',
      'Enjoy breathtaking views from the mountain cliffs and cool off with a swim at the scenic Kulen Waterfall.'
    ],
    options: [
      {
        title: 'Private Options: AC Car $75 (2–3 pax)',
        details: [
          'Includes private air-conditioned car & driver',
          'Cold Bottled Water & Towels',
          'Pickup Time: 8:00 AM'
        ]
      },
      {
        title: 'Shared Options: AC Car ($48 per person)',
        details: [
          'Pickup-Dropoff by AC Car',
          'English Speaking Guide',
          'Cold Bottled Water & Towels',
          'Insurance',
          'Pickup Time: between 7:40 AM – 8:10 AM'
        ]
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1549429402-999335607a75?auto=format&fit=crop&w=1600&q=80',
    longDescription: 'Escape the city into the sacred mountain range of Phnom Kulen, a place of spiritual pilgrimage, lush tropical foliage, and natural waterfalls.'
  },
  {
    id: 6,
    slug: 'koh-ker-beng-mealea-temple-tour',
    title: 'Koh Ker & Beng Mealea Temple Tour',
    durationLabel: 'Full-Day Tour',
    highlights: [
      'Beng Mealea Temple: A sprawling, unrestored 12th-century temple heavily overgrown by nature, allowing you to explore crumbling stone arches and mossy corridors.',
      'Koh Ker Temple Complex: The 10th-century capital of the Khmer Empire, featuring Prasat Prang, an imposing 7-tiered pyramid temple rising above the trees.',
      'Visit Prasat Pram, famous for its ruined towers wrapped tightly by strangler fig trees.'
    ],
    options: [
      {
        title: 'Private Options: AC Car $120 (2–4 pax)',
        details: [
          'Includes private air-conditioned car & driver',
          'Cold Bottled Water & Towels',
          'Pickup Time: 8:00 AM'
        ]
      },
      {
        title: 'Shared Options: AC Car ($50 per person)',
        details: [
          'Pickup-Dropoff by AC Car',
          'English Speaking Guide',
          'Cold Bottled Water & Towels',
          'Insurance',
          'Pickup Time: between 7:40 AM – 8:10 AM'
        ]
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1582236371587-873b22ed7675?auto=format&fit=crop&w=1600&q=80',
    longDescription: 'Journey deep into the Cambodian jungle to discover remote, mysterious temple complexes that feel straight out of an adventure film.'
  },
  {
    id: 7,
    slug: 'battambang-day-trip',
    title: 'Battambang Day-Trip from Siem Reap',
    durationLabel: 'Full-Day Tour',
    highlights: [
      'Ride the famous local Lorry / Bamboo Train through rice fields and scenery.',
      'Admire French colonial architecture, the Ancient House, and the historic Provincial Hall.',
      'Visit the historic Killing Cave atop Phnom Sampeau and witness millions of bats emerging from the Bat Cave at dusk.'
    ],
    options: [
      {
        title: 'Private Options: AC Car $160 (2–3 pax)',
        details: [
          'Includes private air-conditioned car & driver',
          'Cold Bottled Water & Towels',
          'Pickup Time: 7:00 AM'
        ]
      },
      {
        title: 'Shared Options: AC Car ($50 per person)',
        details: [
          'Pickup-Dropoff by AC Car',
          'English Speaking Guide',
          'Cold Bottled Water & Towels',
          'Insurance',
          'Pickup Time: between 6:30 AM – 7:00 AM'
        ]
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1616453915152-780c1df0f4e1?auto=format&fit=crop&w=1600&q=80',
    longDescription: 'Explore Cambodia\'s charming countryside and cultural capital of Battambang on an action-packed day trip.'
  },
  {
    id: 8,
    slug: 'inter-city-transfers',
    title: 'Inter-City Transfer Services (Siem Reap ↔ Phnom Penh)',
    durationLabel: 'Approx. 5–6 hours',
    highlights: [
      'Smooth, hassle-free transportation connecting Siem Reap and Phnom Penh.',
      'Private Transfers: Door-to-Door Service with flexible pickup time based on your preference.',
      'Shared Bus Transfers: E-booking options with top regional bus providers.'
    ],
    options: [
      {
        title: 'Private Transfers (Door-to-Door)',
        details: [
          'SUV (2–3 pax): $90 per vehicle',
          'Minivan (4–6 pax): $110 per vehicle',
          'Toyota Hi-Ace (6–8 pax): $230 per vehicle',
          'Schedule: Flexible pickup time'
        ]
      },
      {
        title: 'Shared Bus Transfers',
        details: [
          'Larryta Bus Company, VET Bus Company, and E-booking Bus Company.',
          'Please inquire at our reception desk for exact departure times and ticket pricing.'
        ]
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1549429402-999335607a75?auto=format&fit=crop&w=1600&q=80',
    longDescription: 'We provide smooth, hassle-free private and shared transportation options connecting Siem Reap and Phnom Penh.'
  }
];

export interface DiningArtboard {
  id: string;
  pageNumber: number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export const RESTAURANT_MENU_ARTBOARDS: DiningArtboard[] = [
  {
    id: 'starter',
    pageNumber: 1,
    title: 'Starter',
    subtitle: 'Items A01 – A11 • Fresh salads, rolls, tempura & satay',
    imageUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/Artboard-1.png',
  },
  {
    id: 'main-soup-stirfried',
    pageNumber: 2,
    title: 'Main Course: Soup & Stir Fried',
    subtitle: 'Items A12 – A21 • Traditional Khmer Amok, curries & Beef Lok Lak',
    imageUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/Artboard4.png',
  },
  {
    id: 'main-western',
    pageNumber: 3,
    title: 'Main Course & Western Food',
    subtitle: 'Items A22 – A31 • Seafood, Kampot pepper, club sandwiches & pasta',
    imageUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/Artboard1.png',
  },
  {
    id: 'western-dessert',
    pageNumber: 4,
    title: 'Western Specialties & Dessert',
    subtitle: 'Items A32 – A43 • Steaks, burgers, and mango sticky rice',
    imageUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/Artboard2.png',
  },
];

export const FULL_RESTAURANT_MENU_SECTIONS: MenuSection[] = [
  {
    category: 'Starter',
    items: [
      { code: 'A01', name: 'Mix Green Salad Basami Dressing', price: '$3.50', description: 'Iceberg salad, tomato, onion, carrot, cheese served with basami dressing' },
      { code: 'A02', name: 'Cesar Salad', price: '$3.50', description: 'Chicken, roman salad, bacon, ham, egg, cheese, cesar sauce' },
      { code: 'A03', name: 'Fresh Spring Roll', price: '$3.00', description: 'Rice paper, cucumber, carrot, bean sprout, long bean, khmer salad, khmer herb, peanut, fish sauce' },
      { code: 'A04', name: 'Deep Fried Spring Roll', price: '$3.00', description: 'Rice paper, cabbage, black mushroom, carrot, taro, onion, sweet chili sauce' },
      { code: 'A05', name: 'Banana Blossom with Chicken', price: '$3.50', description: 'Chicken, carrot, onion, green pepper, peanut, khmer dressing' },
      { code: 'A06', name: 'Mango Salad with Tiger Prawn', price: '$3.50', description: '4 X Shrimp, carrot, onion, green pepper, peanut, khmer dressing', tag: 'Popular' },
      { code: 'A07', name: 'French Fries', price: '$3.00', description: 'Potato, mayonnaise, tomato ketchup, salt' },
      { code: 'A08', name: 'Prawn Tempura', price: '$4.00', description: 'Shrimp, tempura flour, crumble bread, egg, salt, pepper, tata sauce' },
      { code: 'A09', name: 'Chicken Satay', price: '$4.00', description: '4 X Chicken, khmer herb, coconut, bean, peanut sauce', tag: 'Chef Recommended' },
      { code: 'A10', name: 'Beef Skewer round Bacon', price: '$4.00', description: 'Khmer herb, pickle' },
      { code: 'A11', name: 'Fish and chips', price: '$4.00', description: 'Fish, egg, flour, french fries, tata sauce' },
    ],
  },
  {
    category: 'Main Course: Soup',
    items: [
      { code: 'A12', name: 'Khmer Amok', price: '$5.00', description: 'Fish, chicken or pork, noni leave, kaffir leave, coconut cream, galangal, coriander, served with steam rice.', tag: 'National Dish' },
      { code: 'A13', name: 'Red Chicken Curry', price: '$5.00', description: 'Chicken, or pork, shallot, turmeric, lemongrass, kaffir leave, potato, coconut milk served with steam rice.' },
      { code: 'A14', name: 'Khmer Beef Curry Saraman', price: '$6.00', description: 'Beef, shallot, turmeric, lemongrass, kaffir leave, coconut milk serve with steam rice', tag: 'Traditional Royal' },
      { code: 'A15', name: 'Tom Yam Soup', price: '$4.50', description: 'Seafood, chicken or pork, onion, tomato, lemongrass, kaffir leave, served with steam rice.' },
      { code: 'A16', name: 'Korko Soup', price: '$4.50', description: 'Fish, chicken or pork, mixed vegetable, turmeric, lemongrass, kaffir leave, coconut milk served with steam rice.' },
      { code: 'A17', name: 'Mchu Ktis', price: '$4.50', description: 'Fish, chicken or pork, shallot, turmeric, lemongrass, kaffir leave, coconut milk, pineapple, tamarind served with steam rice.' },
      { code: 'A18', name: 'Lemongrass Sour Soup with Morning Glory', price: '$4.50', description: 'Beef, chicken, pork, shallot, turmeric, lemongrass, kaffir leave, coconut milk, morning glory, tamarind, holy basil, served with steam rice.' },
    ],
  },
  {
    category: 'Main Course: Stir Fried',
    items: [
      { code: 'A19', name: 'Beef Lok Lak', price: '$5.00', description: 'Local beef, tenderloin, oyster sauce, garlic, kampot pepper served with steam rice.', tag: 'Must Try' },
      { code: 'A20', name: 'Stir Fried with Ginger', price: '$4.00', description: 'Fish, chicken or pork, ginger, garlic, spring onion, served with steam rice.' },
      { code: 'A21', name: 'Stir Fried Lemongrass with Holy Basil', price: '$4.00', description: 'Chicken, beef or pork, shallot, lemongrass, kaffir leave, holy basil, served with steam rice.' },
      { code: 'A22', name: 'Fish Fillet with Mango Salad', price: '$4.00', description: 'Fish, mango, shallot, garlic, tomato, basil, served with steam rice.' },
      { code: 'A23', name: 'Seafood with Kampot Green Pepper', price: '$5.00', description: 'Seafood, garlic, Kampot green pepper, onion, carrot, bell pepper, served with steam rice.', tag: 'Signature' },
      { code: 'A24', name: 'Sweet and Sour', price: '$4.00', description: 'Chicken, pork, garlic, onion, carrot, tomato, bell pepper, pineapple served with steam rice.' },
      { code: 'A25', name: 'Stir fried Mixed Vegetable', price: '$3.50', description: 'Mixed vegetable with oyster sauce served with steam rice.' },
      { code: 'A26', name: 'Pineapple Chicken with Cashew-Nut', price: '$4.50', description: 'Green pepper, carrot, cashew-nut, onion, tomato, pineapple' },
    ],
  },
  {
    category: 'Western Food',
    items: [
      { code: 'A27', name: 'Club Sandwich', price: '$4.00', description: 'White toast, lettuce, cucumber, tomato, bacon, chicken, cheese, french fries.' },
      { code: 'A28', name: 'Ham & Cheese Sandwich', price: '$4.00', description: 'White toast, ham, cheese, lettuce, shallot.' },
      { code: 'A29', name: 'Chicken Sandwich', price: '$4.00', description: 'White toast, lettuce, tomato, onion, mayonnaise, pickle, french fries' },
      { code: 'A30', name: 'Beef Burger', price: '$5.00', description: 'Burger bun, tomato, lettuce, onion, cheese, beef.' },
      { code: 'A31', name: 'Carbonara', price: '$5.00', description: 'Selection of spaghetti or penne, bacon, cheese.' },
      { code: 'A32', name: 'Bolognese', price: '$5.00', description: 'Selection of spaghetti or penne, beef, bolognese sauce.' },
      { code: 'A33', name: 'Spaghetti Tomato Sauce', price: '$5.00', description: 'Tomato, garlic, salt, pepper and butter' },
      { code: 'A34', name: 'Tuna Sandwich', price: '$4.00', description: 'White toast, lettuce, tomato, onion, mayonnaise, pickle, french fries' },
      { code: 'A35', name: 'Chicken Burger', price: '$5.00', description: 'Burger bun, tomato, lettuce, onion, cheese, chicken' },
      { code: 'A36', name: 'Chicken Steak', price: '$7.00', description: 'Chicken, potato, carrot, broccoli, served with mixed salad.' },
      { code: 'A37', name: 'Beef Steak', price: '$8.00', description: 'Khmer beef, potato, carrot, broccoli, served with mixed salad.', tag: 'Chef Choice' },
      { code: 'A38', name: 'Seafood Spicy', price: '$6.00', description: 'Selection of spaghetti or penne, seafood, holy basil' },
      { code: 'A39', name: 'Fish Round Bacon with Paprika Sauce', price: '$6.00', description: 'Mashed potato, paprika sauce served with salad' },
    ],
  },
  {
    category: 'Dessert',
    items: [
      { code: 'A40', name: 'Seasonal Fresh Fruit Platter', price: '$3.00', description: 'Assorted seasonal tropical Cambodian fruits' },
      { code: 'A41', name: 'Mango with Black Sticky Rice', price: '$4.00', description: 'Sweet ripe mango served with warm coconut black sticky rice', tag: 'Favorite' },
      { code: 'A42', name: 'Banana Passion Fruit', price: '$3.00', description: 'Caramelized sweet bananas in tangy passion fruit reduction' },
      { code: 'A43', name: 'Deep Fried Banana with Vanilla Ice-Cream', price: '$3.50', description: 'Crispy fried banana fritters accompanied by creamy vanilla ice cream' },
    ],
  },
];

export const DINING_EXPERIENCES: DiningExperience[] = [
  {
    id: 'le-vert-restaurant',
    name: 'LE VERT RESTAURANT',
    hours: 'Breakfast: 06:30 – 10:00 | Lunch: 11:30 – 15:00 | Dinner: 16:30 – 22:00',
    location: 'Ground Floor & Garden Terrace',
    description: 'All day dining restaurant and sample authentic Cambodian-style combine with western meals. A la carte menu for breakfast, lunch and dinner.\n\n*Breakfast from 6:30 hours to 10:00 hours and it will be served either ala carte or buffet mixed Asian and Western.\n*Lunch is served from 11:30 hours to 15:00 hours for all Asian and Western set menu and ala carte order.\n*Dinner is served from 16:30 hours to 22:00 hours for all Asian and Western set menu and ala carte order.',
    image: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/0D9A3910-2048x1366.jpg',
    images: [
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/0D9A3910-2048x1366.jpg',
    ],
    menuHighlights: [
      'Breakfast: 06:30 – 10:00 (Buffet or à la carte mixed Asian & Western)',
      'Lunch: 11:30 – 15:00 (Asian and Western set menu & à la carte)',
      'Dinner: 16:30 – 22:00 (Asian and Western set menu & à la carte)',
      'All-day dining blending authentic Cambodian recipes with Western comfort foods',
      'Full 4-page printed menu with 43 items (Starters, Soups, Stir Fries, Steaks, Desserts)',
    ],
    menuSections: FULL_RESTAURANT_MENU_SECTIONS,
  },
];

export const SPA_TREATMENTS: SpaTreatment[] = [
  {
    id: 'khmer-body-massage',
    name: 'KHMER BODY MASSAGE',
    duration: '60 min / 90 min',
    price: '$18 / $25 USD',
    category: 'massage',
    description: 'Experience yourself in a Traditional Khmer way of therapeutic work call “Chab Ta Shai”. A vigorous, firm massage for effective pain relief; the touch technique are deep and reasonable forceful in continuous, elastic and rhythmic. The strength is vary from gently to moderately and intense pressure. Relaxing Aromatherapy: Experience the healing effects of Asian aromatherapy in a relaxing and restorative massage that combines the sense of tropical smells with the soothing value of acupressure point. Individually chosen to suit your personal requirements, the essential oils will rebalance your vital energies restoring harmony and calm to your body and mind.',
    benefits: [
      'Traditional "Chab Ta Shai" therapeutic technique',
      'Vigorous, firm massage for effective pain relief',
      'Deep, continuous, elastic and rhythmic touches',
      'Asian aromatherapy with customized tropical essential oils',
    ],
    image: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/fgsdfg-4200-x-2938-scaled.jpg',
  },
  {
    id: 'anti-stress-back-shoulder',
    name: 'ANTI-STRESS BACK & SHOULDER MASSAGE',
    duration: '45 min / 60 min',
    price: '$15 / $20 USD',
    category: 'massage',
    description: 'Chronic fatigue and extreme muscle spasms possible tissue damage and pain, Surrender yourself to our skilled full therapist help to soothe this trouble.',
    benefits: [
      'Relieves chronic fatigue and extreme muscle spasms',
      'Helps prevent possible tissue damage and discomfort',
      'Soothing care by our skilled full certified therapists',
      'Fast relief for upper body and shoulder tension',
    ],
    image: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/Spa-treatment.webp',
  },
  {
    id: 'relief-relax-package',
    name: 'RELIEF, RELAX & REJUVENATION PACKAGE',
    duration: '120 min',
    price: '$35 USD',
    category: 'package',
    description: 'Chronic fatigue and extreme muscle spasms possible tissue damage and pain, Surrender yourself to our skilled therapist help to soothe this trouble. Pamper yourself with the most recommended specialized spa package designed to offer you the true spa experience of relaxing, relieving, and revitalizing at the same time. The package included Swedish Massage, Calming Head Massage and Revitalizing Facial Treatment.',
    benefits: [
      'Most recommended specialized 3-in-1 spa package',
      'True experience of relaxing, relieving & revitalizing',
      'Includes full Swedish Massage',
      'Includes Calming Head Massage & Revitalizing Facial',
    ],
    image: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/sad-4200-x-2963-scaled.jpg',
  },
  {
    id: 'swedish-massage',
    name: 'Swedish Massage',
    duration: '60 min',
    price: '$20 USD',
    category: 'massage',
    description: 'Included in our signature Relief, Relax & Rejuvenation Package. Gentle, flowing therapeutic strokes combined with restorative aromatic essential oils to ease muscular tension and improve circulation.',
    benefits: ['Gentle muscle tension relief', 'Stimulates circulation and calm', 'Included in Rejuvenation Package'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'calming-head-massage',
    name: 'Calming Head Massage',
    duration: '45 min',
    price: '$14 USD',
    category: 'facial',
    description: 'Included in our signature Relief, Relax & Rejuvenation Package. Gentle acupressure focused on cranial pressure points to quiet busy thoughts, relieve headaches, and soothe ocular fatigue.',
    benefits: ['Acupressure for cranial relaxation', 'Soothes headaches and fatigue', 'Included in Rejuvenation Package'],
    image: 'https://images.unsplash.com/photo-1512290900672-1f4a9b2b52ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'revitalizing-facial-treatment',
    name: 'Revitalizing Facial Treatment',
    duration: '60 min',
    price: '$22 USD',
    category: 'facial',
    description: 'Included in our signature Relief, Relax & Rejuvenation Package. A restorative botanical facial ritual using nourishing natural extracts to cleanse, hydrate, and renew sun-exposed skin.',
    benefits: ['Botanical hydration & renewal', 'Gentle deep pore cleansing', 'Included in Rejuvenation Package'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  },
];

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: 'rooftop-pool',
    title: 'Rooftop Swimming Pool & Sun Deck',
    hours: '6:30 AM – 10:00 PM',
    description: 'Crystal-clear pool perched on our top level, surrounded by wooden sun decks, shaded cabanas, and open-air sunset views over Siem Reap city.',
    iconName: 'Waves',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    features: [
      'Sparkling outdoor swimming pool',
      'Comfortable sun loungers with clean towels',
      'Waterfall showers & private changing cabins',
      'Poolside drinks & dining service',
    ],
  },
  {
    id: 'concierge-tours',
    title: '24-Hour Concierge & Travel Desk',
    hours: '24 Hours Daily',
    description: 'Our welcoming team assists you with personalized Angkor Wat itineraries, official temple passes, private tuk-tuk hires, air-conditioned vehicle transfers, and bicycle rentals.',
    iconName: 'Compass',
    image: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/07/photo_2025-07-21_11-25-55.jpg',
    features: [
      'Airport pick-up & departure transfers',
      'Official Angkor pass purchase assistance',
      'Private car, van, and remork (tuk-tuk) bookings',
      'Siem Reap dining & cultural show reservations',
    ],
  },
  {
    id: 'dining-room-service',
    title: 'All-Day Dining & In-Room Service',
    hours: '6:30 AM – 10:00 PM',
    description: 'Indulge in flavorful Khmer specialties and international comforts in our stylish dining room or privately delivered to your suite balcony.',
    iconName: 'Utensils',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    features: [
      'Multi-course breakfast with eggs to order',
      'Private in-room dining on your suite balcony',
      'Fresh tropical fruit smoothies and cocktails',
      'Vegetarian and vegan dietary accommodations',
    ],
  },
  {
    id: 'wellness-spa',
    title: 'Khmer Herbal Wellness & Spa',
    hours: '9:00 AM – 10:00 PM',
    description: 'An intimate retreat for rejuvenation featuring authentic Cambodian massage therapies, botanical oils, and herbal compresses.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    features: [
      'Air-conditioned private treatment rooms',
      'Couples massage suites available',
      'Certified experienced Cambodian therapists',
      'Complimentary warm ginger tea service',
    ],
  },
  {
    id: 'high-speed-wifi',
    title: 'High-Speed Fiber Optic Wi-Fi',
    hours: '24 Hours Daily',
    description: 'Dedicated business-grade fiber optic internet throughout the hotel, suites, balconies, restaurant, and rooftop pool for effortless connectivity.',
    iconName: 'Wifi',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    features: [
      'Fast speeds for video streaming and remote work',
      'Reliable coverage in every room and public space',
      'Complimentary unlimited access for all guests',
    ],
  },
  {
    id: 'location-prime',
    title: 'Prime Old Market & Pub Street Location',
    hours: 'Ideal Proximity',
    description: 'Conveniently situated in quiet Steung Thmey Village, just 5 minutes stroll from the famous Pub Street, Night Market, and Old Market (Phsar Chas).',
    iconName: 'MapPin',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    features: [
      'Walk to over 100 cafes, galleries, and eateries',
      'Quiet residential setting ensures peaceful sleep',
      'Only 15 minutes drive to Angkor Wat entrance',
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    title: 'Le Vert Suite Master Bed & Balcony',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/03/photo_2024-08-21_11-26-27-2.jpg',
    category: 'rooms',
    alt: 'Master bedroom in Le Vert Suite with balcony view',
  },
  {
    id: 2,
    title: 'Family Suite with Balcony City View',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6366-scaled.jpg',
    category: 'rooms',
    alt: 'Spacious family suite with balcony',
  },
  {
    id: 3,
    title: 'Junior Suite Luxury King Bed',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/0D9A3440-scaled.jpg',
    category: 'rooms',
    alt: 'Junior suite with king size bed and wood parquet floors',
  },
  {
    id: 4,
    title: 'Deluxe Double Room Interior',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/photo_2024-08-21_11-20-45.jpg',
    category: 'rooms',
    alt: 'Deluxe double room with balcony',
  },
  {
    id: 5,
    title: 'Deluxe Twin Suite Configuration',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/photo_2024-08-21_11-22-50.jpg',
    category: 'rooms',
    alt: 'Deluxe twin room with balcony city view',
  },
  {
    id: 6,
    title: 'Suite Balcony View & Seating',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/01/IMG_6368-scaled.jpg',
    category: 'rooms',
    alt: 'Private balcony view and seating at Le Vert Angkor',
  },
  {
    id: 7,
    title: 'Angkor Wat at Golden Hour',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/R-3.jpg',
    category: 'tours',
    alt: 'Angkor Wat temple Small Circuit tour',
  },
  {
    id: 8,
    title: 'Ta Prohm Ancient Banyan Roots',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/03/Things-to-Do-in-Siem-Reap.jpg',
    category: 'tours',
    alt: 'Things to do in Siem Reap and Big Circuit temple expedition',
  },
  {
    id: 9,
    title: 'Bayon Temple Colossal Faces',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    category: 'tours',
    alt: 'Bayon stone smiling face towers in Angkor Thom',
  },
  {
    id: 10,
    title: 'Rooftop Swimming Pool View',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    category: 'pool',
    alt: 'Rooftop swimming pool and sundeck at Le Vert Angkor',
  },
  {
    id: 11,
    title: 'Rooftop Sunset Lounge',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    category: 'dining',
    alt: 'Sunset drinks at rooftop bar',
  },
  {
    id: 12,
    title: 'Le Vert Restaurant Khmer Specialties',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    category: 'dining',
    alt: 'Gourmet dining and authentic Khmer dishes',
  },
  {
    id: 13,
    title: 'Traditional Khmer Herbal Massage',
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    category: 'spa',
    alt: 'Herbal body massage and relaxation at Le Vert Spa',
  },
  {
    id: 14,
    title: 'Reception & Warm Khmer Welcome',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2025/07/photo_2025-07-21_11-25-55.jpg',
    category: 'all',
    alt: 'Reception desk at Le Vert Angkor Hotel',
  },
  {
    id: 15,
    title: 'TripAdvisor Travelers’ Choice 2026',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2026/04/Digital-Award_TRA-2026.png',
    category: 'all',
    alt: 'Tripadvisor 2026 Travelers Choice Award',
  },
];

export const AWARDS_PLATFORMS: AwardPlatform[] = [
  {
    name: 'TripAdvisor',
    category: 'Travelers’ Choice 2026 Winner',
    ratingScore: '5.0',
    maxScore: '5.0',
    reviewCount: 'Top 10% of Hotels Worldwide',
    badgeUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2026/04/Digital-Award_TRA-2026.png',
    link: 'https://www.tripadvisor.com/Hotel_Review-g297390-d26986566-Reviews-Le_Vert_Angkor_Hotel-Siem_Reap_Siem_Reap_Province.html',
    description: 'Celebrated by independent travelers for exceptional cleanliness, rooftop pool relaxation, and warm personalized staff care.',
  },
  {
    name: 'Booking.com',
    category: 'Guest Review Excellence',
    ratingScore: '9.2',
    maxScore: '10',
    reviewCount: 'Superb (Verified Guest Reviews)',
    link: 'https://www.booking.com/hotel/kh/le-vert-angkor.html',
    description: 'Consistently awarded top marks for its unbeatable location 150m from Old Market and spacious suite balconies.',
  },
  {
    name: 'Trip.com',
    category: 'Preferred Boutique Property',
    ratingScore: '4.8',
    maxScore: '5.0',
    reviewCount: 'Outstanding Rating',
    link: 'https://www.trip.com/hotels/siem-reap-hotel-detail-108745580/le-vert-angkor-hotel/',
    description: 'High guest recommendation rate across Asian and international independent voyagers.',
  },
  {
    name: 'Hotels.com / Expedia',
    category: 'Loved by Guests Award',
    ratingScore: '9.0',
    maxScore: '10',
    reviewCount: 'Wonderful Feedback',
    link: 'https://www.hotels.com/ho3163354304/le-vert-angkor-hotel-siem-reap-cambodia/',
    description: 'Commended for delicious breakfast, quiet air conditioning, and seamless airport transfer assistance.',
  },
  {
    name: 'Planet of Hotels',
    category: 'Certified Top Value Accommodations',
    ratingScore: '9.1',
    maxScore: '10',
    reviewCount: 'Highly Recommended',
    link: 'https://planetofhotels.com/en/cambodia/siem-reap/le-vert-angkor-hotel',
    description: 'Recognized for modern interior aesthetics, friendly Cambodian hospitality, and central location.',
  },
  {
    name: 'Qantas Hotels',
    category: 'Partner Boutique Selection',
    ratingScore: '4.8',
    maxScore: '5.0',
    reviewCount: 'Featured Partner',
    link: 'https://www.qantas.com/hotels/properties/28707767',
    description: 'Selected boutique accommodation for visitors to the Kingdom of Cambodia.',
  },
  {
    name: 'Trivago',
    category: 'Price & Comfort Leader',
    ratingScore: '8.9',
    maxScore: '10',
    reviewCount: 'Top Value Selection',
    link: 'https://www.trivago.com/en-US/oar/hotel-le-vert-angkor-siem-reap',
    description: 'Exceptional price-to-quality balance for boutique suites with private balconies.',
  },
];

export const STATIC_ROOMS = ROOMS_DATA;
export const STATIC_TOURS = TOURS_DATA;

export interface GuestReview {
  author: string;
  country: string;
  stayedRoom: string;
  comment: string;
  stars: number;
}

export const GUEST_REVIEWS: GuestReview[] = [
  {
    author: 'Sophie L.',
    country: 'France',
    stayedRoom: 'Le Vert Suite With Balcony City View',
    comment: 'An absolute jewel in Siem Reap. The private balcony was sublime for sunset drinks after a long day at Angkor Wat. The staff arranged our sunrise tour with chilled towels and cold water. 10/10!',
    stars: 5,
  },
  {
    author: 'Marcus & Elena K.',
    country: 'Germany',
    stayedRoom: 'Junior Suite with Balcony',
    comment: 'Location is unbeatable — just a 2-minute stroll to the Old Market and riverside cafes, yet situated on a peaceful quiet side street where you sleep soundly. The rooftop pool is gorgeous.',
    stars: 5,
  },
  {
    author: 'David W.',
    country: 'Australia',
    stayedRoom: 'Family Suite with Balcony',
    comment: 'Travelled with our two teenagers. The Family Suite was so spacious with two large beds and a sparkling clean bathroom with both shower and tub. Authentic Khmer breakfast was delicious every morning.',
    stars: 5,
  },
];
