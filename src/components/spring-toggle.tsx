'use client';

import React from 'react';
import { Flower } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSpring } from '@/context/spring-context';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function SpringToggle() {
  const { isSpringMode, toggleSpringMode } = useSpring();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSpringMode}
            className={cn(
              "rounded-full transition-all duration-500 hover:scale-125 active:scale-95",
              isSpringMode ? "text-pink-400 bg-pink-500/10" : "text-muted-foreground hover:bg-accent/50"
            )}
          >
            <Flower className={cn("h-5 w-5 transition-transform duration-700", isSpringMode && "rotate-45")} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{isSpringMode ? 'Disable Spring' : 'Enable Spring'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}