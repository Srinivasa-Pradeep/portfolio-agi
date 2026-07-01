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
import { useEffect, useState, useRef, type ReactNode } from 'react';
import { ChevronDown, ArrowUpRight, Github } from 'lucide-react';
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
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import UnorderedListIcon from '@/components/icons/unordered-list-icon';

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
      { label: 'INTEGRATIONS', value: 'RESTful' },
      { label: 'ARCHITECTURE', value: 'Microservices' },
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
      { label: 'EFFICIENCY', value: '+35%' },
      { label: 'COVERAGE', value: '92%' },
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
      { label: 'AUTOMATION', value: '15h/wk' },
      { label: 'ANALYSIS', value: 'Predictive' },
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
    text: "Published a research paper titled \"MedQuery AI\" in the prestigious PeerJ Computer Science journal."
  },
  {
    text: "Secured 1st Prize in a competitive code debugging contest hosted by IIT Palakkad."
  },
  {
    text: "Showcased progressive leadership within the National Service Scheme (NSS), advancing from Volunteer to Executive Member and ultimately Team Lead."
  },
  {
    text: "Served as Joint Secretary for the college's Photography Club."
  },
  {
    text: "Successfully organized a major photography event, drawing 54 participants from various colleges."
  },
  {
    text: "Participated twice in the PSG iTech × SAP Hackfest, earning opportunities to work on real-world SAP projects."
  },
  {
    text: "Was selected for the prestigious Amazon ML Summer School 2024 program."
  },
  {
    text: "Successfully converted the summer school experience into a Software Development Engineer internship at Amazon."
  },
  {
    text: "Maintained a strong CGPA of 8.28 while actively managing a diverse range of extracurricular activities, projects, and open-source contributions."
  },
  {
    text: "Honored with the “Overall Excellence” Award by the Department of Computer Science and Engineering for outstanding all-around achievement."
  },
];

function ResearchPublication() {
  return (
    <div className="group relative mt-6 pl-10 py-6 transition-all duration-500 text-left">
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
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
      className="group relative mt-6 overflow-hidden rounded-lg p-[1px] transition-all duration-300 hover:shadow-2xl w-full"
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
            <div className="relative h-16 w-16 flex-shrink-0">
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
              <p className="text-base text-muted-foreground transition-all duration-300">
                B.E. Computer Science and Engineering
              </p>
              <p className="text-sm font-medium text-muted-foreground transition-all duration-300">
                2021 - 2025 | CGPA: 8.28
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center sm:items-start">
            <button 
                onClick={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }}
                className={cn(
                  "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-primary transition-all duration-500 group/btn",
                  isExpanded ? "opacity-100" : "opacity-40"
                )}
            >
                View Notable Achievements
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-500", isExpanded && "rotate-180")} />
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden w-full"
                    >
                        <div className="space-y-3 pt-4 border-t border-border/10">
                            {educationAchievements.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.05 + 0.1, duration: 0.5 }}
                                    onMouseEnter={() => setHoveredIdx(i)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                    className="flex items-start gap-4 group/item"
                                >
                                    <div className="mt-1 flex-shrink-0 transition-colors">
                                        <UnorderedListIcon 
                                          size={16} 
                                          active={hoveredIdx === i}
                                          className="text-primary/70"
                                        />
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

const staggeredVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(12px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function About() {
  const { resolvedTheme } = useTheme();
  const [avatar, setAvatar] = useState<ImagePlaceholder | undefined>(
    PlaceHolderImages.find((p) => p.id === 'srini-avatar-light')
  );
  const [amazonLogoId, setAmazonLogoId] = useState('amazon-logo-light');
  const psgLogo = PlaceHolderImages.find((p) => p.id === 'psg-itech-logo');
  
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
        {/* Top Split Header: Avatar & Bio remains side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-24">
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
                                  fill
                                  className="object-cover transition-all duration-300 group-hover:scale-105"
                                  style={{ objectPosition: 'center 40%' }}
                                  key={avatar.id}
                                  priority
                              />
                          )}
                      </div>
                      <div className="pt-4 text-center">
                          <TypingEffect
                            sequences={[
                                { text: 'Srinivasa Pradeep', className: 'font-signature text-3xl text-foreground/90' },
                                { text: 'ಶ್ರೀನಿವಾಸ ಪ್ರದೀಪ್', className: 'font-tiro-kannada text-xs text-foreground/90' },
                                { text: 'ஸ்ரீனிவாச பிரதீப்', className: 'font-tiro-tamil italic text-xs text-foreground/90' },
                                { text: 'श्रीनिवास प्रदीप', className: 'font-tiro-hindi text-xs text-foreground/90' },
                                { text: 'ശ്രീനിവാസ പ്രതീപ്', className: 'font-malayalam text-xs text-foreground/90' },
                                { text: 'శ్రీనివాస ಪ್ರదీಪ್', className: 'font-tiro-telugu text-xs text-foreground/90' }
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
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl text-left">
              About Me
            </h2>
            <div className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed text-left">
              <p>
                I’m someone who enjoys building software that scales and creates real impact for users. Ever since I was a child, I’ve been drawn to math not just for answers, but for the way it teaches you to break down complex problems into simple, elegant ideas. That curiosity stayed with me. Today, I approach engineering the same way: thinking deeply, simplifying complexity, and building systems that are both scalable and meaningful.
              </p>
            </div>
          </div>
        </div>

        {/* Centered Content Block: Unified architectural center for all sections below Bio */}
        <div className="max-w-4xl mx-auto space-y-32">
          {/* Education Content - Now perfectly centered */}
          <div className="w-full">
            <h3 className="font-headline text-2xl font-semibold text-primary mb-8 text-center">
              Education
            </h3>
            <PremiumEducationCard psgLogo={psgLogo} />
          </div>

          {/* Experience Section - Perfectly centered */}
          <div className="w-full relative overflow-visible">
            <h3 className="font-headline text-2xl font-semibold text-primary mb-16 text-center">
              Experience
            </h3>
            
            <div className="relative flex flex-col items-center overflow-visible">
              <div className="flex items-center justify-center gap-12 md:gap-24 mb-6">
                  {companies.map((company) => {
                      const logoId = company.id === 'amazon' ? amazonLogoId : company.imageId;
                      const logoImage = PlaceHolderImages.find(p => p.id === logoId);
                      const isSelected = selectedExpId === company.id;
                      const shouldPulse = isSelected || (selectedExpId === null && company.id === 'mercedes');

                      return (
                          <button
                              key={company.id}
                              onClick={() => toggleExp(company.id)}
                              className={cn(
                                  "relative flex items-center justify-center transition-all duration-500 transform-gpu outline-none h-14 w-28 md:w-36 shrink-0",
                                  isSelected ? "scale-110 opacity-100" : "grayscale opacity-50 hover:grayscale-0 hover:opacity-80"
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

              {/* Shining Hero Timeline Baseline - Centered Track */}
              <div className="relative w-full max-w-2xl h-[1px] bg-border/20 mb-12 overflow-visible mx-auto">
                 <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                    <div className="absolute top-0 bottom-0 left-[-20%] w-[40%] bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-flow-line" />
                 </div>

                 <div className="absolute inset-0 flex items-center justify-between w-full px-2">
                    {companies.map((company) => {
                        const isSelected = selectedExpId === company.id;
                        const shouldPulse = isSelected || (selectedExpId === null && company.id === 'mercedes');
                        
                        return (
                            <div key={`dot-${company.id}`} className="relative flex justify-center items-center w-28 md:w-36 shrink-0">
                                {shouldPulse ? (
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

              <div className="relative w-full flex flex-col items-center overflow-visible">
                  <AnimatePresence mode="wait">
                      {selectedExp && (
                          <>
                              <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 40, opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="w-px bg-gradient-to-b from-primary/30 to-transparent"
                              />

                              <motion.div
                                  key={selectedExp.id}
                                  initial={{ opacity: 0, filter: 'blur(20px)', y: -10, scale: 0.98 }}
                                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
                                  exit={{ opacity: 0, filter: 'blur(20px)', y: -10, scale: 0.98 }}
                                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                  className="w-full relative px-4"
                              >
                                  <div className="flex flex-col gap-10">
                                      <motion.div custom={0} variants={staggeredVariants} initial="hidden" animate="visible" className="text-center">
                                          <h4 className="font-headline text-3xl font-black tracking-tighter text-foreground italic">
                                            {selectedExp.name}
                                          </h4>
                                          <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-center gap-2 sm:gap-6">
                                              <p className="text-xl font-bold text-foreground/90 tracking-tight">{selectedExp.designation}</p>
                                              <div className="hidden sm:block h-1 w-1 rounded-full bg-border" />
                                              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] opacity-50">{selectedExp.timeline}</p>
                                          </div>
                                      </motion.div>

                                      <motion.div custom={1} variants={staggeredVariants} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                                          {selectedExp.metrics.map((m, i) => (
                                              <div key={i} className="flex flex-col items-center gap-1 group/metric relative">
                                                  <span className="text-[9px] font-black text-muted-foreground/40 tracking-[0.4em] uppercase">{m.label}</span>
                                                  <div className="flex items-center gap-3">
                                                      <span className="text-base font-black text-primary italic">{m.value}</span>
                                                      <div className="h-px w-8 bg-primary/10 group-hover/metric:bg-primary/40 transition-colors" />
                                                  </div>
                                              </div>
                                          ))}
                                      </motion.div>

                                      <div className="space-y-6">
                                          {selectedExp.impact.map((point, i) => (
                                              <motion.div 
                                                  key={i} 
                                                  custom={i + 2} 
                                                  variants={staggeredVariants} 
                                                  initial="hidden" 
                                                  animate="visible"
                                                  className="relative pl-10 group"
                                              >
                                                  <div className="absolute left-0 top-3.5 w-6 h-[1px] bg-primary/10 group-hover:bg-primary/40 transition-colors duration-500" />
                                                  <p className="text-lg text-foreground/80 leading-relaxed lora italic font-medium group-hover:text-foreground transition-colors duration-500 text-left">
                                                      {point}
                                                  </p>
                                              </motion.div>
                                          ))}
                                      </div>

                                      <motion.div custom={selectedExp.impact.length + 2} variants={staggeredVariants} initial="hidden" animate="visible" className="pt-8 border-t border-border/5 flex justify-center">
                                          <div className="flex items-center gap-8 px-8 py-4 rounded-full bg-secondary/10 backdrop-blur-3xl border border-white/5 w-fit">
                                              {selectedExp.techStack.map((tech) => (
                                                  <TooltipProvider key={tech.name}>
                                                      <Tooltip delayDuration={0}>
                                                          <TooltipTrigger asChild>
                                                              <div className="group/tech transition-transform duration-500 hover:-translate-y-1">
                                                                  <tech.Icon className="h-5 w-5 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500" style={{ color: tech.color }} />
                                                              </div>
                                                          </TooltipTrigger>
                                                          <TooltipContent className="bg-black/90 backdrop-blur-xl border-white/10">
                                                              <p className="text-[10px] font-black uppercase tracking-widest text-white">{tech.name}</p>
                                                          </TooltipContent>
                                                      </Tooltip>
                                                  </TooltipProvider>
                                              ))}
                                          </div>
                                      </motion.div>
                                  </div>
                              </motion.div>
                          </>
                      )}
                  </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Research Section - Perfectly centered */}
          <div className="w-full">
            <h3 className="font-headline text-2xl font-semibold text-primary text-center mb-8">
              Research & Publications
            </h3>
            <ResearchPublication />
          </div>
          
          {/* Skills Section - Perfectly centered */}
          <div className="w-full">
            <h3 className="font-headline text-2xl font-semibold text-primary text-center">
              Skills
            </h3>
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

          {/* Beyond the Resume Section - Perfectly centered */}
          <div className="w-full">
            <h3 className="font-headline text-2xl font-semibold text-primary mb-12 text-center">
              Beyond the Resume
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
                      <AccordionTrigger className="hover:no-underline py-6 group">
                        <span className="text-lg font-headline font-medium tracking-tight text-foreground/80 group-data-[state=open]:text-primary transition-colors duration-300 text-left">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-8 pt-0">
                        <div className="max-w-3xl border-l border-primary/10 pl-5 py-2 leading-relaxed text-foreground/80 lora italic pr-2 px-1 text-left">
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
    </section>
  );
}