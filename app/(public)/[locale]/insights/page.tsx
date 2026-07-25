import { EmptyState } from "@/components/ui/empty-state"
import { TrendingUp, BarChart3, Newspaper, LineChart } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { Container } from "@/components/layout/container"

export const revalidate = 3600

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isArabic = locale === "ar"

  const insights = [
    {
      id: 1,
      title: isArabic ? "تقرير سوق العقارات: الربع الثالث 2026" : "Q3 2026 Dubai Real Estate Market Report",
      description: isArabic 
        ? "تحليل شامل لاتجاهات الأسعار وحجم المعاملات في جميع أنحاء دبي." 
        : "A comprehensive analysis of price trends and transaction volumes across Dubai.",
      category: isArabic ? "تقرير السوق" : "Market Report",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 2,
      title: isArabic ? "لماذا ترتفع أسعار الفيلات الفاخرة؟" : "Why Luxury Villa Prices Are Surging",
      description: isArabic
        ? "نظرة عميقة على العوامل التي تدفع الطلب غير المسبوق على العقارات الفاخرة."
        : "A deep dive into the factors driving unprecedented demand for ultra-luxury properties.",
      category: isArabic ? "تحليل" : "Analysis",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 3,
      title: isArabic ? "دليل المستثمر: العقارات قيد الإنشاء" : "Investor's Guide to Off-Plan Properties",
      description: isArabic
        ? "كل ما تحتاج لمعرفته قبل الاستثمار في مشاريع دبي قيد الإنشاء."
        : "Everything you need to know before investing in Dubai's off-plan developments.",
      category: isArabic ? "دليل" : "Guide",
      icon: <Newspaper className="w-5 h-5" />
    }
  ]

  return (
    <>
      <PageHeader 
        title={isArabic ? "رؤى السوق" : "Market Insights"}
        description={isArabic 
          ? "ابق على اطلاع بأحدث اتجاهات سوق العقارات والتحليلات ونصائح الاستثمار."
          : "Stay ahead with the latest real estate market trends, data-driven analysis, and investment guides."}
        icon={<LineChart className="w-8 h-8" />}
      />

      <Section spacing="lg" className="min-h-[60vh]">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {insights.map((insight) => (
              <div 
                key={insight.id}
                className="group rounded-2xl overflow-hidden bg-surface border border-border p-6 hover:shadow-floating transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="flex items-center gap-2 text-fjord mb-4 font-medium text-sm bg-fjord/5 w-fit px-3 py-1 rounded-full">
                  {insight.icon}
                  {insight.category}
                </div>
                
                <h3 className="font-display text-xl font-semibold text-ink mb-3 group-hover:text-fjord transition-colors line-clamp-2">
                  {insight.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                  {insight.description}
                </p>
                
                <div className="pt-4 border-t border-border mt-auto font-medium text-fjord group-hover:underline underline-offset-4 decoration-fjord/30 text-sm">
                  {isArabic ? "قراءة المزيد ←" : "Read Full Article →"}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-subtle border border-border/50 rounded-2xl p-12 text-center">
            <EmptyState 
              title={isArabic ? "المزيد من الرؤى قريباً" : "More Insights Coming Soon"}
              description={isArabic 
                ? "يقوم خبراؤنا حاليًا بتجميع تقرير نهاية العام الشامل."
                : "Our data team is currently compiling the comprehensive year-end market report. Check back later."}
            />
          </div>
        </Container>
      </Section>
    </>
  )
}
