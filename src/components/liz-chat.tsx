'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Sparkles, X, Send, User, MessageSquareText, ChevronRight, Loader2, Cpu, Zap, ArrowRight, CornerDownRight } from 'lucide-react';
import { talkToLiz } from '@/app/actions';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "What's his tech stack?",
  "Tell me about Amazon",
  "What is MedQuery?",
  "Tell me his story"
];

type LizState = 'ritual' | 'docked' | 'open';

export function LizChat() {
  const [state, setState] = useState<LizState>('ritual');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "I am Liz. Your digital guide to Srini's journey and technical world. How shall we begin?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasDismissedRitual, setHasDismissedRitual] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has already dismissed the ritual this session
    const dismissed = sessionStorage.getItem('liz_ritual_dismissed');
    if (dismissed) {
        setState('docked');
        setHasDismissedRitual(true);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, state]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    if (state === 'ritual') {
        handleEnterStory();
    }

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const result = await talkToLiz(content, messages);
    
    setMessages(prev => [...prev, { role: 'model', content: result.response }]);
    setIsLoading(false);
  };

  const handleEnterStory = () => {
    setState('docked');
    setHasDismissedRitual(true);
    sessionStorage.setItem('liz_ritual_dismissed', 'true');
  };

  const toggleChat = () => {
    if (state === 'open') {
        setState('docked');
    } else {
        setState('open');
    }
  };

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none">
      {/* 1. Ritual State - Centered Entry Portal */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-auto",
        state === 'ritual' ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
      )}>
        <div className="w-full max-w-xl p-8 rounded-[40px] bg-background/60 backdrop-blur-3xl border border-white/10 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.8)] text-center relative overflow-hidden group">
            {/* Neural Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[100px] rounded-full animate-pulse" />
            
            <div className="relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="h-20 w-20 rounded-[30px] bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <Cpu className="h-10 w-10 text-primary animate-pulse" />
                    </div>
                </div>
                
                <h2 className="font-headline text-3xl font-black tracking-tighter uppercase italic mb-2">Initialize Liz</h2>
                <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.4em] mb-10">Neural_Guide_v2.0_Active</p>
                
                <div className="p-6 rounded-3xl bg-secondary/30 border border-border/10 mb-10">
                    <p className="lora italic text-lg leading-relaxed text-foreground/90">
                        "I can guide you through Srini's technical builds, research, and the philosophy that fuels his grit."
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <form 
                        onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); setState('open'); }}
                        className="relative"
                    >
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask me anything..."
                            className="h-16 bg-secondary/50 border-none rounded-2xl px-6 text-lg focus-visible:ring-1 ring-primary/20"
                        />
                        <Button type="submit" size="icon" className="absolute right-2 top-2 h-12 w-12 rounded-xl bg-primary">
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                    <Button 
                        variant="ghost" 
                        onClick={handleEnterStory}
                        className="text-xs font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
                    >
                        Skip to Portfolio <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                </div>
            </div>
        </div>
      </div>

      {/* 2. Docked/Open State - Left Intelligence Ribbon & Panel */}
      <div className={cn(
        "absolute inset-y-0 left-0 flex items-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]",
        state !== 'ritual' ? "translate-x-0" : "-translate-x-20"
      )}>
        {/* The Vertical Ribbon Trigger */}
        <div className="pointer-events-auto h-[400px] flex items-center">
            <button
                onClick={toggleChat}
                className={cn(
                    "group relative w-12 h-64 flex flex-col items-center justify-between py-8",
                    "bg-background/40 backdrop-blur-2xl border-y border-r border-white/10 rounded-r-3xl transition-all duration-500",
                    "hover:w-16 hover:bg-background/60 shadow-2xl overflow-hidden",
                    state === 'open' && "opacity-0 translate-x-[-100%] pointer-events-none"
                )}
            >
                {/* Visual Glow Layer */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-black uppercase tracking-[0.5em] text-primary/40 group-hover:text-primary transition-colors">
                    INTELLIGENCE_LINK
                </span>
                
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
                    <Cpu className="h-5 w-5 text-primary relative z-10" />
                </div>

                <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-black uppercase tracking-[0.5em] text-primary/40 group-hover:text-primary transition-colors">
                    LIZ_v2.0
                </span>
            </button>
        </div>

        {/* The Sliding Panel HUD */}
        <div className={cn(
            "pointer-events-auto absolute left-0 inset-y-8 w-[calc(100vw-3rem)] sm:w-[450px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu",
            state === 'open' ? "translate-x-4 opacity-100 scale-100" : "translate-x-[-110%] opacity-0 scale-95 pointer-events-none"
        )}>
            <div className="h-full w-full flex flex-col bg-background/80 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* HUD Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 relative group">
                            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                            <Cpu className="h-6 w-6 text-primary relative z-10" />
                        </div>
                        <div>
                            <h3 className="font-headline font-bold text-xl tracking-tighter">Liz.AI</h3>
                            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.3em]">Architectural_Guide_Online</p>
                        </div>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleChat}
                        className="rounded-full hover:bg-white/10 h-10 w-10"
                    >
                        <X className="h-5 w-5 opacity-40" />
                    </Button>
                </div>

                {/* AI Communication Log */}
                <ScrollArea className="flex-1 p-8" data-lenis-prevent>
                    <div className="space-y-8">
                        {messages.map((msg, i) => (
                            <div 
                                key={i} 
                                className={cn(
                                    "flex flex-col gap-3 max-w-[90%]",
                                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                                )}
                            >
                                <div className={cn(
                                    "px-5 py-4 rounded-3xl text-sm leading-relaxed",
                                    msg.role === 'user' 
                                        ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg" 
                                        : "bg-secondary/40 backdrop-blur-md border border-white/5 rounded-tl-none lora italic text-foreground/90 font-medium"
                                )}>
                                    {msg.content}
                                </div>
                                <div className="flex items-center gap-2 px-1">
                                    <span className="text-[8px] uppercase tracking-[0.2em] font-mono opacity-30">
                                        {msg.role === 'user' ? 'AUTHORIZED_SOURCE' : 'NEURAL_EMISSION'}
                                    </span>
                                    {msg.role === 'model' && <Zap className="h-2 w-2 text-primary animate-pulse" />}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-center gap-3 text-primary/60 animate-pulse px-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Processing_Neural_Array...</span>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>

                {/* Suggested Interaction Array */}
                <div className="px-8 py-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {SUGGESTED_QUESTIONS.map(q => (
                            <button
                                key={q}
                                onClick={() => handleSendMessage(q)}
                                className="px-4 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/10 text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Command Input */}
                <div className="p-8 pt-2 border-t border-white/5 bg-white/5">
                    <form 
                        onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                        className="relative flex items-center gap-3"
                    >
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Input command..."
                            className="h-14 bg-secondary/30 border-none rounded-2xl px-5 text-sm font-mono focus-visible:ring-1 ring-primary/20"
                        />
                        <Button 
                            type="submit" 
                            size="icon" 
                            disabled={isLoading || !inputValue.trim()}
                            className="h-14 w-14 rounded-2xl bg-primary shadow-[0_10px_20px_-10px_hsl(var(--primary))]"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                    <p className="mt-4 text-center text-[8px] font-mono text-muted-foreground/30 uppercase tracking-[0.4em]">Direct_Access_To_Srinivasa_Pradeep_Entity</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
