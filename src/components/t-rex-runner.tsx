'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Gamepad2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * TRexRunner - Full-Width Immersive Edition.
 * Features custom asset support for Dragon (Player) and Plant (Obstacle).
 * Spans the entire bottom architectural space.
 */
export function TRexRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Custom Asset Refs
  const dragonImg = useRef<HTMLImageElement | null>(null);
  const plantImg = useRef<HTMLImageElement | null>(null);

  const state = useRef({
    dino: { y: 150, vy: 0, width: 80, height: 80, isJumping: false },
    obstacles: [] as { x: number, width: number, height: number }[],
    gameSpeed: 8,
    score: 0,
    frameCount: 0,
    canvasWidth: 0,
    canvasHeight: 250,
  });

  const GRAVITY = 0.6;
  const JUMP_FORCE = -14;
  const GROUND_Y = 160;

  useEffect(() => {
    // Load custom assets
    const d = new Image();
    d.src = '/images/dragon.png'; // User can replace this in public/images/
    d.onerror = () => { dragonImg.current = null; };
    d.onload = () => { dragonImg.current = d; };

    const p = new Image();
    p.src = '/images/plant.png'; // User can replace this in public/images/
    p.onerror = () => { plantImg.current = null; };
    p.onload = () => { plantImg.current = p; };
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
      dino: { y: GROUND_Y, vy: 0, width: 80, height: 80, isJumping: false },
      obstacles: [],
      gameSpeed: 8,
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

      // 2. Spawn Obstacles (Plants)
      if (s.frameCount % Math.floor(90 / (s.gameSpeed / 8)) === 0) {
        if (Math.random() > 0.4) {
            const width = 40 + Math.random() * 40;
            const height = 50 + Math.random() * 60;
            s.obstacles.push({ x: s.canvasWidth, width, height });
        }
      }

      // 3. Move & Check Collisions
      s.obstacles = s.obstacles.filter(obs => {
        obs.x -= s.gameSpeed;

        const dinoRect = { 
            left: 100, 
            right: 100 + s.dino.width - 20, 
            top: s.dino.y + 10, 
            bottom: s.dino.y + s.dino.height - 10
        };
        const obsRect = { 
            left: obs.x + 10, 
            right: obs.x + obs.width - 10, 
            top: s.canvasHeight - obs.height, 
            bottom: s.canvasHeight 
        };

        if (
            dinoRect.right > obsRect.left &&
            dinoRect.left < obsRect.right &&
            dinoRect.bottom > obsRect.top
        ) {
            setGameState('gameOver');
            setHighScore(prev => Math.max(prev, Math.floor(s.score)));
        }

        return obs.x + obs.width > 0;
      });

      // 4. Update Score
      s.score += 0.15;
      setScore(Math.floor(s.score));
      if (s.gameSpeed < 18) s.gameSpeed += 0.002;

      // 5. Draw
      ctx.clearRect(0, 0, s.canvasWidth, s.canvasHeight);

      // Grid Background (Reference Match)
      ctx.strokeStyle = 'rgba(0,0,0,0.05)';
      if (document.documentElement.classList.contains('dark')) ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < s.canvasWidth; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, s.canvasHeight);
        ctx.stroke();
      }

      // Draw Player (Dragon)
      if (dragonImg.current) {
        ctx.drawImage(dragonImg.current, 100, s.dino.y, s.dino.width, s.dino.height);
      } else {
        // Fallback geometric shape
        ctx.fillStyle = 'hsl(var(--primary))';
        ctx.beginPath();
        ctx.roundRect(100, s.dino.y, s.dino.width, s.dino.height, 12);
        ctx.fill();
      }
      
      // Draw Obstacles (Plants)
      s.obstacles.forEach(obs => {
        if (plantImg.current) {
          ctx.drawImage(plantImg.current, obs.x, s.canvasHeight - obs.height, obs.width, obs.height);
        } else {
          // Fallback geometric shape
          ctx.fillStyle = 'hsl(var(--destructive))';
          ctx.beginPath();
          ctx.roundRect(obs.x, s.canvasHeight - obs.height, obs.width, obs.height, 6);
          ctx.fill();
        }
      });

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [gameState]);

  return (
    <div ref={containerRef} className="w-full relative group bg-secondary/5 border-t border-border/40 overflow-hidden transition-all h-[350px]">
      <div className="absolute top-8 left-12 z-20 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Odyssey_Engine_Active</span>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs font-bold">
          <p className="text-muted-foreground uppercase tracking-widest">HI_SCORE <span className="text-primary">{highScore.toString().padStart(5, '0')}</span></p>
          <p className="text-primary uppercase tracking-widest">LIVE_SCORE <span className="text-primary">{score.toString().padStart(5, '0')}</span></p>
        </div>
      </div>

      <div className="absolute inset-0 cursor-pointer" onClick={jump}>
        <canvas ref={canvasRef} className="w-full h-full" />

        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/20 backdrop-blur-[2px] animate-in fade-in duration-700">
             <div className="p-8 rounded-[40px] bg-card/40 border border-white/10 shadow-2xl text-center">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Initialize Odyssey</h3>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">Press Space to Start Exploration</p>
                <div className="h-12 w-32 mx-auto rounded-full border border-primary/20 flex items-center justify-center bg-primary/5">
                   <span className="text-[10px] font-black">DRAGON_MODE</span>
                </div>
             </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md animate-in zoom-in-95 duration-300">
             <div className="text-center">
                <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-1 text-destructive">Collision Detected</h3>
                <p className="text-sm text-muted-foreground font-mono mb-8 uppercase tracking-widest">Atmospheric Re-entry Required</p>
                <Button onClick={(e) => { e.stopPropagation(); resetGame(); }} size="lg" className="rounded-full px-10 h-16 text-lg font-bold gap-3">
                   <RefreshCw className="h-5 w-5" />
                   Restart Engine
                </Button>
             </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
         <p className="text-[9px] font-mono font-bold uppercase tracking-[0.6em]">Precision_Motion_Control_System</p>
      </div>
    </div>
  );
}
