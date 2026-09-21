"use client";
import React from 'react';
import { SpaView } from '@/views/SpaView';
import { useGlobalContext } from '@/components/GlobalProvider';
import { motion } from 'motion/react';

export default function Page() {
  const { heroConfigs, handleNavigate, handleOpenBooking, setIsHeroManagerOpen, spaList } = useGlobalContext();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <SpaView heroConfig={heroConfigs.spa} spaTreatments={spaList} onNavigate={handleNavigate} onOpenBooking={() => handleOpenBooking("spa-treatment")} onOpenHeroManager={() => setIsHeroManagerOpen(true)} />
    </motion.div>
  );
}
