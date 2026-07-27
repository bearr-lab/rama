'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';

interface ForgotPasswordFormProps {
  locale: 'en' | 'ar';
}

const copy = {
  en: {
    email: 'Email address',
    sendReset: 'Send reset link',
    backToSignIn: '← Back to sign in',
    resetSent: 'Check your inbox for a password reset link.',
  },
  ar: {
    email: 'البريد الإلكتروني',
    sendReset: 'إرسال رابط إعادة التعيين',
    backToSignIn: '← العودة لتسجيل الدخول',
    resetSent: 'تحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور.',
  },
} as const;

export function ForgotPasswordForm({ locale }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = copy[locale];

  const handleSendReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    setError(null);
    setNotice(null);
    setIsLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/${locale}/reset-password`,
    });

    setIsLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setNotice(t.resetSent);
  };

  return (
    <div className="space-y-6">
      <form className="space-y-4" onSubmit={handleSendReset} noValidate>
        <label className="block space-y-1.5 text-sm font-medium text-ink">
          <span>{t.email}</span>
          <Input name="email" type="email" autoComplete="email" required />
        </label>

        {error && (
          <p className="rounded-md bg-risk-soft px-3 py-2 text-sm text-risk" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="rounded-md bg-verified-soft px-3 py-2 text-sm text-verified" role="status">
            {notice}
          </p>
        )}

        <Button className="h-11 w-full" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
          {t.sendReset}
          {!isLoading && <ArrowRight className="ms-auto" />}
        </Button>
      </form>

      <div className="pt-2 text-center">
        <Link
          href={`/${locale}/login`}
          className="text-sm font-medium text-muted hover:text-ink hover:underline"
        >
          {t.backToSignIn}
        </Link>
      </div>
    </div>
  );
}
