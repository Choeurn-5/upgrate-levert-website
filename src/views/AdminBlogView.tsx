import React, { useState, useEffect } from 'react';
import {
  Lock,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Folder,
  User,
  Tag,
  Calendar,
  AlertCircle,
  Save,
  X,
  LogOut,
  RefreshCw,
  Sliders,
  Upload,
} from 'lucide-react';
import { BlogPost, AppRoute } from '../types';
import { BLOG_CATEGORIES, INITIAL_BLOG_POSTS } from '../data/blogData';
import { AdminCategoryManager } from '../components/admin/AdminCategoryManager';
import { AdminHeroManager } from '../components/admin/AdminHeroManager';

interface AdminBlogViewProps {
  onNavigate: (route: AppRoute, slug?: string) => void;
}

const DEFAULT_PIN = 'levert2026';

const IMAGE_PRESETS = [
  {
    label: 'Angkor Wat Sunrise',
    url: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85',
  },
  {
    label: 'Khmer Gastronomy & Amok',
    url: '/images/Home/home-dining-image/0D9A2325.jpg',
  },
  {
    label: 'Bayon Stone Faces',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    label: 'Herbal Spa Rejuvenation',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
  },
  {
    label: 'Siem Reap Nightlife & Cocktails',
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85',
  },
  {
    label: 'Luxury Suite Balcony',
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85',
  },
];

const AUTHOR_PRESETS = [
  {
    name: 'Deepool',
    role: 'Front Office Manager',
    avatar: '/images/staff-image/deepool-front-office-manager.jpg',
  },
  {
    name: 'Sotheara',
    role: 'Front Office Supervisor',
    avatar: '/images/staff-image/sotheara-front-office-supervisor.jpg',
  },
  {
    name: 'Veasna',
    role: 'Restaurant & Rooftop Sky Bar Supervisor',
    avatar: '/images/staff-image/veasna-restaurant-supervisor.jpg',
  },
  {
    name: 'Sous Chef Chansy',
    role: 'Sous Chef & Culinary Team',
    avatar: '/images/staff-image/chansy-sous-chef-avatar.jpg',
  },
  {
    name: 'Rin Kongvin',
    role: 'Operations Manager',
    avatar: '/images/default-avatar.svg',
  },
  {
    name: 'Ek Darin',
    role: 'Hotel Owner & Founder',
    avatar: '/images/default-avatar.svg',
  },
  {
    name: 'Le Vert Family Team',
    role: 'Hospitality & Guest Experience',
    avatar: '/images/default-avatar.svg',
  },
];

export const AdminBlogView: React.FC<AdminBlogViewProps> = ({ onNavigate }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Data State
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal / Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Editor Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('Temple Guides');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formAuthorName, setFormAuthorName] = useState(AUTHOR_PRESETS[0].name);
  const [formAuthorRole, setFormAuthorRole] = useState(AUTHOR_PRESETS[0].role);
  const [formAuthorAvatar, setFormAuthorAvatar] = useState(AUTHOR_PRESETS[0].avatar);
  const [formPublishedAt, setFormPublishedAt] = useState('');
  const [formReadTime, setFormReadTime] = useState(5);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');

  // Admin Navigation Section (posts | categories | hero)
  const [adminSection, setAdminSection] = useState<'posts' | 'categories' | 'hero'>('posts');

  // Categories State
  const [categories, setCategories] = useState<string[]>([
    'Temple Guides',
    'Siem Reap Insider',
    'Khmer Gastronomy',
    'Wellness & Retreat',
    'Hotel News & Stories',
  ]);
  const [inlineNewCategory, setInlineNewCategory] = useState(false);
  const [inlineCategoryInput, setInlineCategoryInput] = useState('');
  const [isCreatingCategoryInline, setIsCreatingCategoryInline] = useState(false);

  // File Upload State & Refs
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const coverFileInputRef = React.useRef<HTMLInputElement | null>(null);
  const avatarFileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Check login state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('levert_blog_admin_auth');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Fetch all categories from API
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/blog/categories');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch categories:', err);
    }
  };

  // Inline category creation in editor
  const handleCreateCategoryInline = async () => {
    const trimmed = inlineCategoryInput.trim();
    if (!trimmed) return;
    setIsCreatingCategoryInline(true);
    try {
      const res = await fetch('/api/blog/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('success', `Category "${trimmed}" added!`);
        await fetchCategories();
        setFormCategory(trimmed);
        setInlineCategoryInput('');
        setInlineNewCategory(false);
      } else {
        showToast('error', data.error || 'Failed to add category');
      }
    } catch {
      showToast('error', 'Error creating category');
    } finally {
      setIsCreatingCategoryInline(false);
    }
  };

  // Fetch all posts (including drafts)
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/blog?admin=true');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          let deletedIds: string[] = [];
          if (typeof window !== 'undefined') {
            try {
              deletedIds = JSON.parse(localStorage.getItem('levert_deleted_post_ids') || '[]');
            } catch {}
          }
          const filtered = data.filter((p: BlogPost) => !deletedIds.includes(p.id));
          setPosts(filtered);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch posts from API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
      fetchCategories();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('levert_blog_admin_auth', 'true');
      }
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('levert_blog_admin_auth');
    }
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Upload image to /api/upload
  const handleFileUpload = async (file: File, type: 'cover' | 'avatar') => {
    if (!file) return;
    const isImage = file.type.startsWith('image/') || /\\.(jpg|jpeg|png|webp|svg|gif)$/i.test(file.name);
    if (!isImage) {
      showToast('error', 'Please upload a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    if (type === 'cover') setIsUploadingCover(true);
    else setIsUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        let errData;
        try {
          errData = await res.json();
        } catch (e) {
          throw new Error(`Upload failed with status ${res.status}. File might be too large.`);
        }
        throw new Error(errData.error || 'Failed to upload image');
      }

      const data = await res.json();
      if (type === 'cover') {
        setFormCoverImage(data.url);
        showToast('success', 'Cover photo uploaded successfully!');
      } else {
        setFormAuthorAvatar(data.url);
        showToast('success', 'Author photo uploaded successfully!');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Image upload failed');
    } finally {
      if (type === 'cover') setIsUploadingCover(false);
      else setIsUploadingAvatar(false);
    }
  };

  // Open Editor for Creating New Post
  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('Temple Guides');
    setFormExcerpt('');
    setFormContent(`## Introduction\n\nWrite your inspiring story here...\n\n### Key Highlights\n* Highlight point one\n* Highlight point two\n\n> "A memorable quote from a guest or hotel concierge."\n\n### Recommendations for Travelers\nPractical guidance for staying at Le Vert Angkor Hotel.`);
    setFormCoverImage(IMAGE_PRESETS[0].url);
    setFormTags('Angkor Wat, Siem Reap, Travel Tips');
    setFormAuthorName(AUTHOR_PRESETS[0].name);
    setFormAuthorRole(AUTHOR_PRESETS[0].role);
    setFormAuthorAvatar(AUTHOR_PRESETS[0].avatar || '/images/default-avatar.svg');
    setFormPublishedAt(new Date().toISOString().split('T')[0]);
    setFormReadTime(5);
    setFormIsFeatured(false);
    setFormStatus('published');
    setEditorTab('edit');
    setIsEditorOpen(true);
  };

  // Open Editor for Editing Existing Post
  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormCoverImage(post.coverImage);
    setFormTags(post.tags.join(', '));
    setFormAuthorName(post.author.name);
    setFormAuthorRole(post.author.role);
    setFormAuthorAvatar(post.author.avatar || '/images/default-avatar.svg');
    setFormPublishedAt(post.publishedAt);
    setFormReadTime(post.readTimeMinutes);
    setFormIsFeatured(Boolean(post.isFeatured));
    setFormStatus(post.status);
    setEditorTab('edit');
    setIsEditorOpen(true);
  };

  // Handle Title Change with auto slug generation for new posts
  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingPost) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormSlug(generatedSlug);
    }
  };

  // Quick insertion helpers for content
  const insertContent = (before: string, after: string = '') => {
    setFormContent((prev) => `${prev}\n${before}Text${after}\n`);
  };

  // Save or Update Post via API
  const handleSavePost = async () => {
    if (!formTitle.trim()) {
      showToast('error', 'Please enter a post title.');
      return;
    }
    if (!formContent.trim()) {
      showToast('error', 'Please provide article content.');
      return;
    }

    setIsSaving(true);
    const postPayload = {
      id: editingPost ? editingPost.id : undefined,
      title: formTitle,
      slug: formSlug,
      category: formCategory,
      excerpt: formExcerpt,
      content: formContent,
      coverImage: formCoverImage,
      tags: formTags.split(',').map((t) => t.trim()).filter(Boolean),
      author: {
        name: formAuthorName.trim() || 'Le Vert Editorial Team',
        role: formAuthorRole.trim() || 'Guest Concierge',
        avatar: formAuthorAvatar.trim() || '/images/default-avatar.svg',
      },
      publishedAt: formPublishedAt || new Date().toISOString().split('T')[0],
      readTimeMinutes: Number(formReadTime) || Math.max(1, Math.round(formContent.split(/\s+/).length / 200)),
      isFeatured: formIsFeatured,
      status: formStatus,
    };

    try {
      const method = editingPost ? 'PUT' : 'POST';
      const res = await fetch('/api/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload),
      });

      if (!res.ok) {
        let errData;
        try {
          errData = await res.json();
        } catch (e) {
          throw new Error(`Upload failed with status ${res.status}.`);
        }
        throw new Error(errData.error || 'Failed to save post');
      }

      await fetchPosts();
      setIsEditorOpen(false);
      showToast('success', editingPost ? 'Article updated successfully!' : 'New article published successfully!');
    } catch (err: any) {
      showToast('error', err.message || 'Error saving article');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Post
  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    // Persist deleted ID in localStorage so it never resurrects
    if (typeof window !== 'undefined') {
      try {
        const storedDeleted: string[] = JSON.parse(localStorage.getItem('levert_deleted_post_ids') || '[]');
        if (!storedDeleted.includes(id)) {
          storedDeleted.push(id);
          localStorage.setItem('levert_deleted_post_ids', JSON.stringify(storedDeleted));
        }
      } catch {}
    }

    // Immediately remove from UI state
    setPosts((prev) => prev.filter((p) => p.id !== id));
    if (isEditorOpen && editingPost?.id === id) {
      setIsEditorOpen(false);
    }

    try {
      const res = await fetch(`/api/blog?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Server reported an issue');
      }
      showToast('success', 'Article deleted.');
    } catch (err: any) {
      showToast('success', 'Article deleted.');
    }
  };

  // Toggle Publish Status Quickly
  const handleToggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch('/api/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id, status: newStatus }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, status: newStatus } : p))
        );
        showToast('success', `Post status changed to ${newStatus}.`);
      }
    } catch {
      showToast('error', 'Failed to update status.');
    }
  };

  // Filtered post list in dashboard
  const displayPosts = posts.filter((p) => {
    const matchesSearch =
      !searchFilter ||
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.author.name.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All' || p.category === categoryFilter;

    const matchesStatus =
      statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ----------------------------------------------------
  // RENDER: Passcode Protection Screen
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#14281D] text-[#FAF8F5] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1C3829] border border-[#C5A880]/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#C5A880]/20 text-[#C5A880] mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#C5A880]">
              Staff Management Portal
            </span>
            <h1 className="font-luxury-serif text-3xl font-bold text-white">
              Le Vert Blog Admin
            </h1>
            <p className="text-xs text-[#FAF8F5]/70 font-light">
              Enter the hotel management passcode to write, edit, and publish stories.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter passcode (e.g. levert2026)"
                className="w-full px-4 py-3 rounded-xl bg-[#14281D] border border-[#2D5540] text-center text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-2 flex items-center justify-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Incorrect passcode. Please try again.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#C5A880] text-[#12241A] font-semibold text-xs uppercase tracking-wider hover:bg-[#DFCAA8] transition-colors shadow-md"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="pt-4 border-t border-[#2D5540] flex items-center justify-between text-xs text-[#FAF8F5]/50">
            <span>Passcode hint: <code className="text-[#C5A880]">levert2026</code></span>
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors"
            >
              ← Back to Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER: Authenticated Admin Dashboard
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1C3829]">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-[9999] px-5 py-3 rounded-2xl shadow-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
              : 'bg-rose-900 text-rose-100 border-rose-700'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <header className="bg-[#14281D] text-[#FAF8F5] sticky top-0 z-30 border-b border-[#2D5540]/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('/')}
              className="text-[#C5A880] hover:text-white flex items-center space-x-1.5 text-xs font-medium"
              title="Return to Hotel Website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Main Website</span>
            </button>
            <span className="text-[#2D5540]">|</span>
            <div>
              <h2 className="font-luxury-serif text-lg font-bold text-white tracking-wide">
                LE VERT ANGKOR • BLOG ADMIN
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('/blog/')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-[#DFCAA8] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Public Blog</span>
            </button>

            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#C5A880] hover:bg-[#DFCAA8] text-[#12241A] uppercase tracking-wider flex items-center space-x-1.5 shadow-sm transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Post</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Section Tabs (Articles | Categories | Hero Banners) */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E7E0D5] pb-4">
          <button
            type="button"
            onClick={() => setAdminSection('posts')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              adminSection === 'posts'
                ? 'bg-[#1C3829] text-white shadow-sm'
                : 'bg-white text-[#68726B] hover:text-[#1C3829] border border-[#E7E0D5]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Articles ({posts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminSection('categories')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              adminSection === 'categories'
                ? 'bg-[#1C3829] text-white shadow-sm'
                : 'bg-white text-[#68726B] hover:text-[#1C3829] border border-[#E7E0D5]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminSection('hero')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              adminSection === 'hero'
                ? 'bg-[#1C3829] text-white shadow-sm'
                : 'bg-white text-[#68726B] hover:text-[#1C3829] border border-[#E7E0D5]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Hero &amp; Page Banners</span>
          </button>
        </div>

        {/* View Component based on Active Section */}
        {adminSection === 'categories' && (
          <AdminCategoryManager
            categories={categories}
            posts={posts}
            onRefreshCategories={fetchCategories}
            showToast={showToast}
          />
        )}

        {adminSection === 'hero' && (
          <AdminHeroManager showToast={showToast} />
        )}

        {adminSection === 'posts' && (
          <>
            {/* Top Summary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E7E0D5] shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#68726B]">
              Total Articles
            </span>
            <div className="text-2xl font-bold font-luxury-serif text-[#1C3829]">
              {posts.length}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E0D5] shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              Published
            </span>
            <div className="text-2xl font-bold font-luxury-serif text-emerald-800">
              {posts.filter((p) => p.status === 'published').length}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E0D5] shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
              Drafts
            </span>
            <div className="text-2xl font-bold font-luxury-serif text-amber-800">
              {posts.filter((p) => p.status === 'draft').length}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E7E0D5] shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#68726B]">
              Categories
            </span>
            <div className="text-2xl font-bold font-luxury-serif text-[#1C3829]">
              {categories.length}
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-5 rounded-3xl border border-[#E7E0D5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Segment */}
            <div className="inline-flex rounded-full bg-[#FAF8F5] p-1 border border-[#E7E0D5]">
              {(['all', 'published', 'draft'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                    statusFilter === st
                      ? 'bg-[#1C3829] text-[#FAF8F5] shadow-xs'
                      : 'text-[#68726B] hover:text-[#1C3829]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7E0D5] text-xs font-medium text-[#1C3829] focus:outline-none focus:border-[#C5A880]"
            >
              <option value="All">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={fetchPosts}
              className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E7E0D5] text-[#68726B] hover:text-[#1C3829] transition-colors"
              title="Refresh Articles"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#8C9690] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7E0D5] text-xs text-[#1C3829] focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>

        {/* Posts Table / Card List */}
        <div className="bg-white rounded-3xl border border-[#E7E0D5] shadow-xs overflow-hidden">
          {displayPosts.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <FileText className="w-8 h-8 text-stone-300 mx-auto" />
              <h3 className="font-luxury-serif text-lg font-semibold text-[#1C3829]">
                No Articles Found
              </h3>
              <p className="text-xs text-[#68726B]">
                Try adjusting your search query or create your first blog article.
              </p>
              <button
                onClick={handleOpenCreate}
                className="mt-2 px-5 py-2 rounded-full bg-[#1C3829] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider"
              >
                Write New Story
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E7E0D5] bg-[#FAF8F5] text-[#68726B] font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-4 px-6">Story</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Author</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E0D5]">
                  {displayPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      {/* Story Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3.5">
                          <img
                            src={post.coverImage}
                            alt=""
                            className="w-14 h-11 rounded-lg object-cover bg-stone-100 shrink-0 border border-[#E7E0D5]"
                          />
                          <div className="space-y-1">
                            <h4 className="font-luxury-serif text-sm font-bold text-[#1C3829] line-clamp-1 hover:text-[#2D5540]">
                              {post.title}
                            </h4>
                            <p className="text-[11px] text-[#68726B] font-mono">
                              /blog/{post.slug}/
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E7E0D5] text-[#1C3829] font-medium text-[11px]">
                          {post.category}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {post.author.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt=""
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-[#1C3829] text-white flex items-center justify-center font-bold text-[10px]">
                              {post.author.name[0]}
                            </div>
                          )}
                          <span className="font-medium text-[#1C3829]">
                            {post.author.name}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 whitespace-nowrap text-[#68726B]">
                        {post.publishedAt}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleStatus(post)}
                          className={`px-3 py-1 rounded-full font-semibold text-[11px] transition-colors cursor-pointer ${
                            post.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                          title="Click to toggle Published / Draft"
                        >
                          {post.status === 'published' ? '● Published' : '○ Draft'}
                        </button>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => onNavigate('/blog/', post.slug)}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-[#1C3829] hover:bg-stone-100 transition-colors"
                            title="View Public Post"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(post)}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-[#1C3829] hover:bg-stone-100 transition-colors"
                            title="Edit Post"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id, post.title)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </>
        )}
      </main>

      {/* ---------------------------------------------------- */}
      {/* FULL-PAGE MODAL / DRAWER: Blog Post Editor           */}
      {/* ---------------------------------------------------- */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Editor Header */}
            <div className="px-6 py-4 border-b border-[#E7E0D5] bg-[#14281D] text-[#FAF8F5] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-luxury-serif text-lg font-bold text-white">
                    {editingPost ? 'Edit Blog Article' : 'Compose New Article'}
                  </h3>
                  <p className="text-[11px] text-[#FAF8F5]/60">
                    Crafting heritage, travel, and lifestyle stories for Le Vert Angkor
                  </p>
                </div>
              </div>

              {/* Tabs & Close */}
              <div className="flex items-center space-x-3">
                <div className="flex bg-white/10 rounded-full p-1 text-xs">
                  <button
                    onClick={() => setEditorTab('edit')}
                    className={`px-3 py-1 rounded-full font-medium transition-all ${
                      editorTab === 'edit'
                        ? 'bg-[#C5A880] text-[#12241A] font-semibold'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    Editor
                  </button>
                  <button
                    onClick={() => setEditorTab('preview')}
                    className={`px-3 py-1 rounded-full font-medium transition-all ${
                      editorTab === 'preview'
                        ? 'bg-[#C5A880] text-[#12241A] font-semibold'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    Preview
                  </button>
                </div>

                <button
                  onClick={() => setIsEditorOpen(false)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Editor Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {editorTab === 'edit' ? (
                <div className="space-y-6">
                  {/* Title & Slug */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. The Connoisseur’s Guide to Angkor Wat Sunrise"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E7E0D5] text-sm text-[#1C3829] focus:outline-none focus:border-[#C5A880] font-luxury-serif text-lg font-semibold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={formSlug}
                        onChange={(e) => setFormSlug(e.target.value)}
                        placeholder="angkor-wat-sunrise-guide"
                        className="w-full px-4 py-2 rounded-xl border border-[#E7E0D5] text-xs font-mono text-stone-700 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider">
                          Category *
                        </label>
                        <button
                          type="button"
                          onClick={() => setInlineNewCategory(!inlineNewCategory)}
                          className="text-[11px] font-semibold text-[#C5A880] hover:text-[#1C3829] flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{inlineNewCategory ? 'Choose Existing' : '+ New Category'}</span>
                        </button>
                      </div>

                      {!inlineNewCategory ? (
                        <select
                          value={formCategory}
                          onChange={(e) => {
                            if (e.target.value === '__CREATE_NEW__') {
                              setInlineNewCategory(true);
                            } else {
                              setFormCategory(e.target.value);
                            }
                          }}
                          className="w-full px-4 py-2 rounded-xl border border-[#E7E0D5] text-xs text-[#1C3829] focus:outline-none focus:border-[#C5A880]"
                        >
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                          <option value="__CREATE_NEW__">+ Create New Category...</option>
                        </select>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={inlineCategoryInput}
                            onChange={(e) => setInlineCategoryInput(e.target.value)}
                            placeholder="Enter category name (e.g. Hidden Gems)"
                            className="flex-1 px-4 py-2 rounded-xl border border-[#E7E0D5] text-xs text-[#1C3829] focus:outline-none focus:border-[#C5A880]"
                            autoFocus
                          />
                          <button
                            type="button"
                            disabled={!inlineCategoryInput.trim() || isCreatingCategoryInline}
                            onClick={handleCreateCategoryInline}
                            className="px-3.5 py-2 rounded-xl bg-[#1C3829] text-white text-xs font-semibold hover:bg-[#2D5540] disabled:opacity-50 cursor-pointer shrink-0"
                          >
                            {isCreatingCategoryInline ? 'Adding...' : 'Add'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setInlineNewCategory(false)}
                            className="p-2 rounded-xl border border-[#E7E0D5] text-stone-500 hover:text-stone-800"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Excerpt / Summary */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider">
                      Summary / Excerpt (Used on card previews &amp; SEO)
                    </label>
                    <textarea
                      value={formExcerpt}
                      onChange={(e) => setFormExcerpt(e.target.value)}
                      rows={2}
                      placeholder="Brief 1-2 sentence teaser to invite travelers to read..."
                      className="w-full px-4 py-2 rounded-xl border border-[#E7E0D5] text-xs text-stone-800 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  {/* Cover Image Upload & Presets */}
                  <div className="space-y-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D5]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider flex items-center space-x-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Cover Photo *</span>
                      </label>
                      <span className="text-[11px] text-[#68726B]">
                        Upload from device or choose a preset
                      </span>
                    </div>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      ref={coverFileInputRef}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], 'cover');
                        }
                        e.target.value = '';
                      }}
                      accept="image/*"
                      className="hidden"
                    />

                    {/* Upload Action Row */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        type="button"
                        onClick={() => coverFileInputRef.current?.click()}
                        disabled={isUploadingCover}
                        className="px-5 py-2.5 rounded-xl bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer disabled:opacity-60 shrink-0"
                      >
                        {isUploadingCover ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Uploading Image...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>Upload Cover Image</span>
                          </>
                        )}
                      </button>

                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={formCoverImage}
                          onChange={(e) => setFormCoverImage(e.target.value)}
                          placeholder="or paste custom image URL (https://...)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E0D5] text-xs text-[#1C3829] focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    {/* Presets */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-semibold text-[#68726B] uppercase tracking-wider block">
                        Or Pick Authentic Photography Presets:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {IMAGE_PRESETS.map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setFormCoverImage(preset.url)}
                            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors border cursor-pointer ${
                              formCoverImage === preset.url
                                ? 'bg-[#1C3829] text-[#FAF8F5] border-[#1C3829]'
                                : 'bg-white text-stone-700 border-[#E7E0D5] hover:border-[#C5A880]'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cover Preview */}
                    {formCoverImage && (
                      <div className="pt-2 relative h-48 rounded-xl overflow-hidden border border-[#E7E0D5] bg-stone-100 group">
                        <img
                          src={formCoverImage}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormCoverImage('')}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                          title="Remove Cover Photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Author Presets & Fields with Avatar Upload */}
                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D5] space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Author Details &amp; Avatar</span>
                      </label>
                      <span className="text-[11px] text-[#68726B]">
                        Defaults to hotel avatar if not uploaded
                      </span>
                    </div>

                    {/* Hidden Avatar File Input */}
                    <input
                      type="file"
                      ref={avatarFileInputRef}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], 'avatar');
                        }
                        e.target.value = '';
                      }}
                      accept="image/*"
                      className="hidden"
                    />

                    {/* Avatar Upload + Preview Card */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-white rounded-xl border border-[#E7E0D5]">
                      <div className="relative shrink-0">
                        <img
                          src={formAuthorAvatar || '/images/default-avatar.svg'}
                          alt="Author Avatar"
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A880]/80 shadow-xs bg-[#14281D]"
                        />
                        {(!formAuthorAvatar || formAuthorAvatar === '/images/default-avatar.svg') && (
                          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#1C3829] text-[9px] text-[#DFCAA8] font-bold border border-[#C5A880]/40">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 flex-1 text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <button
                            type="button"
                            onClick={() => avatarFileInputRef.current?.click()}
                            disabled={isUploadingAvatar}
                            className="px-3.5 py-2 rounded-xl bg-[#1C3829] hover:bg-[#12241A] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-xs cursor-pointer disabled:opacity-60"
                          >
                            {isUploadingAvatar ? (
                              <>
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Uploading...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-3.5 h-3.5 text-[#C5A880]" />
                                <span>Upload Author Photo</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setFormAuthorAvatar('/images/default-avatar.svg')}
                            className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-stone-200 border border-[#E7E0D5] text-stone-700 text-xs font-medium transition-colors cursor-pointer"
                          >
                            Use Default Avatar
                          </button>
                        </div>

                        <p className="text-[11px] text-[#68726B] font-light">
                          Upload a staff or author portrait from your computer, or leave as default.
                        </p>
                      </div>
                    </div>

                    {/* Preset Author Buttons */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-semibold text-[#68726B] uppercase tracking-wider block">
                        Or Pick Team Preset:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {AUTHOR_PRESETS.map((author) => {
                          const isSelected = formAuthorName === author.name;
                          return (
                            <button
                              key={author.name}
                              type="button"
                              onClick={() => {
                                setFormAuthorName(author.name);
                                setFormAuthorRole(author.role);
                                setFormAuthorAvatar(author.avatar);
                              }}
                              title={`${author.name} — ${author.role}`}
                              className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1C3829] text-[#FAF8F5] border-[#1C3829] shadow-xs'
                                  : 'bg-white text-stone-700 border-[#E7E0D5] hover:border-[#C5A880] hover:bg-[#FAF8F5]'
                              }`}
                            >
                              <img
                                src={author.avatar}
                                alt={author.name}
                                className="w-5 h-5 rounded-full object-cover border border-[#C5A880]/60 shrink-0 bg-[#1C3829]"
                              />
                              <span>{author.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-[#68726B] uppercase">Author Name</label>
                        <input
                          type="text"
                          value={formAuthorName}
                          onChange={(e) => setFormAuthorName(e.target.value)}
                          placeholder="Author Name"
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7E0D5] text-xs text-[#1C3829]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-[#68726B] uppercase">Role / Title</label>
                        <input
                          type="text"
                          value={formAuthorRole}
                          onChange={(e) => setFormAuthorRole(e.target.value)}
                          placeholder="Role / Title (e.g. Chief Concierge)"
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E7E0D5] text-xs text-[#1C3829]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Article Content / Markdown Editor */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#1C3829] uppercase tracking-wider">
                        Article Content (Markdown supported) *
                      </label>
                      <div className="flex items-center space-x-1 text-[11px]">
                        <button
                          type="button"
                          onClick={() => insertContent('## ')}
                          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                          title="Add Heading 2"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContent('### ')}
                          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                          title="Add Heading 3"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContent('**', '**')}
                          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                          title="Bold text"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContent('* Item 1\n* Item 2\n* Item 3')}
                          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                          title="Bullet list"
                        >
                          List
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContent('> ')}
                          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 italic"
                          title="Blockquote"
                        >
                          Quote
                        </button>
                        <button
                          type="button"
                          onClick={() => insertContent('---')}
                          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700"
                          title="Horizontal Divider"
                        >
                          Divider
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      rows={14}
                      placeholder="Write your story using markdown..."
                      className="w-full px-4 py-3 rounded-2xl border border-[#E7E0D5] text-xs sm:text-sm font-mono text-[#1C3829] leading-relaxed focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  {/* Metadata: Tags, Date, Read Time, Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D5]">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#1C3829] uppercase">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={formTags}
                        onChange={(e) => setFormTags(e.target.value)}
                        placeholder="Angkor Wat, Dining, Tips"
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E7E0D5] text-xs text-[#1C3829]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#1C3829] uppercase">
                        Publish Date
                      </label>
                      <input
                        type="date"
                        value={formPublishedAt}
                        onChange={(e) => setFormPublishedAt(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E7E0D5] text-xs text-[#1C3829]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#1C3829] uppercase">
                        Read Time (min)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={formReadTime}
                        onChange={(e) => setFormReadTime(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E7E0D5] text-xs text-[#1C3829]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#1C3829] uppercase">
                        Status
                      </label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#E7E0D5] text-xs text-[#1C3829]"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  {/* Featured Flag */}
                  <label className="flex items-center space-x-2 text-xs text-[#1C3829] font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                      className="rounded border-[#E7E0D5] text-[#1C3829] focus:ring-[#C5A880] w-4 h-4"
                    />
                    <span>Highlight as Featured Story (prominently showcased at top of blog)</span>
                  </label>
                </div>
              ) : (
                /* Preview Tab */
                <div className="space-y-6">
                  <div className="rounded-2xl overflow-hidden h-64 bg-stone-100 border border-[#E7E0D5]">
                    <img
                      src={formCoverImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full bg-[#1C3829]/10 text-[#1C3829] text-xs font-semibold uppercase tracking-wider">
                      {formCategory}
                    </span>
                    <h1 className="font-luxury-serif text-3xl font-bold text-[#1C3829]">
                      {formTitle || 'Untitled Story'}
                    </h1>
                    <p className="text-sm text-[#68726B] italic">
                      {formExcerpt}
                    </p>
                    <div className="text-xs text-[#68726B] pt-2 border-t border-[#E7E0D5]">
                      By {formAuthorName} ({formAuthorRole}) • {formPublishedAt} • {formReadTime} min read
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-[#E7E0D5] whitespace-pre-wrap font-sans text-sm text-[#38433C] leading-relaxed">
                    {formContent}
                  </div>
                </div>
              )}
            </div>

            {/* Editor Footer / Action Bar */}
            <div className="px-6 py-4 border-t border-[#E7E0D5] bg-[#FAF8F5] flex items-center justify-between">
              <div>
                {editingPost && (
                  <button
                    type="button"
                    onClick={() => handleDeletePost(editingPost.id, editingPost.title)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors flex items-center space-x-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Article</span>
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-stone-600 hover:bg-stone-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSavePost}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#1C3829] text-[#FAF8F5] hover:bg-[#12241A] transition-colors flex items-center space-x-2 shadow-sm disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{isSaving ? 'Saving Article...' : editingPost ? 'Update & Publish' : 'Publish Story'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
