import React from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  Waves,
  Wine,
  Sunset,
  Calendar,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, AppRoute } from '../types';
import { HERO_CONFIGS, SITE_SETTINGS } from '../lib/site-settings';

interface FacilityViewProps {
  heroConfig: HeroConfig;
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
  onOpenHeroManager: () => void;
}

export const FacilityView: React.FC<FacilityViewProps> = ({
  heroConfig = HERO_CONFIGS.facilities,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Cinematic Hero with CMS Rooftop Swimming Pool Photography */}
      <Hero
        config={heroConfig}
        onPrimaryClick={onOpenBooking}
        primaryButtonText="Reserve Pool Lounge"
        onSecondaryClick={() => window.open(SITE_SETTINGS.whatsappUrl, '_blank', 'noopener,noreferrer')}
        secondaryButtonText="WhatsApp Inquiries"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Signature Divider matching CMS (100% elementor divider) */}
      <div className="pt-16 pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center justify-center space-x-3 text-[#C5A880] mb-4">
          <span className="h-px w-12 sm:w-20 bg-[#C5A880]/60" />
          <span className="text-xs uppercase font-serif tracking-[0.3em] font-semibold text-[#1C3829]">
            facilities
          </span>
          <span className="h-px w-12 sm:w-20 bg-[#C5A880]/60" />
        </div>
      </div>

      {/* 3. Rooftop Swimming Pool Section (100% Exact Copy & Image from https://www.cms.levertangkorhotel.com/facilities-levertangkorhotel/) */}
      <section className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#F4EFE6]/60 p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#E7E0D5] shadow-sm hover:shadow-xl transition-all"
        >
          {/* Image from CMS */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 lg:h-[460px] w-full bg-stone-200">
            <img
              src="https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/IMG_2364-2.jpg"
              alt="ROOFTOP SWIMMING POOL"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#1C3829]/90 backdrop-blur-md text-[#DFCAA8] text-xs font-semibold tracking-wide border border-[#C5A880]/30 shadow">
                Rooftop Level • City Panorama
              </span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1C3829] text-xs font-bold shadow flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>10:00 – 22:00</span>
              </span>
            </div>
          </div>

          {/* Exact Text from CMS */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C5A880] block mb-2">
                Le Vert Angkor Facility
              </span>
              <h1 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C3829] leading-tight">
                ROOFTOP SWIMMING POOL
              </h1>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#4A554F] font-light leading-relaxed">
              <p>
                Our rooftop pool is open from 10:00 hours to 22:00 hours. Here you can relax after a hard day’s working or after sightseeing tour. The swim-up bar at the poolside is open from 1.00 pm to serve you afternoon or evening drinks. The pool area includes changing facilities and waterfall showers, so you can enjoy the ambiance. Sunsets from the rooftop are particularly spectacular. Come and see the sun goes down over Siem Reap city. This is a nice view and you will never forget it.
              </p>
              <p>
                Dine at the in-house restaurant and sample authentic Cambodian-style meals. A selection of cocktails, wines, and beers can be enjoyed at the bar. In-room dining options are also available.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0D5] flex items-center space-x-3 text-xs text-[#1C3829]">
                <Waves className="w-4 h-4 text-[#2D5540] shrink-0" />
                <span>Pool open 10:00 – 22:00 hrs</span>
              </div>
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0D5] flex items-center space-x-3 text-xs text-[#1C3829]">
                <Wine className="w-4 h-4 text-[#2D5540] shrink-0" />
                <span>Swim-up bar from 13:00 (1:00 PM)</span>
              </div>
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0D5] flex items-center space-x-3 text-xs text-[#1C3829]">
                <Sparkles className="w-4 h-4 text-[#2D5540] shrink-0" />
                <span>Changing facilities &amp; waterfall showers</span>
              </div>
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0D5] flex items-center space-x-3 text-xs text-[#1C3829]">
                <Sunset className="w-4 h-4 text-[#2D5540] shrink-0" />
                <span>Spectacular Siem Reap sunset views</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-full bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center space-x-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Reserve Pool Lounge</span>
              </button>
              <a
                href={SITE_SETTINGS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full border border-[#1C3829]/25 hover:bg-[#1C3829]/10 text-[#1C3829] text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
