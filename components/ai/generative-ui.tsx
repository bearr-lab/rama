'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Mail, Phone, User, Home } from 'lucide-react';

type ToolInvocationResult = {
  success: boolean;
  reason?: string;
  query?: string;
  properties?: string;
};

interface LeadToolInvocation {
  toolCallId: string;
  toolName: string;
  args: { reason: string };
  result?: ToolInvocationResult;
}

interface PropertyToolInvocation {
  toolCallId: string;
  toolName: string;
  args: { query: string; properties?: string };
  result?: ToolInvocationResult;
}

export function LeadContactForm({
  toolInvocation,
}: {
  toolInvocation: LeadToolInvocation;
}) {
  const [submitted, setSubmitted] = useState(false);
  const { reason } = toolInvocation.args;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a production app, this would POST to /api/leads
  };

  if (submitted) {
    return (
      <div className="mt-4 flex flex-col items-center justify-center rounded-none border border-border bg-muted/20 p-8">
        <div className="mb-4 flex size-12 items-center justify-center rounded-none bg-green-500/10 text-green-600">
          <Check className="size-6" />
        </div>
        <h4 className="text-lg font-semibold tracking-tight text-ink">
          Request Submitted
        </h4>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          An agent will contact you shortly regarding: <br />
          <span className="font-medium text-fjord">{reason}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col overflow-hidden rounded-none border border-border bg-canvas shadow-sm">
      <div className="border-b border-border bg-muted/50 p-4">
        <h4 className="font-semibold tracking-tight text-ink">
          Connect with an Agent
        </h4>
        <p className="text-sm text-muted-foreground">{reason}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <div className="relative">
          <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            required
            placeholder="Full Name"
            className="rounded-none bg-transparent pl-10"
          />
        </div>
        <div className="relative">
          <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            required
            type="email"
            placeholder="Email Address"
            className="rounded-none bg-transparent pl-10"
          />
        </div>
        <div className="relative">
          <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            required
            type="tel"
            placeholder="Phone Number"
            className="rounded-none bg-transparent pl-10"
          />
        </div>
        <Button
          type="submit"
          className="mt-2 rounded-none bg-fjord text-white hover:bg-fjord-hover"
        >
          Request Callback
        </Button>
      </form>
    </div>
  );
}

export function PropertyCardList({
  toolInvocation,
}: {
  toolInvocation: PropertyToolInvocation;
}) {
  const locale = useLocale() || 'en';
  const { query } = toolInvocation.args;
  const result = toolInvocation.result;
  const rawContext =
    result?.properties ??
    toolInvocation.args.properties ??
    'No properties retrieved.';

  const propertyLines = rawContext
    .split('\n')
    .filter((l: string) => l.trim().startsWith('-'));

  if (!result) {
    return (
      <div className="mt-4 flex animate-pulse flex-col gap-4">
        <div className="h-32 w-full rounded-none border border-border bg-muted/50" />
      </div>
    );
  }

  if (propertyLines.length === 0) {
    return (
      <div className="mt-4 border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
        No specific properties found for: {query}
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      <p className="text-sm font-medium text-muted-foreground">
        Found {propertyLines.length} matching properties:
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {propertyLines.map((line: string, i: number) => {
          const text = line.replace(/^- /, '');
          return (
            <Link
              key={i}
              href={`/${locale}/discover`}
              className="group flex cursor-pointer flex-col rounded-none border border-border bg-canvas p-4 shadow-sm transition-colors hover:border-fjord"
            >
              <div className="mb-2 flex items-center gap-2 text-fjord">
                <Home className="size-4" />
                <span className="line-clamp-1 font-semibold">
                  Property Match
                </span>
              </div>
              <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                {text}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                <span className="text-xs font-medium tracking-wider text-fjord uppercase transition-colors group-hover:text-fjord-hover">
                  View Details
                </span>
                <Check className="size-4 text-muted-foreground transition-colors group-hover:text-fjord-hover" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
