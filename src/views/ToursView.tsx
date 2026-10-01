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

        {/* Personalized Concierge Tour Assistance */}
        <div className="mt-12 relative bg-gradient-to-b from-white via-[#FCFAF7] to-[#F7F2E9] rounded-3xl p-8 sm:p-12 border border-[#E4DDD3] hover:border-[#C5A880] flex flex-col md:flex-row items-center gap-8 shadow-[0_4px_25px_-5px_rgba(28,56,41,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(28,56,41,0.14)] transition-all duration-500 overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-tr from-[#C5A880] via-[#DFCAA8] to-[#1C3829]/40 shadow-md group-hover:shadow-[0_10px_25px_rgba(197,168,128,0.35)] transition-all duration-500 group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden bg-white ring-2 ring-white/90 shadow-inner">
                <img
                  src="/images/staff-image/deepool-front-office-manager.jpg"
                  alt="Deepool - Front Office Manager"
                  className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#1C3829] border-2 border-white text-[#DFCAA8] flex items-center justify-center shadow-md">
              <Compass className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-3 flex-1 text-center md:text-left">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase bg-[#1C3829]/5 text-[#1C3829] border border-[#1C3829]/10">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>Personalized Concierge Care</span>
            </span>
            <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829] tracking-tight group-hover:text-[#2D5540] transition-colors">
              Custom Angkor Itineraries with Deepool &amp; Team
            </h3>
            <p className="text-xs sm:text-sm text-[#4A554F] font-light leading-relaxed italic">
              &quot;Whether you wish to experience the dawn serenity of Angkor Wat, explore the jungle-entangled stone roots of Ta Prohm, or arrange private air-conditioned transport with cold water and towels, our front-desk team ensures every detail of your journey feels personalized and effortless.&quot;
            </p>
            <div className="text-xs font-semibold text-[#1C3829] pt-1">
              — Deepool, <span className="text-[#A8824B] uppercase tracking-wider text-[11px]">Front Office Manager</span>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onOpenBooking('tour-custom-concierge')}
              className="px-7 py-4 rounded-full bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center space-x-2.5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#C5A880]" />
              <span>Customize Your Tour</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
