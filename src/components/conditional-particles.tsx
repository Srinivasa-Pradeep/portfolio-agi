'use client';

import { useTheme } from 'next-themes';
import { BackgroundParticles } from './background-particles';
import { useEffect, useState } from 'react';

export function ConditionalParticles() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted && resolvedTheme === 'dark') {
    return <BackgroundParticles />;
  }
  return null;
}
