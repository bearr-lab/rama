"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-full items-center justify-center p-4 bg-canvas">
          <EmptyState
            variant="error"
            title="Something went wrong"
            description="We encountered an unexpected error while trying to load this page."
            action={
              <Button onClick={() => reset()} className="bg-fjord hover:bg-fjord-hover text-white">
                Try again
              </Button>
            }
          />
        </div>
      </body>
    </html>
  )
}
