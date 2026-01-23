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
import { Github, Linkedin, Mail, Send, Briefcase, Star, HelpCircle, MailQuestion, PartyPopper, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

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
              <a href="mailto:srinivas.dev@email.com" className="flex items-center gap-4 group transition-transform duration-200 hover:scale-[1.02]">
                  <div className="bg-secondary p-3 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="h-5 w-5"/>
                  </div>
                  <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">srinivas.dev@email.com</p>
                  </div>
              </a>
              <a href="https://www.linkedin.com/in/srinivasa-pradeep-s/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group transition-transform duration-200 hover:scale-[1.02]">
                  <div className="bg-secondary p-3 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Linkedin className="h-5 w-5"/>
                  </div>
                  <div>
                      <p className="font-semibold">LinkedIn</p>
                      <p className="text-muted-foreground">linkedin.com/in/srinivas-pradeep-s</p>
                  </div>
              </a>
              <a href="https://github.com/srinivasa-pradeep" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group transition-transform duration-200 hover:scale-[1.02]">
                  <div className="bg-secondary p-3 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Github className="h-5 w-5"/>
                  </div>
                  <div>
                      <p className="font-semibold">GitHub</p>
                      <p className="text-muted-foreground">github.com/srinivas-pradeep</p>
                  </div>
              </a>
          </div>
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[440px] flex flex-col justify-center transition-all duration-500">
                {!isSubmitted ? (
                  <form ref={formRef} action={formAction} className="space-y-6 animate-fade-in">
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
