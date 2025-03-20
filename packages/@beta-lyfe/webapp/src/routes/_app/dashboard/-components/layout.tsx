import type { ReactNode, FunctionComponent } from 'react'
import { BottomNav } from './bottom-nav'
import { TopBar } from './top-bar'

export const Layout: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => (
  <div className="h-dvh flex flex-col">
    <TopBar />
    <div className="flex flex-col grow overflow-scroll">{children}</div>
    <BottomNav />
  </div>
)


export const LayoutWithBottomNav: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => (
  <div className="h-dvh flex flex-col">
    <div className="flex flex-col grow overflow-scroll">{children}</div>
    <BottomNav />
  </div>
)