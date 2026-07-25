import { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
}

export function Container({ 
  children, 
  size = "lg", 
  padding = "lg",
  className,
  ...props 
}: ContainerProps) {
  
  const sizeClasses = {
    sm: "max-w-[640px]",
    md: "max-w-[896px]",
    lg: "max-w-[1024px]",
    xl: "max-w-[1152px]",
    "2xl": "max-w-[1280px]",
    full: "max-w-none",
  }

  const paddingClasses = {
    none: "px-0",
    xs: "px-4",
    sm: "px-5",
    md: "px-6 md:px-10",
    lg: "px-6 md:px-12",
    xl: "px-6 md:px-16",
    "2xl": "px-6 md:px-20",
  }

  return (
    <div 
      className={cn(
        "mx-auto w-full",
        sizeClasses[size],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
