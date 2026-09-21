import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Clock, Check, Leaf, Flower2, ShieldCheck } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, AppRoute, SpaTreatment } from '../types';
import { SPA_TREATMENTS } from '../data/hotelData';

interface SpaViewProps {
  heroConfig: HeroConfig;
  spaTreatments?: SpaTreatment[];
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
  onOpenHeroManager: () => void;
}

export const SpaView: React.FC<SpaViewProps> = ({
  heroConfig,
  spaTreatments = SPA_TREATMENTS,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  const treatments = spaTreatments && spaTreatments.length > 0 ? spaTreatments : SPA_TREATMENTS;

  return (
    <div>
      {/* 1. Replaceable Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={onOpenBooking}
        primaryButtonText="Reserve a Spa Session"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Spa Treatments */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
            Holistic Khmer Wellness
          </span>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
            Ancient Healing Arts & Botanical Serenity
          </h2>
          <p className="text-sm sm:text-base text-[#4A554F] font-light leading-relaxed">
            Revive your senses after days of temple exploration. Our experienced Cambodian therapists use authentic acupressure techniques, warm organic coconut oils, crushed lemongrass, and medicinal camphor balms to restore harmony to body and spirit.
          </p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, i) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E7E0D5] hover:border-[#C5A880] transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-200">
                  <img
                    src={treatment.image}
                    alt={treatment.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-[#1C3829]/90 backdrop-blur-sm text-[#DFCAA8] text-xs font-bold shadow">
                      {treatment.price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-xs text-[#68726B] mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{treatment.duration}</span>
                  </div>

                  <h3 className="font-luxury-serif text-xl font-bold text-[#1C3829] mb-3">
                    {treatment.name}
                  </h3>

                  <p className="text-xs text-[#4A554F] font-light leading-relaxed mb-4">
                    {treatment.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#E7E0D5]/70">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#68726B] block">
                      Key Benefits:
                    </span>
                    {treatment.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-[#1C3829]">
                        <Check className="w-3.5 h-3.5 text-[#2D5540] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-full bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Book Treatment
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spa Ritual Details Note */}
        <div className="mt-16 p-8 rounded-3xl bg-[#F2EDE4] border border-[#E7E0D5] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-2xl bg-[#1C3829] text-[#DFCAA8] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-luxury-serif text-xl font-bold text-[#1C3829] mb-1">
                Direct Guest Privilege: 15% Spa Discount
              </h4>
              <p className="text-xs sm:text-sm text-[#68726B] font-light leading-relaxed">
                All guests booking their stay directly with Le Vert Angkor receive a complimentary 15% discount voucher valid across our entire massage and facial treatment menu.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-full bg-[#1C3829] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#12241A] transition-colors shrink-0 shadow-sm"
          >
            Claim Direct Benefit
          </button>
        </div>
      </section>
    </div>
  );
};
