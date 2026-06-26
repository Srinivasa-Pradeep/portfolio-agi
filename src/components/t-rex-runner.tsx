
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * TRexRunner - Authentic Chromium Dino Game wrapper.
 * This component acts as a container for the official Chromium Runner engine.
 * It handles dynamic import (client-side only), initialization, and complete lifecycle cleanup.
 * 
 * Enhanced with "Viewport Guard" (Intersection Observer) to ensure the engine only
 * activates and listens for input when visible on the screen.
 */
export function TRexRunner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<any>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const isMobile = useIsMobile();

  // 1. Viewport Guard - Engagement Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.1, // Trigger when 10% visible
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

  // 2. Engine Lifecycle Management
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let active = true;
    let checkInterval: any = null;

    // Only engage the engine and listeners when in view
    if (isInView) {
      import('./dino/offline.js')
        .then(({ Runner }) => {
          if (!active) return;
          if (!containerRef.current) return;

          // Reset singleton in case of fast remounts (development HMR/React StrictMode)
          if (Runner.instance_) {
            Runner.instance_ = null;
          }

          // Initialize the Chromium Runner
          const runner = new Runner('#dino-game-container');
          runnerRef.current = runner;

          // Monitor runner state to hide instructions once the user starts playing
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
    } else {
      // If the component exits the viewport, we silence the engine to prevent accidental triggers
      if (runnerRef.current) {
        try {
          runnerRef.current.stop();
          runnerRef.current.stopListening();
        } catch (e) {
          // Suppress teardown errors during viewport exit
        }
      }
    }

    // Comprehensive Cleanup on unmount or view change
    return () => {
      active = false;
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (runnerRef.current) {
        try {
          const runner = runnerRef.current;
          runner.stop();
          // Ensure we don't call stopListening if the container is already detached
          if (runner.containerEl) {
             runner.stopListening();
          }
        } catch (e) {
          // Suppress teardown errors
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
