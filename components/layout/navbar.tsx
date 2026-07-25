"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import { Menu, X, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"
import { LocaleSwitcher } from "./locale-switcher"
import { UserMenu } from "@/components/auth/user-menu"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()

  // Determine if we are on the landing page (which uses transparent nav initially)
  const isLandingPage = pathname === "/en" || pathname === "/ar" || pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Run once on mount
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-180 ease-decelerate border-b",
    {
      "bg-transparent border-transparent text-white": isLandingPage && !isScrolled,
      "bg-surface/90 backdrop-blur-md border-border shadow-sm text-ink": !isLandingPage || isScrolled,
    }
  )

  const linkClasses = cn(
    "text-sm font-medium transition-colors hover:text-fjord",
    {
      "text-white/90 hover:text-white": isLandingPage && !isScrolled,
      "text-ink/80 hover:text-fjord": !isLandingPage || isScrolled,
    }
  )

  return (
    <>
      <header className={navClasses}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image 
              src="/images/logo-rama.png" 
              alt="RAMA Logo" 
              width={160} 
              height={50}
              className={cn("h-10 lg:h-12 w-auto object-contain", {
                // If the logo is dark by default, invert it to white when the nav is transparent
                "brightness-0 invert": isLandingPage && !isScrolled
              })}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href={`/${locale}/homes`} className={linkClasses}>
              {locale === 'ar' ? 'العقارات' : 'Homes'}
            </Link>
            <Link href={`/${locale}/areas`} className={linkClasses}>
              {locale === 'ar' ? 'المناطق' : 'Areas'}
            </Link>
            <Link href={`/${locale}/insights`} className={linkClasses}>
              {locale === 'ar' ? 'رؤى' : 'Insights'}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LocaleSwitcher isDark={isLandingPage && !isScrolled} />
            <UserMenu 
              locale={locale as "en" | "ar"} 
              isDark={isLandingPage && !isScrolled} 
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale as "en" | "ar"}
      />
    </>
  )
}
