import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'images', 'Gallery');

const FOLDER_LABELS: Record<string, string> = {
  room: 'Suites & Rooms',
  dinning: 'Dining & Cocktails',
  pool: 'Rooftop Pool',
  tour: 'Temple Tours',
  spa: 'Khmer Spa',
};

const FOLDER_TO_VALUE: Record<string, string> = {
  room: 'rooms',
  dinning: 'dining',
  pool: 'pool',
  tour: 'tours',
  spa: 'spa',
};

export async function GET() {
  const categories = [{ id: 'cat-all', label: 'All Photos', value: 'all' }];

  try {
    const folders = fs.readdirSync(GALLERY_DIR, { withFileTypes: true });
    for (const folder of folders) {
      if (!folder.isDirectory()) continue;
      const name = folder.name;
      categories.push({
        id: `cat-${name}`,
        label: FOLDER_LABELS[name] || name.charAt(0).toUpperCase() + name.slice(1),
        value: FOLDER_TO_VALUE[name] || name,
      });
    }
  } catch (err) {
    console.error('Failed to read gallery folders:', err);
    // Return defaults
    categories.push(
      { id: 'cat-rooms', label: 'Suites & Rooms', value: 'rooms' },
      { id: 'cat-dining', label: 'Dining & Cocktails', value: 'dining' },
      { id: 'cat-pool', label: 'Rooftop Pool', value: 'pool' },
      { id: 'cat-tours', label: 'Temple Tours', value: 'tours' },
    );
  }

  return NextResponse.json(categories);
}
