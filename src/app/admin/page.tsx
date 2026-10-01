"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminBlogView } from '@/views/AdminBlogView';
import { AdminToursView } from '@/views/AdminToursView';
import { AdminGalleryView } from '@/views/AdminGalleryView';
import { useGlobalContext } from '@/components/GlobalProvider';
import { BookOpen, Compass, Lock, ArrowLeft } from 'lucide-react';

const DEFAULT_PIN = 'levert2026';

type AdminTab = 'blog' | 'tours' | 'gallery';

export default function AdminRootPage() {
  const { handleNavigate } = useGlobalContext();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('blog');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('levert_blog_admin_auth');
      if (saved === 'true') setIsAuthenticated(true);
    }
  }, []);

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1F14] via-[#1C3829] to-[#0A1A10] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-[#C5A880]" />
            </div>
            <h1 className="font-luxury-serif text-2xl font-bold text-white mb-1">Le Vert Admin Portal</h1>
            <p className="text-sm text-white/50">Enter your access PIN to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pinInput}
              onChange={e => { setPinInput(e.target.value); setPinError(false); }}
              placeholder="Access PIN"
              className={`w-full px-5 py-4 rounded-2xl bg-white/10 border ${pinError ? 'border-red-400' : 'border-white/20'} text-white placeholder-white/40 text-sm outline-none focus:border-[#C5A880] transition text-center tracking-widest`}
              autoFocus
            />
            {pinError && <p className="text-red-400 text-xs text-center">Incorrect PIN. Please try again.</p>}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#C5A880] hover:bg-[#D4BC94] text-[#0A1A10] font-bold text-sm tracking-wider transition active:scale-95"
            >
              Unlock Admin Portal
            </button>
          </form>
          <button
            onClick={() => handleNavigate('/')}
            className="mt-6 flex items-center space-x-2 text-white/40 hover:text-white/70 text-xs mx-auto justify-center transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Website</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-[#FDFBF8]"
    >
      {/* Top navigation tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#EDE8E0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 space-x-1">
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'blog'
                  ? 'bg-[#1C3829] text-white shadow-sm'
                  : 'text-[#68726B] hover:text-[#1C3829] hover:bg-[#F8F5F0]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Blog Manager</span>
            </button>
            <button
              onClick={() => setActiveTab('tours')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'tours'
                  ? 'bg-[#1C3829] text-white shadow-sm'
                  : 'text-[#68726B] hover:text-[#1C3829] hover:bg-[#F8F5F0]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Tours Manager</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#1C3829] text-white shadow-sm'
                  : 'text-[#68726B] hover:text-[#1C3829] hover:bg-[#F8F5F0]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Gallery</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'blog' ? (
          <motion.div
            key="blog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AdminBlogView onNavigate={handleNavigate} />
          </motion.div>
        ) : activeTab === 'tours' ? (
          <motion.div
            key="tours"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            <AdminToursView onNavigate={handleNavigate} />
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full px-4 sm:px-6 lg:px-8 py-8"
          >
            <AdminGalleryView />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
