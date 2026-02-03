import { Header } from '@/components/header';
import { About } from '@/components/sections/about';
import { Blogs } from '@/components/sections/blogs';
import { Contact } from '@/components/sections/contact';
import { Hero } from '@/components/sections/hero';
import { LeetCode } from '@/components/sections/leetcode';
import { Projects } from '@/components/sections/projects';
import { Footer } from '@/components/footer';
import { ScrollAnimationWrapper } from '@/components/scroll-animation-wrapper';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="relative z-10 bg-background dark:bg-transparent">
          <ScrollAnimationWrapper>
            <About />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <Blogs />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <LeetCode />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <Projects />
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <Contact />
          </ScrollAnimationWrapper>
        </div>
      </main>
      <Footer />
    </div>
  );
}
