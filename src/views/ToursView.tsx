import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Car, ShieldCheck, Compass, Info, Check, Clock } from 'lucide-react';
import { Hero } from '../components/Hero';
import { TourCard } from '../components/TourCard';
import { Tour, HeroConfig, AppRoute } from '../types';

interface ToursViewProps {
  heroConfig: HeroConfig;
  tours: Tour[];
  onNavigate: (route: AppRoute, slug?: string) => void;
  onOpenBooking: (preferredItem?: string) => void;
  onOpenHeroManager: () => void;
}

export const ToursView: React.FC<ToursViewProps> = ({
  heroConfig,
  tours,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  return (
    <div>
      {/* 1. Replaceable Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={() => onOpenBooking('tour-circuit')}
        primaryButtonText="Inquire Private Temple Tour"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Main Tour Listing */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-2">
            Ancient Khmer Heritage
          </span>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
            The Great Circuits of Angkor
          </h2>
          <p className="text-sm text-[#68726B] font-light mt-3 leading-relaxed">
            Discover the monumental temples of the Khmer Empire in refined comfort. Each private expedition is operated in climate-controlled vehicles with complimentary ice-chilled mineral water, cold refreshing towels, and courteous English-speaking drivers.
          </p>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tours.map((tour, i) => (
            <TourCard
              key={tour.slug}
              tour={tour}
              index={i}
              onViewDetails={(slug) => onNavigate('/our-tours/', slug)}
              onBookTour={(slug) => onOpenBooking(`tour-${slug}`)}
            />
          ))}
        </div>

        {/* Temple Exploration Guidelines Notice */}
        <div className="mt-16 p-8 rounded-3xl bg-[#F2EDE4] border border-[#E7E0D5] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829] mb-1">
                Angkor Park Pass Information
              </h4>
              <p className="text-xs text-[#68726B] font-light leading-relaxed">
                Temple passes are purchased at the official Angkor ticket center ($37 for 1-day, $62 for 3-day). Our driver stops with you on the way.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829] mb-1">
                Sacred Temple Attire
              </h4>
              <p className="text-xs text-[#68726B] font-light leading-relaxed">
                Shoulders and knees must be covered with non-transparent clothing. Shawls or scarves draped over bare shoulders are not accepted by park authorities.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829] mb-1">
                Sunrise Departure Option
              </h4>
              <p className="text-xs text-[#68726B] font-light leading-relaxed">
                For spectacular sunrise reflections over Angkor Wat, early departure at 4:45 AM is available with takeaway hotel breakfast boxes prepared for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
