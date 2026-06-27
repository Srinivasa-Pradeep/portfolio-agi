'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ArrowLeft, 
  BookHeart, 
  Briefcase, 
  KeyRound, 
  ScrollText, 
  CheckCircle2, 
  XCircle, 
  Minus,
  Navigation,
  Link as LinkIcon,
  Users
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
import { cn } from '@/lib/utils';

/**
 * @fileOverview Personal Stories Hub & Job Tracker.
 * Added a dynamic "Job Search Odyssey" tracker with On-Campus/Off-Campus toggles.
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

// Placeholder Data - To be populated by user later
const onCampusData = [
  { company: "Amazon", date: "Nov 2024", r1: "pass", r2: "pass", forward: true, result: "Selected" },
  { company: "Google", date: "July 2024", r1: "pass", r2: "fail", forward: false, result: "Not Selected" },
  { company: "SAP Labs", date: "Apr 2023", r1: "pass", r2: "pass", forward: true, result: "Selected" },
];

const offCampusData = [
  { company: "Mercedes-Benz (MBRDI)", date: "Oct 2025", r1: "pass", r2: "pass", referral: "With Referral", forward: true, result: "Selected" },
  { company: "Zomato", date: "Dec 2024", r1: "fail", r2: "-", referral: "Without Referral", forward: false, result: "Not Selected" },
];

function StatusIcon({ status }: { status: string }) {
    if (status === 'pass') return <CheckCircle2 className="h-4 w-4 text-easy" />;
    if (status === 'fail') return <XCircle className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground/30" />;
}

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

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-24">
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

            {/* Job Search Odyssey Tracker */}
            <div className="max-w-5xl mx-auto">
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                        <Navigation className="h-4 w-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Tracking Hub</span>
                    </div>
                    <h2 className="font-headline text-3xl font-black italic tracking-tighter uppercase mb-4">Job Search Odyssey</h2>
                    <p className="max-w-2xl text-muted-foreground text-sm leading-relaxed lora italic">
                        A transparent log of my professional pursuits, tracking every milestone from the first screening to the final offer.
                    </p>
                </div>

                <Tabs defaultValue="on-campus" className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="bg-secondary/30 backdrop-blur-md border border-border/40 p-1 rounded-full h-12">
                            <TabsTrigger value="on-campus" className="rounded-full px-8 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                                On-Campus
                            </TabsTrigger>
                            <TabsTrigger value="off-campus" className="rounded-full px-8 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                                Off-Campus
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="on-campus" className="animate-in fade-in zoom-in-95 duration-500">
                        <Card className="bg-card/40 backdrop-blur-xl border-border/40 overflow-hidden rounded-[32px]">
                            <Table>
                                <TableHeader className="bg-primary/5">
                                    <TableRow className="hover:bg-transparent border-border/10">
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest pl-8">Company</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Timeline</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">R1</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">R2</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">Advanced</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-right pr-8">Result</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {onCampusData.map((row, i) => (
                                        <TableRow key={i} className="group hover:bg-primary/5 transition-colors border-border/10">
                                            <TableCell className="font-bold py-6 pl-8">{row.company}</TableCell>
                                            <TableCell className="font-mono text-[10px] opacity-60 uppercase">{row.date}</TableCell>
                                            <TableCell className="text-center"><div className="flex justify-center"><StatusIcon status={row.r1} /></div></TableCell>
                                            <TableCell className="text-center"><div className="flex justify-center"><StatusIcon status={row.r2} /></div></TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={row.forward ? "easy" : "destructive"} className="h-5 text-[9px] font-black uppercase">
                                                    {row.forward ? "Yes" : "No"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <span className={cn(
                                                    "text-xs font-black italic uppercase tracking-tight",
                                                    row.result === 'Selected' ? "text-easy" : "text-muted-foreground/40"
                                                )}>
                                                    {row.result}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>

                    <TabsContent value="off-campus" className="animate-in fade-in zoom-in-95 duration-500">
                        <Card className="bg-card/40 backdrop-blur-xl border-border/40 overflow-hidden rounded-[32px]">
                            <Table>
                                <TableHeader className="bg-primary/5">
                                    <TableRow className="hover:bg-transparent border-border/10">
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest pl-8">Company</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Protocol</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">R1</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">R2</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-center">Advanced</TableHead>
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest text-right pr-8">Result</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {offCampusData.map((row, i) => (
                                        <TableRow key={i} className="group hover:bg-primary/5 transition-colors border-border/10">
                                            <TableCell className="py-6 pl-8">
                                                <p className="font-bold">{row.company}</p>
                                                <p className="text-[9px] font-mono opacity-40 uppercase mt-1">{row.date}</p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {row.referral.includes('With Referral') ? <Users className="h-3 w-3 text-info" /> : <LinkIcon className="h-3 w-3 text-muted-foreground" />}
                                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{row.referral}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center"><div className="flex justify-center"><StatusIcon status={row.r1} /></div></TableCell>
                                            <TableCell className="text-center"><div className="flex justify-center"><StatusIcon status={row.r2} /></div></TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={row.forward ? "easy" : "destructive"} className="h-5 text-[9px] font-black uppercase">
                                                    {row.forward ? "Yes" : "No"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <span className={cn(
                                                    "text-xs font-black italic uppercase tracking-tight",
                                                    row.result === 'Selected' ? "text-easy" : "text-muted-foreground/40"
                                                )}>
                                                    {row.result}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabsContent>
                </Tabs>
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
