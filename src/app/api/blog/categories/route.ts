import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

import { getRedis, REDIS_KEYS } from '@/lib/redis';

export const dynamic = 'force-dynamic';

const CANDIDATE_PATHS = [
  path.join(process.cwd(), 'src', 'data', 'blog-categories.json'),
  path.join(process.cwd(), 'data', 'blog-categories.json'),
  path.join(process.cwd(), 'public', 'data', 'blog-categories.json'),
  path.join('/tmp', 'levert-blog-categories.json'),
];

const DEFAULT_CATEGORIES = [
  'Temple Guides',
  'Siem Reap Insider',
  'Khmer Gastronomy',
  'Wellness & Retreat',
  'Hotel News & Stories',
];

declare global {
  var __LEVERT_BLOG_CATEGORIES__: string[] | undefined;
}

async function getStoredCategories(): Promise<string[]> {
  const redis = getRedis();
  if (redis) {
    try {
      const cached = await redis.get<string[]>(REDIS_KEYS.BLOG_CATEGORIES);
      if (Array.isArray(cached)) {
        globalThis.__LEVERT_BLOG_CATEGORIES__ = cached;
        return cached;
      }
      const initial = [...DEFAULT_CATEGORIES];
      await redis.set(REDIS_KEYS.BLOG_CATEGORIES, initial);
      globalThis.__LEVERT_BLOG_CATEGORIES__ = initial;
      return initial;
    } catch (err) {
      console.error('Redis read categories error:', err);
    }
  }

  if (globalThis.__LEVERT_BLOG_CATEGORIES__ !== undefined) {
    return globalThis.__LEVERT_BLOG_CATEGORIES__;
  }

  for (const filePath of CANDIDATE_PATHS) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        globalThis.__LEVERT_BLOG_CATEGORIES__ = parsed;
        return parsed;
      }
    } catch {}
  }

  const fallback = [...DEFAULT_CATEGORIES];
  globalThis.__LEVERT_BLOG_CATEGORIES__ = fallback;
  await saveCategories(fallback);
  return fallback;
}

async function getCategoriesFromPosts(): Promise<string[]> {
  const redis = getRedis();
  if (redis) {
    try {
      const posts = await redis.get<any[]>(REDIS_KEYS.BLOG_POSTS);
      if (Array.isArray(posts)) {
        return posts.map((p) => p.category).filter(Boolean);
      }
    } catch {}
  }

  const postPaths = [
    path.join(process.cwd(), 'src', 'data', 'blog-posts.json'),
    path.join(process.cwd(), 'data', 'blog-posts.json'),
    path.join('/tmp', 'levert-blog-posts.json'),
  ];
  for (const filePath of postPaths) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const posts = JSON.parse(content);
      if (Array.isArray(posts)) {
        return posts.map((p) => p.category).filter(Boolean);
      }
    } catch {}
  }
  return [];
}

async function saveCategories(categories: string[]): Promise<boolean> {
  globalThis.__LEVERT_BLOG_CATEGORIES__ = categories;

  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(REDIS_KEYS.BLOG_CATEGORIES, categories);
    } catch (err) {
      console.error('Redis write categories error:', err);
    }
  }

  for (const filePath of CANDIDATE_PATHS) {
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(categories, null, 2), 'utf-8');
    } catch {}
  }
  return true;
}

// GET /api/blog/categories - returns list of all unique categories
export async function GET() {
  try {
    const [stored, fromPosts] = await Promise.all([
      getStoredCategories(),
      getCategoriesFromPosts(),
    ]);

    // Unique merge
    const merged = Array.from(new Set([...stored, ...fromPosts]));
    return NextResponse.json(merged);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to get categories' }, { status: 500 });
  }
}

// POST /api/blog/categories - add a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = (body.name || '').trim();

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    if (name.length < 2 || name.length > 50) {
      return NextResponse.json({ error: 'Category name must be between 2 and 50 characters' }, { status: 400 });
    }

    const current = await getStoredCategories();
    const existing = current.find((c) => c.toLowerCase() === name.toLowerCase());

    if (existing) {
      return NextResponse.json({
        message: 'Category already exists',
        category: existing,
        categories: current,
      });
    }

    const updated = [...current, name];
    await saveCategories(updated);

    return NextResponse.json({
      message: 'Category created successfully',
      category: name,
      categories: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create category' }, { status: 500 });
  }
}

// DELETE /api/blog/categories - delete a category if not protected
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name')?.trim();

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const current = await getStoredCategories();
    const updated = current.filter((c) => c.toLowerCase() !== name.toLowerCase());

    await saveCategories(updated);
    return NextResponse.json({ message: 'Category removed', categories: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete category' }, { status: 500 });
  }
}
