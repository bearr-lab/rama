import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return (
    <div className="w-full rounded-3xl bg-surface/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl ring-1 ring-black/5">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {isArabic ? 'إنشاء كلمة مرور جديدة' : 'Create new password'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-medium">
            {isArabic
              ? 'أدخل كلمة المرور الجديدة لحسابك. يرجى اختيار كلمة مرور قوية.'
              : 'Enter your new password below. Please choose a strong password.'}
          </p>
        </div>
        <ResetPasswordForm locale={locale as 'en' | 'ar'} />
      </div>
    </div>
  );
}
