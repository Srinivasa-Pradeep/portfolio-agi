
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Plus, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { DailyTasks, Task } from '@/app/tracker/page';
import confetti from 'canvas-confetti';

export function TaskList({ 
  selectedDate, 
  tasks, 
  setTasks 
}: { 
  selectedDate: string, 
  tasks: DailyTasks, 
  setTasks: React.Dispatch<React.SetStateAction<DailyTasks>> 
}) {
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'work' | 'personal' | 'growth'>('work');

  const selectedDayTasks = tasks[selectedDate] || [];
  const completedCount = selectedDayTasks.filter(t => t.completed).length;
  const progressPercent = selectedDayTasks.length > 0 ? Math.round((completedCount / selectedDayTasks.length) * 100) : 0;

  const triggerReward = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#059669', '#ffffff'],
      disableForReducedMotion: true
    });
  };

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

  return (
    <div className="space-y-12">
      {/* Progress HUD */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Throughput</span>
          <span className="text-xs font-mono font-black">{progressPercent}%</span>
        </div>
        <div className="h-0.5 w-full bg-muted/10 overflow-hidden rounded-full">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-primary"
          />
        </div>
      </div>

      <div className="space-y-8">
        <ScrollArea className="h-[450px] pr-6 -mr-6" data-lenis-prevent>
          <AnimatePresence mode="popLayout">
            {selectedDayTasks.length === 0 ? (
              <div className="py-24 text-center space-y-6 opacity-20 grayscale">
                <Activity className="h-10 w-10 mx-auto stroke-[1px]" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em]">Standby for Operations</p>
              </div>
            ) : (
              <div className="space-y-8">
                {selectedDayTasks.map((task) => (
                  <motion.div 
                    key={task.id} 
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className={cn(
                      "group flex items-start gap-4 transition-all duration-700",
                      task.completed && "opacity-30 grayscale"
                    )}
                  >
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={cn(
                        "mt-1 h-4 w-4 rounded-[2px] border border-border flex items-center justify-center transition-all",
                        task.completed ? "bg-primary border-primary text-primary-foreground" : "hover:border-primary active:scale-90"
                      )}
                    >
                      {task.completed && <Check className="h-3 w-3 stroke-[3px]" />}
                    </button>
                    <div className="flex-1 space-y-1.5 overflow-hidden">
                      <div className="text-sm font-medium leading-relaxed tracking-tight relative inline-block transition-all duration-700">
                        {task.text}
                        {task.completed && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            className="absolute top-1/2 left-0 h-[1px] bg-foreground/60"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-[8px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-[1px] border",
                          task.category === 'work' ? "bg-zinc-500/5 text-zinc-500/60 border-zinc-500/10" : 
                          task.category === 'personal' ? "bg-zinc-500/5 text-zinc-500/60 border-zinc-500/10" : 
                          "bg-emerald-500/5 text-emerald-500/60 border-emerald-500/10"
                        )}>
                          {task.category}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-destructive active:scale-90"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>

        <form onSubmit={handleAddTask} className="space-y-6 pt-10 border-t border-border/10">
          <div className="relative group">
            <Input 
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Commit new operation..."
              className="border-none bg-transparent h-12 px-0 text-lg font-bold tracking-tighter placeholder:text-muted-foreground/10 focus-visible:ring-0 rounded-none"
            />
            <div className="h-px w-full bg-border/10 group-focus-within:bg-primary/50 transition-colors" />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost"
              disabled={!newTaskText.trim()}
              className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent text-muted-foreground hover:text-primary transition-colors"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex gap-6">
            {(['work', 'personal', 'growth'] as const).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setNewTaskCategory(cat)}
                className={cn(
                  "text-[9px] font-black uppercase tracking-[0.4em] transition-all",
                  newTaskCategory === cat ? "text-primary translate-y-[-1px]" : "text-muted-foreground/30 hover:text-muted-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

