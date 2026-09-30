import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const CATEGORIES_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'blog-categories.json');
const POSTS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'blog-posts.json');

const DEFAULT_CATEGORIES = [
  'Temple Guides',
  'Siem Reap Insider',
  'Khmer Gastronomy',
  'Wellness & Retreat',
  'Hotel News & Stories',
];

async function getStoredCategories(): Promise<string[]> {
  try {
    const content = await fs.readFile(CATEGORIES_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    try {
      await fs.writeFile(CATEGORIES_FILE_PATH, JSON.stringify(DEFAULT_CATEGORIES, null, 2), 'utf-8');
    } catch {}
  }
  return DEFAULT_CATEGORIES;
}

async function getCategoriesFromPosts(): Promise<string[]> {
  try {
    const content = await fs.readFile(POSTS_FILE_PATH, 'utf-8');
    const posts = JSON.parse(content);
    if (Array.isArray(posts)) {
      return posts.map((p) => p.category).filter(Boolean);
    }
  } catch {}
  return [];
}

async function saveCategories(categories: string[]): Promise<boolean> {
  try {
    await fs.writeFile(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save categories:', err);
    return false;
  }
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
