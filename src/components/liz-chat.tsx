'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { X, Send, Sparkles, Command, CornerDownLeft } from 'lucide-react';
import { talkToLiz } from '@/app/actions';

type Message = {
  role: 'user' | 'model';
  content: string;
};

/**
 * FormatMessage - Renders bold text from markdown-style ** markers.
 * Enhanced for high visibility against glass backgrounds.
 */
function FormatMessage({ content }: { content: string }) {
  if (!content) return null;
  // Regex to match **text** and capture it including the stars
  const parts = content.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-bold text-foreground brightness-150 drop-shadow-sm">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

export function LizChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello. I am **Liz**. How can I help you understand Srini's work or the journey he is on?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
        inputRef.current.focus();
    }
    
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K summoning
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
        setMessages(prev => [...prev, { role: 'model', content: "I encountered a minor **glitch**. Could you try asking that again?" }]);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* 1. Left "Talk with Liz" Blade Trigger */}
      <div className={cn(
        "fixed left-0 top-1/2 -translate-y-1/2 z-[100] transition-all duration-700",
        isOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
      )}>
        <button
            onClick={() => setIsOpen(true)}
            className="group relative flex flex-col items-center gap-4 py-8 w-10 bg-background/10 backdrop-blur-xl border-y border-r border-white/10 rounded-r-2xl shadow-2xl transition-all hover:w-12 active:scale-95 text-foreground/40 hover:text-primary"
        >
            <Command className="h-4 w-4" />
            <span className="[writing-mode:vertical-lr] text-[8px] font-black uppercase tracking-[0.4em] opacity-60">Talk with Liz</span>
            
            {/* Minimalist Shortcut Hint */}
            <div className="mt-4 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                <span className="text-[9px] font-bold">⌘</span>
                <span className="text-[9px] font-bold">K</span>
            </div>
        </button>
      </div>

      {/* 2. Centered Spotlight Modal - Pure iOS Glass Morphism */}
      <div 
        className={cn(
            "fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isOpen ? "pointer-events-auto bg-black/40 backdrop-blur-md opacity-100" : "pointer-events-none bg-transparent opacity-0"
        )}
        onClick={(e) => { if(e.target === e.currentTarget) setIsOpen(false); }}
      >
        <div className={cn(
            "w-full max-w-2xl bg-background/70 dark:bg-background/40 backdrop-blur-3xl border border-white/10 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] transition-all duration-500 transform-gpu overflow-hidden rounded-[40px]",
            isOpen ? "translate-y-0 scale-100" : "translate-y-12 scale-95"
        )}>
            {/* Header Area */}
            <div className="p-6 flex items-center justify-between border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
                        <Command className="h-5 w-5 text-primary/70" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">Talk with Liz</h2>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest opacity-60">Personal Assistant</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-1.5 opacity-20 hover:opacity-50 transition-opacity">
                         <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Esc to exit</span>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsOpen(false)}
                        className="rounded-full hover:bg-white/10 h-10 w-10 transition-colors"
                    >
                        <X className="h-5 w-5 opacity-40 hover:opacity-100" />
                    </Button>
                </div>
            </div>

            {/* Conversation Stream */}
            <ScrollArea className="h-[480px] px-6" data-lenis-prevent>
                <div className="py-8 space-y-10">
                    {messages.map((msg, i) => (
                        <div 
                            key={i} 
                            className={cn(
                                "flex flex-col gap-2 group animate-in fade-in slide-in-from-bottom-2 duration-500",
                                msg.role === 'user' ? "items-end" : "items-start"
                            )}
                        >
                            <div className={cn(
                                "px-6 py-4 rounded-[26px] text-sm leading-relaxed max-w-[88%] shadow-sm border border-white/5 transition-all",
                                msg.role === 'user' 
                                    ? "bg-primary text-primary-foreground font-medium rounded-tr-none" 
                                    : "bg-secondary/30 backdrop-blur-xl rounded-tl-none lora italic text-foreground/90 font-medium pr-7" 
                            )}>
                                <FormatMessage content={msg.content} />
                            </div>
                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-20 px-3 group-hover:opacity-50 transition-opacity">
                                {msg.role === 'user' ? 'Sent' : 'Liz'}
                            </span>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-3 px-3 text-primary/40">
                            <Sparkles className="h-3 w-3 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest font-medium tracking-[0.2em]">Thinking...</span>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input Bar */}
            <div className="p-6 bg-white/5 border-t border-white/5">
                <div className="relative">
                    <div className="flex items-center bg-background/30 backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-inner px-4 overflow-hidden focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                        <Input 
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => { 
                              if(e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(inputValue);
                              }
                            }}
                            placeholder="Ask about Amazon, MBRDI, or PSG iTech..."
                            className="flex-1 bg-transparent border-none text-base focus-visible:ring-0 shadow-none px-3 h-14 font-medium placeholder:text-muted-foreground/30"
                        />
                        <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim() || isLoading}
                            className="h-10 w-10 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                    
                    {/* Interior Footer Info */}
                    <div className="mt-4 flex justify-between items-center px-4">
                        <p className="text-[9px] font-medium text-muted-foreground/30 uppercase tracking-[0.3em]">Driven by Grit & Logic</p>
                        <div className="flex items-center gap-4 opacity-30">
                           <div className="flex items-center gap-1.5">
                             <div className="flex items-center gap-1 bg-secondary/40 px-2 py-1 rounded-lg border border-border/40 shadow-sm">
                                <span className="text-[9px] font-black tracking-tighter">ENTER</span>
                                <CornerDownLeft className="h-2.5 w-2.5" />
                             </div>
                             <span className="text-[9px] text-muted-foreground uppercase tracking-widest ml-1 font-bold">to send</span>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
