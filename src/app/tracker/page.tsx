'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Zap, 
  Target, 
  TrendingUp,
  Activity,
  ArrowLeft,
  X
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { format, isSameDay, startOfYear, endOfYear, eachDayOfInterval, getDay, isLeapYear, parseISO, isYesterday, isToday, subDays } from 'date-fns';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * @fileOverview Tracker - A high-fidelity Todo & Habit visualization environment.
 * Features:
 * - Persistent Storage (LocalStorage)
 * - GitHub/LeetCode-style Heatmap (Persistent Green)
 * - Real-time Streak & Consistency Telemetry
 * - Responsive Task Sidebar
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

  // Heatmap Data Generation
  const heatmapDays = useMemo(() => {
    const start = startOfYear(new Date(currentYear, 0, 1));
    const end = endOfYear(new Date(currentYear, 0, 1));
    const days = eachDayOfInterval({ start, end });
    const padding = getDay(start);
    return { days, padding };
  }, [currentYear]);

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

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTaskText,
      completed: false,
      category: 'work'
    };

    setTasks(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newTask]
    }));
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => ({
      ...prev,
      [selectedDate]: prev[selectedDate].map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
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

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container max-w-7xl px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div className="space-y-2">
                <Button asChild variant="ghost" className="-ml-4 group rounded-full text-muted-foreground hover:text-primary">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </Button>
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                        <Activity className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                    <h1 className="font-headline text-4xl font-black tracking-tighter italic uppercase">Tracker.</h1>
                </div>
                <p className="text-muted-foreground lora italic text-lg max-w-md">"Discipline is the bridge between goals and accomplishment."</p>
             </div>

             <div className="flex items-center gap-4 bg-secondary/30 backdrop-blur-xl border border-border/40 p-2 rounded-2xl">
                <Button variant="ghost" size="icon" onClick={() => setCurrentYear(prev => prev - 1)} className="rounded-xl">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-mono font-black text-xl px-4 tracking-widest">{currentYear}</span>
                <Button variant="ghost" size="icon" onClick={() => setCurrentYear(prev => prev + 1)} className="rounded-xl">
                    <ChevronRight className="h-4 w-4" />
                </Button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Heatmap Area */}
            <div className="lg:col-span-3 space-y-8">
                {/* Stats Hud */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Tasks', value: stats.totalTasks, icon: CheckCircle2, color: 'text-primary' },
                        { label: 'Consistency', value: `${stats.rate}%`, icon: Target, color: 'text-info' },
                        { label: 'Active Days', value: stats.activeDays, icon: TrendingUp, color: 'text-emerald-500' },
                        { label: 'Current Streak', value: stats.currentStreak, icon: Zap, color: 'text-feedback' },
                    ].map((stat, i) => (
                        <Card key={i} className="bg-card/40 backdrop-blur-sm border-border/40 group overflow-hidden">
                            <CardContent className="p-6 flex flex-col items-center text-center relative">
                                <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <stat.icon className="h-12 w-12" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</span>
                                <span className={cn("text-3xl font-black italic tracking-tighter", stat.color)}>{stat.value}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* The Consistency Matrix */}
                <Card className="bg-card/40 backdrop-blur-xl border-border/40 rounded-[32px] overflow-hidden shadow-2xl">
                    <CardHeader className="border-b border-border/10 pb-4 bg-primary/5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-emerald-500" />
                                <span className="text-xs font-black uppercase tracking-widest opacity-60">Consistency Matrix</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] font-bold uppercase text-muted-foreground mr-1">Less</span>
                                {[0, 1, 2, 3, 4].map(l => (
                                    <div key={l} className={cn("h-2.5 w-2.5 rounded-[2px]", 
                                        l === 0 ? "bg-muted/20" : 
                                        l === 1 ? "bg-emerald-500/20" : 
                                        l === 2 ? "bg-emerald-500/40" : 
                                        l === 3 ? "bg-emerald-500/70" : "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                                    )} />
                                ))}
                                <span className="text-[8px] font-bold uppercase text-muted-foreground ml-1">More</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 overflow-visible">
                        <div className="overflow-x-auto pb-4 scrollbar-hide">
                            <div className="inline-grid grid-rows-7 grid-flow-col gap-2">
                                {Array.from({ length: heatmapDays.padding }).map((_, i) => (
                                    <div key={`pad-${i}`} className="h-4 w-4" />
                                ))}
                                
                                {heatmapDays.days.map((day) => {
                                    const dateStr = format(day, 'yyyy-MM-dd');
                                    const level = getLevel(dateStr);
                                    const isSelected = selectedDate === dateStr;
                                    const isCurrentDay = isToday(day);

                                    return (
                                        <TooltipProvider key={dateStr}>
                                            <Tooltip delayDuration={0}>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => handleDateClick(dateStr)}
                                                        className={cn(
                                                            "h-4 w-4 rounded-[2px] transition-all duration-300 relative",
                                                            // LeetCode Persistent Green Logic
                                                            level === 0 && "bg-muted/10 hover:bg-muted/30",
                                                            level === 1 && "bg-emerald-500/20 hover:bg-emerald-500/30",
                                                            level === 2 && "bg-emerald-500/40 hover:bg-emerald-500/50",
                                                            level === 3 && "bg-emerald-500/70 hover:bg-emerald-500/80",
                                                            level === 4 && "bg-emerald-500 shadow-[0_0_8px_#10b981] hover:scale-110",
                                                            isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background z-10",
                                                            isCurrentDay && !isSelected && "ring-1 ring-emerald-500/40"
                                                        )}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="text-[10px] font-mono p-2">
                                                    <p className="font-bold">{format(day, 'MMM d, yyyy')}</p>
                                                    <p className="opacity-60">{tasks[dateStr]?.length || 0} tasks recorded</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.4em] text-muted-foreground/40">
                             <span>Jan</span>
                             <span>Apr</span>
                             <span>Jul</span>
                             <span>Oct</span>
                             <span>Dec</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tasks Sidebar Overlay (on mobile) or column (on desktop) */}
            <div className={cn(
                "lg:relative fixed inset-0 z-[150] lg:z-0 lg:block",
                isSidebarOpen ? "block" : "hidden"
            )}>
                <div 
                    className="fixed inset-0 bg-background/60 backdrop-blur-md lg:hidden" 
                    onClick={() => setIsSidebarOpen(false)}
                />
                <Card className={cn(
                    "bg-card/40 backdrop-blur-3xl border-border/40 rounded-[32px] h-full lg:h-[calc(100vh-280px)] lg:sticky top-28 overflow-hidden flex flex-col shadow-2xl relative z-20 transition-all duration-500",
                    isSidebarOpen ? "translate-y-0" : "translate-y-full lg:translate-y-0"
                )}>
                    <CardHeader className="border-b border-border/10 flex flex-row items-start justify-between bg-primary/5">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-1">
                                {format(parseISO(selectedDate), 'EEEE')}
                            </span>
                            <CardTitle className="text-xl font-black tracking-tight italic uppercase">
                                {format(parseISO(selectedDate), 'MMM d, yyyy')}
                            </CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden rounded-full hover:bg-primary/10">
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    
                    <CardContent className="flex-1 overflow-hidden flex flex-col p-6 pt-0">
                        <ScrollArea className="flex-1 -mx-6 px-6 py-6" data-lenis-prevent>
                            <div className="space-y-4">
                                {(!tasks[selectedDate] || tasks[selectedDate].length === 0) ? (
                                    <div className="py-20 text-center flex flex-col items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-muted/5 border border-dashed border-border/40 flex items-center justify-center">
                                            <Plus className="h-6 w-6 text-muted-foreground/20" />
                                        </div>
                                        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/40">No activities recorded</p>
                                    </div>
                                ) : (
                                    tasks[selectedDate].map((task) => (
                                        <div 
                                            key={task.id} 
                                            className={cn(
                                                "group flex items-center gap-3 p-4 rounded-2xl bg-secondary/20 border border-border/20 transition-all duration-300",
                                                task.completed ? "opacity-60 bg-secondary/10" : "hover:bg-secondary/40 shadow-sm"
                                            )}
                                        >
                                            <button 
                                                onClick={() => toggleTask(task.id)}
                                                className={cn(
                                                    "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
                                                    task.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-emerald-500/20 hover:border-emerald-500/40"
                                                )}
                                            >
                                                {task.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                                            </button>
                                            <span className={cn(
                                                "flex-1 text-sm font-medium transition-all",
                                                task.completed && "line-through decoration-emerald-500/40 text-muted-foreground"
                                            )}>
                                                {task.text}
                                            </span>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={() => deleteTask(task.id)}
                                                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </ScrollArea>

                        <div className="pt-6 border-t border-border/10">
                            <form onSubmit={handleAddTask} className="relative">
                                <Input 
                                    value={newTaskText}
                                    onChange={(e) => setNewTaskText(e.target.value)}
                                    placeholder="Add task..."
                                    className="h-12 bg-secondary/40 border-none rounded-2xl pr-12 focus-visible:ring-1 ring-emerald-500/20"
                                />
                                <Button 
                                    type="submit" 
                                    size="icon" 
                                    disabled={!newTaskText.trim()}
                                    className="absolute right-1.5 top-1.5 h-9 w-9 rounded-xl transition-all bg-emerald-500 hover:bg-emerald-600 text-white"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </form>
                            <p className="mt-4 text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 text-center">Cloud Sync Active</p>
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
