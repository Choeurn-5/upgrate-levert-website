import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ShieldCheck, BedDouble, Users, Coffee } from 'lucide-react';
import { Hero } from '../components/Hero';
import { RoomCard } from '../components/RoomCard';
import { Room, HeroConfig, AppRoute } from '../types';

interface RoomsViewProps {
  heroConfig: HeroConfig;
  rooms: Room[];
  onNavigate: (route: AppRoute, slug?: string) => void;
  onOpenBooking: (preferredRoom?: string) => void;
  onOpenHeroManager: () => void;
}

export const RoomsView: React.FC<RoomsViewProps> = ({
  heroConfig,
  rooms,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  const [filter, setFilter] = useState<'all' | 'suites' | 'family' | 'deluxe'>('all');

  const filteredRooms = rooms.filter((room) => {
    if (filter === 'suites') return room.slug.includes('suite');
    if (filter === 'family') return room.slug.includes('family');
    if (filter === 'deluxe') return room.slug.includes('deluxe');
    return true;
  });

  return (
    <div>
      {/* 1. Replaceable Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={() => onOpenBooking()}
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
              onBookNow={(slug) => onOpenBooking(slug)}
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
    </div>
  );
};
