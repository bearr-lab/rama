'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle2,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Building,
  TrendingUp,
  Clock,
  HelpCircle,
  FileText,
  MessageSquarePlus,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Comparison } from '@/components/kibo/comparison';
import { ImageZoom } from '@/components/kibo/image-zoom';
import { AvatarStack } from '@/components/kibo/avatar-stack';
import { Gantt } from '@/components/kibo/gantt';
import { Tree } from '@/components/kibo/tree';
import { RoomGalleryModal } from '@/components/property/room-gallery-modal';
import { UnsplashAttribution } from '@/components/ui/unsplash-attribution';
import { Eye, Sparkles as SparklesIcon } from 'lucide-react';

interface PropertyWorkspaceClientProps {
  property: {
    id: string;
    title: string;
    community: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    trustPassport: {
      healthScore: number;
      evidenceScore: number;
      riskScore: number;
      freshnessScore: number;
    };
  };
  locale: string;
}

type TabType = 'overview' | 'inspection' | 'location' | 'dld';

export function PropertyWorkspaceClient({
  property,
  locale,
}: PropertyWorkspaceClientProps) {
  const [activeTab, setActiveTab] = React.useState<TabType>('overview');
  const [isSaved, setIsSaved] = React.useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);

  // Derive trust level
  const isVerified = property.trustPassport.healthScore >= 90;

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href={`/${locale}/discover`}
          className="text-body-sm inline-flex items-center gap-2 font-bold text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT COLUMN: Media & Details */}
        <div className="min-w-0">
          {/* Hero Image */}
          <div className="group relative mb-8 aspect-video w-full overflow-hidden rounded-2xl bg-surface-subtle">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md',
                  isVerified
                    ? 'border border-verified/40 bg-verified-soft text-verified'
                    : 'border border-review/40 bg-review-soft text-review',
                )}
              >
                {isVerified ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Clock className="h-3.5 w-3.5" />
                )}
                {isVerified ? 'DLD Verified' : 'In Review'}
              </span>
            </div>
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-fjord text-white text-xs font-semibold shadow-md transition-transform hover:scale-105"
                title="Inspect Rooms & Finishes"
              >
                <Eye className="h-4 w-4" />
                <span>Room-by-Room Inspection</span>
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40"
                title="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center backdrop-blur-md transition-colors',
                  isSaved
                    ? 'bg-fjord text-white'
                    : 'bg-white/20 text-white hover:bg-white/40',
                )}
                title="Save"
              >
                <Heart className={cn('h-4 w-4', isSaved && 'fill-current')} />
              </button>
            </div>

            {/* Unsplash Production Attribution Badge */}
            <UnsplashAttribution
              photographerName="RAMA Verified Collection"
              photographerUsername="unsplash"
              variant="overlay"
            />
          </div>

          {/* Header Info */}
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-fjord">
                {property.community}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted">
                Penthouse
              </span>
            </div>
            <h1 className="mb-2 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {property.title}
            </h1>
            <p className="font-display text-2xl text-text">
              AED {property.price.toLocaleString()}
            </p>
            <div className="mt-4 pt-4 border-t border-border/40">
              <AvatarStack
                avatars={[
                  { id: '1', name: 'Zayed Al Maktoum', role: 'DLD Senior Escrow Auditor', status: 'verified' },
                  { id: '2', name: 'Elena Rostova', role: 'Nordic Architecture Lead', status: 'verified' },
                  { id: '3', name: 'Tariq Mansoor', role: 'Legal Compliance Advisor', status: 'online' },
                  { id: '4', name: 'Sara Chen', role: 'Co-investor Analyst', status: 'online' },
                  { id: '5', name: 'Marcus Vance', role: 'Valuation Expert', status: 'offline' },
                  { id: '6', name: 'Amira Hassan', role: 'Title Deed Specialist', status: 'verified' },
                ]}
                label="Verified Escrow Auditors & Co-investors viewing this unit"
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8 flex gap-8 border-b border-border">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'inspection', label: 'Visual Inspection (Kibo)' },
              { id: 'location', label: 'Location' },
              { id: 'dld', label: 'DLD Record' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  'border-b-2 py-4 text-sm font-bold transition-colors',
                  activeTab === tab.id
                    ? 'border-fjord text-ink'
                    : 'border-transparent text-muted hover:text-ink',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === 'overview' && (
              <div className="animate-in fade-in space-y-8 duration-300">
                <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted">Bedrooms</p>
                    <p className="mt-1 flex items-center gap-1.5 font-bold text-ink">
                      <BedDouble className="h-4 w-4" /> {property.beds}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Bathrooms</p>
                    <p className="mt-1 flex items-center gap-1.5 font-bold text-ink">
                      <Bath className="h-4 w-4" /> {property.baths}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Size</p>
                    <p className="mt-1 flex items-center gap-1.5 font-bold text-ink">
                      <Maximize2 className="h-4 w-4" />{' '}
                      {property.sqft.toLocaleString()} sqft
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Developer</p>
                    <p className="mt-1 flex items-center gap-1.5 font-bold text-ink">
                      <Building className="h-4 w-4" /> Emaar
                    </p>
                  </div>
                </div>
                <div className="prose prose-slate max-w-none text-text">
                  <p>
                    An exceptional high-floor residence located in the heart of{' '}
                    {property.community}. Featuring panoramic floor-to-ceiling
                    double-glazed windows, bespoke European kitchen appliances,
                    and direct private elevator lobby access.
                  </p>
                  <p>
                    The property has been cryptographically audited against DLD
                    escrow records with zero pending developer disputes or service
                    charge arrears.
                  </p>
                </div>
              </div>
            )}
            {activeTab === 'inspection' && (
              <div className="animate-in fade-in space-y-8 duration-300">
                <div className="rounded-xl border border-border/60 bg-surface-subtle p-6">
                  <h3 className="mb-2 font-display text-lg font-bold text-ink">
                    3D Render vs. Real Construction Progress
                  </h3>
                  <p className="mb-6 text-sm text-text">
                    Use our interactive Kibo UI before/after slider to compare architectural master plan renders with real-time verified construction site photos from DLD escrow audits.
                  </p>
                  <div className="aspect-video w-full">
                    <Comparison
                      beforeLabel="3D Architectural Render"
                      afterLabel="DLD Verified Construction"
                      beforeImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                      afterImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                      className="h-full w-full shadow-lg"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 bg-surface-subtle p-6">
                  <h3 className="mb-2 font-display text-lg font-bold text-ink">
                    High-Resolution Master Layout & Floor Plan
                  </h3>
                  <p className="mb-6 text-sm text-text">
                    Hover to zoom or click the maximize button to inspect architectural blueprints, unit dimensions, and private elevator access in full screen.
                  </p>
                  <div className="aspect-video w-full">
                    <ImageZoom
                      src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
                      alt="DLD Verified Floor Plan"
                      badge="DLD Verified Escrow Layout"
                      caption="Penthouse Level 42 • Master Layout & Private Elevator Access"
                      className="h-full w-full shadow-lg"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'location' && (
              <div className="animate-in fade-in rounded-xl border border-border bg-surface p-6 duration-300">
                <div className="mb-4 flex items-center gap-2 font-bold text-ink">
                  <MapPin className="h-5 w-5 text-fjord" />
                  {property.community} Neighborhood
                </div>
                <p className="text-sm leading-relaxed text-text">
                  A premium waterfront community offering an integrated lifestyle
                  with retail, dining, and leisure options. Excellent connectivity
                  to Sheikh Zayed Road and walking distance to the Marina
                  Promenade.
                </p>
              </div>
            )}
            {activeTab === 'dld' && (
              <div className="animate-in fade-in space-y-8 duration-300">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
                    <span className="text-sm font-medium text-text">
                      Title Deed Verified
                    </span>
                    <CheckCircle2 className="h-5 w-5 text-verified" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
                    <span className="text-sm font-medium text-text">
                      No Active Disputes
                    </span>
                    <CheckCircle2 className="h-5 w-5 text-verified" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
                    <span className="text-sm font-medium text-text">
                      Developer Escrow Active
                    </span>
                    <CheckCircle2 className="h-5 w-5 text-verified" />
                  </div>
                </div>

                {/* Kibo Gantt Timeline */}
                <Gantt
                  milestones={[
                    {
                      id: 'm1',
                      title: 'Foundation & Enabling Works',
                      project: property.title,
                      startDate: 'Jan 2024',
                      endDate: 'May 2024',
                      progress: 100,
                      paymentPercentage: '10%',
                      amount: 'AED 1,825,000',
                      status: 'completed',
                      dldVerified: true,
                    },
                    {
                      id: 'm2',
                      title: 'Superstructure Level 20 & Escrow Audit',
                      project: property.title,
                      startDate: 'Jun 2024',
                      endDate: 'Nov 2024',
                      progress: 100,
                      paymentPercentage: '20%',
                      amount: 'AED 3,650,000',
                      status: 'completed',
                      dldVerified: true,
                    },
                    {
                      id: 'm3',
                      title: 'Facade Glazing & Private Elevator MEP',
                      project: property.title,
                      startDate: 'Dec 2024',
                      endDate: 'Aug 2025',
                      progress: 65,
                      paymentPercentage: '30%',
                      amount: 'AED 5,475,000',
                      status: 'in-progress',
                      dldVerified: true,
                    },
                    {
                      id: 'm4',
                      title: 'Final DLD Inspection & Handover Title Deed',
                      project: property.title,
                      startDate: 'Sep 2025',
                      endDate: 'Q1 2026',
                      progress: 0,
                      paymentPercentage: '40%',
                      amount: 'AED 7,300,000',
                      status: 'upcoming',
                      dldVerified: false,
                    },
                  ]}
                />

                {/* Kibo Tree Cryptographic Hierarchy */}
                <Tree
                  data={[
                    {
                      id: 't1',
                      title: 'Emaar Master Community Deed (Downtown Dubai)',
                      type: 'folder',
                      date: 'Originated 2018',
                      children: [
                        {
                          id: 't1-1',
                          title: 'RERA Escrow Account Certificate (#8992-1)',
                          type: 'certificate',
                          status: 'verified',
                          hash: '0x8f2a...991c',
                          date: 'Valid thru 2026',
                        },
                        {
                          id: 't1-2',
                          title: 'Sky Collection Penthouse Title Deed & SPA',
                          type: 'document',
                          status: 'verified',
                          hash: '0x4b11...e208',
                          date: 'DLD Stamped',
                        },
                        {
                          id: 't1-3',
                          title: 'Developer Service Charge NOC (2024-2026)',
                          type: 'contract',
                          status: 'verified',
                          hash: '0x7c90...331a',
                          date: 'Zero Arrears',
                        },
                        {
                          id: 't1-4',
                          title: 'Cryptographic Escrow Audit Ledger',
                          type: 'document',
                          status: 'encrypted',
                          hash: 'SHA256: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
                          date: 'Real-time Sync',
                        },
                      ],
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Decision Panel (Sticky) */}
        <div className="relative">
          <div className="sticky top-24 space-y-6">
            {/* Action Panel */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <Button
                size="lg"
                className="mb-3 w-full bg-fjord text-white hover:bg-fjord-hover"
                onClick={() => setIsSaved(true)}
              >
                Add to Shortlist
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-canvas text-ink hover:bg-surface-subtle"
              >
                Schedule Viewing
              </Button>
            </div>

            {/* Evidence Notes */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink">
                <FileText className="h-5 w-5 text-muted" />
                Your Evidence Notes
              </h3>
              <textarea
                placeholder="Capture your thoughts, trade-offs, and observations here..."
                className="min-h-[120px] w-full resize-none rounded-xl border border-border bg-canvas p-4 text-sm text-ink placeholder:text-muted focus:border-fjord focus:outline-none focus:ring-1 focus:ring-fjord"
              />
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">
                  Open Questions
                </h4>
                <button className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border bg-canvas p-3 text-sm font-medium text-muted transition-colors hover:border-fjord/50 hover:bg-fjord-soft hover:text-fjord">
                  <MessageSquarePlus className="h-4 w-4" />
                  Add question for broker
                </button>
              </div>
            </div>

            {/* ROI Estimate */}
            <div className="rounded-2xl border border-border/80 bg-ink-surface p-6 text-white shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h4 className="font-display text-lg">Projected ROI</h4>
                  <p className="text-xs text-white/70">Annual Estimate</p>
                </div>
                <div className="rounded bg-emerald-500/20 px-2 py-1 text-[10px] font-bold tracking-widest text-emerald-300 uppercase">
                  High Potential
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">
                    {(property.trustPassport.healthScore > 90 ? 6.4 : 5.8).toFixed(1)}%
                  </p>
                  <p className="text-[10px] tracking-tighter text-white/70 uppercase">
                    Net Yield
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold">AED {(property.price * 0.064 / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] tracking-tighter text-white/70 uppercase">
                    Gross Rent/yr
                  </p>
                </div>
              </div>
            </div>

            {/* Expert Signal */}
            {!isVerified && (
              <div className="flex gap-4 rounded-xl border border-[var(--review-soft)] bg-[var(--review-soft)] p-4">
                <AlertCircle className="shrink-0 text-xl text-[var(--review)]" />
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Research Alert
                  </p>
                  <p className="mt-1 text-[11px] leading-normal text-text">
                    Major infrastructure work on nearby road scheduled for Q1
                    2025. May temporarily impact access but improve value
                    long-term.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Similar Properties */}
      <section className="mt-24 space-y-8 border-t border-border pt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold text-ink">
            Benchmark Properties
          </h2>
          <button className="flex items-center gap-2 text-sm font-semibold text-fjord transition-all hover:gap-3">
            Compare All <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: 'Marina Gate Tower II',
              price: '3.9M',
              specs: '2 Bed • 1,650 sqft',
              tags: ['Similar View', 'Lower ROI'],
              img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: '52|42 Residences',
              price: '4.5M',
              specs: '3 Bed • 2,200 sqft',
              tags: ['Modern Design', 'Higher Price/Sqft'],
              img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Trident Grand Residence',
              price: '4.1M',
              specs: '3 Bed • 2,800 sqft',
              tags: ['Large Balcony', 'Older Building'],
              img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            },
          ].map((benchmark, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-xl border border-border bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={benchmark.img}
                  alt={benchmark.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded bg-surface/90 px-2 py-1 text-[10px] font-bold text-ink shadow-sm backdrop-blur dark:bg-black/80 dark:text-white">
                    AED {benchmark.price}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-4">
                <h3 className="font-medium text-ink">{benchmark.title}</h3>
                <p className="text-xs text-muted">{benchmark.specs}</p>
                <div className="mt-2 flex items-center gap-2">
                  {benchmark.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-surface-subtle px-2 py-0.5 text-[10px] font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Room-by-Room Spatial Inspector Modal */}
      <RoomGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        propertyName={property.title}
        locale={locale as 'en' | 'ar'}
      />
    </div>
  );
}
