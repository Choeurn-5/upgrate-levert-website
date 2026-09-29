import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Utensils,
  Calendar,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Search,
  Coffee,
  Sun,
  Moon,
  Eye,
  FileText,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, AppRoute, DiningExperience } from '../types';
import {
  DINING_EXPERIENCES,
  RESTAURANT_MENU_ARTBOARDS,
  FULL_RESTAURANT_MENU_SECTIONS,
  DiningArtboard,
} from '../data/hotelData';
import { SITE_SETTINGS } from '../lib/site-settings';

interface DiningViewProps {
  heroConfig: HeroConfig;
  diningExperiences?: DiningExperience[];
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
  onOpenHeroManager: () => void;
}

export const DiningView: React.FC<DiningViewProps> = ({
  heroConfig,
  diningExperiences = DINING_EXPERIENCES,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  // Active artboard for the lightbox modal
  const [selectedArtboardIndex, setSelectedArtboardIndex] = useState<number | null>(null);

  // Digital menu filtering
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active view mode for the menu: 'artboards' or 'digital'
  const [menuViewMode, setMenuViewMode] = useState<'artboards' | 'digital'>('artboards');

  // Filtered menu items
  const allMenuItems = React.useMemo(() => {
    return FULL_RESTAURANT_MENU_SECTIONS.flatMap((sec) =>
      sec.items.map((item) => ({ ...item, category: sec.category }))
    );
  }, []);

  const filteredMenuItems = React.useMemo(() => {
    return allMenuItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'starter' && item.category === 'Starter') ||
        (activeCategory === 'soup' && item.category === 'Main Course: Soup') ||
        (activeCategory === 'stirfried' && item.category === 'Main Course: Stir Fried') ||
        (activeCategory === 'western' && item.category === 'Western Food') ||
        (activeCategory === 'dessert' && item.category === 'Dessert');

      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.code && item.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allMenuItems, activeCategory, searchQuery]);

  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Cinematic Hero with Authentic Restaurant Photos */}
      <Hero
        config={heroConfig}
        onPrimaryClick={onOpenBooking}
        primaryButtonText="Reserve a Dining Table"
        onSecondaryClick={() => window.open(SITE_SETTINGS.whatsappUrl, '_blank', 'noopener,noreferrer')}
        secondaryButtonText="WhatsApp Inquiries"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Signature Divider matching CMS (100% elementor divider) */}
      <div className="pt-16 pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center justify-center space-x-3 text-[#C5A880] mb-4">
          <span className="h-px w-12 sm:w-20 bg-[#C5A880]/60" />
          <span className="text-xs uppercase font-serif tracking-[0.3em] font-semibold text-[#1C3829]">
            dining
          </span>
          <span className="h-px w-12 sm:w-20 bg-[#C5A880]/60" />
        </div>
        <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829] leading-tight">
          Authentic Culinary Arts &amp; Khmer Flavors
        </h2>
        <p className="text-sm sm:text-base text-[#555F59] font-light mt-4 max-w-2xl mx-auto leading-relaxed">
          Welcome to Le Vert Restaurant. Savor classical Cambodian specialties and Western comfort dishes prepared fresh with locally sourced ingredients, handcrafted beverages, and personalized hospitality.
        </p>
      </div>

      {/* 3. The Signature Dining Venue: Le Vert Restaurant */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#F4EFE6]/60 p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#E7E0D5] shadow-sm hover:shadow-xl transition-all"
        >
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96 w-full bg-stone-200">
            <img
              src="https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/0D9A3910-2048x1366.jpg"
              alt="LE VERT RESTAURANT"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#1C3829]/90 backdrop-blur-md text-[#DFCAA8] text-xs font-semibold tracking-wide border border-[#C5A880]/30 shadow">
                Ground Floor &amp; Garden Terrace
              </span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-sm text-[#1C3829] text-xs font-bold shadow flex items-center space-x-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>All-Day Dining</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-left">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C5A880] block mb-1">
                Authentic Cambodian &amp; Western
              </span>
              <h3 className="font-luxury-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C3829] leading-tight">
                LE VERT RESTAURANT
              </h3>
            </div>

            {/* Exact CMS Text */}
            <div className="space-y-4 text-sm sm:text-base text-[#4A554F] font-light leading-relaxed">
              <p className="text-base sm:text-lg text-[#1C3829] font-normal leading-relaxed">
                All day dining restaurant and sample authentic Cambodian-style combine with western meals. A la carte menu for breakfast, lunch and dinner.
              </p>
            </div>

            {/* 3 Service Blocks from CMS */}
            <div className="space-y-2.5 pt-1">
              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0D5] flex items-start space-x-3 text-left">
                <div className="p-2 rounded-xl bg-[#2D5540]/10 text-[#2D5540] shrink-0 mt-0.5">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1C3829] flex items-center space-x-2">
                    <span>*Breakfast</span>
                    <span className="text-[11px] font-mono font-medium text-[#C5A880]">06:30 – 10:00 hours</span>
                  </div>
                  <p className="text-xs text-[#555F59] mt-0.5 leading-relaxed font-light">
                    It will be served either ala carte or buffet mixed Asian and Western.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0D5] flex items-start space-x-3 text-left">
                <div className="p-2 rounded-xl bg-[#2D5540]/10 text-[#2D5540] shrink-0 mt-0.5">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1C3829] flex items-center space-x-2">
                    <span>*Lunch</span>
                    <span className="text-[11px] font-mono font-medium text-[#C5A880]">11:30 – 15:00 hours</span>
                  </div>
                  <p className="text-xs text-[#555F59] mt-0.5 leading-relaxed font-light">
                    Served for all Asian and Western set menu and ala carte order.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-white/80 rounded-2xl border border-[#E7E0D5] flex items-start space-x-3 text-left">
                <div className="p-2 rounded-xl bg-[#2D5540]/10 text-[#2D5540] shrink-0 mt-0.5">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1C3829] flex items-center space-x-2">
                    <span>*Dinner</span>
                    <span className="text-[11px] font-mono font-medium text-[#C5A880]">16:30 – 22:00 hours</span>
                  </div>
                  <p className="text-xs text-[#555F59] mt-0.5 leading-relaxed font-light">
                    Served for all Asian and Western set menu and ala carte order.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center space-x-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Reserve a Table</span>
              </button>
              <a
                href={SITE_SETTINGS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full border border-[#1C3829]/25 hover:bg-[#1C3829]/10 text-[#1C3829] text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Restaurant</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. "Our Menu" Section (Exact Heading from CMS with Artboards & Interactive Catalog) */}
      <section className="py-16 sm:py-24 bg-[#F2EDE4] border-t border-[#E7E0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-1">
              Culinary Collection
            </span>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1C3829]">
              Our Menu
            </h2>
            <p className="text-sm sm:text-base text-[#555F59] font-light mt-3 max-w-2xl mx-auto leading-relaxed">
              Explore our complete hotel dining menu featuring 43 handcrafted dishes across authentic Cambodian specialties, fresh starters, Western classics, and desserts.
            </p>

            {/* View Mode Switcher */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <div className="inline-flex p-1 rounded-full bg-[#E5DEC9] border border-[#D5CCA3]/50 shadow-inner">
                <button
                  onClick={() => setMenuViewMode('artboards')}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2 ${
                    menuViewMode === 'artboards'
                      ? 'bg-[#1C3829] text-[#FAF8F5] shadow-md'
                      : 'text-[#4A554F] hover:text-[#1C3829]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Official Menu Sheets (4 Pages)</span>
                </button>
                <button
                  onClick={() => setMenuViewMode('digital')}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-2 ${
                    menuViewMode === 'digital'
                      ? 'bg-[#1C3829] text-[#FAF8F5] shadow-md'
                      : 'text-[#4A554F] hover:text-[#1C3829]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Digital Dish Directory</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mode A: Official Menu Sheets (The 4 CMS Artboards with Click-to-Zoom) */}
          {menuViewMode === 'artboards' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {RESTAURANT_MENU_ARTBOARDS.map((artboard, index) => (
                  <motion.div
                    key={artboard.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setSelectedArtboardIndex(index)}
                    className="group relative cursor-pointer bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-stone-800 hover:border-[#C5A880]"
                  >
                    <div className="relative aspect-[1080/771] w-full overflow-hidden bg-black">
                      <img
                        src={artboard.imageUrl}
                        alt={artboard.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <div className="flex items-center justify-between text-white">
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-[#DFCAA8] uppercase">
                              Page {artboard.pageNumber} of 4
                            </span>
                            <h4 className="font-luxury-serif text-xl sm:text-2xl font-bold text-white">
                              {artboard.title}
                            </h4>
                            <p className="text-xs text-stone-300 mt-1">
                              {artboard.subtitle}
                            </p>
                          </div>
                          <div className="p-3 rounded-full bg-[#C5A880] text-[#1C3829] shadow-lg">
                            <Maximize2 className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Default Badge */}
                      <div className="absolute top-4 left-4 group-hover:opacity-0 transition-opacity">
                        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#DFCAA8] text-xs font-semibold tracking-wide border border-[#C5A880]/30 shadow">
                          Page {artboard.pageNumber}: {artboard.title}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#141414] border-t border-stone-800 flex items-center justify-between text-left">
                      <div>
                        <span className="text-[10px] font-semibold tracking-wider text-[#C5A880] uppercase block">
                          Menu Sheet {artboard.pageNumber}
                        </span>
                        <div className="text-xs font-bold text-[#FAF8F5]">
                          {artboard.title}
                        </div>
                      </div>
                      <span className="text-[11px] text-stone-400 font-light flex items-center space-x-1 group-hover:text-[#C5A880] transition-colors">
                        <span>Click to view full size</span>
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Note below artboards */}
              <div className="p-4 rounded-2xl bg-white/70 border border-[#E7E0D5] text-center max-w-xl mx-auto text-xs text-[#555F59]">
                💡 <span className="font-semibold text-[#1C3829]">Tip:</span> Click any menu sheet above to open the full-screen interactive reader with high-resolution details.
              </div>
            </motion.div>
          )}

          {/* Mode B: Digital Interactive Directory */}
          {menuViewMode === 'digital' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Category Filter Pills & Search */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-[#E8E1D5] border border-[#DDD4C5]">
                  {[
                    { id: 'all', label: 'All Items (43)' },
                    { id: 'starter', label: 'Starters (A01–A11)' },
                    { id: 'soup', label: 'Soups (A12–A18)' },
                    { id: 'stirfried', label: 'Stir Fried (A19–A26)' },
                    { id: 'western', label: 'Western Food (A27–A39)' },
                    { id: 'dessert', label: 'Desserts (A40–A43)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                        activeCategory === tab.id
                          ? 'bg-[#1C3829] text-[#FAF8F5] shadow-sm'
                          : 'text-[#4A554F] hover:text-[#1C3829]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Quick Search */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-[#8C9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes or ingredients..."
                    className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#E7E0D5] text-xs text-[#1C3829] placeholder-[#8C9690] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Dish Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenuItems.map((item, idx) => (
                  <motion.div
                    key={`${item.code}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: (idx % 6) * 0.05 }}
                    className="bg-[#FAF8F5] rounded-3xl p-6 border border-[#E7E0D5] hover:border-[#C5A880] shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center space-x-2">
                          {item.code && (
                            <span className="px-2.5 py-0.5 rounded-md bg-[#1C3829] text-[#DFCAA8] text-[11px] font-mono font-bold tracking-wider">
                              {item.code}
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-semibold text-[#8C9690] tracking-wider">
                            {item.category}
                          </span>
                        </div>
                        <span className="font-luxury-serif text-lg font-bold text-[#1C3829] shrink-0">
                          {item.price}
                        </span>
                      </div>

                      <h4 className="font-luxury-serif text-xl font-bold text-[#1C3829] leading-snug">
                        {item.name}
                      </h4>

                      <p className="text-xs text-[#555F59] font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E7E0D5]/70 flex items-center justify-between">
                      {item.tag ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#C5A880]/20 text-[#8B6E3F] text-[10px] font-semibold uppercase tracking-wider">
                          ★ {item.tag}
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#8C9690]">Fresh Daily</span>
                      )}
                      <button
                        onClick={onOpenBooking}
                        className="text-xs font-semibold text-[#1C3829] hover:text-[#C5A880] transition-colors flex items-center space-x-1"
                      >
                        <span>Order in Room</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredMenuItems.length === 0 && (
                <div className="py-16 text-center text-stone-500 space-y-2">
                  <p className="text-base font-medium">No dishes found matching your search.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="text-xs text-[#1C3829] font-semibold underline underline-offset-4"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* 5. In-Room Balcony Dining Callout */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1C3829] to-[#264D38] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DFCAA8] block">
              Personalized In-Suite Service
            </span>
            <h3 className="font-luxury-serif text-2xl sm:text-3xl lg:text-4xl font-bold">
              Private Balcony &amp; In-Room Dining
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-2xl leading-relaxed">
              Every dish from our à la carte and set menus can be delivered directly to your room or private balcony. Savor hot Khmer curries or crisp gourmet sandwiches in utmost serenity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#DFCAA8] hover:bg-[#D0B790] text-[#1C3829] text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              Order with Concierge
            </button>
            <a
              href={SITE_SETTINGS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/30 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>

      {/* Fullscreen Artboard Lightbox Modal */}
      <AnimatePresence>
        {selectedArtboardIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between text-white z-10">
              <div className="text-left">
                <span className="text-xs font-mono text-[#DFCAA8] uppercase tracking-wider">
                  Page {selectedArtboardIndex + 1} of {RESTAURANT_MENU_ARTBOARDS.length}
                </span>
                <h4 className="font-luxury-serif text-lg sm:text-xl font-bold text-white">
                  {RESTAURANT_MENU_ARTBOARDS[selectedArtboardIndex].title}
                </h4>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href={RESTAURANT_MENU_ARTBOARDS[selectedArtboardIndex].imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition-colors flex items-center space-x-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open Original</span>
                </a>
                <button
                  onClick={() => setSelectedArtboardIndex(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Image View */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
              <motion.img
                key={selectedArtboardIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={RESTAURANT_MENU_ARTBOARDS[selectedArtboardIndex].imageUrl}
                alt={RESTAURANT_MENU_ARTBOARDS[selectedArtboardIndex].title}
                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
              />

              {/* Prev Button */}
              {selectedArtboardIndex > 0 && (
                <button
                  onClick={() => setSelectedArtboardIndex(selectedArtboardIndex - 1)}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#1C3829] text-white border border-white/20 transition-all shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {selectedArtboardIndex < RESTAURANT_MENU_ARTBOARDS.length - 1 && (
                <button
                  onClick={() => setSelectedArtboardIndex(selectedArtboardIndex + 1)}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#1C3829] text-white border border-white/20 transition-all shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Thumbnail Bar */}
            <div className="flex justify-center items-center gap-2 overflow-x-auto py-2 z-10">
              {RESTAURANT_MENU_ARTBOARDS.map((ab, idx) => (
                <button
                  key={ab.id}
                  onClick={() => setSelectedArtboardIndex(idx)}
                  className={`relative w-16 sm:w-20 aspect-[1080/771] rounded-lg overflow-hidden border-2 transition-all ${
                    selectedArtboardIndex === idx
                      ? 'border-[#C5A880] scale-105 shadow-md'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={ab.imageUrl} alt={ab.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
