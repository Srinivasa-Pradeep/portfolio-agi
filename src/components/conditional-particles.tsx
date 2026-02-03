'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import BackgroundParticles from './background-particles';

export function ConditionalParticles() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted && resolvedTheme === 'dark') {
    return (
      <div className="fixed inset-0 z-[-1]">
        {/* 1. Base Dark Background */}
        <div className="absolute inset-0 bg-brand-dark" />

        {/* 2. Radial Glow Gradient Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-brand-dark to-black opacity-80" />

        {/* 3. Animated Particles */}
        <BackgroundParticles />
        
        {/* 4. Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
        
        {/* 5. Radial Mask Vignette */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-dark [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
    );
  }

  return null;
}
