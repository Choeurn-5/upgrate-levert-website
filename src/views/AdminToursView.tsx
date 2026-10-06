import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Plus, Trash2, Edit3, Eye, Save, X, RefreshCw, Check, ChevronDown, ChevronUp,
  Compass, Car, Clock, DollarSign, Image as ImageIcon, AlignLeft, List, AlertCircle,
  GripVertical, Lightbulb, Upload, Loader2,
} from 'lucide-react';
import { Tour, TourStop, AppRoute } from '../types';

interface AdminToursViewProps {
  onNavigate: (route: AppRoute, slug?: string) => void;
}

const EMPTY_STOP: TourStop = { time: '', templeName: '', description: '', highlight: '' };

const EMPTY_TOUR: Omit<Tour, 'id' | 'slug'> = {
  title: '',
  price: 0,
  currency: 'USD',
  duration: '',
  vehicleType: 'Private Air-Conditioned SUV / Van',
  shortDescription: '',
  longDescription: '',
  featuredImage: '',
  itinerary: [{ ...EMPTY_STOP }],
  inclusions: ['Private air-conditioned vehicle with dedicated professional driver', 'Hotel pick-up and return from Le Vert Angkor Hotel', 'Unlimited chilled mineral water and cold refreshing towels', 'All parking, fuel, and municipal access fees'],
  exclusions: ['Angkor Park Pass ($37 for 1-day, $62 for 3-day)', 'Meals and personal drinks', 'Tour Guide ($40 optional)', 'Gratuities and tips'],
  tips: ['Dress code: Shoulders and knees must be covered.', 'Comfortable walking shoes recommended.', 'Bring sun protection.'],
};

const IMAGE_PRESETS = [
  { label: 'Angkor Wat Sunrise', url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85' },
  { label: 'Bayon Temple Faces', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85' },
  { label: 'Siem Reap Temples', url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/03/Things-to-Do-in-Siem-Reap.jpg' },
  { label: 'Angkor Small Circuit', url: 'https://www.cms.levertangkorhotel.com/wp-content/uploads/2024/01/R-3.jpg' },
  { label: 'Ta Prohm (Tomb Raider)', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=85' },
];

export const AdminToursView: React.FC<AdminToursViewProps> = ({ onNavigate }) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [editingTour, setEditingTour] = useState<Partial<Tour> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const fetchTours = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/tours');
      if (!res.ok) throw new Error('Failed to load tours');
      const data = await res.json();
      setTours(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load tours');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchTours(); }, [fetchTours]);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }
    setIsUploadingImage(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }
      const data = await res.json();
      setEditingTour(prev => prev ? { ...prev, featuredImage: data.url } : prev);
      showSuccess('Image uploaded successfully!');
    } catch (e: any) {
      setError(e.message || 'Image upload failed');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleCreate = () => {
    setEditingTour({ ...EMPTY_TOUR });
    setIsCreating(true);
  };

  const handleEdit = (tour: Tour) => {
    setEditingTour({ ...tour });
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setEditingTour(null);
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!editingTour) return;
    if (!editingTour.title?.trim()) { setError('Title is required'); return; }
    if (!editingTour.shortDescription?.trim()) { setError('Short description is required'); return; }

    setIsSaving(true);
    setError(null);
    try {
      const method = isCreating ? 'POST' : 'PUT';
      const payload = isCreating ? editingTour : { ...editingTour, id: editingTour.id };
      const res = await fetch('/api/tours', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }
      showSuccess(isCreating ? 'Tour created successfully!' : 'Tour updated!');
      setEditingTour(null);
      setIsCreating(false);
      fetchTours();
    } catch (e: any) {
      setError(e.message || 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`/api/tours?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      showSuccess('Tour deleted.');
      setDeleteConfirmId(null);
      fetchTours();
    } catch (e: any) {
      setError(e.message);
    }
  };

  // Helpers for editing arrays (itinerary, inclusions, exclusions, tips)
  const updateStop = (i: number, field: keyof TourStop, val: string) => {
    if (!editingTour) return;
    const stops = [...(editingTour.itinerary || [])];
    stops[i] = { ...stops[i], [field]: val };
    setEditingTour({ ...editingTour, itinerary: stops });
  };
  const addStop = () => {
    if (!editingTour) return;
    setEditingTour({ ...editingTour, itinerary: [...(editingTour.itinerary || []), { ...EMPTY_STOP }] });
  };
  const removeStop = (i: number) => {
    if (!editingTour) return;
    setEditingTour({ ...editingTour, itinerary: (editingTour.itinerary || []).filter((_, idx) => idx !== i) });
  };

  const updateListItem = (field: 'inclusions' | 'exclusions' | 'tips', i: number, val: string) => {
    if (!editingTour) return;
    const arr = [...(editingTour[field] as string[] || [])];
    arr[i] = val;
    setEditingTour({ ...editingTour, [field]: arr });
  };
  const addListItem = (field: 'inclusions' | 'exclusions' | 'tips') => {
    if (!editingTour) return;
    setEditingTour({ ...editingTour, [field]: [...(editingTour[field] as string[] || []), ''] });
  };
  const removeListItem = (field: 'inclusions' | 'exclusions' | 'tips', i: number) => {
    if (!editingTour) return;
    setEditingTour({ ...editingTour, [field]: (editingTour[field] as string[] || []).filter((_, idx) => idx !== i) });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <RefreshCw className="w-6 h-6 animate-spin text-[#C5A880]" />
        <span className="ml-3 text-[#68726B] text-sm">Loading tours...</span>
      </div>
    );
  }

  // ====== EDIT / CREATE FORM ======
  if (editingTour !== null) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
            {isCreating ? '+ Create New Tour Package' : `Edit: ${editingTour.title}`}
          </h2>
          <button onClick={handleCancelEdit} className="p-2 rounded-full hover:bg-[#F2EDE4] text-[#68726B] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 px-4 py-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#1C3829] uppercase tracking-wider flex items-center space-x-2">
              <AlignLeft className="w-4 h-4 text-[#C5A880]" />
              <span>Basic Information</span>
            </h3>
            <div>
              <label className="text-xs font-semibold text-[#68726B] uppercase tracking-wider block mb-1">Tour Title *</label>
              <input
                value={editingTour.title || ''}
                onChange={e => setEditingTour({ ...editingTour, title: e.target.value })}
                placeholder="e.g. Big Circuit Temple Tour"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 text-sm text-[#1C3829] outline-none transition"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#68726B] uppercase tracking-wider block mb-1">Primary Price (USD) *</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A880]" />
                    <input
                      type="number"
                      value={editingTour.price || ''}
                      onChange={e => setEditingTour({ ...editingTour, price: Number(e.target.value) })}
                      placeholder="80"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] text-sm text-[#1C3829] outline-none transition"
                    />
                  </div>
                  <input
                    value={editingTour.priceLabel || ''}
                    onChange={e => setEditingTour({ ...editingTour, priceLabel: e.target.value })}
                    placeholder="Label (e.g. Tuk Tuk)"
                    className="w-full flex-1 px-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] text-sm text-[#1C3829] outline-none transition"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold text-[#68726B] uppercase tracking-wider block mb-1">Secondary Price (USD)</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A880]" />
                    <input
                      type="number"
                      value={editingTour.secondaryPrice || ''}
                      onChange={e => setEditingTour({ ...editingTour, secondaryPrice: Number(e.target.value) })}
                      placeholder="Optional"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] text-sm text-[#1C3829] outline-none transition"
                    />
                  </div>
                  <input
                    value={editingTour.secondaryPriceLabel || ''}
                    onChange={e => setEditingTour({ ...editingTour, secondaryPriceLabel: e.target.value })}
                    placeholder="Label (e.g. Car)"
                    className="w-full flex-1 px-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] text-sm text-[#1C3829] outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#68726B] uppercase tracking-wider block mb-1">Duration</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A880]" />
                  <input
                    value={editingTour.duration || ''}
                    onChange={e => setEditingTour({ ...editingTour, duration: e.target.value })}
                    placeholder="Full Day (~8:00 AM – 5:30 PM)"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] text-sm text-[#1C3829] outline-none transition"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#68726B] uppercase tracking-wider block mb-1">Vehicle Type</label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A880]" />
                <input
                  value={editingTour.vehicleType || ''}
                  onChange={e => setEditingTour({ ...editingTour, vehicleType: e.target.value })}
                  placeholder="Private Air-Conditioned SUV / Van"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] text-sm text-[#1C3829] outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#68726B] uppercase tracking-wider block mb-1">Short Description *</label>
              <textarea
                value={editingTour.shortDescription || ''}
                onChange={e => setEditingTour({ ...editingTour, shortDescription: e.target.value })}
                rows={2}
                placeholder="One-sentence tour summary shown on the card..."
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] text-sm text-[#1C3829] outline-none transition resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#68726B] uppercase tracking-wider block mb-1">Long Description</label>
              <textarea
                value={editingTour.longDescription || ''}
                onChange={e => setEditingTour({ ...editingTour, longDescription: e.target.value })}
                rows={4}
                placeholder="Detailed description shown on the tour detail page..."
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] text-sm text-[#1C3829] outline-none transition resize-none"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#1C3829] uppercase tracking-wider flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-[#C5A880]" />
              <span>Featured Image</span>
            </h3>

            {/* Upload from device */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
                e.target.value = '';
              }}
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              disabled={isUploadingImage}
              className="w-full flex flex-col items-center justify-center gap-2 py-6 rounded-xl border-2 border-dashed border-[#E4DDD3] hover:border-[#C5A880] hover:bg-[#FDFBF8] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isUploadingImage ? (
                <>
                  <Loader2 className="w-6 h-6 text-[#C5A880] animate-spin" />
                  <span className="text-xs text-[#8A9490] font-medium">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-[#C5A880]" />
                  <span className="text-xs font-semibold text-[#4A554F]">Click to upload from device</span>
                  <span className="text-[11px] text-[#8A9490]">JPG, PNG, WebP supported</span>
                </>
              )}
            </button>

            {/* Or paste URL */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 h-px bg-[#EDE8E0]" />
              <span className="text-[11px] text-[#8A9490] font-medium">or paste URL</span>
              <div className="flex-1 h-px bg-[#EDE8E0]" />
            </div>
            <input
              value={editingTour.featuredImage || ''}
              onChange={e => setEditingTour({ ...editingTour, featuredImage: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] text-sm text-[#1C3829] outline-none transition"
            />

            {/* Image preview */}
            {editingTour.featuredImage && (
              <div className="relative">
                <img
                  src={editingTour.featuredImage}
                  alt="Preview"
                  className="w-full h-44 object-cover rounded-xl border border-[#EDE8E0]"
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
                <button
                  onClick={() => setEditingTour({ ...editingTour, featuredImage: '' })}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 border border-[#EDE8E0] flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition cursor-pointer shadow-sm"
                >
                  <X className="w-3.5 h-3.5 text-[#68726B] hover:text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1C3829] uppercase tracking-wider flex items-center space-x-2">
                <Compass className="w-4 h-4 text-[#C5A880]" />
                <span>Temple Itinerary Stops</span>
              </h3>
              <button onClick={addStop} className="flex items-center space-x-1.5 text-xs font-semibold text-[#C5A880] hover:text-[#A8824B] cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Add Stop</span>
              </button>
            </div>
            {(editingTour.itinerary || []).map((stop, i) => (
              <div key={i} className="p-4 rounded-xl border border-[#EDE8E0] bg-[#FDFBF8] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C3829]">Stop {i + 1}</span>
                  {(editingTour.itinerary || []).length > 1 && (
                    <button onClick={() => removeStop(i)} className="text-red-400 hover:text-red-600 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    value={stop.time || ''}
                    onChange={e => updateStop(i, 'time', e.target.value)}
                    placeholder="08:00 AM"
                    className="px-3 py-2.5 rounded-lg border border-[#EDE8E0] text-xs text-[#1C3829] outline-none focus:border-[#C5A880] transition"
                  />
                  <input
                    value={stop.templeName}
                    onChange={e => updateStop(i, 'templeName', e.target.value)}
                    placeholder="Temple Name *"
                    className="px-3 py-2.5 rounded-lg border border-[#EDE8E0] text-xs text-[#1C3829] outline-none focus:border-[#C5A880] transition"
                  />
                </div>
                <textarea
                  value={stop.description}
                  onChange={e => updateStop(i, 'description', e.target.value)}
                  placeholder="Description of this stop..."
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#EDE8E0] text-xs text-[#1C3829] outline-none focus:border-[#C5A880] transition resize-none"
                />
                <input
                  value={stop.highlight || ''}
                  onChange={e => updateStop(i, 'highlight', e.target.value)}
                  placeholder="Key highlight (optional)"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#EDE8E0] text-xs text-[#1C3829] outline-none focus:border-[#C5A880] transition"
                />
              </div>
            ))}
          </div>

          {/* Inclusions, Exclusions, Tips */}
          {(['inclusions', 'exclusions', 'tips'] as const).map((field) => (
            <div key={field} className="bg-white rounded-2xl border border-[#EDE8E0] p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#1C3829] uppercase tracking-wider flex items-center space-x-2">
                  {field === 'inclusions' && <Check className="w-4 h-4 text-[#C5A880]" />}
                  {field === 'exclusions' && <X className="w-4 h-4 text-[#C5A880]" />}
                  {field === 'tips' && <Lightbulb className="w-4 h-4 text-[#C5A880]" />}
                  <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                </h3>
                <button onClick={() => addListItem(field)} className="flex items-center space-x-1 text-xs font-semibold text-[#C5A880] hover:text-[#A8824B] cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
              {((editingTour[field] as string[]) || []).map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <input
                    value={item}
                    onChange={e => updateListItem(field, i, e.target.value)}
                    placeholder={`${field.charAt(0).toUpperCase() + field.slice(1, -1)} item...`}
                    className="flex-1 px-3 py-2.5 rounded-lg border border-[#EDE8E0] text-xs text-[#1C3829] outline-none focus:border-[#C5A880] transition"
                  />
                  <button onClick={() => removeListItem(field, i)} className="text-red-400 hover:text-red-600 cursor-pointer shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ))}

          {/* Save / Cancel */}
          <div className="flex items-center space-x-3 pb-8">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-[#1C3829] hover:bg-[#12241A] text-white text-sm font-bold tracking-wider transition shadow-lg active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{isSaving ? 'Saving...' : isCreating ? 'Create Tour' : 'Save Changes'}</span>
            </button>
            <button
              onClick={handleCancelEdit}
              className="py-3.5 px-6 rounded-2xl border border-[#EDE8E0] text-[#68726B] text-sm font-semibold hover:bg-[#F8F5F0] transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ====== LIST VIEW ======
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829]">Tours Manager</h2>
          <p className="text-sm text-[#68726B] mt-1">{tours.length} tour package{tours.length !== 1 ? 's' : ''} · Saved to Upstash Redis</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={fetchTours}
            className="p-2.5 rounded-xl border border-[#EDE8E0] hover:bg-[#F8F5F0] text-[#68726B] transition cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#C5A880]' : ''}`} />
          </button>
          <button
            onClick={() => onNavigate('/touring/')}
            className="hidden sm:flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-[#EDE8E0] text-sm font-semibold text-[#4A554F] hover:bg-[#F8F5F0] transition cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#C5A880]" />
            <span>View Live Page</span>
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#1C3829] hover:bg-[#12241A] text-white text-sm font-bold tracking-wide transition shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Tour</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 px-4 py-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {successMsg && (
        <div className="flex items-center space-x-2 px-4 py-3 mb-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {tours.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-[#EDE8E0] rounded-2xl">
          <Compass className="w-12 h-12 mx-auto text-[#C5A880]/40 mb-4" />
          <p className="text-[#68726B] font-medium mb-2">No tours yet</p>
          <p className="text-sm text-[#8A9490] mb-6">Create your first tour package to display on the website.</p>
          <button onClick={handleCreate} className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#1C3829] text-white text-sm font-bold cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Create First Tour</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-2xl border border-[#EDE8E0] overflow-hidden transition hover:border-[#C5A880]/50">
              <div className="flex items-center gap-4 p-4 sm:p-5">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-[#EDE8E0]">
                  {tour.featuredImage && (
                    <img src={tour.featuredImage} alt={tour.title} className="w-full h-full object-cover" />
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-luxury-serif text-base font-bold text-[#1C3829] truncate">{tour.title}</h3>
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1">
                    <span className="text-xs text-[#C5A880] font-bold">
                      ${tour.price} {tour.secondaryPrice ? `/ $${tour.secondaryPrice}` : ''} USD
                    </span>
                    <span className="text-xs text-[#8A9490]">{tour.duration}</span>
                    <span className="text-xs text-[#8A9490]">{tour.itinerary.length} stops</span>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => setExpandedId(expandedId === tour.id ? null : tour.id)}
                    className="p-2 rounded-xl hover:bg-[#F8F5F0] text-[#8A9490] transition cursor-pointer"
                    title="Preview"
                  >
                    {expandedId === tour.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(tour)}
                    className="p-2 rounded-xl hover:bg-[#F8F5F0] text-[#68726B] hover:text-[#1C3829] transition cursor-pointer"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {deleteConfirmId === tour.id ? (
                    <div className="flex items-center space-x-1">
                      <button onClick={() => handleDelete(tour.id)} className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold cursor-pointer">Delete</button>
                      <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1.5 rounded-lg bg-[#F8F5F0] text-[#68726B] text-xs cursor-pointer">Cancel</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(tour.id)}
                      className="p-2 rounded-xl hover:bg-red-50 text-[#8A9490] hover:text-red-500 transition cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              {/* Expanded Preview */}
              {expandedId === tour.id && (
                <div className="border-t border-[#EDE8E0] bg-[#FDFBF8] px-5 py-4 space-y-3">
                  <p className="text-xs text-[#68726B] leading-relaxed">{tour.shortDescription}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tour.itinerary.slice(0, 5).map((stop, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-[#F4EFE6] text-[#5A4A2E] text-[11px] font-medium border border-[#E4DAC8]/60">{stop.templeName}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
