'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <EmptyState
        variant="error"
        title="Something went wrong"
        description="We encountered an unexpected error while loading this section."
        action={
          <Button onClick={() => reset()} variant="outline">
            Try again
          </Button>
        }
      />
    </div>
  );
}
