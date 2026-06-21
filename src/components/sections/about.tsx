
'use client';

import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef, ReactNode } from 'react';
import { ListChecks, BookOpen, ArrowUpRight, Github, ChevronDown, Rocket, Target, Zap, Layout } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
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
  SiGit,
  SiDocker,
  SiJenkins,
  SiAmazon,
  SiLinux,
  SiOpenai,
  SiVercel,
  SiTypescript,
  SiPytorch
} from 'react-icons/si';
import { FaJava, FaMicrosoft } from 'react-icons/fa';
import { TypingEffect } from '@/components/typing-effect';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ShiningLink - A specialized link component with a subtle sweeping light effect.
 */
function ShiningLink({ href, children }: { href: string, children: ReactNode }) {
  return (
    <Link 
      href={href} 
      className="relative inline-flex items-center font-bold text-primary group"
    >
      <span className="relative z-10 bg-clip-text text-transparent bg-[linear-gradient(110deg,hsl(var(--primary)),45%,#fff,55%,hsl(var(--primary)))] bg-[size:200%_100%] animate-shine underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all duration-300 px-1">
        {children}
      </span>
    </Link>
  );
}

interface ManifestoItem {
  id: string;
  question: string;
  answer: ReactNode;
}

const manifestoItems: ManifestoItem[] = [
  {
    id: "thinking",
    question: "What shapes the way I think?",
    answer: (
      <>
        It's a mix of books, late-night conversations, and reflection. I'm fascinated by ideas that challenge assumptions and change the way we see the world. You can see some of the volumes that changed me in my <ShiningLink href="/books">personal library</ShiningLink>.
      </>
    )
  },
  {
    id: "motivation",
    question: "What motivates me every day?",
    answer: "My father. He started his 20s as a farmer and transitioned into a government role by his 30s, providing everything he could for the betterment of my life. His resilience and quiet grit are the engines behind my own discipline."
  },
  {
    id: "curiosity",
    question: "What am I endlessly curious about?",
    answer: "Almost everything. Technology may be my craft, but my curiosity extends far beyond it. I aspire to become a polymath: someone who learns across disciplines and connects ideas that don't seem related at first glance."
  },
  {
    id: "optimization",
    question: "What am I currently optimizing?",
    answer: "Myself. Not just as an engineer, but as a thinker, communicator, and teammate. I believe small, intentional improvements are the only things that compound into remarkable results over time."
  },
  {
    id: "peace",
    question: "Where do I find peace?",
    answer: (
      <>
        By the sea, surrounded by nature, or simply sitting with my thoughts. There's something about open horizons, quiet moments, and fresh air that brings clarity and reminds me what truly matters. I even built this <ShiningLink href="/zen">Zen Mode</ShiningLink> specifically to capture and share that feeling of stillness.
      </>
    )
  }
];

const companies = [
  {
    id: 'sap',
    name: 'SAP',
    imageId: 'sap-logo',
    color: '#008FD3',
    designation: 'Project Intern (Remote)',
    timeline: 'April 2023 - May 2023',
    metrics: [
      { label: 'Integrations', value: 'RESTful', icon: Zap },
      { label: 'Architecture', value: 'Microservices', icon: Target },
    ],
    impact: [
      "Engineered a production-ready expense processing suite utilizing React.js and Spring Boot.",
      "Architected reliable REST APIs under direct SAP mentorship, following enterprise standards.",
      "Delivered a verified end-to-end application meeting 100% of partnership technical requirements."
    ],
    techStack: [
      { name: 'React.js', Icon: SiReact, color: '#61DAFB' },
      { name: 'Spring Boot', Icon: SiSpringboot, color: '#6DB33F' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    imageId: 'amazon-logo-light',
    color: '#FF9900',
    designation: 'Software Development Engineer Intern',
    timeline: 'Jan 2025 - Jun 2025',
    metrics: [
      { label: 'Efficiency', value: '+35%', icon: Zap },
      { label: 'Test Coverage', value: '92%', icon: Target },
    ],
    impact: [
      "Boosted system efficiency by 35% through high-performance Java to C++ migration.",
      "Elevated Python test suite coverage from 60% to 92% through comprehensive automation.",
      "Enhanced microservice reliability by resolving critical legacy architecture bottlenecks."
    ],
    techStack: [
      { name: 'Java', Icon: FaJava, color: '#007396' },
      { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'AWS', Icon: SiAmazon, color: '#FF9900' },
    ]
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    imageId: 'mercedes-logo',
    color: '#FFFFFF',
    designation: 'Graduate Apprentice Trainee - SWE',
    timeline: 'Nov 2025 - Present',
    metrics: [
      { label: 'Automation', value: '15h/wk', icon: Zap },
      { label: 'Analysis', value: 'Predictive', icon: Target },
    ],
    impact: [
      "Automating manufacturing analytics via Python, targeting 15+ hours weekly manual reduction.",
      "Implementing real-time production monitoring for predictive maintenance and zero-downtime.",
      "Optimizing assembly line efficiency through cross-functional manufacturing data synthesis."
    ],
    techStack: [
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'PyTorch', Icon: SiPytorch, color: '#EE4C2C' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
    ]
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
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Git', Icon: SiGit },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Jenkins', Icon: SiJenkins },
  { name: 'AWS', Icon: SiAmazon },
  { name: 'Azure', Icon: FaMicrosoft },
  { name: 'Linux/Unix', Icon: SiLinux },
  { name: 'OpenAI', Icon: SiOpenai },
  { name: 'Vercel', Icon: SiVercel },
];

const educationAchievements = [
  { 
    icon: BookOpen, 
    text: "Published a research paper titled \"MedQuery AI\" in the prestigious PeerJ Computer Science journal." 
  },
  { 
    icon: ListChecks, 
    text: "Secured 1st Prize in a competitive code debugging contest hosted by IIT Palakkad." 
  },
  { 
    icon: ListChecks, 
    text: "Showcased progressive leadership within the National Service Scheme (NSS), advancing from Volunteer to Executive Member and ultimately Team Lead." 
  },
  { 
    icon: BookOpen, 
    text: "Served as Joint Secretary for the college's Photography Club." 
  },
  { 
    icon: ListChecks, 
    text: "Successfully organized a major photography event, drawing 54 participants from various colleges." 
  },
  { 
    icon: ListChecks, 
    text: "Participated twice in the PSG iTech × SAP Hackfest, earning opportunities to work on real-world SAP projects." 
  },
  { 
    icon: Rocket, 
    text: "Was selected for the prestigious Amazon ML Summer School 2024 program." 
  },
  { 
    icon: Target, 
    text: "Successfully converted the summer school experience into a Software Development Engineer internship at Amazon." 
  },
  { 
    icon: ListChecks, 
    text: "Maintained a strong CGPA of 8.28 while actively managing a diverse range of extracurricular activities, projects, and open-source contributions." 
  },
  { 
    icon: Zap, 
    text: "Honored with the “Overall Excellence” Award by the Department of Computer Science and Engineering for outstanding all-around achievement." 
  },
];

function ResearchPublication() {
  return (
    <div className="group relative mt-6 pl-10 py-6 transition-all duration-500">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border/30 group-hover:bg-primary/20 transition-colors duration-700" />
      <div className="absolute left-[-4px] top-10 h-2 w-2 rounded-full bg-primary/20 ring-4 ring-background group-hover:bg-primary group-hover:shadow-[0_0_10px_hsl(var(--primary))] transition-all duration-500" />

      <div className="space-y-4">
        <div>
          <h4 className="text-2xl font-bold tracking-tighter transition-colors group-hover:text-primary">
            MedQuery AI
          </h4>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span className="text-primary/60">Journal Article</span>
            <span className="hidden sm:inline h-1 w-1 rounded-full bg-border" />
            <span>PeerJ Computer Science</span>
            <span className="hidden sm:inline h-1 w-1 rounded-full bg-border" />
            <span>DOI: 10.7717/peerj-cs.3467</span>
          </div>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl lora italic font-medium pr-1">
          Architecting a high-precision Natural Language to SQL framework, bridging the gap between complex medical databases and clinical practitioners with absolute reliability.
        </p>

        <div className="flex items-center gap-6 pt-2">
          <Button asChild variant="link" className="p-0 h-auto text-xs font-black uppercase tracking-[0.2em] group/btn">
            <a href="https://peerj.com/articles/cs-3467/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Paper <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </Button>
          <Button asChild variant="link" className="p-0 h-auto text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary group/git">
            <a href="https://github.com/Srinivasa-Pradeep/MedQuery" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Code <Github className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function PremiumEducationCard({ psgLogo }: { psgLogo?: ImagePlaceholder }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isExpanded, setIsExpanded] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const shimmerColor = (mounted && resolvedTheme === 'dark') 
    ? 'hsl(var(--primary) / 0.5)' 
    : 'rgba(255, 255, 255, 0.8)';

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative mt-6 overflow-hidden rounded-lg p-[1px] transition-all duration-300 hover:shadow-2xl"
      style={mounted ? {
        background: resolvedTheme === 'dark' 
          ? `linear-gradient(to bottom, hsl(var(--border) / 0.5), hsl(var(--border)))`
          : `linear-gradient(to bottom, hsl(var(--border) / 0.8), hsl(var(--border)))`
      } : {}}
    >
      <div className="relative h-full w-full rounded-[calc(var(--radius)-1px)] bg-secondary/30 p-6 backdrop-blur-sm transition-all duration-500 group-hover:bg-white dark:group-hover:bg-secondary/50">
        <div 
          className={cn(
            "absolute inset-0 z-0 transition-opacity duration-500",
            (!mounted || resolvedTheme !== 'dark') ? "opacity-40 block" : "hidden"
          )}
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.6) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite'
          }}
        />
        <div 
          className={cn(
            "absolute inset-0 z-0 transition-opacity duration-500",
            (mounted && resolvedTheme === 'dark') ? "block opacity-20" : "hidden"
          )}
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite'
          }}
        />

        <div className="relative z-20">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative h-20 w-20 flex-shrink-0">
              {psgLogo && (
                <img
                  src={psgLogo.imageUrl}
                  alt={psgLogo.description}
                  data-ai-hint={psgLogo.imageHint}
                  className="h-full w-full object-contain filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                />
              )}
            </div>

            <div className="flex-grow text-center sm:text-left transition-all duration-300 group-hover:translate-x-2">
              <h4 
                className="text-lg font-bold text-foreground/90 transition-all duration-300 group-hover:text-primary"
                style={mounted ? {
                  maskImage: `linear-gradient(-75deg, rgba(255,255,255,1) calc(${mousePos.x}% + 20%), rgba(255,255,255,0.4) calc(${mousePos.x}% + 30%), rgba(255,255,255,1) calc(${mousePos.x}% + 100%))`
                } : {}}
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

          {/* Self-Revealing Achievements Section */}
          <div className="mt-6 flex flex-col items-center sm:items-start">
            <button 
                onClick={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }}
                className={cn(
                  "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-all duration-500 opacity-0 group-hover:opacity-100 group/btn"
                )}
            >
                View Notable Achievements
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-500", isExpanded && "rotate-180")} />
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden w-full"
                    >
                        <div className="space-y-4 pt-4 border-t border-border/10">
                            {educationAchievements.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.05 + 0.1, duration: 0.5 }}
                                    className="flex items-start gap-4 group/item"
                                >
                                    <div className="mt-1 flex-shrink-0 p-1.5 rounded-lg bg-primary/5 border border-primary/10 transition-colors group-hover/item:bg-primary/10">
                                        <item.icon className="h-3.5 w-3.5 text-primary/70" />
                                    </div>
                                    <p className="text-sm text-muted-foreground/80 leading-relaxed lora italic font-medium group-hover/item:text-foreground/90 transition-colors">
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>

        <span 
          className="pointer-events-none absolute inset-0 z-10 block rounded-[inherit] transition-opacity duration-300"
          style={mounted ? {
            background: `linear-gradient(-75deg, transparent calc(${mousePos.x}% + 10%), ${shimmerColor} calc(${mousePos.x}% + 25%), transparent calc(${mousePos.x}% + 40%))`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)',
            mask: 'linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)'
          } : {}}
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
  
  // Decoupled logic: mercedes pulses initially, but no content is shown until selection
  const [selectedExpId, setSelectedExpId] = useState<string | null>(null);

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

  const toggleExp = (id: string) => {
    setSelectedExpId(prev => prev === id ? null : id);
  };

  const selectedExp = companies.find(c => c.id === selectedExpId);

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
                                { text: 'ശ്രീനിവാസ പ്രതീപ്', className: 'font-malayalam text-xs text-foreground/90' },
                                { text: 'ಶ್ರೀನಿವಾಸ ಪ್ರದೀಪ್', className: 'font-tiro-kannada text-xs text-foreground/90' },
                                { text: 'శ్రీనివాస ప్రదీಪ್', className: 'font-tiro-telugu text-xs text-foreground/90' }
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
            <div className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                Software Engineer at <strong className="text-foreground">Mercedes-Benz (MBRDI)</strong> and former SDE Intern at <strong className="text-foreground">Amazon</strong>, focused on optimizing high-performance distributed systems. 
              </p>
              <p>
                Lead researcher of <strong className="text-foreground">MedQuery AI</strong>, a published Natural Language to SQL framework (PeerJ CS) designed for clinical data reliability. I bridge the gap between complex backend architectures and intuitive human interfaces.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="font-headline text-2xl font-semibold text-primary">
                Education
              </h3>
              <PremiumEducationCard psgLogo={psgLogo} />
            </div>

            <div className="mt-24 relative overflow-visible">
              <h3 className="font-headline text-2xl font-semibold text-primary mb-16">
                Experience
              </h3>
              
              <div className="relative flex flex-col items-center overflow-visible">
                {/* Logos Row */}
                <div className="flex items-center justify-center gap-12 md:gap-24 mb-6">
                    {companies.map((company) => {
                        const logoId = company.id === 'amazon' ? amazonLogoId : company.imageId;
                        const logoImage = PlaceHolderImages.find(p => p.id === logoId);
                        const isExpanded = selectedExpId === company.id;

                        return (
                            <button
                                key={company.id}
                                onClick={() => toggleExp(company.id)}
                                className={cn(
                                    "relative flex items-center justify-center transition-all duration-500 transform-gpu outline-none h-14 w-28 md:w-36 shrink-0",
                                    isExpanded ? "scale-110 opacity-100" : "grayscale opacity-50 hover:grayscale-0 hover:opacity-80"
                                )}
                            >
                                {logoImage ? (
                                    <img
                                        src={logoImage.imageUrl}
                                        alt={company.name}
                                        className="h-8 md:h-10 w-auto object-contain"
                                    />
                                ) : (
                                    <div className="h-8 w-20 bg-muted rounded-md" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* The Shining Horizontal Track Line */}
                <div className="relative w-full max-w-2xl h-[1px] bg-border/20 mb-12 overflow-visible">
                   {/* Shine Animation Overlay */}
                   <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                      <div className="absolute top-0 bottom-0 left-[-20%] w-[40%] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-flow-line" />
                   </div>

                   <div className="absolute inset-0 flex items-center justify-between w-full">
                      {companies.map((company) => {
                          const isExpanded = selectedExpId === company.id;
                          // If nothing is expanded, Mercedes (last one) pulses symbolically
                          const isPulsing = isExpanded || (selectedExpId === null && company.id === 'mercedes');
                          
                          return (
                              <div key={`dot-${company.id}`} className="relative flex justify-center items-center w-28 md:w-36 shrink-0">
                                  {isPulsing ? (
                                      <motion.div 
                                          layoutId="active-dot"
                                          className="relative h-2.5 w-2.5 rounded-full bg-[#00FF00] z-20 shadow-[0_0_15px_#00FF00] shrink-0"
                                      >
                                          <div className="absolute inset-0 h-full w-full rounded-full bg-[#00FF00] animate-ping opacity-40" />
                                      </motion.div>
                                  ) : (
                                      <div className="h-1.5 w-1.5 rounded-full bg-border/40 z-10 shrink-0" />
                                  )}
                              </div>
                          );
                      })}
                   </div>
                </div>

                {/* The Details Panel - Flow-based borderless unfolding */}
                <div className="relative w-full flex justify-center overflow-visible">
                    <AnimatePresence mode="wait">
                        {selectedExp && (
                            <motion.div
                                key={selectedExp.id}
                                initial={{ opacity: 0, filter: 'blur(12px)', y: -20, scale: 0.97 }}
                                animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
                                exit={{ opacity: 0, filter: 'blur(12px)', y: -20, scale: 0.97 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full max-w-[800px] overflow-hidden bg-transparent relative"
                            >
                                <div className="p-8 md:p-10">
                                    {/* Header & Metrics Section */}
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-10">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-headline text-2xl font-semibold tracking-tighter text-foreground uppercase">
                                                  {selectedExp.name}
                                                </h4>
                                            </div>
                                            <p className="text-xl font-medium text-foreground/80 tracking-tight">{selectedExp.designation}</p>
                                            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em] mt-3 opacity-40">{selectedExp.timeline}</p>
                                        </div>

                                        <div className="flex gap-4">
                                            {selectedExp.metrics.map((m, i) => (
                                                <div key={i} className="p-6 rounded-[24px] bg-secondary/30 border border-white/5 min-w-[150px] text-center shadow-lg backdrop-blur-sm transition-all hover:bg-secondary/40">
                                                    <m.icon className="h-4 w-4 mx-auto mb-3 text-primary opacity-40" />
                                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">{m.label}</p>
                                                    <p className="text-lg font-black text-foreground">{m.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content Separator */}
                                    <div className="h-px w-full bg-border/10 mb-12" />

                                    {/* Two-Column Impact & Stack */}
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                        <div className="lg:col-span-7 space-y-8">
                                            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/30">Impact Analysis</h5>
                                            <div className="space-y-6">
                                                {selectedExp.impact.map((point, i) => (
                                                    <div key={i} className="flex items-start gap-4 group">
                                                        <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors shrink-0" />
                                                        <p className="text-lg text-foreground/80 leading-relaxed lora italic font-medium pr-4">
                                                            {point}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5 space-y-8">
                                            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/30">Stack Profiling</h5>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {selectedExp.techStack.map((tech) => (
                                                    <div key={tech.name} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-white/5 transition-all hover:bg-secondary/50 group/tech">
                                                        <tech.Icon className="h-5 w-5 grayscale group-hover/tech:grayscale-0 transition-all duration-500" style={{ color: tech.color }} />
                                                        <span className="text-xs font-bold text-muted-foreground group-hover/tech:text-foreground">{tech.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <h3 className="font-headline text-2xl font-semibold text-primary">
                Research & Publications
              </h3>
              <ResearchPublication />
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

            <div className="mt-20">
              <h3 className="font-headline text-2xl font-semibold text-primary mb-6">
                More Info
              </h3>
              <div className="space-y-0">
                {manifestoItems.map((item, index) => (
                  <div key={item.id} className="relative">
                    {index !== 0 && (
                      <div className="relative h-px w-full overflow-hidden bg-border/5 mb-0.5">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full bg-[length:200%_100%] animate-shine" />
                      </div>
                    )}
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={item.id} className="border-none">
                        <AccordionTrigger className="hover:no-underline py-4 group">
                          <span className="text-lg font-headline font-medium tracking-tight text-foreground/80 group-data-[state=open]:text-primary transition-colors duration-300 text-left">
                            {item.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 pt-0">
                          <div className="max-w-3xl border-l border-primary/10 pl-5 py-2 leading-relaxed text-foreground/80 lora italic pr-2 px-1">
                            {item.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
