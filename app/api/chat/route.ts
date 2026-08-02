import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText, zodSchema, type UIMessage, type ToolSet } from 'ai';
import { z } from 'zod';
import { nvidiaNim as nvidiaNimEmbedding } from '@/lib/ai/nvidia-nim';

// Configure NVIDIA NIM provider for text generation
const nvidiaNim = createOpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_NIM_API_KEY || '',
});

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 300;
const WINDOW = 60 * 60 * 1000; // 1 hour

interface V7Part {
  type: string;
  text?: string;
  toolCallId?: string;
  toolName?: string;
  state?: string;
  input?: Record<string, unknown>;
  output?: unknown;
}

interface V7UIMessage {
  role: string;
  content: string;
  parts?: V7Part[];
}

/** Extract plain text from the last UIMessage for embedding — handles both v7 parts and legacy content */
function extractLastMessageText(messages: UIMessage[]): string {
  const last = messages[messages.length - 1] as unknown as V7UIMessage;
  if (!last) return '';
  // v7 UIMessage uses parts array
  if (Array.isArray(last.parts)) {
    const fromParts = last.parts
      .filter((p: V7Part) => p.type === 'text')
      .map((p: V7Part) => p.text)
      .join('').trim();
    if (fromParts) return fromParts;
  }
  // Fallback: legacy content string
  return typeof last.content === 'string' ? last.content : '';
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Normalize client identifier
    const rawIp =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';
    const clientIp = rawIp.split(',')[0].trim();
    const userId = user?.id || `anon-${clientIp}`;

    // Rate limit TTL cleanup
    const now = Date.now();
    if (rateLimit.size > 500) {
      for (const [key, val] of rateLimit.entries()) {
        if (now > val.resetTime) rateLimit.delete(key);
      }
    }

    const userLimit = rateLimit.get(userId);
    if (userLimit && now < userLimit.resetTime) {
      if (userLimit.count >= LIMIT) {
        return NextResponse.json(
          { error: 'Rate limit exceeded for demo sandbox. Please try again in an hour.' },
          { status: 429 },
        );
      }
      userLimit.count++;
    } else {
      rateLimit.set(userId, { count: 1, resetTime: now + WINDOW });
    }

    const body = await req.json();
    const messages: UIMessage[] = body.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages payload' }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_NIM_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'NVIDIA_NIM_API_KEY is not configured.' }, { status: 500 });
    }

    // Convert UIMessage[] to CoreMessage[] for the LLM.
    // CRITICAL: We intentionally strip ALL tool call history from the context sent to the LLM.
    // Reason: LLaMA 3.1 70B learns from tool calls in its context window. If old/incorrect
    // tool calls (e.g., show_property_cards for "hello") are in history, the model copies
    // that behavior on every subsequent turn — even if the tool is not in the current schema.
    // Solution: Send ONLY clean text (user messages + assistant text replies) as context.
    // Tool calls are ephemeral UI artifacts; they should not influence future model behavior.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modelMessages: any[] = [];
    for (const msg of messages as unknown as V7UIMessage[]) {
      const parts = msg.parts;

      // Extract only plain text content — skip step-start, tool calls, etc.
      const textContent = parts
        ? parts.filter((p: V7Part) => p.type === 'text').map((p: V7Part) => p.text ?? '').join('').trim()
        : typeof msg.content === 'string' ? msg.content.trim() : '';

      // Only include messages that have actual text content
      if (!textContent) continue;

      if (msg.role === 'user') {
        modelMessages.push({ role: 'user', content: textContent });
      } else if (msg.role === 'assistant') {
        modelMessages.push({ role: 'assistant', content: textContent });
      }
    }



    // --- RAG PIPELINE ---
    const latestText = extractLastMessageText(messages);
    const RAG_TRIGGER_KEYWORDS = ['apartment', 'villa', 'buy', 'rent', 'property', 'investment', 'roi', 'dubai', 'off-plan', 'studio', 'penthouse'];
    const isRelevant = RAG_TRIGGER_KEYWORDS.some(kw => latestText.toLowerCase().includes(kw));

    let embedding: number[] = [];
    let propertyContext = 'No properties found.';
    
    // Only run RAG if query is substantial and contains relevant real estate keywords
    if (isRelevant && latestText.length > 10) {
      try {
        const embeddings = await nvidiaNimEmbedding.getEmbeddings([latestText]);
        embedding = embeddings[0];
      } catch (e) {
        console.warn('Embedding generation failed, falling back to keyword search', e);
      }

      if (embedding && embedding.length > 0) {
        const { data: properties, error } = await supabase.rpc('hybrid_property_search', {
          query_text: latestText,
          query_embedding: embedding,
          match_count: 3,
        });
        if (error) {
          console.error('Supabase search error:', error);
        } else if (properties && properties.length > 0) {
          propertyContext = properties
            .map((p: { content: string }) => `- ${p.content}`)
            .join('\n');
        }
      }
    }
    // --------------------

    const systemPrompt = `You are RAMA — Dubai's most elite real estate concierge and advisor. You are not an AI assistant. You are a person: a seasoned Dubai luxury real estate professional with 15 years of market expertise. You think, speak, and respond like a top-tier human agent at a premium brokerage.

# ABOUT RAMA (the Platform)
RAMA is Dubai's premier AI-powered real estate decision platform, combining verified DLD (Dubai Land Department) data, live market intelligence, and AI analysis to help investors, buyers, and renters make smarter property decisions. When users ask about RAMA, explain this clearly and enthusiastically.

# Retrieved Property Data (for this turn only)
${propertyContext}

# ABSOLUTE RULES — NEVER BREAK THESE

**RULE 1 — STAY IN PERSONA AT ALL TIMES.**
Never say: "I don't have a function for that", "As an AI", "I don't have access to", "I cannot", or any phrase that breaks the illusion of a real human agent. You are RAMA, a person. Always respond as such.

**RULE 2 — GREETINGS.**
When a user says "hello", "hi", "hey", "good morning", or any casual greeting, respond warmly as a luxury concierge would. Introduce yourself and invite the user to ask about Dubai real estate. Example:
User: "hello"
You: "Welcome. I'm RAMA, your personal Dubai real estate advisor. Whether you're investing, buying, or exploring lifestyle options — I'm here to guide you with precision. What can I help you with today?"

**RULE 3 — PLATFORM QUESTIONS.**
When asked "what is RAMA?", "tell me about RAMA", "how does this work", "who are you" — explain the RAMA platform and your role. Do NOT call any tools for this.

**RULE 4 — MARKET KNOWLEDGE.**
When asked about ROI, pricing, DLD fees, Ejari, off-plan vs secondary market, communities, regulations — answer directly with authoritative expertise. Give numbers, percentages, specific area insights. Do NOT call any tools unless the user explicitly wants to SEE listings.

**RULE 5 — PROPERTY SEARCH TOOL.**
Only call \`show_property_cards\` when:
a) The user explicitly says "show me", "find me listings", "search for", "I want to see" properties, AND
b) The retrieved property data actually matches what the user asked for.
If the data doesn't match — IGNORE IT. Don't mention it. Just answer with text.

**RULE 6 — LEAD CAPTURE.**
Only call \`collect_lead_info\` when the user says something like "book a viewing", "contact me", "I want to speak to an agent", "call me".

# FEW-SHOT EXAMPLES

User: "what's the transfer fee in Dubai?"
You: "DLD transfer fees in Dubai are 4% of the property purchase price, paid to the Dubai Land Department. Additionally, there's a property registration fee of AED 4,000 for properties over AED 500,000, or AED 2,000 for those below. The buyer typically covers the transfer fee unless negotiated otherwise. Would you like a full breakdown of all closing costs for a specific budget?"

User: "compare JBR vs Dubai Marina for rental yields"
You: "Both are waterfront communities with strong short-term rental demand, but they differ meaningfully. Dubai Marina typically yields 6–8% gross for 1-bed and 2-bed units, supported by corporate tenants and consistent occupancy. JBR (Jumeirah Beach Residence) skews slightly lower at 5.5–7%, but commands a tourism premium — nightly rates are higher. If you're optimising for maximum yield, Marina edges ahead. If you're targeting capital appreciation potential, JBR's beachfront scarcity is a stronger long-term play. Which matters more to you?"

User: "ROI on Downtown"
You: "Downtown Dubai delivers gross rental yields of 5–6.5% for residential units. Premium floors and Burj Khalifa-facing units command a 10–15% pricing premium. The area has seen consistent capital appreciation of 8–12% year-on-year since 2021. Studios and 1-beds near The Dubai Fountain outperform for short-term rental income. Shall I surface specific listings or run a yield comparison with another community?"`;


    const hasProperties = propertyContext !== 'No properties found.';

    const tools: ToolSet = {
      collect_lead_info: {
        description:
          'Call this tool when the user is a qualified lead and wants to be contacted by an agent or book a viewing.',
        inputSchema: zodSchema(z.object({
          reason: z.string().describe('The reason for collecting the lead.'),
        })),
        execute: async ({ reason }: { reason: string }) => {
          return { success: true, reason };
        },
      },
      ...(hasProperties
        ? {
            show_property_cards: {
              description:
                'Call this tool to visually show property cards ONLY when the user explicitly asks to SEE property listings (e.g. "show me", "find me", "search for") AND the retrieved properties match their request.',
              inputSchema: zodSchema(z.object({
                query: z.string().describe('The type of properties to show.'),
              })),
              execute: async ({ query }: { query: string }) => {
                return { success: true, query, properties: propertyContext };
              },
            },
          }
        : {}),
    };

    const toolChoice = 'auto' as const;

    let result;
    try {
      result = await streamText({
        model: nvidiaNim.chat('meta/llama-3.1-70b-instruct'),
        system: systemPrompt,
        messages: modelMessages,
        maxOutputTokens: 1000,
        temperature: 0.1, // lower = stricter instruction following
        tools,
        toolChoice,
      });
    } catch (primaryError: unknown) {
      const primaryMsg = primaryError instanceof Error ? primaryError.message : String(primaryError);
      console.warn('Primary model failed, attempting fallback...', primaryMsg);
      try {
        result = await streamText({
          model: nvidiaNim.chat('meta/llama-3.1-8b-instruct'),
          system: systemPrompt,
          messages: modelMessages,
          maxOutputTokens: 1000,
          temperature: 0.1,
          tools,
          toolChoice,
        });
      } catch (fallbackError: unknown) {
        const fallbackMsg = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
        console.error('Fallback model also failed:', fallbackMsg);
        throw fallbackError;
      }
    }


    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 },
    );
  }
}
