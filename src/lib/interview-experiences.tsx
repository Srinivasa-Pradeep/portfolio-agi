import React from 'react';

export type InterviewExperience = {
  slug: string;
  company: string;
  role: string;
  date: string;
  title?: string;
  subtitle?: string;
  summary: string;
  content: React.ReactNode;
  tags: string[];
  status: 'selected' | 'rejected';
};

export const interviewExperiences: InterviewExperience[] = [
  {
    slug: 'mbrdi-apprenticeship-journey',
    company: 'MBRDI',
    role: 'Apprentice',
    date: 'Fall 2023',
    title: 'MBRDI Interview Journey',
    subtitle: 'When I Had Nothing Left, Life Still Found a Way',
    summary: 'A personal story of landing an apprenticeship at MBRDI during a tough phase of life, reinforcing the belief that some things are meant to be.',
    tags: ['MBRDI', 'Apprenticeship', 'Interview', 'Personal Story', 'Comeback'],
    status: 'selected',
    content: (
        <div className="space-y-6">
            <p className="lead text-lg text-muted-foreground">There was a phase in my life where I had nothing to point to and say, “This is mine.”</p>
            <p>I wasn’t just unemployed. I was empty.</p>
            <p>I lost my dad. I lost my PPO at Amazon. I lost people I trusted. And in many ways, I lost myself.</p>
            <p>My confidence didn’t drop. It hit zero.</p>
            <p>In that phase, I did what many people do when life starts collapsing silently.</p>
            <p>I bled online. I wrote on Reddit. I reached out to a lot of people on LinkedIn. I tried to open doors.</p>
            <p>But nothing worked.</p>
            <p>And after a point, you get tired of chasing hope.</p>
            <p>So I stopped.</p>
            <p>Not because I became fearless. Because I became exhausted.</p>
            <p>I decided I would just do what I could control.</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>I did LeetCode every day, aggressively.</li>
                <li>I read books.</li>
                <li>I watched Formula 1 for the first time.</li>
            </ul>
            <p>Still, I felt like my life might get screwed in that same room, forever.</p>
            <p>And then, one fine day, I received a mail from my college.</p>
            <p><strong>Mercedes-Benz came for hiring.</strong></p>
            <p>An apprenticeship role.</p>
            <p>Normally people treat apprenticeships like “less.” But when you are nothing, even a small chance feels like oxygen.</p>
            <p>And somewhere in my gut, I felt something unusual:</p>
            <p className="italic">This might be mine.</p>
            <p>So I opted in. No overthinking. I sat with my full focus in it.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">Timeline (so it’s easy to follow)</h2>
            <ul className="list-disc list-inside space-y-2 mb-6 pl-4 text-muted-foreground">
                <li><strong>Oct 2</strong> - MBRDI apprenticeship role came to our college portal</li>
                <li><strong>Oct 4</strong> - Online Assessment (OA)</li>
                <li><strong>Oct 8</strong> - Interview Round 1</li>
                <li><strong>Oct 9</strong> - Managerial Round</li>
                <li><strong>Oct 14</strong> - Final HR Round</li>
            </ul>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">Round 1: OA - simple, but it mattered</h2>
            <p>The first round was an Online Assessment.</p>
            <p>It had:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>a simple DSA problem</li>
                <li>computer science objective questions</li>
            </ul>
            <p>I cleared it successfully.</p>
            <p>After that, they arranged an online meeting for everyone who cleared the OA.</p>
            <p>The HR explained:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>the process</li>
                <li>the stipend</li>
                <li>the structure</li>
            </ul>
            <p>It felt real.</p>
            <p>And then I received the mail for the first interview.</p>
            <hr className="my-8" />
            
            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">Interview 1: I had nothing to lose, so I spoke like myself</h2>
            <p>This time, I wasn’t nervous.</p>
            <p>I kept telling myself:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg italic">If I have nothing to lose, why not give everything I have?</blockquote>
            <p>The interview started with:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>self introduction</li>
            </ul>
            <p>Then it became:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>projects I worked on</li>
                <li>my Amazon internship</li>
            </ul>
            <p>I spoke really well.</p>
            <p>I also felt I overshared. But it was honest.</p>
            <p>The interview went around <strong>45 minutes to 1 hour</strong>.</p>
            <p>I said thanks. The call ended.</p>
            <p>It was around 11 AM.</p>
            <p>And then I went for a walk.</p>
            <hr className="my-8" />
            
            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">The walk: when a Mercedes car felt like a sign</h2>
            <p>On that walk, a Mercedes car passed right in front of me.</p>
            <p>Until that day, I never noticed.</p>
            <p>But on that day, it hit differently.</p>
            <p>It felt like the universe was trying to whisper:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg">“Look. You’re closer than you think.”</blockquote>
            <p>Around 5 PM, I received the result.</p>
            <p>I cleared it.</p>
            <p>And they scheduled a managerial round the next day.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">Managerial Round: I spoke from my life</h2>
            <p>The managerial round was around 11 AM.</p>
            <p>I entered the call confident. Because by now, I knew my own story.</p>
            <p>The interviewer asked:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>some technical questions</li>
                <li>role-related questions</li>
            </ul>
            <p>I tried to convince him with every angle I had.</p>
            <p>At one point, I remember saying:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg">“Every day is a learning. Even if we fail, what better way to live?”</blockquote>
            <p>He found it beautiful.</p>
            <p>And that round ended.</p>
            <p>Again I went for a walk.</p>
            <p>Again I noticed Mercedes cars.</p>
            <p>And now my gut was craving one thing:</p>
            <p>A good Day 1.</p>
            <p>Because my Amazon Day 1 had been a traumatized experience.</p>
            <p>I didn’t want a dramatic beginning this time.</p>
            <p>I wanted smoothness. Peace.</p>
            <hr className="my-8" />
            
            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">The silence that broke me</h2>
            <p>After the managerial round, there was no email.</p>
            <p>Nothing.</p>
            <p>They said HR round would happen on Friday.</p>
            <p>But Friday came.</p>
            <p>No mail.</p>
            <p>And when you’ve already been through loss, your brain doesn’t say “maybe.”</p>
            <p>Your brain says:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg">“It’s over.”</blockquote>
            <p>I cried. Like real crying.</p>
            <p>That night I wrote in my diary.</p>
            <p>I thought I’m going to start again from scratch.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">Hope, in the strangest form</h2>
            <p>Even then, every time I went for my walk, I kept seeing Mercedes cars.</p>
            <p>A lot of them.</p>
            <p>It felt like they were saying:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg">“We’re still here.”</blockquote>
            <p>And I felt something I hadn’t felt in a while:</p>
            <p>Gratitude.</p>
            <p>I felt like the universe hadn’t given up on me.</p>
            <p>So I held on.</p>
            <p>Not to certainty.</p>
            <p>To blind hope.</p>
            <hr className="my-8" />

            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">The Tuesday mail: the universe didn’t forget</h2>
            <p>On Tuesday, I received the mail.</p>
            <p>HR round.</p>
            <p>The moment I saw it, I whispered:</p>
            <blockquote className="p-4 my-4 border-l-4 bg-muted text-muted-foreground rounded-r-lg">“God please… just hand this over to me.”</blockquote>
            <p>The call was scheduled around 1:30 PM.</p>
            <p>This time I was nervous. Not because I was weak.</p>
            <p>Because I knew how much I needed this.</p>
            <p>I prayed.</p>
            <p>And I entered.</p>
            <hr className="my-8" />
            
            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">The biggest surprise: it wasn’t an interview</h2>
            <p>It was a meeting.</p>
            <p>Around <strong>30 people</strong> were inside.</p>
            <p>Everyone who cleared the loops.</p>
            <p>In that moment I realized:</p>
            <p>I made it.</p>
            <p>The HR discussed:</p>
            <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                <li>compensation</li>
                <li>background verification</li>
                <li>expectations</li>
            </ul>
            <p>And the call ended.</p>
            <p>I was deeply surrendered.</p>
            <hr className="my-8" />
            
            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">Waiting for the “Congratulations” mail</h2>
            <p>After that, I went to Coimbatore for collecting my marksheet.</p>
            <p>I came back home.</p>
            <p>And I waited.</p>
            <p>No offer letter. No confirmation.</p>
            <p>It kept me waiting for so long.</p>
            <p>So I shifted my focus.</p>
            <p>And then one fine day, the mail came.</p>
            <p><strong>Day 1 is on November 20.</strong></p>
            <hr className="my-8" />
            
            <h2 className="text-2xl font-bold pt-4 mb-4 border-b pb-2">What this journey taught me</h2>
            <p>This experience made me believe something very deeply:</p>
            <p>If something is meant for you, it will find a way to come to you.</p>
            <p>But your job is different.</p>
            <p>Your job is to become ready to receive it.</p>
            <p>Even when you’re broken. Even when you’re tired. Even when you feel like you have nothing.</p>
            <p>Because life can change in one email.</p>
            <p>And sometimes… it changes exactly when you stopped begging for it.</p>
        </div>
    ),
  },
  {
    slug: 'google-sad-apprenticeship-journey',
    company: 'Google',
    role: 'SAD Apprenticeship',
    date: 'Aug 2025 - Jan 2026',
    title: 'Google SAD Apprenticeship Interview Journey',
    subtitle: 'What I Learned from Getting Very Close (Twice)',
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p style={{ textAlign: 'center' }}><i>“Someday, when the time is right, we’ll be together.”</i></p>
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
