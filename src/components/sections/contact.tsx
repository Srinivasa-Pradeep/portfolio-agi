'use client';

import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef, useActionState, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Send, Briefcase, Star, HelpCircle, MailQuestion, PartyPopper, RefreshCw, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { TRexRunner } from '@/components/t-rex-runner';

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

function PremiumScheduleMeetButton() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const [mousePos, setMousePos] = useState({ x: -50, y: -50 });
    const avatar = PlaceHolderImages.find(p => p.id === 'srini-avatar-light');

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const shimmerColor = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.1)';

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a
                        ref={buttonRef}
                        href="https://cal.com/sriley/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseMove={handleMouseMove}
                        className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-secondary/50 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:w-36 shadow-lg ring-1 ring-border/20"
                    >
                        <div 
                            className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500 z-0"
                            style={mounted ? {
                                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${shimmerColor} 0%, transparent 50%)`,
                            } : {}}
                        />

                        <div className="relative z-20 flex items-center justify-center w-full px-4 overflow-hidden">
                            <div className="absolute left-1/2 -translate-x-1/2 transition-all duration-500 group-hover:left-5 group-hover:-translate-x-0">
                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground">You</span>
                            </div>

                            <div className="flex items-center gap-1.5 opacity-0 scale-50 translate-x-10 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-6">
                                <Plus className="w-3 h-3 text-primary shrink-0" />
                                <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/20 shrink-0">
                                    {avatar && (
                                        <img
                                            src={avatar.imageUrl}
                                            alt="Srini"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <span 
                            className="pointer-events-none absolute inset-0 z-10 block rounded-[inherit] transition-opacity duration-300"
                            style={mounted ? {
                                background: `linear-gradient(-75deg, transparent calc(${mousePos.x}% + 10%), hsl(var(--primary) / 0.3) calc(${mousePos.x}% + 25%), transparent calc(${mousePos.x}% + 40%))`,
                                padding: '1px',
                                WebkitMask: 'linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)',
                                mask: 'linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)'
                            } : {}}
                        />
                    </a>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Schedule a Free Meet</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

function SocialIconWithPreview({ 
  href, 
  icon: Icon, 
  imageId, 
  side = 'top' 
}: { 
  href: string; 
  icon: any; 
  imageId: string; 
  side?: 'top' | 'bottom' 
}) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const previewImage = PlaceHolderImages.find(p => p.id === imageId);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
                >
                    <div className={cn(
                        "bg-secondary/50 backdrop-blur-sm p-4 rounded-full transition-all duration-500 hover:scale-110 shadow-lg ring-1 ring-border/20 h-14 w-14 flex items-center justify-center",
                        "hover:bg-primary hover:text-primary-foreground"
                    )}>
                        <Icon className="h-6 w-6"/>
                    </div>
                </a>
            </TooltipTrigger>
            <TooltipContent 
              side={side} 
              className={cn(
                "p-0 border-none bg-transparent shadow-2xl duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                side === 'top' ? "animate-in fade-in-0 slide-in-from-top-12" : "animate-in fade-in-0 slide-in-from-bottom-12"
              )}
            >
                <div className="relative w-64 aspect-[16/9] rounded-xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-2xl ring-1 ring-white/10">
                    <div 
                      className="absolute inset-0 transition-transform duration-300 ease-out"
                      style={{
                        transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px) scale(1.1)`
                      }}
                    >
                        {previewImage && (
                          <Image 
                              src={previewImage.imageUrl} 
                              alt={previewImage.description}
                              data-ai-hint={previewImage.imageHint}
                              fill
                              className="object-cover opacity-90 brightness-110 contrast-110"
                          />
                        )}
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    );
}

export function Contact() {
  const initialState = { message: null, errors: {}, success: false, category: null };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <section id="contact" className="pt-20 md:pt-32 pb-0 flex flex-col min-h-screen">
      <div className="container flex-grow mb-12">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Get In Touch</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have a question, an opportunity, or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1 flex flex-col gap-12">
             <div className="space-y-6">
                <h3 className="font-headline text-2xl font-semibold text-primary">Contact Info</h3>
                <p className="text-muted-foreground">You can also reach me directly through these channels.</p>
                <TooltipProvider delayDuration={0}>
                    <div className="flex flex-col gap-6 pt-2">
                        <div className="flex gap-4">
                            <PremiumScheduleMeetButton />

                            <SocialIconWithPreview 
                            href="https://www.linkedin.com/in/srinivasa-pradeep-s/"
                            icon={Linkedin}
                            imageId="linkedin-preview"
                            side="top"
                            />

                            <SocialIconWithPreview 
                            href="https://github.com/srinivasa-pradeep"
                            icon={Github}
                            imageId="github-preview"
                            side="bottom"
                            />
                        </div>
                    </div>
                </TooltipProvider>
             </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
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

      {/* T-Rex Odyssey - Full-Width Immersive Layer */}
      <TRexRunner />
    </section>
  );
}
