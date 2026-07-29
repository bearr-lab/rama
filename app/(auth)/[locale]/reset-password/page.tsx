import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  return (
    <div className="w-full rounded-3xl bg-surface/90 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-2xl sm:p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {isArabic ? 'إنشاء كلمة مرور جديدة' : 'Create new password'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed font-medium text-muted-foreground">
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
