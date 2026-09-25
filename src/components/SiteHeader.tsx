import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Calendar, Menu, X, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { SITE_SETTINGS } from '../lib/site-settings';
import { AppRoute } from '../types';

interface SiteHeaderProps {
  currentRoute?: AppRoute;
  activeRoute?: AppRoute;
  onNavigate: (route: AppRoute, slug?: string) => void;
  onOpenBooking: (preferredRoom?: string) => void;
  onOpenHeroManager?: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentRoute,
  activeRoute,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  const activeCurrentRoute = activeRoute || currentRoute || '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; route: AppRoute }[] = [
    { label: 'Home', route: '/' },
    { label: 'Rooms', route: '/rooms/' },
    { label: 'Tours', route: '/touring/' },
    { label: 'Dining', route: '/dining/' },
    { label: 'Spa', route: '/spa/' },
    { label: 'Gallery', route: '/gallery/' },
    { label: 'Accolades', route: '/awards/' },
    { label: 'Contact', route: '/contact-levertangkorhotel/' },
  ];

  const handleNavClick = (route: AppRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top micro-bar for direct contact & location reassurance */}
      <div className="bg-[#14281D] text-[#DFCAA8] text-xs py-2 px-4 border-b border-[#2D5540]/30 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-[#FAF8F5]/80">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{SITE_SETTINGS.locationSummary}</span>
            </span>
            <span className="text-[#C5A880]/50">•</span>
            <span className="text-[#FAF8F5]/80">
              Direct Booking Benefit: Complimentary Airport Pick-Up & Daily Breakfast
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${SITE_SETTINGS.phoneClean}`}
              className="flex items-center space-x-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{SITE_SETTINGS.phone}</span>
            </a>
            <span className="text-[#C5A880]/40">|</span>
            <button
              onClick={() => handleNavClick('/temple-package/')}
              className="flex items-center space-x-1 text-[#C5A880] hover:underline font-medium"
            >
              <Sparkles className="w-3 h-3" />
              <span>Temple Package Special</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E7E0D5]/80 py-3.5'
            : 'bg-[#FAF8F5]/80 backdrop-blur-sm border-b border-[#E7E0D5]/50 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
            aria-label="Le Vert Angkor Hotel Home"
          >
            <img
              src={SITE_SETTINGS.logoUrl}
              alt="Le Vert Angkor Hotel Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-luxury-serif text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-[#1C3829] leading-none">
                LE VERT ANGKOR
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#68726B] font-medium mt-0.5">
                Hotel • Siem Reap
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive =
                activeCurrentRoute === link.route ||
                (link.route === '/rooms/' && activeCurrentRoute === '/our-room/') ||
                (link.route === '/touring/' && activeCurrentRoute === '/our-tours/');
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide rounded-full transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#1C3829] font-semibold bg-[#2D5540]/10'
                      : 'text-[#4A554F] hover:text-[#1C3829] hover:bg-stone-200/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="headerActiveIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C5A880]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1C3829] text-[#FAF8F5] hover:bg-[#12241A] transition-all duration-200 shadow-sm hover:shadow active:scale-95 border border-[#C5A880]/30"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Book Your Stay</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#1C3829] hover:bg-stone-200/60 lg:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-xs sm:max-w-sm bg-[#FAF8F5] h-full shadow-2xl flex flex-col p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E0D5]">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={SITE_SETTINGS.logoSmallUrl}
                    alt="Logo"
                    className="h-9 w-auto object-contain"
                  />
                  <div>
                    <h3 className="font-luxury-serif text-lg font-semibold text-[#1C3829]">
                      LE VERT ANGKOR
                    </h3>
                    <p className="text-[10px] tracking-widest text-[#68726B] uppercase">
                      Siem Reap • Cambodia
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-stone-600 hover:bg-stone-200 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="py-6 flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeCurrentRoute === link.route;
                  return (
                    <button
                      key={link.route}
                      onClick={() => handleNavClick(link.route)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#1C3829] text-[#FAF8F5]'
                          : 'text-[#2D3748] hover:bg-stone-200/70'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 ${isActive ? 'text-[#C5A880]' : 'text-stone-400'}`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer Actions */}
              <div className="mt-auto pt-6 border-t border-[#E7E0D5] flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#1C3829] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md hover:bg-[#12241A] transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Book Your Stay Direct</span>
                </button>

                <a
                  href={`tel:${SITE_SETTINGS.phoneClean}`}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#E7E0D5] text-[#1C3829] font-medium text-xs flex items-center justify-center space-x-2 hover:bg-stone-100 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Call Us: {SITE_SETTINGS.phone}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
