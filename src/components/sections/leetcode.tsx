'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Github, Link as LinkIcon } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  Bar as RechartsBar, 
  BarChart as RechartsBarChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { useState } from "react";
import { cn } from "@/lib/utils";

const leetCodeProgress = {
  totalSolved: 1058,
  totalProblems: 3808,
  attempting: 25,
  easy: { solved: 417, total: 922 },
  medium: { solved: 517, total: 1986 },
  hard: { solved: 124, total: 900 },
  acceptanceRate: "65.3%",
  submissions: "2.8k",
};

const pieData = [
    { name: 'Hard Solved', value: leetCodeProgress.hard.solved, color: 'hsl(var(--destructive))', difficulty: 'hard' },
    { name: 'Hard Remaining', value: leetCodeProgress.hard.total - leetCodeProgress.hard.solved, color: 'hsl(var(--destructive)/0.2)', difficulty: 'hard' },
    { name: 'Medium Solved', value: leetCodeProgress.medium.solved, color: 'hsl(var(--primary))', difficulty: 'medium' },
    { name: 'Medium Remaining', value: leetCodeProgress.medium.total - leetCodeProgress.medium.solved, color: 'hsl(var(--primary)/0.2)', difficulty: 'medium' },
    { name: 'Easy Solved', value: leetCodeProgress.easy.solved, color: 'hsl(var(--easy))', difficulty: 'easy' },
    { name: 'Easy Remaining', value: leetCodeProgress.easy.total - leetCodeProgress.easy.solved, color: 'hsl(var(--easy)/0.2)', difficulty: 'easy'},
].reverse(); // Reverse to have Hard, Medium, Easy


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const difficultyData = payload[0].payload;
    const difficulty = difficultyData.difficulty as 'easy' | 'medium' | 'hard';
    
    if (!difficulty) return null;
    
    const progress = leetCodeProgress[difficulty];

    let color;
    let name;

    if (difficulty === 'easy') {
      name = 'Easy';
      color = 'hsl(var(--easy))';
    } else if (difficulty === 'medium') {
      name = 'Medium';
      color = 'hsl(var(--primary))';
    } else { // hard
      name = 'Hard';
      color = 'hsl(var(--destructive))';
    }
    
    const solvedPercentage = (progress.solved / progress.total * 100).toFixed(1);

    return (
      <div className="rounded-lg border bg-background/80 backdrop-blur-sm p-3 shadow-sm min-w-[140px]">
        <div className="flex justify-between items-center gap-4">
          <span className="font-semibold" style={{ color: color }}>{name}</span>
          <span className="text-sm font-bold" style={{ color: color }}>{progress.solved} <span className="text-muted-foreground text-xs">/ {progress.total}</span></span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
            Solved {solvedPercentage}%
        </div>
      </div>
    );
  }

  return null;
};


const featuredSolutions = [
  { name: "Longest Palindromic Substring", topics: ["DP", "String"], difficulty: "Medium", link: "#" },
  { name: "Number of Islands", topics: ["Graphs", "DFS", "BFS"], difficulty: "Medium", link: "#" },
  { name: "Coin Change", topics: ["DP", "Memoization"], difficulty: "Medium", link: "#" },
  { name: "Merge K Sorted Lists", topics: ["Heap", "Linked List"], difficulty: "Hard", link: "#" },
];

const chartData = [
  { month: "Jan", problems: 20 },
  { month: "Feb", problems: 25 },
  { month: "Mar", problems: 35 },
  { month: "Apr", problems: 30 },
  { month: "May", problems: 45 },
  { month: "Jun", problems: 50 },
];

const chartConfig = {
  problems: {
    label: "Problems",
    color: "hsl(var(--primary))",
  },
};

export function LeetCode() {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <section id="leetcode" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Problem Solving</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A snapshot of my dedication to honing algorithmic skills on LeetCode.
          </p>
        </div>

        <div className="mt-12">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3 relative h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent)/0.5)' }}/>
                        <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="90%"
                        innerRadius="65%"
                        paddingAngle={2}
                        stroke="transparent"
                        >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  {/* Default state */}
                  <div className={cn(
                      "flex flex-col items-center justify-center transition-all duration-300",
                      isHovering ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  )}>
                      <p className="text-4xl font-bold tracking-tight">
                          {leetCodeProgress.totalSolved}
                      </p>
                      <p className="flex items-center justify-center gap-1.5 mt-1 text-sm font-medium text-muted-foreground">
                          Solved
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                          {leetCodeProgress.attempting} Attempting
                      </p>
                  </div>

                  {/* Hover state */}
                  <div className={cn(
                      "absolute flex flex-col items-center justify-center transition-all duration-300",
                      isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  )}>
                      <p className="text-4xl font-bold tracking-tight">
                          {leetCodeProgress.acceptanceRate}
                      </p>
                      <p className="flex items-center justify-center gap-1.5 mt-1 text-sm font-medium text-muted-foreground">
                          Acceptance
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                          {leetCodeProgress.submissions} Submissions
                      </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <Card className="bg-card-foreground/5">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium" style={{color: 'hsl(var(--easy))'}}>Easy</p>
                      <p className="text-lg font-bold">{leetCodeProgress.easy.solved}<span className="text-sm font-normal text-muted-foreground">/{leetCodeProgress.easy.total}</span></p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card-foreground/5">
                   <CardContent className="p-4">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium" style={{color: 'hsl(var(--primary))'}}>Medium</p>
                      <p className="text-lg font-bold">{leetCodeProgress.medium.solved}<span className="text-sm font-normal text-muted-foreground">/{leetCodeProgress.medium.total}</span></p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-card-foreground/5">
                   <CardContent className="p-4">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium" style={{color: 'hsl(var(--destructive))'}}>Hard</p>
                      <p className="text-lg font-bold">{leetCodeProgress.hard.solved}<span className="text-sm font-normal text-muted-foreground">/{leetCodeProgress.hard.total}</span></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Card>
        </div>


        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="font-headline text-2xl font-semibold text-primary mb-4">Monthly Progress</h3>
            <Card>
              <CardContent className="pt-6">
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <RechartsBar dataKey="problems" fill="var(--color-problems)" radius={8} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-headline text-2xl font-semibold text-primary mb-4">Featured Solutions</h3>
            <div className="space-y-4">
              {featuredSolutions.map((solution) => (
                <Card key={solution.name} className="flex items-center justify-between p-4 transition-shadow duration-300 hover:shadow-md">
                  <div>
                    <p className="font-semibold">{solution.name}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {solution.topics.map(topic => <Badge key={topic} variant="secondary">{topic}</Badge>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={solution.difficulty === 'Hard' ? 'destructive' : 'default'} className={solution.difficulty === 'Medium' ? 'bg-primary/80' : ''}>
                      {solution.difficulty}
                    </Badge>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={solution.link} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <a href="https://leetcode.com/u/srinivas-dev/" target="_blank" rel="noopener noreferrer">
                <BarChart className="mr-2 h-4 w-4" /> Visit LeetCode Profile
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
               <a href="https://github.com/srinivas-dev/solutions" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub Solutions
               </a>
            </Button>
        </div>

      </div>
    </section>
  );
}
