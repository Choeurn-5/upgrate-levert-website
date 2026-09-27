import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from 'lucide-react';
import { HeroConfig } from '../types';

interface HeroProps {
  config: HeroConfig;
  slides?: string[];
  heightClass?: string;
  onPrimaryClick?: () => void;
  primaryButtonText?: string;
  onSecondaryClick?: () => void;
  secondaryButtonText?: string;
  onOpenHeroManager?: () => void;
  children?: React.ReactNode;
}

const SCENE_NAMES = [
  'Sanctuary Oasis',
  'Tropical Pool & Garden',
  'Artisan Suite Elegance',
  'Boutique Architecture',
  'Warm Khmer Welcome',
];

export const Hero: React.FC<HeroProps> = ({
  config,
  slides,
  heightClass = 'min-h-[75vh] md:min-h-[85vh]',
  onPrimaryClick,
  primaryButtonText = 'Reserve Your Stay',
  onSecondaryClick,
  secondaryButtonText,
  children,
}) => {
  // Determine slide images
  const slideList =
    slides && slides.length > 0
      ? slides
      : config.images && config.images.length > 0
      ? config.images
      : [config.imageUrl];

  const isSlideshow = slideList.length > 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 6000; // 6 seconds per slide
  const TICK_INTERVAL = 50; // Progress interval in ms

  // Preload all slides in background cache
  useEffect(() => {
    slideList.forEach((src) => {
      if (typeof window !== 'undefined') {
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [slideList]);

  // Autoplay timer and smooth progress calculation
  useEffect(() => {
    if (!isSlideshow || !isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextVal = prev + (TICK_INTERVAL / SLIDE_DURATION) * 100;
        if (nextVal >= 100) {
          setCurrentIndex((idx) => (idx + 1) % slideList.length);
          return 0;
        }
        return nextVal;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [isSlideshow, isPlaying, isHovered, slideList.length]);

  const handleNext = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % slideList.length);
  }, [slideList.length]);

  const handlePrev = useCallback(() => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + slideList.length) % slideList.length);
  }, [slideList.length]);

  const handleSelectSlide = (index: number) => {
    setProgress(0);
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isSlideshow) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSlideshow, handlePrev, handleNext]);

  // Touch Swipe Handling for Mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`group relative w-full ${heightClass} flex items-center justify-center overflow-hidden bg-[#12241A] select-none`}
    >
      {/* Background Slideshow Layer with Ken Burns Motion and Cross-Fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slideList.map((imgUrl, index) => {
          const isActive = index === currentIndex;
          return (
            <motion.div
              key={imgUrl}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.05 : 1.0,
              }}
              transition={{
                opacity: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
                scale: { duration: 8, ease: 'easeOut' },
              }}
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: isActive ? 1 : 0 }}
            >
              <img
                src={imgUrl}
                alt={`${config.title} - Scene ${index + 1}`}
                className="w-full h-full object-cover object-center filter brightness-100 contrast-[1.01]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </motion.div>
          );
        })}

        {/* Balanced slight luxury overlay: keeps images vibrant and clear while ensuring crisp text contrast */}
        <div className="absolute inset-0 z-[1] bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#12241A]/60 via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* Large Screen Lateral Floating Arrow Chevrons - Frosted glass styling */}
      {isSlideshow && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-13 lg:h-13 rounded-full items-center justify-center bg-white/20 hover:bg-white/35 text-white backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl opacity-0 group-hover:opacity-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 drop-shadow" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 lg:w-13 lg:h-13 rounded-full items-center justify-center bg-white/20 hover:bg-white/35 text-white backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl opacity-0 group-hover:opacity-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 drop-shadow" />
          </button>
        </>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-[#FAF8F5]">
        {/* Eyebrow / Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-[#C5A880]/50 text-[#DFCAA8] text-xs font-semibold tracking-[0.25em] uppercase mb-6 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{config.eyebrow}</span>
        </motion.div>

        {/* Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-luxury-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]"
        >
          {config.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-[#FAF8F5] max-w-2xl mx-auto font-normal leading-relaxed mb-10 drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]"
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
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-full bg-[#C5A880] text-[#12241A] font-semibold text-xs uppercase tracking-widest hover:bg-[#DFCAA8] hover:shadow-xl transition-all duration-300 active:scale-95 shadow-lg cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#12241A]" />
                <span>{primaryButtonText}</span>
              </button>
            )}

            {onSecondaryClick && secondaryButtonText && (
              <button
                onClick={onSecondaryClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-[#FAF8F5] border border-white/40 backdrop-blur-md font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
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

      {/* State-of-the-Art Luxury Slideshow Navigation Dock - Luminous Frosted Glass */}
      {isSlideshow && (
        <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5 sm:space-x-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/35 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300">
          {/* Prev button */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-1 sm:p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Slide Index & Scene Name */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs font-medium tracking-wider text-white drop-shadow-sm">
            <span className="font-serif font-bold text-[#FAF8F5]">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/50">/</span>
            <span className="text-white/80">
              {String(slideList.length).padStart(2, '0')}
            </span>
            {SCENE_NAMES[currentIndex] && (
              <span className="hidden lg:inline-block pl-2.5 border-l border-white/30 text-[11px] text-[#FAF8F5] tracking-widest uppercase font-serif">
                {SCENE_NAMES[currentIndex]}
              </span>
            )}
          </div>

          {/* Modern Slim Progress Capsules */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 px-1">
            {slideList.map((_, idx) => {
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="group relative h-1 sm:h-1.5 w-6 sm:w-9 rounded-full bg-white/35 overflow-hidden transition-all hover:bg-white/55 cursor-pointer"
                >
                  <div
                    className={`h-full rounded-full transition-all duration-100 ${
                      isCurrent
                        ? 'bg-[#C5A880] shadow-[0_0_8px_#C5A880]'
                        : idx < currentIndex
                        ? 'bg-white/80'
                        : 'bg-transparent'
                    }`}
                    style={{
                      width: isCurrent ? `${progress}%` : undefined,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Play/Pause Toggle */}
          <button
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="p-1 sm:p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-white/90" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white" />
            )}
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="p-1 sm:p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>
      )}
    </section>
  );
};
