'use client';

import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiGnubash,
  SiPostgresql,
  SiReact,
  SiSpringboot,
  SiNodedotjs,
  SiFlask,
  SiPandas,
  SiNumpy,
  SiMysql,
  SiMongodb,
  SiSqlite,
  SiGit,
  SiDocker,
  SiJenkins,
  SiAmazon,
  SiLinux,
} from 'react-icons/si';
import { FaJava, FaMicrosoft } from 'react-icons/fa';

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

const techStack = [
  { name: 'Python', Icon: SiPython },
  { name: 'Java', Icon: FaJava },
  { name: 'C/C++', Icon: SiCplusplus },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'Bash', Icon: SiGnubash },
  { name: 'SQL', Icon: SiPostgresql },
  { name: 'React.js', Icon: SiReact },
  { name: 'Spring Boot', Icon: SiSpringboot },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Flask', Icon: SiFlask },
  { name: 'Pandas', Icon: SiPandas },
  { name: 'NumPy', Icon: SiNumpy },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'SQLite', Icon: SiSqlite },
  { name: 'Git', Icon: SiGit },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Jenkins', Icon: SiJenkins },
  { name: 'AWS', Icon: SiAmazon },
  { name: 'Azure', Icon: FaMicrosoft },
  { name: 'Linux/Unix', Icon: SiLinux },
];

export function About() {
  const { resolvedTheme } = useTheme();
  const [avatar, setAvatar] = useState<ImagePlaceholder | undefined>(
    PlaceHolderImages.find((p) => p.id === 'srini-avatar-light')
  );
  const [amazonLogoId, setAmazonLogoId] = useState('amazon-logo-light');
  const psgLogo = PlaceHolderImages.find((p) => p.id === 'psg-itech-logo');

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
                    <p>Stay Humble</p>
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
            A Computer Science graduate and adaptable software engineer with a problem-solving mindset and strong analytical thinking. I actively contribute to projects, collaborate effectively in cross-functional teams and stay committed to continuous learning and growth.
            </p>

            <div className="mt-12">
              <h3 className="font-headline text-2xl font-semibold text-primary">
                Education
              </h3>
              <div className="mt-6 flex items-center gap-6 rounded-lg border bg-secondary/30 p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                <div className="h-20 w-20 flex-shrink-0">
                  {psgLogo && (
                    <img
                      src={psgLogo.imageUrl}
                      alt={psgLogo.description}
                      data-ai-hint={psgLogo.imageHint}
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-foreground/90">
                    PSG Institute of Technology and Applied Research
                  </h4>
                  <p className="text-muted-foreground">
                    Bachelor of Engineering - Computer Science
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2021 - 2025 | CGPA: 8.28
                  </p>
                </div>
              </div>
            </div>

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
              <div className="text-left">
                <h3 className="font-headline text-2xl font-semibold text-primary">
                  Skills
                </h3>
              </div>
              <div
                className="relative mt-8 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
              >
                <div className="flex w-max animate-marquee">
                  {[...techStack, ...techStack].map((skill, index) => (
                     <div key={index} className="relative group mx-6 flex h-24 w-24 items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary/30 p-4 transition-all duration-300 ease-in-out blur-[0.5px] group-hover:scale-110 group-hover:blur-0 group-hover:bg-secondary/80">
                            <skill.Icon className="h-10 w-10" />
                        </div>
                        <div
                            className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2
                                      rounded-lg border bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium
                                      opacity-0 shadow-md transition
                                      group-hover:opacity-100"
                        >
                            {skill.name}
                        </div>
                    </div>
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
