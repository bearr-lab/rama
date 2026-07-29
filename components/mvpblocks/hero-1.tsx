"use client";

import React from "react";
import { ArrowRight, TrendingUp, ShieldCheck, Building2 } from "lucide-react";
import Link from "next/link";

import { useParams } from "next/navigation";

const STATS = [
  { label: "Active Listings", value: "2,400+" },
  { label: "Verified Developers", value: "84" },
  { label: "AED Transaction Volume", value: "62B+" },
];

export default function Hero1() {
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <div className="relative w-full bg-background overflow-hidden">
      {/* Radial ambient glow — adapted from MVPBlocks */}
      <div className="absolute top-0 z-0 h-full w-full bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(77,120,160,0.25),transparent)]" />

      {/* Animated perspective grid — core MVPBlocks concept, Lagom-ified */}
      <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-30 [perspective:200px] z-0">
        <div className="absolute inset-0 [transform:rotateX(35deg)]">
          <div
            className="animate-grid [inset:0%_0px] [margin-left:-50%] [height:300vh] [width:600vw] [transform-origin:100%_0_0]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--border) 1px, transparent 0), linear-gradient(to bottom, var(--border) 1px, transparent 0)",
              backgroundSize: "80px 80px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-80%" />
      </div>

      <section className="relative z-10 mx-auto max-w-screen-xl px-6 py-40 md:px-10">
        {/* Badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 border border-border bg-secondary/50 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-muted-foreground uppercase backdrop-blur-md rounded-none">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            <span>Dubai Real Estate Platform</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mx-auto max-w-4xl text-center space-y-6 mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.05]">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
              Invest in Dubai&apos;s
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-primary/60">
              Future Skyline
            </span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            AI-powered real estate intelligence. RERA-verified listings.
            Institutional-grade analytics for the world&apos;s most dynamic property market.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          {/* Primary CTA */}
          <Link
            href={`/${locale}/homes`}
            className="group inline-flex items-center gap-2 bg-primary px-6 py-2.5 text-[11px] font-bold text-primary-foreground uppercase tracking-widest hover:bg-primary/90 transition-colors duration-200 rounded-none"
          >
            Explore
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href={`/${locale}/invest`}
            className="group inline-flex items-center gap-2 border border-border bg-secondary/50 px-6 py-2.5 text-[11px] font-bold text-foreground uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-colors duration-200 rounded-none backdrop-blur-md"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Invest
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> RERA Verified
          </span>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> DLD Registered
          </span>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Escrow Protected
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 divide-x divide-border border border-border bg-secondary/30 backdrop-blur-md max-w-2xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-5 text-center">
              <p className="font-mono text-2xl font-bold text-foreground mb-1">{s.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
