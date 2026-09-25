import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Award, ArrowRight, ShieldCheck, Utensils, Compass, Heart, Check, Clock, Phone, ChevronRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { RoomCard } from '../components/RoomCard';
import { TourCard } from '../components/TourCard';
import { HeroConfig, Room, Tour, AppRoute } from '../types';
import { SITE_SETTINGS } from '../lib/site-settings';
import { AWARDS_PLATFORMS, GALLERY_PHOTOS, DINING_EXPERIENCES, SPA_TREATMENTS } from '../data/hotelData';

interface HomeViewProps {
  heroConfig: HeroConfig;
  rooms: Room[];
  tours: Tour[];
  onNavigate: (route: AppRoute, slug?: string) => void;
  onOpenBooking: (preferredRoom?: string) => void;
  onOpenHeroManager: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  heroConfig,
  rooms,
  tours,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  const featuredRooms = rooms.slice(0, 3);
  const featuredTours = tours.slice(0, 2);
  const previewPhotos = GALLERY_PHOTOS.slice(0, 6);

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={() => onOpenBooking()}
        primaryButtonText="Check Availability & Rates"
        onSecondaryClick={() => onNavigate('/rooms/')}
        secondaryButtonText="Explore All Suites"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Hotel Story & Philosophy */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1C3829]/10 text-[#1C3829] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Boutique Sanctuary • Siem Reap</span>
            </div>

            <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829] leading-[1.15]">
              Understated Luxury, Steps from Phsar Chas and Minutes from Angkor
            </h2>

            <p className="text-base text-[#4A554F] font-light leading-relaxed">
              Nestled quietly in Steung Thmey Village, <strong>Le Vert Angkor Hotel</strong> offers an intimate oasis where modern boutique design meets warm Cambodian hospitality. Located just a 2-minute stroll (150 meters) from the vibrant Old Market, Night Market, and famous Pub Street, our sanctuary lets you indulge in serene tranquility while keeping the best of Siem Reap at your doorstep.
            </p>

            <p className="text-base text-[#4A554F] font-light leading-relaxed">
              Unwind on your private balcony, take a rejuvenating dip in our rooftop pool with sunset city vistas, nourish yourself with authentic Khmer cuisine, and let our dedicated concierge curate seamless expeditions to the legendary temples of Angkor Wat.
            </p>

            {/* Micro Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#F2EDE4] border border-[#E7E0D5]">
                <div className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
                  150 m
                </div>
                <div className="text-xs text-[#68726B] font-medium mt-0.5">
                  Walk to Old Market & Pub Street
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F2EDE4] border border-[#E7E0D5]">
                <div className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
                  7 km
                </div>
                <div className="text-xs text-[#68726B] font-medium mt-0.5">
                  To Angkor Wat Temple Gates
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/rooms/')}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#1C3829] hover:text-[#2D5540] group underline underline-offset-8"
              >
                <span>Explore Our Luxury Rooms & Suites</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-[#E7E0D5]">
              <img
                src="https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/03/photo_2024-08-21_11-26-27-2.jpg"
                alt="Le Vert Angkor Hotel Suite"
                className="w-full h-80 sm:h-[440px] object-cover"
              />
            </div>

            {/* Overlapping secondary card */}
            <div className="absolute -bottom-8 -left-4 sm:-left-8 z-20 w-64 sm:w-72 bg-[#FAF8F5] p-5 rounded-2xl shadow-xl border border-[#E7E0D5]">
              <div className="flex items-center space-x-3">
                <img
                  src="https://www.cms.levertangkorhotel.com/wp-content/uploads/2026/04/Digital-Award_TRA-2026.png"
                  alt="Tripadvisor award"
                  className="w-12 h-12 object-contain shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-[#1C3829]">
                    Travelers’ Choice 2026
                  </div>
                  <div className="text-[11px] text-[#68726B]">
                    Top 10% Hotels Worldwide
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Rooms & Suites Strip */}
      <section className="py-20 bg-[#F2EDE4]/60 border-y border-[#E7E0D5]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-2">
                Accommodations
              </span>
              <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
                Suites Crafted for Peaceful Respite
              </h2>
              <p className="text-sm text-[#68726B] font-light max-w-xl mt-2">
                Every suite at Le Vert Angkor features a private open-air balcony, bespoke hardwood elements, and soothing rain showers.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/rooms/')}
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1C3829] hover:text-[#2D5540] group py-2"
            >
              <span>View All 6 Suite Categories</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room, i) => (
              <RoomCard
                key={room.slug}
                room={room}
                index={i}
                onViewDetails={(slug) => onNavigate('/our-room/', slug)}
                onBookNow={(slug) => onOpenBooking(slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Experiences Strip (Dining, Pool, Spa, Tours) */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-2">
            The Le Vert Experience
          </span>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
            A Symphony of Rest, Taste & Wonder
          </h2>
          <p className="text-sm text-[#68726B] font-light mt-3">
            Immerse yourself in elevated amenities curated to balance ancient exploration with deep relaxation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Temple Packages */}
          <div
            onClick={() => onNavigate('/temple-package/')}
            className="group cursor-pointer bg-[#FAF8F5] rounded-3xl p-6 border border-[#E7E0D5] hover:border-[#C5A880] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1C3829] text-[#DFCAA8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-luxury-serif text-xl font-bold text-[#1C3829] mb-2">
                Temple Packages
              </h3>
              <p className="text-xs text-[#68726B] leading-relaxed font-light mb-4">
                All-inclusive 3-night Angkor discoveries with private chauffeured tours, airport pickup, daily breakfast, and spa.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#1C3829] flex items-center space-x-1 group-hover:text-[#C5A880] transition-colors pt-2">
              <span>View Packages</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Le Vert Restaurant */}
          <div
            onClick={() => onNavigate('/dining/')}
            className="group cursor-pointer bg-[#FAF8F5] rounded-3xl p-6 border border-[#E7E0D5] hover:border-[#C5A880] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1C3829] text-[#DFCAA8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-luxury-serif text-xl font-bold text-[#1C3829] mb-2">
                Khmer & Western Dining
              </h3>
              <p className="text-xs text-[#68726B] leading-relaxed font-light mb-4">
                Taste authentic Cambodian Fish Amok, Lok Lak, and fresh sunset cocktails at our Rooftop Bar and Restaurant.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#1C3829] flex items-center space-x-1 group-hover:text-[#C5A880] transition-colors pt-2">
              <span>Explore Menus</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Khmer Spa */}
          <div
            onClick={() => onNavigate('/spa/')}
            className="group cursor-pointer bg-[#FAF8F5] rounded-3xl p-6 border border-[#E7E0D5] hover:border-[#C5A880] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1C3829] text-[#DFCAA8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-luxury-serif text-xl font-bold text-[#1C3829] mb-2">
                Herbal Spa Therapies
              </h3>
              <p className="text-xs text-[#68726B] leading-relaxed font-light mb-4">
                Relieve weary muscles with ancient Khmer acupressure, warm herbal compresses, and therapeutic oil rituals.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#1C3829] flex items-center space-x-1 group-hover:text-[#C5A880] transition-colors pt-2">
              <span>View Spa Menu</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Temple Tours */}
          <div
            onClick={() => onNavigate('/touring/')}
            className="group cursor-pointer bg-[#FAF8F5] rounded-3xl p-6 border border-[#E7E0D5] hover:border-[#C5A880] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1C3829] text-[#DFCAA8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-luxury-serif text-xl font-bold text-[#1C3829] mb-2">
                Angkor Temple Tours
              </h3>
              <p className="text-xs text-[#68726B] leading-relaxed font-light mb-4">
                Chauffeured Big Circuit and Small Circuit private tours with chilled towels, cold water, and temple expertise.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#1C3829] flex items-center space-x-1 group-hover:text-[#C5A880] transition-colors pt-2">
              <span>View Itineraries</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Signature Temple Package Spotlight */}
      <section className="py-16 bg-[#14281D] text-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#2D5540]/60 border border-[#C5A880]/30 text-[#DFCAA8] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Featured Package Offer</span>
              </div>
              <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#FAF8F5]">
                The All-Inclusive Temple Experience Package
              </h2>
              <p className="text-sm sm:text-base text-[#FAF8F5]/80 font-light leading-relaxed">
                Enjoy 3 nights in our signature Le Vert Suite, daily breakfast, private airport arrival pick-up, a private full-day Small Circuit temple expedition with chauffeured vehicle, and complimentary 60-minute relaxing Khmer massages for two.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#DFCAA8]">
                <span className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>3 Nights in Le Vert Suite</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>Private Chauffeur Tour</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>Complimentary Spa Session</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-end gap-4">
              <button
                onClick={() => onNavigate('/temple-package/')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A880] text-[#12241A] font-semibold text-xs uppercase tracking-widest hover:bg-[#DFCAA8] transition-all shadow-xl text-center"
              >
                View Package Details & Book
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Curated Temple Tours Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-2">
              Archaeological Wonders
            </span>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
              Curated Private Temple Expeditions
            </h2>
            <p className="text-sm text-[#68726B] font-light max-w-xl mt-2">
              Experience Angkor Wat, Bayon, and Ta Prohm in climate-controlled private comfort with experienced local drivers.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/touring/')}
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1C3829] hover:text-[#2D5540] group py-2"
          >
            <span>View All Tour Packages</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredTours.map((tour, i) => (
            <TourCard
              key={tour.slug}
              tour={tour}
              index={i}
              onViewDetails={(slug) => onNavigate('/our-tours/', slug)}
              onBookTour={() => onOpenBooking(`tour-${tour.slug}`)}
            />
          ))}
        </div>
      </section>

      {/* 7. Gallery Snapshot */}
      <section className="py-20 bg-[#F2EDE4]/60 border-t border-[#E7E0D5]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-2">
                Visual Impressions
              </span>
              <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
                Moments of Khmer Serenity
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/gallery/')}
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1C3829] hover:text-[#2D5540] group py-2"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {previewPhotos.map((photo, i) => (
              <div
                key={photo.id}
                onClick={() => onNavigate('/gallery/')}
                className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-sm"
              >
                <img
                  src={photo.url}
                  alt={photo.alt || photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Verified Accolades & Review Platforms Strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#E7E0D5] shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-2">
              Recognized Worldwide
            </span>
            <h3 className="font-luxury-serif text-2xl sm:text-3xl font-semibold text-[#1C3829]">
              Celebrated by Travelers Across the Globe
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center">
            {AWARDS_PLATFORMS.slice(0, 6).map((platform) => (
              <div
                key={platform.name}
                className="p-4 rounded-2xl bg-[#F2EDE4]/70 border border-[#E7E0D5]/80 hover:border-[#C5A880] transition-colors"
              >
                <div className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
                  {platform.ratingScore}
                  <span className="text-xs font-normal text-[#68726B]">
                    /{platform.maxScore}
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#1C3829] mt-1">
                  {platform.name}
                </div>
                <div className="text-[10px] text-[#68726B] truncate mt-0.5">
                  {platform.category}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('/awards/')}
              className="text-xs font-semibold text-[#1C3829] hover:underline uppercase tracking-wider"
            >
              View Full Awards & Verified Review Portals →
            </button>
          </div>
        </div>
      </section>

      {/* 9. Location & Interactive Contact Overview */}
      <section className="py-16 bg-[#14281D] text-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
                Prime Siem Reap Location
              </span>
              <h3 className="font-luxury-serif text-3xl sm:text-4xl font-semibold text-[#FAF8F5]">
                Quiet Village Calm, Steps from the Night Market
              </h3>
              <p className="text-sm text-[#FAF8F5]/80 font-light leading-relaxed">
                Stay just 150 meters away from the bustling Old Market, vibrant nightlife, artisan cafes, and the Siem Reap riverside, while sleeping peacefully in our quiet residential enclave.
              </p>

              <div className="pt-2 space-y-2 text-xs text-[#DFCAA8]">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span>{SITE_SETTINGS.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span>Concierge Desk: {SITE_SETTINGS.phone}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/contact-levertangkorhotel/')}
                  className="px-6 py-3 rounded-full bg-[#C5A880] text-[#12241A] text-xs font-semibold uppercase tracking-wider hover:bg-[#DFCAA8] transition-colors shadow-md"
                >
                  View Map & Transportation Details
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#2D5540] h-72 shadow-xl bg-black/40">
              <iframe
                title="Le Vert Angkor Hotel Location Map"
                src={SITE_SETTINGS.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
