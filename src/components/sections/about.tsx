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
import { ListChecks, Code, Database, GitBranch, Binary, Workflow, Component, Network, Gauge, Terminal, Wind } from 'lucide-react';

const stats = [
  { title: 'Top 6.68% on LeetCode' },
  { title: 'Amazon ML Summer School' },
  { title: 'Solution & Blog Writer' },
  { title: 'Content Creator' },
];

const companies = [
  {
    name: 'SAP',
    imageId: 'sap-logo',
    className:
      'transition-all duration-300 filter grayscale opacity-60 scale-75 hover:grayscale-0 hover:opacity-100 hover:scale-90 hover:drop-shadow-xl',
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
    imageId: 'amazon-logo-light',
    className:
      'transition-all duration-300 filter grayscale opacity-70 scale-90 hover:grayscale-0 hover:opacity-100 hover:scale-100 hover:drop-shadow-xl',
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
      'transition-all duration-300 filter grayscale-0 opacity-100 scale-100 hover:scale-105 hover:drop-shadow-2xl',
    designation: 'Graduate Apprentice Trainee - Software Engineer',
    timeline: 'Nov 2025 - Present',
    details: [
      <>Reduced manual workflow intervention by <strong className="font-semibold text-foreground/90">40%</strong> by designing and implementing scalable <strong className="font-semibold text-foreground/90">Python automation solutions</strong> for manufacturing operations.</>,
      <>Optimized process efficiency by building innovative automation technologies on a <strong className="font-semibold text-foreground/90">distributed computing infrastructure.</strong></>,
      <>Delivered production monitoring solutions within rapid <strong className="font-semibold text-foreground/90">2-week sprint cycles</strong> in a cross-disciplinary agile team.</>,
    ],
  },
];

// SVG Icon components
const PythonIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10"><path d="M13.5 9l3 3-3 3M10.5 15l-3-3 3-3M20 12h-5M9 12H4M12 20v-5M12 9V4"/></svg>;
const JavaIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10"><path d="M10 4.25c.01-.01 0 0 0 0v2.24c0 .35.19.67.5.84.58.32 1.34.42 2.1.31.7-.1 1.39-.41 2.03-.89.5-.37.9-.84 1.16-1.39.08-.18.14-.36.18-.55h-2.58c-.46 0-.89-.25-1.11-.64-.29-.53-.29-1.22.01-1.75.24-.43.7-.69 1.2-.69H18c.45 0 .82.37.82.82v5.82c0 .45-.37.82-.82.82h-2.07c-.45 0-.82-.37-.82-.82v-2.05c0-.35-.2-.67-.5-.84-.58-.32-1.34-.42-2.1-.31-.7.1-1.39.41-2.03.89-.5.37-.9.84-1.16 1.39-.08.18-.14.36-.18.55h2.58c.46 0 .89.25 1.11.64.29.53.29 1.22-.01 1.75-.24.43-.7.69-1.2.69H6c-.45 0-.82-.37-.82-.82V6.04c0-.45.37-.82.82-.82h2.07c.45 0 .82.37.82.82z"/></svg>;
const CppIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10"><text x="0" y="18" fontSize="16px" fontWeight="bold">C++</text></svg>;
const JsIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10"><path d="M1,1V23H23V1H1ZM21,21H3V3H21V21ZM10.2,16.5H7.5V9.3H10.2V10.8H8.4V12.3H10.2V13.8H8.4V15.6H10.2V16.5ZM16.5,12.3H14.7V13.8H16.5V15.6H13.8V9.3H16.5V10.8H14.7V12.3Z"/></svg>;
const ReactIcon = () => <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" className="h-10 w-10 text-cyan-400"><circle cx="0" cy="0" r="2.05" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g></svg>;
const NodeIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10"><path d="M21.5,12a9.5,9.5,0,0,0-9.5-9.5A9.5,9.5,0,0,0,2.5,12a9.5,9.5,0,0,0,9.5,9.5A9.5,9.5,0,0,0,21.5,12Zm-13.44.25,3.61-2.09,0,4.17Zm.33,1.93,3.3-1.9,3.29,1.9-.33.19-2.95-1.7v3.4L9.34,16.08Zm3.3-5.88,3.3,1.9L12.7,12.2Zm.33-1.92,2.95-1.7.33.19L12.34,8.34Z"/></svg>;
const SpringIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10"><path d="M13.2,18.7c0.2,0.1,0.3,0.3,0.4,0.6c0.1,0.2,0.1,0.5,0.1,0.7c0,0.4-0.1,0.8-0.3,1.1c-0.2,0.3-0.5,0.6-0.8,0.8 c-0.8,0.4-1.6,0.6-2.5,0.6c-1.3,0-2.4-0.4-3.4-1.1c-1-0.7-1.7-1.8-2.2-3c-0.5-1.2-0.7-2.6-0.7-4.1c0-1.8,0.3-3.4,0.9-4.8 c0.6-1.4,1.5-2.6,2.7-3.4c1.2-0.8,2.6-1.3,4.2-1.3c0.9,0,1.8,0.2,2.5,0.5s1.4,0.8,1.9,1.4c-0.7,0.7-1.1,1.5-1.3,2.4 c-0.2,0.9-0.3,1.7-0.3,2.5c0,1,0.2,1.9,0.5,2.8c0.3,0.8,0.8,1.6,1.4,2.2c0.1,0.1,0.1,0.2,0.2,0.3c-1.5,1.5-3.3,2.4-5.3,2.6 C13.3,18.7,13.2,18.7,13.2,18.7z M19,10c-0.5-1.1-1.3-2-2.3-2.6C15.6,6.9,14.4,6.6,13,6.6c-0.9,0-1.8,0.2-2.5,0.6 c-0.7,0.4-1.3,1-1.8,1.7s-0.8,1.5-1,2.4c-0.2,0.9-0.4,1.8-0.4,2.7c0,1,0.2,1.9,0.5,2.8c0.3,0.8,0.8,1.6,1.4,2.2 C10.9,20,13,19.3,14.6,18c1.6-1.3,2.7-3,3.3-5.1C18.2,12,18.5,11,19,10z"/></svg>;
const MongoIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10"><path d="M12 2c-3.3 0-6 2.7-6 6v4c0 .6.4 1 1 1h10c.6 0 1-.4 1-1V8c0-3.3-2.7-6-6-6zM9 13.1c0 1.6 1.3 2.9 2.9 2.9h.1c1.6 0 2.9-1.3 2.9-2.9V13h-6v.1z" /></svg>;
const AwsIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10"><path d="M13.2,19.8c-0.1,0-0.2,0-0.3,0c-0.9-0.2-1.8-0.5-2.6-1c-0.8-0.5-1.5-1.2-2.1-2c-0.6-0.8-1-1.8-1.2-2.8 c-0.2-1-0.2-2.1,0-3.1c0.2-1,0.6-2,1.2-2.9c0.6-0.9,1.3-1.6,2.2-2.2c0.9-0.6,1.9-1,3-1.2c0.2,0,0.5,0,0.7,0c0.2,0,0.3,0,0.5,0 c-0.1,0.3-0.2,0.5-0.3,0.8c-0.1,0.3-0.2,0.6-0.2,0.9c0,0.7,0.2,1.4,0.5,2c0.4,0.6,0.9,1.1,1.5,1.5c0.6,0.4,1.3,0.6,2,0.8 c0.1,0,0.1,0,0.2,0c0.3,0,0.6,0,0.8-0.1c0.3-0.1,0.6-0.1,0.8-0.2c0.3,1.1,0.3,2.2,0,3.3c-0.3,1.1-0.9,2.1-1.7,2.9 c-0.8,0.8-1.8,1.4-2.9,1.7c-1.1,0.3-2.3,0.4-3.4,0.1c-0.1,0-0.1,0-0.2,0C14.7,20,13.9,19.9,13.2,19.8z"/></svg>;
const AzureIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10"><path d="M13.2,3.3l-8,11.2h6.1L7,20.7l12.4-12.1h-7.3L13.2,3.3z"/></svg>;
const DockerIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10"><path d="M21.1,9.3c-0.1-0.1-0.3-0.2-0.4-0.2h-3.3V5.8h1.6c0.2,0,0.3-0.1,0.4-0.2s0.2-0.3,0.2-0.4V3.5 c0-0.2-0.1-0.3-0.2-0.4c-0.1-0.1-0.2-0.2-0.4-0.2H8.3c-0.2,0-0.3,0.1-0.4,0.2c-0.1,0.1-0.2,0.2-0.2,0.4v1.6c0,0.2,0.1,0.3,0.2,0.4 c0.1,0.1,0.2,0.2,0.4,0.2h1.6v3.3H6.6c-0.2,0-0.3,0.1-0.4,0.2C6,9.4,5.9,9.6,5.9,9.7v1.6H2.6c-0.2,0-0.3,0.1-0.4,0.2 c-0.1,0.1-0.2,0.3-0.2,0.4v1.6c0,0.2,0.1,0.3,0.2,0.4c0.1,0.1,0.2,0.2,0.4,0.2h3.3v3.3H2.6c-0.2,0-0.3,0.1-0.4,0.2 c-0.1,0.1-0.2,0.3-0.2,0.4v1.6c0,0.2,0.1,0.3,0.2,0.4c0.1,0.1,0.2,0.2,0.4,0.2h18.3c0.2,0,0.3-0.1,0.4-0.2 c0.1-0.1,0.2-0.2,0.2-0.4v-1.6c0-0.2-0.1-0.3-0.2-0.4c-0.1-0.1-0.2-0.2-0.4-0.2h-3.3v-3.3h3.3c0.2,0,0.3-0.1,0.4-0.2 c0.1-0.1,0.2-0.3,0.2-0.4v-1.6c0-0.2-0.1-0.3-0.2-0.4C21.3,9.4,21.2,9.3,21.1,9.3z M13.8,9.1H10V5.8h3.7V9.1z"/></svg>;
const LinuxIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10"><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8 S16.4,20,12,20z M12.5,13.8v2.7h-1v-2.7c-1.3-0.2-2.3-1.4-2.3-2.8c0-1.6,1.3-2.8,2.8-2.8s2.8,1.3,2.8,2.8 C14.8,12.5,13.8,13.6,12.5,13.8z M12,10c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S12.6,10,12,10z"/></svg>;

const skillIcons = [
  { name: 'Python', icon: PythonIcon },
  { name: 'Java', icon: JavaIcon },
  { name: 'C/C++', icon: CppIcon },
  { name: 'JavaScript', icon: JsIcon },
  { name: 'React.js', icon: ReactIcon },
  { name: 'Spring Boot', icon: SpringIcon },
  { name: 'Node.js', icon: NodeIcon },
  { name: 'Bash', icon: Terminal },
  { name: 'SQL', icon: Database },
  { name: 'MongoDB', icon: MongoIcon },
  { name: 'Git', icon: GitBranch },
  { name: 'Docker', icon: DockerIcon },
  { name: 'AWS', icon: AwsIcon },
  { name: 'Azure', icon: AzureIcon },
  { name: 'Linux', icon: LinuxIcon },
  { name: 'Data Structures', icon: Binary },
  { name: 'Algorithms', icon: Workflow },
  { name: 'System Design', icon: Component },
  { name: 'Distributed Systems', icon: Network },
  { name: 'Performance Optimization', icon: Gauge },
  { name: 'Flask', icon: Wind },
];


export function About() {
  const { resolvedTheme } = useTheme();
  const [avatar, setAvatar] = useState<ImagePlaceholder | undefined>(
    PlaceHolderImages.find((p) => p.id === 'srini-avatar-light')
  );
  const [amazonLogoId, setAmazonLogoId] = useState('amazon-logo-light');

  useEffect(() => {
    const lightAvatar = PlaceHolderImages.find(
      (p) => p.id === 'srini-avatar-light'
    );
    const darkAvatar = PlaceHolderImages.find(
      (p) => p.id === 'srini-avatar-dark'
    );

    if (resolvedTheme === 'dark') {
      setAvatar(darkAvatar);
      setAmazonLogoId('amazon-logo-dark');
    } else {
      setAvatar(lightAvatar);
      setAmazonLogoId('amazon-logo-light');
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
              <div className="mt-8 flex items-center justify-center gap-12 md:gap-16">
                {companies.map((company) => {
                  const logoId = company.name === 'Amazon' ? amazonLogoId : company.imageId;
                  const logoImage = PlaceHolderImages.find(
                    (p) => p.id === logoId
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
            
            <div className="mt-16">
              <h3 className="text-center font-headline text-2xl font-semibold text-primary">
                Skills
              </h3>
              <div
                className="relative mt-8 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
              >
                <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
                  {[...skillIcons, ...skillIcons].map((skill, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="mx-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-secondary/30 p-4 transition-transform duration-300 hover:scale-110 hover:bg-secondary/80">
                            <skill.icon />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{skill.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
