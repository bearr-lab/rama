import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  FileText,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_PROPERTIES } from '@/lib/mock-properties';
import { OnlineNow } from '@/components/online-now';
import { TopCountries } from '@/components/top-countries';
import { AudienceMix } from '@/components/audience-mix';
import { VisitorsChart } from '@/components/visitors-chart';

import { AnimatedShinyText } from '@/components/magicui/shiny-text';
import { MetricStrip } from '@/components/ui/metric-strip';
import { PageShell } from '@/components/ui/page-shell';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  // Fetch authenticated user for personalized greeting
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || null;
  // Get first name only for a clean greeting
  const firstName = userName ? userName.split(' ')[0] : null;

  const activeShortlist = MOCK_PROPERTIES.slice(0, 2);

  // Time-aware greeting based on Dubai time (UTC+4)
  const hour = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })).getHours();
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  const greetingEn = firstName ? `Good ${timeOfDay}, ${firstName}.` : `Good ${timeOfDay}.`;
  const greetingAr = timeOfDay === 'morning' ? 'صباح الخير، المستثمر' : timeOfDay === 'afternoon' ? 'طاب مساؤك، المستثمر' : 'مساء الخير، المستثمر';

  const recentLogs = [
    {
      id: 'log-101',
      title: isArabic
        ? 'تدقيق عقد الشراء (Form F)'
        : 'MOU Form F Title Deed Audit',
      property: 'Sky Collection Penthouse',
      community: 'Downtown Dubai',
      status: isArabic ? 'مكتمل وموثق' : 'Verified & Cleared',
      timestamp: 'Today, 09:42 AM',
      type: 'DLD API',
    },
    {
      id: 'log-102',
      title: isArabic
        ? 'إيداع الدفعة في حساب الضمان'
        : 'Escrow Deposit Milestone Disbursed',
      property: 'Modern Beachfront Villa',
      community: 'Palm Jumeirah',
      status: isArabic ? 'ممتثل لـ RERA' : 'RERA Compliant',
      timestamp: 'Yesterday, 04:15 PM',
      type: 'Escrow Trustee',
    },
    {
      id: 'log-103',
      title: isArabic
        ? 'تحديث نموذج توقعات صافي العائد'
        : '5-Year Net Yield Model Updated',
      property: 'Emirates Hills Golf Estate',
      community: 'Emirates Hills',
      status: isArabic ? 'تقدير +8.4%' : '+8.4% Appreciation',
      timestamp: 'July 24, 2026',
      type: 'AI RAG Engine',
    },
  ];

  return (
    <PageShell className="gap-20">
      {/* ── 1. Serene Executive Greeting & Banner (Grouped) ── */}
      <div className="flex flex-col gap-6">
        <header className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 animate-pulse rounded-none bg-emerald-500" />
            <AnimatedShinyText className="font-semibold text-emerald-700 dark:text-emerald-300">
              {isArabic
                ? 'سجل دبي العقاري مباشر'
                : 'DLD & RERA Live Sync Active'}
            </AnimatedShinyText>
          </div>
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {isArabic ? greetingAr : greetingEn}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed font-light text-muted-foreground sm:text-lg">
            {isArabic
              ? 'مساحة اتخاذ القرار الخاصة بك نشطة. لديك 4 عقارات في القائمة المختصرة ومهمتان عاجلتان في صفقات اليوم.'
              : 'Your executive decision workspace is active with 4 shortlisted luxury assets and 2 priority deal milestones.'}
          </p>
        </div>
      </header>
    </div>

      {/* ── 2. Minimalist Lagom Metric Strip (With Magic UI NumberTicker & BlurFade) ── */}
      <MetricStrip
        className="lg:grid-cols-4"
        metrics={[
          {
            id: 'shortlist',
            title: isArabic ? 'عقارات مختارة' : 'Saved Shortlist',
            value: 4,
            description: isArabic ? 'متوسط السعر 18.25M درهم' : 'AED 18.25M avg valuation',
            href: `/${locale}/shortlist`
          },
          {
            id: 'pipeline',
            title: isArabic ? 'مهام صفقات نشطة' : 'Pipeline Tasks',
            value: 5,
            description: (
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                <Clock className="size-3.5" />
                <span>
                  {isArabic
                    ? '1 مهمة عاجلة في مرحلة MOU'
                    : '1 priority in Form F stage'}
                </span>
              </p>
            ),
            href: `/${locale}/tasks`
          },
          {
            id: 'assets',
            title: isArabic ? 'قيمة الأصول المحفوظة' : 'Tracked Assets',
            value: 42.5,
            prefix: 'AED',
            suffix: 'M',
            decimalPlaces: 1,
            description: (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="size-3.5" />
                <span>{isArabic ? '+8.4% نمو القيمة' : '+8.4% DLD gain'}</span>
              </p>
            ),
            href: `/${locale}/portfolio`
          },
          {
            id: 'advisor',
            title: isArabic ? 'مستشار الذكاء الاصطناعي' : 'AI Concierge',
            value: (
              <div className="flex items-center gap-2">
                <span className="inline-flex size-2 animate-ping rounded-none bg-emerald-500" />
                <span className="font-display">Active</span>
              </div>
            ),
            description: isArabic ? 'ربط مباشر لقواعد DLD' : 'Live DLD RAG intelligence',
            href: `/${locale}/advisor`
          }
        ]}
      />

      {/* ── 3. Main Workspace Grid: Shortlisted Candidates & Priority Milestone ── */}
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left Column (2/3 width) — Shortlisted Residence Previews (Clean canvas, no heavy container box) */}
        <div className="flex flex-col justify-between space-y-6 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-5">
            <div>
              <p className="text-xs font-bold tracking-widest text-fjord uppercase">
                {isArabic
                  ? 'العقارات المميزة المختارة'
                  : 'FEATURED SHORTLISTED RESIDENCES'}
              </p>
              <h2 className="mt-1 font-display text-2xl font-medium text-ink sm:text-3xl">
                {isArabic
                  ? 'المنازل المختارة للمقارنة'
                  : 'Top Candidates for Comparison'}
              </h2>
            </div>
            <Link
              href={`/${locale}/shortlist`}
              className="flex items-center gap-1 text-xs font-semibold text-fjord hover:underline"
            >
              <span>{isArabic ? 'عرض الكل (4)' : 'View All 4 Candidates'}</span>
              <ChevronRight className="size-4" />
            </Link>
          </div>

          {/* Property Cards Preview Grid */}
          <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-2">
            {activeShortlist.map((prop) => (
              <Link
                key={prop.id}
                href={`/${locale}/homes/${prop.slug}`}
                className="group hover:shadow-floating relative flex flex-col overflow-hidden rounded-none border border-border/40 bg-surface/80 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <Image
                    src={prop.images[0] || prop.thumbnail || ''}
                    alt={prop.title_en}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="shadow-subtle absolute top-4 left-4 rounded-none border border-border/40 bg-surface/90 px-3.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-md">
                    {prop.community}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-display text-xl font-bold text-ink">
                        AED {(prop.price / 1000000).toFixed(2)}M
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-verified-soft px-2.5 py-0.5 text-[10px] font-medium text-verified"
                      >
                        <ShieldCheck className="mr-1 size-3" />
                        DLD Verified
                      </Badge>
                    </div>
                    <p className="mt-2 text-base font-semibold text-ink transition-colors group-hover:text-fjord">
                      {isArabic ? prop.title_ar : prop.title_en}
                    </p>
                    <p className="mt-1 text-xs font-light text-muted-foreground">
                      {prop.bedrooms} Beds · {prop.bathrooms} Baths ·{' '}
                      {(prop.area_sqft || 0).toLocaleString()} sqft
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs font-semibold text-fjord">
                    <span>
                      {isArabic ? 'فتح في مساحة العمل' : 'Open in Workspace'}
                    </span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-verified" />
              <span>
                {isArabic
                  ? 'تم التحقق من أسعار العقارات وسندات الملكية مع دائرة الأراضي'
                  : 'Title deeds & asking prices cross-referenced with live DLD Rest API'}
              </span>
            </div>
            <Link
              href={`/${locale}/decision-lab`}
              className="shadow-subtle inline-flex items-center gap-2 rounded-none border border-border/60 bg-surface px-5 py-2.5 text-xs font-semibold text-ink transition-all hover:border-fjord/40 hover:bg-surface-subtle"
            >
              <span>
                {isArabic ? 'فتح مختبر المقارنة' : 'Open Decision Lab Matrix'}
              </span>
              <ArrowRight className="size-3.5 text-fjord" />
            </Link>
          </div>
        </div>

        {/* Right Column (1/3 width) — Strict Lagom Priority Milestone Action Card */}
        <div className="group/milestone relative flex flex-col justify-between overflow-hidden rounded-none border border-border/40 bg-surface-subtle p-8 shadow-sm lg:col-span-1">

          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <span className="text-xs font-bold tracking-widest text-ink uppercase">
                {isArabic ? 'الإجراء المطلوب' : 'PRIORITY MILESTONE'}
              </span>
              <span className="rounded-none border border-border/60 bg-surface px-3 py-1 text-[10px] font-bold tracking-wider text-ink uppercase shadow-xs">
                {isArabic ? 'أولوية قصوى' : 'URGENT'}
              </span>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-display text-2xl leading-snug font-medium text-ink">
                  {isArabic
                    ? 'تقديم نموذج عقد MOU (Form F)'
                    : 'Submit Formal MOU Form F'}
                </h3>
                <p className="mt-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Sky Collection Penthouse · Downtown Dubai
                </p>
              </div>

              {/* Strict Grid Ledger Display */}
              <div className="grid grid-cols-1 divide-y divide-border/40 border border-border/40 bg-surface text-sm shadow-xs">
                <div className="flex items-center justify-between p-4">
                  <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    {isArabic ? 'قيمة العرض:' : 'Offer Valuation'}
                  </span>
                  <span className="font-display text-base font-bold text-ink">
                    AED 18,250,000
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    {isArabic ? 'الموعد النهائي:' : 'Due Milestone'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink uppercase">
                    <Clock className="size-3.5" />
                    <span>July 30</span>
                  </span>
                </div>
              </div>

              {/* Strict Escrow Badge */}
              <div className="shadow-subtle space-y-1 rounded-none border-y border-r border-l-4 border-y-border/40 border-r-border/40 border-l-verified bg-surface p-4">
                <p className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-ink uppercase">
                  <CheckCircle2 className="size-4 shrink-0 text-verified" />
                  {isArabic ? 'حساب الضمان محمي' : 'Escrow Verified'}
                </p>
                <p className="text-[11px] leading-relaxed font-medium text-muted-foreground">
                  {isArabic
                    ? 'تم توثيق رقم حساب الضمان في ريرا ومراجعة بنود العقد.'
                    : 'RERA Escrow Account #8992-1 active under Emirates NBD Trustee.'}
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10">
            <Link href={`/${locale}/tasks`} className="block w-full">
              <Button className="hover:shadow-elevated w-full justify-between rounded-none bg-ink py-6 text-sm font-bold tracking-wider text-surface uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink">
                <span>
                  {isArabic ? 'فتح لوحة المعاملات' : 'Open Pipeline Board'}
                </span>
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. Institutional Intelligence & Live Capital Flow (Powered by @efferd/dashboard-5) ── */}
      <section className="space-y-10 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <p className="text-xs font-bold tracking-widest text-fjord uppercase">
              {isArabic
                ? 'تحليلات تدفق رأس المال المباشر'
                : 'LIVE CAPITAL FLOW & DEMOGRAPHICS'}
            </p>
            <h2 className="mt-1 font-display text-2xl font-medium text-ink sm:text-3xl">
              {isArabic
                ? 'إحصاءات المشترين الدوليين المباشرة'
                : 'International Capital Inflow & Buyer Analytics'}
            </h2>
          </div>
          <Badge
            variant="outline"
            className="rounded-none border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
          >
            <span className="mr-1.5 size-2 animate-ping rounded-none bg-emerald-500" />
            {isArabic ? 'تحديث حي' : 'Live Data Stream Active'}
          </Badge>
        </div>

        {/* Efferd Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <VisitorsChart />
          <OnlineNow />
          <TopCountries />
          <AudienceMix />
        </div>
      </section>

      {/* ── 5. Clean Ledger Verification & Escrow Activity Log ── */}
      <section className="space-y-10 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <p className="text-xs font-bold tracking-widest text-fjord uppercase">
              {isArabic ? 'سجل التدقيق والتحقق' : 'REAL-TIME LEDGER'}
            </p>
            <h2 className="mt-1 font-display text-2xl font-medium text-ink sm:text-3xl">
              {isArabic
                ? 'نشاط التدقيق والتحقق المباشر'
                : 'DLD & Escrow Verification Activity'}
            </h2>
          </div>
          <Link href={`/${locale}/documents`}>
            <Button
              variant="outline"
              size="sm"
              className="rounded-none border-border/60 px-4 py-2 text-xs font-semibold hover:border-fjord/40"
            >
              {isArabic ? 'غرفة المستندات' : 'Document Vault'}
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-border/40 rounded-none border border-border/40 bg-surface/60 px-6 backdrop-blur-md sm:px-8">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-start gap-4">
                <div className="shadow-subtle mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-none border border-border/40 bg-surface text-fjord">
                  <FileText className="size-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{log.title}</p>
                  <p className="mt-0.5 text-xs font-light text-muted-foreground">
                    {log.property} ·{' '}
                    <span className="font-medium text-ink">
                      {log.community}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:self-center">
                <Badge
                  variant="secondary"
                  className="shadow-subtle border border-border/40 bg-surface px-3 py-1 text-xs font-medium text-ink"
                >
                  {log.status}
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  {log.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
