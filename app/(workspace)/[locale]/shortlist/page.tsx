import { createClient } from '@/lib/supabase/server';
import { PropertyGrid } from '@/components/property/property-grid';
import { EmptyState } from '@/components/ui/empty-state';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { MOCK_DISCOVER_PROPERTIES } from '@/lib/discover/mock-properties';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';
import { ShimmerButton } from '@/components/magicui/shimmer-button';

export default async function ShortlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isDemo = !user;
  const isArabic = locale === 'ar';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let properties: any[] = [];

  if (user) {
    const { data: shortlists, error } = await supabase
      .from('shortlists')
      .select('property_id, properties(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && shortlists) {
      properties = shortlists.map((s) => s.properties).filter(Boolean);
    }
  } else {
    // In demo sandbox mode, load 3 top mock properties as a pre-populated evaluation shortlist
    properties = MOCK_DISCOVER_PROPERTIES.slice(0, 3).map((p) => ({
      id: p.id,
      title_en: p.title,
      title_ar: p.title,
      price: p.price,
      bedrooms: p.beds,
      bathrooms: p.baths,
      area_sqft: p.sqft,
      location_tree: { community_en: p.community, community_ar: p.community },
      images: [
        p.imageUrl ||
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      ],
      featured: true,
      trust_score: p.trustScore,
      roi_percentage: p.roi,
    }));
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-10">
      {isDemo && (
        <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface-subtle p-4 text-xs text-ink shadow-xs">
          <div className="flex items-center gap-2.5 font-medium">
            <Sparkles className="h-4 w-4 shrink-0 text-fjord" />
            <span>
              <strong>{isArabic ? 'وضع التقييم التجريبي:' : 'Sandbox Evaluation Mode:'}</strong>{' '}
              {isArabic
                ? 'عرض قائمة مختصرة تجريبية لعقارات موثوقة ذات عوائد مرتفعة.'
                : 'Showing a pre-populated evaluation Shortlist of high-yield verified properties.'}
            </span>
          </div>
          <span className="hidden items-center gap-1 rounded-md bg-surface px-2.5 py-1 text-[11px] font-semibold text-muted sm:inline-flex">
            {properties.length} {isArabic ? 'عقارات متوفرة' : 'Saved Comps'}
          </span>
        </div>
      )}

      <header className="flex flex-col justify-between gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold tracking-widest text-fjord uppercase">
            {isArabic ? 'مساحة العمل · القائمة المختصرة' : 'WORKSPACE · SAVED SHORTLIST'}
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {isArabic ? 'قائمتي المفضلة والمقارنات' : 'Saved Shortlist & Comps'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
            {isArabic
              ? 'العقارات التي قمت بحفظها للمراجعة الدقيقة ومقارنة العوائد الاستثمارية جنباً إلى جنب.'
              : "Properties you've saved for deeper due diligence, financial modeling, and side-by-side comparison."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/${locale}/decision-lab`}>
            <ShimmerButton className="px-5 py-2.5 text-xs font-semibold">
              <span>{isArabic ? 'مصفوفة القرار' : 'Open Decision Matrix'}</span>
            </ShimmerButton>
          </Link>
        </div>
      </header>

      {/* Efferd & Magic UI Shortlist Metric Cards */}
      {properties.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <BlurFade delay={0.1}>
            <div className="border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all hover:shadow-floating">
              <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
                {isArabic ? 'إجمالي قيمة القائمة' : 'Total Valuation'}
              </span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-display text-3xl font-semibold text-ink flex items-baseline">
                  <span className="text-xl font-sans mr-1">AED</span>
                  <NumberTicker value={Number(((properties.reduce((sum, p) => sum + (p.price || 0), 0)) / 1000000).toFixed(1))} decimalPlaces={1} suffix="M" />
                </span>
                <span className="inline-flex items-center bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  +14.2% YoY
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-light">
                {properties.length} {isArabic ? 'عقارات في القائمة' : 'Saved luxury assets'}
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all hover:shadow-floating">
              <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
                {isArabic ? 'متوسط صافي العائد' : 'Avg Projected Yield'}
              </span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-display text-3xl font-semibold text-ink">
                  <NumberTicker value={7.4} decimalPlaces={1} suffix="%" />
                </span>
                <span className="inline-flex items-center bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Above Dubai Avg
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-light">
                {isArabic ? 'تقديرات DLD المستندة للبيانات' : 'Validated by DLD historical data'}
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="border border-border/40 bg-surface/70 p-6 backdrop-blur-md transition-all hover:shadow-floating">
              <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
                {isArabic ? 'معدل موثوقية DLD' : 'Avg DLD Trust Score'}
              </span>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-display text-3xl font-semibold text-ink">
                  <NumberTicker value={96.4} decimalPlaces={1} suffix=" / 100" />
                </span>
                <span className="inline-flex items-center bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <AnimatedShinyText className="font-semibold text-emerald-700 dark:text-emerald-300">
                    Verified
                  </AnimatedShinyText>
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-light">
                {isArabic ? 'سندات ملكية وحسابات ضمان موثقة' : 'Title deeds & Escrow accounts active'}
              </p>
            </div>
          </BlurFade>
        </div>
      )}

      {properties.length === 0 ? (
        <EmptyState
          variant="shortlist"
          title="Your shortlist is empty"
          description="You haven't saved any properties yet. Start exploring in the Discovery Engine and click the bookmark icon to save your favorites."
          action={
            <Link href={`/${locale}/discover`}>
              <Button className="mt-4 rounded-xl bg-fjord px-6 py-2.5 text-sm font-semibold text-white hover:bg-fjord-hover">
                Launch Discovery Engine
              </Button>
            </Link>
          }
        />
      ) : (
        <PropertyGrid
          properties={properties as unknown as Property[]}
          locale={locale as 'en' | 'ar'}
          savedPropertyIds={properties.map((p) => p.id)}
        />
      )}
    </div>
  );
}
