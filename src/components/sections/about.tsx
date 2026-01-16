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
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
      <title>SAP</title>
        <path fill="#007DC3" d="M0 0h100v50H0z"/>
        <path fill="#000" d="m100 0-50 50h50z"/>
        <g fill="#FFF">
            <path d="M24.6 29.2c0-3.4 2-6.2 6.6-6.2s4.4 1.2 5.6 2.4l-3.2 2c-.8-.8-1.8-1.4-2.8-1.4-1.8 0-3.2 1.2-3.2 3.2s1.4 3.2 3.2 3.2c1 0 2-.6 2.8-1.4l3.2 2c-1.2 1.2-2.8 2.4-5.6 2.4-4.6 0-6.6-2.8-6.6-6.2zM52.6 34.2c-1-1.2-2.8-2.2-5.2-2.2-4 0-6.6-2.8-6.6-6.4s2.6-6.4 6.6-6.4c2.4 0 4 .9 5.2 2.2l-3 2.2c-.8-.8-1.6-1.4-2.4-1.4-1.6 0-2.8 1.2-2.8 3.2s1.2 3.2 2.8 3.2c.8 0 1.6-.6 2.4-1.4l3 2.2zM66.6 29.2c0-3.6-2.4-6.4-6.6-6.4s-6.6 2.8-6.6 6.4 2.4 6.4 6.6 6.4 6.6-2.8 6.6-6.4zm-4 0c0 2.2-1.2 3.4-2.6 3.4s-2.6-1.2-2.6-3.4 1.2-3.4 2.6-3.4 2.6 1.2 2.6 3.4z"/>
        </g>
    </svg>
);

const AmazonLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 106.3 31.9" xmlns="http://www.w3.org/2000/svg">
        <title>Amazon</title>
        <path d="M25.7 18.2c-4.3 0-8.3-2.3-8.3-7.5 0-5.3 4.1-7.5 8.2-7.5 4 0 7.2 2.1 7.2 5.3 0 2.2-1.3 3.5-3.1 3.5-1.1 0-2.3-.6-2.3-1.8 0-.8.8-1.3 1.8-1.3.6 0 1.2.2 1.2.8 0 .4-.6.6-1.2.6-.6 0-1.2-.2-1.2-1C20 9.2 21.6 8 24.3 8c2.4 0 4.9 1.4 4.9 4.8 0 3.6-2.9 5.4-5.5 5.4zm-1-2.1c1.3 0 2.7-.6 2.7-2.3 0-1.6-1.5-2.2-2.8-2.2-1.6 0-2.8.8-2.8 2.3 0 1.6 1.3 2.2 2.9 2.2z" fill="#000"/>
        <path d="M37.8 18.2c-3.2 0-5.4-1.8-5.4-4.5 0-2.6 2-4.4 5.3-4.4 3.3 0 5.4 1.8 5.4 4.4 0 2.7-2.1 4.5-5.3 4.5zm0-1.8c1.8 0 3.1-1.1 3.1-2.7 0-1.5-1.3-2.7-3.1-2.7-1.8 0-3.1 1.2-3.1 2.7 0 1.6 1.3 2.7 3.1 2.7z" fill="#000"/>
        <path d="M51.9 18.2c-3.2 0-5.4-1.8-5.4-4.5 0-2.6 2-4.4 5.3-4.4 3.3 0 5.4 1.8 5.4 4.4 0 2.7-2.1 4.5-5.3 4.5zm0-1.8c1.8 0 3.1-1.1 3.1-2.7 0-1.5-1.3-2.7-3.1-2.7-1.8 0-3.1 1.2-3.1 2.7 0 1.6 1.3 2.7 3.1 2.7z" fill="#000"/>
        <path d="M62.3 9.5h2.4l4.3 8.7-2.4 1.1-2.5-5.4-2.4 5.4-2.4-1.1 4.9-8.7z" fill="#000"/>
        <path d="M72.9 18.2c-1.8 0-3.2-1-3.2-2.7V9.5h2.3v5.6c0 1 .8 1.6 1.8 1.6s1.8-.6 1.8-1.6V9.5h2.3v6c0 1.7-1.4 2.7-3.2 2.7z" fill="#000"/>
        <path d="M85.5 14.8c0 2.2 1.5 3.4 3.5 3.4 1.8 0 2.9-1.1 2.9-2.6 0-1.7-1.2-2.3-3.2-2.8l-1.6-.4c-.7-.2-1.1-.4-1.1-.9s.5-.8 1.2-.8c.8 0 1.2.3 1.2.9h2.2c0-1.8-1.5-2.6-3.4-2.6-1.9 0-3.2 1-3.2 2.5 0 1.5 1 2.2 2.8 2.7l1.8.5c.9.2 1.3.5 1.3 1 0 .6-.6.9-1.4.9-.9 0-1.4-.3-1.5-1h-2.3z" fill="#000"/>
        <path d="M102.3 13.9c.2-2.8-1.6-4.6-4.9-4.6-3.1 0-5.8 2.1-5.8 5.4 0 3.2 2.5 5.3 5.7 5.3 2.9 0 4.9-1.9 5.2-4.5h-2.3c-.2 1.4-1.3 2.4-2.9 2.4-1.9 0-3.3-1.3-3.3-3.2 0-1.9 1.3-3.2 3.2-3.2 2 0 2.8 1.3 2.8 2.9h-2.9v1.9h5.1z" fill="#000"/>
        <path d="M89.3 23.4c6.1 0 11-1.9 14.5-5.1-1.3 3.6-4.6 6.1-9.1 6.1-4.9 0-8.9-2.9-10.4-6.9 1.5 2.1 3.5 3.9 6.2 4.9.7.3 1.5.5 2.3.7.8.2 1.6.3 2.5.3z" fill="#FF9900"/>
        <path d="M91.8 18.5c-.5.4-1.1.9-1.7 1.3-2.1 1.5-4.5 2.4-7.2 2.4-2.8 0-5.4-1-7.5-2.6-.9-.7-1.7-1.4-2.3-2.3.4-.4.8-.8 1.2-1.1 2-1.6 4.3-2.5 6.9-2.5 2.4 0 4.6.8 6.5 2.2.7.5 1.3 1.1 1.8 1.7.1.1.2.2.3.3z" fill="#FF9900"/>
    </svg>
);

const MercedesBenzLogo = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <title>Mercedes-Benz</title>
    <path fill="#E8E8E8" d="M504.6,256c0,137.4-111.6,249-248.6,249S8,393.4,8,256,119.6,7,256,7,504.6,118.6,504.6,256z"/>
    <path fill="#B2B2B2" d="M256,505C119.6,505,8,393.4,8,256S119.6,7,256,7s248,111.6,248,249-111,249-248,249Z"/>
    <path fill="#E8E8E8" d="M256,472.3c-119.5,0-216.3-96.8-216.3-216.3S136.5,39.7,256,39.7s216.3,96.8,216.3,216.3S375.5,472.3,256,472.3Z"/>
    <path fill="#B2B2B2" d="M256,91l138.8,240.4H117.2L256,91Z"/>
    <path fill="#E8E8E8" d="m256,120.3l-114.7,198.7h229.3L256,120.3Z"/>
    <path fill="#B2B2B2" d="M256,421V91l-138.8,240.4,138.8,89.6Z"/>
    <path fill="#E8E8E8" d="M256,392.5V120.3l114.7,198.7-114.7,73.5Z"/>
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
  { name: 'SAP', logo: SapLogo, className: 'transition-all duration-300 filter grayscale drop-shadow-lg blur-sm scale-75 hover:grayscale-0 hover:blur-none hover:scale-90 hover:drop-shadow-xl' },
  { name: 'Amazon', logo: AmazonLogo, className: 'transition-all duration-300 filter grayscale drop-shadow-lg blur-[1.5px] scale-90 hover:grayscale-0 hover:blur-none hover:scale-100 hover:drop-shadow-xl' },
  { name: 'Mercedes-Benz', logo: MercedesBenzLogo, className: 'transition-all duration-300 filter grayscale drop-shadow-lg blur-0 scale-100 hover:grayscale-0 hover:scale-105 hover:drop-shadow-2xl' },
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
                <div className="mt-8 flex items-center justify-center gap-8 md:gap-12">
                  {companies.map((company) => (
                    <Tooltip key={company.name}>
                      <TooltipTrigger>
                        <div className={company.className}>
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
