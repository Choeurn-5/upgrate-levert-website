import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Image as ImageIcon, Upload, X, Loader2, CheckCircle2 } from 'lucide-react';
import { GalleryPhoto } from '@/types';

interface GalleryCategory {
  id: string;
  label: string;
  value: string;
}

export const AdminGalleryView: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('all'); // all is bad, should default to a real one or ask to select
  
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newCatValue, setNewCatValue] = useState('');
  const [isCreatingCat, setIsCreatingCat] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCategories();
    fetchPhotos();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/gallery/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        if (data.length > 1) {
          setUploadCategory(data[1].value); // Default to first non-'all' category
        }
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) setPhotos(await res.json());
    } catch (err) {
      console.error('Failed to fetch photos:', err);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatLabel || !newCatValue) return;

    try {
      setIsCreatingCat(true);
      const res = await fetch('/api/gallery/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: newCatLabel, value: newCatValue }),
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        setNewCatLabel('');
        setNewCatValue('');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create category');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingCat(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? (Photos will still have the category value)')) return;
    try {
      const res = await fetch(`/api/gallery/categories?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    if (uploadCategory === 'all') {
      alert('Please select a specific category for upload, not "All Photos".');
      return;
    }

    const files = Array.from(e.target.files);
    setIsUploading(true);
    
    const newPhotosMetadata: Partial<GalleryPhoto>[] = [];

    try {
      // Upload each file
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const uploaded = await uploadRes.json();
          // Create metadata
          newPhotosMetadata.push({
            url: uploaded.url,
            title: file.name.split('.')[0] || 'Gallery Photo',
            alt: file.name.split('.')[0] || 'Gallery Photo',
            category: uploadCategory,
          });
        } else {
          console.error(`Failed to upload ${file.name}`);
        }
      }

      // Save to gallery database
      if (newPhotosMetadata.length > 0) {
        const dbRes = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photos: newPhotosMetadata }),
        });
        
        if (dbRes.ok) {
          const data = await dbRes.json();
          setPhotos(data);
        }
      }
    } catch (error) {
      console.error('Upload process failed', error);
      alert('An error occurred during upload.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // reset
      }
    }
  };

  const handleDeletePhoto = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        const data = await res.json();
        setPhotos(data.photos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24">
      {/* Category Management */}
      <section className="bg-white rounded-3xl p-8 border border-[#E7E0D5] shadow-sm">
        <h2 className="text-xl font-luxury-serif text-[#1C3829] mb-6 flex items-center space-x-2">
          <ImageIcon className="w-5 h-5 text-[#C5A880]" />
          <span>Gallery Categories</span>
        </h2>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center space-x-2 bg-[#F2EDE4] px-4 py-2 rounded-full border border-[#E7E0D5]">
              <span className="text-sm text-[#1C3829] font-medium">{cat.label}</span>
              {cat.value !== 'all' && (
                <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-400 hover:text-red-600 transition p-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleCreateCategory} className="flex items-end gap-4 max-w-2xl bg-stone-50 p-6 rounded-2xl border border-stone-200">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1C3829]">Category Label (Display)</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Vintage Cars"
              value={newCatLabel}
              onChange={(e) => {
                setNewCatLabel(e.target.value);
                setNewCatValue(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
              }}
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#E7E0D5] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition text-sm text-stone-800"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1C3829]">Internal Value</label>
            <input 
              required
              type="text" 
              placeholder="e.g. vintage-cars"
              value={newCatValue}
              onChange={(e) => setNewCatValue(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#E7E0D5] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition text-sm text-stone-800"
            />
          </div>
          <button 
            type="submit"
            disabled={isCreatingCat}
            className="px-6 py-2 h-10 rounded-xl bg-[#1C3829] hover:bg-[#2D5540] text-white text-sm font-semibold tracking-wide transition whitespace-nowrap"
          >
            {isCreatingCat ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </section>

      {/* Upload Section */}
      <section className="bg-white rounded-3xl p-8 border border-[#E7E0D5] shadow-sm">
        <h2 className="text-xl font-luxury-serif text-[#1C3829] mb-6 flex items-center space-x-2">
          <Upload className="w-5 h-5 text-[#C5A880]" />
          <span>Upload Photos</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-64 space-y-3 shrink-0">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#1C3829]">Assign Category</label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-[#E7E0D5] focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] outline-none transition text-sm text-stone-800"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.value} disabled={cat.value === 'all'}>
                  {cat.label} {cat.value === 'all' ? '(Select another)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full">
            <input 
              type="file" 
              multiple 
              accept="image/*"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            <div 
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-16 transition-colors ${
                isUploading 
                  ? 'border-[#C5A880] bg-[#C5A880]/10 cursor-not-allowed'
                  : 'border-[#E7E0D5] bg-stone-50 hover:bg-[#F2EDE4] hover:border-[#C5A880] cursor-pointer'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-10 h-10 text-[#C5A880] animate-spin mb-4" />
                  <p className="text-[#1C3829] font-semibold text-lg">Uploading photos...</p>
                  <p className="text-[#68726B] text-sm mt-1">Please do not close this window.</p>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-[#C5A880] mb-4" />
                  <p className="text-[#1C3829] font-semibold text-lg">Click to Browse Images</p>
                  <p className="text-[#68726B] text-sm mt-1">Upload multiple luxury photos at once (JPG, PNG, WebP)</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section>
        <h2 className="text-xl font-luxury-serif text-[#1C3829] mb-6 flex items-center justify-between">
          <span>All Uploaded Photos ({photos.length})</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => {
            const catLabel = categories.find(c => c.value === photo.category)?.label || photo.category;
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative rounded-2xl overflow-hidden bg-stone-200 aspect-[4/3] border border-[#E7E0D5]"
              >
                <img 
                  src={photo.url} 
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <span className="text-white text-xs font-semibold tracking-wider uppercase bg-[#C5A880] px-3 py-1 rounded-full mb-4">
                    {catLabel}
                  </span>
                  <button 
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="flex items-center space-x-1 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
          {photos.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-[#E7E0D5]">
              <p className="text-[#68726B]">No photos found. Upload some above!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
