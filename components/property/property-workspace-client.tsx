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
  Clock,
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
          className="text-body-sm inline-flex items-center gap-2 font-bold text-muted transition-colors hover:text-fjord dark:text-muted"
        >
          <ArrowLeft className="size-4" />
          Back to Search
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT COLUMN: Media & Details */}
        <div className="min-w-0">
          {/* Hero Image */}
          <div className="group relative mb-8 aspect-video w-full overflow-hidden rounded-none bg-surface-subtle dark:bg-fjord-hover">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
              alt={property.title}
              className="group- size-full object-cover transition-transform duration-700"
            />
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-none px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase shadow-sm backdrop-blur-md',
                  isVerified
                    ? 'border border-border/40 bg-surface-subtle text-fjord dark:border-border/40 dark:bg-surface-subtle dark:text-muted'
                    : 'border border-review/40 bg-surface-subtle text-review dark:bg-fjord-hover',
                )}
              >
                {isVerified ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <Clock className="size-3.5" />
                )}
                {isVerified ? 'DLD Verified' : 'In Review'}
              </span>
            </div>
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsGalleryOpen(true)}
                className="flex items-center gap-1.5 bg-fjord-hover px-3.5 py-2 text-xs font-semibold text-white shadow-md transition-transform dark:bg-surface-subtle"
                title="Inspect Rooms & Finishes"
              >
                <Eye className="size-4" />
                <span>Room-by-Room Inspection</span>
              </button>
              <button
                className="flex size-10 items-center justify-center bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/40"
                title="Share"
              >
                <Share2 className="size-4" />
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={cn(
                  'flex size-10 items-center justify-center backdrop-blur-md transition-colors',
                  isSaved
                    ? 'bg-fjord-hover text-white dark:bg-surface-subtle'
                    : 'bg-white/20 text-white hover:bg-white/40',
                )}
                title="Save"
              >
                <Heart className={cn('size-4', isSaved && 'fill-current')} />
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
              <span className="text-xs font-semibold tracking-widest text-fjord uppercase dark:text-muted">
                {property.community}
              </span>
              <span className="size-1 rounded-none bg-border" />
              <span className="text-xs font-medium tracking-widest text-muted uppercase dark:text-muted">
                Penthouse
              </span>
            </div>
            <h1 className="mb-2 font-display text-4xl leading-tight font-bold text-fjord sm:text-5xl dark:text-white">
              {property.title}
            </h1>
            <p className="font-display text-2xl text-text">
              AED {property.price.toLocaleString()}
            </p>
            <div className="mt-4 border-t border-border/40 pt-4 dark:border-border/40">
              <AvatarStack
                avatars={[
                  {
                    id: '1',
                    name: 'Zayed Al Maktoum',
                    role: 'DLD Senior Escrow Auditor',
                    status: 'verified',
                  },
                  {
                    id: '2',
                    name: 'Elena Rostova',
                    role: 'Nordic Architecture Lead',
                    status: 'verified',
                  },
                  {
                    id: '3',
                    name: 'Tariq Mansoor',
                    role: 'Legal Compliance Advisor',
                    status: 'online',
                  },
                  {
                    id: '4',
                    name: 'Sara Chen',
                    role: 'Co-investor Analyst',
                    status: 'online',
                  },
                  {
                    id: '5',
                    name: 'Marcus Vance',
                    role: 'Valuation Expert',
                    status: 'offline',
                  },
                  {
                    id: '6',
                    name: 'Amira Hassan',
                    role: 'Title Deed Specialist',
                    status: 'verified',
                  },
                ]}
                label="Verified Escrow Auditors & Co-investors viewing this unit"
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8 flex gap-8 border-b border-border dark:border-border">
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
                    ? 'border-border text-fjord dark:border-border dark:text-white'
                    : 'border-transparent text-muted hover:text-fjord dark:text-muted',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-75">
            {activeTab === 'overview' && (
              <div className="animate-in fade-in space-y-8 duration-300">
                <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted dark:text-muted">
                      Bedrooms
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-bold text-fjord dark:text-white">
                      <BedDouble className="size-4" /> {property.beds}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted dark:text-muted">
                      Bathrooms
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-bold text-fjord dark:text-white">
                      <Bath className="size-4" /> {property.baths}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted dark:text-muted">
                      Size
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-bold text-fjord dark:text-white">
                      <Maximize2 className="size-4" />{' '}
                      {property.sqft.toLocaleString()} sqft
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted dark:text-muted">
                      Developer
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-bold text-fjord dark:text-white">
                      <Building className="size-4" /> Emaar
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
                    escrow records with zero pending developer disputes or
                    service charge arrears.
                  </p>
                </div>
              </div>
            )}
            {activeTab === 'inspection' && (
              <div className="animate-in fade-in space-y-8 duration-300">
                <div className="rounded-none border border-border/60 bg-surface-subtle p-6 dark:border-border/60 dark:bg-fjord-hover">
                  <h3 className="mb-2 font-display text-lg font-bold text-fjord dark:text-white">
                    3D Render vs. Real Construction Progress
                  </h3>
                  <p className="mb-6 text-sm text-text">
                    Use our interactive Kibo UI before/after slider to compare
                    architectural master plan renders with real-time verified
                    construction site photos from DLD escrow audits.
                  </p>
                  <div className="aspect-video w-full">
                    <Comparison
                      beforeLabel="3D Architectural Render"
                      afterLabel="DLD Verified Construction"
                      beforeImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                      afterImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                      className="size-full shadow-lg"
                    />
                  </div>
                </div>

                <div className="rounded-none border border-border/60 bg-surface-subtle p-6 dark:border-border/60 dark:bg-fjord-hover">
                  <h3 className="mb-2 font-display text-lg font-bold text-fjord dark:text-white">
                    High-Resolution Master Layout & Floor Plan
                  </h3>
                  <p className="mb-6 text-sm text-text">
                    Hover to zoom or click the maximize button to inspect
                    architectural blueprints, unit dimensions, and private
                    elevator access in full screen.
                  </p>
                  <div className="aspect-video w-full">
                    <ImageZoom
                      src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
                      alt="DLD Verified Floor Plan"
                      badge="DLD Verified Escrow Layout"
                      caption="Penthouse Level 42 • Master Layout & Private Elevator Access"
                      className="size-full shadow-lg"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'location' && (
              <div className="animate-in fade-in rounded-none border border-border bg-surface p-6 duration-300 dark:border-border dark:bg-fjord-hover">
                <div className="mb-4 flex items-center gap-2 font-bold text-fjord dark:text-white">
                  <MapPin className="size-5 text-fjord dark:text-muted" />
                  {property.community} Neighborhood
                </div>
                <p className="text-sm leading-relaxed text-text">
                  A premium waterfront community offering an integrated
                  lifestyle with retail, dining, and leisure options. Excellent
                  connectivity to Sheikh Zayed Road and walking distance to the
                  Marina Promenade.
                </p>
              </div>
            )}
            {activeTab === 'dld' && (
              <div className="animate-in fade-in space-y-8 duration-300">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex items-center justify-between rounded-none border border-border bg-surface p-4 dark:border-border dark:bg-fjord-hover">
                    <span className="text-sm font-medium text-text">
                      Title Deed Verified
                    </span>
                    <CheckCircle2 className="size-5 text-fjord dark:text-muted" />
                  </div>
                  <div className="flex items-center justify-between rounded-none border border-border bg-surface p-4 dark:border-border dark:bg-fjord-hover">
                    <span className="text-sm font-medium text-text">
                      No Active Disputes
                    </span>
                    <CheckCircle2 className="size-5 text-fjord dark:text-muted" />
                  </div>
                  <div className="flex items-center justify-between rounded-none border border-border bg-surface p-4 dark:border-border dark:bg-fjord-hover">
                    <span className="text-sm font-medium text-text">
                      Developer Escrow Active
                    </span>
                    <CheckCircle2 className="size-5 text-fjord dark:text-muted" />
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
            <div className="rounded-none border border-border bg-surface p-6 shadow-sm dark:border-border dark:bg-fjord-hover">
              <Button
                size="lg"
                className="mb-3 w-full bg-fjord-hover text-white hover:bg-surface-subtle dark:bg-surface-subtle dark:bg-surface-subtle"
                onClick={() => setIsSaved(true)}
              >
                Add to Shortlist
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-surface text-fjord hover:bg-surface-subtle dark:bg-fjord-hover dark:bg-fjord-hover dark:text-white"
              >
                Schedule Viewing
              </Button>
            </div>

            {/* Evidence Notes */}
            <div className="rounded-none border border-border bg-surface p-6 shadow-sm dark:border-border dark:bg-fjord-hover">
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-fjord dark:text-white">
                <FileText className="size-5 text-muted dark:text-muted" />
                Your Evidence Notes
              </h3>
              <textarea
                placeholder="Capture your thoughts, trade-offs, and observations here..."
                className="min-h-30 w-full resize-none rounded-none border border-border bg-surface p-4 text-sm text-fjord placeholder:text-muted focus:border-border focus:ring-1 focus:ring-stone-900 focus:outline-none dark:border-border dark:bg-fjord-hover dark:text-muted"
              />
              <div className="mt-4 border-t border-border pt-4 dark:border-border">
                <h4 className="mb-3 text-xs font-bold tracking-widest text-muted uppercase dark:text-muted">
                  Open Questions
                </h4>
                <button className="flex w-full items-center gap-2 rounded-none border border-dashed border-border bg-surface p-3 text-sm font-medium text-muted transition-colors hover:border-border/50 hover:bg-surface-subtle hover:text-fjord dark:border-border/50 dark:border-border dark:bg-surface-subtle dark:bg-fjord-hover dark:text-muted dark:text-muted">
                  <MessageSquarePlus className="size-4" />
                  Add question for broker
                </button>
              </div>
            </div>

            {/* ROI Estimate */}
            <div className="rounded-none border border-border/80 bg-fjord-hover p-6 text-white shadow-sm dark:border-border/80 dark:bg-surface">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h4 className="font-display text-lg">Projected ROI</h4>
                  <p className="text-xs text-white/70">Annual Estimate</p>
                </div>
                <div className="rounded-none bg-surface-subtle/20 px-2 py-1 text-[10px] font-bold tracking-widest text-fjord uppercase dark:bg-surface-subtle/20 dark:text-muted">
                  High Potential
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">
                    {(property.trustPassport.healthScore > 90
                      ? 6.4
                      : 5.8
                    ).toFixed(1)}
                    %
                  </p>
                  <p className="text-[10px] tracking-tighter text-white/70 uppercase">
                    Net Yield
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    AED {((property.price * 0.064) / 1000).toFixed(0)}k
                  </p>
                  <p className="text-[10px] tracking-tighter text-white/70 uppercase">
                    Gross Rent/yr
                  </p>
                </div>
              </div>
            </div>

            {/* Expert Signal */}
            {!isVerified && (
              <div className="flex gap-4 rounded-none border border-border bg-surface-subtle p-4 dark:border-border dark:bg-fjord-hover">
                <AlertCircle className="shrink-0 text-xl text-review" />
                <div>
                  <p className="text-xs font-semibold text-fjord dark:text-white">
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
      <section className="mt-24 space-y-8 border-t border-border pt-12 dark:border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold text-fjord dark:text-white">
            Benchmark Properties
          </h2>
          <button className="flex items-center gap-2 text-sm font-semibold text-fjord transition-all hover:gap-3 dark:text-muted">
            Compare All <ArrowRight className="size-4" />
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
              className="group overflow-hidden rounded-none border border-border bg-surface dark:border-border dark:bg-fjord-hover"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={benchmark.img}
                  alt={benchmark.title}
                  className="group- size-full object-cover transition-transform"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-none bg-surface/90 px-2 py-1 text-[10px] font-bold text-fjord shadow-sm backdrop-blur dark:bg-fjord-hover/90 dark:text-white">
                    AED {benchmark.price}
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-4">
                <h3 className="font-medium text-fjord dark:text-white">
                  {benchmark.title}
                </h3>
                <p className="text-xs text-muted dark:text-muted">
                  {benchmark.specs}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  {benchmark.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-none border border-border bg-surface-subtle px-2 py-0.5 text-[10px] font-medium text-muted dark:border-border dark:bg-fjord-hover dark:text-muted"
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
