import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { HeroConfig } from '@/types';
import { HERO_CONFIGS } from '@/lib/site-settings';
import { getRedis, REDIS_KEYS } from '@/lib/redis';

export const dynamic = 'force-dynamic';

const CANDIDATE_PATHS = [
  path.join(process.cwd(), 'src', 'data', 'hero-settings.json'),
  path.join(process.cwd(), 'data', 'hero-settings.json'),
  path.join(process.cwd(), 'public', 'data', 'hero-settings.json'),
  path.join('/tmp', 'levert-hero-settings.json'),
];

declare global {
  var __LEVERT_HERO_CONFIGS__: Record<string, HeroConfig> | undefined;
}

async function getStoredHeroConfigs(): Promise<Record<string, HeroConfig>> {
  const redis = getRedis();
  if (redis) {
    try {
      const cached = await redis.get<Record<string, HeroConfig>>(REDIS_KEYS.HERO_SETTINGS);
      if (cached && typeof cached === 'object') {
        const merged = { ...HERO_CONFIGS, ...cached };
        globalThis.__LEVERT_HERO_CONFIGS__ = merged;
        return merged;
      }
      await redis.set(REDIS_KEYS.HERO_SETTINGS, HERO_CONFIGS);
      const initial = { ...HERO_CONFIGS };
      globalThis.__LEVERT_HERO_CONFIGS__ = initial;
      return initial;
    } catch (err) {
      console.error('Redis read hero error:', err);
    }
  }

  if (globalThis.__LEVERT_HERO_CONFIGS__ !== undefined) {
    return globalThis.__LEVERT_HERO_CONFIGS__;
  }

  for (const filePath of CANDIDATE_PATHS) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === 'object') {
        const merged = { ...HERO_CONFIGS, ...parsed };
        globalThis.__LEVERT_HERO_CONFIGS__ = merged;
        return merged;
      }
    } catch {}
  }

  const fallback = { ...HERO_CONFIGS };
  globalThis.__LEVERT_HERO_CONFIGS__ = fallback;
  await saveHeroConfigs(fallback);
  return fallback;
}

async function saveHeroConfigs(configs: Record<string, HeroConfig>): Promise<boolean> {
  globalThis.__LEVERT_HERO_CONFIGS__ = configs;

  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(REDIS_KEYS.HERO_SETTINGS, configs);
    } catch (err) {
      console.error('Redis save hero error:', err);
    }
  }

  for (const filePath of CANDIDATE_PATHS) {
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(configs, null, 2), 'utf-8');
    } catch {}
  }
  return true;
}

// GET /api/hero
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get('page');

    const configs = await getStoredHeroConfigs();

    if (pageKey) {
      const single = configs[pageKey] || HERO_CONFIGS[pageKey];
      if (!single) {
        return NextResponse.json({ error: `Hero config for "${pageKey}" not found` }, { status: 404 });
      }
      return NextResponse.json({ pageKey, config: single });
    }

    return NextResponse.json(configs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch hero configs' }, { status: 500 });
  }
}

// POST /api/hero - Update a single page hero or multiple
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageKey, config } = body;

    if (!pageKey || !config) {
      return NextResponse.json({ error: 'Missing pageKey or config object' }, { status: 400 });
    }

    const currentConfigs = await getStoredHeroConfigs();
    const updated = {
      ...currentConfigs,
      [pageKey]: {
        ...(currentConfigs[pageKey] || {}),
        ...config,
      },
    };

    await saveHeroConfigs(updated);

    return NextResponse.json({
      message: `Hero for "${pageKey}" updated successfully`,
      pageKey,
      config: updated[pageKey],
      allConfigs: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update hero config' }, { status: 500 });
  }
}
