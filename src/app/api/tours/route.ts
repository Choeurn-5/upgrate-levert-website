import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Tour } from '@/types';
import { TOURS_DATA } from '@/data/hotelData';
import { getRedis, REDIS_KEYS } from '@/lib/redis';

export const dynamic = 'force-dynamic';

const CANDIDATE_PATHS = [
  path.join(process.cwd(), 'src', 'data', 'tours.json'),
  path.join(process.cwd(), 'data', 'tours.json'),
  path.join(process.cwd(), 'public', 'data', 'tours.json'),
  path.join('/tmp', 'levert-tours.json'),
];

declare global {
  var __LEVERT_TOURS__: Tour[] | undefined;
}

async function getStoredTours(reset: boolean = false): Promise<Tour[]> {
  const redis = getRedis();
  if (redis) {
    try {
      if (!reset) {
        const cached = await redis.get<Tour[]>(REDIS_KEYS.TOURS);
        if (Array.isArray(cached)) {
          globalThis.__LEVERT_TOURS__ = cached;
          return cached;
        }
      }
      const initial = [...TOURS_DATA];
      await redis.set(REDIS_KEYS.TOURS, initial);
      globalThis.__LEVERT_TOURS__ = initial;
      return initial;
    } catch (err) {
      console.error('Redis read error, falling back:', err);
    }
  }
  if (globalThis.__LEVERT_TOURS__ !== undefined) return globalThis.__LEVERT_TOURS__;
  for (const filePath of CANDIDATE_PATHS) {
    try {
      const parsed = JSON.parse(await fs.readFile(filePath, 'utf-8'));
      if (Array.isArray(parsed)) { globalThis.__LEVERT_TOURS__ = parsed; return parsed; }
    } catch {}
  }
  const fallback = [...TOURS_DATA];
  globalThis.__LEVERT_TOURS__ = fallback;
  await saveStoredTours(fallback);
  return fallback;
}

async function saveStoredTours(tours: Tour[]): Promise<boolean> {
  globalThis.__LEVERT_TOURS__ = tours;
  const redis = getRedis();
  if (redis) { try { await redis.set(REDIS_KEYS.TOURS, tours); } catch (err) { console.error('Redis write error:', err); } }
  for (const filePath of CANDIDATE_PATHS) {
    try { await fs.mkdir(path.dirname(filePath), { recursive: true }); await fs.writeFile(filePath, JSON.stringify(tours, null, 2), 'utf-8'); } catch {}
  }
  return true;
}

function slugify(text: string): string {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');
    const reset = searchParams.get('reset') === 'true';
    const tours = [...await getStoredTours(reset)];

    // Sort tours by last updated (newest on top)
    tours.sort((a, b) => {
      const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : a.id;
      const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : b.id;
      return timeB - timeA;
    });

    if (slug) { const t = tours.find((t) => t.slug === slug); return t ? NextResponse.json(t) : NextResponse.json({ error: 'Tour not found' }, { status: 404 }); }
    if (id) { const t = tours.find((t) => String(t.id) === id); return t ? NextResponse.json(t) : NextResponse.json({ error: 'Tour not found' }, { status: 404 }); }
    return NextResponse.json(tours);
  } catch (err: any) { return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 }); }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, durationLabel, longDescription, featuredImage, highlights, options } = body;
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    const tours = await getStoredTours();
    let slug = body.slug ? slugify(body.slug) : slugify(title);
    let uniqueSlug = slug; let counter = 1;
    while (tours.some((t) => t.slug === uniqueSlug)) { uniqueSlug = `${slug}-${counter}`; counter++; }
    const newTour: Tour = {
      id: Date.now(), slug: uniqueSlug, title: title.trim(),
      durationLabel: durationLabel || '',
      longDescription: longDescription?.trim() || '',
      featuredImage: featuredImage || 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85',
      highlights: Array.isArray(highlights) ? highlights : [],
      options: Array.isArray(options) ? options : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tours.unshift(newTour);
    await saveStoredTours(tours);
    return NextResponse.json(newTour, { status: 201 });
  } catch (err: any) { return NextResponse.json({ error: err.message || 'Failed to create tour' }, { status: 500 }); }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: 'Tour id is required' }, { status: 400 });
    const tours = await getStoredTours();
    const index = tours.findIndex((t) => String(t.id) === String(id));
    if (index === -1) return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    const existing = tours[index];
    let newSlug = existing.slug;
    if (body.slug && body.slug !== existing.slug) {
      newSlug = slugify(body.slug); let counter = 1;
      while (tours.some((t) => t.slug === newSlug && String(t.id) !== String(id))) { newSlug = `${slugify(body.slug)}-${counter}`; counter++; }
    }
    const updatedTour: Tour = {
      ...existing, slug: newSlug,
      title: body.title !== undefined ? body.title.trim() : existing.title,
      durationLabel: body.durationLabel ?? existing.durationLabel,
      longDescription: body.longDescription !== undefined ? body.longDescription.trim() : existing.longDescription,
      featuredImage: body.featuredImage ?? existing.featuredImage,
      highlights: body.highlights ?? existing.highlights,
      options: body.options ?? existing.options,
      updatedAt: new Date().toISOString(),
    };
    tours[index] = updatedTour;
    await saveStoredTours(tours);
    return NextResponse.json(updatedTour);
  } catch (err: any) { return NextResponse.json({ error: err.message || 'Failed to update tour' }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Tour id is required' }, { status: 400 });
    const tours = await getStoredTours();
    const index = tours.findIndex((t) => String(t.id) === id);
    if (index === -1) return NextResponse.json({ error: 'Tour not found or already deleted' }, { status: 404 });
    const deleted = tours.splice(index, 1)[0];
    await saveStoredTours(tours);
    return NextResponse.json({ success: true, deletedTour: deleted, remainingCount: tours.length });
  } catch (err: any) { return NextResponse.json({ error: err.message || 'Failed to delete tour' }, { status: 500 }); }
}
