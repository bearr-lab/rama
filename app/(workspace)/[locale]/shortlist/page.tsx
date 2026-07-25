import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PropertyGrid } from "@/components/property/property-grid"
import { EmptyState } from "@/components/ui/empty-state"
import { Property } from "@/types/property"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ShortlistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/${locale}/login`)
  }

  // Get user's shortlist with property details
  const { data: shortlists, error } = await supabase
    .from("shortlists")
    .select("property_id, properties(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching shortlist:", error)
  }

  // Extract properties
  const properties = shortlists?.map(s => s.properties) || []

  return (
    <div className="container mx-auto px-4 py-8 mt-16 min-h-[80vh]">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink mb-2">
          {locale === "ar" ? "قائمتي المفضلة" : "My Shortlist"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "ar" 
            ? "العقارات التي قمت بحفظها للمراجعة لاحقاً." 
            : "Properties you've saved for later review."}
        </p>
      </div>

      {properties.length === 0 ? (
        <EmptyState 
          variant="shortlist"
          title="Your shortlist is empty"
          description="You haven't saved any properties yet. Start exploring and click the heart icon to save your favorites."
          action={
            <Link href={`/${locale}/homes`}>
              <Button className="bg-fjord hover:bg-fjord-hover text-white rounded-button mt-4">
                Explore Properties
              </Button>
            </Link>
          }
        />
      ) : (
        <PropertyGrid 
          properties={properties as unknown as Property[]} 
          locale={locale as "en" | "ar"}
          savedPropertyIds={properties.map(p => (p as any).id)} 
        />
      )}
    </div>
  )
}
