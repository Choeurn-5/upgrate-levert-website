import { NextResponse } from 'next/server';
import { getRedis } from '@/lib/redis';

export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({});

    // Fetch all blog likes keys
    const keys = await redis.keys('blog:likes:*');
    
    if (!keys || keys.length === 0) {
      return NextResponse.json({});
    }

    // Use mget to fetch all values at once
    const values = await redis.mget(...keys);
    
    const likesMap: Record<string, number> = {};
    
    keys.forEach((key, index) => {
      // Extract slug from "blog:likes:slug"
      const slug = key.replace('blog:likes:', '');
      likesMap[slug] = Number(values[index]) || 0;
    });

    return NextResponse.json(likesMap);
  } catch (error) {
    console.error('Failed to get all blog likes:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
