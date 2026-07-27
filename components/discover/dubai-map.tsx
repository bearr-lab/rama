'use client';

import * as React from 'react';
import { DiscoverProperty } from '@/lib/discover/mock-properties';
import {
  ShieldCheck,
  ShieldAlert,
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DubaiMapProps {
  properties: DiscoverProperty[];
  selectedProperty: DiscoverProperty | null;
  onSelectProperty: (property: DiscoverProperty | null) => void;
  className?: string;
}

export function DubaiMap({
  properties,
  selectedProperty,
  onSelectProperty,
  className,
}: DubaiMapProps) {
  const [zoom, setZoom] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.3, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Format price compactly (e.g. 18.5M, 3.45M, 890K)
  const formatCompactPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`;
    }
    return `${Math.round(price / 1000)}K`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-full min-h-[500px] w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-canvas via-surface to-fjord/20 shadow-inner select-none',
        className,
      )}
    >
      {/* Coastline & Water Styling Background */}
      <div
        className="pointer-events-none absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: 'center center',
        }}
      >
        {/* Abstract SVG Dubai Coastline & Islands representation */}
        <svg
          className="h-full w-full opacity-25"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="water" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <pattern
              id="grid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.2"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#water)" />
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Dubai Coastline Curve */}
          <path
            d="M 0,85 Q 25,80 35,65 T 60,40 T 90,20 L 100,15 L 100,100 L 0,100 Z"
            fill="rgba(15, 23, 42, 0.6)"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="0.5"
          />

          {/* Palm Jumeirah Abstract Silhouette */}
          <g
            transform="translate(18, 52) scale(0.18)"
            fill="none"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="1.5"
          >
            <circle cx="20" cy="20" r="18" strokeDasharray="3,2" />
            <path d="M 20,40 L 20,5 M 10,35 C 10,25 20,15 20,10 C 20,15 30,25 30,35 M 5,28 C 10,20 20,12 20,10 C 20,12 30,20 35,28" />
          </g>

          {/* World Islands Abstract Grid */}
          <g
            transform="translate(42, 25) scale(0.12)"
            fill="rgba(56, 189, 248, 0.2)"
          >
            <circle cx="10" cy="10" r="3" /> <circle cx="20" cy="8" r="4" />{' '}
            <circle cx="30" cy="12" r="3" />
            <circle cx="12" cy="20" r="4" /> <circle cx="22" cy="18" r="5" />{' '}
            <circle cx="32" cy="22" r="3" />
          </g>
        </svg>

        {/* Community Label Watermarks */}
        <div className="absolute top-[55%] left-[18%] font-display text-[10px] font-bold tracking-widest text-sky-400/30 uppercase">
          Palm Jumeirah
        </div>
        <div className="absolute top-[68%] left-[22%] font-display text-[10px] font-bold tracking-widest text-sky-400/30 uppercase">
          Dubai Marina
        </div>
        <div className="absolute top-[44%] left-[52%] font-display text-[11px] font-bold tracking-widest text-sky-400/40 uppercase">
          Downtown Dubai
        </div>
        <div className="absolute top-[62%] left-[45%] font-display text-[10px] font-bold tracking-widest text-sky-400/30 uppercase">
          Dubai Hills
        </div>
        <div className="absolute top-[32%] left-[72%] font-display text-[10px] font-bold tracking-widest text-sky-400/30 uppercase">
          Creek Harbour
        </div>
      </div>

      {/* Interactive Property Markers */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: 'center center',
        }}
      >
        {properties.map((prop) => {
          const isSelected = selectedProperty?.id === prop.id;
          const isHovered = hoveredId === prop.id;
          const isHighTrust = prop.trustScore >= 90;

          return (
            <div
              key={prop.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200"
              style={{
                left: `${prop.coordinates.x}%`,
                top: `${prop.coordinates.y}%`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectProperty(isSelected ? null : prop);
              }}
              onMouseEnter={() => setHoveredId(prop.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Pulsing ring for selected pin */}
              {isSelected && (
                <div className="absolute -inset-3 animate-ping rounded-full bg-fjord/40" />
              )}

              {/* Pin Badge */}
              <div
                className={cn(
                  'relative flex transform items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold shadow-lg transition-transform',
                  isSelected
                    ? 'z-30 scale-110 bg-fjord text-white ring-2 shadow-fjord/50 ring-fjord-soft'
                    : isHovered
                      ? 'z-25 scale-105 bg-ink-bg text-white ring-1 ring-white/50'
                      : isHighTrust
                        ? 'border border-emerald-500/50 bg-emerald-950/90 text-emerald-300'
                        : 'border border-border bg-surface/90 text-ink',
                )}
              >
                {isHighTrust ? (
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                ) : (
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-fjord" />
                )}
                <span>{formatCompactPrice(prop.price)}</span>
              </div>

              {/* Hover Preview Card Popup */}
              {(isHovered || isSelected) && (
                <div className="animate-in fade-in zoom-in-95 pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 w-56 -translate-x-1/2 rounded-xl border border-border/80 bg-surface/95 p-3 text-left shadow-xl backdrop-blur-md duration-150">
                  <div className="relative mb-2 aspect-video w-full overflow-hidden rounded-lg bg-surface-subtle">
                    <img
                      src={prop.imageUrl}
                      alt={prop.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-1 right-1 flex items-center gap-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                      <ShieldCheck className="h-2.5 w-2.5" />
                      {prop.trustScore} Trust
                    </div>
                  </div>
                  <h4 className="truncate text-xs font-bold text-ink">
                    {prop.title}
                  </h4>
                  <p className="mb-1 truncate text-[11px] text-muted">
                    {prop.community} • {prop.developer}
                  </p>
                  <div className="flex items-center justify-between border-t border-border/80 pt-1 text-xs">
                    <span className="font-bold text-fjord">
                      AED {prop.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400">
                      {prop.roi}% Yield
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5 rounded-xl border border-border/80 bg-surface/90 p-1.5 shadow-lg backdrop-blur-md">
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 2.5}
          className="rounded-lg p-2 text-ink transition-colors hover:bg-surface-subtle hover:text-fjord disabled:opacity-40"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="rounded-lg p-2 text-ink transition-colors hover:bg-surface-subtle hover:text-fjord disabled:opacity-40"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={handleReset}
          disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
          className="rounded-lg border-t border-border/80 p-2 pt-2 text-ink transition-colors hover:bg-surface-subtle hover:text-fjord disabled:opacity-40"
          title="Reset Map View"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Map Legend & Status Overlay */}
      <div className="absolute bottom-4 left-4 z-30 flex items-center gap-4 rounded-xl border border-border/80 bg-surface/90 px-3 py-2 text-xs text-ink shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          <span>High Trust (90+)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-fjord" />
          <span>Standard Verification</span>
        </div>
        <div className="border-l border-border pl-2 text-[11px] text-muted">
          Showing {properties.length} verified listings
        </div>
      </div>

      {/* Click background to deselect */}
      <div
        className="absolute inset-0 z-10"
        onClick={() => onSelectProperty(null)}
      />
    </div>
  );
}
