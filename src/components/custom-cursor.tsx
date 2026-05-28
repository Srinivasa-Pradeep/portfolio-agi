'use client';

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * CustomCursor - A premium "High-Definition Silver Spiderweb" effect.
 * Uses devicePixelRatio for crystal clear rendering.
 * Features a persistent silver mesh that connects multiple historical points.
 */

interface Point {
  x: number;
  y: number;
  age: number;
}

export function CustomCursor() {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const mouse = useRef({ x: -100, y: -100 });
  const points = useRef<Point[]>([]);
  const lastMouse = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);
  const opacity = useRef(0);
  const isMoving = useRef(false);
  const lastMoveTime = useRef(0);

  useEffect(() => {
    if (isMobile === undefined || isMobile) {
      document.documentElement.classList.remove('no-cursor');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const handleResize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      isMoving.current = true;
      lastMoveTime.current = Date.now();
      document.documentElement.classList.add('no-cursor');

      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8) { // More frequent points for smoother web
        points.current.unshift({ 
          x: mouse.current.x, 
          y: mouse.current.y, 
          age: 100 
        });
        lastMouse.current = { ...mouse.current };
        
        if (points.current.length > 50) {
          points.current.pop();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const now = Date.now();
      const timeSinceLastMove = now - lastMoveTime.current;

      if (timeSinceLastMove > 150) {
        isMoving.current = false;
        opacity.current = Math.max(0, opacity.current - 0.02);
      } else {
        opacity.current = Math.min(0.8, opacity.current + 0.08);
      }

      points.current = points.current
        .map(p => ({ ...p, age: p.age - 1.2 }))
        .filter(p => p.age > 0);

      if (opacity.current > 0.01) {
        // High-fidelity Silver Color (Metallic)
        const silverBase = "240, 5%, 85%"; 
        
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        points.current.forEach((point, i) => {
          const pointAlpha = (point.age / 100) * opacity.current;
          
          // 1. Primary silk threads (Mouse to history)
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${silverBase}, ${pointAlpha * 0.5})`;
          ctx.lineWidth = 0.4;
          ctx.moveTo(mouse.current.x, mouse.current.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();

          // 2. The "Spine" (Path connection)
          if (i < points.current.length - 1) {
            const nextPoint = points.current[i + 1];
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${silverBase}, ${pointAlpha * 0.3})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            ctx.stroke();
          }

          // 3. Cross-webbing (Mesh reinforcement)
          if (i % 3 === 0 && i < points.current.length - 6) {
             const farPoint = points.current[i + 6];
             ctx.beginPath();
             ctx.strokeStyle = `hsla(${silverBase}, ${pointAlpha * 0.15})`;
             ctx.lineWidth = 0.2;
             ctx.moveTo(point.x, point.y);
             ctx.lineTo(farPoint.x, farPoint.y);
             ctx.stroke();
          }
        });

        // 4. Subtle Crystal Glow on the mouse head
        const gradient = ctx.createRadialGradient(
          mouse.current.x, mouse.current.y, 0,
          mouse.current.x, mouse.current.y, 10
        );
        gradient.addColorStop(0, `hsla(${silverBase}, ${opacity.current})`);
        gradient.addColorStop(1, `hsla(${silverBase}, 0)`);
        
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw the core Cursor Head
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(240, 5%, 85%)`; // Solid Silver
      ctx.fill();
      
      // Outer ring
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 6, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity.current * 0.4})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove('no-cursor');
    };
  }, [isMobile]);

  if (isMobile === undefined || isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] will-change-transform"
    />
  );
}
