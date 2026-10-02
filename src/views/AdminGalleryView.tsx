import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FolderOpen, RefreshCw, Trash2, Image as ImageIcon, Info } from 'lucide-react';
import { GalleryPhoto } from '@/types';

interface GalleryCategory {
  id: string;
  label: string;
  value: string;
}

export const AdminGalleryView: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setIsLoading(true);
    try {
      const [photosRes, catsRes] = await Promise.all([
        fetch('/api/gallery'),
        fetch('/api/gallery/categories'),
      ]);
      if (photosRes.ok) setPhotos(await photosRes.json());
      if (catsRes.ok) setCategories(await catsRes.json());
    } catch (err) {
      console.error('Failed to load gallery:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPhotos = photos.filter(p =>
    activeCategory === 'all' ? true : p.category === activeCategory
  );

  const getCategoryLabel = (value: string) =>
    categories.find(c => c.value === value)?.label || value;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-24">

      {/* How it works banner */}
      <div className="flex items-start gap-4 bg-[#F2EDE4] border border-[#E7E0D5] rounded-2xl p-6">
        <Info className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
        <div className="space-y-1 text-sm text-[#4A554F]">
          <p className="font-semibold text-[#1C3829]">How to add gallery images</p>
          <p>Place your image files inside the correct subfolder:</p>
          <ul className="list-disc list-inside space-y-0.5 mt-1">
            <li><code className="bg-white px-1 rounded text-xs">public/images/Gallery/room/</code> → Suites &amp; Rooms</li>
            <li><code className="bg-white px-1 rounded text-xs">public/images/Gallery/pool/</code> → Rooftop Pool</li>
            <li><code className="bg-white px-1 rounded text-xs">public/images/Gallery/dinning/</code> → Dining &amp; Cocktails</li>
            <li><code className="bg-white px-1 rounded text-xs">public/images/Gallery/tour/</code> → Temple Tours</li>
          </ul>
          <p className="mt-2">After adding files, commit &amp; push to GitHub — Vercel will auto-deploy and the gallery will update instantly.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.filter(c => c.value !== 'all').map(cat => {
          const count = photos.filter(p => p.category === cat.value).length;
          return (
            <div key={cat.id} className="bg-white rounded-2xl border border-[#E7E0D5] p-5 text-center shadow-sm">
              <p className="text-3xl font-bold text-[#1C3829]">{count}</p>
              <p className="text-xs text-[#68726B] mt-1 font-medium">{cat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Photo Grid */}
      <section className="bg-white rounded-3xl p-8 border border-[#E7E0D5] shadow-sm">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-xl font-luxury-serif text-[#1C3829] flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#C5A880]" />
            <span>Gallery Photos ({photos.length} total)</span>
          </h2>
          <button
            onClick={loadAll}
            className="flex items-center gap-2 text-sm text-[#68726B] hover:text-[#1C3829] transition px-4 py-2 rounded-xl border border-[#E7E0D5] hover:bg-[#F2EDE4]"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.value
                  ? 'bg-[#1C3829] text-white shadow-sm font-semibold'
                  : 'bg-[#F2EDE4] text-[#4A554F] hover:text-[#1C3829] border border-[#E7E0D5]'
              }`}
            >
              {cat.label} {cat.value !== 'all' && `(${photos.filter(p => p.category === cat.value).length})`}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-stone-200 animate-pulse" />
            ))}
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="py-16 text-center text-[#68726B]">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 text-[#C5A880] opacity-50" />
            <p className="font-medium">No photos found in this category.</p>
            <p className="text-sm mt-1">Add image files to the corresponding folder and refresh.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map(photo => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/3] border border-[#E7E0D5]"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-[10px] font-semibold uppercase tracking-wider bg-[#C5A880] px-2 py-0.5 rounded-full">
                    {getCategoryLabel(photo.category)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
