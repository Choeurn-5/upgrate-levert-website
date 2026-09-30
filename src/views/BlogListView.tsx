import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Clock, ArrowRight, User, Tag, Sparkles, Compass, MessageCircle, X } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroConfig, BlogPost, AppRoute } from '../types';
import { BLOG_CATEGORIES } from '../data/blogData';
import { SITE_SETTINGS } from '../lib/site-settings';

interface BlogListViewProps {
  heroConfig: HeroConfig;
  posts: BlogPost[];
  onNavigate: (route: AppRoute, slug?: string) => void;
  onOpenHeroManager: () => void;
}

export const BlogListView: React.FC<BlogListViewProps> = ({
  heroConfig,
  posts,
  onNavigate,
  onOpenHeroManager,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Stories');
  const [searchQuery, setSearchQuery] = useState('');

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
            {BLOG_CATEGORIES.map((cat) => {
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
      </section>

      {/* 3. Featured Story Showcase (Only if no active search or filter) */}
      {!searchQuery && selectedCategory === 'All Stories' && featuredPost && (
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
                  {featuredPost.author.avatar ? (
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#C5A880]/50"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1C3829] text-[#DFCAA8] flex items-center justify-center font-bold text-sm">
                      {featuredPost.author.name[0]}
                    </div>
                  )}
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
            {gridPosts.map((post, index) => (
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
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#C5A880]/40"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#2D5540]/10 text-[#1C3829] flex items-center justify-center font-bold text-xs">
                        {post.author.name[0]}
                      </div>
                    )}
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
