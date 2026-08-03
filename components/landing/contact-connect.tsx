'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from '@/app/actions/contact';
import { Container } from '@/components/layout/container';

interface ContactConnectProps {
  isArabic?: boolean;
}

export function ContactConnect({ isArabic = false }: ContactConnectProps) {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const result = await submitContactForm(formData);
      if (result.error) {
        setErrorMessage(result.error);
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setErrorMessage(
        isArabic
          ? 'تعذر إرسال الرسالة. حاول مرة أخرى.'
          : 'Could not send your message. Please try again.',
      );
      setStatus('error');
    }
  };

  return (
    <section className="border-t border-border/40 bg-background py-24">
      <Container size="lg">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="font-display text-4xl font-medium text-balance text-fjord sm:text-5xl">
              {isArabic ? 'تواصل معنا' : 'Get in Touch'}
            </h2>
            <p className="mt-4 max-w-xl text-base text-balance text-muted-foreground">
              {isArabic
                ? 'لديك أسئلة؟ يسعدنا التحدث معك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.'
                : "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-12 lg:gap-16">
            <div className="space-y-8 md:col-span-5 lg:col-span-4">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Mail className="size-4 text-fjord" />
                  {isArabic ? 'البريد الإلكتروني' : 'Email'}
                </p>
                <Link
                  href="mailto:hello@rama.ae"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  hello@rama.ae
                </Link>
              </div>

              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Phone className="size-4 text-fjord" />
                  {isArabic ? 'الهاتف' : 'Phone'}
                </p>
                <Link
                  href="tel:+97141234567"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  +971 (4) 123-4567
                </Link>
              </div>

              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="size-4 text-fjord" />
                  {isArabic ? 'المكتب' : 'Office'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isArabic
                    ? 'منطقة الأوبرا، وسط مدينة دبي، الإمارات العربية المتحدة'
                    : 'Opera District, Downtown Dubai, UAE'}
                </p>
              </div>
            </div>

            <div className="md:col-span-7 lg:col-span-8">
              <Card className="rounded-none border border-border/80 bg-surface/60 p-6 shadow-sm backdrop-blur-md sm:p-10">
                {status === 'success' ? (
                  <div className="flex h-full flex-col items-center justify-center space-y-4 py-12 text-center">
                    <div className="rounded-none bg-emerald-500/20 p-3">
                      <CheckCircle2 className="size-8 text-emerald-500" />
                    </div>
                    <h3 className="font-display text-xl text-fjord">
                      {isArabic
                        ? 'تم إرسال رسالتك بنجاح'
                        : 'Message Sent Successfully'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isArabic
                        ? 'سنقوم بالرد عليك قريباً.'
                        : 'We will get back to you shortly.'}
                    </p>
                    <Button
                      onClick={() => setStatus('idle')}
                      variant="outline"
                      className="mt-4 rounded-none"
                    >
                      {isArabic ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                    </Button>
                  </div>
                ) : (
                  <form action={handleSubmit} className="space-y-5">
                    <div className="grid gap-4 @md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm">
                          {isArabic ? 'الاسم' : 'Name'}
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder={isArabic ? 'اسمك الكريم' : 'Your name'}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm">
                          {isArabic ? 'البريد الإلكتروني' : 'Email'}
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm">
                        {isArabic ? 'الموضوع' : 'Subject'}
                      </Label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder={
                          isArabic ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm">
                        {isArabic ? 'الرسالة' : 'Message'}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder={
                          isArabic
                            ? 'اكتب تفاصيل استفسارك...'
                            : 'Tell us more...'
                        }
                        required
                        className="min-h-28"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-sm font-medium text-destructive">
                        {errorMessage}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={status === 'loading'}
                      className="h-9 w-full rounded-none bg-fjord text-[11px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-fjord-hover"
                    >
                      {status === 'loading'
                        ? isArabic
                          ? 'جاري الإرسال...'
                          : 'Sending...'
                        : isArabic
                          ? 'إرسال الرسالة'
                          : 'Send Message'}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactConnect;
