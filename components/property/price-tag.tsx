import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface PriceTagProps {
  price: number
  locale?: "en" | "ar"
  verified?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export function PriceTag({ price, locale = "en", verified = false, className, size = "md" }: PriceTagProps) {
  // Add Eastern Arabic numerals support
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat(locale === "ar" ? "ar-AE" : "en-AE", {
      style: "currency",
      currency: "AED",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2">
        <span className={cn("font-display font-bold text-white drop-shadow-md", sizes[size])}>
          {formatPrice(price)}
        </span>
        {verified && (
          <ShieldCheck className="w-5 h-5 text-verified drop-shadow-sm" />
        )}
      </div>
      {verified && (
        <span className="text-xs font-medium text-white/90 drop-shadow-sm tracking-wide">
          REAL PRICE
        </span>
      )}
    </div>
  )
}
