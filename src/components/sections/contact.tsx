
'use client';

import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef, useActionState, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, Send, Briefcase, Star, HelpCircle, MailQuestion, PartyPopper, RefreshCw, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useTheme } from 'next-themes';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Message'}
      <Send className="ml-2 h-4 w-4" />
    </Button>
  );
}

const categoryStyles: { [key: string]: { style: string, icon: React.ReactNode } } = {
  'Job Opportunity': { style: 'text-easy', icon: <Briefcase className="h-12 w-12" /> },
  'Question': { style: 'text-info', icon: <HelpCircle className="h-12 w-12" /> },
  'Feedback': { style: 'text-feedback', icon: <Star className="h-12 w-12" /> },
  'Other': { style: 'text-primary', icon: <MailQuestion className="h-12 w-12" /> },
};

function PremiumBookCallButton() {
    const { resolvedTheme } = useTheme();
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const [mousePos, setMousePos] = useState({ x: -50, y: -50 });
    const avatar = PlaceHolderImages.find(p => p.id === 'srini-avatar-light');

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const shimmerColor = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.1)';

    return (
        <div className="gradient bg-border/20 rounded-full p-[1px] relative overflow-hidden w-fit mt-3 group/btn">
            <a
                ref={buttonRef}
                href="https://cal.com/sriley/15min"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMouseMove}
                className="h-full bg-secondary/50 dark:bg-black/50 backdrop-blur-xl rounded-full text-foreground text-sm sm:text-md px-6 py-2.5 w-full flex items-center justify-center transition-all group relative overflow-hidden touch-manipulation active:scale-95 no-cursor"
                style={{
                  // @ts-ignore
                  '--x': `${mousePos.x}%`,
                  '--shimmer-color': shimmerColor,
                }}
            >
                {/* Internal Shimmer Layer */}
                <div 
                    className="absolute inset-0 opacity-40 group-hover/btn:opacity-60 transition-opacity duration-500 z-0"
                    style={{
                        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, var(--shimmer-color) 0%, transparent 50%)`,
                        mixBlendMode: resolvedTheme === 'dark' ? 'overlay' : 'multiply'
                    }}
                />

                <div className="flex items-center gap-2 group-hover:gap-10 sm:group-hover:gap-14 transition-all duration-500 relative z-20">
                    {/* Avatar and "You" Logic */}
                    <div className="relative flex items-center">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden shrink-0 ring-1 ring-white/20">
                            {avatar && (
                                <img
                                    src={avatar.imageUrl}
                                    alt="Srini"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        
                        <div className="flex items-center gap-1 absolute left-[30px] sm:left-[34px] transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap">
                            <Plus className="w-2 h-2 sm:w-3 sm:h-3 text-primary" />
                            <div className="px-2 py-0.5 rounded-full bg-primary/10 dark:bg-white/10 text-[8px] sm:text-[10px] font-bold border border-primary/20 backdrop-blur-md">
                                YOU
                            </div>
                        </div>
                    </div>

                    <span 
                        className="whitespace-nowrap relative block text-sm sm:text-base font-medium transition-all duration-300 group-hover:translate-x-1"
                        style={{
                            maskImage: `linear-gradient(-75deg, rgba(255,255,255,1) calc(${mousePos.x}% + 20%), rgba(255,255,255,0.2) calc(${mousePos.x}% + 30%), rgba(255,255,255,1) calc(${mousePos.x}% + 100%))`
                        }}
                    >
                        Book a Free Call
                    </span>
                </div>

                {/* Feathered Glow Outline */}
                <span 
                    className="pointer-events-none absolute inset-0 z-10 block rounded-[inherit] transition-opacity duration-300"
                    style={{
                        background: `linear-gradient(-75deg, transparent calc(${mousePos.x}% + 10%), hsl(var(--primary) / 0.3) calc(${mousePos.x}% + 25%), transparent calc(${mousePos.x}% + 40%))`,
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)',
                        mask: 'linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)'
                    }}
                />
            </a>
        </div>
    );
}

export function Contact() {
  const initialState = { message: null, errors: {}, success: false, category: null };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const linkedinPreview = PlaceHolderImages.find(p => p.id === 'linkedin-preview');
  const githubPreview = PlaceHolderImages.find(p => p.id === 'github-preview');

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        setIsSubmitted(true);
      } else {
        toast({
          variant: 'destructive',
          title: 'Oops! Something went wrong.',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  const handleReset = () => {
    formRef.current?.reset();
    setIsSubmitted(false);
  }

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Get In Touch</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have a question, an opportunity, or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
             <h3 className="font-headline text-2xl font-semibold text-primary">Contact Info</h3>
             <p className="text-muted-foreground">You can also reach me directly through these channels.</p>
              <TooltipProvider delayDuration={0}>
                  <div className="flex flex-col gap-6 pt-2">
                      <div className="flex gap-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a href="mailto:sspradeep2004@gmail.com">
                                    <div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 shadow-lg ring-1 ring-border/20">
                                        <Mail className="h-6 w-6"/>
                                    </div>
                                </a>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Mail</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a href="https://www.linkedin.com/in/srinivasa-pradeep-s/" target="_blank" rel="noopener noreferrer">
                                    <div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 shadow-lg ring-1 ring-border/20">
                                        <Linkedin className="h-6 w-6"/>
                                    </div>
                                </a>
                            </TooltipTrigger>
                            <TooltipContent 
                              side="top" 
                              className="p-0 border-none bg-transparent shadow-2xl animate-in fade-in-0 slide-in-from-top-12 duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            >
                                <div className="relative w-64 aspect-[16/9] rounded-xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10">
                                    {linkedinPreview && (
                                      <Image 
                                          src={linkedinPreview.imageUrl} 
                                          alt={linkedinPreview.description}
                                          data-ai-hint={linkedinPreview.imageHint}
                                          fill
                                          className="object-cover opacity-90 brightness-110 contrast-110"
                                      />
                                    )}
                                </div>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a href="https://github.com/srinivasa-pradeep" target="_blank" rel="noopener noreferrer">
                                    <div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 shadow-lg ring-1 ring-border/20">
                                        <Github className="h-6 w-6"/>
                                    </div>
                                </a>
                            </TooltipTrigger>
                            <TooltipContent 
                              side="bottom" 
                              className="p-0 border-none bg-transparent shadow-2xl animate-in fade-in-0 slide-in-from-bottom-12 duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            >
                                <div className="relative w-64 aspect-[16/9] rounded-xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10">
                                    {githubPreview && (
                                      <Image 
                                          src={githubPreview.imageUrl} 
                                          alt={githubPreview.description}
                                          data-ai-hint={githubPreview.imageHint}
                                          fill
                                          className="object-cover opacity-90 brightness-110 contrast-110"
                                      />
                                    )}
                                </div>
                            </TooltipContent>
                        </Tooltip>
                      </div>

                      <PremiumBookCallButton />
                  </div>
              </TooltipProvider>
          </div>
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-card/50 backdrop-blur-lg border-border/20 shadow-xl">
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[440px] flex flex-col justify-center transition-all duration-500">
                {!isSubmitted ? (
                  <form ref={formRef} action={formAction} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Your Name" />
                      {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="your.email@example.com" />
                      {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" placeholder="Your message..." rows={5} />
                      {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
                    </div>
                    <SubmitButton />
                  </form>
                ) : (
                  <div className="text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
                      <div className={cn(categoryStyles[state.category!]?.style)}>
                          {categoryStyles[state.category!]?.icon ?? <PartyPopper className="h-12 w-12" />}
                      </div>
                      <h3 className="text-2xl font-bold">Message Sent!</h3>
                      <p className="text-muted-foreground max-w-sm">{state.message}</p>
                      <Button onClick={handleReset} variant="outline" className="mt-4">
                          <RefreshCw className="mr-2 h-4 w-4"/>
                          Send another message
                      </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
