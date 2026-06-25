'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * TRexRunner - Chrome-Style Odyssey Edition.
 * Features:
 * - Cluster Spawning: Supports 1, 2, or 3 plants together.
 * - Aspect Ratio Preservation: Custom PNGs scale naturally.
 * - Minimal HUD: High score tracking without branding clutter.
 */
export function TRexRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const dragonImg = useRef<HTMLImageElement | null>(null);
  const plantImg = useRef<HTMLImageElement | null>(null);

  const state = useRef({
    dino: { y: 150, vy: 0, width: 44, height: 47, isJumping: false },
    obstacles: [] as { x: number, width: number, height: number }[],
    gameSpeed: 10,
    score: 0,
    frameCount: 0,
    canvasWidth: 0,
    canvasHeight: 180,
  });

  const GRAVITY = 0.6;
  const JUMP_FORCE = -12;
  const GROUND_Y = 130;

  useEffect(() => {
    const stored = localStorage.getItem('odyssey-high-score');
    if (stored) setHighScore(parseInt(stored, 10));

    const d = new Image();
    d.src = '/images/dragon.png';
    d.onload = () => { 
        dragonImg.current = d; 
        const ratio = d.naturalWidth / d.naturalHeight;
        state.current.dino.width = 47 * ratio;
    };

    const p = new Image();
    p.src = '/images/plant.png';
    p.onload = () => { 
        plantImg.current = p; 
    };
  }, []);

  const handleResize = useCallback(() => {
    if (containerRef.current && canvasRef.current) {
      const width = containerRef.current.offsetWidth;
      state.current.canvasWidth = width;
      canvasRef.current.width = width;
      canvasRef.current.height = state.current.canvasHeight;
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const resetGame = useCallback(() => {
    state.current = {
      ...state.current,
      dino: { ...state.current.dino, y: GROUND_Y, vy: 0, isJumping: false },
      obstacles: [],
      gameSpeed: 10,
      score: 0,
      frameCount: 0,
    };
    setScore(0);
    setGameState('playing');
  }, []);

  const jump = useCallback(() => {
    if (gameState === 'idle' || gameState === 'gameOver') {
      resetGame();
      return;
    }
    if (!state.current.dino.isJumping) {
      state.current.dino.vy = JUMP_FORCE;
      state.current.dino.isJumping = true;
    }
  }, [gameState, resetGame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    let rafId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const update = () => {
      const s = state.current;
      s.frameCount++;

      // 1. Update Physics
      s.dino.vy += GRAVITY;
      s.dino.y += s.dino.vy;

      if (s.dino.y >= GROUND_Y) {
        s.dino.y = GROUND_Y;
        s.dino.vy = 0;
        s.dino.isJumping = false;
      }

      // 2. Cluster Spawning Logic
      const spawnInterval = Math.max(50, Math.floor(70 / (s.gameSpeed / 10)));
      if (s.frameCount % spawnInterval === 0 && Math.random() > 0.4) {
          // Spawn a cluster of 1-3 plants
          const clusterSize = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < clusterSize; i++) {
              const height = 30 + Math.random() * 15; // Consistent cluster height
              let width = 20;
              if (plantImg.current) {
                  const ratio = plantImg.current.naturalWidth / plantImg.current.naturalHeight;
                  width = height * ratio;
              }
              // Space them out slightly within the cluster
              s.obstacles.push({ 
                  x: s.canvasWidth + (i * width * 0.8), 
                  width, 
                  height 
              });
          }
      }

      // 3. Move & Check Collisions
      s.obstacles = s.obstacles.filter(obs => {
        obs.x -= s.gameSpeed;

        const dinoRect = { 
            left: 50 + 5, 
            right: 50 + s.dino.width - 5, 
            top: s.dino.y + 5, 
            bottom: s.dino.y + s.dino.height - 5
        };
        const obsRect = { 
            left: obs.x + 4, 
            right: obs.x + obs.width - 4, 
            top: s.canvasHeight - obs.height - 10, 
            bottom: s.canvasHeight - 10 
        };

        if (
            dinoRect.right > obsRect.left &&
            dinoRect.left < obsRect.right &&
            dinoRect.bottom > obsRect.top
        ) {
            setGameState('gameOver');
            setHighScore(prev => {
                const newHigh = Math.max(prev, Math.floor(s.score));
                localStorage.setItem('odyssey-high-score', newHigh.toString());
                return newHigh;
            });
        }

        return obs.x + obs.width > 0;
      });

      // 4. Update Score
      s.score += 0.15;
      setScore(Math.floor(s.score));
      if (s.gameSpeed < 25) s.gameSpeed += 0.0015;

      // 5. Draw
      ctx.clearRect(0, 0, s.canvasWidth, s.canvasHeight);

      const isDark = document.documentElement.classList.contains('dark');
      const primaryColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, s.canvasHeight - 10);
      ctx.lineTo(s.canvasWidth, s.canvasHeight - 10);
      ctx.stroke();

      if (dragonImg.current) {
        ctx.drawImage(dragonImg.current, 50, s.dino.y, s.dino.width, s.dino.height);
      } else {
        ctx.fillStyle = primaryColor;
        ctx.fillRect(50, s.dino.y, s.dino.width, s.dino.height);
      }
      
      s.obstacles.forEach(obs => {
        if (plantImg.current) {
          ctx.drawImage(plantImg.current, obs.x, s.canvasHeight - obs.height - 10, obs.width, obs.height);
        } else {
          ctx.fillStyle = primaryColor;
          ctx.fillRect(obs.x, s.canvasHeight - obs.height - 10, obs.width, obs.height);
        }
      });

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [gameState]);

  return (
    <div ref={containerRef} className="w-full relative group bg-secondary/5 border-t border-border/40 overflow-hidden transition-all h-[250px] select-none">
      <div className="absolute top-6 right-12 z-20 flex items-center gap-6 font-mono text-sm font-bold opacity-60">
        <p className="tracking-widest">HI {highScore.toString().padStart(5, '0')}</p>
        <p className="tracking-widest">{score.toString().padStart(5, '0')}</p>
      </div>

      <div className="absolute inset-0 cursor-pointer" onClick={jump}>
        <canvas ref={canvasRef} className="w-full h-full" />

        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-700">
             <div className="text-center font-mono opacity-60">
                <p className="text-xs font-bold uppercase tracking-[0.4em]">Press Space to Start</p>
             </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/20 backdrop-blur-[1px] animate-in zoom-in-95 duration-300">
             <div className="text-center">
                <h3 className="text-2xl font-mono font-bold tracking-[0.5em] uppercase mb-8 opacity-70">G A M E  O V E R</h3>
                <Button 
                  onClick={(e) => { e.stopPropagation(); resetGame(); }} 
                  variant="ghost"
                  size="icon" 
                  className="rounded-full h-12 w-12 hover:bg-primary/5 transition-all"
                >
                   <RefreshCw className="h-6 w-6 opacity-60" />
                </Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
