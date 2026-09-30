"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BlogPostDetailView } from '@/views/BlogPostDetailView';
import { useGlobalContext } from '@/components/GlobalProvider';
import { INITIAL_BLOG_POSTS } from '@/data/blogData';
import { BlogPost } from '@/types';
import { Compass, ArrowLeft } from 'lucide-react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { handleNavigate } = useGlobalContext();
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;

  const [post, setPost] = useState<BlogPost | null>(() => {
    return INITIAL_BLOG_POSTS.find((p) => p.slug === slug) || null;
  });
  const [allPosts, setAllPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [isLoading, setIsLoading] = useState(!post);

  useEffect(() => {
    let isMounted = true;
    async function loadPostData() {
      try {
        const res = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data && !data.error) {
            setPost(data);
          }
        }
      } catch (err) {
        console.warn('API error, using initial post data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }

      // Also fetch all posts for related section
      try {
        const allRes = await fetch('/api/blog');
        if (allRes.ok) {
          const allData = await allRes.json();
          if (isMounted && Array.isArray(allData)) {
            setAllPosts(allData);
          }
        }
      } catch {
        // Keep fallback
      }
    }

    loadPostData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF8F5]">
        <div className="w-8 h-8 rounded-full border-2 border-[#1C3829] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[#FAF8F5] text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-[#1C3829]/10 text-[#1C3829] flex items-center justify-center">
          <Compass className="w-7 h-7" />
        </div>
        <h1 className="font-luxury-serif text-3xl sm:text-4xl font-bold text-[#1C3829]">
          Article Not Found
        </h1>
        <p className="text-sm text-[#68726B] max-w-md">
          The story you are looking for may have been moved, updated, or unpublished.
        </p>
        <button
          onClick={() => handleNavigate('/blog/')}
          className="mt-2 inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#1C3829] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#12241A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Stories</span>
        </button>
      </div>
    );
  }

  const relatedPosts = allPosts.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || p.isFeatured)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <BlogPostDetailView
        post={post}
        relatedPosts={relatedPosts}
        onNavigate={handleNavigate}
      />
    </motion.div>
  );
}
