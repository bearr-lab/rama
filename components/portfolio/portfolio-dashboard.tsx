'use client';

import * as React from 'react';
import {
  Building2,
  TrendingUp,
  Wallet,
  Wrench,
  Users,
  Plus,
  Download,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  PieChart,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Ticker } from '@/components/kibo/ticker';
import { ContributionGraph } from '@/components/kibo/contribution-graph';
import { Marquee, PartnerCard } from '@/components/kibo/marquee';

interface OwnedAsset {
  id: string;
  title: string;
  community: string;
  purchasePrice: number;
  currentValue: number;
  monthlyRent: number;
  netYield: number;
  tenantStatus: 'occupied' | 'vacant' | 'renewal';
  leaseEnd: string;
}

interface MaintenanceTicket {
  id: string;
  property: string;
  issue: string;
  status: 'scheduled' | 'in_progress' | 'resolved';
  cost: number;
  date: string;
}

const DEFAULT_ASSETS: OwnedAsset[] = [
  {
    id: 'prop-1',
    title: 'Sky Collection Penthouse',
    community: 'Downtown Dubai',
    purchasePrice: 16000000,
    currentValue: 18500000,
    monthlyRent: 104000,
    netYield: 6.8,
    tenantStatus: 'occupied',
    leaseEnd: 'October 14, 2027',
  },
  {
    id: 'prop-2',
    title: 'Marina Gate Residence 1',
    community: 'Dubai Marina',
    purchasePrice: 2850000,
    currentValue: 3450000,
    monthlyRent: 21500,
    netYield: 7.5,
    tenantStatus: 'renewal',
    leaseEnd: 'In 45 Days (Sept 2026)',
  },
  {
    id: 'prop-6',
    title: 'Creek Horizon Tower A',
    community: 'Dubai Creek Harbour',
    purchasePrice: 2400000,
    currentValue: 2900000,
    monthlyRent: 18500,
    netYield: 7.7,
    tenantStatus: 'occupied',
    leaseEnd: 'March 30, 2027',
  },
];

const DEFAULT_TICKETS: MaintenanceTicket[] = [
  {
    id: 't-1',
    property: 'Marina Gate Residence 1',
    issue: 'AC Chiller & Duct Annual Servicing (Empower)',
    status: 'scheduled',
    cost: 1850,
    date: 'August 5, 2026',
  },
  {
    id: 't-2',
    property: 'Sky Collection Penthouse',
    issue: 'Smart Home KNX Automation Firmware Audit',
    status: 'resolved',
    cost: 1200,
    date: 'July 12, 2026',
  },
];

export function PortfolioDashboard() {
  const [assets, setAssets] = React.useState<OwnedAsset[]>(DEFAULT_ASSETS);
  const [tickets, setTickets] =
    React.useState<MaintenanceTicket[]>(DEFAULT_TICKETS);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load from localStorage on client mount to prevent SSR hydration mismatch
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAssets = localStorage.getItem('rama_v2_portfolio_assets');
      if (savedAssets) {
        try {
          const parsed = JSON.parse(savedAssets);
          if (Array.isArray(parsed) && parsed.length > 0) setAssets(parsed);
        } catch {}
      }

      const savedTickets = localStorage.getItem('rama_v2_portfolio_tickets');
      if (savedTickets) {
        try {
          const parsed = JSON.parse(savedTickets);
          if (Array.isArray(parsed) && parsed.length > 0) setTickets(parsed);
        } catch {}
      }
      setIsLoaded(true);
    }
  }, []);

  const [activeTab, setActiveTab] = React.useState<
    'assets' | 'maintenance' | 'analytics'
  >('assets');
  const [isLogOpen, setIsLogOpen] = React.useState(false);
  const [newIssue, setNewIssue] = React.useState('');
  const [newTargetProp, setNewTargetProp] = React.useState(
    DEFAULT_ASSETS[0].title,
  );
  const [newCost, setNewCost] = React.useState(1500);

  // Save to localStorage on changes
  React.useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('rama_v2_portfolio_assets', JSON.stringify(assets));
      localStorage.setItem(
        'rama_v2_portfolio_tickets',
        JSON.stringify(tickets),
      );
    }
  }, [assets, tickets, isLoaded]);

  // Aggregate Metrics
  const totalValuation = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const totalPurchase = assets.reduce((sum, a) => sum + a.purchasePrice, 0);
  const totalCapitalGain = totalValuation - totalPurchase;
  const monthlyCashflow = assets.reduce((sum, a) => sum + a.monthlyRent, 0);
  const avgYield = (
    assets.reduce((sum, a) => sum + a.netYield, 0) / (assets.length || 1)
  ).toFixed(2);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIssue.trim()) return;

    const t: MaintenanceTicket = {
      id: `t-${Date.now()}`,
      property: newTargetProp,
      issue: newIssue,
      status: 'scheduled',
      cost: Number(newCost),
      date: 'Scheduled (Upcoming)',
    };

    setTickets((prev) => [t, ...prev]);
    setNewIssue('');
    setIsLogOpen(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Executive KPIs Bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="shadow-subtle group relative space-y-2 overflow-hidden rounded-3xl border border-border bg-surface p-5">
          <div className="text-caption flex items-center justify-between font-extrabold tracking-wider text-muted uppercase">
            <span>Total Asset Value</span>
            <Building2 className="size-4 text-fjord" />
          </div>
          <div className="text-display-sm font-mono font-extrabold text-fjord">
            <Ticker
              value={totalValuation / 1000000}
              prefix="AED "
              suffix="M"
              decimals={2}
            />
          </div>
          <div className="text-caption flex items-center gap-1.5 font-semibold text-emerald-500">
            <TrendingUp className="size-3.5" />
            <span>
              +AED {(totalCapitalGain / 1000000).toFixed(2)}M Capital Gain (+
              {Math.round((totalCapitalGain / totalPurchase) * 100)}%)
            </span>
          </div>
        </div>

        <div className="shadow-subtle group relative space-y-2 overflow-hidden rounded-3xl border border-border bg-surface p-5">
          <div className="text-caption flex items-center justify-between font-extrabold tracking-wider text-muted uppercase">
            <span>Monthly Rental Cashflow</span>
            <Wallet className="size-4 text-emerald-500" />
          </div>
          <div className="text-display-sm font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
            <Ticker value={monthlyCashflow} prefix="AED " decimals={0} />
          </div>
          <p className="text-caption text-muted">
            Net after service charges & DLD fees
          </p>
        </div>

        <div className="shadow-subtle group relative space-y-2 overflow-hidden rounded-3xl border border-border bg-surface p-5">
          <div className="text-caption flex items-center justify-between font-extrabold tracking-wider text-muted uppercase">
            <span>Average Net Yield</span>
            <PieChart className="size-4 text-sky-500" />
          </div>
          <div className="text-display-sm font-mono font-extrabold text-sky-500">
            <Ticker value={Number(avgYield)} suffix="%" decimals={2} />
          </div>
          <p className="text-caption text-muted">
            Outperforming Dubai macro average by 1.2%
          </p>
        </div>

        <div className="shadow-subtle group relative space-y-2 overflow-hidden rounded-3xl border border-border bg-surface p-5">
          <div className="text-caption flex items-center justify-between font-extrabold tracking-wider text-muted uppercase">
            <span>Occupancy & Leases</span>
            <Users className="size-4 text-purple-500" />
          </div>
          <div className="text-display-sm font-display font-extrabold text-fjord">
            100%{' '}
            <span className="text-body-sm font-sans font-bold text-muted">
              (3/3 Units)
            </span>
          </div>
          <div className="text-caption flex items-center gap-1.5 font-semibold text-amber-500">
            <AlertTriangle className="size-3.5" />
            <span>1 Lease renewal due in 45 days</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-0 sm:flex-row sm:items-center">
        <div className="-mb-px flex items-center gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('assets')}
            className={cn(
              'text-body-sm flex shrink-0 items-center gap-2 border-b-2 py-3 font-bold transition-all',
              activeTab === 'assets'
                ? 'border-fjord text-fjord'
                : 'border-transparent text-muted hover:border-border hover:text-fjord',
            )}
          >
            <Building2 className="size-4" />
            <span>Owned Assets</span>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-extrabold',
                activeTab === 'assets'
                  ? 'bg-fjord/10 text-fjord'
                  : 'bg-surface-subtle text-muted',
              )}
            >
              {assets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('maintenance')}
            className={cn(
              'text-body-sm flex shrink-0 items-center gap-2 border-b-2 py-3 font-bold transition-all',
              activeTab === 'maintenance'
                ? 'border-fjord text-fjord'
                : 'border-transparent text-muted hover:border-border hover:text-fjord',
            )}
          >
            <Wrench className="size-4" />
            <span>Maintenance & Operations</span>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-extrabold',
                activeTab === 'maintenance'
                  ? 'bg-fjord/10 text-fjord'
                  : 'bg-surface-subtle text-muted',
              )}
            >
              {tickets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={cn(
              'text-body-sm flex shrink-0 items-center gap-2 border-b-2 py-3 font-bold transition-all',
              activeTab === 'analytics'
                ? 'border-fjord text-fjord'
                : 'border-transparent text-muted hover:border-border hover:text-fjord',
            )}
          >
            <TrendingUp className="size-4" />
            <span>Tax & Cashflow Analytics</span>
          </button>
        </div>

        <div className="flex items-center gap-3 pb-3 sm:pb-0">
          <button
            onClick={() =>
              alert(
                `Generating PDF Annual Cashflow & Tax Compliance Statement...`,
              )
            }
            className="text-body-sm flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 font-bold text-fjord shadow-2xs transition-colors hover:bg-surface-subtle"
          >
            <Download className="size-4 text-muted" />
            <span>Export Financial Report</span>
          </button>

          {activeTab === 'maintenance' && (
            <button
              onClick={() => setIsLogOpen(true)}
              className="text-body-sm flex items-center gap-2 rounded-xl bg-fjord px-5 py-2.5 font-bold text-white shadow-sm transition-all hover:bg-fjord-hover"
            >
              <Plus className="size-4" />
              <span>Log Maintenance Ticket</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: ASSETS TABLE */}
      {activeTab === 'assets' && (
        <div className="shadow-subtle animate-in fade-in overflow-hidden rounded-3xl border border-border bg-surface duration-200">
          <div className="flex items-center justify-between border-b border-border bg-surface-subtle/50 p-6">
            <div>
              <h3 className="text-h3 font-display font-bold text-fjord">
                Asset Roster & Valuation Register
              </h3>
              <p className="text-caption text-muted">
                Real-time valuation synchronization with DLD transfer feeds
              </p>
            </div>
            <span className="text-caption rounded-full bg-emerald-500/10 px-3 py-1 font-extrabold text-emerald-500">
              Escrow Synchronized
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-175 border-collapse text-left">
              <thead>
                <tr className="text-caption border-b border-border bg-surface-subtle font-bold tracking-wider text-muted uppercase">
                  <th className="p-4 pl-6 text-left">Property / Location</th>
                  <th className="p-4 text-right">Current Valuation</th>
                  <th className="p-4 text-right">Monthly Rent</th>
                  <th className="p-4 text-right">Net Yield</th>
                  <th className="p-4 text-left">Tenant Occupancy</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {assets.map((asset) => {
                  const gain = asset.currentValue - asset.purchasePrice;
                  const gainPct = Math.round(
                    (gain / asset.purchasePrice) * 100,
                  );
                  return (
                    <tr
                      key={asset.id}
                      className="transition-colors hover:bg-surface-subtle/50"
                    >
                      <td className="p-4 pl-6 text-left">
                        <span className="text-body-sm block font-extrabold text-fjord">
                          {asset.title}
                        </span>
                        <span className="text-caption text-muted">
                          {asset.community}
                        </span>
                      </td>
                      <td className="p-4 text-right tabular-nums">
                        <span className="text-body-sm block font-mono font-bold text-fjord">
                          AED {asset.currentValue.toLocaleString()}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-500">
                          +{gainPct}% since purchase
                        </span>
                      </td>
                      <td className="text-body-sm p-4 text-right font-mono font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                        AED {asset.monthlyRent.toLocaleString()} /mo
                      </td>
                      <td className="p-4 text-right tabular-nums">
                        <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                          {asset.netYield}%
                        </span>
                      </td>
                      <td className="p-4 text-left">
                        <div className="flex flex-col">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1 text-xs font-bold capitalize',
                              asset.tenantStatus === 'occupied'
                                ? 'text-emerald-500'
                                : 'text-amber-500',
                            )}
                          >
                            <span
                              className={cn(
                                'size-2 shrink-0 rounded-full',
                                asset.tenantStatus === 'occupied'
                                  ? 'bg-emerald-500'
                                  : 'animate-pulse bg-amber-500',
                              )}
                            />
                            {asset.tenantStatus === 'occupied'
                              ? '100% Leased'
                              : 'Renewal Pending'}
                          </span>
                          <span className="text-[11px] text-muted">
                            {asset.leaseEnd}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <Link
                          href={`/en/property/${asset.id}`}
                          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-transparent px-3 text-xs font-bold text-fjord transition-all hover:border-fjord hover:bg-fjord/5 hover:text-fjord"
                        >
                          <span>Analyze</span>
                          <ExternalLink className="size-3.5 text-muted" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MAINTENANCE & OPERATIONS */}
      {activeTab === 'maintenance' && (
        <div className="animate-in fade-in space-y-6 duration-200">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="shadow-subtle flex flex-col justify-between space-y-4 rounded-3xl border border-border bg-surface p-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'rounded px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase',
                        t.status === 'scheduled' &&
                          'border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
                        t.status === 'resolved' &&
                          'border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                      )}
                    >
                      {t.status === 'scheduled'
                        ? 'Scheduled Servicing'
                        : 'Completed & Verified'}
                    </span>
                    <span className="text-caption font-mono text-muted">
                      {t.date}
                    </span>
                  </div>
                  <h4 className="text-body font-bold text-fjord">{t.issue}</h4>
                  <div className="text-caption flex items-center gap-1.5 text-muted">
                    <Building2 className="size-3.5 text-fjord" />
                    <span>{t.property}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <span className="block text-[10px] font-bold tracking-wider text-muted uppercase">
                      Estimated Cost
                    </span>
                    <span className="text-body-sm font-mono font-extrabold text-fjord">
                      AED {t.cost.toLocaleString()}
                    </span>
                  </div>
                  {t.status === 'scheduled' ? (
                    <button
                      onClick={() => {
                        setTickets((prev) =>
                          prev.map((item) =>
                            item.id === t.id
                              ? { ...item, status: 'resolved', date: 'Today' }
                              : item,
                          ),
                        );
                      }}
                      className="rounded-xl bg-emerald-500 px-4 py-1.5 text-xs font-extrabold text-fjord shadow-2xs transition-colors hover:bg-emerald-400"
                    >
                      Mark Completed
                    </button>
                  ) : (
                    <span className="text-caption flex items-center gap-1 font-bold text-emerald-500">
                      <CheckCircle2 className="size-4" /> Audit Cleared
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TAX & CASHFLOW ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="shadow-subtle animate-in fade-in space-y-6 rounded-3xl border border-border bg-surface p-6 duration-200 lg:p-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="text-h3 font-display font-bold text-fjord">
                Annual Financial Performance & Tax Ledger
              </h3>
              <p className="text-caption text-muted">
                Simulated accounting audit trail for Dubai freehold properties
              </p>
            </div>
            <span className="text-caption rounded-full bg-purple-500/10 px-3 py-1 font-bold text-purple-500">
              FY 2026 Projection
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-1 rounded-2xl border border-border bg-surface-subtle p-5">
              <span className="text-caption font-bold text-muted uppercase">
                Gross Annual Rental Income
              </span>
              <p className="text-h2 font-mono font-extrabold text-emerald-500">
                AED {(monthlyCashflow * 12).toLocaleString()}
              </p>
              <span className="block text-[11px] text-muted">
                100% collected via DLD Ejari electronic cheques
              </span>
            </div>

            <div className="space-y-1 rounded-2xl border border-border bg-surface-subtle p-5">
              <span className="text-caption font-bold text-muted uppercase">
                Total Annual Operating Expenses
              </span>
              <p className="text-h2 font-mono font-extrabold text-rose-500">
                AED 148,500
              </p>
              <span className="block text-[11px] text-muted">
                Includes master developer service charges & maintenance
              </span>
            </div>

            <div className="space-y-1 rounded-2xl border border-border bg-surface-subtle p-5">
              <span className="text-caption font-bold text-muted uppercase">
                Net Annual Cash Operating Income
              </span>
              <p className="text-h2 font-mono font-extrabold text-sky-500">
                AED {(monthlyCashflow * 12 - 148500).toLocaleString()}
              </p>
              <span className="block text-[11px] text-muted">
                Direct cash-on-cash yield available for reinvestment
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-sky-500/20 bg-linear-to-r from-sky-500/10 via-emerald-500/5 to-transparent p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 shrink-0 text-sky-500" />
              <div>
                <h4 className="text-body-sm font-bold text-fjord">
                  RAMA AI Tax & Structuring Advisor
                </h4>
                <p className="text-caption mt-0.5 leading-relaxed text-muted">
                  Under UAE Corporate Tax Law, individual freehold property
                  investment income is{' '}
                  <strong>exempt from corporate tax</strong> unless held within
                  a commercial operating entity exceeding AED 1M in non-exempt
                  revenue.
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                alert(
                  `Opening tax exemption certificate generator in Decision Lab...`,
                )
              }
              className="ml-4 shrink-0 rounded-xl bg-fjord px-5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-fjord-hover"
            >
              Verify Tax Exemption →
            </button>
          </div>

          {/* Kibo Contribution Graph (365-day heatmap) */}
          <ContributionGraph />

          {/* Kibo Marquee (Infinite scrolling partners & escrow banks) */}
          <div className="space-y-4 rounded-3xl border border-border/60 bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold tracking-widest text-fjord uppercase">
                  RERA Ecosystem & Escrow Network
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-fjord">
                  Verified Institutional Banking & Master Developer Partners
                </h3>
              </div>
            </div>
            <Marquee direction="left" speed="normal">
              <PartnerCard
                name="Emirates NBD"
                category="RERA Escrow Trustee Acct"
                badge="Direct Sync"
              />
              <PartnerCard
                name="Emaar Properties"
                category="Master Developer"
                badge="VIP Tier 1"
              />
              <PartnerCard
                name="First Abu Dhabi Bank"
                category="Mortgage & Escrow"
                badge="Verified"
              />
              <PartnerCard
                name="Nakheel"
                category="Waterfront Master Plan"
                badge="Direct Sync"
              />
              <PartnerCard
                name="Sobha Realty"
                category="Luxury Developer"
                badge="Escrow Active"
              />
              <PartnerCard
                name="Mashreq Bank"
                category="Institutional Treasury"
                badge="Direct Sync"
              />
              <PartnerCard
                name="Aldar"
                category="Regional Developer"
                badge="Verified"
              />
              <PartnerCard
                name="Dubai Land Dept"
                category="Blockchain Registry"
                badge="Government"
              />
            </Marquee>
          </div>
        </div>
      )}

      {/* Log Maintenance Ticket Modal */}
      {isLogOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-fjord/80 backdrop-blur-md p-4">
          <div className="animate-in zoom-in-95 relative w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-h3 font-display font-bold text-fjord">
                Log Maintenance Ticket
              </h3>
              <button
                onClick={() => setIsLogOpen(false)}
                className="text-caption font-bold text-muted hover:text-fjord"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="text-caption mb-1 block font-bold text-fjord">
                  Issue / Maintenance Required
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Water heater replacement in guest bathroom"
                  value={newIssue}
                  onChange={(e) => setNewIssue(e.target.value)}
                  className="text-body-sm w-full rounded-xl border border-border bg-surface-subtle px-4 py-2.5 text-fjord focus:ring-2 focus:ring-fjord focus:outline-none"
                />
              </div>

              <div>
                <label className="text-caption mb-1 block font-bold text-fjord">
                  Property
                </label>
                <select
                  value={newTargetProp}
                  onChange={(e) => setNewTargetProp(e.target.value)}
                  className="text-body-sm w-full rounded-xl border border-border bg-surface-subtle px-4 py-2.5 text-fjord focus:ring-2 focus:ring-fjord focus:outline-none"
                >
                  {assets.map((a) => (
                    <option key={a.id} value={a.title}>
                      {a.title} ({a.community})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-caption mb-1 block font-bold text-fjord">
                  Estimated Cost (AED)
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  max={50000}
                  step={100}
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className="text-body-sm w-full rounded-xl border border-border bg-surface-subtle px-4 py-2.5 font-mono text-fjord focus:ring-2 focus:ring-fjord focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setIsLogOpen(false)}
                  className="text-body-sm rounded-xl border border-border bg-surface px-5 py-2.5 font-bold text-muted hover:text-fjord"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-body-sm rounded-xl bg-fjord px-6 py-2.5 font-bold text-white shadow-sm hover:bg-fjord-hover"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
