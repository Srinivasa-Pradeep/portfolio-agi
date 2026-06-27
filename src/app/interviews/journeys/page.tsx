'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    CheckCircle2, 
    XCircle, 
    Minus, 
    Navigation, 
    Link as LinkIcon, 
    Users,
    Activity
} from 'lucide-react';
import { interviewExperiences } from '@/lib/interview-experiences';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * @fileOverview Interview Journeys Page.
 * Now includes the Personal Job Tracker for a seamless narrative flow.
 */

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

export default function InterviewJourneysPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24">
        <section id="interviews" className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
                Interview Journeys
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground lora italic">
                Reflecting on the lessons and growth found in every step of the journey.
              </p>
            </div>

            {/* Personal Job Tracker - Integrated for Flow */}
            <div className="max-w-5xl mx-auto mb-32">
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                        <Activity className="h-4 w-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Personal Job Tracker</span>
                    </div>
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
                                            <TableCell className="font-bold py-6 pl-8">
                                                <span className="text-muted-foreground/40 font-mono mr-2">{i + 1}.</span>
                                                {row.company}
                                            </TableCell>
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
                                        <TableHead className="font-black uppercase text-[10px] tracking-widest">Application</TableHead>
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
                                                <p className="font-bold">
                                                    <span className="text-muted-foreground/40 font-mono mr-2">{i + 1}.</span>
                                                    {row.company}
                                                </p>
                                                <p className="text-[9px] font-mono opacity-40 uppercase mt-1 ml-6">{row.date}</p>
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

            <div className="text-center mb-16">
                <h2 className="font-headline text-2xl font-bold tracking-tight text-primary uppercase italic">Detailed Reflections</h2>
                <div className="h-px w-24 bg-primary/10 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {interviewExperiences.map(exp => (
                <Link
                  key={exp.slug}
                  href={`/interviews/${exp.slug}`}
                  className="block h-full group"
                >
                  <Card className="flex h-full flex-col transform-gpu transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {exp.company} - {exp.role}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <CardDescription>{exp.date}</CardDescription>
                        <Badge
                          variant={exp.status === 'selected' ? 'easy' : 'destructive'}
                          className="capitalize"
                        >
                          {exp.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{exp.summary}</p>
                    </CardContent>
                    <CardFooter className="flex-wrap gap-2 pt-4">
                      {exp.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-20 text-center">
              <Button size="lg" variant="outline" asChild className="rounded-full px-8">
                <Link href="/interviews">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Hub
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
