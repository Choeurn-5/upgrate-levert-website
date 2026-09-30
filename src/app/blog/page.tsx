"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BlogListView } from '@/views/BlogListView';
import { useGlobalContext } from '@/components/GlobalProvider';
import { INITIAL_BLOG_POSTS } from '@/data/blogData';
import { BlogPost } from '@/types';

export default function BlogPage() {
  const { heroConfigs, handleNavigate, setIsHeroManagerOpen } = useGlobalContext();
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);

  // Fetch updated posts from API
  useEffect(() => {
    let isMounted = true;
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && isMounted) {
            let deletedIds: string[] = [];
            if (typeof window !== 'undefined') {
              try {
                deletedIds = JSON.parse(localStorage.getItem('levert_deleted_post_ids') || '[]');
              } catch {}
            }
            const activePosts = data.filter((p: BlogPost) => !deletedIds.includes(p.id));
            setPosts(activePosts);
          }
        }
      } catch (err) {
        // Fall back gracefully to static posts
        console.warn('Using static blog posts fallback:', err);
      }
    }

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <BlogListView
        heroConfig={heroConfigs.blog || {
          eyebrow: 'STORIES & INSIDER GUIDES',
          title: 'Journeys Through Angkor & Siem Reap',
          subtitle: 'Curated travel advice, temple secrets, authentic Khmer culinary traditions, and wellness rituals from our local concierge experts.',
          imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=85',
          imagePlaceholderNote: 'Replaceable Hero Asset (Angkor Wat Twilight Horizon)',
          badge: 'Curated Heritage Journal',
        }}
        posts={posts}
        onNavigate={handleNavigate}
        onOpenHeroManager={() => setIsHeroManagerOpen(true)}
      />
    </motion.div>
  );
}
