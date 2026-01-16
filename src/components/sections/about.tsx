import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
            
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
