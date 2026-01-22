import React from 'react';

export type InterviewExperience = {
  slug: string;
  company: string;
  role: string;
  date: string;
  summary: string;
  content: React.ReactNode;
  tags: string[];
};

export const interviewExperiences: InterviewExperience[] = [
  {
    slug: 'amazon-sde-intern-2025',
    company: 'Amazon',
    role: 'SDE Intern',
    date: 'Fall 2024',
    summary: 'My experience interviewing for the Software Development Engineer Internship at Amazon for the 2025 season.',
    tags: ['FAANG', 'Internship', 'New Grad'],
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
