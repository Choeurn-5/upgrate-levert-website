import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Clock, ArrowRight, User, Tag, Sparkles, Compass, MessageCircle, X, Eye, Heart } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, BlogPost, AppRoute } from '../types';
import { BLOG_CATEGORIES } from '../data/blogData';
import { SITE_SETTINGS } from '../lib/site-settings';

interface BlogListViewProps {
  heroConfig: HeroConfig;
  posts: BlogPost[];
  onNavigate: (route: AppRoute, slug?: string) => void;
  onOpenHeroManager: () => void;
  isLoading?: boolean;
}

export const BlogListView: React.FC<BlogListViewProps> = ({
  heroConfig,
  posts,
  onNavigate,
  onOpenHeroManager,
  isLoading = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesList, setCategoriesList] = useState<string[]>(['All Stories', ...BLOG_CATEGORIES.filter((c) => c !== 'All Stories')]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const POSTS_PER_PAGE = 6;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Dynamically load categories from API and posts
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('/api/blog/categories');
        if (res.ok) {
          const apiCats = await res.json();
          if (Array.isArray(apiCats)) {
            const postCats = posts.map((p) => p.category).filter(Boolean);
            const allUnique = Array.from(new Set(['All Stories', ...apiCats, ...postCats]));
            setCategoriesList(allUnique);
          }
        }
      } catch (err) {
        // Fallback handled below
      }
      const postCats = posts.map((p) => p.category).filter(Boolean);
      const allUnique = Array.from(new Set(['All Stories', ...BLOG_CATEGORIES.filter((c) => c !== 'All Stories'), ...postCats]));
      setCategoriesList(allUnique);
    }
    
    async function fetchViewsAndLikes() {
      try {
        const [viewsRes, likesRes] = await Promise.all([
          fetch('/api/blog/views'),
          fetch('/api/blog/likes')
        ]);
        
        if (viewsRes.ok) {
          setViewCounts(await viewsRes.json());
        }
        if (likesRes.ok) {
          setLikeCounts(await likesRes.json());
        }
      } catch (err) {
        console.error('Failed to fetch views or likes', err);
      }
    }
    
    loadCategories();
    fetchViewsAndLikes();
  }, [posts]);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Must be published for public view
      if (post.status !== 'published') return false;

      const matchesCategory =
        selectedCategory === 'All Stories' ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Find the primary featured post or first post
  const featuredPost = useMemo(() => {
    return filteredPosts.find((p) => p.isFeatured) || filteredPosts[0];
  }, [filteredPosts]);

  // Grid posts excluding the featured one if no active search
  const gridPosts = useMemo(() => {
    if (searchQuery.trim() || selectedCategory !== 'All Stories') {
      return filteredPosts;
    }
    return filteredPosts.filter((p) => p.id !== featuredPost?.id);
  }, [filteredPosts, featuredPost, searchQuery, selectedCategory]);

  const handlePostClick = (slug: string) => {
    // Navigate to single post
    onNavigate('/blog/', slug);
  };

  // Pagination Logic
  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = gridPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* 1. Replaceable Hero */}
      <Hero
        config={heroConfig}
        onPrimaryClick={() => {
          const el = document.getElementById('articles-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        primaryButtonText="Explore All Stories"
        onOpenHeroManager={onOpenHeroManager}
      />

      {/* 2. Search & Category Filter Navigation */}
      <section id="articles-section" className="pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E7E0D5]">
          {/* Categories Tab */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C3829] text-[#FAF8F5] shadow-sm'
                      : 'bg-white text-[#4A554F] border border-[#E7E0D5] hover:border-[#C5A880] hover:text-[#1C3829]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#8C9690] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, temples, tips..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-[#E7E0D5] text-xs sm:text-sm text-[#1C3829] placeholder:text-[#8C9690] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter / Filter status */}
        <div className="pt-4 flex items-center justify-between text-xs text-[#68726B]">
          <span>
            Showing <strong className="text-[#1C3829]">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'story' : 'stories'}
            {selectedCategory !== 'All Stories' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          {(searchQuery || selectedCategory !== 'All Stories') && (
            <button
              onClick={() => {
                setSelectedCategory('All Stories');
                setSearchQuery('');
              }}
              className="text-[#C5A880] hover:underline font-medium"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
            <h3 className="text-xl font-luxury-serif text-[#1C3829] mb-2">Loading Journals...</h3>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredPosts.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-[#E7E0D5] mt-8">
            <div className="w-16 h-16 bg-[#2D5540]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-[#1C3829]" />
            </div>
            <h3 className="text-2xl font-luxury-serif text-[#1C3829] mb-3">No articles match your criteria</h3>
            <p className="text-[#68726B] font-light max-w-md mx-auto mb-8">
              Try adjusting your search terms or selecting a different category to discover our curated stories.
            </p>
            {(searchQuery || selectedCategory !== 'All Stories') && (
              <button
                onClick={() => {
                  setSelectedCategory('All Stories');
                  setSearchQuery('');
                }}
                className="text-[#C5A880] hover:underline font-medium"
              >
                Reset filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* 3. Featured Story Showcase (Only if no active search or filter) */}
      {!isLoading && !searchQuery && selectedCategory === 'All Stories' && featuredPost && (
        <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => handlePostClick(featuredPost.slug)}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#E7E0D5] hover:border-[#C5A880] hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Featured Image */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden bg-stone-100">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1C3829]/90 backdrop-blur-sm text-[#DFCAA8] text-xs font-semibold tracking-wider uppercase border border-[#C5A880]/30 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Featured Guide</span>
              </div>
            </div>

            {/* Featured Text Content */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-xs text-[#68726B]">
                  <span className="px-2.5 py-1 rounded-md bg-[#2D5540]/10 text-[#1C3829] font-medium tracking-wide">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{featuredPost.readTimeMinutes} min read</span>
                  </span>
                  {viewCounts[featuredPost.slug] !== undefined && (
                    <>
                      <span>•</span>
                      <span className="flex items-center space-x-1 text-[#1C3829]">
                        <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{viewCounts[featuredPost.slug]}</span>
                      </span>
                    </>
                  )}
                  {likeCounts[featuredPost.slug] !== undefined && (
                    <>
                      <span>•</span>
                      <span className="flex items-center space-x-1 text-[#1C3829]">
                        <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400/20" />
                        <span>{likeCounts[featuredPost.slug]}</span>
                      </span>
                    </>
                  )}
                </div>

                <h2 className="font-luxury-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C3829] group-hover:text-[#2D5540] transition-colors leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-[#68726B] font-light leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              {/* Author & CTA */}
              <div className="pt-6 border-t border-[#E7E0D5] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={featuredPost.author.avatar || '/images/default-avatar.svg'}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#C5A880]/50 bg-[#14281D]"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C3829]">
                      {featuredPost.author.name}
                    </h4>
                    <p className="text-[11px] text-[#68726B]">
                      {formatDate(featuredPost.publishedAt)}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1C3829] group-hover:text-[#C5A880] transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Article Grid */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {gridPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E7E0D5] p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#2D5540]/10 text-[#1C3829] mx-auto flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-luxury-serif text-2xl font-semibold text-[#1C3829]">
              No Stories Found
            </h3>
            <p className="text-xs sm:text-sm text-[#68726B] max-w-md mx-auto">
              We couldn't find any articles matching your search criteria. Try adjusting your search term or exploring another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Stories');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#1C3829] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#12241A] transition-colors"
            >
              Show All Stories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => handlePostClick(post.slug)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#E7E0D5] hover:border-[#C5A880] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Cover Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-stone-100">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#1C3829]/85 backdrop-blur-sm text-[#FAF8F5] text-[11px] font-medium tracking-wide">
                      {post.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center space-x-2 text-[11px] text-[#68726B]">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-[#C5A880]" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#C5A880]" />
                        <span>{post.readTimeMinutes} min read</span>
                      </span>
                      {viewCounts[post.slug] !== undefined && (
                        <>
                          <span>•</span>
                          <span className="flex items-center space-x-1 text-[#1C3829]">
                            <Eye className="w-3 h-3 text-[#C5A880]" />
                            <span>{viewCounts[post.slug]}</span>
                          </span>
                        </>
                      )}
                      {likeCounts[post.slug] !== undefined && (
                        <>
                          <span>•</span>
                          <span className="flex items-center space-x-1 text-[#1C3829]">
                            <Heart className="w-3 h-3 text-red-400 fill-red-400/20" />
                            <span>{likeCounts[post.slug]}</span>
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-luxury-serif text-xl sm:text-2xl font-bold text-[#1C3829] group-hover:text-[#2D5540] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#68726B] font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#E7E0D5]/70 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={post.author.avatar || '/images/default-avatar.svg'}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#C5A880]/40 bg-[#14281D]"
                    />
                    <span className="text-xs text-[#1C3829] font-medium truncate max-w-[130px]">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="inline-flex items-center space-x-1 text-xs font-semibold text-[#1C3829] group-hover:text-[#C5A880] transition-colors">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border border-[#E7E0D5] flex items-center justify-center text-[#1C3829] hover:bg-[#F2EDE4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-1 px-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
                    currentPage === pageNum 
                      ? 'bg-[#1C3829] text-[#FAF8F5]' 
                      : 'text-[#1C3829] hover:bg-[#F2EDE4]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border border-[#E7E0D5] flex items-center justify-center text-[#1C3829] hover:bg-[#F2EDE4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Philosophy & Leadership Section */}
      <section className="py-20 bg-white border-t border-[#E7E0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* 1. Vision & Core Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[#C5A880] font-bold tracking-widest uppercase text-xs">Our Heritage</span>
                <h2 className="font-luxury-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C3829] leading-tight">
                  A Vision Rooted in <br/> Family and Passion
                </h2>
              </div>
              <p className="text-[#68726B] font-light leading-relaxed">
                At the heart of our hotel philosophy is our owner, <strong>Ek Darin</strong>, alongside his son, <strong>Rin Kongvin</strong>, who leads daily operations as our Operations Manager.
                For Ek Darin, hospitality is a labor of love and a tribute to rich Cambodian culture. Working side by side, the father-and-son duo brings a unique balance of tradition and modern standards to Le Vert Angkor Hotel.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#F5F2ED] flex items-center justify-center text-[#1C3829]">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-[#1C3829] text-sm">Authentic Khmer Warmth</h4>
                  <p className="text-xs text-[#68726B] font-light">Sharing local culture, flavors, and genuine hospitality.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#F5F2ED] flex items-center justify-center text-[#1C3829]">
                    <User className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-[#1C3829] text-sm">Personalized Service</h4>
                  <p className="text-xs text-[#68726B] font-light">Tailoring recommendations and service to your preferences.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#F5F2ED] flex items-center justify-center text-[#1C3829]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-[#1C3829] text-sm">A Peaceful Sanctuary</h4>
                  <p className="text-xs text-[#68726B] font-light">A refreshing retreat with a rooftop pool and lush gardens.</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#F5F2ED] flex items-center justify-center text-[#1C3829]">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-[#1C3829] text-sm">Community & Care</h4>
                  <p className="text-xs text-[#68726B] font-light">Operating as a close family unit to ensure an uplifting stay.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100 shadow-2xl relative z-10">
                <img 
                  src="/images/Home/home-hotel-story/DSCF7100.jpg" 
                  alt="Le Vert Angkor Hotel Philosophy" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#F5F2ED] rounded-full z-0"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#2D5540]/10 rounded-full z-0"></div>
            </div>
          </div>

          {/* 2. Leadership Team */}
          <div className="space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-[#C5A880] font-bold tracking-widest uppercase text-xs">Our People</span>
              <h2 className="font-luxury-serif text-3xl sm:text-4xl font-semibold text-[#1C3829]">
                Service Driven by Heart
              </h2>
              <p className="text-[#68726B] font-light">
                Every step of your stay is looked after by passionate leaders who care about your comfort.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Deepool */}
              <div className="group flex flex-col sm:flex-row gap-6 items-start p-6 rounded-3xl hover:bg-[#F5F2ED] transition-colors border border-transparent hover:border-[#E7E0D5]">
                <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-stone-100 shadow-md">
                  <img src="/images/staff-image/deepool-front-office-manager.jpg" alt="Deepool - Front Office Manager" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-luxury-serif text-xl font-semibold text-[#1C3829]">Deepool</h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">Front Office Manager</p>
                  </div>
                  <p className="text-sm text-[#68726B] font-light leading-relaxed">
                    Deepool leads our front-desk team with an emphasis on attentive, seamless service. Whether overseeing operations, organizing tours, or arranging transport, he ensures your visit feels personalized.
                  </p>
                </div>
              </div>

              {/* Sotheara */}
              <div className="group flex flex-col sm:flex-row gap-6 items-start p-6 rounded-3xl hover:bg-[#F5F2ED] transition-colors border border-transparent hover:border-[#E7E0D5]">
                <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-stone-100 shadow-md">
                  <img src="/images/staff-image/sotheara-front-office-supervisor.jpg" alt="Sotheara - Front Office Supervisor" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-luxury-serif text-xl font-semibold text-[#1C3829]">Sotheara</h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">Front Office Supervisor</p>
                  </div>
                  <p className="text-sm text-[#68726B] font-light leading-relaxed">
                    Working alongside Deepool, Sotheara brings a warm, welcoming presence to the lobby. She is always ready to share local secrets and assist with guest requests to ensure a smooth stay.
                  </p>
                </div>
              </div>

              {/* Veasna */}
              <div className="group flex flex-col sm:flex-row gap-6 items-start p-6 rounded-3xl hover:bg-[#F5F2ED] transition-colors border border-transparent hover:border-[#E7E0D5]">
                <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-stone-100 shadow-md">
                  <img src="/images/staff-image/veasna-restaurant-supervisor.jpg" alt="Veasna - Restaurant Supervisor" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-luxury-serif text-xl font-semibold text-[#1C3829]">Veasna</h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">Restaurant & Sky Bar Supervisor</p>
                  </div>
                  <p className="text-sm text-[#68726B] font-light leading-relaxed">
                    Veasna oversees our dining venue and Rooftop Sky Bar. Whether you're enjoying breakfast or sipping sunset cocktails by the pool, he ensures a warm, attentive, and cozy atmosphere.
                  </p>
                </div>
              </div>

              {/* Sous Chef Chansy */}
              <div className="group flex flex-col sm:flex-row gap-6 items-start p-6 rounded-3xl hover:bg-[#F5F2ED] transition-colors border border-transparent hover:border-[#E7E0D5]">
                <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-stone-100 shadow-md">
                  <img src="/images/staff-image/chansy-sous-chef.jpg" alt="Sous Chef Chansy" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-luxury-serif text-xl font-semibold text-[#1C3829]">Chansy</h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">Sous Chef</p>
                  </div>
                  <p className="text-sm text-[#68726B] font-light leading-relaxed">
                    Behind every memorable dish is the culinary artistry of Sous Chef Chansy. Crafting menus that celebrate authentic Cambodian specialties, Chansy prepares every meal with heartfelt care.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. Concierge & Travel Inquiries Reassurance Strip */}
      <section className="py-16 bg-[#14281D] text-[#FAF8F5] border-t border-[#2D5540]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block">
              Bespoke Experience
            </span>
            <h3 className="font-luxury-serif text-2xl sm:text-3xl font-semibold text-white">
              Planning Your Personal Journey to Siem Reap?
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 font-light max-w-xl">
              Our concierge team is at your disposal to arrange private temple chauffeurs, local sunrise tours, and dining reservations prior to your arrival.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={SITE_SETTINGS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C5A880] text-[#12241A] font-semibold text-xs uppercase tracking-wider hover:bg-[#DFCAA8] transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Our Concierge</span>
            </a>
            <a
              href={SITE_SETTINGS.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 font-semibold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Book Your Stay Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
