'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useShortlist(userId?: string) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!userId) {
      setSavedIds([]);
      setIsLoading(false);
      return;
    }

    let ignore = false;

    const fetchShortlist = async () => {
      const { data, error } = await supabase
        .from('shortlists')
        .select('property_id')
        .eq('user_id', userId);

      if (!ignore && !error && data) {
        setSavedIds(data.map((item) => item.property_id));
      }
      if (!ignore) setIsLoading(false);
    };

    fetchShortlist();
    return () => {
      ignore = true;
    };
  }, [userId, supabase]);

  const toggleSave = async (propertyId: string) => {
    if (!userId) return false; // Require login

    const isSaved = savedIds.includes(propertyId);

    // Optimistic UI update
    setSavedIds((prev) =>
      isSaved ? prev.filter((id) => id !== propertyId) : [...prev, propertyId],
    );

    try {
      if (isSaved) {
        const { error } = await supabase
          .from('shortlists')
          .delete()
          .eq('user_id', userId)
          .eq('property_id', propertyId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('shortlists')
          .insert({ user_id: userId, property_id: propertyId });
        if (error) throw error;
      }
      return true;
    } catch (error) {
      // Revert on error
      setSavedIds((prev) =>
        isSaved
          ? [...prev, propertyId]
          : prev.filter((id) => id !== propertyId),
      );
      return false;
    }
  };

  return { savedIds, toggleSave, isLoading };
}
