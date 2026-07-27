"use client";

import React from "react";
import { ArrowRight, TrendingUp, ShieldCheck, Building2 } from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Active Listings", value: "2,400+" },
  { label: "Verified Developers", value: "84" },
  { label: "AED Transaction Volume", value: "62B+" },
];

export default function Hero1() {
  return (
    <div className="relative w-full bg-ink overflow-hidden">
      {/* Radial ambient glow — adapted from MVPBlocks */}
      <div className="absolute top-0 z-0 h-full w-full bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(77,120,160,0.25),rgba(0,0,0,0))]" />

      {/* Animated perspective grid — core MVPBlocks concept, Lagom-ified */}
      <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-30 [perspective:200px] z-0">
        <div className="absolute inset-0 [transform:rotateX(35deg)]">
          <div
            className="animate-grid [inset:0%_0px] [margin-left:-50%] [height:300vh] [width:600vw] [transform-origin:100%_0_0]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 0), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 0)",
              backgroundSize: "80px 80px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent to-80%" />
      </div>

      <section className="relative z-10 mx-auto max-w-screen-xl px-6 py-40 md:px-10">
        {/* Badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-white/60 uppercase backdrop-blur-md rounded-none">
            <Building2 className="h-3.5 w-3.5 text-fjord" />
            <span>Dubai Real Estate Platform</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mx-auto max-w-4xl text-center space-y-6 mb-12">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.05]">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.55) 100%)",
              }}
            >
              Invest in Dubai's
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #7FB5DC 0%, #4D78A0 50%, #2A4D6E 100%)",
              }}
            >
              Future Skyline
            </span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            AI-powered real estate intelligence. RERA-verified listings.
            Institutional-grade analytics for the world's most dynamic property market.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          {/* Primary CTA */}
          <Link
            href="/en/homes"
            className="group inline-flex items-center gap-2 bg-fjord px-6 py-2.5 text-[11px] font-bold text-white uppercase tracking-widest hover:bg-fjord/90 transition-colors duration-200 rounded-none"
          >
            Explore
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/en/invest"
            className="group inline-flex items-center gap-2 border border-white/20 bg-white/5 px-6 py-2.5 text-[11px] font-bold text-white/80 uppercase tracking-widest hover:border-fjord/50 hover:text-white transition-colors duration-200 rounded-none backdrop-blur-md"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Invest
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 text-xs font-semibold tracking-wider text-white/40 uppercase">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> RERA Verified
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/10" />
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> DLD Registered
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/10" />
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> Escrow Protected
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 divide-x divide-white/10 border border-white/10 bg-white/5 backdrop-blur-md max-w-2xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-5 text-center">
              <p className="font-mono text-2xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
