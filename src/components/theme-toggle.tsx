'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [rotation, setRotation] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Initialize the audio instance on mount
  React.useEffect(() => {
    audioRef.current = new Audio('/music/switch.mp3');
    audioRef.current.load();
  }, []);

  const toggleTheme = React.useCallback(() => {
    // Haptic feedback (subtle pulse)
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(24);
    }

    // Play the toggle SFX
    if (audioRef.current) {
      audioRef.current.currentTime = 0; 
      audioRef.current.play().catch(() => {});
    }

    // Trigger the 360-degree rotation
    setRotation(r => r + 360);
    
    const isDark = document.documentElement.classList.contains('dark');

    if (!document.startViewTransition) {
      setTheme(isDark ? 'light' : 'dark');
      return;
    }

    setTimeout(() => {
        document.startViewTransition(() => {
            setTheme(isDark ? 'light' : 'dark');
        });
    }, 50);
  }, [setTheme]);

  // Keyboard shortcut listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 't' && 
        !(e.target instanceof HTMLInputElement) && 
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent side="top" className="flex items-center gap-2 px-3 py-1.5">
          <span className="text-xs font-medium">Toggle mode</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            T
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
