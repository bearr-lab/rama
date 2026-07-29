export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PexelsSearchResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
  prev_page?: string;
}

export interface PexelsVideoFile {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: PexelsVideoFile[];
}

export interface PexelsVideoSearchResponse {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  videos: PexelsVideo[];
  next_page?: string;
  prev_page?: string;
}

const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';
const PEXELS_API_URL = 'https://api.pexels.com/v1';

/**
 * Searches for photos on Pexels using the provided query.
 * @param query Search term (e.g. "luxury real estate")
 * @param perPage Number of results per page (default 15, max 80)
 * @param orientation 'landscape', 'portrait', or 'square'
 */
export async function searchPhotos(
  query: string,
  perPage = 15,
  orientation: 'landscape' | 'portrait' | 'square' = 'landscape'
): Promise<PexelsSearchResponse | null> {
  if (!PEXELS_API_KEY) {
    console.warn('PEXELS_API_KEY is not defined in the environment variables.');
    return null;
  }

  try {
    const params = new URLSearchParams({
      query,
      per_page: perPage.toString(),
      orientation,
    });

    // Revalidate once an hour to cache the results and avoid rate limits.
    const res = await fetch(`${PEXELS_API_URL}/search?${params.toString()}`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`Pexels API error: ${res.status} ${res.statusText}`);
      return null;
    }

    return (await res.json()) as PexelsSearchResponse;
  } catch (error) {
    console.error('Error fetching from Pexels:', error);
    return null;
  }
}

/**
 * Searches for videos on Pexels using the provided query.
 */
export async function searchVideos(
  query: string,
  perPage = 15,
  orientation: 'landscape' | 'portrait' | 'square' = 'landscape',
  size: 'large' | 'medium' | 'small' = 'large'
): Promise<PexelsVideoSearchResponse | null> {
  if (!PEXELS_API_KEY) return null;

  try {
    const params = new URLSearchParams({
      query,
      per_page: perPage.toString(),
      orientation,
      size,
    });

    const res = await fetch(`${PEXELS_API_URL}/videos/search?${params.toString()}`, {
      headers: { Authorization: PEXELS_API_KEY },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return (await res.json()) as PexelsVideoSearchResponse;
  } catch (error) {
    console.error('Error fetching videos from Pexels:', error);
    return null;
  }
}

/**
 * Utility to get a random cinematic hero image from a specific search query.
 */
export async function getHeroImage(query: string, fallbackUrl: string): Promise<string> {
  const data = await searchPhotos(query, 5, 'landscape');
  if (data && data.photos && data.photos.length > 0) {
    // Randomize slightly but it only changes every hour due to cache
    const randomIndex = Math.floor(Math.random() * data.photos.length);
    return data.photos[randomIndex].src.original; // Use highest res for hero
  }
  return fallbackUrl;
}

/**
 * Utility to get a random cinematic hero video (HD/4K) from a search query.
 */
export async function getHeroVideo(query: string): Promise<string | null> {
  const data = await searchVideos(query, 3, 'landscape', 'large');
  if (data && data.videos && data.videos.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.videos.length);
    const video = data.videos[randomIndex];
    // Find the highest quality mp4 link
    const hdFiles = video.video_files.filter((f) => f.quality === 'hd' && f.file_type === 'video/mp4');
    if (hdFiles.length > 0) {
      // Sort by width descending to get the best HD/4K option
      hdFiles.sort((a, b) => b.width - a.width);
      return hdFiles[0].link;
    }
    // Fallback to any mp4
    const anyMp4 = video.video_files.find((f) => f.file_type === 'video/mp4');
    if (anyMp4) return anyMp4.link;
  }
  return null;
}
