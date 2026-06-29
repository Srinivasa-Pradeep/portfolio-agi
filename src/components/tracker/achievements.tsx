'use client';

import React, { useState } from 'react';
import { Trophy, ShieldCheck, Star, Award, Zap, Gem, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import BatteryChargingIcon from '@/components/icons/battery-charging-icon';
import RocketIcon from '@/components/icons/rocket-icon';
import HeartIcon from '@/components/icons/heart-icon';
import BrightnessDownIcon from '@/components/icons/brightness-down-icon';
import TrophyIcon from '@/components/icons/trophy-icon';

const MILESTONES = [
  { days: 7, label: 'Early Gains', icon: BatteryChargingIcon, color: 'text-blue-400', isAnimated: true },
  { days: 15, label: 'Momentum', icon: RocketIcon, color: 'text-emerald-400', isAnimated: true },
  { days: 30, label: 'Habit Anchor', icon: HeartIcon, color: 'text-purple-400', isAnimated: true },
  { days: 50, label: 'Golden Iteration', icon: BrightnessDownIcon, color: 'text-amber-500', isAnimated: true },
  { days: 100, label: 'Centurion', icon: TrophyIcon, color: 'text-yellow-400', isAnimated: true },
  { days: 365, label: 'Legendary', icon: Gem, color: 'text-pink-400', isAnimated: false },
];

export function Achievements({ 
  currentStreak, 
  unlockedMilestones 
}: { 
  currentStreak: number, 
  unlockedMilestones: number[] 
}) {
  const [hoveredDays, setHoveredDays] = useState<number | null>(null);

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-6">
        <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/80">Achievement Vault</h2>
        <div className="h-px flex-1 bg-border/10" />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
        <TooltipProvider delayDuration={0}>
          {MILESTONES.map((m) => {
            const isUnlocked = unlockedMilestones.includes(m.days) || currentStreak >= m.days;
            const Icon = m.icon;

            return (
              <Tooltip key={m.days}>
                <TooltipTrigger asChild>
                  <motion.div 
                    onHoverStart={() => isUnlocked && setHoveredDays(m.days)}
                    onHoverEnd={() => setHoveredDays(null)}
                    whileHover={isUnlocked ? { y: -5, scale: 1.05 } : {}}
                    className={cn(
                        "relative aspect-square flex flex-col items-center justify-center rounded-[32px] border transition-all duration-700",
                        isUnlocked 
                            ? "bg-secondary/30 border-primary/10 shadow-xl" 
                            : "bg-transparent border-border/10 opacity-40 grayscale"
                    )}
                  >
                    <div className={cn(
                        "p-3 rounded-2xl transition-all duration-1000",
                        isUnlocked ? `bg-primary/5 ${m.color}` : "bg-muted/10 text-muted-foreground"
                    )}>
                        <Icon 
                          size={24} 
                          className="transition-colors"
                          {...(m.isAnimated ? { active: hoveredDays === m.days } : {})}
                        />
                    </div>
                    <span className="mt-3 text-[8px] font-black uppercase tracking-widest text-foreground/60">{m.days}D</span>
                    
                    {isUnlocked && (
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-background">
                            <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                        </div>
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-900/95 border-zinc-800 p-3 rounded-xl shadow-2xl backdrop-blur-xl">
                    <div className="text-center space-y-1">
                        <p className={cn("text-[10px] font-black uppercase tracking-widest", m.color)}>
                          {m.label}
                        </p>
                        <p className="text-xs font-medium text-zinc-100">{m.days} Day Commitment</p>
                        {!isUnlocked && (
                            <div className="flex items-center justify-center gap-1.5 mt-2 pt-2 border-t border-white/5">
                                <Lock className="h-3 w-3 text-zinc-500" />
                                <span className="text-[9px] font-mono text-zinc-500 uppercase">Locked</span>
                            </div>
                        )}
                    </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}
