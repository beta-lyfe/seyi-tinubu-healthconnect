import { cn } from '@beta-lyfe/ui/components/shad/lib/utils'
import { forwardRef, type HTMLAttributes } from 'react'

export const Section = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <section {...props} className={cn('px-6', className)} ref={ref} />
))
