import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, BedDouble, ShieldCheck, CheckCircle2, Phone, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import { SITE_SETTINGS } from '../lib/site-settings';
import { ROOMS_DATA } from '../data/hotelData';
import { Room } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferredRoom?: string;
  selectedRoomSlug?: string;
  rooms?: Room[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preferredRoom = 'le-vert-suite',
  selectedRoomSlug,
  rooms = ROOMS_DATA,
}) => {
  const initialRoom = selectedRoomSlug || preferredRoom || 'le-vert-suite';
  const [activeTab, setActiveTab] = useState<'instant' | 'concierge'>('instant');
  const [selectedRoom, setSelectedRoom] = useState(initialRoom);

  React.useEffect(() => {
    if (isOpen) {
      if (selectedRoomSlug) setSelectedRoom(selectedRoomSlug);
      else if (preferredRoom) setSelectedRoom(preferredRoom);
      setIsSubmitted(false);
    }
  }, [isOpen, selectedRoomSlug, preferredRoom]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [airportPickup, setAirportPickup] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkout = new Date();
  checkout.setDate(checkout.getDate() + 4);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(checkout));
  const [guests, setGuests] = useState(2);

  const selectedRoomObj = rooms.find((r) => r.slug === selectedRoom) || rooms[0] || ROOMS_DATA[0];

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E7E0D5] overflow-hidden z-10 my-8 text-[#1E2522]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Banner */}
          <div className="bg-[#1C3829] text-[#FAF8F5] p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#FAF8F5]/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-[#C5A880] text-xs font-semibold tracking-widest uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Reservation Portal</span>
            </div>
            <h3 className="font-luxury-serif text-2xl sm:text-3xl font-semibold text-[#FAF8F5]">
              Reserve Your Stay at Le Vert Angkor
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 mt-1 font-light">
              Guaranteed lowest rates, complimentary airport pick-up & breakfast included.
            </p>

            {/* Tab switch */}
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => setActiveTab('instant')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'instant'
                    ? 'bg-[#C5A880] text-[#12241A] shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Instant Booking Engine
              </button>
              <button
                onClick={() => setActiveTab('concierge')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'concierge'
                    ? 'bg-[#C5A880] text-[#12241A] shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Concierge Inquiry / WhatsApp
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {activeTab === 'instant' ? (
              <div className="space-y-6">
                {/* Room Preview Card */}
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#F2EDE4] border border-[#E7E0D5]">
                  <img
                    src={selectedRoomObj.featuredImage}
                    alt={selectedRoomObj.title}
                    className="w-full sm:w-32 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 text-left w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#68726B] uppercase font-semibold tracking-wider">
                        Selected Suite
                      </span>
                      <span className="text-sm font-semibold text-[#1C3829]">
                        from ${selectedRoomObj.pricePerNight} / night
                      </span>
                    </div>
                    <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                      {selectedRoomObj.title}
                    </h4>
                    <p className="text-xs text-[#68726B] line-clamp-1">
                      {selectedRoomObj.bedType} • {selectedRoomObj.sizeSqm} m² • Private Balcony
                    </p>
                  </div>
                </div>

                {/* Direct Benefits Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-900/10 text-xs text-[#1C3829]">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5540]" />
                    <span>Free Airport Transfer (Arrival)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5540]" />
                    <span>Daily Gourmet Breakfast Included</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5540]" />
                    <span>15% Spa Discount Voucher</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5540]" />
                    <span>Free Cancellation Available</span>
                  </div>
                </div>

                {/* Launch Button to Official Booking Engine */}
                <div className="space-y-3 pt-2">
                  <a
                    href={SITE_SETTINGS.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl bg-[#1C3829] text-[#FAF8F5] font-semibold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-[#12241A] transition-colors shadow-lg active:scale-95 text-center"
                  >
                    <span>Proceed to Inn-Connect Booking Engine</span>
                    <ExternalLink className="w-4 h-4 text-[#C5A880]" />
                  </a>

                  <div className="flex items-center justify-center space-x-3 text-xs text-[#68726B]">
                    <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                    <span>Instant Confirmation • Official Hotel Partner</span>
                  </div>
                </div>

                {/* Quick WhatsApp Alternative */}
                <div className="pt-4 border-t border-[#E7E0D5] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#1C3829]">
                      Prefer chatting directly with our Front Desk?
                    </p>
                    <p className="text-[11px] text-[#68726B]">
                      Instant response via WhatsApp concierge
                    </p>
                  </div>
                  <a
                    href={SITE_SETTINGS.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : isSubmitted ? (
              /* Concierge Submission Confirmation */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-[#1C3829]">
                  <CheckCircle2 className="w-10 h-10 text-[#1C3829]" />
                </div>
                <h4 className="font-luxury-serif text-2xl font-semibold text-[#1C3829]">
                  Reservation Request Received
                </h4>
                <p className="text-sm text-[#4A554F] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName || 'valued guest'}</strong>! Our reservation manager at Le Vert Angkor Hotel has received your inquiry for the <strong>{selectedRoomObj.title}</strong> and will contact you at <strong>{email}</strong> within 2 hours with your tailored confirmation and direct booking perk details.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-[#1C3829] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#12241A] transition-colors"
                  >
                    Done & Return to Site
                  </button>
                </div>
              </div>
            ) : (
              /* Concierge Form */
              <form onSubmit={handleConciergeSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                      Check-In Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                      Check-Out Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                      Preferred Room / Suite
                    </label>
                    <select
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                    >
                      {ROOMS_DATA.map((r) => (
                        <option key={r.slug} value={r.slug}>
                          {r.title} (${r.pricePerNight}/night)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Guests</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 555 019 2834"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                  />
                </div>

                <div className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    id="pickup"
                    checked={airportPickup}
                    onChange={(e) => setAirportPickup(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1C3829] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="pickup" className="text-xs text-[#1C3829] font-medium cursor-pointer">
                    Request Complimentary Airport Pick-Up (Flight details can be provided later)
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                    Special Inquiries / Temple Tour Interest
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any dietary preferences, early check-in, or temple tour arrangements..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#1C3829] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider hover:bg-[#12241A] transition-colors shadow-md"
                  >
                    Submit Concierge Reservation Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
