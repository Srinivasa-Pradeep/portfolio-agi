'use client';

import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ListChecks } from 'lucide-react';

const skills = {
  Languages: ['Java', 'C/C++', 'Python', 'JavaScript', 'Bash', 'SQL'],
  'Frameworks & Libraries': ['React.js', 'Spring Boot', 'Node.js', 'Flask', 'Pandas', 'NumPy'],
  Databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
  'Tools & Platforms': ['Git', 'Docker', 'Jenkins', 'AWS', 'Azure', 'Linux/Unix'],
  Concepts: ['Data Structures', 'Algorithms', 'System Design', 'Distributed Systems', 'Performance Optimization'],
};

const stats = [
  {
    title: 'Amazon SDE Intern',
    description: 'Gained valuable industry experience.',
  },
  { title: 'Python + DSA', description: 'Strong foundation in algorithms.' },
  {
    title: 'LeetCode Enthusiast',
    description: 'Competitive programming mindset.',
  },
  { title: 'Quant Interest', description: 'Exploring quantitative finance.' },
];

const companies = [
  {
    name: 'SAP',
    imageId: 'sap-logo',
    className:
      'transition-all duration-300 filter grayscale drop-shadow-lg blur-sm scale-75 hover:grayscale-0 hover:blur-none hover:scale-90 hover:drop-shadow-xl',
    designation: 'Software Developer Intern',
    timeline: 'Apr 2023 - May 2023',
    details: [
      <>Built an expense processing application from the ground up using <strong className="font-semibold text-foreground/90">React.js, Spring Boot, and MongoDB.</strong></>,
      <>Implemented core <strong className="font-semibold text-foreground/90">REST APIs</strong> and gained hands-on experience with enterprise development practices.</>,
      <>Actively participated in code reviews, adhering to <strong className="font-semibold text-foreground/90">industry-standard methodologies</strong> for high-quality software.</>,
    ],
  },
  {
    name: 'Amazon',
    imageId: 'amazon-logo',
    className:
      'transition-all duration-300 filter grayscale drop-shadow-lg blur-[1.5px] scale-90 hover:grayscale-0 hover:blur-none hover:scale-100 hover:drop-shadow-xl',
    designation: 'Software Development Engineer Intern',
    timeline: 'Jan 2025 - Jun 2025',
    details: [
      <>Improved system performance by <strong className="font-semibold text-foreground/90">35% (request latency)</strong> by migrating a distributed, high-traffic service from <strong className="font-semibold text-foreground/90">Java to C++.</strong></>,
      <>Enhanced service reliability across multiple microservices by architecting solutions for <strong className="font-semibold text-foreground/90">legacy system modernization.</strong></>,
      <>Increased code coverage from <strong className="font-semibold text-foreground/90">60% to 92%</strong> by developing comprehensive testing frameworks using <strong className="font-semibold text-foreground/90">C++ and Python.</strong></>,
      <>Accelerated stakeholder decision-making by <strong className="font-semibold text-foreground/90">clearly articulating technical challenges</strong> and solutions through documentation and presentations.</>,
    ],
  },
  {
    name: 'Mercedes-Benz',
    imageId: 'mercedes-logo',
    className:
      'transition-all duration-300 filter grayscale drop-shadow-lg blur-0 scale-100 hover:grayscale-0 hover:scale-105 hover:drop-shadow-2xl',
    designation: 'Graduate Apprentice Trainee - Software Engineer',
    timeline: 'Nov 2025 - Present',
    details: [
      <>Reduced manual workflow intervention by <strong className="font-semibold text-foreground/90">40%</strong> by designing and implementing scalable <strong className="font-semibold text-foreground/90">Python automation solutions</strong> for manufacturing operations.</>,
      <>Optimized process efficiency by building innovative automation technologies on a <strong className="font-semibold text-foreground/90">distributed computing infrastructure.</strong></>,
      <>Delivered production monitoring solutions within rapid <strong className="font-semibold text-foreground/90">2-week sprint cycles</strong> in a cross-disciplinary agile team.</>,
    ],
  },
];

export function About() {
  const { resolvedTheme } = useTheme();
  const [avatar, setAvatar] = useState<ImagePlaceholder | undefined>(
    PlaceHolderImages.find((p) => p.id === 'srini-avatar-light')
  );

  useEffect(() => {
    const lightAvatar = PlaceHolderImages.find(
      (p) => p.id === 'srini-avatar-light'
    );
    const darkAvatar = PlaceHolderImages.find(
      (p) => p.id === 'srini-avatar-dark'
    );

    if (resolvedTheme === 'dark') {
      setAvatar(darkAvatar);
    } else {
      setAvatar(lightAvatar);
    }
  }, [resolvedTheme]);

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          <div className="md:col-span-1 flex justify-center items-start">
            <div className="relative h-24 w-24 md:h-40 md:w-40 lg:h-48 lg:w-48">
              {avatar && (
                <Image
                  src={avatar.imageUrl}
                  alt={avatar.description}
                  data-ai-hint={avatar.imageHint}
                  fill
                  className="rounded-full object-cover transition-all duration-300 hover:scale-105"
                  style={{ objectPosition: 'center 40%' }}
                  key={avatar.id}
                />
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute bottom-0 right-0 cursor-pointer p-1">
                      <span
                        className="text-3xl drop-shadow-lg"
                        role="img"
                        aria-label="focus"
                      >
                        🎯
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Focusing</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
              About Me
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              A Computer Science graduate with internship experience at Amazon. I
              specialize in building clean, efficient user interfaces and have a
              strong passion for algorithmic problem-solving. My focus is on
              creating software that is both powerful and a pleasure to use.
            </p>

            <div className="mt-12">
              <h3 className="font-headline text-2xl font-semibold text-primary">
                Experience
              </h3>
              <div className="mt-8 flex items-center justify-center gap-8 md:gap-12">
                {companies.map((company) => {
                  const logoImage = PlaceHolderImages.find(
                    (p) => p.id === company.imageId
                  );
                  return (
                    <Dialog key={company.name}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                              <div
                                className={`${company.className} cursor-pointer`}
                              >
                                {logoImage ? (
                                  <img
                                    src={logoImage.imageUrl}
                                    alt={logoImage.description}
                                    data-ai-hint={logoImage.imageHint}
                                    className="h-10 w-24 object-contain md:h-12 md:w-32"
                                  />
                                ) : (
                                  <div className="h-10 w-24 md:h-12 md:w-32 bg-muted rounded-md" />
                                )}
                              </div>
                            </DialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View my experience at {company.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-4">
                            {logoImage && (
                              <img
                                src={logoImage.imageUrl}
                                alt={logoImage.description}
                                data-ai-hint={logoImage.imageHint}
                                className="h-8 w-auto rounded-sm"
                              />
                            )}
                            {company.name}
                          </DialogTitle>
                          <DialogDescription>
                            {company.designation} &bull; {company.timeline}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="pt-4">
                          <ul className="space-y-3">
                            {company.details.map((detail, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <ListChecks className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </DialogContent>
                    </Dialog>
                  );
                })}
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card
                  key={stat.title}
                  className="transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardHeader>
                    <CardTitle className="text-base">{stat.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="font-headline text-2xl font-semibold text-primary">
                Skills
              </h3>
              <div className="mt-4 space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="mb-2 font-semibold">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="px-3 py-1 text-sm transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-primary/10"
                        >
                          {item}
                        </Badge>
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
