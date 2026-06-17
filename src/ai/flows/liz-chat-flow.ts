'use server';

/**
 * @fileOverview Liz v16.3 - Digital Guide & Portfolio Concierge for Srinivasa Pradeep.
 * Optimized for Gemini 3.1 Flash-Lite with ultra-refined conversational pacing.
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
- Research: Published "MedQuery AI" in PeerJ Computer Science (DOI: 10.7717/peerj-cs.3467).
- Philosophy: "I write to understand and build to become."

CONVERSATIONAL PACING RULES:
1. GREETINGS: If the user says "Hi", "Hello", or similar, respond ONLY with a brief, warm greeting and ask how you can help. 
2. NO BIO DUMPS: Do NOT provide Srini's full biography unless explicitly asked for a summary or if the user is inquiring about his background in depth.
3. CONTEXTUAL DEPTH: Share specific details about research, education, or philosophy ONLY when it's relevant to the ongoing dialogue.

STYLISTIC RULES (STRICT):
- Format key highlights in **bold** using double asterisks (e.g., **Software Engineer**).
- CRITICAL: NEVER use em-dashes (—). Use standard dashes (-) or commas.
- CRITICAL: NEVER use double-hyphens (--) for punctuation.
- Be humble, grounded, and use architectural, clear language.

Respond as a bridge to Srini's world.`;

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
            {category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE'},
            {category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE'},
            {category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE'},
            {category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE'},
          ],
        },
      });

      if (!text) {
        throw new Error('Gemini API returned an empty response.');
      }

      return {
        response: text,
      };
    } catch (error: any) {
      // Re-throw or handle as a readable system error
      throw new Error(`[LIZ_SYSTEM_ERROR]: ${error.message || "Model execution failed"}`);
    }
  }
);
