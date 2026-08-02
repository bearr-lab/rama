import { createClient } from '@supabase/supabase-js';
import { nvidiaNim } from '../lib/ai/nvidia-nim';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function runTest() {
  console.log("Testing Hybrid Search (Vector + FTS)...");
  try {
    const searchQuery = "luxury penthouse palm jumeirah";
    
    console.log(`Query: "${searchQuery}"`);
    const [queryEmbedding] = await nvidiaNim.getEmbeddings([searchQuery]);
    
    const { data, error } = await supabase.rpc('hybrid_property_search', {
      query_text: searchQuery,
      query_embedding: queryEmbedding,
      match_count: 5
    });

    if (error) {
      console.error("Supabase RPC Error:", error);
      return;
    }

    console.log(`Found ${data?.length || 0} results:`);
    data?.forEach((match: { combined_score: number; content: string }, index: number) => {
      console.log(`${index + 1}. [Score: ${match.combined_score.toFixed(4)}] ${match.content}`);
    });
    
  } catch (error) {
    console.error("Error:", error);
  }
}

runTest();
