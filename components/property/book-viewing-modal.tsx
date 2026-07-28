'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
  locale: 'en' | 'ar';
}

export function BookViewingModal({ isOpen, onClose, propertyName, locale }: BookViewingModalProps) {
  const isArabic = locale === 'ar';
  const [step, setStep] = React.useState<'form' | 'success'>('form');

  // Reset step when opened and handle accessibility
  React.useEffect(() => {
    if (isOpen) {
      setStep('form');
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setStep('success');
    }, 500); // Simulate network delay
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-surface shadow-2xl z-10"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/40 p-5">
              <h2 id="modal-title" className="font-display text-lg font-bold text-ink">
                {isArabic ? 'حجز موعد للمعاينة' : 'Book a Viewing'}
              </h2>
              <button
                onClick={onClose}
                aria-label={isArabic ? 'إغلاق' : 'Close'}
                className="text-muted-foreground hover:text-ink transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4 font-light">
                      {isArabic
                        ? `احجز موعداً خاصاً لمعاينة ${propertyName}`
                        : `Schedule a private viewing for ${propertyName}`}
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                          {isArabic ? 'الاسم الأول' : 'First Name'}
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          required
                          type="text"
                          className="w-full border-b border-border/60 bg-transparent py-2 text-sm focus:border-fjord focus:outline-none transition-colors"
                          placeholder={isArabic ? 'الاسم الأول' : 'John'}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                          {isArabic ? 'اسم العائلة' : 'Last Name'}
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          required
                          type="text"
                          className="w-full border-b border-border/60 bg-transparent py-2 text-sm focus:border-fjord focus:outline-none transition-colors"
                          placeholder={isArabic ? 'اسم العائلة' : 'Doe'}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                          {isArabic ? 'الهاتف' : 'Phone'}
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          required
                          type="tel"
                          className="w-full border-b border-border/60 bg-transparent py-2 text-sm focus:border-fjord focus:outline-none transition-colors"
                          placeholder="+971"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                          {isArabic ? 'البريد الإلكتروني' : 'Email'}
                        </label>
                        <input
                          id="email"
                          name="email"
                          required
                          type="email"
                          className="w-full border-b border-border/60 bg-transparent py-2 text-sm focus:border-fjord focus:outline-none transition-colors"
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                          {isArabic ? 'التاريخ المفضل' : 'Date'}
                        </label>
                        <div className="relative">
                          <Calendar className={`absolute top-2.5 h-3.5 w-3.5 text-muted-foreground ${isArabic ? 'right-0' : 'left-0'}`} />
                          <input
                            id="date"
                            name="date"
                            required
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full border-b border-border/60 bg-transparent py-2 text-sm focus:border-fjord focus:outline-none transition-colors ${
                              isArabic ? 'pr-6' : 'pl-6'
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                          {isArabic ? 'الوقت المفضل' : 'Time'}
                        </label>
                        <div className="relative">
                          <Clock className={`absolute top-2.5 h-3.5 w-3.5 text-muted-foreground ${isArabic ? 'right-0' : 'left-0'}`} />
                          <select
                            id="time"
                            name="time"
                            required
                            defaultValue=""
                            className={`w-full border-b border-border/60 bg-transparent py-2 text-sm focus:border-fjord focus:outline-none transition-colors appearance-none ${
                              isArabic ? 'pr-6' : 'pl-6'
                            }`}
                          >
                            <option value="" disabled hidden>{isArabic ? 'اختر الوقت' : 'Select Time'}</option>
                            <option value="morning">{isArabic ? 'الصباح (9 - 12)' : 'Morning (9am - 12pm)'}</option>
                            <option value="afternoon">{isArabic ? 'بعد الظهر (12 - 4)' : 'Afternoon (12pm - 4pm)'}</option>
                            <option value="evening">{isArabic ? 'المساء (4 - 7)' : 'Evening (4pm - 7pm)'}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full bg-fjord text-white font-bold text-xs tracking-widest uppercase py-5 hover:bg-fjord/90"
                    >
                      {isArabic ? 'تأكيد الحجز' : 'Confirm Booking'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="py-10 text-center space-y-5">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-ink">
                      {isArabic ? 'تم تأكيد طلبك' : 'Request Confirmed'}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto font-light">
                      {isArabic
                        ? 'سيقوم أحد وكلائنا المختصين بالتواصل معك قريباً لتأكيد الموعد النهائي.'
                        : 'One of our specialized agents will contact you shortly to confirm the final appointment.'}
                    </p>
                  </div>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="mt-6 px-8 text-xs font-bold tracking-widest uppercase border-border/60 hover:bg-surface-hover"
                  >
                    {isArabic ? 'العودة' : 'Return'}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
