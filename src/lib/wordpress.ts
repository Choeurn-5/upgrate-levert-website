import { Room, Tour, TourStop, DiningExperience, SpaTreatment } from '../types';
import { ROOMS_DATA, TOURS_DATA, DINING_EXPERIENCES, SPA_TREATMENTS } from '../data/hotelData';

const WP_API_BASE = 'https://www.cms.levertangkorhotel.com/wp-json/wp/v2';

// In-memory cache for client sessions
let cachedRooms: Room[] | null = null;
let cachedTours: Tour[] | null = null;
let cachedDining: DiningExperience[] | null = null;
let cachedSpa: SpaTreatment[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 1000 * 30; // 30 seconds fresh cache for dynamic updates

/**
 * Strips HTML tags and decodes common entities
 */
export function cleanHtml(rawHtml: string): string {
  if (!rawHtml) return '';
  return rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts image src URLs from rendered WordPress HTML content
 */
export function extractImagesFromHtml(html: string): string[] {
  if (!html) return [];
  const urls: string[] = [];
  const regex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    if (match[1] && !urls.includes(match[1])) {
      urls.push(match[1]);
    }
  }
  return urls;
}

/**
 * Parses numeric price from text like "$58", "58 USD", "from $45"
 */
function extractPriceFromText(text: string, defaultPrice = 50): number {
  if (!text) return defaultPrice;
  const match = text.match(/\$\s*(\d+(?:\.\d{2})?)/) || text.match(/(\d+)\s*(?:USD|\$)/i);
  if (match && match[1]) {
    const p = parseFloat(match[1]);
    if (!isNaN(p) && p > 0) return p;
  }
  return defaultPrice;
}

/**
 * Parses guest capacity from text
 */
function extractCapacityFromText(text: string): number {
  if (!text) return 2;
  const match = text.match(/(\d+)\s*(?:guests?|persons?|people|pax)/i);
  if (match && match[1]) {
    const c = parseInt(match[1], 10);
    if (!isNaN(c) && c > 0) return c;
  }
  return 2;
}

/**
 * Parses room size in sqm from text
 */
function extractSizeFromText(text: string): number {
  if (!text) return 40;
  const match = text.match(/(\d+)\s*(?:sqm|m²|m2|sq\.?\s*m)/i);
  if (match && match[1]) {
    const s = parseInt(match[1], 10);
    if (!isNaN(s) && s > 0) return s;
  }
  return 40;
}

/**
 * Parses tour stops from headings or list items in HTML
 */
function parseTourStopsFromHtml(html: string): TourStop[] {
  if (!html) return [];
  const stops: TourStop[] = [];
  const headingRegex = /<h[34][^>]*>(.*?)<\/h[34]>/gi;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(html)) !== null) {
    const cleanTitle = cleanHtml(match[1]);
    if (cleanTitle && cleanTitle.length > 2 && cleanTitle.length < 80) {
      stops.push({
        templeName: cleanTitle.replace(/^\d+[\.\-\)]\s*/, ''),
        description: `Explore the historical architecture, ancient relief carvings, and majestic sanctuaries of ${cleanTitle}.`,
        highlight: 'Architectural carvings & atmospheric photography',
      });
    }
  }

  if (stops.length === 0) {
    // Fallback: list items
    const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
    while ((match = liRegex.exec(html)) !== null) {
      const cleanItem = cleanHtml(match[1]);
      if (cleanItem && cleanItem.length > 2 && cleanItem.length < 100) {
        stops.push({
          templeName: cleanItem,
          description: `Guided visit to ${cleanItem} with historical context from your local driver.`,
        });
      }
    }
  }

  return stops;
}

/**
 * Fetches all rooms from WordPress REST API (our-room)
 * Automatically merges existing rooms and ADDS any new rooms created in WordPress!
 */
export async function getRooms(): Promise<Room[]> {
  const now = Date.now();
  if (cachedRooms && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedRooms;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(`${WP_API_BASE}/our-room?per_page=100&_embed`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const wpRooms = await res.json();
      if (Array.isArray(wpRooms) && wpRooms.length > 0) {
        const processedWpRoomSlugs = new Set<string>();

        // 1. Merge WordPress updates into existing rooms
        const mergedList: Room[] = ROOMS_DATA.map((baseRoom) => {
          const wpMatch = wpRooms.find(
            (r: any) => r.slug === baseRoom.slug || r.id === baseRoom.id
          );
          if (wpMatch) {
            processedWpRoomSlugs.add(wpMatch.slug);
            const mediaUrl = wpMatch._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const contentHtml = wpMatch.content?.rendered || '';
            const inContentImages = extractImagesFromHtml(contentHtml);

            return {
              ...baseRoom,
              title: cleanHtml(wpMatch.title?.rendered) || baseRoom.title,
              featuredImage: mediaUrl || baseRoom.featuredImage,
              galleryImages: inContentImages.length > 0
                ? Array.from(new Set([mediaUrl || baseRoom.featuredImage, ...inContentImages, ...baseRoom.galleryImages]))
                : baseRoom.galleryImages,
              shortDescription: wpMatch.excerpt?.rendered
                ? cleanHtml(wpMatch.excerpt.rendered)
                : baseRoom.shortDescription,
              longDescription: contentHtml
                ? cleanHtml(contentHtml)
                : baseRoom.longDescription,
            };
          }
          return baseRoom;
        });

        // 2. CRITICAL: Automatically add NEW rooms created in WordPress!
        for (const wpRoom of wpRooms) {
          if (!processedWpRoomSlugs.has(wpRoom.slug)) {
            const mediaUrl = wpRoom._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const contentHtml = wpRoom.content?.rendered || '';
            const excerptClean = cleanHtml(wpRoom.excerpt?.rendered || '');
            const contentClean = cleanHtml(contentHtml);
            const inContentImages = extractImagesFromHtml(contentHtml);

            const titleClean = cleanHtml(wpRoom.title?.rendered) || 'Boutique Room Suite';
            const price = extractPriceFromText(`${contentHtml} ${excerptClean}`, 50);
            const capacity = extractCapacityFromText(`${contentHtml} ${excerptClean}`);
            const size = extractSizeFromText(`${contentHtml} ${excerptClean}`);

            const newRoom: Room = {
              id: wpRoom.id,
              slug: wpRoom.slug || `room-${wpRoom.id}`,
              title: titleClean,
              subtitle: 'Exclusive Boutique Accommodation',
              pricePerNight: price,
              currency: 'USD',
              capacityGuests: capacity,
              bedType: titleClean.toLowerCase().includes('twin')
                ? '2 Single Beds'
                : titleClean.toLowerCase().includes('family')
                ? '2 Queen Beds'
                : '1 King Size Bed',
              sizeSqm: size,
              hasBalcony: titleClean.toLowerCase().includes('balcony') || true,
              viewType: titleClean.toLowerCase().includes('city') ? 'City View' : 'Garden or City View',
              shortDescription: excerptClean || contentClean.slice(0, 160) || 'Comfortable luxury accommodation at Le Vert Angkor Hotel.',
              longDescription: contentClean || excerptClean || 'Experience modern luxury, private balcony, and warm Cambodian hospitality.',
              featuredImage: mediaUrl || 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
              galleryImages: inContentImages.length > 0
                ? [mediaUrl || inContentImages[0], ...inContentImages]
                : [mediaUrl || 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'],
              amenities: [
                'Private Furnished Balcony',
                'Complimentary High-Speed Fiber Wi-Fi',
                'Whisper-Quiet Individual Climate Control',
                'Complimentary Bottled Mineral Water Daily',
                'En-suite Bathroom with Rain Shower',
                'In-Room Safety Deposit Box',
                'Daily Housekeeping Service',
                'Flat Screen Smart TV',
              ],
              featured: false,
            };

            mergedList.push(newRoom);
          }
        }

        cachedRooms = mergedList;
        lastFetchTime = now;
        return mergedList;
      }
    }
  } catch (err) {
    console.warn('WordPress API fetch fallback to static dataset for rooms:', err);
  }

  cachedRooms = ROOMS_DATA;
  return ROOMS_DATA;
}

export async function getRoomBySlug(slug: string): Promise<Room | undefined> {
  const rooms = await getRooms();
  return rooms.find((r) => r.slug === slug);
}

/**
 * Fetches all tours from WordPress REST API (our-tours)
 * Automatically merges existing tours and ADDS any new tours created in WordPress!
 */
export async function getTours(): Promise<Tour[]> {
  const now = Date.now();
  if (cachedTours && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedTours;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(`${WP_API_BASE}/our-tours?per_page=100&_embed`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const wpTours = await res.json();
      if (Array.isArray(wpTours) && wpTours.length > 0) {
        const processedTourSlugs = new Set<string>();

        // 1. Merge WordPress updates into existing tours
        const mergedTours: Tour[] = TOURS_DATA.map((baseTour) => {
          const wpMatch = wpTours.find(
            (t: any) => t.slug === baseTour.slug || t.id === baseTour.id
          );
          if (wpMatch) {
            processedTourSlugs.add(wpMatch.slug);
            const mediaUrl = wpMatch._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            return {
              ...baseTour,
              title: cleanHtml(wpMatch.title?.rendered) || baseTour.title,
              featuredImage: mediaUrl || baseTour.featuredImage,
              shortDescription: wpMatch.excerpt?.rendered
                ? cleanHtml(wpMatch.excerpt.rendered)
                : baseTour.shortDescription,
              longDescription: wpMatch.content?.rendered
                ? cleanHtml(wpMatch.content.rendered)
                : baseTour.longDescription,
            };
          }
          return baseTour;
        });

        // 2. CRITICAL: Automatically add NEW tours created in WordPress!
        for (const wpTour of wpTours) {
          if (!processedTourSlugs.has(wpTour.slug)) {
            const mediaUrl = wpTour._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const contentHtml = wpTour.content?.rendered || '';
            const excerptClean = cleanHtml(wpTour.excerpt?.rendered || '');
            const contentClean = cleanHtml(contentHtml);
            const stops = parseTourStopsFromHtml(contentHtml);

            const newTour: Tour = {
              id: wpTour.id,
              slug: wpTour.slug || `tour-${wpTour.id}`,
              title: cleanHtml(wpTour.title?.rendered) || 'Angkor Archaeological Tour',
              price: extractPriceFromText(`${contentHtml} ${excerptClean}`, 75),
              currency: 'USD',
              duration: 'Full Day (8:00 AM – 5:00 PM)',
              vehicleType: 'Private Air-Conditioned Vehicle',
              shortDescription: excerptClean || contentClean.slice(0, 160) || 'Private guided expedition to the ancient temples of Angkor.',
              longDescription: contentClean || excerptClean || 'Explore majestic Khmer heritage in private climate-controlled comfort.',
              featuredImage: mediaUrl || 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
              itinerary: stops.length > 0 ? stops : [
                {
                  templeName: 'Angkor Wat',
                  description: 'The monumental 12th-century centerpiece of the Khmer Empire.',
                  highlight: 'Reflecting pools & central sanctuary towers',
                },
                {
                  templeName: 'Bayon Temple',
                  description: 'The enigmatic state temple famous for its 216 serene smiling stone faces.',
                  highlight: 'Massive smiling stone faces of Avalokiteshvara',
                },
                {
                  templeName: 'Ta Prohm',
                  description: 'Atmospheric jungle temple embraced by colossal silk-cotton tree roots.',
                  highlight: 'Ancient stone galleries gripped by tree roots',
                },
              ],
              inclusions: [
                'Hotel round-trip transport in private air-conditioned vehicle',
                'Ice-chilled bottled mineral water and refreshing cold towels',
                'Courteous, experienced English-speaking local driver',
                'All road tolls and parking fees',
              ],
              exclusions: [
                'Angkor Archaeological Park Pass ($37/1-day, $62/3-day)',
                'Licensed official tour guide (available upon request)',
                'Meals, beverages, and personal tips',
              ],
              tips: [
                'Sacred dress code: Shoulders and knees must be covered',
                'Comfortable walking shoes and sun protection recommended',
                'Early departure option available for sunrise reflection',
              ],
            };

            mergedTours.push(newTour);
          }
        }

        cachedTours = mergedTours;
        lastFetchTime = now;
        return mergedTours;
      }
    }
  } catch (err) {
    console.warn('WordPress API fetch fallback to static dataset for tours:', err);
  }

  cachedTours = TOURS_DATA;
  return TOURS_DATA;
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  const tours = await getTours();
  return tours.find((t) => t.slug === slug);
}

/**
 * Fetches all dining items from WordPress (pages or posts)
 * If new dining experiences/posts are added in WordPress, automatically ingests them!
 */
export async function getDining(): Promise<DiningExperience[]> {
  const now = Date.now();
  if (cachedDining && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedDining;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    // Fetch standard posts or custom post types that might represent dining items
    const [postsRes, pageRes] = await Promise.all([
      fetch(`${WP_API_BASE}/posts?per_page=50&_embed`, { signal: controller.signal }),
      fetch(`${WP_API_BASE}/pages/20?_embed`, { signal: controller.signal }),
    ]);
    clearTimeout(timeoutId);

    const mergedDining: DiningExperience[] = [...DINING_EXPERIENCES];

    if (postsRes.ok) {
      const posts = await postsRes.json();
      if (Array.isArray(posts)) {
        for (const post of posts) {
          const titleLower = (post.title?.rendered || '').toLowerCase();
          const slugLower = (post.slug || '').toLowerCase();
          const isDining =
            titleLower.includes('dining') ||
            titleLower.includes('restaurant') ||
            titleLower.includes('bar') ||
            titleLower.includes('menu') ||
            slugLower.includes('dining') ||
            slugLower.includes('restaurant');

          if (isDining) {
            const mediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            mergedDining.push({
              id: `wp-dining-${post.id}`,
              name: cleanHtml(post.title?.rendered),
              hours: 'Daily: 11:00 AM – 10:00 PM',
              location: 'Le Vert Angkor Hotel',
              description: cleanHtml(post.excerpt?.rendered || post.content?.rendered || ''),
              image: mediaUrl || DINING_EXPERIENCES[0].image,
              menuHighlights: ['Authentic Khmer Recipes', 'Locally Sourced Ingredients', 'Sunset Cocktails'],
            });
          }
        }
      }
    }

    cachedDining = mergedDining;
    return mergedDining;
  } catch (err) {
    console.warn('WordPress API dining fetch fallback to baseline:', err);
  }

  cachedDining = DINING_EXPERIENCES;
  return DINING_EXPERIENCES;
}

/**
 * Fetches all spa treatments from WordPress (pages or posts)
 * If new spa treatments/posts are added in WordPress, automatically ingests them!
 */
export async function getSpa(): Promise<SpaTreatment[]> {
  const now = Date.now();
  if (cachedSpa && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedSpa;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const [postsRes, pageRes] = await Promise.all([
      fetch(`${WP_API_BASE}/posts?per_page=50&_embed`, { signal: controller.signal }),
      fetch(`${WP_API_BASE}/pages/22?_embed`, { signal: controller.signal }),
    ]);
    clearTimeout(timeoutId);

    const mergedSpa: SpaTreatment[] = [...SPA_TREATMENTS];

    if (postsRes.ok) {
      const posts = await postsRes.json();
      if (Array.isArray(posts)) {
        for (const post of posts) {
          const titleLower = (post.title?.rendered || '').toLowerCase();
          const slugLower = (post.slug || '').toLowerCase();
          const isSpa =
            titleLower.includes('spa') ||
            titleLower.includes('massage') ||
            titleLower.includes('therapy') ||
            titleLower.includes('wellness') ||
            slugLower.includes('spa') ||
            slugLower.includes('massage');

          if (isSpa) {
            const mediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            mergedSpa.push({
              id: `wp-spa-${post.id}`,
              name: cleanHtml(post.title?.rendered),
              duration: '60 / 90 Minutes',
              price: '$25 / $35 USD',
              category: 'massage',
              description: cleanHtml(post.excerpt?.rendered || post.content?.rendered || ''),
              benefits: ['Deep muscle relaxation', 'Relieves fatigue after temple walks', 'Organic herbal extracts'],
              image: mediaUrl || SPA_TREATMENTS[0].image,
            });
          }
        }
      }
    }

    cachedSpa = mergedSpa;
    return mergedSpa;
  } catch (err) {
    console.warn('WordPress API spa fetch fallback to baseline:', err);
  }

  cachedSpa = SPA_TREATMENTS;
  return SPA_TREATMENTS;
}

// Aliases for compatibility
export const getWordPressRooms = getRooms;
export const getWordPressTours = getTours;
export const getWordPressDining = getDining;
export const getWordPressSpa = getSpa;
