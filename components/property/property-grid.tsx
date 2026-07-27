import { PropertyCard } from './property-card';
import type { Property } from '@/types/property';
import { cn } from '@/lib/utils';
import { BlurFade } from '@/components/ui/blur-fade';

interface PropertyGridProps {
  properties: Property[];
  locale?: 'en' | 'ar';
  savedPropertyIds?: string[];
  onSave?: (id: string) => void;
  className?: string;
}

export function PropertyGrid({
  properties,
  locale = 'en',
  savedPropertyIds = [],
  onSave,
  className,
}: PropertyGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {properties.map((property, idx) => (
        <BlurFade key={property.id} delay={0.25 + idx * 0.05} inView>
          <PropertyCard
            property={property}
            variant="vertical"
            locale={locale}
            isSaved={savedPropertyIds.includes(property.id)}
            onSave={onSave}
          />
        </BlurFade>
      ))}
    </div>
  );
}
