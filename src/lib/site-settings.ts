import { HeroConfig } from '../types';

export const SITE_SETTINGS = {
  hotelName: 'Le Vert Angkor Hotel',
  tagline: 'Luxury Boutique Sanctuary in Siem Reap',
  logoUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/cropped-cropped-1logo.png',
  logoSmallUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/cropped-cropped-1logo-150x150.png',
  bookingUrl: 'https://app.inn-connect.com/book2/?p=Le+Vert+Angkor+Hotel',
  googleMapsUrl: 'https://maps.app.goo.gl/U3CHTBCSNjETCQzC7',
  phone: '+855 70 247 282',
  phoneClean: '+85570247282',
  whatsappUrl: 'https://wa.me/85570247282?text=Hello%20Le%20Vert%20Angkor%20Hotel%2C%20I%20would%20like%20to%20inquire%20about%20a%20reservation.',
  email: 'reservation@levertangkorhotel.com',
  address: 'Steung Thmey Village, Svay Dangkum Commune, Siem Reap District, Siem Reap Province, Cambodia',
  locationSummary: '5 minutes to Old Market & Pub Street • 15 minutes to Angkor Wat Temple Complex',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.8!2d103.8526337!3d13.3564172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311017870ea64b49%3A0xea19638c55ed9f85!2sLe%20Vert%20Angkor%20Hotel!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh',
  social: {
    facebook: 'https://www.facebook.com/levertangkorhotel',
    instagram: 'https://www.instagram.com/levertangkorhotel',
    tripadvisor: 'https://www.tripadvisor.com/Hotel_Review-g297390-d26986566-Reviews-Le_Vert_Angkor_Hotel-Siem_Reap_Siem_Reap_Province.html',
  },
  amenityHighlights: [
    'Rooftop Swimming Pool & Sunset Bar',
    'Curated Private Angkor Wat Temple Tours',
    'Signature Khmer Herbal Spa & Massage',
    'Authentic Khmer & Western Gourmet Dining',
    'Complimentary High-Speed Fiber Wi-Fi',
    '24-Hour Concierge & Bus Station Transfer Services',
  ],
};

/**
 * Replaceable Hero Configurations
 * As mandated by the migration brief:
 * "For every page hero, use a temporary random or neutral travel/hotel photo.
 * Clearly isolate hero images in a replaceable configuration or CMS field so the
 * hotel owner can swap in real photos later without changing the page layout."
 */
export const HERO_CONFIGS: Record<string, HeroConfig> = {
  home: {
    eyebrow: 'SIEM REAP • CAMBODIA',
    title: 'A Sanctuary of Calm & Khmer Elegance',
    subtitle: 'Step into an oasis of understated luxury, perched just 5 minutes from the lively Old Market and moments from the timeless wonder of Angkor Wat.',
    imageUrl: '/images/Home/home-hero-image/1.jpg',
    images: [
      '/images/Home/home-hero-image/1.jpg',
      '/images/Home/home-hero-image/2.jpg',
      '/images/Home/home-hero-image/3.jpg',
      '/images/Home/home-hero-image/4.jpg',
      '/images/Home/home-hero-image/5.jpg',
    ],
    imagePlaceholderNote: 'Hotel Authentic Photography Slideshow (5 scenes)',
    badge: 'TripAdvisor Travelers’ Choice 2026',
  },
  rooms: {
    eyebrow: 'ACCOMMODATIONS',
    title: 'Refined Living Spaces with Private Balconies',
    subtitle: 'Six bespoke room categories designed for effortless tranquility, boasting artisan furnishings, city vistas, and contemporary Khmer comforts.',
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Serene Luxury Suite Aesthetic)',
    badge: 'Private Balconies in Every Room',
  },
  roomDetail: {
    eyebrow: 'EXCLUSIVE SUITE',
    title: 'Your Private Siem Reap Sanctuary',
    subtitle: 'Thoughtfully crafted with spacious king bedding, panoramic balcony vistas, bespoke woodcraft, and rain showers.',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Boutique Bedroom Detail)',
  },
  touring: {
    eyebrow: 'EXPEDITIONS & HERITAGE',
    title: 'Unveil the Timeless Secrets of Angkor',
    subtitle: 'Curated private temple tours led by knowledgeable English-speaking guides in climate-controlled luxury vehicles with chilled refreshments.',
    imageUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/03/Things-to-Do-in-Siem-Reap.jpg',
    imagePlaceholderNote: 'WordPress Tour Asset (Big Circuit Angkor Heritage)',
    badge: 'Big Circuit & Small Circuit',
  },
  tourDetail: {
    eyebrow: 'HERITAGE JOURNEY',
    title: 'Curated Angkor Archaeological Discovery',
    subtitle: 'A private itinerary crafted to experience the temples at their most majestic hours, avoiding the midday crowds.',
    imageUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/R-3.jpg',
    imagePlaceholderNote: 'WordPress Tour Asset (Angkor Wat Small Circuit Heritage)',
  },
  dining: {
    eyebrow: 'DINING & CULINARY ARTS',
    title: 'Le Vert Restaurant & Bar',
    subtitle: 'Savor authentic Cambodian-style cuisine combined with Western favorites, crafted with fresh local ingredients, artisanal beverages, and gracious Khmer hospitality.',
    imageUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/0D9A3910-2048x1366.jpg',
    images: [
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/0D9A3910-2048x1366.jpg',
    ],
    imagePlaceholderNote: 'Authentic Le Vert Angkor Hotel Restaurant Photography',
    badge: 'All-Day Dining 06:30 – 22:00',
  },
  facilities: {
    eyebrow: 'HOTEL FACILITIES',
    title: 'Rooftop Swimming Pool',
    subtitle: 'Our rooftop pool is open from 10:00 hours to 22:00 hours. Relax after sightseeing with sunset panoramic views over Siem Reap city.',
    imageUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/IMG_2364-2.jpg',
    images: [
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/IMG_2364-2.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/513212141.jpg',
    ],
    imagePlaceholderNote: 'Authentic Le Vert Angkor Hotel Rooftop Swimming Pool',
    badge: 'Open Daily 10:00 – 22:00',
  },
  spa: {
    eyebrow: 'WELLNESS & REJUVENATION',
    title: 'Authentic Khmer Spa & Healing Arts',
    subtitle: 'Surrender yourself to our skilled full therapists to soothe chronic fatigue, relieve muscle spasms, and experience Traditional Khmer therapeutic arts and Asian aromatherapy.',
    imageUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/fgsdfg-4200-x-2938-scaled.jpg',
    images: [
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/fgsdfg-4200-x-2938-scaled.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/sad-4200-x-2963-scaled.jpg',
      'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/Spa-treatment.webp',
    ],
    imagePlaceholderNote: 'Authentic Le Vert Angkor Hotel Spa Photography',
    badge: 'Traditional "Chab Ta Shai" Therapy',
  },
  gallery: {
    eyebrow: 'VISUAL CHRONICLE',
    title: 'Moments of Serenity & Discovery',
    subtitle: 'Explore our visual portfolio encompassing peaceful suites, temple wonders, artisanal cuisine, and soothing spa therapies.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Boutique Architecture View)',
  },
  contact: {
    eyebrow: 'GET IN TOUCH',
    title: 'We Await the Pleasure of Welcoming You',
    subtitle: 'Located on Steung Thmey Village, 5 minutes from the heartbeat of Siem Reap. Reach out to our concierge for bespoke requests and direct booking benefits.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Concierge Hospitality Setting)',
  },
  awards: {
    eyebrow: 'ACCOLADES & RECOGNITION',
    title: 'Celebrated by Travelers Across the Globe',
    subtitle: 'Recognized for warm hospitality, prime location, and meticulous guest care on premier global travel platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Award-Winning Hospitality Atmosphere)',
    badge: 'TripAdvisor Travelers’ Choice 2026',
  },
  blog: {
    eyebrow: 'STORIES & INSIDER GUIDES',
    title: 'Journeys Through Angkor & Siem Reap',
    subtitle: 'Curated travel advice, temple secrets, authentic Khmer culinary traditions, and wellness rituals from our local concierge experts.',
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Angkor Wat Twilight Horizon)',
    badge: 'Curated Heritage Journal',
  },
};
