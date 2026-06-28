
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Activity,
  ArrowLeft,
  X,
  Flame,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format, parseISO, isToday, subDays, getDaysInMonth, startOfMonth, getDay } from 'date-fns';
import { 
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Persistence Tracker
 * A high-fidelity environment for engineering discipline.
 * Stripped of all visual noise. Focused on data, typography, and whitespace.
 */

interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: 'work' | 'personal' | 'growth';
}

type DailyTasks = Record<string, Task[]>;

export default function TrackerPage() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [tasks, setTasks] = useState<DailyTasks>({});
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'work' | 'personal' | 'growth'>('work');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('srini_persistence_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.tasks) setTasks(parsed.tasks);
      } catch (e) {
        console.error('Persistence data corrupted. Resetting.');
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('srini_persistence_data', JSON.stringify({ tasks }));
    }
  }, [tasks, isMounted]);

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

    // Streak Calculation
    const completedDates = keys
      .filter(d => tasks[d].length > 0 && tasks[d].every(t => t.completed))
      .sort((a, b) => a.localeCompare(b));

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    if (completedDates.length > 0) {
      completedDates.forEach((d, i) => {
        if (i === 0) {
          tempStreak = 1;
        } else {
          const prev = parseISO(completedDates[i - 1]);
          const curr = parseISO(d);
          const diff = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
          if (diff === 1) {
            tempStreak++;
          } else {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
          }
        }
      });
      longestStreak = Math.max(longestStreak, tempStreak);

      const todayStr = format(new Date(), 'yyyy-MM-dd');
      const yesterdayStr = format(subDays(new Date(), 1), 'yyyy-MM-dd');
      const isDayComplete = (s: string) => tasks[s] && tasks[s].length > 0 && tasks[s].every(t => t.completed);
      
      let checkDate = isDayComplete(todayStr) ? new Date() : isDayComplete(yesterdayStr) ? subDays(new Date(), 1) : null;
      if (checkDate) {
        while (checkDate && isDayComplete(format(checkDate, 'yyyy-MM-dd'))) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
        }
      }
    }

    return { totalTasks, velocity, activeDays, currentStreak };
  }, [tasks]);

  const getLevel = (dateStr: string) => {
    const dayTasks = tasks[dateStr] || [];
    if (dayTasks.length === 0) return 0;
    const ratio = dayTasks.filter(t => t.completed).length / dayTasks.length;
    if (ratio === 1) return 4;
    if (ratio >= 0.67) return 3;
    if (ratio >= 0.34) return 2;
    return 1;
  };

  const triggerReward = useCallback(() => {
    confetti({
      particleCount: 40,
      spread: 40,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#10b981', '#059669'],
      disableForReducedMotion: true
    });
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: newTaskText,
      completed: false,
      category: newTaskCategory
    };

    setTasks(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newTask]
    }));
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => {
      const dayTasks = prev[selectedDate] || [];
      const updated = dayTasks.map(t => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) triggerReward();
          return { ...t, completed: nextState };
        }
        return t;
      });
      return { ...prev, [selectedDate]: updated };
    });
  };

  const deleteTask = (id: string) => {
    setTasks(prev => {
      const updated = prev[selectedDate].filter(t => t.id !== id);
      const newState = { ...prev };
      if (updated.length === 0) {
        delete newState[selectedDate];
      } else {
        newState[selectedDate] = updated;
      }
      return newState;
    });
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

  const selectedDayTasks = tasks[selectedDate] || [];
  const completedCount = selectedDayTasks.filter(t => t.completed).length;
  const progressPercent = selectedDayTasks.length > 0 ? Math.round((completedCount / selectedDayTasks.length) * 100) : 0;

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/10 text-foreground font-body">
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Section: Header Telemetry */}
          <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors group">
                <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Return to Core
              </Link>
              <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter leading-none">
                Persistence<span className="text-primary">.</span>
              </h1>
              <p className="text-muted-foreground text-sm max-w-md font-medium leading-relaxed italic lora">
                "The focus is on the compound effect of small, intentional commits to the self."
              </p>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-16">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Current Streak</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold tracking-tighter tabular-nums">{stats.currentStreak}</span>
                  <div className="p-1.5 rounded-full bg-primary/5 text-primary">
                    <Flame className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Velocity</p>
                <p className="text-4xl font-bold tracking-tighter tabular-nums">{stats.velocity}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Active Laps</p>
                <p className="text-4xl font-bold tracking-tighter tabular-nums">{stats.activeDays}</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            
            {/* Section: The Matrix (Heatmap) */}
            <div className="lg:col-span-8 space-y-16">
              <div className="flex items-center justify-between border-b border-border/40 pb-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em]">Momentum Matrix</h2>
                <div className="flex items-center gap-4">
                  <button onClick={() => setCurrentYear(prev => prev - 1)} className="p-1 hover:text-primary transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="font-mono font-bold text-sm tracking-widest">{currentYear}</span>
                  <button onClick={() => setCurrentYear(prev => prev + 1)} className="p-1 hover:text-primary transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-12 gap-y-16">
                {monthsData.map((month) => (
                  <div key={month.name} className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">{month.name}</p>
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
                                    "h-3 w-3 rounded-[2px] transition-all duration-300 relative border border-transparent",
                                    level === 0 && "bg-muted/10 border-border/5 hover:bg-muted/30",
                                    level === 1 && "bg-emerald-500/20",
                                    level === 2 && "bg-emerald-500/40",
                                    level === 3 && "bg-emerald-500/70",
                                    level === 4 && "bg-emerald-500 shadow-[0_0_8px_#10b981]",
                                    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background z-10",
                                    isTodayDate && !isSelected && "ring-1 ring-primary/40"
                                  )}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="bg-black text-white text-[10px] font-mono border-none px-3 py-1.5">
                                {format(day.date, 'MMM d')} • {tasks[day.dateStr]?.length || 0} Commit(s)
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Operations (Daily View) */}
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{format(parseISO(selectedDate), 'EEEE')}</p>
                <h3 className="text-4xl font-bold tracking-tighter">
                  {format(parseISO(selectedDate), 'MMM d')}
                </h3>
              </div>

              {/* Progress Telemetry */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Daily Throughput</span>
                  <span className="text-xs font-mono font-bold">{progressPercent}%</span>
                </div>
                <div className="h-0.5 w-full bg-muted/20 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <ScrollArea className="h-[400px] pr-4 -mr-4" data-lenis-prevent>
                  <AnimatePresence mode="popLayout">
                    {selectedDayTasks.length === 0 ? (
                      <div className="py-20 text-center space-y-4 opacity-20">
                        <Activity className="h-12 w-12 mx-auto stroke-[1px]" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Standby for input</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {selectedDayTasks.map((task) => (
                          <motion.div 
                            key={task.id} 
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className={cn(
                              "group flex items-start gap-4 transition-all duration-500",
                              task.completed && "opacity-40"
                            )}
                          >
                            <button 
                              onClick={() => toggleTask(task.id)}
                              className={cn(
                                "mt-1 h-4 w-4 rounded-[3px] border border-border flex items-center justify-center transition-all",
                                task.completed ? "bg-primary border-primary text-primary-foreground" : "hover:border-primary"
                              )}
                            >
                              {task.completed && <Check className="h-3 w-3 stroke-[3px]" />}
                            </button>
                            <div className="flex-1 space-y-1 overflow-hidden">
                              <p className={cn(
                                "text-sm font-medium leading-relaxed tracking-tight relative inline-block transition-all duration-700",
                                task.completed && "italic lora"
                              )}>
                                {task.text}
                                {task.completed && (
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    className="absolute top-1/2 left-0 h-[1px] bg-foreground/60"
                                  />
                                )}
                              </p>
                              <div className="flex items-center gap-3">
                                <span className={cn(
                                  "text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm border",
                                  task.category === 'work' ? "bg-blue-500/5 text-blue-500/60 border-blue-500/10" : 
                                  task.category === 'personal' ? "bg-purple-500/5 text-purple-500/60 border-purple-500/10" : 
                                  "bg-emerald-500/5 text-emerald-500/60 border-emerald-500/10"
                                )}>
                                  {task.category}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => deleteTask(task.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </ScrollArea>

                <form onSubmit={handleAddTask} className="space-y-4 pt-8 border-t border-border/40">
                  <div className="relative group">
                    <Input 
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      placeholder="Add commit..."
                      className="border-none bg-transparent h-12 px-0 text-lg font-bold tracking-tighter placeholder:text-muted-foreground/20 focus-visible:ring-0"
                    />
                    <div className="h-px w-full bg-border/40 group-focus-within:bg-primary transition-colors" />
                    <Button 
                      type="submit" 
                      size="icon" 
                      variant="ghost"
                      disabled={!newTaskText.trim()}
                      className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex gap-4">
                    {(['work', 'personal', 'growth'] as const).map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewTaskCategory(cat)}
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
                          newTaskCategory === cat ? "text-primary" : "text-muted-foreground/40 hover:text-muted-foreground"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

