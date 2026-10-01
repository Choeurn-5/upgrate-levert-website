import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Car, Compass, ArrowRight, Check, X, Lightbulb, ChevronDown, Star, MapPin } from 'lucide-react';
import { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
  onViewDetails: (slug: string) => void;
  onBookTour: (slug: string) => void;
  index?: number;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onViewDetails, onBookTour, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#EDE8E0] hover:border-[#C5A880]/70 transition-all duration-500 shadow-[0_4px_24px_-4px_rgba(28,56,41,0.07)] hover:shadow-[0_24px_60px_-12px_rgba(28,56,41,0.18)] flex flex-col"
    >
      {/* Gold accent top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />

      {/* Image Banner */}
      <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-100 shrink-0">
        <img
          src={tour.featuredImage}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A10]/80 via-[#0A1A10]/20 to-transparent" />

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-[#C5A880]/20 blur-xl rounded-full" />
            <div className="relative px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8E0D4] shadow-lg">
              <span className="text-[9px] uppercase font-bold tracking-[0.15em] text-[#8A7A64] block -mb-0.5">Private Tour</span>
              <div className="flex items-baseline space-x-0.5">
                <span className="font-luxury-serif text-2xl font-bold text-[#1C3829]">${tour.price}</span>
                <span className="text-xs text-[#8A7A64]">/ group</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#0A1A10]/75 backdrop-blur-md border border-[#C5A880]/30 shadow-sm">
            <Car className="w-3 h-3 text-[#C5A880] shrink-0" />
            <span className="text-[10px] font-semibold text-[#E8D9BC] tracking-wide">Air-Conditioned · Private</span>
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#1C3829]/80 backdrop-blur-md border border-white/10">
            <Clock className="w-3 h-3 text-[#C5A880] shrink-0" />
            <span className="text-[10px] font-medium text-white/90">{tour.duration}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        {/* Stop count row */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1 text-[#C5A880]">
            {[...Array(Math.min(tour.itinerary.length, 5))].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-current" />
            ))}
          </div>
          <span className="text-[11px] text-[#8A7A64] font-medium">{tour.itinerary.length} Temple Stops</span>
          <span className="ml-auto flex items-center space-x-1 text-[11px] text-[#8A7A64]">
            <MapPin className="w-3 h-3 text-[#C5A880]" />
            <span>Siem Reap</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-luxury-serif text-xl sm:text-2xl font-bold text-[#1C3829] group-hover:text-[#2D5540] transition-colors leading-snug mb-3">
          {tour.title}
        </h3>

        {/* Short description */}
        <p className="text-xs sm:text-sm text-[#6B7870] leading-relaxed mb-4 font-light line-clamp-2">
          {tour.shortDescription}
        </p>

        {/* Temple stop pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tour.itinerary.slice(0, 3).map((stop, i) => (
            <span key={i} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#F4EFE6] text-[#5A4A2E] text-[11px] font-medium border border-[#E4DAC8]/60">
              <Compass className="w-2.5 h-2.5 text-[#C5A880] shrink-0" />
              <span>{stop.templeName}</span>
            </span>
          ))}
          {tour.itinerary.length > 3 && (
            <span className="px-2.5 py-1 rounded-lg bg-[#EDE8E0] text-[#8A7A64] text-[11px] font-medium">
              +{tour.itinerary.length - 3} more
            </span>
          )}
        </div>

        {/* Expandable inclusions */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl bg-[#F8F5F0] hover:bg-[#F2EDE4] border border-[#EDE8E0] text-xs font-semibold text-[#4A554F] transition-colors mb-4 cursor-pointer"
        >
          <span className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>What's Included</span>
          </span>
          <ChevronDown className={`w-4 h-4 text-[#C5A880] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="inclusions"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden mb-4"
            >
              <div className="space-y-2 pb-2">
                {tour.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-[#1C3829]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#1C3829]" />
                    </div>
                    <span className="text-[11px] text-[#5A6460] leading-relaxed">{inc}</span>
                  </div>
                ))}
                {tour.exclusions.length > 0 && (
                  <>
                    <div className="h-px bg-[#EDE8E0] my-2" />
                    {tour.exclusions.map((exc, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <div className="w-4 h-4 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5 text-red-400" />
                        </div>
                        <span className="text-[11px] text-[#8A9490] leading-relaxed">{exc}</span>
                      </div>
                    ))}
                  </>
                )}
                {tour.tips.length > 0 && (
                  <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-100">
                    {tour.tips.map((tip, i) => (
                      <div key={i} className="flex items-start space-x-1.5">
                        <Lightbulb className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-amber-800 leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 pt-4 border-t border-[#EDE8E0]">
          <button
            onClick={() => onViewDetails(tour.slug)}
            className="flex-1 group/btn py-3 px-4 rounded-2xl border border-[#1C3829]/15 text-[#1C3829] hover:bg-[#F4EFE6] transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Full Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
          <button
            onClick={() => onBookTour(tour.slug)}
            className="py-3 px-5 rounded-2xl bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] transition-all text-xs font-bold uppercase tracking-wider shadow-[0_4px_14px_rgba(28,56,41,0.3)] hover:shadow-[0_6px_20px_rgba(28,56,41,0.4)] active:scale-95 cursor-pointer"
          >
            Reserve
          </button>
        </div>
      </div>
    </motion.div>
  );
};
