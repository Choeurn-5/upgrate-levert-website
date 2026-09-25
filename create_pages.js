const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'app');

const pages = [
  {
    path: '',
    viewName: 'HomeView',
    props: ['heroConfig={heroConfigs.home}', 'rooms={rooms}', 'tours={tours}', 'onNavigate={handleNavigate}', 'onOpenBooking={handleOpenBooking}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  },
  {
    path: 'rooms',
    viewName: 'RoomsView',
    props: ['heroConfig={heroConfigs.rooms}', 'rooms={rooms}', 'onNavigate={handleNavigate}', 'onOpenBooking={handleOpenBooking}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  },
  {
    path: 'touring',
    viewName: 'ToursView',
    props: ['heroConfig={heroConfigs.touring}', 'tours={tours}', 'onNavigate={handleNavigate}', 'onOpenBooking={handleOpenBooking}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  },
  {
    path: 'dining',
    viewName: 'DiningView',
    props: ['heroConfig={heroConfigs.dining}', 'diningExperiences={diningList}', 'onNavigate={handleNavigate}', 'onOpenBooking={() => handleOpenBooking("table-reservation")}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  },
  {
    path: 'spa',
    viewName: 'SpaView',
    props: ['heroConfig={heroConfigs.spa}', 'spaTreatments={spaList}', 'onNavigate={handleNavigate}', 'onOpenBooking={() => handleOpenBooking("spa-treatment")}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  },
  {
    path: 'gallery',
    viewName: 'GalleryView',
    props: ['heroConfig={heroConfigs.gallery}', 'onNavigate={handleNavigate}', 'onOpenBooking={handleOpenBooking}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  },
  {
    path: 'contact-levertangkorhotel',
    viewName: 'ContactView',
    props: ['heroConfig={heroConfigs.contact}', 'onNavigate={handleNavigate}', 'onOpenBooking={handleOpenBooking}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  },
  {
    path: 'awards',
    viewName: 'AwardsView',
    props: ['heroConfig={heroConfigs.awards}', 'onNavigate={handleNavigate}', 'onOpenBooking={handleOpenBooking}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  },
  {
    path: 'temple-package',
    viewName: 'TemplePackageView',
    props: ['heroConfig={heroConfigs.templePackage}', 'onNavigate={handleNavigate}', 'onOpenBooking={handleOpenBooking}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  }
];

const dynamicPages = [
  {
    path: 'our-room/[slug]',
    viewName: 'RoomDetailView',
    setup: 'const currentRoom = rooms.find(r => r.slug === slug) || rooms[0];',
    props: ['room={currentRoom}', 'allRooms={rooms}', 'heroConfig={heroConfigs.roomDetail}', 'onNavigate={handleNavigate}', 'onOpenBooking={handleOpenBooking}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  },
  {
    path: 'our-tours/[slug]',
    viewName: 'TourDetailView',
    setup: 'const currentTour = tours.find(t => t.slug === slug) || tours[0];',
    props: ['tour={currentTour}', 'heroConfig={heroConfigs.tourDetail}', 'onNavigate={handleNavigate}', 'onOpenBooking={handleOpenBooking}', 'onOpenHeroManager={() => setIsHeroManagerOpen(true)}'],
  }
];

function createPageCode(p, isDynamic) {
  let contextVars = ['heroConfigs', 'handleNavigate', 'handleOpenBooking', 'setIsHeroManagerOpen'];
  if (p.props.some(p => p.includes('{rooms}')) || (p.setup && p.setup.includes('rooms'))) contextVars.push('rooms');
  if (p.props.some(p => p.includes('{tours}')) || (p.setup && p.setup.includes('tours'))) contextVars.push('tours');
  if (p.props.some(p => p.includes('{diningList}'))) contextVars.push('diningList');
  if (p.props.some(p => p.includes('{spaList}'))) contextVars.push('spaList');

  const contextStr = contextVars.join(', ');
  
  let setupCode = '';
  let paramsArg = '';
  if (isDynamic) {
    paramsArg = '{ params }: { params: Promise<{ slug: string }> }';
    setupCode = `
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;
  ${p.setup}
`;
  }

  return `"use client";
import React from 'react';
import { ${p.viewName} } from '@/views/${p.viewName}';
import { useGlobalContext } from '@/components/GlobalProvider';
import { motion } from 'motion/react';

export default function Page(${paramsArg}) {
  const { ${contextStr} } = useGlobalContext();
  ${setupCode}
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <${p.viewName} ${p.props.join(' ')} />
    </motion.div>
  );
}
`;
}

pages.forEach(p => {
  const dir = path.join(pagesDir, p.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), createPageCode(p, false));
});

dynamicPages.forEach(p => {
  const dir = path.join(pagesDir, p.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), createPageCode(p, true));
});

console.log('Created pages successfully.');
