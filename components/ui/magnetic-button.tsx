'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

export interface MagneticButtonProps extends Omit<ButtonProps, 'render'> {
  strength?: number;
  render?: React.ReactNode;
}

export function MagneticButton({
  className,
  strength = 30,
  children,
  render,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!buttonRef.current) return;

    const { height, width, left, top } =
      buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({
      x: middleX * (strength / 100),
      y: middleY * (strength / 100),
    });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={cn(
        'hover:shadow-floating inline-block transition-shadow duration-300 ease-out',
        className,
      )}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {render ? render : <Button {...props}>{children}</Button>}
    </motion.div>
  );
}
