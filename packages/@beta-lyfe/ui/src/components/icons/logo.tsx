import type { FunctionComponent } from 'react'
import { cn } from '../shad/lib/utils'
import betalyfeLogo from '../../assets/betalyfe.png'

export default ({ className }: { className?: string }) => {
  return (
    <img
      className={cn('w-[180px]', className)}
      src={betalyfeLogo}
      alt="BetaLyfe logo"
    />
  )
}
