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

interface ContactConnectProps {
  locale?: string;
  isArabic?: boolean;
}

export function ContactConnect({
  locale = 'en',
  isArabic = false,
}: ContactConnectProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setStatus('loading');
    setErrorMessage('');
    const result = await submitContactForm(formData);
    if (result.error) {
      setErrorMessage(result.error);
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  return (
    <section className="bg-background @container py-24 border-t border-border/40">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div>
          <h2 className="text-balance font-display text-4xl font-medium sm:text-5xl text-ink">
            {isArabic ? 'تواصل معنا' : 'Get in Touch'}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md text-balance text-base">
            {isArabic
              ? 'لديك أسئلة؟ يسعدنا التحدث معك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.'
              : "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
          </p>
        </div>

        <div className="@xl:grid-cols-5 mt-12 grid gap-8">
          <div className="@xl:col-span-2 space-y-6 *:space-y-2">
            <div>
              <p className="text-foreground text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-fjord" />
                {isArabic ? 'البريد الإلكتروني' : 'Email'}
              </p>
              <Link
                href="mailto:hello@rama.ae"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                hello@rama.ae
              </Link>
            </div>

            <div>
              <p className="text-foreground text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4 text-fjord" />
                {isArabic ? 'الهاتف' : 'Phone'}
              </p>
              <Link
                href="tel:+97141234567"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                +971 (4) 123-4567
              </Link>
            </div>

            <div>
              <p className="text-foreground text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-fjord" />
                {isArabic ? 'المكتب' : 'Office'}
              </p>
              <p className="text-muted-foreground text-sm">
                {isArabic
                  ? 'منطقة الأوبرا، وسط مدينة دبي، الإمارات العربية المتحدة'
                  : 'Opera District, Downtown Dubai, UAE'}
              </p>
            </div>
          </div>

          <Card className="@xl:col-span-3 p-6 border border-border/80 bg-surface/60 shadow-sm rounded-none backdrop-blur-md">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-center py-12">
                <div className="rounded-full bg-emerald-500/20 p-3">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-display text-ink">
                  {isArabic ? 'تم إرسال رسالتك بنجاح' : 'Message Sent Successfully'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isArabic ? 'سنقوم بالرد عليك قريباً.' : 'We will get back to you shortly.'}
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
                <div className="@md:grid-cols-2 grid gap-4">
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
                    placeholder={isArabic ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'}
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
                    placeholder={isArabic ? 'اكتب تفاصيل استفسارك...' : 'Tell us more...'}
                    required
                    className="min-h-28"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-destructive font-medium">{errorMessage}</p>
                )}

                <Button 
                  disabled={status === 'loading'}
                  className="w-full h-9 bg-fjord text-white hover:bg-fjord-hover rounded-none font-bold tracking-widest uppercase text-[11px] transition-colors"
                >
                  {status === 'loading' 
                    ? (isArabic ? 'جاري الإرسال...' : 'Sending...') 
                    : (isArabic ? 'إرسال الرسالة' : 'Send Message')}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ContactConnect;
