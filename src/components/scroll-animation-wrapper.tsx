
'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollAnimationWrapper({ children, className, delay = 0 }: ScrollAnimationWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger the reveal when the element is slightly visible
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px', // Reveal slightly before it hits the viewport center
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter]',
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100 blur-0' 
          : 'opacity-0 translate-y-20 scale-[0.96] blur-2xl',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
