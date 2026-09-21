"use client";
import React from 'react';
import { TourDetailView } from '@/views/TourDetailView';
import { useGlobalContext } from '@/components/GlobalProvider';
import { motion } from 'motion/react';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { heroConfigs, handleNavigate, handleOpenBooking, setIsHeroManagerOpen, tours } = useGlobalContext();
  
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;
  const currentTour = tours.find(t => t.slug === slug) || tours[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <TourDetailView tour={currentTour} heroConfig={heroConfigs.tourDetail} onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} onOpenHeroManager={() => setIsHeroManagerOpen(true)} />
    </motion.div>
  );
}
