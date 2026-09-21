import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Image as ImageIcon, Sparkles, RefreshCw, Database, CheckCircle2, BedDouble, Compass, Utensils, Heart } from 'lucide-react';
import { HERO_CONFIGS } from '../lib/site-settings';
import { HeroConfig } from '../types';

interface HeroManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePageKey: string;
  currentHero: HeroConfig;
  onUpdateHero: (pageKey: string, newConfig: HeroConfig) => void;
  roomsCount?: number;
  toursCount?: number;
  diningCount?: number;
  spaCount?: number;
  onSyncFromWordPress?: () => void;
  isSyncing?: boolean;
  lastSynced?: Date | null;
}

const PRESET_LIBRARY: { name: string; url: string; theme: string }[] = [
  {
    name: 'Tropical Boutique Sanctuary',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85',
    theme: 'Calm Tropical Oasis',
  },
  {
    name: 'Angkor Wat Dawn Horizon',
    url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=85',
    theme: 'Sunrise Heritage',
  },
  {
    name: 'Serene Luxury Bedroom Suite',
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2000&q=85',
    theme: 'Intimate Suites',
  },
  {
    name: 'Rooftop Horizon Pool & Deck',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=85',
    theme: 'Sky Pool Vista',
  },
  {
    name: 'Candlelit Khmer Dining',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85',
    theme: 'Gastronomy & Lounge',
  },
  {
    name: 'Herbal Wellness & Stone Bath',
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=85',
    theme: 'Spa Serenity',
  },
];

export const HeroManagerModal: React.FC<HeroManagerModalProps> = ({
  isOpen,
  onClose,
  activePageKey,
  currentHero,
  onUpdateHero,
  roomsCount = 6,
  toursCount = 2,
  diningCount = 2,
  spaCount = 6,
  onSyncFromWordPress,
  isSyncing = false,
  lastSynced = null,
}) => {
  const [activeTab, setActiveTab] = useState<'hero' | 'cms'>('hero');
  const [selectedPage, setSelectedPage] = useState(activePageKey);
  const [customUrl, setCustomUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');

  const targetConfig = HERO_CONFIGS[selectedPage] || currentHero;

  const handleSelectPreset = (url: string) => {
    onUpdateHero(selectedPage, {
      ...targetConfig,
      imageUrl: url,
    });
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl) return;
    onUpdateHero(selectedPage, {
      ...targetConfig,
      imageUrl: customUrl,
      title: customTitle || targetConfig.title,
      subtitle: customSubtitle || targetConfig.subtitle,
    });
    setCustomUrl('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E7E0D5] p-6 sm:p-8 text-[#1E2522] my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D5]">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-[#1C3829] text-[#DFCAA8]">
                {activeTab === 'hero' ? <ImageIcon className="w-5 h-5" /> : <Database className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-luxury-serif text-xl font-bold text-[#1C3829]">
                  Hotel Manager & CMS Controls
                </h3>
                <p className="text-xs text-[#68726B]">
                  Le Vert Angkor Hotel • Live Content Management
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-500 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#E7E0D5] mt-4">
            <button
              onClick={() => setActiveTab('hero')}
              className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'hero'
                  ? 'border-[#1C3829] text-[#1C3829]'
                  : 'border-transparent text-[#68726B] hover:text-[#1C3829]'
              }`}
            >
              Hero Photo Customizer
            </button>
            <button
              onClick={() => setActiveTab('cms')}
              className={`flex-1 pb-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center space-x-2 ${
                activeTab === 'cms'
                  ? 'border-[#1C3829] text-[#1C3829]'
                  : 'border-transparent text-[#68726B] hover:text-[#1C3829]'
              }`}
            >
              <span>WordPress Auto-Sync</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          </div>

          {activeTab === 'hero' && (
            <div className="py-5 space-y-6">
              {/* Page Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-2">
                  Select Page Route to Configure Hero:
                </label>
                <select
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E0D5] bg-white text-xs font-medium text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                >
                  <option value="home">Home (/) </option>
                  <option value="rooms">Rooms & Suites (/rooms/)</option>
                  <option value="roomDetail">Room Details (/our-room/[slug]/)</option>
                  <option value="touring">Temple Tours (/touring/)</option>
                  <option value="tourDetail">Tour Details (/our-tours/[slug]/)</option>
                  <option value="dining">Dining & Rooftop (/dining/)</option>
                  <option value="spa">Spa & Wellness (/spa/)</option>
                  <option value="facilities">Swimming Pool (/facilities-levertangkorhotel/)</option>
                  <option value="gallery">Photo Gallery (/gallery/)</option>
                  <option value="contact">Contact (/contact-levertangkorhotel/)</option>
                  <option value="awards">Accolades & Awards (/awards/)</option>
                  <option value="templePackage">Temple Package Special (/temple-package/)</option>
                </select>
              </div>

              {/* Current Hero Preview */}
              <div className="relative rounded-2xl overflow-hidden h-36 border border-[#E7E0D5] bg-stone-100">
                <img
                  src={targetConfig.imageUrl}
                  alt={targetConfig.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/45 p-4 flex flex-col justify-end text-[#FAF8F5]">
                  <span className="text-[10px] tracking-widest uppercase text-[#DFCAA8]">
                    {targetConfig.eyebrow}
                  </span>
                  <h4 className="font-luxury-serif text-lg font-bold text-white">
                    {targetConfig.title}
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-1">
                    {targetConfig.subtitle}
                  </p>
                </div>
              </div>

              {/* Curated Presets Grid */}
              <div>
                <span className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-2">
                  Select a Curated Luxury Preset:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PRESET_LIBRARY.map((preset) => (
                    <button
                      key={preset.url}
                      onClick={() => handleSelectPreset(preset.url)}
                      className={`group relative h-20 rounded-xl overflow-hidden border-2 text-left transition-all ${
                        targetConfig.imageUrl === preset.url
                          ? 'border-[#1C3829] shadow-md scale-98'
                          : 'border-transparent hover:border-[#C5A880]'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 p-2 flex flex-col justify-end text-white">
                        <span className="text-[10px] font-semibold leading-tight drop-shadow">
                          {preset.name}
                        </span>
                      </div>
                      {targetConfig.imageUrl === preset.url && (
                        <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-[#1C3829] text-white shadow">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom URL Input */}
              <form onSubmit={handleApplyCustom} className="pt-2 border-t border-[#E7E0D5] space-y-3">
                <label className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider">
                  Or Paste Custom Image URL / WordPress Media URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://.../hotel-hero.jpg"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-[#E7E0D5] bg-white text-xs text-[#1C3829] focus:outline-none focus:border-[#1C3829]"
                  />
                  <button
                    type="submit"
                    disabled={!customUrl}
                    className="px-4 py-2 rounded-xl bg-[#1C3829] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#12241A] disabled:opacity-50 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'cms' && (
            <div className="py-5 space-y-6">
              {/* CMS Status Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-emerald-950">
                    Yes! WordPress Content is Automatically Synced
                  </p>
                  <p className="text-emerald-800 leading-relaxed font-light">
                    When you add or edit items in your WordPress admin, the frontend automatically receives and displays them. Background polling checks every 45 seconds, or you can trigger an instant sync below.
                  </p>
                </div>
              </div>

              {/* Live Count Grid */}
              <div>
                <span className="block text-xs font-semibold text-[#1C3829] uppercase tracking-wider mb-2.5">
                  Live Synced Content (Active on Frontend):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white rounded-2xl p-4 border border-[#E7E0D5] text-center space-y-1 shadow-sm">
                    <BedDouble className="w-5 h-5 text-[#2D5540] mx-auto" />
                    <span className="text-2xl font-bold font-luxury-serif text-[#1C3829] block">
                      {roomsCount}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-[#68726B] block">
                      Rooms (our-room)
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#E7E0D5] text-center space-y-1 shadow-sm">
                    <Compass className="w-5 h-5 text-[#2D5540] mx-auto" />
                    <span className="text-2xl font-bold font-luxury-serif text-[#1C3829] block">
                      {toursCount}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-[#68726B] block">
                      Tours (our-tours)
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#E7E0D5] text-center space-y-1 shadow-sm">
                    <Utensils className="w-5 h-5 text-[#2D5540] mx-auto" />
                    <span className="text-2xl font-bold font-luxury-serif text-[#1C3829] block">
                      {diningCount}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-[#68726B] block">
                      Dining Venues
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#E7E0D5] text-center space-y-1 shadow-sm">
                    <Heart className="w-5 h-5 text-[#2D5540] mx-auto" />
                    <span className="text-2xl font-bold font-luxury-serif text-[#1C3829] block">
                      {spaCount}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-[#68726B] block">
                      Spa Treatments
                    </span>
                  </div>
                </div>
              </div>

              {/* Endpoint Details */}
              <div className="p-4 rounded-2xl bg-white border border-[#E7E0D5] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#68726B]">
                  <span>WordPress CMS API Endpoint:</span>
                  <span className="font-mono text-[11px] text-[#1C3829] font-medium">
                    cms.levertangkorhotel.com
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#68726B]">
                  <span>Background Refresh Cycle:</span>
                  <span className="text-[#1C3829] font-medium">Every 45 seconds</span>
                </div>
                {lastSynced && (
                  <div className="flex items-center justify-between text-[#68726B]">
                    <span>Last Synced:</span>
                    <span className="text-[#1C3829] font-medium">
                      {lastSynced.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Manual Refresh Trigger */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={onSyncFromWordPress}
                  disabled={isSyncing}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1C3829] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#12241A] transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing with WordPress...' : 'Sync from WordPress Now'}</span>
                </button>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#E7E0D5] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-[#1C3829] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#12241A] transition-colors"
            >
              Done & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
