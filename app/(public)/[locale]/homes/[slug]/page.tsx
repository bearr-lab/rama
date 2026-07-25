import { notFound } from "next/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import { MapPin, BedDouble, Bath, Maximize2, Calendar, Building2 } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { Property } from "@/types/property"
import { PriceTag } from "@/components/property/price-tag"
import { TrustBadge } from "@/components/property/trust-badge"
import { ShareButton } from "@/components/property/share-button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/layout/section"
import { Container } from "@/components/layout/container"

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const supabase = await createClient()
  const { data } = await supabase.from("properties").select("*").eq("slug", slug).single()
  
  if (!data) return { title: "Property Not Found" }
  
  const property = data as Property
  const title = locale === "ar" ? property.title_ar : property.title_en
  const desc = locale === "ar" ? property.description_ar : property.description_en
  
  return {
    title: `${title} · ${property.community}`,
    description: desc?.slice(0, 160),
    openGraph: {
      images: [{ url: property.thumbnail || property.images[0], width: 1200, height: 630 }],
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/homes/${slug}`,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        name: title,
        url: `https://rama.ae/${locale}/homes/${slug}`,
        image: property.images,
        address: {
          "@type": "PostalAddress",
          addressLocality: property.community,
          addressCountry: "AE",
        },
        offers: {
          "@type": "Offer",
          price: property.price,
          priceCurrency: "AED",
        },
      }),
    },
  }
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug, locale } = await params
  const supabase = await createClient()
  
  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !property) {
    notFound()
  }

  const p = property as Property
  const isArabic = locale === "ar"
  const title = isArabic ? p.title_ar : p.title_en
  const description = isArabic ? p.description_ar : p.description_en

  return (
    <Section spacing="lg" className="mt-16 pb-24">
      <Container size="xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className="text-fjord border-fjord/30 uppercase tracking-widest text-xs">
              {p.tenure === "ready" ? "Ready to Move" : "Off-Plan"}
            </Badge>
            <TrustBadge status={p.verification_status} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
            {title}
          </h1>
          <div className="flex items-center text-muted-foreground text-lg">
            <MapPin className="w-5 h-5 mr-1" />
            <span>{p.community}{p.sub_community ? `, ${p.sub_community}` : ''}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm">
          <PriceTag price={p.price} locale={locale as "en"|"ar"} verified={p.price_verified} size="lg" className="text-ink [&>div>span]:text-ink" />
          <div className="flex gap-3">
            <ShareButton title={title} url={`https://rama.ae/${locale}/homes/${p.slug}`} />
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-[400px] md:h-[500px]">
        <div className="md:col-span-3 relative h-full rounded-2xl overflow-hidden group">
          <Image
            src={p.images[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 75vw"
          />
        </div>
        <div className="hidden md:flex flex-col gap-4 h-full">
          {p.images.slice(1, 3).map((img, idx) => (
            <div key={idx} className="relative flex-1 rounded-2xl overflow-hidden group">
              <Image
                src={img || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"}
                alt={`${title} - view ${idx + 2}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="25vw"
              />
            </div>
          ))}
          {p.images.length < 2 && (
             <div className="relative flex-1 rounded-2xl overflow-hidden bg-surface-subtle" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Key Facts */}
          <section>
            <h2 className="text-2xl font-semibold text-ink mb-6 font-display">Property Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface p-6 rounded-2xl border border-border">
              {p.bedrooms && (
                <div className="flex flex-col gap-2">
                  <BedDouble className="w-6 h-6 text-fjord" />
                  <span className="text-2xl font-bold text-ink">{p.bedrooms}</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">Bedrooms</span>
                </div>
              )}
              {p.bathrooms && (
                <div className="flex flex-col gap-2">
                  <Bath className="w-6 h-6 text-fjord" />
                  <span className="text-2xl font-bold text-ink">{p.bathrooms}</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">Bathrooms</span>
                </div>
              )}
              {p.area_sqft && (
                <div className="flex flex-col gap-2">
                  <Maximize2 className="w-6 h-6 text-fjord" />
                  <span className="text-2xl font-bold text-ink">{p.area_sqft.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">Sq. Ft.</span>
                </div>
              )}
              {p.property_type && (
                <div className="flex flex-col gap-2">
                  <Building2 className="w-6 h-6 text-fjord" />
                  <span className="text-2xl font-bold text-ink capitalize">{p.property_type}</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">Type</span>
                </div>
              )}
            </div>
          </section>

          <Separator />

          {/* Description */}
          <section>
            <h2 className="text-2xl font-semibold text-ink mb-6 font-display">Description</h2>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              {description ? (
                <p className="whitespace-pre-wrap leading-relaxed">{description}</p>
              ) : (
                <div className="bg-surface-subtle border border-border/50 rounded-xl p-8 text-center mt-4">
                  <p className="text-muted-foreground text-lg italic">
                    A detailed description for this premium property is currently being crafted by our experts.
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-2">
                    Please check back soon or contact an advisor for full details.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface rounded-2xl p-6 border border-border sticky top-24 shadow-sm">
            <h3 className="font-display text-xl font-semibold mb-6">Financial Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Listing Price</span>
                <span className="font-semibold text-ink">{p.price.toLocaleString()} AED</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Est. DLD Fee (4%)</span>
                <span className="font-semibold text-ink">{(p.price * 0.04).toLocaleString()} AED</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <span className="text-muted-foreground">Trustee Fee</span>
                <span className="font-semibold text-ink">4,200 AED</span>
              </div>
              <div className="pt-4 flex justify-between items-center">
                <span className="font-semibold text-ink">Total Buying Cost</span>
                <span className="text-xl font-bold text-fjord">
                  {(p.price + (p.price * 0.04) + 4200).toLocaleString()} AED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Section>
)
}
