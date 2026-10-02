import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GalleryPhoto } from '@/types';

export const dynamic = 'force-dynamic';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'images', 'Gallery');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WebP'];

// Map folder names to category values
const FOLDER_TO_CATEGORY: Record<string, string> = {
  room: 'rooms',
  dinning: 'dining',
  pool: 'pool',
  tour: 'tours',
  spa: 'spa',
};

function scanGalleryFolder(): GalleryPhoto[] {
  const photos: GalleryPhoto[] = [];

  try {
    const folders = fs.readdirSync(GALLERY_DIR, { withFileTypes: true });

    for (const folder of folders) {
      if (!folder.isDirectory()) continue;

      const folderName = folder.name;
      const category = FOLDER_TO_CATEGORY[folderName] || folderName;
      const folderPath = path.join(GALLERY_DIR, folderName);

      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!IMAGE_EXTENSIONS.some(e => e.toLowerCase() === ext)) continue;

        const url = `/images/Gallery/${folderName}/${encodeURIComponent(file)}`;
        const title = path.basename(file, path.extname(file));

        photos.push({
          id: `${folderName}-${file}`,
          url,
          title,
          category,
          alt: `${category} - ${title}`,
        });
      }
    }
  } catch (err) {
    console.error('Failed to scan gallery folder:', err);
  }

  return photos;
}

export async function GET() {
  const photos = scanGalleryFolder();
  return NextResponse.json(photos);
}
