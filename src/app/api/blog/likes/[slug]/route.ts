import { NextRequest, NextResponse } from 'next/server';
import { getRedis } from '@/lib/redis';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const redis = getRedis();
    if (!redis) return NextResponse.json({ likes: 0 });
    
    const likes = await redis.get(`blog:likes:${slug}`);
    
    return NextResponse.json({ likes: likes || 0 });
  } catch (error) {
    console.error('Failed to get blog likes:', error);
    return NextResponse.json({ likes: 0 }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const redis = getRedis();
    if (!redis) return NextResponse.json({ likes: 0 });

    // Increment the like count in Redis
    const newLikes = await redis.incr(`blog:likes:${slug}`);
    
    return NextResponse.json({ likes: newLikes });
  } catch (error) {
    console.error('Failed to increment blog likes:', error);
    return NextResponse.json({ error: 'Failed to increment likes' }, { status: 500 });
  }
}
