'use client';

import * as React from 'react';
import { DiscoverProperty } from '@/lib/discover/mock-properties';
import { ShieldCheck, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from '@vis.gl/react-google-maps';

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
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const formatCompactPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`;
    }
    return `${Math.round(price / 1000)}K`;
  };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  
  if (!apiKey) {
    return (
      <div className={cn('flex min-h-125 items-center justify-center border border-border/60 bg-surface text-sm font-medium text-muted-foreground', className)}>
        Google Maps API Key is missing
      </div>
    );
  }

  return (
    <div className={cn('relative size-full min-h-125 overflow-hidden border border-border/60 ', className)}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultZoom={11}
          defaultCenter={{ lat: 25.105, lng: 55.20 }}
          mapId="DEMO_MAP_ID"
          gestureHandling="greedy"
          disableDefaultUI={true}
        >
          {properties.map((prop) => {
            const isSelected = selectedProperty?.id === prop.id;
            const isHovered = hoveredId === prop.id;
            const isHighTrust = prop.trustScore >= 90;

            return (
              <AdvancedMarker
                key={prop.id}
                position={{ lat: prop.coordinates.lat, lng: prop.coordinates.lng }}
                onClick={() => onSelectProperty(isSelected ? null : prop)}
                onMouseEnter={() => setHoveredId(prop.id)}
                onMouseLeave={() => setHoveredId(null)}
                zIndex={isSelected ? 30 : isHovered ? 25 : 1}
              >
                {/* Pulsing ring for selected pin */}
                <div className="relative">
                  {isSelected && (
                    <div className="absolute -inset-3 animate-ping rounded-full bg-ink/40 dark:bg-surface/40" />
                  )}

                  {/* Pin Badge */}
                  <div
                    className={cn(
                      'relative flex transform items-center gap-1.5 px-2.5 py-1 text-xs font-bold shadow-lg transition-transform',
                      isSelected
                        ? 'z-30 scale-110 bg-ink text-white ring-2 shadow-fjord/50 ring-fjord-soft dark:bg-surface '
                        : isHovered
                          ? 'z-25 scale-105 bg-ink text-white ring-1 ring-white/50 dark:bg-border/50 '
                          : isHighTrust
                            ? 'border-border-strong/50 border bg-fjord-hover/90 text-surface dark:bg-surface-subtle/90 '
                            : 'border border-border/60 bg-surface-subtle/90 text-ink   ',
                    )}
                  >
                    {isHighTrust ? (
                      <ShieldCheck className="size-3.5 shrink-0" />
                    ) : (
                      <MapPin className="size-3.5 shrink-0" />
                    )}
                    <span>{formatCompactPrice(prop.price)}</span>
                  </div>
                </div>
              </AdvancedMarker>
            );
          })}

          {/* InfoWindow for Hovered or Selected */}
          {(hoveredId || selectedProperty) && (() => {
            const activeId = hoveredId || selectedProperty?.id;
            const activeProp = properties.find(p => p.id === activeId);
            
            if (!activeProp) return null;
            
            return (
              <PropertyInfoWindow 
                property={activeProp} 
                onCloseClick={() => {
                  if (activeId === selectedProperty?.id) {
                    onSelectProperty(null);
                  }
                }}
              />
            );
          })()}
        </Map>
      </APIProvider>

      {/* Map Legend & Status Overlay */}
      <div className="border-border/60/80 pointer-events-none absolute bottom-4 left-4 z-30 flex items-center gap-4 border bg-surface-subtle/90 px-3 py-2 text-xs text-ink shadow-lg backdrop-blur-md   ">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 bg-fjord-hover shadow-sm shadow-emerald-500/50 dark:bg-surface-subtle" />
          <span>High Trust (90+)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="bg-border-strong size-2.5 " />
          <span>Standard</span>
        </div>
        <div className="border-l border-border/60 pl-2 text-[11px] text-muted-foreground  dark:text-muted/50">
          Showing {properties.length} verified listings
        </div>
      </div>
    </div>
  );
}

function PropertyInfoWindow({ property, onCloseClick }: { property: DiscoverProperty; onCloseClick: () => void }) {
  return (
    <InfoWindow
      position={{ lat: property.coordinates.lat, lng: property.coordinates.lng }}
      onCloseClick={onCloseClick}
      headerDisabled
    >
      <div className="w-56 overflow-hidden bg-surface-subtle p-0 text-left text-ink  ">
        <div className="relative aspect-video w-full overflow-hidden bg-surface ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.imageUrl}
            alt={property.title}
            className="size-full object-cover"
          />
          <div className="absolute top-1 right-1 flex items-center gap-1 bg-fjord/80 px-1.5 py-0.5 text-[10px] font-bold text-surface">
            <ShieldCheck className="size-2.5" />
            {property.trustScore} Trust
          </div>
        </div>
        <div className="p-3">
          <h4 className="truncate text-xs font-bold text-ink ">
            {property.title}
          </h4>
          <p className="mb-1 truncate text-[11px] text-muted-foreground dark:text-muted/50">
            {property.community} • {property.developer}
          </p>
          <div className="border-border/60/80 flex items-center justify-between border-t pt-1 text-xs ">
            <span className="font-bold text-ink ">
              AED {property.price.toLocaleString()}
            </span>
            <span className="text-[10px] font-semibold text-ink ">
              {property.roi}% Yield
            </span>
          </div>
        </div>
      </div>
    </InfoWindow>
  );
}
