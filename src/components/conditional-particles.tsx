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
      <div className="fixed inset-0 z-[-1] bg-brand-dark">
        {/* Animated Grid */}
        <div className="absolute inset-0 animate-background-pan bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        {/* Radial Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.1),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--accent)/0.1),transparent_30%)]" />
      </div>
    );
  }

  return null;
}
