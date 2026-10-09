import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Configure Cloudinary inside the route to ensure it catches runtime env vars
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const folder = (formData.get('folder') as string) || 'le_vert_uploads';

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      // Require Cloudinary setup
      if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        throw new Error('Cloudinary credentials are not configured in environment variables');
      }

      // Upload to Cloudinary using a stream
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: folder },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      return NextResponse.json({
        url: (uploadResult as any).secure_url,
        provider: 'cloudinary',
        success: true
      });
    } catch (cloudError: any) {
      console.error('Cloudinary upload failed:', cloudError);
      
      // If we are on Vercel, local storage WILL fail, so we must return the Cloudinary error
      if (process.env.VERCEL) {
        return NextResponse.json(
          { error: 'Cloudinary upload failed on Vercel', details: cloudError.message || String(cloudError) },
          { status: 500 }
        );
      }

      console.warn('Falling back to local storage...');
      
      // Generate unique filename for local fallback
      const uniqueId = crypto.randomUUID();
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `uploads/${uniqueId}.${extension}`;

      // Fallback: Upload to local public/uploads directory
      const publicDir = path.join(process.cwd(), 'public');
      const uploadDir = path.join(publicDir, 'uploads');
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const localFilePath = path.join(publicDir, filename);
      fs.writeFileSync(localFilePath, buffer);
      
      return NextResponse.json({
        url: `/${filename}`,
        provider: 'local',
        success: true
      });
    }
  } catch (error: any) {
    console.error('Error handling upload request:', error);
    return NextResponse.json(
      { error: 'Failed to upload image', details: error.message },
      { status: 500 }
    );
  }
}

