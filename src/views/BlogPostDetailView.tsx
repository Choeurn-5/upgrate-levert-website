import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  Tag,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { BlogPost, AppRoute } from '../types';
import { SITE_SETTINGS } from '../lib/site-settings';

interface BlogPostDetailViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  onNavigate: (route: AppRoute, slug?: string) => void;
}

export const BlogPostDetailView: React.FC<BlogPostDetailViewProps> = ({
  post,
  relatedPosts,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Read this article: "${post.title}" from Le Vert Angkor Hotel\n`);
      window.open(`https://wa.me/?text=${text}${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`"${post.title}" via @levertangkor`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShareFacebook = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  /**
   * Helper function to render markdown text with rich styling
   */
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = () => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="my-6 space-y-2 list-disc list-inside text-stone-700 leading-relaxed pl-2">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-sm sm:text-base font-light">
                <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const formatInline = (text: string) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#1C3829]">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-stone-700">$1</em>');
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        inList = true;
        listItems.push(trimmed.substring(2));
        return;
      } else {
        flushList();
      }

      if (!trimmed) {
        return;
      }

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2
            key={index}
            className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829] mt-10 mb-4 pt-4 border-t border-[#E7E0D5]"
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3
            key={index}
            className="font-luxury-serif text-xl sm:text-2xl font-bold text-[#1C3829] mt-8 mb-3"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('#### ')) {
        elements.push(
          <h4
            key={index}
            className="text-base sm:text-lg font-semibold text-[#1C3829] mt-6 mb-2"
          >
            {trimmed.replace('#### ', '')}
          </h4>
        );
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote
            key={index}
            className="my-6 p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#C5A880] text-sm sm:text-base italic text-[#2D4536] shadow-sm leading-relaxed"
          >
            <div dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace('> ', '')) }} />
          </blockquote>
        );
      } else if (trimmed === '---') {
        elements.push(<hr key={index} className="my-8 border-t border-[#E7E0D5]" />);
      } else {
        elements.push(
          <p
            key={index}
            className="my-4 text-sm sm:text-base text-[#38433C] font-light leading-relaxed sm:leading-loose"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
          />
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <article className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between pb-8">
          <button
            onClick={() => onNavigate('/blog/')}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-medium text-[#1C3829] hover:text-[#C5A880] transition-colors py-1 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Stories</span>
          </button>

          <span className="px-3 py-1 rounded-full bg-[#1C3829]/10 text-[#1C3829] text-xs font-semibold uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Article Header */}
        <header className="space-y-6 pb-8 border-b border-[#E7E0D5]">
          <h1 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C3829] leading-tight">
            {post.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="text-base sm:text-lg text-[#55635B] font-light leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author & Meta Bar */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <img
                src={post.author.avatar || '/images/default-avatar.svg'}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#C5A880]/60 shadow-sm bg-[#14281D]"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#1C3829]">
                  {post.author.name}
                </h3>
                <p className="text-xs text-[#68726B]">
                  {post.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-[#68726B]">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                <span>{formatDate(post.publishedAt)}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-[#C5A880]" />
                <span>{post.readTimeMinutes} min read</span>
              </span>
            </div>
          </div>

          {/* Social Share Strip */}
          <div className="flex items-center space-x-2 pt-2 text-xs">
            <span className="text-[#68726B] mr-2 flex items-center space-x-1 font-medium">
              <Share2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Share:</span>
            </span>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-full bg-white border border-[#E7E0D5] hover:border-[#C5A880] text-stone-700 hover:text-[#1C3829] transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
              title="Copy article link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-1.5 rounded-full bg-white border border-[#E7E0D5] hover:border-[#C5A880] text-stone-700 hover:text-emerald-700 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleShareFacebook}
              className="px-3 py-1.5 rounded-full bg-white border border-[#E7E0D5] hover:border-[#C5A880] text-stone-700 hover:text-blue-700 transition-colors cursor-pointer shadow-xs"
              title="Share on Facebook"
            >
              Facebook
            </button>

            <button
              onClick={handleShareTwitter}
              className="px-3 py-1.5 rounded-full bg-white border border-[#E7E0D5] hover:border-[#C5A880] text-stone-700 hover:text-sky-600 transition-colors cursor-pointer shadow-xs"
              title="Share on X"
            >
              X / Twitter
            </button>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="my-8 rounded-3xl overflow-hidden shadow-md border border-[#E7E0D5] bg-stone-100 max-h-[520px]">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Main Article Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#E7E0D5] shadow-xs">
          <div className="article-body">
            {renderFormattedContent(post.content)}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#E7E0D5] flex items-center flex-wrap gap-2">
              <span className="text-xs font-medium text-[#68726B] flex items-center space-x-1 mr-1">
                <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Tags:</span>
              </span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E0D5] text-[#2D3F33] text-xs font-normal"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Bio Card */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#E7E0D5] flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              src={post.author.avatar || '/images/default-avatar.svg'}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A880]/80 shrink-0 bg-[#14281D]"
            />
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-[11px] font-semibold tracking-wider text-[#C5A880] uppercase block">
                Written by
              </span>
              <h4 className="font-luxury-serif text-xl font-bold text-[#1C3829]">
                {post.author.name}
              </h4>
              <p className="text-xs text-[#68726B] font-medium">
                {post.author.role}
              </p>
              <p className="text-xs text-stone-600 font-light leading-relaxed pt-1">
                Curated by the resident hospitality and concierge team at Le Vert Angkor Hotel, sharing local secrets, heritage stories, and travel advice for memorable visits to Siem Reap.
              </p>
            </div>
          </div>
        </div>

        {/* Next / Related Stories */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#E7E0D5]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#C5A880] uppercase block mb-1">
                  Keep Exploring
                </span>
                <h3 className="font-luxury-serif text-2xl sm:text-3xl font-bold text-[#1C3829]">
                  Related Stories &amp; Guides
                </h3>
              </div>

              <button
                onClick={() => onNavigate('/blog/')}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#1C3829] hover:text-[#C5A880] transition-colors"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 2).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate('/blog/', rel.slug)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E7E0D5] hover:border-[#C5A880] hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1C3829]/80 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide">
                      {rel.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center space-x-2 text-[11px] text-[#68726B]">
                      <span>{formatDate(rel.publishedAt)}</span>
                      <span>•</span>
                      <span>{rel.readTimeMinutes} min read</span>
                    </div>

                    <h4 className="font-luxury-serif text-lg font-bold text-[#1C3829] group-hover:text-[#2D5540] transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </h4>

                    <p className="text-xs text-[#68726B] font-light line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div className="px-6 pb-5 pt-2 text-xs font-semibold text-[#1C3829] group-hover:text-[#C5A880] flex items-center space-x-1 transition-colors">
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Booking Banner */}
        <section className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#14281D] text-[#FAF8F5] border border-[#2D5540]/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5">
            <h4 className="font-luxury-serif text-2xl font-bold text-white">
              Stay in the Heart of Siem Reap
            </h4>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 font-light max-w-md">
              Book directly at Le Vert Angkor Hotel for guaranteed lowest rates, rooftop pool relaxation, and complimentary arrival pick-up.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={SITE_SETTINGS.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#C5A880] text-[#12241A] font-semibold text-xs uppercase tracking-wider hover:bg-[#DFCAA8] transition-colors shadow-sm"
            >
              Book Your Stay Direct
            </a>
          </div>
        </section>
      </div>
    </article>
  );
};
