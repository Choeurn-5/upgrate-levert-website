import { NextRequest, NextResponse } from 'next/server';
import { getRedis } from '@/lib/redis';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const redis = getRedis();
    if (!redis) return NextResponse.json({ views: 0 });
    const views = await redis.get(`blog:views:${slug}`);
    
    return NextResponse.json({ views: views || 0 });
  } catch (error) {
    console.error('Failed to get blog views:', error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const redis = getRedis();
    if (!redis) return NextResponse.json({ views: 0 });

    // Increment the view count in Redis
    const newViews = await redis.incr(`blog:views:${slug}`);
    
    return NextResponse.json({ views: newViews });
  } catch (error) {
    console.error('Failed to increment blog views:', error);
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
  }
}
