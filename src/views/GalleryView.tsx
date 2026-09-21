import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Maximize2, Image as ImageIcon } from 'lucide-react';
import { Hero } from '../components/Hero';
import { LightboxModal } from '../components/LightboxModal';
import { HeroConfig, GalleryPhoto, AppRoute } from '../types';
import { GALLERY_PHOTOS } from '../data/hotelData';

interface GalleryViewProps {
  heroConfig: HeroConfig;
  onNavigate: (route: AppRoute) => void;
  onOpenBooking: () => void;
  onOpenHeroManager: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  heroConfig,
  onNavigate,
  onOpenBooking,
  onOpenHeroManager,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'rooms' | 'tours' | 'dining' | 'spa' | 'pool'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  const categories: { label: string; value: 'all' | 'rooms' | 'tours' | 'dining' | 'spa' | 'pool' }[] = [
    { label: 'All Photos', value: 'all' },
    { label: 'Suites & Rooms', value: 'rooms' },
    { label: 'Temple Tours', value: 'tours' },
    { label: 'Rooftop Pool', value: 'pool' },
    { label: 'Dining & Cocktails', value: 'dining' },
    { label: 'Khmer Spa', value: 'spa' },
  ];

  return (
    <div>
      {/* 1. Replaceable Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={onOpenBooking}
        primaryButtonText="Book Your Stay"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Gallery Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-1">
              Photographic Portfolio
            </span>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl font-semibold text-[#1C3829]">
              Visual Impressions of Le Vert Angkor
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#F2EDE4] border border-[#E7E0D5]">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.value
                    ? 'bg-[#1C3829] text-[#FAF8F5] shadow-sm font-semibold'
                    : 'text-[#4A554F] hover:text-[#1C3829]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setLightboxIndex(i)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer bg-stone-200 border border-[#E7E0D5] shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={photo.url}
                alt={photo.alt || photo.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#DFCAA8] font-semibold mb-1">
                  {photo.category}
                </span>
                <h4 className="font-luxury-serif text-lg font-bold leading-tight">
                  {photo.title}
                </h4>
                <div className="mt-2 inline-flex items-center space-x-1 text-xs text-white/80">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>View High-Resolution</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => {
            if (lightboxIndex !== null) {
              setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
            }
          }}
          onPrev={() => {
            if (lightboxIndex !== null) {
              setLightboxIndex(
                (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
              );
            }
          }}
        />
      </section>
    </div>
  );
};
