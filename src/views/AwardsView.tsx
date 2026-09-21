import React from 'react';
import { motion } from 'motion/react';
import { Award, Star, ShieldCheck, Check, Sparkles, ExternalLink } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, AppRoute } from '../types';
import { AWARDS_PLATFORMS, GUEST_REVIEWS } from '../data/hotelData';

interface AwardsViewProps {
  heroConfig: HeroConfig;
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
  onOpenHeroManager: () => void;
}

export const AwardsView: React.FC<AwardsViewProps> = ({
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
        onPrimaryClick={onOpenBooking}
        primaryButtonText="Reserve an Award-Winning Stay"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Primary Awards Spotlight */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
            Excellence in Hospitality
          </span>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
            Recognized Globally for Uncompromising Quality
          </h2>
          <p className="text-sm sm:text-base text-[#4A554F] font-light leading-relaxed">
            Consistently rated in the top tier of boutique accommodations in Cambodia. From TripAdvisor’s Travelers’ Choice to outstanding scores across global booking portals, our dedication to warm Khmer warmth and refined comfort is affirmed by travelers worldwide.
          </p>
        </div>

        {/* Featured 2026 Digital Award Banner */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-[#FAF8F5] border-2 border-[#C5A880]/50 shadow-xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 shrink-0 bg-white p-4 rounded-2xl border border-[#E7E0D5] flex items-center justify-center shadow-md">
            <img
              src="https://www.cms.levertangkorhotel.com/wp-content/uploads/2026/04/Digital-Award_TRA-2026.png"
              alt="TripAdvisor Travelers' Choice Award 2026"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-3 flex-1 text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1C3829] text-[#DFCAA8] text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>TripAdvisor Travelers’ Choice 2026 Winner</span>
            </div>
            <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829]">
              Ranked in the Top 10% of Hotels Worldwide
            </h3>
            <p className="text-xs sm:text-sm text-[#4A554F] font-light leading-relaxed">
              Awarded annually to properties that consistently earn excellent reviews from travelers worldwide and maintain exemplary standards of service, cleanliness, and guest satisfaction.
            </p>
          </div>
        </div>

        {/* Platform Scores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {AWARDS_PLATFORMS.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#E7E0D5] hover:border-[#C5A880] transition-colors shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#1C3829] tracking-wider uppercase">
                    {platform.category}
                  </span>
                  <div className="flex items-center text-[#C5A880]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#C5A880]" />
                    ))}
                  </div>
                </div>

                <h4 className="font-luxury-serif text-2xl font-bold text-[#1C3829] mb-1">
                  {platform.name}
                </h4>

                <div className="flex items-baseline space-x-1.5 mb-3">
                  <span className="font-luxury-serif text-4xl font-bold text-[#1C3829]">
                    {platform.ratingScore}
                  </span>
                  <span className="text-sm text-[#68726B] font-light">
                    /{platform.maxScore}
                  </span>
                </div>

                <p className="text-xs text-[#555F59] font-light leading-relaxed">
                  {platform.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E7E0D5] text-[11px] text-[#68726B] flex items-center justify-between">
                <span>Verified Traveler Reviews</span>
                <ShieldCheck className="w-4 h-4 text-[#2D5540]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verified Guest Testimonials */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-1">
              Guest Impressions
            </span>
            <h3 className="font-luxury-serif text-3xl font-bold text-[#1C3829]">
              Words from Our Cherished Guests
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GUEST_REVIEWS.map((review, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-[#F2EDE4] border border-[#E7E0D5] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-[#C5A880]">
                    {[...Array(review.stars)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#C5A880]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#1C3829] italic font-light leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E7E0D5]/80">
                  <div className="font-luxury-serif text-base font-bold text-[#1C3829]">
                    {review.author}
                  </div>
                  <div className="text-xs text-[#68726B]">
                    {review.country} • Stayed {review.stayedRoom}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
