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
import { useEffect, useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ListChecks, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { TypingEffect } from '@/components/typing-effect';
import { cn } from '@/lib/utils';

const stats = [
  { 
    title: 'Top 5.36% on LeetCode', 
    icon: 'https://assets.leetcode.com/static_assets/others/Knight.gif', 
    tooltip: 'Knight' 
  },
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
    designation: 'Project Intern (Remote)',
    timeline: 'April 2023 - May 2023',
    details: [
        <>Developed a full-stack expense processing application using <strong className="font-semibold text-foreground/90">React.js, Spring Boot and MongoDB</strong> as part of a college partnership program with SAP.</>,
        <>Gained hands-on experience with enterprise development practices under <strong className="font-semibold text-foreground/90">SAP mentorship</strong>, implementing core REST APIs.</>,
        <>Received a <strong className="font-semibold text-foreground/90">project completion certificate</strong> for successfully delivering the application and meeting project goals.</>,
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
        <>Building <strong className="font-semibold text-foreground/90">Python-based</strong> data extraction pipelines to automate manufacturing analytics, targeting reduction of <strong className="font-semibold text-foreground/90">15+ hours weekly</strong> in manual reporting.</>,
        <>Integrating <strong className="font-semibold text-foreground/90">machine learning models</strong> into production monitoring systems to enable predictive maintenance and reduce equipment downtime.</>,
        <>Analyzing production data across assembly lines to identify optimization opportunities in collaboration with manufacturing operations team.</>,
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

function PremiumEducationCard({ psgLogo }: { psgLogo?: ImagePlaceholder }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative mt-6 overflow-hidden rounded-lg p-[1px] transition-all duration-300 hover:shadow-2xl"
      style={{
        background: `linear-gradient(to bottom, hsl(var(--border) / 0.5), hsl(var(--border)))`
      }}
    >
      <div className="relative h-full w-full rounded-[calc(var(--radius)-1px)] bg-secondary/30 p-6 backdrop-blur-sm transition-all duration-500 group-hover:bg-secondary/50">
        {/* Animated Internal Glows */}
        <div 
          className="absolute inset-0 z-0 opacity-40 transition-opacity duration-500 dark:hidden"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute inset-0 z-0 hidden opacity-20 transition-opacity duration-500 dark:block"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite'
          }}
        />

        <div className="relative z-20 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative h-20 w-20 flex-shrink-0">
            {psgLogo && (
              <img
                src={psgLogo.imageUrl}
                alt={psgLogo.description}
                data-ai-hint={psgLogo.imageHint}
                className="h-full w-full object-contain filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
              />
            )}
            
            {/* "You" Indicator Logic adapted for achievements */}
            <div className="absolute -left-8 top-1/2 flex -translate-y-1/2 items-center gap-1 opacity-0 transition-all duration-300 group-hover:translate-x-6 group-hover:opacity-100">
               <Plus className="h-3 w-3 text-primary" />
               <div className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary dark:bg-primary/20">
                  TOP
               </div>
            </div>
          </div>

          <div className="flex-grow text-center sm:text-left transition-all duration-300 group-hover:translate-x-2">
            <h4 
              className="text-lg font-bold text-foreground/90 transition-all duration-300 group-hover:text-primary"
              style={{
                maskImage: `linear-gradient(-75deg, rgba(255,255,255,1) calc(${mousePos.x}% + 20%), rgba(255,255,255,0.4) calc(${mousePos.x}% + 30%), rgba(255,255,255,1) calc(${mousePos.x}% + 100%))`
              }}
            >
              PSG Institute of Technology and Applied Research
            </h4>
            <p className="text-muted-foreground transition-all duration-300">
              B.E. Computer Science and Engineering
            </p>
            <p className="text-sm font-medium text-muted-foreground transition-all duration-300">
              2021 - 2025 | CGPA: 8.28
            </p>
          </div>
        </div>

        {/* The Premium Shimmer Border Span */}
        <span 
          className="pointer-events-none absolute inset-0 z-10 block rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `linear-gradient(-75deg, transparent calc(${mousePos.x}% + 10%), hsl(var(--primary) / 0.5) calc(${mousePos.x}% + 25%), transparent calc(${mousePos.x}% + 40%))`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)',
            mask: 'linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)'
          }}
        />
      </div>
    </div>
  );
}

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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="group w-48 lg:w-56 bg-card/50 backdrop-blur-lg p-3 pb-4 shadow-lg rounded-lg border border-border/20 transform-gpu transition-all duration-300 hover:-translate-y-3 hover:rotate-[-4deg] hover:shadow-2xl">
                      <div className="relative aspect-[3/4] w-full bg-muted/30 rounded-md overflow-hidden">
                          {avatar && (
                              <Image
                                  src={avatar.imageUrl}
                                  alt={avatar.description}
                                  data-ai-hint={avatar.imageHint}
                                  fill
                                  className="object-cover transition-all duration-300 group-hover:scale-105"
                                  style={{ objectPosition: 'center 40%' }}
                                  key={avatar.id}
                              />
                          )}
                      </div>
                      <div className="pt-4 text-center">
                          <TypingEffect
                            sequences={[
                                { text: 'Srinivasa Pradeep', className: 'font-signature text-3xl text-foreground/90' },
                                { text: 'ஸ்ரீனிவாச பிரதீப்', className: 'font-tiro-tamil italic text-xs text-foreground/90' },
                                { text: 'श्रीनिवास प्रदीप', className: 'font-tiro-hindi text-xs text-foreground/90' },
                                { text: 'ശ്രീനിവാസ പ്രദീപ്', className: 'font-chilanka text-xs text-foreground/90' },
                                { text: 'ಶ್ರೀನಿವಾಸ ಪ್ರದീപ്', className: 'font-tiro-kannada text-xs text-foreground/90' },
                                { text: 'శ్రీనివాస ప్రదీప్', className: 'font-tiro-telugu text-xs text-foreground/90' }
                            ]}
                          />
                      </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Stay Humble!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
              <Dialog>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <div className="group cursor-pointer outline-none">
                          <PremiumEducationCard psgLogo={psgLogo} />
                        </div>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Notable Achievements</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-4">
                      {psgLogo && (
                        <img
                          src={psgLogo.imageUrl}
                          alt={psgLogo.description}
                          data-ai-hint={psgLogo.imageHint}
                          className="h-8 w-auto rounded-sm"
                        />
                      )}
                      PSG Institute of Technology and Applied Research
                    </DialogTitle>
                    <DialogDescription>
                      B.E. Computer Science and Engineering | 2021 - 2025 | CGPA: 8.28
                    </DialogDescription>
                  </DialogHeader>
                  <div className="pt-4">
                    <h4 className="font-semibold text-foreground mb-3">Notable Achievements</h4>
                    <ScrollArea className="h-72 pr-4">
                      <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                              <ListChecks className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-sm text-muted-foreground">
                              Secured <strong className="font-semibold text-foreground/90">1st Prize</strong> in a competitive code debugging contest hosted by IIT Palakkad.
                              </span>
                          </li>
                          <li className="flex items-start gap-3">
                              <ListChecks className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-sm text-muted-foreground">
                              Showcased progressive leadership within the National Service Scheme (NSS), advancing from <strong className="font-semibold text-foreground/90">Volunteer</strong> to <strong className="font-semibold text-foreground/90">Executive Member</strong> and ultimately <strong className="font-semibold text-foreground/90">Team Lead</strong>.
                              </span>
                          </li>
                          <li className="flex items-start gap-3">
                              <ListChecks className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-sm text-muted-foreground">
                              Served as <strong className="font-semibold text-foreground/90">Joint Secretary</strong> for the college's Photography Club.
                              </span>
                          </li>
                          <li className="flex items-start gap-3">
                              <ListChecks className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-sm text-muted-foreground">
                              Successfully <strong className="font-semibold text-foreground/90">organized a major photography event</strong>, drawing 54 participants from various colleges.
                              </span>
                          </li>
                          <li className="flex items-start gap-3">
                              <ListChecks className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-sm text-muted-foreground">
                              Participated twice in the <strong className="font-semibold text-foreground/90">PSG iTech × SAP Hackfest</strong>, earning opportunities to work on real-world SAP projects.
                              </span>
                          </li>
                          <li className="flex items-start gap-3">
                              <ListChecks className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-sm text-muted-foreground">
                              Was selected for the prestigious <strong className="font-semibold text-foreground/90">Amazon ML Summer School 2024</strong> program.
                              </span>
                          </li>
                          <li className="flex items-start gap-3">
                              <ListChecks className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-sm text-muted-foreground">
                              Successfully converted the summer school experience into a <strong className="font-semibold text-foreground/90">Software Development Engineer internship at Amazon</strong>.
                              </span>
                          </li>
                          <li className="flex items-start gap-3">
                              <ListChecks className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-sm text-muted-foreground">
                              Maintained a strong <strong className="font-semibold text-foreground/90">CGPA of 8.28</strong> while actively managing a diverse range of extracurricular activities, projects, and open-source contributions.
                              </span>
                          </li>
                          <li className="flex items-start gap-3">
                              <ListChecks className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-sm text-muted-foreground">
                              Honored with the <strong className="font-semibold text-foreground/90">“Overall Excellence” </strong> Award by the Department of Computer Science and Engineering for outstanding all-around achievement.
                              </span>
                          </li>
                      </ul>
                    </ScrollArea>
                  </div>
                </DialogContent>
              </Dialog>
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
                  className="transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card/50 backdrop-blur-lg border-border/20"
                >
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <span>{stat.title}</span>
                        {stat.icon && stat.tooltip && (
                            <TooltipProvider>
                                <Tooltip>
                                <TooltipTrigger>
                                    <img src={stat.icon} alt={stat.tooltip} className="h-7 w-7 object-contain" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{stat.tooltip}</p>
                                </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </CardTitle>
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