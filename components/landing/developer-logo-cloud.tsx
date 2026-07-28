'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { ShieldCheck, Lock, Landmark, Scale } from 'lucide-react';
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
  locale?: string;
  isArabic?: boolean;
}

function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const magnetic = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const xTo = gsap.quickTo(magnetic.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.quickTo(magnetic.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetic.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current.getBoundingClientRect();
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
      <div className="relative flex items-center justify-center size-14 border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:border-white/50 group-hover:bg-white/10">
        <div className="size-6 text-white transition-colors duration-300">
          {children}
        </div>
      </div>
    </Magnetic>
    <div className="flex flex-col">
      <span className="text-sm font-bold text-white leading-tight">{label}</span>
      {sublabel && (
        <span className="text-[11px] text-white/60 mt-0.5">{sublabel}</span>
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
    <Icon className="h-5 w-5 text-fjord mb-3" />
    <span className="text-3xl font-display font-bold text-ink">{value}</span>
    <span className="text-[11px] tracking-widest uppercase text-muted-foreground mt-1">{label}</span>
  </motion.div>
);

export function DeveloperLogoCloud({
  locale = 'en',
  isArabic = false,
}: DeveloperLogoCloudProps) {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* ─── Top: Cinematic Hero Image Band ─── */}
      <div className="relative h-[320px] md:h-[400px] w-full overflow-hidden">
        <Image
          src="/images/trust/rera-hero.png"
          alt="Dubai architectural skyline"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay that transitions perfectly into the bg-ink section below */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />

        {/* Header text over the image */}
        <Container size="xl" className="relative z-10 h-full flex flex-col justify-end pb-12 px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold tracking-[0.25em] text-emerald-400 uppercase mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              {isArabic ? 'شبكة منظومة ريرا المعتمدة' : 'RERA Ecosystem & Escrow Network'}
            </p>
            <h3 className="font-display text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
              {isArabic
                ? 'شركاء الخدمات المصرفية والمطورين المعتمدين'
                : 'Verified Institutional Banking & Developer Partners'}
            </h3>
          </motion.div>
        </Container>
      </div>

      {/* ─── Main Content: Split Panel (Now Dark Theme) ─── */}
      <Container size="xl" className="px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10">

          {/* ─── Left: Financial & Regulatory Partners ─── */}
          <div className="relative p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-ink">
            {/* Subtle network pattern background */}
            <div className="absolute inset-0 opacity-[0.15]">
              <Image
                src="/images/trust/network-pattern.png"
                alt=""
                fill
                className="object-cover invert" // Invert pattern for dark background
                sizes="50vw"
              />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-3 py-1 border border-white/20">
                  <Lock className="h-3 w-3" />
                  {isArabic ? 'الخدمات المصرفية والتنظيمية' : 'Banking & Regulatory'}
                </span>
              </motion.div>

              {/* ─── Central DLD Core ─── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
                className="mb-10 p-6 border border-white/20 bg-white/5 backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-16 bg-white/10 border border-white/20">
                    <div className="size-8 text-white">
                      <DldLogo />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-white">
                      {isArabic ? 'دائرة الأراضي والأملاك' : 'Dubai Land Department'}
                    </h4>
                    <p className="text-xs text-white/60 mt-0.5">
                      {isArabic ? 'واجهة السجل الرسمي' : 'Official Registry API — Core Integration'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ─── Banking Partners List ─── */}
              <div className="space-y-6">
                <PartnerNode label="Emirates NBD" sublabel="Escrow Trustee Bank" delay={0.2}>
                  <EnbdLogo />
                </PartnerNode>
                <PartnerNode label="RERA Escrow Trustee" sublabel="Law No. 8 Verified" delay={0.3}>
                  <ReraLogo />
                </PartnerNode>
                <PartnerNode label="First Abu Dhabi Bank" sublabel="Mortgage & Escrow Partner" delay={0.4}>
                  <FabLogo />
                </PartnerNode>
              </div>
            </div>
          </div>

          {/* ─── Right: Developer Partners ─── */}
          <div className="relative p-8 md:p-12 bg-ink">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-white uppercase bg-white/10 px-3 py-1 border border-white/20">
                  <Landmark className="h-3 w-3" />
                  {isArabic ? 'المطورون الرئيسيون' : 'Master Developers'}
                </span>
              </motion.div>

              {/* ─── Developer Partners List ─── */}
              <div className="space-y-6 mb-10">
                <PartnerNode label="Emaar Properties" sublabel="Master Developer — Downtown & Dubai Creek" delay={0.2}>
                  <EmaarLogo />
                </PartnerNode>
                <PartnerNode label="Nakheel" sublabel="Palm Jumeirah & Deira Islands" delay={0.3}>
                  <NakheelLogo />
                </PartnerNode>
                <PartnerNode label="Dubai Holding" sublabel="Institutional Developer — Jumeirah & Business Bay" delay={0.4}>
                  <DubaiHoldingLogo />
                </PartnerNode>
              </div>

              {/* ─── Compliance Notice ─── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-t border-white/10 pt-8 mt-8"
              >
                <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 backdrop-blur-md">
                  <Scale className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">
                      {isArabic ? 'الامتثال القانوني الكامل' : 'Full Legal Compliance'}
                    </p>
                    <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
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
      <Container size="xl" className="px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 border-x border-b border-white/10 divide-x divide-white/10 bg-ink">
          <div className="p-8">
            <TrustStat icon={ShieldCheck} value="100%" label="Escrow Protected" delay={0.1} />
          </div>
          <div className="p-8">
            <TrustStat icon={Lock} value="DLD" label="Registry Verified" delay={0.2} />
          </div>
          <div className="p-8">
            <TrustStat icon={Landmark} value="6+" label="Banking Partners" delay={0.3} />
          </div>
          <div className="p-8">
            <TrustStat icon={Scale} value="Law 8" label="Compliant" delay={0.4} />
          </div>
        </div>
      </Container>

      {/* Bottom spacing */}
      <div className="h-24" />
    </section>
  );
}

export default DeveloperLogoCloud;
