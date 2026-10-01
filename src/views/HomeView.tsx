import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Award, ArrowRight, ShieldCheck, Utensils, Compass, Heart, Check, Clock, Phone, ChevronRight, ChevronLeft, Wine, Coffee, Star } from 'lucide-react';
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
  const [activeAboutIndex, setActiveAboutIndex] = useState(0);
  const [activeDiningIndex, setActiveDiningIndex] = useState(0);
  const featuredTours = tours.slice(0, 2);
  const previewPhotos = GALLERY_PHOTOS.slice(0, 6);

  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      const firstChild = carouselRef.current.children[0] as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 24 : 400;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      const firstChild = carouselRef.current.children[0] as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 24 : 400;
      carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const DINING_GALLERY = [
    {
      id: 'khmer-cuisine',
      src: '/images/Home/home-dining-image/0D9A2325.jpg',
      alt: 'Signature Authentic Khmer Gastronomy at Le Vert Angkor',
    },
    {
      id: 'restaurant-hall',
      src: '/images/Home/home-dining-image/0D9A3873.jpg',
      alt: 'Le Vert Restaurant Dining Hall & Buffet at Le Vert Angkor',
    },
    {
      id: 'breakfast-table',
      src: '/images/Home/home-dining-image/IMG_8302.jpg',
      alt: 'Artisan Fresh Kampot Pepper Seafood at Le Vert Angkor',
    },
    {
      id: 'lounge-bar',
      src: '/images/Home/home-dining-image/0D9A2379.jpg',
      alt: 'Le Vert Lounge Bar & Dining Counter at Le Vert Angkor',
    },
  ];

  const otherDiningIndices = [0, 1, 2, 3].filter((i) => i !== activeDiningIndex);
  const secondaryDining1 = otherDiningIndices[0];
  const secondaryDining2 = otherDiningIndices[1];
  const secondaryDining3 = otherDiningIndices[2];

  const ABOUT_GALLERY = [
    {
      id: 'building',
      title: 'Boutique Architecture',
      subtitle: 'Steung Thmey Sanctuary',
      src: '/images/Home/home-about-image/building-view.png',
      alt: 'Le Vert Angkor Hotel - Exterior Architecture',
    },
    {
      id: 'room-deluxe',
      title: 'Deluxe Balcony Suite',
      subtitle: 'Artisan Khmer Comfort',
      src: '/images/Home/home-about-image/room.jpg',
      alt: 'Le Vert Angkor Hotel - Deluxe Balcony Suite',
    },
    {
      id: 'room-executive',
      title: 'Executive King Living',
      subtitle: 'Serene Sanctuary Style',
      src: '/images/Home/home-about-image/room1.jpg',
      alt: 'Le Vert Angkor Hotel - Executive King Room',
    },
  ];

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
              <span>Hotel Sanctuary • Siem Reap</span>
            </div>

            <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829] leading-[1.15]">
              Understated Luxury, Steps from Phsar Chas and Minutes from Angkor
            </h2>

            <p className="text-base text-[#4A554F] font-light leading-relaxed">
              Nestled quietly in Steung Thmei Village just minutes from the Old Market and Angkor Wat, <strong>Le Vert Angkor Hotel</strong> was founded on a simple yet profound vision: to blend authentic Khmer hospitality, genuine warmth, and passionate family leadership into an unforgettable boutique stay.
            </p>

            <p className="text-base text-[#4A554F] font-light leading-relaxed">
              Founded by our owner, <strong>Ek Darin</strong>, and led day-to-day by his son, Operations Manager <strong>Rin Kongvin</strong>, our father-and-son leadership brings a unique balance of Cambodian heritage and modern hospitality standards. Whether you are relaxing on your private balcony, enjoying sunset city vistas from our rooftop pool, or setting out for Angkor Wat, every guest is personally welcomed as part of our extended family.
            </p>

            {/* Micro Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#F2EDE4] border border-[#E7E0D5]">
                <div className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
                  5 mins
                </div>
                <div className="text-xs text-[#68726B] font-medium mt-0.5">
                  Walk to Old Market & Pub Street
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F2EDE4] border border-[#E7E0D5]">
                <div className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
                  15 mins
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

          {/* Visual Composition: Multi-layer Architectural & Room Collage */}
          <div className="lg:col-span-6 relative pt-4 sm:pt-6 pb-12 sm:pb-8">
            {/* Ambient Background Warmth */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#C5A880]/15 via-stone-200/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

            {/* Main Featured Showcase Frame */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-[#E7E0D5] bg-[#1C3829]/5 group">
              <motion.div
                key={activeAboutIndex}
                initial={{ opacity: 0.7, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative h-[480px] sm:h-[560px] lg:h-[620px] w-full overflow-hidden flex items-center justify-center bg-stone-900/10"
              >
                {/* Ambient soft glow backdrop for building view so the full frame is richly filled */}
                {activeAboutIndex === 0 && (
                  <img
                    src={ABOUT_GALLERY[0].src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover filter blur-3xl opacity-35 scale-110 pointer-events-none"
                  />
                )}

                <img
                  src={ABOUT_GALLERY[activeAboutIndex].src}
                  alt={ABOUT_GALLERY[activeAboutIndex].alt}
                  className={`relative z-[1] w-full h-full ${activeAboutIndex === 0
                    ? 'object-contain object-center p-1 sm:p-2'
                    : 'object-cover object-center'
                    } group-hover:scale-[1.02] transition-transform duration-700 ease-out`}
                />

                {/* Subtle bottom shadow gradient to elevate the label */}
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Perspective Tag on Main Image */}
                <div className="absolute bottom-5 left-5 right-5 z-[3] flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-[#FAF8F5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                    <span className="text-xs font-semibold tracking-wider font-serif">
                      {ABOUT_GALLERY[activeAboutIndex].title}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-[11px] text-[#DFCAA8] font-light hidden sm:inline">
                      {ABOUT_GALLERY[activeAboutIndex].subtitle}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* View perspective selector pills at top */}
              <div className="absolute top-4 left-4 z-20 flex items-center space-x-1.5 bg-black/45 backdrop-blur-md p-1 rounded-full border border-white/20">
                {ABOUT_GALLERY.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveAboutIndex(idx)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wider transition-all cursor-pointer ${activeAboutIndex === idx
                      ? 'bg-[#C5A880] text-[#12241A] font-semibold shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {idx === 0 ? 'Building' : `Room ${idx}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Secondary Room Card 1 (Bottom Right) */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
              onClick={() => setActiveAboutIndex(activeAboutIndex === 1 ? 0 : 1)}
              className="absolute -bottom-3 sm:-bottom-5 -right-1 sm:-right-6 lg:-right-8 z-20 w-36 sm:w-48 h-28 sm:h-36 rounded-2xl overflow-hidden shadow-2xl border-3 border-[#FAF8F5] cursor-pointer group hover:scale-105 transition-transform duration-300 bg-stone-100"
              title="Click to spotlight this room view"
            >
              <img
                src={ABOUT_GALLERY[1].src}
                alt={ABOUT_GALLERY[1].alt}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white font-medium">
                <span className="truncate">Deluxe Suite</span>
                <span className="text-[#C5A880] font-bold text-[9px] uppercase tracking-wider">
                  {activeAboutIndex === 1 ? 'Active' : 'Tap'}
                </span>
              </div>
            </motion.div>

            {/* Floating Secondary Room Card 2 (Top Right) */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 6.2, ease: 'easeInOut', delay: 1 }}
              onClick={() => setActiveAboutIndex(activeAboutIndex === 2 ? 0 : 2)}
              className="absolute -top-2 sm:-top-4 -right-1 sm:-right-6 lg:-right-8 z-20 w-32 sm:w-44 h-24 sm:h-32 rounded-2xl overflow-hidden shadow-2xl border-3 border-[#FAF8F5] cursor-pointer group hover:scale-105 transition-transform duration-300 bg-stone-100"
              title="Click to spotlight this room view"
            >
              <img
                src={ABOUT_GALLERY[2].src}
                alt={ABOUT_GALLERY[2].alt}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white font-medium">
                <span className="truncate">Executive King</span>
                <span className="text-[#C5A880] font-bold text-[9px] uppercase tracking-wider">
                  {activeAboutIndex === 2 ? 'Active' : 'Tap'}
                </span>
              </div>
            </motion.div>

            {/* Overlapping TripAdvisor Award Badge (Bottom Left) */}
            <div className="absolute -bottom-8 -left-2 sm:-left-6 z-30 max-w-[260px] sm:max-w-xs bg-[#FAF8F5]/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#E7E0D5]">
              <div className="flex items-center space-x-3">
                <img
                  src="https://www.cms.levertangkorhotel.com/wp-content/uploads/2026/04/Digital-Award_TRA-2026.png"
                  alt="Tripadvisor award"
                  className="w-11 h-11 object-contain shrink-0"
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

          <div className="relative w-full overflow-hidden pb-8 -mx-4 px-4 sm:-mx-8 sm:px-8 group/carousel">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#FDFBF8] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#FDFBF8] to-transparent z-10 pointer-events-none" />

            {/* Navigation Arrows */}
            <button
              onClick={handleScrollLeft}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-[60%] z-20 w-10 h-10 rounded-full bg-white/95 shadow-[0_4px_15px_rgba(28,56,41,0.15)] border border-[#EDE8E0] flex items-center justify-center text-[#1C3829] hover:bg-[#F4EFE6] transition-all opacity-0 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous room"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleScrollRight}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-[60%] z-20 w-10 h-10 rounded-full bg-white/95 shadow-[0_4px_15px_rgba(28,56,41,0.15)] border border-[#EDE8E0] flex items-center justify-center text-[#1C3829] hover:bg-[#F4EFE6] transition-all opacity-0 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next room"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div 
              ref={carouselRef}
              className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 pt-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {rooms.map((room, i) => (
                <div key={`${room.slug}-${i}`} className="w-[85vw] sm:w-[360px] md:w-[400px] shrink-0 snap-center group/card-wrapper">
                  <RoomCard
                    room={room}
                    index={i}
                    onViewDetails={(slug) => onNavigate('/our-room/', slug)}
                    onBookNow={(slug) => onOpenBooking(slug)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. Gastronomy & Sunset Lounge Showcase */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E7E0D5]/70">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1C3829]/10 text-[#1C3829] text-xs font-semibold tracking-widest uppercase">
              <Utensils className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Gastronomy & Sunset Lounge</span>
            </div>

            <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829] leading-[1.15]">
              Authentic Khmer Flavors & Rooftop Vistas
            </h2>

            <p className="text-base text-[#4A554F] font-light leading-relaxed">
              Indulge your senses with the vibrant flavors of Cambodian gastronomy at Le Vert Angkor. Sourcing freshly ground Kampot peppercorns, fragrant lemongrass, and peak-season produce from local Siem Reap growers, our culinary team transforms authentic recipes into refined culinary experiences.
            </p>

            <p className="text-base text-[#4A554F] font-light leading-relaxed">
              Begin each morning with an artisan breakfast buffet featuring fresh tropical fruits, warm pastries, and comforting Cambodian noodle soups. In the evening, ascend to our rooftop lounge for handcrafted signature cocktails, chilled wines, and tapas as the golden sunset bathes the city.
            </p>

            {/* Micro Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#F2EDE4] border border-[#E7E0D5]">
                <div className="font-luxury-serif text-lg sm:text-xl font-bold text-[#1C3829]">
                  6:30 – 10:00 AM
                </div>
                <div className="text-xs text-[#68726B] font-medium mt-0.5">
                  Artisan Breakfast Buffet
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F2EDE4] border border-[#E7E0D5]">
                <div className="font-luxury-serif text-lg sm:text-xl font-bold text-[#1C3829]">
                  Sunset Hours
                </div>
                <div className="text-xs text-[#68726B] font-medium mt-0.5">
                  Rooftop Cocktails & Wine
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F2EDE4] border border-[#E7E0D5] col-span-2 sm:col-span-1">
                <div className="font-luxury-serif text-lg sm:text-xl font-bold text-[#1C3829]">
                  All-Day
                </div>
                <div className="text-xs text-[#68726B] font-medium mt-0.5">
                  Khmer & Western Dining
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/dining/')}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-[#1C3829] hover:text-[#2D5540] group underline underline-offset-8 cursor-pointer"
              >
                <span>Explore Menus & Dining Details</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Visual Composition: Multi-layer Dining Collage (Pure Photography, No Text on Images) */}
          <div className="lg:col-span-6 relative pt-4 sm:pt-6 pb-12 sm:pb-8">
            {/* Ambient Background Warmth */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#C5A880]/15 via-stone-200/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

            {/* Main Featured Showcase Frame */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-[#E7E0D5] bg-[#1C3829]/5 group">
              <motion.div
                key={activeDiningIndex}
                initial={{ opacity: 0.7, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative h-[440px] sm:h-[500px] lg:h-[540px] w-full overflow-hidden flex items-center justify-center bg-stone-900/10"
              >
                <img
                  src={DINING_GALLERY[activeDiningIndex].src}
                  alt={DINING_GALLERY[activeDiningIndex].alt}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>

            {/* Floating Secondary Image Card 1 (Bottom Right) */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
              onClick={() => setActiveDiningIndex(secondaryDining1)}
              className="absolute -bottom-3 sm:-bottom-5 -right-1 sm:-right-6 lg:-right-8 z-20 w-36 sm:w-48 h-28 sm:h-36 rounded-2xl overflow-hidden shadow-2xl border-3 border-[#FAF8F5] cursor-pointer group hover:scale-105 transition-transform duration-300 bg-stone-100"
              title="Click to spotlight this view"
            >
              <img
                src={DINING_GALLERY[secondaryDining1].src}
                alt={DINING_GALLERY[secondaryDining1].alt}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>

            {/* Floating Secondary Image Card 2 (Top Right) */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 6.2, ease: 'easeInOut', delay: 1 }}
              onClick={() => setActiveDiningIndex(secondaryDining2)}
              className="absolute -top-2 sm:-top-4 -right-1 sm:-right-6 lg:-right-8 z-20 w-32 sm:w-44 h-24 sm:h-32 rounded-2xl overflow-hidden shadow-2xl border-3 border-[#FAF8F5] cursor-pointer group hover:scale-105 transition-transform duration-300 bg-stone-100"
              title="Click to spotlight this view"
            >
              <img
                src={DINING_GALLERY[secondaryDining2].src}
                alt={DINING_GALLERY[secondaryDining2].alt}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>

            {/* Floating Secondary Image Card 3 (Bottom Left) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut', delay: 0.5 }}
              onClick={() => setActiveDiningIndex(secondaryDining3)}
              className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 lg:-left-8 z-20 w-36 sm:w-48 h-28 sm:h-36 rounded-2xl overflow-hidden shadow-2xl border-3 border-[#FAF8F5] cursor-pointer group hover:scale-105 transition-transform duration-300 bg-stone-100"
              title="Click to spotlight this view"
            >
              <img
                src={DINING_GALLERY[secondaryDining3].src}
                alt={DINING_GALLERY[secondaryDining3].alt}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>

            {/* Photo Selector Dots (Clean & unobtrusive, outside the image) */}
            <div className="flex items-center justify-center space-x-2 pt-5">
              {DINING_GALLERY.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDiningIndex(idx)}
                  aria-label={`View photo ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeDiningIndex === idx ? 'w-8 bg-[#1C3829]' : 'w-2 bg-[#E7E0D5] hover:bg-[#C5A880]'
                    }`}
                />
              ))}
            </div>
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
          {/* Card 1: Rooftop Pool & Facilities */}
          <div
            onClick={() => onNavigate('/facilities-levertangkorhotel/')}
            className="group cursor-pointer bg-[#FAF8F5] rounded-3xl p-6 border border-[#E7E0D5] hover:border-[#C5A880] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1C3829] text-[#DFCAA8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-luxury-serif text-xl font-bold text-[#1C3829] mb-2">
                Rooftop Pool & Serenity
              </h3>
              <p className="text-xs text-[#68726B] leading-relaxed font-light mb-4">
                Unwind in our outdoor saltwater swimming pool and sun loungers overlooking Siem Reap after a day of temple exploration.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#1C3829] flex items-center space-x-1 group-hover:text-[#C5A880] transition-colors pt-2">
              <span>Explore Facilities</span>
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

      {/* 4.5. Meet Our Leadership Team & Boutique Philosophy (From Family Story) */}
      <section className="py-20 bg-[#F2EDE4]/80 border-y border-[#E7E0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-2">
              Heartfelt Khmer Hospitality
            </span>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
              Service Driven by Heart: Meet Our Leadership Team
            </h2>
            <p className="text-sm sm:text-base text-[#4A554F] font-light mt-3 leading-relaxed">
              Under the passionate guidance of owner <strong>Ek Darin</strong> and Operations Manager <strong>Rin Kongvin</strong>, every detail of your stay is looked after by dedicated leaders who care deeply about your comfort.
            </p>
          </div>

          {/* Leadership Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Deepool */}
            <div className="relative bg-gradient-to-b from-white via-[#FCFAF7] to-[#F7F2E9] rounded-3xl p-7 border border-[#E4DDD3] hover:border-[#C5A880] shadow-[0_4px_25px_-5px_rgba(28,56,41,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(28,56,41,0.15)] -translate-y-0 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#DFCAA8]/15 blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase bg-[#1C3829]/5 text-[#1C3829] border border-[#1C3829]/10 mb-6 group-hover:bg-[#1C3829] group-hover:text-[#DFCAA8] transition-colors duration-300">
                <Compass className="w-3 h-3 text-[#C5A880]" />
                <span>Front Office</span>
              </span>

              {/* Medallion Portrait */}
              <div className="relative mb-5">
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#C5A880] via-[#DFCAA8] to-[#1C3829]/40 shadow-md group-hover:shadow-[0_15px_35px_rgba(197,168,128,0.45)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-2">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white ring-2 ring-white/90 shadow-inner">
                    <img
                      src="/images/staff-image/deepool-front-office-manager.jpg"
                      alt="Deepool - Front Office Manager"
                      className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-125 group-hover:rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#1C3829] border-2 border-white text-[#DFCAA8] flex items-center justify-center shadow-md">
                  <Compass className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829] tracking-tight group-hover:text-[#2D5540] transition-colors">
                Deepool
              </h3>
              <span className="text-[11px] font-semibold text-[#A8824B] uppercase tracking-[0.14em] mt-1">
                Front Office Manager
              </span>

              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C5A880] to-transparent my-3.5" />

              <p className="text-xs text-[#555F59] font-light leading-relaxed flex-1">
                Leads our front-desk team with attentive warmth, curating private temple itineraries, chauffeured transfers, and round-the-clock personalized guest care.
              </p>

              <div className="mt-5 pt-3.5 border-t border-[#E7E0D5]/70 w-full flex items-center justify-between text-[11px] text-[#8C7654]">
                <span className="font-medium tracking-wide">Family Leadership</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span className="italic font-light">Le Vert Angkor</span>
              </div>
            </div>

            {/* Sotheara */}
            <div className="relative bg-gradient-to-b from-white via-[#FCFAF7] to-[#F7F2E9] rounded-3xl p-7 border border-[#E4DDD3] hover:border-[#C5A880] shadow-[0_4px_25px_-5px_rgba(28,56,41,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(28,56,41,0.15)] -translate-y-0 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#DFCAA8]/15 blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase bg-[#1C3829]/5 text-[#1C3829] border border-[#1C3829]/10 mb-6 group-hover:bg-[#1C3829] group-hover:text-[#DFCAA8] transition-colors duration-300">
                <Heart className="w-3 h-3 text-[#C5A880]" />
                <span>Guest Relations</span>
              </span>

              {/* Medallion Portrait */}
              <div className="relative mb-5">
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#C5A880] via-[#DFCAA8] to-[#1C3829]/40 shadow-md group-hover:shadow-[0_15px_35px_rgba(197,168,128,0.45)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-2">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white ring-2 ring-white/90 shadow-inner">
                    <img
                      src="/images/staff-image/sotheara-front-office-supervisor.jpg"
                      alt="Sotheara - Front Office Supervisor"
                      className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-125 group-hover:rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#1C3829] border-2 border-white text-[#DFCAA8] flex items-center justify-center shadow-md">
                  <Heart className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829] tracking-tight group-hover:text-[#2D5540] transition-colors">
                Sotheara
              </h3>
              <span className="text-[11px] font-semibold text-[#A8824B] uppercase tracking-[0.14em] mt-1">
                Front Office Supervisor
              </span>

              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C5A880] to-transparent my-3.5" />

              <p className="text-xs text-[#555F59] font-light leading-relaxed flex-1">
                A gracious, welcoming presence in our lobby ensuring seamless arrivals, effortless departures, and sharing insider secrets on local Siem Reap culture.
              </p>

              <div className="mt-5 pt-3.5 border-t border-[#E7E0D5]/70 w-full flex items-center justify-between text-[11px] text-[#8C7654]">
                <span className="font-medium tracking-wide">Family Leadership</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span className="italic font-light">Le Vert Angkor</span>
              </div>
            </div>

            {/* Veasna */}
            <div className="relative bg-gradient-to-b from-white via-[#FCFAF7] to-[#F7F2E9] rounded-3xl p-7 border border-[#E4DDD3] hover:border-[#C5A880] shadow-[0_4px_25px_-5px_rgba(28,56,41,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(28,56,41,0.15)] -translate-y-0 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#DFCAA8]/15 blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase bg-[#1C3829]/5 text-[#1C3829] border border-[#1C3829]/10 mb-6 group-hover:bg-[#1C3829] group-hover:text-[#DFCAA8] transition-colors duration-300">
                <Wine className="w-3 h-3 text-[#C5A880]" />
                <span>Food &amp; Beverage</span>
              </span>

              {/* Medallion Portrait */}
              <div className="relative mb-5">
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#C5A880] via-[#DFCAA8] to-[#1C3829]/40 shadow-md group-hover:shadow-[0_15px_35px_rgba(197,168,128,0.45)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-2">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white ring-2 ring-white/90 shadow-inner">
                    <img
                      src="/images/staff-image/veasna-restaurant-supervisor.jpg"
                      alt="Veasna - Restaurant & Rooftop Sky Bar Supervisor"
                      className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-125 group-hover:rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#1C3829] border-2 border-white text-[#DFCAA8] flex items-center justify-center shadow-md">
                  <Wine className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829] tracking-tight group-hover:text-[#2D5540] transition-colors">
                Veasna
              </h3>
              <span className="text-[11px] font-semibold text-[#A8824B] uppercase tracking-[0.14em] mt-1">
                Restaurant &amp; Sky Bar Supervisor
              </span>

              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C5A880] to-transparent my-3.5" />

              <p className="text-xs text-[#555F59] font-light leading-relaxed flex-1">
                Oversees our ground-floor restaurant and open-air Rooftop Sky Bar, curating peaceful poolside breakfasts and sunset cocktail hours with attentive care.
              </p>

              <div className="mt-5 pt-3.5 border-t border-[#E7E0D5]/70 w-full flex items-center justify-between text-[11px] text-[#8C7654]">
                <span className="font-medium tracking-wide">Family Leadership</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span className="italic font-light">Le Vert Angkor</span>
              </div>
            </div>

            {/* Sous Chef Chansy */}
            <div className="relative bg-gradient-to-b from-white via-[#FCFAF7] to-[#F7F2E9] rounded-3xl p-7 border border-[#E4DDD3] hover:border-[#C5A880] shadow-[0_4px_25px_-5px_rgba(28,56,41,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(28,56,41,0.15)] -translate-y-0 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#DFCAA8]/15 blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase bg-[#1C3829]/5 text-[#1C3829] border border-[#1C3829]/10 mb-6 group-hover:bg-[#1C3829] group-hover:text-[#DFCAA8] transition-colors duration-300">
                <Utensils className="w-3 h-3 text-[#C5A880]" />
                <span>Culinary Arts</span>
              </span>

              {/* Medallion Portrait */}
              <div className="relative mb-5">
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#C5A880] via-[#DFCAA8] to-[#1C3829]/40 shadow-md group-hover:shadow-[0_15px_35px_rgba(197,168,128,0.45)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-2">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white ring-2 ring-white/90 shadow-inner">
                    <img
                      src="/images/staff-image/chansy-sous-chef-avatar.jpg"
                      alt="Sous Chef Chansy - Culinary Artistry"
                      className="w-full h-full object-cover filter contrast-[1.02] group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#1C3829] border-2 border-white text-[#DFCAA8] flex items-center justify-center shadow-md">
                  <Utensils className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829] tracking-tight group-hover:text-[#2D5540] transition-colors">
                Sous Chef Chansy
              </h3>
              <span className="text-[11px] font-semibold text-[#A8824B] uppercase tracking-[0.14em] mt-1">
                Culinary Excellence
              </span>

              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C5A880] to-transparent my-3.5" />

              <p className="text-xs text-[#555F59] font-light leading-relaxed flex-1">
                Behind every authentic dining experience, masterfully preparing traditional Cambodian classics like Fish Amok and Lok Lak with fresh local market ingredients.
              </p>

              <div className="mt-5 pt-3.5 border-t border-[#E7E0D5]/70 w-full flex items-center justify-between text-[11px] text-[#8C7654]">
                <span className="font-medium tracking-wide">Family Leadership</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                <span className="italic font-light">Le Vert Angkor</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Boutique Hospitality */}
          <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-10 border border-[#E7E0D5]">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-1">
                Our Core Philosophy
              </span>
              <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829]">
                What Boutique Hospitality Means to Us
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-2xl bg-white border border-[#E7E0D5]">
                <div className="text-xs font-bold text-[#1C3829] uppercase tracking-wider mb-1">
                  1. Authentic Khmer Warmth
                </div>
                <p className="text-xs text-[#68726B] font-light leading-relaxed">
                  We take pride in sharing local Cambodian culture, flavors, and genuine hospitality with travelers from across the globe.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E7E0D5]">
                <div className="text-xs font-bold text-[#1C3829] uppercase tracking-wider mb-1">
                  2. Personalized Service
                </div>
                <p className="text-xs text-[#68726B] font-light leading-relaxed">
                  You are never just a room number to us. We tailor our recommendations and service to your specific preferences.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E7E0D5]">
                <div className="text-xs font-bold text-[#1C3829] uppercase tracking-wider mb-1">
                  3. A Peaceful Sanctuary
                </div>
                <p className="text-xs text-[#68726B] font-light leading-relaxed">
                  Nestled quietly in Steung Thmei Village, complete with a refreshing rooftop pool, lush garden vibes, and cozy balconies.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E7E0D5]">
                <div className="text-xs font-bold text-[#1C3829] uppercase tracking-wider mb-1">
                  4. Community &amp; Care
                </div>
                <p className="text-xs text-[#68726B] font-light leading-relaxed">
                  We operate as a close family unit, supporting one another to ensure our guests enjoy an authentic and uplifting stay.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => onNavigate('/blog/', 'welcoming-you-to-our-family-heartfelt-hospitality-le-vert-angkor-hotel')}
                className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#1C3829] hover:text-[#C5A880] transition-colors"
              >
                <span>Read Full Story: Welcoming You to Our Family</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Curated Temple Tours Preview */}
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
                Stay just 5 minutes away from the bustling Old Market, vibrant nightlife, artisan cafes, and the Siem Reap riverside, while sleeping peacefully in our quiet residential enclave.
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
