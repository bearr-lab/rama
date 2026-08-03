import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('--- DEBUG CLIENT MESSAGES ---');
  const msgs = body.messages ?? [];
  for (const msg of msgs) {
    console.log(`[${msg.role}] id=${msg.id}`);
    if (msg.parts) {
      console.log('  parts:', JSON.stringify(msg.parts, null, 2));
    } else {
      console.log('  content:', msg.content);
    }
  }
  console.log('---------------------------');
  return NextResponse.json({ ok: true });
}
