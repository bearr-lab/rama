import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const LeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  intent: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn(
        'Supabase URL or Key is missing from environment variables.',
      );
      return NextResponse.json(
        { error: 'Database service unavailable' },
        { status: 503 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await req.json();
    const validatedData = LeadSchema.parse(body);

    const nameParts = validatedData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName =
      nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'N/A';

    const { error } = await supabase.from('leads').insert([
      {
        first_name: firstName,
        last_name: lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        ai_notes: validatedData.intent || 'General Inquiry',
        source: 'ai_concierge',
      },
    ]);

    if (error) {
      // 23505 = unique_violation: email already exists — treat as success (idempotent re-submission)
      if (error.code === '23505') {
        return NextResponse.json({ success: true });
      }
      console.error('Supabase Insert Error:', error.code, error.message, error.details);
      return NextResponse.json(
        { error: 'Failed to save lead', detail: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 },
      );
    }
    console.error('Leads API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
