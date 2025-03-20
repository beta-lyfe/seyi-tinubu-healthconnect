import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/_consultation')({
  component: RouteComponent
})

function RouteComponent() {
  return <Outlet />
}
