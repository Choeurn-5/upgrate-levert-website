const fs = require('fs');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

// Init Firebase
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}
const db = getFirestore();

const REDIS_KEYS = {
  BLOG_POSTS: 'levert:blog_posts',
  BLOG_CATEGORIES: 'levert:blog_categories',
  HERO_SETTINGS: 'levert:hero_settings',
  TOURS: 'levert:tours',
  GALLERY_PHOTOS: 'levert:gallery_photos',
  GALLERY_CATEGORIES: 'levert:gallery_categories',
};

async function migrate() {
  console.log('Starting migration from local-db.json to Firebase...');
  
  const localDbData = fs.readFileSync('src/data/local-db.json', 'utf8');
  const dbJson = JSON.parse(localDbData);

  for (const [key, value] of Object.entries(dbJson)) {
    console.log(`Writing ${key} to Firebase...`);
    await db.collection('database').doc(key).set({ value });
  }
  
  // Gallery uses a separate manifest usually, let's see if we can push it
  try {
    const galleryManifest = JSON.parse(fs.readFileSync('src/data/galleryManifest.json', 'utf8'));
    console.log('Writing gallery data to Firebase...');
    await db.collection('database').doc(REDIS_KEYS.GALLERY_PHOTOS).set({ value: galleryManifest.photos || [] });
    await db.collection('database').doc(REDIS_KEYS.GALLERY_CATEGORIES).set({ value: galleryManifest.categories || [] });
  } catch(e) {
    console.warn("Could not load gallery manifest", e);
  }

  console.log('Migration complete!');
  process.exit(0);
}

migrate().catch(console.error);
