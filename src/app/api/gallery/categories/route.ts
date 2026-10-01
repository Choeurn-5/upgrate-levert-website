import { NextRequest, NextResponse } from 'next/server';
import { getRedis } from '@/lib/redis';

export const dynamic = 'force-dynamic';
const CATEGORIES_KEY = 'levert:gallery_categories';

export interface GalleryCategory {
  id: string;
  label: string;
  value: string;
}

const DEFAULT_CATEGORIES: GalleryCategory[] = [
  { id: 'cat-all', label: 'All Photos', value: 'all' },
  { id: 'cat-rooms', label: 'Suites & Rooms', value: 'rooms' },
  { id: 'cat-tours', label: 'Temple Tours', value: 'tours' },
  { id: 'cat-pool', label: 'Rooftop Pool', value: 'pool' },
  { id: 'cat-dining', label: 'Dining & Cocktails', value: 'dining' },
  { id: 'cat-spa', label: 'Khmer Spa', value: 'spa' },
];

export async function GET() {
  try {
    const redis = getRedis();
    if (redis) {
      const cached = await redis.get<GalleryCategory[]>(CATEGORIES_KEY);
      if (Array.isArray(cached)) {
        return NextResponse.json(cached);
      }
    }
    return NextResponse.json(DEFAULT_CATEGORIES);
  } catch (err) {
    console.error('Failed to get gallery categories', err);
    return NextResponse.json(DEFAULT_CATEGORIES);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, value } = body;

    if (!label || !value) {
      return NextResponse.json({ error: 'Label and value required' }, { status: 400 });
    }

    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
    }

    const current = (await redis.get<GalleryCategory[]>(CATEGORIES_KEY)) || [...DEFAULT_CATEGORIES];
    
    // Check if category value already exists
    if (current.some(c => c.value === value)) {
      return NextResponse.json({ error: 'Category value already exists' }, { status: 400 });
    }

    const newCategory: GalleryCategory = {
      id: `cat-${Date.now()}`,
      label,
      value
    };

    const updated = [...current, newCategory];
    await redis.set(CATEGORIES_KEY, updated);

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
      return NextResponse.json({ error: 'Category id is required' }, { status: 400 });
    }

    // Do not allow deleting 'all'
    if (id === 'cat-all') {
      return NextResponse.json({ error: 'Cannot delete "All Photos" category' }, { status: 400 });
    }

    const redis = getRedis();
    if (!redis) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
    }

    const current = (await redis.get<GalleryCategory[]>(CATEGORIES_KEY)) || [...DEFAULT_CATEGORIES];
    const filtered = current.filter(c => c.id !== id && c.value !== id); // Accept id or value just in case

    await redis.set(CATEGORIES_KEY, filtered);

    return NextResponse.json({ success: true, categories: filtered });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
