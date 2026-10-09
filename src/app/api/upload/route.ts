import { NextRequest, NextResponse } from 'next/server';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// Initialize Firebase Admin if it hasn't been initialized yet
if (!getApps().length && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace \\n with actual newline characters
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const uniqueId = crypto.randomUUID();
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `uploads/${uniqueId}.${extension}`;

    try {
      // Attempt Upload to Firebase Storage
      const bucket = getStorage().bucket();
      const fileRef = bucket.file(filename);
      
      await fileRef.save(buffer, {
        metadata: {
          contentType: file.type,
        },
      });

      // Make the file publicly accessible
      await fileRef.makePublic();

      // Get the public URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

      return NextResponse.json({
        url: publicUrl,
        provider: 'firebase',
        success: true
      });
    } catch (firebaseError: any) {
      console.warn('Firebase upload failed, falling back to local storage:', firebaseError.message);
      
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
