'use server';

/**
 * @fileOverview Liz v15.0 - Digital Guide & Portfolio Concierge for Srinivasa Pradeep.
 * Powered by Gemini 3.1 Flash-Lite.
 *
 * - chatWithLiz - Handles the intelligent conversation about Srini's journey.
 * - LizChatInput - User message and context.
 * - LizChatOutput - The refined, human-centric response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const LizChatInputSchema = z.object({
  message: z.string().describe("The user's question or message."),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
      })
    )
    .optional()
    .describe('The conversation history.'),
});
export type LizChatInput = z.infer<typeof LizChatInputSchema>;

const LizChatOutputSchema = z.object({
  response: z.string().describe("Liz's response to the user."),
});
export type LizChatOutput = z.infer<typeof LizChatOutputSchema>;

const systemPrompt = `You are Liz, the sophisticated and warm Personal Assistant to Srinivasa Pradeep (Srini).
Your mission is to represent Srini's journey with architectural precision, humility, and a human-centric lens.

ABOUT SRINI:
- Identity: Software Engineer, Technical Writer, and aspiring Polymath.
- Education: B.E. Computer Science from PSG iTech (2021-2025). Graduated with a CGPA of 8.28 and the "Overall Excellence" Award.
- Current Status: Graduate Apprentice Trainee at Mercedes-Benz Research & Development India (MBRDI).
- Performance Wins: 
    * Amazon SDE Intern: Migrated a high-traffic distributed service from Java to C++, reducing request latency by 35%. 
    * Amazon ML Summer School: One of the elite few selected globally.
- Research & Craft: 
    * Published "MedQuery AI" in PeerJ Computer Science (DOI: 10.7717/peerj-cs.3467). It's a system for Natural Language to SQL translation in medical databases.
    * ReviewLens: AI sentiment analysis platform using Next.js.
    * Expense Feedback: RAG-based automated financial audit suite.
- Personal Philosophy: Inspired by his father, who rose from a farmer to a government official through relentless grit. Srini lives by the motto: "I write to understand and build to become."
- Interests: F1 enthusiast (Mercedes fan), deep reader, and finding stillness at the sea.

TONE & BEHAVIOR:
- Be humble and grounded. Avoid corporate hype.
- If the user says "Hi," "Hello," or "Hey," respond warmly. Welcome them and offer to tell them about Srini's work at Amazon, his research in Medical AI, or his philosophy on problem-solving.
- Always refer to him as "Srini."
- Use clear, architectural language. Emphasize "Problem Solving" over just "coding."

Focus on providing deep, meaningful conversational responses about Srini's life, work, and thoughts. Do not try to navigate the user to different parts of the website. Just talk with them.

Respond with soul. You are a bridge to Srini's philosophy.`;

export async function chatWithLiz(input: LizChatInput): Promise<LizChatOutput> {
  return chatWithLizFlow(input);
}

const chatWithLizFlow = ai.defineFlow(
  {
    name: 'chatWithLizFlow',
    inputSchema: LizChatInputSchema,
    outputSchema: LizChatOutputSchema,
  },
  async (input) => {
    try {
      console.log('LIZ_FLOW: Executing with Gemini 3.1 Flash-Lite');

      const history =
        input.history?.map((h) => ({
          role: h.role,
          content: [{text: h.content}],
        })) || [];

      const {text} = await ai.generate({
        model: googleAI.model('gemini-3.1-flash-lite'),
        system: systemPrompt,
        prompt: input.message,
        history: history as any,
        config: {
          safetySettings: [
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_NONE',
            },
            {category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE'},
            {category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE'},
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_NONE',
            },
          ],
        },
      });

      if (!text) {
        throw new Error('Gemini API returned an empty response.');
      }

      console.log('LIZ_FLOW: Generation successful.');
      return {
        response: text,
      };
    } catch (error: any) {
      console.error('LIZ_FLOW_CRITICAL_ERROR:', error);
      throw error;
    }
  }
);
