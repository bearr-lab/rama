import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { MapPin } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

interface FeaturedSignatureProps {
  locale: string
  isArabic: boolean
}

export async function FeaturedSignature({ locale, isArabic }: FeaturedSignatureProps) {
  const supabase = await createClient()

  // Fetch top 2 premium properties
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .eq("is_active", true)
    .order("price", { ascending: false })
    .limit(2)

  if (!properties || properties.length === 0) return null

  return (
    <Section background="surface" spacing="lg">
      <Container size="xl" padding="lg">
        
        <div className="flex flex-col items-center text-center mb-12 lg:mb-20 space-y-6">
          <div className="space-y-4">
            <p className="text-fjord text-sm tracking-[0.2em] uppercase font-medium">
              {isArabic ? "مجموعة حصرية" : "Exclusive Collection"}
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-ink">
              {isArabic ? "عقارات مميزة" : "Signature Properties"}
            </h2>
          </div>
          <Link 
            href={`/${locale}/homes`}
            className="text-fjord font-medium hover:underline underline-offset-4 decoration-fjord/30 shrink-0 inline-flex items-center gap-2"
          >
            {isArabic ? "عرض جميع العقارات ←" : "View All Properties →"}
          </Link>
        </div>

        <div className="space-y-16">
          {properties.map((property, index) => {
            const primaryImage = property.images?.[0] || property.thumbnail

            const title = isArabic ? property.title_ar : property.title_en
            const location = property.community
            const price = new Intl.NumberFormat(isArabic ? 'ar-AE' : 'en-AE', {
              style: 'currency',
              currency: 'AED',
              maximumFractionDigits: 0,
            }).format(property.price)

            // Alternate layout for visual interest
            const isEven = index % 2 === 0

            return (
              <Link 
                href={`/${locale}/homes/${property.slug}`} 
                key={property.id}
                className="group block"
              >
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 overflow-hidden rounded-2xl bg-canvas border border-border transition-all duration-500 hover:shadow-2xl`}>
                  
                  {/* Huge Image Area */}
                  <div className="relative w-full lg:w-2/3 aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                    {primaryImage ? (
                      <Image
                        src={primaryImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-subtle" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
                  </div>

                  {/* Content Area */}
                  <div className="w-full lg:w-1/3 p-10 lg:p-12 flex flex-col justify-center relative bg-canvas">
                    {/* Decorative number */}
                    <div className="absolute top-8 right-8 text-6xl font-display text-border/40 select-none z-0">
                      0{index + 1}
                    </div>

                    <div className="relative z-10 space-y-6">
                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-fjord bg-fjord-soft px-3 py-1 uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5" />
                        {location}
                      </div>

                      <h3 className="font-display text-3xl lg:text-4xl text-ink leading-tight group-hover:text-fjord transition-colors">
                        {title}
                      </h3>

                      <div className="pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">
                          {isArabic ? "السعر المطلوب" : "Asking Price"}
                        </p>
                        <p className="text-3xl font-display text-ink">{price}</p>
                      </div>

                      <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
                        {property.bedrooms && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-ink">{property.bedrooms}</span> 
                            {isArabic ? "غرف نوم" : "Beds"}
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-ink">{property.bathrooms}</span> 
                            {isArabic ? "حمامات" : "Baths"}
                          </div>
                        )}
                        {property.area_sqft && (
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-ink">{property.area_sqft}</span> 
                            {isArabic ? "قدم مربع" : "Sq Ft"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
