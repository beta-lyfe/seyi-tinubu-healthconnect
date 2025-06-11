import { forwardRef } from 'react'
import { type ButtonProps, Button as ShadButton } from './shad/ui/button'
import { cn } from './shad/lib/utils'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <ShadButton
      className={cn(
        'border-2 border-black rounded-lg px-3 py-2 h-auto text-black font-semibold',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
