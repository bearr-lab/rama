'use server';

import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export async function submitContactForm(formData: FormData) {
  try {
    const supabase = await createClient();
    
    const asText = (v: FormDataEntryValue | null, max: number) =>
      typeof v === 'string' ? v.trim().slice(0, max) : '';

    const name = asText(formData.get('name'), 120);
    const email = asText(formData.get('email'), 254);
    const subject = asText(formData.get('subject'), 200);
    const message = asText(formData.get('message'), 5000);

    if (!name || !email || !message) {
      return { error: 'Missing required fields' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { error: 'Please enter a valid email address' };
    }
    
    const nameParts = name.split(' ');
    const first_name = nameParts[0];
    const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Unknown';

    const { error } = await supabase
      .from('leads')
      .insert([
        {
          first_name,
          last_name,
          email,
          ai_notes: `Subject: ${subject}\n\nMessage: ${message}`,
          source: 'Website Contact Form',
          status: 'new',
        },
      ]);

    if (error) {
      logger.error('leads insert failed', { code: error.code, message: error.message });
      return { error: 'Failed to submit form. Please try again later.' };
    }

    return { success: true };
  } catch (error) {
    logger.error('Action error:', error);
    return { error: 'An unexpected error occurred.' };
  }
}
