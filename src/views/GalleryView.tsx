import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { LightboxModal } from '../components/LightboxModal';
import { HeroConfig, GalleryPhoto, AppRoute } from '../types';

const PHOTOS_PER_PAGE = 12;

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
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        const [photosRes, catsRes] = await Promise.all([
          fetch('/api/gallery'),
          fetch('/api/gallery/categories'),
        ]);
        if (photosRes.ok) setPhotos(await photosRes.json());
        if (catsRes.ok) setCategories(await catsRes.json());
      } catch (err) {
        console.error('Failed to load gallery data', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
    setLightboxIndex(null);
  }, [activeCategory]);

  const filteredPhotos = photos.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  const totalPages = Math.ceil(filteredPhotos.length / PHOTOS_PER_PAGE);
  const paginatedPhotos = filteredPhotos.slice(
    (currentPage - 1) * PHOTOS_PER_PAGE,
    currentPage * PHOTOS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={onOpenBooking}
        primaryButtonText="Book Your Stay"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* Gallery Section */}
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
          {!isLoading && categories.length > 0 && (
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
          )}
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: PHOTOS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-3xl bg-stone-200 animate-pulse border border-[#E7E0D5]"
              />
            ))}
          </div>
        )}

        {/* Image Grid */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPhotos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  onClick={() => setLightboxIndex((currentPage - 1) * PHOTOS_PER_PAGE + i)}
                  className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer bg-stone-200 border border-[#E7E0D5] shadow-sm hover:shadow-xl transition-all"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt || photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Hover Overlay — category badge + zoom icon only */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}

              {paginatedPhotos.length === 0 && (
                <div className="col-span-full py-20 text-center text-[#68726B]">
                  <p className="text-lg font-medium">No photos in this category yet.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E7E0D5] bg-white text-[#1C3829] hover:bg-[#F2EDE4] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                        currentPage === page
                          ? 'bg-[#1C3829] text-white shadow-md'
                          : 'bg-white border border-[#E7E0D5] text-[#4A554F] hover:bg-[#F2EDE4] hover:text-[#1C3829]'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-[#E7E0D5] bg-white text-[#1C3829] hover:bg-[#F2EDE4] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Page info */}
            {totalPages > 1 && (
              <p className="text-center text-xs text-[#68726B] mt-4">
                Page {currentPage} of {totalPages} &mdash; {filteredPhotos.length} photos total
              </p>
            )}
          </>
        )}

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
