import { AuthForm } from '@/components/auth/auth-form';
import Image from 'next/image';
import { Quote } from 'lucide-react';

export default async function LoginPage({
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
            {isArabic ? 'مرحباً بك في راما' : 'A calmer way to decide'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-medium">
            {isArabic
              ? 'سجّل الدخول لحفظ الخيارات ومتابعة كل قرار بثقة.'
              : 'Keep your shortlist, evidence and decisions in one considered workspace.'}
          </p>
        </div>
        <AuthForm locale={locale as 'en' | 'ar'} defaultMode="sign-in" compact />
      </div>
    </div>
  );
}
