import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// SVG Logos for the "My Journey" section
const SapLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 50 25" xmlns="http://www.w3.org/2000/svg" className={className}>
        <title>SAP</title>
        <text x="0" y="20" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif" fontSize="24" fontWeight="bold" fill="currentColor">SAP</text>
    </svg>
);

const AmazonLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg" className={className}>
        <title>Amazon</title>
        <path d="M 12,13 A 19.6,19.6,0,0,0,38.5,13" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 33,14 l 5.5,-2.5" stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round"/>
    </svg>
);

const MercedesBenzLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <title>Mercedes-Benz</title>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 2V12" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3.34 17L12 12" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M20.66 17L12 12" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);


const skills = {
  Languages: ["Python", "SQL"],
  Fundamentals: ["DSA", "OOP", "DBMS", "OS", "CN"],
  Tools: ["Git", "Linux", "AWS Basics"],
};

const stats = [
  { title: "Amazon SDE Intern", description: "Gained valuable industry experience." },
  { title: "Python + DSA", description: "Strong foundation in algorithms." },
  { title: "LeetCode Enthusiast", description: "Competitive programming mindset." },
  { title: "Quant Interest", description: "Exploring quantitative finance." },
];

const sriniAvatar = PlaceHolderImages.find(p => p.id === 'srini-avatar');

const companies = [
  { name: 'SAP', logo: SapLogo, className: 'blur-sm scale-75 opacity-50 hover:blur-none hover:opacity-100 hover:scale-90' },
  { name: 'Amazon', logo: AmazonLogo, className: 'blur-[1.5px] scale-90 opacity-75 hover:blur-none hover:opacity-100 hover:scale-100' },
  { name: 'Mercedes-Benz', logo: MercedesBenzLogo, className: 'blur-0 scale-100 opacity-100' },
];


export function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          <div className="md:col-span-1 flex justify-center items-start">
            <div className="relative h-24 w-24 md:h-40 md:w-40 lg:h-48 lg:w-48">
                {sriniAvatar && (
                    <Image
                    src={sriniAvatar.imageUrl}
                    alt={sriniAvatar.description}
                    data-ai-hint={sriniAvatar.imageHint}
                    fill
                    className="rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                    />
                )}
                <div className="absolute bottom-0 right-0 rounded-full bg-primary p-2 shadow-md">
                   <span className="text-xl" role="img" aria-label="wave">👋</span>
                </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">About Me</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              A Computer Science graduate with internship experience at Amazon. I specialize in building clean, efficient user interfaces and have a strong passion for algorithmic problem-solving. My focus is on creating software that is both powerful and a pleasure to use.
            </p>
            
            <div className="mt-12">
              <h3 className="font-headline text-2xl font-semibold text-primary">My Journey</h3>
              <TooltipProvider>
                <div className="mt-8 flex items-center justify-center gap-8 md:gap-12 text-muted-foreground/80">
                  {companies.map((company) => (
                    <Tooltip key={company.name}>
                      <TooltipTrigger>
                        <div className={`transition-all duration-300 ${company.className}`}>
                          <company.logo className="h-10 w-auto md:h-12" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{company.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.title} className="transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-base">{stat.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="font-headline text-2xl font-semibold text-primary">Skills</h3>
              <div className="mt-4 space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="mb-2 font-semibold">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Badge key={item} variant="secondary" className="px-3 py-1 text-sm">{item}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
