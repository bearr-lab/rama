import { AuthForm } from '@/components/auth/auth-form';
import Image from 'next/image';
import { Quote } from 'lucide-react';

export default async function SignUpPage({
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
            {isArabic ? 'انضم إلى راما' : 'Join RAMA'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-medium">
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
