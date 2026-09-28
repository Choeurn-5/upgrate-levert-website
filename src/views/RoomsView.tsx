import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  BedDouble,
  Users,
  Coffee,
  Maximize2,
  Camera,
  Shuffle,
  ArrowRight,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { RoomCard } from '../components/RoomCard';
import { LightboxModal } from '../components/LightboxModal';
import { Room, HeroConfig, AppRoute, GalleryPhoto } from '../types';
import { SITE_SETTINGS } from '../lib/site-settings';

interface RoomsViewProps {
  heroConfig: HeroConfig;
  rooms: Room[];
  onNavigate: (route: AppRoute, slug?: string) => void;
  onOpenBooking: (preferredRoom?: string) => void;
  onOpenHeroManager: () => void;
}

interface RoomPhotoItem {
  id: string;
  url: string;
  roomSlug: string;
  roomTitle: string;
  shortTitle: string;
  viewType?: string;
  caption: string;
}

const getShortRoomName = (title: string): string => {
  return title
    .replace(/\s+With Balcony City View/i, '')
    .replace(/\s+with Balcony City View/i, '')
    .replace(/\s+With Balcony/i, '')
    .replace(/\s+with Balcony/i, '')
    .trim();
};

const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const RoomsView: React.FC<RoomsViewProps> = ({
  heroConfig,
  rooms,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  // Accommodations Card Filter
  const [filter, setFilter] = useState<'all' | 'suites' | 'family' | 'deluxe'>('all');

  // Room Gallery Filter & State
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // 1. Hero Slides: Pick 1 random photo from each room, then shuffle
  const getRandomHeroSlides = useCallback((roomList: Room[]): string[] => {
    if (!roomList || roomList.length === 0) return [];
    const picks: string[] = [];

    roomList.forEach((room) => {
      const photos = Array.from(
        new Set([room.featuredImage, ...(room.galleryImages || [])].filter(Boolean))
      );
      if (photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * photos.length);
        picks.push(photos[randomIndex]);
      }
    });

    return shuffleArray(picks);
  }, []);

  const [heroSlides, setHeroSlides] = useState<string[]>(() => {
    // Initial deterministic render to prevent SSR hydration mismatch
    const initial = rooms.map((r) => r.featuredImage).filter(Boolean);
    return initial.length > 0 ? initial : (heroConfig.images || [heroConfig.imageUrl]);
  });

  useEffect(() => {
    if (rooms.length > 0) {
      const randomSlides = getRandomHeroSlides(rooms);
      if (randomSlides.length > 0) {
        setHeroSlides(randomSlides);
      }
    }
  }, [rooms, getRandomHeroSlides]);

  // 2. Room Gallery Photos Extraction
  const allRoomPhotos = useMemo<RoomPhotoItem[]>(() => {
    const items: RoomPhotoItem[] = [];
    rooms.forEach((room) => {
      const uniqueUrls = Array.from(
        new Set([room.featuredImage, ...(room.galleryImages || [])].filter(Boolean))
      );
      uniqueUrls.forEach((url, idx) => {
        items.push({
          id: `${room.slug}-${idx}-${url.slice(-20)}`,
          url,
          roomSlug: room.slug,
          roomTitle: room.title,
          shortTitle: getShortRoomName(room.title),
          viewType: room.viewType,
          caption: `${room.title} • ${room.viewType || 'Living Space'}`,
        });
      });
    });
    return items;
  }, [rooms]);

  // Shuffled state for "All Rooms" tab
  const [shuffledAllPhotos, setShuffledAllPhotos] = useState<RoomPhotoItem[]>(allRoomPhotos);

  useEffect(() => {
    if (allRoomPhotos.length > 0) {
      setShuffledAllPhotos(shuffleArray(allRoomPhotos));
    }
  }, [allRoomPhotos]);

  // Pagination State for All Image Tab
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Total items in All tab
  const totalAllPhotos = shuffledAllPhotos.length > 0 ? shuffledAllPhotos : allRoomPhotos;
  const totalPages = Math.ceil(totalAllPhotos.length / ITEMS_PER_PAGE);

  // Handle Gallery Filter changes (Randomizes when "All" is tapped)
  const handleSelectGalleryFilter = (targetSlug: string) => {
    setCurrentPage(1);
    if (targetSlug === 'all') {
      // Re-shuffle random photos when tapping All
      setShuffledAllPhotos(shuffleArray(allRoomPhotos));
    }
    setGalleryFilter(targetSlug);
  };

  const handleShuffleAll = () => {
    setShuffledAllPhotos(shuffleArray(allRoomPhotos));
    setCurrentPage(1);
    if (galleryFilter !== 'all') {
      setGalleryFilter('all');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const el = document.getElementById('room-gallery-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Resolved photos to display in Gallery grid
  const displayedPhotos = useMemo(() => {
    if (galleryFilter === 'all') {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      return totalAllPhotos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }
    return allRoomPhotos.filter((p) => p.roomSlug === galleryFilter);
  }, [galleryFilter, currentPage, totalAllPhotos, allRoomPhotos]);

  // Lightbox format (allows browsing through all photos)
  const lightboxPhotos = useMemo<GalleryPhoto[]>(() => {
    const sourcePhotos = galleryFilter === 'all' ? totalAllPhotos : allRoomPhotos.filter((p) => p.roomSlug === galleryFilter);
    return sourcePhotos.map((item, idx) => ({
      id: item.id || idx,
      url: item.url,
      title: item.roomTitle,
      category: 'rooms',
      alt: `${item.roomTitle} - Le Vert Angkor Hotel`,
    }));
  }, [galleryFilter, totalAllPhotos, allRoomPhotos]);

  const handleOpenPhoto = (pageItemIndex: number) => {
    if (galleryFilter === 'all') {
      const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + pageItemIndex;
      setLightboxIndex(globalIndex);
    } else {
      setLightboxIndex(pageItemIndex);
    }
  };

  // Filtered rooms for room cards
  const filteredRooms = rooms.filter((room) => {
    if (filter === 'suites') return room.slug.includes('suite');
    if (filter === 'family') return room.slug.includes('family');
    if (filter === 'deluxe') return room.slug.includes('deluxe');
    return true;
  });

  return (
    <div>
      {/* 1. Hero Slideshow with Random Photo from Each Room */}
      <Hero
        config={heroConfig}
        slides={heroSlides}
        onPrimaryClick={() => window.open(SITE_SETTINGS.bookingUrl, '_blank', 'noopener,noreferrer')}
        primaryButtonText="Check Room Availability"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Filter Bar & Rooms Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-1">
              Accommodations
            </span>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl font-semibold text-[#1C3829]">
              Six Thoughtfully Designed Suite Categories
            </h2>
            <p className="text-sm text-[#68726B] font-light mt-1">
              All accommodations feature a private open-air balcony and complimentary Wi-Fi.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#F2EDE4] border border-[#E7E0D5]">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-[#1C3829] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'text-[#4A554F] hover:text-[#1C3829]'
              }`}
            >
              All Rooms ({rooms.length})
            </button>
            <button
              onClick={() => setFilter('suites')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filter === 'suites'
                  ? 'bg-[#1C3829] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'text-[#4A554F] hover:text-[#1C3829]'
              }`}
            >
              Signature Suites
            </button>
            <button
              onClick={() => setFilter('family')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filter === 'family'
                  ? 'bg-[#1C3829] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'text-[#4A554F] hover:text-[#1C3829]'
              }`}
            >
              Family Units
            </button>
            <button
              onClick={() => setFilter('deluxe')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filter === 'deluxe'
                  ? 'bg-[#1C3829] text-[#FAF8F5] shadow-sm font-semibold'
                  : 'text-[#4A554F] hover:text-[#1C3829]'
              }`}
            >
              Deluxe Balcony
            </button>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, i) => (
            <RoomCard
              key={room.slug}
              room={room}
              index={i}
              onViewDetails={(slug) => onNavigate('/our-room/', slug)}
              onBookNow={() => window.open(SITE_SETTINGS.bookingUrl, '_blank', 'noopener,noreferrer')}
            />
          ))}
        </div>

        {/* Standard Inclusions Strip */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-[#F2EDE4] border border-[#E7E0D5]">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
              Included with Every Stay
            </span>
            <h3 className="font-luxury-serif text-2xl sm:text-3xl font-semibold text-[#1C3829]">
              Signature In-Suite Comforts
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7E0D5]/70">
              <Sparkles className="w-5 h-5 text-[#C5A880] mx-auto mb-2" />
              <div className="text-xs font-semibold text-[#1C3829]">Private Balcony</div>
              <div className="text-[10px] text-[#68726B] mt-0.5">Every single room</div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7E0D5]/70">
              <Coffee className="w-5 h-5 text-[#C5A880] mx-auto mb-2" />
              <div className="text-xs font-semibold text-[#1C3829]">Gourmet Breakfast</div>
              <div className="text-[10px] text-[#68726B] mt-0.5">Cooked to order</div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7E0D5]/70">
              <ShieldCheck className="w-5 h-5 text-[#C5A880] mx-auto mb-2" />
              <div className="text-xs font-semibold text-[#1C3829]">Airport Transfer</div>
              <div className="text-[10px] text-[#68726B] mt-0.5">Arrival on request</div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7E0D5]/70">
              <BedDouble className="w-5 h-5 text-[#C5A880] mx-auto mb-2" />
              <div className="text-xs font-semibold text-[#1C3829]">Daily Housekeeping</div>
              <div className="text-[10px] text-[#68726B] mt-0.5">Turndown service</div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7E0D5]/70">
              <Users className="w-5 h-5 text-[#C5A880] mx-auto mb-2" />
              <div className="text-xs font-semibold text-[#1C3829]">24h Concierge</div>
              <div className="text-[10px] text-[#68726B] mt-0.5">Temple tours & passes</div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E7E0D5]/70">
              <CheckCircle2 className="w-5 h-5 text-[#C5A880] mx-auto mb-2" />
              <div className="text-xs font-semibold text-[#1C3829]">High-Speed Wi-Fi</div>
              <div className="text-[10px] text-[#68726B] mt-0.5">Dedicated fiber line</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Room & Suite Visual Gallery Section */}
      <section className="py-20 sm:py-28 bg-[#F9F7F4] border-t border-[#E7E0D5]/80" id="room-gallery-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C3829]/5 border border-[#C5A880]/30 text-[#1C3829] text-xs font-semibold uppercase tracking-wider mb-3">
                <Camera className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Suite Photographic Gallery</span>
              </div>
              <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C3829] leading-tight">
                Explore Our Rooms & Living Spaces
              </h2>
              <p className="text-sm sm:text-base text-[#555F59] font-light mt-3 leading-relaxed">
                Take a visual tour through our boutique suites, private open-air balconies, and handcrafted teak interiors in Siem Reap.
              </p>
            </div>

            {/* Room Filter Pills & Shuffle Control */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#EAE4D9] border border-[#DDD5C7]">
                {/* All Rooms Button (Randomizes images on tap) */}
                <button
                  onClick={() => handleSelectGalleryFilter('all')}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center space-x-1.5 ${
                    galleryFilter === 'all'
                      ? 'bg-[#1C3829] text-[#FAF8F5] shadow-sm font-semibold'
                      : 'text-[#4A554F] hover:text-[#1C3829] hover:bg-white/40'
                  }`}
                  title="Randomize & show mixed photos from all rooms"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>All Rooms ({allRoomPhotos.length})</span>
                </button>

                {/* Filter for each Room Type */}
                {rooms.map((room) => {
                  const shortName = getShortRoomName(room.title);
                  const roomPhotoCount = allRoomPhotos.filter((p) => p.roomSlug === room.slug).length;
                  const isCurrent = galleryFilter === room.slug;

                  return (
                    <button
                      key={room.slug}
                      onClick={() => handleSelectGalleryFilter(room.slug)}
                      className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                        isCurrent
                          ? 'bg-[#1C3829] text-[#FAF8F5] shadow-sm font-semibold'
                          : 'text-[#4A554F] hover:text-[#1C3829] hover:bg-white/40'
                      }`}
                    >
                      {shortName} {roomPhotoCount > 0 && `(${roomPhotoCount})`}
                    </button>
                  );
                })}
              </div>

              {/* Shuffle Button for All Tap */}
              {galleryFilter === 'all' && (
                <button
                  onClick={handleShuffleAll}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#1C3829] border border-[#C5A880]/40 transition-all text-xs font-medium cursor-pointer shadow-sm active:scale-95"
                  title="Randomize photo order"
                >
                  <Shuffle className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Shuffle Photos</span>
                </button>
              )}
            </div>
          </div>

          {/* Photo Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {displayedPhotos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
                  onClick={() => handleOpenPhoto(i)}
                  className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer bg-stone-200 border border-[#E7E0D5] hover:border-[#C5A880]/70 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end"
                >
                  <img
                    src={photo.url}
                    alt={`${photo.roomTitle} - Le Vert Angkor Hotel`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Room Tag Badge in Top Left */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#14281D]/80 backdrop-blur-md text-[#DFCAA8] text-[11px] font-medium tracking-wide border border-[#C5A880]/30 shadow-md">
                      <BedDouble className="w-3 h-3 text-[#C5A880]" />
                      <span>{photo.shortTitle}</span>
                    </span>
                  </div>

                  {/* Zoom indicator button in Top Right */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/25 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4 text-[#DFCAA8]" />
                    </div>
                  </div>

                  {/* Bottom Luxury Overlay */}
                  <div className="relative z-10 p-6 bg-gradient-to-t from-black/90 via-black/45 to-transparent translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-white">
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
                        {photo.viewType || 'Boutique Living'}
                      </span>
                      <h4 className="font-luxury-serif text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-sm mb-3">
                        {photo.roomTitle}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center space-x-1.5 text-xs text-[#DFCAA8] font-medium">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Enlarge Photo</span>
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('/our-room/', photo.roomSlug);
                          }}
                          className="inline-flex items-center space-x-1 text-xs font-semibold text-white/90 hover:text-white transition-colors py-1 px-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <a
                          href={SITE_SETTINGS.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center space-x-1 text-xs font-semibold text-[#12241A] bg-[#C5A880] hover:bg-[#DFCAA8] transition-colors py-1 px-3 rounded-full shadow-sm"
                        >
                          <span>Book</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls for All Image Tab */}
          {galleryFilter === 'all' && totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#E7E0D5]/70">
              <div className="text-xs text-[#68726B] font-light">
                Showing{' '}
                <span className="font-semibold text-[#1C3829]">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{' '}
                –{' '}
                <span className="font-semibold text-[#1C3829]">
                  {Math.min(currentPage * ITEMS_PER_PAGE, totalAllPhotos.length)}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-[#1C3829]">
                  {totalAllPhotos.length}
                </span>{' '}
                photographs
              </div>

              {/* Page Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous gallery page"
                  className="p-2 sm:px-3 sm:py-2 rounded-full border border-[#E7E0D5] bg-[#FAF8F5] text-[#1C3829] hover:bg-[#EAE4D9] disabled:opacity-35 disabled:cursor-not-allowed transition-all flex items-center space-x-1 text-xs font-medium cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                <div className="flex items-center space-x-1.5">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                    const isCurrent = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        aria-label={`Go to page ${pageNum}`}
                        className={`w-9 h-9 rounded-full text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
                          isCurrent
                            ? 'bg-[#1C3829] text-[#FAF8F5] shadow-md scale-105'
                            : 'bg-[#FAF8F5] text-[#4A554F] border border-[#E7E0D5] hover:bg-[#EAE4D9] hover:text-[#1C3829]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next gallery page"
                  className="p-2 sm:px-3 sm:py-2 rounded-full border border-[#E7E0D5] bg-[#FAF8F5] text-[#1C3829] hover:bg-[#EAE4D9] disabled:opacity-35 disabled:cursor-not-allowed transition-all flex items-center space-x-1 text-xs font-medium cursor-pointer shadow-sm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Direct Booking Callout */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#1C3829] text-[#FAF8F5] border border-[#C5A880]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
                Direct Reservation Privilege
              </span>
              <h3 className="font-luxury-serif text-2xl sm:text-3xl font-semibold">
                Found Your Ideal Room or Suite?
              </h3>
              <p className="text-sm text-[#DFCAA8]/80 font-light mt-1 max-w-xl">
                Reserve directly with Le Vert Angkor Hotel for guaranteed best rates, complimentary welcome beverage, and personalized airport pickup service.
              </p>
            </div>
            <a
              href={SITE_SETTINGS.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#DFCAA8] text-[#12241A] font-semibold text-xs uppercase tracking-widest shadow-lg transition-all duration-300 active:scale-95 whitespace-nowrap cursor-pointer inline-flex items-center justify-center text-center"
            >
              Book This Experience
            </a>
          </div>
        </div>
      </section>

      {/* 4. Lightbox Modal */}
      <LightboxModal
        photos={lightboxPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % lightboxPhotos.length);
          }
        }}
        onPrev={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex(
              (lightboxIndex - 1 + lightboxPhotos.length) % lightboxPhotos.length
            );
          }
        }}
      />
    </div>
  );
};

