'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { X, Send, Sparkles, Command, CornerDownLeft, Mic, MicOff } from 'lucide-react';
import { talkToLiz } from '@/app/actions';

/**
 * FormatMessage - Renders bold text and cleans em-dashes.
 */
function FormatMessage({ content }: { content: string }) {
  if (!content) return null;

  const cleanContent = content
    .replace(/—/g, ' - ')
    .replace(/--/g, ' - ')
    .replace(/–/g, ' - ');

  const parts = cleanContent.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('*') && part.endsWith('*'))) {
          const isDouble = part.startsWith('**');
          const text = isDouble ? part.slice(2, -2) : part.slice(1, -1);
          return (
            <strong key={i} className="font-black text-foreground brightness-125 dark:brightness-150 px-0.5">
              {text}
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
  const [autoHide, setAutoHide] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { role: 'model', content: "Hello. I am **Liz**, Srini's personal assistant. How can I help you explore his world today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const [triggerAngle, setTriggerAngle] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOpenLiz = () => setIsOpen(true);
    window.addEventListener('open-liz', handleOpenLiz);
    return () => window.removeEventListener('open-liz', handleOpenLiz);
  }, []);

  const handleTriggerMouseMove = (e: React.MouseEvent) => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rad = Math.atan2(y - centerY, x - centerX);
    const deg = (rad * (180 / Math.PI) + 90);
    
    setTriggerAngle(deg);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoHide(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(prev => prev + (prev ? ' ' : '') + transcript);
          setIsRecording(false);
        };

        recognitionRef.current.onerror = () => setIsRecording(false);
        recognitionRef.current.onend = () => setIsRecording(false);
      }
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

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
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
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

    const userMessage = { role: 'user', content };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await talkToLiz(content, messages);
      setMessages(prev => [...prev, { role: 'model', content: result.response }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'model', content: `**SYSTEM_ERROR**: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cn(
        "fixed left-0 top-1/2 -translate-y-1/2 z-[100] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group/trigger",
        isOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100",
        autoHide && !isOpen && !isHovering ? "-translate-x-[calc(100%-8px)]" : "translate-x-0"
      )}>
        <button
            ref={triggerRef}
            onClick={() => setIsOpen(true)}
            onMouseMove={handleTriggerMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
                background: `linear-gradient(hsl(var(--background)), hsl(var(--background))) padding-box, 
                             ${isHovering 
                               ? `conic-gradient(from ${triggerAngle}deg, transparent 0deg, #4285F4 15deg, #EA4335 30deg, #FBBC05 45deg, #34A853 60deg, transparent 90deg) border-box` 
                               : 'hsl(var(--border)/0.2) border-box'}`,
                border: '1.5px solid transparent'
            }}
            className={cn(
                "group/btn relative flex flex-col items-center gap-4 py-8 w-12 sm:w-14 shadow-2xl transition-all duration-500",
                "backdrop-blur-2xl rounded-r-3xl overflow-hidden",
                "hover:w-14 sm:hover:w-16 active:scale-95 text-foreground/40 hover:text-primary"
            )}
        >
            <div className="relative z-10 flex flex-col items-center gap-4">
                <Command className="h-4 w-4 transition-transform group-hover/btn:scale-110 group-hover/btn:text-primary" />
                <span className="[writing-mode:vertical-lr] text-[8px] font-black uppercase tracking-[0.4em] opacity-60">Talk with Liz</span>
                <div className="hidden sm:flex mt-4 flex-col items-center gap-1 opacity-0 group-hover/btn:opacity-40 transition-opacity duration-500">
                    <span className="text-[9px] font-bold">⌘</span>
                    <span className="text-[9px] font-bold">Z</span>
                </div>
            </div>
            {isHovering && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 blur-md transition-all duration-500"
                style={{
                  background: `conic-gradient(from ${triggerAngle}deg, transparent 0deg, #4285F4 15deg, #EA4335 30deg, #FBBC05 45deg, #34A853 60deg, transparent 90deg)`
                }}
              />
            )}
        </button>
      </div>

      <div 
        className={cn(
            "fixed inset-0 z-[200] flex items-start justify-center pt-[8vh] sm:pt-[12vh] px-4 sm:px-6 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isOpen ? "pointer-events-auto bg-black/40 backdrop-blur-md opacity-100" : "pointer-events-none bg-transparent opacity-0"
        )}
        onClick={(e) => { if(e.target === e.currentTarget) setIsOpen(false); }}
      >
        <div className={cn(
            "w-full max-w-2xl bg-white/5 dark:bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] transition-all duration-500 transform-gpu overflow-hidden rounded-[40px]",
            isOpen ? "translate-y-0 scale-100" : "translate-y-12 scale-95"
        )}>
            <div className="p-6 sm:p-8 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/10">
                            <Command className="h-5 w-5 text-primary/70" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black tracking-tighter uppercase italic">Liz.</h2>
                        <p className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-[0.3em] opacity-40">Neural_Assistant_v3.1</p>
                    </div>
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

            <ScrollArea className="h-[450px] sm:h-[520px] px-6 sm:px-10" data-lenis-prevent>
                <div className="py-10 space-y-12">
                    {messages.map((msg, i) => (
                        <div 
                            key={i} 
                            className={cn(
                                "flex flex-col gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-700",
                                msg.role === 'user' ? "items-end" : "items-start"
                            )}
                        >
                            <div className={cn(
                                "max-w-[90%] sm:max-w-[85%] transition-all",
                                msg.role === 'user' 
                                    ? "bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-full text-sm shadow-xl" 
                                    : "text-lg sm:text-xl lora italic text-foreground/90 font-medium leading-relaxed" 
                            )}>
                                <FormatMessage content={msg.content} />
                            </div>
                            <span className={cn(
                                "text-[8px] font-mono font-bold uppercase tracking-[0.4em] opacity-20 transition-opacity",
                                msg.role === 'user' ? "pr-2" : "pl-1"
                            )}>
                                {msg.role === 'user' ? 'sent' : ''}
                            </span>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-4 px-1 text-primary/40">
                            <div className="flex gap-1">
                                <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="h-1 w-1 bg-primary rounded-full animate-bounce" />
                            </div>
                            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.5em] opacity-60">Liz_Thinking</span>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-6 sm:p-10 bg-transparent">
                <div className="relative">
                    <div className="flex items-center bg-black/5 dark:bg-white/5 border border-white/10 rounded-[28px] px-3 sm:px-5 shadow-inner group/input focus-within:border-primary/30 transition-all">
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={toggleRecording}
                            className={cn(
                                "h-10 w-10 rounded-full transition-all shrink-0",
                                isRecording 
                                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]" 
                                  : "text-muted-foreground/40 hover:text-primary"
                            )}
                        >
                            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>

                        <input 
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => { 
                              if(e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(inputValue);
                              }
                            }}
                            placeholder={isRecording ? "Listening..." : "Type your message..."}
                            className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base px-3 sm:px-5 h-14 sm:h-16 font-medium placeholder:text-muted-foreground/20 text-foreground"
                        />

                        <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim() || isLoading}
                            className={cn(
                                "h-10 w-10 rounded-full transition-all shrink-0 ml-1",
                                inputValue.trim() ? "text-primary opacity-100 scale-100" : "text-muted-foreground/10 opacity-0 scale-75 pointer-events-none"
                            )}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center px-6">
                        <p className="text-[8px] font-mono font-bold text-muted-foreground/10 uppercase tracking-[0.4em]">Architectural Precision</p>
                        <div className="flex items-center gap-2 opacity-0 group-focus-within/input:opacity-10 transition-opacity duration-1000">
                             <span className="text-[9px] font-mono font-bold">ENTER TO SEND</span>
                             <CornerDownLeft className="h-3 w-3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}