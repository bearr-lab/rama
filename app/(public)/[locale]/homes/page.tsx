import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { PropertyGrid } from "@/components/property/property-grid"
import { SearchBar } from "@/components/search/search-bar"
import { HomesFilterChips } from "@/components/search/homes-filter-chips"
import { EmptyState } from "@/components/ui/empty-state"
import { Property } from "@/types/property"
import { PageHeader } from "@/components/layout/page-header"
import { Section } from "@/components/layout/section"
import { Container } from "@/components/layout/container"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomesPage({ 
  params,
  searchParams,
}: { 
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { locale } = await params
  const { query, tenure, property_type } = await searchParams
  
  const supabase = await createClient()
  
  // Basic query logic
  let dbQuery = supabase.from("properties").select("*").eq("is_active", true)
  
  if (tenure && typeof tenure === "string") {
    dbQuery = dbQuery.eq("tenure", tenure)
  }
  
  if (property_type) {
    if (Array.isArray(property_type)) {
      dbQuery = dbQuery.in("property_type", property_type)
    } else {
      dbQuery = dbQuery.eq("property_type", property_type)
    }
  }
  
  // Text search on english title or community for simplicity
  if (query && typeof query === "string") {
    const safeQuery = query.replace(/"/g, '""')
    dbQuery = dbQuery.or(`title_en.ilike."%${safeQuery}%",community.ilike."%${safeQuery}%"`)
  }

  const { data: properties, error } = await dbQuery.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching properties:", error)
  }

  return (
    <>
      <PageHeader 
        title={locale === "ar" ? "اكتشف العقارات" : "Discover Properties"}
        description={locale === "ar" 
          ? "ابحث في آلاف العقارات الموثقة في دبي." 
          : "Search through thousands of verified properties in Dubai."}
      >
        <div className="flex flex-col gap-4 mt-6">
          <SearchBar 
            variant="inline" 
            locale={locale as "en" | "ar"} 
            initialQuery={typeof query === "string" ? query : ""}
            initialTenure={typeof tenure === "string" ? tenure : "ready"}
          />
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap mr-2">
              {locale === "ar" ? "التصنيفات:" : "Filters:"}
            </span>
            <HomesFilterChips 
              options={[
                { value: "apartment", label: locale === "ar" ? "شقق" : "Apartments" },
                { value: "villa", label: locale === "ar" ? "فلل" : "Villas" },
                { value: "townhouse", label: locale === "ar" ? "تاون هاوس" : "Townhouses" },
                { value: "penthouse", label: locale === "ar" ? "بنتهاوس" : "Penthouses" },
              ]}
            />
          </div>
        </div>
      </PageHeader>

      <Section spacing="lg" className="min-h-[60vh]">
        <Container size="xl">
          {!properties || properties.length === 0 ? (
            <EmptyState 
              variant="search"
              title={locale === "ar" ? "لا توجد عقارات" : "No properties found"}
              description={locale === "ar" 
                ? "لم نتمكن من العثور على أي عقارات تطابق بحثك. حاول تعديل خيارات البحث."
                : "We couldn't find any properties matching your current filters. Try adjusting your search criteria."}
            />
          ) : (
            <PropertyGrid 
              properties={properties as Property[]} 
              locale={locale as "en" | "ar"} 
            />
          )}
        </Container>
      </Section>
    </>
  )
}
