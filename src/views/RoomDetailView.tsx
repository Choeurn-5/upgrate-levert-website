import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, BedDouble, Maximize2, Sparkles, Check, Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { Room, HeroConfig, AppRoute } from '../types';
import { Hero } from '../components/Hero';
import { RoomCard } from '../components/RoomCard';

interface RoomDetailViewProps {
  room: Room;
  allRooms: Room[];
  heroConfig: HeroConfig;
  onNavigate: (route: AppRoute, slug?: string) => void;
  onOpenBooking: (preferredRoom?: string) => void;
  onOpenHeroManager: () => void;
}

export const RoomDetailView: React.FC<RoomDetailViewProps> = ({
  room,
  allRooms,
  heroConfig,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(room.featuredImage);
  const otherRooms = allRooms.filter((r) => r.slug !== room.slug).slice(0, 3);

  return (
    <div>
      {/* 1. Replaceable Page Hero */}
      <Hero
        config={{
          ...heroConfig,
          title: room.title,
          subtitle: room.subtitle || room.shortDescription,
          badge: `From $${room.pricePerNight} / Night`,
        }}
        onPrimaryClick={() => onOpenBooking(room.slug)}
        primaryButtonText={`Reserve ${room.title}`}
        onSecondaryClick={() => onNavigate('/rooms/')}
        secondaryButtonText="View All Suites"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Room Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => onNavigate('/rooms/')}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#68726B] hover:text-[#1C3829] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Suites</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Photos & Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Main Interactive Photo Gallery */}
            <div className="space-y-4">
              <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden bg-stone-200 shadow-md border border-[#E7E0D5]">
                <img
                  src={selectedPhoto}
                  alt={room.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {room.hasBalcony && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#14281D]/80 backdrop-blur-md text-[#DFCAA8] text-xs font-medium border border-[#C5A880]/30">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Private Balcony Included</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {room.galleryImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {room.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPhoto(img)}
                      className={`relative w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        selectedPhoto === img
                          ? 'border-[#1C3829] ring-2 ring-[#C5A880]'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Specifications Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-[#F2EDE4] border border-[#E7E0D5]">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#68726B] block">
                  Capacity
                </span>
                <span className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                  {room.capacityGuests} Guests
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#68726B] block">
                  Room Dimensions
                </span>
                <span className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                  {room.sizeSqm} m²
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#68726B] block">
                  Bedding Configuration
                </span>
                <span className="font-luxury-serif text-lg font-bold text-[#1C3829] truncate block">
                  {room.bedType}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#68726B] block">
                  Outdoor View
                </span>
                <span className="font-luxury-serif text-lg font-bold text-[#1C3829] truncate block">
                  {room.viewType}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829]">
                About This Accommodation
              </h3>
              <p className="text-base text-[#4A554F] font-light leading-relaxed">
                {room.longDescription}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-6 pt-6 border-t border-[#E7E0D5]">
              <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
                Suite Amenities & Inclusions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {room.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 rounded-2xl bg-white border border-[#E7E0D5]/70 text-sm text-[#1C3829]"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#1C3829] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#2D5540]" />
                    </div>
                    <span className="font-light">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Reservation Widget */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7E0D5] shadow-xl space-y-6">
              <div className="border-b border-[#E7E0D5] pb-5">
                <span className="text-xs uppercase font-semibold text-[#68726B] tracking-wider block mb-1">
                  Nightly Boutique Rate
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="font-luxury-serif text-4xl font-bold text-[#1C3829]">
                    ${room.pricePerNight}
                  </span>
                  <span className="text-sm text-[#68726B] font-light">USD / night</span>
                </div>
                <p className="text-xs text-emerald-800 font-medium mt-1">
                  Taxes & gourmet breakfast included
                </p>
              </div>

              {/* Direct Booking Perks */}
              <div className="space-y-2.5 text-xs text-[#4A554F]">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>Free Airport Arrival Pick-up</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>Complimentary Daily Breakfast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>15% Off Khmer Spa Treatments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#C5A880]" />
                  <span>Priority Early Check-in (subject to availability)</span>
                </div>
              </div>

              {/* Booking Action */}
              <button
                onClick={() => onOpenBooking(room.slug)}
                className="w-full py-4 rounded-xl bg-[#1C3829] text-[#FAF8F5] font-semibold text-xs uppercase tracking-widest hover:bg-[#12241A] transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <span>Reserve This Suite</span>
              </button>

              <div className="pt-2 text-center">
                <span className="inline-flex items-center space-x-1 text-[11px] text-[#68726B]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Official Hotel Direct Reservation</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Suites */}
        {otherRooms.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#E7E0D5]">
            <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829] mb-8">
              Other Accommodations You May Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherRooms.map((r, i) => (
                <RoomCard
                  key={r.slug}
                  room={r}
                  index={i}
                  onViewDetails={(slug) => onNavigate('/our-room/', slug)}
                  onBookNow={(slug) => onOpenBooking(slug)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
