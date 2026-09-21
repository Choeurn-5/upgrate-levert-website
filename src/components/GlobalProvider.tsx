"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { BookingModal } from './BookingModal';
import { HeroManagerModal } from './HeroManagerModal';
import { AppRoute, HeroConfig, Room, Tour, DiningExperience, SpaTreatment } from '../types';
import { HERO_CONFIGS } from '../lib/site-settings';
import { STATIC_ROOMS, STATIC_TOURS, DINING_EXPERIENCES, SPA_TREATMENTS } from '../data/hotelData';
import { getWordPressRooms, getWordPressTours, getWordPressDining, getWordPressSpa } from '../lib/wordpress';

interface GlobalContextType {
  rooms: Room[];
  tours: Tour[];
  diningList: DiningExperience[];
  spaList: SpaTreatment[];
  heroConfigs: Record<string, HeroConfig>;
  handleNavigate: (route: AppRoute, slug?: string) => void;
  handleOpenBooking: (preferredItem?: string) => void;
  handleUpdateHero: (pageKey: string, newConfig: HeroConfig) => void;
  setIsHeroManagerOpen: (isOpen: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Dynamic Content State (Auto-synced from WordPress)
  const [rooms, setRooms] = useState<Room[]>(STATIC_ROOMS);
  const [tours, setTours] = useState<Tour[]>(STATIC_TOURS);
  const [diningList, setDiningList] = useState<DiningExperience[]>(DINING_EXPERIENCES);
  const [spaList, setSpaList] = useState<SpaTreatment[]>(SPA_TREATMENTS);
  const [isLoadingWp, setIsLoadingWp] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<Date | null>(null);

  // Hero Configuration State (Owner-replaceable)
  const [heroConfigs, setHeroConfigs] = useState<Record<string, HeroConfig>>(HERO_CONFIGS);
  const [isHeroManagerOpen, setIsHeroManagerOpen] = useState(false);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingRoom, setSelectedBookingRoom] = useState<string | undefined>(undefined);

  // Fetch WordPress data in background to hydrate with any live updates
  useEffect(() => {
    let isMounted = true;
    async function loadWpData() {
      setIsLoadingWp(true);
      try {
        const [wpRooms, wpTours, wpDining, wpSpa] = await Promise.all([
          getWordPressRooms(),
          getWordPressTours(),
          getWordPressDining(),
          getWordPressSpa(),
        ]);
        if (isMounted) {
          if (wpRooms && wpRooms.length > 0) setRooms(wpRooms);
          if (wpTours && wpTours.length > 0) setTours(wpTours);
          if (wpDining && wpDining.length > 0) setDiningList(wpDining);
          if (wpSpa && wpSpa.length > 0) setSpaList(wpSpa);
          setLastSyncedTime(new Date());
        }
      } catch (err) {
        console.warn('Using static hotel fallback data:', err);
      } finally {
        if (isMounted) setIsLoadingWp(false);
      }
    }

    loadWpData();

    const intervalId = setInterval(() => {
      loadWpData();
    }, 45000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Navigation Handler
  const handleNavigate = (route: AppRoute, slug?: string) => {
    let newPath = route as string;
    if (slug) {
      newPath = `${route}${slug}/`;
    }
    router.push(newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Booking Handler
  const handleOpenBooking = (preferredItem?: string) => {
    setSelectedBookingRoom(preferredItem);
    setIsBookingModalOpen(true);
  };

  // Update Hero Config
  const handleUpdateHero = (pageKey: string, newConfig: HeroConfig) => {
    setHeroConfigs((prev) => ({
      ...prev,
      [pageKey]: newConfig,
    }));
  };

  // Manual Trigger to Immediately Sync all Content from WordPress
  const handleManualSync = async () => {
    setIsLoadingWp(true);
    try {
      const [wpRooms, wpTours, wpDining, wpSpa] = await Promise.all([
        getWordPressRooms(),
        getWordPressTours(),
        getWordPressDining(),
        getWordPressSpa(),
      ]);
      if (wpRooms && wpRooms.length > 0) setRooms(wpRooms);
      if (wpTours && wpTours.length > 0) setTours(wpTours);
      if (wpDining && wpDining.length > 0) setDiningList(wpDining);
      if (wpSpa && wpSpa.length > 0) setSpaList(wpSpa);
      setLastSyncedTime(new Date());
    } catch (err) {
      console.warn('Manual sync fallback:', err);
    } finally {
      setIsLoadingWp(false);
    }
  };

  // Resolve Active Hero Key
  const getActiveHeroKey = (): string => {
    if (!pathname) return 'home';
    if (pathname === '/') return 'home';
    if (pathname === '/rooms/') return 'rooms';
    if (pathname.startsWith('/our-room/')) return 'roomDetail';
    if (pathname === '/touring/') return 'touring';
    if (pathname.startsWith('/our-tours/')) return 'tourDetail';
    if (pathname === '/dining/') return 'dining';
    if (pathname === '/spa/') return 'spa';
    if (pathname === '/facilities-levertangkorhotel/') return 'facilities';
    if (pathname === '/gallery/') return 'gallery';
    if (pathname === '/contact-levertangkorhotel/') return 'contact';
    if (pathname === '/awards/') return 'awards';
    if (pathname === '/temple-package/') return 'templePackage';
    return 'home';
  };

  const activeHeroKey = getActiveHeroKey();
  const currentHeroConfig = heroConfigs[activeHeroKey] || HERO_CONFIGS.home;

  const currentRoute = (pathname as AppRoute) || '/';

  const contextValue = {
    rooms,
    tours,
    diningList,
    spaList,
    heroConfigs,
    handleNavigate,
    handleOpenBooking,
    handleUpdateHero,
    setIsHeroManagerOpen,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      <SiteHeader
        activeRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenHeroManager={() => setIsHeroManagerOpen(true)}
      />

      <main className="flex-1 w-full overflow-hidden">
        {children}
      </main>

      <SiteFooter
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedRoomSlug={selectedBookingRoom}
        rooms={rooms}
      />

      <HeroManagerModal
        isOpen={isHeroManagerOpen}
        onClose={() => setIsHeroManagerOpen(false)}
        activePageKey={activeHeroKey}
        currentHero={currentHeroConfig}
        onUpdateHero={handleUpdateHero}
        roomsCount={rooms.length}
        toursCount={tours.length}
        diningCount={diningList.length}
        spaCount={spaList.length}
        onSyncFromWordPress={handleManualSync}
        isSyncing={isLoadingWp}
        lastSynced={lastSyncedTime}
      />
    </GlobalContext.Provider>
  );
}
