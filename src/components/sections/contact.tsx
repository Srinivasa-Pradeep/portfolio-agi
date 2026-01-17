'use client';

import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Message'}
      <Send className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function Contact() {
  const initialState = { message: null, errors: {}, success: false, category: null };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Message Sent!',
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Oops! Something went wrong.',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

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
              <a href="https://linkedin.com/in/srinivas-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group transition-transform duration-200 hover:scale-[1.02]">
                  <div className="bg-secondary p-3 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Linkedin className="h-5 w-5"/>
                  </div>
                  <div>
                      <p className="font-semibold">LinkedIn</p>
                      <p className="text-muted-foreground">linkedin.com/in/srinivas-dev</p>
                  </div>
              </a>
              <a href="https://github.com/srinivas-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group transition-transform duration-200 hover:scale-[1.02]">
                  <div className="bg-secondary p-3 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Github className="h-5 w-5"/>
                  </div>
                  <div>
                      <p className="font-semibold">GitHub</p>
                      <p className="text-muted-foreground">github.com/srinivas-dev</p>
                  </div>
              </a>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
