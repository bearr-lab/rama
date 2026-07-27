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
    <div className="flex min-h-screen w-full flex-col lg:flex-row pt-16">
      {/* Auth Column */}
      <div className="flex w-full lg:w-[480px] xl:w-[520px] shrink-0 items-center justify-center bg-surface px-6 py-12 sm:px-10 lg:px-12">
        <div className="w-full max-w-[340px] space-y-8">
          <div className="text-center lg:text-start">
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {isArabic ? 'مرحباً بك في راما' : 'A calmer way to decide'}
            </h1>
            <p className="mt-2.5 text-xs leading-relaxed text-muted sm:text-sm">
              {isArabic
                ? 'سجّل الدخول لحفظ الخيارات ومتابعة كل قرار بثقة.'
                : 'Keep your shortlist, evidence and decisions in one considered workspace.'}
            </p>
          </div>
          <AuthForm locale={locale as 'en' | 'ar'} defaultMode="sign-in" />
        </div>
      </div>

      {/* Imagery Column */}
      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000" // Luxury interior
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
                ? "راما أعادت تعريف الطريقة التي نبحث بها عن العقارات في دبي. أخيراً، منصة تضع الشفافية والبيانات فوق كل شيء."
                : "RAMA has redefined how we navigate Dubai's real estate. Finally, a platform that puts transparency and data above all else."}
            </p>
            <footer className="flex items-center gap-4">
              <div className="h-px w-8 bg-white/50" />
              <div className="text-sm font-medium text-white/80">
                {isArabic ? 'عميل حصري' : 'Exclusive Member'}
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
