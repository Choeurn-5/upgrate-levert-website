import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Sparkles,
  Save,
  CheckCircle,
  Eye,
  RefreshCw,
  BookOpen,
  Home,
  Bed,
  Utensils,
  Waves,
  Compass,
  Award,
  Phone,
  Layers,
} from 'lucide-react';
import { useGlobalContext } from '@/components/GlobalProvider';
import { HeroConfig } from '@/types';

interface AdminHeroManagerProps {
  showToast: (type: 'success' | 'error', message: string) => void;
}

const PAGE_HERO_TABS: { key: string; label: string; icon: any; route: string }[] = [
  { key: 'blog', label: 'Blog & Stories', icon: BookOpen, route: '/blog' },
  { key: 'home', label: 'Home Page', icon: Home, route: '/' },
  { key: 'rooms', label: 'Rooms & Suites', icon: Bed, route: '/rooms' },
  { key: 'facilities', label: 'Rooftop Pool', icon: Waves, route: '/facility' },
  { key: 'dining', label: 'Dining & Bar', icon: Utensils, route: '/dining' },
  { key: 'spa', label: 'Spa & Wellness', icon: Sparkles, route: '/spa' },
  { key: 'touring', label: 'Temple Tours', icon: Compass, route: '/touring' },
  { key: 'gallery', label: 'Gallery', icon: ImageIcon, route: '/gallery' },
  { key: 'awards', label: 'Awards', icon: Award, route: '/awards' },
  { key: 'contact', label: 'Contact', icon: Phone, route: '/contact-levertangkorhotel' },
];

const CURATED_PRESETS = [
  {
    name: 'Angkor Wat Sunrise Glow',
    url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=85',
    category: 'Heritage',
  },
  {
    name: 'Rooftop Horizon Pool & Deck',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/IMG_2364-2.jpg',
    category: 'Hotel Pool',
  },
  {
    name: 'Candlelit Khmer Restaurant',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/0D9A3910-2048x1366.jpg',
    category: 'Dining',
  },
  {
    name: 'Tropical Sanctuary Courtyard',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85',
    category: 'Sanctuary',
  },
  {
    name: 'Luxury Balcony Suite',
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2000&q=85',
    category: 'Suites',
  },
  {
    name: 'Traditional Herbal Spa',
    url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/09/fgsdfg-4200-x-2938-scaled.jpg',
    category: 'Wellness',
  },
];

export const AdminHeroManager: React.FC<AdminHeroManagerProps> = ({ showToast }) => {
  const { heroConfigs, handleUpdateHero, handleNavigate } = useGlobalContext();

  const [selectedKey, setSelectedKey] = useState<string>('blog');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [eyebrow, setEyebrow] = useState('');
  const [badge, setBadge] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync form values when selected page changes or heroConfigs updates
  useEffect(() => {
    const config = heroConfigs[selectedKey];
    if (config) {
      setTitle(config.title || '');
      setSubtitle(config.subtitle || '');
      setEyebrow(config.eyebrow || '');
      setBadge(config.badge || '');
      setImageUrl(config.imageUrl || '');
    }
  }, [selectedKey, heroConfigs]);

  // Upload image to Cloudinary via /api/upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('error', 'Please select an image file (JPEG, PNG, WebP)');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      showToast('error', 'Image size must be less than 15MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setImageUrl(data.url);
      showToast(
        'success',
        data.provider === 'cloudinary'
          ? 'Image uploaded to Cloudinary CDN!'
          : 'Image uploaded successfully!'
      );
    } catch (err: any) {
      console.error('Hero upload error:', err);
      showToast('error', err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Save changes to current hero banner
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('error', 'Hero title cannot be empty.');
      return;
    }
    if (!imageUrl.trim()) {
      showToast('error', 'Hero background image is required.');
      return;
    }

    setIsSaving(true);
    try {
      const currentConfig = heroConfigs[selectedKey] || {};
      const newConfig: HeroConfig = {
        ...currentConfig,
        eyebrow: eyebrow.trim(),
        title: title.trim(),
        subtitle: subtitle.trim(),
        badge: badge.trim(),
        imageUrl: imageUrl.trim(),
      };

      await handleUpdateHero(selectedKey, newConfig);
      showToast('success', `Hero banner for "${selectedKey.toUpperCase()}" updated live!`);
    } catch {
      showToast('error', 'Failed to save hero changes');
    } finally {
      setIsSaving(false);
    }
  };

  const currentTab = PAGE_HERO_TABS.find((t) => t.key === selectedKey) || PAGE_HERO_TABS[0];

  return (
    <div className="space-y-8">
      {/* Top Banner & Page Selector */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E0D5] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C5A880]">
              Visual Presentation &amp; Messaging
            </span>
            <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
              Hero Banner &amp; Background Editor
            </h3>
            <p className="text-xs text-[#68726B] max-w-2xl">
              Customize the hero background image and text for the Blog page or any hotel page. Upload your own photography to Cloudinary or select from curated presets. Changes publish live instantly.
            </p>
          </div>

          <button
            onClick={() => handleNavigate(currentTab.route as any)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-[#E7E0D5] text-xs font-semibold text-[#1C3829] hover:bg-[#FAF8F5] transition-colors shrink-0"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>View {currentTab.label} Live</span>
          </button>
        </div>

        {/* Page Selector Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-t border-[#E7E0D5] pt-4">
          {PAGE_HERO_TABS.map((tab) => {
            const isSelected = selectedKey === tab.key;
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedKey(tab.key)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center space-x-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C3829] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#4A554F] border border-[#E7E0D5] hover:border-[#C5A880] hover:text-[#1C3829]'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Form on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Edit Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E0D5] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D5]">
            <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829]">
              Edit {currentTab.label} Hero
            </h4>
            <span className="text-[11px] text-[#68726B]">
              Key: <code className="text-[#C5A880] font-mono">{selectedKey}</code>
            </span>
          </div>

          {/* Eyebrow & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider">
                Eyebrow Text (Small Top Header)
              </label>
              <input
                type="text"
                value={eyebrow}
                onChange={(e) => setEyebrow(e.target.value)}
                placeholder="e.g. STORIES & INSIDER GUIDES"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E0D5] text-xs text-[#1C3829] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider">
                Badge Text (Optional Pill)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Curated Heritage Journal"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E7E0D5] text-xs text-[#1C3829] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider">
              Main Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Journeys Through Angkor & Siem Reap"
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E0D5] text-sm font-semibold text-[#1C3829] focus:outline-none focus:border-[#C5A880]"
              required
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider">
              Subtitle / Description *
            </label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              rows={3}
              placeholder="Descriptive narrative welcoming guests to this section..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#E7E0D5] text-xs text-stone-800 focus:outline-none focus:border-[#C5A880]"
              required
            />
          </div>

          {/* Background Image Controls */}
          <div className="space-y-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D5]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider flex items-center space-x-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Hero Background Image *</span>
              </label>
              <span className="text-[11px] text-[#68726B]">
                Cloudinary CDN Enabled
              </span>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Upload Button & Direct URL Input */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-4 py-2.5 rounded-xl bg-[#1C3829] hover:bg-[#2D5540] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs shrink-0"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C5A880]" />
                    <span>Uploading to Cloudinary...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Upload Background</span>
                  </>
                )}
              </button>

              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or paste image URL (https://...)"
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#E7E0D5] text-xs font-mono text-stone-700 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            {/* Quick Presets */}
            <div className="pt-2">
              <span className="text-[10px] font-semibold text-[#68726B] uppercase tracking-wider block mb-2">
                Or choose curated hotel photography:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CURATED_PRESETS.map((p) => {
                  const isCurActive = imageUrl === p.url;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setImageUrl(p.url)}
                      className={`relative rounded-xl overflow-hidden border text-left group transition-all p-1.5 flex items-center space-x-2 ${
                        isCurActive
                          ? 'border-[#C5A880] bg-white ring-2 ring-[#C5A880]/30'
                          : 'border-[#E7E0D5] bg-white/70 hover:border-stone-400'
                      }`}
                    >
                      <img
                        src={p.url}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 pr-1">
                        <span className="block text-[11px] font-semibold text-[#1C3829] truncate">
                          {p.name}
                        </span>
                        <span className="block text-[9px] text-[#68726B]">
                          {p.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3.5 rounded-2xl bg-[#C5A880] hover:bg-[#DFCAA8] text-[#12241A] font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#12241A]" />
                  <span>Saving &amp; Publishing...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save &amp; Publish Hero Changes</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Right Column: Live Interactive Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Live Visual Banner Preview</span>
            </h4>
            <span className="text-[10px] text-[#68726B]">
              Real-time Simulation
            </span>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E7E0D5] bg-stone-900 min-h-[380px] flex flex-col justify-end p-6 sm:p-8 text-white">
            {/* Background Image with Dark Vignette Overlay */}
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Hero Preview"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="absolute inset-0 bg-[#1C3829]/90 flex items-center justify-center text-white/30 text-xs">
                No Background Image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />

            {/* Content Overlay */}
            <div className="relative z-10 space-y-3">
              {badge && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#C5A880] text-[#12241A] shadow-sm">
                  {badge}
                </span>
              )}

              {eyebrow && (
                <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#DFCAA8]">
                  {eyebrow}
                </div>
              )}

              <h2 className="font-luxury-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                {title || 'Hero Main Title'}
              </h2>

              <p className="text-xs text-white/80 line-clamp-3 font-light leading-relaxed">
                {subtitle || 'Hero descriptive subtitle will appear here...'}
              </p>

              <div className="pt-2 flex items-center space-x-2">
                <span className="px-4 py-2 rounded-full bg-white/20 text-white text-[11px] font-medium backdrop-blur-sm">
                  Explore Section
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7E0D5] text-[11px] text-[#68726B] space-y-1">
            <span className="font-semibold text-[#1C3829] block">
              💡 Storage &amp; Persistence:
            </span>
            <p>
              When you click <strong>Save &amp; Publish</strong>, the hero settings are permanently written to your website server configuration and synced live to all website visitors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
