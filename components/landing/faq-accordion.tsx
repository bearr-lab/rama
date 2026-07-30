'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container } from '@/components/layout/container';

interface FAQAccordionProps {
  locale?: string;
  isArabic?: boolean;
}

export function FAQAccordion({
  isArabic = false,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: isArabic
        ? 'كيف تتحقق منصة راما من صحة بيانات سندات الملكية وحسابات الضمان؟'
        : 'How does RAMA verify DLD Title Deeds and Escrow Accounts?',
      answer: isArabic
        ? 'تقوم راما بالربط المباشر مع سجلات دائرة الأراضي والأملاك في دبي (DLD) وهيئة تنظيم القطاع العقاري (RERA) للتحقق من أرقام سندات الملكية والمطورين وحسابات الضمان الرسمية لمنع أي بيانات غير دقيقة.'
        : 'RAMA cross-references live property identifiers, title deed numbers, developer credentials, and official escrow account status directly against Dubai Land Department (DLD) and RERA registry APIs to eliminate unverified listings.',
    },
    {
      question: isArabic
        ? 'هل أموال حجز العقارات محمية بموجب قانون الضمان رقم 8 لسنة 2007؟'
        : 'Are off-plan buyer payments protected under RERA Law No. 8?',
      answer: isArabic
        ? 'نعم، يتم توجيه جميع دفعات المشاريع قيد الإنشاء إلى حسابات ضمان معتمدة لدى بنوك أمناء الضمان المرخصة في دبي ولا يتم الإفراج عنها إلا بناءً على نسب إنجاز البناء المعتمدة من دائرة الأراضي.'
        : 'Yes. Every off-plan project listed displays its verified RERA Escrow Account Number. Payments are legally bound to licensed escrow trustee accounts and disbursed solely according to certified DLD construction milestones.',
    },
    {
      question: isArabic
        ? 'كيف يعمل مستشار الذكاء الاصطناعي RAMA AI وما مدى دقة توقعات العائد؟'
        : 'How accurate are RAMA AI Net Yield forecasts?',
      answer: isArabic
        ? 'يعتمد نموذج الذكاء الاصطناعي على بيانات المعاملات الفعلية المسجلة في دبي خلال الـ 10 سنوات الماضية مع حساب رسوم الخدمات والموقع الدقيق لتقديم تحليل محايد وصادق لصافي العائد الاستثماري المتوقع.'
        : 'RAMA AI models net yield forecasts by synthesizing 10+ years of historical DLD transaction data, community masterplans, historical service charges, and infrastructure completion dates to deliver objective, evidence-based ROI projections.',
    },
    {
      question: isArabic
        ? 'ما هي الفروقات الرئيسية بين عقود الشراء الرسمية (Form F / MOU)؟'
        : 'What is the RERA Form F (MOU) audit feature?',
      answer: isArabic
        ? 'يوفر قسم Decision Lab أداة فحص واستخراج البيانات تلقائياً من بنود عقد البيع الموحد (Form F) للتحقق من التواريخ، شروط الدفع، وغرامات التخير قبل التوقيع النهائي.'
        : 'Our Decision Lab includes automated OCR parsing for Form F MOUs, checking key commercial clauses, deposit terms, notice periods, and liability conditions before binding signatures.',
    },
  ];

  return (
    <section className="border-t border-border/40 bg-surface/30 py-24">
      <Container size="md">
        <div className="mb-16 text-center">
          <p className="mb-3 flex items-center justify-center gap-1.5 text-xs font-semibold tracking-widest text-fjord uppercase">
            <HelpCircle className="size-4 text-fjord" />
            {isArabic ? 'الأسئلة الشائعة والشفافية' : 'Buyer Evidence & FAQs'}
          </p>
          <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">
            {isArabic
              ? 'كل ما تحتاج معرفته عن الضمان والشفافية'
              : 'Everything You Need to Know About RAMA Evidence'}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-none border border-border/60 bg-canvas transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-start font-display text-lg font-medium text-ink transition-colors hover:text-fjord"
                >
                  <span className="pe-4">{faq.question}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-fjord' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="mt-2 border-t border-border/30 px-6 pt-4 pb-6 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default FAQAccordion;
