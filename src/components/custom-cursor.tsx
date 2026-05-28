'use client';

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * CustomCursor - A premium "Silver Spiderweb" effect.
 * It uses a canvas to draw a persistent mesh of silver threads that trail the mouse.
 * The web connects the current position to multiple historical points, creating a 
 * complex web structure that fades out when the mouse is at rest.
 */

interface Point {
  x: number;
  y: number;
  age: number;
}

export function CustomCursor() {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Cursor state
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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      isMoving.current = true;
      lastMoveTime.current = Date.now();
      document.documentElement.classList.add('no-cursor');

      // Add points to the web history only if moved significantly
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 15) {
        points.current.unshift({ 
          x: mouse.current.x, 
          y: mouse.current.y, 
          age: 100 
        });
        lastMouse.current = { ...mouse.current };
        
        // Keep the history manageable
        if (points.current.length > 40) {
          points.current.pop();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const timeSinceLastMove = now - lastMoveTime.current;

      // Detect rest and fade out
      if (timeSinceLastMove > 100) {
        isMoving.current = false;
        opacity.current = Math.max(0, opacity.current - 0.05);
      } else {
        opacity.current = Math.min(0.6, opacity.current + 0.1);
      }

      // Update ages and filter out dead points
      points.current = points.current
        .map(p => ({ ...p, age: p.age - 1.5 }))
        .filter(p => p.age > 0);

      if (opacity.current > 0.01) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw the web threads
        points.current.forEach((point, i) => {
          const pointAlpha = (point.age / 100) * opacity.current;
          
          // Connect to current mouse
          ctx.beginPath();
          // Silver color logic: use primary (silver in dark, black in light) with alpha
          ctx.strokeStyle = `hsl(var(--primary) / ${pointAlpha * 0.8})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(mouse.current.x, mouse.current.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();

          // Connect adjacent points for the "spine"
          if (i < points.current.length - 1) {
            const nextPoint = points.current[i + 1];
            ctx.beginPath();
            ctx.strokeStyle = `hsl(var(--primary) / ${pointAlpha * 0.4})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            ctx.stroke();
          }

          // Cross-webbing: connect to further points for that web look
          if (i < points.current.length - 4) {
             const farPoint = points.current[i + 4];
             ctx.beginPath();
             ctx.strokeStyle = `hsl(var(--primary) / ${pointAlpha * 0.2})`;
             ctx.lineWidth = 0.3;
             ctx.moveTo(point.x, point.y);
             ctx.lineTo(farPoint.x, farPoint.y);
             ctx.stroke();
          }
        });
      }

      // Draw the Cursor Head
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(var(--primary))';
      ctx.fill();
      
      // Subtle silver outer ring
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'hsl(var(--primary) / 0.3)';
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
