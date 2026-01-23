'use client';

import React from 'react';
import { useMusic } from '@/context/music-context';
import { Music2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  const { isPlaying, song } = useMusic();

  return (
    <footer className="border-t relative h-24">
      <div className="container flex h-full flex-col items-center justify-center">
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 text-center transition-all duration-500",
          isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}>
          <Music2 className="h-5 w-5 flex-shrink-0 text-primary" />
          <div className="text-xs text-muted-foreground">
            <p className="font-semibold text-foreground tracking-wide">Now Playing</p>
            <p>{song.title} &mdash; {song.artist}</p>
          </div>
        </div>

        <p className={cn(
          "text-sm text-muted-foreground italic transition-all duration-300 hover:text-primary",
          isPlaying ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        )}>
         Dreams won't work until you work {"<3"}
        </p>
      </div>
    </footer>
  );
}
