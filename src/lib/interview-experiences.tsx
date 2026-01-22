
import React from 'react';

export type InterviewExperience = {
  slug: string;
  company: string;
  role: string;
  date: string;
  title?: string;
  summary: string;
  content: React.ReactNode;
  tags: string[];
  status: 'selected' | 'rejected';
};

export const interviewExperiences: InterviewExperience[] = [
  {
    slug: 'google-sad-apprenticeship-journey',
    company: 'Google',
    role: 'SAD Apprenticeship',
    date: 'Aug 2025 - Jan 2026',
    title: 'My Google SAD Apprenticeship Journey: What I Learned from Getting Very Close (Twice)',
    summary: 'A detailed story of my application, preparation, two interviews, and the lessons learned from the Google SAD Apprenticeship.',
    tags: ['Google', 'Apprenticeship', 'Interview', 'FAANG', 'Personal Story'],
    status: 'rejected',
    content: (
        <div className="space-y-6">
            <p className="lead text-lg text-muted-foreground">Some rejections don’t just hurt, they <strong>rearrange your life</strong>.</p>
            <p>When I lost my PPO, I didn’t just lose an offer. I lost certainty. I lost a path that looked “safe.” Overnight, I was back at zero - staring at job portals like they were oxygen tanks, hoping something would finally pull me out.</p>
            <p>That phase wasn’t normal job hunting. It felt like I was <strong>drowning for an opportunity</strong>.</p>
            <p>And then Google opened applications for the <strong>SAD (Software Application Development) Apprenticeship</strong>.</p>
            <p>This is my story: the application, the preparation, two interviews, and the rejection - not once, but twice.</p>
            <p>I didn’t make it. But I learned a lot. And if you’re planning to apply, I hope this helps you avoid the same mistakes.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">Timeline (so it’s easy to follow)</h2>
            <ul className="list-disc list-inside space-y-2 mb-6 pl-4 text-muted-foreground">
                <li><strong>Aug</strong> - Google SAD Apprenticeship opened</li>
                <li><strong>Sep 12</strong> - Google Online Challenge (2 questions, ~75 minutes)</li>
                <li><strong>Oct 23</strong> - Telephonic round</li>
                <li><strong>Nov 14</strong> - Interview 1 (rescheduled from Nov 8)</li>
                <li><strong>Dec 9</strong> - Mail for Interview 2</li>
                <li><strong>Dec 17</strong> - Interview 2</li>
                <li><strong>Jan 19</strong> - Final decision call</li>
            </ul>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2"> Application: when Google showed up exactly when I needed hope</h2>
            <p>I applied on <strong>Augest</strong>.</p>
            <p>At that moment, this wasn’t “just another application.” I applied with my whole heart - because for me, Google represented more than a brand. It represented a way back.</p>
            <p>A few days later, On September 12 I received the <strong>GOC link (Google Online Challenge)</strong>.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">The Online Challenge</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 pl-4 text-muted-foreground">
                <li><strong>2 problems</strong></li>
                <li>One <strong>grid-based</strong></li>
                <li>One <strong>tree-based</strong></li>
                <li>Around <strong>75 minutes</strong></li>
            </ul>
            <p>I completed both successfully. Not in a calm, movie-style manner - but in that tense, focused mode where you only breathe after clicking submit.</p>
            <p>Then came the hardest part.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">The waiting.</h3>
            <p>The kind where you refresh your inbox so much you start memorising the font.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2"> Telephonic Round: “Why apprenticeship?” matters more than you think</h2>
            <p>After many days, I received the email:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg">
                “We are moving forward with your candidature.”
            </blockquote>
            <p>I still remember how it felt. Like someone opened a window in a suffocating room.</p>
            <p>The telephonic round was on <strong>October 23</strong>. It was eliminatory.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">What they asked</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 pl-4 text-muted-foreground">
                <li>Intro</li>
                <li>Why apprenticeship?</li>
                <li>Why Google SAD?</li>
                <li>DSA strength / preparation</li>
            </ul>
            <p>This round is not about algorithms. It’s about <strong>intent</strong>.</p>
            <p>They are trying to understand:</p>
            <p className="font-semibold">Do you truly know why you’re here?</p>
            <p>I answered honestly. I moved forward.</p>
            <hr className="my-8" />
            
            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2"> Interview 1: Google surprised me asusual</h2>
            <p>This was my <strong>second time</strong> in Google’s process, so I was confident.</p>
            <p>The interview was originally scheduled for <strong>Nov 8</strong>, but I had a <strong>severe headache</strong> that week. I didn’t want to show up at 50% and regret it later, so I requested a reschedule.</p>
            <p>Google was supportive and moved it to <strong>Nov 14</strong>.</p>
            <p>That support mattered. It reminded me that professionalism can still be human.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">The twist</h3>
            <p>I entered the Meet ready for coding. But the interviewer started with <strong>Googlyness questions</strong>.</p>
            <p>I was surprised because I expected:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>coding</li>
                <li>problem solving</li>
            </ul>
            <p>Behavioral questions are tricky. Because in coding, you know if you’re right. In behavioral rounds, you don’t.</p>
            <p>Still, I managed.</p>
            <p>In the last few minutes, he gave an <strong>easy LeetCode-style question</strong>, and I solved it quickly.</p>
            <p>Then the call ended.</p>
            <p>Silence.</p>
            <p>And I genuinely felt it was over.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2"> Life continued: I joined MBRDI</h2>
            <p>Around this time, I got another apprenticeship opportunity at <strong>MBRDI (Mercedes-Benz Research & Development India)</strong>.</p>
            <p>I joined. You can read that interview experience here</p>
            <p>I didn’t stop dreaming about Google - but I stopped pausing my life for it.</p>
            <hr className="my-8" />
            
            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2"> Interview 2 call: the callback I didn’t expect</h2>
            <p>On <strong>Dec 9</strong>, I received a mail:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg">
                “Your next interview is scheduled for Dec 17.”
            </blockquote>
            <p>I read it twice.</p>
            <p>I got another chance.</p>
            <p>This time, I prepared with one goal: <strong>No regrets.</strong></p>
            <p>I even changed my environment (moved to another floor) just to stay focused.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2"> Interview 2: the real Google interview</h2>
            <p>This time, it was a standard Google-style interview.</p>
            <p>The question was <strong>easy to understand</strong>, and I started with an intuitive approach.</p>
            <p>Then I experienced something I’ll never forget.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">“Two loops will be less efficient - try differently.”</h3>
            <p>As I explained my approach, the interviewer immediately pointed out:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg">
                “If we use two loops, it becomes less efficient. Try a different approach.”
            </blockquote>
            <p>That moment taught me a truth:</p>
            <p>You can’t try to sound clever in front of Googlers. They don’t get impressed by confidence. They get impressed by:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>clarity</li>
                <li>correctness</li>
                <li>efficiency</li>
            </ul>
            <p>I reworked the solution and reached an <strong>O(m log n)</strong> approach.</p>
            <p>But the clock was unforgiving.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">What went wrong</h3>
            <p>By the time I reached the better solution:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>~40 minutes were gone</li>
                <li>I didn’t test edge cases properly</li>
                <li>I didn’t create room for follow-ups</li>
            </ul>
            <p>The interviewer said the solution was fine. He asked if I had questions. I asked. He answered patiently.</p>
            <p>Then the call ended.</p>
            <p>Silence again.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2"> Waiting for a miracle</h2>
            <p>Deep down, I knew I didn’t deliver perfectly.</p>
            <p>But when you get close, you start bargaining with reality:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg italic">
                maybe it’s enough<br />maybe they’ll still say yes<br />maybe a miracle
            </blockquote>
            <p>I waited.</p>
            <hr className="my-8" />
            
            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2"> Final call: the decision</h2>
            <p>On <strong>Jan 19</strong>, I got the call from the recruiting team.</p>
            <p>They started politely. And then came the sentence:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg">
                “However, we are not moving forward with your application for this batch.”
            </blockquote>
            <p>They were kind. They encouraged me to keep working and apply again.</p>
            <p>But it still hurt.</p>
            <p>Because it was my second time. Because I came close. Because I wanted it badly.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">What I learned (and what I wish I knew earlier)</h2>
            <p>If you’re applying for the Google SAD apprenticeship, these are the biggest lessons from my journey.</p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">1) Your “Why apprenticeship?” must be sharp</h3>
            <p>Not generic. Not emotional only. Not vague.</p>
            <p>A strong answer includes:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>your background</li>
                <li>the gap you want to fill</li>
                <li>why apprenticeship is the right bridge</li>
                <li>how it fits your long-term plan</li>
            </ul>
            <p>Your “why” should sound <strong>deliberate</strong>, not desperate.</p>

            <h3 className="text-xl font-bold mt-6 mb-2">2) Speed matters - not just correctness</h3>
            <p>Google evaluates your ability to:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>reason fast</li>
                <li>recover fast</li>
                <li>pivot fast</li>
            </ul>
            <p>It’s not about never making mistakes. It’s about <strong>how quickly you adapt</strong>.</p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">3) Always test and invite follow-ups</h3>
            <p>Follow-ups are not a threat. They are a signal.</p>
            <p>You should:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>test edge cases</li>
                <li>talk through complexity</li>
                <li>proactively ask: “Should I optimise further?”</li>
            </ul>
            <p>It shows maturity.</p>

            <h3 className="text-xl font-bold mt-6 mb-2">4) Don’t try to be oversmart</h3>
            <p>Googlers will spot it instantly.</p>
            <p>Be humble. Be structured. Be clear.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">Final words</h2>
            <p>Google still didn’t show me what it feels like to be on the other side of the loop.</p>
            <p>But this rejection isn’t the end. It’s training. It’s sharpening.</p>
            <p>I’ll come back stronger and wiser than before.</p>
            <p>Until then - Take care, Google.</p>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '24px 30px',
                maxWidth: '650px',
                margin: '30px auto',
                border: '2px dashed rgba(255, 255, 255, 0.25)',
                borderRadius: '18px',
                background: 'rgba(255, 255, 255, 0.06)',
                boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
            }}>
              <p style={{
                    margin: 0,
                    fontSize: '20px',
                    lineHeight: 1.6,
                    color: 'white',
                    letterSpacing: '0.2px',
              }}>
                <strong><em>“Someday, when the time is right, we’ll be together.”</em></strong>
              </p>
            </div>
        </div>
    ),
  },
  {
    slug: 'amazon-sde-intern-2025',
    company: 'Amazon',
    role: 'SDE Intern',
    date: 'Fall 2024',
    summary: 'My experience interviewing for the Software Development Engineer Internship at Amazon for the 2025 season.',
    tags: ['FAANG', 'Internship', 'New Grad'],
    status: 'selected',
    content: (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">The Process</h2>
                <p className="mb-4">The interview process consisted of three main stages:</p>
                <ol className="list-decimal list-inside space-y-2 mb-6 pl-4">
                    <li><strong>Online Assessment (OA):</strong> Two coding questions on a platform like HackerRank.</li>
                    <li><strong>Phone Interview:</strong> A 45-minute technical screen with an Amazon engineer.</li>
                    <li><strong>Final On-site (Virtual):</strong> Three 45-minute interviews back-to-back.</li>
                </ol>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-2">Online Assessment</h3>
                <p className="mb-6">The OA had two coding problems to be solved in 90 minutes. The problems were medium-level LeetCode style questions. I focused on explaining my thought process clearly in the code comments.</p>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-2">Final Interviews</h3>
                <p className="mb-4">The virtual on-site was intense. Each round had a mix of behavioral questions based on Amazon's Leadership Principles and a coding problem on a shared editor.</p>
                <p className="p-4 bg-secondary rounded-lg border"><strong>Key takeaway:</strong> Practice your Leadership Principle stories! They are just as important as the coding.</p>
            </div>
        </div>
    ),
  },
  {
    slug: 'sap-swe-intern-2023',
    company: 'SAP',
    role: 'Software Developer Intern',
    date: 'Spring 2023',
    summary: 'A look into the interview process for the Software Developer Internship at SAP Labs India.',
    tags: ['Enterprise', 'Internship'],
    status: 'selected',
    content: (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">The Process</h2>
                <p className="mb-4">The process for SAP was a bit different:</p>
                <ol className="list-decimal list-inside space-y-2 mb-6 pl-4">
                    <li><strong>Online Coding Round:</strong> A test with multiple-choice questions on CS fundamentals and one or two coding problems.</li>
                    <li><strong>Technical Interview:</strong> A deep-dive into my resume, projects, and knowledge of data structures, algorithms, and DBMS.</li>
                    <li><strong>Managerial/HR Round:</strong> A conversation focused on behavioral questions, team fit, and my interest in SAP.</li>
                </ol>
            </div>
            
            <div>
                <h3 className="text-xl font-bold mb-2">Technical Interview</h3>
                <p className="mb-6">The technical round was challenging. The interviewer asked detailed questions about the projects I had listed on my resume. We also discussed system design concepts at a high level.</p>
            </div>
            
            <p className="p-4 bg-secondary rounded-lg border"><strong>Key takeaway:</strong> Know your resume inside and out. Be prepared to justify every technical decision you made on your projects.</p>
        </div>
    ),
  },
];
