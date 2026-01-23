'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [rotation, setRotation] = React.useState(0);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRotation(r => r + 360);
    const isDark = document.documentElement.classList.contains('dark');

    // This is the experimental View Transitions API for the page-wide effect
    if (!document.startViewTransition) {
      setTheme(isDark ? 'light' : 'dark');
      return;
    }

    document.startViewTransition(() => {
      setTheme(isDark ? 'light' : 'dark');
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative rounded-full">
      <div
        className="relative h-[1.2rem] w-[1.2rem] transition-transform duration-700 ease-in-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Sun className="absolute inset-0 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
