'use server';

import { createClient } from '@/lib/supabase/server';

export async function submitContactForm(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      return { error: 'Missing required fields' };
    }

    const { error } = await supabase
      .from('crm_leads')
      .insert([
        {
          name,
          email,
          subject,
          message,
          source: 'Website Contact Form',
          status: 'New',
        },
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return { error: 'Failed to submit form. Please try again later.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Action error:', error);
    return { error: 'An unexpected error occurred.' };
  }
}
