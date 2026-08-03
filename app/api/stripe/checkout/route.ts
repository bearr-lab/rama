import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-07-29.dahlia',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);

export async function POST(req: Request) {
  try {
    const { agentId, priceId } = await req.json();

    if (!agentId || !priceId) {
      return NextResponse.json({ error: 'Missing agentId or priceId' }, { status: 400 });
    }

    const { data: customerData } = await supabase
      .from('stripe_customers')
      .select('stripe_customer_id')
      .eq('agent_id', agentId)
      .single();

    let customerId = customerData?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: { agentId },
      });
      customerId = customer.id;

      await supabase.from('stripe_customers').insert({
        agent_id: agentId,
        stripe_customer_id: customerId,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/agent/leads?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/agent/leads?canceled=true`,
      metadata: {
        agentId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
