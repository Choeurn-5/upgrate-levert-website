import { NextResponse } from 'next/server';
import manifest from '@/data/galleryManifest.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(manifest.photos);
}

