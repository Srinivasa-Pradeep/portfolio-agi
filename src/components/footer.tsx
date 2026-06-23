'use client';

import React, { useEffect, useState } from 'react';
import { BlurRevealText } from './blur-reveal-text';
import Link from 'next/link';
import { SiSpotify } from 'react-icons/si';
import { useMusic } from '@/context/music-context';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "\"Man is made by his belief. As he believes, so he is.\"",
  "\"You make your own luck if you stay at it long enough.\"",
  "\"Dreams won't work until you work\"",
  "\"It is better to live your own destiny imperfectly then to live an imitation of somebody else's life with perfection.\""
];

function SpotifyIndicator() {
  const { isPlaying, song } = useMusic();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isPlaying) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/30 backdrop-blur-md border border-white/5"
    >
      <div className="relative flex items-center justify-center">
        <SiSpotify className="h-4 w-4 text-[#1DB954] animate-pulse" />
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="text-[10px] font-bold text-foreground truncate max-w-[120px]">{song.title}</span>
          <div className="flex items-end gap-[1px] h-2">
            {[0.4, 0.7, 0.3].map((delay, i) => (
              <motion.div 
                key={i}
                animate={{ height: ["20%", "100%", "40%", "20%"] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: delay }}
                className="w-[2px] bg-[#1DB954] rounded-full"
              />
            ))}
          </div>
        </div>
        <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">{song.artist}</span>
      </div>
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="border-t h-24 relative overflow-hidden bg-background/50 backdrop-blur-sm">
      <div className="container relative h-full flex items-center justify-between">
        {/* Left: Spotify Now Playing */}
        <div className="w-1/3 flex justify-start">
          <AnimatePresence mode="wait">
            <SpotifyIndicator />
          </AnimatePresence>
        </div>

        {/* Center: Premium Quotes */}
        <div className="flex items-center justify-center w-1/3">
          <BlurRevealText 
            words={quotes}
            interval={6000}
            className="text-xs sm:text-sm text-muted-foreground italic font-lora text-center tracking-wide"
          />
        </div>

        {/* Right: Subtle Branding */}
        <div className="w-1/3 flex justify-end">
           <Link 
            href="/journey" 
            className="text-xs font-signature text-primary/40 transition-all duration-500 hover:text-primary hover:scale-110 !cursor-none select-none"
           >
            Srini
           </Link>
        </div>
      </div>
    </footer>
  );
}
