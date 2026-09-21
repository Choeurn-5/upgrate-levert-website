import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ChevronDown, Sparkles, Image as ImageIcon } from 'lucide-react';
import { HeroConfig } from '../types';

interface HeroProps {
  config: HeroConfig;
  heightClass?: string;
  onPrimaryClick?: () => void;
  primaryButtonText?: string;
  onSecondaryClick?: () => void;
  secondaryButtonText?: string;
  onOpenHeroManager?: () => void;
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  heightClass = 'min-h-[70vh] md:min-h-[82vh]',
  onPrimaryClick,
  primaryButtonText = 'Reserve Your Stay',
  onSecondaryClick,
  secondaryButtonText,
  onOpenHeroManager,
  children,
}) => {
  return (
    <section className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden bg-[#12241A]`}>
      {/* Background Image with Ambient Slow Motion Zoom */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img
          src={config.imageUrl}
          alt={config.title}
          className="w-full h-full object-cover object-center filter brightness-95"
        />
        {/* Multilayer Luxury Gradient Overlay for pristine contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12241A] via-[#12241A]/50 to-[#12241A]/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#12241A]/30 to-[#12241A]/80" />
      </motion.div>

      {/* Temporary Hero Indicator (Satisfies brief's requirement to clearly identify replaceable hero asset) */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={onOpenHeroManager}
          className="group inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-[11px] text-white/80 transition-all"
          title={config.imagePlaceholderNote}
        >
          <ImageIcon className="w-3 h-3 text-[#C5A880] group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline font-mono text-[10px] tracking-wider uppercase">
            Hero Placeholder • Edit
          </span>
        </button>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-[#FAF8F5]">
        {/* Eyebrow / Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A880]/40 text-[#DFCAA8] text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{config.eyebrow}</span>
        </motion.div>

        {/* Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-luxury-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#FAF8F5] max-w-4xl mx-auto leading-[1.1] mb-6 drop-shadow-sm"
        >
          {config.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-[#FAF8F5]/90 max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          {config.subtitle}
        </motion.p>

        {/* Call to Actions */}
        {(onPrimaryClick || onSecondaryClick) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {onPrimaryClick && (
              <button
                onClick={onPrimaryClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-full bg-[#C5A880] text-[#12241A] font-semibold text-xs uppercase tracking-widest hover:bg-[#DFCAA8] hover:shadow-lg transition-all duration-300 active:scale-95 shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#12241A]" />
                <span>{primaryButtonText}</span>
              </button>
            )}

            {onSecondaryClick && secondaryButtonText && (
              <button
                onClick={onSecondaryClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/30 backdrop-blur-sm font-semibold text-xs uppercase tracking-widest transition-all duration-300"
              >
                <span>{secondaryButtonText}</span>
              </button>
            )}
          </motion.div>
        )}

        {/* Optional embedded children (such as booking bar) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Decorative Bottom Curve / Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/50 animate-bounce pointer-events-none hidden sm:block">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};
