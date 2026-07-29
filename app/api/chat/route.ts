import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 30; // Max execution time for serverless

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const openrouter = createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY || 'sk-or-v1-dummy1234567890',
      fetch: async (url, options) => {
        const headers = new Headers(options?.headers);
        headers.set('Authorization', `Bearer ${process.env.OPENROUTER_API_KEY || 'sk-or-v1-dummy1234567890'}`);
        headers.set('HTTP-Referer', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
        headers.set('X-Title', 'RAMA Dubai Real Estate Platform');
        return fetch(url, { ...options, headers });
      }
    });

    let result;
    const systemPrompt = `You are RAMA, a senior Dubai real estate advisor. You provide insights on property investments, neighborhoods, RERA regulations, and market trends.
Your primary goal is to qualify leads and provide excellent service. During conversation, naturally identify if they are a Buyer, Seller, or Renter. Understand their budget, timeline, and preferred locations.
When a user expresses serious interest, wants to book a viewing, or is ready to speak to a human agent, immediately call the \`collect_lead_info\` tool to present them with a contact form. Do NOT ask for their phone number in plain text. Keep your answers concise, accurate, and professional.`;

    const tools = {
      collect_lead_info: tool({
        description: 'Call this tool when the user is a qualified lead and wants to be contacted by an agent, book a viewing, or get more details. This will render a contact form in their chat window.',
        parameters: z.object({
          reason: z.string().describe('The reason for collecting the lead (e.g., "Booking a viewing for Dubai Marina").'),
        }),
      })
    };

    try {
      result = await streamText({
        model: openrouter(process.env.OPENROUTER_PRIMARY_MODEL || 'meta-llama/llama-3.3-70b-instruct:free'),
        messages,
        system: systemPrompt,
        tools,
      });
    } catch (primaryError) {
      console.warn('Primary model failed, attempting fallback...', primaryError);
      try {
        result = await streamText({
          model: openrouter(process.env.OPENROUTER_BACKUP_MODEL || 'mistralai/mistral-7b-instruct:free'),
          messages,
          system: systemPrompt,
          tools,
        });
      } catch (fallbackError) {
        console.error('Fallback model also failed:', fallbackError);
        throw fallbackError; // Caught by outer catch
      }
    }

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: error.message || String(error) }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
