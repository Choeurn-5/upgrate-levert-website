import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Award, Heart, Sparkles } from 'lucide-react';
import { SITE_SETTINGS } from '../lib/site-settings';
import { AppRoute } from '../types';

interface SiteFooterProps {
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
  onOpenHeroManager?: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  return (
    <footer className="bg-[#12241A] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2D5540]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2D5540]/40">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={SITE_SETTINGS.logoUrl}
                alt="Le Vert Angkor Hotel"
                className="h-12 w-auto object-contain brightness-110"
              />
              <div>
                <span className="font-luxury-serif text-xl font-semibold tracking-wide text-[#FAF8F5] block">
                  LE VERT ANGKOR
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880] block font-medium">
                  Hotel • Siem Reap
                </span>
              </div>
            </div>
            <p className="text-sm text-[#FAF8F5]/75 leading-relaxed font-light">
              An intimate boutique sanctuary offering refined Khmer hospitality, a rooftop pool oasis, and bespoke expeditions to the ancient temples of Angkor.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#2D5540]/50 border border-[#C5A880]/30 text-xs text-[#DFCAA8]">
                <Award className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>TripAdvisor Choice 2026</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-luxury-serif text-lg font-medium text-[#DFCAA8] mb-4 tracking-wider">
              Explore The Hotel
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F5]/80">
              <li>
                <button
                  onClick={() => onNavigate('/rooms/')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Suites & Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/touring/')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Angkor Temple Tours
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/dining/')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Rooftop Pool & Restaurant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/spa/')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Khmer Herbal Spa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/gallery/')}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Visual Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/temple-package/')}
                  className="hover:text-[#C5A880] transition-colors text-[#C5A880] font-medium flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>3-Night Temple Package</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="font-luxury-serif text-lg font-medium text-[#DFCAA8] mb-4 tracking-wider">
              Concierge & Location
            </h4>
            <div className="space-y-3 text-sm text-[#FAF8F5]/80">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {SITE_SETTINGS.address}
                </span>
              </div>
              <div className="text-xs text-[#C5A880] pl-6.5">
                150m to Old Market & Pub Street
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href={`tel:${SITE_SETTINGS.phoneClean}`}
                  className="hover:text-[#C5A880] transition-colors"
                >
                  {SITE_SETTINGS.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a
                  href={`mailto:${SITE_SETTINGS.email}`}
                  className="hover:text-[#C5A880] transition-colors break-all"
                >
                  {SITE_SETTINGS.email}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/contact-levertangkorhotel/')}
                  className="text-xs font-semibold text-[#DFCAA8] hover:text-white uppercase tracking-wider underline underline-offset-4"
                >
                  View Interactive Map & Directions →
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Direct Booking Promise */}
          <div className="bg-[#1C3829]/60 p-5 rounded-2xl border border-[#2D5540]">
            <div className="flex items-center space-x-2 text-[#DFCAA8] mb-2 font-medium text-sm">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Direct Booking Guarantee</span>
            </div>
            <p className="text-xs text-[#FAF8F5]/80 leading-relaxed mb-4">
              Book directly with us for guaranteed lowest rates, priority early check-in, complimentary airport pick-up, and 15% discount on spa treatments.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 rounded-xl bg-[#C5A880] text-[#12241A] font-semibold text-xs uppercase tracking-wider hover:bg-[#DFCAA8] transition-colors shadow-sm"
            >
              Reserve Directly Now
            </button>
            <div className="mt-3 text-[11px] text-[#FAF8F5]/60 text-center">
              Powered by Inn-Connect Engine
            </div>
          </div>
        </div>

        {/* Bottom copyright and metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF8F5]/60 gap-4">
          <div>
            © {new Date().getFullYear()} Le Vert Angkor Hotel. All rights reserved. Siem Reap, Kingdom of Cambodia.
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('/awards/')}
              className="hover:text-[#C5A880] transition-colors"
            >
              Guest Accolades
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('/contact-levertangkorhotel/')}
              className="hover:text-[#C5A880] transition-colors"
            >
              Inquiries
            </button>
            {onOpenHeroManager && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenHeroManager}
                  className="hover:text-[#C5A880] transition-colors text-[#DFCAA8]/80 underline underline-offset-2"
                  title="Configure or swap temporary hero images as requested by the migration brief"
                >
                  Hero Asset Manager
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
