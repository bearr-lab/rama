import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { PropertyGrid } from "@/components/property/property-grid"
import { SearchBar } from "@/components/search/search-bar"
import { FilterChips } from "@/components/search/filter-chips"
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
  const { query, tenure } = await searchParams
  
  const supabase = await createClient()
  
  // Basic query logic
  let dbQuery = supabase.from("properties").select("*").eq("is_active", true)
  
  if (tenure) {
    dbQuery = dbQuery.eq("tenure", tenure)
  }
  
  // Text search on english title or community for simplicity
  if (query && typeof query === "string") {
    dbQuery = dbQuery.or(`title_en.ilike.%${query}%,community.ilike.%${query}%`)
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
          <SearchBar variant="inline" locale={locale as "en" | "ar"} initialQuery={typeof query === "string" ? query : ""} />
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap mr-2">Filters:</span>
            <FilterChips 
              options={[
                { value: "apartment", label: "Apartments" },
                { value: "villa", label: "Villas" },
                { value: "townhouse", label: "Townhouses" },
                { value: "penthouse", label: "Penthouses" },
              ]}
              multiple
            />
          </div>
        </div>
      </PageHeader>

      <Section spacing="lg" className="min-h-[60vh]">
        <Container size="xl">
          {!properties || properties.length === 0 ? (
            <EmptyState 
              variant="search"
              title="No properties found"
              description="We couldn't find any properties matching your current filters. Try adjusting your search criteria."
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
