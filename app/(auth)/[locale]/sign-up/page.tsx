import { AuthForm } from '@/components/auth/auth-form';

export default async function SignUpPage({
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
            {isArabic ? 'انضم إلى راما' : 'Join RAMA'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed font-medium text-muted-foreground">
            {isArabic
              ? 'أنشئ حساباً للوصول إلى أدوات تحليل العقارات المتقدمة.'
              : 'Create an account to access advanced property analytics.'}
          </p>
        </div>
        <AuthForm locale={locale as 'en' | 'ar'} defaultMode="sign-up" compact />
      </div>
    </div>
  );
}
