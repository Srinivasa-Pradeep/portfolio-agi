'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ConditionalParticles() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted && resolvedTheme === 'dark') {
    return (
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        {/* Subtle Overlay to enhance the unified background in dark mode */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Radial Mask Vignette */}
        <div className="absolute inset-0 flex items-center justify-center bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
    );
  }

  return null;
}
