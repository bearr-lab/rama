const { createOpenAI } = require('@ai-sdk/openai');
const { generateText, tool } = require('ai');
const { z } = require('zod');

const nvidiaNim = createOpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_NIM_API_KEY || '',
});

async function run() {
  require('dotenv').config({ path: '.env.local' });
  const result = await generateText({
    model: nvidiaNim.chat('meta/llama-3.1-70b-instruct'),
    prompt: 'ROI on Downtown?',
    tools: {
      show_property_cards: tool({
        description: 'Show properties.',
        parameters: z.object({ query: z.string() }),
        execute: async (args) => ({ ok: true })
      })
    }
  });
  console.dir(result, { depth: null });
}
run().catch(console.error);
