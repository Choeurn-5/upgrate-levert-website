import { HeroConfig } from '../types';

export const SITE_SETTINGS = {
  hotelName: 'Le Vert Angkor Hotel',
  tagline: 'Luxury Boutique Sanctuary in Siem Reap',
  logoUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/cropped-cropped-1logo.png',
  logoSmallUrl: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/cropped-cropped-1logo-150x150.png',
  bookingUrl: 'https://app.inn-connect.com/book/properties/Le%20Vert%20Angkor%20Hotel',
  phone: '+855 70 247 282',
  phoneClean: '+85570247282',
  whatsappUrl: 'https://wa.me/85570247282?text=Hello%20Le%20Vert%20Angkor%20Hotel%2C%20I%20would%20like%20to%20inquire%20about%20a%20reservation.',
  email: 'reservation@levertangkorhotel.com',
  address: 'Steung Thmey Village, Svay Dangkum Commune, Siem Reap District, Siem Reap Province, Cambodia',
  locationSummary: '150 meters to Old Market & Pub Street • 7 km to Angkor Wat Temple Complex',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.9961621217036!2d103.8541243!3d13.3504899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31101777242c1629%3A0x6d9f783aaef3b88!2sLe%20Vert%20Angkor%20Hotel!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh',
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
    '24-Hour Concierge & Airport Transfer Services',
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
    subtitle: 'Step into an oasis of understated luxury, perched just 150 meters from the lively Old Market and moments from the timeless wonder of Angkor Wat.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Tropical Boutique Hotel Canvas)',
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
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Ancient Temple Architecture)',
    badge: 'Big Circuit & Small Circuit',
  },
  tourDetail: {
    eyebrow: 'HERITAGE JOURNEY',
    title: 'Curated Angkor Archaeological Discovery',
    subtitle: 'A private itinerary crafted to experience the temples at their most majestic hours, avoiding the midday crowds.',
    imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Sunrise Heritage Perspective)',
  },
  dining: {
    eyebrow: 'CULINARY JOURNEY',
    title: 'Rooftop Vistas & Authentic Khmer Gastronomy',
    subtitle: 'Savor traditional Cambodian Fish Amok, Lok Lak, and fresh tropical cocktails as the golden sun dips over the Siem Reap horizon.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Intimate Luxury Dining Scene)',
    badge: 'Rooftop Bar 10:00 – 22:00',
  },
  spa: {
    eyebrow: 'WELLNESS & REJUVENATION',
    title: 'Ancient Khmer Healing & Botanical Harmony',
    subtitle: 'Immerse your senses in therapeutic massage techniques passed down through generations, utilizing organic Cambodian botanicals and aromatic herbal compresses.',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Holistic Spa Treatment Atmosphere)',
    badge: 'Signature Herbal Treatments',
  },
  facilities: {
    eyebrow: 'ROOFTOP SWIMMING POOL',
    title: 'An Intimate Skyline Pool & Sun Deck Oasis',
    subtitle: 'Perched on our rooftop above Siem Reap, enjoy crystal-clear waters, plush cushioned loungers, chilled cocktails, and breathtaking sunset panoramas.',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Rooftop Pool & Sky Horizon)',
    badge: 'Open Daily 6:30 AM – 10:00 PM',
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
    subtitle: 'Located on Steung Thmey Village, 150 meters from the heartbeat of Siem Reap. Reach out to our concierge for bespoke requests and direct booking benefits.',
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
  templePackage: {
    eyebrow: 'SIGNATURE RETREAT',
    title: 'The Ultimate Siem Reap & Angkor Temple Package',
    subtitle: 'A seamless 3-night experience including private suite accommodation, chauffeured Angkor expeditions, daily gourmet breakfast, and complimentary spa rejuvenation.',
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=85',
    imagePlaceholderNote: 'Replaceable Hero Asset (Angkor Wat Dramatic Horizon)',
    badge: 'All-Inclusive Heritage Stay',
  },
};
