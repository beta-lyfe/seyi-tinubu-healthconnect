import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_dashboard/dashboard/_consultation')({
  component: RouteComponent
})

function RouteComponent() {
  return <Outlet />
}
