import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "focus:ring-fjord-500 inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none",
  {
    variants: {
      variant: {
        neutral:
          "border-border bg-surface text-ink",
        accent:
          "border-fjord-500 bg-fjord-500 text-surface",
        secondary:
          "border-transparent bg-border/50 text-ink hover:bg-stone-300",
        destructive:
          "border-transparent bg-rose-500 text-surface hover:bg-rose-600",
        outline: "border-border/60 text-ink",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
