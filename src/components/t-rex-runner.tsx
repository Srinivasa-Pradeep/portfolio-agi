'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from 'next-themes';

/**
 * TRexRunner - Authentic Chromium Dino Game wrapper.
 * Enhanced with:
 * - Viewport Guard: Only active when visible.
 * - Theme Synchronizer: Toggles site theme during "Night Mode" milestones.
 * - Contextual Scroll Lock: Locks body scroll only during active gameplay.
 */
export function TRexRunner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<any>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const isMobile = useIsMobile();
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Viewport Guard: Monitor visibility to prevent accidental activations
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isInView) {
        // Cleanup if we move away
        if (runnerRef.current) {
            try {
                runnerRef.current.stop();
                runnerRef.current.stopListening();
            } catch (e) {}
            const RunnerClass = runnerRef.current.constructor;
            if (RunnerClass) RunnerClass.instance_ = null;
            runnerRef.current = null;
        }
        return;
    }

    let active = true;
    let checkInterval: any = null;

    // Dynamically import offline.js to ensure browser globals are available
    import('./dino/offline.js')
      .then(({ Runner }) => {
        if (!active || !containerRef.current) return;

        // Reset singleton for fresh initialization
        if (Runner.instance_) {
          Runner.instance_ = null;
        }

        const runner = new Runner('#dino-game-container');
        runnerRef.current = runner;

        /**
         * THEME SYNCHRONIZER
         * Overriding the invert function to allow the game to control site-wide mode.
         */
        const originalInvert = runner.invert.bind(runner);
        runner.invert = (reset: boolean) => {
          if (reset) {
            // Restore original visual state if game resets
            originalInvert(true);
            return;
          }
          
          // Toggle the Next-Themes mode based on current resolved state
          const targetTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
          setTheme(targetTheme);
          
          // Still call original to handle game-internal state, but we don't want 
          // to fight over the 'inverted' class since we control via setTheme.
          // We call it to update the internal this.inverted flag.
          originalInvert(false);
        };

        /**
         * SCROLL LOCK
         * Ensuring scroll is only locked during active play sessions.
         */
        const originalSetPlayStatus = runner.setPlayStatus.bind(runner);
        runner.setPlayStatus = (isPlaying: boolean) => {
           originalSetPlayStatus(isPlaying);
           if (typeof document !== 'undefined') {
              document.body.style.overflow = isPlaying ? 'hidden' : '';
           }
        };

        // Monitor activation state
        checkInterval = setInterval(() => {
          if (runner.activated) {
            setIsActivated(true);
            clearInterval(checkInterval);
          }
        }, 100);
      })
      .catch(err => {
        console.error('Failed to initialize authentic Dino Runner:', err);
      });

    return () => {
      active = false;
      if (checkInterval) clearInterval(checkInterval);
      if (typeof document !== 'undefined') document.body.style.overflow = '';
      if (runnerRef.current) {
        try {
          runnerRef.current.stop();
          runnerRef.current.stopListening();
        } catch (e) {}
        const RunnerClass = runnerRef.current.constructor;
        if (RunnerClass) RunnerClass.instance_ = null;
      }
    };
  }, [isInView, resolvedTheme, setTheme]);

  return (
    <div className="w-full select-none offline flex justify-center items-center pt-2 pb-0 bg-transparent min-h-[140px]">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Offline Dino Game Core Styles */
        .offline #dino-game-container {
          position: relative;
          width: 100%;
          height: 140px;
          margin: 0 auto;
          overflow: hidden;
        }

        .offline .runner-container {
          direction: ltr;
          height: 140px;
          max-width: 100%;
          overflow: hidden;
          position: relative !important;
          margin: 0 auto;
          background: transparent;
        }

        .offline .runner-container:focus {
          outline: none;
        }

        .offline .runner-canvas {
          height: 140px;
          max-width: 100%;
          opacity: 1;
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          background: transparent;
        }

        /* Invert canvas color for Dark Mode compatibility */
        .dark .offline .runner-canvas {
          filter: invert(0.9) hue-rotate(180deg);
        }

        /* Hide screen reader live region visually */
        .offline .offline-runner-live-region {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Simple instructions for desktop and mobile */
        .dino-instructions {
          text-align: center;
          font-family: monospace;
          font-size: 0.75rem;
          opacity: 0.4;
          margin-top: 6px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }

        .dino-instructions.hidden {
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
        }
      `}} />

      <div className="flex flex-col items-center w-full">
        <div id="dino-game-container" ref={containerRef} />
        <div className={`dino-instructions ${isActivated ? 'hidden' : ''}`}>
          {isMobile ? 'Tap Screen to Play' : 'Press Space to Play'}
        </div>
      </div>
    </div>
  );
}
