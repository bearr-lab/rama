import { createClient } from '@supabase/supabase-js';
import { nvidiaNim } from '../lib/ai/nvidia-nim';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function runTest() {
  console.log("Testing Cross-Lingual Semantic Search (Arabic Query -> English/Arabic Results)...");
  try {
    const searchQuery = "شقة في وسط المدينة قريبة من برج خليفة"; // "Apartment in downtown near Burj Khalifa"
    
    console.log(`Query: "${searchQuery}"`);
    console.log("Generating embedding...");
    
    const [queryEmbedding] = await nvidiaNim.getEmbeddings([searchQuery]);
    
    console.log("Searching Supabase via match_property_embeddings...");
    const { data, error } = await supabase.rpc('match_property_embeddings', {
      query_embedding: queryEmbedding,
      match_threshold: 0.1, // very low threshold to ensure we see something
      match_count: 5
    });

    if (error) {
      console.error("Supabase RPC Error:", error);
      return;
    }

    console.log(`Found ${data.length} results:`);
    data.forEach((match: { similarity: number; content: string }, index: number) => {
      console.log(`${index + 1}. [Similarity: ${(match.similarity * 100).toFixed(1)}%] ${match.content}`);
    });
    
  } catch (error) {
    console.error("Error:", error);
  }
}

runTest();
