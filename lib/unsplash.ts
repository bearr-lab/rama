import { logger } from '@/lib/logger';

export interface UnsplashPhotoMetadata {
  id: string;
  url: string;
  photographerName: string;
  photographerUsername: string;
  photographerUrl?: string;
  downloadLocation?: string;
}

const UNSPLASH_ACCESS_KEY =
  process.env.UNSPLASH_ACCESS_KEY ||
  process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ||
  'QEdEgXKJT84ymi1h97vSIqMhOSEtp3N3DlxkZnnUexA';

/**
 * Triggers Unsplash download endpoint as required by production API guidelines.
 * Must be called whenever an image is downloaded or selected for permanent display.
 */
export async function triggerUnsplashDownload(
  downloadLocation: string,
): Promise<boolean> {
  if (!downloadLocation) return false;
  try {
    const response = await fetch(downloadLocation, {
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });
    if (!response.ok) {
      logger.warn('Failed to trigger Unsplash download endpoint', {
        status: response.status,
      });
      return false;
    }
    return true;
  } catch (error) {
    logger.error('Error triggering Unsplash download endpoint', { error });
    return false;
  }
}

/**
 * Formats Unsplash photographer attribution conforming strictly to Unsplash API rules:
 * "Photo by [Photographer Name] on [Unsplash]" with appropriate UTM referral links.
 */
export function getUnsplashAttribution(
  photographerName: string,
  photographerUsername: string,
) {
  const utmParams = '?utm_source=rama&utm_medium=referral';
  return {
    text: `Photo by ${photographerName} on Unsplash`,
    photographerUrl: `https://unsplash.com/@${photographerUsername}${utmParams}`,
    unsplashUrl: `https://unsplash.com/${utmParams}`,
  };
}
