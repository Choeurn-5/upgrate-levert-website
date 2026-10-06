import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Compass, Check, Calendar, Star } from 'lucide-react';
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
          subtitle: tour.durationLabel,
          badge: `Tour Experience`,
          imageUrl: tour.featuredImage || heroConfig?.imageUrl,
        }}
        onPrimaryClick={() => onOpenBooking(`tour-${tour.slug}`)}
        primaryButtonText={`Reserve ${tour.title}`}
        onSecondaryClick={() => onNavigate('/touring/')}
        secondaryButtonText="View All Circuits"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Tour Details & Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <button
          onClick={() => onNavigate('/touring/')}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#68726B] hover:text-[#1C3829] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Tours</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Overview & Highlights */}
          <div className="lg:col-span-8 space-y-10">
            {/* Tour Featured Image from WordPress */}
            {tour.featuredImage && (
              <div className="relative h-64 sm:h-80 md:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border border-[#E7E0D5]">
                <img
                  src={tour.featuredImage}
                  alt={tour.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {/* Overview Card */}
            <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7E0D5] space-y-4">
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#1C3829] pb-4 border-b border-[#E7E0D5]">
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-[#C5A880]" />
                  <span>{tour.durationLabel}</span>
                </span>
              </div>
              <p className="text-base text-[#4A554F] font-light leading-relaxed whitespace-pre-line">
                {tour.longDescription}
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
                  Tour Focus
                </span>
                <h3 className="font-luxury-serif text-3xl font-bold text-[#1C3829]">
                  Experience Highlights
                </h3>
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } }
                }}
              >
                {(tour.highlights || []).map((highlight, i) => (
                  <motion.div 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
                    }}
                    whileHover={{ scale: 1.015, backgroundColor: "#FAF8F5", borderColor: "#C5A880" }}
                    className="flex items-start space-x-4 p-5 rounded-2xl bg-[#F2EDE4] border border-[#E7E0D5] transition-colors cursor-default"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1C3829] flex items-center justify-center shrink-0 shadow-md">
                      <Star className="w-4 h-4 text-[#C5A880]" />
                    </div>
                    <p className="text-sm text-[#4A554F] font-medium leading-relaxed pt-1">
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right: Booking Card with Options */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7E0D5] shadow-xl space-y-8">
                
                {/* Options List */}
                <div className="space-y-6">
                  {(tour.options || []).map((option, idx) => (
                    <div key={idx} className="space-y-3 pb-6 border-b border-[#E7E0D5] last:border-0 last:pb-0">
                      <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                        {option.title}
                      </h4>
                      <ul className="space-y-2 text-xs text-[#68726B]">
                        {(option.details || []).map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/85570247282?text=${encodeURIComponent(`Hello Le Vert Angkor Hotel, I would like to book the "${tour.title}". Please share availability and pricing. Thank you!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-[#1C3829] text-[#FAF8F5] font-semibold text-xs uppercase tracking-widest hover:bg-[#12241A] transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Reserve This Tour</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
