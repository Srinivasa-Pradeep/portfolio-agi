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
        <path fill="currentColor" d="M12.3 14.6c0-1.7 1-3.1 3.3-3.1 1.4 0 2.2.6 2.8 1.2l-1.6 1c-.4-.4-.9-.7-1.4-.7-.9 0-1.6.6-1.6 1.6s.7 1.6 1.6 1.6c.5 0 1-.3 1.4-.7l1.6 1c-.6.6-1.4 1.2-2.8 1.2-2.3 0-3.3-1.4-3.3-3.1zm14 2.5c-.5.6-1.4 1.1-2.6 1.1-2 0-3.3-1.4-3.3-3.2s1.3-3.2 3.3-3.2c1.2 0 2 .5 2.6 1.1l-1.5 1.1c-.4-.4-.8-.7-1.2-.7-.8 0-1.4.6-1.4 1.6s.6 1.6 1.4 1.6c.4 0 .8-.3 1.2-.7l1.5 1.1zm7-2.5c0-1.8-1.2-3.2-3.3-3.2s-3.3 1.4-3.3 3.2 1.2 3.2 3.3 3.2 3.3-1.4 3.3-3.2zm-2 0c0 1.1-.6 1.7-1.3 1.7s-1.3-.6-1.3-1.7.6-1.7 1.3-1.7 1.3.6 1.3 1.7z"/>
    </svg>
);

const AmazonLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 106.3 31.9" xmlns="http://www.w3.org/2000/svg" className={className}>
        <title>Amazon</title>
        <path fill="currentColor" d="M25.7 18.2c-4.3 0-8.3-2.3-8.3-7.5 0-5.3 4.1-7.5 8.2-7.5 4 0 7.2 2.1 7.2 5.3 0 2.2-1.3 3.5-3.1 3.5-1.1 0-2.3-.6-2.3-1.8 0-.8.8-1.3 1.8-1.3.6 0 1.2.2 1.2.8 0 .4-.6.6-1.2.6-.6 0-1.2-.2-1.2-1C20 9.2 21.6 8 24.3 8c2.4 0 4.9 1.4 4.9 4.8 0 3.6-2.9 5.4-5.5 5.4zm-1-2.1c1.3 0 2.7-.6 2.7-2.3 0-1.6-1.5-2.2-2.8-2.2-1.6 0-2.8.8-2.8 2.3 0 1.6 1.3 2.2 2.9 2.2z"/>
        <path fill="currentColor" d="M37.8 18.2c-3.2 0-5.4-1.8-5.4-4.5 0-2.6 2-4.4 5.3-4.4 3.3 0 5.4 1.8 5.4 4.4 0 2.7-2.1 4.5-5.3 4.5zm0-1.8c1.8 0 3.1-1.1 3.1-2.7 0-1.5-1.3-2.7-3.1-2.7-1.8 0-3.1 1.2-3.1 2.7 0 1.6 1.3 2.7 3.1 2.7z"/>
        <path fill="currentColor" d="M51.9 18.2c-3.2 0-5.4-1.8-5.4-4.5 0-2.6 2-4.4 5.3-4.4 3.3 0 5.4 1.8 5.4 4.4 0 2.7-2.1 4.5-5.3 4.5zm0-1.8c1.8 0 3.1-1.1 3.1-2.7 0-1.5-1.3-2.7-3.1-2.7-1.8 0-3.1 1.2-3.1 2.7 0 1.6 1.3 2.7 3.1 2.7z"/>
        <path fill="currentColor" d="M62.3 9.5h2.4l4.3 8.7-2.4 1.1-2.5-5.4-2.4 5.4-2.4-1.1 4.9-8.7z"/>
        <path fill="currentColor" d="M72.9 18.2c-1.8 0-3.2-1-3.2-2.7V9.5h2.3v5.6c0 1 .8 1.6 1.8 1.6s1.8-.6 1.8-1.6V9.5h2.3v6c0 1.7-1.4 2.7-3.2 2.7z"/>
        <path fill="currentColor" d="M85.5 14.8c0 2.2 1.5 3.4 3.5 3.4 1.8 0 2.9-1.1 2.9-2.6 0-1.7-1.2-2.3-3.2-2.8l-1.6-.4c-.7-.2-1.1-.4-1.1-.9s.5-.8 1.2-.8c.8 0 1.2.3 1.2.9h2.2c0-1.8-1.5-2.6-3.4-2.6-1.9 0-3.2 1-3.2 2.5 0 1.5 1 2.2 2.8 2.7l1.8.5c.9.2 1.3.5 1.3 1 0 .6-.6.9-1.4.9-.9 0-1.4-.3-1.5-1h-2.3z"/>
        <path fill="currentColor" d="M102.3 13.9c.2-2.8-1.6-4.6-4.9-4.6-3.1 0-5.8 2.1-5.8 5.4 0 3.2 2.5 5.3 5.7 5.3 2.9 0 4.9-1.9 5.2-4.5h-2.3c-.2 1.4-1.3 2.4-2.9 2.4-1.9 0-3.3-1.3-3.3-3.2 0-1.9 1.3-3.2 3.2-3.2 2 0 2.8 1.3 2.8 2.9h-2.9v1.9h5.1z"/>
        <path fill="#FF9900" d="M89.3 23.4c6.1 0 11-1.9 14.5-5.1-1.3 3.6-4.6 6.1-9.1 6.1-4.9 0-8.9-2.9-10.4-6.9 1.5 2.1 3.5 3.9 6.2 4.9.7.3 1.5.5 2.3.7.8.2 1.6.3 2.5.3z"/>
        <path d="M91.8 18.5c-.5.4-1.1.9-1.7 1.3-2.1 1.5-4.5 2.4-7.2 2.4-2.8 0-5.4-1-7.5-2.6-.9-.7-1.7-1.4-2.3-2.3.4-.4.8-.8 1.2-1.1 2-1.6 4.3-2.5 6.9-2.5 2.4 0 4.6.8 6.5 2.2.7.5 1.3 1.1 1.8 1.7.1.1.2.2.3.3z" fill="#FF9900"/>
    </svg>
);

const MercedesBenzLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <title>Mercedes-Benz</title>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 2V12" stroke="currentColor" strokeWidth="2"/>
    <path d="M3.34 17L12 12" stroke="currentColor" strokeWidth="2"/>
    <path d="M20.66 17L12 12" stroke="currentColor" strokeWidth="2"/>
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
