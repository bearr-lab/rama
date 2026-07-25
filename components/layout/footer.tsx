import Link from "next/link"
import { ArrowRight, ShieldCheck, Calculator, Compass } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

import { getLocale } from "next-intl/server"

export async function Footer() {
  const locale = await getLocale()
  return (
    <footer className="w-full">
      {/* Pre-footer CTA (darker section) */}
      <Section background="ink-bg" spacing="md">
        <Container size="lg" padding="lg" className="text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">
            Let&apos;s find your place in Dubai.
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Join thousands of buyers who trust RAMA for verified listings, real prices, and AI-powered guidance.
          </p>
          <div className="pt-4">
            <Link href={`/${locale}/login`} className={buttonVariants({ size: "lg", className: "bg-fjord hover:bg-fjord-hover text-white rounded-button px-8" })}>
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Main Footer */}
      <Section background="ink" spacing="lg">
        <Container size="xl" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Brand Col */}
            <div className="space-y-6">
              <Link href="/" className="font-display text-3xl font-bold text-white tracking-tight">
                RAMA
              </Link>
              <p className="text-sm leading-relaxed text-muted-foreground/80 max-w-xs">
                Dubai&apos;s premium real estate platform. Verified properties, true costs, and expert guidance with zero guesswork.
              </p>
              {/* Trust badges row */}
              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-white/70">
                  <ShieldCheck className="w-4 h-4 text-verified" />
                  <span>DLD Verified</span>
                </div>
              </div>
            </div>

            {/* Discover Col */}
            <div>
              <h3 className="text-white font-medium mb-6">Discover</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href={`/${locale}/homes`} className="hover:text-white transition-colors">Properties for Sale</Link></li>
                <li><Link href={`/${locale}/homes?tenure=off_plan`} className="hover:text-white transition-colors">Off-Plan Projects</Link></li>
                <li><Link href={`/${locale}/areas`} className="hover:text-white transition-colors">Communities</Link></li>
                <li><Link href={`/${locale}/insights`} className="hover:text-white transition-colors">Market Insights</Link></li>
              </ul>
            </div>

            {/* Company Col */}
            <div>
              <h3 className="text-white font-medium mb-6">Company</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href={`/${locale}/careers`} className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            {/* Legal Col */}
            <div>
              <h3 className="text-white font-medium mb-6">Legal</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
            <p>© {new Date().getFullYear()} RAMA Real Estate. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/en" className="hover:text-white transition-colors">English</Link>
              <span>•</span>
              <Link href="/ar" className="hover:text-white transition-colors font-sans" dir="rtl">العربية</Link>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  )
}
