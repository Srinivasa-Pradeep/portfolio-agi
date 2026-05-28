'use client';

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * CustomCursor - A premium "Spiderweb" or "Silk" cursor effect.
 * It uses a canvas to draw elastic, multi-threaded lines that follow the mouse.
 * The web becomes more visible and stretched during movement and collapses/fades at rest.
 */

export function CustomCursor() {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Cursor state
  const mouse = useRef({ x: -100, y: -100 });
  const lastMouse = useRef({ x: -100, y: -100 });
  const points = useRef<{ x: number, y: number }[]>([]);
  const velocity = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Determine if we should show the cursor
    if (isMobile === undefined || isMobile) {
      document.documentElement.classList.remove('no-cursor');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize trail points
    const POINT_COUNT = 10;
    points.current = Array.from({ length: POINT_COUNT }, () => ({ x: -100, y: -100 }));

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      document.documentElement.classList.add('no-cursor');
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate instant velocity
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const instantV = Math.sqrt(dx * dx + dy * dy);
      
      // Smoothly update global velocity (fades out over time when at rest)
      velocity.current = velocity.current * 0.9 + instantV * 0.1;
      
      lastMouse.current = { ...mouse.current };

      // Physics: Points follow each other with elastic friction to create "silky" motion
      points.current[0].x += (mouse.current.x - points.current[0].x) * 0.45;
      points.current[0].y += (mouse.current.y - points.current[0].y) * 0.45;

      for (let i = 1; i < points.current.length; i++) {
        const p = points.current[i];
        const prev = points.current[i - 1];
        // Increased lag for further points creates the "stretched" look
        const ease = 0.35 - i * 0.025;
        p.x += (prev.x - p.x) * ease;
        p.y += (prev.y - p.y) * ease;
      }

      // Draw the "Spiderweb" Silk threads
      // The threads fade out as velocity decreases to zero (at rest)
      const alpha = Math.min(velocity.current * 0.08, 0.5);
      
      if (alpha > 0.005) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        const drawThread = (offsetX: number, offsetY: number, width: number, opacity: number) => {
            ctx.beginPath();
            // Use the primary theme color with dynamic transparency
            ctx.strokeStyle = `hsl(var(--primary) / ${opacity})`;
            ctx.lineWidth = width;
            ctx.moveTo(points.current[0].x + offsetX, points.current[0].y + offsetY);
            for (let i = 1; i < points.current.length; i++) {
                ctx.lineTo(points.current[i].x + offsetX, points.current[i].y + offsetY);
            }
            ctx.stroke();
        };

        // Draw multiple thin threads to create that textured "web" look
        drawThread(0, 0, 1.2, alpha);
        // Secondary threads with slight offsets based on speed
        drawThread(velocity.current * 0.03, velocity.current * 0.03, 0.6, alpha * 0.4);
        drawThread(-velocity.current * 0.03, -velocity.current * 0.03, 0.6, alpha * 0.4);
      }

      // Draw the Cursor Head
      // Always visible so the user knows where they are pointing
      ctx.beginPath();
      ctx.arc(points.current[0].x, points.current[0].y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(var(--primary))';
      ctx.fill();
      
      // Subtle pulsing ring around the head
      ctx.beginPath();
      ctx.arc(points.current[0].x, points.current[0].y, 7, 0, Math.PI * 2);
      ctx.strokeStyle = 'hsl(var(--primary) / 0.2)';
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
