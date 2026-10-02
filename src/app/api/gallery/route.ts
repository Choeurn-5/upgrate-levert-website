import { NextRequest, NextResponse } from 'next/server';
import { getRedis, REDIS_KEYS } from '@/lib/redis';
import { GalleryPhoto } from '@/types';
import { GALLERY_PHOTOS } from '@/data/hotelData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const redis = getRedis();
    if (redis) {
      const cached = await redis.get<GalleryPhoto[]>(REDIS_KEYS.GALLERY_PHOTOS || 'levert:gallery_photos');
      if (Array.isArray(cached)) {
        return NextResponse.json(cached);
      }
    }
    // Fallback to static
    return NextResponse.json(GALLERY_PHOTOS);
  } catch (err) {
    console.error('Failed to get gallery photos', err);
    return NextResponse.json(GALLERY_PHOTOS);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { photos } = body; // Expecting an array of new photos

    if (!Array.isArray(photos)) {
      return NextResponse.json({ error: 'Expected an array of photos' }, { status: 400 });
    }

    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
    }

    const currentPhotos = (await redis.get<GalleryPhoto[]>(REDIS_KEYS.GALLERY_PHOTOS || 'levert:gallery_photos')) || [...GALLERY_PHOTOS];
    
    const newPhotos = photos.map(p => ({
      ...p,
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    }));

    // Guard: reject base64 data URLs — they are too large for Redis (10MB limit per request)
    const hasBase64 = newPhotos.some(p => typeof p.url === 'string' && p.url.startsWith('data:'));
    if (hasBase64) {
      return NextResponse.json(
        { error: 'Cannot store base64 image data in the database. Please configure Cloudinary (CLOUDINARY_URL) for image hosting.' },
        { status: 400 }
      );
    }

    const updated = [...newPhotos, ...currentPhotos];
    await redis.set(REDIS_KEYS.GALLERY_PHOTOS || 'levert:gallery_photos', updated);

    return NextResponse.json(updated, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Photo id is required' }, { status: 400 });
    }

    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
    }

    const currentPhotos = (await redis.get<GalleryPhoto[]>(REDIS_KEYS.GALLERY_PHOTOS || 'levert:gallery_photos')) || [...GALLERY_PHOTOS];
    const filtered = currentPhotos.filter(p => String(p.id) !== id);

    await redis.set(REDIS_KEYS.GALLERY_PHOTOS || 'levert:gallery_photos', filtered);

    return NextResponse.json({ success: true, photos: filtered });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
