import type { ReactNode, FunctionComponent } from 'react'
import { BottomNav } from './bottom-nav'

export const Layout: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => (
  <div className="h-dvh flex flex-col">
    <div className="flex flex-col grow">{children}</div>
    <BottomNav />
  </div>
)
