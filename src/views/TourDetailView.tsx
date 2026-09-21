import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Car, Compass, Check, X, ShieldAlert, Sparkles, Calendar, MapPin } from 'lucide-react';
import { Tour, HeroConfig, AppRoute } from '../types';
import { Hero } from '../components/Hero';

interface TourDetailViewProps {
  tour: Tour;
  heroConfig: HeroConfig;
  onNavigate: (route: AppRoute, slug?: string) => void;
  onOpenBooking: (preferredItem?: string) => void;
  onOpenHeroManager: () => void;
}

export const TourDetailView: React.FC<TourDetailViewProps> = ({
  tour,
  heroConfig,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  return (
    <div>
      {/* 1. Replaceable Hero */}
      <Hero
        config={{
          ...heroConfig,
          title: tour.title,
          subtitle: tour.shortDescription,
          badge: `Private Tour $${tour.price} USD`,
        }}
        onPrimaryClick={() => onOpenBooking(`tour-${tour.slug}`)}
        primaryButtonText={`Reserve ${tour.title}`}
        onSecondaryClick={() => onNavigate('/touring/')}
        secondaryButtonText="View All Circuits"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Tour Details & Itinerary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <button
          onClick={() => onNavigate('/touring/')}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#68726B] hover:text-[#1C3829] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Tours</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Overview & Itinerary Timeline */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Card */}
            <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7E0D5] space-y-4">
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#1C3829] pb-4 border-b border-[#E7E0D5]">
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-[#C5A880]" />
                  <span>{tour.duration}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <Car className="w-4 h-4 text-[#C5A880]" />
                  <span>{tour.vehicleType}</span>
                </span>
              </div>
              <p className="text-base text-[#4A554F] font-light leading-relaxed">
                {tour.longDescription}
              </p>
            </div>

            {/* Detailed Stop-by-Stop Itinerary Timeline */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
                  Chronological Route
                </span>
                <h3 className="font-luxury-serif text-3xl font-bold text-[#1C3829]">
                  Temple Stop Itinerary
                </h3>
              </div>

              <div className="relative border-l-2 border-[#C5A880]/40 pl-6 sm:pl-8 space-y-8 ml-3">
                {tour.itinerary.map((stop, i) => (
                  <div key={i} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-[#1C3829] border-4 border-[#FAF8F5] shadow-sm flex items-center justify-center text-[9px] text-white" />

                    <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E7E0D5] group-hover:border-[#C5A880] transition-colors shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-luxury-serif text-xl font-bold text-[#1C3829]">
                          {stop.templeName}
                        </h4>
                        {stop.time && (
                          <span className="text-xs font-mono font-medium text-[#C5A880] bg-[#14281D] px-2.5 py-0.5 rounded-full">
                            {stop.time}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A554F] font-light leading-relaxed mb-3">
                        {stop.description}
                      </p>
                      {stop.highlight && (
                        <div className="text-xs font-medium text-[#1C3829] flex items-center space-x-1.5 bg-[#F2EDE4] px-3 py-1.5 rounded-xl">
                          <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                          <span>Must-See Highlight: {stop.highlight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E7E0D5]">
              <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-900/10 space-y-3">
                <h4 className="font-luxury-serif text-xl font-bold text-[#1C3829] flex items-center space-x-2">
                  <Check className="w-5 h-5 text-[#2D5540]" />
                  <span>Tour Inclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#4A554F]">
                  {tour.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#2D5540] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-stone-100/60 border border-stone-200 space-y-3">
                <h4 className="font-luxury-serif text-xl font-bold text-[#1C3829] flex items-center space-x-2">
                  <X className="w-5 h-5 text-stone-500" />
                  <span>Exclusions</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#68726B]">
                  {tour.exclusions.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-stone-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Booking Card & Advice */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7E0D5] shadow-xl space-y-6">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#68726B] tracking-wider block mb-1">
                    Private Tour Rate
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-luxury-serif text-4xl font-bold text-[#1C3829]">
                      ${tour.price}
                    </span>
                    <span className="text-sm text-[#68726B]">USD / vehicle (up to 4 guests)</span>
                  </div>
                  <p className="text-xs text-[#68726B] mt-1">
                    Door-to-door hotel pick-up and drop-off
                  </p>
                </div>

                <button
                  onClick={() => onOpenBooking(`tour-${tour.slug}`)}
                  className="w-full py-4 rounded-xl bg-[#1C3829] text-[#FAF8F5] font-semibold text-xs uppercase tracking-widest hover:bg-[#12241A] transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Book This Tour</span>
                </button>

                <div className="p-4 rounded-2xl bg-[#F2EDE4] text-xs text-[#4A554F] space-y-2">
                  <div className="font-semibold text-[#1C3829]">Helpful Travel Notes:</div>
                  {tour.tips.map((tip, i) => (
                    <p key={i} className="leading-relaxed">
                      • {tip}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
