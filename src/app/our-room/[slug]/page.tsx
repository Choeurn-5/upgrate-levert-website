"use client";
import React from 'react';
import { RoomDetailView } from '@/views/RoomDetailView';
import { useGlobalContext } from '@/components/GlobalProvider';
import { motion } from 'motion/react';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { heroConfigs, handleNavigate, handleOpenBooking, setIsHeroManagerOpen, rooms } = useGlobalContext();
  
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;
  const currentRoom = rooms.find(r => r.slug === slug) || rooms[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <RoomDetailView room={currentRoom} allRooms={rooms} heroConfig={heroConfigs.roomDetail} onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} onOpenHeroManager={() => setIsHeroManagerOpen(true)} />
    </motion.div>
  );
}
