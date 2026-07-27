'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function CapitalGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.95, 0.95, 0.95],
      markerColor: [0.1, 0.3, 0.4],
      glowColor: [0.9, 0.92, 0.95],
      markers: [
        // London (UK)
        { location: [51.5074, -0.1278], size: 0.08 },
        // Mumbai (India)
        { location: [19.076, 72.8777], size: 0.08 },
        // Riyadh (Saudi Arabia)
        { location: [24.7136, 46.6753], size: 0.08 },
        // Paris (France)
        { location: [48.8566, 2.3522], size: 0.06 },
        // Frankfurt (Germany)
        { location: [50.1109, 8.6821], size: 0.06 },
        // Dubai (Destination Hub)
        { location: [25.2048, 55.2708], size: 0.12 },
      ],
      onRender: (state) => {
        // Called on every frame
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        style={{ width: 300, height: 300, maxWidth: '100%', aspectRatio: 1 }}
        className="transition-opacity duration-1000 ease-out"
      />
    </div>
  );
}
