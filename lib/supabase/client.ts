import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pginambzeqzqdrkmvdaz.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnaW5hbWJ6ZXF6cWRya212ZGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MTYxODAsImV4cCI6MjEwMDQ5MjE4MH0.cN5tWM4z37SUWQZTauP8Re9E44YC36rUacBoNXbwIec';

  return createBrowserClient(url, key);
}
