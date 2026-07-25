import Link from "next/link"
import { ArrowRight, ShieldCheck, Calculator, Compass } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

import { getLocale, getTranslations } from "next-intl/server"

export async function Footer() {
  const locale = await getLocale()
  const t = await getTranslations("Footer")
  return (
    <footer className="w-full">
      {/* Pre-footer CTA (darker section) */}
      <Section background="ink-bg" spacing="md">
        <Container size="lg" padding="lg" className="text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">
            {t("ctaTitle")}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            {t("ctaSubtitle")}
          </p>
          <div className="pt-4">
            <Link href={`/${locale}/login`} className={buttonVariants({ size: "lg", className: "bg-fjord hover:bg-fjord-hover text-white rounded-button px-8" })}>
              {t("getStarted")}
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
                {t("brandSubtitle")}
              </p>
              {/* Trust badges row */}
              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-white/70">
                  <ShieldCheck className="w-4 h-4 text-verified" />
                  <span>{t("dldVerified")}</span>
                </div>
              </div>
            </div>

            {/* Discover Col */}
            <div>
              <h3 className="text-white font-medium mb-6">{t("discover")}</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href={`/${locale}/homes`} className="hover:text-white transition-colors">{t("propertiesForSale")}</Link></li>
                <li><Link href={`/${locale}/homes?tenure=off_plan`} className="hover:text-white transition-colors">{t("offPlanProjects")}</Link></li>
                <li><Link href={`/${locale}/areas`} className="hover:text-white transition-colors">{t("communities")}</Link></li>
                <li><Link href={`/${locale}/insights`} className="hover:text-white transition-colors">{t("marketInsights")}</Link></li>
              </ul>
            </div>

            {/* Company Col */}
            <div>
              <h3 className="text-white font-medium mb-6">{t("company")}</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{t("aboutUs")}</Link></li>
                <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{t("contact")}</Link></li>
                <li><Link href={`/${locale}/careers`} className="hover:text-white transition-colors">{t("careers")}</Link></li>
              </ul>
            </div>

            {/* Legal Col */}
            <div>
              <h3 className="text-white font-medium mb-6">{t("legal")}</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t("termsOfService")}</Link></li>
                <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t("privacyPolicy")}</Link></li>
                <li><Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">{t("cookiePolicy")}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
            <p>© {new Date().getFullYear()} {t("rightsReserved")}</p>
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
