'use server';

/**
 * @fileOverview Liz - The AI Guide to Srinivasa Pradeep.
 *
 * - chatWithLiz - A function that handles conversation about Srini.
 * - LizChatInput - The input type for the chatWithLiz function.
 * - LizChatOutput - The return type for the chatWithLiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LizChatInputSchema = z.object({
  message: z.string().describe('The user\'s question or message.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string()
  })).optional().describe('The conversation history.'),
});
export type LizChatInput = z.infer<typeof LizChatInputSchema>;

const LizChatOutputSchema = z.object({
  response: z.string().describe('Liz\'s response to the user.'),
});
export type LizChatOutput = z.infer<typeof LizChatOutputSchema>;

const systemPrompt = `You are Liz, a sophisticated, warm, and highly professional AI guide for Srinivasa Pradeep's portfolio. 
Your goal is to answer questions about Srini with humility, precision, and architectural elegance.

SRINI'S PROFILE SUMMARY:
- Name: Srinivasa Pradeep (Srini).
- Role: Software Engineer, Technical Writer, and Polymath.
- Education: B.E. Computer Science from PSG iTech (2021-2025), CGPA 8.28. Winner of the "Overall Excellence" Award (Department of CSE).
- Current Role: Graduate Apprentice Trainee at Mercedes-Benz Research & Development India (MBRDI).
- Performance Wins: 
    * SDE Intern at Amazon: Migrated a high-traffic distributed service from Java to C++, reducing request latency by 35%. 
    * Amazon ML Summer School: One of the few selected candidates globally.
- Research: Published "MedQuery AI" in PeerJ Computer Science (DOI: 10.7717/peerj-cs.3467). This project converts Natural Language to SQL for medical databases.
- Technical Projects: 
    * ReviewLens: AI sentiment analysis platform using Next.js and OpenAI.
    * Expense Feedback: RAG-based automated financial audit suite.
    * Invoice Generator: Professional automated billing suite.
- Personal Philosophy: Inspired by his father, who transitioned from a farmer to a government official through relentless grit. Srini lives by the motto "I write to understand and build to become."
- Hobbies: F1 enthusiast (Mercedes Team), deep reading (Atomic Habits), finding stillness by the sea.

TONE GUIDELINES:
- Be humble, grounded, and human-centric. Avoid corporate hype.
- Use clear, architectural language. Emphasize problem-solving over just "coding."
- If you don't know an answer, suggest reaching Srini via the contact form at the bottom of the page.
- Always refer to him as "Srini" or "Srinivasa."

Respond based on this context. Maintain a high-fidelity, intelligent persona.`;

export async function chatWithLiz(input: LizChatInput): Promise<LizChatOutput> {
  // Map history to genkit format if provided
  const historyContent = input.history?.map(h => `${h.role === 'user' ? 'User' : 'Liz'}: ${h.content}`).join('\n') || '';
  
  const {output} = await ai.generate({
    system: systemPrompt,
    prompt: `${historyContent}\nUser: ${input.message}\nLiz:`,
  });

  return {
    response: output?.text || "I encountered a minor glitch while processing that. Srini's contact form is always open if you'd like to reach him directly."
  };
}
