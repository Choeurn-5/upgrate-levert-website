import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Clock,
  Check,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Phone,
  Heart,
  Calendar,
  ArrowRight,
  Leaf,
  Flower2,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, AppRoute, SpaTreatment } from '../types';
import { SPA_TREATMENTS } from '../data/hotelData';
import { SITE_SETTINGS } from '../lib/site-settings';

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
    <div className="bg-[#FAF8F5]">
      {/* 1. Cinematic Hero with Real Spa Photography Slides */}
      <Hero
        config={heroConfig}
        onPrimaryClick={onOpenBooking}
        primaryButtonText="Reserve a Spa Session"
        onSecondaryClick={() => window.open(SITE_SETTINGS.whatsappUrl, '_blank', 'noopener,noreferrer')}
        secondaryButtonText="WhatsApp Concierge"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Signature Divider matching CMS */}
      <div className="pt-16 pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center justify-center space-x-3 text-[#C5A880] mb-4">
          <span className="h-px w-12 sm:w-20 bg-[#C5A880]/60" />
          <span className="text-xs uppercase font-serif tracking-[0.3em] font-semibold text-[#1C3829]">
            spa
          </span>
          <span className="h-px w-12 sm:w-20 bg-[#C5A880]/60" />
        </div>
        <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829] leading-tight">
          Holistic Cambodian Wellness & Healing Arts
        </h2>
        <p className="text-sm sm:text-base text-[#555F59] font-light mt-4 max-w-2xl mx-auto leading-relaxed">
          Surrender yourself to our skilled full therapists to soothe chronic fatigue and extreme muscle spasms, restore vital energies, and experience the transformative power of authentic Khmer healing.
        </p>
      </div>

      {/* 3. Three Primary Treatments with 100% Exact Copy & Images from https://www.cms.levertangkorhotel.com/spa/ */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Treatment 1: KHMER BODY MASSAGE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#F4EFE6]/60 p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#E7E0D5] shadow-sm hover:shadow-xl transition-all"
        >
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 w-full bg-stone-200">
            <img
              src="https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/fgsdfg-4200-x-2938-scaled.jpg"
              alt="Spa massage"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#1C3829]/90 backdrop-blur-md text-[#DFCAA8] text-xs font-semibold tracking-wide border border-[#C5A880]/30 shadow">
                Traditional Chab Ta Shai
              </span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1C3829] text-xs font-bold shadow">
                $18 / $25 USD
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-left">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
                Authentic Therapeutic Art
              </span>
              <h3 className="font-luxury-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C3829] leading-tight">
                KHMER BODY MASSAGE
              </h3>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#4A554F] font-light leading-relaxed">
              <p className="font-medium text-[#1C3829]">
                Experience yourself in a Traditional Khmer way of therapeutic work call “Chab Ta Shai”
              </p>
              <p>
                A vigorous, firm massage for effective pain relief; the touch technique are deep and reasonable forceful in continuous, elastic and rhythmic. The strength is vary from gently to moderately and intense pressure.
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#E7E0D5] space-y-2">
                <h4 className="font-luxury-serif text-base sm:text-lg font-bold text-[#1C3829]">
                  Relaxing Aromatherapy
                </h4>
                <p className="text-xs sm:text-sm text-[#555F59] leading-relaxed">
                  Experience the healing effects of Asian aromatherapy in a relaxing and restorative massage that combines the sense of tropical smells with the soothing value of acupressure point. Individually chosen to suit your personal requirements, the essential oils will rebalance your vital energies restoring harmony and calm to your body and mind.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center space-x-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Reserve Session</span>
              </button>
              <a
                href={SITE_SETTINGS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full border border-[#1C3829]/25 hover:bg-[#1C3829]/10 text-[#1C3829] text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Treatment 2: ANTI-STRESS BACK & SHOULDER MASSAGE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#F4EFE6]/60 p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#E7E0D5] shadow-sm hover:shadow-xl transition-all"
        >
          <div className="lg:col-span-6 lg:order-2 relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 w-full bg-stone-200">
            <img
              src="https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/Spa-treatment.webp"
              alt="Anti-stress back and shoulder massage"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#1C3829]/90 backdrop-blur-md text-[#DFCAA8] text-xs font-semibold tracking-wide border border-[#C5A880]/30 shadow">
                Focused Relief
              </span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1C3829] text-xs font-bold shadow">
                $15 / $20 USD
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1 space-y-5 text-left">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
                Targeted Therapy
              </span>
              <h3 className="font-luxury-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C3829] leading-tight">
                ANTI-STRESS BACK &amp; SHOULDER MASSAGE
              </h3>
            </div>

            <div className="text-sm sm:text-base text-[#4A554F] font-light leading-relaxed space-y-3">
              <p className="text-base sm:text-lg text-[#1C3829] font-normal leading-relaxed">
                Chronic fatigue and extreme muscle spasms possible tissue damage and pain, Surrender yourself to our skilled full therapist help to soothe this trouble.
              </p>
              <p className="text-xs sm:text-sm text-[#555F59]">
                Designed specifically for travelers recovering from long flights and days of temple exploration, focusing intensively on the cervical spine, scapulae, and lower lumbar zone with warm botanical balms.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-white/70 rounded-xl border border-[#E7E0D5] flex items-center space-x-2 text-xs text-[#1C3829]">
                <CheckCircle2 className="w-4 h-4 text-[#2D5540] shrink-0" />
                <span>Eases extreme muscle spasms</span>
              </div>
              <div className="p-3.5 bg-white/70 rounded-xl border border-[#E7E0D5] flex items-center space-x-2 text-xs text-[#1C3829]">
                <CheckCircle2 className="w-4 h-4 text-[#2D5540] shrink-0" />
                <span>Soothes post-temple fatigue</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center space-x-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Reserve Session</span>
              </button>
              <a
                href={SITE_SETTINGS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full border border-[#1C3829]/25 hover:bg-[#1C3829]/10 text-[#1C3829] text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Treatment 3: RELIEF, RELAX & REJUVENATION PACKAGE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#F4EFE6]/60 p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#E7E0D5] shadow-sm hover:shadow-xl transition-all"
        >
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 w-full bg-stone-200">
            <img
              src="https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/sad-4200-x-2963-scaled.jpg"
              alt="Relief Relax & Rejuvenation Spa Package"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#1C3829]/90 backdrop-blur-md text-[#DFCAA8] text-xs font-semibold tracking-wide border border-[#C5A880]/30 shadow">
                Signature 3-in-1 Package
              </span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1C3829] text-xs font-bold shadow">
                $35 USD • 120 Min
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-left">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
                Complete Wellness Journey
              </span>
              <h3 className="font-luxury-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C3829] leading-tight">
                RELIEF, RELAX &amp; REJUVENATION PACKAGE
              </h3>
            </div>

            <div className="space-y-3 text-sm sm:text-base text-[#4A554F] font-light leading-relaxed">
              <p>
                Chronic fatigue and extreme muscle spasms possible tissue damage and pain, Surrender yourself to our skilled therapist help to soothe this trouble.
              </p>
              <p className="font-medium text-[#1C3829]">
                Pamper yourself with the most recommended specialized spa package designed to offer you the true spa experience of relaxing, relieving, and revitalizing at the same time. The package included Swedish Massage, Calming Head Massage and Revitalizing Facial Treatment
              </p>
            </div>

            {/* 3 Inclusions Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0D5] text-left">
                <span className="text-[10px] uppercase font-semibold text-[#C5A880] tracking-wider block">
                  Part 1
                </span>
                <div className="text-xs font-bold text-[#1C3829] mt-0.5">Swedish Massage</div>
                <div className="text-[11px] text-[#68726B] mt-1 font-light leading-snug">
                  Fluid effleurage strokes with warm plant oils
                </div>
              </div>

              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0D5] text-left">
                <span className="text-[10px] uppercase font-semibold text-[#C5A880] tracking-wider block">
                  Part 2
                </span>
                <div className="text-xs font-bold text-[#1C3829] mt-0.5">Calming Head Massage</div>
                <div className="text-[11px] text-[#68726B] mt-1 font-light leading-snug">
                  Targeted cranial acupressure for mental calm
                </div>
              </div>

              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0D5] text-left">
                <span className="text-[10px] uppercase font-semibold text-[#C5A880] tracking-wider block">
                  Part 3
                </span>
                <div className="text-xs font-bold text-[#1C3829] mt-0.5">Revitalizing Facial</div>
                <div className="text-[11px] text-[#68726B] mt-1 font-light leading-snug">
                  Pure botanical extracts for glowing skin
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center space-x-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Reserve Package ($35)</span>
              </button>
              <a
                href={SITE_SETTINGS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full border border-[#1C3829]/25 hover:bg-[#1C3829]/10 text-[#1C3829] text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. Complete Treatment Menu Overview Cards */}
      <section className="py-16 sm:py-20 bg-[#F2EDE4] border-t border-[#E7E0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-1">
              Treatment Menu &amp; Rates
            </span>
            <h3 className="font-luxury-serif text-3xl sm:text-4xl font-semibold text-[#1C3829]">
              Full Spa &amp; Wellness Services
            </h3>
            <p className="text-sm text-[#68726B] font-light mt-2">
              All sessions are performed in private air-conditioned therapy suites by our certified Cambodian therapists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment, i) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-[#E7E0D5] hover:border-[#C5A880]/60 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-stone-200">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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

                    <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829] mb-2 leading-snug">
                      {treatment.name}
                    </h4>

                    <p className="text-xs text-[#4A554F] font-light leading-relaxed mb-4 line-clamp-3">
                      {treatment.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-[#E7E0D5]/70">
                      {treatment.benefits.slice(0, 3).map((b, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-[#1C3829]">
                          <Check className="w-3.5 h-3.5 text-[#2D5540] shrink-0" />
                          <span className="line-clamp-1">{b}</span>
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
        </div>
      </section>

      {/* 5. Spa Ritual Details & Direct Guest Privilege */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1C3829] text-[#FAF8F5] border border-[#C5A880]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start space-x-5 max-w-2xl">
            <div className="p-4 rounded-2xl bg-[#C5A880]/20 text-[#DFCAA8] shrink-0 border border-[#C5A880]/40">
              <Sparkles className="w-7 h-7 text-[#C5A880]" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
                In-House Guest Benefit
              </span>
              <h4 className="font-luxury-serif text-2xl sm:text-3xl font-semibold mb-2">
                15% Discount on All Spa Treatments
              </h4>
              <p className="text-xs sm:text-sm text-[#DFCAA8]/80 font-light leading-relaxed">
                All guests residing at Le Vert Angkor Hotel receive an exclusive 15% discount across our entire massage and rejuvenation menu. Complimentary fresh herbal ginger tea and chilled towel provided with every service.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#DFCAA8] text-[#12241A] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 text-center cursor-pointer"
            >
              Reserve Spa Session
            </button>
            <a
              href={SITE_SETTINGS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/30 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

