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
  '';

/**
 * Triggers Unsplash download endpoint as required by production API guidelines.
 * Must be called whenever an image is downloaded or selected for permanent display.
 * Protected against SSRF by validating hostname and path schemes.
 */
export async function triggerUnsplashDownload(
  downloadLocation: string,
): Promise<boolean> {
  if (!downloadLocation || !UNSPLASH_ACCESS_KEY) return false;
  try {
    const url = new URL(downloadLocation);
    // Strict allowlist: only allow https to api.unsplash.com or images.unsplash.com
    if (
      url.protocol !== 'https:' ||
      (url.hostname !== 'unsplash.com' && !url.hostname.endsWith('.unsplash.com'))
    ) {
      logger.warn('SSRF protection blocked untrusted Unsplash download URL', {
        hostname: url.hostname,
      });
      return false;
    }
    // For images.unsplash.com CDN URLs, only perform a lightweight HEAD check without auth headers
    if (url.hostname === 'images.unsplash.com') {
      const headRes = await fetch(url.toString(), { method: 'HEAD' });
      return headRes.ok;
    }
    // For official api.unsplash.com download tracking endpoints, verify path and attach Client-ID
    if (url.hostname === 'api.unsplash.com') {
      if (!/^\/photos\/[^/]+\/download$/.test(url.pathname)) {
        logger.warn('Invalid Unsplash API path for download tracking', { pathname: url.pathname });
        return false;
      }
      const response = await fetch(url.toString(), {
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
    }
    return false;
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
