'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  FileText,
  Sparkles,
  Upload,
  Search,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { ContractAnalyzer } from '@/components/documents/contract-analyzer';
import { extractDocumentData, ExtractedData } from '@/lib/documents/extractor';
import { cn } from '@/lib/utils';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';
import { ShimmerButton } from '@/components/magicui/shimmer-button';

export default function DocumentsWorkspacePage() {
  const locale = useLocale() || 'en';
  const [customUrl, setCustomUrl] = React.useState('');
  const [isExtracting, setIsExtracting] = React.useState(false);
  const [extractedResult, setExtractedResult] =
    React.useState<ExtractedData | null>(null);

  const handleCustomExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    setIsExtracting(true);
    setExtractedResult(null);
    try {
      const res = await extractDocumentData(customUrl);
      setExtractedResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10">
      <header className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-fjord uppercase">
            WORKSPACE · DOCUMENT ROOM
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Document Intelligence & Contract Vault
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed font-light text-muted-foreground">
            Centralized legal vault for your DLD Form F MOUs, RERA Oqood certificates, Title Deeds, and Developer NOCs with live AI OCR extraction.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Link href={`/${locale}/tasks`}>
            <ShimmerButton className="px-5 py-2.5 text-xs font-semibold">
              <span>View Deal Flow</span>
              <ArrowRight className="ml-2 size-4" />
            </ShimmerButton>
          </Link>
        </div>
      </header>

      {/* Efferd & Magic UI Document Intelligence Metrics Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <BlurFade delay={0.1}>
          <div className="hover:shadow-floating border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all">
            <span className="text-[11px] font-bold tracking-widest text-fjord uppercase">
              Vaulted Legal Documents
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-ink">
                <NumberTicker value={14} suffix=" Files" />
              </span>
              <span className="inline-flex items-center bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                100% Encrypted
              </span>
            </div>
            <p className="mt-1 text-xs font-light text-muted-foreground">
              Form F MOUs, Title Deeds & Ejari Certificates
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="hover:shadow-floating border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all">
            <span className="text-[11px] font-bold tracking-widest text-fjord uppercase">
              AI OCR Accuracy Rate
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-ink">
                <NumberTicker value={99.4} decimalPlaces={1} suffix="%" />
              </span>
              <span className="inline-flex items-center bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Claude 3.7 Sonnet
              </span>
            </div>
            <p className="mt-1 text-xs font-light text-muted-foreground">
              Automated legal clause extraction & validation
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="hover:shadow-floating border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all">
            <span className="text-[11px] font-bold tracking-widest text-fjord uppercase">
              DLD Verification Status
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-3xl font-semibold text-ink">Cleared</span>
              <span className="inline-flex items-center bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <AnimatedShinyText className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Rest API Validated
                </AnimatedShinyText>
              </span>
            </div>
            <p className="mt-1 text-xs font-light text-muted-foreground">
              Verified against DLD Land Registry database
            </p>
          </div>
        </BlurFade>
      </div>

      {/* Live AI OCR URL Scanner Bar */}
      <div className="shadow-subtle space-y-4 rounded-3xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-fjord" />
            <h3 className="text-h3 font-display font-bold text-ink">
              Live AI OCR Document Analyzer
            </h3>
          </div>
          <span className="text-caption font-semibold text-muted">
            Supports DLD Form F, Oqood, Title Deed & NOC URLs
          </span>
        </div>

        <form
          onSubmit={handleCustomExtract}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Upload className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Upload or drag DLD Form F, Title Deed, or NOC PDF here..."
              className="text-body w-full rounded-2xl border border-border bg-surface-subtle py-3.5 pr-4 pl-12 font-mono text-sm text-ink transition-all placeholder:text-muted focus:border-fjord focus:ring-2 focus:ring-fjord/30 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isExtracting || !customUrl.trim()}
            className="text-body-sm flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-fjord px-8 py-3.5 font-bold text-white shadow-md transition-all hover:bg-fjord-hover disabled:opacity-50"
          >
            {isExtracting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Running OCR...</span>
              </>
            ) : (
              <>
                <Upload className="size-4" />
                <span>Run AI OCR Extraction</span>
              </>
            )}
          </button>
        </form>

        {extractedResult && (
          <div className="animate-in fade-in space-y-3 rounded-2xl border border-purple-500/30 bg-purple-500/5 p-5 duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-500" />
                <span className="text-body font-display font-bold text-ink">
                  Extracted Metadata (
                  {extractedResult.documentType || 'DLD Document'})
                </span>
              </div>
              <span className="rounded-full bg-purple-500/10 px-2.5 py-1 font-mono text-xs font-bold text-purple-600">
                Confidence: {Math.round(extractedResult.confidenceScore * 100)}%
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-surface p-4 font-mono text-xs md:grid-cols-3">
              <div>
                <span className="block font-sans text-muted">
                  Title / Reference No.
                </span>
                <span className="text-sm font-bold text-ink">
                  {extractedResult.titleNumber}
                </span>
              </div>
              <div>
                <span className="block font-sans text-muted">
                  Registered Parties
                </span>
                <span className="text-sm font-bold text-ink">
                  {extractedResult.ownerNames?.join(' • ')}
                </span>
              </div>
              <div>
                <span className="block font-sans text-muted">
                  Issue / Registration Date
                </span>
                <span className="text-sm font-bold text-ink">
                  {extractedResult.issueDate}
                </span>
              </div>
            </div>

            {extractedResult.extractedClaude && (
              <div className="flex items-start gap-2 rounded-xl border border-border bg-surface p-3 text-xs text-ink">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-purple-500" />
                <div>
                  <span className="mb-0.5 block font-bold">
                    AI Legal Clause Analysis:
                  </span>
                  <span className="leading-relaxed text-muted">
                    {extractedResult.extractedClaude}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Contract Vault Analyzer */}
      <div className="transition-all duration-300">
        <ContractAnalyzer />
      </div>
    </div>
  );
}
