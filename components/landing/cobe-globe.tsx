'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000 * 2,
      height: 1000 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1, // Dark mode to match Nordic Lagom (Ink/Fjord) aesthetic
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.11, 0.11, 0.14], // Dark Onyx base matching --ink-bg (oklch 18% 0.02 260deg)
      markerColor: [0.4, 0.5, 0.8], // Fjord Blue markers for Dubai/UAE
      glowColor: [0.08, 0.08, 0.12], // Subtle glow
      markers: [
        // Dubai location
        { location: [25.2048, 55.2708], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        state.phi = phi;
        phi += 0.002; // Slow rotation
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-70 mix-blend-screen">
      <canvas
        ref={canvasRef}
        style={{
          width: 1000,
          height: 1000,
          maxWidth: '100%',
          aspectRatio: 1,
        }}
      />
    </div>
  );
}
