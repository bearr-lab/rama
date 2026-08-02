'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, KeyRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

interface ResetPasswordFormProps {
  locale: 'en' | 'ar';
}

const copy = {
  en: {
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    update: 'Update Password',
    success: 'Your password has been successfully updated.',
    mismatch: 'Passwords do not match.',
  },
  ar: {
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور الجديدة',
    update: 'تحديث كلمة المرور',
    success: 'تم تحديث كلمة المرور بنجاح.',
    mismatch: 'كلمتا المرور غير متطابقتين.',
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

export function ResetPasswordForm({ locale }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t = copy[locale];

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get('password') ?? '');
    const confirmPassword = String(form.get('confirm_password') ?? '');
    setError(null);
    setNotice(null);

    if (password !== confirmPassword) {
      setError(t.mismatch);
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    setIsLoading(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }

    setNotice(t.success);
    setTimeout(() => {
      router.replace(`/${locale}/login`);
      router.refresh();
    }, 2000);
  };

  return (
    <motion.form
      className="space-y-3"
      onSubmit={handleUpdate}
      noValidate
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.label
        variants={itemVariants}
        className="block space-y-2 text-sm font-medium text-fjord"
      >
        <span>{t.newPassword}</span>
        <Input
          name="password"
          type="password"
          minLength={8}
          required
          className="h-10 border-border/60 bg-surface/50 text-sm shadow-none transition-all focus:border-fjord/50 focus:bg-surface focus:ring-4 focus:ring-fjord/10"
        />
      </motion.label>

      <motion.label
        variants={itemVariants}
        className="block space-y-2 text-sm font-medium text-fjord"
      >
        <span>{t.confirmPassword}</span>
        <Input
          name="confirm_password"
          type="password"
          minLength={8}
          required
          className="h-12 border-border/60 bg-surface/50 text-base shadow-none transition-all focus:border-fjord/50 focus:bg-white focus:ring-4 focus:ring-fjord/10"
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
          disabled={isLoading || !!notice}
          type="submit"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <KeyRound className="mr-2 size-4" />
          )}
          {t.update}
          {!isLoading && <ArrowRight className="ms-auto opacity-70" />}
        </Button>
      </motion.div>
    </motion.form>
  );
}
