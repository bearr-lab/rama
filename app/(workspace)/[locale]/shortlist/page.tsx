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
import { MetricStrip } from '@/components/ui/metric-strip';
import { PageShell } from '@/components/ui/page-shell';
import { SectionHeader } from '@/components/ui/section-header';

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
    <PageShell>
      {isDemo && (
        <div className="flex items-center justify-between bg-surface-subtle p-5 text-xs text-ink">
          <div className="flex items-center gap-2.5 font-medium">
            <Sparkles className="size-4 shrink-0 text-fjord" />
            <span>
              <strong>
                {isArabic
                  ? 'وضع التقييم التجريبي:'
                  : 'Sandbox Evaluation Mode:'}
              </strong>{' '}
              {isArabic
                ? 'عرض قائمة مختصرة تجريبية لعقارات موثوقة ذات عوائد مرتفعة.'
                : 'Showing a pre-populated evaluation Shortlist of high-yield verified properties.'}
            </span>
          </div>
          <span className="hidden items-center gap-1 rounded-none bg-surface px-2.5 py-1 text-[11px] font-semibold text-muted-foreground sm:inline-flex">
            {properties.length} {isArabic ? 'عقارات متوفرة' : 'Saved Comps'}
          </span>
        </div>
      )}

      <SectionHeader
        breadcrumb={
          isArabic ? 'مساحة العمل · القائمة المختصرة' : 'WORKSPACE · SAVED SHORTLIST'
        }
        title={isArabic ? 'قائمتي المفضلة والمقارنات' : 'Saved Shortlist & Comps'}
        description={
          isArabic
            ? 'العقارات التي قمت بحفظها للمراجعة الدقيقة ومقارنة العوائد الاستثمارية جنباً إلى جنب.'
            : "Properties you've saved for deeper due diligence, financial modeling, and side-by-side comparison."
        }
        actions={
          <Link href={`/${locale}/decision-lab`}>
            <ShimmerButton className="px-5 py-2.5 text-xs font-semibold">
              <span>{isArabic ? 'مصفوفة القرار' : 'Open Decision Matrix'}</span>
            </ShimmerButton>
          </Link>
        }
      />

      {/* Efferd & Magic UI Shortlist Metric Cards */}
      {/* Efferd & Magic UI Shortlist Metric Cards */}
      {properties.length > 0 && (
        <MetricStrip
          metrics={[
            {
              id: 'valuation',
              title: isArabic ? 'إجمالي قيمة القائمة' : 'Total Valuation',
              value: Number((properties.reduce((sum, p) => sum + (p.price || 0), 0) / 1000000).toFixed(1)),
              prefix: 'AED',
              suffix: 'M',
              decimalPlaces: 1,
              badgeText: '+14.2% YoY',
              description: `${properties.length} ${isArabic ? 'عقارات في القائمة' : 'Saved luxury assets'}`
            },
            {
              id: 'yield',
              title: isArabic ? 'متوسط صافي العائد' : 'Avg Projected Yield',
              value: 7.4,
              suffix: '%',
              decimalPlaces: 1,
              badgeText: 'Above Dubai Avg',
              description: isArabic ? 'تقديرات DLD المستندة للبيانات' : 'Validated by DLD historical data'
            },
            {
              id: 'trust',
              title: isArabic ? 'معدل موثوقية DLD' : 'Avg DLD Trust Score',
              value: 96.4,
              suffix: ' / 100',
              decimalPlaces: 1,
              badgeText: 'Verified',
              isShinyBadge: true,
              description: isArabic ? 'سندات ملكية وحسابات ضمان موثقة' : 'Title deeds & Escrow accounts active'
            }
          ]}
        />
      )}

      {properties.length === 0 ? (
        <EmptyState
          variant="shortlist"
          title="Your shortlist is empty"
          description="You haven't saved any properties yet. Start exploring in the Discovery Engine and click the bookmark icon to save your favorites."
          action={
            <Link href={`/${locale}/discover`}>
              <Button className="mt-4 rounded-none bg-fjord px-6 py-2.5 text-sm font-semibold text-white hover:bg-fjord-hover">
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
    </PageShell>
  );
}
