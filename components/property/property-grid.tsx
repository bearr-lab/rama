import { PropertyCard } from "./property-card"
import type { Property } from "@/types/property"
import { cn } from "@/lib/utils"

interface PropertyGridProps {
  properties: Property[]
  locale?: "en" | "ar"
  savedPropertyIds?: string[]
  onSave?: (id: string) => void
  className?: string
}

export function PropertyGrid({ 
  properties, 
  locale = "en",
  savedPropertyIds = [],
  onSave,
  className
}: PropertyGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          variant="vertical"
          locale={locale}
          isSaved={savedPropertyIds.includes(property.id)}
          onSave={onSave}
        />
      ))}
    </div>
  )
}
