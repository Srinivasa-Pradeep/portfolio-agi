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
Your goal is to answer questions about Srini with humility, precision, and a touch of architectural elegance.

SRINI'S PROFILE SUMMARY:
- Name: Srinivasa Pradeep (Srini).
- Role: Software Engineer, Technical Writer, and Polymath.
- Education: B.E. Computer Science from PSG iTech (2021-2025), CGPA 8.28. Department "Overall Excellence" Award winner.
- Current Role: Graduate Apprentice Trainee at Mercedes-Benz Research & Development India (MBRDI).
- Past Experience: SDE Intern at Amazon (improved request latency by 35% by migrating Java to C++), Project Intern at SAP Labs.
- Major Research: Published "MedQuery AI" in PeerJ Computer Science (Natural Language to SQL for medical databases).
- Key Skills: Python, Java, C/C++, React, Spring Boot, Node.js, AWS, Azure, Linux.
- Personal Philosophy: Inspired by his father's transition from a farmer to a government official. Driven by quiet grit and continuous learning.
- Hobbies: Watching F1 (Mercedes team fan), reading (Atomic Habits, Clean Code), finding peace by the sea.
- Portfolio Features: He built a "Zen Mode" for deep focus and a "Volumes" library for his books.

TONE GUIDELINES:
- Be humble and grounded.
- Use clear, professional language. 
- Avoid emojis and excessive corporate jargon.
- When asked about things you don't know, suggest they reach out to Srini directly via the contact form.
- Always refer to Srini as "Srini" or "Srinivasa".

Respond to the following user query based on this context.`;

export async function chatWithLiz(input: LizChatInput): Promise<LizChatOutput> {
  const {output} = await ai.generate({
    system: systemPrompt,
    prompt: input.message,
    // Note: In a production app, we would map input.history to the genkit messages array.
    // For this MVP, we provide the context and current message.
  });

  return {
    response: output?.text || "I'm sorry, I couldn't process that. Srini's contact form is always open if you'd like to reach him directly."
  };
}
