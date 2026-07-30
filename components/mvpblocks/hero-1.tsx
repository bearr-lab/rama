"use client";

import React from "react";
import { ArrowRight, TrendingUp, ShieldCheck, Building2 } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

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
    <div className="relative w-full overflow-hidden bg-background">
      {/* Radial ambient glow — adapted from MVPBlocks */}
      <div className="absolute top-0 z-0 size-full bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(77,120,160,0.25),transparent)]" />

      {/* Animated perspective grid — core MVPBlocks concept, Lagom-ified */}
      <div className="pointer-events-none absolute z-0 size-full overflow-hidden opacity-30 perspective-[200px]">
        <div className="absolute inset-0 transform-[rotateX(35deg)]">
          <div
            className="animate-grid inset-[0%_0px] ml-[-50%] h-[300vh] w-[600vw] origin-[100%_0_0]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--border) 1px, transparent 0), linear-gradient(to bottom, var(--border) 1px, transparent 0)",
              backgroundSize: "80px 80px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-background to-transparent to-80%" />
      </div>

      <Container className="relative z-10 py-40">
        {/* Badge */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-none border border-border bg-secondary/50 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-muted-foreground uppercase backdrop-blur-md">
            <Building2 className="size-3.5 text-primary" />
            <span>Dubai Real Estate Platform</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mx-auto mb-12 max-w-4xl space-y-6 text-center">
          <h1 className="leading-1.05 font-display text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Invest in Dubai&apos;s
            </span>
            <br />
            <span className="bg-linear-to-br from-primary via-primary to-primary/60 bg-clip-text text-transparent">
              Future Skyline
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-muted-foreground md:text-xl">
            AI-powered real estate intelligence. RERA-verified listings.
            Institutional-grade analytics for the world&apos;s most dynamic property market.
          </p>
        </div>

        {/* CTAs */}
        <div className="mb-20 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* Primary CTA */}
          <Link
            href={`/${locale}/homes`}
            className={buttonVariants({
              size: "lg",
              className: "group rounded-none text-[11px] font-bold tracking-widest uppercase",
            })}
          >
            Explore
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href={`/${locale}/invest`}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "group rounded-none bg-secondary/50 text-[11px] font-bold tracking-widest uppercase backdrop-blur-md",
            })}
          >
            <TrendingUp className="size-3.5" />
            Invest
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mb-20 flex flex-col items-center justify-center gap-6 text-xs font-semibold tracking-wider text-muted-foreground uppercase sm:flex-row">
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-500" /> RERA Verified
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-500" /> DLD Registered
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-500" /> Escrow Protected
          </span>
        </div>

        {/* Stats Row */}
        <div className="mx-auto grid max-w-2xl grid-cols-3 divide-x divide-border border border-border bg-secondary/30 backdrop-blur-md">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-5 text-center">
              <p className="mb-1 font-mono text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
