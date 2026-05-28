'use client';

import React, { useState, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMusic } from '@/context/music-context';

export function MusicPlayer() {
  const { isPlaying, togglePlayPause, rotation } = useMusic();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 'm' && 
        !(e.target instanceof HTMLInputElement) && 
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause]);

  if (!isMounted) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full transition-all duration-500 ease-[cubic-bezier(0.3,1.5,0.5,1)] hover:scale-125 hover:bg-accent/50 active:scale-95"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            <div
              className="relative h-5 w-5 transition-transform duration-700 ease-in-out will-change-transform"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <Pause className={`absolute inset-0 h-5 w-5 transition-all ${ isPlaying ? 'rotate-0 scale-100' : '-rotate-90 scale-0' }`} />
              <Music className={`absolute inset-0 h-5 w-5 transition-all ${ isPlaying ? 'rotate-90 scale-0' : 'rotate-0 scale-100' }`} />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="flex items-center gap-2 px-3 py-1.5">
          <span className="text-xs font-medium">{isPlaying ? 'Pause music' : 'Play music'}</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            M
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
