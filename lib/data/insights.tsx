import * as React from 'react';
import {
  TrendingUp,
  Newspaper,
  LineChart,
  Target,
  Lightbulb,
  PieChart,
  Landmark,
  Key,
  Globe2,
} from 'lucide-react';

export interface Insight {
  id: number;
  title: string;
  description: string;
  category: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image?: string;
  icon?: React.ReactNode;
  bentoSpan?: string;
}

export function getInsightsData(locale: string): {
  heroInsight: Insight;
  insights: Insight[];
} {
  const isArabic = locale === 'ar';

  const heroInsight = {
    id: 1,
    title: isArabic
      ? 'تقرير سوق العقارات: الربع الثالث 2026'
      : 'Q3 2026 Dubai Real Estate Market Report',
    description: isArabic
      ? 'تحليل شامل لاتجاهات الأسعار وحجم المعاملات في جميع أنحاء دبي.'
      : 'A comprehensive analysis of price trends and transaction volumes across Dubai.',
    category: isArabic ? 'تقرير السوق' : 'Market Report',
    content: isArabic
      ? 'هذا هو نص المقال التفصيلي الذي يغطي تحليل السوق للربع الثالث من عام 2026 في دبي. تستمر دبي في جذب المستثمرين العالميين مع زيادة الطلب على العقارات الفاخرة بشكل غير مسبوق...'
      : 'This is the detailed article body covering the Q3 2026 market analysis in Dubai. It highlights the continued growth in prime residential areas and the surge in off-plan investments from international buyers.',
    date: 'Oct 15, 2026',
    author: isArabic ? 'فريق الأبحاث' : 'Research Team',
    readTime: '8 min read',
    image: '/images/hero/insights-hero.jpg',
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
      image: '/images/properties/property-villa.jpg',
      bentoSpan: 'col-span-1 md:col-span-2 row-span-2',
      content: isArabic
        ? 'تشهد العقارات الفائقة الفخامة في دبي طفرة هائلة...'
        : 'Ultra-luxury properties in Dubai have seen a massive surge in demand due to an influx of high-net-worth individuals relocating to the city...',
      date: 'Oct 12, 2026',
      author: isArabic ? 'سارة أحمد' : 'Sarah Ahmed',
      readTime: '5 min read',
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
      content: isArabic
        ? 'تفاصيل عن الاستثمار...'
        : 'Off-plan investments offer excellent capital appreciation if chosen wisely...',
      date: 'Oct 10, 2026',
      author: 'David Chen',
      readTime: '6 min read',
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
      image: '/images/properties/property-penthouse.jpg',
      bentoSpan: 'col-span-1 md:col-span-2 row-span-1',
      content: isArabic
        ? 'معلومات التأشيرة الذهبية...'
        : 'The Golden Visa has been a game-changer for Dubai real estate...',
      date: 'Oct 8, 2026',
      author: 'Elena Rostova',
      readTime: '7 min read',
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
      content: isArabic
        ? 'تحليل المجمعات...'
        : 'JVC, Business Bay, and Arjan lead the charts in terms of pure rental yields...',
      date: 'Oct 5, 2026',
      author: 'Omar Al Fayed',
      readTime: '4 min read',
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
      content: isArabic
        ? 'دليل RERA...'
        : 'Understanding the rental index and the rights of landlords and tenants is crucial...',
      date: 'Oct 1, 2026',
      author: 'Legal Team',
      readTime: '10 min read',
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
      image: '/images/properties/property-apartment.jpg',
      bentoSpan: 'col-span-1 md:col-span-2 row-span-2',
      content: isArabic
        ? 'المنازل الذكية...'
        : 'Sustainability is no longer a buzzword, it is a primary requirement for new buyers...',
      date: 'Sep 28, 2026',
      author: 'Maya Singh',
      readTime: '5 min read',
    },
    {
      id: 8,
      title: isArabic ? 'تمويل عقارك في دبي' : 'Financing Your Dubai Property',
      description: isArabic
        ? 'مقارنة بين خيارات الرهن العقاري وخطط الدفع للمشترين المحليين والدوليين.'
        : 'Comparing mortgage options and payment plans for local and international buyers.',
      category: isArabic ? 'مالي' : 'Finance',
      icon: <Key className="size-5" />,
      bentoSpan: 'col-span-1 row-span-1',
      content: isArabic
        ? 'خيارات التمويل...'
        : 'Interest rates are stabilizing, making mortgages attractive once again...',
      date: 'Sep 25, 2026',
      author: 'Finance Desk',
      readTime: '6 min read',
    },
    {
      id: 9,
      title: isArabic
        ? 'جاذبية دبي للمستثمرين العالميين'
        : "Dubai's Appeal to Global Investors",
      description: isArabic
        ? 'تحليل لتدفقات الاستثمار الأجنبي المباشر وتأثير الأحداث الجيوسياسية.'
        : 'An analysis of FDI inflows and the impact of geopolitical events on the local market.',
      category: isArabic ? 'عالمي' : 'Global',
      icon: <Globe2 className="size-5" />,
      image: '/images/hero/insights-hero.jpg',
      bentoSpan: 'col-span-1 md:col-span-3 row-span-1',
      content: isArabic
        ? 'تحليل الاستثمار...'
        : 'Safe haven status continues to drive European and Asian capital into Dubai...',
      date: 'Sep 22, 2026',
      author: 'Research Team',
      readTime: '8 min read',
    },
    {
      id: 10,
      title: isArabic ? 'توقعات السوق 2027' : 'Market Forecast 2027',
      description: isArabic
        ? 'توقعات الخبراء بشأن مسار الأسعار والمشاريع القادمة.'
        : 'Expert predictions on price trajectories and upcoming mega-projects.',
      category: isArabic ? 'توقعات' : 'Forecast',
      icon: <LineChart className="size-5" />,
      bentoSpan: 'col-span-1 row-span-1',
      content: isArabic
        ? 'توقعات السوق لعام 2027...'
        : '2027 is projected to see a stabilization in luxury prices but growth in affordable segments...',
      date: 'Sep 15, 2026',
      author: 'Research Team',
      readTime: '6 min read',
    },
  ];

  return { heroInsight, insights };
}
