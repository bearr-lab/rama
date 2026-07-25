import { createClient } from "@/lib/supabase/server"
import { EmptyState } from "@/components/ui/empty-state"
import Link from "next/link"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { Container } from "@/components/layout/container"
export const revalidate = 3600 // Cache for 1 hour

export default async function AreasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()

  const { data: communities, error } = await supabase
    .from("communities")
    .select("*")
    .order("name_en")

  if (error) {
    console.error("Error fetching communities:", error)
  }

  const isArabic = locale === "ar"

  return (
    <>
      <PageHeader 
        title={isArabic ? "المجمعات السكنية" : "Dubai Communities"}
        description={isArabic 
          ? "استكشف أشهر أحياء دبي، من المعيشة على الواجهة البحرية إلى مجمعات الفيلات الهادئة."
          : "Explore Dubai's most popular neighborhoods, from waterfront living to serene villa communities."}
      />

      <Section spacing="lg" className="min-h-[60vh]">
        <Container size="xl">
          {!communities || communities.length === 0 ? (
            <EmptyState 
              title="No communities found"
              description="We are currently updating our community guides. Please check back later."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communities.map((community) => {
                const name = isArabic ? community.name_ar : community.name_en
                const description = isArabic ? community.description_ar : community.description_en

                return (
                  <Link
                    key={community.id}
                    href={`/${locale}/homes?community=${community.name_en.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group rounded-2xl overflow-hidden bg-surface border border-border hover:shadow-floating transition-all duration-300 cursor-pointer block"
                  >
                    <div className="aspect-[16/9] bg-surface-subtle relative overflow-hidden">
                      {community.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={community.image} 
                          alt={name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 font-display text-2xl font-bold">
                          {name}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-2xl font-semibold text-ink mb-2 group-hover:text-fjord transition-colors">
                        {name}
                      </h3>
                      {description && (
                        <p className="text-muted-foreground line-clamp-2 mb-4">
                          {description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm pt-4 border-t border-border mt-auto">
                        <span className="text-fjord font-medium">
                          {community.property_count} {isArabic ? "عقارات" : "Properties"}
                        </span>
                        {community.avg_price && (
                          <span className="text-muted-foreground">
                            {isArabic ? "متوسط السعر:" : "Avg:"} {community.avg_price.toLocaleString()} AED
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
