import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Plus, Trash2, Edit3, Eye, Save, X, RefreshCw, Check, ChevronDown, ChevronUp,
  Image as ImageIcon, AlignLeft, AlertCircle, Upload, Loader2, DollarSign, Star
} from 'lucide-react';
import { Tour, TourPricingOption, AppRoute } from '../types';

interface AdminToursViewProps {
  onNavigate: (route: AppRoute, slug?: string) => void;
}

const EMPTY_OPTION: TourPricingOption = { title: '', details: [''] };

const EMPTY_TOUR: Omit<Tour, 'id' | 'slug'> = {
  title: '',
  durationLabel: '',
  longDescription: '',
  featuredImage: '',
  highlights: [''],
  options: [{ ...EMPTY_OPTION }],
};

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
    const isImage = file.type.startsWith('image/') || /\\.(jpg|jpeg|png|webp|svg|gif)$/i.test(file.name);
    if (!isImage) {
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
        let err;
        try {
          err = await res.json();
        } catch (e) {
          throw new Error(`Upload failed with status ${res.status}.`);
        }
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

  // Highlights helpers
  const updateHighlight = (i: number, val: string) => {
    if (!editingTour) return;
    const arr = [...(editingTour.highlights || [])];
    arr[i] = val;
    setEditingTour({ ...editingTour, highlights: arr });
  };
  const addHighlight = () => {
    if (!editingTour) return;
    setEditingTour({ ...editingTour, highlights: [...(editingTour.highlights || []), ''] });
  };
  const removeHighlight = (i: number) => {
    if (!editingTour) return;
    setEditingTour({ ...editingTour, highlights: (editingTour.highlights || []).filter((_, idx) => idx !== i) });
  };

  // Options helpers
  const updateOptionTitle = (optIdx: number, val: string) => {
    if (!editingTour) return;
    const opts = [...(editingTour.options || [])];
    opts[optIdx] = { ...opts[optIdx], title: val };
    setEditingTour({ ...editingTour, options: opts });
  };
  const addOption = () => {
    if (!editingTour) return;
    setEditingTour({ ...editingTour, options: [...(editingTour.options || []), { title: '', details: [''] }] });
  };
  const removeOption = (optIdx: number) => {
    if (!editingTour) return;
    setEditingTour({ ...editingTour, options: (editingTour.options || []).filter((_, idx) => idx !== optIdx) });
  };

  // Option details helpers
  const updateOptionDetail = (optIdx: number, detailIdx: number, val: string) => {
    if (!editingTour) return;
    const opts = [...(editingTour.options || [])];
    const details = [...opts[optIdx].details];
    details[detailIdx] = val;
    opts[optIdx] = { ...opts[optIdx], details };
    setEditingTour({ ...editingTour, options: opts });
  };
  const addOptionDetail = (optIdx: number) => {
    if (!editingTour) return;
    const opts = [...(editingTour.options || [])];
    opts[optIdx].details = [...opts[optIdx].details, ''];
    setEditingTour({ ...editingTour, options: opts });
  };
  const removeOptionDetail = (optIdx: number, detailIdx: number) => {
    if (!editingTour) return;
    const opts = [...(editingTour.options || [])];
    opts[optIdx].details = opts[optIdx].details.filter((_, idx) => idx !== detailIdx);
    setEditingTour({ ...editingTour, options: opts });
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
                placeholder="e.g. Sunrise Angkor Small Temple Tour"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/20 text-sm text-[#1C3829] outline-none transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#68726B] uppercase tracking-wider block mb-1">Duration Label</label>
              <input
                value={editingTour.durationLabel || ''}
                onChange={e => setEditingTour({ ...editingTour, durationLabel: e.target.value })}
                placeholder="e.g. Half-Day Tour"
                className="w-full px-4 py-3 rounded-xl border border-[#EDE8E0] focus:border-[#C5A880] text-sm text-[#1C3829] outline-none transition"
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

          {/* Highlights */}
          <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1C3829] uppercase tracking-wider flex items-center space-x-2">
                <Star className="w-4 h-4 text-[#C5A880]" />
                <span>Highlights</span>
              </h3>
              <button onClick={addHighlight} className="flex items-center space-x-1.5 text-xs font-semibold text-[#C5A880] hover:text-[#A8824B] cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Add Highlight</span>
              </button>
            </div>
            {((editingTour.highlights as string[]) || []).map((highlight, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input
                  value={highlight}
                  onChange={e => updateHighlight(i, e.target.value)}
                  placeholder="e.g. Visit Angkor Wat at sunrise..."
                  className="flex-1 px-3 py-2.5 rounded-lg border border-[#EDE8E0] text-xs text-[#1C3829] outline-none focus:border-[#C5A880] transition"
                />
                <button onClick={() => removeHighlight(i)} className="text-red-400 hover:text-red-600 cursor-pointer shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Pricing Options */}
          <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1C3829] uppercase tracking-wider flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-[#C5A880]" />
                <span>Pricing Options</span>
              </h3>
              <button onClick={addOption} className="flex items-center space-x-1.5 text-xs font-semibold text-[#C5A880] hover:text-[#A8824B] cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Add Option</span>
              </button>
            </div>
            {(editingTour.options || []).map((option, i) => (
              <div key={i} className="p-4 rounded-xl border border-[#EDE8E0] bg-[#FDFBF8] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C3829]">Option {i + 1}</span>
                  {(editingTour.options || []).length > 1 && (
                    <button onClick={() => removeOption(i)} className="text-red-400 hover:text-red-600 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <input
                  value={option.title || ''}
                  onChange={e => updateOptionTitle(i, e.target.value)}
                  placeholder="e.g. Private Options: Tuk-Tuk $22 (2-3pax)"
                  className="w-full px-3 py-2.5 rounded-lg border border-[#EDE8E0] text-xs font-semibold text-[#1C3829] outline-none focus:border-[#C5A880] transition"
                />
                
                {/* Details within Option */}
                <div className="pl-4 space-y-2 border-l-2 border-[#E4DDD3]">
                  {option.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center space-x-2">
                      <input
                        value={detail}
                        onChange={e => updateOptionDetail(i, dIdx, e.target.value)}
                        placeholder="e.g. Provide cold pure drinking water"
                        className="flex-1 px-3 py-2 rounded-lg border border-[#EDE8E0] text-xs text-[#1C3829] outline-none focus:border-[#C5A880] transition"
                      />
                      <button onClick={() => removeOptionDetail(i, dIdx)} className="text-red-400 hover:text-red-600 cursor-pointer shrink-0">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addOptionDetail(i)} className="text-[11px] font-semibold text-[#C5A880] hover:text-[#A8824B] cursor-pointer flex items-center">
                    <Plus className="w-3 h-3 mr-1" /> Add Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

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
                    <span className="text-xs text-[#8A9490]">{tour.durationLabel}</span>
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
                  <p className="text-xs text-[#68726B] leading-relaxed line-clamp-3">{tour.longDescription}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
