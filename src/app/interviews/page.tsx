'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookHeart, 
  Briefcase, 
  KeyRound, 
  ScrollText, 
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

/**
 * @fileOverview Personal Stories Hub.
 * The Job Tracker has been moved to the Interview Journeys section for better narrative flow.
 */

const storyCategories = [
    {
        title: "Interview Journeys",
        description: "In-depth stories about my interview experiences with various companies, sharing lessons learned along the way.",
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        link: "/interviews/journeys",
        cta: "Explore Journeys",
        disabled: false,
    },
    {
        title: "Life & Reflections",
        description: "Personal thoughts on life, growth, and the philosophies that guide me. Access required.",
        icon: <BookHeart className="h-8 w-8 text-primary" />,
        link: "/interviews/reflections",
        cta: "Unlock Stories",
        disabled: false,
        isProtected: true,
    }
];

function ReflectionsPasswordDialog({ children }: { children: React.ReactNode }) {
    const [password, setPassword] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const correctPassword = 'thursday';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.toLowerCase() === correctPassword) {
            toast({
                title: "Access Granted",
                description: "Welcome to my personal space.",
            });
            setIsOpen(false);
            router.push('/interviews/reflections');
        } else {
            toast({
                variant: "destructive",
                title: "Access Denied",
                description: "That's not the secret word. Try again.",
            });
            setPassword('');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <KeyRound className="h-6 w-6 text-primary" />
                        Secret Section
                    </DialogTitle>
                    <DialogDescription>
                       This space is for personal reflections. To enter, answer a simple question: What's my favorite day of the week?
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password-input" className="text-right">
                            Fav Day
                        </Label>
                        <Input
                            id="password-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter the magic word..."
                        />
                    </div>
                    <Button type="submit">Unlock</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function PersonalStoriesHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Header />
      <main className="flex-1 pt-24 pb-20">
        <section id="personal-stories" className="pt-20">
          <div className="container">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-3xl bg-primary/10 border border-primary/20">
                  <ScrollText className="h-12 w-12 text-primary animate-pulse" />
                </div>
              </div>
              <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
                Personal Blog
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground lora italic">
                A collection of my personal stories, life lessons, and interview journeys.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {storyCategories.map(category => {
                const cardContent = (
                  <Card className={`flex h-full flex-col transform-gpu transition-all duration-300 ${!category.disabled && 'group-hover:-translate-y-2 group-hover:shadow-2xl'} bg-card/40 backdrop-blur-sm border-border/40`}>
                    <CardHeader className="flex-row items-center gap-6 space-y-0">
                        <div className="p-3 bg-primary/10 rounded-full">
                            {category.icon}
                        </div>
                        <div>
                            <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                                {category.title}
                            </CardTitle>
                            <CardDescription className="mt-2 text-base leading-relaxed">
                                {category.description}
                            </CardDescription>
                        </div>
                    </CardHeader>
                  </Card>
                );

                if (category.isProtected) {
                    return (
                        <ReflectionsPasswordDialog key={category.title}>
                            <div className="block h-full group cursor-pointer">
                                {cardContent}
                            </div>
                        </ReflectionsPasswordDialog>
                    );
                }

                return (
                  <Link
                    key={category.title}
                    href={category.link}
                    className={`block h-full group ${category.disabled ? 'pointer-events-none' : ''}`}
                  >
                    {cardContent}
                  </Link>
                );
              })}
            </div>

            <div className="mt-24 text-center">
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 group">
                <Link href="/#blogs">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Main
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
