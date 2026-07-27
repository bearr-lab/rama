import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 30;
const WINDOW = 60 * 60 * 1000; // 1 hour

// Domain-aware simulation engine for local evaluation without API keys
function getSimulatedRealEstateResponse(userQuery: string): string {
  const q = userQuery.toLowerCase();

  if (
    q.includes('roi') ||
    q.includes('yield') ||
    q.includes('return') ||
    q.includes('invest')
  ) {
    return `### Dubai Real Estate Investment & ROI Analysis
Based on live DLD transaction feeds and our Financial Intelligence Engine:

1. **Top Yield Communities (Net Annual ROI)**:
   - **Dubai Marina / JLT**: 6.4% – 7.2% Net ROI (High occupancy, strong short-term holiday rental demand).
   - **Downtown Dubai**: 5.8% – 6.5% Net ROI (Premium capital appreciation, luxury tenant demographic).
   - **Jumeirah Village Circle (JVC)**: 7.5% – 8.4% Net ROI (High yield entry point for 1 & 2 bedroom units).

2. **Cost Breakdown & DLD Fees**:
   - Remember to account for the mandatory **4% DLD Transfer Fee**, **2% Agency Fee**, and approx. **AED 4,200** in administrative & NOC charges when modeling your initial equity outlay.

*Would you like me to open the interactive Mortgage & ROI Calculator in the Property Intelligence Workspace for a specific listing?*`;
  }

  if (
    q.includes('trust') ||
    q.includes('passport') ||
    q.includes('evidence') ||
    q.includes('verify') ||
    q.includes('dld') ||
    q.includes('escrow')
  ) {
    return `### RAMA Trust Passport & Evidence Platform
RAMA replaces subjective agency claims with immutable, cryptographic DLD proof. Every property in our OS features a 4-factor Trust Passport:

- 🛡️ **Health Score (0-100)**: Composite index of title deed clarity, developer escrow health, and structural inspection history.
- 📜 **Evidence Score**: Measures how many supporting legal documents (Form F, Title Deed, Oqood, NOC) have been verified by AI OCR against government registries.
- ⚠️ **Risk Score**: Evaluates potential valuation decay, upcoming service charge hikes, or developer handover delays.
- ⏱️ **Freshness Score**: Applies a time-decay algorithm to pricing comps; data older than 30 days is automatically discounted in confidence.

*You can click on any Trust Badge in the Discover grid or Property Detail page to open the slide-over Evidence Drawer!*`;
  }

  if (
    q.includes('downtown') ||
    q.includes('marina') ||
    q.includes('palm') ||
    q.includes('creek') ||
    q.includes('area') ||
    q.includes('community')
  ) {
    return `### Community Intelligence: Downtown vs Marina vs Palm Jumeirah
Here is a snapshot from our Community Intelligence Engine:

| Community | Walkability Score | Avg Price / SqFt | Primary Demographic | 5-Yr Macro Trend |
| :--- | :--- | :--- | :--- | :--- |
| **Downtown Dubai** | 95 / 100 | AED 2,850 | Executives & Luxury | 📈 +42% Growth |
| **Dubai Marina** | 88 / 100 | AED 2,200 | Expat Professionals | 📈 +35% Growth |
| **Palm Jumeirah** | 72 / 100 | AED 4,600 | UHNW & Beachfront | 🚀 +68% Growth |
| **Dubai Creek Harbour**| 84 / 100 | AED 2,400 | Families & Upgraders | 📈 +48% Growth |

*In our Discover Workspace (/discover), you can use the interactive SVG Map or NLP filter pills to isolate properties in any of these prime zones.*`;
  }

  if (
    q.includes('mortgage') ||
    q.includes('finance') ||
    q.includes('loan') ||
    q.includes('down payment') ||
    q.includes('rate')
  ) {
    return `### Dubai Mortgage & Financing Framework
For expat and non-resident investors in Dubai:

- **Maximum LTV (Loan to Value)**: Up to **80%** for first-time buyers on properties under AED 5M (meaning a **20% minimum down payment**).
- **Current Benchmark Rates**: Fixed mortgage rates currently range between **4.99% and 5.45%** for 3-to-5 year fixed terms.
- **Stress Testing**: In RAMA's Decision Lab, our AI automatically runs sensitivity models against a +1.5% interest rate hike to ensure cashflow solvency before you submit an offer.

*Let's head over to the Property Workspace to configure your exact down payment and loan tenure on the live ROI Calculator.*`;
  }

  return `### RAMA AI Concierge (V2 Operating System)
Hello! I am your real estate decision co-pilot, integrated directly into the RAMA V2 architecture. How can I assist your investment journey today? You can ask me about:

1. **Market Yields & Comps**: *"What is the average net ROI for a 2-bed villa in Palm Jumeirah?"*
2. **Legal & DLD Verification**: *"How does the Trust Passport verify escrow title deeds?"*
3. **Neighborhood Walkability**: *"Compare lifestyle scores between Downtown and Dubai Creek Harbour."*
4. **Transaction Workflow**: *"What are the mandatory steps between submitting an offer and DLD transfer?"*`;
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Normalize client identifier (first IP in x-forwarded-for or fallback)
    const rawIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const clientIp = rawIp.split(',')[0].trim();
    const userId = user?.id || `anon-${clientIp}`;

    // Rate limit TTL cleanup to prevent unbounded Map memory growth
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
          {
            error:
              'Rate limit exceeded for demo sandbox. Please try again in an hour.',
          },
          { status: 429 },
        );
      }
      userLimit.count++;
    } else {
      rateLimit.set(userId, { count: 1, resetTime: now + WINDOW });
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages payload' },
        { status: 400 },
      );
    }

    const ALLOWED_ROLES = new Set(['user', 'assistant']);
    const isValid =
      messages.length <= 50 &&
      messages.every(
        (m) =>
          m &&
          ALLOWED_ROLES.has(m.role) &&
          typeof m.content === 'string' &&
          m.content.length <= 4000,
      );
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid message formatting' },
        { status: 400 },
      );
    }

    const lastUserMessage =
      [...messages].reverse().find((m) => m.role === 'user')?.content || '';
    const apiKey = process.env.OPENROUTER_API_KEY;

    // If no API key is provided or if key is explicitly marked for local simulation, return simulation response
    if (
      !apiKey ||
      apiKey === 'dummy-key-for-local-testing' ||
      apiKey === 'your-openrouter-key'
    ) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return NextResponse.json({
        content: getSimulatedRealEstateResponse(lastUserMessage),
        model_used: 'rama-v2-local-simulation-engine',
      });
    }

    // Prepare messages for OpenRouter inference
    const systemPrompt = `You are RAMA, an expert AI real estate advisor for Dubai. 
    You provide accurate, helpful, and concise answers about Dubai properties, communities, and real estate laws.
    Always be professional and use the Nordic Lagom tone - clear, warm, and sophisticated.`;

    const openRouterMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // CTO 3-Tier Free Model Resilience Hierarchy
    // 1st Choice: Primary Free Model (e.g. Gemini 2.0 Pro Experimental Free or Llama 3.3 70B Free)
    // 2nd Choice: Backup Free Model (e.g. Llama 3.3 70B Free or DeepSeek R1 Free)
    // 3rd Choice: Tertiary Free Model (e.g. Mistral 7B Instruct Free)
    const PRIMARY_MODEL =
      process.env.OPENROUTER_PRIMARY_MODEL ||
      'google/gemini-2.0-pro-exp-02-05:free';
    const BACKUP_MODEL =
      process.env.OPENROUTER_BACKUP_MODEL ||
      'meta-llama/llama-3.3-70b-instruct:free';
    const TERTIARY_MODEL =
      process.env.OPENROUTER_TERTIARY_MODEL ||
      'mistralai/mistral-7b-instruct:free';

    const modelsToTry = [PRIMARY_MODEL, BACKUP_MODEL, TERTIARY_MODEL];

    for (const modelName of modelsToTry) {
      try {
        const response = await fetch(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://rama.ae',
              'X-Title': 'RAMA Real Estate OS',
            },
            body: JSON.stringify({
              model: modelName,
              messages: openRouterMessages,
            }),
            signal: AbortSignal.timeout(20_000),
          },
        );

        if (response.ok) {
          const data = await response.json();
          if (data?.choices?.[0]?.message?.content) {
            return NextResponse.json({
              content: data.choices[0].message.content,
              model_used: modelName,
            });
          }
        } else {
          console.warn(
            `[RAMA AI] OpenRouter model ${modelName} failed with status ${response.status}. Attempting backup free model...`,
          );
        }
      } catch (err) {
        console.warn(
          `[RAMA AI] Error connecting to OpenRouter model ${modelName}:`,
          err,
        );
      }
    }

    // If all OpenRouter free models fail or rate limit, fall back gracefully to our local simulation engine
    console.warn(
      `[RAMA AI] All live OpenRouter free models failed or rate-limited. Falling back to RAMA Domain Simulation Engine.`,
    );
    return NextResponse.json({
      content: getSimulatedRealEstateResponse(lastUserMessage),
      model_used: 'rama-v2-local-simulation-engine (fallback)',
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
