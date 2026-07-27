import { NextResponse } from 'next/server';
import { triggerUnsplashDownload } from '@/lib/unsplash';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const { downloadLocation } = await request.json();

    if (!downloadLocation || typeof downloadLocation !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid downloadLocation parameter' },
        { status: 400 },
      );
    }

    const success = await triggerUnsplashDownload(downloadLocation);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to notify Unsplash download endpoint' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('API /api/unsplash/download error', { error });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
