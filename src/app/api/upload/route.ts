import { NextRequest, NextResponse } from 'next/server';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// Initialize Firebase Admin if it hasn't been initialized yet
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace \\n with actual newline characters
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
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

    // Upload to Firebase Storage
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
  } catch (error: any) {
    console.error('Error uploading to Firebase Storage:', error);
    return NextResponse.json(
      { error: 'Failed to upload image to Firebase', details: error.message },
      { status: 500 }
    );
  }
}
