'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { X, Send, Cpu, Loader2, Sparkles, MessageSquareCode, Command } from 'lucide-react';
import { talkToLiz } from '@/app/actions';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function LizChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "I am Liz. Your digital guide. Ask me anything about Srini's technical builds or the philosophy that drives him." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
        inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Keyboard shortcut: Cmd+K or Ctrl+K to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const result = await talkToLiz(content, messages);
    
    if (result.success) {
        setMessages(prev => [...prev, { role: 'model', content: result.response }]);
    } else {
        setMessages(prev => [...prev, { role: 'model', content: "I encountered a minor glitch. Please try asking again." }]);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* 1. Futuristic Side Trigger - Minimalist Vertical Tab */}
      <div className={cn(
        "fixed right-0 top-1/2 -translate-y-1/2 z-[100] transition-all duration-700",
        isOpen ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
      )}>
        <Button
            variant="ghost"
            onClick={() => setIsOpen(true)}
            className="group relative h-32 w-10 flex flex-col items-center justify-center gap-4 rounded-l-2xl bg-primary text-primary-foreground shadow-2xl border border-white/10 transition-all hover:w-12 active:scale-95"
        >
            <Cpu className="h-4 w-4 animate-pulse" />
            <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.4em] rotate-180">Ask_Liz</span>
        </Button>
      </div>

      {/* 2. Floating Intelligence Sidebar - Apple Glass Morphism */}
      <div 
        className={cn(
            "fixed inset-0 z-[200] flex justify-end transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isOpen ? "pointer-events-auto bg-black/10 backdrop-blur-sm" : "pointer-events-none bg-transparent"
        )}
        onClick={(e) => { if(e.target === e.currentTarget) setIsOpen(false); }}
      >
        <div className={cn(
            "w-full max-w-[450px] h-full flex flex-col bg-background/60 backdrop-blur-3xl border-l border-white/10 shadow-[-40px_0_80px_-20px_rgba(0,0,0,0.4)] transition-all duration-700 transform-gpu",
            isOpen ? "translate-x-0" : "translate-x-full"
        )}>
            {/* Header Area */}
            <div className="p-8 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                        <Cpu className="h-6 w-6 text-primary animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tighter">Liz Intelligence</h2>
                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/60">Digital_Consciousness_v4.0</p>
                    </div>
                </div>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                    className="rounded-full hover:bg-primary/10"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* Conversation Stream - data-lenis-prevent fixes the background scrolling */}
            <ScrollArea className="flex-1 px-8" data-lenis-prevent>
                <div className="py-10 space-y-10">
                    {messages.map((msg, i) => (
                        <div 
                            key={i} 
                            className={cn(
                                "flex flex-col gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-500",
                                msg.role === 'user' ? "items-end" : "items-start"
                            )}
                        >
                            <div className={cn(
                                "px-6 py-4 rounded-[28px] text-sm leading-relaxed transition-all max-w-[85%]",
                                msg.role === 'user' 
                                    ? "bg-primary text-primary-foreground rounded-tr-none shadow-xl font-medium" 
                                    : "bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-tl-none lora italic text-foreground/90 font-medium px-1 pr-2"
                            )}>
                                {msg.content}
                            </div>
                            <div className="flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
                                <span className="text-[8px] uppercase tracking-[0.2em] font-mono">
                                    {msg.role === 'user' ? 'SRINI_GUEST' : 'LIZ_CORE'}
                                </span>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-4 px-2 text-primary/40 animate-pulse">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Analyzing_Neural_Paths...</span>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Intelligence Input Bar */}
            <div className="p-8 bg-black/5 border-t border-white/5">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative h-14 w-full flex items-center bg-background/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden px-5">
                        <Input 
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') handleSendMessage(inputValue); }}
                            placeholder="Ask about Amazon, MBRDI, or MedQuery..."
                            className="flex-1 bg-transparent border-none text-base focus-visible:ring-0 shadow-none px-0 font-medium placeholder:text-muted-foreground/30"
                        />
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/50 border border-border/40">
                                <span className="text-[9px] font-black font-mono text-muted-foreground/60">ENT</span>
                            </div>
                            <Button 
                                size="icon" 
                                variant="ghost"
                                onClick={() => handleSendMessage(inputValue)}
                                disabled={!inputValue.trim() || isLoading}
                                className="h-10 w-10 rounded-full hover:bg-primary/20 hover:text-primary transition-all"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <p className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-[0.4em]">Neural_Link_Synchronized</p>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
