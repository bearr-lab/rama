'use client';

import React, { useState } from 'react';
import { Sparkles, TrendingUp, Flame, Snowflake, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { scoreLead } from '@/app/actions/lead-scoring';

const MOCK_LEADS = [
  {
    id: '1',
    name: 'Ahmed K.',
    property: 'Downtown Penthouse',
    price: '15,000,000 AED',
    transcript: "User: I need to move in next week. Do you accept crypto?\nAI: Yes, some sellers accept crypto. Are you pre-approved?\nUser: Yes, I have the funds ready.",
    scored: false
  },
  {
    id: '2',
    name: 'Sarah M.',
    property: 'Marina 2BR',
    price: '2,500,000 AED',
    transcript: "User: Just browsing for next year. What's the ROI like?\nAI: Around 6-7%. Are you buying for investment?\nUser: Maybe, not sure yet.",
    scored: false
  }
];

export default function LeadsDashboard() {
  const [hasPremium, setHasPremium] = useState(false);
  const [leads, setLeads] = useState<(typeof MOCK_LEADS[0] & { analysis?: { score: string; summary: string; estimated_timeline: string; budget_match: boolean; } })[]>(MOCK_LEADS);
  const [isScoring, setIsScoring] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Check URL for success param from Stripe
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('success')) {
        setHasPremium(true);
      }
    }
  }, []);

  const handleUpgrade = async () => {
    setIsRedirecting(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: 'mock-agent-1234', // In real app: user.id
          priceId: 'price_test_premium'
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Fallback for demo when keys aren't set
        console.warn("Stripe keys missing, simulating success");
        window.location.href = '/agent/leads?success=true';
      }
    } catch (e) {
      console.error(e);
      window.location.href = '/agent/leads?success=true';
    }
  };

  const handleScoreLead = async (leadId: string, transcript: string, property: string) => {
    setIsScoring(leadId);
    const res = await scoreLead(transcript, { property });
    
    if (res.success) {
      setLeads(prev => prev.map(l => 
        l.id === leadId ? { ...l, scored: true, analysis: res.data } : l
      ));
    }
    setIsScoring(null);
  };

  if (!hasPremium) {
    return (
      <div className="container mx-auto max-w-4xl space-y-8 px-4 py-24 text-center">
        <Sparkles className="mx-auto size-16 animate-pulse text-primary" />
        <h1 className="font-display text-4xl font-bold">Unlock AI Lead Intelligence</h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Stop guessing which buyers are serious. Subscribe to Premium to have our NVIDIA-powered AI instantly read chat transcripts and score leads as Hot, Warm, or Cold.
        </p>
        
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 text-left md:grid-cols-2">
          <Card className="rounded-none border-border">
             <CardContent className="space-y-6 p-8">
                <h3 className="font-display text-2xl font-bold">Basic</h3>
                <p className="text-3xl font-bold">Free</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle className="size-4" /> Standard Listings</li>
                  <li className="flex items-center gap-2"><CheckCircle className="size-4" /> Basic Lead Form</li>
                </ul>
                <Button variant="outline" className="h-12 w-full rounded-none font-semibold tracking-widest uppercase" disabled>Current Plan</Button>
             </CardContent>
          </Card>
          <Card className="relative rounded-none border-primary/50 bg-primary/5">
             <div className="absolute top-0 right-0 bg-primary px-3 py-1 text-xs font-bold tracking-wider text-primary-foreground uppercase">Most Popular</div>
             <CardContent className="space-y-6 p-8">
                <h3 className="font-display text-2xl font-bold">Premium AI</h3>
                <p className="text-3xl font-bold">AED 499<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2 font-medium"><Sparkles className="size-4 text-primary" /> Instant AI Lead Scoring</li>
                  <li className="flex items-center gap-2 font-medium"><Sparkles className="size-4 text-primary" /> Auto-Verification (OCR)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="size-4" /> Priority Search Placement</li>
                </ul>
                <Button 
                  onClick={handleUpgrade} 
                  disabled={isRedirecting}
                  className="h-12 w-full rounded-none font-semibold tracking-widest uppercase"
                >
                  {isRedirecting ? 'Redirecting...' : 'Upgrade to Premium'}
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6">
      <div className="mb-12 flex items-end justify-between border-b border-border pb-6">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Lead Intelligence Hub</h1>
          <p className="mt-2 text-muted-foreground">AI-scored buyer intent and chat analysis.</p>
        </div>
        <div className="flex items-center gap-2 border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
          <Sparkles className="size-4" /> Premium Active
        </div>
      </div>

      <div className="grid gap-6">
        {leads.map(lead => (
          <div key={lead.id} className="border border-border bg-surface p-6 transition-colors hover:border-primary/50">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl font-bold">{lead.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Inquiring about: {lead.property} ({lead.price})</p>
              </div>
              {!lead.scored ? (
                <Button 
                  onClick={() => handleScoreLead(lead.id, lead.transcript, lead.property)}
                  disabled={isScoring === lead.id}
                  className="h-10 rounded-none font-semibold tracking-widest uppercase"
                >
                  {isScoring === lead.id ? 'Analyzing...' : 'Run AI Analysis'}
                </Button>
              ) : (
                <div className={`flex items-center gap-2 border px-4 py-2 text-sm font-bold tracking-wider uppercase
                  ${lead.analysis?.score === 'HOT' ? 'border-red-500/20 bg-red-500/10 text-red-500' : 
                    lead.analysis?.score === 'WARM' ? 'border-orange-500/20 bg-orange-500/10 text-orange-500' : 
                    'border-blue-500/20 bg-blue-500/10 text-blue-500'}`}>
                  {lead.analysis?.score === 'HOT' ? <Flame className="size-4" /> : 
                   lead.analysis?.score === 'WARM' ? <TrendingUp className="size-4" /> : 
                   <Snowflake className="size-4" />}
                  {lead.analysis?.score} LEAD
                </div>
              )}
            </div>

            {lead.scored && lead.analysis && (
              <div className="mt-6 grid grid-cols-1 gap-6 border-t border-border pt-6 md:grid-cols-3">
                <div className="col-span-2">
                  <h4 className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">AI Summary</h4>
                  <p className="text-sm leading-relaxed">{lead.analysis.summary}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Timeline</h4>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Clock className="size-4 text-primary" /> {lead.analysis.estimated_timeline}
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">Budget Match</h4>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle className={`size-4 ${lead.analysis.budget_match ? 'text-green-500' : 'text-muted-foreground'}`} /> 
                      {lead.analysis.budget_match ? 'Confirmed Match' : 'Uncertain'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
