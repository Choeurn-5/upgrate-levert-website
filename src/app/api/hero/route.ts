import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { HeroConfig } from '@/types';
import { HERO_CONFIGS } from '@/lib/site-settings';

export const dynamic = 'force-dynamic';

const HERO_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'hero-settings.json');

async function getStoredHeroConfigs(): Promise<Record<string, HeroConfig>> {
  try {
    const content = await fs.readFile(HERO_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === 'object') {
      return { ...HERO_CONFIGS, ...parsed };
    }
  } catch (error) {
    try {
      await fs.writeFile(HERO_FILE_PATH, JSON.stringify(HERO_CONFIGS, null, 2), 'utf-8');
    } catch {}
  }
  return HERO_CONFIGS;
}

async function saveHeroConfigs(configs: Record<string, HeroConfig>): Promise<boolean> {
  try {
    await fs.writeFile(HERO_FILE_PATH, JSON.stringify(configs, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save hero-settings.json:', err);
    return false;
  }
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
