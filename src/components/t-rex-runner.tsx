'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Gamepad2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * TRexRunner - A high-fidelity, React-engineered runner game.
 * Optimized for performance using requestAnimationFrame and a gravity-locked physics system.
 */
export function TRexRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Game Refs for high-speed logic without re-renders
  const state = useRef({
    dino: { y: 150, vy: 0, width: 44, height: 47, isJumping: false },
    obstacles: [] as { x: number, width: number, height: number }[],
    gameSpeed: 6,
    score: 0,
    frameCount: 0,
  });

  const GRAVITY = 0.6;
  const JUMP_FORCE = -12;
  const GROUND_Y = 150;

  const resetGame = useCallback(() => {
    state.current = {
      dino: { y: GROUND_Y, vy: 0, width: 44, height: 47, isJumping: false },
      obstacles: [],
      gameSpeed: 6,
      score: 0,
      frameCount: 0,
    };
    setScore(0);
    setGameState('playing');
  }, []);

  const jump = useCallback(() => {
    if (gameState === 'idle') {
      resetGame();
      return;
    }
    if (gameState === 'gameOver') {
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

      // 2. Spawn Obstacles
      if (s.frameCount % Math.floor(100 / (s.gameSpeed / 6)) === 0) {
        if (Math.random() > 0.5) {
            const width = 20 + Math.random() * 30;
            const height = 30 + Math.random() * 40;
            s.obstacles.push({ x: canvas.width, width, height });
        }
      }

      // 3. Move & Check Collisions
      s.obstacles = s.obstacles.filter(obs => {
        obs.x -= s.gameSpeed;

        // Collision Check
        const dinoRect = { 
            left: 20, 
            right: 20 + s.dino.width - 10, 
            top: s.dino.y, 
            bottom: s.dino.y + s.dino.height 
        };
        const obsRect = { 
            left: obs.x + 5, 
            right: obs.x + obs.width - 5, 
            top: canvas.height - obs.height, 
            bottom: canvas.height 
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

      // 4. Update Score & Difficulty
      s.score += 0.1;
      setScore(Math.floor(s.score));
      if (s.gameSpeed < 15) s.gameSpeed += 0.001;

      // 5. Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Ground
      ctx.strokeStyle = 'hsl(var(--border))';
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y + 47);
      ctx.lineTo(canvas.width, GROUND_Y + 47);
      ctx.stroke();

      // Draw Dino (Simple Geometry for high-end feel)
      ctx.fillStyle = 'hsl(var(--primary))';
      ctx.beginPath();
      ctx.roundRect(20, s.dino.y, s.dino.width, s.dino.height, 8);
      ctx.fill();
      
      // Eye
      ctx.fillStyle = 'hsl(var(--background))';
      ctx.fillRect(50, s.dino.y + 10, 4, 4);

      // Draw Obstacles
      ctx.fillStyle = 'hsl(var(--destructive))';
      s.obstacles.forEach(obs => {
        ctx.beginPath();
        ctx.roundRect(obs.x, canvas.height - obs.height, obs.width, obs.height, 4);
        ctx.fill();
      });

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [gameState]);

  return (
    <div className="relative group w-full max-w-md bg-secondary/10 backdrop-blur-xl border border-border/40 rounded-[32px] p-6 overflow-hidden transition-all hover:border-primary/20">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">ODYSSEY_RUNNER_v1.0</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] font-bold">
          <p className="text-muted-foreground uppercase tracking-widest">HI <span className="text-primary">{highScore.toString().padStart(5, '0')}</span></p>
          <p className="text-primary uppercase tracking-widest">{score.toString().padStart(5, '0')}</p>
        </div>
      </div>

      <div className="relative aspect-[2/1] w-full bg-black/5 rounded-2xl border border-border/20 overflow-hidden cursor-pointer" onClick={jump}>
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={200} 
          className="w-full h-full"
        />

        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm animate-in fade-in duration-500">
             <p className="text-xs font-black uppercase tracking-[0.4em] mb-4">Press Space to Start</p>
             <div className="h-10 w-24 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5">
                <span className="text-[10px] font-bold">JUMP: SPACE</span>
             </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md animate-in zoom-in-95 duration-300">
             <h3 className="text-xl font-black italic tracking-tighter uppercase mb-1">Crash Detected</h3>
             <p className="text-[10px] text-muted-foreground font-mono mb-6 uppercase tracking-widest">System Reboot Required</p>
             <Button onClick={resetGame} size="sm" className="rounded-full px-6 gap-2">
                <RefreshCw className="h-3.5 w-3.5" />
                Retry
             </Button>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-[8px] font-mono text-muted-foreground/40 uppercase tracking-[0.5em]">Optimized_For_Keyboard_Input</p>
    </div>
  );
}
