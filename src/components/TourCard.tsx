import React from 'react';
import { motion } from 'motion/react';
import { Clock, Car, Compass, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
  onViewDetails: (slug: string) => void;
  onBookTour: (slug: string) => void;
  index?: number;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  onViewDetails,
  onBookTour,
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
      {/* Image Banner */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-200">
        <img
          src={tour.featuredImage}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="px-3.5 py-1.5 rounded-2xl bg-[#FAF8F5]/95 backdrop-blur-md text-[#1C3829] shadow-lg border border-[#E7E0D5]">
            <span className="text-[10px] uppercase font-semibold text-[#68726B] block -mb-1">
              Private Tour
            </span>
            <div className="flex items-baseline space-x-0.5">
              <span className="font-luxury-serif text-xl font-bold text-[#1C3829]">
                ${tour.price}
              </span>
              <span className="text-xs text-[#68726B] font-light">/ group</span>
            </div>
          </div>
        </div>

        {/* Vehicle Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#14281D]/80 backdrop-blur-md text-[#DFCAA8] text-[11px] font-medium tracking-wide border border-[#C5A880]/30">
            <Car className="w-3 h-3 text-[#C5A880]" />
            <span>Air-Conditioned Private Vehicle</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center space-x-3 text-xs text-[#68726B] mb-3 pb-3 border-b border-[#E7E0D5]/70">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{tour.duration}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{tour.itinerary.length} Temple Stops</span>
            </span>
          </div>

          <h3 className="font-luxury-serif text-xl sm:text-2xl font-bold text-[#1C3829] group-hover:text-[#2D5540] transition-colors leading-snug mb-2">
            {tour.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#555F59] line-clamp-2 leading-relaxed mb-4 font-light">
            {tour.shortDescription}
          </p>

          {/* Temple Stops Preview */}
          <div className="mb-4">
            <span className="text-[11px] uppercase font-semibold tracking-wider text-[#68726B] block mb-2">
              Featured Temple Stops:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tour.itinerary.slice(0, 4).map((stop, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#F2EDE4] text-[#1C3829] text-xs font-medium border border-[#E7E0D5]/60"
                >
                  {stop.templeName}
                </span>
              ))}
              {tour.itinerary.length > 4 && (
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-[#68726B] text-xs">
                  +{tour.itinerary.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 pt-4 border-t border-[#E7E0D5]/70">
          <button
            onClick={() => onViewDetails(tour.slug)}
            className="flex-1 py-2.5 px-4 rounded-full border border-[#1C3829]/20 text-[#1C3829] hover:bg-[#1C3829] hover:text-[#FAF8F5] transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5"
          >
            <span>View Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onBookTour(tour.slug)}
            className="py-2.5 px-5 rounded-full bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] transition-all text-xs font-semibold uppercase tracking-wider shadow-sm"
          >
            Reserve Tour
          </button>
        </div>
      </div>
    </motion.div>
  );
};
