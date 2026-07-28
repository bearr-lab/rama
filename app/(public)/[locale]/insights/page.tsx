import { InsightsClient } from '@/components/insights/insights-client';
import { TrendingUp, BarChart3, Newspaper, LineChart, Target, Lightbulb, PieChart, Landmark, Key, Globe2 } from 'lucide-react';

export const revalidate = 3600;

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === 'ar';

  const insights = [
    {
      id: 1,
      title: isArabic
        ? 'تقرير سوق العقارات: الربع الثالث 2026'
        : 'Q3 2026 Dubai Real Estate Market Report',
      description: isArabic
        ? 'تحليل شامل لاتجاهات الأسعار وحجم المعاملات في جميع أنحاء دبي.'
        : 'A comprehensive analysis of price trends and transaction volumes across Dubai.',
      category: isArabic ? 'تقرير السوق' : 'Market Report',
      icon: <BarChart3 className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000', // Skyline
      bentoSpan: 'col-span-1 md:col-span-3 row-span-2', // Not used since it's hero, but just in case
    },
    {
      id: 2,
      title: isArabic
        ? 'لماذا ترتفع أسعار الفيلات الفاخرة؟'
        : 'Why Luxury Villa Prices Are Surging',
      description: isArabic
        ? 'نظرة عميقة على العوامل التي تدفع الطلب غير المسبوق على العقارات الفاخرة.'
        : 'A deep dive into the factors driving unprecedented demand for ultra-luxury properties.',
      category: isArabic ? 'تحليل' : 'Analysis',
      icon: <TrendingUp className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200', // Luxury Villa
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
      icon: <Newspaper className="h-5 w-5" />,
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
      icon: <Target className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=1200', // Global
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
      icon: <PieChart className="h-5 w-5" />,
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
      icon: <Landmark className="h-5 w-5" />,
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
      icon: <Lightbulb className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1200', // Tech/Circuit
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
      icon: <Key className="h-5 w-5" />,
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
      icon: <Globe2 className="h-5 w-5" />,
      image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1200', // Dubai Downtown
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
      icon: <LineChart className="h-5 w-5" />,
      bentoSpan: 'col-span-1 row-span-1',
    },
  ];

  return <InsightsClient insights={insights} locale={locale} />;
}
