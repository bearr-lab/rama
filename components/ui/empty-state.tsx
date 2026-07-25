import { ReactNode } from "react"
import { SearchX, FolderOpen, HeartCrack, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type EmptyStateVariant = "search" | "shortlist" | "error" | "default"

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
  variant?: EmptyStateVariant
  className?: string
}

export function EmptyState({ 
  title, 
  description, 
  action, 
  variant = "default",
  className 
}: EmptyStateProps) {
  
  const getIcon = () => {
    switch (variant) {
      case "search":
        return <SearchX className="w-12 h-12 text-muted-foreground/50" />
      case "shortlist":
        return <HeartCrack className="w-12 h-12 text-muted-foreground/50" />
      case "error":
        return <AlertCircle className="w-12 h-12 text-risk/50" />
      case "default":
      default:
        return <FolderOpen className="w-12 h-12 text-muted-foreground/50" />
    }
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 md:p-16 rounded-xl border border-dashed border-border bg-surface-subtle/50",
      className
    )}>
      <div className="bg-white p-4 rounded-full shadow-sm mb-6">
        {getIcon()}
      </div>
      
      <h3 className="text-xl font-semibold text-ink mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground max-w-sm mx-auto mb-8">
        {description}
      </p>
      
      {action && (
        <div>{action}</div>
      )}
    </div>
  )
}
