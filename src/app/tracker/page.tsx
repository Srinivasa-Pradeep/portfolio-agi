'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { 
  Activity,
  ArrowLeft,
  Flame,
  CalendarDays,
  Trophy,
  CheckCircle2,
  Lock,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format, parseISO, isToday, subDays, getDaysInMonth, startOfMonth, getDay, isBefore, startOfDay, getDay as getDayOfWeek } from 'date-fns';
import { 
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { WeeklyPlanner } from '@/components/tracker/weekly-planner';
import { MilestoneCelebration } from '@/components/tracker/milestone-celebration';
import { Achievements } from '@/components/tracker/achievements';
import { TaskList } from '@/components/tracker/task-list';
import LeftChevron from '@/components/icons/left-chevron';
import RightChevron from '@/components/icons/right-chevron';

/**
 * Persistence Tracker v2.0
 * 
 * FEATURES:
 * - Weekly Habit Templates
 * - Streak Tracking & Milestones
 * - Premium Celebrations
 * - Achievement Vault
 */

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: 'work' | 'personal' | 'growth';
}

export interface TaskTemplate {
  id: string;
  text: string;
  category: 'work' | 'personal' | 'growth';
  days: number[]; // 0-6 (Sun-Sat)
}

export type DailyTasks = Record<string, Task[]>;

export default function TrackerPage() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [tasks, setTasks] = useState<DailyTasks>({});
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [celebratedMilestones, setCelebratedMilestones] = useState<number[]>([]);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Load Data
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('srini_persistence_data_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.templates) setTemplates(parsed.templates);
        if (parsed.celebratedMilestones) setCelebratedMilestones(parsed.celebratedMilestones);
      } catch (e) {
        console.error('Data corrupted. Resetting persistence store.');
      }
    }
  }, []);

  // Save Data
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('srini_persistence_data_v2', JSON.stringify({ 
        tasks, 
        templates, 
        celebratedMilestones 
      }));
    }
  }, [tasks, templates, celebratedMilestones, isMounted]);

  // Template Injection Logic
  useEffect(() => {
    if (!isMounted) return;

    const date = parseISO(selectedDate);
    const dayOfWeek = getDayOfWeek(date);
    
    // Only inject if tasks for this day don't exist yet
    if (!tasks[selectedDate] && templates.length > 0) {
      const applicableTemplates = templates.filter(t => t.days.includes(dayOfWeek));
      
      if (applicableTemplates.length > 0) {
        const newTasks: Task[] = applicableTemplates.map(t => ({
          id: `template-${t.id}-${selectedDate}`,
          text: t.text,
          completed: false,
          category: t.category
        }));

        setTasks(prev => ({
          ...prev,
          [selectedDate]: newTasks
        }));
      }
    }
  }, [selectedDate, templates, isMounted, tasks]);

  const stats = useMemo(() => {
    const keys = Object.keys(tasks);
    let totalTasks = 0;
    let completedTasks = 0;
    let activeDays = 0;

    keys.forEach(date => {
      const dayTasks = tasks[date];
      if (dayTasks.length > 0) {
        activeDays++;
        totalTasks += dayTasks.length;
        completedTasks += dayTasks.filter(t => t.completed).length;
      }
    });

    const velocity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Accurate Streak Calculation
    let currentStreak = 0;
    let checkDate = startOfDay(new Date());
    
    const isDayComplete = (dateStr: string) => {
      const dayTasks = tasks[dateStr];
      return dayTasks && dayTasks.length > 0 && dayTasks.every(t => t.completed);
    };

    if (!isDayComplete(format(checkDate, 'yyyy-MM-dd'))) {
      checkDate = subDays(checkDate, 1);
    }

    while (isDayComplete(format(checkDate, 'yyyy-MM-dd'))) {
      currentStreak++;
      checkDate = subDays(checkDate, 1);
    }

    return { totalTasks, velocity, activeDays, currentStreak };
  }, [tasks]);

  // Milestone Celebration Trigger
  useEffect(() => {
    const milestones = [7, 15, 30, 50, 100, 200, 300, 365, 500, 700, 1000];
    const current = stats.currentStreak;

    if (current > 0 && milestones.includes(current) && !celebratedMilestones.includes(current)) {
      setActiveMilestone(current);
      setCelebratedMilestones(prev => [...prev, current]);
    }
  }, [stats.currentStreak, celebratedMilestones]);

  const getLevel = (dateStr: string) => {
    const dayTasks = tasks[dateStr] || [];
    if (dayTasks.length === 0) return 0;
    const ratio = dayTasks.filter(t => t.completed).length / dayTasks.length;
    if (ratio === 1) return 4;
    if (ratio >= 0.67) return 3;
    if (ratio >= 0.34) return 2;
    return 1;
  };

  const monthsData = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const monthStart = startOfMonth(new Date(currentYear, i, 1));
      const numDays = getDaysInMonth(monthStart);
      const padding = getDay(monthStart);
      const days = Array.from({ length: numDays }).map((_, d) => {
        const date = new Date(currentYear, i, d + 1);
        return {
          date,
          dateStr: format(date, 'yyyy-MM-dd')
        };
      });
      return {
        name: format(monthStart, 'MMM'),
        padding,
        days
      };
    });
  }, [currentYear]);

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-body selection:bg-primary/10">
      <Header />
      
      <main className="flex-1 pt-32 pb-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <header className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-colors group">
                <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Return to Home
              </Link>
              <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none">
                Persistence<span className="text-primary">.</span>
              </h1>
              <p className="text-muted-foreground text-sm max-w-sm font-medium leading-relaxed italic lora">
                "Bookmark this page, you can use it as your personal activity tracker."
              </p>
            </div>

            <div className="flex flex-wrap gap-8 items-end">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50">Momentum Velocity</p>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-bold tracking-tighter tabular-nums">{stats.velocity}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50">Active Iterations</p>
                <p className="text-5xl font-bold tracking-tighter tabular-nums">{stats.activeDays}</p>
              </div>
              <div className="ml-4">
                 <WeeklyPlanner templates={templates} setTemplates={setTemplates} />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-20">
            
            {/* Heat Map Section */}
            <div className="xl:col-span-8 space-y-16">
              <div className="flex items-center justify-between border-b border-border/10 pb-6">
                <div className="flex items-center gap-6">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/80">Activity Heat Map</h2>
                  <div className="h-6 w-px bg-border/20" />
                  <div className="group flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/5 border border-orange-500/10 cursor-default">
                    <motion.div
                      animate={stats.currentStreak > 0 ? { 
                        scale: [1, 1.1, 1],
                        rotate: [0, -5, 5, 0]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-orange-500"
                    >
                      <Flame className="h-3.5 w-3.5 fill-current" />
                    </motion.div>
                    <span className="text-[11px] font-bold tabular-nums text-orange-600/80">{stats.currentStreak} day streak</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentYear(prev => prev - 1)} 
                    className="text-muted-foreground hover:text-primary transition-all p-1"
                    aria-label="Previous Year"
                  >
                    <LeftChevron size={18} />
                  </button>
                  <span className="font-mono font-black text-xs tracking-[0.3em] px-4 py-1 bg-secondary/50 rounded-full">{currentYear}</span>
                  <button 
                    onClick={() => setCurrentYear(prev => prev + 1)} 
                    className="text-muted-foreground hover:text-primary transition-all p-1"
                    aria-label="Next Year"
                  >
                    <RightChevron size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-12 gap-y-16">
                {monthsData.map((month) => (
                  <div key={month.name} className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">{month.name}</p>
                    <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-fit">
                      {Array.from({ length: month.padding }).map((_, i) => (
                        <div key={`pad-${i}`} className="h-3 w-3" />
                      ))}
                      {month.days.map((day) => {
                        const level = getLevel(day.dateStr);
                        const isSelected = selectedDate === day.dateStr;
                        const isTodayDate = isToday(day.date);

                        return (
                          <TooltipProvider key={day.dateStr}>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => setSelectedDate(day.dateStr)}
                                  className={cn(
                                    "h-3 w-3 rounded-[3px] transition-all duration-300 relative border",
                                    level === 0 && "bg-zinc-200/50 dark:bg-zinc-800/50 border-border/60 hover:bg-zinc-300 dark:hover:bg-zinc-700",
                                    level === 1 && "bg-emerald-500/20 border-emerald-500/10",
                                    level === 2 && "bg-emerald-500/40 border-emerald-500/20",
                                    level === 3 && "bg-emerald-500/70 border-emerald-500/30",
                                    level === 4 && "bg-emerald-500 border-emerald-600 shadow-[0_0_8px_#10b981]",
                                    isSelected && "ring-1 ring-primary ring-offset-2 ring-offset-background z-10",
                                    isTodayDate && !isSelected && "ring-1 ring-primary/30"
                                  )}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="bg-black text-white text-[10px] font-mono border-none px-3 py-1.5 rounded-none">
                                {format(day.date, 'MMM d')} — {tasks[day.dateStr]?.length || 0} task(s)
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Achievements Grid */}
              <div className="pt-20">
                <Achievements 
                  currentStreak={stats.currentStreak} 
                  unlockedMilestones={celebratedMilestones}
                  onBadgeClick={(milestone) => setActiveMilestone(milestone)}
                />
              </div>
            </div>

            {/* Daily Operations Section */}
            <div className="xl:col-span-4 space-y-12 lg:pl-12 lg:border-l border-border/10">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">{format(parseISO(selectedDate), 'EEEE')}</p>
                <h3 className="text-4xl font-bold tracking-tighter">
                  {format(parseISO(selectedDate), 'MMM d')}
                </h3>
              </div>

              <TaskList 
                selectedDate={selectedDate} 
                tasks={tasks} 
                setTasks={setTasks} 
              />
            </div>
          </div>
        </div>
      </main>

      {/* Celebration Modal */}
      <MilestoneCelebration 
        milestone={activeMilestone} 
        onClose={() => setActiveMilestone(null)} 
      />

      <Footer />
    </div>
  );
}
