'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AppleLandingSequence - A cinematic loading state inspired by the iconic Apple "hello" reveal.
 * Uses a handwritten SVG path animation and a deep blur reveal transition.
 */
export function AppleLandingSequence() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsInAnimating] = useState(false);

  useEffect(() => {
    // Start the animation sequence
    setIsInAnimating(true);
    
    // Total duration of the cinematic sequence
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(40px)', scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] aspect-square flex items-center justify-center">
            {/* The Handwritten "hello" SVG Path */}
            <svg 
                viewBox="0 0 450 150" 
                className="w-full h-auto fill-none stroke-white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                    duration: 2.2, 
                    ease: [0.45, 0.05, 0.55, 0.95],
                    delay: 0.2
                }}
                d="M48.5,108.5c0,0,16.5-70.5,16.5-80.5s-10-8.5-12.5-3.5s-14.5,33.5-14.5,41.5s5,25.5,14,25.5c10.5,0,23.5-22.5,23.5-31.5 s-5.5-15.5-13.5-15.5s-17.5,10.5-17.5,26.5s10.5,26.5,24,26.5s31-25.5,31-38.5c0-10.5-6.5-14.5-10.5-14.5c-7,0-13,6.5-13,18.5 c0,15.5,9.5,28.5,22,28.5c11.5,0,21.5-10,21.5-20.5s-6.5-18.5-13-18.5c-7.5,0-13,7.5-13,18.5c0,16,10,26.5,23,26.5c13,0,26-11,26-25 s-10-23.5-18.5-23.5s-16.5,10.5-16.5,23.5s8.5,25,19,25s21.5-9,21.5-20.5s-5.5-18.5-12.5-18.5s-13,7.5-13,18.5 c0,15.5,9.5,26.5,21.5,26.5s25-13.5,25-27s-10-23.5-19-23.5s-17.5,10.5-17.5,23.5s9,25,20.5,25c12,0,23.5-11.5,23.5-23s-8.5-23.5-18.5-23.5 c-11,0-19.5,10.5-19.5,25s11,25,24.5,25s31.5-16.5,31.5-30.5c0-15.5-14.5-24-24.5-24c-13,0-23,12-23,26s12,26,25.5,26 c13.5,0,26-11.5,26-24.5s-10.5-23.5-19.5-23.5c-11.5,0-20,11.5-20,25.5s11,25,24,25s28.5-13.5,28.5-26.5s-9-23.5-17.5-23.5 s-16.5,9.5-16.5,23.5c0,15.5,10.5,26.5,23,26.5c12,0,22.5-10.5,22.5-22.5s-8.5-22-17-22s-15,8-15,19.5c0,13,8.5,22.5,19.5,22.5 c10.5,0,19.5-8.5,19.5-19s-8.5-19-16.5-19s-14.5,7.5-14.5,17s7.5,17,16.5,17c8.5,0,16.5-7.5,16.5-17.5s-7.5-17.5-16.5-17.5 c-9,0-15.5,7.5-15.5,17.5s7.5,17.5,16.5,17.5c9,0,17.5-8.5,17.5-19s-8-19.5-16.5-19.5s-15,8.5-15,19.5s8,19.5,16.5,19.5"
              />
            </svg>

            {/* Subtle glow beneath the text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 2.5, times: [0, 0.5, 1], repeat: Infinity }}
              className="absolute inset-0 bg-white/5 blur-3xl rounded-full pointer-events-none"
            />
          </div>

          {/* Progress Indication */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 overflow-hidden h-px bg-white/10">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
              className="h-full w-full bg-white/40"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
