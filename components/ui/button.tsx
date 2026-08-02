import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:ring-fjord-500 inline-flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border border-transparent bg-fjord text-white shadow-resting hover:bg-fjord/90 hover:shadow-elevated",
        secondary:
          "hover:shadow-subtle border border-border bg-transparent text-ink hover:bg-surface",
        outline:
          "border border-border/60 bg-transparent text-ink hover:bg-surface",
        ghost: "text-ink hover:bg-surface",
        link: "text-ink underline-offset-4 hover:underline",
        destructive: "bg-rose-500 text-surface shadow-sm hover:bg-rose-600",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  render?: React.ReactElement
  nativeButton?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, variant, size, asChild, render, nativeButton, ...props }, ref) => {
    // If asChild is used in the codebase but we don't have Slot, we just render button for now.
    // Ejecting base-mira removes the base-ui button.
    const Comp = "button"
    
    if (render) {
      const renderProps = render.props as { className?: string };
      return React.cloneElement(render as React.ReactElement<{ className?: string }>, {
        className: cn(buttonVariants({ variant, size, className }), renderProps.className),
        ...props,
      } as React.HTMLAttributes<HTMLElement>)
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
