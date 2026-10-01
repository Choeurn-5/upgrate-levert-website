import { Redis } from '@upstash/redis';

let redisInstance: Redis | null = null;
let initialized = false;

export function getRedis(): Redis | null {
  if (initialized) return redisInstance;

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      redisInstance = new Redis({ url, token });
    } catch (err) {
      console.warn('Could not initialize Upstash Redis, falling back to local storage:', err);
      redisInstance = null;
    }
  } else {
    redisInstance = null;
  }

  initialized = true;
  return redisInstance;
}

export const REDIS_KEYS = {
  BLOG_POSTS: 'levert:blog_posts',
  BLOG_CATEGORIES: 'levert:blog_categories',
  HERO_SETTINGS: 'levert:hero_settings',
  TOURS: 'levert:tours',
  GALLERY_PHOTOS: 'levert:gallery_photos',
  GALLERY_CATEGORIES: 'levert:gallery_categories',
} as const;
