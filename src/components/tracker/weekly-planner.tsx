
'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays, Plus, Trash2, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaskTemplate } from '@/app/tracker/page';

const DAYS = [
  { label: 'Sun', value: 0 },
  { label: 'Mon', value: 1 },
  { label: 'Tue', value: 2 },
  { label: 'Wed', value: 3 },
  { label: 'Thu', value: 4 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 6 },
];

export function WeeklyPlanner({ 
  templates, 
  setTemplates 
}: { 
  templates: TaskTemplate[], 
  setTemplates: React.Dispatch<React.SetStateAction<TaskTemplate[]>> 
}) {
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState<'work' | 'personal' | 'growth'>('work');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const selectEveryDay = () => {
    setSelectedDays([0, 1, 2, 3, 4, 5, 6]);
  };

  const handleAddTemplate = () => {
    if (!newText.trim() || selectedDays.length === 0) return;

    const template: TaskTemplate = {
      id: crypto.randomUUID(),
      text: newText,
      category: newCategory,
      days: selectedDays
    };

    setTemplates(prev => [...prev, template]);
    setNewText('');
    setSelectedDays([]);
  };

  const removeTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full h-12 px-6 border-border/40 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
          <CalendarDays className="mr-2 h-4 w-4" />
          Plan My Week
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-[32px] border-border/10 bg-background/80 backdrop-blur-2xl p-8 shadow-2xl">
        <DialogHeader>
          <div className="flex justify-center mb-4">
             <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10">
                <CalendarDays className="h-6 w-6 text-primary" />
             </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold tracking-tighter">Weekly Habit Planner</DialogTitle>
          <DialogDescription className="text-center text-xs font-mono uppercase tracking-widest opacity-60">
            Define recurring operations for automated injection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* New Template Form */}
          <div className="space-y-6 bg-secondary/30 p-6 rounded-[24px] border border-border/10">
             <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Task Description</Label>
                <Input 
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="e.g., Morning Run, LeetCode, Reading..."
                  className="bg-background/50 border-none h-12 text-sm font-medium focus-visible:ring-1 focus-visible:ring-primary/20"
                />
             </div>

             <div className="space-y-3">
                <div className="flex justify-between items-end">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Schedule</Label>
                    <button onClick={selectEveryDay} className="text-[9px] font-bold uppercase tracking-widest text-primary hover:underline">Select Every Day</button>
                </div>
                <div className="flex justify-between gap-1">
                   {DAYS.map(day => (
                     <button
                        key={day.value}
                        onClick={() => toggleDay(day.value)}
                        className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center text-[10px] font-black border transition-all",
                            selectedDays.includes(day.value) 
                                ? "bg-primary text-primary-foreground border-primary" 
                                : "bg-background/40 border-border/40 text-muted-foreground hover:border-primary/40"
                        )}
                     >
                        {day.label}
                     </button>
                   ))}
                </div>
             </div>

             <div className="flex gap-4">
                {(['work', 'personal', 'growth'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setNewCategory(cat)}
                    className={cn(
                      "text-[9px] font-black uppercase tracking-[0.3em] transition-all px-3 py-1.5 rounded-full border",
                      newCategory === cat ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground/30 border-transparent hover:text-muted-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
                <Button 
                    size="sm" 
                    onClick={handleAddTemplate}
                    disabled={!newText.trim() || selectedDays.length === 0}
                    className="ml-auto rounded-xl font-bold h-10 px-4"
                >
                    <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
             </div>
          </div>

          {/* List of Templates */}
          <div className="space-y-4">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Active Recurring Tasks</h4>
             <div className="max-h-[200px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {templates.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground/30 italic text-xs">No active templates found.</div>
                ) : (
                    templates.map(t => (
                        <div key={t.id} className="group flex items-center justify-between p-4 bg-secondary/20 rounded-2xl border border-border/5 hover:bg-secondary/40 transition-all">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold tracking-tight">{t.text}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-primary/50">{t.category}</span>
                                    <div className="h-1 w-1 rounded-full bg-border" />
                                    <span className="text-[8px] font-mono text-muted-foreground">
                                        {t.days.length === 7 ? 'Daily' : t.days.map(d => DAYS.find(day => day.value === d)?.label).join(', ')}
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => removeTemplate(t.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-muted-foreground hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                )}
             </div>
          </div>

          <Button 
            onClick={() => setIsOpen(false)}
            className="w-full h-12 rounded-2xl font-black uppercase tracking-widest italic text-xs bg-secondary hover:bg-secondary/80 text-foreground"
          >
            Finished Planning <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

