'use client';

import React, { useEffect, useState } from 'react';
import { SiSpotify } from 'react-icons/si';
import { useMusic } from '@/context/music-context';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SpotifyNowPlaying - A high-fidelity "Spotify Pill" interface.
 * Features a spinning artwork disk, live visualizer, and premium Spotify Green branding.
 * Designed to feel like a high-end mobile "Mini Player".
 */

function Visualizer() {
  return (
    <div className="flex items-end gap-[2px] h-3 w-4">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{
            height: ["20%", "100%", "40%", "80%", "20%"]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
          className="w-full bg-[#1DB954] rounded-full"
        />
      ))}
    </div>
  );
}

export function SpotifyNowPlaying() {
  const { isPlaying, song } = useMusic();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[120] pointer-events-none">
      <AnimatePresence mode="wait">
        {isPlaying && (
          <motion.div
            initial={{ x: -40, opacity: 0, filter: 'blur(20px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ x: -40, opacity: 0, filter: 'blur(20px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="pointer-events-auto"
          >
            <div className="group relative flex items-center gap-4 bg-black/60 backdrop-blur-3xl border border-white/10 p-2 pr-6 rounded-[24px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 hover:bg-black/80 hover:scale-[1.02]">
              {/* Internal Branding Glow */}
              <div className="absolute inset-0 bg-[#1DB954]/5 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Spinning Disc / Artwork Unit */}
              <div className="relative shrink-0 p-1">
                <div className={cn(
                    "h-12 w-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-xl transform-gpu transition-all duration-1000",
                    isPlaying ? "animate-slow-rotate" : ""
                )}>
                    {/* Simulated Vinyl/Disk look */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                    <SiSpotify className="h-6 w-6 text-[#1DB954] drop-shadow-[0_0_8px_rgba(29,185,84,0.6)]" />
                </div>
                {/* Visualizer Overlay */}
                <div className="absolute -bottom-0.5 -right-0.5 bg-black/80 backdrop-blur-md rounded-full p-1 border border-white/10">
                   <Visualizer />
                </div>
              </div>

              {/* Meta Telemetry */}
              <div className="flex flex-col min-w-[140px] max-w-[220px]">
                <div className="flex items-center gap-2 mb-0.5">
                   <span className="text-[8px] font-black text-[#1DB954] uppercase tracking-[0.3em] opacity-80">Now Streaming</span>
                   <div className="h-1 w-1 rounded-full bg-[#1DB954] animate-pulse" />
                </div>
                <h4 className="text-sm font-bold text-white truncate tracking-tight">{song.title}</h4>
                <p className="text-[10px] text-zinc-400 font-medium truncate uppercase tracking-widest">{song.artist}</p>
              </div>

              {/* Sophisticated Interaction Prompt */}
              <div className="ml-2 h-10 w-px bg-white/5" />
              <div className="pl-2 flex items-center justify-center">
                 <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-[#1DB954]/40 group-hover:bg-[#1DB954]/10">
                    <SiSpotify className="h-3.5 w-3.5 text-[#1DB954] transition-transform duration-500 group-hover:scale-110" />
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
