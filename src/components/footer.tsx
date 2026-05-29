'use client';

import React from 'react';
import { useMusic } from '@/context/music-context';
import { Music2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlurRevealText } from './blur-reveal-text';
import Link from 'next/link';

const quotes = [
  "\"Man is made by his belief. As he believes, so he is.\"",
  "\"You make your own luck if you stay at it long enough.\"",
  "\"Dreams won't work until you work\""
];

export function Footer() {
  const { isPlaying, song } = useMusic();

  return (
    <footer className="border-t h-24 relative overflow-hidden">
      <div className="container relative h-full flex items-center justify-center">
        {/* Now Playing - Floating Left */}
        <div className={cn(
          "absolute left-0 hidden md:flex items-center gap-3 text-left transition-all duration-500",
          isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}>
          <Music2 className="h-5 w-5 flex-shrink-0 text-primary" />
          <div className="text-[10px] sm:text-xs text-muted-foreground">
            <p className="font-semibold text-foreground tracking-wide uppercase">Now Playing</p>
            <p className="max-w-[120px] truncate">{song.title} &mdash; {song.artist}</p>
          </div>
        </div>

        {/* Premium Quoted Place - Absolute Center */}
        <div className="flex items-center justify-center max-w-[80%] md:max-w-2xl">
          <BlurRevealText 
            words={quotes}
            interval={6000}
            className="text-xs sm:text-sm text-muted-foreground italic font-lora text-center tracking-wide"
          />
        </div>

        {/* Subtle Branding - Floating Right (Easter Egg Portal) */}
        <div className="absolute right-0 hidden lg:block opacity-20 transition-all duration-500 hover:opacity-100">
           <Link 
            href="/journey" 
            className="text-xs font-signature text-primary !cursor-none select-none"
           >
            Srini
           </Link>
        </div>
      </div>
    </footer>
  );
}

