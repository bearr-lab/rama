import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export default async function ForgotPasswordPage({
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
            {isArabic ? 'استعادة كلمة المرور' : 'Reset your password'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed font-medium text-muted-foreground">
            {isArabic
              ? 'أدخل بريدك الإلكتروني وسنرسل لك تعليمات إعادة تعيين كلمة المرور فوراً.'
              : 'Enter your email address and we will send you instructions to reset your password.'}
          </p>
        </div>
        <ForgotPasswordForm locale={locale as 'en' | 'ar'} />
      </div>
    </div>
  );
}
