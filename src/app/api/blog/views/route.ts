import { NextResponse } from 'next/server';
import { getRedis } from '@/lib/redis';

export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({});

    // We will use SCAN or KEYS to find all blog views. 
    // Upstash Redis provides keys() which is easy to use for this small dataset.
    const keys = await redis.keys('blog:views:*');
    
    if (!keys || keys.length === 0) {
      return NextResponse.json({});
    }

    // Use mget to fetch all values at once
    const values = await redis.mget(...keys);
    
    const viewsMap: Record<string, number> = {};
    
    keys.forEach((key, index) => {
      // Extract slug from "blog:views:slug"
      const slug = key.replace('blog:views:', '');
      viewsMap[slug] = Number(values[index]) || 0;
    });

    return NextResponse.json(viewsMap);
  } catch (error) {
    console.error('Failed to get all blog views:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
