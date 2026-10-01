import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Car, ShieldCheck, Compass, Info, Clock, LayoutGrid, List, Loader2, RefreshCw } from 'lucide-react';
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
  tours: staticTours,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  const [tours, setTours] = useState<Tour[]>(staticTours);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Hydrate with admin-managed tours from API
  useEffect(() => {
    let isMounted = true;
    async function loadTours() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/tours');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0 && isMounted) {
            setTours(data);
          }
        }
      } catch {
        // Keep static data as fallback
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadTours();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#FDFBF8] to-[#F7F2E9]">
      {/* 1. Hero Section */}
      <Hero
        config={heroConfig}
        onPrimaryClick={() => onOpenBooking('tour-circuit')}
        primaryButtonText="Inquire Private Temple Tour"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Section Header + Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <span className="inline-flex items-center space-x-2 mb-3">
              <div className="h-px w-8 bg-[#C5A880]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#C5A880] uppercase">Ancient Khmer Heritage</span>
            </span>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829] leading-tight">
              Private Temple<br className="hidden sm:block" /> Expeditions
            </h2>
            <p className="text-sm text-[#68726B] font-light mt-3 leading-relaxed max-w-lg">
              Each curated circuit departs in a climate-controlled private vehicle with chilled mineral water,
              cold towels, and a courteous English-speaking driver — tailored for discerning travellers.
            </p>
          </div>
          {/* View toggle + loading indicator */}
          <div className="flex items-center space-x-3">
            {isLoading && (
              <div className="flex items-center space-x-1.5 text-[11px] text-[#8A9490]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C5A880]" />
                <span>Updating...</span>
              </div>
            )}
            <div className="flex items-center rounded-xl border border-[#E4DDD3] bg-white/80 p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-[#1C3829] text-white shadow-sm' : 'text-[#8A9490] hover:text-[#1C3829]'}`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === 'list' ? 'bg-[#1C3829] text-white shadow-sm' : 'text-[#8A9490] hover:text-[#1C3829]'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Tour Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={viewMode === 'grid'
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8'
              : 'flex flex-col gap-5'
            }
          >
            {tours.length === 0 && !isLoading && (
              <div className="col-span-2 text-center py-16 text-[#8A9490]">
                <Compass className="w-10 h-10 mx-auto mb-3 text-[#C5A880]/50" />
                <p className="text-sm">No tours available at the moment.</p>
              </div>
            )}
            {tours.map((tour, i) => (
              <TourCard
                key={tour.id}
                tour={tour}
                index={i}
                onViewDetails={(slug) => onNavigate('/our-tours/', slug)}
                onBookTour={(slug) => onOpenBooking(`tour-${slug}`)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 4. Temple Essentials Info Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-[#E7E0D5] bg-[#F4EFE6]/60 backdrop-blur-sm p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              Icon: Info,
              title: 'Angkor Park Pass',
              body: 'Passes are purchased at the official Angkor ticket center: $37 (1-day), $62 (3-day). Our driver stops with you on the way in.',
            },
            {
              Icon: ShieldCheck,
              title: 'Sacred Temple Attire',
              body: 'Shoulders and knees must be covered with non-transparent fabric. Shawls draped over bare shoulders are not accepted by park authorities.',
            },
            {
              Icon: Clock,
              title: 'Sunrise Departure',
              body: 'Early departure at 4:45 AM for iconic sunrise reflections is available with a takeaway hotel breakfast box — arrange at our front desk.',
            },
          ].map(({ Icon, title, body }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="w-9 h-9 rounded-full bg-white border border-[#DDD5C8] flex items-center justify-center shrink-0 shadow-sm">
                <Icon className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div>
                <h4 className="font-luxury-serif text-base font-bold text-[#1C3829] mb-1">{title}</h4>
                <p className="text-xs text-[#68726B] font-light leading-relaxed">{body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Personalized Concierge Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-[#1C3829] via-[#22422F] to-[#14281D] rounded-3xl p-8 sm:p-12 overflow-hidden"
        >
          {/* Decorative gold orb */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#C5A880]/8 blur-3xl pointer-events-none" />
          {/* Gold line top */}
          <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#C5A880]/60 to-transparent" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            {/* Staff photo */}
            <div className="shrink-0 relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-to-tr from-[#C5A880] via-[#DFCAA8] to-[#C5A880]/30 shadow-[0_0_30px_rgba(197,168,128,0.35)]">
                <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-[#1C3829]">
                  <img
                    src="/images/staff-image/deepool-front-office-manager.jpg"
                    alt="Deepool — Front Office Manager"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#C5A880] border-2 border-[#1C3829] text-[#1C3829] flex items-center justify-center shadow-md">
                <Compass className="w-4 h-4" />
              </div>
            </div>

            {/* Text content */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase bg-[#C5A880]/15 text-[#DFCAA8] border border-[#C5A880]/25">
                <Sparkles className="w-3 h-3 text-[#C5A880]" />
                <span>Personalized Concierge Care</span>
              </span>
              <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                Custom Angkor Itineraries<br className="hidden sm:block" /> with Deepool & Team
              </h3>
              <p className="text-sm text-white/65 font-light leading-relaxed italic max-w-lg">
                "Whether you wish to experience the dawn serenity of Angkor Wat, explore the jungle-entangled
                stone roots of Ta Prohm, or arrange private transport with cold water and towels — our
                front-desk team ensures every detail feels personalized and effortless."
              </p>
              <div className="text-xs font-semibold text-white/80 pt-1">
                — Deepool, <span className="text-[#C5A880] uppercase tracking-wider text-[11px]">Front Office Manager</span>
              </div>
            </div>

            {/* CTA */}
            <div className="shrink-0">
              <button
                onClick={() => onOpenBooking('tour-custom-concierge')}
                className="group/cta px-7 py-4 rounded-2xl bg-[#C5A880] hover:bg-[#D4BC94] text-[#0A1A10] text-xs font-bold uppercase tracking-wider transition-all shadow-[0_8px_25px_rgba(197,168,128,0.35)] hover:shadow-[0_12px_35px_rgba(197,168,128,0.45)] active:scale-95 flex items-center space-x-2.5 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Customize Your Tour</span>
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
