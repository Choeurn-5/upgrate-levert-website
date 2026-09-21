import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ArrowRight, ShieldCheck } from 'lucide-react';
import { ROOMS_DATA } from '../data/hotelData';

interface BookingBarProps {
  onSearch: (details: { checkIn: string; checkOut: string; guests: number; roomType: string }) => void;
  className?: string;
}

export const BookingBar: React.FC<BookingBarProps> = ({ onSearch, className = '' }) => {
  // Default to tomorrow and 3 days later
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkout = new Date();
  checkout.setDate(checkout.getDate() + 4);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(checkout));
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, guests, roomType });
  };

  return (
    <div className={`w-full max-w-4xl mx-auto bg-[#FAF8F5] text-[#1E2522] rounded-2xl md:rounded-full p-3 md:p-2.5 shadow-2xl border border-[#E7E0D5] backdrop-blur-md ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
        {/* Check-In */}
        <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-[#E7E0D5]/80 text-left">
          <label className="block text-[10px] uppercase tracking-wider text-[#68726B] font-semibold flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-[#C5A880]" />
            <span>Check-In</span>
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-[#1C3829] focus:outline-none cursor-pointer mt-0.5"
            aria-label="Check-in date"
          />
        </div>

        {/* Check-Out */}
        <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-[#E7E0D5]/80 text-left">
          <label className="block text-[10px] uppercase tracking-wider text-[#68726B] font-semibold flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-[#C5A880]" />
            <span>Check-Out</span>
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-[#1C3829] focus:outline-none cursor-pointer mt-0.5"
            aria-label="Check-out date"
          />
        </div>

        {/* Guests */}
        <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-[#E7E0D5]/80 text-left">
          <label className="block text-[10px] uppercase tracking-wider text-[#68726B] font-semibold flex items-center space-x-1">
            <Users className="w-3 h-3 text-[#C5A880]" />
            <span>Guests</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-transparent text-sm font-medium text-[#1C3829] focus:outline-none cursor-pointer mt-0.5"
            aria-label="Number of guests"
          >
            <option value={1}>1 Guest (Solo Traveler)</option>
            <option value={2}>2 Guests (Couple / Friends)</option>
            <option value={3}>3 Guests (Family)</option>
            <option value={4}>4 Guests (Family Suite)</option>
            <option value={5}>5+ Guests (Group Inquiry)</option>
          </select>
        </div>

        {/* Room Type */}
        <div className="flex-1 px-4 py-2 text-left">
          <label className="block text-[10px] uppercase tracking-wider text-[#68726B] font-semibold flex items-center space-x-1">
            <BedDouble className="w-3 h-3 text-[#C5A880]" />
            <span>Suite Category</span>
          </label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-[#1C3829] focus:outline-none cursor-pointer mt-0.5 truncate"
            aria-label="Suite category"
          >
            <option value="all">All Suites & Rooms</option>
            {ROOMS_DATA.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.title} (from ${r.pricePerNight})
              </option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div className="p-1">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 rounded-xl md:rounded-full bg-[#1C3829] text-[#FAF8F5] hover:bg-[#12241A] font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
          >
            <span>Check Rates</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>
        </div>
      </form>
    </div>
  );
};
