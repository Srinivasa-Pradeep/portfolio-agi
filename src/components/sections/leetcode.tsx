'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Github, Link as LinkIcon } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const leetCodeStats = {
  "Total Solved": { value: "350+", icon: "🏆" },
  "Easy": { value: "100+", icon: "🟢" },
  "Medium": { value: "200+", icon: "🟠" },
  "Hard": { value: "50+", icon: "🔴" },
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
  return (
    <section id="leetcode" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Problem Solving</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A snapshot of my dedication to honing algorithmic skills on LeetCode.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(leetCodeStats).map(([label, { value, icon }]) => (
            <Card key={label} className="text-center transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-base font-medium text-muted-foreground">{label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{value}</p>
              </CardContent>
            </Card>
          ))}
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
                    <Badge variant={solution.difficulty === 'Hard' ? 'destructive' : 'default'} className={solution.difficulty === 'Medium' ? 'bg-orange-500' : ''}>
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
