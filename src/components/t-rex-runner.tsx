'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * TRexRunner - High-Fidelity Odyssey Edition.
 * Features:
 * - High-DPI Scaling: Uses devicePixelRatio for absolute sharpness.
 * - Bezier Acceleration: Smooth, non-linear speed increase.
 * - Accurate Alignment: Dragon and obstacles sit perfectly on the bottom road.
 * - Audio Layer: Integrated jump, crash, and milestone sound logic.
 * - Road Integration: The road line is positioned to act as the site's footer line.
 */
export function TRexRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const dragonImg = useRef<HTMLImageElement | null>(null);
  const plantImg = useRef<HTMLImageElement | null>(null);

  // Audio Refs
  const jumpSound = useRef<HTMLAudioElement | null>(null);
  const dieSound = useRef<HTMLAudioElement | null>(null);
  const pointSound = useRef<HTMLAudioElement | null>(null);

  const state = useRef({
    dino: { y: 0, vy: 0, width: 44, height: 47, isJumping: false },
    obstacles: [] as { x: number, width: number, height: number }[],
    gameSpeed: 6, 
    score: 0,
    frameCount: 0,
    canvasWidth: 0,
    canvasHeight: 180,
    lastMilestone: 0,
    groundY: 0,
  });

  const GRAVITY = 0.6;
  const JUMP_FORCE = -11;

  useEffect(() => {
    const stored = localStorage.getItem('odyssey-high-score');
    if (stored) setHighScore(parseInt(stored, 10));

    // Asset Loading
    const d = new Image();
    d.src = '/images/dragon.png';
    d.onload = () => { 
        dragonImg.current = d; 
        const ratio = d.naturalWidth / d.naturalHeight;
        state.current.dino.width = 47 * ratio;
        const s = state.current;
        // Sit exactly on the absolute bottom line
        s.groundY = s.canvasHeight - 1 - s.dino.height;
        if (gameState === 'idle') s.dino.y = s.groundY;
    };

    const p = new Image();
    p.src = '/images/plant.png';
    p.onload = () => { 
        plantImg.current = p; 
    };

    // Audio Initialization
    jumpSound.current = new Audio('/music/jump.wav');
    dieSound.current = new Audio('/music/die.wav');
    pointSound.current = new Audio('/music/point.wav');
  }, []);

  const handleResize = useCallback(() => {
    if (containerRef.current && canvasRef.current) {
      const dpr = window.devicePixelRatio || 1;
      const width = containerRef.current.offsetWidth;
      const height = 180; // Compact height to bring road lower
      
      state.current.canvasWidth = width;
      state.current.canvasHeight = height;
      state.current.groundY = height - 1 - state.current.dino.height;

      // Set display size
      canvasRef.current.style.width = width + 'px';
      canvasRef.current.style.height = height + 'px';

      // Set actual buffer size (High DPI Scaling for Clarity)
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;

      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const resetGame = useCallback(() => {
    const s = state.current;
    s.dino.y = s.groundY;
    s.dino.vy = 0;
    s.dino.isJumping = false;
    s.obstacles = [];
    s.gameSpeed = 6; 
    s.score = 0;
    s.frameCount = 0;
    s.lastMilestone = 0;
    
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
      if (jumpSound.current) {
          jumpSound.current.currentTime = 0;
          jumpSound.current.play().catch(() => {});
      }
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
    let rafId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const s = state.current;
      
      if (gameState === 'playing') {
        s.frameCount++;

        // 1. Update Physics
        s.dino.vy += GRAVITY;
        s.dino.y += s.dino.vy;

        if (s.dino.y >= s.groundY) {
          s.dino.y = s.groundY;
          s.dino.vy = 0;
          s.dino.isJumping = false;
        }

        // 2. Obstacle Spawning
        const spawnInterval = Math.max(50, Math.floor(80 / (s.gameSpeed / 6)));
        if (s.frameCount % spawnInterval === 0 && Math.random() > 0.4) {
            const clusterSize = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < clusterSize; i++) {
                const height = 30 + Math.random() * 15;
                let width = 20;
                if (plantImg.current) {
                    const ratio = plantImg.current.naturalWidth / plantImg.current.naturalHeight;
                    width = height * ratio;
                }
                s.obstacles.push({ 
                    x: s.canvasWidth + (i * width * 1.1), 
                    width, 
                    height 
                });
            }
        }

        // 3. Move & Collision
        s.obstacles = s.obstacles.filter(obs => {
          obs.x -= s.gameSpeed;

          const dinoRect = { 
              left: 50 + 8, 
              right: 50 + s.dino.width - 8, 
              top: s.dino.y + 8, 
              bottom: s.dino.y + s.dino.height - 2 
          };
          const obsRect = { 
              left: obs.x + 4, 
              right: obs.x + obs.width - 4, 
              top: s.canvasHeight - obs.height - 1, 
              bottom: s.canvasHeight - 1 
          };

          if (
              dinoRect.right > obsRect.left &&
              dinoRect.left < obsRect.right &&
              dinoRect.bottom > obsRect.top
          ) {
              setGameState('gameOver');
              if (dieSound.current) {
                  dieSound.current.play().catch(() => {});
              }
              setHighScore(prev => {
                  const newHigh = Math.max(prev, Math.floor(s.score));
                  localStorage.setItem('odyssey-high-score', newHigh.toString());
                  return newHigh;
              });
          }

          return obs.x + obs.width > 0;
        });

        // 4. Score & Smooth Acceleration
        s.score += 0.15;
        const currentScoreInt = Math.floor(s.score);
        setScore(currentScoreInt);

        if (currentScoreInt > 0 && currentScoreInt % 100 === 0 && currentScoreInt !== s.lastMilestone) {
            s.lastMilestone = currentScoreInt;
            if (pointSound.current) {
                pointSound.current.play().catch(() => {});
            }
        }

        const MAX_SPEED = 20;
        const BASE_ACCEL = 0.0008; 
        const speedFactor = 1 - (s.gameSpeed / MAX_SPEED);
        if (s.gameSpeed < MAX_SPEED) {
            s.gameSpeed += BASE_ACCEL * speedFactor;
        }
      }

      // 5. Render
      ctx.clearRect(0, 0, s.canvasWidth, s.canvasHeight);

      const isDark = document.documentElement.classList.contains('dark');
      const primaryColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)';

      // Road (Integrated as the absolute Footer Line)
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, s.canvasHeight - 0.5);
      ctx.lineTo(s.canvasWidth, s.canvasHeight - 0.5);
      ctx.stroke();

      // Dragon
      if (dragonImg.current) {
        ctx.drawImage(dragonImg.current, 50, s.dino.y, s.dino.width, s.dino.height);
      } else {
        ctx.fillStyle = primaryColor;
        ctx.fillRect(50, s.dino.y, s.dino.width, s.dino.height);
      }
      
      // Obstacles
      s.obstacles.forEach(obs => {
        if (plantImg.current) {
          ctx.drawImage(plantImg.current, obs.x, s.canvasHeight - obs.height - 1, obs.width, obs.height);
        } else {
          ctx.fillStyle = primaryColor;
          ctx.fillRect(obs.x, s.canvasHeight - obs.height - 1, obs.width, obs.height);
        }
      });

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [gameState]);

  return (
    <div ref={containerRef} className="w-full relative group bg-transparent overflow-hidden h-[180px] select-none">
      {/* HUD Telemetry */}
      <div className="absolute top-4 right-12 z-20 flex items-center gap-6 font-mono text-sm font-bold opacity-40">
        <p className="tracking-widest">HI {highScore.toString().padStart(5, '0')}</p>
        <p className="tracking-widest">{score.toString().padStart(5, '0')}</p>
      </div>

      <div className="absolute inset-0 cursor-pointer" onClick={jump}>
        <canvas ref={canvasRef} className="w-full h-full block" />

        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-700">
             <div className="text-center font-mono opacity-40">
                <p className="text-xs font-bold uppercase tracking-[0.4em]">Press Space to Start</p>
             </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/10 backdrop-blur-[1px] animate-in zoom-in-95 duration-300">
             <div className="text-center -translate-y-8">
                <h3 className="text-2xl font-mono font-bold tracking-[0.5em] uppercase mb-6 opacity-70">G A M E  O V E R</h3>
                <Button 
                  onClick={(e) => { e.stopPropagation(); resetGame(); }} 
                  variant="ghost"
                  size="icon" 
                  className="rounded-full h-10 w-10 hover:bg-primary/5 transition-all"
                >
                   <RefreshCw className="h-5 w-5 opacity-60" />
                </Button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
