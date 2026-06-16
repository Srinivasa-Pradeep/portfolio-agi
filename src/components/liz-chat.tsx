'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { X, Send, Sparkles, MessageSquare, Command } from 'lucide-react';
import { talkToLiz } from '@/app/actions';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function LizChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello. I am Liz. How can I help you understand Srini's work or the journey he is on?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
        inputRef.current.focus();
    }
    
    // Stop background scrolling when open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => { document.body.style.overflow = ''; };
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
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInputValue('');
    setIsLoading(true);

    const result = await talkToLiz(content, messages);
    
    if (result.success) {
        setMessages(prev => [...prev, { role: 'model', content: result.response }]);
    } else {
        setMessages(prev => [...prev, { role: 'model', content: "I encountered a minor lag. Could you try asking that again?" }]);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* 1. Left Tab Trigger - Minimalist and New */}
      <div className={cn(
        "fixed left-0 top-1/2 -translate-y-1/2 z-[100] transition-all duration-700",
        isOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
      )}>
        <Button
            variant="ghost"
            onClick={() => setIsOpen(true)}
            className="group relative h-32 w-10 flex flex-col items-center justify-center gap-4 rounded-r-2xl bg-primary text-primary-foreground shadow-2xl border border-white/10 transition-all hover:w-12 active:scale-95"
        >
            <MessageSquare className="h-4 w-4" />
            <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.4em]">Ask_Liz</span>
        </Button>
      </div>

      {/* 2. Centered Spotlight Modal - Refined & Awesome */}
      <div 
        className={cn(
            "fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isOpen ? "pointer-events-auto bg-black/40 backdrop-blur-md opacity-100" : "pointer-events-none bg-transparent opacity-0"
        )}
        onClick={(e) => { if(e.target === e.currentTarget) setIsOpen(false); }}
      >
        <div className={cn(
            "w-full max-w-2xl bg-background/80 backdrop-blur-3xl border border-white/10 shadow-2xl transition-all duration-500 transform-gpu overflow-hidden rounded-[32px]",
            isOpen ? "translate-y-0 scale-100" : "translate-y-12 scale-95"
        )}>
            {/* Header Area */}
            <div className="p-6 flex items-center justify-between border-b border-white/5 bg-black/5">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Command className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">Talk with Liz</h2>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest opacity-60">Ask about my journey</p>
                    </div>
                </div>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                    className="rounded-full hover:bg-primary/10 h-8 w-8"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Conversation Stream */}
            <ScrollArea className="h-[400px] px-6" data-lenis-prevent>
                <div className="py-8 space-y-8">
                    {messages.map((msg, i) => (
                        <div 
                            key={i} 
                            className={cn(
                                "flex flex-col gap-2 group animate-in fade-in slide-in-from-bottom-2 duration-500",
                                msg.role === 'user' ? "items-end" : "items-start"
                            )}
                        >
                            <div className={cn(
                                "px-5 py-3.5 rounded-[22px] text-sm leading-relaxed max-w-[85%] px-1 pr-2",
                                msg.role === 'user' 
                                    ? "bg-primary text-primary-foreground font-medium rounded-tr-none shadow-md" 
                                    : "bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-tl-none lora italic text-foreground/90 font-medium"
                            )}>
                                {msg.content}
                            </div>
                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-30 px-1">
                                {msg.role === 'user' ? 'You' : 'Liz'}
                            </span>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-3 px-2 text-primary/40">
                            <Sparkles className="h-3 w-3 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest font-medium">Liz is thinking...</span>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input Bar */}
            <div className="p-6 bg-black/5 border-t border-white/5">
                <div className="relative">
                    <div className="flex items-center bg-background/50 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-inner px-4 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <Input 
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') handleSendMessage(inputValue); }}
                            placeholder="Ask about Amazon, MBRDI, or PSG iTech..."
                            className="flex-1 bg-transparent border-none text-base focus-visible:ring-0 shadow-none px-0 h-14 font-medium placeholder:text-muted-foreground/30"
                        />
                        <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim() || isLoading}
                            className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="mt-3 flex justify-between items-center px-1">
                        <p className="text-[9px] font-medium text-muted-foreground/40 uppercase tracking-widest">Grounded in reality</p>
                        <div className="flex items-center gap-1.5 opacity-40">
                           <span className="text-[9px] font-bold bg-secondary px-1.5 py-0.5 rounded border border-border">ESC</span>
                           <span className="text-[9px] text-muted-foreground uppercase tracking-widest">to close</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
