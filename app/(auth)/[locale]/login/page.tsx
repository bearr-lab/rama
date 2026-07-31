import { AuthForm } from '@/components/auth/auth-form';

export default async function LoginPage({
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
            {isArabic ? 'مرحباً بك في راما' : 'A calmer way to decide'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed font-medium text-muted-foreground">
            {isArabic
              ? 'سجّل الدخول لحفظ الخيارات ومتابعة كل قرار بثقة.'
              : 'Keep your shortlist, evidence and decisions in one considered workspace.'}
          </p>
        </div>
        <AuthForm
          locale={locale as 'en' | 'ar'}
          defaultMode="sign-in"
          compact
        />
      </div>
    </div>
  );
}
