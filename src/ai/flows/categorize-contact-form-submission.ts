// use server'

/**
 * @fileOverview Categorizes contact form submissions using GenAI.
 *
 * - categorizeContactFormSubmission - A function that categorizes contact form submissions.
 * - CategorizeContactFormSubmissionInput - The input type for the categorizeContactFormSubmission function.
 * - CategorizeContactFormSubmissionOutput - The return type for the categorizeContactFormSubmission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeContactFormSubmissionInputSchema = z.object({
  message: z
    .string()
    .describe('The content of the message submitted via the contact form.'),
});
export type CategorizeContactFormSubmissionInput =
  z.infer<typeof CategorizeContactFormSubmissionInputSchema>;

const CategorizeContactFormSubmissionOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category of the message, e.g., Job Opportunity, Feedback, Question.'
    ),
});
export type CategorizeContactFormSubmissionOutput =
  z.infer<typeof CategorizeContactFormSubmissionOutputSchema>;

export async function categorizeContactFormSubmission(
  input: CategorizeContactFormSubmissionInput
): Promise<CategorizeContactFormSubmissionOutput> {
  return categorizeContactFormSubmissionFlow(input);
}

const categorizeContactFormSubmissionPrompt = ai.definePrompt({
  name: 'categorizeContactFormSubmissionPrompt',
  input: {schema: CategorizeContactFormSubmissionInputSchema},
  output: {schema: CategorizeContactFormSubmissionOutputSchema},
  prompt: `You are an AI assistant that categorizes contact form submissions.

  Analyze the following message and determine its category.
  The category should be one of the following:
  - Job Opportunity
  - Feedback
  - Question
  - Other

  Message: {{{message}}}
  Category:`,
});

const categorizeContactFormSubmissionFlow = ai.defineFlow(
  {
    name: 'categorizeContactFormSubmissionFlow',
    inputSchema: CategorizeContactFormSubmissionInputSchema,
    outputSchema: CategorizeContactFormSubmissionOutputSchema,
  },
  async input => {
    const {output} = await categorizeContactFormSubmissionPrompt(input);
    return output!;
  }
);
