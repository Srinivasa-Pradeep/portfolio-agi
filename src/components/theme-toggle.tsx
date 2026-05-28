'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [rotation, setRotation] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Initialize the audio instance on mount
  React.useEffect(() => {
    // Looking for the sound file in public/music/switch.mp3
    audioRef.current = new Audio('/music/switch.mp3');
    audioRef.current.load();
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Play the toggle SFX
    if (audioRef.current) {
      audioRef.current.currentTime = 0; 
      audioRef.current.play().catch(() => {
        // Silently fail if file is missing or browser restricts playback
      });
    }

    // Trigger the 360-degree rotation
    setRotation(r => r + 360);
    
    const isDark = document.documentElement.classList.contains('dark');

    // Experimental View Transitions API for the premium wipe effect
    if (!document.startViewTransition) {
      setTheme(isDark ? 'light' : 'dark');
      return;
    }

    // Delay the theme switch slightly to allow the rotation to start smoothly
    setTimeout(() => {
        document.startViewTransition(() => {
            setTheme(isDark ? 'light' : 'dark');
        });
    }, 50);
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="relative rounded-full transition-all duration-500 ease-[cubic-bezier(0.3,1.5,0.5,1)] hover:scale-125 hover:bg-accent/50 active:scale-95"
    >
      <div
        className="relative h-[1.2rem] w-[1.2rem] transition-transform duration-1000 ease-[cubic-bezier(0.3,1.5,0.5,1)] will-change-transform"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Sun className="absolute inset-0 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
