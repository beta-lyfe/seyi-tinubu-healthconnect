import {
  Input as SInput,
  InputProps
} from '@beta-lyfe/webapp/components/shad/ui/input'
import { forwardRef, useState, ReactNode } from 'react'
import { cn } from '@beta-lyfe/webapp/components/shad/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

type Props = InputProps & {
  icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, type, icon, ...props }, ref) => {
    const [state, setState] = useState({ showPassword: false })
    const computedType =
      type === 'password' && state.showPassword ? 'text' : type
    const iconClasses = 'aspect-square w-5 xl:w-7'
    const iconContainerClasses =
      'absolute top-1/2 -translate-y-1/2 text-gray-800'

    return (
      <div className="relative">
        {icon && (
          <span className={cn(iconContainerClasses, 'left-[5%]')}>
            <span className={iconClasses}>{icon}</span>
          </span>
        )}
        <SInput
          className={cn(
            'w-full h-auto bg-heGray-background text-hePrimary inline-flex items-center justify-center p-4 xl:p-7 text-[15px] xl:text-2xl font-medium rounded-md',
            icon && 'pl-[2.5rem]',
            className
          )}
          type={computedType}
          ref={ref}
          {...props}
        />
        {type === 'password' ? (
          <button
            type="button"
            className={cn(iconContainerClasses, 'right-[5%]')}
            onClick={() => setState({ showPassword: !state.showPassword })}
          >
            {state.showPassword ? (
              <EyeOffIcon className={iconClasses} />
            ) : (
              <EyeIcon className={iconClasses} />
            )}
          </button>
        ) : null}
      </div>
    )
  }
)
Input.displayName = 'Input'
