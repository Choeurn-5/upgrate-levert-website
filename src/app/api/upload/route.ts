import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Upload API — disabled.
 *
 * Gallery images are now served as static files committed directly to
 * public/images/Gallery/. Cloudinary and Redis-based uploads are no longer used.
 * To add new gallery photos: drop the file in the subfolder, add an entry to
 * src/data/galleryManifest.json, then git commit and push.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        'Direct upload is disabled. Gallery images are managed as static files. ' +
        'To add photos: place the image in public/images/Gallery/<category>/ and update src/data/galleryManifest.json, then push to GitHub.',
    },
    { status: 501 }
  );
}
