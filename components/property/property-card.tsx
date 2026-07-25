"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, BedDouble, Bath, Maximize2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types/property"
import { TrustBadge } from "./trust-badge"
import { PriceTag } from "./price-tag"

interface PropertyCardProps {
  property: Property
  variant?: "vertical" | "editorial"
  isSaved?: boolean
  onSave?: (id: string) => void
  locale?: "en" | "ar"
}

export function PropertyCard({ 
  property, 
  variant = "vertical", 
  isSaved = false,
  onSave,
  locale = "en"
}: PropertyCardProps) {
  const isEditorial = variant === "editorial"
  const title = locale === "ar" ? property.title_ar : property.title_en

  // Formatter for AED
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className={cn(
      "group overflow-hidden bg-surface transition-all duration-300 ease-decelerate hover:shadow-floating hover:-translate-y-1 border-border/50",
      isEditorial ? "flex flex-col md:flex-row h-auto md:h-[400px]" : "flex flex-col h-full"
    )}>
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-surface-subtle",
        isEditorial ? "w-full md:w-[60%] h-[300px] md:h-full" : "w-full aspect-[4/3]"
      )}>
        <Image
          src={property.thumbnail || property.images[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes={isEditorial ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex gap-2 flex-wrap">
            {property.is_featured && (
              <Badge className="bg-white/90 text-ink hover:bg-white backdrop-blur-sm shadow-sm border-none font-medium">
                Featured
              </Badge>
            )}
            <TrustBadge status={property.verification_status} variant="solid" />
          </div>
          
          <Button 
            variant="secondary" 
            size="icon" 
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"
            onClick={(e) => {
              e.preventDefault()
              if (onSave) onSave(property.id)
            }}
          >
            <Heart className={cn("w-4 h-4 transition-transform", isSaved ? "fill-risk text-risk scale-110" : "text-ink")} />
          </Button>
        </div>

        {/* Price Tag (Floating) */}
        <div className="absolute bottom-4 left-4">
          <PriceTag price={property.price} locale={locale} verified={property.price_verified} />
        </div>
      </div>

      {/* Content */}
      <CardContent className={cn(
        "flex flex-col justify-between p-6",
        isEditorial ? "w-full md:w-[40%]" : "flex-1"
      )}>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-display text-xl font-semibold text-ink line-clamp-2 leading-tight">
              {title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              <span>{property.community}{property.sub_community ? `, ${property.sub_community}` : ''}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-ink/80 pt-2 border-t border-border">
            {property.bedrooms && (
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-muted-foreground" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-muted-foreground" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.area_sqft && (
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-muted-foreground" />
                <span>{property.area_sqft.toLocaleString()} sqft</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 mt-auto">
          <Link href={`/${locale}/homes/${property.slug}`}>
            <Button className="w-full bg-fjord hover:bg-fjord-hover text-white rounded-button">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
