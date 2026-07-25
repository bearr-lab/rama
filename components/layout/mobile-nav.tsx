import Link from "next/link"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  locale?: "en" | "ar"
}

export function MobileNav({ isOpen, onClose, locale = "en" }: MobileNavProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm transition-opacity duration-240",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[300px] max-w-[80vw] bg-surface shadow-lg transform transition-transform duration-240 ease-decelerate flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-display text-xl font-bold text-ink">RAMA</span>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-muted-foreground hover:text-ink transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            <Link 
              href={`/${locale}/homes`} 
              className="text-lg font-medium text-ink hover:text-fjord transition-colors"
              onClick={onClose}
            >
              {locale === "ar" ? "العقارات" : "Homes"}
            </Link>
            <Link 
              href={`/${locale}/areas`} 
              className="text-lg font-medium text-ink hover:text-fjord transition-colors"
              onClick={onClose}
            >
              {locale === "ar" ? "المناطق" : "Areas"}
            </Link>
            <Link 
              href={`/${locale}/insights`} 
              className="text-lg font-medium text-ink hover:text-fjord transition-colors"
              onClick={onClose}
            >
              {locale === "ar" ? "رؤى" : "Insights"}
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-border flex flex-col gap-4">
            <Link href="/en/login" onClick={onClose} className="w-full">
              <Button className="w-full bg-fjord text-white rounded-button hover:bg-fjord-hover">
                Sign In
              </Button>
            </Link>
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-muted-foreground">Language</span>
              <div className="flex gap-2">
                <Link href="/en" className="text-sm font-medium px-2 py-1 rounded bg-surface-subtle text-ink">EN</Link>
                <Link href="/ar" className="text-sm font-medium px-2 py-1 rounded text-muted-foreground hover:bg-surface-subtle hover:text-ink">AR</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
