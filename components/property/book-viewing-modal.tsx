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

export function BookViewingModal({
  isOpen,
  onClose,
  propertyName,
  locale,
}: BookViewingModalProps) {
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
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
            className="relative z-10 w-full max-w-md bg-stone-50 shadow-2xl dark:bg-stone-950"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-300/40 p-5 dark:border-stone-800/40">
              <h2
                id="modal-title"
                className="font-display text-lg font-bold text-stone-900 dark:text-stone-50"
              >
                {isArabic ? 'حجز موعد للمعاينة' : 'Book a Viewing'}
              </h2>
              <button
                onClick={onClose}
                aria-label={isArabic ? 'إغلاق' : 'Close'}
                className="text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="mb-4 text-sm font-light text-stone-500 dark:text-stone-400">
                      {isArabic
                        ? `احجز موعداً خاصاً لمعاينة ${propertyName}`
                        : `Schedule a private viewing for ${propertyName}`}
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-1.5 block text-[10px] font-bold tracking-widest text-stone-500 uppercase dark:text-stone-400"
                        >
                          {isArabic ? 'الاسم الأول' : 'First Name'}
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          required
                          type="text"
                          className="w-full border-b border-stone-300/60 bg-transparent py-2 text-sm transition-colors focus:border-stone-900 focus:outline-none dark:border-stone-800/60"
                          placeholder={isArabic ? 'الاسم الأول' : 'John'}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-1.5 block text-[10px] font-bold tracking-widest text-stone-500 uppercase dark:text-stone-400"
                        >
                          {isArabic ? 'اسم العائلة' : 'Last Name'}
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          required
                          type="text"
                          className="w-full border-b border-stone-300/60 bg-transparent py-2 text-sm transition-colors focus:border-stone-900 focus:outline-none dark:border-stone-800/60"
                          placeholder={isArabic ? 'اسم العائلة' : 'Doe'}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-1.5 block text-[10px] font-bold tracking-widest text-stone-500 uppercase dark:text-stone-400"
                        >
                          {isArabic ? 'الهاتف' : 'Phone'}
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          required
                          type="tel"
                          className="w-full border-b border-stone-300/60 bg-transparent py-2 text-sm transition-colors focus:border-stone-900 focus:outline-none dark:border-stone-800/60"
                          placeholder="+971"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-[10px] font-bold tracking-widest text-stone-500 uppercase dark:text-stone-400"
                        >
                          {isArabic ? 'البريد الإلكتروني' : 'Email'}
                        </label>
                        <input
                          id="email"
                          name="email"
                          required
                          type="email"
                          className="w-full border-b border-stone-300/60 bg-transparent py-2 text-sm transition-colors focus:border-stone-900 focus:outline-none dark:border-stone-800/60"
                          placeholder="you@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="date"
                          className="mb-1.5 block text-[10px] font-bold tracking-widest text-stone-500 uppercase dark:text-stone-400"
                        >
                          {isArabic ? 'التاريخ المفضل' : 'Date'}
                        </label>
                        <div className="relative">
                          <Calendar
                            className={`absolute top-2.5 size-3.5 text-stone-500 dark:text-stone-400 ${isArabic ? 'right-0' : 'left-0'}`}
                          />
                          <input
                            id="date"
                            name="date"
                            required
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full border-b border-stone-300/60 bg-transparent py-2 text-sm transition-colors focus:border-stone-900 focus:outline-none dark:border-stone-800/60 ${
                              isArabic ? 'pr-6' : 'pl-6'
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="time"
                          className="mb-1.5 block text-[10px] font-bold tracking-widest text-stone-500 uppercase dark:text-stone-400"
                        >
                          {isArabic ? 'الوقت المفضل' : 'Time'}
                        </label>
                        <div className="relative">
                          <Clock
                            className={`absolute top-2.5 size-3.5 text-stone-500 dark:text-stone-400 ${isArabic ? 'right-0' : 'left-0'}`}
                          />
                          <select
                            id="time"
                            name="time"
                            required
                            defaultValue=""
                            className={`w-full appearance-none border-b border-stone-300/60 bg-transparent py-2 text-sm transition-colors focus:border-stone-900 focus:outline-none dark:border-stone-800/60 ${
                              isArabic ? 'pr-6' : 'pl-6'
                            }`}
                          >
                            <option value="" disabled hidden>
                              {isArabic ? 'اختر الوقت' : 'Select Time'}
                            </option>
                            <option value="morning">
                              {isArabic
                                ? 'الصباح (9 - 12)'
                                : 'Morning (9am - 12pm)'}
                            </option>
                            <option value="afternoon">
                              {isArabic
                                ? 'بعد الظهر (12 - 4)'
                                : 'Afternoon (12pm - 4pm)'}
                            </option>
                            <option value="evening">
                              {isArabic
                                ? 'المساء (4 - 7)'
                                : 'Evening (4pm - 7pm)'}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full bg-stone-900 py-5 text-xs font-bold tracking-widest text-white uppercase hover:bg-stone-900/90 dark:bg-stone-100/90"
                    >
                      {isArabic ? 'تأكيد الحجز' : 'Confirm Booking'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-5 py-10 text-center">
                  <div className="mx-auto flex size-14 items-center justify-center bg-stone-800/10">
                    <CheckCircle2 className="size-7 text-stone-800" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-50">
                      {isArabic ? 'تم تأكيد طلبك' : 'Request Confirmed'}
                    </h3>
                    <p className="mx-auto max-w-xs text-sm font-light text-stone-500 dark:text-stone-400">
                      {isArabic
                        ? 'سيقوم أحد وكلائنا المختصين بالتواصل معك قريباً لتأكيد الموعد النهائي.'
                        : 'One of our specialized agents will contact you shortly to confirm the final appointment.'}
                    </p>
                  </div>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="dark:bg-stone-950-hover mt-6 border-stone-300/60 px-8 text-xs font-bold tracking-widest uppercase hover:bg-stone-50 dark:border-stone-800/60"
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
