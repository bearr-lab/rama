import { ReactNode } from "react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  children?: ReactNode
  className?: string
}

export function PageHeader({ title, description, icon, children, className }: PageHeaderProps) {
  return (
    <Section background="surface-subtle" className={cn("pt-24 pb-12 md:pt-32 md:pb-16 border-b border-border mt-16", className)}>
      <Container size="xl" className="space-y-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4 flex items-center gap-3">
            {icon && <span className="text-fjord">{icon}</span>}
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-prose">
              {description}
            </p>
          )}
        </div>
        
        {children && (
          <div className="pt-4">
            {children}
          </div>
        )}
      </Container>
    </Section>
  )
}
