"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterOption {
  value: string
  label: string
}

interface FilterChipsProps {
  options: FilterOption[]
  value?: string[]
  onChange?: (values: string[]) => void
  multiple?: boolean
  className?: string
}

export function FilterChips({ 
  options, 
  value = [], 
  onChange, 
  multiple = false,
  className 
}: FilterChipsProps) {
  const [selected, setSelected] = useState<string[]>(value)

  const toggleOption = (optionValue: string) => {
    let newSelected: string[]
    
    if (multiple) {
      if (selected.includes(optionValue)) {
        newSelected = selected.filter(v => v !== optionValue)
      } else {
        newSelected = [...selected, optionValue]
      }
    } else {
      newSelected = selected.includes(optionValue) ? [] : [optionValue]
    }
    
    setSelected(newSelected)
    if (onChange) {
      onChange(newSelected)
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option.value)
        
        return (
          <button
            key={option.value}
            onClick={() => toggleOption(option.value)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              isSelected 
                ? "bg-fjord text-white shadow-sm scale-[1.02]" 
                : "bg-surface border border-border text-ink hover:bg-surface-subtle"
            )}
          >
            {isSelected && <Check className="w-3.5 h-3.5" />}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
