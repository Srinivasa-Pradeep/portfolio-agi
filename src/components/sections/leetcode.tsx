'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shuffle, Trophy, TrendingUp, Code, Github } from "lucide-react";
import { 
  Area,
  AreaChart,
  Bar as RechartsBar, 
  BarChart as RechartsBarChart,
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const leetCodeProgress = {
  totalSolved: 1084,
  totalProblems: 3832,
  attempting: 25,
  easy: { solved: 424, total: 924 },
  medium: { solved: 530, total: 2002 },
  hard: { solved: 130, total: 906 },
  acceptanceRate: "65.48%",
  submissions: "2.8k",
};

const codeforcesStats = {
  rating: 1275,
  maxRating: 1280,
  rank: "Pupil",
  solved: 59,
  contests: 10,
  handle: "srinivasa_pradeep",
};

// Precise rating history calculated from user deltas:
const codeforcesRatingHistory = [
  { index: 1, rating: 368 },
  { index: 2, rating: 657 },
  { index: 3, rating: 857 },
  { index: 4, rating: 1027 },
  { index: 5, rating: 1158 },
  { index: 6, rating: 1235 },
  { index: 7, rating: 1148 },
  { index: 8, rating: 1280 }, 
  { index: 9, rating: 1278 },
  { index: 10, rating: 1275 },
];

const codeforcesSolvedData = [
  { rating: "800", count: 30 },
  { rating: "1000", count: 15 },
  { rating: "1200", count: 10 },
  { rating: "1400", count: 4 },
];

const pieData = [
    { name: 'Hard Solved', value: leetCodeProgress.hard.solved, color: 'hsl(var(--destructive))', difficulty: 'hard' },
    { name: 'Hard Remaining', value: leetCodeProgress.hard.total - leetCodeProgress.hard.solved, color: 'hsl(var(--destructive)/0.2)', difficulty: 'hard' },
    { name: 'Medium Solved', value: leetCodeProgress.medium.solved, color: 'hsl(var(--primary))', difficulty: 'medium' },
    { name: 'Medium Remaining', value: leetCodeProgress.medium.total - leetCodeProgress.medium.solved, color: 'hsl(var(--primary)/0.2)', difficulty: 'medium' },
    { name: 'Easy Solved', value: leetCodeProgress.easy.solved, color: 'hsl(var(--easy))', difficulty: 'easy' },
    { name: 'Easy Remaining', value: leetCodeProgress.easy.total - leetCodeProgress.easy.solved, color: 'hsl(var(--easy)/0.2)', difficulty: 'easy'},
].reverse();


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


const contestStats = {
  rating: 1866,
  globalRanking: "43,066",
  totalRanked: "829,353",
  attended: 19,
  topPercentage: 5.35,
};

const ratingHistory = [
  { index: 0, rating: 1556 },
  { index: 1, rating: 1657 },
  { index: 2, rating: 1595 },
  { index: 3, rating: 1612 },
  { index: 4, rating: 1671 },
  { index: 5, rating: 1700 },
  { index: 6, rating: 1707 },
  { index: 7, rating: 1717 },
  { index: 8, rating: 1722 },
  { index: 9, rating: 1731 },
  { index: 10, rating: 1807 },
  { index: 11, rating: 1790 },
  { index: 12, rating: 1786 },
  { index: 13, rating: 1794 },
  { index: 14, rating: 1785 },
  { index: 15, rating: 1786 },
  { index: 16, rating: 1841 },
  { index: 17, rating: 1826 },
  { index: 18, rating: 1866 },
];

const RatingTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border bg-background/90 backdrop-blur-sm p-2 shadow-lg">
        <p className="font-bold text-sm">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const featuredSolutions = [
  {
    title: "Count Odd Numbers in an Interval Range",
    difficulty: "Easy",
    topics: ["Math"],
    link: "https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/solutions/7396711/o1-math-trick-python-c-java-by-srinivasa-r8pl"
  },
  {
    title: "Maximize Happiness of Selected Children",
    difficulty: "Medium",
    topics: ["Array", "Greedy", "Sorting"],
    link: "https://leetcode.com/problems/maximize-happiness-of-selected-children/solutions/7436813/sorting-greedy-python-c-by-srinivasa_pra-4nlj"
  },
  {
    title: "Minimum One Bit Operations to Make Integers Zero",
    difficulty: "Hard",
    topics: ["Math","Dynamic Programming","Bit Manipulation","Recursion","Memoization"],
    link: "https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero/solutions/7333658/bit-manipulation-gray-code-logic-python-kwkii"
  }
];

const allProblems = [
    { title: 'Make Array Zero by Subtracting Equal Amounts', difficulty: 'Easy', link: 'https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts/', topics: [] },
    { title: 'Copy List with Random Pointer', difficulty: 'Medium', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/', topics: [] },
    { title: 'Reorganize String', difficulty: 'Medium', link: 'https://leetcode.com/problems/reorganize-string/', topics: [] },
    { title: 'Word Break II', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-break-ii/', topics: [] },
    { title: 'All Nodes Distance K in Binary Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', topics: [] },
    { title: 'Rotting Oranges', difficulty: 'Medium', link: 'https://leetcode.com/problems/rotting-oranges/', topics: [] },
    { title: 'Integer to English Words', difficulty: 'Hard', link: 'https://leetcode.com/problems/integer-to-english-words/', topics: [] },
    { title: 'LRU Cache', difficulty: 'Medium', link: 'https://leetcode.com/problems/lru-cache/', topics: [] },
    { title: 'Maximum Number of Robots Within Budget', difficulty: 'Hard', link: 'https://leetcode.com/problems/maximum-number-of-robots-within-budget/', topics: [] },
    { title: 'Find Triangular Sum of an Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-triangular-sum-of-an-array/', topics: [] },
    { title: 'Number of Ways to Select Buildings', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-ways-to-select-buildings/', topics: [] },
    { title: 'Maximum Length of Subarray With Positive Product', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/', topics: [] },
    { title: 'Find Good Days to Rob the Bank', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-good-days-to-rob-the-bank/', topics: [] },
    { title: 'Find the K-Sum of an Array', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-the-k-sum-of-an-array/', topics: [] },
    { title: 'Sequentially Ordinal Rank Tracker', difficulty: 'Hard', link: 'https://leetcode.com/problems/sequentially-ordinal-rank-tracker/', topics: [] },
    { title: 'Boundary of Binary Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/boundary-of-binary-tree/', topics: [] },
    { title: 'Total Appeal of A String', difficulty: 'Hard', link: 'https://leetcode.com/problems/total-appeal-of-a-string/', topics: [] },
    { title: 'Maximum Units on a Truck', difficulty: 'Easy', link: 'https://leetcode.com/problems/maximum-units-on-a-truck/', topics: [] },
    { title: 'Find Median from Data Stream', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-median-from-data-stream/', topics: [] },
    { title: 'Trapping Rain Water', difficulty: 'Hard', link: 'https://leetcode.com/problems/trapping-rain-water/', topics: [] },
    { title: 'Minimum Adjacent Swaps to Make a Valid Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-adjacent-swaps-to-make-a-valid-array/', topics: [] },
    { title: 'Design Parking System', difficulty: 'Easy', link: 'https://leetcode.com/problems/design-parking-system/', topics: [] },
    { title: 'Group Anagrams', difficulty: 'Medium', link: 'https://leetcode.com/problems/group-anagrams/', topics: [] },
    { title: 'Minimum Health to Beat Game', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-health-to-beat-game/', topics: [] },
    { title: 'Sum of Subarray Ranges', difficulty: 'Medium', link: 'https://leetcode.com/problems/sum-of-subarray-ranges/', topics: [] },
    { title: 'Substring With Largest Variance', difficulty: 'Hard', link: 'https://leetcode.com/problems/substring-with-largest-variance/', topics: [] },
    { title: 'Maximum Number of Books You Can Take', difficulty: 'Hard', link: 'https://leetcode.com/problems/maximum-number-of-books-you-can-take/', topics: [] },
    { title: 'Sequential Digits', difficulty: 'Medium', link: 'https://leetcode.com/problems/sequential-digits/', topics: [] },
    { title: 'Sum of Total Strength of Wizards', difficulty: 'Hard', link: 'https://leetcode.com/problems/sum-of-total-strength-of-wizards/', topics: [] },
    { title: 'Race Car', difficulty: 'Hard', link: 'https://leetcode.com/problems/race-car/', topics: [] },
    { title: 'Number of Islands', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-islands/', topics: [] },
    { title: 'Build Binary Expression Tree From Infix Expression', difficulty: 'Hard', link: 'https://leetcode.com/problems/build-binary-expression-tree-from-infix-expression/', topics: [] },
    { title: 'Minimum Number of Swaps to Make the Binary String Alternating', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-binary-string-alternating/', topics: [] },
    { title: 'Design In-Memory File System', difficulty: 'Hard', link: 'https://leetcode.com/problems/design-in-memory-file-system/', topics: [] },
    { title: 'Minimum Number of Moves to Make Palindrome', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-number-of-moves-to-make-palindrome/', topics: [] },
    { title: 'Reorder Data in Log Files', difficulty: 'Medium', link: 'https://leetcode.com/problems/reorder-data-in-log-files/', topics: [] },
    { title: 'Course Schedule', difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule/', topics: [] },
    { title: 'Find K-th Smallest Pair Distance', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-k-th-smallest-pair-distance/', topics: [] },
    { title: 'Analyze User Website Visit Pattern', difficulty: 'Medium', link: 'https://leetcode.com/problems/analyze-user-website-visit-pattern/', topics: [] },
    { title: 'Count Unique Characters of All Substrings of a Given String', difficulty: 'Hard', link: 'https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/', topics: [] },
    { title: 'Concatenated Words', difficulty: 'Hard', link: 'https://leetcode.com/problems/concatenated-words/', topics: [] },
    { title: 'Design Tic-Tac-Toe', difficulty: 'Medium', link: 'https://leetcode.com/problems/design-tic-tac-toe/', topics: [] },
    { title: 'Minimum Number of Keypresses', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-number-of-keypresses/', topics: [] },
    { title: 'Design an Expression Tree With Evaluate Function', difficulty: 'Medium', link: 'https://leetcode.com/problems/design-an-expression-tree-with-evaluate-function/', topics: [] },
    { title: 'Sliding Window Maximum', difficulty: 'Hard', link: 'https://leetcode.com/problems/sliding-window-maximum/', topics: [] },
    { title: 'Search Suggestions System', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-suggestions-system/', topics: [] },
    { title: 'K Closest Points to Origin', difficulty: 'Medium', link: 'https://leetcode.com/problems/k-closest-points-to-origin/', topics: [] },
    { title: 'Plates Between Candles', difficulty: 'Medium', link: 'https://leetcode.com/problems/plates-between-candles/', topics: [] },
    { title: 'Meeting Rooms II', difficulty: 'Medium', link: 'https://leetcode.com/problems/meeting-rooms-ii/', topics: [] },
    { title: 'Word Ladder', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-ladder/', topics: [] },
    { title: 'Sum of Nodes with Even-Valued Grandparent', difficulty: 'Medium', link: 'https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent/', topics: [] },
    { title: 'Shortest Distance to a Character', difficulty: 'Easy', link: 'https://leetcode.com/problems/shortest-distance-to-a-character/', topics: [] },
    { title: 'Reverse Words in a String II', difficulty: 'Medium', link: 'https://leetcode.com/problems/reverse-words-in-a-string-ii/', topics: [] },
    { title: 'Game Play Analysis III', difficulty: 'Medium', link: 'https://leetcode.com/problems/game-play-analysis-iii/', topics: [] },
    { title: 'Construct Binary Tree from String', difficulty: 'Medium', link: 'https://leetcode.com/problems/construct-binary-tree-from-string/', topics: [] },
    { title: 'Find Cumulative Salary of an Employee', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-cumulative-salary-of-an-employee/', topics: [] },
    { title: 'Equal Tree Partition', difficulty: 'Medium', link: 'https://leetcode.com/problems/equal-tree-partition/', topics: [] },
    { title: 'Number of Distinct Islands', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-distinct-islands/', topics: [] },
    { title: 'Number of Distinct Islands II', difficulty: 'Hard', link: 'https://leetcode.com/problems/number-of-distinct-islands-ii/', topics: [] },
    { title: 'Cut Off Trees for Golf Event', difficulty: 'Hard', link: 'https://leetcode.com/problems/cut-off-trees-for-golf-event/', topics: [] },
    { title: 'LFU Cache', difficulty: 'Hard', link: 'https://leetcode.com/problems/lfu-cache/', topics: [] },
    { title: 'Split Linked List in Parts', difficulty: 'Medium', link: 'https://leetcode.com/problems/split-linked-list-in-parts/', topics: [] },
    { title: 'Solve the Equation', difficulty: 'Medium', link: 'https://leetcode.com/problems/solve-the-equation/', topics: [] },
    { title: 'Optimal Division', difficulty: 'Medium', link: 'https://leetcode.com/problems/optimal-division/', topics: [] },
    { title: 'K-diff Pairs in an Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/k-diff-pairs-in-an-array/', topics: [] },
    { title: "Pascal's Triangle II", difficulty: 'Easy', link: "https://leetcode.com/problems/pascals-triangle-ii/", topics: [] },
    { title: 'Sort Characters By Frequency', difficulty: 'Medium', link: 'https://leetcode.com/problems/sort-characters-by-frequency/', topics: [] },
    { title: 'Image Smoother', difficulty: 'Easy', link: 'https://leetcode.com/problems/image-smoother/', topics: [] },
    { title: 'Maximum Candies Allocated to K Children', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-candies-allocated-to-k-children/', topics: [] },
    { title: 'Count Prefix and Suffix Pairs II', difficulty: 'Hard', link: 'https://leetcode.com/problems/count-prefix-and-suffix-pairs-ii/', topics: [] },
    { title: 'Alien Dictionary', difficulty: 'Hard', link: 'https://leetcode.com/problems/alien-dictionary/', topics: [] },
];

type Problem = typeof allProblems[0];

export function LeetCode() {
  const [isHovering, setIsHovering] = useState(false);
  const [randomProblem, setRandomProblem] = useState<Problem | null>(null);

  const shuffleProblem = () => {
    const randomIndex = Math.floor(Math.random() * allProblems.length);
    setRandomProblem(allProblems[randomIndex]);
  };

  useEffect(() => {
    shuffleProblem();
  }, []);

  return (
    <section id="leetcode" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Problem Solving Hub</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A real-time snapshot of my dedication to honing algorithmic skills across top competitive platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6 transition-shadow duration-300 hover:shadow-xl bg-card/50 backdrop-blur-lg border-border/20">
              <div className="flex items-center gap-2 mb-6">
                <SiLeetcode className="h-6 w-6 text-[#FFA116]" />
                <h3 className="font-headline text-xl font-semibold">LeetCode Journey</h3>
              </div>
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
                    </div>

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
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  {[
                    { label: 'Easy', value: leetCodeProgress.easy, color: 'var(--easy)' },
                    { label: 'Medium', value: leetCodeProgress.medium, color: 'var(--primary)' },
                    { label: 'Hard', value: leetCodeProgress.hard, color: 'var(--destructive)' }
                  ].map((lvl) => (
                    <Card key={lvl.label} className="bg-card-foreground/5">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-baseline">
                          <p className="text-sm font-medium" style={{color: `hsl(${lvl.color})`}}>{lvl.label}</p>
                          <p className="text-lg font-bold">{lvl.value.solved}<span className="text-sm font-normal text-muted-foreground">/{lvl.value.total}</span></p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6 transition-shadow duration-300 hover:shadow-xl bg-card/50 backdrop-blur-lg border-border/20">
              <Tabs defaultValue="leetcode" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-headline text-xl font-semibold">Performance</h3>
                  </div>
                  <TabsList className="bg-background/50">
                    <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
                    <TabsTrigger value="codeforces">Codeforces</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="leetcode" className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center md:text-left">
                    <div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                          <p className="text-sm text-muted-foreground">Rating</p>
                          <img src="https://assets.leetcode.com/static_assets/others/Knight.gif" alt="Knight" className="h-6 w-6" />
                      </div>
                      <p className="text-2xl font-bold">{contestStats.rating}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Global Rank</p>
                      <p className="text-2xl font-bold">{contestStats.globalRanking}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Top</p>
                      <p className="text-2xl font-bold">{contestStats.topPercentage}%</p>
                    </div>
                  </div>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ratingHistory} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="index" hide />
                        <YAxis domain={['dataMin - 50', 'dataMax + 50']} hide />
                        <Tooltip content={<RatingTooltip />} />
                        <Area type="monotone" dataKey="rating" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorRating)" dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                <TabsContent value="codeforces" className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center md:text-left">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Rating</p>
                      <p className="text-2xl font-bold text-primary">{codeforcesStats.rating}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Max Rating</p>
                      <p className="text-2xl font-bold">{codeforcesStats.maxRating}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Problems Solved</p>
                      <p className="text-2xl font-bold">{codeforcesStats.solved}+</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-64">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rating Progression</p>
                      <ResponsiveContainer width="100%" height="90%">
                        <AreaChart data={codeforcesRatingHistory}>
                          <defs>
                            <linearGradient id="cfRatingColor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="index" hide />
                          <YAxis domain={['0', 'dataMax + 100']} hide />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                            itemStyle={{ color: 'hsl(var(--primary))' }}
                          />
                          <Area type="monotone" dataKey="rating" stroke="hsl(var(--primary))" fill="url(#cfRatingColor)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Solved by Difficulty</p>
                      <ResponsiveContainer width="100%" height="90%">
                        <RechartsBarChart data={codeforcesSolvedData}>
                          <XAxis dataKey="rating" fontSize={10} axisLine={false} tickLine={false} />
                          <Tooltip 
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }}
                          />
                          <RechartsBar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Summary Column */}
          <div className="space-y-8">
            <Card className="p-6 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-lg border-border/20 border-l-4 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <SiCodeforces className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Codeforces</h3>
                  <p className="text-xs text-muted-foreground">@{codeforcesStats.handle}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Rank</p>
                  <p className="font-bold text-lg text-primary">{codeforcesStats.rank}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Solved</p>
                  <p className="font-bold text-lg">{codeforcesStats.solved}</p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full mt-6 group">
                <a href={`https://codeforces.com/profile/${codeforcesStats.handle}`} target="_blank" rel="noopener noreferrer">
                  View Profile <SiCodeforces className="ml-2 h-4 w-4 group-hover:text-primary transition-colors" />
                </a>
              </Button>
            </Card>

            <div className="space-y-4">
              <h3 className="font-headline text-lg font-semibold flex items-center gap-2 px-1">
                <Shuffle className="h-4 w-4 text-primary" />
                Quick Challenge
              </h3>
              {randomProblem ? (
                <Card className="flex flex-col transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-card/50 backdrop-blur-lg border-border/20">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base font-semibold line-clamp-1">{randomProblem.title}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={shuffleProblem} className="h-8 w-8">
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <Badge 
                      variant={randomProblem.difficulty === 'Hard' ? 'destructive' : randomProblem.difficulty === 'Medium' ? 'default' : 'easy'}
                      className="text-[10px] py-0 h-5"
                    >
                      {randomProblem.difficulty}
                    </Badge>
                  </CardContent>
                  <CardFooter>
                      <Button asChild size="sm" className="w-full">
                        <a href={randomProblem.link} target="_blank" rel="noopener noreferrer">
                          <Code className="mr-2 h-3 w-3" /> Solve Now
                        </a>
                      </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="h-32 bg-muted/20 animate-pulse rounded-xl" />
              )}
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 text-primary mb-2 text-sm font-semibold">
                <Trophy className="h-4 w-4" />
                Milestone Reached
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Successfully solved {leetCodeProgress.totalSolved + codeforcesStats.solved}+ problems across platforms, maintaining a global top 5.36% rank on LeetCode.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-headline text-2xl font-semibold text-primary mb-8 text-center">Featured Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSolutions.map((solution) => (
              <Card key={solution.title} className="flex flex-col transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-card/50 backdrop-blur-lg border-white/5">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{solution.title}</CardTitle>
                    <Badge variant={solution.difficulty === 'Hard' ? 'destructive' : solution.difficulty === 'Medium' ? 'default' : 'easy'} className="capitalize">
                      {solution.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                        {solution.topics.map(topic => <Badge key={topic} variant="outline" className="text-[10px]">{topic}</Badge>)}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="outline" className="w-full group">
                      <a href={solution.link} target="_blank" rel="noopener noreferrer">
                        <Code className="mr-2 h-4 w-4" /> View Solution
                      </a>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="min-w-[200px]">
              <a href="https://leetcode.com/u/srinivasa_pradeep_/" target="_blank" rel="noopener noreferrer">
                <SiLeetcode className="mr-2 h-5 w-5" /> LeetCode Profile
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-w-[200px]">
               <a href="https://github.com/Srinivasa-Pradeep/Data-Structures-and-Algo" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> GitHub Solutions
               </a>
            </Button>
        </div>

      </div>
    </section>
  );
}