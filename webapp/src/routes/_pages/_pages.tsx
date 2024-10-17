import { createFileRoute, Outlet } from '@tanstack/react-router'
import { BottomBar } from './_pages/-components/bottom-bar'

export const Route = createFileRoute('/_pages/_pages')({
  component: PagesLayout
})

function PagesLayout() {
  return (
    <>
      <Outlet />
      <BottomBar />
    </>
  )
}
