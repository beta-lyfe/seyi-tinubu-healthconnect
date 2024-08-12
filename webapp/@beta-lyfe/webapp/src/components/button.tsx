import { forwardRef } from 'react'
import { type ButtonProps, Button as ShadButton } from './shad/ui/button'
import { cn } from './shad/lib/utils'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <ShadButton className={cn('shadow-md', className)} ref={ref} {...props} />
  )
)
