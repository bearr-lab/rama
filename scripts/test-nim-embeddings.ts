import { nvidiaNim } from '../lib/ai/nvidia-nim';

const testQueries = [
  "3-bed apartment under 2M AED near Burj Khalifa with pool",
  "Spacious villa in Dubai Hills Estate with private garden",
  "Luxury penthouse in Palm Jumeirah with sea view",
  "Affordable studio in Jumeirah Village Circle",
  "شقة 3 غرف نوم بسعر أقل من 2 مليون درهم بالقرب من برج خليفة مع مسبح",
  "فيلا واسعة في دبي هيلز استيت مع حديقة خاصة",
  "بنتهاوس فاخر في نخلة جميرا مع إطلالة على البحر",
  "استوديو بأسعار معقولة في قرية جميرا الدائرية",
  "Commercial office space in Business Bay",
  "Off-plan townhouses in Arabian Ranches 3",
  // We will expand this list to 50+ queries for comprehensive testing
];

async function runTest() {
  console.log("Testing NVIDIA NIM nv-embed-v1 API integration...");
  
  try {
    const start = Date.now();
    const embeddings = await nvidiaNim.getEmbeddings(testQueries);
    const duration = Date.now() - start;
    
    console.log(`Successfully generated ${embeddings.length} embeddings in ${duration}ms.`);
    
    embeddings.forEach((emb, i) => {
      console.log(`Query: "${testQueries[i]}"`);
      console.log(`Embedding dimension: ${emb.length}`);
      console.log(`First 5 values: [${emb.slice(0, 5).map(n => n.toFixed(4)).join(', ')}, ...]`);
      console.log('---');
    });
    
  } catch (error) {
    console.error("Test failed:", error);
  }
}

runTest();
