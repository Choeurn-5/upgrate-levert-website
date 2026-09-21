import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Sparkles, Navigation } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, AppRoute } from '../types';
import { SITE_SETTINGS } from '../lib/site-settings';

interface ContactViewProps {
  heroConfig: HeroConfig;
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
  onOpenHeroManager: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  heroConfig,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Room Reservation Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      {/* 1. Replaceable Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={onOpenBooking}
        primaryButtonText="Book Direct Online"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Contact Cards & Inquiry Form */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Walking Guide */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
                Hospitality Concierge
              </span>
              <h2 className="font-luxury-serif text-3xl sm:text-4xl font-semibold text-[#1C3829]">
                We Are Here to Assist Your Siem Reap Journey
              </h2>
              <p className="text-sm text-[#4A554F] font-light leading-relaxed">
                Whether you need assistance with airport transfers, special anniversary arrangements, or temple pass questions, our front desk is available around the clock.
              </p>
            </div>

            {/* Direct Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-[#E7E0D5] shadow-sm space-y-6">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-2xl bg-[#1C3829] text-[#DFCAA8] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                    Property Location
                  </h4>
                  <p className="text-xs text-[#4A554F] mt-0.5 leading-relaxed">
                    {SITE_SETTINGS.address}
                  </p>
                  <p className="text-[11px] text-[#C5A880] font-semibold mt-1 flex items-center space-x-1">
                    <Navigation className="w-3 h-3" />
                    <span>150 meters (2-minute walk) to Old Market & Pub Street</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-2xl bg-[#1C3829] text-[#DFCAA8] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                    Telephone & Front Desk
                  </h4>
                  <a
                    href={`tel:${SITE_SETTINGS.phoneClean}`}
                    className="text-xs text-[#4A554F] hover:text-[#1C3829] font-medium block mt-0.5"
                  >
                    {SITE_SETTINGS.phone}
                  </a>
                  <span className="text-[10px] text-[#68726B]">24-Hour Attentive Concierge</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-2xl bg-[#1C3829] text-[#DFCAA8] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829]">
                    Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${SITE_SETTINGS.email}`}
                    className="text-xs text-[#4A554F] hover:text-[#1C3829] font-medium block mt-0.5"
                  >
                    {SITE_SETTINGS.email}
                  </a>
                  <span className="text-[10px] text-[#68726B]">Direct response within 2 hours</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action */}
            <div className="p-6 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#1C3829]">
                  Chat on WhatsApp Concierge
                </h4>
                <p className="text-xs text-[#68726B]">
                  Instant mobile messaging with front office
                </p>
              </div>
              <a
                href={SITE_SETTINGS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Start Chat</span>
              </a>
            </div>
          </div>

          {/* Right: Working Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#E7E0D5] shadow-lg">
              <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829] mb-2">
                Send an Inquiry or Special Request
              </h3>
              <p className="text-xs sm:text-sm text-[#68726B] font-light mb-8">
                Please provide your details below and our reservations team will get back to you promptly.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-[#1C3829]">
                    <CheckCircle2 className="w-10 h-10 text-[#1C3829]" />
                  </div>
                  <h4 className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A554F] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your message regarding "<em>{subject}</em>" has been securely delivered to <strong>reservation@levertangkorhotel.com</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#1C3829] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#12241A] transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Catherine Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. catherine@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 555 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                        Subject
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                      >
                        <option value="Room Reservation Inquiry">Room Reservation Inquiry</option>
                        <option value="Angkor Temple Tour Arrangements">Angkor Temple Tour Arrangements</option>
                        <option value="Airport Transfer Assistance">Airport Transfer Assistance</option>
                        <option value="Rooftop Dining & Event">Rooftop Dining & Event</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-1">
                      Message / Special Requests *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please tell us about your dates, number of guests, or any specific preferences..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E7E0D5] bg-white text-sm text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#1C3829] text-[#FAF8F5] font-semibold text-xs uppercase tracking-widest hover:bg-[#12241A] transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4 text-[#C5A880]" />
                      <span>Transmit Message to Reservations</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 3. Embedded Google Map Section */}
        <div className="mt-20 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A880]">
                Map & Surroundings
              </span>
              <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
                Find Le Vert Angkor Hotel
              </h3>
            </div>
            <a
              href="https://maps.app.goo.gl/LeVertAngkorHotel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#1C3829] hover:underline uppercase tracking-wider flex items-center space-x-1"
            >
              <span>Open in Google Maps</span>
              <Navigation className="w-3.5 h-3.5 text-[#C5A880]" />
            </a>
          </div>

          <div className="h-96 rounded-3xl overflow-hidden border border-[#E7E0D5] shadow-lg bg-stone-200">
            <iframe
              title="Le Vert Angkor Hotel Location"
              src={SITE_SETTINGS.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
