'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Lock, Landmark, Scale, ShieldCheck } from 'lucide-react';
import {
  DldLogo,
  ReraLogo,
  EmaarLogo,
  NakheelLogo,
  DubaiHoldingLogo,
  EnbdLogo,
  FabLogo,
} from '@/components/ui/svgs/partners';

interface DeveloperLogoCloudProps {
  isArabic?: boolean;
}

function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const magnetic = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const xTo = gsap.quickTo(magnetic.current, 'x', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });
    const yTo = gsap.quickTo(magnetic.current, 'y', {
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetic.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } =
        magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    magnetic.current?.addEventListener('mousemove', handleMouseMove);
    magnetic.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      magnetic.current?.removeEventListener('mousemove', handleMouseMove);
      magnetic.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={magnetic} className={className}>
      {children}
    </div>
  );
}

/* ─── Partner Node ─── */
const PartnerNode = ({
  children,
  label,
  sublabel,
  delay = 0,
}: {
  children: React.ReactNode;
  label: string;
  sublabel?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.2, 0, 0, 1] }}
    className="group flex items-center gap-4"
  >
    <Magnetic>
      <div className="border-border-strong relative flex size-14 items-center justify-center border bg-background shadow-sm transition-all duration-300 group-hover:border-fjord/60 group-hover:bg-fjord-soft">
        <div className="size-6 text-ink transition-colors duration-300 group-hover:text-fjord">
          {children}
        </div>
      </div>
    </Magnetic>
    <div className="flex flex-col">
      <span className="text-sm leading-tight font-bold text-foreground">{label}</span>
      {sublabel && (
        <span className="mt-0.5 text-[11px] text-muted-foreground">{sublabel}</span>
      )}
    </div>
  </motion.div>
);

/* ─── Trust Stat ─── */
const TrustStat = ({
  icon: Icon,
  value,
  label,
  delay = 0,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, ease: [0.2, 0, 0, 1] }}
    className="flex flex-col items-center text-center"
  >
    <Icon className="mb-3 size-5 text-primary" />
    <span className="font-display text-3xl font-bold text-foreground">
      {value}
    </span>
    <span className="mt-1 text-[11px] tracking-widest text-muted-foreground uppercase">
      {label}
    </span>
  </motion.div>
);

export function DeveloperLogoCloud({
  isArabic = false,
}: DeveloperLogoCloudProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* ─── Top: Cinematic Hero Image Band ─── */}
      <div className="relative h-80 w-full overflow-hidden border-b border-border md:h-100">
        <Image
          src="/images/trust/rera-hero.png"
          alt="Dubai architectural skyline"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Soft dark overlay — fades to transparent so hero photo stays present */}
        <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/30 to-transparent" />

        {/* Header text over the image */}
        <Container
          size="lg"
          className="relative z-10 flex h-full flex-col justify-end pb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="max-w-2xl font-display text-2xl leading-tight font-bold text-white [text-shadow:0_2px_8px_rgb(0_0_0/0.7)] md:text-5xl">
              {isArabic
                ? 'شركاء الخدمات المصرفية والمطورين المعتمدين'
                : 'Verified Institutional Banking & Developer Partners'}
            </h3>
          </motion.div>
        </Container>
      </div>

      {/* ─── Main Content: Split Panel ─── */}
      <Container size="lg">
        <div className="grid grid-cols-1 gap-0 border border-border lg:grid-cols-2">
          {/* ─── Left: Financial & Regulatory Partners ─── */}
          <div className="border-b border-border bg-surface p-8 md:p-12 lg:border-r lg:border-b-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-1.5 border border-fjord/50 bg-fjord-soft px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-fjord uppercase">
                <Lock className="size-3" />
                {isArabic
                  ? 'الخدمات المصرفية والتنظيمية'
                  : 'Banking & Regulatory'}
              </span>
            </motion.div>

            {/* ─── Central DLD Core ─── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
              className="border-border-strong mb-10 border bg-canvas p-6 shadow-sm dark:bg-ink-surface"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center border border-fjord/30 bg-fjord-soft dark:bg-fjord-soft">
                  <div className="size-8 text-ink">
                    <DldLogo />
                  </div>
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-ink">
                    {isArabic
                      ? 'دائرة الأراضي والأملاك'
                      : 'Dubai Land Department'}
                  </h4>
                  <p className="mt-0.5 text-xs text-text">
                    {isArabic
                      ? 'واجهة السجل الرسمي'
                      : 'Official Registry API — Core Integration'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ─── Banking Partners List ─── */}
            <div className="space-y-6">
              <PartnerNode
                label="Emirates NBD"
                sublabel="Escrow Trustee Bank"
                delay={0.2}
              >
                <EnbdLogo />
              </PartnerNode>
              <PartnerNode
                label="RERA Escrow Trustee"
                sublabel="Law No. 8 Verified"
                delay={0.3}
              >
                <ReraLogo />
              </PartnerNode>
              <PartnerNode
                label="First Abu Dhabi Bank"
                sublabel="Mortgage & Escrow Partner"
                delay={0.4}
              >
                <FabLogo />
              </PartnerNode>
            </div>
          </div>

          {/* ─── Right: Developer Partners ─── */}
          <div className="relative bg-canvas p-8 md:p-12 dark:bg-surface">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <span className="border-border-strong inline-flex items-center gap-1.5 border bg-surface px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-ink uppercase dark:bg-ink-surface dark:text-fjord">
                  <Landmark className="size-3" />
                  {isArabic ? 'المطورون الرئيسيون' : 'Master Developers'}
                </span>
              </motion.div>

              {/* ─── Developer Partners List ─── */}
              <div className="mb-10 space-y-6">
                <PartnerNode
                  label="Emaar Properties"
                  sublabel="Master Developer — Downtown & Dubai Creek"
                  delay={0.2}
                >
                  <EmaarLogo />
                </PartnerNode>
                <PartnerNode
                  label="Nakheel"
                  sublabel="Palm Jumeirah & Deira Islands"
                  delay={0.3}
                >
                  <NakheelLogo />
                </PartnerNode>
                <PartnerNode
                  label="Dubai Holding"
                  sublabel="Institutional Developer — Jumeirah & Business Bay"
                  delay={0.4}
                >
                  <DubaiHoldingLogo />
                </PartnerNode>
              </div>

              {/* ─── Compliance Notice ─── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 border-t border-border pt-8"
              >
                <div className="flex items-start gap-3 border border-fjord/30 bg-fjord-soft p-4 dark:bg-fjord/10">
                  <Scale className="mt-0.5 size-5 shrink-0 text-fjord" />
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      {isArabic
                        ? 'الامتثال القانوني الكامل'
                        : 'Full Legal Compliance'}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      {isArabic
                        ? 'جميع المعاملات مؤمنة بموجب القانون رقم 8 لسنة 2007 بشأن حسابات الضمان العقارية. متوافق مع هيئة التنظيم العقاري.'
                        : 'All transactions secured under Law No. 8 of 2007 concerning Escrow Accounts. Fully compliant with the Real Estate Regulatory Authority (RERA).'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>

      {/* ─── Trust Statistics Bar ─── */}
      <Container size="lg">
        <div className="grid grid-cols-2 divide-x divide-border border-x border-b border-border bg-background md:grid-cols-4">
          <div className="p-8">
            <TrustStat
              icon={ShieldCheck}
              value="100%"
              label="Escrow Protected"
              delay={0.1}
            />
          </div>
          <div className="p-8">
            <TrustStat
              icon={Lock}
              value="DLD"
              label="Registry Verified"
              delay={0.2}
            />
          </div>
          <div className="p-8">
            <TrustStat
              icon={Landmark}
              value="6+"
              label="Banking Partners"
              delay={0.3}
            />
          </div>
          <div className="p-8">
            <TrustStat
              icon={Scale}
              value="Law 8"
              label="Compliant"
              delay={0.4}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default DeveloperLogoCloud;
