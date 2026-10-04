import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin if it hasn't been initialized yet
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace \\n with actual newline characters
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const db = getFirestore();

export const REDIS_KEYS = {
  BLOG_POSTS: 'levert:blog_posts',
  BLOG_CATEGORIES: 'levert:blog_categories',
  HERO_SETTINGS: 'levert:hero_settings',
  TOURS: 'levert:tours',
  GALLERY_PHOTOS: 'levert:gallery_photos',
  GALLERY_CATEGORIES: 'levert:gallery_categories',
} as const;

let initialized = false;

// We return an object that mimics the Upstash Redis methods we were using
export function getRedis() {
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY) {
    console.warn('Firebase credentials missing, falling back to local storage.');
    return null;
  }

  return {
    async get(key: string) {
      try {
        const docRef = db.collection('database').doc(key);
        const doc = await docRef.get();
        if (doc.exists) {
          return doc.data()?.value;
        }
        return null;
      } catch (err) {
        console.error(`Firebase GET error for key ${key}:`, err);
        return null;
      }
    },
    async set(key: string, value: any) {
      try {
        const docRef = db.collection('database').doc(key);
        await docRef.set({ value });
        return 'OK';
      } catch (err) {
        console.error(`Firebase SET error for key ${key}:`, err);
        throw err;
      }
    }
  };
}
