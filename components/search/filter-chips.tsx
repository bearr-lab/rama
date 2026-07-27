'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  multiple?: boolean;
  className?: string;
}

export function FilterChips({
  options,
  value = [],
  onChange,
  multiple = false,
  className,
}: FilterChipsProps) {
  const [selected, setSelected] = useState<string[]>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const toggleOption = (optionValue: string) => {
    let newSelected: string[];

    if (multiple) {
      if (selected.includes(optionValue)) {
        newSelected = selected.filter((v) => v !== optionValue);
      } else {
        newSelected = [...selected, optionValue];
      }
    } else {
      newSelected = selected.includes(optionValue) ? [] : [optionValue];
    }

    setSelected(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggleOption(option.value)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 backdrop-blur-md shadow-xs cursor-pointer',
              isSelected
                ? 'bg-white text-ink shadow-md scale-[1.02] border border-white'
                : 'border border-white/30 bg-white/15 text-white hover:bg-white/30',
            )}
          >
            {isSelected && <Check className="h-3.5 w-3.5 text-fjord" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
