"use client";
import React from 'react';
import { DiningView } from '@/views/DiningView';
import { useGlobalContext } from '@/components/GlobalProvider';
import { motion } from 'motion/react';

export default function Page() {
  const { heroConfigs, handleNavigate, handleOpenBooking, setIsHeroManagerOpen, diningList } = useGlobalContext();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <DiningView heroConfig={heroConfigs.dining} diningExperiences={diningList} onNavigate={handleNavigate} onOpenBooking={() => handleOpenBooking("table-reservation")} onOpenHeroManager={() => setIsHeroManagerOpen(true)} />
    </motion.div>
  );
}
