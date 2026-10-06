import React from 'react';
import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';
import { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
  onViewDetails: (slug: string) => void;
  index?: number;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onViewDetails, index = 0 }) => {
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
      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-stone-100 shrink-0">
        <img
          src={tour.featuredImage}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A10]/80 via-[#0A1A10]/20 to-transparent" />

        {/* Duration badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#1C3829]/80 backdrop-blur-md border border-white/10">
            <Clock className="w-3 h-3 text-[#C5A880] shrink-0" />
            <span className="text-[10px] font-medium text-white/90">{tour.durationLabel}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-luxury-serif text-xl sm:text-2xl font-bold text-[#1C3829] group-hover:text-[#2D5540] transition-colors leading-snug mb-4">
          {tour.title}
        </h3>

        {/* Tour Highlights */}
        <div className="mb-5">
          <p className="text-[13px] font-bold text-[#1C3829] mb-2.5 flex items-center gap-1.5">
            <span className="text-[#C5A880]">Tour Highlight:</span> 
            {tour.durationLabel}
          </p>
          <ul className="space-y-2 pl-1">
            {(tour.highlights || []).map((highlight, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#5A6460]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0 mt-1.5" />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Options */}
        <div className="space-y-3 mb-6">
          {(tour.options || []).map((option, i) => (
            <div key={i} className="bg-[#F8F5F0] rounded-xl p-4 border border-[#EDE8E0]">
              <p className="text-[13px] font-bold text-[#1C3829] mb-2">{option.title}</p>
              <ul className="space-y-1.5 pl-1">
                {(option.details || []).map((detail, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-[#6B7870]">
                    <div className="w-1 h-1 rounded-full bg-[#8A7A64] shrink-0 mt-2" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 pt-5 border-t border-[#EDE8E0]">
          <button
            onClick={() => onViewDetails(tour.slug)}
            className="flex-1 group/btn py-3.5 px-4 rounded-2xl border border-[#1C3829]/15 text-[#1C3829] hover:bg-[#F4EFE6] transition-all text-[13px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Read Details</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </button>
          <a
            href={`https://wa.me/85570247282?text=${encodeURIComponent(`Hello Le Vert Angkor Hotel, I would like to book the "${tour.title}". Please share availability and details. Thank you!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-6 rounded-2xl bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] transition-all text-[13px] font-bold uppercase tracking-wider shadow-[0_4px_14px_rgba(28,56,41,0.3)] hover:shadow-[0_6px_20px_rgba(28,56,41,0.4)] active:scale-95 cursor-pointer"
          >
            Book Now
          </a>
        </div>
      </div>
    </motion.div>
  );
};
