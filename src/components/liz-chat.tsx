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

  // Replace em-dashes and double-hyphens with space-dash-space as requested
  const cleanContent = content
    .replace(/—/g, ' - ')
    .replace(/--/g, ' - ')
    .replace(/–/g, ' - ');

  // Split by bold pattern (supports **bold** and *bold*)
  const parts = cleanContent.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('*') && part.endsWith('*'))) {
          const isDouble = part.startsWith('**');
          const text = isDouble ? part.slice(2, -2) : part.slice(1, -1);
          return (
            <strong key={i} className="font-black text-foreground brightness-125 dark:brightness-150 drop-shadow-sm px-0.5">
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
  
  // State for the mouse-reactive border angle
  const [triggerAngle, setTriggerAngle] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /**
   * Calculates the angle from the trigger button's center to the mouse position.
   * Drives the conic gradient rotation for the "rounding" effect.
   */
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

    const userMessage = { role: 'user', content };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await talkToLiz(content, messages);
      // Directly display the response (which includes system error messages if talkToLiz fails)
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
        autoHide && !isOpen ? "-translate-x-[calc(100%-8px)] hover:translate-x-0" : "translate-x-0"
      )}>
        <button
            ref={triggerRef}
            onClick={() => setIsOpen(true)}
            onMouseMove={handleTriggerMouseMove}
            style={{
                // High-precision background-clip technique for the animated border
                background: isOpen 
                  ? 'transparent' 
                  : `linear-gradient(hsl(var(--background)/0.1), hsl(var(--background)/0.1)) padding-box, 
                     conic-gradient(from ${triggerAngle}deg, transparent 0deg, #4285F4 20deg, #EA4335 40deg, #FBBC05 60deg, #34A85 green 80deg, transparent 100deg) border-box`,
                border: '1.5px solid transparent'
            }}
            className={cn(
                "group/btn relative flex flex-col items-center gap-4 py-8 w-10 sm:w-12 shadow-2xl transition-all duration-500",
                "backdrop-blur-2xl rounded-r-2xl overflow-hidden",
                "hover:w-12 sm:hover:w-14 active:scale-95 text-foreground/40 hover:text-primary"
            )}
        >
            <div className="relative z-10 flex flex-col items-center gap-4">
                <Command className="h-4 w-4 transition-transform group-hover/btn:scale-110 group-hover/btn:text-primary" />
                <span className="[writing-mode:vertical-lr] text-[8px] font-black uppercase tracking-[0.4em] opacity-60">Talk with Liz</span>
                <div className="hidden sm:flex mt-4 flex-col items-center gap-1 opacity-0 group-hover/btn:opacity-40 transition-opacity duration-500">
                    <span className="text-[9px] font-bold">⌘</span>
                    <span className="text-[9px] font-bold">K</span>
                </div>
            </div>
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
            "w-full max-w-2xl bg-white/10 dark:bg-black/20 backdrop-blur-3xl border border-white/10 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] transition-all duration-500 transform-gpu overflow-hidden rounded-[32px] sm:rounded-[40px]",
            isOpen ? "translate-y-0 scale-100" : "translate-y-12 scale-95"
        )}>
            <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10">
                        <Command className="h-4 w-4 sm:h-5 sm:w-5 text-primary/70" />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-bold tracking-tight">Talk with Liz</h2>
                        <p className="text-[9px] sm:text-[10px] font-medium text-muted-foreground uppercase tracking-widest opacity-60">Personal Assistant</p>
                    </div>
                </div>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                    className="rounded-full hover:bg-white/10 h-8 w-8 sm:h-10 sm:w-10 transition-colors"
                >
                    <X className="h-4 w-4 sm:h-5 sm:w-5 opacity-40 hover:opacity-100" />
                </Button>
            </div>

            <ScrollArea className="h-[400px] sm:h-[480px] px-4 sm:px-6" data-lenis-prevent>
                <div className="py-6 sm:py-8 space-y-8 sm:space-y-10">
                    {messages.map((msg, i) => (
                        <div 
                            key={i} 
                            className={cn(
                                "flex flex-col gap-2 group animate-in fade-in slide-in-from-bottom-2 duration-500",
                                msg.role === 'user' ? "items-end" : "items-start"
                            )}
                        >
                            <div className={cn(
                                "px-4 sm:px-6 py-3 sm:py-4 rounded-[22px] sm:rounded-[26px] text-sm leading-relaxed max-w-[92%] sm:max-w-[88%] shadow-sm border border-white/5 transition-all",
                                msg.role === 'user' 
                                    ? "bg-primary text-primary-foreground font-medium rounded-tr-none" 
                                    : "bg-white/5 backdrop-blur-xl rounded-tl-none lora italic text-foreground/90 font-medium pr-6 sm:pr-7" 
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

            <div className="p-4 sm:p-6 bg-transparent border-t border-white/5">
                <div className="relative">
                    <div className="flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 sm:px-4 shadow-inner">
                        <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={toggleRecording}
                            className={cn(
                                "h-10 w-10 rounded-full transition-all shrink-0",
                                isRecording 
                                  ? "bg-primary text-primary-foreground" 
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
                            placeholder={isRecording ? "Listening..." : "Ask Liz anything..."}
                            className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base px-2 sm:px-4 h-12 sm:h-14 font-medium placeholder:text-muted-foreground/30 text-foreground"
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
                    
                    <div className="mt-3 flex justify-between items-center px-4">
                        <p className="text-[8px] sm:text-[9px] font-medium text-muted-foreground/20 uppercase tracking-[0.3em]">Driven by Grit & Logic</p>
                        <div className="hidden sm:flex items-center gap-3 opacity-0 group-focus-within:opacity-20 transition-opacity duration-700">
                             <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-black tracking-tighter">ENTER</span>
                                <CornerDownLeft className="h-2 w-2" />
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
