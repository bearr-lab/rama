import { createClient } from '@/lib/supabase/client';

/**
 * Real-Time Communication Wrapper
 * Handles Supabase presence and broadcast for collaborative decisions and notifications.
 */

export function subscribeToPropertyUpdates(
  propertyId: string,
  callback: (payload: any) => void,
) {
  const supabase = createClient();

  const channel = supabase
    .channel(`property:${propertyId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'properties',
        filter: `id=eq.${propertyId}`,
      },
      (payload) => {
        console.log('[Realtime] Property updated', payload);
        callback(payload);
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
