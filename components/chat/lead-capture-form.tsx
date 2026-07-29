'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle2 } from 'lucide-react';

interface LeadCaptureFormProps {
  reason: string;
  onSuccess?: () => void;
}

export function LeadCaptureForm({ reason, onSuccess }: LeadCaptureFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, intent: reason })
      });
      
      if (!response.ok) throw new Error('Failed to submit');
      
      setStatus('success');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Lead capture error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 bg-surface border border-border rounded-xl mt-2 w-full max-w-[280px]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-2">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h4 className="font-display font-semibold text-foreground">Details Received</h4>
        <p className="text-xs text-muted-foreground">One of our senior advisors will contact you shortly regarding: {reason}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3 bg-surface border border-border p-4 rounded-xl mt-2 w-full max-w-[280px]">
      <div className="mb-2">
        <h4 className="font-display font-semibold text-foreground text-sm">Contact an Advisor</h4>
        <p className="text-[11px] text-muted-foreground leading-tight mt-1">{reason}</p>
      </div>
      
      <div className="space-y-2">
        <input
          type="text"
          required
          placeholder="Your Name"
          className="w-full text-xs rounded-md border border-border bg-surface-subtle px-3 py-2 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={status === 'loading'}
        />
        <input
          type="email"
          required
          placeholder="Email Address"
          className="w-full text-xs rounded-md border border-border bg-surface-subtle px-3 py-2 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={status === 'loading'}
        />
        <input
          type="tel"
          required
          placeholder="Mobile Number"
          className="w-full text-xs rounded-md border border-border bg-surface-subtle px-3 py-2 text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={status === 'loading'}
        />
      </div>

      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full h-9 mt-2 text-xs font-medium"
      >
        {status === 'loading' ? 'Sending...' : 'Submit Request'}
        {!status && <Send className="ml-2 h-3 w-3" />}
      </Button>

      {status === 'error' && (
        <p className="text-[10px] text-destructive text-center mt-1">Failed to submit. Please try again.</p>
      )}
    </form>
  );
}
