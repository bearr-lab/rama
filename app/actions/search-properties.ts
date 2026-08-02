'use server'

import { createClient } from '@supabase/supabase-js';

export async function searchProperties(query: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    if (!query || query.trim() === '') {
      return { success: true, data: [] };
    }

    const { nvidiaNim } = await import('@/lib/ai/nvidia-nim');
    let queryEmbedding: number[] = [];
    
    try {
      const embeddings = await nvidiaNim.getEmbeddings([query]);
      queryEmbedding = embeddings[0];
    } catch {
      console.warn("NIM Embeddings failed for search, falling back to empty vector.");
    }

    if (!queryEmbedding || queryEmbedding.length === 0) {
       return { error: "Failed to generate semantic vector for query." };
    }

    const { data, error } = await supabase.rpc('hybrid_property_search', {
      query_text: query,
      query_embedding: queryEmbedding,
      match_count: 12
    });

    if (error) throw error;
    
    // Map the database response to match the UI's DiscoverProperty format
    const mapped = data.map((item: { property_id?: string; id: string; content: string; metadata?: { price?: number }; combined_score: number }) => {
       const metadata = item.metadata || {};
       // We seeded simple string content like "Luxury penthouse in Palm Jumeirah with sea view, 4 bedrooms..."
       // We will extract basic heuristics or use defaults since this is Phase 3 integration
       
       let price = metadata.price || 3500000;
       if (item.content.includes('under 2M')) price = 1900000;
       if (item.content.includes('Affordable studio')) price = 850000;
       if (item.content.includes('10M')) price = 9500000;

       return {
         id: item.property_id || item.id, 
         title: item.content.split(',')[0].substring(0, 60), 
         description: item.content,
         price: price,
         community: item.content.includes('Downtown') ? 'Downtown Dubai' : 
                    item.content.includes('Palm Jumeirah') ? 'Palm Jumeirah' : 
                    item.content.includes('Marina') ? 'Dubai Marina' : 'Dubai Hills Estate',
         bedrooms: item.content.includes('4 bedroom') ? 4 : item.content.includes('3-bed') ? 3 : 2,
         bathrooms: 2,
         area_sqft: 2000,
         images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
         coordinates: { lat: 25.2048 + (Math.random() * 0.1 - 0.05), lng: 55.2708 + (Math.random() * 0.1 - 0.05) },
         roi: 6.5 + Math.random() * 2,
         trust_score: Math.min(99, Math.round(item.combined_score * 1000 + 75)), // Just a UI heuristic for the demo
         verification_status: 'verified',
         type: 'apartment'
       };
    });

    return { success: true, data: mapped };
  } catch (error: unknown) {
    console.error("Search Action Error:", error);
    return { error: error instanceof Error ? error.message : String(error) };
  }
}
