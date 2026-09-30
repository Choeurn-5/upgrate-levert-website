"use client";

import React from 'react';
import { motion } from 'motion/react';
import { AdminBlogView } from '@/views/AdminBlogView';
import { useGlobalContext } from '@/components/GlobalProvider';

export default function AdminRootPage() {
  const { handleNavigate } = useGlobalContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <AdminBlogView onNavigate={handleNavigate} />
    </motion.div>
  );
}
