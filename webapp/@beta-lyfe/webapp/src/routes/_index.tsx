import { Outlet, createFileRoute } from '@tanstack/react-router'
import { BottomNav } from './-components/bottom-nav'

export const Route = createFileRoute('/_index')({
  component: IndexLayout
})

function IndexLayout() {
  return (
    <>
      <Outlet />
      {/*<BottomNav />*/}
    </>
  )
}
