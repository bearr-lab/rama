import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Heart,
  CheckSquare,
  FolderOpen,
  Sparkles,
  Compass,
  Building2,
  FileText,
  TrendingUp,
  Clock,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Ticker } from '@/components/kibo/ticker';
import { Marquee, PartnerCard } from '@/components/kibo/marquee';
import { VerticalPartnerDeck } from '@/components/kibo/vertical-partner-deck';
import { MOCK_PROPERTIES } from '@/lib/mock-properties';
import { OnlineNow } from '@/components/online-now';
import { TopCountries } from '@/components/top-countries';
import { AudienceMix } from '@/components/audience-mix';
import { VisitorsChart } from '@/components/visitors-chart';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { BorderBeam } from '@/components/magicui/border-beam';
import { BlurFade } from '@/components/magicui/blur-fade';
import { AnimatedShinyText } from '@/components/magicui/shiny-text';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { CapitalGlobe } from '@/components/magicui/capital-globe';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const activeShortlist = MOCK_PROPERTIES.slice(0, 2);

  const recentLogs = [
    {
      id: 'log-101',
      title: isArabic ? 'تدقيق عقد الشراء (Form F)' : 'MOU Form F Title Deed Audit',
      property: 'Sky Collection Penthouse',
      community: 'Downtown Dubai',
      status: isArabic ? 'مكتمل وموثق' : 'Verified & Cleared',
      timestamp: 'Today, 09:42 AM',
      type: 'DLD API',
    },
    {
      id: 'log-102',
      title: isArabic ? 'إيداع الدفعة في حساب الضمان' : 'Escrow Deposit Milestone Disbursed',
      property: 'Modern Beachfront Villa',
      community: 'Palm Jumeirah',
      status: isArabic ? 'ممتثل لـ RERA' : 'RERA Compliant',
      timestamp: 'Yesterday, 04:15 PM',
      type: 'Escrow Trustee',
    },
    {
      id: 'log-103',
      title: isArabic ? 'تحديث نموذج توقعات صافي العائد' : '5-Year Net Yield Model Updated',
      property: 'Emirates Hills Golf Estate',
      community: 'Emirates Hills',
      status: isArabic ? 'تقدير +8.4%' : '+8.4% Appreciation',
      timestamp: 'July 24, 2026',
      type: 'AI RAG Engine',
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 p-6 sm:gap-20 lg:p-12">
      {/* ── 1. Serene Executive Greeting (Decluttered & Expansive) ── */}
      <header className="flex flex-col justify-between gap-6 border-b border-border/30 pb-10 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <AnimatedShinyText className="font-semibold text-emerald-700 dark:text-emerald-300">
              {isArabic ? 'سجل دبي العقاري مباشر' : 'DLD & RERA Live Sync Active'}
            </AnimatedShinyText>
          </div>
          <h1 className="font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {isArabic ? 'صباح الخير، المستثمر' : 'Good morning.'}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-light text-muted-foreground leading-relaxed sm:text-lg">
            {isArabic
              ? 'مساحة اتخاذ القرار الخاصة بك نشطة. لديك 4 عقارات في القائمة المختصرة ومهمتان عاجلتان في صفقات اليوم.'
              : 'Your executive decision workspace is active with 4 shortlisted luxury assets and 2 priority deal milestones.'}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Link href={`/${locale}/homes`}>
            <ShimmerButton className="px-6 py-3.5 text-xs font-semibold">
              <Compass className="h-4 w-4 mr-2" />
              <span>{isArabic ? 'استكشف العقارات' : 'Launch Discovery'}</span>
            </ShimmerButton>
          </Link>
        </div>
      </header>

      {/* ── 2. Minimalist Lagom Metric Strip (With Magic UI NumberTicker & BlurFade) ── */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Shortlist Metric */}
        <BlurFade delay={0.1}>
          <Link
            href={`/${locale}/shortlist`}
            className="group relative flex flex-col justify-between rounded-3xl bg-surface/60 p-7 backdrop-blur-md transition-all duration-300 hover:bg-surface hover:shadow-floating border border-border/40 hover:border-fjord/30 h-full"
          >
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
                {isArabic ? 'عقارات مختارة' : 'Saved Shortlist'}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-fjord" />
            </div>
            <div className="mt-6">
              <p className="font-display text-4xl font-semibold text-ink">
                <NumberTicker value={4} />
              </p>
              <p className="mt-1 text-xs font-light text-muted-foreground">
                {isArabic ? 'متوسط السعر 18.25M درهم' : 'AED 18.25M avg valuation'}
              </p>
            </div>
          </Link>
        </BlurFade>

        {/* Pipeline Metric */}
        <BlurFade delay={0.2}>
          <Link
            href={`/${locale}/tasks`}
            className="group relative flex flex-col justify-between rounded-3xl bg-surface/60 p-7 backdrop-blur-md transition-all duration-300 hover:bg-surface hover:shadow-floating border border-border/40 hover:border-fjord/30 h-full"
          >
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
                {isArabic ? 'مهام صفقات نشطة' : 'Pipeline Tasks'}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-fjord" />
            </div>
            <div className="mt-6">
              <p className="font-display text-4xl font-semibold text-ink">
                <NumberTicker value={5} />
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                <Clock className="h-3.5 w-3.5" />
                <span>{isArabic ? '1 مهمة عاجلة في مرحلة MOU' : '1 priority in Form F stage'}</span>
              </p>
            </div>
          </Link>
        </BlurFade>

        {/* Tracked Assets Metric */}
        <BlurFade delay={0.3}>
          <Link
            href={`/${locale}/portfolio`}
            className="group relative flex flex-col justify-between rounded-3xl bg-surface/60 p-7 backdrop-blur-md transition-all duration-300 hover:bg-surface hover:shadow-floating border border-border/40 hover:border-fjord/30 h-full"
          >
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
                {isArabic ? 'قيمة الأصول المحفوظة' : 'Tracked Assets'}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-fjord" />
            </div>
            <div className="mt-6">
              <p className="font-display text-4xl font-semibold text-ink flex items-baseline">
                <span className="text-xl font-sans mr-1">AED</span>
                <NumberTicker value={42.5} decimalPlaces={1} suffix="M" />
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>{isArabic ? '+8.4% نمو القيمة' : '+8.4% DLD gain'}</span>
              </p>
            </div>
          </Link>
        </BlurFade>

        {/* AI Concierge Metric */}
        <BlurFade delay={0.4}>
          <Link
            href={`/${locale}/advisor`}
            className="group relative flex flex-col justify-between rounded-3xl bg-surface/60 p-7 backdrop-blur-md transition-all duration-300 hover:bg-surface hover:shadow-floating border border-border/40 hover:border-fjord/30 h-full"
          >
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-bold uppercase tracking-widest text-fjord">
                {isArabic ? 'مستشار الذكاء الاصطناعي' : 'AI Concierge'}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-fjord" />
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <p className="font-display text-3xl font-semibold text-ink">Active</p>
              </div>
              <p className="mt-1 text-xs font-light text-muted-foreground">
                {isArabic ? 'ربط مباشر لقواعد DLD' : 'Live DLD RAG intelligence'}
              </p>
            </div>
          </Link>
        </BlurFade>
      </section>

      {/* ── 3. Main Workspace Grid: Shortlisted Candidates & Priority Milestone ── */}
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left Column (2/3 width) — Shortlisted Residence Previews (Clean canvas, no heavy container box) */}
        <div className="flex flex-col justify-between lg:col-span-2 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-5">
            <div>
              <p className="text-xs font-bold tracking-widest text-fjord uppercase">
                {isArabic ? 'العقارات المميزة المختارة' : 'FEATURED SHORTLISTED RESIDENCES'}
              </p>
              <h2 className="font-display text-2xl font-medium text-ink mt-1 sm:text-3xl">
                {isArabic ? 'المنازل المختارة للمقارنة' : 'Top Candidates for Comparison'}
              </h2>
            </div>
            <Link
              href={`/${locale}/shortlist`}
              className="text-xs font-semibold text-fjord hover:underline flex items-center gap-1"
            >
              <span>{isArabic ? 'عرض الكل (4)' : 'View All 4 Candidates'}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Property Cards Preview Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-2">
            {activeShortlist.map((prop) => (
              <Link
                key={prop.id}
                href={`/${locale}/homes/${prop.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-surface/80 border border-border/40 transition-all duration-500 hover:shadow-floating hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={prop.images[0] || prop.thumbnail || ''}
                    alt={prop.title_en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-surface/90 px-3.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-md border border-border/40 shadow-xs">
                    {prop.community}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-display text-xl font-bold text-ink">
                        AED {(prop.price / 1000000).toFixed(2)}M
                      </p>
                      <Badge variant="secondary" className="bg-verified-soft text-verified font-medium text-[10px] px-2.5 py-0.5">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        DLD Verified
                      </Badge>
                    </div>
                    <p className="text-base font-semibold text-ink mt-2 group-hover:text-fjord transition-colors">
                      {isArabic ? prop.title_ar : prop.title_en}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      {prop.bedrooms} Beds · {prop.bathrooms} Baths · {(prop.area_sqft || 0).toLocaleString()} sqft
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs font-semibold text-fjord">
                    <span>{isArabic ? 'فتح في مساحة العمل' : 'Open in Workspace'}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-verified shrink-0" />
              <span>
                {isArabic
                  ? 'تم التحقق من أسعار العقارات وسندات الملكية مع دائرة الأراضي'
                  : 'Title deeds & asking prices cross-referenced with live DLD Rest API'}
              </span>
            </div>
            <Link
              href={`/${locale}/decision-lab`}
              className="inline-flex items-center gap-2 rounded-2xl bg-surface px-5 py-2.5 text-xs font-semibold text-ink border border-border/60 hover:border-fjord/40 hover:bg-surface-subtle transition-all shadow-2xs"
            >
              <span>{isArabic ? 'فتح مختبر المقارنة' : 'Open Decision Lab Matrix'}</span>
              <ArrowRight className="h-3.5 w-3.5 text-fjord" />
            </Link>
          </div>
        </div>

        {/* Right Column (1/3 width) — Serene Priority Milestone Action Card (No Nested Box-in-a-Box Clutter!) */}
        <div className="relative flex flex-col justify-between rounded-3xl bg-surface/80 p-8 border border-border/40 shadow-subtle lg:col-span-1 overflow-hidden">
          <BorderBeam size={250} duration={12} delay={0} colorFrom="#1b4965" colorTo="#5fa8d3" />
          <div>
            <div className="flex items-center justify-between border-b border-border/40 pb-5">
              <span className="text-xs font-bold tracking-widest text-fjord uppercase">
                {isArabic ? 'الإجراء المطلوب' : 'PRIORITY MILESTONE'}
              </span>
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                {isArabic ? 'أولوية قصوى' : 'High Priority'}
              </span>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-display text-2xl font-medium text-ink leading-snug">
                  {isArabic ? 'تقديم نموذج عقد MOU (Form F)' : 'Submit Formal MOU Form F'}
                </h3>
                <p className="mt-1 text-xs font-light text-muted-foreground">
                  Sky Collection Penthouse · Downtown Dubai
                </p>
              </div>

              {/* Clean Ledger Display without nested borders */}
              <div className="space-y-3.5 py-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-light">{isArabic ? 'قيمة العرض:' : 'Offer Valuation:'}</span>
                  <span className="font-display text-base font-bold text-ink">AED 18,250,000</span>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-border/40 pt-3.5">
                  <span className="text-muted-foreground font-light">{isArabic ? 'الموعد النهائي:' : 'Due Milestone:'}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400 text-xs">
                    <Clock className="h-3.5 w-3.5" />
                    <span>July 30 · Urgent</span>
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-verified-soft/50 p-4 text-xs text-muted-foreground border border-verified/20 space-y-1">
                <p className="font-semibold text-verified flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {isArabic ? 'حساب الضمان محمي' : 'Escrow Account Verified'}
                </p>
                <p className="text-[11px] font-light leading-relaxed">
                  {isArabic
                    ? 'تم توثيق رقم حساب الضمان في ريرا ومراجعة بنود العقد.'
                    : 'RERA Escrow Account #8992-1 active under Emirates NBD Trustee.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border/40">
            <Link href={`/${locale}/tasks`} className="block w-full">
              <Button className="w-full justify-center rounded-2xl bg-fjord py-6 text-sm font-semibold text-white hover:bg-fjord-hover shadow-floating transition-all">
                <span>{isArabic ? 'فتح لوحة المعاملات' : 'Open Deal Pipeline Board'}</span>
                <ArrowRight className="ms-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. Institutional Intelligence & Live Capital Flow (Powered by @efferd/dashboard-5) ── */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <p className="text-xs font-bold tracking-widest text-fjord uppercase">
              {isArabic ? 'تحليلات تدفق رأس المال المباشر' : 'LIVE CAPITAL FLOW & DEMOGRAPHICS'}
            </p>
            <h2 className="font-display text-2xl font-medium text-ink mt-1 sm:text-3xl">
              {isArabic ? 'إحصاءات المشترين الدوليين المباشرة' : 'International Capital Inflow & Buyer Analytics'}
            </h2>
          </div>
          <Badge variant="outline" className="rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping mr-1.5" />
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
      <section className="space-y-6 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <p className="text-xs font-bold tracking-widest text-fjord uppercase">
              {isArabic ? 'سجل التدقيق والتحقق' : 'REAL-TIME LEDGER'}
            </p>
            <h2 className="font-display text-2xl font-medium text-ink mt-1 sm:text-3xl">
              {isArabic ? 'نشاط التدقيق والتحقق المباشر' : 'DLD & Escrow Verification Activity'}
            </h2>
          </div>
          <Link href={`/${locale}/documents`}>
            <Button variant="outline" size="sm" className="rounded-2xl text-xs font-semibold px-4 py-2 border-border/60 hover:border-fjord/40">
              {isArabic ? 'غرفة المستندات' : 'Document Vault'}
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-border/40 rounded-3xl bg-surface/60 px-6 sm:px-8 border border-border/40 backdrop-blur-md">
          {recentLogs.map((log) => (
            <div key={log.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-surface text-fjord border border-border/40 shadow-2xs">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{log.title}</p>
                  <p className="text-xs text-muted-foreground font-light mt-0.5">
                    {log.property} · <span className="text-ink font-medium">{log.community}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:self-center">
                <Badge variant="secondary" className="bg-surface text-ink font-medium text-xs px-3 py-1 border border-border/40 shadow-2xs">
                  {log.status}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Institutional Banking & Developer Partners (Vertical Draggable & Scrollable Deck) ── */}
      <section className="space-y-6 pt-6 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-fjord">
            {isArabic ? 'شبكة الضمان المؤسسية' : 'RERA ECOSYSTEM'}
          </span>
          <h2 className="mt-1 font-display text-2xl font-medium text-ink sm:text-3xl">
            {isArabic ? 'شركاء التطوير والبنك المعتمدون في دبي' : 'Verified Institutional Banking & Developer Network'}
          </h2>
        </div>
        <VerticalPartnerDeck isArabic={isArabic} />
      </section>
    </div>
  );
}
