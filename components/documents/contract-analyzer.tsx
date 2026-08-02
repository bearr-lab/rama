'use client';

import * as React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Download,
  Loader2,
  FileCode,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SampleDoc {
  id: string;
  title: string;
  type: string;
  date: string;
  status: 'verified' | 'review';
  parties: string;
  escrowAmount: string;
  clauses: { title: string; detail: string; status: 'ok' | 'warn' }[];
}

const SAMPLE_DOCUMENTS: SampleDoc[] = [
  {
    id: 'doc-form-f',
    title: 'DLD Memorandum of Understanding (Form F)',
    type: 'Mandatory Purchase Contract',
    date: 'July 24, 2026',
    status: 'verified',
    parties: 'Buyer: RAMA Holding L.L.C • Seller: Emaar Properties PJSC',
    escrowAmount: 'AED 18,500,000 (Locked in Emirates NBD Escrow #8992-1)',
    clauses: [
      {
        title: 'Clause 4.1: Escrow Milestones',
        detail:
          'Funds released strictly upon DLD title deed transfer completion.',
        status: 'ok',
      },
      {
        title: 'Clause 8.3: Developer Handover Penalty',
        detail:
          '1% monthly penalty payable by seller if handover delayed past Q4 2026.',
        status: 'ok',
      },
      {
        title: 'Clause 12.1: Dispute Resolution',
        detail:
          'Subject to Dubai Real Estate Regulatory Agency (RERA) arbitration tribunal.',
        status: 'ok',
      },
    ],
  },
  {
    id: 'doc-oqood',
    title: 'RERA Electronic Oqood Certificate #44109',
    type: 'Off-Plan Interim Title Deed',
    date: 'June 15, 2026',
    status: 'verified',
    parties: 'Project: Sky Collection Downtown • Escrow Agent: Mashreq Bank',
    escrowAmount: 'AED 3,700,000 (20% Down Payment Received)',
    clauses: [
      {
        title: 'RERA Project Registration',
        detail:
          'Project #1184 verified active on Dubai REST registry. Construction progress: 84%.',
        status: 'ok',
      },
      {
        title: 'Escrow Bank Audit',
        detail:
          'Monthly financial audit verified by RERA third-party inspector.',
        status: 'ok',
      },
    ],
  },
  {
    id: 'doc-noc',
    title: 'Developer Maintenance & Service Charge NOC',
    type: 'No Objection Certificate',
    date: 'July 20, 2026',
    status: 'review',
    parties: 'Issuer: Emaar Community Management (ECM)',
    escrowAmount: 'AED 0 Unpaid Dues (Service Charge Paid to Q3 2026)',
    clauses: [
      {
        title: 'Financial Clearance',
        detail:
          'All service charges paid up to date. Next billing cycle: October 1, 2026.',
        status: 'ok',
      },
      {
        title: 'Chiller / District Cooling',
        detail:
          'Empower cooling deposit transfer requires buyer presence at transfer.',
        status: 'warn',
      },
    ],
  },
];

export function ContractAnalyzer() {
  const [selectedDocId, setSelectedDocId] =
    React.useState<string>('doc-form-f');
  const [isAnalyzing, setIsAnalyzing] = React.useState<boolean>(false);
  const [analyzedDoc, setAnalyzedDoc] = React.useState<SampleDoc | null>(
    SAMPLE_DOCUMENTS[0],
  );

  const handleSelectDoc = (doc: SampleDoc) => {
    setSelectedDocId(doc.id);
    setIsAnalyzing(true);
    setAnalyzedDoc(null);

    // Simulate OCR AI Information Extraction
    setTimeout(() => {
      setAnalyzedDoc(doc);
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="shadow-subtle flex flex-col overflow-hidden rounded-none border border-border bg-surface lg:flex-row">
      {/* Left Column: Document Vault Selector */}
      <div className="flex w-full flex-col justify-between space-y-6 border-b border-border bg-surface-subtle p-6 lg:w-96 lg:border-r lg:border-b-0 lg:p-8">
        <div>
          <div className="mb-2 flex items-center gap-2.5">
            <div className="rounded-none bg-fjord/10 p-2 text-fjord">
              <FileCode className="size-5" />
            </div>
            <div>
              <h3 className="text-body font-display font-bold text-ink">
                Document Intelligence
              </h3>
              <p className="text-caption text-muted-foreground">
                OCR Contract & Clause Vault
              </p>
            </div>
          </div>
          <p className="text-caption mb-4 text-muted-foreground">
            Select a verified DLD legal document below to run real-time AI
            clause extraction and compliance checks.
          </p>

          <div className="space-y-2.5">
            {SAMPLE_DOCUMENTS.map((doc) => {
              const isSelected = selectedDocId === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => handleSelectDoc(doc)}
                  className={cn(
                    'relative flex w-full items-start gap-3 rounded-none border p-4 text-left transition-all',
                    isSelected
                      ? 'border-fjord bg-surface shadow-md ring-1 ring-fjord/20'
                      : 'hover:border-border-hover border-border bg-surface/60 hover:bg-surface',
                  )}
                >
                  <div
                    className={cn(
                      'mt-0.5 shrink-0 rounded-none p-2',
                      doc.status === 'verified'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-amber-500/10 text-amber-500',
                    )}
                  >
                    <FileText className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-body-sm block truncate font-bold text-ink">
                        {doc.title}
                      </span>
                    </div>
                    <span className="block text-[11px] text-muted-foreground">
                      {doc.type}
                    </span>
                    <span className="mt-1 inline-block font-mono text-[10px] text-muted-foreground">
                      {doc.date}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="size-2 shrink-0 self-center rounded-none bg-fjord" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-caption flex items-center gap-2 rounded-none border border-border bg-surface-subtle p-4 text-muted-foreground">
          <Sparkles className="size-4 shrink-0 text-fjord" />
          <span>
            RAMA AI automatically flags non-standard escalation clauses in Form
            F contracts.
          </span>
        </div>
      </div>

      {/* Right Column: OCR Extraction Dashboard */}
      <div className="flex min-h-125 flex-1 flex-col justify-between p-6 lg:p-8">
        {isAnalyzing ? (
          <div className="flex min-h-125 w-full flex-col items-center justify-center p-8 text-center">
            <div className="relative">
              <div className="flex size-16 items-center justify-center rounded-none border border-border bg-surface-subtle">
                <Loader2 className="size-8 animate-spin text-fjord" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 size-5 animate-pulse text-fjord" />
            </div>
            <div>
              <h4 className="text-body mt-4 font-display font-bold text-ink">
                Running AI OCR Information Extraction...
              </h4>
              <p className="text-caption mt-1 max-w-sm text-muted-foreground">
                Parsing legal syntax, escrow bank certificates, and
                cross-referencing against DLD standard Form F template.
              </p>
            </div>
          </div>
        ) : analyzedDoc ? (
          <div className="animate-in fade-in space-y-6 duration-300">
            {/* Doc Title & Verification Badge */}
            <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-h2 font-display font-bold text-ink">
                    {analyzedDoc.title}
                  </h3>
                  <span
                    className={cn(
                      'flex items-center gap-1 rounded-none px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase',
                      analyzedDoc.status === 'verified'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                    )}
                  >
                    <CheckCircle2 className="size-3" />
                    {analyzedDoc.status === 'verified'
                      ? '100% DLD Compliant'
                      : 'Review Required'}
                  </span>
                </div>
                <p className="text-caption mt-0.5 text-muted-foreground">
                  {analyzedDoc.type} • Dated {analyzedDoc.date}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    alert(
                      `Downloading verified PDF copy of ${analyzedDoc.title}...`,
                    )
                  }
                  className="text-body-sm flex items-center gap-1.5 rounded-none border border-border bg-surface-subtle px-3 py-1.5 font-semibold text-ink transition-colors hover:bg-border/50"
                >
                  <Download className="size-4 text-muted-foreground" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Mock PDF Viewer Representation */}
            <div className="flex flex-col overflow-hidden rounded-none border border-border bg-surface-subtle shadow-inner">
              <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink">
                    {analyzedDoc.title}.pdf
                  </span>
                  <span className="text-border">|</span>
                  <span>Page 1 of 4</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <button className="rounded-none bg-surface-subtle px-1.5 py-0.5 font-bold text-ink transition-colors hover:bg-border/50">
                    -
                  </button>
                  <span className="text-ink">100%</span>
                  <button className="rounded-none bg-surface-subtle px-1.5 py-0.5 font-bold text-ink transition-colors hover:bg-border/50">
                    +
                  </button>
                </div>
              </div>
              <div className="flex min-h-72 items-start justify-center overflow-y-auto p-8">
                <div className="relative w-full max-w-lg overflow-hidden rounded-none bg-white p-8 font-serif leading-relaxed text-ink shadow-md ring-1 ring-border/50 select-none">
                  <div className="mb-6 flex justify-between border-b border-border pb-2 font-sans text-sm font-bold text-ink">
                    <span className="tracking-wide">DUBAI LAND DEPARTMENT - LEGAL FORM</span>
                    <span className="font-mono text-xs text-emerald-700">
                      VERIFIED ESCROW COPY
                    </span>
                  </div>
                  <p className="mb-4 text-sm leading-loose text-muted-foreground">
                    This document certifies that the contracting parties listed
                    below have executed the standardized real estate agreement
                    under the regulatory framework of the Dubai Real Estate
                    Regulatory Agency (RERA). All encumbrances and liabilities have been verified against the master developer registry.
                  </p>
                  
                  {/* Skeleton Text Blocks */}
                  <div className="mt-8 space-y-4">
                    <div className="h-3 w-full rounded-none bg-surface-subtle" />
                    <div className="h-3 w-11/12 rounded-none bg-surface-subtle" />
                    <div className="h-3 w-4/5 rounded-none bg-surface-subtle" />
                    <div className="mt-6 h-3 w-full rounded-none bg-surface-subtle" />
                    <div className="h-3 w-5/6 rounded-none bg-surface-subtle" />
                  </div>
                </div>
              </div>
            </div>

            {/* Extracted Metadata Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-none border border-border bg-surface-subtle p-4">
                <span className="text-[11px] font-extrabold tracking-wider text-muted-foreground uppercase">
                  Contracting Parties
                </span>
                <p className="text-body-sm mt-1 font-bold text-ink">
                  {analyzedDoc.parties}
                </p>
              </div>

              <div className="rounded-none border border-border bg-surface-subtle p-4">
                <span className="text-[11px] font-extrabold tracking-wider text-muted-foreground uppercase">
                  Escrow / Financial Terms
                </span>
                <p className="text-body-sm mt-1 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {analyzedDoc.escrowAmount}
                </p>
              </div>
            </div>

            {/* Extracted Clauses */}
            <div className="space-y-3">
              <h4 className="text-body-sm flex items-center gap-2 font-bold text-ink">
                <Sparkles className="size-4 text-fjord" />
                <span>AI Extracted Legal Clauses & Compliance Flags</span>
              </h4>

              <div className="space-y-3">
                {analyzedDoc.clauses.map((clause, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'flex items-start justify-between gap-4 rounded-none border p-4 transition-all',
                      clause.status === 'ok'
                        ? 'border-border bg-surface'
                        : 'border-amber-500/50 bg-amber-500/10 shadow-md ring-1 ring-amber-500/20',
                    )}
                  >
                    <div className="flex flex-1 items-start gap-3">
                      <div
                        className={cn(
                          'mt-0.5 shrink-0 rounded-none p-1.5',
                          clause.status === 'ok'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-amber-500 font-bold text-black',
                        )}
                      >
                        {clause.status === 'ok' ? (
                          <CheckCircle2 className="size-4" />
                        ) : (
                          <AlertTriangle className="size-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-body-sm font-bold text-ink">
                            {clause.title}
                          </h5>
                          {clause.status !== 'ok' && (
                            <span className="rounded-none bg-amber-500 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-black uppercase">
                              Red Flag Alert
                            </span>
                          )}
                        </div>
                        <p className="text-caption mt-1 leading-relaxed text-muted-foreground">
                          {clause.detail}
                        </p>
                      </div>
                    </div>
                    {clause.status !== 'ok' && (
                      <button
                        onClick={() =>
                          alert(
                            `Legal review requested for clause: ${clause.title}. Our partner legal team will contact you within 2 business hours.`,
                          )
                        }
                        className="shrink-0 self-center rounded-none bg-fjord px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-fjord-hover"
                      >
                        Request Legal Review
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary Footer */}
            <div className="flex items-center justify-between rounded-none border border-border bg-surface-subtle p-4">
              <div className="text-body-sm flex items-center gap-2.5 font-medium text-ink">
                <Sparkles className="size-4 shrink-0 text-fjord" />
                <span>
                  <strong>AI Contract Verdict:</strong> Zero hidden liabilities
                  or developer encumbrances found. Ready for DLD transfer.
                </span>
              </div>
              <button
                onClick={() =>
                  alert(
                    `Document hash SHA-256 verified against Dubai REST registry.`,
                  )
                }
                className="text-caption ml-2 shrink-0 font-bold text-fjord hover:underline dark:text-fjord-hover"
              >
                Verify Hash →
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
