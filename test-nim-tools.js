import { createOpenAI } from '@ai-sdk/openai';
import { generateText, tool } from 'ai';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const nvidiaNim = createOpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_NIM_API_KEY || '',
});

async function run() {
  const result = await generateText({
    model: nvidiaNim.chat('meta/llama-3.1-70b-instruct'),
    prompt: 'ROI on Downtown?',
    tools: {
      show_property_cards: tool({
        description: 'Show properties.',
        parameters: z.object({ query: z.string() }),
        execute: async () => ({ ok: true })
      })
    }
  });
  console.dir(result, { depth: null });
}
run().catch(console.error);
