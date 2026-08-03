import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Compass,
  FileCheck2,
  MapPinned,
  Scale,
} from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/container';

interface LandingExperienceProps {
  locale: string;
}

const content = {
  en: {
    eyebrow: 'Dubai real estate, considered',
    title: 'Make room for a better property decision.',
    intro:
      'RAMA brings listings, evidence and the decisions around them into one quiet, practical place.',
    explore: 'Explore homes',
    how: 'How it works',
    proofTitle: 'Clarity before momentum.',
    proofIntro:
      'A smaller set of useful tools, designed to help you move with confidence — without creating more noise.',
    steps: [
      [
        'Discover with context',
        'Search homes and communities with the details that matter to you.',
      ],
      [
        'Review the evidence',
        'Keep documents, pricing context and unanswered questions together.',
      ],
      [
        'Decide deliberately',
        'Compare your options and pick up exactly where you left off.',
      ],
    ],
    workspace: 'Your decision space',
    workspaceText:
      'A private workspace for shortlists, property notes, document review and the next useful action.',
    openWorkspace: 'Open workspace',
  },
  ar: {
    eyebrow: 'عقارات دبي، بوضوح',
    title: 'مساحة أهدأ لاتخاذ قرارك العقاري.',
    intro:
      'يجمع راما العقارات والأدلة والقرارات المرتبطة بها في مكان واحد عملي وهادئ.',
    explore: 'استكشف العقارات',
    how: 'كيف يعمل',
    proofTitle: 'الوضوح قبل الاستعجال.',
    proofIntro:
      'أدوات أقل وأكثر فائدة تساعدك على التقدم بثقة من دون ضجيج إضافي.',
    steps: [
      [
        'اكتشف ضمن سياقك',
        'ابحث في العقارات والمجتمعات وفق التفاصيل التي تهمك.',
      ],
      ['راجع الأدلة', 'احتفظ بالمستندات وسياق الأسعار والأسئلة المفتوحة معاً.'],
      ['قرّر بتأنٍ', 'قارن خياراتك وواصل من حيث توقفت.'],
    ],
    workspace: 'مساحة قرارك',
    workspaceText:
      'مساحة خاصة للقوائم المختصرة وملاحظات العقار ومراجعة المستندات والخطوة التالية المفيدة.',
    openWorkspace: 'افتح مساحة العمل',
  },
} as const;

const icons = [Compass, FileCheck2, Scale];

export function LandingExperience({ locale }: LandingExperienceProps) {
  const isArabic = locale === 'ar';
  const t = content[isArabic ? 'ar' : 'en'];

  return (
    <div className="bg-canvas text-ink">
      <section className="border-b border-border bg-surface pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container
          size="lg"
          className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-fjord uppercase">
              {t.eyebrow}
            </p>
            <h1 className="leading-1.02 mt-5 font-display text-5xl tracking-tight sm:text-6xl lg:text-7xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text">
              {t.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/homes`}
                className={buttonVariants({ size: 'lg' })}
              >
                {t.explore}
                <ArrowRight className="ms-2 size-4" />
              </Link>
              <a
                href="#how-it-works"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                {t.how}
              </a>
            </div>
          </div>
          <aside className="border-s border-border ps-6 lg:pb-1">
            <p className="text-sm font-medium text-muted-foreground">RAMA principle</p>
            <p className="mt-3 font-display text-2xl leading-snug">
              Verify before broad discovery. Structure the decision before
              adding complexity.
            </p>
          </aside>
        </Container>
      </section>

      <section id="how-it-works" className="py-20 sm:py-28">
        <Container size="lg">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.16em] text-fjord uppercase">
              The useful path
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
              {t.proofTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-text">
              {t.proofIntro}
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-none border border-border bg-border md:grid-cols-3">
            {t.steps.map(([title, description], index) => {
              const Icon = icons[index];
              return (
                <div key={title} className="bg-surface p-7 sm:p-8">
                  <Icon className="size-5 text-fjord" />
                  <p className="mt-8 text-sm text-muted-foreground">0{index + 1}</p>
                  <h3 className="mt-2 font-display text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-subtle py-16 sm:py-20">
        <Container size="lg" className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div className="flex size-12 items-center justify-center rounded-none bg-fjord text-white">
            <MapPinned className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-fjord uppercase">
              For the work after the search
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight">
              {t.workspace}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text">
              {t.workspaceText}
            </p>
            <Link
              href={`/${locale}/dashboard`}
              className={cn(buttonVariants({ variant: 'outline' }), 'mt-7')}
            >
              {t.openWorkspace}
              <ArrowRight className="ms-2 size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container size="lg">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="size-4 text-verified" />
            Evidence availability is visible; it is not a statement of property
            quality, legal status or investment merit.
          </p>
        </Container>
      </section>
    </div>
  );
}
