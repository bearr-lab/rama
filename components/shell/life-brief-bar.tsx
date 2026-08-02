'use client';

import * as React from 'react';
import {
  Sparkles,
  Target,
  Compass,
  Users,
  DollarSign,
  Check,
  ChevronRight,
  Sliders,
  ShieldAlert,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LifeBriefConfig {
  persona: string;
  budgetAed: number;
  targetCommunity: string;
  primaryGoal: string;
  minYield: number;
}

const DEFAULT_BRIEF: LifeBriefConfig = {
  persona: 'Expat Executive Family',
  budgetAed: 15000000,
  targetCommunity: 'Downtown Dubai',
  primaryGoal: 'Primary Residence & British Curriculum Schools',
  minYield: 6.5,
};

const PERSONAS = [
  {
    id: 'expat_family',
    title: 'Expat Executive Family',
    desc: 'Moving to Dubai • Needs schools, walkability & park proximity.',
    community: 'Downtown Dubai',
    budget: 15000000,
    goal: 'Primary Residence & British Curriculum Schools',
    yield: 6.0,
  },
  {
    id: 'yield_investor',
    title: 'Yield & Cashflow Investor',
    desc: 'High net rental return • Verified DLD Escrow & 0 maintenance dues.',
    community: 'Dubai Marina',
    budget: 5000000,
    goal: 'Maximum Net ROI & Tenant Stability',
    yield: 7.8,
  },
  {
    id: 'uhnw_trophy',
    title: 'UHNW Trophy Asset Buyer',
    desc: 'Private beach, penthouse skyline views & capital preservation.',
    community: 'Palm Jumeirah',
    budget: 25000000,
    goal: 'Trophy Asset & Capital Preservation',
    yield: 5.5,
  },
];

export function LifeBriefBar() {
  const [brief, setBrief] = React.useState<LifeBriefConfig>(DEFAULT_BRIEF);
  const [isOpen, setIsOpen] = React.useState(false);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('rama_life_brief');
      if (saved) {
        setBrief(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const handleSelectPersona = (p: (typeof PERSONAS)[0]) => {
    const newBrief = {
      persona: p.title,
      budgetAed: p.budget,
      targetCommunity: p.community,
      primaryGoal: p.goal,
      minYield: p.yield,
    };
    setBrief(newBrief);
    localStorage.setItem('rama_life_brief', JSON.stringify(newBrief));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-none border border-border/80 bg-surface shadow-2xs transition-all duration-300">
      {/* Top Banner (Always Visible) */}
      <div className="flex flex-col justify-between gap-4 bg-gradient-to-r from-canvas via-surface to-fjord-soft/30 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-center gap-3.5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-none border border-fjord/20 bg-fjord-soft text-fjord shadow-2xs">
            <Target className="size-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-body font-display font-bold text-ink">
                Active Life Brief & Buyer Goal Engine
              </h3>
              <span className="rounded-none border border-fjord/20 bg-fjord-soft px-2 py-0.5 text-[10px] font-bold tracking-wider text-fjord uppercase">
                Personalized for your goals
              </span>
            </div>
            <p className="text-caption mt-0.5 text-muted-foreground">
              <strong>{brief.persona}</strong> • Budget: AED{' '}
              {(brief.budgetAed / 1000000).toFixed(1)}M • Target:{' '}
              {brief.targetCommunity}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="animate-in fade-in flex items-center gap-1.5 rounded-none bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-500 duration-200">
              <Check className="size-4" />
              <span>Life Brief Synced</span>
            </span>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-body-sm hover:border-border-strong flex shrink-0 items-center gap-2 rounded-none border border-border/80 bg-surface px-4 py-2.5 font-semibold text-ink shadow-2xs transition-all hover:bg-surface-subtle"
          >
            <Sliders className="size-4 text-fjord" />
            <span>{isOpen ? 'Close Goal Engine' : 'Configure Life Brief'}</span>
          </button>
        </div>
      </div>

      {/* Expandable Configuration Drawer */}
      {isOpen && (
        <div className="animate-in slide-in-from-top-2 space-y-6 border-t border-border bg-surface-subtle p-6 duration-300">
          <div>
            <h4 className="text-body-sm mb-1 font-bold text-ink">
              1. Select Your Investment Persona & Core Objective
            </h4>
            <p className="text-caption mb-4 text-muted-foreground">
              RAMA uses your Life Brief to dynamically bias trust scoring, AI
              advisor recommendations, and geospatial community ranking.
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {PERSONAS.map((p) => {
                const isSelected = brief.persona === p.title;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPersona(p)}
                    className={cn(
                      'relative flex flex-col justify-between gap-2 rounded-none border p-4 text-left transition-all duration-200',
                      isSelected
                        ? 'border-fjord bg-surface shadow-md ring-2 ring-fjord/20'
                        : 'border-border/80 bg-surface/60 hover:border-fjord/40 hover:bg-surface hover:shadow-xs',
                    )}
                  >
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-body-sm font-bold text-ink">
                          {p.title}
                        </span>
                        {isSelected && (
                          <span className="size-2 shrink-0 rounded-none bg-sky-500" />
                        )}
                      </div>
                      <p className="text-caption leading-relaxed text-muted-foreground">
                        {p.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-border/50 pt-2 font-mono text-[11px] text-muted-foreground">
                      <span>{p.community}</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {p.yield}%+ Yield
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-caption flex flex-col items-center justify-between gap-4 rounded-none border border-sky-500/20 bg-gradient-to-r from-sky-500/10 via-purple-500/5 to-transparent p-4 text-ink sm:flex-row">
            <div className="flex items-center gap-2.5">
              <Award className="size-5 shrink-0 text-sky-500" />
              <span>
                <strong>AI Alignment Engine:</strong> Your Life Brief is
                currently scoring all listings in{' '}
                <strong>{brief.targetCommunity}</strong> with a +15% relevance
                boost for <strong>{brief.primaryGoal}</strong>.
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="shrink-0 rounded-none bg-fjord px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-fjord-hover"
            >
              Apply to Workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
