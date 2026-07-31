'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

export interface TickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

const Digit = ({ place, value }: { place: number; value: number }) => {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 250,
    damping: 30,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className="relative inline-block h-[1em] w-[0.6em] overflow-hidden tabular-nums">
      {Array.from({ length: 10 }).map((_, i) => (
        <NumberColumn key={i} digit={i} animatedValue={animatedValue} />
      ))}
    </div>
  );
};

const NumberColumn = ({
  digit,
  animatedValue,
}: {
  digit: number;
  animatedValue: any;
}) => {
  const y = useTransform(animatedValue, (latest: number) => {
    const currentDigit = Math.abs(Math.floor(latest)) % 10;
    const offset = (10 + digit - currentDigit) % 10;
    let memo = offset * 100;
    if (offset > 5) {
      memo -= 1000;
    }
    return `${memo}%`;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {digit}
    </motion.span>
  );
};

export const Ticker = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: TickerProps) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const formattedString = currentValue.toFixed(decimals);
  const parts = formattedString.split('.');
  const integerPart = parseInt(parts[0], 10);
  const decimalPart = parts[1];

  // We can animate integer digits with odometer effect, or use a smooth spring number counter for clean Lagom typography
  const springValue = useSpring(0, { stiffness: 100, damping: 20 });
  const [displayValue, setDisplayValue] = useState(prefix + '0' + suffix);

  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(
        `${prefix}${latest.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`,
      );
    });
  }, [springValue, prefix, suffix, decimals]);

  return (
    <span
      className={cn(
        'inline-flex items-baseline font-mono font-bold tabular-nums',
        className,
      )}
    >
      {displayValue}
    </span>
  );
};
