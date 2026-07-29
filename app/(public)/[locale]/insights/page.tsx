import { InsightsClient } from '@/components/insights/insights-client';
import { PageHeader } from '@/components/layout/page-header';
import { TrendingUp, BarChart3, Newspaper, LineChart, Target, Lightbulb, PieChart, Landmark, Key, Globe2 } from 'lucide-react';
import { getHeroImage } from '@/lib/pexels';
import Link from 'next/link';
import { MagneticButton } from '@/components/ui/magnetic-button';

export const revalidate = 3600;

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  
  const heroImage = await getHeroImage('Dubai abstract architecture close up cinematic 8k', '/images/hero/insights.png');

  const heroInsight = {
    id: 1,
    title: isArabic
      ? 'تقرير سوق العقارات: الربع الثالث 2026'
      : 'Q3 2026 Dubai Real Estate Market Report',
    description: isArabic
      ? 'تحليل شامل لاتجاهات الأسعار وحجم المعاملات في جميع أنحاء دبي.'
      : 'A comprehensive analysis of price trends and transaction volumes across Dubai.',
    category: isArabic ? 'تقرير السوق' : 'Market Report',
  };

  const insights = [
    {
      id: 2,
      title: isArabic
        ? 'لماذا ترتفع أسعار الفيلات الفاخرة؟'
        : 'Why Luxury Villa Prices Are Surging',
      description: isArabic
        ? 'نظرة عميقة على العوامل التي تدفع الطلب غير المسبوق على العقارات الفاخرة.'
        : 'A deep dive into the factors driving unprecedented demand for ultra-luxury properties.',
      category: isArabic ? 'تحليل' : 'Analysis',
      icon: <TrendingUp className="size-5" />,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200',
      bentoSpan: 'col-span-1 md:col-span-2 row-span-2',
    },
    {
      id: 3,
      title: isArabic
        ? 'دليل المستثمر: العقارات قيد الإنشاء'
        : "Investor's Guide to Off-Plan Properties",
      description: isArabic
        ? 'كل ما تحتاج لمعرفته قبل الاستثمار في مشاريع دبي قيد الإنشاء.'
        : "Everything you need to know before investing in Dubai's off-plan developments.",
      category: isArabic ? 'دليل' : 'Guide',
      icon: <Newspaper className="size-5" />,
      bentoSpan: 'col-span-1 row-span-1',
    },
    {
      id: 4,
      title: isArabic
        ? 'تأثير التأشيرة الذهبية على العقارات'
        : 'The Golden Visa Impact on Real Estate',
      description: isArabic
        ? 'كيف تعيد تأشيرة الإقامة طويلة الأمد تشكيل التركيبة السكانية لمشتري العقارات.'
        : 'How the long-term residency visa is reshaping the demographics of property buyers.',
      category: isArabic ? 'سياسة' : 'Policy',
      icon: <Target className="size-5" />,
      image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=1200',
      bentoSpan: 'col-span-1 md:col-span-2 row-span-1',
    },
    {
      id: 5,
      title: isArabic
        ? 'أفضل 5 مجمعات سكنية لعائد الاستثمار'
        : 'Top 5 Communities for ROI',
      description: isArabic
        ? 'تحليل مبني على البيانات لتحديد المناطق ذات أعلى عوائد الإيجار.'
        : 'Data-driven analysis identifying the neighborhoods with the highest rental yields.',
      category: isArabic ? 'استثمار' : 'Investment',
      icon: <PieChart className="size-5" />,
      bentoSpan: 'col-span-1 row-span-1',
    },
    {
      id: 6,
      title: isArabic
        ? 'التنقل في لوائح مؤسسة التنظيم العقاري'
        : 'Navigating RERA Regulations',
      description: isArabic
        ? 'دليل مبسط لفهم قوانين حماية المستأجر والمشتري في دبي.'
        : 'A simplified guide to understanding tenant and buyer protection laws in Dubai.',
      category: isArabic ? 'قانوني' : 'Legal',
      icon: <Landmark className="size-5" />,
      bentoSpan: 'col-span-1 row-span-1',
    },
    {
      id: 7,
      title: isArabic
        ? 'منازل ذكية ومستدامة: المستقبل'
        : 'Smart & Sustainable Homes: The Future',
      description: isArabic
        ? 'كيف يطالب المشترون بشكل متزايد بميزات صديقة للبيئة ومتكاملة تقنياً.'
        : 'How buyers are increasingly demanding eco-friendly and tech-integrated features.',
      category: isArabic ? 'اتجاهات' : 'Trends',
      icon: <Lightbulb className="size-5" />,
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1200',
      bentoSpan: 'col-span-1 md:col-span-2 row-span-2',
    },
    {
      id: 8,
      title: isArabic
        ? 'تمويل عقارك في دبي'
        : 'Financing Your Dubai Property',
      description: isArabic
        ? 'مقارنة بين خيارات الرهن العقاري وخطط الدفع للمشترين المحليين والدوليين.'
        : 'Comparing mortgage options and payment plans for local and international buyers.',
      category: isArabic ? 'مالي' : 'Finance',
      icon: <Key className="size-5" />,
      bentoSpan: 'col-span-1 row-span-1',
    },
    {
      id: 9,
      title: isArabic
        ? 'جاذبية دبي للمستثمرين العالميين'
        : 'Dubai\'s Appeal to Global Investors',
      description: isArabic
        ? 'تحليل لتدفقات الاستثمار الأجنبي المباشر وتأثير الأحداث الجيوسياسية.'
        : 'An analysis of FDI inflows and the impact of geopolitical events on the local market.',
      category: isArabic ? 'عالمي' : 'Global',
      icon: <Globe2 className="size-5" />,
      image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1200',
      bentoSpan: 'col-span-1 md:col-span-3 row-span-1',
    },
    {
      id: 10,
      title: isArabic
        ? 'توقعات السوق 2027'
        : 'Market Forecast 2027',
      description: isArabic
        ? 'توقعات الخبراء بشأن مسار الأسعار والمشاريع القادمة.'
        : 'Expert predictions on price trajectories and upcoming mega-projects.',
      category: isArabic ? 'توقعات' : 'Forecast',
      icon: <LineChart className="size-5" />,
      bentoSpan: 'col-span-1 row-span-1',
    },
  ];

  return (
    <>
      {/* Server-rendered unified hero */}
      <PageHeader
        title={heroInsight.title}
        description={heroInsight.description}
        backgroundImage={heroImage}
        variant="editorial"
        badge={
          <>
            <span className="flex size-2 animate-pulse rounded-full bg-emerald-400" />
            <span>{isArabic ? 'تقرير مميز' : 'Featured Report'}</span>
          </>
        }
      >
        <MagneticButton
          render={
            <Link
              href={`/${locale}/insights/${heroInsight.id}`}
              className="inline-flex h-9 items-center justify-center rounded-sm bg-white px-6 text-[11px] font-bold tracking-widest text-black uppercase transition-colors hover:bg-white/90"
            >
              {isArabic ? 'قراءة التقرير الكامل' : 'Read Full Report'}
            </Link>
          }
        />
      </PageHeader>

      {/* Client-rendered interactive grid */}
      <InsightsClient insights={insights} locale={locale} />
    </>
  );
}
