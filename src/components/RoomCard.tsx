import React from 'react';
import { motion } from 'motion/react';
import { Users, BedDouble, Maximize2, Sparkles, ArrowRight } from 'lucide-react';
import { Room } from '../types';
import { SITE_SETTINGS } from '../lib/site-settings';

interface RoomCardProps {
  room: Room;
  onViewDetails: (slug: string) => void;
  onBookNow: (slug: string) => void;
  index?: number;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onViewDetails,
  onBookNow,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E7E0D5] hover:border-[#C5A880]/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
    >
      {/* Image Container with Zoom */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-200">
        <img
          src={room.featuredImage}
          alt={room.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        {/* Balcony Badge */}
        {room.hasBalcony && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#14281D]/80 backdrop-blur-md text-[#DFCAA8] text-[11px] font-medium tracking-wide border border-[#C5A880]/30">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>Private Balcony</span>
            </span>
          </div>
        )}

      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Key Specifications Grid */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#68726B] mb-3 pb-3 border-b border-[#E7E0D5]/70">
            <span className="flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{room.capacityGuests} Guests</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{room.sizeSqm} m²</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1 truncate max-w-[150px]">
              <BedDouble className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="truncate">{room.bedType}</span>
            </span>
          </div>

          <h3 className="font-luxury-serif text-xl sm:text-2xl font-bold text-[#1C3829] group-hover:text-[#2D5540] transition-colors leading-snug mb-2">
            {room.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#555F59] line-clamp-2 leading-relaxed mb-6 font-light">
            {room.shortDescription}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 pt-4 border-t border-[#E7E0D5]/70">
          <button
            onClick={() => onViewDetails(room.slug)}
            className="flex-1 py-2.5 px-4 rounded-full border border-[#1C3829]/20 text-[#1C3829] hover:bg-[#1C3829] hover:text-[#FAF8F5] transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5"
          >
            <span>Explore Suite</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href={SITE_SETTINGS.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              onBookNow?.(room.slug);
            }}
            className="py-2.5 px-5 rounded-full bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] transition-all text-xs font-semibold uppercase tracking-wider shadow-sm inline-flex items-center justify-center cursor-pointer"
          >
            Book
          </a>
        </div>
      </div>
    </motion.div>
  );
};
