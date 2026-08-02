'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import ramaLoadingAnimation from '@/public/lottie/rama_loading.json';

export function GlobalLoader() {
  const [show, setShow] = useState(true); // Default to true so it renders immediately on SSR, preventing the hero from flashing first.

  useEffect(() => {
    // Check if we've already shown the splash screen in this session
    const hasShown = sessionStorage.getItem('rama_splash_shown');
    
    if (hasShown) {
      setShow(false);
    } else {
      // Ensure the scroll is locked while loading
      document.body.style.overflow = 'hidden';

      // Hide after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('rama_splash_shown', 'true');
        document.body.style.overflow = '';
      }, 5000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              if (sessionStorage.getItem('rama_splash_shown')) {
                document.documentElement.classList.add('hide-splash');
              }
            } catch (e) {}
          `,
        }}
      />
      <AnimatePresence>
        {show && (
          <motion.div
            id="global-splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-stone-950"
          >
            <motion.div 
              initial={{ scale: 0.85, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Custom deceleration curve for luxury feel
              className="relative flex size-32 items-center justify-center md:size-48"
            >
              <Lottie 
                animationData={ramaLoadingAnimation} 
                loop={true} 
                autoplay={true} 
                className="size-full"
              />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-xl font-light tracking-[0.25em] text-white/80 uppercase md:text-2xl"
            >
              Rama Real Estate
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
