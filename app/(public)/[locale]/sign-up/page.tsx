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
    <div className="flex min-h-screen w-full flex-col lg:flex-row pt-16">
      {/* Auth Column */}
      <div className="flex w-full lg:w-[480px] xl:w-[520px] shrink-0 items-center justify-center bg-surface px-6 py-12 sm:px-10 lg:px-12">
        <div className="w-full max-w-[340px] space-y-8">
          <div className="text-center lg:text-start">
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {isArabic ? 'إنشاء حساب في راما' : 'Create your account'}
            </h1>
            <p className="mt-2.5 text-xs leading-relaxed text-muted sm:text-sm">
              {isArabic
                ? 'انضم إلى نخبة المستثمرين واحصل على تحليلات وبيانات موثقة لعقارات دبي.'
                : 'Join elite investors and gain access to DLD-verified data and decision tools.'}
            </p>
          </div>
          <AuthForm locale={locale as 'en' | 'ar'} defaultMode="sign-up" />
        </div>
      </div>

      {/* Imagery Column */}
      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000" // Luxury Dubai Villa
            alt="RAMA Luxury Real Estate"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Brand Statement / Testimonial */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 lg:p-16">
          <Quote className="mb-6 h-10 w-10 text-white/50" />
          <blockquote className="space-y-4">
            <p className="font-display text-2xl font-medium leading-snug text-white lg:text-3xl">
              {isArabic
                ? "الاستثمار في عقارات دبي يتطلب رؤية واضحة وبيانات دقيقة. راما تمنحك هذه القوة منذ اليوم الأول."
                : "Investing in Dubai real estate demands absolute clarity and verified data. RAMA gives you that power from day one."}
            </p>
            <footer className="flex items-center gap-4">
              <div className="h-px w-8 bg-white/50" />
              <div className="text-sm font-medium text-white/80">
                {isArabic ? 'مستثمر معتمد' : 'Verified Investor'}
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
