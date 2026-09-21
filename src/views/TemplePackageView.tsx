import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Calendar, Clock, ShieldCheck, Heart, Car, Coffee, BedDouble } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, AppRoute } from '../types';

interface TemplePackageViewProps {
  heroConfig: HeroConfig;
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: (preferredItem?: string) => void;
  onOpenHeroManager: () => void;
}

export const TemplePackageView: React.FC<TemplePackageViewProps> = ({
  heroConfig,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  return (
    <div>
      {/* 1. Replaceable Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={() => onOpenBooking('package-all-inclusive-temple')}
        primaryButtonText="Reserve This Package"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Package Overview */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
            Signature Experience
          </span>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
            The All-Inclusive Temple Experience Package
          </h2>
          <p className="text-sm sm:text-base text-[#4A554F] font-light leading-relaxed">
            Curated specifically for discerning travelers seeking an effortless stay in Siem Reap. We combine our finest suite with private archaeological exploration and deep botanical relaxation.
          </p>
        </div>

        {/* Inclusions Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7E0D5] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1C3829] text-[#DFCAA8] flex items-center justify-center">
              <BedDouble className="w-6 h-6" />
            </div>
            <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
              3 Nights in Le Vert Suite
            </h3>
            <p className="text-xs sm:text-sm text-[#4A554F] font-light leading-relaxed">
              Our premier 45 m² suite featuring a king-size bed, private open-air balcony, deep soaking bathtub, and views over Siem Reap.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7E0D5] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1C3829] text-[#DFCAA8] flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
              Private Angkor Tour
            </h3>
            <p className="text-xs sm:text-sm text-[#4A554F] font-light leading-relaxed">
              Full-day Small Circuit expedition (Angkor Wat, Bayon, Ta Prohm) in a private air-conditioned vehicle with chilled towels and cold mineral water.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7E0D5] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1C3829] text-[#DFCAA8] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
              Complimentary Spa for Two
            </h3>
            <p className="text-xs sm:text-sm text-[#4A554F] font-light leading-relaxed">
              Enjoy a 60-minute Traditional Khmer Herbal Body Massage for two guests at our peaceful in-house spa after your temple explorations.
            </p>
          </div>
        </div>

        {/* Detailed Inclusions List */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F2EDE4] border border-[#E7E0D5] space-y-6">
          <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829]">
            Full Package Inclusions:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 text-sm text-[#1C3829]">
              <Check className="w-5 h-5 text-[#2D5540] shrink-0" />
              <span>3 Nights accommodation in Le Vert Suite</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-[#1C3829]">
              <Check className="w-5 h-5 text-[#2D5540] shrink-0" />
              <span>Daily cooked-to-order gourmet breakfast for two</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-[#1C3829]">
              <Check className="w-5 h-5 text-[#2D5540] shrink-0" />
              <span>Complimentary airport arrival pick-up</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-[#1C3829]">
              <Check className="w-5 h-5 text-[#2D5540] shrink-0" />
              <span>Private chauffeured Small Circuit Angkor Tour</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-[#1C3829]">
              <Check className="w-5 h-5 text-[#2D5540] shrink-0" />
              <span>60-Minute Khmer Herbal Massage for two guests</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-[#1C3829]">
              <Check className="w-5 h-5 text-[#2D5540] shrink-0" />
              <span>Welcome tropical fruit platter & organic herbal tea</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-[#1C3829]">
              <Check className="w-5 h-5 text-[#2D5540] shrink-0" />
              <span>Guaranteed late check-out until 2:00 PM</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-[#1C3829]">
              <Check className="w-5 h-5 text-[#2D5540] shrink-0" />
              <span>High-speed optical fiber Wi-Fi throughout the hotel</span>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E7E0D5] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-semibold text-[#68726B] tracking-wider block">
                Total Package Price
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="font-luxury-serif text-4xl font-bold text-[#1C3829]">
                  $295
                </span>
                <span className="text-sm text-[#68726B]">USD for 2 guests (all taxes included)</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('package-all-inclusive-temple')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1C3829] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest hover:bg-[#12241A] transition-colors shadow-lg"
            >
              Reserve This Package Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
