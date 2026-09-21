"use client";
import React from 'react';
import { FacilitiesView } from '@/views/FacilitiesView';
import { useGlobalContext } from '@/components/GlobalProvider';
import { motion } from 'motion/react';

export default function Page() {
  const { heroConfigs, handleNavigate, handleOpenBooking, setIsHeroManagerOpen } = useGlobalContext();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <FacilitiesView heroConfig={heroConfigs.facilities} onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} onOpenHeroManager={() => setIsHeroManagerOpen(true)} />
    </motion.div>
  );
}
