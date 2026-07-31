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
    resetSent:
      'تحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور.',
  },
} as const;

import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

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
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/${locale}/reset-password`,
      },
    );

    setIsLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setNotice(t.resetSent);
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <form className="space-y-3" onSubmit={handleSendReset} noValidate>
        <motion.label
          variants={itemVariants}
          className="block space-y-2 text-sm font-medium text-ink"
        >
          <span>{t.email}</span>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-10 border-border/60 bg-surface/50 text-sm shadow-none transition-all focus:border-fjord/50 focus:bg-surface focus:ring-4 focus:ring-fjord/10"
          />
        </motion.label>

        {error && (
          <motion.p
            variants={itemVariants}
            className="rounded-xl bg-risk-soft px-4 py-3 text-sm text-risk"
            role="alert"
          >
            {error}
          </motion.p>
        )}
        {notice && (
          <motion.p
            variants={itemVariants}
            className="rounded-xl bg-verified-soft px-4 py-3 text-sm text-verified"
            role="status"
          >
            {notice}
          </motion.p>
        )}

        <motion.div variants={itemVariants}>
          <Button
            className="h-10 w-full text-sm font-semibold shadow-sm"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Mail className="mr-2 size-4" />
            )}
            {t.sendReset}
            {!isLoading && <ArrowRight className="ms-auto opacity-70" />}
          </Button>
        </motion.div>
      </form>

      <motion.div variants={itemVariants} className="pt-2 text-center">
        <Link
          href={`/${locale}/login`}
          className="text-sm font-medium text-muted-foreground hover:text-ink hover:underline"
        >
          {t.backToSignIn}
        </Link>
      </motion.div>
    </motion.div>
  );
}
