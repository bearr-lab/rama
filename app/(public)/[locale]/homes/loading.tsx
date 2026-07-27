import { Skeleton } from '@/components/ui/skeleton';

export default function HomesLoading() {
  return (
    <div className="container mx-auto mt-16 space-y-8 px-4 py-8">
      {/* Search Bar Skeleton */}
      <div className="mx-auto h-14 w-full max-w-3xl animate-pulse rounded-lg bg-surface-subtle" />

      {/* Filters Skeleton */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-border"
          >
            <Skeleton className="aspect-[4/3] w-full rounded-none" />
            <div className="space-y-4 p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-4 pt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
