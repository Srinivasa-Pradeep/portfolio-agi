'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Sparkles, X, Send, User, MessageSquareText, ChevronRight, Loader2 } from 'lucide-react';
import { talkToLiz } from '@/app/actions';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "What's his stack?",
  "Tell me about Amazon",
  "What is MedQuery?",
  "What motivates him?"
];

export function LizChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello. I'm Liz. I can guide you through Srini's journey and technical expertise. What would you like to know?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
    <div className="fixed bottom-6 right-6 z-[120]">
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "bg-primary text-primary-foreground hover:scale-110",
          isOpen ? "rotate-90 scale-90 opacity-0 pointer-events-none" : "rotate-0 scale-100 opacity-100"
        )}
      >
        <Sparkles className="h-6 w-6" />
      </Button>

      {/* Chat Window - Apple Glass Morphism Style */}
      <div
        className={cn(
          "absolute bottom-0 right-0 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-8rem)]",
          "transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu",
          isOpen 
            ? "translate-y-0 opacity-100 scale-100" 
            : "translate-y-12 opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="h-full w-full flex flex-col bg-background/70 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <MessageSquareText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg leading-none">Liz</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Srini&apos;s Guide</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="rounded-full hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6" data-lenis-prevent>
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col gap-2 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-secondary/50 backdrop-blur-md border border-white/5 rounded-tl-none lora italic"
                  )}>
                    {msg.content}
                  </div>
                  <span className="text-[9px] uppercase tracking-tighter opacity-40 font-mono">
                    {msg.role === 'user' ? 'You' : 'Liz'}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Liz is thinking...</span>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Footer - Suggested Questions & Input */}
          <div className="p-6 pt-2 border-t border-white/5 bg-white/5">
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTED_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    className="px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 text-[10px] font-medium transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
              className="relative flex items-center gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Srini..."
                className="h-12 bg-secondary/30 border-none rounded-2xl pr-12 focus-visible:ring-1 ring-primary/20"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-1 h-10 w-10 rounded-xl bg-primary shadow-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
