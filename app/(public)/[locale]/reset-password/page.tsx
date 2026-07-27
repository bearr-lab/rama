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
    <div className="flex min-h-screen w-full flex-col lg:flex-row pt-16">
      {/* Auth Column */}
      <div className="flex w-full lg:w-[480px] xl:w-[520px] shrink-0 items-center justify-center bg-surface px-6 py-12 sm:px-10 lg:px-12">
        <div className="w-full max-w-[340px] space-y-8">
          <div className="text-center lg:text-start">
            <h1 className="font-display text-3xl font-semibold text-ink">
              {isArabic ? 'إعادة تعيين كلمة المرور' : 'Reset your password'}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {isArabic
                ? 'أدخل كلمة مرورك الجديدة لحماية حسابك والعودة إلى مساحة القرار الخاصة بك.'
                : 'Enter your new password below to secure your account and return to your workspace.'}
            </p>
          </div>
          <ResetPasswordForm locale={locale as 'en' | 'ar'} />
        </div>
      </div>

      {/* Imagery Column */}
      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000" // Luxury Dubai architecture
            alt="RAMA Security"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Security Statement */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 lg:p-16">
          <ShieldCheck className="mb-6 h-12 w-12 text-verified" />
          <blockquote className="space-y-4">
            <p className="font-display text-2xl font-medium leading-snug text-white lg:text-3xl">
              {isArabic
                ? "أمان بياناتك وخصوصية قراراتك العقارية هما أولوية قصوى في راما."
                : "Your data security and decision privacy are paramount at RAMA."}
            </p>
            <footer className="flex items-center gap-4">
              <div className="h-px w-8 bg-white/50" />
              <div className="text-sm font-medium text-white/80">
                {isArabic ? 'حماية مصرفية معتمدة' : 'Bank-Grade Security'}
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
