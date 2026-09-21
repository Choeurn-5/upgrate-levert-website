import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Sparkles, Utensils, GlassWater, Leaf, Wine } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, AppRoute, DiningExperience } from '../types';
import { DINING_EXPERIENCES } from '../data/hotelData';

interface DiningViewProps {
  heroConfig: HeroConfig;
  diningExperiences?: DiningExperience[];
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
  onOpenHeroManager: () => void;
}

export const DiningView: React.FC<DiningViewProps> = ({
  heroConfig,
  diningExperiences = DINING_EXPERIENCES,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  const venues = diningExperiences && diningExperiences.length > 0 ? diningExperiences : DINING_EXPERIENCES;
  const [activeVenue, setActiveVenue] = useState(venues[0]?.id || DINING_EXPERIENCES[0].id);

  // Sync if venues change
  React.useEffect(() => {
    if (venues.length > 0 && !venues.some(v => v.id === activeVenue)) {
      setActiveVenue(venues[0].id);
    }
  }, [venues, activeVenue]);

  return (
    <div>
      {/* 1. Replaceable Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={onOpenBooking}
        primaryButtonText="Reserve a Dining Table"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Dining Philosophy */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
            Gastronomy & Sunset Libations
          </span>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
            A Celebration of Authentic Cambodian Flavors
          </h2>
          <p className="text-sm sm:text-base text-[#4A554F] font-light leading-relaxed">
            At Le Vert Angkor Hotel, dining is a celebration of Cambodia’s rich agricultural legacy. We procure hand-harvested Kampot peppercorns, fresh snakehead fish from Tonle Sap Lake, and organic herbs from local Siem Reap smallholders to craft classical delicacies and comforting global favorites.
          </p>
        </div>

        {/* Venue Switcher Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-1 p-1.5 rounded-full bg-[#F2EDE4] border border-[#E7E0D5]">
            {venues.map((venue) => (
              <button
                key={venue.id}
                onClick={() => setActiveVenue(venue.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeVenue === venue.id
                    ? 'bg-[#1C3829] text-[#FAF8F5] shadow-sm'
                    : 'text-[#4A554F] hover:text-[#1C3829]'
                }`}
              >
                {venue.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Venue Showcase */}
        {venues.map((venue) => {
          if (venue.id !== activeVenue) return null;
          return (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              {/* Feature Hero Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#E7E0D5] shadow-sm">
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider">
                      <Clock className="w-4 h-4" />
                      <span>{venue.hours}</span>
                    </div>
                    <h3 className="font-luxury-serif text-3xl sm:text-4xl font-bold text-[#1C3829]">
                      {venue.name}
                    </h3>
                    <div className="flex items-center space-x-1.5 text-xs text-[#68726B]">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{venue.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-[#4A554F] font-light leading-relaxed">
                    {venue.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1C3829] block">
                      Experience Highlights:
                    </span>
                    {venue.menuHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-[#4A554F]">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg border border-[#E7E0D5] h-80 sm:h-96">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Sample Menu Sections */}
              {venue.menuSections && (
                <div className="space-y-8">
                  <div className="text-center">
                    <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-1">
                      Culinary Selections
                    </span>
                    <h4 className="font-luxury-serif text-3xl font-bold text-[#1C3829]">
                      Featured Tasting Menu
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {venue.menuSections.map((sec, i) => (
                      <div
                        key={i}
                        className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E7E0D5] shadow-sm space-y-6"
                      >
                        <h5 className="font-luxury-serif text-2xl font-bold text-[#1C3829] pb-3 border-b border-[#E7E0D5]">
                          {sec.category}
                        </h5>

                        <div className="space-y-6">
                          {sec.items.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex items-baseline justify-between">
                                <div className="flex items-center space-x-2">
                                  <h6 className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                                    {item.name}
                                  </h6>
                                  {item.tag && (
                                    <span className="px-2 py-0.5 rounded-full bg-[#1C3829] text-[#DFCAA8] text-[9px] font-semibold uppercase tracking-wider">
                                      {item.tag}
                                    </span>
                                  )}
                                </div>
                                <span className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                                  {item.price}
                                </span>
                              </div>
                              {item.khmerName && (
                                <span className="text-xs text-[#68726B] font-mono block">
                                  {item.khmerName}
                                </span>
                              )}
                              <p className="text-xs text-[#555F59] font-light leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* In-Room Balcony Dining Note */}
        <div className="mt-20 p-8 rounded-3xl bg-[#F2EDE4] border border-[#E7E0D5] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <h4 className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
              Private Balcony Dining Service
            </h4>
            <p className="text-xs sm:text-sm text-[#68726B] font-light max-w-xl leading-relaxed">
              Every dish on our menu can be enjoyed in the intimate privacy of your suite balcony overlooking the tranquil morning light or evening breeze.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-full bg-[#1C3829] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#12241A] transition-colors shrink-0 shadow-sm"
          >
            Inquire with Concierge
          </button>
        </div>
      </section>
    </div>
  );
};
