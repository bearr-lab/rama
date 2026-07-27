'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/layout/container';

interface DeveloperLogoCloudProps {
  locale?: string;
  isArabic?: boolean;
}

export function DeveloperLogoCloud({
  locale = 'en',
  isArabic = false,
}: DeveloperLogoCloudProps) {
  const partners = [
    { name: 'Dubai Land Department', role: 'Official DLD Registry API' },
    { name: 'RERA Escrow Trustee', role: 'Law No. 8 Verified' },
    { name: 'Emaar Properties', role: 'Master Developer' },
    { name: 'Nakheel', role: 'Palm Jumeirah Developer' },
    { name: 'Dubai Holding', role: 'Institutional Developer' },
    { name: 'Emirates NBD', role: 'Escrow Trustee Bank' },
    { name: 'First Abu Dhabi Bank', role: 'Mortgage & Escrow Partner' },
  ];

  return (
    <section className="bg-surface/50 py-16 border-y border-border/40 overflow-hidden">
      <Container size="xl" className="px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold tracking-widest text-fjord uppercase mb-2 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-verified" />
            {isArabic ? 'شبكة منظومة ريرا المعتمدة' : 'RERA Ecosystem & Escrow Network'}
          </p>
          <h3 className="font-display text-2xl font-medium text-ink md:text-3xl">
            {isArabic
              ? 'شركاء الخدمات المصرفية والمطورين المعتمدين'
              : 'Verified Institutional Banking & Developer Partners'}
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border/60 bg-canvas/80 text-center transition-all duration-300 hover:border-fjord/30 hover:shadow-subtle hover:-translate-y-0.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-fjord-soft mb-2">
                <CheckCircle2 className="h-4 w-4 text-fjord" />
              </div>
              <span className="text-xs font-bold text-ink leading-tight">
                {partner.name}
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5">
                {partner.role}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default DeveloperLogoCloud;
