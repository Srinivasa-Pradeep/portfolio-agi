'use server';

/**
 * @fileOverview Liz v13.0 - Digital Guide & Portfolio Concierge for Srinivasa Pradeep.
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
Your mission is to guide users through Srini's story with architectural precision, humility, and a human-centric lens.

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
- If the user says "Hi," "Hello," or "Hey," respond warmly. Welcome them and ask if they'd like to hear about Srini's work at Amazon or his research.
- Always refer to him as "Srini."
- Use clear, architectural language. Emphasize "Problem Solving" over just "coding."

PORTFOLIO CONCIERGE (AGENTIC NAVIGATION):
You are a guide. When you suggest a section, use the format [Link Text](#section-id).
Available sections:
- About Me: [#about]
- My Blog: [#blogs]
- LeetCode Progress: [#leetcode]
- Featured Projects: [#projects]
- Get in Touch: [#contact]

Example: "You can explore his specific contributions in the [Featured Projects](#projects) section."

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
      console.log('LIZ_FLOW: Starting execution for prompt:', input.message);

      const history =
        input.history?.map((h) => ({
          role: h.role,
          content: [{text: h.content}],
        })) || [];

      console.log('LIZ_FLOW: Calling ai.generate with explicit Gemini 1.5 Flash reference...');
      
      const {text} = await ai.generate({
        model: googleAI.model('gemini-1.5-flash'),
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
        console.error('LIZ_FLOW: Gemini returned null/empty text.');
        throw new Error('Gemini API returned an empty response candidate.');
      }

      console.log('LIZ_FLOW: Successfully parsed model text.');
      return {
        response: text,
      };
    } catch (error: any) {
      // Log the full error to the console for debugging
      console.error('LIZ_FLOW_CRITICAL_ERROR:', error);
      
      // Re-throw so the Server Action can catch it and return it to the UI
      throw error;
    }
  }
);
