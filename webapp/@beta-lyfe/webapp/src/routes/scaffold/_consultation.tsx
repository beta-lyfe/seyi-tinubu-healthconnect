import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ConsultationProvider } from '@beta-lyfe/webapp/lib/consultation/provider'

export const Route = createFileRoute('/scaffold/_consultation')({
  component: ConsultationLayout,
})

function ConsultationLayout() {
  return (
    <ConsultationProvider>
      <Outlet />
    </ConsultationProvider>
  )
}
