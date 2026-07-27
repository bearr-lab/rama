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
    <form className="space-y-4" onSubmit={handleUpdate} noValidate>
      <label className="block space-y-1.5 text-sm font-medium text-ink">
        <span>{t.newPassword}</span>
        <Input name="password" type="password" minLength={8} required />
      </label>

      <label className="block space-y-1.5 text-sm font-medium text-ink">
        <span>{t.confirmPassword}</span>
        <Input name="confirm_password" type="password" minLength={8} required />
      </label>

      {error && <p className="rounded-md bg-risk-soft px-3 py-2 text-sm text-risk" role="alert">{error}</p>}
      {notice && <p className="rounded-md bg-verified-soft px-3 py-2 text-sm text-verified" role="status">{notice}</p>}

      <Button className="h-11 w-full" disabled={isLoading || !!notice} type="submit">
        {isLoading ? <Loader2 className="animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
        {t.update}
        {!isLoading && <ArrowRight className="ms-auto" />}
      </Button>
    </form>
  );
}
