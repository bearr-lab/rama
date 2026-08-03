import { createClient } from '@supabase/supabase-js';
import { nvidiaNim } from '../lib/ai/nvidia-nim';

// Retrieve keys from environment
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; // Usually we'd use service_role key for bypassing RLS, assuming anon works for now

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const mockProperties = [
  { content: "Luxury penthouse in Palm Jumeirah with sea view, 4 bedrooms, private pool." },
  { content: "بنتهاوس فاخر في نخلة جميرا مع إطلالة على البحر، 4 غرف نوم، مسبح خاص." },
  { content: "Spacious villa in Dubai Hills Estate with private garden, 5 bedrooms, modern finish." },
  { content: "فيلا واسعة في دبي هيلز استيت مع حديقة خاصة، 5 غرف نوم، تشطيب حديث." },
  { content: "Affordable studio in Jumeirah Village Circle (JVC), close to park and mall." },
  { content: "استوديو بأسعار معقولة في قرية جميرا الدائرية (JVC)، بالقرب من الحديقة والمول." },
  { content: "3-bed apartment under 2M AED near Burj Khalifa with pool and gym access." },
  { content: "شقة 3 غرف نوم بسعر أقل من 2 مليون درهم بالقرب من برج خليفة مع إمكانية الوصول إلى المسبح والصالة الرياضية." },
  { content: "Commercial office space in Business Bay, fully fitted, high floor." },
  { content: "مساحة مكتبية تجارية في الخليج التجاري، مجهزة بالكامل، طابق مرتفع." },
  // Expanding to generate more quickly via a loop for testing...
];

for (let i = 0; i < 45; i++) {
  mockProperties.push({ content: `Modern apartment ${i} in Downtown Dubai with stunning city views.` });
  mockProperties.push({ content: `شقة حديثة ${i} في وسط مدينة دبي مع إطلالات خلابة على المدينة.` });
}

async function runSeedAndTest() {
  console.log("Seeding Database and Testing Vector Search...");
  try {
    const texts = mockProperties.map(p => p.content);
    console.log(`Generating embeddings for ${texts.length} properties...`);
    const embeddings = await nvidiaNim.getEmbeddings(texts);
    
    console.log(`Generated ${embeddings.length} embeddings. Inserting into Supabase...`);
    
    const records = mockProperties.map((p, i) => ({
      content: p.content,
      embedding: embeddings[i],
      metadata: { source: 'seed' }
    }));
    
    // We insert in batches or all at once since it's 100 rows
    const { error } = await supabase.from('property_embeddings').insert(records);
    if (error) {
      console.error("Supabase Insert Error:", error);
      return;
    }
    console.log("Insert successful.");
    
    console.log("Testing Cross-Lingual Semantic Search...");
    // Query in Arabic for "apartment in downtown" -> should match English and Arabic downtown apartments
    const searchQuery = "شقة في وسط المدينة قريبة من برج خليفة";
    const [queryEmbedding] = await nvidiaNim.getEmbeddings([searchQuery]);
    console.log(`Generated query embedding of length ${queryEmbedding.length}`);
    
    // Call the RPC to test exact cosine similarity
    console.log("Testing similarity query via RPC...");
    const { data: matchData, error: matchError } = await supabase.rpc('match_property_embeddings', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 5
    });

    if (matchError) {
      console.error("RPC Match Error:", matchError);
      return;
    }
    
    console.log("Semantic Search Results:");
    matchData?.forEach((match: { similarity: number; content: string }, idx: number) => {
      console.log(`${idx + 1}. [Score: ${match.similarity.toFixed(4)}] ${match.content}`);
    });
    
    console.log("Seed and Test Complete!");
    
  } catch (error) {
    console.error("Error:", error);
  }
}

runSeedAndTest();
