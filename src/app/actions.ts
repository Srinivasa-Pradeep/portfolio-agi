'use server';

import { z } from 'zod';
import { categorizeContactFormSubmission } from '@/ai/flows/categorize-contact-form-submission';
import { chatWithLiz } from '@/ai/flows/liz-chat-flow';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const { name, email, message } = validatedFields.data;
  let category = 'Other'; // Default category

  try {
    // 1. Categorize the message with AI
    const result = await categorizeContactFormSubmission({ message });
    category = result.category;

    // 2. Send the email
    try {
      await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: ['drivefiles2004@gmail.com'],
        subject: `New Portfolio Message: ${category}`,
        react: ContactFormEmail({ name, email, message, category }),
        text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\nMessage: ${message}`,
      });
    } catch (emailError) {
        console.error('Email sending failed:', emailError);
    }

    return {
      message: `Thank you for your message! It has been categorized as: ${category}.`,
      category: category,
      success: true,
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      message: 'An unexpected error occurred processing your message. Please try again later.',
      success: false,
    };
  }
}

/**
 * Server Action for interacting with Liz
 */
export async function talkToLiz(message: string, history: { role: 'user' | 'model', content: string }[] = []) {
  try {
    const result = await chatWithLiz({ 
      message, 
      history 
    });
    return { success: true, response: result.response };
  } catch (error: any) {
    // Surface the actual error message for debugging purposes
    console.error('TALK_TO_LIZ_ACTION_ERROR:', error);
    return { 
      success: false, 
      response: `[LIZ_SYSTEM_ERROR]: ${error?.message || "An unknown model error occurred."}` 
    };
  }
}
