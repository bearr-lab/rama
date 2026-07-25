import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Simple in-memory rate limiting (Note: in production Vercel/serverless, this will reset per instance)
// A better approach is Redis/Upstash
const rateLimit = new Map<string, { count: number; resetTime: number }>()
const LIMIT = 20
const WINDOW = 60 * 60 * 1000 // 1 hour

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate Limiting
    const now = Date.now()
    const userLimit = rateLimit.get(user.id)

    if (userLimit && now < userLimit.resetTime) {
      if (userLimit.count >= LIMIT) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
      }
      userLimit.count++
    } else {
      rateLimit.set(user.id, { count: 1, resetTime: now + WINDOW })
    }

    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const ALLOWED_ROLES = new Set(["user", "assistant"])
    const isValid = messages.length <= 50 && messages.every(m =>
      m && ALLOWED_ROLES.has(m.role) && typeof m.content === "string" && m.content.length <= 4000
    )
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    // Prepare messages for Claude 3.5 Sonnet via OpenRouter
    const systemPrompt = `You are RAMA, an expert AI real estate advisor for Dubai. 
    You provide accurate, helpful, and concise answers about Dubai properties, communities, and real estate laws.
    Always be professional and use the Nordic Lagom tone - clear, warm, and sophisticated.`

    const openRouterMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    ]

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      // Fallback for local dev without key
      return NextResponse.json({ 
        content: "I'm RAMA. I'm currently running in local development mode without an API key, but I'm ready to help you find your dream home in Dubai once configured." 
      })
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://rama.ae", // Optional, for OpenRouter rankings
        "X-Title": "RAMA Real Estate", // Optional
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: openRouterMessages,
      }),
      signal: AbortSignal.timeout(30_000),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    return NextResponse.json({
      content: data.choices[0].message.content
    })

  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
