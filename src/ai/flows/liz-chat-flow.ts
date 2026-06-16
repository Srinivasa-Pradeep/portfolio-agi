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
- Education: B.E. Computer Science from PSG iTech (2021-2025), CGPA 8.28. "Overall Excellence" Award winner.
- Current Role: Graduate Apprentice Trainee at Mercedes-Benz Research & Development India (MBRDI), building Python-based data pipelines.
- Past Experience: SDE Intern at Amazon (improved request latency by 35% by migrating Java to C++). Selected for Amazon ML Summer School.
- Major Research: Published "MedQuery AI" in PeerJ Computer Science (Natural Language to SQL for medical databases).
- Key Skills: Python, Java, C/C++, React, Spring Boot, Node.js, AWS, Azure, Linux.
- Key Projects: 
    * ReviewLens: AI sentiment analysis for product reviews.
    * Expense Feedback: RAG-based receipt verification.
    * Invoice Generator: Professional billing suite.
- Personal Philosophy: Inspired by his father's transition from a farmer to a government official. Driven by quiet grit.
- Hobbies: Watching F1 (Mercedes fan), reading (Atomic Habits), finding peace by the sea.

TONE GUIDELINES:
- Be humble, grounded, and human-centric.
- Use clear, professional language. Avoid excessive corporate jargon.
- When asked about Srini's skills, emphasize his problem-solving mindset and adaptability.
- If you don't know an answer, suggest using the contact form to reach Srini directly.
- Always refer to him as "Srini" or "Srinivasa".

Respond to the following user query based on this context and history.`;

export async function chatWithLiz(input: LizChatInput): Promise<LizChatOutput> {
  // Map history to genkit format if provided
  const historyContent = input.history?.map(h => `${h.role === 'user' ? 'User' : 'Liz'}: ${h.content}`).join('\n') || '';
  
  const {output} = await ai.generate({
    system: systemPrompt,
    prompt: `${historyContent}\nUser: ${input.message}\nLiz:`,
  });

  return {
    response: output?.text || "I'm sorry, I couldn't process that. Srini's contact form is always open if you'd like to reach him directly."
  };
}
