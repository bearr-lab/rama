import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ProfileCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col items-center text-center",
      className
    )}
    {...props}
  />
))
ProfileCard.displayName = "ProfileCard"

const ProfileCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center space-y-1.5 p-6", className)}
    {...props}
  />
))
ProfileCardHeader.displayName = "ProfileCardHeader"

const ProfileCardAvatar = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, alt, ...props }, ref) => (
  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-background shadow-sm -mt-12 bg-muted">
    <img
      ref={ref}
      alt={alt || "Avatar"}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  </div>
))
ProfileCardAvatar.displayName = "ProfileCardAvatar"

const ProfileCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight mt-4", className)}
    {...props}
  />
))
ProfileCardTitle.displayName = "ProfileCardTitle"

const ProfileCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ProfileCardDescription.displayName = "ProfileCardDescription"

const ProfileCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0 w-full", className)} {...props} />
))
ProfileCardContent.displayName = "ProfileCardContent"

const ProfileCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-center p-6 pt-0 w-full", className)}
    {...props}
  />
))
ProfileCardFooter.displayName = "ProfileCardFooter"

export {
  ProfileCard,
  ProfileCardHeader,
  ProfileCardAvatar,
  ProfileCardTitle,
  ProfileCardDescription,
  ProfileCardContent,
  ProfileCardFooter,
}
