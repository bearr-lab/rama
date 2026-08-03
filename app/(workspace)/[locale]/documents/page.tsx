'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { ContractAnalyzer } from '@/components/documents/contract-analyzer';
import { DocumentActions } from '@/components/documents/document-actions';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { MetricStrip } from '@/components/ui/metric-strip';
import { PageShell } from '@/components/ui/page-shell';
import { SectionHeader } from '@/components/ui/section-header';

export default function DocumentsWorkspacePage() {
  const locale = useLocale() || 'en';

  return (
    <PageShell>
      <SectionHeader
        breadcrumb="WORKSPACE · DOCUMENT ROOM"
        title="Document Intelligence & Contract Vault"
        description="Centralized legal vault for your DLD Form F MOUs, RERA Oqood certificates, Title Deeds, and Developer NOCs with live AI OCR extraction."
        actions={
          <Link href={`/${locale}/tasks`}>
            <ShimmerButton className="px-5 py-2.5 text-xs font-semibold">
              <span>View Deal Flow</span>
              <ArrowRight className="ml-2 size-4" />
            </ShimmerButton>
          </Link>
        }
      />

      {/* Efferd & Magic UI Document Intelligence Metrics Strip */}
      <MetricStrip
        metrics={[
          {
            id: 'vaulted',
            title: 'Vaulted Legal Documents',
            value: 14,
            suffix: ' Files',
            badgeText: '100% Encrypted',
            description: 'Form F MOUs, Title Deeds & Ejari Certificates'
          },
          {
            id: 'accuracy',
            title: 'AI OCR Accuracy Rate',
            value: 99.4,
            suffix: '%',
            decimalPlaces: 1,
            badgeText: 'Claude 3.7 Sonnet',
            description: 'Automated legal clause extraction & validation'
          },
          {
            id: 'verification',
            title: 'DLD Verification Status',
            value: 'Cleared',
            badgeText: 'Rest API Validated',
            isShinyBadge: true,
            description: 'Verified against DLD Land Registry database'
          }
        ]}
      />

      {/* Document Actions (Upload & Create) */}
      <div className="transition-all duration-300">
        <DocumentActions />
      </div>

      {/* Main Contract Vault Analyzer */}
      <div className="transition-all duration-300">
        <ContractAnalyzer />
      </div>
    </PageShell>
  );
}
