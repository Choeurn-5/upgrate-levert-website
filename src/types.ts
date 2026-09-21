export type AppRoute =
  | '/'
  | '/rooms/'
  | '/our-room/'
  | '/touring/'
  | '/our-tours/'
  | '/dining/'
  | '/spa/'
  | '/facilities-levertangkorhotel/'
  | '/gallery/'
  | '/contact-levertangkorhotel/'
  | '/awards/'
  | '/temple-package/';

export interface CmsImage {
  id: number;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface Room {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  pricePerNight: number;
  currency: string;
  capacityGuests: number;
  bedType: string;
  sizeSqm: number;
  hasBalcony: boolean;
  viewType: string;
  shortDescription: string;
  longDescription: string;
  featuredImage: string;
  galleryImages: string[];
  amenities: string[];
  featured?: boolean;
}

export interface TourStop {
  time?: string;
  templeName: string;
  description: string;
  highlight?: string;
}

export interface Tour {
  id: number;
  slug: string;
  title: string;
  price: number;
  currency: string;
  duration: string;
  vehicleType: string;
  shortDescription: string;
  longDescription: string;
  featuredImage: string;
  itinerary: TourStop[];
  inclusions: string[];
  exclusions: string[];
  tips: string[];
}

export interface MenuItem {
  name: string;
  khmerName?: string;
  description: string;
  price: string;
  tag?: string;
}

export interface MenuSection {
  category: string;
  items: MenuItem[];
}

export interface DiningExperience {
  id: string;
  name: string;
  hours: string;
  location: string;
  description: string;
  image: string;
  menuHighlights: string[];
  menuSections?: MenuSection[];
}

export interface SpaTreatment {
  id: string;
  name: string;
  duration: string;
  price: string;
  category: 'massage' | 'package' | 'facial' | 'scrub';
  description: string;
  benefits: string[];
  image: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  hours?: string;
  description: string;
  iconName: string;
  image: string;
  features: string[];
}

export interface GalleryPhoto {
  id: number | string;
  url: string;
  title: string;
  category: 'all' | 'rooms' | 'tours' | 'dining' | 'spa' | 'pool';
  alt: string;
}

export interface AwardPlatform {
  name: string;
  category: string;
  ratingScore: string;
  maxScore: string;
  reviewCount: string;
  badgeUrl?: string;
  link: string;
  description: string;
}

export interface HeroConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imagePlaceholderNote: string;
  badge?: string;
}
