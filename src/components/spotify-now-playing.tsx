'use client';

import React, { useEffect, useState } from 'react';
import { SiSpotify } from 'react-icons/si';
import { useMusic } from '@/context/music-context';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SpotifyNowPlaying - A high-fidelity "Spotify Card" interface.
 * Features a floating architectural design, live visualizer, and Spotify Green branding.
 * Positioned in the bottom-left to feel like a premium mobile-style widget.
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
            initial={{ x: -20, opacity: 0, filter: 'blur(10px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ x: -20, opacity: 0, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="pointer-events-auto"
          >
            <div className="group relative flex items-center gap-4 bg-black/80 backdrop-blur-2xl border border-white/10 p-3 pl-4 pr-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-[#1DB954]/30">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-[#1DB954]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Spotify Icon Unit */}
              <div className="relative shrink-0">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#1DB954] to-[#1ed760] flex items-center justify-center shadow-lg transform-gpu transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[10deg]">
                  <SiSpotify className="h-6 w-6 text-black" />
                </div>
                <div className="absolute -bottom-1 -right-1">
                   <Visualizer />
                </div>
              </div>

              {/* Meta Telemetry */}
              <div className="flex flex-col min-w-[120px] max-w-[200px]">
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-black text-[#1DB954] uppercase tracking-[0.2em] opacity-80">Listening Now</span>
                   <div className="h-1 w-1 rounded-full bg-[#1DB954] animate-pulse" />
                </div>
                <h4 className="text-sm font-bold text-white truncate tracking-tight">{song.title}</h4>
                <p className="text-[11px] text-zinc-400 font-medium truncate uppercase tracking-wide">{song.artist}</p>
              </div>

              {/* Classy External Link Hint */}
              <div className="ml-2 h-8 w-px bg-white/10" />
              <div className="pl-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                 <SiSpotify className="h-4 w-4 text-[#1DB954]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
