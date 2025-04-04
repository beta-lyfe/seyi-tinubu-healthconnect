import { createFileRoute, Outlet } from '@tanstack/react-router'
import { MainLayout } from './_dashboard/dashboard/-components/main-layout'

export const Route = createFileRoute('/_app/_dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full'>
    <MainLayout>
      <Outlet />
    </MainLayout>
  </div>
}
