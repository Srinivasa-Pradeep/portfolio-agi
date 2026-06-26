
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * TRexRunner - Authentic Chromium Dino Game wrapper.
 * Enhanced with Viewport Guard (Intersection Observer) and Scroll Lock during active play.
 */
export function TRexRunner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<any>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const isMobile = useIsMobile();

  // 1. Viewport Guard - Only engage the engine when visible on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '0px' 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Engine Lifecycle and Scroll Lock Management
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let active = true;
    let checkInterval: any = null;

    // Only initialize the engine and listeners if the component is in view
    if (isInView) {
      import('./dino/offline.js')
        .then(({ Runner }) => {
          if (!active) return;
          if (!containerRef.current) return;

          // Reset singleton for React development stability
          if (Runner.instance_) {
            Runner.instance_ = null;
          }

          // Initialize the Chromium Runner
          const runner = new Runner('#dino-game-container');
          runnerRef.current = runner;

          // High-frequency state monitor
          checkInterval = setInterval(() => {
            if (!active) return;
            
            // Monitor activation to hide initial instructions
            if (runner.activated) {
              setIsActivated(true);
            }

            // Scroll Lock Logic: Lock body when playing, unlock when idle or game over
            if (runner.playing && !runner.crashed) {
              document.body.style.overflow = 'hidden';
            } else {
              document.body.style.overflow = '';
            }
          }, 100);
        })
        .catch(err => {
          console.error('Failed to initialize authentic Dino Runner:', err);
        });
    } else {
      // If exiting viewport, ensure scroll is unlocked and engine is paused
      document.body.style.overflow = '';
      if (runnerRef.current) {
        try {
          runnerRef.current.stop();
        } catch (e) {
          // Silence teardown errors during viewport toggle
        }
      }
    }

    // Comprehensive Cleanup
    return () => {
      active = false;
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      
      // Ensure scrolling is always restored on unmount
      document.body.style.overflow = '';
      
      if (runnerRef.current) {
        try {
          const runner = runnerRef.current;
          runner.stop();
          
          // CRITICAL FIX: Verify container exists before stopping listeners to prevent null reference errors
          if (runner.containerEl) {
             runner.stopListening();
          }
        } catch (e) {
          // Silence cleanup errors
        }
        
        // Reset the singleton instance so a new one can be created when mounting again
        const RunnerClass = runnerRef.current.constructor;
        if (RunnerClass) {
          RunnerClass.instance_ = null;
        }
      }
    };
  }, [isInView]); // Re-run effect when visibility changes

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

      <div className="flex flex-col items-center w-full" ref={containerRef}>
        <div id="dino-game-container" />
        <div className={`dino-instructions ${isActivated ? 'hidden' : ''}`}>
          {isMobile ? 'Tap Screen to Play' : 'Press Space to Play'}
        </div>
      </div>
    </div>
  );
}
