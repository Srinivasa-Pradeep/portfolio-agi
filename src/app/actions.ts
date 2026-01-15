'use server';

import { z } from 'zod';
import { categorizeContactFormSubmission } from '@/ai/flows/categorize-contact-form-submission';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string | null;
  category?: string | null;
  success: boolean;
};

export async function submitContactForm(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
      success: false,
    };
  }

  const { message } = validatedFields.data;

  try {
    const result = await categorizeContactFormSubmission({ message });
    console.log('AI categorization result:', result.category);

    // Here you would typically send an email or save to a database.
    // For this example, we'll just simulate success.
    
    return {
      message: `Thank you for your message! It has been categorized as: ${result.category}.`,
      category: result.category,
      success: true,
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      success: false,
    };
  }
}
