import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudinaryUrl = process.env.CLOUDINARY_URL;

  const isConfigured = Boolean(cloudinaryUrl || (cloudName && apiKey && apiSecret));

  if (isConfigured) {
    if (cloudinaryUrl) {
      cloudinary.config({
        cloudinary_url: cloudinaryUrl,
        secure: true,
      });
    } else {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
    }
  }

  return { isConfigured };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate mime type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed (JPEG, PNG, WebP, GIF, SVG)' }, { status: 400 });
    }

    // Check size limit: 12MB
    if (file.size > 12 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 12MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Try Cloudinary if configured
    const { isConfigured } = getCloudinaryConfig();
    if (isConfigured) {
      try {
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'le-vert-angkor/blog',
              resource_type: 'auto',
            },
            (error, result) => {
              if (error || !result) {
                reject(error || new Error('Upload to Cloudinary failed'));
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });

        return NextResponse.json({
          url: uploadResult.secure_url,
          filename: uploadResult.public_id,
          provider: 'cloudinary',
        });
      } catch (cloudinaryErr: any) {
        console.error('Cloudinary upload failed, falling back to local storage:', cloudinaryErr);
      }
    }

    // 2. Fallback to local filesystem /uploads/
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
    } catch {}

    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${cleanName}`;
    const filePath = path.join(uploadsDir, filename);

    try {
      await fs.writeFile(filePath, buffer);
      const publicUrl = `/uploads/${filename}`;
      return NextResponse.json({ url: publicUrl, filename, provider: 'local' });
    } catch (writeErr) {
      // Do NOT fall back to base64 — storing large data URLs in Redis causes the
      // Upstash 10MB per-request limit to be hit and breaks the gallery.
      // Configure CLOUDINARY_URL in your environment variables for production image hosting.
      console.error('Filesystem write failed and Cloudinary is not configured:', writeErr);
      return NextResponse.json(
        {
          error:
            'Image upload failed: the server filesystem is read-only (Vercel) and Cloudinary is not configured. Please add CLOUDINARY_URL to your environment variables.',
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Image upload error:', error);
    return NextResponse.json({ error: error.message || 'Image upload failed' }, { status: 500 });
  }
}
