import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { BlogPost } from '@/types';
import { INITIAL_BLOG_POSTS } from '@/data/blogData';
import { getRedis, REDIS_KEYS } from '@/lib/redis';

export const dynamic = 'force-dynamic';

// Candidate file paths for robust persistence across environments (local, cPanel, Docker, serverless)
const CANDIDATE_PATHS = [
  path.join(process.cwd(), 'src', 'data', 'blog-posts.json'),
  path.join(process.cwd(), 'data', 'blog-posts.json'),
  path.join(process.cwd(), 'public', 'data', 'blog-posts.json'),
  path.join('/tmp', 'levert-blog-posts.json'),
];

// In-memory cache across server requests so runtime state never resurrects deleted posts
declare global {
  var __LEVERT_BLOG_POSTS__: BlogPost[] | undefined;
}

async function getStoredPosts(reset: boolean = false): Promise<BlogPost[]> {
  const redis = getRedis();
  if (redis) {
    try {
      if (!reset) {
        const cached = await redis.get<BlogPost[]>(REDIS_KEYS.BLOG_POSTS);
        if (Array.isArray(cached)) {
          globalThis.__LEVERT_BLOG_POSTS__ = cached;
          return cached;
        }
      }
      // If redis is connected but key not found yet, seed it once
      const initial = [...INITIAL_BLOG_POSTS];
      await redis.set(REDIS_KEYS.BLOG_POSTS, initial);
      globalThis.__LEVERT_BLOG_POSTS__ = initial;
      return initial;
    } catch (err) {
      console.error('Redis read error, falling back to disk/memory:', err);
    }
  }

  if (!reset && globalThis.__LEVERT_BLOG_POSTS__ !== undefined) {
    return globalThis.__LEVERT_BLOG_POSTS__;
  }

  for (const filePath of CANDIDATE_PATHS) {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      // Valid if array, even if empty [] (meaning all posts deleted)
      if (Array.isArray(parsed)) {
        globalThis.__LEVERT_BLOG_POSTS__ = parsed;
        return parsed;
      }
    } catch {
      // Try next candidate path
    }
  }

  // If no file exists anywhere, initialize with INITIAL_BLOG_POSTS
  const fallback = [...INITIAL_BLOG_POSTS];
  globalThis.__LEVERT_BLOG_POSTS__ = fallback;
  await saveStoredPosts(fallback);
  return fallback;
}

async function saveStoredPosts(posts: BlogPost[]): Promise<boolean> {
  // Always update in-memory cache first
  globalThis.__LEVERT_BLOG_POSTS__ = posts;

  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(REDIS_KEYS.BLOG_POSTS, posts);
    } catch (err) {
      console.error('Redis write error:', err);
    }
  }

  for (const filePath of CANDIDATE_PATHS) {
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf-8');
    } catch {
      // Continue to next path
    }
  }

  return true;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const includeDrafts = searchParams.get('admin') === 'true';
    const reset = searchParams.get('reset') === 'true';

    const posts = await getStoredPosts(reset);

    if (slug) {
      const post = posts.find((p) => p.slug === slug);
      if (!post || (!includeDrafts && post.status === 'draft')) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    if (id) {
      const post = posts.find((p) => p.id === id);
      if (!post || (!includeDrafts && post.status === 'draft')) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    let filtered = [...posts];
    if (!includeDrafts) {
      filtered = filtered.filter((p) => p.status === 'published');
    }

    if (category && category !== 'All Stories') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Sort by published date descending
    filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json(filtered);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// POST /api/blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, category, coverImage, author, tags, status, isFeatured, readTimeMinutes } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const posts = await getStoredPosts();
    let slug = body.slug ? slugify(body.slug) : slugify(title);

    // Ensure unique slug
    let uniqueSlug = slug;
    let counter = 1;
    while (posts.some((p) => p.slug === uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      slug: uniqueSlug,
      title: title.trim(),
      excerpt: excerpt?.trim() || content.replace(/<[^>]+>/g, '').slice(0, 160) + '...',
      content: content.trim(),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=85',
      category: category || 'Temple Guides',
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      author: {
        name: author?.name || 'Le Vert Editorial Team',
        role: author?.role || 'Guest Concierge',
        avatar: author?.avatar?.trim() || '/images/default-avatar.svg',
      },
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
      readTimeMinutes: Number(readTimeMinutes) || 5,
      isFeatured: Boolean(isFeatured),
      status: status === 'draft' ? 'draft' : 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (newPost.isFeatured) {
      posts.forEach((p) => (p.isFeatured = false));
    }

    posts.unshift(newPost);
    await saveStoredPosts(posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create post' }, { status: 500 });
  }
}

// PUT /api/blog
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Post id is required' }, { status: 400 });
    }

    const posts = await getStoredPosts();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const existing = posts[index];
    let newSlug = existing.slug;
    if (body.slug && body.slug !== existing.slug) {
      newSlug = slugify(body.slug);
      let counter = 1;
      while (posts.some((p) => p.slug === newSlug && p.id !== id)) {
        newSlug = `${slugify(body.slug)}-${counter}`;
        counter++;
      }
    }

    const updatedPost: BlogPost = {
      ...existing,
      slug: newSlug,
      title: body.title !== undefined ? body.title.trim() : existing.title,
      excerpt: body.excerpt !== undefined ? body.excerpt.trim() : existing.excerpt,
      content: body.content !== undefined ? body.content.trim() : existing.content,
      coverImage: body.coverImage !== undefined ? body.coverImage : existing.coverImage,
      category: body.category !== undefined ? body.category : existing.category,
      tags: body.tags !== undefined ? (Array.isArray(body.tags) ? body.tags : typeof body.tags === 'string' ? body.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : existing.tags) : existing.tags,
      author: {
        ...existing.author,
        ...(body.author || {}),
        avatar: body.author?.avatar?.trim() || existing.author.avatar || '/images/default-avatar.svg',
      },
      publishedAt: body.publishedAt || existing.publishedAt,
      readTimeMinutes: body.readTimeMinutes !== undefined ? Number(body.readTimeMinutes) : existing.readTimeMinutes,
      isFeatured: body.isFeatured !== undefined ? Boolean(body.isFeatured) : existing.isFeatured,
      status: body.status !== undefined ? (body.status === 'draft' ? 'draft' : 'published') : existing.status,
      updatedAt: new Date().toISOString(),
    };

    if (updatedPost.isFeatured) {
      posts.forEach((p) => {
        if (p.id !== id) p.isFeatured = false;
      });
    }

    posts[index] = updatedPost;
    await saveStoredPosts(posts);

    return NextResponse.json(updatedPost);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update post' }, { status: 500 });
  }
}

// DELETE /api/blog?id=...
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post id is required' }, { status: 400 });
    }

    const posts = await getStoredPosts();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Post not found or already deleted' }, { status: 404 });
    }

    const deleted = posts.splice(index, 1)[0];
    await saveStoredPosts(posts);

    return NextResponse.json({
      success: true,
      deletedPost: deleted,
      remainingCount: posts.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete post' }, { status: 500 });
  }
}
