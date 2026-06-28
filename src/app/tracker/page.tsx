
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Zap, 
  Target, 
  TrendingUp,
  Activity,
  ArrowLeft,
  X,
  Flame
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
 * @fileOverview Tracker - A premium macOS-style Todo & Habit environment.
 * Re-engineered for psychological reward:
 * - 12 Separate Month blocks for perfect alignment.
 * - Flickering Fire Streak Badge for momentum tracking.
 * - High-visibility grid rest state.
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Persistence: Load
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('pulse_tracker_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.tasks) setTasks(parsed.tasks);
      } catch (e) {
        console.error('Failed to parse tracker data');
      }
    }
  }, []);

  // Persistence: Save
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('pulse_tracker_data', JSON.stringify({ tasks }));
    }
  }, [tasks, isMounted]);

  // Telemetry Calculations
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

    const rate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Streak Logic
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
        while (isDayComplete(format(checkDate, 'yyyy-MM-dd'))) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
        }
      }
    }

    return { totalTasks, rate, activeDays, longestStreak, currentStreak };
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

  const triggerCelebration = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#34d399', '#FFA116', '#FFFFFF'],
      disableForReducedMotion: true
    });
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
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
          if (nextState) triggerCelebration();
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

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    setIsSidebarOpen(true);
  };

  const months = useMemo(() => {
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
              name: format(monthStart, 'MMMM'),
              padding,
              days
          };
      });
  }, [currentYear]);

  const dayTasks = tasks[selectedDate] || [];
  const completedCount = dayTasks.filter(t => t.completed).length;
  const progressPercent = dayTasks.length > 0 ? Math.round((completedCount / dayTasks.length) * 100) : 0;

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 relative overflow-hidden">
      {/* Plain Neat Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-[0.05]" />
      </div>

      <Header />
      
      <main className="flex-1 pt-24 pb-20 relative z-10">
        <div className="container max-w-7xl px-6">
          {/* Dashboard Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-start justify-between gap-8">
             <div className="space-y-6">
                <Button asChild variant="ghost" className="-ml-4 group rounded-full text-muted-foreground hover:text-primary transition-all duration-300">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </Button>
                <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-[22px] bg-primary/5 flex items-center justify-center border border-primary/10 shadow-inner group overflow-hidden">
                        <Activity className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h1 className="font-headline text-5xl font-black tracking-tighter italic uppercase text-foreground">Tracker.</h1>
                </div>
             </div>

             <div className="flex items-center gap-4">
                {/* Streak Badge Header - Flickering Fire Animation */}
                <div className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-700 bg-orange-500/10 border border-orange-500/20 text-orange-500 shadow-lg shadow-orange-500/5",
                    stats.currentStreak > 0 ? "opacity-100 translate-x-0" : "opacity-0 pointer-events-none translate-x-10"
                )}>
                    <motion.div
                      animate={{ 
                        rotate: [0, -10, 10, -5, 5, 0],
                        scale: [1, 1.1, 1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <Flame className="h-4 w-4 fill-orange-500" />
                    </motion.div>
                    <span className="font-black text-sm">{stats.currentStreak}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Day Streak</span>
                </div>

                <div className="flex items-center gap-4 bg-secondary/30 backdrop-blur-xl border border-border/40 p-2 rounded-2xl shadow-xl">
                    <Button variant="ghost" size="icon" onClick={() => setCurrentYear(prev => prev - 1)} className="rounded-xl hover:bg-white/5">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="font-mono font-black text-xl px-4 tracking-widest text-primary">{currentYear}</span>
                    <Button variant="ghost" size="icon" onClick={() => setCurrentYear(prev => prev + 1)} className="rounded-xl hover:bg-white/5">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Main Dashboard Area */}
            <div className="lg:col-span-3 space-y-10">
                {/* Stats HUD */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {[
                        { label: 'Total Tasks', value: stats.totalTasks, icon: CheckCircle2, color: 'text-primary', sub: 'Calculated' },
                        { label: 'Consistency', value: `${stats.rate}%`, icon: Target, color: 'text-blue-500', sub: 'Reliability' },
                        { label: 'Active Days', value: stats.activeDays, icon: TrendingUp, color: 'text-emerald-500', sub: 'Engagement' },
                        { label: 'Longest Streak', value: stats.longestStreak, icon: Zap, color: 'text-orange-500', sub: 'Consecutive' },
                    ].map((stat, i) => (
                        <Card key={i} className="bg-card/40 backdrop-blur-md border-border/40 group overflow-hidden transition-all duration-500 hover:border-primary/20 hover:-translate-y-1">
                            <CardContent className="p-6 flex flex-col items-center text-center relative">
                                <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <stat.icon className="h-12 w-12" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-3">{stat.label}</span>
                                <span className={cn("text-3xl font-black italic tracking-tighter mb-1", stat.color)}>{stat.value}</span>
                                <span className="text-[9px] font-mono text-muted-foreground/30 uppercase tracking-widest">{stat.sub}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Activity Heatmap - Separate Months Architecture */}
                <Card className="bg-card/40 backdrop-blur-2xl border-border/40 rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 hover:border-primary/20">
                    <CardHeader className="border-b border-border/10 pb-4 bg-primary/5 px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 text-foreground">Activity Heatmap</span>
                            </div>
                            <div className="flex items-center gap-3 bg-black/5 dark:bg-black/40 px-3 py-1.5 rounded-full border border-border/40">
                                <span className="text-[8px] font-bold uppercase text-muted-foreground/40">Less</span>
                                {[0, 1, 2, 3, 4].map(l => (
                                    <div key={l} className={cn("h-2.5 w-2.5 rounded-[2px] transition-all", 
                                        l === 0 ? "bg-muted/15 border border-border/20" : 
                                        l === 1 ? "bg-emerald-500/20" : 
                                        l === 2 ? "bg-emerald-500/40" : 
                                        l === 3 ? "bg-emerald-500/70" : "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                                    )} />
                                ))}
                                <span className="text-[8px] font-bold uppercase text-muted-foreground/40">More</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                            {months.map((month) => (
                                <div key={month.name} className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-border/10 pb-2">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">{month.name}</h4>
                                    </div>
                                    <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5">
                                        {Array.from({ length: month.padding }).map((_, i) => (
                                            <div key={`pad-${i}`} className="h-[14px] w-[14px]" />
                                        ))}
                                        
                                        {month.days.map((day) => {
                                            const level = getLevel(day.dateStr);
                                            const isSelected = selectedDate === day.dateStr;
                                            const isCurrentDay = isToday(day.date);

                                            return (
                                                <TooltipProvider key={day.dateStr}>
                                                    <Tooltip delayDuration={0}>
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                onClick={() => handleDateClick(day.dateStr)}
                                                                className={cn(
                                                                    "h-[14px] w-[14px] rounded-[3px] transition-all duration-300 relative transform-gpu border",
                                                                    level === 0 && "bg-muted/15 border-border/30 hover:bg-muted/30",
                                                                    level === 1 && "bg-emerald-500/20 border-transparent hover:bg-emerald-500/30",
                                                                    level === 2 && "bg-emerald-500/40 border-transparent hover:bg-emerald-500/50",
                                                                    level === 3 && "bg-emerald-500/70 border-transparent hover:bg-emerald-500/80",
                                                                    level === 4 && "bg-emerald-500 border-transparent shadow-[0_0_10px_#10b981] hover:scale-125 hover:z-20",
                                                                    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background z-10 scale-110",
                                                                    isCurrentDay && !isSelected && "ring-1 ring-emerald-500/40"
                                                                )}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="text-[11px] font-mono p-4 bg-black/90 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl">
                                                            <p className="font-black text-white mb-1.5 uppercase tracking-widest">{format(day.date, 'EEEE, MMM d')}</p>
                                                            <div className="flex items-center gap-3">
                                                                <div className={cn("h-1.5 w-1.5 rounded-full", level > 0 ? "bg-emerald-500 animate-pulse" : "bg-white/10")} />
                                                                <p className="text-muted-foreground/60">{tasks[day.dateStr]?.length || 0} activities recorded</p>
                                                            </div>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sidebar Management */}
            <div className={cn(
                "lg:relative fixed inset-0 z-[150] lg:z-0 lg:block transition-all duration-700",
                isSidebarOpen ? "block" : "hidden pointer-events-none lg:pointer-events-auto"
            )}>
                <div 
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden" 
                    onClick={() => setIsSidebarOpen(false)}
                />
                <Card className={cn(
                    "bg-card/60 backdrop-blur-3xl border-border/40 rounded-[45px] h-full lg:h-[calc(100vh-280px)] lg:sticky top-28 overflow-hidden flex flex-col shadow-2xl relative z-20 transition-all duration-700 transform-gpu",
                    isSidebarOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 lg:translate-y-0 lg:opacity-100"
                )}>
                    <CardHeader className="border-b border-border/10 p-8 bg-primary/5">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500">
                                    {format(parseISO(selectedDate), 'EEEE')}
                                </span>
                                <CardTitle className="text-2xl font-black tracking-tighter italic uppercase text-foreground">
                                    {format(parseISO(selectedDate), 'MMM d, yyyy')}
                                </CardTitle>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden rounded-full hover:bg-white/5 h-10 w-10">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="flex-1 overflow-hidden flex flex-col p-8 pt-0">
                        {/* Daily Progress Module */}
                        <div className="py-6 space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                                <span>Day Velocity</span>
                                <span className="text-emerald-500">{progressPercent}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 ease-out"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>

                        <ScrollArea className="flex-1 -mx-8 px-8 py-2" data-lenis-prevent>
                            <div className="space-y-5">
                                {dayTasks.length === 0 ? (
                                    <div className="py-24 text-center flex flex-col items-center gap-6">
                                        <div className="h-16 w-16 rounded-[24px] bg-muted/10 border border-dashed border-border flex items-center justify-center">
                                            <Plus className="h-6 w-6 text-muted-foreground/20" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Awaiting your next move...</p>
                                        </div>
                                    </div>
                                ) : (
                                    dayTasks.map((task) => (
                                        <div 
                                            key={task.id} 
                                            className={cn(
                                                "group flex items-center gap-4 p-5 rounded-[22px] bg-card border border-border/40 transition-all duration-500 hover:scale-[1.02] transform-gpu",
                                                task.completed ? "opacity-30 grayscale" : "hover:border-primary/20"
                                            )}
                                        >
                                            <button 
                                                onClick={() => toggleTask(task.id)}
                                                className={cn(
                                                    "h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all duration-500 shrink-0",
                                                    task.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-border hover:border-emerald-500/40"
                                                )}
                                            >
                                                {task.completed && <CheckCircle2 className="h-4 w-4" />}
                                            </button>
                                            <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                                                <span className={cn(
                                                    "text-sm font-bold tracking-tight transition-all truncate relative",
                                                    task.completed && "text-muted-foreground"
                                                )}>
                                                    {task.text}
                                                    {task.completed && (
                                                      <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "100%" }}
                                                        className="absolute top-1/2 left-0 h-px bg-muted-foreground"
                                                      />
                                                    )}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full",
                                                        task.category === 'work' ? "bg-purple-500" : task.category === 'personal' ? "bg-blue-500" : "bg-emerald-500"
                                                    )} />
                                                    <span className="text-[9px] font-black uppercase tracking-widest opacity-30">{task.category}</span>
                                                </div>
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={() => deleteTask(task.id)}
                                                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/10 hover:text-destructive shrink-0"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </ScrollArea>

                        <div className="pt-8 space-y-6">
                            <form onSubmit={handleAddTask} className="space-y-4">
                                <div className="relative">
                                    <Input 
                                        value={newTaskText}
                                        onChange={(e) => setNewTaskText(e.target.value)}
                                        placeholder="Add new activity..."
                                        className="h-14 bg-card border-border/40 rounded-2xl pr-12 focus-visible:ring-1 ring-emerald-500/20 font-bold placeholder:text-muted-foreground/30"
                                    />
                                    <Button 
                                        type="submit" 
                                        size="icon" 
                                        disabled={!newTaskText.trim()}
                                        className="absolute right-2 top-2 h-10 w-10 rounded-xl transition-all bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between px-2">
                                    <div className="flex gap-2">
                                        {(['work', 'personal', 'growth'] as const).map(cat => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setNewTaskCategory(cat)}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-300",
                                                    newTaskCategory === cat 
                                                        ? "bg-primary/10 border-primary/20 text-primary" 
                                                        : "bg-muted/20 border-border/40 text-muted-foreground/50 hover:bg-muted/30"
                                                )}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
