import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const views = await redis.get(`blog:views:${slug}`);
    
    return NextResponse.json({ views: views || 0 });
  } catch (error) {
    console.error('Failed to get blog views:', error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    // Increment the view count in Redis
    const newViews = await redis.incr(`blog:views:${slug}`);
    
    return NextResponse.json({ views: newViews });
  } catch (error) {
    console.error('Failed to increment blog views:', error);
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
  }
}
