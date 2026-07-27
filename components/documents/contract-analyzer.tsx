'use client';

import * as React from 'react';
import {
  FileText,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Download,
  Eye,
  Loader2,
  ArrowRight,
  Check,
  AlertTriangle,
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
    <div className="shadow-subtle flex flex-col overflow-hidden rounded-3xl border border-border bg-surface lg:flex-row">
      {/* Left Column: Document Vault Selector */}
      <div className="flex w-full flex-col justify-between space-y-6 border-b border-border bg-surface-subtle p-6 lg:w-96 lg:border-r lg:border-b-0 lg:p-8">
        <div>
          <div className="mb-2 flex items-center gap-2.5">
            <div className="rounded-xl bg-purple-500/10 p-2 text-purple-500">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-body font-display font-bold text-ink">
                Document Intelligence
              </h3>
              <p className="text-caption text-muted">
                OCR Contract & Clause Vault
              </p>
            </div>
          </div>
          <p className="text-caption mb-4 text-muted">
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
                    'relative flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all',
                    isSelected
                      ? 'border-purple-500/50 bg-surface shadow-md ring-1 ring-purple-500/20'
                      : 'hover:border-border-hover border-border bg-surface/60 hover:bg-surface',
                  )}
                >
                  <div
                    className={cn(
                      'mt-0.5 shrink-0 rounded-xl p-2',
                      doc.status === 'verified'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-amber-500/10 text-amber-500',
                    )}
                  >
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-body-sm block truncate font-bold text-ink">
                        {doc.title}
                      </span>
                    </div>
                    <span className="block text-[11px] text-muted">
                      {doc.type}
                    </span>
                    <span className="mt-1 inline-block font-mono text-[10px] text-muted">
                      {doc.date}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="h-2 w-2 shrink-0 self-center rounded-full bg-purple-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-caption flex items-center gap-2 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 text-muted">
          <Sparkles className="h-4 w-4 shrink-0 text-purple-500" />
          <span>
            RAMA AI automatically flags non-standard escalation clauses in Form
            F contracts.
          </span>
        </div>
      </div>

      {/* Right Column: OCR Extraction Dashboard */}
      <div className="flex min-h-[500px] flex-1 flex-col justify-between p-6 lg:p-8">
        {isAnalyzing ? (
          <div className="animate-in fade-in flex flex-1 flex-col items-center justify-center space-y-4 p-12 text-center duration-200">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple-500/20 bg-purple-500/10">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-5 w-5 animate-bounce text-sky-500" />
            </div>
            <div>
              <h4 className="text-body font-display font-bold text-ink">
                Running AI OCR Information Extraction...
              </h4>
              <p className="text-caption mt-1 max-w-sm text-muted">
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
                      'flex items-center gap-1 rounded px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase',
                      analyzedDoc.status === 'verified'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                    )}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {analyzedDoc.status === 'verified'
                      ? '100% DLD Compliant'
                      : 'Review Required'}
                  </span>
                </div>
                <p className="text-caption mt-0.5 text-muted">
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
                  className="text-body-sm flex items-center gap-1.5 rounded-xl border border-border bg-surface-subtle px-3 py-1.5 font-semibold text-ink transition-colors hover:bg-border/50"
                >
                  <Download className="h-4 w-4 text-muted" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Mock PDF Viewer Representation */}
            <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-slate-900 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">
                    {analyzedDoc.title}.pdf
                  </span>
                  <span className="text-slate-500">|</span>
                  <span>Page 1 of 4</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <button className="rounded bg-slate-800 px-1.5 py-0.5 font-bold text-slate-300 hover:bg-slate-700">
                    -
                  </button>
                  <span>100%</span>
                  <button className="rounded bg-slate-800 px-1.5 py-0.5 font-bold text-slate-300 hover:bg-slate-700">
                    +
                  </button>
                </div>
              </div>
              <div className="flex h-48 gap-4 overflow-y-auto bg-slate-800/50 p-6">
                <div className="flex w-16 shrink-0 flex-col gap-2 border-r border-slate-700/50 pr-4">
                  <div className="aspect-[3/4] w-full cursor-pointer rounded border border-sky-400 bg-white/10 shadow" />
                  <div className="aspect-[3/4] w-full cursor-pointer rounded border border-transparent bg-white/5 opacity-50" />
                </div>
                <div className="relative flex-1 overflow-hidden rounded-lg bg-white p-6 font-serif text-xs leading-relaxed text-slate-900 shadow-2xl select-none">
                  <div className="mb-2 flex justify-between border-b pb-1 font-sans text-sm font-bold text-slate-950">
                    <span>DUBAI LAND DEPARTMENT - LEGAL FORM</span>
                    <span className="font-mono text-[10px] text-emerald-700">
                      VERIFIED ESCROW COPY
                    </span>
                  </div>
                  <p className="mb-2 font-sans text-[11px] leading-normal text-slate-700">
                    This document certifies that the contracting parties listed
                    below have executed the standardized real estate agreement
                    under the regulatory framework of the Dubai Real Estate
                    Regulatory Agency (RERA)...
                  </p>
                  <div className="mb-1 h-2 w-3/4 rounded bg-slate-200" />
                  <div className="h-2 w-1/2 rounded bg-slate-200" />
                </div>
              </div>
            </div>

            {/* Extracted Metadata Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface-subtle p-4">
                <span className="text-[11px] font-extrabold tracking-wider text-muted uppercase">
                  Contracting Parties
                </span>
                <p className="text-body-sm mt-1 font-bold text-ink">
                  {analyzedDoc.parties}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface-subtle p-4">
                <span className="text-[11px] font-extrabold tracking-wider text-muted uppercase">
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
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>AI Extracted Legal Clauses & Compliance Flags</span>
              </h4>

              <div className="space-y-3">
                {analyzedDoc.clauses.map((clause, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'flex items-start justify-between gap-4 rounded-2xl border p-4 transition-all',
                      clause.status === 'ok'
                        ? 'border-border bg-surface'
                        : 'border-amber-500/50 bg-amber-500/10 shadow-md ring-1 ring-amber-500/20',
                    )}
                  >
                    <div className="flex flex-1 items-start gap-3">
                      <div
                        className={cn(
                          'mt-0.5 shrink-0 rounded-lg p-1.5',
                          clause.status === 'ok'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'bg-amber-500 font-bold text-black',
                        )}
                      >
                        {clause.status === 'ok' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-body-sm font-bold text-ink">
                            {clause.title}
                          </h5>
                          {clause.status !== 'ok' && (
                            <span className="rounded bg-amber-500 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-black uppercase">
                              Red Flag Alert
                            </span>
                          )}
                        </div>
                        <p className="text-caption mt-1 leading-relaxed text-muted">
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
                        className="shrink-0 self-center rounded-xl bg-fjord px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-fjord-hover"
                      >
                        Request Legal Review
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary Footer */}
            <div className="flex items-center justify-between rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 via-sky-500/5 to-transparent p-4">
              <div className="text-body-sm flex items-center gap-2.5 font-medium text-ink">
                <Sparkles className="h-4 w-4 shrink-0 text-purple-500" />
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
                className="text-caption ml-2 shrink-0 font-bold text-purple-600 hover:underline dark:text-purple-400"
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
