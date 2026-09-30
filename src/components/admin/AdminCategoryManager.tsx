import React, { useState } from 'react';
import { Tag, Plus, Trash2, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { BlogPost } from '@/types';

interface AdminCategoryManagerProps {
  categories: string[];
  posts: BlogPost[];
  onRefreshCategories: () => Promise<void>;
  showToast: (type: 'success' | 'error', message: string) => void;
}

export const AdminCategoryManager: React.FC<AdminCategoryManagerProps> = ({
  categories,
  posts,
  onRefreshCategories,
  showToast,
}) => {
  const [newCatName, setNewCatName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Count articles per category
  const getPostCount = (categoryName: string) => {
    return posts.filter(
      (p) => p.category.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed) {
      showToast('error', 'Please enter a category name');
      return;
    }

    if (trimmed.length < 2 || trimmed.length > 50) {
      showToast('error', 'Category name must be between 2 and 50 characters');
      return;
    }

    const exists = categories.some((c) => c.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      showToast('error', `Category "${trimmed}" already exists.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/blog/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('success', `Category "${trimmed}" created successfully!`);
        setNewCatName('');
        await onRefreshCategories();
      } else {
        showToast('error', data.error || 'Failed to create category');
      }
    } catch {
      showToast('error', 'Network error creating category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (categoryName: string) => {
    const count = getPostCount(categoryName);
    if (count > 0) {
      showToast(
        'error',
        `Cannot delete "${categoryName}" because ${count} article(s) are currently tagged with it.`
      );
      return;
    }

    if (!confirm(`Are you sure you want to remove category "${categoryName}"?`)) {
      return;
    }

    setIsDeleting(categoryName);
    try {
      const res = await fetch(`/api/blog/categories?name=${encodeURIComponent(categoryName)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('success', `Category "${categoryName}" removed.`);
        await onRefreshCategories();
      } else {
        const data = await res.json();
        showToast('error', data.error || 'Failed to delete category');
      }
    } catch {
      showToast('error', 'Network error removing category');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Creation Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E0D5] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C5A880]">
              Taxonomy & Content Organization
            </span>
            <h3 className="font-luxury-serif text-2xl font-bold text-[#1C3829]">
              Blog Categories Manager
            </h3>
            <p className="text-xs text-[#68726B] max-w-2xl">
              Create and manage topic categories for your blog. Newly created categories immediately appear in the post editor and on the public blog navigation filter.
            </p>
          </div>
        </div>

        {/* Create Category Form */}
        <form onSubmit={handleCreate} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 text-[#8C9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. Hidden Temple Gems, Photography Tips, Cultural Etiquette..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D5] text-xs sm:text-sm text-[#1C3829] placeholder:text-[#8C9690] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          <button
            type="submit"
            disabled={!newCatName.trim() || isSubmitting}
            className="px-6 py-3 rounded-2xl bg-[#C5A880] hover:bg-[#DFCAA8] text-[#12241A] text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{isSubmitting ? 'Creating...' : 'Create Category'}</span>
          </button>
        </form>
      </div>

      {/* Categories Grid List */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E7E0D5] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D5]">
          <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829] flex items-center space-x-2">
            <span>Active Categories</span>
            <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-[#1C3829]/10 text-[#1C3829]">
              {categories.length} total
            </span>
          </h4>
          <span className="text-[11px] text-[#68726B]">
            Categories with 0 articles can be safely removed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const count = getPostCount(cat);
            return (
              <div
                key={cat}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D5] flex items-center justify-between hover:border-[#C5A880] transition-colors group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#1C3829]/10 text-[#1C3829] flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-sm font-semibold text-[#1C3829] truncate">
                      {cat}
                    </h5>
                    <p className="text-[11px] text-[#68726B] flex items-center space-x-1">
                      <FileText className="w-3 h-3 text-[#C5A880]" />
                      <span>{count} {count === 1 ? 'article' : 'articles'}</span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-2">
                  {count === 0 ? (
                    <button
                      onClick={() => handleDelete(cat)}
                      disabled={isDeleting === cat}
                      className="p-2 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title={`Delete "${cat}"`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                      In Use
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
