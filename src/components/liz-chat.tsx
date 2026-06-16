'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { X, Send, Cpu, Loader2, Sparkles, Command } from 'lucide-react';
import { talkToLiz } from '@/app/actions';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function LizChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "I am Liz. Your digital guide. Ask me anything about Srini's technical builds or personal philosophy." }
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
  }, [messages]);

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
    
    setMessages(prev => [...prev, { role: 'model', content: result.response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* 1. Subtle Global Trigger - Integrated into Header flow but rendered fixed */}
      <div className="fixed bottom-8 right-32 z-[150] pointer-events-auto flex items-center md:right-40">
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="group relative h-10 w-10 rounded-full bg-secondary/20 backdrop-blur-md border border-border/20 shadow-xl transition-all hover:scale-110 active:scale-95"
        >
            <div className="absolute inset-0 bg-primary/10 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
            <Cpu className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors" />
        </Button>
      </div>

      {/* 2. Spotlight Overlay */}
      <div 
        className={cn(
            "fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isOpen ? "opacity-100 pointer-events-auto backdrop-blur-sm" : "opacity-0 pointer-events-none"
        )}
        onClick={(e) => { if(e.target === e.currentTarget) setIsOpen(false); }}
      >
        <div className={cn(
            "w-full max-w-2xl flex flex-col gap-4 transition-all duration-500 transform-gpu",
            isOpen ? "translate-y-0 scale-100" : "-translate-y-12 scale-95"
        )}>
            {/* The Intelligence Bar */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative h-16 w-full flex items-center bg-background/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden px-6">
                    <Command className="h-5 w-5 text-muted-foreground/40 mr-4" />
                    <Input 
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') handleSendMessage(inputValue); }}
                        placeholder="Ask Liz about Amazon, MedQuery, or Srini's story..."
                        className="flex-1 bg-transparent border-none text-lg focus-visible:ring-0 shadow-none px-0 font-medium placeholder:text-muted-foreground/30"
                    />
                    <div className="flex items-center gap-2">
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin text-primary/60" />
                        ) : (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/50 border border-border/40">
                                <span className="text-[10px] font-black font-mono text-muted-foreground/60">ESC</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* The Conversation Log - Only shows when there are user messages */}
            {messages.length > 0 && (
                <div className="w-full bg-background/60 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden max-h-[60vh] flex flex-col animate-in fade-in slide-in-from-top-4 duration-500">
                    <ScrollArea className="flex-1 p-8" data-lenis-prevent>
                        <div className="space-y-8">
                            {messages.map((msg, i) => (
                                <div 
                                    key={i} 
                                    className={cn(
                                        "flex flex-col gap-2 max-w-[90%]",
                                        msg.role === 'user' ? "ml-auto items-end" : "items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "px-5 py-4 rounded-[24px] text-sm leading-relaxed transition-all",
                                        msg.role === 'user' 
                                            ? "bg-primary text-primary-foreground rounded-tr-none shadow-lg" 
                                            : "bg-secondary/40 backdrop-blur-md border border-white/5 rounded-tl-none lora italic text-foreground/90 font-medium"
                                    )}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[8px] uppercase tracking-[0.2em] font-mono opacity-30 px-1">
                                        {msg.role === 'user' ? 'QUERY_SOURCE' : 'LIZ_v3.0'}
                                    </span>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-center gap-3 px-2 text-primary/40 animate-pulse">
                                    <Sparkles className="h-3 w-3" />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Analyzing_Neural_Paths...</span>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>
                    <div className="p-4 bg-white/5 border-t border-white/5 flex justify-center">
                        <p className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-[0.4em]">Direct_Access_Neural_Link</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </>
  );
}
